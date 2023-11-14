<template>
  <section class="tw-bg-heroBg">
    <div class="tw-relative">
      <div
        class="tw-container tw-mx-auto tw-flex tw-px-7 md:tw-px-16 tw-py-28 md:tw-flex-row tw-flex-col tw-items-center">
        <div
          class="lg:tw-flex-grow md:tw-w-1/2 lg:tw-pr-24 md:tw-pr-16 tw-flex tw-flex-col md:tw-items-start md:tw-text-left tw-mb-16 md:tw-mb-0 tw-items-center tw-text-center">
          <transition-group
            appear
            enter-active-class="animated fadeInUp slower"
          >
            <div key="text">
              <h1 class="title-font sm:tw-text-4xl tw-text-3xl tw-mb-4 tw-font-bold tw-text-gray-900">Before they sold
                out
                <br class="tw-hidden lg:tw-inline-block">readymade gluten
              </h1>
            </div>
            <div key="text">
              <p class="tw-mb-10 tw-text-base tw-leading-relaxed">Copper mug try-hard pitchfork pour-over freegan
                heirloom
                neutra air plant
                cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic
                tumeric truffaut hexagon try-hard chambray.</p>
            </div>
            <div key="text" class="tw-flex tw-justify-center">
            <ButtonBig label="Saber Más"/>
            </div>
          </transition-group>
        </div>
        <div class="lg:tw-max-w-lg lg:tw-w-full md:tw-w-1/2 tw-w-5/6">
          <transition
            appear
            enter-active-class="animated fadeInUp slower"
          >
            <img alt="hero" src="../../assets/img/heroSection.svg">
          </transition>
        </div>
      </div>
      <ListSocios/>
    </div>
  </section>
</template>

<script setup>
import {ref} from "vue";
import ListSocios from "components/Socios/ListSocios.vue";
import ButtonBig from "components/Buttons/ButtonBig/ButtonBig.vue";

</script>

