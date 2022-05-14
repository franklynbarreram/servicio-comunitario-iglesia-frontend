import { AxiosInstance } from "axios";
import axiosClient from "./AxiosClientConfig";

class Service {
  constructor(private client: AxiosInstance) {}

  async create(data: any): Promise<any> {
    return this.client.post("/clubes", data);
  }
  async edit(data: any, id: any): Promise<any> {
    return this.client.put(`/clubes/${id}`, data);
  }
  async getAll(params: any): Promise<any> {
    return this.client.get("/clubes", { params });
  }
}

export const ClubesServices = new Service(axiosClient);
