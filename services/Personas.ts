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

  async getAll(): Promise<any> {
    return this.client.get("/personas");
  }
  async changeEmail(params: any): Promise<any> {
    return this.client.put(`/personas/email`, { ...params });
  }
  async changeInformationPersonal(params: any): Promise<any> {
    return this.client.put(`/personas`, { ...params });
  }
  async changePassword(params: any): Promise<any> {
    return this.client.put(`/personas/password`, { ...params });
  }
}

export const PersonasServices = new Service(axiosClient);
