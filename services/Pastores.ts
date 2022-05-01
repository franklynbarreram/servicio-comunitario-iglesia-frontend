import { AxiosInstance } from "axios";
import axiosClient from "./AxiosClientConfig";

class Service {
  constructor(private client: AxiosInstance) {}

  async getAll(params: any): Promise<any> {
    const { id_distrito } = params;
    return this.client.get(`/pastores/personas_disponibles/${id_distrito}`, {
      params,
    });
  }
}

export const PastoresService = new Service(axiosClient);
