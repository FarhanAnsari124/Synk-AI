export default function Logo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <path d="M13 2L3 7.5L13 13L23 7.5L13 2Z" fill="#4169e1" opacity="0.9"/>
      <path d="M3 18.5L13 24L23 18.5" stroke="#4169e1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 13L13 18.5L23 13" stroke="#6b8fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
    </svg>
  );
}