import { HttpStatusCode } from 'axios';
import axiosClient from '../../../http/axios-client';
import { AuthService } from '../../../services/auth.service';
import { CalculatorResult } from '../../../types/calculatedPair';

interface CalculatePairsResponse {
  status_code: HttpStatusCode;
  result?: number;
  message?: string;
}

interface CalculatePairsPayload {
  userEmail: string;
  array: number[];
  objectiveValue: number;
}

interface GetCalculatedPairsResponse {
  data: { array: number[]; objective_value: number; result: number }[];
}

export class CalculatorService {
  static async calculatePairs(
    arrayAsString: string,
    objectiveValue: string
  ): Promise<CalculatorResult> {
    const payload: CalculatePairsPayload = {
      userEmail: AuthService.getUser().email,
      array: this.parseArray(arrayAsString),
      objectiveValue: parseInt(objectiveValue),
    };

    const { data, status } = await axiosClient.post<CalculatePairsResponse>(
      '/calculatePairs',
      payload
    );

    if (!data.result && data.message) throw Error(data.message);

    return {
      array: payload.array,
      objectiveValue: payload.objectiveValue,
      result: data.result!,
    };
  }

  static async getCalculatedPairs(): Promise<CalculatorResult[]> {
    const { data, status } = await axiosClient.get<GetCalculatedPairsResponse>(
      '/getCalculatedPairs',
      {
        params: { userEmail: AuthService.getUser().email },
      }
    );

    if (!data.data) throw Error('Something went wrong');

    return data.data.map((calculatedPair) => {
      return {
        array: calculatedPair.array,
        objectiveValue: calculatedPair.objective_value,
        result: calculatedPair.result,
      };
    });
  }

  private static parseArray(arrayAsString: string): number[] {
    const onlyNumbersString = arrayAsString.slice(1, arrayAsString.length - 1);
    const numberArray = onlyNumbersString
      .split(',')
      .map((number) => parseInt(number));
    return numberArray;
  }
}
