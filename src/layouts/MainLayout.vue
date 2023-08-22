<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer"/>

        <q-toolbar-title>
          <span @click="router.push({path: '/'})">E.R.P. Skeleton</span>
        </q-toolbar-title>


        <q-avatar size="40px">
          <img src="../assets/quasar-logo-vertical.svg">

          <q-menu>
            <q-list dense style="min-width: 100px">
              <q-item clickable v-close-popup @click="router.push({path: '/profile'})">
                <q-item-section>Perfil</q-item-section>
                <q-item-section side>
                  <q-icon name="account_circle"/>
                </q-item-section>
              </q-item>
              <q-separator/>
              <q-item clickable>
                <q-item-section>Preferences</q-item-section>
                <q-item-section side>
                  <q-icon name="settings"/>
                </q-item-section>

                <q-menu anchor="top end" self="top start">
                  <q-list>
                    <q-item
                      v-for="n in 3"
                      :key="n"
                      dense
                      clickable
                    >
                      <q-item-section>Submenu Label</q-item-section>
                      <q-item-section side>
                        <q-icon name="keyboard_arrow_right"/>
                      </q-item-section>
                      <q-menu auto-close anchor="top end" self="top start">
                        <q-list>
                          <q-item
                            v-for="n in 3"
                            :key="n"
                            dense
                            clickable
                          >
                            <q-item-section>3rd level Label</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-item>
                  </q-list>
                </q-menu>

              </q-item>
              <q-separator/>
              <q-item clickable v-close-popup @click="useUserStore.logout()">
                <q-item-section>Salir</q-item-section>
                <q-item-section side>
                  <q-icon name="logout"/>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-avatar>


      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <!-- drawer content -->

      <q-scroll-area class="fit">
        <q-list>
          <div v-for="(menuItem, index) in menuList" :key="index">
            <q-item v-if="menuItem.groups.some(item=>useUserStore.user.groups.includes(item))" clickable
                    active-class="text-primary" exact v-ripple :to="menuItem.path">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon"/>
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </q-scroll-area>

    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" elevated>
      <!-- drawer content -->
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList2" :key="index">
            <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon"/>
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator"/>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <router-view/>
      </q-page>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>

        <q-toolbar-title>

        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer"/>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup>
import {ref} from 'vue'
import {UserStore} from "stores/user-store";
import {useRouter} from "vue-router";


const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)
const useUserStore = UserStore()
const router = useRouter()
const menuList = [
  {
    icon: 'home',
    label: 'Inicio',
    separator: true,
    path: '/administracion',
    groups: ['Administrador', 'Moderador', 'Consultor']
  },
  {
    icon: 'web',
    label: 'Página Web',
    separator: true,
    path: '/',
    groups: ['Administrador', 'Moderador', 'Consultor']
  },
  {
    icon: 'manage_accounts',
    label: 'Usuarios',
    separator: false,
    path: '/users',
    groups: ['Administrador']
  },
  {
    icon: 'house',
    label: 'Empresas',
    separator: false,
    path: '/empresas',
    groups: ['Administrador']
  },
  {
    icon: 'delete',
    label: 'Trash',
    separator: false,
    groups: []
  },
  {
    icon: 'error',
    label: 'Spam',
    separator: true,
    groups: []
  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false,
    groups: []
  },
  {
    icon: 'feedback',
    label: 'Send Feedback',
    separator: false,
    groups: []
  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
    separator: false,
    groups: []
  }
]

const menuList2 = [
  {
    icon: 'home',
    label: 'Inicio',
    separator: false
  },
  {
    icon: 'send',
    label: 'Outbox',
    separator: false
  },
  {
    icon: 'delete',
    label: 'Trash',
    separator: false
  },
  {
    icon: 'error',
    label: 'Spam',
    separator: true
  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false
  },
  {
    icon: 'feedback',
    label: 'Send Feedback',
    separator: false
  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
    separator: false
  }
]

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

</script>
