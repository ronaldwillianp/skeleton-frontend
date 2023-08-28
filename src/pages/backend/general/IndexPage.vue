<template>
  <q-page class="flex flex-center">
    Datos:
    {{useConfiguracionAdministracion.configuracionAdministracion}}
  </q-page>
</template>

<script setup>
import {UserStore} from "stores/user-store";
import {ConfiguracionAdministracionStore} from "stores/configuracion-administracion";

const user = UserStore()
const useConfiguracionAdministracion = ConfiguracionAdministracionStore()


</script>
