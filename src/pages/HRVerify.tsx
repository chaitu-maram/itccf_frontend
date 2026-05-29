// import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from "react";
// import {
//   ArrowLeft, ShieldCheck, CheckCircle, AlertCircle,
//   Loader2, RotateCcw, Mail, ChevronRight,
// } from "lucide-react";
// import { Link, useNavigate, useLocation } from "react-router-dom";

// /* ═══════════════════════════════════════════════════════════
//    Constants
// ═══════════════════════════════════════════════════════════ */
// const BASE = "http://192.168.29.136:8000/api";

// /* ═══════════════════════════════════════════════════════════
//    OTP Input — 6 individual boxes with auto-advance & paste
// ═══════════════════════════════════════════════════════════ */
// interface OTPInputProps {
//   value: string;
//   onChange: (v: string) => void;
//   disabled?: boolean;
// }
// const OTPInput = ({ value, onChange, disabled }: OTPInputProps) => {
//   const refs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));
//   const digits = value.padEnd(6, " ").split("").slice(0, 6);

//   const handleKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Backspace") {
//       e.preventDefault();
//       const updated = [...digits];
//       if (updated[i] && updated[i] !== " ") {
//         updated[i] = " ";
//       } else if (i > 0) {
//         updated[i - 1] = " ";
//         refs[i - 1].current?.focus();
//       }
//       onChange(updated.join("").trimEnd());
//     } else if (e.key === "ArrowLeft" && i > 0) {
//       refs[i - 1].current?.focus();
//     } else if (e.key === "ArrowRight" && i < 5) {
//       refs[i + 1].current?.focus();
//     }
//   };

//   const handleChange = (i: number, raw: string) => {
//     const stripped = raw.replace(/\D/g, "");
//     // handle full paste
//     if (stripped.length > 1) {
//       const full = stripped.slice(0, 6).padEnd(6, " ");
//       onChange(full);
//       refs[Math.min(stripped.length - 1, 5)].current?.focus();
//       return;
//     }
//     const ch = stripped.slice(-1) || " ";
//     const updated = [...digits];
//     updated[i] = ch;
//     onChange(updated.join("").trimEnd());
//     if (ch !== " " && i < 5) refs[i + 1].current?.focus();
//   };

//   return (
//     <div className="flex gap-2 justify-center">
//       {digits.map((d, i) => (
//         <input
//           key={i}
//           ref={refs[i]}
//           type="text"
//           inputMode="numeric"
//           maxLength={6}
//           value={d === " " ? "" : d}
//           disabled={disabled}
//           onChange={e => handleChange(i, e.target.value)}
//           onKeyDown={e => handleKey(i, e)}
//           onFocus={e => e.target.select()}
//           className={`w-12 h-14 rounded-xl border-2 text-center text-2xl font-black text-slate-800 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed ${
//             d && d !== " "
//               ? "border-blue-500 bg-blue-50 shadow-sm shadow-blue-100"
//               : "border-blue-100 bg-blue-50 focus:border-blue-500 focus:bg-white"
//           }`}
//         />
//       ))}
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════════
//    Countdown hook
// ═══════════════════════════════════════════════════════════ */
// const useCountdown = (initial: number) => {
//   const [count, setCount] = useState(initial);
//   const restart = (val = initial) => setCount(val);
//   useEffect(() => {
//     if (count <= 0) return;
//     const t = setTimeout(() => setCount(c => c - 1), 1000);
//     return () => clearTimeout(t);
//   }, [count]);
//   return { count, restart };
// };

// /* ═══════════════════════════════════════════════════════════
//    Main Component
// ═══════════════════════════════════════════════════════════ */
// export default function HRVerify() {
//   const navigate = useNavigate();
//   // email can arrive via router state (from signup redirect) or the user types it
//   const location = useLocation();
//   const stateEmail = (location.state as { email?: string } | null)?.email ?? "";

//   const [email, setEmail] = useState(stateEmail);
//   const [emailLocked, setEmailLocked] = useState(!!stateEmail);
//   const [otp, setOtp] = useState("");
//   const [phase, setPhase] = useState<"idle" | "verifying" | "resending" | "success">("idle");
//   const [error, setError] = useState("");
//   const { count: cooldown, restart: restartCooldown } = useCountdown(stateEmail ? 60 : 0);

//   const otpDigits = otp.replace(/[^ ]/g, "").length; // spaces = empty slots
//   const filled = otp.replace(/ /g, "").length === 6;
//   const busy = phase === "verifying" || phase === "resending";

