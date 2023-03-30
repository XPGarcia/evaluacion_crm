import { CalculatedPair } from '../../../types/calculatedPair';

interface Props {
  result: CalculatedPair;
}

export default function ResultCard({ result }: Props) {
  const arrayString = '[' + result.array.join(', ') + ']';

  return (
    <div className="flex flex-col justify-center items-center bg-purple-400 text-white rounded shadow">
      <div className="font-semibold text-lg p-3 max-h-[100px] overflow-y-auto">
        {arrayString}
      </div>
      <div className="w-11/12 bg-white" style={{ height: '1px' }} />
      <div className="flex w-full p-3">
        <div className="w-1/2 border-r border-white">
          <div className="w-full flex justify-center">
            <span className="font-semibold">Valor Objetivo:</span>
            <span className="ml-2 font-bold">{result.objectiveValue}</span>
          </div>
        </div>
        <div className="w-1/2">
          <div className="w-full flex justify-center">
            <span className="font-semibold">Resultado:</span>
            <span className="ml-2 font-bold">{result.result}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
