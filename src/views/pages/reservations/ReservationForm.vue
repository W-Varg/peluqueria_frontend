<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { useToast } from 'primevue/usetoast';
import { ReservationService } from '@/service/ReservationService';
import { type Reservation, EstadoReserva } from '@/types/reservation';
import { ClienteService } from '@/service/ClienteService';
import { ServicioService } from '@/service/ServicioService';

const toast = useToast();
const visible = ref(false);
const loading = ref(false);
const submitted = ref(false);
const clientes = ref([]);
const servicios = ref([]);
const estados = Object.values(EstadoReserva);

const reservation = ref<Partial<Reservation>>({
  fecha: new Date(),
  hora: new Date(),
  estado: EstadoReserva.PENDIENTE,
});

const emit = defineEmits(['reservation-saved']);

const loadClientes = async () => {
  try {
    const data = await ClienteService.getClientes();
    clientes.value = data;
  } catch (error) {
    console.error('Error al cargar clientes:', error);
  }
};

const loadServicios = async () => {
  try {
    const data = await ServicioService.getServicios();
    servicios.value = data;
  } catch (error) {
    console.error('Error al cargar servicios:', error);
  }
};

const openDialog = (res?: Reservation) => {
  if (res) {
    reservation.value = { ...res };
    reservation.value.fecha = new Date(res.fecha);
    reservation.value.hora = new Date(res.hora);
  } else {
    reservation.value = {
      fecha: new Date(),
      hora: new Date(),
      estado: EstadoReserva.PENDIENTE,
    };
  }
  submitted.value = false;
  loadClientes();
  loadServicios();
  visible.value = true;
};

const hideDialog = () => {
  visible.value = false;
  submitted.value = false;
  reservation.value = {
    fecha: new Date(),
    hora: new Date(),
    estado: EstadoReserva.PENDIENTE,
  };
};

const saveReservation = async () => {
  try {
    submitted.value = true;

    if (!reservation.value.clienteId || !reservation.value.servicioId || !reservation.value.fecha || !reservation.value.hora) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor complete todos los campos requeridos',
        life: 3000,
      });
      return;
    }

    loading.value = true;
    if (reservation.value.id) {
      await ReservationService.updateReservation(reservation.value.id, reservation.value);
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Reserva Actualizada',
        life: 3000,
      });
    } else {
      await ReservationService.createReservation(reservation.value as Omit<Reservation, 'id'>);
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Reserva Creada',
        life: 3000,
      });
    }
    hideDialog();
    emit('reservation-saved');
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: err.response?.data?.message || 'Error al guardar la reserva',
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
};

defineExpose({
  openDialog,
});
</script>

<template>
  <Dialog
    v-model:visible="visible"
    :style="{ width: '450px' }"
    :header="reservation.id ? 'Editar Reserva' : 'Nueva Reserva'"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="cliente">Cliente</label>
      <Dropdown
        id="cliente"
        v-model="reservation.clienteId"
        :options="clientes"
        optionLabel="nombre"
        optionValue="id"
        placeholder="Seleccione un cliente"
        :class="{ 'p-invalid': submitted && !reservation.clienteId }"
      />
      <small class="p-error" v-if="submitted && !reservation.clienteId">Cliente es requerido.</small>
    </div>

    <div class="field">
      <label for="servicio">Servicio</label>
      <Dropdown
        id="servicio"
        v-model="reservation.servicioId"
        :options="servicios"
        optionLabel="nombre"
        optionValue="id"
        placeholder="Seleccione un servicio"
        :class="{ 'p-invalid': submitted && !reservation.servicioId }"
      />
      <small class="p-error" v-if="submitted && !reservation.servicioId">Servicio es requerido.</small>
    </div>

    <div class="field">
      <label for="fecha">Fecha</label>
      <Calendar
        id="fecha"
        v-model="reservation.fecha"
        dateFormat="dd/mm/yy"
        :showTime="false"
        :class="{ 'p-invalid': submitted && !reservation.fecha }"
      />
      <small class="p-error" v-if="submitted && !reservation.fecha">Fecha es requerida.</small>
    </div>

    <div class="field">
      <label for="hora">Hora</label>
      <Calendar
        id="hora"
        v-model="reservation.hora"
        :timeOnly="true"
        :class="{ 'p-invalid': submitted && !reservation.hora }"
      />
      <small class="p-error" v-if="submitted && !reservation.hora">Hora es requerida.</small>
    </div>

    <div v-if="reservation.id" class="field">
      <label for="estado">Estado</label>
      <Dropdown
        id="estado"
        v-model="reservation.estado"
        :options="estados"
        placeholder="Seleccione un estado"
        :class="{ 'p-invalid': submitted && !reservation.estado }"
      />
      <small class="p-error" v-if="submitted && !reservation.estado">Estado es requerido.</small>
    </div>

    <template #footer>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        text
        @click="hideDialog"
        :disabled="loading"
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        @click="saveReservation"
        :loading="loading"
      />
    </template>
  </Dialog>
</template>

<style scoped>
.field {
  margin-bottom: 1.5rem;
}
</style> 