<template>
  <SkeletonNoticiaList v-if="isLoading"/>
  <div v-else class="tw-pt-12">
    <div class="tw-mx-auto tw-max-w-7xl tw-px-6 lg:tw-px-16">
      <div
        class="tw-mx-auto md:tw-mt-10 tw-grid tw-max-w-2xl tw-grid-cols-1 tw-gap-x-8 tw-gap-y-16 tw-border-gray200 tw-pt-7 md:tw-pt-10 sm:tw-mt-10 sm:tw-pt-8 lg:tw-mx-0 lg:tw-max-w-none lg:tw-grid-cols-3"
      >
        <article
          v-for="post in noticias"
          :key="post.id"
          class="tw-flex tw-flex-col tw-items-start tw-justify-between"
        >
          <q-img
            :src="post.portada"
            alt="Imagen no encontrada"
            :fit="'fill'"
            class="tw-w-full tw-h-auto"
          />
          <div class="tw-flex tw-items-center tw-gap-x-4 tw-text-xs mt-3">
            <time class="tw-text-gray500">{{
                formatDate(post.fecha_creacion)
              }}
            </time>
            <a
              v-for="category in post.categoria_info"
              :key="category.id"
              class="tw-relative tw-z-10 tw-rounded-full tw-bg-gray50 tw-px-3 tw-py-1.5 tw-font-medium tw-text-gray hover:tw-bg-gray100"
            >{{ category.nombre }}</a
            >
          </div>
          <div class="tw-group tw-relative">
            <h3
              class="tw-mt-3 tw-text-lg tw-font-semibold tw-leading-6 tw-text-gray900 group-hover:tw-text-gray600"
            >
              <router-link :to="({path:'/noticia/' + post.titulo.replace(/ /g, '-') + '/' + post.id})">
                <span class="tw-absolute tw-inset-0"/>
                {{ post.titulo }}
              </router-link>
            </h3>
          </div>
          <p class="tw-mt-5 tw-line-clamp-3 tw-text-sm tw-leading-6 tw-text-gray600">
            {{ post.subtitulo }}
          </p>
          <div class="tw-relative tw-mt-8 tw-flex tw-items-center tw-gap-x-4">
            <!--            <img-->
            <!--              :src="post.author.imageUrl"-->
            <!--              alt=""-->
            <!--              class="tw-h-10 tw-w-10 tw-rounded-full tw-bg-gray-50"-->
            <!--            />-->
            <div class="tw-text-sm tw-leading-6">
              <p class="tw-font-semibold tw-text-gray900">
                <a>
                  <span class="tw-absolute tw-inset-0"/>
                  {{ post.creada_por_info.username }}
                </a>
              </p>
              <!--              <p class="tw-text-gray-600">{{ post.author.role }}</p>-->
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {api} from "boot/axios";
import dayjs from "dayjs";
import locale from "src/utils/esDate";
import SkeletonNoticiaList from "components/Skeleton/SkeletonNoticiaList.vue";

const noticias = ref([])
const isLoading = ref(false)

onMounted(() => {
  getNoticias()
})

const getNoticias = () => {
  isLoading.value = true
  api.get('/social/noticia/')
    .then(response => {
      isLoading.value = false
      noticias.value = response.data
    })
    .catch(error => console.log(error))
}

function formatDate(date) {
  return dayjs(date).locale(locale).format('D de MMMM , YYYY')
}
</script>
