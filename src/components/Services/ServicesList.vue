<template>
  <div v-show="servicios.length > 0" class="tw-bg-white tw-py-24 sm:tw-py-20">
    <div class="tw-mx-auto tw-max-w-7xl tw-px-7 lg:px-8">
      <div class="tw-mx-auto tw-max-w-2xl lg:tw-text-center">
        <p
        v-animate-onscroll.repeat="'animated fadeInDown slower'"
          class="tw-mt-2 tw-text-3xl tw-font-bold tw-tracking-tight tw-text-gray-900 sm:tw-text-4xl"
        >
          Nuetro grupo empresarial ofrece diversos servicios
        </p>
        <p v-animate-onscroll.repeat="'animated fadeInDown slower delay-0.7s'" class="subtitleServices tw-mt-6 tw-text-lg tw-leading-8 tw-text-gray-600">
          Nuestras empresas están dedicadas unicamente a satisfacer todas sus
          necesidades brindando servicios de calidad y exelencia garantizadas
        </p>
      </div>
      <div class="tw-mx-auto tw-mt-16 tw-max-w-2xl sm:tw-mt-20 lg:tw-mt-22 lg:tw-max-w-4xl">
        <div
          class="tw-grid tw-max-w-xl tw-grid-cols-1 tw-gap-x-10 tw-gap-y-10 lg:tw-max-w-none lg:tw-grid-cols-2 lg:tw-gap-y-16"
        >
          <div
            v-for="(feature, index) in servicios"
            :key="feature.id"
            :data-index="index"
            class="tw-relative tw-pl-16"
            v-animate-onscroll.repeat="'animated fadeInDown slower'"
          >
            <div class="tw-text-base tw-font-semibold tw-leading-7 tw-text-gray-900 item">
              <div
                class="tw-absolute tw-left-0 tw-top-0 tw-flex tw-h-11 tw-w-11 tw-items-center tw-justify-center tw-rounded-lg tw-bg-primaryClaro"
              >
                <img :src="feature.imagen" alt="Imagen no se encontrada" class="tw-h-6 tw-w-6">
                <!--                <component-->
                <!--                  :is="feature.imagen"-->
                <!--                  class="tw-h-6 tw-w-6 tw-text-black"-->
                <!--                  aria-hidden="true"-->
                <!--                />-->
              </div>
              {{ feature.nombre }}
            </div>
            <dd class="tw-mt-2 tw-text-base tw-leading-7 tw-text-gray-600 ">
              {{ feature.resumen }}
            </dd>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {api} from "boot/axios";
const servicios = ref([])

onMounted(() => {
  getServicios()

})

const getServicios = () => {
  api.get('/empresa/servicio/')
    .then(response => {
      servicios.value = response.data
    })
    .catch(error => console.log(error))
}

</script>


<style scoped>
.services {
  position: relative;
  padding-left: 16px;
}
</style>
