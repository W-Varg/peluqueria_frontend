<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  servicio: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['save', 'close']);

const servicioLocal = ref({ ...props.servicio });
const submitted = ref(false);
const estadoOptions = ref([
  { label: 'Activo', value: true },
  { label: 'Inactivo', value: false },
]);

const saveServicio = () => {
  submitted.value = true;

  if (servicioLocal.value.nombre && servicioLocal.value.descripcion && servicioLocal.value.duracion && servicioLocal.value.precio) {
    emit('save', servicioLocal.value);
  }
};
</script>
<template>
  <form @submit.prevent="saveServicio" class="p-fluid">
    <div class="field">
      <label for="nombre">Nombre</label>
      <InputText id="nombre" v-model.trim="servicioLocal.nombre" required autofocus :class="{ 'p-invalid': submitted && !servicioLocal.nombre }" />
      <small class="p-error" v-if="submitted && !servicioLocal.nombre">El nombre es requerido.</small>
    </div>

    <div class="field">
      <label for="descripcion">Descripción</label>
      <Textarea
        id="descripcion"
        v-model.trim="servicioLocal.descripcion"
        required
        rows="3"
        :class="{ 'p-invalid': submitted && !servicioLocal.descripcion }"
      />
      <small class="p-error" v-if="submitted && !servicioLocal.descripcion">La descripción es requerida.</small>
    </div>

    <div class="field">
      <label for="duracion">Duración (minutos)</label>
      <InputNumber id="duracion" v-model="servicioLocal.duracion" required :min="0" :class="{ 'p-invalid': submitted && !servicioLocal.duracion }" />
      <small class="p-error" v-if="submitted && !servicioLocal.duracion">La duración es requerida.</small>
    </div>

    <div class="field">
      <label for="precio">Precio</label>
      <InputNumber
        id="precio"
        v-model="servicioLocal.precio"
        required
        mode="currency"
        currency="BOB"
        locale="es-BO"
        :min="0"
        :class="{ 'p-invalid': submitted && !servicioLocal.precio }"
      />
      <small class="p-error" v-if="submitted && !servicioLocal.precio">El precio es requerido.</small>
    </div>

    <div class="field">
      <label for="estado">Estado</label>
      <Dropdown
        id="estado"
        v-model="servicioLocal.estado"
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
