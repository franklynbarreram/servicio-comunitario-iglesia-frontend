import { AxiosInstance } from "axios";
import axiosClient from "./AxiosClientConfig";

class Service {
  constructor(private client: AxiosInstance) {}

  async create(data: any): Promise<any> {
    return this.client.post("/iglesias", data);
  }
  async edit(data: any, id: any): Promise<any> {
    return this.client.put(`/iglesias/${id}`, data);
  }
  async delete(id: any): Promise<any> {
    return this.client.delete(`/iglesias/${id}`);
  }
  async getAll(params?: any): Promise<any> {
    return this.client.get("/iglesias", { params });
  }
}

export const IglesiasServices = new Service(axiosClient);
