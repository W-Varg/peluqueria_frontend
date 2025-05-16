<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { getSucursales } from '@/services/sucursal.api'

interface Sucursal {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
}

const router = useRouter()
const toast = useToast()

const sucursales = ref<Sucursal[]>([])
const loading = ref(false)
const selectedSucursal = ref<Sucursal | null>(null)
const filters = ref({
  global: { value: null, matchMode: 'contains' }
})

const fetchSucursales = async () => {
  try {
    loading.value = true
    sucursales.value = await getSucursales()
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error al cargar las sucursales',
      life: 3000
    })
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

const onRowSelect = (event: { data: Sucursal }) => {
  viewDetail(event.data.id)
}

onMounted(() => {
  fetchSucursales()
})
</script>

<template>
  <div class="container mx-auto p-4">
    <DataTable
      :value="sucursales"
      :paginator="true"
      :rows="10"
      :loading="loading"
      :filters="filters"
      filterDisplay="menu"
      :globalFilterFields="['nombre', 'direccion', 'telefono']"
      responsiveLayout="scroll"
      v-model:selection="selectedSucursal"
      selectionMode="single"
      @rowSelect="onRowSelect"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-xl text-900 font-bold">Sucursales</span>
          <div class="flex items-center gap-2">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters.global.value" placeholder="Buscar..." />
            </span>
            <Button label="Nueva Sucursal" icon="pi pi-plus" @click="goToCreate" />
          </div>
        </div>
      </template>

      <Column field="nombre" header="Nombre" sortable></Column>
      <Column field="direccion" header="Dirección" sortable></Column>
      <Column field="telefono" header="Teléfono"></Column>
      <Column header="Acciones" :exportable="false" style="min-width:8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-eye"
            outlined
            rounded
            class="mr-2"
            @click="viewDetail(slotProps.data.id)"
          />
        </template>
      </Column>
    </DataTable>

    <Toast />
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
