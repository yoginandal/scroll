"use client";

interface SwitchProps {
  isChecked: boolean;
  onChange: () => void;
}

export function Switch({ isChecked, onChange }: SwitchProps) {
  return (
    <div className="flex items-center">
      {/* Switch */}
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        onClick={onChange}
        className={`
          relative flex flex-col items-center justify-between
          w-8 h-16 rounded-full transition-colors duration-300
          focus:outline-none
          ${isChecked ? "bg-green-600" : "bg-gray-300"}
        `}
      >
        {/* Track */}
        <span className="sr-only">Toggle</span>
        {/* Handle */}
        <span
          className={`
            absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white shadow-md
            transition-all duration-300
            ${isChecked ? "bottom-1" : "top-1"}
          `}
        />
      </button>
      {/* Text: FF on top, N on bottom */}
      <div
        className="flex flex-col ml-2 text-2xl font-black leading-none select-none"
        style={{ color: "var(--foreground)" }}
      >
        <span>FF</span>
        <span>N</span>
      </div>
    </div>
  );
}
