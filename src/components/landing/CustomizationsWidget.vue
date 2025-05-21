<script setup>
import { ref } from 'vue';

const displayModal = ref(false);

function showModalDialog() {
    displayModal.value = true;
}
</script>

<template>
    <div id="customizations" class="landing-section px-6 md:px-20 py-20 mt-20">
        <div class="section-top flex w-full flex-col gap-12 items-center justify-center mb-12">
            <span class="block font-normal text-6xl sm:text-7xl xl:text-8xl text-surface-900 dark:text-surface-0">Make it Your Own </span>
            <h4 class="lg:w-8/12 font-normal text-surface-900 dark:text-surface-0 m-0 mb-12 text-center leading-normal" style="letter-spacing: 0.6px">
                Take control of your dashboard with FREYA. Make it your own with customizations to suit your business needs. Get creative and elevate your operations with FREYA's Config feature. <br /><b class="font-medium">Try it now!</b>
            </h4>
        </div>
        <div class="video relative" style="max-width: 62rem; margin: 0 auto">
            <img src="/demo/images/landing/image-3.png" class="w-full rounded-3xl mb-6" alt="" />
            <Button icon="pi pi-play !text-8xl !ml-4" @click="showModalDialog()" class="!absolute !top-1/2 !right-1/2 !text-3xl" rounded style="margin-right: -5rem; margin-top: -5rem; height: 10rem; width: 10rem"></Button>
        </div>
        <Dialog :pt="{ content: { style: 'flex-grow:1' } }" header="Video Content" v-model:visible="displayModal" :modal="true" :style="{ width: '80vw', height: '45vw' }" :draggable="false" :resizable="false">
            <iframe
                :style="{ width: '100%', height: '100%' }"
                src="https://www.youtube.com/embed/Y07edRJd5QM"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
            ></iframe>
        </Dialog>
    </div>
</template>
