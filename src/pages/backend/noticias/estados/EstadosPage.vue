<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="Estados"
      :rows="estados"
      :columns="columns"
      row-key="id"
      :pagination-label="getPaginationLabel"
      :loading-label="textInfo.loadingLabel"
      :rows-per-page-label="textInfo.rowPerPageLabel"
      :no-data-label="textInfo.noDatalabel"
      :loading="isLoading"
    >
      <template v-slot:body-cell-descripcion="props">
        <td>
          <div class="tw-w-60 ellipsis">{{ props.row.descripcion }}</div>
        </td>
      </template>
      <template v-slot:top-right>
        <q-btn class="bg-primary text-white" @click="$router.push({path:'/add-estado'})">
          <q-icon name="add"></q-icon>
          Agregar
        </q-btn>
      </template>

      <template v-slot:body-cell-opciones="props">
        <q-td :props="props">
          <div>
            <q-btn class="q-ma-sm bg-primary text-white" @click="$router.push({path:'/edit-estado/' + props.row.id})">
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
    <DeleteDialog :is-open="isOpenDelete" @delete="deleteEstado" @closeDialog="isOpenDelete = false"/>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useQuasar} from "quasar";
import {api} from "boot/axios";
import {onMounted} from "vue";
import useTable from '../../../../composables/useTable'
import dayjs from 'dayjs';
import DeleteDialog from "components/DeleteDialog.vue";

const {
  getPaginationLabel,
  textInfo
} = useTable()

const columns = [
  {name: 'nombre', align: 'left', label: 'Nombre', field: 'nombre', sortable: true},
  {name: 'descripción', align: 'left', label: 'Descripción', field: 'descripcion', sortable: true},
  {name: 'opciones', align: 'left', label: 'Opciones', field: 'opciones', sortable: false},
]

const isLoading = ref(false)
const isOpenDelete = ref(false)
const estados = ref([])
const deleteEstadoId = ref([])
const $q = useQuasar()

onMounted(() => {
  getEstados()
})

const checkDelete = (row) => {
  deleteEstadoId.value = row
  isOpenDelete.value = true
}

const getEstados = () => {
  isLoading.value = true
  api.get(`/social/estado_noticia/`).then(response => {
    isLoading.value = false
    estados.value = response.data
  })
}

const deleteEstado = () => {
  api.delete('/social/estado_noticia/' + deleteEstadoId.value.id + '/').then(response => {
    $q.notify({
      type: 'positive',
      message: 'Estado eliminado correctamente.',
      position: 'top-right',
      progress: true,
    })
      isOpenDelete.value = false
    getEstados()
  }).catch(error => {
    if (error.response.status === 404) {
      $q.notify({
        type: 'negative',
        message: 'Estado no encontrado en la Base de Datos. Contacte con el Administrador del sistema.',
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
