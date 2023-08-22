<template>
  <q-page class="flex flex-center">
    Datos de Usuario Logueado:
    <br>
    Usuario: {{ user.user?.username }}
    <br>
    Email: {{ user.user?.email }}
    <br>
    Groups:
    <br>
    <q-list>
      <q-item v-for="(item, index) in administration.groups">{{ item.name }}</q-item>
    </q-list>

    <div>
    </div>
  </q-page>
</template>

<script setup>
import {defineComponent} from 'vue'
import {UserStore} from "stores/user-store";
import EssentialLink from "components/EssentialLink.vue";
import {AdministrationStore} from "stores/administration-store";

const user = UserStore()
const administration = AdministrationStore()
</script>
