import { HttpStatusCode } from 'axios';
import axiosClient from '../../../http/axios-client';

interface LoginResponse {
  status_code: HttpStatusCode;
  token?: string;
  message?: string;
}

interface LoginPayload {
  autorizador: string;
  email: string;
  password: string;
  environment: string;
}

export async function login(payload: LoginPayload): Promise<{ token: string }> {
  const { data, status } = await axiosClient.post<LoginResponse>(
    '/login',
    payload
  );

  if (!data.token && data.message) throw Error(data.message);

  return { token: data.token! };
}
