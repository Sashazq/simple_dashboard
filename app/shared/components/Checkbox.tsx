import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  disabled?: boolean;
}

export function Checkbox({
  label,
  className,
  disabled = false,
  ...props
}: CheckboxProps) {
  return (
    <label
      className={`flex items-center gap-2 cursor-pointer ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <input
        type="checkbox"
        disabled={disabled}
        className={`w-4 h-4 rounded border-gray-300 accent-blue-600 ${className || ""}`}
        {...props}
      />
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
}
