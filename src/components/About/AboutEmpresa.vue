<template>
  <!--Example 1-->

  <!--  <div class="tw-bg-white tw-pt-14 tw-py-18 sm:tw-py-24">-->
  <!--    <div class="tw-mx-auto tw-max-w-7xl tw-px-7 lg:px-8">-->
  <!--      <div class="tw-mx-auto tw-max-w-2xl lg:tw-text-center">-->
  <!--        <p-->
  <!--          class="tw-mt-4 tw-text-3xl tw-font-semibold tw-tracking-tight tw-text-gray-900 sm:tw-text-4xl"-->
  <!--        >-->
  <!--          {{ empresas[0]?.slogan }}-->
  <!--        </p>-->
  <!--      </div>-->


  <!--      <div class="tw-grid tw-mt-20 md:tw-mt-24 tw-grid-cols-1 sm:tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-4">-->
  <!--        <div class="sm:tw-col-span-3 tw-flex tw-flex-col tw-justify-between">-->
  <!--          <div class="tw-mb-8">-->
  <!--            <div class="tw-text-4xl tw-font-medium md:tw-text-5xl">-->
  <!--              Proveemos de soluciones a varias <br>empresas de nuestro país-->
  <!--            </div>-->
  <!--            <div class="tw-text-lg tw-mt-10">-->
  <!--              {{ empresas[0]?.resumen }}-->
  <!--              <div class="tw-mt-6">-->
  <!--                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis delectus dolorum excepturi-->
  <!--                facilis fugiat illo ipsam labore magni nobis non odit quis, quod reiciendis repellat reprehenderit saepe-->
  <!--                sint soluta?-->
  <!--              </div>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          &lt;!&ndash;Contact info&ndash;&gt;-->
  <!--          <div class="tw-flex tw-flex-col tw-gap-y-4 lg:tw-gap-x-10 lg:tw-flex-row  md:items-center tw-justify-between">-->
  <!--            <div class="tw-flex tw-items-center tw-gap-x-2">-->
  <!--              <PhoneIcon class="tw-w-6 tw-h-6"/>-->
  <!--              <div class="tw-text-base">{{ empresas[0]?.telefono }}</div>-->
  <!--            </div>-->
  <!--            <div class="tw-flex tw-items-center tw-gap-x-2">-->
  <!--              <MapPinIcon class="tw-w-6 tw-h-6"/>-->
  <!--              <div class="tw-text-base">{{ empresas[0]?.direccion }}</div>-->
  <!--            </div>-->
  <!--            <div class="tw-flex tw-items-center tw-gap-x-2">-->
  <!--              <EnvelopeIcon class="tw-w-6 tw-h-6"/>-->
  <!--              <div class="tw-text-base">{{ empresas[0]?.correo }}</div>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        <div class="md:tw-border-l-2 md:tw-border-gray-200 tw-mt-5">-->
  <!--          <div class="tw-flex tw-justify-between md:tw-flex-col md:tw-px-6 lg:tw-px-20 tw-gap-y-8 md:tw-gap-y-12">-->
  <!--            <div class="tw-space-y-2">-->
  <!--              <div class="tw-text-lg md:tw-text-3xl md:tw-font-medium">Fundada</div>-->
  <!--              <div class="md:tw-text-lg">2009</div>-->
  <!--            </div>-->
  <!--            <div class="tw-space-y-2">-->
  <!--              <div class="tw-text-lg md:tw-text-3xl md:tw-font-medium">Trabajadores</div>-->
  <!--              <div class="md:tw-text-lg">4000</div>-->
  <!--            </div>-->
  <!--            <div class="tw-space-y-2">-->
  <!--              <div class="tw-text-lg md:tw-text-3xl md:tw-font-medium">Empresas</div>-->
  <!--              <div class="md:tw-text-lg">200</div>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--      <div class="tw-mt-32">-->
  <!--        <div class="tw-flex">-->
  <!--          <div-->
  <!--            class="tw-border tw-mr-20 tw-w-[490px] tw-h-[410px] tw-flex tw-items-center tw-justify-center tw-rounded-2xl">-->
  <!--            <div class="tw-bg-gray-900 tw-w-20 tw-h-20 tw-rounded-full tw-flex tw-items-center tw-justify-center">-->
  <!--              <PlayIcon class="tw-h-9 tw-w-9 tw-text-white"/>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <div class="tw-w-3/6">-->
  <!--            <div class="tw-text-3xl tw-leading-[50px] tw-italic">-->
  <!--              “Dribbble’s importance for me and my team is that it’s a central place to showcase our work as a Design-->
  <!--              Team, as individual designers as well.”-->
  <!--            </div>-->
  <!--            <div class="tw-mt-9 tw-text-xl">-->
  <!--              {{ empresas[0]?.director }}-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->

<!-- Example 2 -->
  <div class="tw-bg-white tw-pt-14 tw-py-18 sm:tw-py-24">
    <div class="tw-mx-auto tw-max-w-7xl tw-px-7 lg:px-8">
      <div class="tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 lg:gap-8 tw-gap-20 tw-items-center">
        <div class="lg:tw-col-span-6 tw-flex tw-flex-col tw-gap-6">
         <div class="tw-flex tw-flex-row tw-items-center">
           <p class="tw-font-semibold tw-tracking-widest tw-text-indigo-600 tw-pl-4">Sobre Nosotros</p>
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
    })
    .catch(error => console.log(error))
}
</script>

