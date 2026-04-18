import { useState } from "react";
import Logo from "../../../components/Logo";
export default function AuthModal({ mode, onClose, onSwitch }) {
  const isLogin = mode === "login";
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1400);
  }

  return (
    <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">

        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 18,
          background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 20, lineHeight: 1
        }}>✕</button>

        
        <div className="flex items-center gap-2 mb-7">
          <Logo size={22}/>
          <span className="font-syne font-extrabold text-slate-100" style={{ fontSize: 15 }}>SynkAI</span>
        </div>

        {done ? (
          <div className="text-center py-6">
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
            <p className="font-syne font-bold text-slate-100" style={{ fontSize: 20, marginBottom: 8 }}>
              {isLogin ? "Welcome back!" : "You're in!"}
            </p>
            <p className="text-slate-500" style={{ fontSize: 13 }}>
              {isLogin ? "Redirecting to your dashboard…" : "Check your inbox to verify your email."}
            </p>
          </div>
        ) : (
          <>
            <h2 className="font-syne font-bold text-slate-100 mb-1" style={{ fontSize: 22 }}>
              {isLogin ? "Sign in" : "Create your account"}
            </h2>
            <p className="text-slate-500 mb-7" style={{ fontSize: 13 }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button onClick={onSwitch} style={{
                background: "none", border: "none", color: "#6b8fff", cursor: "pointer",
                fontSize: 13, fontFamily: "'DM Sans', sans-serif", padding: 0
              }}>
                {isLogin ? "Sign up free" : "Sign in"}
              </button>
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {!isLogin && (
                <div>
                  <label className="input-label">Full name</label>
                  <input className="input-field" type="text" placeholder="Jane Smith" required
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}/>
                </div>
              )}
              <div>
                <label className="input-label">Email address</label>
                <input className="input-field" type="email" placeholder="you@example.com" required
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}/>
              </div>
              <div>
                <label className="input-label">Password</label>
                <input className="input-field" type="password" placeholder="••••••••" required
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}/>
              </div>
              {!isLogin && (
                <div>
                  <label className="input-label">Confirm password</label>
                  <input className="input-field" type="password" placeholder="••••••••" required
                    value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })}/>
                </div>
              )}

              {isLogin && (
                <div className="flex justify-end" style={{ marginTop: -8 }}>
                  <button type="button" style={{
                    background: "none", border: "none", color: "#6b8fff",
                    fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", padding: 0
                  }}>Forgot password?</button>
                </div>
              )}

              <button type="submit" className="btn-royal font-dm font-semibold text-slate-50"
                style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: "none",
                  cursor: "pointer", fontSize: 14, marginTop: 4, opacity: loading ? 0.7 : 1 }}
                disabled={loading}>
                {loading ? "Please wait…" : isLogin ? "Sign in" : "Create account — it's free"}
              </button>
            </form>

         
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
              <div style={{ flex: 1, height: "0.5px", background: "rgba(255,255,255,0.08)" }}/>
              <span style={{ fontSize: 11, color: "#475569" }}>or continue with</span>
              <div style={{ flex: 1, height: "0.5px", background: "rgba(255,255,255,0.08)" }}/>
            </div>
            <button style={{
              width: "100%", padding: "11px 0", borderRadius: 10,
              background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.11)",
              color: "#cbd5e1", fontSize: 13, cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center", gap: 10,
              fontFamily: "'DM Sans', sans-serif", transition: "background 0.2s"
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            {!isLogin && (
              <p style={{ fontSize: 11, color: "#475569", textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
                By signing up you agree to our{" "}
                <span style={{ color: "#6b8fff", cursor: "pointer" }}>Terms of Service</span>{" "}
                and{" "}
                <span style={{ color: "#6b8fff", cursor: "pointer" }}>Privacy Policy</span>.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}