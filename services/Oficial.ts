import { AxiosInstance } from "axios";
import axiosClient from "./AxiosClientConfig";

class Service {
  constructor(private client: AxiosInstance) {}

  async getAll(): Promise<any> {
    return this.client.get("/eventos/personas_disponibles_oficial");
  }
}

export const OficialServices = new Service(axiosClient);
