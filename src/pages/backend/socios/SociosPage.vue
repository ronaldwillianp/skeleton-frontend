<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="Socios"
      :rows="socios"
      :columns="columns"
      row-key="id"
      :pagination-label="getPaginationLabel"
      :loading-label="textInfo.loadingLabel"
      :rows-per-page-label="textInfo.rowPerPageLabel"
      :no-data-label="textInfo.noDatalabel"
      :loading="isLoading"
    >
      <template v-slot:top-right>
        <q-btn class="bg-primary text-white" @click="$router.push({path:'/add-socios'})">
          <q-icon name="add"></q-icon>
          Agregar
        </q-btn>
      </template>

      <template v-slot:body-cell-logo="props">
        <q-td :props="props">
          <q-avatar square>
            <q-img :src="props.row.logo" style="height: 50px; max-width: 195px"/>
          </q-avatar>
        </q-td>
      </template>

      <template v-slot:body-cell-web="props">
        <q-td :props="props">
          <a target="_blank" :href="props.row.web"
             class="hover:tw-underline hover:tw-text-blue">{{ props.row.web }}</a>
        </q-td>
      </template>

      <template v-slot:body-cell-opciones="props">
        <q-td :props="props">
          <div>
            <q-btn class="q-ma-sm bg-primary text-white" @click="$router.push({path:'/edit-socios/' + props.row.id})">
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
    <DeleteDialog :is-open="isOpenDelete" @delete="deleteSocio" @closeDialog="isOpenDelete = false"/>
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
  {name: 'logo', align: 'left', label: 'Logo', field: 'logo', sortable: true},
  {name: 'web', align: 'left', label: 'Dirección URL', field: 'web', sortable: true},
  {name: 'opciones', align: 'left', label: 'Opciones', field: 'opciones', sortable: false},
]

const isLoading = ref(false)
const isOpenDelete = ref(false)
const socios = ref([])
const deleteSociosId = ref([])
const $q = useQuasar()

onMounted(() => {
  getSocios()
})

const checkDelete = (row) => {
  deleteSociosId.value = row
  isOpenDelete.value = true
}

const getSocios = () => {
  isLoading.value = true
  api.get(`/empresa/socio/`).then(response => {
    isLoading.value = false
    socios.value = response.data
  })
}

const deleteSocio = () => {
  api.delete('/empresa/socio/' + deleteSociosId.value.id + '/').then(response => {
    $q.notify({
      type: 'positive',
      message: 'Socio eliminado correctamente.',
      position: 'top-right',
      progress: true,
    })
    isOpenDelete.value = false
    getSocios()
  }).catch(error => {
    if (error.response.status === 404) {
      $q.notify({
        type: 'negative',
        message: 'Socio no encontrado en la Base de Datos. Contacte con el Administrador del sistema.',
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
