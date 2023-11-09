<template>
  <div class="tw-py-18 sm:tw-py-24">
    <div
      class="tw-mx-auto tw-grid tw-max-w-7xl tw-gap-x-8 tw-gap-y-20 tw-px-6 lg:tw-px-8 xl:tw-grid-cols-3"
    >
      <div v-animate-onscroll.repeat="'animated fadeInLeft slower'" class="tw-max-w-2xl">
        <h2 class="titleServices tw-text-3xl tw-font-bold tw-tracking-tight sm:tw-text-4xl">
          Conosca a nuestros directivos
        </h2>
        <p v-animate-onscroll.repeat="'animated fadeInLeft slower delay-0.7s'"
           class="subtitle tw-mt-6 tw-text-lg tw-leading-8 tw-text-gray-600">
          Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae
          elementum enim vitae ullamcorper suspendisse.
        </p>
      </div>
      <ul
        role="tw-list"
        class="tw-grid tw-gap-x-8 tw-gap-y-12 sm:tw-grid-cols-2 sm:tw-gap-y-16 xl:tw-col-span-2"
      >
        <li v-animate-onscroll.repeat="'animated bounceIn slower delay-1s'" class="teams"
            v-for="person in directivos" :key="person.name">
          <div class=" tw-flex tw-tems-center tw-gap-x-6">
            <img class="tw-h-16 tw-w-16 tw-rounded-full" :src="person.imagen" alt=""/>
            <div>
              <h3
                class="tw-text-base tw-font-semibold tw-leading-7 tw-tracking-tight tw-text-gray-900"
              >
                {{ person.nombre_completo }}
              </h3>
              <p class="tw-text-sm tw-font-semibold tw-leading-6 tw-text-indigo-600">
                {{ person.cargo }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {api} from "boot/axios";

const directivos = ref([])

onMounted(() => {
  getDirectivos()
})

const getDirectivos = () => {
  api.get('/empresa/directivo/')
    .then(response => {
      directivos.value = response.data.sort((a, b) => a.prioridad - b.prioridad)
    })
}

// const people = [
//   {
//     prioridad: 1,
//     name: "Leslie Alexander",
//     role: "Co-Founder / CEO",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
//   {
//     prioridad: 1.5,
//     name: "Leslie Alexander",
//     role: "Co-Founder / CEO",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
//   {
//     prioridad: 2,
//     name: "Leslie Alexander",
//     role: "Co-Founder / CEO",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
//   {
//     prioridad: 3,
//     name: "Leslie Alexander",
//     role: "Co-Founder / CEO",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
//   {
//     prioridad: 4,
//     name: "Leslie Alexander",
//     role: "Co-Founder / CEO",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
//   {
//     prioridad: 5,
//     name: "Leslie Alexander",
//     role: "Co-Founder / CEO",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
// ];

</script>
