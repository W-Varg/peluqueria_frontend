<script setup>
import { ref } from 'vue';

const activeLink = ref(0);
const activeImage = ref('/demo/images/landing/chat.png');
const images = [
  { name: 'chat', src: '/demo/images/landing/chat.png' },
  { name: 'mail', src: '/demo/images/landing/mail.png' },
  { name: 'task-list', src: '/demo/images/landing/task-list.png' },
  { name: 'blog', src: '/demo/images/landing/blog.png' },
];
function changeImageOnHover(i) {
  activeImage.value = images[i].src;
  activeLink.value = i;
}
</script>

<template>
  <div id="apps" class="landing-section px-6 md:px-20 py-20 mt-20">
    <div class="section-top flex w-full gap-12 items-center justify-start mb-12">
      <span class="block font-normal text-6xl sm:text-7xl xl:text-8xl text-surface-900 dark:text-surface-0">Ready to Use Applications </span>
    </div>
    <div class="content lg:flex justify-between gap-12">
      <div class="left lg:w-6/12">
        <h4 class="w-11/12 font-normal text-surface-900 dark:text-surface-0 m-0 mb-12 leading-normal" style="letter-spacing: 0.6px">
          Streamline your project building process and save valuable time with the ready-to-use applications offered by
          <b class="font-medium">FREYA</b>. From Chat to Mail, Product Reviews, Checkout and more, our suite of pre-made tools will have you up and
          running in no time. Start fast-tracking your success and take advantage of the time-saving features of
          <b class="font-medium">FREYA today.</b>
        </h4>
        <ul class="list-none p-0 m-0">
          <li class="mb-6 flex items-center">
            <a
              @mouseover="changeImageOnHover(0)"
              :style="activeLink == 0 ? 'color:var(--p-primary-color) !important' : ''"
              class="text-4xl font-medium text-surface-900 dark:text-surface-0 hover:text-primary duration-200 cursor-pointer"
              >Chat
            </a>
            <i v-if="activeLink == 0" class="pi pi-arrow-right text-4xl text-primary ml-4"></i>
          </li>
          <li class="mb-6 flex items-center">
            <a
              @mouseover="changeImageOnHover(1)"
              :style="activeLink == 1 ? 'color:var(--p-primary-color) !important' : ''"
              class="text-4xl font-medium text-surface-900 dark:text-surface-0 hover:text-primary duration-200 cursor-pointer"
              >Mail</a
            >
            <i v-if="activeLink == 1" class="pi pi-arrow-right text-4xl text-primary ml-4"></i>
          </li>

          <li class="mb-6 flex items-center">
            <a
              @mouseover="changeImageOnHover(2)"
              :style="activeLink == 3 ? 'color:var(--p-primary-color) !important' : ''"
              class="text-4xl font-medium text-surface-900 dark:text-surface-0 hover:text-primary duration-200 cursor-pointer"
              >Task List</a
            >
            <i v-if="activeLink == 3" class="pi pi-arrow-right text-4xl text-primary ml-4"></i>
          </li>
          <li class="mb-6 flex items-center">
            <a
              @mouseover="changeImageOnHover(3)"
              :style="activeLink == 4 ? 'color:var(--p-primary-color) !important' : ''"
              class="text-4xl font-medium text-surface-900 dark:text-surface-0 hover:text-primary duration-200 cursor-pointer"
              >Blog</a
            >
            <i v-if="activeLink == 4" class="pi pi-arrow-right text-4xl text-primary ml-4"></i>
          </li>
        </ul>
      </div>
      <div class="right lg:w-6/12 mt-8 lg:mt-0">
        <img animateEnter="animate-fadein" :src="activeImage" class="w-full rounded-3xl mb-6" alt="" />
      </div>
    </div>
  </div>
</template>
