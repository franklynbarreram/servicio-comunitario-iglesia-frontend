import { AxiosInstance } from "axios";
import axiosClient from "./AxiosClientConfig";

class Service {
  constructor(private client: AxiosInstance) {}

  async getAll(params: any): Promise<any> {
    const { fecha } = params;
    return this.client.get(`/informes_mensuales/${fecha}`, {
      params,
    });
  }
  async createActivity(data: any): Promise<any> {
    return this.client.post("/informes_mensuales/actividad", data);
  }

	async deleteActivity(id: number): Promise<any> {
    return this.client.delete(`/informes_mensuales/actividad/${id}`);
  }

  async createInforme(data: any): Promise<any> {
    return this.client.post("/informes_mensuales", data);
  }

  async aprobarInforme(data: any): Promise<any> {
    return this.client.put(`/informes_mensuales/firmar/${data?.id_informe}`);
  }
  async cargarPuntuacion(id: any, data: any): Promise<any> {
    return this.client.put(`/informes_mensuales/${id}`, data);
  }
}

export const InformesMensualesService = new Service(axiosClient);
