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

const viewDetail = (id: number) => {
  router.push(`/sucursales/${id}`)
}

onMounted(() => {
  fetchSucursales()
})
</script>

<template>
  <div class="sucursales-container">
    <div class="header">
      <h1>Listado de Sucursales</h1>
      <button @click="goToCreate" class="create-button">+ Nueva Sucursal</button>
    </div>

    <div v-if="loading && sucursales.length === 0" class="loading">Cargando sucursales...</div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else-if="sucursales.length > 0" class="table-container">
      <table class="sucursales-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sucursal in sucursales" :key="sucursal.id">
            <td>{{ sucursal.nombre }}</td>
            <td>{{ sucursal.direccion }}</td>
            <td>{{ sucursal.telefono }}</td>
            <td>
              <button @click="viewDetail(sucursal.id)" class="detail-button">Ver Detalle</button>
            </td>
          </tr>
        </tbody>
      </table>
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
  font-size: 0.9rem;
}

.create-button:hover {
  background-color: #3aa876;
}

.table-container {
  overflow-x: auto;
  margin-top: 1.5rem;
}

.sucursales-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.sucursales-table th,
.sucursales-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.sucursales-table th {
  color: #f5f5f5;
  font-weight: 600;
}

.sucursales-table tr:hover {
  background-color: #88717167;
}

.detail-button {
  padding: 0.4rem 0.8rem;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}

.detail-button:hover {
  background-color: #0d8bf2;
}

.loading,
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error-message {
  color: #ff4444;
  text-align: center;
  padding: 1rem;
  background-color: #ffeeee;
  border-radius: 4px;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .sucursales-table {
    font-size: 0.9rem;
  }

  .sucursales-table th,
  .sucursales-table td {
    padding: 0.75rem 0.5rem;
  }
}
</style>
