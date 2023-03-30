import { useEffect, useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import { CalculatedPair } from '../../types/calculatedPair';
import CalculatorBlock from './components/CalculatorBlock';
import Results from './components/Results';
import { CalculatorService } from './services/CalculatorService.service';

export default function Calculator() {
  const { setIsLoading, openErrorSnackbar } = useStateContext();

  const [results, setResults] = useState<CalculatedPair[]>([]);

  useEffect(() => {
    setIsLoading(true);
    CalculatorService.getCalculatedPairs()
      .then((calculatedPairs) => setResults(calculatedPairs))
      .catch((e) => {
        console.log(e);
        openErrorSnackbar();
      })
      .finally(() => setIsLoading(false));
  }, []);

  const updateResults = (result: CalculatedPair) => {
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
