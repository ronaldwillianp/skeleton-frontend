<template>
  <div class="tw-mt-10 tw-bg-gray-900 tw-relative">
    <h2
      class="tw-absolute tw-top-9 tw-left-0 tw-right-0 tw-z-20 tw-text-center tw-text-lg tw-font-bold tw-leading-8 tw-text-white lg:tw-text-2xl"
    >
      Trusted by the world’s most innovative teams
    </h2>
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="white"
      navigation
      padding
      arrows
      height="300px"
      class="tw-bg-gray-900 tw-z-10"
    >
      <q-carousel-slide :name="slide.index" v-for="slide in images" :key="slide.index">
        <!--        <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">-->
        <!--          <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/mountains.jpg"/>-->
        <!--          <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/parallax1.jpg"/>-->
        <!--        </div>-->
        <div
          class="tw-mx-auto tw-mt-28 tw-mb-10 tw-grid tw-max-w-lg tw-grid-cols-4 tw-items-center tw-gap-x-8 tw-gap-y-10 sm:tw-max-w-xl sm:tw-grid-cols-6 sm:tw-gap-x-10 lg:tw-mx-0 lg:tw-max-w-none lg:tw-grid-cols-5"
        >
          <img
            v-for="img in slide.children"
            class="tw-col-span-2 tw-max-h-12 tw-w-full tw-object-contain lg:tw-col-span-1"
            :src="img.src"
            alt="Transistor"
            width="158"
            height="48"
          />
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const slide = ref(1)
const images = ref([
  {
    index: 1,
    children: [
      {id: 1, src: 'https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg'},
      {id: 2, src: 'https://tailwindui.com/img/logos/158x48/reform-logo-white.svg'},
      {id: 3, src: 'https://tailwindui.com/img/logos/158x48/tuple-logo-white.svg'},
      {id: 4, src: 'https://tailwindui.com/img/logos/158x48/savvycal-logo-white.svg'},
      {id: 5, src: 'https://tailwindui.com/img/logos/158x48/statamic-logo-white.svg'},
    ]
  },
  {
    index: 2,
    children: [
      {id: 1, src: 'https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg'},
      {id: 2, src: 'https://tailwindui.com/img/logos/158x48/reform-logo-white.svg'},
      {id: 3, src: 'https://tailwindui.com/img/logos/158x48/tuple-logo-white.svg'},
      {id: 4, src: 'https://tailwindui.com/img/logos/158x48/savvycal-logo-white.svg'},
      {id: 5, src: 'https://tailwindui.com/img/logos/158x48/statamic-logo-white.svg'},
    ]
  }
])
// const images = ref([
//   {id: 1, src: 'https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg'},
//   {id: 2, src: 'https://tailwindui.com/img/logos/158x48/reform-logo-white.svg'},
//   {id: 3, src: 'https://tailwindui.com/img/logos/158x48/tuple-logo-white.svg'},
//   {id: 4, src: 'https://tailwindui.com/img/logos/158x48/savvycal-logo-white.svg'},
//   {id: 5, src: 'https://tailwindui.com/img/logos/158x48/statamic-logo-white.svg'},
// ])
</script>

