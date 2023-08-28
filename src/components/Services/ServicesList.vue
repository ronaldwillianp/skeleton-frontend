<template>
  <div class="tw-bg-white tw-py-24 sm:tw-py-20">
    <div class="tw-mx-auto tw-max-w-7xl tw-px-7 lg:px-8">
      <div class="tw-mx-auto tw-max-w-2xl lg:tw-text-center">
        <h2 class="tw-text-base tw-font-semibold tw-leading-7 tw-text-indigo-600">
          Servicios
        </h2>
        <p
          class="tw-mt-2 tw-text-3xl tw-font-bold tw-tracking-tight tw-text-gray-900 sm:tw-text-4xl"
        >
          Nuetro grupo empresarial ofrece diversos servicios
        </p>
        <p class="tw-mt-6 tw-text-lg tw-leading-8 tw-text-gray-600">
          Nuestras empresas están dedicadas unicamente a satisfacer todas sus
          necesidades brindando servicios de calidad y exelencia garantizadas
        </p>
      </div>
      <div class="tw-mx-auto tw-mt-16 tw-max-w-2xl sm:tw-mt-20 lg:tw-mt-22 lg:tw-max-w-4xl">
        <dl
          class="tw-grid tw-max-w-xl tw-grid-cols-1 tw-gap-x-10 tw-gap-y-10 lg:tw-max-w-none lg:tw-grid-cols-2 lg:tw-gap-y-16"
        >
          <div
            v-for="feature in features"
            :key="feature.name"
            class="tw-relative tw-pl-16"
          >
            <dt class="tw-text-base tw-font-semibold tw-leading-7 tw-text-gray-900">
              <div
                class="tw-absolute tw-left-0 tw-top-0 tw-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-lg tw-bg-indigo-600"
              >
                <component
                  :is="feature.icon"
                  class="tw-h-6 tw-w-6 tw-text-white"
                  aria-hidden="true"
                />
              </div>
              {{ feature.name }}
            </dt>
            <dd class="tw-mt-2 tw-text-base tw-leading-7 tw-text-gray-600">
              {{ feature.description }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  WrenchScrewdriverIcon,
  CogIcon,
  TruckIcon,
  BuildingOffice2Icon,
  WifiIcon,
  UsersIcon,
} from "@heroicons/vue/24/outline";

const features = [
  {
    name: "Servicios de Talleres",
    description:
      "Ser líder, de referencia y competitiva que produce y presta servicios técnicos y especializado al sector agropecuario del país con solvencia económica.",
    icon: WrenchScrewdriverIcon,
  },
  {
    name: "Servicios de Transportación de Cargas",
    description:
      "Especializados en transporte de cargas pesadas,a granel, frágil, perecedra y carga general.Contamos con un parque técnico optimo y personal calificado.Ofertamos seguridad, dinamismo en las entregas y precios preferenciales.",
    icon: TruckIcon,
  },
  {
    name: "Servicios de Obras Ingenieras",
    description:
      "Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.",
    icon: BuildingOffice2Icon,
  },
  {
    name: "Servicios TIC",
    description:
      "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
    icon: WifiIcon,
  },
  {
    name: "Servicios de Ingeniería y Proyectos",
    description:
      "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
    icon: CogIcon,
  },
  {
    name: "Servicios de Aseguramiento y Logística",
    description:
      "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
    icon: UsersIcon,
  },
];
</script>

<style scoped>

</style>
