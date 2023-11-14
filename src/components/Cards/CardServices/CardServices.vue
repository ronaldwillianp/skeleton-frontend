<template>
 <div class="tw-mx-auto tw-mt-16 tw-max-w-2xl sm:tw-mt-20 lg:tw-mt-22 lg:tw-max-w-4xl">
      <div
        class="tw-grid tw-max-w-xl tw-grid-cols-1 tw-gap-x-10 tw-gap-y-10 lg:tw-max-w-none lg:tw-grid-cols-2 lg:tw-gap-y-16"
      >
        <div
          v-for="(service, index) in props.services"
          :key="service.id"
          class="tw-relative tw-pl-16"
          v-animate-onscroll.repeat="'animated fadeInDown slower'"
        >
          <div class="tw-text-base tw-font-semibold tw-leading-7 tw-text-gray-900 item">
            <div
              class="tw-absolute tw-left-0 tw-top-0 tw-flex tw-h-11 tw-w-11 tw-items-center tw-justify-center tw-rounded-lg tw-bg-primaryClaro"
            >
              <q-img :src="service.imagen" alt="Imagen no se encontrada" class="tw-h-6 tw-w-6"></q-img>
            </div>
            {{ service.nombre }}
          </div>
          <dd class="tw-mt-2 tw-text-base tw-leading-7 tw-text-gray-600 ">
            {{ service.resumen }}
          </dd>
        </div>
      </div>
    </div>
</template>

<script setup>

const props = defineProps({
  services: {
    type: Array,
    default: []
  }
})
</script>


