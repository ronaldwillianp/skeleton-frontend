<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section class="q-table__title">
        Agregar Usuario
      </q-card-section>
      <q-card-section>
        <q-form @submit="addUser">
          <div class="row q-col-gutter-md">
            <div class="col-md-6">
              <q-input
                outlined
                v-model="userForm.first_name"
                label="Nombre"
                type="text"
                lazy-rules
                :rules="[
            val => val && val.length > 0 || 'Este campo es obligatorio',
            ]"
              >
                <template v-slot:append>
                  <q-icon name="account_circle"/>
                </template>
              </q-input>
            </div>

            <div class="col-md-6">
              <q-input
                outlined
                v-model="userForm.last_name"
                label="Apellidos"
                type="text"
                lazy-rules
                :rules="[
            val => val && val.length > 0 || 'Este campo es obligatorio',
            ]"
              >
                <template v-slot:append>
                  <q-icon name="account_circle"/>
                </template>
              </q-input>
            </div>

            <div class="col-md-6">
              <q-input
                outlined
                v-model="userForm.username"
                label="Usuario"
                type="text"
                lazy-rules
                :rules="[
            val => val && val.length > 0 || 'Este campo es obligatorio',
            ]"
              >
                <template v-slot:append>
                  <q-icon name="account_circle"/>
                </template>
              </q-input>
            </div>

            <div class="col-md-6">
              <q-input
                outlined
                v-model="userForm.email"
                label="Correo"
                type="text"
                lazy-rules
                :rules="[
            val => val && val.length > 0 || 'Este campo es obligatorio',
            ]"
              >
                <template v-slot:append>
                  <q-icon name="email"/>
                </template>
              </q-input>
            </div>

            <div class="col-md-5">
              <q-select
                outlined
                multiple
                transition-show="flip-up"
                transition-hide="flip-down"
                v-model="userForm.groups"
                :options="list_groups"
                option-label="name"
                emit-value
                map-options
                option-value="id"
                clearable
                label="Grupos"
                type="text"
              >
              </q-select>
            </div>

            <div class="col-md-5">
              <q-input
                outlined
                v-model="userForm.password"
                label="Password"
                type="password"
                lazy-rules
                :rules="[
            val => val && val.length > 0 || 'Este campo es obligatorio',
            ]"
              >
                <template v-slot:append>
                  <q-icon name="password"/>
                </template>
              </q-input>
            </div>

            <div class="col-md-2">
              <q-checkbox label="Activo" v-model="userForm.is_active"></q-checkbox>
            </div>
          </div>


          <q-btn
            @click="$router.push({path:'/users'})"
            type="button"
            color="negative"
            class="text-white q-mr-sm">
            <q-icon name="arrow_circle_left" class="q-mr-sm"></q-icon>
            Volver
          </q-btn>

          <q-btn
            @click=""
            type="submit"
            color="primary"
            class="text-white">
            <q-icon name="save" class="q-mr-sm"></q-icon>
            Guardar
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import {defineComponent, onMounted, ref} from 'vue'
import {useQuasar} from "quasar";
import {UserStore} from "stores/user-store";
import {api} from "boot/axios";
import {useRouter} from "vue-router";

export default defineComponent({
  name: 'AddUserPage',
  setup() {
    const $q = useQuasar()
    const userForm = ref({
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      email: "",
      is_active: true,
      groups: [],

    })

    const user = UserStore()
    const router = useRouter()

    const list_groups = ref([])
    const options = ref(list_groups)

    const addUser = () => {
      api.post('http://localhost:8000/api/v1.0/administracion/user/', userForm.value)
        .then(response => {
          $q.notify({
            type: 'positive',
            message: 'Usuario creado correctamente.',
            position: 'top-right',
            progress: true,
          })
          router.push({path: '/users'})
        })
        .catch(error => {
          if (error.response.data) {
            for (let i in error.response.data) {
              $q.notify({
                type: 'negative',
                message: error.response.data[i],
                position: 'top-right',
                progress: true,
              })
            }
          } else {
            $q.notify({
              type: 'negative',
              message: error.response,
              position: 'top-right',
              progress: true,
            })
          }

        })
    }

    const getGroups = () => {
      api.get('http://127.0.0.1:8000/api/v1.0/administracion/group/').then(response => {
        list_groups.value = response.data
      })
    }

    onMounted(() => {
      getGroups()
    })

    return {
      user,
      userForm,
      addUser,
      getGroups,
      list_groups,
    }
  }
})

</script>

<style scoped>

</style>
