<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="Enlaces"
      :rows="enlaces"
      :columns="columns"
      row-key="id"
      :pagination-label="getPaginationLabel"
      :loading-label="textInfo.loadingLabel"
      :rows-per-page-label="textInfo.rowPerPageLabel"
      :no-data-label="textInfo.noDatalabel"
      :loading="isLoading"
    >
      <template v-slot:top-right>
        <q-btn class="bg-primary text-white" @click="$router.push({path:'/add-enlaces-interes'})">
          <q-icon name="add"></q-icon>
          Agregar
        </q-btn>
      </template>

      <template v-slot:body-cell-enlace="props">
        <q-td :props="props">
          <a target="_blank" :href="props.row.enlace" class="hover:tw-underline hover:tw-text-blue-500">{{props.row.enlace}}</a>
        </q-td>
      </template>
      <template v-slot:body-cell-opciones="props">
        <q-td :props="props">
          <div>
            <q-btn class="q-ma-sm bg-primary text-white" @click="$router.push({path:'/edit-enlaces-interes/' + props.row.id})">
              <q-icon name="edit" class="q-mr-sm"></q-icon>
              Editar
            </q-btn>
            <q-btn class="q-ma-sm bg-negative text-white" @click="checkDelete(props.row)">
              <q-icon name="delete" class="q-mr-sm"></q-icon>
              Eliminar
            </q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
    <DeleteDialog :is-open="isOpenDelete" @delete="deleteEnlacesInteres" @closeDialog="isOpenDelete = false"/>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useQuasar} from "quasar";
import {api} from "boot/axios";
import {onMounted} from "vue";
import useTable from '../../../composables/useTable'
import DeleteDialog from "components/DeleteDialog.vue";
import dayjs from "dayjs";

const {
  getPaginationLabel,
  textInfo
} = useTable()

const columns = [
  {name: 'nombre', align: 'left', label: 'Nombre', field: 'nombre', sortable: true},
  {name: 'enlace', align: 'left', label: 'Enlace', field: 'enlace', sortable: true},
  {name: 'opciones', align: 'left', label: 'Opciones', field: 'opciones', sortable: false},
]

const isLoading = ref(false)
const isOpenDelete = ref(false)
const enlaces = ref([])
const deleteEnlacesInteresId = ref([])
const $q = useQuasar()

onMounted(() => {
  getEnlacesInteres()
})

const checkDelete = (row) => {
  deleteEnlacesInteresId.value = row
  isOpenDelete.value = true
}

const getEnlacesInteres = () => {
  isLoading.value = true
  api.get(`/social/enlace_interes/`).then(response => {
    isLoading.value = false
    enlaces.value = response.data
  })
}

const deleteEnlacesInteres = () => {
  api.delete('/social/enlace_interes/' + deleteEnlacesInteresId.value.id + '/').then(response => {
    $q.notify({
      type: 'positive',
      message: 'Enlace eliminado correctamente.',
      position: 'top-right',
      progress: true,
    })
      isOpenDelete.value = false
    getEnlacesInteres()
  }).catch(error => {
    if (error.response.status === 404) {
      $q.notify({
        type: 'negative',
        message: 'Enlace no encontrada en la Base de Datos. Contacte con el Administrador del sistema.',
        position: 'top-right',
        progress: true,
      })
    } else {
      $q.notify({
        type: 'negative',
        message: error.message,
        position: 'top-right',
        progress: true,
      })
    }
  })
}

</script>
