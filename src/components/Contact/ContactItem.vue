<template>
  <div class="tw-bg-primary tw-py-18 sm:tw-py-24 mt-10">
    <div class="tw-mx-auto tw-max-w-7xl tw-px-6 lg:tw-px-8">
      <div class="tw-text-white tw-flex-1 lg:tw-flex tw-items-center tw-justify-between">
        <div class="tw-flex tw-flex-col tw-gap-y-4 tw-max-w-3xl">
          <p class="tw-text-4xl tw-font-bold tw-tracking-tight sm:tw-text-3xl">
            Directorio de Contactos
          </p>
          <p class="tw-text-lg tw-mb-9 lg:tw-mb-0 tw-text-gray-300">
            Encuentre aquí la informacion de contacto que nececite mediante un
            sistema de targetas de presentación con nuestros filtros
            personalizados.
          </p>
        </div>
        <a
          class="tw-text-white tw-border tw-cursor-pointer tw-border-gray-100/50 tw-w-52 tw-p-3 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-gap-x-3 hover:tw-bg-gray-800 tw-transition-all"
        >
          <MagnifyingGlassIcon class="tw-w-6 tw-h-6" />
          Guía de contactos</a
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
</script>
