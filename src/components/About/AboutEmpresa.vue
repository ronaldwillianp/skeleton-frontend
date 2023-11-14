<template>
  <ContainerSection>
    <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-12">

      <div class="tw-flex tw-flex-col">
        <TitleSection title="Sobre Nosotros"/>
        <SubtitleSection subtitle=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, aperiam architecto at doloribus laboriosam. Ab, aperiam architecto at doloribus laboriosam
            nemo"/>
        <AboutFuntionsList :items="functions"/>

        <div v-animate-onscroll.repeat="'animated fadeInDown slower'" class="tw-flex tw-mt-16">
          <ButtonOutlined label="Saber Más"/>
        </div>
      </div>

      <div v-animate-onscroll.repeat="'animated fadeInRight slower delay-2s'" class="tw-mt-10">
        <q-img src="../../assets/img/about.png" style="height: 550px"></q-img>
      </div>
    </div>
  </ContainerSection>
</template>

<script setup>
import {api} from "boot/axios";
import {onMounted, ref} from "vue";
import AboutFuntionsList from "components/About/AboutFunctions/AboutFuntionsList.vue";
import TitleSection from "components/TitleSection/TitleSection.vue";
import SubtitleSection from "components/TitleSection/SubtitleSection.vue";
import {
  FolderIcon,
  ChartPieIcon,
  PresentationChartLineIcon,
  DocumentTextIcon
} from '@heroicons/vue/24/outline'
import ContainerSection from "components/ContainerSection/ContainerSection.vue";
import ButtonOutlined from "components/Buttons/ButtonOutlined/ButtonOutlined.vue";

const empresas = ref([])

const functions = [
  {
    icon: FolderIcon,
    title: "Trabajar desde los Documentos Rectores.",
  },
  {
    icon: DocumentTextIcon,
    title: "Trabajar desde los Documentos Rectores.",
  },
  {
    icon: ChartPieIcon,
    title: "Trabajar desde los Documentos Rectores.",
  },
  {
    icon: PresentationChartLineIcon,
    title: "Trabajar desde los Documentos Rectores.",
  },
]

onMounted(() => {
  getEmpresa()
})

const getEmpresa = () => {
  api.get('/empresa/empresa/')
    .then(response => {
      empresas.value = response.data
    })
    .catch(error => console.log(error))
}
</script>

