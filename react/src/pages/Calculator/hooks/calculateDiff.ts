import { HttpStatusCode } from 'axios';
import axiosClient from '../../../http/axios-client';

interface CalculateDiffResponse {
  status_code: HttpStatusCode;
  result?: number;
  message?: string;
}

interface CalculateDiffPayload {
  array: number[];
  objectiveValue: number;
}

export async function calculateDiff(
  payload: CalculateDiffPayload
): Promise<{ result: number }> {
  const { data, status } = await axiosClient.post<CalculateDiffResponse>(
    '/calculateDiff',
    payload
  );

  if (!data.result && data.message) throw Error(data.message);

  return { result: data.result! };
}
