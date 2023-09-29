<template>
  <div class="tw-py-24 sm:tw-py-20">
    <div class="tw-mx-auto tw-max-w-7xl tw-px-6 lg:tw-px-8">
      <div class="tw-mx-auto tw-max-w-2xl lg:tw-text-center">
        <p
          class="titleNoticias tw-mt-2 tw-text-3xl tw-font-bold tw-tracking-tight tw-text-black sm:tw-text-4xl"
        >
          Nuestro aconetecer informátivo
        </p>
      </div>
      <div
        class="posts tw-mx-auto tw-mt-10 tw-grid tw-max-w-2xl tw-grid-cols-1 tw-gap-x-8 tw-gap-y-16 tw-border-gray-200 tw-pt-10 sm:tw-mt-10 sm:tw-pt-8 lg:tw-mx-0 lg:tw-max-w-none lg:tw-grid-cols-3"
      >
        <article
          v-for="post in noticias"
          :key="post.id"
          class="tw-flex tw-max-w-xl tw-flex-col tw-items-start tw-justify-between"
        >
          <div class="tw-w-full">
            <!--            <img-->
            <!--              :src="post.author.imageUrl"-->
            <!--              alt=""-->
            <!--              class="tw-w-full tw-h-full tw-bg-gray-50"-->
            <!--            />-->
          </div>
          <div class="tw-flex tw-items-center tw-gap-x-4 tw-text-xs mt-3">
            <!--            <time class="tw-text-gray-500">{{-->
            <!--              formatDate(post.fecha_creacion)-->
            <!--            }}</time>-->
            <a
              v-for="category in post.categoria_info"
              :key="category.id"
              class="tw-relative tw-z-10 tw-rounded-full tw-bg-gray-50 tw-px-3 tw-py-1.5 tw-font-medium tw-text-gray-600 hover:tw-bg-gray-100"
            >{{ category.nombre }}</a
            >
          </div>
          <div class="tw-group tw-relative">
            <h3
              class="tw-mt-3 tw-text-lg tw-font-semibold tw-leading-6 tw-text-gray-900 group-hover:tw-text-gray-600"
            >
              <a>
                <span class="tw-absolute tw-inset-0"/>
                {{ post.titulo }}
              </a>
            </h3>
            <p class="tw-mt-5 tw-line-clamp-3 tw-text-sm tw-leading-6 tw-text-gray-600">
              {{ post.descripcion }}
            </p>
          </div>
          <div class="tw-relative tw-mt-8 tw-flex tw-items-center tw-gap-x-4">
            <!--            <img-->
            <!--              :src="post.author.imageUrl"-->
            <!--              alt=""-->
            <!--              class="tw-h-10 tw-w-10 tw-rounded-full tw-bg-gray-50"-->
            <!--            />-->
            <div class="tw-text-sm tw-leading-6">
              <p class="tw-font-semibold tw-text-gray-900">
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
import {onMounted, ref} from "vue";
import ScrollReveal from "scrollreveal";
import {api} from "boot/axios";
import dayjs from "dayjs";
import locale from 'src/utils/esDate'

const noticias = ref([])

onMounted(() => {
  const sr = ScrollReveal({
    reset: true,
    duration: 2000
  })

  sr.reveal('.titleNoticias', {
    origin: 'top',
    distance: '55px',
  })

  sr.reveal('.posts', {
    origin: 'right',
    distance: '50px',
    interval: 200
  })
  getNoticias()
})

const getNoticias = () => {
  api.get('/social/noticia/')
    .then(response => {
      noticias.value = response.data
    })
    .catch(error => console.log(error))
}

function formatDate(date) {
  return dayjs(date).locale(locale).format('MMMM D, YYYY')
}
</script>

<style scoped>

</style>
