<template>
  <div class="card">
    <DataTable
      :value="clientes"
      :paginator="true"
      :rows="10"
      :loading="loading"
      :filters="filters"
      filterDisplay="menu"
      :globalFilterFields="['nombre', 'apellido', 'email', 'telefono']"
      responsiveLayout="scroll"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-xl text-900 font-bold">Clientes</span>
          <div class="flex items-center gap-2">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters.global.value" placeholder="Buscar..." />
            </span>
            <Button label="Nuevo Cliente" icon="pi pi-plus" @click="$emit('nuevo')" />
          </div>
        </div>
      </template>

      <Column field="nombre" header="Nombre" sortable></Column>
      <Column field="apellido" header="Apellido" sortable></Column>
      <Column field="email" header="Email" sortable></Column>
      <Column field="telefono" header="Teléfono"></Column>
      <Column header="Acciones" :exportable="false" style="min-width:8rem">
        <template #body="slotProps">
          <div class="flex items-center gap-2">
            <Button
              icon="pi pi-pencil"
              outlined
              rounded
              class="mr-2"
              @click="$emit('editar', slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="$emit('eliminar', slotProps.data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Cliente } from '@/interfaces/Cliente';

const props = defineProps<{
  clientes: Cliente[];
  loading: boolean;
}>();

defineEmits<{
  (e: 'nuevo'): void;
  (e: 'editar', cliente: Cliente): void;
  (e: 'eliminar', cliente: Cliente): void;
}>();

const filters = ref({
  global: { value: null, matchMode: 'contains' },
});
</script> 