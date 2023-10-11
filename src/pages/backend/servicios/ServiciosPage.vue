<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="Serviciod"
      :rows="servicios"
      :columns="columns"
      row-key="id"
      :pagination-label="getPaginationLabel"
      :loading-label="textInfo.loadingLabel"
      :rows-per-page-label="textInfo.rowPerPageLabel"
      :no-data-label="textInfo.noDatalabel"
      :loading="isLoading"
    >
      <template v-slot:top-right>
        <q-btn class="bg-primary text-white" @click="$router.push({path:'/add-servicio'})">
          <q-icon name="add"></q-icon>
          Agregar
        </q-btn>
      </template>

      <template v-slot:body-cell-resumen="props">
        <td>
          <div class="tw-w-52 ellipsis">{{ props.row.resumen }}</div>
        </td>
      </template>
      <template v-slot:body-cell-imagen="props">
        <q-td :props="props">
          <q-avatar square>
            <q-img :src="props.row.imagen" style="height: 50px; max-width: 195px"/>
          </q-avatar>
        </q-td>
      </template>

      <template v-slot:body-cell-opciones="props">
        <q-td :props="props">
          <div>
            <q-btn class="q-ma-sm bg-primary text-white" @click="$router.push({path:'/edit-servicio/' + props.row.id})">
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
    <DeleteDialog :is-open="isOpenDelete" @delete="deleteServicio" @closeDialog="isOpenDelete = false"/>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useQuasar} from "quasar";
import {api} from "boot/axios";
import {onMounted} from "vue";
import useTable from '../../../composables/useTable'
import DeleteDialog from "components/DeleteDialog.vue";

const {
  getPaginationLabel,
  textInfo
} = useTable()

const columns = [
  {name: 'nombre', align: 'left', label: 'Nombre', field: 'nombre', sortable: true},
  {name: 'imagen', align: 'left', label: 'Imagen', field: 'imagen', sortable: true},
  {name: 'resumen', align: 'left', label: 'Resumen', field: 'resumen', sortable: true},
  {name: 'opciones', align: 'left', label: 'Opciones', field: 'opciones', sortable: false},
]

const isLoading = ref(false)
const isOpenDelete = ref(false)
const servicios = ref([])
const deleteServiciosId = ref([])
const $q = useQuasar()

onMounted(() => {
  getServicios()
})

const checkDelete = (row) => {
  deleteServiciosId.value = row
  isOpenDelete.value = true
}

const getServicios = () => {
  isLoading.value = true
  api.get(`/empresa/servicio/`).then(response => {
    isLoading.value = false
    servicios.value = response.data
  })
}

const deleteServicio = () => {
  api.delete('/empresa/servicio/' + deleteServiciosId.value.id + '/').then(response => {
    $q.notify({
      type: 'positive',
      message: 'Servicio eliminado correctamente.',
      position: 'top-right',
      progress: true,
    })
    isOpenDelete.value = false
    getServicios()
  }).catch(error => {
    if (error.response.status === 404) {
      $q.notify({
        type: 'negative',
        message: 'Servicio no encontrado en la Base de Datos. Contacte con el Administrador del sistema.',
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
