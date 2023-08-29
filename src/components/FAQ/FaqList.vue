<template>
  <div class="tw-py-24 sm:tw-py-32">
    <div class="tw-mx-auto tw-max-w-7xl tw-px-6 lg:tw-px-8 lg:tw-text-center">
      <p
        class="tw-mt-2 tw-text-3xl tw-font-bold tw-tracking-tight tw-text-gray-900 sm:tw-text-4xl"
      >
        Preguntas Frecuentes
      </p>
    </div>
    <div class="tw-mx-auto tw-max-w-3xl tw-px-6 lg:tw-px-8 md:tw-mt-14 tw-space-y-4">
      <q-expansion-item
        v-for="faq in faqs"
        :key="faq.id"
        expand-separator
        :label="faq.question"
        class="tw-text-base tw-border tw-border-gray-200 tw-rounded-lg tw-shadow-sm"
      >
        <q-card class="tw-border-t tw-border-gray-200">
          <q-card-section>
           {{faq.answer}}
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
  </div>
</template>

<script setup>

const faqs = [
  {
    id: 1,
    question: 'Lorem 1',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid.'
  },
  {
    id: 2,
    question: 'Lorem 2',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid.'
  },
  {
    id: 3,
    question: 'Lorem 3',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid.'
  },
]
</script>

<style scoped>

</style>
