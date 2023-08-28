<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="column ">
          <div class="row">
            <q-card square class="shadow-24" style="width:400px;height:440px;">
              <q-card-section class="bg-deep-purple-7">
                <h4 class="text-h5 text-white q-my-md">Alta Gama S.R.L.</h4>

              </q-card-section>
              <q-card-section>
                <!--                <q-img-->
                <!--                  src="~assets/factura.png"-->
                <!--                  style="top: 0; right: -10px; transform: translateY(-50%); max-width: 200px"-->
                <!--                  class="absolute"-->
                <!--                >-->
                <!--                </q-img>-->
                <q-form @submit.prevent="user.logIn(userForm)"
                        class="q-gutter-xs col-xs-12 col-sm-12 col-md-6 q-mt-lg q-pa-sm"
                >
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

                  <br>

                  <q-input
                    outlined
                    type="password"
                    v-model="userForm.password"
                    label="Contraseña"
                    lazy-rules
                    :rules="[
            val => val && val.length > 0 || 'Este campo es obligatorio',
            ]"
                  >
                    <template v-slot:append>
                      <q-icon name="password"/>
                    </template>
                  </q-input>


                  <q-btn
                    type="submit"
                    size="lg"
                    color="secondary"
                    class="full-width text-white q-ma-lg" label="Entrar"/>
                </q-form>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import {defineComponent, ref} from 'vue'
import {useQuasar} from "quasar";
import {UserStore} from "stores/user-store";

const $q = useQuasar()
const userForm = ref({
  username: "",
  password: "",
})

const user = UserStore()
</script>
