<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6">
        Agregar Noticia
      </q-card-section>
      <q-card-section>
        <q-form @submit="storeNoticia">
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-xs-12 col-sm-6">
              <q-input
                outlined
                v-model="form.titulo"
                label="Título"
                type="text"
                lazy-rules
                :rules="[rules.required]"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                outlined
                v-model="form.descripcion"
                label="Descripción"
                type="text"
                lazy-rules
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-select outlined v-model="selectCategoria" transition-show="jump-up"
                        transition-hide="jump-up" label="Seleccione una categoría" option-value="id"
                        option-label="nombre"
                        :options="categorias" emit-value map-options multiple
                        :rules="[rules.requiredSelect]"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No existen elementos
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-select outlined v-model="selectEstado" transition-show="jump-up"
                        transition-hide="jump-up" label="Seleccione un estado" option-value="id"
                        option-label="nombre"
                        :options="estados" emit-value map-options
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No existen elementos
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>

          <q-btn
            @click="$router.push({path:'/noticias'})"
            type="button"
            color="negative"
            class="text-white q-mr-sm">
            <q-icon name="arrow_circle_left" class="q-mr-sm"></q-icon>
            Volver
          </q-btn>
          <q-btn
            type="submit"
            color="primary"
            class="text-white">
            <q-icon name="save" class="q-mr-sm"></q-icon>
            Guardar
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useQuasar} from "quasar";
import {UserStore} from "stores/user-store";
import {api} from "boot/axios";
import {useRouter} from "vue-router";
import rules from '../../../utils/rules'

const $q = useQuasar()
const user = UserStore()
const categorias = ref([])
const selectCategoria = ref(null)
const estados = ref([])
const selectEstado = ref(null)
const router = useRouter()

const form = ref({
  titulo: '',
  descripcion: '',
  creada_por: '',
  estado: '',
  categoria: ''
})

onMounted(() => {
  getCategorias()
  getEstadoNoticias()
})

const storeNoticia = () => {
  const formNoticias = {
    titulo: form.value.titulo,
    descripcion: form.value.descripcion,
    creada_por: user.user.id,
    estado: selectEstado.value,
    categoria: selectCategoria.value
  }
    api.post('/social/noticia/', formNoticias)
      .then(response => {
      $q.notify({
        type: 'positive',
        message: 'Noticia creada correctamente.',
        position: 'top-right',
        progress: true,
      })

      router.push({path: '/noticias'})
    })
    .catch(error => {
      if (error.response.data) {
        for (let i in error.response.data) {
          $q.notify({
            type: 'negative',
            message: error.response.data[i],
            position: 'top-right',
            progress: true,
          })
        }
      } else {
        $q.notify({
          type: 'negative',
          message: error.response,
          position: 'top-right',
          progress: true,
        })
      }
    })
}

const getCategorias = () => {
  api.get('/social/categoria_noticia/').then(response => {
    categorias.value = response.data
  })
}
const getEstadoNoticias = () => {
  api.get('/social/estado_noticia/').then(response => {
    estados.value = response.data
    console.log(response.data)
  })
}

</script>

