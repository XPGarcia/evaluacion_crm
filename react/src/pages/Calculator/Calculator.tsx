import { useEffect, useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import { CalculatorResult } from '../../types/calculatorResult.type';
import CalculatorBlock from './components/CalculatorBlock';
import Results from './components/Results';
import { CalculatorService } from './services/CalculatorService.service';

export default function Calculator() {
  const { setIsLoading } = useStateContext();

  const [results, setResults] = useState<CalculatorResult[]>([]);

  useEffect(() => {
    setIsLoading(true);
    CalculatorService.getCalculatedPairs()
      .then((calculatedPairs) => setResults(calculatedPairs))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, []);

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
