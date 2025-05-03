"use client";

interface SwitchProps {
  isChecked: boolean;
  onChange: () => void;
}

export function Switch({ isChecked, onChange }: SwitchProps) {
  return (
    <div className="flex items-center">
      <label className="relative inline-block w-[1.2em] h-[3em] text-[12px]">
        <input
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={isChecked}
          onChange={onChange}
        />
        {/* Track */}
        <span
          className={`absolute left-1/2 -translate-x-1/2 top-0 w-[1.2em] h-[3em] flex flex-col items-center`}
        >
          {/* Handle (T-top) */}
          <span
            className={`absolute left-1/2 -translate-x-1/2 w-[1.4em] h-[0.5em] rounded-full bg-white shadow-md transition-all duration-300 z-10
              ${isChecked ? "top-[2.2em]" : "top-[0.2em]"}
            `}
          />
          {/* Stick */}
          <span
            className={`absolute left-1/2 -translate-x-1/2 w-[0.4em] rounded-full transition-all duration-300
              ${
                isChecked
                  ? "top-[0.7em] h-[1.7em] bg-lime-500"
                  : "top-[0.7em] h-[1.7em] bg-gray-300"
              }
              ${isChecked ? "bg-lime-500" : "bg-gray-300"}
            `}
            style={{ zIndex: 5 }}
          />
        </span>
      </label>
    </div>
  );
}
