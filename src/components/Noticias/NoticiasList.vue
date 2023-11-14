<template>
  <ContainerSection>
    <div class="tw-mx-auto tw-max-w-2xl lg:tw-text-center">
      <TitleSection title="Nuestro aconetecer informátivo"/>
    </div>
    <CardArticle :items="noticias"/>
    <ButtonLink path="/listado-noticias" label="Ver todas"/>
  </ContainerSection>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {api} from "boot/axios";
import {useRouter} from "vue-router";
import ContainerSection from "components/ContainerSection/ContainerSection.vue";
import TitleSection from "components/TitleSection/TitleSection.vue";
import CardArticle from "components/Cards/CardArticle/CardArticle.vue";
import ButtonLink from "components/Buttons/ButtonLink/ButtonLink.vue";

const noticias = ref([])

const router = useRouter()

onMounted(() => {
  getNoticias()
})

const getNoticias = () => {
  api.get('/social/noticia/')
    .then(response => {
      noticias.value = response.data.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion)).slice(0, 3)
    })
    .catch(error => console.log(error))
}

</script>
