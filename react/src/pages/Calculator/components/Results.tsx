import { CalculatedPair } from '../../../types/calculatedPair';
import ResultCard from './ResultCard';

interface Props {
  results: CalculatedPair[];
}

export default function Results({ results }: Props) {
  return (
    <>
      <h6 className="text-lg uppercase font-semibold">Previous Answers</h6>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-2 mt-2">
        {results.map((result, index) => (
          <ResultCard key={index} result={result} />
        ))}
      </div>
    </>
  );
}
