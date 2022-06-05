import { AxiosInstance } from "axios";
import axiosClient from "./AxiosClientConfig";

class Service {
  constructor(private client: AxiosInstance) {}

  async create(data: any): Promise<any> {
    return this.client.post("/miembros/inscripcion_multiple", data);
  }
  async edit(data: any, id: any): Promise<any> {
    return this.client.put(`/miembros/${id}`, data);
  }
  async delete(params?: any): Promise<any> {
    const { id_persona } = params;
    return this.client.delete(`/miembros/${id_persona}`);
  }
  async getAll(params?: any): Promise<any> {
    return this.client.get("/miembros", { params });
  }
  async getAllMiembrosAvailables(params?: any): Promise<any> {
    return this.client.get("/miembros/personas_disponibles", { params });
  }
}

export const MiembrosServices = new Service(axiosClient);
