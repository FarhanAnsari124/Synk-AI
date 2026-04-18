export default function CheckIcon() {
  return (
    <div className="w-[15px] h-[15px] rounded-full flex items-center justify-center flex-shrink-0"
         style={{ background: "rgba(65,105,225,0.13)" }}>
      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
        <polyline points="2,5 4,7 8,3" stroke="#4169e1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}