import { useState, useRef, useEffect } from "react";
import AuthModal from "../components/AuthModal";
import Logo from "../components/Logo";
import CheckIcon from "../components/CheckIcon";
import Stars from "../components/Stars";
import ParticleCanvas from "../components/ParticleCanvas";
import HeroCard from "../components/HeroCard";
export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,400;500;600&display=swap');

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: #060c1f; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #060c1f; }
  ::-webkit-scrollbar-thumb { background: rgba(65,105,225,0.3); border-radius: 3px; }

  .font-syne { font-family: 'Syne', sans-serif; }
  .font-dm   { font-family: 'DM Sans', sans-serif; }

  .grid-bg {
    background-image:
      linear-gradient(rgba(65,105,225,0.033) 1px, transparent 1px),
      linear-gradient(90deg, rgba(65,105,225,0.033) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  .glass {
    background: rgba(255,255,255,0.028);
    border: 0.5px solid rgba(255,255,255,0.09);
    transition: background 0.2s, border-color 0.2s;
  }
  .glass:hover {
    background: rgba(255,255,255,0.045);
    border-color: rgba(255,255,255,0.15);
  }
  .text-gradient {
    background: linear-gradient(135deg,#4169e1 0%,#6b8fff 55%,#a8c0ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .stat-gradient {
    background: linear-gradient(135deg,#c5d0f0,#eef2ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .btn-royal {
    background: linear-gradient(135deg,#1d3aad,#2f55d4);
    box-shadow: 0 4px 24px rgba(47,85,212,0.35);
    transition: opacity 0.18s, transform 0.18s;
  }
  .btn-royal:hover { opacity: 0.88; transform: translateY(-1px); }

  .feat-card {
    transition: transform 0.22s ease, border-color 0.22s ease, background 0.22s ease;
    position: relative; overflow: hidden;
  }
  .feat-card:hover { transform: translateY(-3px); }
  .feat-card::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg,transparent,rgba(65,105,225,0.35),transparent);
    opacity: 0; transition: opacity 0.25s;
  }
  .feat-card:hover::after { opacity: 1; }

  .track { background: rgba(255,255,255,0.07); }
  .fill-good { background: linear-gradient(90deg,#1d6e4a,#3fb96e); }
  .fill-gap  { background: linear-gradient(90deg,#2338b0,#4169e1); }
  .skill-fill { width: 0; transition: width 1.3s cubic-bezier(0.16,1,0.3,1); }

  .shimmer-wrap { position: relative; overflow: hidden; }
  .shimmer-layer {
    position: absolute; top: 0; left: -100%; width: 55%; height: 100%;
    background: linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent);
    animation: shimmer 4s 2.2s infinite;
    pointer-events: none;
  }

  .star {
    width: 12px; height: 12px; background: #e0922a; display: inline-block;
    clip-path: polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);
  }

  .reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.65s ease, transform 0.65s ease; }
  .revealed { opacity: 1; transform: translateY(0); }

  .card-3d { transition: transform 0.3s ease, border-color 0.2s ease; }

  @keyframes fadeUp {
    0%   { opacity: 0; transform: translateY(16px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes cardIn {
    0%   { opacity: 0; transform: perspective(1000px) rotateX(20deg) translateY(32px); }
    100% { opacity: 1; transform: perspective(1000px) rotateX(3deg); }
  }
  @keyframes pulseDot {
    0%,100% { opacity: 1; }
    50%      { opacity: 0.25; }
  }
  @keyframes floatA {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-7px); }
  }
  @keyframes floatB {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-9px); }
  }
  @keyframes shimmer {
    0%   { left: -100%; }
    100% { left: 200%; }
  }

  .animate-fade-up   { animation: fadeUp 0.7s ease forwards; opacity: 0; }
  .animate-card-in   { animation: cardIn 0.9s cubic-bezier(0.16,1,0.3,1) forwards; opacity: 0; }
  .animate-pulse-dot { animation: pulseDot 2s ease-in-out infinite; }
  .animate-float-a   { animation: floatA 4s ease-in-out infinite; }
  .animate-float-b   { animation: floatB 4.5s ease-in-out infinite; }

  /* Modal backdrop */
  .modal-backdrop {
    position: fixed; inset: 0; z-index: 999;
    background: rgba(6,12,31,0.85);
    backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    animation: fadeUp 0.25s ease forwards;
  }
  .modal-box {
    background: rgba(12,20,50,0.95);
    border: 0.5px solid rgba(65,105,225,0.3);
    border-radius: 20px;
    padding: 40px 36px;
    width: min(440px, 92vw);
    box-shadow: 0 24px 80px rgba(0,0,0,0.5);
    position: relative;
  }
  .input-field {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 0.5px solid rgba(255,255,255,0.12);
    border-radius: 10px;
    padding: 11px 14px;
    color: #e2e8f0;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: border-color 0.2s;
  }
  .input-field:focus { border-color: rgba(65,105,225,0.6); }
  .input-field::placeholder { color: rgba(148,163,184,0.4); }
  .input-label { font-size: 12px; color: #94a3b8; margin-bottom: 6px; display: block; font-family: 'DM Sans', sans-serif; }
`;


function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = Array.from(els).indexOf(e.target);
          e.target.style.transitionDelay = `${(idx % 3) * 80}ms`;
          e.target.classList.add("revealed");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const features = [
  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b8fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>, title: "Resume analysis", desc: "Upload your resume and get an instant breakdown of skills, experience, and areas of strength — parsed in seconds." },
  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b8fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>, title: "Job matching", desc: "Paste any job description and our AI maps it against your profile to surface what aligns and what doesn't." },
  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b8fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, title: "Skill gap report", desc: "Get a prioritised list of missing skills with a match score so you know exactly where to focus your energy." },
  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b8fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>, title: "Learning roadmap", desc: "Receive a custom learning path with curated resources to close your skill gaps fast and get job-ready." },
  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b8fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, title: "ATS score", desc: "Understand how well your resume passes Applicant Tracking Systems before you hit send on each application." },
  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b8fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>, title: "Multi-role compare", desc: "Compare your profile against multiple job roles simultaneously and pick the best-fit opportunity." },
];

const testimonials = [
  { initials: "AK", color: "linear-gradient(135deg,#1d3aad,#4169e1)", name: "Arjun Kapoor", role: "Senior FE Engineer at Stripe", quote: "I had been applying to senior roles for months. SynkAI showed me I was missing System Design depth — two months later I had an offer from Stripe." },
  { initials: "ML", color: "linear-gradient(135deg,#1d6e4a,#3fb96e)", name: "Maya Lin", role: "Full Stack Developer at Linear", quote: "The roadmap was shockingly specific. Not just 'learn GraphQL' but exactly which resources and in what order. Went from 42% to 89% match in six weeks." },
  { initials: "SR", color: "linear-gradient(135deg,#7b3aad,#a169e1)", name: "Sofia Reyes", role: "Backend Engineer at Vercel", quote: "Compared 8 roles at once, saw which one I was closest to landing, focused all my prep there, and got the job in three weeks. Nothing else comes close." },
];

export default function Homepage() {
  const [modal, setModal] = useState(null); // null | 'login' | 'register'
  const [mobileOpen, setMobileOpen] = useState(false);

  useReveal();

  return (
    <>
      <style>{globalStyles}</style>

      <div className="grid-bg" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}/>

      {modal && (
        <AuthModal
          mode={modal}
          onClose={() => setModal(null)}
          onSwitch={() => setModal(modal === "login" ? "register" : "login")}
        />
      )}
      <header className="sticky top-0 z-50 backdrop-blur-xl"
              style={{ background: "rgba(6,12,31,0.9)", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
        <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 no-underline">
            <Logo/>
            <span className="font-syne font-extrabold text-slate-50" style={{ fontSize: 15, letterSpacing: "-0.5px" }}>SynkAI</span>
          </a>

          <div className="hidden md:flex items-center gap-7 text-slate-400" style={{ fontSize: 13 }}>
            {["Features","How it works","Stories","About"].map((l, i) => (
              <a key={l} href={["#features","#how-it-works","#testimonials","#stats"][i]}
                 className="hover:text-slate-200 no-underline" style={{ transition: "color 0.15s" }}>{l}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="font-dm text-slate-400 hover:text-slate-200 px-3 py-1.5 bg-transparent border-none cursor-pointer"
                    style={{ fontSize: 13, transition: "color 0.15s" }}
                    onClick={() => setModal("login")}>
              Sign in
            </button>
            <button className="btn-royal font-dm font-semibold text-slate-50 px-5 py-2 rounded-[9px] border-none cursor-pointer"
                    style={{ fontSize: 13 }}
                    onClick={() => setModal("register")}>
              Get started free
            </button>
          </div>
          <button className="md:hidden bg-transparent border-none text-slate-400 cursor-pointer"
                  onClick={() => setMobileOpen(v => !v)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </nav>
        {mobileOpen && (
          <div className="flex flex-col gap-4 px-6 py-5 text-slate-400"
               style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", fontSize: 14 }}>
            {["Features","How it works","Stories"].map((l, i) => (
              <a key={l} href={["#features","#how-it-works","#testimonials"][i]}
                 className="hover:text-slate-200 no-underline" onClick={() => setMobileOpen(false)}>{l}</a>
            ))}
            <button className="text-left font-semibold bg-transparent border-none cursor-pointer font-dm"
                    style={{ color: "#6b8fff", fontSize: 14 }}
                    onClick={() => { setMobileOpen(false); setModal("register"); }}>
              Get started free →
            </button>
            <button className="text-left bg-transparent border-none cursor-pointer font-dm text-slate-400"
                    style={{ fontSize: 14 }}
                    onClick={() => { setMobileOpen(false); setModal("login"); }}>
              Sign in
            </button>
          </div>
        )}
      </header>

      <div className="text-slate-200" style={{ position: "relative", zIndex: 1 }}>
        <section id="heroSection" className="relative overflow-hidden flex flex-col items-center text-center px-6 pt-24 pb-28 min-h-screen justify-center">
          <ParticleCanvas/>
          <div className="absolute rounded-full pointer-events-none" style={{ width:600,height:600,top:-200,left:"50%",transform:"translateX(-50%)",background:"radial-gradient(circle,rgba(65,105,225,0.18) 0%,transparent 65%)",zIndex:0 }}/>
          <div className="absolute rounded-full pointer-events-none" style={{ width:340,height:340,bottom:-100,right:-80,background:"radial-gradient(circle,rgba(25,50,160,0.16) 0%,transparent 70%)",zIndex:0 }}/>
          <div className="absolute rounded-full pointer-events-none" style={{ width:240,height:240,bottom:80,left:-70,background:"radial-gradient(circle,rgba(65,105,225,0.1) 0%,transparent 70%)",zIndex:0 }}/>

          <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-slate-400 mb-6 animate-fade-up"
               style={{ fontSize: 12, animationDelay:"0.1s", background:"rgba(65,105,225,0.1)", border:"0.5px solid rgba(65,105,225,0.3)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4169e1] animate-pulse-dot"/>
            50,000+ resumes analysed and counting
          </div>

          <h1 className="relative z-10 font-syne font-extrabold text-slate-50 leading-[1.06] tracking-[-2px] mb-5 max-w-3xl animate-fade-up"
              style={{ fontSize:"clamp(44px,6vw,72px)", animationDelay:"0.25s" }}>
            Know exactly<br/>what's <span className="text-gradient">holding you back</span>
          </h1>

          <p className="relative z-10 text-slate-500 max-w-[420px] leading-[1.7] mb-8 animate-fade-up"
             style={{ fontSize: 17, animationDelay:"0.4s" }}>
            Upload your resume, paste a job description, and get an AI-powered skill gap report with a personalised roadmap — in under 5 minutes.
          </p>

          <div className="relative z-10 flex flex-wrap gap-3 justify-center mb-6 animate-fade-up" style={{ animationDelay:"0.52s" }}>
            <button className="btn-royal font-dm font-semibold text-slate-50 px-7 py-3.5 rounded-[11px] border-none cursor-pointer"
                    style={{ fontSize: 14 }}
                    onClick={() => setModal("register")}>
              Analyse my resume — it's free
            </button>
            <button className="font-dm text-slate-400 px-6 py-3.5 rounded-[11px] cursor-pointer hover:text-slate-200"
                    style={{ fontSize:14, background:"rgba(255,255,255,0.04)", border:"0.5px solid rgba(255,255,255,0.11)", transition:"color 0.15s" }}
                    onClick={() => document.getElementById("how-it-works").scrollIntoView({ behavior:"smooth" })}>
              See how it works →
            </button>
          </div>

          <div className="relative z-10 flex flex-wrap gap-5 justify-center animate-fade-up" style={{ animationDelay:"0.63s" }}>
            {["No credit card required","Results in under 5 min","Supports any job role"].map(t => (
              <div key={t} className="flex items-center gap-2 text-slate-600" style={{ fontSize: 12 }}>
                <CheckIcon/>{t}
              </div>
            ))}
          </div>

          <HeroCard/>
        </section>
        <section id="stats" className="py-14 px-6 relative"
                 style={{ borderTop:"0.5px solid rgba(255,255,255,0.05)", borderBottom:"0.5px solid rgba(255,255,255,0.05)" }}>
          <div className="absolute inset-0 pointer-events-none"
               style={{ background:"radial-gradient(ellipse 60% 100% at 50% 50%,rgba(65,105,225,0.06) 0%,transparent 70%)" }}/>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 relative z-10">
            {[["50K+","Resumes analysed"],["3.2M+","Skill gaps identified"],["94%","User satisfaction"],["8 min","Avg. time to insight"]].map(([num, label], i) => (
              <div key={label} className="text-center px-4 py-2 reveal"
                   style={{ borderRight: i < 3 ? "0.5px solid rgba(255,255,255,0.05)" : "none" }}>
                <div className="font-syne font-extrabold leading-none mb-1.5 stat-gradient" style={{ fontSize: 38 }}>{num}</div>
                <div className="text-slate-600" style={{ fontSize: 12 }}>{label}</div>
              </div>
            ))}
          </div>
        </section>
        <section id="features" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14 reveal">
              <p className="uppercase tracking-[3px] font-semibold mb-3" style={{ fontSize: 11, color:"#4169e1" }}>Features</p>
              <h2 className="font-syne font-extrabold text-slate-50 leading-[1.1] tracking-[-1px] mb-3"
                  style={{ fontSize:"clamp(30px,4vw,46px)" }}>Everything you need to land the role</h2>
              <p className="text-slate-500 max-w-md mx-auto leading-[1.7]" style={{ fontSize: 15 }}>
                From resume parsing to personalised roadmaps — SynkAI gives you the full picture.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map(f => (
                <div key={f.title} className="feat-card glass rounded-2xl p-7 reveal">
                  <div className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-5"
                       style={{ background:"rgba(65,105,225,0.1)", border:"0.5px solid rgba(65,105,225,0.28)" }}>
                    {f.icon}
                  </div>
                  <h3 className="font-syne font-bold text-slate-200 mb-2" style={{ fontSize: 15 }}>{f.title}</h3>
                  <p className="text-slate-500 leading-[1.65]" style={{ fontSize: 13 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="how-it-works" className="py-24 px-6 relative"
                 style={{ background:"linear-gradient(180deg,transparent,rgba(65,105,225,0.04) 50%,transparent)", borderTop:"0.5px solid rgba(255,255,255,0.04)", borderBottom:"0.5px solid rgba(255,255,255,0.04)" }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14 reveal">
              <p className="uppercase tracking-[3px] font-semibold mb-3" style={{ fontSize:11, color:"#4169e1" }}>How it works</p>
              <h2 className="font-syne font-extrabold text-slate-50 leading-[1.1] tracking-[-1px]"
                  style={{ fontSize:"clamp(30px,4vw,46px)" }}>From resume to roadmap in 4 steps</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ["01","Upload your resume","Drop your PDF or paste your resume text. Our AI parses every line in seconds and builds a complete skill profile."],
                ["02","Add job descriptions","Paste one or more job listings you're targeting. No limit on roles — compare as many as you like at once."],
                ["03","Get your gap report","Receive a detailed skill gap analysis with match scores and priorities so you know exactly where to invest."],
                ["04","Follow the roadmap","Use your personalised learning path with curated resources to close gaps and land the role you want."],
              ].map(([num, title, desc]) => (
                <div key={num} className="glass rounded-2xl p-8 flex gap-5 items-start hover:-translate-y-1 reveal"
                     style={{ transition:"transform 0.2s" }}>
                  <span className="font-syne font-extrabold leading-none flex-shrink-0 mt-0.5"
                        style={{ fontSize: 44, color:"rgba(65,105,225,0.2)" }}>{num}</span>
                  <div>
                    <h3 className="font-syne font-bold text-slate-200 mb-2" style={{ fontSize: 15 }}>{title}</h3>
                    <p className="text-slate-500 leading-[1.65]" style={{ fontSize: 13 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="testimonials" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14 reveal">
              <p className="uppercase tracking-[3px] font-semibold mb-3" style={{ fontSize:11, color:"#4169e1" }}>Stories</p>
              <h2 className="font-syne font-extrabold text-slate-50 leading-[1.1] tracking-[-1px] mb-3"
                  style={{ fontSize:"clamp(30px,4vw,46px)" }}>Developers who closed the gap</h2>
              <p className="text-slate-500 max-w-md mx-auto leading-[1.7]" style={{ fontSize: 15 }}>
                Real results from people who stopped guessing and started growing.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {testimonials.map(t => (
                <div key={t.name} className="glass rounded-2xl p-6 hover:-translate-y-1 reveal"
                     style={{ transition:"transform 0.2s" }}>
                  <Stars/>
                  <p className="text-slate-400 leading-[1.7] mb-5 italic" style={{ fontSize: 13 }}>"{t.quote}"</p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-slate-50 font-bold flex-shrink-0"
                         style={{ background:t.color, fontSize: 12 }}>{t.initials}</div>
                    <div>
                      <div className="font-semibold text-slate-300" style={{ fontSize: 13 }}>{t.name}</div>
                      <div className="text-slate-600" style={{ fontSize: 11 }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        
        <section className="py-28 px-6 relative overflow-hidden" style={{ borderTop:"0.5px solid rgba(255,255,255,0.04)" }}>
          <div className="absolute inset-0 pointer-events-none"
               style={{ background:"radial-gradient(ellipse 60% 70% at 50% 50%,rgba(65,105,225,0.1) 0%,transparent 65%)" }}/>
          <div className="max-w-2xl mx-auto text-center relative z-10 reveal">
            <h2 className="font-syne font-extrabold text-slate-50 leading-[1.06] tracking-[-2px] mb-5"
                style={{ fontSize:"clamp(36px,5vw,58px)" }}>
              Stop guessing.<br/><span className="text-gradient">Start closing gaps.</span>
            </h2>
            <p className="text-slate-500 mb-9 max-w-sm mx-auto leading-[1.7]" style={{ fontSize: 16 }}>
              Join thousands of developers who use SynkAI to get job-ready faster and smarter.
            </p>
            <button className="btn-royal font-dm font-semibold text-slate-50 px-10 py-4 rounded-[11px] border-none cursor-pointer"
                    style={{ fontSize: 15 }}
                    onClick={() => setModal("register")}>
              Analyse my resume — it's free
            </button>
            <p className="text-slate-700 mt-4 tracking-wide" style={{ fontSize: 12 }}>
              No credit card &nbsp;·&nbsp; Instant results &nbsp;·&nbsp; Cancel anytime
            </p>
          </div>
        </section>

       
        <footer className="px-6 py-10" style={{ borderTop:"0.5px solid rgba(255,255,255,0.05)" }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 flex-wrap">
            <a href="#" className="flex items-center gap-2 no-underline">
              <Logo size={20}/>
              <span className="font-syne font-extrabold text-slate-100" style={{ fontSize: 14 }}>SynkAI</span>
            </a>
            <div className="flex gap-6 text-slate-600" style={{ fontSize: 13 }}>
              {["Privacy","Terms","Contact","Blog"].map(l => (
                <a key={l} href="#" className="hover:text-slate-400 no-underline" style={{ transition:"color 0.15s" }}>{l}</a>
              ))}
            </div>
            <p className="text-slate-700" style={{ fontSize: 12 }}>© 2025 SynkAI. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
