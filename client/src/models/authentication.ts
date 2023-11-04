import { IUser } from "./user";

interface IAuthenticationTokens {
  token: string;
  type: "bearer" | string;
}

export interface IAuthenticationPayload {
  authorisation: IAuthenticationTokens;
  user: IUser;
  status: string;
}

export interface ISignInRequest {
  email: string;
  password: string;
}

export interface IAuthenticationInfoResponse {
  user: IUser;
}