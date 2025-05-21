<template>
  <div class="p-fluid">
    <div class="field">
      <label class="font-bold">Nombre</label>
      <div class="text-900">{{ servicio.nombre }}</div>
    </div>

    <div class="field">
      <label class="font-bold">Descripción</label>
      <div class="text-900">{{ servicio.descripcion }}</div>
    </div>

    <div class="field">
      <label class="font-bold">Duración</label>
      <div class="text-900">{{ servicio.duracion }} minutos</div>
    </div>

    <div class="field">
      <label class="font-bold">Precio</label>
      <div class="text-900">{{ formatCurrency(servicio.precio) }}</div>
    </div>

    <div class="field">
      <label class="font-bold">Estado</label>
      <div class="text-900">
        <Tag :value="servicio.estado ? 'Activo' : 'Inactivo'" :severity="getSeverity(servicio.estado)" />
      </div>
    </div>

    <div class="flex justify-content-end mt-4">
      <Button label="Cerrar" icon="pi pi-times" class="p-button-text" @click="$emit('close')" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  servicio: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close']);

const getSeverity = (estado) => {
  return estado ? 'success' : 'danger';
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-BO', {
    style: 'currency',
    currency: 'BOB',
  }).format(value);
};
</script>
