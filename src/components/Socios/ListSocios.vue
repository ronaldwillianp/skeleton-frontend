<template>
  <div v-show="socios.length > 0">
    <div
      v-if="moreFiveItem"
      class="tw-bg-white tw-absolute tw-bottom-3 tw-w-full tw-px-7 md:tw-px-20">
      <div class="tw-flex tw-justify-between tw-items-center">
        <a target="_blank" :href="socio.web" v-for="socio in socios" :key="socio.id">
          <img
            :src="socio.logo"
            alt="Image not found"
            width="108"
            height="35"
          />
        </a>
      </div>
    </div>
<!--    <Vue3Marquee v-else :duration="50" class="tw-bg-white">-->
<!--        <a class="tw-w-[300px]" :href="socio.web" v-for="socio in socios" :key="socio.id">-->
<!--          <img-->
<!--            :src="socio.logo"-->
<!--            alt="Image not found"-->
<!--            width="100"-->
<!--            class="image"-->
<!--          />-->
<!--        </a>-->
<!--    </Vue3Marquee>-->
  </div>
</template>

<style scoped>
.card {
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.image {
  font-size: 30px;
  margin: 0 10px;
}
</style>
<script setup>
import {computed, onMounted, ref} from "vue";
import {api} from "boot/axios";
import {Vue3Marquee} from "vue3-marquee";

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
  return socios.value.length > 5 ? false : true
})
</script>


