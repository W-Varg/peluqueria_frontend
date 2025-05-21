<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';

const toast = useToast();
const stats = ref({
  sucursales: 0,
  clientes: 0
});

const loading = ref(true);

async function loadStats() {
  try {
    const [sucursalesRes, clientesRes] = await Promise.all([
      axios.get('http://192.168.100.44:3000/sucursales'),
      axios.get('http://192.168.100.44:3000/clientes')
    ]);

    stats.value = {
      sucursales: sucursalesRes.data.length,
      clientes: clientesRes.data.length
    };
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error al cargar las estadísticas',
      life: 3000
    });
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadStats();
});
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Dashboard</h5>
        <p>Bienvenido al panel de administración</p>
      </div>
    </div>

    <div class="col-12 md:col-6 xl:col-3">
      <div class="card h-full">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Sucursales</span>
            <div class="text-900 font-medium text-xl">{{ loading ? '...' : stats.sucursales }}</div>
          </div>
          <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-building text-blue-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">{{ stats.sucursales }}</span>
        <span class="text-500"> sucursales registradas</span>
      </div>
    </div>

    <div class="col-12 md:col-6 xl:col-3">
      <div class="card h-full">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Clientes</span>
            <div class="text-900 font-medium text-xl">{{ loading ? '...' : stats.clientes }}</div>
          </div>
          <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-users text-orange-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">{{ stats.clientes }}</span>
        <span class="text-500"> clientes registrados</span>
      </div>
    </div>

    <div class="col-12 xl:col-6">
      <div class="card h-full">
        <h5>Actividad Reciente</h5>
        <p>Panel de actividad reciente y notificaciones</p>
        
        <!-- Aquí puedes agregar más contenido como una lista de actividades recientes -->
        <div class="flex flex-column gap-3">
          <div class="flex align-items-center gap-3">
            <i class="pi pi-check-circle text-green-500 text-xl"></i>
            <div>
              <span class="text-900 font-medium">Sistema funcionando correctamente</span>
              <p class="text-500 mt-1 mb-0">Todos los servicios están activos</p>
            </div>
          </div>
          
          <div class="flex align-items-center gap-3">
            <i class="pi pi-info-circle text-blue-500 text-xl"></i>
            <div>
              <span class="text-900 font-medium">Información del Sistema</span>
              <p class="text-500 mt-1 mb-0">Panel de administración actualizado</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 xl:col-6">
      <div class="card h-full">
        <h5>Estado del Sistema</h5>
        <div class="flex flex-column gap-4">
          <div class="flex justify-content-between align-items-center">
            <span class="text-900 font-medium">API Backend</span>
            <span class="inline-flex align-items-center py-1 px-2 bg-green-100 text-green-700 border-round">
              <i class="pi pi-check-circle mr-1"></i>
              Activo
            </span>
          </div>
          
          <div class="flex justify-content-between align-items-center">
            <span class="text-900 font-medium">Base de Datos</span>
            <span class="inline-flex align-items-center py-1 px-2 bg-green-100 text-green-700 border-round">
              <i class="pi pi-check-circle mr-1"></i>
              Conectada
            </span>
          </div>

          <div class="flex justify-content-between align-items-center">
            <span class="text-900 font-medium">Servicios</span>
            <span class="inline-flex align-items-center py-1 px-2 bg-green-100 text-green-700 border-round">
              <i class="pi pi-check-circle mr-1"></i>
              Operativos
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: var(--surface-card);
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
}

.text-xl {
  font-size: 1.5rem;
}

.border-round {
  border-radius: 12px;
}
</style> 