<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toast />
        <Toolbar class="mb-4">
          <template v-slot:start>
            <div class="my-2">
              <Button label="Nuevo" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
            </div>
          </template>
        </Toolbar>

        <DataTable
          ref="dt"
          :value="servicios"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} servicios"
          responsiveLayout="scroll"
        >
          <Column field="nombre" header="Nombre" :sortable="true" style="min-width: 12rem">
            <template #body="slotProps">
              {{ slotProps.data.nombre }}
            </template>
          </Column>
          <Column field="descripcion" header="Descripción" :sortable="true" style="min-width: 16rem">
            <template #body="slotProps">
              {{ slotProps.data.descripcion }}
            </template>
          </Column>
          <Column field="duracion" header="Duración (min)" :sortable="true" style="min-width: 10rem">
            <template #body="slotProps">
              {{ slotProps.data.duracion }}
            </template>
          </Column>
          <Column field="precio" header="Precio" :sortable="true" style="min-width: 10rem">
            <template #body="slotProps">
              {{ slotProps.data.precio }}
            </template>
          </Column>
          <Column field="estado" header="Estado" :sortable="true" style="min-width: 10rem">
            <template #body="slotProps">
              <Tag :value="slotProps.data.estado ? 'Activo' : 'Inactivo'" :severity="getSeverity(slotProps.data.estado)" />
            </template>
          </Column>
          <Column header="Acciones" style="min-width: 10rem">
            <template #body="slotProps">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editServicio(slotProps.data)" />
              <Button icon="pi pi-eye" class="p-button-rounded p-button-info mr-2" @click="viewDetails(slotProps.data)" />
              <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteServicio(slotProps.data)" />
            </template>
          </Column>
        </DataTable>

        <Dialog v-model:visible="servicioDialog" :style="{ width: '450px' }" header="Detalles del Servicio" :modal="true" class="p-fluid">
          <ServicioForm v-if="servicioDialog" :servicio="servicio" @save="saveServicio" @close="hideDialog" />
        </Dialog>

        <Dialog v-model:visible="deleteServicioDialog" :style="{ width: '450px' }" header="Confirmar" :modal="true">
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="servicio"
              >¿Está seguro de eliminar el servicio <b>{{ servicio.nombre }}</b
              >?</span
            >
          </div>
          <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteServicioDialog = false" />
            <Button label="Sí" icon="pi pi-check" class="p-button-text" @click="deleteServicio" />
          </template>
        </Dialog>

        <Dialog v-model:visible="detailDialog" :style="{ width: '450px' }" header="Detalles del Servicio" :modal="true">
          <DetailServicio v-if="detailDialog" :servicio="servicio" @close="detailDialog = false" />
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import ServicioForm from './ServicioForm.vue';
import DetailServicio from './DetailServicio.vue';

const toast = useToast();
const dt = ref(null);
const servicios = ref([]);
const servicioDialog = ref(false);
const deleteServicioDialog = ref(false);
const detailDialog = ref(false);
const servicio = ref({});
const filters = ref({});

onMounted(() => {
  loadServicios();
});

const loadServicios = async () => {
  try {
    // TODO: Implement API call
    servicios.value = [];
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar servicios', life: 3000 });
  }
};

const openNew = () => {
  servicio.value = {
    nombre: '',
    descripcion: '',
    duracion: null,
    precio: null,
    estado: true,
  };
  servicioDialog.value = true;
};

const hideDialog = () => {
  servicioDialog.value = false;
};

const saveServicio = async (data) => {
  try {
    // TODO: Implement API call
    await loadServicios();
    servicioDialog.value = false;
    toast.add({ severity: 'success', summary: 'Éxito', detail: 'Servicio guardado', life: 3000 });
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar servicio', life: 3000 });
  }
};

const editServicio = (data) => {
  servicio.value = { ...data };
  servicioDialog.value = true;
};

const confirmDeleteServicio = (data) => {
  servicio.value = data;
  deleteServicioDialog.value = true;
};

const deleteServicio = async () => {
  try {
    // TODO: Implement API call
    await loadServicios();
    deleteServicioDialog.value = false;
    toast.add({ severity: 'success', summary: 'Éxito', detail: 'Servicio eliminado', life: 3000 });
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar servicio', life: 3000 });
  }
};

const viewDetails = (data) => {
  servicio.value = data;
  detailDialog.value = true;
};

const getSeverity = (estado) => {
  return estado ? 'success' : 'danger';
};
</script>
