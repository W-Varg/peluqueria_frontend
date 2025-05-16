<template>
  <Dialog
    :visible="visible"
    :header="cliente?.id ? 'Editar Cliente' : 'Nuevo Cliente'"
    :modal="true"
    class="p-fluid"
    :style="{ width: '450px' }"
    @update:visible="$emit('close')"
  >
    <div class="field">
      <label for="nombre">Nombre</label>
      <InputText
        id="nombre"
        v-model="formData.nombre"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !formData.nombre }"
      />
      <small class="p-error" v-if="submitted && !formData.nombre">El nombre es requerido.</small>
    </div>

    <div class="field">
      <label for="apellido">Apellido</label>
      <InputText
        id="apellido"
        v-model="formData.apellido"
        required="true"
        :class="{ 'p-invalid': submitted && !formData.apellido }"
      />
      <small class="p-error" v-if="submitted && !formData.apellido">El apellido es requerido.</small>
    </div>

    <div class="field">
      <label for="email">Email</label>
      <InputText
        id="email"
        v-model="formData.email"
        required="true"
        type="email"
        :class="{ 'p-invalid': submitted && !formData.email }"
      />
      <small class="p-error" v-if="submitted && !formData.email">El email es requerido.</small>
    </div>

    <div class="field">
      <label for="telefono">Teléfono</label>
      <InputText
        id="telefono"
        v-model="formData.telefono"
        required="true"
        :class="{ 'p-invalid': submitted && !formData.telefono }"
      />
      <small class="p-error" v-if="submitted && !formData.telefono">El teléfono es requerido.</small>
    </div>

    <template #footer>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        outlined
        @click="$emit('close')"
        class="p-button-text"
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        @click="handleSubmit"
        :loading="loading"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Cliente, ClienteCreate } from '@/interfaces/Cliente';

const props = defineProps<{
  visible: boolean;
  cliente?: Cliente;
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'submit', data: ClienteCreate): void;
}>();

const formData = ref<ClienteCreate>({
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
});

const submitted = ref(false);

watch(() => props.cliente, (newCliente) => {
  if (newCliente) {
    formData.value = {
      nombre: newCliente.nombre,
      apellido: newCliente.apellido,
      email: newCliente.email,
      telefono: newCliente.telefono,
    };
  } else {
    formData.value = {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
    };
  }
}, { immediate: true });

const handleSubmit = () => {
  submitted.value = true;

  if (formData.value.nombre && formData.value.apellido && formData.value.email && formData.value.telefono) {
    emit('submit', formData.value);
  }
};
</script> 