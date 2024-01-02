import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "", placeholder = "", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full md:w-1/3">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