//   /* ── verify ── */
//   const handleVerify = async () => {
//     if (!filled || busy) return;
//     setPhase("verifying"); setError("");
//     try {
//       const res = await fetch(`${BASE}/hr/verify-otp/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, otp: otp.replace(/ /g, "") }),
//       });
//       if (!res.ok) {
//         const err = await res.json().catch(() => ({}));
//         throw new Error(err.error || `Error ${res.status}`);
//       }
//       setPhase("success");
//       setTimeout(() => navigate("/payment", { state: { email } }), 2200);
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Verification failed.");
//       setOtp("");
//       setPhase("idle");
//     }
//   };

//   /* ── resend ── */
//   const handleResend = async () => {
//     if (busy || cooldown > 0 || !email) return;
//     setPhase("resending"); setError("");
//     try {
//       const res = await fetch(`${BASE}/hr/resend-otp/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });
//       if (!res.ok) {
//         const err = await res.json().catch(() => ({}));
//         throw new Error(err.error || `Error ${res.status}`);
//       }
//       setOtp("");
//       restartCooldown(60);
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Could not resend OTP.");
//     } finally {
//       setPhase("idle");
//     }
//   };

//   /* ── unlock email to change ── */
//   const handleChangeEmail = () => {
//     setEmailLocked(false);
//     setOtp("");
//     setError("");
//   };

//   /* ═══════════════════
//      Success Screen
//   ═══════════════════ */
//   if (phase === "success") {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center px-4"
//         style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>
//         <div className="text-center space-y-5 max-w-sm">
//           <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-400 shadow-2xl shadow-emerald-200 mx-auto">
//             <CheckCircle className="w-10 h-10 text-white" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-black text-slate-800 tracking-tight">Email Verified!</h1>
//             <p className="text-sm font-semibold text-slate-400 mt-1">Your HR account is now active.</p>
//           </div>
//           <div className="flex items-center gap-2 justify-center text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2 w-fit mx-auto">
//             <Loader2 className="w-3.5 h-3.5 animate-spin" /> Redirecting to login…
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /* ═══════════════════
//      Main Screen
//   ═══════════════════ */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50"
//       style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
//       <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>

//       {/* ── Navbar ── */}
//       <nav className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b-2 border-blue-100 shadow-sm shadow-blue-50">
//         <div className="max-w-lg mx-auto px-6 h-full flex items-center justify-between">
//           <Link to="/" className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-600 transition-colors">
//             <ArrowLeft className="w-4 h-4" /> Back
//           </Link>
//           <div className="flex items-center gap-2.5">
//             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-200">
//               <ShieldCheck className="w-4 h-4 text-white" />
//             </div>
//             <span className="text-base font-black tracking-tight text-blue-900">Verify Account</span>
//           </div>
//           <span className="text-[10px] font-black tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
//             OTP
//           </span>
//         </div>
//       </nav>

//       <main className="max-w-lg mx-auto px-4 py-12 pb-20">

//         {/* ── Hero ── */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 shadow-xl shadow-blue-200 mb-4">
//             <ShieldCheck className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-2xl font-black text-blue-900 tracking-tight">Verify Your Email</h1>
//           <p className="text-sm font-semibold text-blue-400 mt-1">Enter the 6-digit OTP sent to your inbox</p>
//         </div>

//         {/* ── Card ── */}
//         <div className="bg-white rounded-3xl border-2 border-blue-100 shadow-lg shadow-blue-50 overflow-hidden">

//           {/* Card header */}
//           <div className="flex items-center gap-3 px-6 py-4 border-b-2 border-blue-50 bg-gradient-to-r from-blue-50 to-white">
//             <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200 shrink-0">
//               <Mail className="w-4 h-4 text-white" />
//             </div>
//             <span className="text-sm font-black tracking-widest uppercase text-blue-700">Email Verification</span>
//           </div>

//           <div className="p-8 space-y-7">

