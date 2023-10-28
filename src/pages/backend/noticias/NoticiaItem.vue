<template>
  <div v-if="isLoading" class="tw-pt-24 sm:tw-pt-32">
    <div class="tw-animate-pulse tw-mx-auto tw-max-w-4xl tw-px-6 lg:tw-px-16">
      <div class="tw-flex tw-items-center tw-gap-3">
        <div class="tw-rounded-full tw-bg-slate200 tw-h-10 tw-w-10"></div>
        <div class="tw-flex tw-flex-col tw-gap-2">
          <div class="tw-rounded-full tw-h-2 tw-w-20 tw-bg-slate200"></div>
          <div class="tw-rounded-full tw-h-3 tw-w-24 tw-bg-slate200"></div>
        </div>
      </div>
      <div class="tw-rounded-full tw-h-4 tw-w-64 tw-bg-slate200 tw-mt-9"></div>
      <div class="tw-rounded-full tw-h-4 tw-w-72 tw-bg-slate200 tw-mt-6"></div>
      <div class="tw-rounded-2xl tw-h-44 tw-bg-slate200 tw-mt-6"></div>
      <div class="tw-rounded-2xl tw-h-4 tw-w-72 tw-bg-slate200 tw-mt-6"></div>
    </div>
  </div>

  <div v-else class="tw-py-24 sm:tw-py-32">
    <div class="tw-mx-auto tw-max-w-4xl tw-px-6 lg:tw-px-16">
      <div class="tw-flex tw-items-center tw-gap-3">
        <div
          class="tw-flex tw-items-center tw-justify-center tw-h-14 tw-w-14 tw-bg-heroBg tw-rounded-full tw-text-lg tw-font-medium">
          E
        </div>
        <hr class="tw-h-9 tw-ml-1.5 tw-bg-gray900 tw-w-0.5">
        <div class="tw-flex tw-flex-col -tw-ml-0.5">
          <div class=" tw-text-gray600 tw-text-[16px]">
            {{ formatDate(noticia.fecha_creacion) }}
          </div>
          <div class="tw-font-medium tw-text-xl">
            {{ noticia.creada_por_info?.username }}
          </div>
        </div>
      </div>
      <div class="tw-mt-9 tw-text-2xl tw-font-medium">
        {{ noticia.titulo }}
      </div>
      <div class="tw-mt-8 tw-text-base tw-leading-relaxed">
        {{ noticia.subtitulo }}
      </div>
      <div class="tw-mt-9">
        <img :src="noticia.portada" class="tw-h-auto tw-max-w-full" alt="No imagen found"/>
      </div>
      <div class="tw-mt-8 tw-text-base tw-leading-relaxed">
        {{ noticia.descripcion }}
      </div>

      <!-- Comentarios -->
      <div class="tw-mt-28 tw-gap-6">
        <div class="tw-text-xl tw-mb-4 tw-font-medium">
          {{ comentarios.length }} Comentarios
        </div>

        <!-- Form -->
        <q-card class="tw-mb-5" flat>
          <q-card-section>
            <q-form @submit="storeComentario">
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-xs-12 col-sm-6">
                  <q-input
                    outlined
                    v-model="form.nombreComentario"
                    label="Nombre"
                    type="text"
                    lazy-rules
                    :rules="[rules.required]"
                  />
                </div>
                <div class="col-xs-12 col-sm-6">
                  <q-input
                    outlined
                    v-model="form.correoComentario"
                    label="Correo (no será publicado):"
                    type="text"
                    lazy-rules
                    :rules="[rules.emailNotRequired]"
                  />
                </div>
                <div class="tw-mt-2">
                  Este sitio se reserva el derecho de la publicación de los comentarios. No se harán visibles aquellos
                  que sean denigrantes, ofensivos, difamatorios, que estén fuera de contexto o atenten contra la
                  dignidad de una persona o grupo social. Recomendamos brevedad en sus planteamientos.
                </div>
                <div class="col-xs-12 col-sm-12">
                  <q-input
                    outlined
                    v-model="form.comentario"
                    label="Comentario"
                    type="textarea"
                    lazy-rules
                    :rules="[rules.required]"
                  />
                </div>
              </div>
              <q-btn
                type="submit"
                color="primary"
                class="text-white">
                Enviar Comentario
              </q-btn>
            </q-form>
          </q-card-section>
        </q-card>

        <div v-for="comentario in comentarios" :key="comentario.id"
             class="tw-flex tw-flex-col tw-gap-2 tw-mb-6 tw-p-4  tw-rounded tw-bg-gray100 tw-border tw-border-gray200">
          <div class="tw-mb-2">
            <div class="tw-flex tw-items-center tw-gap-x-2">
              <span class="tw-text-[16px] tw-font-medium">{{ comentario.nombre_comentario }}</span>
              <span class="tw-text-gray500">dijo:</span>
            </div>
          </div>
          <div class="tw-mb-4">
            {{ comentario.comentario }}
          </div>
          <div class="tw-flex tw-items-center tw-gap-x-6">
            {{ formatDate(comentario.fecha_creacion) }}
            <div class="tw-flex tw-items-center tw-gap-x-1.5 tw-font-medium tw-cursor-pointer">
              <q-icon name="reply"></q-icon>
              Responder
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {api} from "boot/axios";
import {useRouter} from "vue-router";
import dayjs from "dayjs";
import locale from 'src/utils/esDate'
import rules from '../../../utils/rules'
import {useQuasar} from "quasar";

const router = useRouter()

const $q = useQuasar()
const noticia = ref([])
const noticia_id = router.currentRoute.value.params.id
const comentarios = ref([])
const estadoComentarios = ref([])
const isLoading = ref(false)

const form = ref({
  nombreComentario: '',
  correoComentario: '',
  comentario: '',
  noticia: noticia_id,
  estado: [],
})

onMounted(() => {
  getNoticiaByName()
  getComentarioNoticia()
  getEstadoComentario()
})

const getNoticiaByName = () => {
  isLoading.value = true
  api.get(`/social/noticia/${noticia_id}/`)
    .then(response => {
      isLoading.value = false
      noticia.value = response.data
    })
    .catch(error => console.log(error))
}

const getComentarioNoticia = () => {
  api.get(`/social/comentario_noticia/`)
    .then(response => {
      comentarios.value = response.data.filter(comentario => {
        if (comentario.noticia == noticia_id && comentario.estado == 1) {
          return comentario
        }
      })
    })
    .catch(error => console.log(error))
}

const getEstadoComentario = () => {
  api.get('/social/estado_comentario/')
    .then(response => {
      estadoComentarios.value = response.data
    })
    .catch(error => console.log(error))
}

function formatDate(date) {
  return dayjs(date).locale(locale).format('D de MMMM , YYYY')
}

const storeComentario = () => {

  // form.value.noticia = noticia_id
  const estado = estadoComentarios.value.find(estado => estado.nombre === 'Denegado')
  form.value.estado = estado.id

  api.post('/social/comentario_noticia/', form.value)
    .then(response => {
      $q.notify({
        type: 'positive',
        message: 'Comentario enviado.',
        position: 'bottom',
        progress: true,
      })
    })
    .catch(error => {
      $q.notify({
        type: 'negative',
        message: error.response,
        position: 'bottom',
        progress: true,
      })
    })
}

</script>

