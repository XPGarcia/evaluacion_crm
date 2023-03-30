import { ChangeEvent, MouseEvent, useState } from 'react';
import { useStateContext } from '../../../contexts/ContextProvider';
import { CalculatedPair } from '../../../types/calculatedPair';
import { CalculatorService } from '../services/CalculatorService.service';
import CalculatorInput from './CalculatorInput';

interface Props {
  onNewCalculation: (result: CalculatedPair) => void;
}

export default function CalculatorBlock({ onNewCalculation }: Props) {
  const { setIsLoading, openErrorSnackbar } = useStateContext();

  const [arrayAsString, setArrayAsString] = useState('');
  const [arrayAsStringError, setArrayAsStringError] = useState({
    hasError: false,
    errorText: '',
  });

  const [objectiveValue, setObjectiveValue] = useState('');
  const [objectiveValueError, setObjectiveValueError] = useState({
    hasError: false,
    errorText: '',
  });

  const changeArrayAsString = (e: ChangeEvent<HTMLInputElement>) => {
    setArrayAsString(e.target.value);
  };

  const changeObjectiveValue = (e: ChangeEvent<HTMLInputElement>) => {
    setObjectiveValue(e.target.value);
  };

  const isValidArray = () => {
    const regex = /^\[[1-9]\d*(,\s*[1-9]\d*){1,}\]$/;
    const validArray = regex.test(arrayAsString);
    if (!validArray) {
      setArrayAsStringError({ hasError: true, errorText: 'Array inválido' });
    } else {
      setArrayAsStringError({ hasError: false, errorText: '' });
    }

    return validArray;
  };

  const isValidObjectiveValue = () => {
    const objectNumber = parseInt(objectiveValue);
    const invalidObjectiveValue =
      !objectNumber || objectNumber === null || objectNumber === 0;
    if (invalidObjectiveValue) {
      setObjectiveValueError({
        hasError: true,
        errorText: 'Valor objetivo inválido',
      });
    } else {
      setObjectiveValueError({
        hasError: false,
        errorText: '',
      });
    }
    return !invalidObjectiveValue;
  };

  const isValid = () => {
    const validArray = isValidArray();
    const validObjectiveValue = isValidObjectiveValue();
    return validArray && validObjectiveValue;
  };

  const calculate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isValid()) return;

    setIsLoading(true);
    CalculatorService.calculatePairs(arrayAsString, objectiveValue)
      .then((result) => onNewCalculation(result))
      .catch((e) => {
        console.log(e);
        openErrorSnackbar();
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <h3 className="text-4xl font-bold uppercase">Calculator</h3>
      <div className="flex flex-col md:flex-row w-full mt-8">
        <CalculatorInput
          label="Arreglo de números enteros"
          type="text"
          value={arrayAsString}
          name="array"
          placeholder="[1, 4, 3, 2, 5]"
          error={arrayAsStringError}
          onChange={changeArrayAsString}
        />
        <CalculatorInput
          label="Valor objetivo"
          type="number"
          value={objectiveValue}
          name="objectiveValue"
          placeholder="2"
          error={objectiveValueError}
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