//             {/* ── Email row ── */}
//             <div className="space-y-1.5">
//               <label className="text-xs font-black tracking-widest uppercase text-blue-500 block">
//                 Registered Email
//               </label>
//               {emailLocked ? (
//                 <div className="flex items-center gap-2">
//                   <div className="flex-1 h-11 flex items-center gap-2.5 rounded-xl border-2 border-blue-100 bg-blue-50 px-4">
//                     <Mail className="w-4 h-4 text-blue-300 shrink-0" />
//                     <span className="text-sm font-black text-blue-700 truncate">{email}</span>
//                   </div>
//                   <button
//                     onClick={handleChangeEmail}
//                     className="h-11 px-4 rounded-xl border-2 border-blue-200 bg-blue-50 text-xs font-black text-blue-500 hover:bg-blue-100 hover:border-blue-400 transition-all shrink-0"
//                   >
//                     Change
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex gap-2">
//                   <input
//                     type="email"
//                     value={email}
//                     placeholder="your@email.com"
//                     onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
//                     className="flex-1 h-11 rounded-xl border-2 border-blue-100 bg-blue-50 px-4 text-base font-semibold text-slate-800 placeholder:text-blue-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all"
//                   />
//                   {email && (
//                     <button
//                       onClick={() => { setEmailLocked(true); restartCooldown(60); }}
//                       className="h-11 px-4 rounded-xl bg-blue-600 text-white text-xs font-black hover:bg-blue-700 transition-colors shrink-0"
//                     >
//                       Confirm
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* ── Divider ── */}
//             <div className="flex items-center gap-3">
//               <div className="h-px flex-1 bg-blue-100" />
//               <span className="text-[10px] font-black tracking-[0.25em] uppercase text-blue-400 px-2 bg-blue-50 border border-blue-100 rounded-full py-0.5">
//                 Enter OTP
//               </span>
//               <div className="h-px flex-1 bg-blue-100" />
//             </div>

//             {/* ── OTP boxes ── */}
//             <div className="space-y-3">
//               <OTPInput value={otp} onChange={setOtp} disabled={busy || !emailLocked} />

//               {/* progress dots */}
//               <div className="flex justify-center gap-1.5 pt-1">
//                 {Array.from({ length: 6 }).map((_, i) => {
//                   const filled = otp[i] && otp[i] !== " ";
//                   return (
//                     <div key={i} className={`h-1 rounded-full transition-all duration-200 ${filled ? "w-5 bg-blue-500" : "w-3 bg-blue-100"}`} />
//                   );
//                 })}
//               </div>
//             </div>

//             {/* ── Error ── */}
//             {error && (
//               <div className="flex items-center gap-2 text-red-500 text-xs font-bold justify-center bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
//                 <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
//               </div>
//             )}

//             {/* ── Verify button ── */}
//             <button
//               onClick={handleVerify}
//               disabled={!filled || busy || !emailLocked}
//               className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white text-sm font-black shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
//             >
//               {phase === "verifying"
//                 ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying…</>
//                 : <><CheckCircle className="w-4 h-4" /> Verify Account <ChevronRight className="w-4 h-4" /></>
//               }
//             </button>

//             {/* ── Resend row ── */}
//             <div className="flex items-center justify-between pt-1">
//               <span className="text-xs font-semibold text-blue-300">Didn't receive the code?</span>
//               {cooldown > 0 ? (
//                 <span className="text-xs font-black text-blue-400 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
//                   Resend in {cooldown}s
//                 </span>
//               ) : (
//                 <button
//                   onClick={handleResend}
//                   disabled={busy || !email || !emailLocked}
//                   className="flex items-center gap-1.5 text-xs font-black text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
//                 >
//                   {phase === "resending"
//                     ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
//                     : <RotateCcw className="w-3.5 h-3.5" />
//                   }
//                   Resend OTP
//                 </button>
//               )}
//             </div>

//           </div>
//         </div>

//         {/* ── Footer links ── */}
//         <div className="flex items-center justify-center gap-6 mt-8">
//           <Link to="/signup" className="text-sm font-black text-blue-500 hover:text-blue-700 hover:underline transition-colors">
//             ← Back to Sign Up
//           </Link>
//           <div className="w-1 h-1 rounded-full bg-blue-200" />
//           <Link to="/" className="text-sm font-black text-blue-500 hover:text-blue-700 hover:underline transition-colors">
//             Sign In →
//           </Link>
//         </div>

//       </main>
//     </div>
//   );
// }



