<template>
  <section class="tw-bg-heroBg">
    <div class="tw-relative">
      <div
        class="tw-container tw-mx-auto tw-flex tw-px-7 md:tw-px-16 tw-py-28 md:tw-flex-row tw-flex-col tw-items-center">
        <div
          class="lg:tw-flex-grow md:tw-w-1/2 lg:tw-pr-24 md:tw-pr-16 tw-flex tw-flex-col md:tw-items-start md:tw-text-left tw-mb-16 md:tw-mb-0 tw-items-center tw-text-center">
          <h1 class="title-font sm:tw-text-4xl tw-text-3xl tw-mb-4 tw-font-bold tw-text-gray-900">Before they sold out
            <br class="tw-hidden lg:tw-inline-block">readymade gluten
          </h1>
          <p class="tw-mb-8 tw-text-base tw-leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom
            neutra air plant
            cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic
            tumeric truffaut hexagon try-hard chambray.</p>
          <div class="tw-flex tw-justify-center">
<!--            <button-->
<!--              class="tw-inline-flex tw-text-white tw-bg-primary tw-border-0 tw-py-2 tw-px-6 focus:tw-outline-none hover:tw-bg-hoverPrimary tw-rounded tw-text-lg">-->
<!--              Button-->
<!--            </button>-->
          </div>
        </div>
        <div class="lg:tw-max-w-lg lg:tw-w-full md:tw-w-1/2 tw-w-5/6">
          <img class="tw-object-cover tw-object-center tw-rounded" alt="hero" src="img/heroSection.svg">
        </div>
      </div>
      <ListSocios />
    </div>
  </section>
</template>

<script setup>
import {ref} from "vue";
import ListSocios from "components/Socios/ListSocios.vue";

// const images = ref([
//   {id: 1, src: '/img/clients/client-1.png'},
//   {id: 2, src: '/img/clients/client-2.png'},
//   {id: 3, src: '/img/clients/client-3.png'},
//   {id: 4, src: '/img/clients/client-4.png'},
//   {id: 5, src: '/img/clients/client-5.png'},
// ])
</script>

<style scoped>
@keyframes slide {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.image-slider {
  overflow: hidden;
}

.image-slider img {
  animation: slide 10s linear infinite;
  animation-direction: alternate;
}

.image-slider img:last-child {
  animation-delay: -10s;
}

</style>
