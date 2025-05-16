export interface Cliente {
  id?: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ClienteCreate extends Omit<Cliente, 'id' | 'createdAt' | 'updatedAt'> {}
export interface ClienteUpdate extends Partial<ClienteCreate> {} 