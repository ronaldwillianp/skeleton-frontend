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
          <div class="tw-w-56 ellipsis">{{ props.row.titulo }}</div>
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
      <template v-slot:body-cell-creada_por_info="props">
        <td>
          <div>{{ props.row.creada_por_info.username }}</div>
        </td>
      </template>
      <template v-slot:body-cell-estado_info="props">
        <td>
          <div>{{ props.row.estado_info?.nombre }}</div>
        </td>
      </template>
      <template v-slot:body-cell-categoria_info="props">
        <td>
          <q-badge v-for="item in props.row.categoria_info" class="tw-mr-2">{{ item.nombre }}</q-badge>
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
            <q-btn class="q-ma-sm bg-primary text-white" @click="showNoticiasItem(props.row)">
              <q-icon name="visibility" class=""></q-icon>
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

    <q-dialog v-model="isOpenNoticiaItem">
      <q-card class="my-card">
        <img src="https://cdn.quasar.dev/img/mountains.jpg">
        <div class="row items-center q-mt-xs q-px-md">
          <div>{{ formatDate(noticiaItem.fecha_creacion) }}</div>
          <div class="row items-center q-ml-md">
            <div
              class="tw-rounded-full tw-text-black tw-text-sm tw-bg-gray-50 tw-px-3 tw-py-1.5 tw-font-medium tw-text-gray-600 hover:tw-bg-gray-100">
              Explosiones
            </div>
          </div>
        </div>
        <q-card-section class="q-pt-sm">
          <div class="text-h6">{{ noticiaItem.titulo }}</div>
          <div class="text-subtitle2 tw-text-gray-500 tw-mt-2">{{ noticiaItem.descripcion }}</div>
        </q-card-section>
        <q-card-section>
          <div class="tw-relative tw-flex tw-items-center tw-gap-x-4">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
              class="tw-h-10 tw-w-10 tw-rounded-full tw-bg-gray-50"
            />
            <div class="tw-text-sm tw-leading-6">
              <p class="tw-font-semibold tw-text-gray-900">
                <a>
                  <span class="tw-absolute tw-inset-0"/>
                  Usuario
                </a>
              </p>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
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
  {name: 'creada_por_info', align: 'left', label: 'Creada', field: 'creada_por_info', sortable: true},
  {name: 'estado_info', align: 'left', label: 'Estado', field: 'estado_info', sortable: true},
  {name: 'categoria_info', align: 'left', label: 'Categoría', field: 'categoria_info', sortable: false},
  {name: 'opciones', align: 'left', label: 'Opciones', field: 'opciones', sortable: false},
]

const isLoading = ref(false)
const isOpenDelete = ref(false)
const noticias = ref([])
const noticiaItem = ref([])
const isOpenNoticiaItem = ref(false)
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
  api.delete('/social/noticia/' + deleteNoticiaId.value.id + '/').then(response => {
    $q.notify({
      type: 'positive',
      message: 'Noticia eliminada correctamente.',
      position: 'top-right',
      progress: true,
    })
    isOpenDelete.value = false
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

const showNoticiasItem = (item) => {
  noticiaItem.value = item
  noticiaItem.value.fecha_creacion = dayjs(item.fecha_creacion).format('MMM D, YYYY')
  isOpenNoticiaItem.value = true
}
</script>
