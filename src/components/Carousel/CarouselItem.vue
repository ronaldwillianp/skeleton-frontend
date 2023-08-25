<template>
  <div>
    <q-carousel
      v-model="slide"
      swipeable
      animated
      control-color="white"
      :navigation="false"
      padding
      :autoplay="4500"
      infinite
      arrows
      height="400px"
      v-model:fullscreen="fullscreen"
    >
      <!-- Primero Ejemplo -->
      <!--      <q-carousel-slide :name="1" class="column no-wrap">-->
      <!--        <div class="row fit justify-center items-center q-gutter-xs  no-wrap">-->
      <!--          <div class="tw-flex-col">-->
      <!--            <div class="tw-text-3xl tw-font-semibold tw-mb-4 tw-leading-6">Algo ahi que no se decir</div>-->
      <!--            <p class="tw-leading-6 tw-text-base tw-text-gray-500">-->
      <!--              {{ lorem }}-->
      <!--            </p>-->
      <!--            <div>Button</div>-->
      <!--          </div>-->
      <!--          <q-img class="rounded-borders col-6 full-height" src="../../assets/img/1.png"/>-->
      <!--        </div>-->
      <!--      </q-carousel-slide>-->

      <!--Segundo Ejemplo-->
      <q-carousel-slide name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">First stop</div>
          <div class="text-subtitle1">Mountains</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">First stop</div>
          <div class="text-subtitle1">Mountains</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">First stop</div>
          <div class="text-subtitle1">Mountains</div>
        </div>
      </q-carousel-slide>

      <template v-slot:control>
        <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
        >
          <q-btn
            push round dense color="white" text-color="primary"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="fullscreen = !fullscreen"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const slide = ref('1')
const fullscreen = ref(false)
const lorem = ref('Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.')
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>