import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from "react";
import {
  ArrowLeft, ShieldCheck, CheckCircle, AlertCircle,
  Loader2, RotateCcw, Mail, ChevronRight,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

/* ═══════════════════════════════════════════════════════════
   Constants
═══════════════════════════════════════════════════════════ */
const BASE = "http://192.168.0.6:8000/api";

/* ═══════════════════════════════════════════════════════════
   OTP Input — 6 individual boxes with auto-advance & paste
═══════════════════════════════════════════════════════════ */
interface OTPInputProps {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}
const OTPInput = ({ value, onChange, disabled }: OTPInputProps) => {
  const refs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));
  const digits = value.padEnd(6, " ").split("").slice(0, 6);

  const handleKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const updated = [...digits];
      if (updated[i] && updated[i] !== " ") {
        updated[i] = " ";
      } else if (i > 0) {
        updated[i - 1] = " ";
        refs[i - 1].current?.focus();
      }
      onChange(updated.join("").trimEnd());
    } else if (e.key === "ArrowLeft" && i > 0) {
      refs[i - 1].current?.focus();
    } else if (e.key === "ArrowRight" && i < 5) {
      refs[i + 1].current?.focus();
    }
  };

  const handleChange = (i: number, raw: string) => {
    const stripped = raw.replace(/\D/g, "");
    if (stripped.length > 1) {
      const full = stripped.slice(0, 6).padEnd(6, " ");
      onChange(full);
      refs[Math.min(stripped.length - 1, 5)].current?.focus();
      return;
    }
    const ch = stripped.slice(-1) || " ";
    const updated = [...digits];
    updated[i] = ch;
    onChange(updated.join("").trimEnd());
    if (ch !== " " && i < 5) refs[i + 1].current?.focus();
  };

  return (
    <div className="flex gap-2 justify-center">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={refs[i]}
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={d === " " ? "" : d}
          disabled={disabled}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKey(i, e)}
          onFocus={e => e.target.select()}
          className={`w-12 h-14 rounded-xl border-2 text-center text-2xl font-black text-slate-800 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed ${
            d && d !== " "
              ? "border-blue-500 bg-blue-50 shadow-sm shadow-blue-100"
              : "border-blue-100 bg-blue-50 focus:border-blue-500 focus:bg-white"
          }`}
        />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   Countdown hook
═══════════════════════════════════════════════════════════ */
const useCountdown = (initial: number) => {
  const [count, setCount] = useState(initial);
  const restart = (val = initial) => setCount(val);
  useEffect(() => {
    if (count <= 0) return;
    const t = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count]);
  return { count, restart };
};

