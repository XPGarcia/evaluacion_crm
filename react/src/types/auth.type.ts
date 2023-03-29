import { HttpStatusCode } from 'axios';

export interface LoginResponse {
  status_code: HttpStatusCode;
  token?: string;
  message?: string;
}

export interface LoginPayload {
  autorizador: string;
  email: string;
  password: string;
  environment: string;
}

export interface LogoutResponse {
  status_code: HttpStatusCode;
  token?: string;
  message?: string;
}

export interface LogoutPayload {
  email: string;
}
