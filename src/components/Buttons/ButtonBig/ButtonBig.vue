<template>
  <button
    class="tw-inline-flex tw-text-white tw-bg-primary tw-border-0 tw-py-2 tw-px-6 focus:tw-outline-none hover:tw-bg-hoverPrimary tw-rounded tw-text-lg ">
    {{ props.label }}
  </button>
</template>

<script setup>

const props = defineProps({
  label: String
})
</script>

