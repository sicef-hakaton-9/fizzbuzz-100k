import { AxiosAuthorized, AxiosBase } from "../common/axios";
import IApiService from "../models/api-service";
import { IAuthenticationInfoResponse, IAuthenticationPayload, ISignInRequest } from "../models/authentication";
import { IParkingLotResponse } from "../models/parking-lot";
import { IUserReservationStatus } from "../models/reservation";
import { ISubscriptionResponse } from "../models/subscriptions";
import { ILeaderboardUser } from "../models/user";

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
      const { data } = await AxiosBase.post("/login", request);
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

  public static async getSubscriptionsAsync(): Promise<IApiService<ISubscriptionResponse>> {
    try {
      const { data } = await AxiosAuthorized.get("/subscription-plans");
      return { data, ok: true };
    } catch (error: any) {
      return { data: error.response.data[0], ok: false };
    }
  }

  public static async getUserRideStatusAsync(): Promise<IApiService<ISubscriptionResponse>> {
    try {
      const { data } = await AxiosAuthorized.get("/user-ride-status");
      return { data, ok: true };
    } catch (error: any) {
      return { data: error.response.data[0], ok: false };
    }
  }

  public static async rentABikeAsync(bikeCode: string): Promise<IApiService<ISubscriptionResponse>> {
    try {
      const { data } = await AxiosAuthorized.post(`/bikes/${bikeCode}/rent`);
      return { data, ok: true };
    } catch (error: any) {
      return { data: error.message, ok: false };
    }
  }

  public static async finishRideAsync(longitude: number, latitude: number): Promise<IApiService<ISubscriptionResponse>> {
    try {
      const { data } = await AxiosAuthorized.post(`/bikes/finish`, {
        longitude, latitude
      });
      return { data, ok: true };
    } catch (error: any) {
      return { data: error.message, ok: false };
    }
  }

  public static async getReservationStatus(): Promise<IApiService<IUserReservationStatus>> {
    try {
      const { data } = await AxiosAuthorized.get(`/user-reservation-status`);
      return { data, ok: true };
    } catch (error: any) {
      return { data: error.message, ok: false };
    }
  }

  public static async getDashboardStatisticsAsync(): Promise<IApiService<ILeaderboardUser>> {
    try {
      const { data } = await AxiosAuthorized.get(`/leaderboard`);
      return { data, ok: true };
    } catch (error: any) {
      return { data: error.message, ok: false };
    }
  }

  public static async reserveParkingLotAsync(parkingLotId: number): Promise<IApiService<any>> {
    try {
      const { data } = await AxiosAuthorized.get(`/parking-lots/${parkingLotId}/reserve`);
      return { data, ok: true };
    } catch (error: any) {
      return { data: error.message, ok: false };
    }
  }

  public static async reserveBikeAsync(parkingLotId: number): Promise<IApiService<any>> {
    try {
      const { data } = await AxiosAuthorized.post(`/bikes/${parkingLotId}/reserve`);
      return { data, ok: true };
    } catch (error: any) {
      return { data: error.message, ok: false };
    }
  }
}