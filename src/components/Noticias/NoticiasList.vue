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
        class="listNoticias tw-mx-auto tw-mt-10 tw-grid tw-max-w-2xl tw-grid-cols-1 tw-gap-x-8 tw-gap-y-16 tw-border-gray200 tw-pt-10 sm:tw-mt-10 sm:tw-pt-8 lg:tw-mx-0 lg:tw-max-w-none lg:tw-grid-cols-3"
      >
        <article
          v-for="post in noticias"
          :key="post.id"
          class="tw-flex tw-max-w-xl tw-flex-col tw-items-start tw-justify-between"
        >
          <q-img
            :src="post.portada"
            alt="Imagen no encontrada"
            :fit="'fill'"
            class="tw-h-[240px]"
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
            {{ post.descripcion }}
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
      <div class="tw-flex tw-w-full tw-justify-center button tw-mt-12">
        <a href="#"
           class="tw-flex tw-items-center tw-text-white tw-bg-primary tw-border-0 tw-py-2 tw-px-4 focus:tw-outline-none hover:tw-bg-hoverPrimary tw-rounded tw-text-sm">
          Ver todas
          <q-icon name="trending_flat" class="tw-ml-2" size="20px"></q-icon>
        </a>
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
import {useRouter} from "vue-router";

const noticias = ref([])

const router = useRouter()

onMounted(() => {
  getNoticias()

  const sr = ScrollReveal({
    reset: false,
    duration: 2000
  })
  sr.reveal('.titleNoticias', {
    origin: 'top',
    distance: '55px',
  })
  sr.reveal('.listNoticias', {
    origin: 'left',
    distance: '50px',
  })
  sr.reveal('.button', {
    origin: 'top',
    distance: '50px',
    delay: 300
  })
})

const getNoticias = () => {
  api.get('/social/noticia/')
    .then(response => {
      noticias.value = response.data.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion)).slice(0, 3)
    })
    .catch(error => console.log(error))
}

function formatDate(date) {
  return dayjs(date).locale(locale).format('MMMM D, YYYY')
}

</script>

<style scoped>

</style>
