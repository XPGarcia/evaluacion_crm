import { ChangeEvent, HTMLInputTypeAttribute } from 'react';

interface Props {
  label: string;
  type: HTMLInputTypeAttribute;
  value: string;
  name: string;
  placeholder: string;
  error?: { hasError: boolean; errorText: string };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function CalculatorInput({
  label,
  type,
  value,
  name,
  placeholder,
  error = { hasError: false, errorText: '' },
  onChange,
}: Props) {
  const borders = error.hasError
    ? 'border-red-600 focus:border-red-600'
    : 'border-purple-400 focus:border-purple-600';

  return (
    <div className="w-full md:w-1/2 md:mx-3">
      <label className="text-gray-700 text-xs capitalize">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full text-gray-700 py-1.5 px-4 border-2 ${borders} rounded focus:outline-none`}
      />
      <p className="text-red-600 text-xs capitalize">{error.errorText}</p>
    </div>
  );
}
