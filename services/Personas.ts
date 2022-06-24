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
}

export const PersonasServices = new Service(axiosClient);
