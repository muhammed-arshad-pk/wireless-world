export default function Logo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id="ww-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="34" r="4" fill="url(#ww-grad)" />
      <path d="M14 26a14 14 0 0 1 20 0" fill="none" stroke="url(#ww-grad)" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M8 19.5a22 22 0 0 1 32 0" fill="none" stroke="url(#ww-grad)" strokeWidth="3.2" strokeLinecap="round" opacity=".8" />
      <path d="M2.5 13a30 30 0 0 1 43 0" fill="none" stroke="url(#ww-grad)" strokeWidth="3.2" strokeLinecap="round" opacity=".55" />
    </svg>
  );
}
