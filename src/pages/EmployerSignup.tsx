import { useState, useRef, useEffect, ChangeEvent } from "react";
import {
  User, Mail, Building2, MapPin,
  Briefcase, ChevronLeft, ChevronRight,
  ChevronDown, ArrowLeft, CheckCircle, AlertCircle, Loader2, Eye, EyeOff,
  ShieldCheck, RefreshCw, Factory,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

/* ═══════════════════════════════════════════════════════════
   Constants
═══════════════════════════════════════════════════════════ */
const BASE = "http://192.168.0.6:8000/api";

const DESIGNATIONS = [
  "CEO / Managing Director",
  "COO / Operations Head",
  "HR Manager",
  "HR Director",
  "Recruitment Manager",
  "Talent Acquisition Lead",
  "General Manager",
  "Department Head",
  "Business Owner",
  "Other",
];

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman & Nicobar Islands","Chandigarh","Dadra & Nagar Haveli","Daman & Diu",
  "Delhi","Jammu & Kashmir","Ladakh","Lakshadweep","Puducherry",
];

/* ═══════════════════════════════════════════════════════════
   Form state
═══════════════════════════════════════════════════════════ */
const INIT = {
  name: "",
  designation: "",
  customDesignation: "",
  contactNumber: "",
  email: "",
  password: "",
  confirmPassword: "",
  companyName: "",
  companyIndustry: "",
  companyAddressLine1: "",
  companyAddressLine2: "",
  companyCity: "",
  companyState: "",
  companyPincode: "",
  manufacturingActivity: "",
};
type F = typeof INIT;

/* ═══════════════════════════════════════════════════════════
   Shared styles
═══════════════════════════════════════════════════════════ */
const inputCls =
  "h-11 w-full rounded-xl border-2 border-blue-100 bg-blue-50 px-4 " +
  "text-base font-semibold text-slate-800 placeholder:text-blue-200 " +
  "transition-all duration-150 focus:outline-none focus:border-blue-500 " +
  "focus:bg-white focus:ring-4 focus:ring-blue-100";

const labelCls = "text-xs font-black tracking-widest uppercase text-blue-500 mb-1 block";

