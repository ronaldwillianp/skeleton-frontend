<template>
  <p v-animate-onscroll.repeat="'animated fadeInDown slower delay-0.7s'"
     class="subtitleServices tw-mt-6 tw-text-lg tw-leading-8 tw-text-gray-600">
    {{ props.subtitle }}
  </p>
</template>

<script setup>

const props = defineProps({
  subtitle: String
})
</script>

<style scoped>

</style>
