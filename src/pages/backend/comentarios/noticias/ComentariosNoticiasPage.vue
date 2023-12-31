<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="Comentarios de Noticias"
      :rows="comentariosNoticias"
      :columns="columns"
      row-key="id"
      :pagination-label="getPaginationLabel"
      :loading-label="textInfo.loadingLabel"
      :rows-per-page-label="textInfo.rowPerPageLabel"
      :no-data-label="textInfo.noDatalabel"
      :loading="isLoading"
    >
      <template v-slot:body-cell-comentario="props">
        <td>
          <div class="tw-w-56 ellipsis">{{ props.row.comentario }}</div>
        </td>
      </template>
      <template v-slot:body-cell-noticia_info="props">
        <td>
          <div>{{ props.row.noticia_info.titulo }}</div>
        </td>
      </template>
      <template v-slot:body-cell-estado_info="props">
        <td>
          <div>{{ props.row.estado_info.nombre }}</div>
        </td>
      </template>
      <template v-slot:body-cell-creada_por_info="props">
        <td>
          <div>{{ props.row.creada_por_info?.username }}</div>
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
        <q-btn class="bg-primary text-white" @click="$router.push({path:'/add-comentario-noticia'})">
          <q-icon name="add"></q-icon>
          Agregar
        </q-btn>
      </template>

      <template v-slot:body-cell-opciones="props">
        <q-td :props="props">
          <div>
            <q-btn class="q-ma-sm bg-primary text-white"
                   @click="showInfoComentarioNoticiaItem(props.row)">
              <q-icon name="visibility" class="q-mr-sm"></q-icon>
              Ver
            </q-btn>
            <q-btn class="q-ma-sm bg-primary text-white"
                   @click="$router.push({path:'/edit-comentario-noticia/' + props.row.id})">
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

    <q-dialog v-model="isOpenComentarioNoticiaItem">
      <q-card>
        <q-card-section class="tw-border-b">
          <div class="tw-text-xl tw-font-semibold tw-mb-2">Comentario</div>
          <div class="tw-text-md tw-text-gray-700">
            {{ comentariosNoticiasInfo.comentario }}
          </div>
        </q-card-section>
        <div class="tw-text-xl tw-font-semibold tw-my-3 q-px-md">Noticia</div>
        <q-card-section class="q-pt-sm">
          <div class="tw-text-lg tw-font-medium">{{ comentariosNoticiasInfo.noticia_info.titulo }}</div>
          <div class="text-subtitle2 tw-text-gray-700 tw-mt-2">
            {{comentariosNoticiasInfo.noticia_info.descripcion }}
          </div>
        </q-card-section>
        <q-card-section>
          <div class="tw-relative tw-flex tw-items-center tw-gap-x-4">
            <div>Publica por</div>
            <div class="tw-text-sm tw-leading-6">
              <p class="tw-font-semibold tw-text-gray-900">
                <a>
                  <span class="tw-absolute tw-inset-0"/>
                  {{ comentariosNoticiasInfo.creada_por_info.username }}
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
  {name: 'comentario', align: 'left', label: 'Comentario', field: 'comentario', sortable: true},
  {name: 'nombre_comentario', align: 'left', label: 'Nombre', field: 'nombre_comentario', sortable: true},
  {name: 'correo_comentario', align: 'left', label: 'Correo', field: 'correo_comentario', sortable: true},
  {name: 'noticia_info', align: 'left', label: 'Noticia', field: 'noticia_info', sortable: true},
  {name: 'estado_info', align: 'left', label: 'Estado', field: 'estado_info', sortable: true},
  {name: 'creada_por_info', align: 'left', label: 'Creado', field: 'creada_por_info', sortable: true},
  {name: 'fecha_creacion', align: 'left', label: 'Fecha Creación', field: 'fecha_creacion', sortable: true},
  {name: 'fecha_modificacion', align: 'left', label: 'Fecha Modificación', field: 'fecha_modificacion', sortable: true},
  {name: 'opciones', align: 'left', label: 'Opciones', field: 'opciones', sortable: false},
]

const isLoading = ref(false)
const isOpenDelete = ref(false)
const comentariosNoticias = ref([])
const comentariosNoticiasInfo = ref([])
const deleteComentarioNoticiaId = ref([])
const isOpenComentarioNoticiaItem = ref(false)
const $q = useQuasar()

onMounted(() => {
  getComentariosNoticias()
})

const checkDelete = (row) => {
  deleteComentarioNoticiaId.value = row
  isOpenDelete.value = true
}

const getComentariosNoticias = () => {
  isLoading.value = true
  api.get(`/social/comentario_noticia/`).then(response => {
    isLoading.value = false
    comentariosNoticias.value = response.data
    console.log(response.data)
  })
}

const deleteEstado = () => {
  api.delete('/social/comentario_noticia/' + deleteComentarioNoticiaId.value.id + '/').then(response => {
    $q.notify({
      type: 'positive',
      message: 'Comentario de Estado eliminado correctamente.',
      position: 'top-right',
      progress: true,
    })
    isOpenDelete.value = false
    getComentariosNoticias()
  }).catch(error => {
    if (error.response.status === 404) {
      $q.notify({
        type: 'negative',
        message: 'Comentario de Estado no encontrado en la Base de Datos. Contacte con el Administrador del sistema.',
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

function formatDate(date) {
  return dayjs(date).format('YYYY-MM-DD')
}

const showInfoComentarioNoticiaItem = (item) => {
  isOpenComentarioNoticiaItem.value = true
  comentariosNoticiasInfo.value = item
}
</script>