/* ═══════════════════════════════════════════════════════════
   Field
═══════════════════════════════════════════════════════════ */
interface FieldProps {
  label: string; field: string; value: string;
  onChange: (f: string, v: string) => void;
  type?: string; placeholder?: string; optional?: boolean;
  icon?: React.ReactNode;
}
const Field = ({ label, field, value, onChange, type = "text", placeholder, optional, icon }: FieldProps) => (
  <div className="flex flex-col">
    <label className={labelCls}>
      {label}{optional && <span className="normal-case text-blue-300 font-semibold tracking-normal ml-1">(optional)</span>}
    </label>
    <div className="relative">
      {icon && <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300">{icon}</span>}
      <input
        type={type} value={value} placeholder={placeholder ?? label}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(field, e.target.value)}
        className={`${inputCls} ${icon ? "pl-10" : ""}`}
      />
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   TextArea
═══════════════════════════════════════════════════════════ */
interface TextAreaProps {
  label: string; field: string; value: string;
  onChange: (f: string, v: string) => void;
  placeholder?: string; optional?: boolean; icon?: React.ReactNode;
}
const TextArea = ({ label, field, value, onChange, placeholder, optional, icon }: TextAreaProps) => (
  <div className="flex flex-col">
    <label className={labelCls}>
      {label}{optional && <span className="normal-case text-blue-300 font-semibold tracking-normal ml-1">(optional)</span>}
    </label>
    <div className="relative">
      {icon && <span className="pointer-events-none absolute left-3.5 top-3.5 text-blue-300">{icon}</span>}
      <textarea
        value={value} placeholder={placeholder ?? label} rows={3}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(field, e.target.value)}
        className={`w-full rounded-xl border-2 border-blue-100 bg-blue-50 px-4 py-3 text-base font-semibold text-slate-800 placeholder:text-blue-200 transition-all duration-150 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 resize-none ${icon ? "pl-10" : ""}`}
      />
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   Password Field
═══════════════════════════════════════════════════════════ */
const PasswordField = ({ label, field, value, onChange }: {
  label: string; field: string; value: string; onChange: (f: string, v: string) => void;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col">
      <label className={labelCls}>{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"} value={value} placeholder={label}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(field, e.target.value)}
          className={`${inputCls} pr-12`}
        />
        <button type="button" onClick={() => setShow(s => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-blue-500 transition-colors">
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   Dropdown (string options)
═══════════════════════════════════════════════════════════ */
const Dropdown = ({ label, field, value, onChange, options, icon, optional }: {
  label: string; field: string; value: string;
  onChange: (f: string, v: string) => void; options: string[]; icon?: React.ReactNode; optional?: boolean;
}) => (
  <div className="flex flex-col">
    <label className={labelCls}>
      {label}{optional && <span className="normal-case text-blue-300 font-semibold tracking-normal ml-1">(optional)</span>}
    </label>
    <div className="relative">
      {icon && <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300">{icon}</span>}
      <select value={value} onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(field, e.target.value)}
        className={`${inputCls} appearance-none pr-10 cursor-pointer ${icon ? "pl-10" : ""}`}>
        <option value="">Select…</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   Industry Dropdown (id + name pairs from API)
═══════════════════════════════════════════════════════════ */
interface IndustrySector { id: number; name: string; }

const IndustryDropdown = ({ value, onChange, industries, loading }: {
  value: string;
  onChange: (f: string, v: string) => void;
  industries: IndustrySector[];
  loading: boolean;
}) => (
  <div className="flex flex-col">
    <label className={labelCls}>
      Industry / Sector
      <span className="normal-case text-blue-300 font-semibold tracking-normal ml-1">(optional)</span>
    </label>
    <div className="relative">
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300">
        <Factory className="w-4 h-4" />
      </span>
      <select
        value={value}
        disabled={loading}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange("companyIndustry", e.target.value)}
        className={`${inputCls} appearance-none pl-10 pr-10 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        <option value="">{loading ? "Loading sectors…" : "Select sector…"}</option>
        {industries.map(s => (
          <option key={s.id} value={String(s.id)}>{s.name}</option>
        ))}
      </select>
      {loading
        ? <Loader2 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 animate-spin" />
        : <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
      }
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   Phone Field
═══════════════════════════════════════════════════════════ */
const PhoneField = ({ value, onChange }: { value: string; onChange: (f: string, v: string) => void }) => {
  const digits = value.replace(/\D/g, "");
  const complete = digits.length === 10;
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <label className={labelCls + " mb-0"}>Contact Number</label>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border transition-all ${complete ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-blue-300 bg-blue-50 border-blue-100"}`}>
          {digits.length}/10
        </span>
      </div>
      <div className="flex gap-2">
        <div className="h-11 flex items-center justify-center px-3 rounded-xl border-2 border-blue-100 bg-blue-50 text-sm font-black text-blue-500 shrink-0 select-none">
          +91
        </div>
        <input type="tel" value={value} maxLength={10} placeholder="10-digit mobile number"
          onChange={e => onChange("contactNumber", e.target.value.replace(/\D/g, "").slice(0, 10))}
          className={`${inputCls} flex-1 font-mono tracking-widest`} />
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   Section Divider
═══════════════════════════════════════════════════════════ */
const Divider = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3 my-5">
    <div className="h-px flex-1 bg-blue-100" />
    <span className="text-[10px] font-black tracking-[0.25em] uppercase text-blue-400 px-2 bg-blue-50 border border-blue-100 rounded-full py-0.5">{label}</span>
    <div className="h-px flex-1 bg-blue-100" />
  </div>
);

/* ═══════════════════════════════════════════════════════════
   Progress Steps
═══════════════════════════════════════════════════════════ */
const STEPS = ["Personal Info", "Company Details", "Security & OTP"];
const StepBar = ({ current }: { current: number }) => (
  <div className="flex items-center gap-0 mb-8">
    {STEPS.map((s, i) => (
      <div key={i} className="flex items-center flex-1 last:flex-none">
        <div className="flex flex-col items-center gap-1.5">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all duration-300 ${
            i < current ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200"
            : i === current ? "bg-white border-blue-600 text-blue-600 shadow-lg shadow-blue-100"
            : "bg-blue-50 border-blue-200 text-blue-300"
          }`}>
            {i < current ? <CheckCircle className="w-4 h-4" /> : i + 1}
          </div>
          <span className={`text-[9px] font-black tracking-widest uppercase whitespace-nowrap transition-colors ${
            i <= current ? "text-blue-600" : "text-blue-300"
          }`}>{s}</span>
        </div>
        {i < STEPS.length - 1 && (
          <div className={`flex-1 h-0.5 mx-2 mb-5 rounded-full transition-all duration-300 ${i < current ? "bg-blue-600" : "bg-blue-100"}`} />
        )}
      </div>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════
   OTP Input
═══════════════════════════════════════════════════════════ */
const OTP_LENGTH = 6;
const OtpInput = ({ otp, setOtp }: { otp: string[]; setOtp: (o: string[]) => void }) => {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handle = (i: number, val: string) => {
    const v = val.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < OTP_LENGTH - 1) refs.current[i + 1]?.focus();
  };

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH).split("");
    if (digits.length) {
      const next = [...otp];
      digits.forEach((d, i) => { next[i] = d; });
      setOtp(next);
      refs.current[Math.min(digits.length, OTP_LENGTH - 1)]?.focus();
      e.preventDefault();
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: OTP_LENGTH }).map((_, i) => (
        <input
          key={i}
          ref={el => { refs.current[i] = el; }}
          type="text" inputMode="numeric" maxLength={1}
          value={otp[i] ?? ""}
          onChange={e => handle(i, e.target.value)}
          onKeyDown={e => handleKey(i, e)}
          onPaste={handlePaste}
          className={`w-12 h-14 text-center text-xl font-black rounded-xl border-2 transition-all duration-150 focus:outline-none focus:ring-4
            ${otp[i] ? "border-blue-500 bg-blue-600 text-white focus:ring-blue-100" : "border-blue-100 bg-blue-50 text-slate-800 focus:border-blue-500 focus:bg-white focus:ring-blue-100"}`}
        />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   OTP Step
═══════════════════════════════════════════════════════════ */
const OtpStep = ({
  email, otp, setOtp, onVerify, onResend, verifying, verified, otpError, resendCooldown,
}: {
  email: string; otp: string[]; setOtp: (o: string[]) => void;
  onVerify: () => void; onResend: () => void;
  verifying: boolean; verified: boolean; otpError: string; resendCooldown: number;
}) => (
  <div className="flex flex-col items-center gap-6 py-4">
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center shadow-xl shadow-blue-200">
      <ShieldCheck className="w-8 h-8 text-white" />
    </div>
    <div className="text-center">
      <p className="text-sm font-black text-blue-900">Verify your email address</p>
      <p className="text-xs font-semibold text-blue-400 mt-1">
        We sent a 6-digit OTP to{" "}
        <span className="text-blue-600 font-black">{email}</span>
      </p>
    </div>

    {verified ? (
      <div className="flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center">
          <CheckCircle className="w-7 h-7 text-emerald-600" />
        </div>
        <p className="text-sm font-black text-emerald-600">Email verified successfully!</p>
      </div>
    ) : (
      <>
        <OtpInput otp={otp} setOtp={setOtp} />

        {otpError && (
          <div className="flex items-center gap-2 text-red-500 text-xs font-bold">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {otpError}
          </div>
        )}

        <button
          onClick={onVerify}
          disabled={verifying || otp.some(d => !d)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white text-sm font-black shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
        >
          {verifying ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying…</> : "Verify OTP →"}
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
          Didn't receive it?{" "}
          {resendCooldown > 0 ? (
            <span className="text-blue-300 font-black">Resend in {resendCooldown}s</span>
          ) : (
            <button onClick={onResend} className="flex items-center gap-1 text-blue-600 font-black hover:underline">
              <RefreshCw className="w-3 h-3" /> Resend OTP
            </button>
          )}
        </div>
      </>
    )}
  </div>
);

/* ═══════════════════════════════════════════════════════════
   Main Component
═══════════════════════════════════════════════════════════ */
export default function EmployerSignup() {
  const [form, setForm] = useState<F>(INIT);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Industries fetched from API
  const [industries, setIndustries] = useState<IndustrySector[]>([]);
  const [industriesLoading, setIndustriesLoading] = useState(true);

  // OTP state
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [otpSending, setOtpSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const navigate = useNavigate();

  /* ── Fetch industry sectors on mount ── */
  useEffect(() => {
    fetch(`${BASE}/industries/`)
      .then(r => r.json())
      .then((data: IndustrySector[]) => setIndustries(data))
      .catch(() => setIndustries([]))
      .finally(() => setIndustriesLoading(false));
  }, []);

  const set = (field: string, val: string) => setForm(p => ({ ...p, [field]: val }));
  const v = (k: keyof F) => form[k] as string;

  /* ── Resend cooldown timer ── */
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  /* ── Send OTP ── */
  const sendOtp = async () => {
    setOtpSending(true); setOtpError("");
    try {
      const res = await fetch(`${BASE}/employer/send-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: v("email") }),
      });
      if (!res.ok) throw new Error("Failed to send OTP");
      setResendCooldown(60);
      setOtp(Array(OTP_LENGTH).fill(""));
    } catch {
      setOtpError("Failed to send OTP. Please check your email.");
    } finally {
      setOtpSending(false);
    }
  };

  /* ── Verify OTP ── */
  const verifyOtp = async () => {
    setVerifying(true); setOtpError("");
    try {
      const res = await fetch(`${BASE}/employer/verify-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: v("email"), otp: otp.join("") }),
      });
      if (!res.ok) throw new Error("Invalid OTP");
      setVerified(true);
      setTimeout(() => handleSubmit(true), 800);
    } catch {
      setOtpError("Invalid or expired OTP. Please try again.");
      setOtp(Array(OTP_LENGTH).fill(""));
    } finally {
      setVerifying(false);
    }
  };

  /* ── Validation per step ── */
  const stepValid = () => {
    if (step === 0)
      return v("name") && v("designation") &&
        (v("designation") !== "Other" || v("customDesignation")) &&
        v("contactNumber").length === 10;
    if (step === 1)
      return v("companyName") && v("companyAddressLine1") &&
        v("companyCity") && v("companyState") && v("companyPincode").length === 6;
    if (step === 2)
      return v("email") && v("password") && v("password") === v("confirmPassword") && v("password").length >= 6;
    return false;
  };

  const handleBack = () => setStep(s => s - 1);

  /* ── Final submit ── */
  const handleSubmit = async (skipValidation = false) => {
    if (!skipValidation && !stepValid()) return;
    setSubmitting(true); setErrorMsg("");
    try {
      const designationValue = v("designation") === "Other" ? v("customDesignation") : v("designation");
      const payload = {
        name:                   v("name"),
        designation:            designationValue,
        contact_number:         v("contactNumber"),
        email:                  v("email"),
        password:               v("password"),
        company_name:           v("companyName"),
        company_industry:       v("companyIndustry") ? Number(v("companyIndustry")) : null,
        company_address_line1:  v("companyAddressLine1"),
        company_address_line2:  v("companyAddressLine2") || null,
        company_city:           v("companyCity"),
        company_state:          v("companyState"),
        company_pincode:        v("companyPincode"),
        manufacturing_activity: v("manufacturingActivity") || null,
      };
      const res = await fetch(`${BASE}/employer/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = Object.entries(err)
          .map(([k, val]) => `${k}: ${Array.isArray(val) ? val[0] : val}`)
          .join(" | ");
        throw new Error(msg || `Server error ${res.status}`);
      }
      navigate("/");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Signup failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const isOtpStep = step === 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b-2 border-blue-100 shadow-sm shadow-blue-50">
        <div className="max-w-2xl mx-auto px-6 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-200">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-black tracking-tight text-blue-900">Employer Registration</span>
          </div>
          <span className="text-[10px] font-black tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            Sign Up
          </span>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-10 pb-20">

        {/* ── Header ── */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 shadow-xl shadow-blue-200 mb-4">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-blue-900 tracking-tight">Create Employer Account</h1>
          <p className="text-sm font-semibold text-blue-400 mt-1">Post jobs & find talent · Takes less than 2 minutes</p>
        </div>

        {/* ── Step bar ── */}
        <StepBar current={Math.min(step, 2)} />

        {/* ── Card ── */}
        <div className="bg-white rounded-3xl border-2 border-blue-100 shadow-lg shadow-blue-50 overflow-hidden">

          {/* Card header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b-2 border-blue-50 bg-gradient-to-r from-blue-50 to-white">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200 shrink-0">
              {isOtpStep ? <ShieldCheck className="w-4 h-4 text-white" />
               : step === 0 ? <User className="w-4 h-4 text-white" />
               : step === 1 ? <Building2 className="w-4 h-4 text-white" />
               : <ShieldCheck className="w-4 h-4 text-white" />}
            </div>
            <span className="text-sm font-black tracking-widest uppercase text-blue-700">
              {isOtpStep ? "OTP Verification" : STEPS[step]}
            </span>
            {!isOtpStep && (
              <span className="ml-auto text-[10px] font-black tracking-widest uppercase text-blue-400 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
                Step {step + 1} of {STEPS.length}
              </span>
            )}
          </div>

          <div className="p-6 space-y-5">

            {/* ── Step 0: Personal Info ── */}
            {step === 0 && (
              <>
                <Field label="Full Name" field="name" value={v("name")} onChange={set}
                  icon={<User className="w-4 h-4" />} placeholder="Your full name" />

                <Dropdown label="Designation" field="designation" value={v("designation")} onChange={set}
                  options={DESIGNATIONS} icon={<Briefcase className="w-4 h-4" />} />

                {v("designation") === "Other" && (
                  <Field label="Specify Designation" field="customDesignation" value={v("customDesignation")} onChange={set}
                    icon={<Briefcase className="w-4 h-4" />} placeholder="Your designation" />
                )}

                <PhoneField value={v("contactNumber")} onChange={set} />
              </>
            )}

            {/* ── Step 1: Company Details ── */}
            {step === 1 && (
              <>
                <Divider label="Company Info" />

                {/* Company Name + Industry side by side */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Company Name" field="companyName" value={v("companyName")} onChange={set}
                    icon={<Building2 className="w-4 h-4" />} placeholder="Registered company name" />
                  <IndustryDropdown
                    value={v("companyIndustry")}
                    onChange={set}
                    industries={industries}
                    loading={industriesLoading}
                  />
                </div>

                <Divider label="Company Address" />

                <Field label="Address Line 1" field="companyAddressLine1" value={v("companyAddressLine1")} onChange={set}
                  icon={<MapPin className="w-4 h-4" />} placeholder="Street / Area / Plot No." />
                <Field label="Address Line 2" field="companyAddressLine2" value={v("companyAddressLine2")} onChange={set}
                  icon={<MapPin className="w-4 h-4" />} placeholder="Landmark, Building name, etc." optional />

                <div className="grid grid-cols-2 gap-4">
                  <Field label="City" field="companyCity" value={v("companyCity")} onChange={set}
                    icon={<MapPin className="w-4 h-4" />} placeholder="City" />
                  <Field label="Pincode" field="companyPincode" value={v("companyPincode")}
                    onChange={(f, val) => set(f, val.replace(/\D/g, "").slice(0, 6))}
                    placeholder="6-digit pincode" />
                </div>

                <Dropdown label="State" field="companyState" value={v("companyState")} onChange={set}
                  options={INDIAN_STATES} icon={<MapPin className="w-4 h-4" />} />

                <Divider label="Manufacturing Activity" />
                <TextArea
                  label="Manufacturing Activity" field="manufacturingActivity"
                  value={v("manufacturingActivity")} onChange={set}
                  icon={<Factory className="w-4 h-4" />}
                  placeholder="Describe the primary manufacturing or business activity…"
                  optional
                />
              </>
            )}

            {/* ── Step 2: Security ── */}
            {step === 2 && (
              <>
                <Field label="Email Address" field="email" value={v("email")} onChange={set}
                  type="email" icon={<Mail className="w-4 h-4" />} placeholder="you@company.com" />
                <Divider label="Set Password" />
                <PasswordField label="Password" field="password" value={v("password")} onChange={set} />
                <PasswordField label="Confirm Password" field="confirmPassword" value={v("confirmPassword")} onChange={set} />
                {v("confirmPassword") && v("password") !== v("confirmPassword") && (
                  <div className="flex items-center gap-2 text-red-500 text-xs font-bold">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> Passwords do not match
                  </div>
                )}
                {v("confirmPassword") && v("password") === v("confirmPassword") && v("password").length >= 6 && (
                  <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0" /> Passwords match
                  </div>
                )}
              </>
            )}

            {/* ── Step 3: OTP Verification ── */}
            {isOtpStep && (
              <OtpStep
                email={v("email")} otp={otp} setOtp={setOtp}
                onVerify={verifyOtp} onResend={sendOtp}
                verifying={verifying} verified={verified}
                otpError={otpError} resendCooldown={resendCooldown}
              />
            )}

          </div>

          {/* ── Navigation buttons ── */}
          {!isOtpStep && (
            <div className="px-6 pb-6 flex items-center gap-3">
              {step > 0 && (
                <button onClick={handleBack}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-blue-200 bg-blue-50 text-blue-600 text-sm font-black hover:bg-blue-100 hover:border-blue-400 transition-all">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              )}
              <div className="flex-1" />
              {step < STEPS.length - 1 ? (
                <button onClick={() => { if (stepValid()) setStep(s => s + 1); }} disabled={!stepValid()}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white text-sm font-black shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => { if (stepValid()) { sendOtp(); setStep(3); } }}
                  disabled={otpSending || !stepValid()}
                  className="flex items-center gap-2.5 px-10 py-3 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white text-sm font-black shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0">
                  {otpSending
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending OTP…</>
                    : <>Verify Email <ShieldCheck className="w-4 h-4" /></>
                  }
                </button>
              )}
            </div>
          )}

          {/* ── Back button on OTP step ── */}
          {isOtpStep && !verified && (
            <div className="px-6 pb-6">
              <button onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-blue-200 bg-blue-50 text-blue-600 text-sm font-black hover:bg-blue-100 hover:border-blue-400 transition-all">
                <ChevronLeft className="w-4 h-4" /> Change Email
              </button>
            </div>
          )}

          {/* ── Submitting indicator ── */}
          {submitting && (
            <div className="px-6 pb-6 flex items-center justify-center gap-3 text-blue-500 text-sm font-bold">
              <Loader2 className="w-4 h-4 animate-spin" /> Creating your account…
            </div>
          )}

          {/* ── Error banner ── */}
          {errorMsg && (
            <div className="mx-6 mb-6 flex items-start gap-3 px-5 py-4 rounded-2xl bg-red-50 border-2 border-red-200">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-black text-red-600">Registration failed</p>
                <p className="text-xs font-semibold text-red-400 mt-0.5 break-all">{errorMsg}</p>
              </div>
            </div>
          )}

        </div>

        {/* ── Already have account ── */}
        <p className="text-center text-sm font-semibold text-blue-400 mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-black hover:underline">Sign In →</Link>
        </p>

      </main>
    </div>
  );
}