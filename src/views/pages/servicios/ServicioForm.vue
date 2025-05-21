<script setup lang="ts">
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { CrudService } from '@/service/ServicioService';
import { useToast } from 'primevue/usetoast';
import { type ServicioDto as Servicio } from '@/types/servicio';
import { toTypedSchema } from '@vee-validate/yup';

const toast = useToast();
const servicioDialog = ref(false);

const schema = yup.object({
  nombre: yup.string().required('El nombre es requerido'),
  descripcion: yup.string().required('La descripción es requerida'),
  duracion: yup.number().required('La duración es requerida').min(0, 'La duración debe ser mayor a 0'),
  precio: yup.number().required('El precio es requerido').min(0, 'El precio debe ser mayor a 0'),
  estado: yup.boolean().required('El estado es requerido'),
});

const { handleSubmit, resetForm, setValues, errors } = useForm<Servicio>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    nombre: '',
    descripcion: '',
    duracion: 0,
    precio: 0,
    estado: true,
  },
});

const { value: nombre } = useField<string>('nombre');
const { value: descripcion } = useField<string>('descripcion');
const { value: duracion } = useField<number>('duracion');
const { value: precio } = useField<number>('precio');
const { value: estado } = useField<boolean>('estado');

const estadoOptions = ref([
  { label: 'Activo', value: true },
  { label: 'Inactivo', value: false },
]);

const emit = defineEmits(['saved']);

const openDialog = (item: Servicio | null = null) => {
  if (item) {
    setValues({
      id: item.id,
      nombre: item.nombre,
      descripcion: item.descripcion,
      duracion: item.duracion,
      precio: item.precio,
      estado: item.estado,
    });
  }
  servicioDialog.value = true;
};

const hideDialog = () => {
  servicioDialog.value = false;
  resetForm();
};

const onSubmit = handleSubmit(async (formData) => {
  try {
    let result: Servicio;
    if (formData.id) {
      result = await CrudService.updateServices(formData.id, formData);
      toast.add({ severity: 'success', summary: 'Éxito', detail: 'Servicio Actualizado', life: 3000 });
    } else {
      result = await CrudService.createServices(formData);
      toast.add({ severity: 'success', summary: 'Éxito', detail: 'Servicio Creado', life: 3000 });
    }
    emit('saved', result);

    hideDialog();
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: err.response?.data?.message || 'Error al guardar el servicio',
      life: 3000,
    });
  }
});

defineExpose({ openDialog });
</script>

<template>
  <div>
    <Dialog v-model:visible="servicioDialog" :style="{ width: '450px' }" header="Detalles de Servicio" :modal="true" class="p-fluid">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">Actualice la información del servicio.</span>

      <div class="flex items-center gap-4 mb-8">
        <label for="nombre">Nombre</label>
        <InputText id="nombre" v-model="nombre" :class="{ 'p-invalid': errors.nombre }" autofocus />
        <small class="p-error" v-if="errors.nombre">{{ errors.nombre }}</small>
      </div>

      <div class="flex items-center gap-4 mb-8">
        <label for="descripcion">Descripción</label>
        <Textarea id="descripcion" v-model="descripcion" :class="{ 'p-invalid': errors.descripcion }" rows="3" />
        <small class="p-error" v-if="errors.descripcion">{{ errors.descripcion }}</small>
      </div>

      <div class="flex items-center gap-4 mb-8">
        <label for="duracion">Duración (minutos)</label>
        <InputNumber id="duracion" v-model="duracion" :class="{ 'p-invalid': errors.duracion }" :min="0" />
        <small class="p-error" v-if="errors.duracion">{{ errors.duracion }}</small>
      </div>

      <div class="flex items-center gap-4 mb-8">
        <label for="precio">Precio</label>
        <InputNumber id="precio" v-model="precio" mode="currency" currency="BOB" locale="es-BO" :min="0" :class="{ 'p-invalid': errors.precio }" />
        <small class="p-error" v-if="errors.precio">{{ errors.precio }}</small>
      </div>

      <div class="flex items-center gap-4 mb-8">
        <label for="estado">Estado</label>
        <Dropdown
          id="estado"
          v-model="estado"
          :options="estadoOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Seleccione un estado"
          :class="{ 'p-invalid': errors.estado }"
        />
        <small class="p-error" v-if="errors.estado">{{ errors.estado }}</small>
      </div>

      <div class="flex justify-end gap-2">
        <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Guardar" icon="pi pi-check" @click="onSubmit" />
      </div>
    </Dialog>
  </div>
</template>
