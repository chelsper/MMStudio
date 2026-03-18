export function ChevronIcon({ expanded }) {
  return (
    <div
      className={`transform transition-transform ${expanded ? "rotate-180" : ""}`}
    >
      <svg
        className="w-6 h-6 text-purple-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
}
