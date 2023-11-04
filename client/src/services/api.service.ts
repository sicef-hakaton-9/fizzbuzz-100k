import { AxiosAuthorized, AxiosBase } from "../common/axios";
import IApiService from "../models/api-service";
import { IAuthenticationInfoResponse, IAuthenticationPayload, ISignInRequest } from "../models/authentication";
import { IParkingLotResponse } from "../models/parking-lot";

export class ApiService {
  public static IdentityKey: string = "authentication.access_token";

  public static getToken(): string | null {
    return localStorage.getItem(this.IdentityKey);
  }

  public static async getInfoAsync(): Promise<IApiService<IAuthenticationInfoResponse>> {
    try {
      const { data } = await AxiosAuthorized.get("/api/info");
      return { data, ok: true }
    } catch (error: any) {
      return { data: error.response.data[0], ok: false };
    }
  }

  public static async signInAsync(request: ISignInRequest): Promise<IApiService<IAuthenticationPayload>> {
    try {
      const { data } = await AxiosBase.post("/api/login", request);
      return { data, ok: true };
    } catch (error: any) {
      return { data: error.response.data[0], ok: false };
    }
  }

  public static async getParkingLotsAsync(): Promise<IApiService<IParkingLotResponse>> {
    try {
      const { data } = await AxiosAuthorized.get("/parking-lots");
      return { data, ok: true };
    } catch (error: any) {
      return { data: error.response.data[0], ok: false };
    }
  }

  public async getPlansAsync(): Promise<any>{}
}