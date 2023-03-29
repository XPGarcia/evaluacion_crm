import { HttpStatusCode } from 'axios';
import axiosClient from '../../../http/axios-client';
import { CalculatorResult } from '../../../types/calculatorResult.type';

interface CalculatePairsResponse {
  status_code: HttpStatusCode;
  result?: number;
  message?: string;
}

interface CalculatePairsPayload {
  array: number[];
  objectiveValue: number;
}

export class CalculatorService {
  static async calculatePairs(
    arrayAsString: string,
    objectiveValue: string
  ): Promise<CalculatorResult> {
    const payload: CalculatePairsPayload = {
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

  private static parseArray(arrayAsString: string): number[] {
    const onlyNumbersString = arrayAsString.slice(1, arrayAsString.length - 1);
    const numberArray = onlyNumbersString
      .split(',')
      .map((number) => parseInt(number));
    return numberArray;
  }
}
