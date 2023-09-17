<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6">
        Agregar Comentario de Estado
      </q-card-section>
      <q-card-section>
        <q-form @submit="storeComentarioEstado">
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
                v-model="form.descripcion"
                label="Descripción"
                type="text"
              />
            </div>
          </div>

          <q-btn
            @click="$router.push({path:'/comentarios-estados'})"
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
const router = useRouter()

const form = ref({
  nombre: '',
  descripcion: '',
})

const storeComentarioEstado = () => {
    api.post('/social/estado_comentario/', form.value)
      .then(response => {
      $q.notify({
        type: 'positive',
        message: 'Comentario de Estado creado correctamente.',
        position: 'top-right',
        progress: true,
      })

      router.push({path: '/comentarios-estados'})
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

