import { AxiosInstance } from "axios";
import axiosClient from "./AxiosClientConfig";
import { UserType } from "interfaces/index";
import { UpdatePasswordRequest } from "./dto/Profile.dto";

class Service {
  constructor(private client: AxiosInstance) {}
  async getUser(token?: string): Promise<UserType> {
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      return this.client.get("/persona", { headers });
    }
    return this.client.get("/persona");
  }

  async updatePassword(data: UpdatePasswordRequest): Promise<any> {
    return this.client.post("/profile/update-password", data);
  }
}

export const ProfilApiService = new Service(axiosClient);
