<template>
  <div class="container mx-auto p-4">
    <ClienteTable :clientes="clientes" :loading="loading" @nuevo="handleNuevo" @editar="handleEditar" @eliminar="handleEliminar" />

    <ClienteForm :visible="dialogVisible" :cliente="selectedCliente" :loading="saving" @close="closeDialog" @submit="handleSubmit" />

    <Toast />
    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import type { Cliente, ClienteCreate } from '@/interfaces/Cliente';
import { ClienteService } from '@/services/ClienteService';
import ClienteTable from '@/components/cliente/ClienteTable.vue';
import ClienteForm from '@/components/cliente/ClienteForm.vue';

const confirm = useConfirm();
const toast = useToast();

const clientes = ref<Cliente[]>([]);
const loading = ref(false);
const saving = ref(false);
const dialogVisible = ref(false);
const selectedCliente = ref<Cliente | undefined>();

const loadClientes = async () => {
  try {
    loading.value = true;
    clientes.value = await ClienteService.getAll();
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudieron cargar los clientes',
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
};

const handleNuevo = () => {
  selectedCliente.value = undefined;
  dialogVisible.value = true;
};

const handleEditar = (cliente: Cliente) => {
  selectedCliente.value = cliente;
  dialogVisible.value = true;
};

const handleEliminar = (cliente: Cliente) => {
  confirm.require({
    message: '¿Está seguro de que desea eliminar este cliente?',
    header: 'Confirmar eliminación',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      try {
        await ClienteService.delete(cliente.id!);
        await loadClientes();
        toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Cliente eliminado correctamente',
          life: 3000,
        });
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el cliente',
          life: 3000,
        });
      }
    },
  });
};

const handleSubmit = async (data: ClienteCreate) => {
  try {
    saving.value = true;
    if (selectedCliente.value?.id) {
      await ClienteService.update(selectedCliente.value.id, data);
    } else {
      await ClienteService.create(data);
    }
    await loadClientes();
    closeDialog();
    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: `Cliente ${selectedCliente.value?.id ? 'actualizado' : 'creado'} correctamente`,
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: `No se pudo ${selectedCliente.value?.id ? 'actualizar' : 'crear'} el cliente`,
      life: 3000,
    });
  } finally {
    saving.value = false;
  }
};

const closeDialog = () => {
  dialogVisible.value = false;
  selectedCliente.value = undefined;
};

onMounted(() => {
  loadClientes();
});
</script>
