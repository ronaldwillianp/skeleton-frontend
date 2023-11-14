<template>
  <div
    class="tw-mx-auto md:tw-mt-10 tw-grid tw-max-w-2xl tw-grid-cols-1 tw-gap-x-8 tw-gap-y-16 tw-border-gray200 tw-pt-7 md:tw-pt-10 sm:tw-mt-10 sm:tw-pt-8 lg:tw-mx-0 lg:tw-max-w-none lg:tw-grid-cols-3"
  >
    <article
      v-for="(post, index) in props.items"
      :key="post.id"
      class="tw-flex tw-flex-col tw-items-start tw-justify-between"
      v-animate-onscroll.repeat="'animated fadeInLeft slower'"
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
        <div class="tw-text-sm tw-leading-6">
          <p class="tw-font-semibold tw-text-gray900">
            <a>
              <span class="tw-absolute tw-inset-0"/>
              {{ post.creada_por_info.username }}
            </a>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import locale from 'src/utils/esDate'

const props = defineProps({
  items: {
    type: Array,
    default: []
  }
})

function formatDate(date) {
  return dayjs(date).locale(locale).format('MMMM D, YYYY')
}
</script>

