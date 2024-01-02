import React from "react";

function Button({ children, type = "button", ...props }) {
  return (
    <>
      <button
        type={type}
        className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
        {...props}
      >
        {children}
      </button>
    </>
  );
}

export default Button;
