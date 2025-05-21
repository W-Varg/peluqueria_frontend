<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const isAdmin = authStore.isAdmin;

const model = ref([
  {
    label: 'Dashboard',
    icon: 'pi pi-fw pi-home',
    to: '/admin',
  },
  {
    label: 'Gestión',
    icon: 'pi pi-fw pi-briefcase',
    items: [
      {
        label: 'Sucursales',
        icon: 'pi pi-fw pi-building',
        to: '/admin/sucursales',
        visible: isAdmin,
      },
      {
        label: 'Empleados',
        icon: 'pi pi-fw pi-users',
        to: '/admin/empleados',
        visible: isAdmin,
      },
      {
        label: 'Clientes',
        icon: 'pi pi-fw pi-users',
        to: '/admin/clientes',
        visible: isAdmin,
      },
      {
        label: 'Servicios',
        icon: 'pi pi-fw pi-list',
        to: '/admin/servicios',
        visible: isAdmin,
      },
      {
        label: 'Reservas',
        icon: 'pi pi-fw pi-calendar',
        to: '/admin/reservas',
        visible: isAdmin,
      },
      // {
      //   label: 'Clientes',
      //   icon: 'pi pi-fw pi-users',
      //   to: '/admin/clientes',
      // },
    ],
  },
  {
    label: 'Páginas',
    icon: 'pi pi-fw pi-file',
    items: [
      {
        label: 'Landing',
        icon: 'pi pi-fw pi-globe',
        to: '/',
      },
    ],
  },
]);
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
