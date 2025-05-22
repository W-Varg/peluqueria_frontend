<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const isAdmin = computed(() => authStore.isAdmin);
const userName = computed(() => authStore.user?.name);

const handleLogout = async () => {
  await authStore.logout();
  router.push({ name: 'login' });
};
</script>

<template>
  <div class="landing-layout">
    <header class="surface-0 shadow-1">
      <div class="container mx-auto">
        <div class="flex justify-content-between align-items-center py-3">
          <router-link to="/" class="no-underline">
            <h1 class="text-900 font-bold m-0">Peluquería</h1>
          </router-link>

          <nav class="flex align-items-center gap-3">
            <router-link to="/" class="text-900 font-medium no-underline">Inicio</router-link>
            <router-link to="/servicios" class="text-900 font-medium no-underline">Servicios</router-link>
            <router-link to="/contacto" class="text-900 font-medium no-underline">Contacto</router-link>

            <template v-if="isAuthenticated">
              <router-link v-if="isAdmin" to="/admin/dashboard" class="text-900 font-medium no-underline">Admin</router-link>
              <router-link v-else to="/mis-reservas" class="text-900 font-medium no-underline">Mis Reservas</router-link>
              <router-link to="/mi-cuenta" class="text-900 font-medium no-underline">{{ userName }}</router-link>
              <Button label="Cerrar Sesión" class="text-900 font-medium no-underline" @click="handleLogout" />
            </template>
            <template v-else>
              <router-link to="/auth/login" class="text-900 font-medium no-underline">Iniciar Sesión</router-link>
              <router-link to="/auth/register" class="text-900 font-medium no-underline">Registrarse</router-link>
            </template>
          </nav>
        </div>
      </div>
    </header>

    <main class="container mx-auto py-4">
      <router-view></router-view>
    </main>

    <footer class="surface-0 shadow-1 py-4 mt-auto">
      <div class="container mx-auto text-center text-600">© {{ new Date().getFullYear() }} Peluquería. Todos los derechos reservados.</div>
    </footer>
  </div>
</template>

<style scoped>
.landing-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1200px;
  padding: 0 1rem;
}

nav a {
  transition: color 0.2s;
}

nav a:hover {
  color: var(--primary-color) !important;
}
</style>
