<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getSucursalById, updateSucursal, deleteSucursal, getEmpleadosBySucursal } from '@/services/sucursal.api';

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);
const sucursal = ref<any>(null);
const empleados = ref<any[]>([]);
const loading = ref(false);
const error = ref('');
const isEditing = ref(false);
const editForm = ref({ nombre: '', direccion: '', telefono: '' });

const fetchData = async () => {
  try {
    loading.value = true;
    sucursal.value = await getSucursalById(id);
    empleados.value = await getEmpleadosBySucursal(id);
    Object.assign(editForm.value, sucursal.value);
  } catch (err) {
    error.value = 'Error al cargar los datos de la sucursal';
    console.error('Error:', err);
  } finally {
    loading.value = false;
  }
};

const handleUpdate = async () => {
  try {
    loading.value = true;
    await updateSucursal(id, editForm.value);
    await fetchData();
    isEditing.value = false;
  } catch (err) {
    error.value = 'Error al actualizar la sucursal';
    console.error('Error:', err);
  } finally {
    loading.value = false;
  }
};

const handleDelete = async () => {
  if (confirm('¿Estás seguro de eliminar esta sucursal?')) {
    try {
      loading.value = true;
      await deleteSucursal(id);
      router.push('/sucursales');
    } catch (err) {
      error.value = 'Error al eliminar la sucursal';
      console.error('Error:', err);
    } finally {
      loading.value = false;
    }
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="detail-container">
    <div v-if="loading && !sucursal" class="loading">Cargando sucursal...</div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else-if="sucursal">
      <div class="header">
        <h1>
          {{ isEditing ? 'Editar Sucursal' : sucursal.nombre }}
        </h1>
        <div class="actions">
          <button @click="isEditing ? (isEditing = false) : (isEditing = true)" class="edit-button">
            {{ isEditing ? 'Cancelar' : 'Editar' }}
          </button>
          <button @click="handleDelete" class="delete-button">Eliminar Sucursal</button>
        </div>
      </div>

      <form v-if="isEditing" @submit.prevent="handleUpdate" class="edit-form">
        <div class="form-group">
          <label>Nombre:</label>
          <input v-model="editForm.nombre" required />
        </div>
        <div class="form-group">
          <label>Dirección:</label>
          <input v-model="editForm.direccion" required />
        </div>
        <div class="form-group">
          <label>Teléfono:</label>
          <input v-model="editForm.telefono" required />
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Guardando...' : 'Guardar Cambios' }}
        </button>
      </form>

      <div v-else class="sucursal-info">
        <p><strong>Dirección:</strong> {{ sucursal.direccion }}</p>
        <p><strong>Teléfono:</strong> {{ sucursal.telefono }}</p>
      </div>

      <div class="empleados-section">
        <h2>Empleados en esta sucursal</h2>
        <div v-if="empleados.length > 0" class="empleados-list">
          <div v-for="empleado in empleados" :key="empleado.id" class="empleado-card">
            <h3>{{ empleado.nombre }}</h3>
            <p>Email: {{ empleado.email }}</p>
          </div>
        </div>
        <div v-else class="empty-state">No hay empleados en esta sucursal</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.edit-button,
.delete-button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.edit-button {
  background-color: #42b983;
  color: white;
  border: none;
  margin-left: 1rem;
}

.delete-button {
  background-color: #ff4444;
  color: white;
  border: none;
}

.sucursal-info {
  border: 1px solid #ccc;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.empleados-section {
  margin-top: 2rem;
}

.empleados-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.empleado-card {
  background: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.edit-form {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button[type='submit'] {
  padding: 0.75rem 1.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.loading,
.empty-state,
.error {
  text-align: center;
  padding: 2rem;
}

.error {
  color: #ff4444;
}
</style>
