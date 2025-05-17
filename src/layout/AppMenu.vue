<script setup>
import { ref } from 'vue'
import AppMenuItem from './AppMenuItem.vue'

const model = ref([
  {
    label: 'Pages',
    icon: 'pi pi-fw pi-briefcase',
    items: [
      //   {
      //     label: 'Landing',
      //     icon: 'pi pi-fw pi-globe',
      //     to: '/landing',
      //   },
      //   {
      //     label: 'Crud',
      //     icon: 'pi pi-fw pi-pencil',
      //     to: '/pages/crud',
      //   },
      {
        label: 'Empty',
        icon: 'pi pi-fw pi-circle-off',
        to: '/pages/empty',
      },
    ],
  },
])
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <AppMenuItem :item="item" root :index="i" />

      <li class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
