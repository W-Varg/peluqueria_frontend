<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { FilterMatchMode } from '@primevue/core/api';
import ServicioForm from './ServicioForm.vue';
import { CrudService } from '@/service/ServicioService';
import { type Servicio, type ServicioFilters } from '@/types/servicio';

const toast = useToast();
const dt = ref();
const servicios = ref<Servicio[]>([]);
const deleteServicioDialog = ref(false);
const servicio = ref<Servicio | null>(null);
const filters = ref<ServicioFilters>({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const refServicioForm = ref();

onMounted(async () => {
  await loadServicios();
});

async function loadServicios() {
  try {
    const data = await CrudService.getServices();
    servicios.value = data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: err.response?.data?.message || 'Error al cargar servicios',
      life: 3000,
    });
  }
}

const editServicio = (serv: Servicio) => {
  refServicioForm.value?.openDialog(serv);
};

const handleServicioSaved = () => {
  loadServicios();
};

const confirmDeleteServicio = (serv: Servicio) => {
  servicio.value = serv;
  deleteServicioDialog.value = true;
};

const deleteServicio = async () => {
  try {
    if (servicio.value?._id) {
      await CrudService.deleteServices(servicio.value._id);
      servicios.value = servicios.value.filter((val) => val._id !== servicio.value?._id);
      deleteServicioDialog.value = false;
      servicio.value = null;
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Servicio Eliminado',
        life: 3000,
      });
    }
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: err.response?.data?.message || 'Error al eliminar el servicio',
      life: 3000,
    });
  }
};

const getSeverity = (estado: boolean) => {
  return estado ? 'success' : 'danger';
};
</script>

<template>
  <div class="card">
    <Toolbar class="mb-6">
      <template #start>
        <Button label="Actualizar" icon="pi pi-refresh" severity="secondary" @click="loadServicios" />
      </template>
      <template #end>
        <Button label="Nuevo" icon="pi pi-plus" severity="primary" class="mr-2" @click="refServicioForm?.openDialog()" />
      </template>
    </Toolbar>

    <DataTable
      ref="dt"
      :value="servicios"
      dataKey="_id"
      :paginator="true"
      :rows="10"
      :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} servicios"
      responsiveLayout="scroll"
    >
      <template #header>
        <div class="flex flex-wrap gap-2 items-center justify-between">
          <h4 class="m-0">Gestionar Servicios</h4>
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Buscar..." />
          </IconField>
        </div>
      </template>

      <Column field="_nombre" header="Nombre" sortable style="min-width: 12rem" />
      <Column field="_descripcion" header="Descripción" sortable style="min-width: 16rem" />
      <Column field="_duracion._minutos" header="Duración (min)" sortable style="min-width: 10rem" />
      <Column field="_precio._monto" header="Precio" sortable style="min-width: 10rem">
        <template #body="slotProps"> {{ slotProps.data._precio._monto }} {{ slotProps.data._precio._moneda }} </template>
      </Column>
      <Column field="_estado" header="Estado" sortable style="min-width: 10rem">
        <template #body="slotProps">
          <Tag :value="slotProps.data._estado ? 'Activo' : 'Inactivo'" :severity="getSeverity(slotProps.data._estado)" />
        </template>
      </Column>
      <Column :exportable="false" style="min-width: 12rem">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editServicio(slotProps.data)" />
          <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteServicio(slotProps.data)" />
        </template>
      </Column>
    </DataTable>
  </div>

  <ServicioForm ref="refServicioForm" @saved="handleServicioSaved" />

  <!-- Dialog para confirmar eliminación de un servicio -->
  <Dialog v-model:visible="deleteServicioDialog" :style="{ width: '450px' }" header="Confirmar" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="servicio"
        >¿Está seguro que desea eliminar <b>{{ servicio._nombre }}</b
        >?</span
      >
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" text @click="deleteServicioDialog = false" />
      <Button label="Sí" icon="pi pi-check" text @click="deleteServicio" />
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
