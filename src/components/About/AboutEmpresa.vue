<template>
  <!--  <section class="tw-text-gray-600 md:tw-px-7 tw-mt-8 tw-border tw-border-red-500">-->
  <!--    <div-->
  <!--      class="tw-mx-auto tw-flex tw-px-7 tw-py-20 md:tw-py-24 tw-transition-all md:tw-flex-row tw-flex-col tw-items-center md:tw-items-start">-->
  <!--      <div class="tw-text-red-500 tw-text-3xl tw-medium tw-mb-8">Cambiar la section de about</div>-->
  <!--      &lt;!&ndash;Image&ndash;&gt;-->
  <!--      <div class="lg:tw-max-w-lg md:tw-w-2xl tw-w-5/6 tw-mb-10">-->
  <!--        <img class="tw-object-cover tw-object-center tw-rounded" alt="hero" src="https://dummyimage.com/720x600">-->
  <!--      </div>-->
  <!--      &lt;!&ndash;Info Company&ndash;&gt;-->
  <!--      <div-->
  <!--        class="tw-px-8 lg:tw-flex-grow lg:tw-pl-22 md:tw-pl-16 md:tw-text-left md:tw-items-start">-->
  <!--        <h1 class="sm:tw-text-4xl tw-text-3xl tw-mb-4 tw-font-medium tw-text-gray-900 tw-transition-all">-->
  <!--          {{ empresas[0]?.slogan }}-->
  <!--        </h1>-->
  <!--        <p class="tw-mb-5 tw-leading-relaxed tw-text-gray-600">{{ empresas[0]?.resumen }}</p>-->
  <!--        <div class="tw-mt-5 md:tw-mt-8 tw-flex tw-flex-col tw-gap-y-3">-->
  <!--          <div class="tw-flex tw-items-center tw-gap-x-2">-->
  <!--            <q-icon name="location_on" size="29px"></q-icon>-->
  <!--            <div class="tw-text-base">{{ empresas[0]?.direccion }}</div>-->
  <!--          </div>-->
  <!--          <div class="tw-flex tw-items-center tw-gap-x-2">-->
  <!--            <q-icon name="mail" size="29px"></q-icon>-->
  <!--            <div class="tw-text-base">{{ empresas[0]?.correo }}</div>-->
  <!--          </div>-->
  <!--          <div class="tw-flex tw-items-center tw-gap-x-2">-->
  <!--            <q-icon name="phone" size="29px"></q-icon>-->
  <!--            <div class="tw-text-base">{{ empresas[0]?.telefono }}</div>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        &lt;!&ndash;Social Network&ndash;&gt;-->
  <!--        <div class="tw-mt-8 md:tw-mt-10 tw-flex tw-gap-x-2">-->
  <!--          <a target="_blank" v-if="empresas[0]?.facebook" :href="empresas[0]?.facebook">-->
  <!--            <q-icon name="facebook" size="30px" color="primary"></q-icon>-->
  <!--          </a>-->
  <!--          <a target="_blank" :href="empresas[0]?.youtube">-->
  <!--            <svg width="30px" height="30px" viewBox="0 -3 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"-->
  <!--                 xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000">-->

  <!--              <g id="SVGRepo_bgCarrier" stroke-width="0"/>-->

  <!--              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>-->

  <!--              <g id="SVGRepo_iconCarrier"><title>youtube [#168]</title>-->
  <!--                <desc>Created with Sketch.</desc>-->
  <!--                <defs></defs>-->
  <!--                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">-->
  <!--                  <g id="Dribbble-Light-Preview" transform="translate(-300.000000, -7442.000000)" fill="#ff0000">-->
  <!--                    <g id="icons" transform="translate(56.000000, 160.000000)">-->
  <!--                      <path-->
  <!--                        d="M251.988432,7291.58588 L251.988432,7285.97425 C253.980638,7286.91168 255.523602,7287.8172 257.348463,7288.79353 C255.843351,7289.62824 253.980638,7290.56468 251.988432,7291.58588 M263.090998,7283.18289 C262.747343,7282.73013 262.161634,7282.37809 261.538073,7282.26141 C259.705243,7281.91336 248.270974,7281.91237 246.439141,7282.26141 C245.939097,7282.35515 245.493839,7282.58153 245.111335,7282.93357 C243.49964,7284.42947 244.004664,7292.45151 244.393145,7293.75096 C244.556505,7294.31342 244.767679,7294.71931 245.033639,7294.98558 C245.376298,7295.33761 245.845463,7295.57995 246.384355,7295.68865 C247.893451,7296.0008 255.668037,7296.17532 261.506198,7295.73552 C262.044094,7295.64178 262.520231,7295.39147 262.895762,7295.02447 C264.385932,7293.53455 264.28433,7285.06174 263.090998,7283.18289"-->
  <!--                        id="youtube-[#168]"></path>-->
  <!--                    </g>-->
  <!--                  </g>-->
  <!--                </g>-->
  <!--              </g>-->

  <!--            </svg>-->
  <!--          </a>-->
  <!--        </div>-->
  <!--        <button-->
  <!--          class="tw-flex md:tw-flex tw-mt-10 tw-items-center tw-px-4 tw-py-2 tw-font-medium tw-tracking-wide tw-text-white tw-capitalize tw-transition-colors tw-duration-300 tw-transform tw-bg-gray-900 tw-rounded-lg hover:tw-bg-gray-700 focus:tw-outline-none focus:tw-ring focus:tw-ring-blue-300 focus:tw-ring-opacity-80">-->
  <!--          <span class="tw-mx-1">Saber más</span>-->
  <!--          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"-->
  <!--               stroke="currentColor" class="tw-w-6 tw-h-6 tw-mx-1">-->
  <!--            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>-->
  <!--          </svg>-->

  <!--        </button>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </section>-->
  <div class="tw-bg-white tw-pt-14 tw-py-18 sm:tw-py-24">
    <div class="tw-mx-auto tw-max-w-7xl tw-px-7 lg:px-8">
      <div class="tw-mx-auto tw-max-w-2xl lg:tw-text-center">
        <div class="md:tw-flex tw-items-center tw-justify-center">
          <h2
            class="tw-text-base tw-bg-indigo-100 tw-w-34 tw-py-2.5 tw-px-3.5 tw-rounded-full tw-border tw-border-indigo-200 tw-font-semibold tw-leading-7 tw-text-indigo-600">
            Sobre Nosotros
          </h2>
        </div>
        <p
          class="tw-mt-4 tw-text-3xl tw-font-semibold tw-tracking-tight tw-text-gray-900 sm:tw-text-4xl"
        >
          {{ empresas[0]?.slogan }}
        </p>
      </div>
      <div class="tw-flex tw-justify-center tw-mt-10">
        <q-img class="tw-w-full tw-rounded-3xl" src="https://cdn.quasar.dev/img/mountains.jpg" alt="Mountains"/>
      </div>

      <div class="tw-grid tw-mt-20 md:tw-mt-24 tw-grid-cols-1 sm:tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-4">
        <div class="sm:tw-col-span-3 tw-flex tw-flex-col tw-justify-between">
          <div class="tw-mb-8">
            <div class="tw-text-4xl tw-font-medium md:tw-text-5xl">
              Proveemos de soluciones a varias <br>empresas de nuestro país
            </div>
            <div class="tw-text-lg tw-mt-10">
              {{ empresas[0]?.resumen }}
              <div class="tw-mt-6">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis delectus dolorum excepturi
                facilis fugiat illo ipsam labore magni nobis non odit quis, quod reiciendis repellat reprehenderit saepe
                sint soluta?
              </div>
            </div>
          </div>
          <!--Contact info-->
          <div class="tw-flex tw-flex-col tw-gap-y-4 lg:tw-gap-x-10 lg:tw-flex-row  md:items-center tw-justify-between">
            <div class="tw-flex tw-items-center tw-gap-x-2">
              <PhoneIcon class="tw-w-6 tw-h-6"/>
              <div class="tw-text-base">{{ empresas[0]?.telefono }}</div>
            </div>
            <div class="tw-flex tw-items-center tw-gap-x-2">
              <MapPinIcon class="tw-w-6 tw-h-6"/>
              <div class="tw-text-base">{{ empresas[0]?.direccion }}</div>
            </div>
            <div class="tw-flex tw-items-center tw-gap-x-2">
              <EnvelopeIcon class="tw-w-6 tw-h-6"/>
              <div class="tw-text-base">{{ empresas[0]?.correo }}</div>
            </div>
          </div>
        </div>
        <div class="md:tw-border-l-2 md:tw-border-gray-200 tw-mt-5">
          <div class="tw-flex tw-justify-between md:tw-flex-col md:tw-px-6 lg:tw-px-20 tw-gap-y-8 md:tw-gap-y-12">
            <div class="tw-space-y-2">
              <div class="tw-text-lg md:tw-text-3xl md:tw-font-medium">Fundada</div>
              <div class="md:tw-text-lg">2009</div>
            </div>
            <div class="tw-space-y-2">
              <div class="tw-text-lg md:tw-text-3xl md:tw-font-medium">Trabajadores</div>
              <div class="md:tw-text-lg">4000</div>
            </div>
            <div class="tw-space-y-2">
              <div class="tw-text-lg md:tw-text-3xl md:tw-font-medium">Empresas</div>
              <div class="md:tw-text-lg">200</div>
            </div>
          </div>
        </div>
      </div>
      <div class="tw-mt-32">
        <div class="tw-flex">
          <div
            class="tw-border tw-mr-20 tw-w-[490px] tw-h-[410px] tw-flex tw-items-center tw-justify-center tw-rounded-2xl">
            <div class="tw-bg-gray-900 tw-w-20 tw-h-20 tw-rounded-full tw-flex tw-items-center tw-justify-center">
              <PlayIcon class="tw-h-9 tw-w-9 tw-text-white"/>
            </div>
          </div>
          <div class="tw-w-3/6">
            <div class="tw-text-3xl tw-leading-[50px] tw-italic">
              “Dribbble’s importance for me and my team is that it’s a central place to showcase our work as a Design
              Team, as individual designers as well.”
            </div>
            <div class="tw-mt-9 tw-text-xl">
              {{ empresas[0]?.director }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {api} from "boot/axios";
import {computed, onMounted, ref} from "vue";
import {
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
} from '@heroicons/vue/24/outline'
import {
  PlayIcon
} from '@heroicons/vue/24/solid'

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

