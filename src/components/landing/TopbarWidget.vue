<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LogoWidget from './LogoWidget.vue';

const router = useRouter();

const menu = ref(null);

function navigateHome() {
    router.push('/');
}

function scrollToElement(elementId) {
    setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
    }, 200);
}
</script>

<template>
    <div :class="(menu?.classList.contains('hidden') && menu?.classList.contains('absolute') ? 'hidden ' : 'block md:hidden ') + ' absolute z-40 top-0 right-0 w-full h-screen'" style="background-color: var(--maskbg)"></div>
    <div class="flex items-center justify-between relative lg:static py-12 mx-0 px-6 lg:py-12">
        <a class="cursor-pointer" @click="navigateHome">
            <LogoWidget />
        </a>
        <a
            class="cursor-pointer block md:hidden dark:text-surface-100 text-primary"
            v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-fadein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: 'true' }"
        >
            <i class="pi pi-bars !text-4xl"></i>
        </a>

        <ul
            ref="menu"
            id="menu"
            style="top: 0px; right: 0%"
            class="list-none flex-grow-1 justify-end hidden md:flex absolute md:relative h-screen md:h-auto dark:md:bg-surface-950 bg-surface-0 md:!bg-transparent dark:bg-surface-900 m-0 z-50 w-full sm:w-6/12 md:w-full py-12 md:py-0"
        >
            <a
                class="cursor-pointer block md:hidden dark:text-surface-100 text-primary absolute"
                style="top: 3rem; right: 2rem"
                v-styleclass="{ selector: '@parent', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout' }"
            >
                <i class="pi pi-times !text-4xl"></i>
            </a>

            <li class="mt-8 md:mt-0">
                <a
                    @click="scrollToElement('home')"
                    v-styleclass="{ selector: '@grandparent', enterFromClass: 'hidden', enterActiveClass: 'animate-fadein', leaveToClass: 'hidden' }"
                    class="flex m-0 md:ml-8 md:px-0 px-4 py-4 text-surface-900 dark:text-surface-0 font-medium leading-normal hover:text-primary cursor-pointer"
                >
                    <span>Home</span>
                </a>
            </li>
            <li>
                <a
                    @click="scrollToElement('features')"
                    v-styleclass="{ selector: '@grandparent', enterFromClass: 'hidden', enterActiveClass: 'animate-fadein', leaveToClass: 'hidden' }"
                    class="flex m-0 md:ml-8 md:px-0 px-4 py-4 text-surface-900 dark:text-surface-0 font-medium leading-normal hover:text-primary cursor-pointer"
                >
                    <span>Features</span>
                </a>
            </li>
            <li>
                <a
                    @click="scrollToElement('customizations')"
                    v-styleclass="{ selector: '@grandparent', enterFromClass: 'hidden', enterActiveClass: 'animate-fadein', leaveToClass: 'hidden' }"
                    class="flex m-0 md:ml-8 md:px-0 px-4 py-4 text-surface-900 dark:text-surface-0 font-medium leading-normal hover:text-primary cursor-pointer"
                >
                    <span>Customizations</span>
                </a>
            </li>
            <li>
                <a
                    @click="scrollToElement('apps')"
                    v-styleclass="{ selector: '@grandparent', enterFromClass: 'hidden', enterActiveClass: 'animate-fadein', leaveToClass: 'hidden' }"
                    class="flex m-0 md:ml-8 md:px-0 px-4 py-4 text-surface-900 dark:text-surface-0 font-medium leading-normal hover:text-primary cursor-pointer"
                >
                    <span>Apps</span>
                </a>
            </li>
            <li>
                <a
                    @click="scrollToElement('pricing')"
                    v-styleclass="{ selector: '@grandparent', enterFromClass: 'hidden', enterActiveClass: 'animate-fadein', leaveToClass: 'hidden' }"
                    class="flex m-0 md:ml-8 md:px-0 px-4 py-4 text-surface-900 dark:text-surface-0 font-medium leading-normal hover:text-primary cursor-pointer"
                >
                    <span>Pricing</span>
                </a>
            </li>
            <li class="flex items-center">
                <Button type="button" v-styleclass="{ selector: '@grandparent', enterFromClass: 'hidden', enterActiveClass: 'animate-fadein', leaveToClass: 'hidden' }" label="Buy Now" class="m-0 mt-4 md:mt-0 ml-4 md:ml-8"></Button>
            </li>
        </ul>
    </div>
</template>
