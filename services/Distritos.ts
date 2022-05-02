import { AxiosInstance } from "axios";
import axiosClient from "./AxiosClientConfig";

class Service {
  constructor(private client: AxiosInstance) {}

  async create(data: any): Promise<any> {
    return this.client.post("/distritos", data);
  }
  async edit(data: any, id: any): Promise<any> {
    return this.client.put(`/distritos/${id}`, data);
  }
  async getAll(params?: any): Promise<any> {
    return this.client.get("/distritos", { params });
  }
}

export const DistritosServices = new Service(axiosClient);
