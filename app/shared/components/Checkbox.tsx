import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        className={`w-4 h-4 rounded border-gray-300 accent-blue-600 ${className || ""}`}
        {...props}
      />
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
}
