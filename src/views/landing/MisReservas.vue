<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';

const authStore = useAuthStore();
const toast = useToast();
const loading = ref(false);

interface Reserva {
  _id: number;
  _fecha: string;
  _hora: string;
  _estado: 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'COMPLETADA';
  _servicio: {
    _id: number;
    _nombre: string;
    _duracion: number;
    _precio: number;
  };
  _empleado: {
    _id: number;
    _nombre: string;
  };
}

const reservas = ref<Reserva[]>([]);
const selectedReserva = ref<Reserva | null>(null);
const deleteDialog = ref(false);

const fetchReservas = async () => {
  loading.value = true;
  try {
    const { data } = await axios.get<Reserva[]>(`/api/reservas/cliente/${authStore.user?.clienteId}`);
    reservas.value = data;
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudieron cargar las reservas',
      life: 3000
    });
  } finally {
    loading.value = false;
  }
};

const cancelarReserva = async () => {
  if (!selectedReserva.value) return;
  
  try {
    await axios.put(`/api/reservas/${selectedReserva.value._id}/cancelar`);
    toast.add({
      severity: 'success',
      summary: 'Reserva cancelada',
      detail: 'La reserva ha sido cancelada exitosamente',
      life: 3000
    });
    await fetchReservas();
    deleteDialog.value = false;
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo cancelar la reserva',
      life: 3000
    });
  }
};

const confirmDelete = (reserva: Reserva) => {
  selectedReserva.value = reserva;
  deleteDialog.value = true;
};

const getEstadoSeverity = (estado: Reserva['_estado']) => {
  const severities = {
    PENDIENTE: 'warning',
    CONFIRMADA: 'success',
    CANCELADA: 'danger',
    COMPLETADA: 'info'
  };
  return severities[estado];
};

const formatFecha = (fecha: string) => {
  return new Date(fecha).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

onMounted(() => {
  fetchReservas();
});
</script>

<template>
  <div class="mis-reservas">
    <div class="text-center mb-6">
      <h1 class="text-4xl font-bold text-900 mb-3">Mis Reservas</h1>
      <p class="text-700 text-xl line-height-3">
        Gestiona tus citas y reservaciones
      </p>
    </div>

    <div class="surface-card p-4 border-round shadow-2">
      <div v-if="loading" class="flex justify-content-center">
        <ProgressSpinner />
      </div>

      <div v-else>
        <DataTable
          :value="reservas"
          :paginator="reservas.length > 10"
          :rows="10"
          stripedRows
          v-model:selection="selectedReserva"
          dataKey="_id"
          :rowsPerPageOptions="[10, 20, 50]"
          responsiveLayout="scroll"
        >
          <Column field="_fecha" header="Fecha" :sortable="true">
            <template #body="{ data }">
              {{ formatFecha(data._fecha) }}
            </template>
          </Column>
          
          <Column field="_hora" header="Hora" :sortable="true" />
          
          <Column field="_servicio._nombre" header="Servicio">
            <template #body="{ data }">
              <div class="flex flex-column">
                <span>{{ data._servicio._nombre }}</span>
                <small class="text-500">
                  {{ data._servicio._duracion }} min - 
                  {{ new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'BOB' }).format(data._servicio._precio) }}
                </small>
              </div>
            </template>
          </Column>
          
          <Column field="_empleado._nombre" header="Estilista" />
          
          <Column field="_estado" header="Estado" :sortable="true">
            <template #body="{ data }">
              <Tag :value="data._estado" :severity="getEstadoSeverity(data._estado)" />
            </template>
          </Column>
          
          <Column header="Acciones">
            <template #body="{ data }">
              <Button
                icon="pi pi-times"
                severity="danger"
                text
                rounded
                @click="confirmDelete(data)"
                :disabled="data._estado !== 'PENDIENTE' && data._estado !== 'CONFIRMADA'"
              />
            </template>
          </Column>
        </DataTable>

        <div v-if="reservas.length === 0" class="text-center p-4">
          <p class="text-700">No tienes reservas programadas</p>
          <router-link to="/servicios">
            <Button label="Reservar Ahora" class="mt-3" />
          </router-link>
        </div>
      </div>
    </div>

    <!-- Diálogo de confirmación para cancelar reserva -->
    <Dialog
      v-model:visible="deleteDialog"
      modal
      header="Confirmar Cancelación"
      :style="{ width: '450px' }"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem; color: var(--yellow-700)" />
        <span>¿Estás seguro que deseas cancelar esta reserva?</span>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          text
          @click="deleteDialog = false"
        />
        <Button
          label="Sí"
          icon="pi pi-check"
          severity="danger"
          @click="cancelarReserva"
        />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
</style> 