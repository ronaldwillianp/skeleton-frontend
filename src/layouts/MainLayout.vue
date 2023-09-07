<template>
  <q-ajax-bar color="positive" size="5px"/>
  <q-layout view="hHh lpR fFf">

    <!--    <q-header elevated :style="'background-color: ' + useConfiguracionAdministracion.configuracionAdministracion.navbar_color_default">-->
    <q-header elevated>


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

    <!--Left Drawer-->
    <q-drawer :width="270" show-if-above v-model="leftDrawerOpen" side="left" class="shadow-2">
      <!-- drawer content -->
      <!--      <q-scroll-area class="fit">-->
      <q-list>
        <div v-for="(menuItem, index) in menuList" :key="index">
          <div v-if="!menuItem.children">
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
          <q-list v-else>
            <q-expansion-item
              expand-separator
              icon="newspaper"
              :label="menuItem.label"

            >
              <q-item v-for="item in menuItem.children" :to="item.path">
                <q-item-section avatar>
                  <q-icon :name="item.icon"/>
                </q-item-section>
                <q-item-section>
                  {{ item.label }}
                </q-item-section>
              </q-item>
            </q-expansion-item>
          </q-list>
        </div>
      </q-list>
      <!--      </q-scroll-area>-->

    </q-drawer>

    <!--Right Drawer-->
    <q-drawer v-model="rightDrawerOpen" side="right" elevated>
      <!-- drawer content -->
      <q-scroll-area class="fit">
        <q-list>

          <q-item clickable v-ripple @click="dialogNavbarColorDefault=true">
            <q-item-section avatar>
              <q-icon name="menu"/>
            </q-item-section>
            Menu
            <q-item-section>

            </q-item-section>
          </q-item>

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

    <q-dialog v-model="dialogNavbarColorDefault">
      <q-card style="background-color: transparent; box-shadow: none;position: relative; z-index: 10">
        <q-btn round color="primary" icon="check" style="margin-top: -15px; position: absolute; z-index: 20; "/>
        <q-color v-model="nullModel" default-value="#285de0" style="max-width: 350px; width: 250px"></q-color>
        <q-btn label="Cancelar" v-close-popup color="negative" type="button" class="q-mt-md q-mr-sm hidden"></q-btn>

      </q-card>
    </q-dialog>

  </q-layout>
</template>

<script setup>
import {ref} from 'vue'
import {UserStore} from "stores/user-store";
import {useRouter} from "vue-router";
import {ConfiguracionAdministracionStore} from "stores/configuracion-administracion";
import Navbar from "components/Navbar.vue";

const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)

const nullModel = ref(null)
const dialogNavbarColorDefault = ref(false)

const useUserStore = UserStore()
const useConfiguracionAdministracion = ConfiguracionAdministracionStore()
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
    icon: 'newspaper',
    label: 'Noticias',
    separator: false,
    path: '/noticias',
    groups: ['Administrador'],
    children: [
      {label: 'Noticias Listado', path: '/noticias'},
      {label: 'Categorias', path: '/categorias'},
      {label: 'Estados', path: '/estados'},
    ]
  },
  {
    icon: 'quiz',
    label: 'FAQs',
    separator: false,
    path: '/faqs',
    groups: ['Administrador']
  },
  {
    icon: 'link',
    label: 'Enlaces de Interes',
    separator: false,
    path: '/enlaces-interes',
    groups: ['Administrador']
  },
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
