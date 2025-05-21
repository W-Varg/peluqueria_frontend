<template>
  <form @submit.prevent="saveEmpleado" class="p-fluid">
    <div class="field">
      <label for="nombre">Nombre</label>
      <InputText id="nombre" v-model.trim="empleadoLocal.nombre" required autofocus :class="{ 'p-invalid': submitted && !empleadoLocal.nombre }" />
      <small class="p-error" v-if="submitted && !empleadoLocal.nombre">El nombre es requerido.</small>
    </div>

    <div class="field">
      <label for="apellido">Apellido</label>
      <InputText id="apellido" v-model.trim="empleadoLocal.apellido" required :class="{ 'p-invalid': submitted && !empleadoLocal.apellido }" />
      <small class="p-error" v-if="submitted && !empleadoLocal.apellido">El apellido es requerido.</small>
    </div>

    <div class="field">
      <label for="telefono">Teléfono</label>
      <InputText id="telefono" v-model.trim="empleadoLocal.telefono" required :class="{ 'p-invalid': submitted && !empleadoLocal.telefono }" />
      <small class="p-error" v-if="submitted && !empleadoLocal.telefono">El teléfono es requerido.</small>
    </div>

    <div class="field">
      <label for="email">Email</label>
      <InputText id="email" v-model.trim="empleadoLocal.email" required type="email" :class="{ 'p-invalid': submitted && !empleadoLocal.email }" />
      <small class="p-error" v-if="submitted && !empleadoLocal.email">El email es requerido.</small>
    </div>

    <div class="field">
      <label for="estado">Estado</label>
      <Dropdown
        id="estado"
        v-model="empleadoLocal.estado"
        :options="estadoOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Seleccione un estado"
      />
    </div>

    <div class="flex justify-content-end mt-4">
      <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="$emit('close')" />
      <Button label="Guardar" icon="pi pi-check" class="p-button-text" type="submit" />
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  empleado: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['save', 'close']);

const empleadoLocal = ref({ ...props.empleado });
const submitted = ref(false);
const estadoOptions = ref([
  { label: 'Activo', value: true },
  { label: 'Inactivo', value: false },
]);

const saveEmpleado = () => {
  submitted.value = true;

  if (empleadoLocal.value.nombre && empleadoLocal.value.apellido && empleadoLocal.value.telefono && empleadoLocal.value.email) {
    emit('save', empleadoLocal.value);
  }
};
</script>
