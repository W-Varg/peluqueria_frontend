import api from './api'

export const getSucursales = async () => {
  try {
    const response = await api.get('/sucursales')
    return response.data
  } catch (error) {
    console.error('Error fetching sucursales:', error)
    throw error
  }
}

export const createSucursal = async (sucursalData: {
  nombre: string
  direccion: string
  telefono: string
}) => {
  try {
    const response = await api.post('/sucursales', sucursalData)
    return response.data
  } catch (error) {
    console.error('Error creating sucursal:', error)
    throw error
  }
}
