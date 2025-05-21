import axios from 'axios';

export const ClienteService = {
  async getClientes() {
    const response = await axios.get('/api/clientes');
    return response.data;
  },

  async getCliente(id: number) {
    const response = await axios.get(`/api/clientes/${id}`);
    return response.data;
  },
}; 