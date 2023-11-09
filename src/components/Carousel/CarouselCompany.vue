<template>
  <div class="tw-py-24 sm:tw-py-20" v-show="socios.length > 0">
    <p
      v-animate-onscroll.repeat="'animated fadeInDown slower'"
      class="tw-mt-2 tw-text-3xl tw-text-center tw-mb-12 tw-font-bold tw-tracking-tight tw-text-gray-900 sm:tw-text-4xl"
    >
      Contamos con la confianza de nuestros socios
    </p>
    <Vue3Marquee :pause-on-hover="true">
      <a
        v-for="socio in socios"
        :key="socio.id"
        class="word"
        :href="socio.web"
        target="_blank"
      >
        <img :src="socio.logo" style="height: 140px; max-width: 250px"/>
      </a>
    </Vue3Marquee>
  </div>
</template>


<style scoped>
.word {
  margin: 0 150px;
}

</style>

<script setup>
import {onMounted, ref} from 'vue'
import {api} from "boot/axios";
import {Vue3Marquee} from "vue3-marquee";


const slide = ref(1)
const socios = ref([])

onMounted(() => {
  getSocios()
})

function getSocios() {
  api.get('/empresa/socio/')
    .then(response => {
      socios.value = response.data
    })
    .catch(error => console.log(error))
}
</script>

