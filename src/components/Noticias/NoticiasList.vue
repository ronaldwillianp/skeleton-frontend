<template>
  <div class="tw-py-24 sm:tw-py-20">
    <div class="tw-mx-auto tw-max-w-7xl tw-px-6 lg:tw-px-8">
      <div class="tw-mx-auto tw-max-w-2xl lg:tw-text-center">
        <h2 class="tw-text-base tw-font-semibold tw-leading-7 tw-text-indigo-600">
          Noticias
        </h2>
        <p
          class="tw-mt-2 tw-text-3xl tw-font-bold tw-tracking-tight tw-text-gray-900 sm:tw-text-4xl"
        >
          Nuestro aconetecer informátivo
        </p>
      </div>
        <div
        class="tw-mx-auto tw-mt-10 tw-grid tw-max-w-2xl tw-grid-cols-1 tw-gap-x-8 tw-gap-y-16 tw-border-gray-200 tw-pt-10 sm:tw-mt-10 sm:tw-pt-8 lg:tw-mx-0 lg:tw-max-w-none lg:tw-grid-cols-3"
      >
        <article
          v-for="post in posts"
          :key="post.id"
          class="tw-flex tw-max-w-xl tw-flex-col tw-items-start tw-justify-between"
        >
          <div class="tw-w-full">
            <img
              :src="post.author.imageUrl"
              alt=""
              class="tw-w-full tw-h-full tw-bg-gray-50"
            />
          </div>
          <div class="tw-flex tw-items-center tw-gap-x-4 tw-text-xs mt-3">
            <time :datetime="post.datetime" class="tw-text-gray-500">{{
              post.date
            }}</time>
            <a
              :href="post.category.href"
              class="tw-relative tw-z-10 tw-rounded-full tw-bg-gray-50 tw-px-3 tw-py-1.5 tw-font-medium tw-text-gray-600 hover:tw-bg-gray-100"
              >{{ post.category.title }}</a
            >
          </div>
          <div class="tw-group tw-relative">
            <h3
              class="tw-mt-3 tw-text-lg tw-font-semibold tw-leading-6 tw-text-gray-900 group-hover:tw-text-gray-600"
            >
              <a :href="post.href">
                <span class="tw-absolute tw-inset-0" />
                {{ post.title }}
              </a>
            </h3>
            <p class="tw-mt-5 tw-line-clamp-3 tw-text-sm tw-leading-6 tw-text-gray-600">
              {{ post.description }}
            </p>
          </div>
          <div class="tw-relative tw-mt-8 tw-flex tw-items-center tw-gap-x-4">
            <img
              :src="post.author.imageUrl"
              alt=""
              class="tw-h-10 tw-w-10 tw-rounded-full tw-bg-gray-50"
            />
            <div class="tw-text-sm tw-leading-6">
              <p class="tw-font-semibold tw-text-gray-900">
                <a :href="post.author.href">
                  <span class="tw-absolute tw-inset-0" />
                  {{ post.author.name }}
                </a>
              </p>
              <p class="tw-text-gray-600">{{ post.author.role }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
const posts = [
  {
    id: 1,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 3,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  // More posts...
];
</script>

<style scoped>

</style>
