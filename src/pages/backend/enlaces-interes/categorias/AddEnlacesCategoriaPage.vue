<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6">
        Agregar Categoría de Enlace
      </q-card-section>
      <q-card-section>
        <q-form @submit="storeEnlacesCategoria">
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
            <div class="col-xs-12 col-sm-6">
              <q-select outlined v-model="selectEnlace" transition-show="jump-up"
                        transition-hide="jump-up" label="Seleccione un enlace" option-value="id"
                        option-label="nombre"
                        :options="enlaces"  multiple
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
            @click="$router.push({path:'/enlaces-categorias'})"
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
import rules from '../../../../utils/rules'

const $q = useQuasar()
const router = useRouter()
const enlaces = ref([])
const selectEnlace = ref(null)

const form = ref({
  nombre: '',
  descripcion: '',
  enlaces: []
})

onMounted(() => {
  getEnlaces()
})

const storeEnlacesCategoria = () => {

  const formEnlacesCategorias = {
    nombre: form.value.nombre,
    descripcion: form.value.descripcion,
    enlaces: selectEnlace.value
  }

  api.post('/social/categoria_enlace_interes/', formEnlacesCategorias)
    .then(response => {
      $q.notify({
        type: 'positive',
        message: 'Categoría deEnlace creado correctamente.',
        position: 'top-right',
        progress: true,
      })

      router.push({path: '/enlaces-categorias'})
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

const getEnlaces = () => {
  api.get('/social/enlace_interes/')
    .then(response => {
      enlaces.value = response.data
    })
    .catch(error => console.log(error))
}
</script>

