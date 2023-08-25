<template>
  <section class="tw-text-gray-600 md:tw-px-16">
    <div
      class="tw-container tw-mx-auto tw-flex tw-px-2 tw-py-20 md:tw-py-24 tw-transition-all md:tw-flex-row tw-flex-col tw-items-center md:tw-items-start">
      <!--Image-->
      <div class="lg:tw-max-w-lg md:tw-w-2xl tw-w-5/6 tw-mb-10">
        <img class="tw-object-cover tw-object-center tw-rounded" alt="hero" src="https://dummyimage.com/720x600">
      </div>
      <!--Info Company-->
      <div
        class="tw-px-8 lg:tw-flex-grow lg:tw-pl-22 md:tw-pl-16 md:tw-text-left md:tw-items-start">
        <h1 class="sm:tw-text-4xl tw-text-3xl tw-mb-4 tw-font-medium tw-text-gray-900 tw-transition-all">
          {{ empresas[0]?.slogan }}
        </h1>
        <p class="tw-mb-5 tw-leading-relaxed tw-text-gray-600">{{ empresas[0]?.resumen }}</p>
        <div class="tw-mt-5 md:tw-mt-8 tw-flex tw-flex-col tw-gap-y-3">
          <div class="tw-flex tw-items-center tw-gap-x-2">
            <q-icon name="location_on" size="29px"></q-icon>
            <div class="tw-text-base">{{ empresas[0]?.direccion }}</div>
          </div>
          <div class="tw-flex tw-items-center tw-gap-x-2">
            <q-icon name="mail" size="29px"></q-icon>
            <div class="tw-text-base">{{ empresas[0]?.correo }}</div>
          </div>
          <div class="tw-flex tw-items-center tw-gap-x-2">
            <q-icon name="phone" size="29px"></q-icon>
            <div class="tw-text-base">{{ empresas[0]?.telefono }}</div>
          </div>
        </div>
        <!--Social Network-->
        <div class="tw-mt-8 md:tw-mt-10 tw-flex tw-gap-x-2">
          <a target="_blank" v-if="empresas[0]?.facebook" :href="empresas[0]?.facebook">
            <q-icon name="facebook" size="30px" color="primary"></q-icon>
          </a>
          <a target="_blank" :href="empresas[0]?.youtube">
            <svg width="30px" height="30px" viewBox="0 -3 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000">

              <g id="SVGRepo_bgCarrier" stroke-width="0"/>

              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

              <g id="SVGRepo_iconCarrier"><title>youtube [#168]</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Dribbble-Light-Preview" transform="translate(-300.000000, -7442.000000)" fill="#ff0000">
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path
                        d="M251.988432,7291.58588 L251.988432,7285.97425 C253.980638,7286.91168 255.523602,7287.8172 257.348463,7288.79353 C255.843351,7289.62824 253.980638,7290.56468 251.988432,7291.58588 M263.090998,7283.18289 C262.747343,7282.73013 262.161634,7282.37809 261.538073,7282.26141 C259.705243,7281.91336 248.270974,7281.91237 246.439141,7282.26141 C245.939097,7282.35515 245.493839,7282.58153 245.111335,7282.93357 C243.49964,7284.42947 244.004664,7292.45151 244.393145,7293.75096 C244.556505,7294.31342 244.767679,7294.71931 245.033639,7294.98558 C245.376298,7295.33761 245.845463,7295.57995 246.384355,7295.68865 C247.893451,7296.0008 255.668037,7296.17532 261.506198,7295.73552 C262.044094,7295.64178 262.520231,7295.39147 262.895762,7295.02447 C264.385932,7293.53455 264.28433,7285.06174 263.090998,7283.18289"
                        id="youtube-[#168]"></path>
                    </g>
                  </g>
                </g>
              </g>

            </svg>
          </a>
        </div>
        <button
          class="tw-flex md:tw-flex tw-mt-10 tw-items-center tw-px-4 tw-py-2 tw-font-medium tw-tracking-wide tw-text-white tw-capitalize tw-transition-colors tw-duration-300 tw-transform tw-bg-gray-900 tw-rounded-lg hover:tw-bg-gray-700 focus:tw-outline-none focus:tw-ring focus:tw-ring-blue-300 focus:tw-ring-opacity-80">
          <span class="tw-mx-1">Saber más</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="tw-w-6 tw-h-6 tw-mx-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>
          </svg>

        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import {api} from "boot/axios";
import {computed, onMounted, ref} from "vue";

const empresas = ref([])

onMounted(() => {
  getEmpresa()
})

const hasSocialNetwok = computed((social) => {
  return social ? 'tw-flex' : 'tw-hidden'
})
const getEmpresa = () => {
  api.get('/empresa/empresa/')
    .then(response => {
      empresas.value = response.data
      console.log(empresas.value)
    })
    .catch(error => console.log(error))
}
</script>

