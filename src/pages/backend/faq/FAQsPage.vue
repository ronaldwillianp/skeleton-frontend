<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="FAQs"
      :rows="faqs"
      :columns="columns"
      row-key="id"
      :pagination-label="getPaginationLabel"
      :loading-label="textInfo.loadingLabel"
      :rows-per-page-label="textInfo.rowPerPageLabel"
      :no-data-label="textInfo.noDatalabel"
      :loading="isLoading"
    >
      <template v-slot:body-cell-pregunta="props">
        <td>
          <div class="tw-w-44 ellipsis">{{ props.row.pregunta }}</div>
        </td>
      </template>
      <template v-slot:body-cell-respuesta="props">
        <td>
          <div class="tw-w-60 ellipsis">{{ props.row.respuesta }}</div>
        </td>
      </template>
       <template v-slot:body-cell-fecha_creacion="props">
        <td>
          <div>{{ formatDate(props.row.fecha_creacion) }}</div>
        </td>
      </template>
      <template v-slot:top-right>
        <q-btn class="bg-primary text-white" @click="$router.push({path:'/add-faq'})">
          <q-icon name="add"></q-icon>
          Agregar
        </q-btn>
      </template>

      <template v-slot:body-cell-opciones="props">
        <q-td :props="props">
          <div>
            <q-btn class="q-ma-sm bg-primary text-white" @click="showFaqItem(props.row)">
              <q-icon name="visibility" class=""></q-icon>
            </q-btn>
            <q-btn class="q-ma-sm bg-primary text-white" @click="$router.push({path:'/edit-faq/' + props.row.id})">
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
    <DeleteDialog :is-open="isOpenDelete" @delete="deleteFaq" @closeDialog="isOpenDelete = false"/>
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
  {name: 'pregunta', align: 'left', label: 'Pregunta', field: 'pregunta', sortable: true},
  {name: 'respuesta', align: 'left', label: 'Respuesta', field: 'respuesta', sortable: true},
  {name: 'fecha_creacion', align: 'left', label: 'Fecha Creación', field: 'fecha_creacion', sortable: true},
  {name: 'opciones', align: 'left', label: 'Opciones', field: 'opciones', sortable: false},
]

const isLoading = ref(false)
const isOpenDelete = ref(false)
const faqs = ref([])
const deleteFaqId = ref([])
const $q = useQuasar()

onMounted(() => {
  getFaq()
})

function formatDate(date) {
  return dayjs(date).format('YYYY-MM-DD - HH:mm')
}

const checkDelete = (row) => {
  deleteFaqId.value = row
  isOpenDelete.value = true
}

const getFaq = () => {
  isLoading.value = true
  api.get(`/social/faq/`).then(response => {
    isLoading.value = false
    faqs.value = response.data
  })
}

const deleteFaq = () => {
  api.delete('/social/faq/' + deleteFaqId.value.id + '/').then(response => {
    $q.notify({
      type: 'positive',
      message: 'Faq eliminada correctamente.',
      position: 'top-right',
      progress: true,
    })
      isOpenDelete.value = false
    getFaq()
  }).catch(error => {
    if (error.response.status === 404) {
      $q.notify({
        type: 'negative',
        message: 'Faq no encontrada en la Base de Datos. Contacte con el Administrador del sistema.',
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
