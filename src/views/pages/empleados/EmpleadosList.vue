<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import EmpleadoForm from './EmpleadoForm.vue';
import DetailEmpleado from './DetailEmpleado.vue';
import { EmpleadoService } from '@/service/EmpleadoService';

const toast = useToast();
const empleados = ref([]);
const deleteEmpleadoDialog = ref(false);
const detailDialog = ref(false);
const empleado = ref({});
const filters = ref({});
const empleadoFormRef = ref();

onMounted(() => {
  loadEmpleados();
});

const loadEmpleados = async () => {
  try {
    const data = await EmpleadoService.getEmpleados();
    // TODO: Implement API call
    empleados.value = data;
  } catch {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar empleados', life: 3000 });
  }
};

const saveEmpleado = async () => {
  try {
    await loadEmpleados();
    toast.add({ severity: 'success', summary: 'Éxito', detail: 'Empleado guardado', life: 3000 });
  } catch {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar empleado', life: 3000 });
  }
};

const editEmpleado = (data) => {
  empleadoFormRef.value?.openDialog(data);
};

const confirmDeleteEmpleado = (data) => {
  empleado.value = data;
  deleteEmpleadoDialog.value = true;
};

const deleteEmpleado = async () => {
  try {
    // TODO: Implement API call
    await loadEmpleados();
    deleteEmpleadoDialog.value = false;
    toast.add({ severity: 'success', summary: 'Éxito', detail: 'Empleado eliminado', life: 3000 });
  } catch {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar empleado', life: 3000 });
  }
};

const viewDetails = (data) => {
  empleado.value = data;
  detailDialog.value = true;
};

const getSeverity = (estado) => {
  return estado ? 'success' : 'danger';
};
</script>

<template>
  <div class="card">
    <Toast />

    <Toolbar class="mb-6">
      <template #start>
        <Button label="Actualizar" icon="pi pi-refresh" severity="secondary" @click="loadEmpleados" />
      </template>
      <template #end>
        <Button label="Nuevo" icon="pi pi-plus" severity="primary" class="mr-2" @click="empleadoFormRef?.openDialog()" />
      </template>
    </Toolbar>

    <DataTable
      :value="empleados"
      dataKey="id"
      :paginator="true"
      :rows="10"
      :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} empleados"
      responsiveLayout="scroll"
    >
      <Column field="nombre" header="Nombre" :sortable="true" style="min-width: 12rem">
        <template #body="slotProps">
          {{ slotProps.data.nombre }}
        </template>
      </Column>
      <Column field="apellido" header="Apellido" :sortable="true" style="min-width: 12rem">
        <template #body="slotProps">
          {{ slotProps.data.apellido }}
        </template>
      </Column>
      <Column field="telefono" header="Teléfono" :sortable="true" style="min-width: 10rem">
        <template #body="slotProps">
          {{ slotProps.data.telefono }}
        </template>
      </Column>
      <Column field="email" header="Email" :sortable="true" style="min-width: 14rem">
        <template #body="slotProps">
          {{ slotProps.data.email }}
        </template>
      </Column>
      <Column field="estado" header="Estado" :sortable="true" style="min-width: 10rem">
        <template #body="slotProps">
          <Tag :value="slotProps.data.estado ? 'Activo' : 'Inactivo'" :severity="getSeverity(slotProps.data.estado)" />
        </template>
      </Column>
      <Column header="Acciones" style="min-width: 10rem">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editEmpleado(slotProps.data)" />
          <Button icon="pi pi-eye" class="p-button-rounded p-button-info mr-2" @click="viewDetails(slotProps.data)" />
          <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteEmpleado(slotProps.data)" />
        </template>
      </Column>
    </DataTable>

    <EmpleadoForm ref="empleadoFormRef" @save="saveEmpleado" />

    <Dialog v-model:visible="deleteEmpleadoDialog" :style="{ width: '450px' }" header="Confirmar" :modal="true">
      <div class="flex align-items-center justify-content-center">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="empleado"
          >¿Está seguro de eliminar a <b>{{ empleado.nombre }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteEmpleadoDialog = false" />
        <Button label="Sí" icon="pi pi-check" class="p-button-text" @click="deleteEmpleado" />
      </template>
    </Dialog>

    <Dialog v-model:visible="detailDialog" :style="{ width: '450px' }" header="Detalles del Empleado" :modal="true">
      <DetailEmpleado v-if="detailDialog" :empleado="empleado" @close="detailDialog = false" />
    </Dialog>
  </div>
</template>
