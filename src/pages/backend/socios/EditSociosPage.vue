<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6">
        Editar Socio
      </q-card-section>
      <q-card-section>
        <q-form @submit="updateSocio">
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
                v-model="form.web"
                label="Dirección URL"
                type="text"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-file name="logo" outlined v-model="form.logo" label="Logo"  />
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
import {api} from "boot/axios";
import {useRouter} from "vue-router";
import rules from '../../../utils/rules'

const $q = useQuasar()
const router = useRouter()
const socio_id = router.currentRoute.value.params.id

const form = ref({
  nombre: '',
  logo: null,
  web: ''
})

const img = ref(null)

onMounted(() => {
  getSocio()
})

const getSocio = () => {
  api.get(`/empresa/socio/` + socio_id + "/").then(response => {
    form.value = response.data
    form.value.logo = null
  })
}

const updateSocio = () => {
  const formData = new FormData()

  Object.keys(form.value).forEach(key => {
    const value = form.value[key];
    if (value !== null && value !== undefined) {
      if (key === 'logo') {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    }
  });

  api.put('/empresa/socio/' + socio_id + '/', formData)
    .then(response => {
      $q.notify({
        type: 'positive',
        message: 'Socio editado correctamente.',
        position: 'top-right',
        progress: true,
      })

      router.push({path: '/socios'})
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

const createImage = (file) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    img.value = e.target.result;
  };
  reader.readAsDataURL(file);
}

const onFileChange = (file) => {
  if (!file) {
    return;
  }
  if (typeof file == "object") {
    createImage(file);
  } else {
    img.value = file;
  }
}
</script>

