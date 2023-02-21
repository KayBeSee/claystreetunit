import React from 'react';
import clsx from 'clsx';

interface Props {
  value: string;
  setValue: (value: string) => void;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder: string;
  className?: string;
  autofocus?: boolean;
  disabled?: boolean;
}

export const Input = ({
  value,
  setValue,
  label,
  type = 'text',
  placeholder,
  className,
  autofocus,
  disabled = false,
}: Props) => (
  <div className={clsx(className, disabled ? 'opacity-50' : null)}>
    {label ? (
      <label
        // htmlFor={label.toLowerCase()}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
    ) : null}
    <div className="mt-1">
      <input
        disabled={disabled}
        type={type}
        autoFocus={autofocus}
        // name={label.toLowerCase()}
        // id={label.toLowerCase()}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder={placeholder}
      />
    </div>
  </div>
);
