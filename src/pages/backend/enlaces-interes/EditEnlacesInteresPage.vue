<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6">
        Editar Enlace de Inerés
      </q-card-section>
      <q-card-section>
        <q-form @submit="updateEnlaceInteres">
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
const enlace_id = router.currentRoute.value.params.id

const form = ref({
  nombre: '',
  enlace: '',
})

onMounted(() => {
  getEnlaceInteres()
})
const getEnlaceInteres = () => {
  api.get(`/social/enlace_interes/` + enlace_id + "/").then(response => {
    form.value = response.data
  })
}

const updateEnlaceInteres = () => {
  api.put('/social/enlace_interes/' + enlace_id + '/', form.value)
    .then(response => {
      $q.notify({
        type: 'positive',
        message: 'Enlace editado correctamente.',
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

