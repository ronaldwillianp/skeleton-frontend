<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6">
        Editar Comentario de Noticia
      </q-card-section>
      <q-card-section>
        <q-form @submit="updateComentarioNoticia">
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-xs-12 col-sm-6">
              <q-input
                outlined
                v-model="form.comentario"
                label="Comentario"
                type="text"
                lazy-rules
                :rules="[rules.required]"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-select outlined v-model="selectNoticia" transition-show="jump-up"
                        transition-hide="jump-up" label="Seleccione una noticia" option-value="id"
                        option-label="titulo"
                        :options="noticias" emit-value map-options
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
            @click="$router.push({path:'/comentarios-noticias'})"
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
import rules from '../../../../utils/rules'

const $q = useQuasar()
const user = UserStore()
const noticias = ref([])
const selectNoticia = ref(null)
const estados = ref([])
const selectEstado = ref(null)
const router = useRouter()

const comentario_noticia_id = router.currentRoute.value.params.id

const form = ref({
  comentario: '',
  creada_por: '',
  estado: '',
  noticia: ''
})

onMounted(() => {
  getComentariosNoticias()
  getEstadoNoticias()
  getNoticias()
})

const updateComentarioNoticia = () => {

  const formComentarioNoticia = {
    comentario: form.value.comentario,
    creada_por: user.user.id,
    estado: selectEstado.value,
    noticia: selectNoticia.value
  }

  api.put('/social/comentario_noticia/' + comentario_noticia_id + "/", formComentarioNoticia)
    .then(response => {
      $q.notify({
        type: 'positive',
        message: 'Comentario de Noticia editado correctamente.',
        position: 'top-right',
        progress: true,
      })

      router.push({path: '/comentarios-noticias'})
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
      console.log(error)
    })
}

const getComentariosNoticias = () => {
  api.get(`/social/comentario_noticia/` + comentario_noticia_id + "/").then(response => {
    form.value = response.data
    selectEstado.value = form.value.estado_info.id
    selectNoticia.value = form.value.noticia_info.id
  })
}

const getNoticias = () => {
  api.get('/social/noticia/').then(response => {
    noticias.value = response.data
  })
}

const getEstadoNoticias = () => {
  api.get('/social/estado_comentario/').then(response => {
    estados.value = response.data
  })
}

</script>

