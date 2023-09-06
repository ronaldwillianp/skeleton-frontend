<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6">
        Agregar FAQ
      </q-card-section>
      <q-card-section>
        <q-form @submit="storeFaq">
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-xs-12 col-sm-6">
              <q-input
                outlined
                v-model="form.pregunta"
                label="Pregunta"
                type="text"
                lazy-rules
                :rules="[rules.required]"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                outlined
                v-model="form.respuesta"
                label="Respuesta"
                type="text"
              />
            </div>
          </div>

          <q-btn
            @click="$router.push({path:'/faqs'})"
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
import {ref} from 'vue'
import {useQuasar} from "quasar";
import {api} from "boot/axios";
import {useRouter} from "vue-router";
import rules from '../../../utils/rules'

const $q = useQuasar()
const router = useRouter()

const form = ref({
  pregunta: '',
  respuesta: '',
})

const storeFaq = () => {
    api.post('/social/faq/', form.value)
      .then(response => {
      $q.notify({
        type: 'positive',
        message: 'Faq creada correctamente.',
        position: 'top-right',
        progress: true,
      })

      router.push({path: '/faqs'})
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

