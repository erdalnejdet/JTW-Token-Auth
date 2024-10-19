import React from "react";

interface InputProps {
  label: string;
  name: string;
  placeholdertext: string;
  className?: string;
  type: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, name, className = '', placeholdertext, value, onChange, type }) => {
  return (
    <div className="mt-6" >
      <div className="flex items-center justify-between">
        <label className="block color-black mb-2.5" htmlFor={name}>
          {label}
        </label>
      </div>
      <input
        className={`h-14 w-full border rounded bg-rgba-gray px-4 text-input focus:outline-none ${className}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholdertext}
      />
    </div>
  );
};

export default Input;
