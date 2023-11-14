<template>
  <div
    class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4 tw-mt-8"
  >
    <div
      v-animate-onscroll.repeat="'animated fadeInDown slower'"
      class="tw-flex tw-items-center md:tw-justify-center tw-gap-6 tw-mt-4"
      v-for="(item, index) in props.items"
      :key="index"
    >
      <Component :is="item.icon" class="tw-h-14 tw-w-14 tw-text-primary"/>
      <div class="tw-text-base">{{ item.title }}</div>
    </div>

  </div>
</template>

<script setup>

const props = defineProps({
  items: Array
})
</script>
