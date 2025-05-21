<script setup>
import AppsWidget from '@/components/landing/AppsWidget.vue';
import CustomizationsWidget from '@/components/landing/CustomizationsWidget.vue';
import FeaturesWidget from '@/components/landing/FeaturesWidget.vue';
import FooterWidget from '@/components/landing/FooterWidget.vue';
import HeroWidget from '@/components/landing/HeroWidget.vue';
import PricingWidget from '@/components/landing/PricingWidget.vue';
import TopbarWidget from '@/components/landing/TopbarWidget.vue';
import AppConfig from '@/layout/AppConfig.vue';
import { onMounted, ref } from 'vue';

const menu = ref(null);

onMounted(() => {
    menu.value = document.getElementById('menu');
});
</script>

<template>
    <div :class="(menu?.classList.contains('hidden') && menu?.classList.contains('absolute') ? 'h-auto ' : 'overflow-hidden h-screen  md:h-auto ') + 'landing-wrapper'">
        <TopbarWidget />
        <HeroWidget />
        <FeaturesWidget />
        <CustomizationsWidget />
        <AppsWidget />
        <PricingWidget />
        <FooterWidget />
    </div>
    <ScrollTop></ScrollTop>

    <AppConfig simple />
</template>
