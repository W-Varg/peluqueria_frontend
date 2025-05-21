<script setup lang="ts">
import { ReservationService } from '@/service/ReservationService';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import ReservationForm from './ReservationForm.vue';
import { onMounted, ref } from 'vue';
import { type Reservation, EstadoReserva } from '@/types/reservation';

const toast = useToast();
const dt = ref();
const reservations = ref<Reservation[]>([]);
const deleteReservationDialog = ref(false);
const reservation = ref<Reservation | null>(null);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const refReservationForm = ref();

onMounted(async () => {
  await loadReservations();
});

async function loadReservations() {
  try {
    const data = await ReservationService.getReservations();
    reservations.value = data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: err.response?.data?.message || 'Error al cargar reservas',
      life: 3000,
    });
  }
}

const editReservation = (res: Reservation) => {
  refReservationForm.value?.openDialog(res);
};

const handleReservationSaved = () => {
  loadReservations();
};

const confirmDeleteReservation = (res: Reservation) => {
  reservation.value = res;
  deleteReservationDialog.value = true;
};

const deleteReservation = async () => {
  try {
    if (reservation.value?.id !== undefined) {
      await ReservationService.deleteReservation(reservation.value.id);
      reservations.value = reservations.value.filter((val) => val.id !== reservation.value?.id);
      deleteReservationDialog.value = false;
      reservation.value = null;
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Reserva Eliminada',
        life: 3000,
      });
    }
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: err.response?.data?.message || 'Error al eliminar la reserva',
      life: 3000,
    });
  }
};

const getStatusSeverity = (status: EstadoReserva) => {
  switch (status) {
    case EstadoReserva.PENDIENTE:
      return 'warning';
    case EstadoReserva.CONFIRMADA:
      return 'info';
    case EstadoReserva.COMPLETADA:
      return 'success';
    case EstadoReserva.CANCELADA:
      return 'danger';
    default:
      return 'secondary';
  }
};

const formatDateTime = (date: Date) => {
  return new Date(date).toLocaleString();
};
</script>

<template>
  <div class="card">
    <Toolbar class="mb-6">
      <template #start>
        <Button label="Actualizar" icon="pi pi-refresh" severity="secondary" @click="loadReservations" />
      </template>
      <template #end>
        <Button label="Nueva Reserva" icon="pi pi-plus" severity="primary" class="mr-2" @click="refReservationForm?.openDialog()" />
      </template>
    </Toolbar>

    <DataTable
      ref="dt"
      :value="reservations"
      dataKey="id"
      :paginator="true"
      :rows="10"
      :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} reservas"
    >
      <template #header>
        <div class="flex flex-wrap gap-2 items-center justify-between">
          <h4 class="m-0">Gestionar Reservas</h4>
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Buscar..." />
          </IconField>
        </div>
      </template>

      <Column field="id" header="ID" sortable style="min-width: 5rem"></Column>
      <Column field="fecha" header="Fecha" sortable style="min-width: 10rem">
        <template #body="{ data }">
          {{ formatDateTime(data.fecha) }}
        </template>
      </Column>
      <Column field="cliente.nombre" header="Cliente" sortable style="min-width: 12rem"></Column>
      <Column field="servicio.nombre" header="Servicio" sortable style="min-width: 12rem"></Column>
      <Column field="empleado.nombre" header="Empleado" sortable style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.empleado?.nombre || 'Sin asignar' }}
        </template>
      </Column>
      <Column field="estado" header="Estado" sortable style="min-width: 10rem">
        <template #body="{ data }">
          <Tag :value="data.estado" :severity="getStatusSeverity(data.estado)" />
        </template>
      </Column>
      <Column :exportable="false" style="min-width: 12rem">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editReservation(slotProps.data)" />
          <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteReservation(slotProps.data)" />
        </template>
      </Column>
    </DataTable>
  </div>

  <ReservationForm ref="refReservationForm" @reservation-saved="handleReservationSaved" />

  <Dialog v-model:visible="deleteReservationDialog" :style="{ width: '450px' }" header="Confirmar" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="reservation">
        ¿Está seguro que desea eliminar la reserva del cliente
        <b>{{ reservation.cliente?.nombre }}</b
        >?
      </span>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" text @click="deleteReservationDialog = false" />
      <Button label="Sí" icon="pi pi-check" text @click="deleteReservation" />
    </template>
  </Dialog>
</template>

<style scoped>
.card {
  background: var(--surface-card);
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}
</style>
