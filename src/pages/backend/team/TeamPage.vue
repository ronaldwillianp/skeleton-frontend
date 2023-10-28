<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="Directivos"
      :rows="directivos"
      :columns="columns"
      row-key="id"
      :pagination-label="getPaginationLabel"
      :loading-label="textInfo.loadingLabel"
      :rows-per-page-label="textInfo.rowPerPageLabel"
      :no-data-label="textInfo.noDatalabel"
      :loading="isLoading"
    >
      <template v-slot:top-right>
        <q-btn class="bg-primary text-white" @click="$router.push({path:'/add-directivo'})">
          <q-icon name="add"></q-icon>
          Agregar
        </q-btn>
      </template>

      <template v-slot:body-cell-imagen="props">
        <q-td :props="props">
          <q-avatar square>
            <q-img :src="props.row.imagen" style="height: 50px; max-width: 195px"/>
          </q-avatar>
        </q-td>
      </template>

       <template v-slot:body-cell-biografia="props">
        <td>
          <div class="tw-w-52 ellipsis">{{ props.row.biografia }}</div>
        </td>
      </template>

      <template v-slot:body-cell-opciones="props">
        <q-td :props="props">
          <div>
            <q-btn class="q-ma-sm bg-primary text-white" @click="$router.push({path:'/edit-directivo/' + props.row.id})">
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
    <DeleteDialog :is-open="isOpenDelete" @delete="deleteDirectivo" @closeDialog="isOpenDelete = false"/>
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
  {name: 'imagen', align: 'left', label: 'Imagen', field: 'imagen', sortable: true},
  {name: 'prioridad', align: 'left', label: 'Prioridad', field: 'prioridad', sortable: true},
  {name: 'nombre_completo', align: 'left', label: 'Nombre Completo', field: 'nombre_completo', sortable: true},
  {name: 'cargo', align: 'left', label: 'Cargo', field: 'cargo', sortable: true},
  {name: 'biografia', align: 'left', label: 'Biografía', field: 'biografia', sortable: true},
  {name: 'opciones', align: 'left', label: 'Opciones', field: 'opciones', sortable: false},
]

const isLoading = ref(false)
const isOpenDelete = ref(false)
const directivos = ref([])
const deleteDirectivosId = ref([])
const $q = useQuasar()

onMounted(() => {
  getDirectivos()
})

const checkDelete = (row) => {
  deleteDirectivosId.value = row
  isOpenDelete.value = true
}

const getDirectivos = () => {
  isLoading.value = true
  api.get(`/empresa/directivo/`).then(response => {
    isLoading.value = false
    directivos.value = response.data
  })
}

const deleteDirectivo = () => {
  api.delete('/empresa/directivo/' + deleteDirectivosId.value.id + '/').then(response => {
    $q.notify({
      type: 'positive',
      message: 'Directivo eliminado correctamente.',
      position: 'top-right',
      progress: true,
    })
    isOpenDelete.value = false
    getDirectivos()
  }).catch(error => {
    if (error.response.status === 404) {
      $q.notify({
        type: 'negative',
        message: 'Directivo no encontrado en la Base de Datos. Contacte con el Administrador del sistema.',
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
