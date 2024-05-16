import { AxiosInstance } from "axios";
import axiosClient from "./AxiosClientConfig";

class Service {
  constructor(private client: AxiosInstance) {}

  async upload(file: any): Promise<string> {
		const form = new FormData();
		form.append('file', file);
    const fileName = await this.client.post(`/compress_image`, form);
		return `${process.env.NEXT_PUBLIC_STORAGE}/${fileName}`;
  }
}

export const ImageService = new Service(axiosClient);
