import { AxiosInstance } from "axios";
import axiosClient from "./AxiosClientConfig";

class Service {
  constructor(private client: AxiosInstance) {}

  async getAll(params: any): Promise<any> {
    const { id_iglesia } = params;
    return this.client.get(`/ancianos/personas_disponibles/${id_iglesia}`, {
      params,
    });
  }
}

export const AncianosService = new Service(axiosClient);
