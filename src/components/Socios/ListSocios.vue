<template>
  <div
    v-if="moreFiveItem"
    class="tw-bg-white tw-absolute tw-bottom-6 tw-w-full tw-px-7 md:tw-px-20">
    <div class="tw-flex tw-justify-between tw-items-center">
      <a target="_blank" :href="socio.web" v-for="socio in socios" :key="socio.id">
        <img
          :src="socio.logo"
          alt="Image not found"
          width="108"
          height="49"
          class="tw-flex tw-items-center tw-justify-between"
        />
      </a>
    </div>
  </div>
  <div
    v-else
    class="tw-bg-white tw-absolute tw-bottom-6 tw-w-full tw-py-2">
    <marquee>
      <div class="tw-flex tw-justify-between tw-items-center">
        <a target="_blank" :href="socio.web" v-for="socio in socios" :key="socio.id">
          <img
            :src="socio.logo"
            alt="Image not found"
            class="tw-h-16"
          />
        </a>
      </div>
    </marquee>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {api} from "boot/axios";

const socios = ref([])

onMounted(() => {
  getSocios()
})

const getSocios = () => {
  api.get('/empresa/socio/')
    .then(response => {
      socios.value = response.data
    })
    .catch(error => console.log(error))
}

const moreFiveItem = computed(() => {
  // return socios.value.length > 5 ? false : true
})
</script>

