import { useEffect, useState ,useRef} from "react";
import AuthModal from "./AuthModal";
import { globalStyles } from "../pages/Homepage";
import Logo from "./Logo";

function HeroCard() { 
  const cardRef = useRef(null);
  const [score, setScore] = useState(0);
  const [bars, setBars] = useState([0, 0, 0, 0]);
  const targets = [95, 60, 40, 78];

  useEffect(() => {
    const t = setTimeout(() => {
      targets.forEach((w, i) => {
        setTimeout(() => setBars(prev => { const n = [...prev]; n[i] = w; return n; }), i * 130);
      });
      let n = 0;
      const iv = setInterval(() => {
        n = Math.min(n + 2, 74);
        setScore(n);
        if (n >= 74) clearInterval(iv);
      }, 22);
    }, 1350);
    return () => clearTimeout(t);
  }, []);

  function onMove(e) {
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${-y * 12}deg) rotateY(${x * 14}deg) translateY(-5px)`;
    cardRef.current.style.borderColor = "rgba(255,255,255,0.18)";
  }
  function onLeave() {
    cardRef.current.style.transform = "perspective(1000px) rotateX(3deg)";
    cardRef.current.style.borderColor = "rgba(255,255,255,0.1)";
  }

  const skills = [
    { label: "React & TypeScript", pct: bars[0], good: true },
    { label: "System Design",      pct: bars[1], good: false },
    { label: "GraphQL",            pct: bars[2], good: false },
    { label: "Node.js",            pct: bars[3], good: true },
  ];

  return (
    <div className="relative mt-14 animate-card-in" style={{ animationDelay: "0.8s", zIndex: 10 }}>
      <div className="animate-float-a absolute z-20 pointer-events-none text-emerald-400 font-semibold px-3 py-1.5 rounded-full whitespace-nowrap"
           style={{ fontSize: 11, top: -18, left: -5, background: "rgba(8,16,48,0.9)", border: "0.5px solid rgba(65,105,225,0.3)" }}>
        React matched ✓
      </div>
      <div className="animate-float-b absolute z-20 pointer-events-none text-red-400 font-semibold px-3 py-1.5 rounded-full whitespace-nowrap"
           style={{ fontSize: 11, top: -6, right: -8, background: "rgba(8,16,48,0.9)", border: "0.5px solid rgba(65,105,225,0.3)" }}>
        GraphQL gap ✗
      </div>
      <div className="animate-float-a absolute z-20 pointer-events-none text-slate-400 font-semibold px-3 py-1.5 rounded-full whitespace-nowrap"
           style={{ fontSize: 11, bottom: -16, left: 16, animationDelay: "1s", background: "rgba(8,16,48,0.9)", border: "0.5px solid rgba(65,105,225,0.3)" }}>
        Roadmap ready
      </div>

      <div ref={cardRef} onMouseMove={onMove} onMouseLeave={onLeave}
           className="card-3d shimmer-wrap relative overflow-hidden rounded-2xl p-6"
           style={{ width: "min(440px,88vw)", background: "rgba(255,255,255,0.028)", border: "0.5px solid rgba(255,255,255,0.1)", cursor: "default" }}>
        <div className="shimmer-layer rounded-2xl"/>
        <div className="absolute inset-0 rounded-2xl pointer-events-none"
             style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.04) 0%,transparent 55%)" }}/>

        <div className="flex justify-between items-start mb-5 relative z-10">
          <div>
            <p className="text-slate-600 mb-1" style={{ fontSize: 11 }}>Skill match for</p>
            <p className="font-semibold text-slate-300" style={{ fontSize: 14 }}>Senior Frontend Engineer — Stripe</p>
          </div>
          <div className="text-right">
            <div className="font-syne font-extrabold leading-none" style={{ fontSize: 36, color: "#4169e1" }}>{score}%</div>
            <div className="text-slate-600 mt-1" style={{ fontSize: 10 }}>match score</div>
          </div>
        </div>

        <div className="space-y-3 relative z-10">
          {skills.map((s, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1.5" style={{ fontSize: 11 }}>
                <span className="text-slate-400">{s.label}</span>
                <span className={s.good ? "text-emerald-400" : "text-red-400"}>{s.pct}%</span>
              </div>
              <div className="track h-[5px] rounded-full overflow-hidden">
                <div className={`skill-fill h-full rounded-full ${s.good ? "fill-good" : "fill-gap"}`} style={{ width: `${s.pct}%` }}/>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-4 pt-4 text-slate-600 relative z-10"
             style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", fontSize: 11 }}>
          <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0"/>
          Top gaps: System Design, GraphQL — your roadmap is ready
        </div>
      </div>
    </div>
  );
}

export default HeroCard;