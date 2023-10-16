<template>
  <div class="tw-py-24 sm:tw-py-32">
    <div class="tw-mx-auto tw-max-w-7xl tw-px-6 lg:tw-px-16">
      <div class="tw-flex tw-items-center tw-gap-3">
        <div
          class="tw-flex tw-items-center tw-justify-center tw-h-14 tw-w-14 tw-bg-heroBg tw-rounded-full tw-text-lg tw-font-medium">
          E
        </div>
        <hr class="tw-h-9 tw-ml-1.5 tw-bg-gray900 tw-w-0.5">
        <div class="tw-flex tw-flex-col -tw-ml-0.5">
          <div class=" tw-text-gray600 tw-text-[16px]">
            {{ noticia.fecha_creacion }}
          </div>
          <div class="tw-font-medium tw-text-xl">
            {{noticia.creada_por_info?.username}}
          </div>
        </div>
      </div>
      <div class="tw-mt-9 tw-text-2xl tw-font-medium">
        {{noticia.titulo}}
      </div>
      <div class="tw-mt-8 tw-text-base tw-leading-relaxed">
        {{noticia.sbtitulo}}
      </div>
      <div class="tw-mt-9 tw-w-full tw-h-96">
        <q-img :src="noticia.portada"   style="width: 100%; height: 470px;" :fit="'fill'"></q-img>
      </div>
      <div class="tw-mt-28 tw-text-base tw-leading-relaxed">
        {{noticia.descripcion}}
      </div>

      <!-- Comentarios -->
      <div class="tw-mt-28 tw-flex tw-flex-col tw-gap-6">
        <div class="tw-text-xl tw-font-medium">
          Comentarios
        </div>
        <div>
          Inputs
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {api} from "boot/axios";
import {useRouter} from "vue-router";

const router = useRouter()

const noticia = ref([])
const noticia_id = router.currentRoute.value.params.id


onMounted(() => {
  getNoticiaByName()
})

const getNoticiaByName = () => {
  api.get(`/social/noticia/${noticia_id}/`)
    .then(response => {
      noticia.value = response.data
    })
    .catch(error => console.log(error))
}
</script>

