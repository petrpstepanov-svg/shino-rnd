export default function SectionDivider() {
  return (
    <div className="relative h-10 bg-slate-900 overflow-hidden" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1200 40"
        fill="none"
      >
        <path
          d="M0 6 L1200 34"
          stroke="rgba(34, 197, 94, 0.4)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M0 34 L1200 6"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
    </div>
  );
}
