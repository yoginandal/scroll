"use client";

export function LightDark({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      aria-label="Toggle theme"
      type="button"
      onClick={onToggle}
      className="relative w-10 h-10 flex items-center justify-center focus:outline-none"
    >
      <input
        type="checkbox"
        checked={isDark}
        onChange={onToggle}
        className="absolute w-full h-full opacity-0 cursor-pointer"
        tabIndex={-1}
        aria-hidden="true"
      />
      <svg
        width={24}
        height={24}
        viewBox="0 0 20 20"
        fill="currentColor"
        className={`transition-transform duration-500 ${
          isDark ? "rotate-90 text-gray-200" : "rotate-[40deg] text-gray-800"
        }`}
      >
        {isDark ? (
          // Moon: use mask for crescent
          <>
            <mask id="moon-mask">
              <rect x={0} y={0} width={20} height={20} fill="white" />
              <circle cx={11} cy={3} r={8} fill="black" />
            </mask>
            <circle
              className="transition-all duration-500 origin-center scale-100"
              cx={10}
              cy={10}
              r={8}
              mask="url(#moon-mask)"
            />
            {/* No sun rays in dark mode */}
          </>
        ) : (
          // Sun: full circle, no mask, with rays
          <>
            <circle
              className="transition-all duration-500 origin-center scale-100"
              cx={10}
              cy={10}
              r={8}
            />
            <g>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <circle
                  key={i}
                  className="transition-all duration-300 origin-center scale-100"
                  cx={[18, 14, 6, 2, 6, 14][i - 1]}
                  cy={[10, 16.928, 16.928, 10, 3.1718, 3.1718][i - 1]}
                  r="1.5"
                />
              ))}
            </g>
          </>
        )}
      </svg>
    </button>
  );
}
