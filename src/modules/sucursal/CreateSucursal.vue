<script setup lang="ts">
import { createSucursal } from '@/services/sucursal.api'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  nombre: '',
  direccion: '',
  telefono: '',
})
const loading = ref(false)
const error = ref('')

const submitForm = async () => {
  try {
    loading.value = true
    error.value = ''
    await createSucursal(form.value)
    router.push('/sucursales')
  } catch (err) {
    error.value = 'Error al crear la sucursal'
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <div class="create-sucursal-container">
    <div class="form-header">
      <h1>Crear Nueva Sucursal</h1>
      <button @click="goBack" class="back-button">Volver</button>
    </div>

    <form @submit.prevent="submitForm" class="sucursal-form">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input
          v-model="form.nombre"
          type="text"
          id="nombre"
          required
          placeholder="Nombre de la sucursal"
        />
      </div>

      <div class="form-group">
        <label for="direccion">Dirección:</label>
        <input
          v-model="form.direccion"
          type="text"
          id="direccion"
          required
          placeholder="Dirección completa"
        />
      </div>

      <div class="form-group">
        <label for="telefono">Teléfono:</label>
        <input
          v-model="form.telefono"
          type="tel"
          id="telefono"
          required
          placeholder="Número de teléfono"
        />
      </div>

      <button type="submit" :disabled="loading" class="submit-button">
        {{ loading ? 'Creando...' : 'Crear Sucursal' }}
      </button>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<style scoped>
.create-sucursal-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.back-button {
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.sucursal-form {
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #3aa876;
}

.submit-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  margin-top: 1rem;
  color: #ff4444;
  text-align: center;
}
</style>
