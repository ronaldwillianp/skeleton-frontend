<template>
  <div v-show="faqs.length > 0" class="tw-py-24 sm:tw-py-32">
    <div class="tw-mx-auto tw-max-w-7xl tw-px-6 lg:tw-px-8 lg:tw-text-center">
      <TitleSection title="Preguntas Frecuentes"/>
    </div>
    <div class="tw-mt-4 tw-mx-auto tw-max-w-3xl tw-px-6 lg:tw-px-8 md:tw-mt-14 tw-space-y-4">
      <q-expansion-item
        v-animate-onscroll.repeat="'animated fadeInDown slower delay-0.7s'"
        v-for="faq in faqs"
        :key="faq.id"
        :label="faq.pregunta"
        class="tw-text-base tw-border-l-2 tw-border-primary tw-rounded tw-shadow-md"
      >
        <div class="tw-p-4 tw-text-gray800">
          {{ faq.respuesta }}
        </div>
      </q-expansion-item>
    </div>
  </div>
</template>

<script setup>
import {api} from "boot/axios";
import {ref, onMounted} from 'vue'
import TitleSection from "components/TitleSection/TitleSection.vue";

const faqs = ref([])

onMounted(() => {
  getFAQ()
})

function getFAQ() {
  api.get('/social/faq/')
    .then(response => {
      faqs.value = response.data
    })
}
</script>
