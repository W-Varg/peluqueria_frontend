<script setup lang="ts">
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'primevue/usetoast';
import { toTypedSchema } from '@vee-validate/yup';
import { EmpleadoService } from '@/service/EmpleadoService';
import type { Empleado } from '@/types/empleado';

const toast = useToast();
const dialog = ref(false);

const schema = yup.object({
  id: yup.number().optional(),
  nombre: yup.string().required('El nombre es requerido'),
  apellido: yup.string().required('El apellido es requerido'),
  telefono: yup.string().required('El teléfono es requerido'),
  email: yup.string().required('El email es requerido'),
  estado: yup.boolean().required('El estado es requerido'),
});

const { handleSubmit, resetForm, setValues, errors } = useForm({
  validationSchema: toTypedSchema(schema),
});

const { value: nombre } = useField<string>('nombre');
const { value: apellido } = useField<string>('apellido');
const { value: telefono } = useField<string>('telefono');
const { value: email } = useField<string>('email');
const { value: estado } = useField<boolean>('estado');

const emit = defineEmits(['saved']);

const openDialog = (item: Empleado | null = null) => {
  if (item) {
    setValues({ id: item.id, nombre: item.nombre, email: item.email, telefono: item.telefono });
  }
  dialog.value = true;
};

const hideDialog = () => {
  dialog.value = false;
  resetForm();
};

const onSubmit = handleSubmit(async (formData: Empleado) => {
  try {
    let result: Empleado;
    if (formData.id) {
      result = await EmpleadoService.updateEmpleado(formData.id, formData);
      toast.add({ severity: 'success', summary: 'Éxito', detail: 'Sucursal Actualizada', life: 3000 });
    } else {
      result = await EmpleadoService.createEmpleado(formData);
      toast.add({ severity: 'success', summary: 'Éxito', detail: 'Sucursal Creada', life: 3000 });
    }
    emit('saved', result);

    hideDialog();
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: err.response?.data?.message || 'Error al guardar la sucursal',
      life: 3000,
    });
  }
});

defineExpose({ openDialog });
</script>

<template>
  <div>
    <Dialog v-model:visible="dialog" :style="{ width: '450px' }" header="Detalles de Sucursal" :modal="true" class="p-fluid">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
      <div class="flex items-center gap-4 mb-8">
        <label for="nombre">Nombre</label>
        <InputText id="nombre" v-model="nombre" autofocus :class="{ 'p-invalid': errors.nombre }" />
        <small class="p-error" v-if="errors.nombre">{{ errors.nombre }}</small>
      </div>

      <div class="flex items-center gap-4 mb-8">
        <label for="apellido">Apellido</label>
        <InputText id="apellido" v-model="apellido" :class="{ 'p-invalid': errors.apellido }" />
        <small class="p-error" v-if="errors.nombre">{{ errors.nombre }}</small>
      </div>

      <div class="flex items-center gap-4 mb-8">
        <label for="telefono">Teléfono</label>
        <InputText id="telefono" v-model="telefono" :class="{ 'p-invalid': errors.telefono }" />
        <small class="p-error" v-if="errors.nombre">{{ errors.nombre }}</small>
      </div>

      <div class="flex items-center gap-4 mb-8">
        <label for="email">Email</label>
        <InputText id="email" v-model="email" type="email" :class="{ 'p-invalid': errors.email }" />
        <small class="p-error" v-if="errors.nombre">{{ errors.nombre }}</small>
      </div>

      <div class="flex items-center gap-4 mb-8">
        <label for="estado">Estado</label>
        <InputSwitch id="estado" v-model="estado" :class="{ 'p-invalid': errors.estado }" />
        <small class="p-error" v-if="errors.nombre">{{ errors.nombre }}</small>
      </div>

      <div class="flex justify-end gap-2">
        <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Guardar" icon="pi pi-check" @click="onSubmit" />
      </div>
    </Dialog>
  </div>
</template>
