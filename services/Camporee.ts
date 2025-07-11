import { AxiosInstance } from "axios";
import axiosClient from "./AxiosClientConfig";

class Service {
  constructor(private client: AxiosInstance) {}

  async create(data: any): Promise<any> {
    return this.client.post("/camporees", data);
  }

  async createEventCamporee(data: any): Promise<any> {
    return this.client.post("/eventos", data);
  }

  async inscribirClubToEventCamporee(data: any): Promise<any> {
    return this.client.post("/eventos/inscribir_club", data);
  }

  async inscribirConsejoToEventCamporee(data: any): Promise<any> {
    return this.client.post("/eventos/inscribir_consejo", data);
  }

  async editEventCamporee(data: any, id_camporee_evento: any): Promise<any> {
    return this.client.put(`/eventos/${id_camporee_evento}`, data);
  }

  async edit(data: any, id: any): Promise<any> {
    return this.client.put(`/camporees/${id}`, data);
  }
  async createEventPrecamporee(data: any): Promise<any> {
    return this.client.post("/precamporee", data);
  }
  async editEventPrecamporee(
    data: any,
    id_camporee_precamporee: any
  ): Promise<any> {
    return this.client.put(`/precamporee/${id_camporee_precamporee}`, data);
  }
  async getAllEventsCamporeeByIdCamporee(params: any): Promise<any> {
    const { idCamporee } = params;
    return this.client.get(`/eventos/camporee/${idCamporee}`, { params });
  }
  async getById(id: any): Promise<any> {
    return this.client.get(`/camporees/${id}`);
  }

  async getAll(params: any): Promise<any> {
    return this.client.get("/camporees", { params });
  }
  async getAllEventsPrecamporeeByIdCamporee(params: any): Promise<any> {
    const { idCamporee } = params;
    return this.client.get(`/precamporee/camporee/${idCamporee}`, { params });
  }
  async getEventPrecamporeeById(id: any): Promise<any> {
    return this.client.get(`/precamporee/${id}`);
  }

  async getEventCamporeeById(id: any): Promise<any> {
    return this.client.get(`/eventos/${id}`);
  }

  async getAllResultados(params: any): Promise<any> {
    return this.client.get(`/camporees/resultados/${params.idCamporee}`, {
      params,
    });
  }
  async inscribirClubToCamporee(id: any): Promise<any> {
    return this.client.post(`/camporees/inscribir_club/${id}`);
  }
  async getAllClubesType(id: any): Promise<any> {
    return this.client.get(`/camporees/clubes/${id}`);
  }
  async getAllCamporeeType(id: any): Promise<any> {
    return this.client.get(`/camporees/eventos_camporee/${id}`);
  }
  async getAllPreCamporeeType(id: any): Promise<any> {
    return this.client.get(`/camporees/eventos_precamporee/${id}`);
  }
  async createInformePrecamporee(data: any): Promise<any> {
    return this.client.post("/informes_precamporee", data);
  }

  async ApproveInformePrecamporee(params: any): Promise<any> {
    const { id_informe_precamporee } = params;
    return this.client.put(
      `/informes_precamporee/firmar/${id_informe_precamporee}`
    );
  }
  async LoadScoreInformePrecamporee(params: any, data: any): Promise<any> {
    const { id_informe_precamporee } = params;
    return this.client.put(
      `/informes_precamporee/${id_informe_precamporee}`,
      data
    );
  }

  async LoadScoreCamporeeEventClub(data: any): Promise<any> {
    return this.client.post(`/eventos/puntuacion_eliminatoria`, data);
  }

  async LoadScoreCamporeeEvent(data: any): Promise<any> {
    return this.client.post(`/eventos/puntuacion_camporee`, data);
  }
}
export const CamporeeServices = new Service(axiosClient);
