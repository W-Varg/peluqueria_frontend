<script setup lang="ts">
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { SucursalService } from '@/service/SucursalService';
import { useToast } from 'primevue/usetoast';
import { type Sucursal } from '@/types/sucursal';
import { toTypedSchema } from '@vee-validate/yup';

const toast = useToast();
const sucursalDialog = ref(false);

const schema = yup.object({
  nombre: yup.string().required('El nombre es requerido'),
  direccion: yup.string().required('La dirección es requerida'),
  telefono: yup.string().required('El teléfono es requerido'),
});

const { handleSubmit, resetForm, setValues, errors } = useForm<Sucursal>({
  validationSchema: toTypedSchema(schema),
  initialValues: { nombre: '', direccion: '', telefono: '' },
});

const { value: nombre } = useField<string>('nombre');
const { value: direccion } = useField<string>('direccion');
const { value: telefono } = useField<string>('telefono');

const emit = defineEmits(['saved']);

const openDialog = (item: Sucursal | null = null) => {
  if (item) {
    setValues({ id: item.id, nombre: item.nombre, direccion: item.direccion, telefono: item.telefono });
  }
  sucursalDialog.value = true;
};

const hideDialog = () => {
  sucursalDialog.value = false;
  resetForm();
};

const onSubmit = handleSubmit(async (formData) => {
  try {
    let result: Sucursal;
    if (formData.id) {
      result = await SucursalService.updateSucursal(formData.id, formData);
      toast.add({ severity: 'success', summary: 'Éxito', detail: 'Sucursal Actualizada', life: 3000 });
    } else {
      result = await SucursalService.createSucursal(formData);
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
    <Dialog v-model:visible="sucursalDialog" :style="{ width: '450px' }" header="Sucursal" :modal="true" class="p-fluid">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">information.</span>
      <div class="flex items-center gap-4 mb-8">
        <label for="nombre">Nombre</label>
        <InputText id="nombre" v-model="nombre" :class="{ 'p-invalid': errors.nombre }" autofocus />
        <small class="p-error" v-if="errors.nombre">{{ errors.nombre }}</small>
      </div>

      <div class="flex items-center gap-4 mb-8">
        <label for="direccion">Dirección</label>
        <InputText id="direccion" v-model="direccion" :class="{ 'p-invalid': errors.direccion }" />
        <small class="p-error" v-if="errors.direccion">{{ errors.direccion }}</small>
      </div>

      <div class="flex items-center gap-4 mb-8">
        <label for="telefono">Teléfono</label>
        <InputText id="telefono" v-model="telefono" :class="{ 'p-invalid': errors.telefono }" />
        <small class="p-error" v-if="errors.telefono">{{ errors.telefono }}</small>
      </div>

      <div class="flex justify-end gap-2">
        <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Guardar" icon="pi pi-check" @click="onSubmit" />
      </div>
    </Dialog>
  </div>
</template>
