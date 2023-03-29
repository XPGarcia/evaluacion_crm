import { ChangeEvent, HTMLInputTypeAttribute } from 'react';

interface Props {
  type: HTMLInputTypeAttribute;
  value: string;
  name: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function CalculatorInput({
  type,
  value,
  name,
  placeholder,
  onChange,
}: Props) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full md:w-1/2 text-gray-700 py-1.5 px-4 mx-3 border-2 border-purple-400 rounded focus:border-purple-600 focus:outline-none"
    />
  );
}
