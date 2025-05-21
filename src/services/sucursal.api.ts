import api from './api';

// Ya implementados
export const getSucursales = async () => {
  try {
    const response = await api.get('/sucursales');
    return response.data;
  } catch (error) {
    console.error('Error fetching sucursales:', error);
    throw error;
  }
};

export const createSucursal = async (sucursalData: { nombre: string; direccion: string; telefono: string }) => {
  try {
    const response = await api.post('/sucursales', sucursalData);
    return response.data;
  } catch (error) {
    console.error('Error creating sucursal:', error);
    throw error;
  }
};

export const getSucursalById = async (id: number) => {
  try {
    const response = await api.get(`/sucursales/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching sucursal with ID ${id}:`, error);
    throw error;
  }
};

export const getEmpleadosBySucursal = async (id: number) => {
  try {
    const response = await api.get(`/sucursales/${id}/empleados`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching empleados for sucursal ${id}:`, error);
    throw error;
  }
};

export const updateSucursal = async (
  id: number,
  updateData: {
    nombre?: string;
    direccion?: string;
    telefono?: string;
  }
) => {
  try {
    const response = await api.patch(`/sucursales/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error(`Error updating sucursal with ID ${id}:`, error);
    throw error;
  }
};

export const deleteSucursal = async (id: number) => {
  try {
    const response = await api.delete(`/sucursales/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting sucursal with ID ${id}:`, error);
    throw error;
  }
};
