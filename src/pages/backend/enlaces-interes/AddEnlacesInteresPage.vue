<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6">
        Agregar Enlace de Interés
      </q-card-section>
      <q-card-section>
        <q-form @submit="storeEnlacesInteres">
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-xs-12 col-sm-6">
              <q-input
                outlined
                v-model="form.nombre"
                label="Nombre"
                type="text"
                lazy-rules
                :rules="[rules.required]"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                outlined
                v-model="form.enlace"
                label="Dirección URL"
                type="text"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-select outlined v-model="selectCategoria" transition-show="jump-up"
                        transition-hide="jump-up" label="Seleccione una categoría" option-value="id"
                        option-label="nombre"
                        :options="categorias"
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
          </div>

          <q-btn
            @click="$router.push({path:'/enlaces-interes'})"
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
import {api} from "boot/axios";
import {useRouter} from "vue-router";
import rules from '../../../utils/rules'

const $q = useQuasar()
const router = useRouter()
const categorias = ref([])
const selectCategoria = ref(null)

const form = ref({
  nombre: '',
  enlace: '',
  categoria: []
})

onMounted(() => {
  getCategorias()
})

const getCategorias = () => {
  api.get('/social/categoria_enlace_interes/').then(response => {
    categorias.value = response.data
  })
    .catch(error => console.log(error))
}

const storeEnlacesInteres = () => {

  form.value.categoria = selectCategoria.value.id

  api.post('/social/enlace_interes/', form.value)
    .then(response => {
      $q.notify({
        type: 'positive',
        message: 'Enlace creado correctamente.',
        position: 'top-right',
        progress: true,
      })

      router.push({path: '/enlaces-interes'})
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
</script>

