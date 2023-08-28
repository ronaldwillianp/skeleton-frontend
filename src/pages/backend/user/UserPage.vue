<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="Usuarios"
      :rows="user_list"
      :columns="columns"
      row-key="id"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
      :pagination-label="getPaginationLabel"
      :loading-label="textInfo.loadingLabel"
      :rows-per-page-label="textInfo.rowPerPageLabel"
      :no-data-label="textInfo.noDatalabel"
      :loading="isLoading"
    >
      <template v-slot:top-right>
        <q-btn class="bg-negative text-white q-mr-md" v-if="selected.length>0"
               @click="deleteUserTransaction">
          <q-icon name="delete"></q-icon>
          Eliminar {{ selected.length }} Elementos
        </q-btn>

        <q-btn class="bg-primary text-white" @click="$router.push({path:'/add-user'})">
          <q-icon name="add"></q-icon>
          Agregar
        </q-btn>

      </template>
      <template v-slot:body-cell-groups_d="props">
        <q-td :props="props">
          <div v-for="item in props.row.groups_d">
            <q-badge>{{ item.name }}</q-badge>
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-is_active="props">
        <q-td :props="props">
          <div>
            <q-icon v-if="props.row.is_active" name="check"></q-icon>
            <q-icon v-else name="cancel"></q-icon>
          </div>
        </q-td>
      </template>


      <template v-slot:body-cell-opciones="props">
        <q-td :props="props">
          <div>

            <q-btn class="q-ma-sm bg-primary text-white" @click="checkChangePassword(props.row)">
              <q-icon name="password" class=""></q-icon>
            </q-btn>
            <q-btn class="q-ma-sm bg-primary text-white" @click="$router.push({path:'/edit-user/' + props.row.id})">
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


    <!--    <div class="q-mt-md">-->
    <!--      Selected: {{ JSON.stringify(selected) }}-->
    <!--    </div>-->
  </div>

  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="person_off" color="negative" text-color="white"/>
        <span class="q-ml-sm">Esta a punto de eliminar al usuario: {{ dialogUser.username }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" @click="deleteId=''" v-close-popup/>
        <q-btn flat label="Eliminar" color="primary" @click="deleteUser" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="dialogChangePassword">
    <q-card style="width: 500px">
      <q-card-section class="q-table__title">
        Cambiar Contraseña
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <UpdatePassword :id="dialogUser.id" @passwordUpdated="dialogChangePassword=false">
          <slot>
            <q-btn label="Cancelar" v-close-popup color="negative" type="button" class="q-mt-md q-mr-sm"></q-btn>
          </slot>
        </UpdatePassword>
      </q-card-section>

    </q-card>
  </q-dialog>

</template>

<script setup>
import {ref} from 'vue'
import {useQuasar} from "quasar";
import {api} from "boot/axios";
import {onMounted} from "vue";
import {UserStore} from "stores/user-store";
import UpdatePassword from "components/UpdatePassword.vue";
import useTable from '../../../composables/useTable'

const {
  getPaginationLabel,
  textInfo
} = useTable()

const columns = [
  {name: 'username', align: 'left', label: 'Usuario', field: 'username', sortable: true},
  {name: 'first_name', align: 'left', label: 'Nombre', field: 'first_name', sortable: true},
  {name: 'last_name', align: 'left', label: 'Apellidos(s)', field: 'last_name', sortable: true},
  {name: 'email', align: 'left', label: 'Correo', field: 'email', sortable: true},
  {name: 'is_active', align: 'left', label: 'Activo', field: 'is_active', sortable: true},
  {name: 'groups_d', align: 'left', label: 'Grupos', field: 'groups_d', sortable: false},
  {name: 'opciones', align: 'left', label: 'Opciones', field: 'opciones', sortable: false},
]

const isLoading = ref(false)
const selected = ref([])
const user_list = ref([])
const confirm = ref(false)
const dialogUser = ref()
const dialogChangePassword = ref(false)
const $q = useQuasar()
const useUserStore = UserStore()
const getSelectedString = () => {
  return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${user_list.value.length}`
}

onMounted(() => {
  getUser()
})
const getUser = () => {
  isLoading.value = true
  api.get('administracion/user/').then(response => {
    user_list.value = response.data
    isLoading.value = false
    response.data.filter(i => {
      if (i.username == useUserStore.user.username) {
        user_list.value.splice(user_list.value.indexOf(i), 1)
      }
    })
  }).catch(error => Promise.reject(error))
}
const checkDelete = (row) => {
  dialogUser.value = row
  confirm.value = true
}
const deleteUser = () => {
  api.delete('/administracion/user/' + dialogUser.value.id + '/').then(response => {
    $q.notify({
      type: 'positive',
      message: 'Usuario eliminado correctamente.',
      position: 'top-right',
      progress: true,
    })
    getUser()
  }).catch(error => {
    if (error.response.status === 404) {
      $q.notify({
        type: 'negative',
        message: 'Usuario no encontrado en la Base de Datos. Contacte con el Administrador del sistema.',
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

const deleteUserTransaction = () => {
  api.post('http://127.0.0.1:8000/api/v1.0/administracion/user/delete_user_list/', selected.value).then(response => {

    for (let i in response.data.deleted_users) {
      $q.notify({
        type: 'positive',
        message: 'El usuario: ' + response.data.deleted_users[i].username + ' ha sido eliminado.',
        position: 'top-right',
        progress: true,
      })
    }
    $q.notify({
      type: 'positive',
      message: 'Usuarios eliminados correctamente.',
      position: 'top-right',
      progress: true,
    })
    getUser()
    selected.value = []
  }).catch(error => {
    $q.notify({
      type: 'negative',
      message: error.message + '. ' + 'Status: ' + error.status + '.',
      position: 'top-right',
      progress: true,
    })
  })
}

const checkChangePassword = (row) => {
  dialogUser.value = row
  dialogChangePassword.value = true
}

</script>
