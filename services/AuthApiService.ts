import { AxiosInstance } from "axios";
import axiosClient from "./AxiosClientConfig";
import {
  AuthSession,
  LoginRequest,
  UserRegisterRequest,
  VerifyValuesRequest,
  VerifyValuesResponse,
} from "./dto/Auth.dto";

class Service {
  constructor(private client: AxiosInstance) {}
  async verifyValues(
    payload: VerifyValuesRequest
  ): Promise<VerifyValuesResponse> {
    return this.client.post("/auth/check-values", payload);
  }

  async registerUser(payload: any): Promise<any> {
    return this.client.post("/auth/signup", payload);
  }
  async sendEmailRecoveryPassword(payload: any): Promise<any> {
    return this.client.post("/auth/forgot_password", payload);
  }
  async changePassword(payload: any): Promise<any> {
    return this.client.post("/auth/reset_password", payload);
  }
  async login(payload: LoginRequest): Promise<AuthSession> {
    return this.client.post("/users/login", payload);
  }

  async changeRol(params: any): Promise<any> {
    const { scope } = params;
    return this.client.get(`/auth/change/${scope}`, { params });
  }
}

export const AuthService = new Service(axiosClient);
