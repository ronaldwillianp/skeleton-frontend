<template>
  <button
    class="tw-inline-flex tw-text-black tw-bg-white tw-border tw-border-primary tw-py-2 tw-px-6 focus:tw-outline-none hover:tw-bg-hoverPrimaryClaro tw-rounded tw-text-lg ">
    {{ props.label }}
  </button>
</template>

<script setup>

const props = defineProps({
  label: String
})
</script>

