<script setup lang="ts">
import { SucursalService } from '@/service/SucursalService';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import SucursalForm from './SucursalForm.vue';
import { onMounted, ref } from 'vue';
import { type Sucursal } from '@/types/sucursal';

const toast = useToast();
const dt = ref();
const sucursales = ref<Sucursal[]>([]);
const deleteSucursalDialog = ref(false);
const sucursal = ref<Sucursal | null>(null);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const refSucursalForm = ref();

onMounted(async () => {
  await loadSucursales();
});

async function loadSucursales() {
  try {
    const data = await SucursalService.getSucursales();
    sucursales.value = data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: err.response?.data?.message || 'Error al cargar sucursales',
      life: 3000,
    });
  }
}

const editSucursal = (suc: Sucursal) => {
  refSucursalForm.value?.openDialog(suc);
};

const handleSucursalSaved = () => {
  loadSucursales();
};

const confirmDeleteSucursal = (suc: Sucursal) => {
  sucursal.value = suc;
  deleteSucursalDialog.value = true;
};

const deleteSucursal = async () => {
  try {
    if (sucursal.value?.id !== undefined) {
      await SucursalService.deleteSucursal(sucursal.value.id);
      sucursales.value = sucursales.value.filter((val) => val.id !== sucursal.value?.id);
      deleteSucursalDialog.value = false;
      sucursal.value = null;
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Sucursal Eliminada',
        life: 3000,
      });
    }
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: err.response?.data?.message || 'Error al eliminar la sucursal',
      life: 3000,
    });
  }
};
</script>

<template>
  <div class="card">
    <Toolbar class="mb-6">
      <template #start>
        <Button label="Actualizar" icon="pi pi-refresh" severity="secondary" @click="loadSucursales" />
      </template>
      <template #end>
        <Button label="Nueva" icon="pi pi-plus" severity="primary" class="mr-2" @click="refSucursalForm?.openDialog()" />
      </template>
    </Toolbar>

    <DataTable
      ref="dt"
      :value="sucursales"
      dataKey="id"
      :paginator="true"
      :rows="10"
      :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} sucursales"
    >
      <template #header>
        <div class="flex flex-wrap gap-2 items-center justify-between">
          <h4 class="m-0">Gestionar Sucursales</h4>
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Buscar..." />
          </IconField>
        </div>
      </template>

      <Column field="id" header="ID" sortable style="min-width: 5rem"></Column>
      <Column field="nombre" header="Nombre" sortable style="min-width: 16rem"></Column>
      <Column field="direccion" header="Dirección" sortable style="min-width: 16rem"></Column>
      <Column field="telefono" header="Teléfono" sortable style="min-width: 10rem"></Column>
      <Column :exportable="false" style="min-width: 12rem">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editSucursal(slotProps.data)" />
          <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteSucursal(slotProps.data)" />
        </template>
      </Column>
    </DataTable>
  </div>

  <SucursalForm ref="refSucursalForm" @saved="handleSucursalSaved" />

  <!-- Dialog para confirmar eliminación de una sucursal -->
  <Dialog v-model:visible="deleteSucursalDialog" :style="{ width: '450px' }" header="Confirmar" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="sucursal"
        >¿Está seguro que desea eliminar <b>{{ sucursal.nombre }}</b
        >?</span
      >
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" text @click="deleteSucursalDialog = false" />
      <Button label="Sí" icon="pi pi-check" text @click="deleteSucursal" />
    </template>
  </Dialog>
</template>

<style scoped>
.card {
  background: var(--surface-card);
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}
</style>