/* ═══════════════════════════════════════════════════════════
   Main Component
═══════════════════════════════════════════════════════════ */
export default function HRVerify() {
  const navigate = useNavigate();
  const location = useLocation();
  const stateEmail = (location.state as { email?: string } | null)?.email ?? "";

  const [email, setEmail] = useState(stateEmail);
  const [emailLocked, setEmailLocked] = useState(!!stateEmail);
  const [otp, setOtp] = useState("");
  const [phase, setPhase] = useState<"idle" | "verifying" | "resending" | "success">("idle");
  const [error, setError] = useState("");
  const { count: cooldown, restart: restartCooldown } = useCountdown(stateEmail ? 60 : 0);

  const filled = otp.replace(/ /g, "").length === 6;
  const busy = phase === "verifying" || phase === "resending";

  /* ── verify ── */
  const handleVerify = async () => {
    if (!filled || busy) return;
    setPhase("verifying"); setError("");
    try {
      const res = await fetch(`${BASE}/hr/verify-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otp.replace(/ /g, "") }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Error ${res.status}`);
      }
      setPhase("success");
      // ✅ Redirect to index (login) page after successful OTP verification
      setTimeout(() => navigate("/payment"), 2200);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Verification failed.");
      setOtp("");
      setPhase("idle");
    }
  };

  /* ── resend ── */
  const handleResend = async () => {
    if (busy || cooldown > 0 || !email) return;
    setPhase("resending"); setError("");
    try {
      const res = await fetch(`${BASE}/hr/resend-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Error ${res.status}`);
      }
      setOtp("");
      restartCooldown(60);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not resend OTP.");
    } finally {
      setPhase("idle");
    }
  };

  /* ── unlock email to change ── */
  const handleChangeEmail = () => {
    setEmailLocked(false);
    setOtp("");
    setError("");
  };

  /* ═══════════════════
     Success Screen
  ═══════════════════ */
  if (phase === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center px-4"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>
        <div className="text-center space-y-5 max-w-sm">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-400 shadow-2xl shadow-emerald-200 mx-auto">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Email Verified!</h1>
            <p className="text-sm font-semibold text-slate-400 mt-1">Your HR account is now active.</p>
          </div>
          <div className="flex items-center gap-2 justify-center text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2 w-fit mx-auto">
            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Redirecting to payment…
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════
     Main Screen
  ═══════════════════ */
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b-2 border-blue-100 shadow-sm shadow-blue-50">
        <div className="max-w-lg mx-auto px-6 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-200">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-black tracking-tight text-blue-900">Verify Account</span>
          </div>
          <span className="text-[10px] font-black tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            OTP
          </span>
        </div>
      </nav>

      <main className="max-w-lg mx-auto px-4 py-12 pb-20">

        {/* ── Hero ── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 shadow-xl shadow-blue-200 mb-4">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-blue-900 tracking-tight">Verify Your Email</h1>
          <p className="text-sm font-semibold text-blue-400 mt-1">Enter the 6-digit OTP sent to your inbox</p>
        </div>

        {/* ── Card ── */}
        <div className="bg-white rounded-3xl border-2 border-blue-100 shadow-lg shadow-blue-50 overflow-hidden">

          {/* Card header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b-2 border-blue-50 bg-gradient-to-r from-blue-50 to-white">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200 shrink-0">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-black tracking-widest uppercase text-blue-700">Email Verification</span>
          </div>

          <div className="p-8 space-y-7">

            {/* ── Email row ── */}
            <div className="space-y-1.5">
              <label className="text-xs font-black tracking-widest uppercase text-blue-500 block">
                Registered Email
              </label>
              {emailLocked ? (
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-11 flex items-center gap-2.5 rounded-xl border-2 border-blue-100 bg-blue-50 px-4">
                    <Mail className="w-4 h-4 text-blue-300 shrink-0" />
                    <span className="text-sm font-black text-blue-700 truncate">{email}</span>
                  </div>
                  <button
                    onClick={handleChangeEmail}
                    className="h-11 px-4 rounded-xl border-2 border-blue-200 bg-blue-50 text-xs font-black text-blue-500 hover:bg-blue-100 hover:border-blue-400 transition-all shrink-0"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    placeholder="your@email.com"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="flex-1 h-11 rounded-xl border-2 border-blue-100 bg-blue-50 px-4 text-base font-semibold text-slate-800 placeholder:text-blue-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all"
                  />
                  {email && (
                    <button
                      onClick={() => { setEmailLocked(true); restartCooldown(60); }}
                      className="h-11 px-4 rounded-xl bg-blue-600 text-white text-xs font-black hover:bg-blue-700 transition-colors shrink-0"
                    >
                      Confirm
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* ── Divider ── */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-blue-100" />
              <span className="text-[10px] font-black tracking-[0.25em] uppercase text-blue-400 px-2 bg-blue-50 border border-blue-100 rounded-full py-0.5">
                Enter OTP
              </span>
              <div className="h-px flex-1 bg-blue-100" />
            </div>

            {/* ── OTP boxes ── */}
            <div className="space-y-3">
              <OTPInput value={otp} onChange={setOtp} disabled={busy || !emailLocked} />

              {/* progress dots */}
              <div className="flex justify-center gap-1.5 pt-1">
                {Array.from({ length: 6 }).map((_, i) => {
                  const isFilled = otp[i] && otp[i] !== " ";
                  return (
                    <div key={i} className={`h-1 rounded-full transition-all duration-200 ${isFilled ? "w-5 bg-blue-500" : "w-3 bg-blue-100"}`} />
                  );
                })}
              </div>
            </div>

            {/* ── Error ── */}
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-xs font-bold justify-center bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
              </div>
            )}

            {/* ── Verify button ── */}
            <button
              onClick={handleVerify}
              disabled={!filled || busy || !emailLocked}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white text-sm font-black shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {phase === "verifying"
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying…</>
                : <><CheckCircle className="w-4 h-4" /> Verify Account <ChevronRight className="w-4 h-4" /></>
              }
            </button>

            {/* ── Resend row ── */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-semibold text-blue-300">Didn't receive the code?</span>
              {cooldown > 0 ? (
                <span className="text-xs font-black text-blue-400 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                  Resend in {cooldown}s
                </span>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={busy || !email || !emailLocked}
                  className="flex items-center gap-1.5 text-xs font-black text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {phase === "resending"
                    ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    : <RotateCcw className="w-3.5 h-3.5" />
                  }
                  Resend OTP
                </button>
              )}
            </div>

          </div>
        </div>

        {/* ── Footer links ── */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <Link to="/signup" className="text-sm font-black text-blue-500 hover:text-blue-700 hover:underline transition-colors">
            ← Back to Sign Up
          </Link>
          <div className="w-1 h-1 rounded-full bg-blue-200" />
          <Link to="/" className="text-sm font-black text-blue-500 hover:text-blue-700 hover:underline transition-colors">
            Sign In →
          </Link>
        </div>

      </main>
    </div>
  );
}