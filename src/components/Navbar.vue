<template>
  <q-header elevated
            :style="'background-color: ' + useConfiguracionAdministracion.configuracionAdministracion.navbar_color_default">
    <q-toolbar>
      <!--        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer"/>-->
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

</template>

<script setup>

</script>
