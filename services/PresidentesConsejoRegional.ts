import { AxiosInstance } from "axios";
import axiosClient from "./AxiosClientConfig";

class Service {
  constructor(private client: AxiosInstance) {}
  // async verifyValues(
  //   payload: VerifyValuesRequest
  // ): Promise<any> {
  //   return this.client.post("/auth/check-values", payload);
  // }

  // async registerUser(payload: UserRegisterRequest): Promise<AuthSession> {
  //   return this.client.post("/auth/register", payload);
  // }

  async getAll(params: any): Promise<any> {
    const { idConsejo } = params;
    return this.client.get(
      `/presidentes_consejo/personas_disponibles/${idConsejo}`,
      { params }
    );
  }
}

export const PresidentesConsejoRegional = new Service(axiosClient);
