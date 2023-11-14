<template>
  <div
    v-animate-onscroll.repeat="'animated fadeInDown slower'"
    class="tw-flex tw-w-full tw-justify-center button tw-mt-12">
    <router-link :to="{path: props.path}"
                 class="tw-flex tw-items-center tw-text-white tw-bg-primary tw-border-0 tw-py-2 tw-px-4 focus:tw-outline-none hover:tw-bg-hoverPrimary tw-rounded tw-text-sm">
      {{ props.label }}
      <q-icon name="trending_flat" class="tw-ml-2" size="20px"></q-icon>
    </router-link>
  </div>
</template>

<script setup>

const props = defineProps({
  path: String,
  label: String
})

</script>

