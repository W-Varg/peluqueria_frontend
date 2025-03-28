<script setup lang="ts">
import { getSucursales } from '@/services/sucursal.api'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const sucursales = ref([])
const loading = ref(false)
const error = ref('')

const fetchSucursales = async () => {
  try {
    loading.value = true
    sucursales.value = await getSucursales()
  } catch (err) {
    error.value = 'Error al cargar sucursales'
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
}

const goToCreate = () => {
  router.push('/sucursales/create')
}

onMounted(() => {
  fetchSucursales()
})
</script>

<template>
  <div class="">
    <h1>Listado de Sucursales</h1>
    <button @click="goToCreate" class="create-button">Crear Nueva Sucursal</button>

    <div v-if="loading && sucursales.length === 0" class="loading">Cargando sucursales...</div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else-if="sucursales.length > 0" class="sucursales-grid">
      <div v-for="sucursal in sucursales" :key="sucursal.id" class="sucursal-card">
        <h3>{{ sucursal.nombre }}</h3>
        <p><strong>Dirección:</strong> {{ sucursal.direccion }}</p>
        <p><strong>Teléfono:</strong> {{ sucursal.telefono }}</p>
      </div>
    </div>

    <div v-else class="empty-state">No hay sucursales registradas</div>
  </div>
</template>

<style scoped>
.sucursales-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.create-button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.sucursales-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.sucursal-card {
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.sucursal-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.loading,
.empty-state,
.error {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error {
  color: #ff4444;
}
</style>
