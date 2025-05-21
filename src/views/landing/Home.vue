<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToServicios = () => {
  router.push('/servicios');
};
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <div class="hero surface-ground p-8 mb-4 border-round">
      <div class="grid">
        <div class="col-12 md:col-6 flex flex-column justify-content-center">
          <h1 class="text-6xl font-bold text-900 mb-4">Bienvenido a tu Peluquería de Confianza</h1>
          <p class="text-700 text-xl line-height-3 mb-4">
            Descubre una experiencia única de belleza y cuidado personal con nuestros servicios profesionales.
          </p>
          <div>
            <Button label="Reservar Ahora" class="mr-3" severity="primary" size="large" @click="navigateToServicios" />
            <Button label="Ver Servicios" outlined severity="secondary" size="large" @click="navigateToServicios" />
          </div>
        </div>
        <div class="col-12 md:col-6 flex align-items-center justify-content-center">
          <img src="/demo/images/landing/image-1.jpg" alt="Salon" class="w-full border-round" style="max-width: 500px" />
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="features my-8">
      <h2 class="text-center text-4xl font-bold text-900 mb-4">¿Por qué elegirnos?</h2>
      <div class="grid">
        <div class="col-12 md:col-4 p-4">
          <div class="surface-card p-4 border-round shadow-2 h-full">
            <i class="pi pi-star text-4xl text-primary mb-3"></i>
            <h3 class="text-xl font-bold text-900 mb-2">Experiencia Profesional</h3>
            <p class="text-700 line-height-3">Nuestro equipo de estilistas profesionales cuenta con años de experiencia y formación continua.</p>
          </div>
        </div>
        <div class="col-12 md:col-4 p-4">
          <div class="surface-card p-4 border-round shadow-2 h-full">
            <i class="pi pi-clock text-4xl text-primary mb-3"></i>
            <h3 class="text-xl font-bold text-900 mb-2">Horarios Flexibles</h3>
            <p class="text-700 line-height-3">Adaptamos nuestros horarios a tus necesidades, con disponibilidad amplia y reservas online.</p>
          </div>
        </div>
        <div class="col-12 md:col-4 p-4">
          <div class="surface-card p-4 border-round shadow-2 h-full">
            <i class="pi pi-heart text-4xl text-primary mb-3"></i>
            <h3 class="text-xl font-bold text-900 mb-2">Calidad Garantizada</h3>
            <p class="text-700 line-height-3">Utilizamos productos de primera calidad y las últimas técnicas para garantizar tu satisfacción.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  background: linear-gradient(to right, var(--surface-ground), var(--surface-50));
}
</style>
