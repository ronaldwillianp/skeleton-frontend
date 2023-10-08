<template>
  <footer class="tw-bg-primary">
    <div
      class="tw-max-w-7xl tw-px-5 tw-py-24 tw-mx-auto tw-flex md:tw-items-center lg:tw-items-start md:tw-flex-row md:tw-flex-nowrap tw-flex-wrap tw-flex-col">
      <div class="tw-w-64 tw-flex-shrink-0 md:tw-mx-0 tw-mx-auto tw-text-center md:tw-text-left">
        <a
          class="tw-flex tw-font-medium tw-items-center md:tw-justify-start tw-justify-center tw-text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round"
               stroke-linejoin="round" stroke-width="2"
               class="tw-w-10 tw-h-10 tw-text-white tw-p-2 tw-bg-indigo-500 tw-rounded-full"
               viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span class="tw-ml-3 tw-text-xl">Tailblocks</span>
        </a>
        <p class="tw-mt-2 tw-text-sm tw-text-white">Air plant banjo lyft occupy retro adaptogen indego</p>
      </div>
      <!-- Links -->
      <div
        class="tw-flex-grow tw-flex tw-flex-wrap md:tw-pl-20 -tw-mb-10 md:tw-mt-0 tw-mt-10 md:tw-text-left tw-text-center">
        <div class="lg:tw-w-1/4 md:tw-w-1/2 tw-w-full tw-px-4" v-for="link in links" :key="link.id">
          <h2 class="tw-title-font tw-font-medium tw-uppercase tw-text-white tw-tracking-widest tw-text-sm tw-mb-3">
            {{link.nombre}}</h2>
          <nav class="tw-list-none tw-mb-10">
            <li v-for="enlace in link.enlaces">
              <a class="tw-text-white hover:tw-text-gray-100">{{enlace.nombre}}</a>
            </li>
          </nav>
        </div>
      </div>

    </div>
    <div class="tw-bg-gray-900 tw-border-t tw-border-gray-800">
      <div class="tw-container tw-mx-auto tw-py-4 tw-px-5 tw-flex tw-flex-wrap tw-flex-col sm:tw-flex-row">
        <p class="tw-text-white tw-text-sm tw-text-center sm:tw-text-left">© 2023 Gelma</p>
        <span class="tw-inline-flex sm:tw-ml-auto sm:tw-mt-0 tw-mt-2 tw-justify-center sm:tw-justify-start">
        <a class="tw-text-white">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="tw-w-5 tw-h-5"
               viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
        </a>
        <a class="tw-ml-3 tw-text-white">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="tw-w-5 tw-h-5"
               viewBox="0 0 24 24">
            <path
              d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a class="tw-ml-3 tw-text-white">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
               class="tw-w-5 tw-h-5" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
        </a>
        <a class="tw-ml-3 tw-text-white">
          <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0"
               class="tw-w-5 tw-h-5" viewBox="0 0 24 24">
            <path stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
            <circle cx="4" cy="4" r="2" stroke="none"></circle>
          </svg>
        </a>
      </span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {api} from "boot/axios";
import 'src/utils/scrollReveal'

const links = ref([])

onMounted(() => {
  getNoticias()
})

const getNoticias = () => {
  api.get('/social/categoria_enlace_interes/')
    .then(response => {
      links.value = response.data
    })
    .catch(error => console.log(error))
}

</script>

<style scoped>

</style>
