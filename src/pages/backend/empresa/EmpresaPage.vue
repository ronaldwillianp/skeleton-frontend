<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section class="text-center text-bold">{{ empresa.nombre }}</q-card-section>
    </q-card>
    <q-separator></q-separator>
    <pre>
    </pre>
  </div>
</template>


<script setup>
import {ref} from 'vue'
import {useQuasar} from "quasar";
import {api} from "boot/axios";
import {onMounted} from "vue";
import {UserStore} from "stores/user-store";


const empresa = ref([])
const $q = useQuasar()
const useUserStore = UserStore()

onMounted(() => {
  getEmpresa()
})
const getEmpresa = () => {

  api.get('empresa/empresa/1/').then(response => {
    empresa.value = response.data
    console.log(empresa.value)
  }).catch(error => Promise.reject(error))
}


</script>
