<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import AppBreadcrumb from './AppBreadcrumb.vue';
import AppConfig from './AppConfig.vue';
import AppRightMenu from './AppRightMenu.vue';
import AppTopbar from './AppTopbar.vue';

const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const outsideClickListener = ref(null);

function bindOutsideClickListener() {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        layoutState.overlayMenuActive = false;
        layoutState.overlaySubmenuActive = false;
        layoutState.staticMenuMobileActive = false;
        layoutState.menuHoverActive = false;
        layoutState.configSidebarVisible = false;
      }
    };
    document.addEventListener('click', outsideClickListener.value);
  }
}

function unbindOutsideClickListener() {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener.value);
    outsideClickListener.value = null;
  }
}

function isOutsideClicked(event) {
  const sidebarEl = document.querySelector('.layout-sidebar');
  const topbarButtonEl = document.querySelector('.topbar-start > button');

  return !(
    sidebarEl?.isSameNode(event.target) ||
    sidebarEl?.contains(event.target) ||
    topbarButtonEl?.isSameNode(event.target) ||
    topbarButtonEl?.contains(event.target)
  );
}

watch(isSidebarActive, (newVal) => {
  if (newVal) {
    bindOutsideClickListener();
  } else {
    unbindOutsideClickListener();
  }
});

onBeforeUnmount(() => {
  unbindOutsideClickListener();
});

const containerClass = computed(() => {
  return [
    {
      'layout-light': !layoutConfig.darkTheme,
      'layout-dark': layoutConfig.darkTheme,
      'layout-light-menu': layoutConfig.menuTheme === 'light',
      'layout-dark-menu': layoutConfig.menuTheme === 'dark',
      'layout-overlay': layoutConfig.menuMode === 'overlay',
      'layout-static': layoutConfig.menuMode === 'static',
      'layout-slim': layoutConfig.menuMode === 'slim',
      'layout-slim-plus': layoutConfig.menuMode === 'slim-plus',
      'layout-horizontal': layoutConfig.menuMode === 'horizontal',
      'layout-reveal': layoutConfig.menuMode === 'reveal',
      'layout-drawer': layoutConfig.menuMode === 'drawer',
      'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
      'layout-overlay-active': layoutState.overlayMenuActive,
      'layout-mobile-active': layoutState.staticMenuMobileActive,
      'layout-sidebar-active': layoutState.sidebarActive,
      'layout-sidebar-anchored': layoutState.anchored,
    },
  ];
});
</script>

<template>
  <div class="layout-container" :class="containerClass">
    <AppTopbar></AppTopbar>
    <AppConfig></AppConfig>
    <div class="layout-content-wrapper">
      <div class="layout-content">
        <AppBreadcrumb></AppBreadcrumb>
        <router-view></router-view>
      </div>
    </div>
    <AppRightMenu></AppRightMenu>

    <div class="layout-mask"></div>
  </div>
  <Toast></Toast>
</template>

<style lang="scss"></style>
