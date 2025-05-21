<script setup>
import AppSidebar from '@/layout/AppSidebar.vue';
import { useLayout } from '@/layout/composables/layout';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const { layoutState, isHorizontal, toggleMenu } = useLayout();
const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

function onTopbarItemClick() {
  document.body.click();
}

function handleLogout() {
  authStore.logout();
  toast.add({ severity: 'success', summary: 'Success', detail: 'Logged out successfully', life: 3000 });
  router.push('/');
}
</script>

<template>
  <div class="layout-topbar">
    <div class="topbar-start">
      <Button ref="menubutton" type="button" class="topbar-menubutton p-trigger duration-300" @click="toggleMenu">
        <i class="pi pi-bars"></i>
      </Button>
    </div>
    <div class="layout-topbar-menu-section">
      <AppSidebar></AppSidebar>
    </div>
    <div class="topbar-end">
      <ul class="topbar-menu">
        <li :class="isHorizontal ? 'topbar-search hidden' : 'topbar-search hidden sm:block'">
          <IconField>
            <InputIcon class="pi pi-search" />
            <InputText type="text" placeholder="Search" class="w-48 sm:w-full" />
          </IconField>
        </li>
        <li :class="isHorizontal ? 'block topbar-item' : 'block sm:!hidden topbar-item'">
          <a
            v-styleclass="{
              selector: '@next',
              enterFromClass: '!hidden',
              enterActiveClass: 'animate-scalein',
              leaveToClass: '!hidden',
              leaveActiveClass: 'animate-fadeout',
              hideOnOutsideClick: 'true',
            }"
          >
            <Button type="button" icon="pi pi-search" text severity="secondary"></Button>
          </a>
          <ul class="!hidden topbar-menu active-topbar-menu !p-4 w-60 z-5">
            <IconField class="w-full">
              <InputIcon class="pi pi-search" />
              <InputText type="text" placeholder="Search" class="w-full" />
            </IconField>
          </ul>
        </li>
        <li class="topbar-item">
          <a
            v-styleclass="{
              selector: '@next',
              enterFromClass: '!hidden',
              enterActiveClass: 'animate-scalein',
              leaveToClass: '!hidden',
              leaveActiveClass: 'animate-fadeout',
              hideOnOutsideClick: 'true',
            }"
            class="cursor-pointer"
          >
            <img class="rounded-xl" src="/layout/images/avatar-m-1.jpg" alt="Profile" />
          </a>
          <ul :class="'topbar-menu active-topbar-menu !p-6 w-60 z-50 !hidden'">
            <li role="menuitem" class="!m-0 !mb-4">
              <a
                @click="onTopbarItemClick()"
                class="cursor-pointer flex items-center hover:text-primary-500 duration-200"
                v-styleclass="{
                  selector: '@grandparent',
                  enterFromClass: 'hidden',
                  enterActiveClass: 'animate-scalein',
                  leaveToClass: 'hidden',
                  leaveActiveClass: 'animate-fadeout',
                  hideOnOutsideClick: 'true',
                }"
              >
                <i class="pi pi-fw pi-lock mr-2"></i>
                <span>Privacy</span>
              </a>
            </li>
            <li role="menuitem" class="!m-0 !mb-4">
              <a
                @click="onTopbarItemClick()"
                class="cursor-pointer flex items-center hover:text-primary-500 duration-200"
                v-styleclass="{
                  selector: '@grandparent',
                  enterFromClass: 'hidden',
                  enterActiveClass: 'animate-scalein',
                  leaveToClass: 'hidden',
                  leaveActiveClass: 'animate-fadeout',
                  hideOnOutsideClick: 'true',
                }"
              >
                <i class="pi pi-fw pi-cog mr-2"></i>
                <span>Settings</span>
              </a>
            </li>
            <li role="menuitem" class="!m-0">
              <a
                @click="handleLogout"
                class="cursor-pointer flex items-center hover:text-primary-500 duration-200"
                v-styleclass="{
                  selector: '@grandparent',
                  enterFromClass: 'hidden',
                  enterActiveClass: 'animate-scalein',
                  leaveToClass: 'hidden',
                  leaveActiveClass: 'animate-fadeout',
                  hideOnOutsideClick: 'true',
                }"
              >
                <i class="pi pi-fw pi-sign-out mr-2"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </li>
        <!-- <li>
                    <Button type="button" icon="pi pi-cog" class="flex-shrink-0 !rounded-xl !w-8 !h-8" @click="layoutState.configSidebarVisible = true"></Button>
                </li>
                <li>
                    <Button type="button" icon="pi pi-arrow-left" class="flex-shrink-0" text severity="secondary" @click="layoutState.rightMenuActive = true"></Button>
                </li> -->
      </ul>
    </div>
  </div>
</template>
