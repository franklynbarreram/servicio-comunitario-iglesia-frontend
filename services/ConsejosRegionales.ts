import { AxiosInstance } from "axios";
import axiosClient from "./AxiosClientConfig";

class Service {
  constructor(private client: AxiosInstance) {}

  async create(data: any): Promise<any> {
    return this.client.post("/consejos_regionales", data);
  }
  async edit(data: any, id: any): Promise<any> {
    return this.client.put(`/consejos_regionales/${id}`, data);
  }
  async delete(id: any): Promise<any> {
    return this.client.delete(`/consejos_regionales/${id}`);
  }
  async getAll(params?: any): Promise<any> {
    return this.client.get("/consejos_regionales", { params });
  }
  async getAllMiembros(params: any): Promise<any> {
    return this.client.get("/consejos_regionales/miembros", { params });
  }
}

export const ConsejosRegionalesServices = new Service(axiosClient);
