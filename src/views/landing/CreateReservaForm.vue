<script setup lang="ts">
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'primevue/usetoast';
import { toTypedSchema } from '@vee-validate/yup';
import { ReservationService } from '@/service/ReservationService';
import type { CreateReservaDto } from '@/types/reservation';
import ServicioSelect from './components/ServicioSelect.vue';
import type { Servicio } from '@/types/servicio';
import { useAuthStore } from '@/stores/auth';

const toast = useToast();
const dialog = ref(false);

const authStore = useAuthStore();

const schema = yup.object({
  fecha: yup.date().required('La fecha es requerida'),
  horaInicio: yup.date().required('La hora es requerida'),
  servicioId: yup.number().required('El servicio es requerido'),
  clienteId: yup.number().required('La sucursal es requerida'),
});

const { handleSubmit, resetForm, setValues, errors } = useForm<CreateReservaDto>({
  validationSchema: toTypedSchema(schema),
});

const { value: fecha } = useField<Date>('fecha');
const { value: horaInicio } = useField<Date>('horaInicio');
const { value: servicioId } = useField<number>('servicioId');

const emit = defineEmits(['saved']);

const openDialog = (servicio: Servicio) => {
  dialog.value = true;
  const user = authStore.user!;
  setValues({
    servicioId: servicio._id,
    clienteId: user.id,
    fecha: new Date(),
  });
};

const hideDialog = () => {
  dialog.value = false;
  resetForm();
};

const onSubmit = handleSubmit(async (formData) => {
  try {
    const result = await ReservationService.createReservationPublic(formData);
    toast.add({ severity: 'success', summary: 'Éxito', detail: 'Sucursal Creada', life: 3000 });
    emit('saved', result);

    hideDialog();
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: err.response?.data?.message || 'Error al crear reserva',
      life: 3000,
    });
  }
});

defineExpose({ openDialog });
</script>

<template>
  <div>
    <Dialog v-model:visible="dialog" :style="{ width: '450px' }" header="Reserva" :modal="true" class="p-fluid">
      <div class="m-5">
        <div class="flex items-center gap-4 mb-8">
          <label for="nombre">Servicio</label>
          <ServicioSelect v-model="servicioId" :class="{ 'p-invalid': errors.servicioId }" />
        </div>
        <div class="flex-auto">
          <label for="icondisplay" class="font-bold block mb-2"> Fecha </label>
          <DatePicker v-model="fecha" showIcon fluid iconDisplay="input" inputId="icondisplay" showButtonBar />
        </div>

        <div class="flex-auto">
          <label for="templatedisplay" class="font-bold block mb-2"> Custom Icon </label>
          <DatePicker v-model="horaInicio" showIcon fluid iconDisplay="input" timeOnly inputId="templatedisplay">
            <template #inputicon="slotProps">
              <i class="pi pi-clock" @click="slotProps.clickCallback" />
            </template>
          </DatePicker>
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Reservar" icon="pi pi-check" @click="onSubmit" />
      </div>
    </Dialog>
  </div>
</template>
