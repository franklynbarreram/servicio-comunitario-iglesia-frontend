import { AxiosInstance } from "axios";
import axiosClient from "./AxiosClientConfig";

class Service {
  constructor(private client: AxiosInstance) {}

  async getAll(params: any): Promise<any> {
    const { id_club } = params;
    return this.client.get(`/miembros/personas_disponibles/${id_club}`, {
      params,
    });
  }
}

export const DirectorService = new Service(axiosClient);
