<template>
  <div class="tw-pt-12">
    <div class="tw-animate-pulse tw-mx-auto tw-max-w-7xl tw-px-6 lg:tw-px-16">
      <div
        class="tw-mx-auto tw-grid tw-grid-cols-1 tw-gap-x-8 tw-gap-y-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-5">
        <div v-for="i in 3">
          <div class="tw-rounded-2xl tw-h-48 tw-bg-slate200 tw-mt-6"></div>
          <div class="tw-flex tw-items-center tw-gap-x-4 md:tw-gap-x-2">
            <div class="tw-rounded-full tw-h-3 tw-w-32 sm:tw-w-28 md:tw-w-24 tw-bg-slate200 tw-mt-2"></div>
            <div class="tw-rounded-full tw-h-3 tw-w-32 sm:tw-w-28 md:tw-w-24 tw-bg-slate200 tw-mt-2"></div>
          </div>
          <div class="tw-rounded-full tw-h-4 tw-w-64 md:tw-w-56 tw-bg-slate200 tw-my-6"></div>
          <div class="tw-rounded-full tw-h-4 tw-w-full tw-bg-slate200 tw-mt-6"></div>
          <div class="tw-rounded-full tw-h-4 tw-w-full tw-bg-slate200 tw-mt-3"></div>
          <div class="tw-rounded-2xl tw-h-4 tw-w-24 tw-bg-slate200 tw-mt-9"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
