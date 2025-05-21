<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import type { Cliente, ClienteCreate } from '@/interfaces/Cliente';
import { ClienteService } from '@/services/ClienteService';
import ClienteForm from './ClienteForm.vue';

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
  } catch {
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
      } catch {
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
  } catch {
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

const filters = ref({
  global: { value: null, matchMode: 'contains' },
});

const getSeverity = (estado: boolean) => {
  return estado ? 'success' : 'danger';
};

onMounted(() => {
  loadClientes();
});
</script>

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
            <Button label="Nuevo Cliente" icon="pi pi-plus" @click="handleNuevo" />
          </div>
        </div>
      </template>

      <Column field="_nombre" header="Nombre" sortable></Column>
      <Column field="_email" header="Email" sortable></Column>
      <Column field="_telefono" header="telefono" sortable></Column>
      <Column field="_estado" header="estado">
        <template #body="slotProps">
          <Tag :value="slotProps.data._estado ? 'Activo' : 'Inactivo'" :severity="getSeverity(slotProps.data._estado)" />
        </template>
      </Column>
      <Column field="_visitas" header="visitas"></Column>
      <Column field="_ultimaVisita" header="ultima Visita"></Column>
      <Column header="Acciones" :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <div class="flex items-center gap-2">
            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="handleEditar(slotProps.data)" />
            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="handleEliminar(slotProps.data)" />
          </div>
        </template>
      </Column>
    </DataTable>

    <ClienteForm :visible="dialogVisible" :cliente="selectedCliente" :loading="saving" @close="closeDialog" @submit="handleSubmit" />

    <Toast />
    <ConfirmDialog />
  </div>
</template>
