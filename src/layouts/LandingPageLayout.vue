<template>
  <q-layout view="hHh lpR fFf">
    <header class="tw-fixed tw-top-0 tw-right-0 tw-left-0 tw-bg-heroBg tw-z-50">
      <nav
        class="tw-flex tw-items-center tw-justify-between tw-p-4 tw-px-7 md:tw-px-16 tw-container tw-mx-auto"
      >
        <div class="tw-flex lg:tw-flex-1">
          <a href="#" class="-tw-m-1.5 tw-p-1.5 focus:tw-outline-none">
            <span class="tw-sr-only">Gelma</span>
            <img
              class="tw-h-8 tw-w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div class="flex lg:tw-hidden">
          <q-btn
            flat
            class="text-black"
            icon="menu"
            round
            dense
            @click="toggleRightDrawer"
          />
        </div>
        <div class="tw-hidden lg:tw-flex lg:tw-gap-x-12">
          <a
            v-for="item in navigation"
            :key="item.name"
            :href="item.href"
            class="tw-text-sm tw-font-semibold tw-leading-6 tw-gray-900 hover:tw-text-gray-200 focus:tw-outline-none"
          >
            {{ item.name }}
          </a>
        </div>
        <div class="tw-hidden lg:tw-flex lg:tw-flex-1 lg:tw-justify-end">
          <router-link
            to="/login"
            class="tw-text-sm tw-font-medium tw-tracking-wide tw-rounded focus:tw-outline-none tw-leading-6 tw-text-white tw-px-4 tw-py-2 tw-bg-primary hover:tw-bg-hoverPrimary tw-transition-all"
          >Autenticarse
          </router-link
          >
          <!--          <router-link-->
          <!--            to="/login"-->
          <!--            class="tw-text-sm tw-font-semibold tw-leading-6 tw-gray-900 hover:tw-text-gray-200 tw-transition-all"-->
          <!--          >Log in <span aria-hidden="true">&rarr;</span>-->
          <!--          </router-link-->
          <!--          >-->
        </div>
      </nav>
    </header>
    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      <q-list>
        <div class="tw-flex tw-justify-between tw-items-center tw-py-3 tw-px-4">
          <router-link to="/" class="-tw-m-1.5">
            <span class="tw-sr-only">Gelma</span>
            <img
              class="tw-h-8 tw-w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </router-link>
          <q-btn
            flat
            class="text-black"
            icon="close"
            round
            dense
            @click="toggleRightDrawer"
          />
        </div>
        <EssentialLink
          v-for="link in navigation"
          :key="link.name"
          v-bind="link"
          class="q-mt-sm"
        />
        <div class="tw-py-3 tw-px-4">
          <router-link
            to="/login"
            class="tw-text-sm tw-font-semibold tw-leading-6 tw-text-gray-900"
          >Log in <span aria-hidden="true">&rarr;</span>
          </router-link
          >
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import EssentialLink from "src/components/EssentialLink.vue";
import {ref} from "vue";

const rightDrawerOpen = ref(false);
const navigation = [
  {name: "Product", href: "#"},
  {name: "Features", href: "#"},
  {name: "Marketplace", href: "#"},
  {name: "Company", href: "#"},
];

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}
</script>
