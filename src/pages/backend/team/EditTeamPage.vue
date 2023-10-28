<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6">
        Editar Directivo
      </q-card-section>
      <q-card-section>
        <q-form @submit="updateDirectivo">
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-xs-12 col-sm-6">
              <q-input
                outlined
                v-model="form.nombre_completo"
                label="Nombre Completo"
                type="text"
                lazy-rules
                :rules="[rules.required]"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                outlined
                v-model="form.prioridad"
                label="Prioridad"
                type="number"
                :rules="[rules.numberGreaterZero]"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-file name="logo" outlined v-model="form.imagen" label="Imagen"/>
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                outlined
                v-model="form.cargo"
                label="Cargo"
                type="text"
                :rules="[rules.required]"
              />
            </div>
            <div class="col-xs-12">
              <q-input
                outlined
                v-model="form.biografia"
                label="Biografía"
                type="text"
              />
            </div>
          </div>

          <q-btn
            @click="$router.push({path:'/directivos'})"
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
const directivo_id = router.currentRoute.value.params.id

const form = ref({
  nombre_completo: '',
  prioridad: '',
  imagen: null,
  cargo: '',
  biografia: ''
})

const img = ref(null)

onMounted(() => {
  getDirectivo()
})

const getDirectivo = () => {
  api.get(`/empresa/directivo/` + directivo_id + "/").then(response => {
    form.value = response.data
    form.value.imagen = null
  })
}

const updateDirectivo = () => {
  const formData = new FormData()

  Object.keys(form.value).forEach(key => {
    const value = form.value[key];
    if (value !== null && value !== undefined) {
      if (key === 'imagen') {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    }
  });

  api.put('/empresa/directivo/' + directivo_id + '/', formData)
    .then(response => {
      $q.notify({
        type: 'positive',
        message: 'Directivo editado correctamente.',
        position: 'top-right',
        progress: true,
      })

      router.push({path: '/directivos'})
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

