<template>
  <div
    class="tw-bg-white tw-absolute tw-bottom-6 tw-w-full tw-py-4 tw-flex tw-items-center tw-justify-between tw-px-7 md:tw-px-20">
    <a target="_blank" :href="socio.web" v-for="socio in socios" :key="socio.id">
      <img
        :src="socio.logo"
        alt="Image not found"
        width="108"
        height="49"
      />
    </a>
    <div ref="sentinel"></div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
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

</script>


<style scoped>
.testimonial {
  animation: slide 5s linear infinite;
}

@keyframes slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

</style>
