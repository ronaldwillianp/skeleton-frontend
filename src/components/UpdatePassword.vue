<template>
  <q-form @submit.prevent="updatePassword">
    <q-input type="password" outlined v-model="userForm.password" label="Password" dense class="q-mt-sm" :rules="[val => val && val.length > 0 || 'Este campo es obligatorio', val => val && val.length > 7 || 'Minimo 8 caracteres']" />
    <q-input type="password" outlined v-model="userForm.password2" label="Repeat Password" dense class="q-mt-sm" :rules="[val => val && val.length > 0 || 'Este campo es obligatorio', val => val && val.length > 7 || 'Minimo 8 caracteres', val => val==userForm.password || 'Las contraseñas no son iguales']"/>
    <slot></slot>
    <q-btn label="Guardar" color="primary" type="submit" class="q-mt-md"></q-btn>
  </q-form>
</template>

<script setup>
import {UserStore} from "stores/user-store";
import {useQuasar} from "quasar";
import {api} from "boot/axios";
import {ref} from 'vue'

const useUserStore = UserStore()
const $q = useQuasar()

const props = defineProps({
  id: {
    type:Number,
    default: null
  },
})

const emit =defineEmits(['passwordUpdated'])

const userForm = ref({
  'id': props.id,
  'password': '',
  'password2': '',
})

const resetForm = () =>{
  userForm.value.user = useUserStore.user
  userForm.value.password = ''
  userForm.value.password2 = ''
}

const updatePassword = () => {
  api.post('http://127.0.0.1:8000/api/v1.0/administracion/user/update_password/', userForm.value).then(response => {
    if (response.data.status === 500) {
      $q.notify({
        type: 'negative',
        message: response.data.message,
        position: 'top-right',
        progress: true,
      })
    } else {
      $q.notify({
        type: 'positive',
        message: response.data.message,
        position: 'top-right',
        progress: true,
      })
      emit('passwordUpdated')
    }
    resetForm()
  }).catch(error => {
    $q.notify({
      type: 'negative',
      message: error.message,
      position: 'top-right',
      progress: true,
    })
  })
}

</script>
