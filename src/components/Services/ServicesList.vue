<template>
  <ContainerSection v-show="servicios.length > 0">
    <div class="tw-mx-auto tw-max-w-2xl lg:tw-text-center">
      <TitleSection title="Nuetro grupo empresarial ofrece diversos servicios"/>
      <SubtitleSection subtitle="Nuestras empresas están dedicadas unicamente a satisfacer todas sus
        necesidades brindando servicios de calidad y exelencia garantizadas"/>
    </div>
    <CardServices :services="servicios"/>
  </ContainerSection>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {api} from "boot/axios";
import ContainerSection from 'components/ContainerSection/ContainerSection.vue'
import TitleSection from "components/TitleSection/TitleSection.vue";
import SubtitleSection from "components/TitleSection/SubtitleSection.vue";
import CardServices from "components/Cards/CardServices/CardServices.vue";

const servicios = ref([])

onMounted(() => {
  getServicios()
})

const getServicios = () => {
  api.get('/empresa/servicio/')
    .then(response => {
      servicios.value = response.data
    })
    .catch(error => console.log(error))
}

</script>
