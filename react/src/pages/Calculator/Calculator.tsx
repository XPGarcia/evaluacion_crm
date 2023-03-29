import { useState } from 'react';
import { CalculatorResult } from '../../types/calculatorResult.type';
import CalculatorBlock from './components/CalculatorBlock';
import Results from './components/Results';

export default function Calculator() {
  const [results, setResults] = useState<CalculatorResult[]>([]);

  const countPairsWithDiff = (arr: number[], targetDiff: number) => {
    arr.sort((a, b) => a - b);

    let count = 0;
    let left = 0;
    let right = 1;

    while (right < arr.length) {
      const diff = arr[right] - arr[left];
      if (diff === targetDiff) {
        count++;
        left++;
        right++;
      } else if (diff < targetDiff) {
        right++;
      } else {
        left++;
        if (left === right) {
          right++;
        }
      }
    }

    return count;
  };

  const updateResults = (result: CalculatorResult) => {
    setResults([...results, result]);
  };

  return (
    <div className="flex flex-col items-center">
      <CalculatorBlock onNewCalculation={updateResults} />
      <div className="w-full mt-8">
        <Results results={results} />
      </div>
    </div>
  );
}
