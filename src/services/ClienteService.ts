import axios from 'axios';
import type { Cliente, ClienteCreate, ClienteUpdate } from '@/interfaces/Cliente';

const API_URL = 'http://localhost:3000/clientes';

export const ClienteService = {
  getAll: async (): Promise<Cliente[]> => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  },

  getById: async (id: number): Promise<Cliente> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  create: async (cliente: ClienteCreate): Promise<Cliente> => {
    const response = await axios.post(`${API_URL}`, cliente);
    return response.data;
  },

  update: async (id: number, cliente: ClienteUpdate): Promise<Cliente> => {
    const response = await axios.patch(`${API_URL}/${id}`, cliente);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/cliente/${id}`);
  },
};
