<template>
  <div class="tw-absolute tw-z-20 tw-top-0 tw-right-0 tw-left-0 tw-pt-16 tw-my-2">
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
      height="550px"
      class="text-white shadow-2"
      v-model:fullscreen="fullscreen"
    >
      <q-carousel-slide name="style" class="column no-wrap flex-center "
                        img-src="../../assets/img/1.png">
        <q-icon name="style" size="56px"/>
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="tv" class="column no-wrap flex-center"
                        img-src="https://cdn.quasar.dev/img/parallax1.jpg">
        <q-icon name="live_tv" size="56px"/>
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="layers" class="column no-wrap flex-center"
                        img-src="https://cdn.quasar.dev/img/parallax2.jpg">
        <q-icon name="layers" size="56px"/>
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="map" class="column no-wrap flex-center" img-src="https://cdn.quasar.dev/img/quasar.jpg">
        <q-icon name="terrain" size="56px"/>
        <div class="q-mt-md text-center">
          {{ lorem }}
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

const slide = ref('style')
const fullscreen = ref(false)
const lorem = ref('Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.')
</script>

<style scoped>

</style>
