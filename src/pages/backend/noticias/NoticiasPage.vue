<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="Noticias"
      :rows="noticias"
      :columns="columns"
      row-key="id"
      :pagination-label="getPaginationLabel"
      :loading-label="textInfo.loadingLabel"
      :rows-per-page-label="textInfo.rowPerPageLabel"
      :no-data-label="textInfo.noDatalabel"
      :loading="isLoading"
    >
      <template v-slot:body-cell-titulo="props">
        <td>
          <div class="tw-w-58 ellipsis">{{ props.row.titulo }}</div>
        </td>
      </template>
      <template v-slot:body-cell-descripcion="props">
        <td>
          <div class="tw-w-60 ellipsis">{{ props.row.descripcion }}</div>
        </td>
      </template>

      <template v-slot:body-cell-fecha_creacion="props">
        <td>
          <div>{{ formatDate(props.row.fecha_creacion) }}</div>
        </td>
      </template>
      <template v-slot:body-cell-fecha_modificacion="props">
        <td>
          <div>{{ formatDate(props.row.fecha_modificacion) }}</div>
        </td>
      </template>

      <template v-slot:top-right>
        <q-btn class="bg-primary text-white" @click="$router.push({path:'/add-noticia'})">
          <q-icon name="add"></q-icon>
          Agregar
        </q-btn>
      </template>

      <template v-slot:body-cell-opciones="props">
        <q-td :props="props">
          <div>
            <q-btn class="q-ma-sm bg-primary text-white" @click="checkChangePassword(props.row)">
              <q-icon name="password" class=""></q-icon>
            </q-btn>
            <q-btn class="q-ma-sm bg-primary text-white" @click="$router.push({path:'/edit-noticias/' + props.row.id})">
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
    <DeleteDialog :is-open="isOpenDelete" @delete="deleteNoticia" @closeDialog="isOpenDelete = false"/>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue'
import {useQuasar} from "quasar";
import {api} from "boot/axios";
import {onMounted} from "vue";
import useTable from '../../../composables/useTable'
import dayjs from 'dayjs';
import DeleteDialog from "components/DeleteDialog.vue";

const {
  getPaginationLabel,
  textInfo
} = useTable()

const columns = [
  {name: 'titulo', align: 'left', label: 'Títtulo', field: 'titulo', sortable: true},
  {name: 'descripcion', align: 'left', label: 'Descripción', field: 'descripcion', sortable: true},
  {name: 'fecha_creacion', align: 'left', label: 'Fecha Creación', field: 'fecha_creacion', sortable: true},
  {name: 'fecha_modificacion', align: 'left', label: 'Fecha Modificación', field: 'fecha_modificacion', sortable: true},
  {name: 'creada_por', align: 'left', label: 'Creada', field: 'creada_por', sortable: true},
  {name: 'estado', align: 'left', label: 'Estado', field: 'estado', sortable: true},
  // {name: 'categoria', align: 'left', label: 'Categoría', field: 'categoria', sortable: false},
  {name: 'opciones', align: 'left', label: 'Opciones', field: 'opciones', sortable: false},
]

const isLoading = ref(false)
const isOpenDelete = ref(false)
const noticias = ref([])
const deleteNoticiaId = ref([])
const categorias = ref([])
const estados = ref([])
const $q = useQuasar()

onMounted(() => {
  getNoticias()
  getCategorias()
  getEstadoNoticias()
})

const getNoticias = () => {
  isLoading.value = true
  api.get('/social/noticia/').then(response => {
    isLoading.value = false
    noticias.value = response.data
  }).catch(error => Promise.reject(error))
}
const checkDelete = (row) => {
  deleteNoticiaId.value = row
  isOpenDelete.value = true
}

function formatDate(date) {
  return dayjs(date).format('YYYY-MM-DD - HH:mm')
}

const getCategorias = () => {
  api.get(`/social/categoria_noticia/`).then(response => {
    categorias.value = response.data
  })
}
const getEstadoNoticias = () => {
  api.get(`/social/estado_noticia/`).then(response => {
    estados.value = response.data
  })
}
const deleteNoticia = () => {
  api.delete('/social/noticias/' + deleteNoticiaId.value.id + '/').then(response => {
    $q.notify({
      type: 'positive',
      message: 'Noticia eliminada correctamente.',
      position: 'top-right',
      progress: true,
    })
    getNoticias()
  }).catch(error => {
    if (error.response.status === 404) {
      $q.notify({
        type: 'negative',
        message: 'Noticia no encontrada en la Base de Datos. Contacte con el Administrador del sistema.',
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