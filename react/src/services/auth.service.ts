import axiosClient from '../http/axios-client';
import {
  LoginPayload,
  LoginResponse,
  LogoutPayload,
  LogoutResponse,
} from '../types';

export class AuthService {
  static async login(payload: LoginPayload): Promise<{ token: string }> {
    const { data, status } = await axiosClient.post<LoginResponse>(
      '/login',
      payload
    );

    if (!data.token && data.message) throw Error(data.message);

    return { token: data.token! };
  }

  static async logout(payload: LogoutPayload): Promise<boolean> {
    const { data, status } = await axiosClient.get<LogoutResponse>('/logout', {
      params: { autorizador: payload.email },
    });

    if (!data.token && data.message) throw Error(data.message);

    return true;
  }
}
