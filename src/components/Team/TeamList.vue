<template>
  <div class="tw-py-18 sm:tw-py-24">
    <div
      class="tw-mx-auto tw-grid tw-max-w-7xl tw-gap-x-8 tw-gap-y-20 tw-px-6 lg:tw-px-8 xl:tw-grid-cols-3"
    >
      <div class="tw-max-w-2xl">
        <h2 class="tw-text-3xl tw-font-bold tw-tracking-tight tw-text-gray-900 sm:tw-text-4xl">
          Conosca a nuestros directivos
        </h2>
        <p class="tw-mt-6 tw-text-lg tw-leading-8 tw-text-gray-600">
          Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae
          elementum enim vitae ullamcorper suspendisse.
        </p>
      </div>
      <ul
        role="tw-list"
        class="tw-grid tw-gap-x-8 tw-gap-y-12 sm:tw-grid-cols-2 sm:tw-gap-y-16 xl:tw-col-span-2"
      >
        <li v-for="person in people" :key="person.name">
          <div class="tw-flex tw-tems-center tw-gap-x-6">
            <img class="tw-h-16 tw-w-16 tw-rounded-full" :src="person.imageUrl" alt="" />
            <div>
              <h3
                class="tw-text-base tw-font-semibold tw-leading-7 tw-tracking-tight tw-text-gray-900"
              >
                {{ person.name }}
              </h3>
              <p class="tw-text-sm tw-font-semibold tw-leading-6 tw-text-indigo-600">
                {{ person.role }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const people = [
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // More people...
];
</script>
