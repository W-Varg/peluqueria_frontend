<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Servicio } from '@/types/servicio';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const servicios = ref<Servicio[]>([]);
const loading = ref(true);
const authStore = useAuthStore();
const router = useRouter();

const fetchServicios = async () => {
  try {
    const { data } = await axios.get<Servicio[]>('/public/servicios');
    servicios.value = data.filter((servicio) => servicio._estado === true);
  } catch (error) {
    console.error('Error al cargar servicios:', error);
  } finally {
    loading.value = false;
  }
};

const handleReservar = (servicio: Servicio) => {
  if (!authStore.isAuthenticated) {
    router.push('/auth/login');
    return;
  }
  // Implementar lógica de reserva
};

onMounted(() => {
  fetchServicios();
});
</script>

<template>
  <div class="servicios">
    <div class="text-center mb-6">
      <h1 class="text-4xl font-bold text-900 mb-3">Nuestros Servicios</h1>
      <p class="text-700 text-xl line-height-3">Descubre nuestra amplia gama de servicios profesionales para tu cuidado personal</p>
    </div>

    <div v-if="loading" class="flex justify-content-center">
      <ProgressSpinner />
    </div>

    <div v-else class="grid">
      <div v-for="servicio in servicios" :key="servicio._id" class="col-12 md:col-6 lg:col-4 p-3">
        <div class="surface-card p-4 border-round shadow-2">
          <div class="flex flex-column h-full">
            <div class="mb-3">
              <span class="text-xl font-bold text-900">{{ servicio._nombre }}</span>
              <div class="text-2xl text-primary font-bold mt-2">
                {{ new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'BOB' }).format(Number(servicio._precio)) }}
              </div>
            </div>

            <p class="text-700 line-height-3 mb-4 flex-grow-1">
              {{ servicio._descripcion }}
            </p>

            <div class="flex align-items-center justify-content-between">
              <span class="text-600">
                <i class="pi pi-clock mr-2"></i>
                {{ servicio._duracion }} minutos
              </span>
              <Button label="Reservar" @click="handleReservar(servicio)" :outlined="!authStore.isAuthenticated" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!loading && servicios.length === 0" class="text-center p-4">
      <p class="text-700">No hay servicios disponibles en este momento.</p>
    </div>
  </div>
</template>
