import { ChangeEvent, MouseEvent, useState } from 'react';
import { CalculatorResult } from '../../../types/calculatorResult.type';
import { calculateDiff } from '../hooks/calculateDiff';
import CalculatorInput from './CalculatorInput';

interface Props {
  onNewCalculation: (result: CalculatorResult) => void;
}

export default function CalculatorBlock({ onNewCalculation }: Props) {
  const [arrayInput, setArrayInput] = useState('');
  const [objectiveValue, setObjectiveValue] = useState('');

  const changeArrayInput = (e: ChangeEvent<HTMLInputElement>) => {
    setArrayInput(e.target.value);
  };

  const changeObjectiveValue = (e: ChangeEvent<HTMLInputElement>) => {
    setObjectiveValue(e.target.value);
  };

  const parseArray = (): number[] => {
    const onlyNumbersString = arrayInput.slice(1, arrayInput.length - 1);
    const numberArray = onlyNumbersString
      .split(',')
      .map((number) => parseInt(number));
    return numberArray;
  };

  const isValidArray = (arrayString: string) => {
    if (arrayString.length === 0) return false;

    const regex = /^\[[1-9]\d*(,\s*[1-9]\d*)*\]$/;
    return regex.test(arrayString);
  };

  const calculate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isValidArray(arrayInput)) return;

    const numberArray = parseArray();
    const objectiveNumber = parseInt(objectiveValue);
    // const count = countPairsWithDiff(numberArray, objectiveNumber);

    const payload = {
      array: numberArray,
      objectiveValue: objectiveNumber,
    };

    calculateDiff(payload)
      .then(({ result }) => {
        console.log(result);
        const newResult: CalculatorResult = {
          array: numberArray,
          objectiveValue: objectiveNumber,
          result: result,
        };
        onNewCalculation(newResult);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <h3 className="text-4xl font-bold uppercase">Calculator</h3>
      <div className="flex w-full mt-8">
        <CalculatorInput
          type="text"
          value={arrayInput}
          name="array"
          placeholder="[1, 4, 3, 2, 5]"
          onChange={changeArrayInput}
        />
        <CalculatorInput
          type="number"
          value={objectiveValue}
          name="objectiveValue"
          placeholder="2"
          onChange={changeObjectiveValue}
        />
      </div>
      <button
        onClick={calculate}
        className="text-white bg-purple-600 hover:bg-purple-800 font-semibold uppercase mt-5 w-36 py-2 rounded shadow"
      >
        Calculate
      </button>
    </>
  );
}
