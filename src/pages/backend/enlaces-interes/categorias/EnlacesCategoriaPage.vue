<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="Categorías de Enlace"
      :rows="categorias"
      :columns="columns"
      row-key="id"
      :pagination-label="getPaginationLabel"
      :loading-label="textInfo.loadingLabel"
      :rows-per-page-label="textInfo.rowPerPageLabel"
      :no-data-label="textInfo.noDatalabel"
      :loading="isLoading"
    >
      <template v-slot:top-right>
        <q-btn class="bg-primary text-white" @click="$router.push({path:'/add-enlaces-categorias'})">
          <q-icon name="add"></q-icon>
          Agregar
        </q-btn>
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width/>
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand"
                   :icon="props.expand ? 'remove' : 'add'"/>
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            <div v-if="col.name === 'opciones'">
              <q-btn class="q-ma-sm bg-primary text-white"
                     @click="$router.push({path:'/edit-enlaces-categorias/' + props.row.id})">
                <q-icon name="edit" class="q-mr-sm"></q-icon>
                Editar
              </q-btn>
              <q-btn class="q-ma-sm bg-negative text-white" @click="checkDelete(props.row)">
                <q-icon name="delete" class="q-mr-sm"></q-icon>
                Eliminar
              </q-btn>
            </div>
            <div v-else>
              {{ col.value }}
            </div>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <q-table
              flat bordered
              title="Enlaces"
              :rows="props.row.enlaces"
              :columns="columnsEnlaces"
              row-key="id"
              :pagination-label="getPaginationLabel"
              :loading-label="textInfo.loadingLabel"
              :rows-per-page-label="textInfo.rowPerPageLabel"
              :no-data-label="textInfo.noDatalabel"
              :loading="isLoading"
            >
              <template v-slot:body-cell-enlace="props">
                <q-td :props="props">
                  <a target="_blank" :href="props.row.enlace"
                     class="hover:tw-underline hover:tw-text-blue-500">{{ props.row.enlace }}</a>
                </q-td>
              </template>
            </q-table>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <DeleteDialog :is-open="isOpenDelete" @delete="deleteEnlacesCategorias" @closeDialog="isOpenDelete = false"/>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useQuasar} from "quasar";
import {api} from "boot/axios";
import {onMounted} from "vue";
import useTable from '../../../../composables/useTable'
import DeleteDialog from "components/DeleteDialog.vue";

const {
  getPaginationLabel,
  textInfo
} = useTable()

const columns = [
  {name: 'nombre', align: 'left', label: 'Nombre', field: 'nombre', sortable: true},
  {name: 'opciones', align: 'left', label: 'Opciones', field: 'opciones', sortable: false},
]
const columnsEnlaces = [
  {name: 'nombre', align: 'left', label: 'Nombre', field: 'nombre', sortable: true},
  {name: 'enlace', align: 'left', label: 'Enlace', field: 'enlace', sortable: true},
]

const isLoading = ref(false)
const isOpenDelete = ref(false)
const categorias = ref([])
const deleteEnlacesCategoriaId = ref([])
const $q = useQuasar()

onMounted(() => {
  getEnlacesCategorias()
})

const checkDelete = (row) => {
  deleteEnlacesCategoriaId.value = row
  isOpenDelete.value = true
}

const getEnlacesCategorias = () => {
  isLoading.value = true
  api.get(`/social/categoria_enlace_interes/`).then(response => {
    isLoading.value = false
    categorias.value = response.data
  })
}

const deleteEnlacesCategorias = () => {
  api.delete('/social/categoria_enlace_interes/' + deleteEnlacesCategoriaId.value.id + '/').then(response => {
    $q.notify({
      type: 'positive',
      message: 'Categoría de Enlace eliminado correctamente.',
      position: 'top-right',
      progress: true,
    })
    isOpenDelete.value = false
    getEnlacesCategorias()
  }).catch(error => {
    if (error.response.status === 404) {
      $q.notify({
        type: 'negative',
        message: 'Categoría de Enlace no encontrada en la Base de Datos. Contacte con el Administrador del sistema.',
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
