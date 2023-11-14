<template>
  <p
    v-animate-onscroll.repeat="'animated fadeInDown slower'"
    class="tw-mt-2 tw-text-3xl tw-font-bold tw-tracking-tight tw-text-gray-900 sm:tw-text-4xl"
  >
    {{props.title }}
  </p>
</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

