// import { useState, useRef, useEffect, ChangeEvent } from "react";
// import {
//   User, Mail, Building2, MapPin, Hash,
//   GraduationCap, CalendarDays, ChevronLeft, ChevronRight,
//   ChevronDown, ArrowLeft, CheckCircle, AlertCircle, Loader2, Eye, EyeOff,
// } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";

// /* ═══════════════════════════════════════════════════════════
//    Constants
// ═══════════════════════════════════════════════════════════ */
// const BASE = "http://192.168.0.11:8000/api";

// const INDIAN_STATES = [
//   "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
//   "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
//   "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
//   "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
//   "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
//   "Andaman & Nicobar Islands","Chandigarh","Dadra & Nagar Haveli","Daman & Diu",
//   "Delhi","Jammu & Kashmir","Ladakh","Lakshadweep","Puducherry",
// ];

// const CURRENT_YEARS = ["1st Year","2nd Year","3rd Year","4th Year","5th Year","Graduated"];
// const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// /* ═══════════════════════════════════════════════════════════
//    Form state
// ═══════════════════════════════════════════════════════════ */
// const INIT = {
//   firstName: "", lastName: "",
//   dob_d: "", dob_m: "", dob_y: "",
//   collegeCode: "", collegeName: "",
//   rollNumber: "",
//   currentYear: "",
//   collegeState: "", collegeCity: "",
//   phone: "", email: "",
//   password: "", confirmPassword: "",
// };
// type F = typeof INIT;

// /* ═══════════════════════════════════════════════════════════
//    Helpers
// ═══════════════════════════════════════════════════════════ */
// const buildDOB = (d: string, m: string, y: string) => {
//   if (!d || !m || !y || y.length < 4) return null;
//   return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
// };

// /* ═══════════════════════════════════════════════════════════
//    Shared styles
// ═══════════════════════════════════════════════════════════ */
// const inputCls =
//   "h-11 w-full rounded-xl border-2 border-blue-100 bg-blue-50 px-4 " +
//   "text-base font-semibold text-slate-800 placeholder:text-blue-200 " +
//   "transition-all duration-150 focus:outline-none focus:border-blue-500 " +
//   "focus:bg-white focus:ring-4 focus:ring-blue-100";

// const labelCls = "text-xs font-black tracking-widest uppercase text-blue-500 mb-1 block";

// /* ═══════════════════════════════════════════════════════════
//    Field
// ═══════════════════════════════════════════════════════════ */
// interface FieldProps {
//   label: string; field: string; value: string;
//   onChange: (f: string, v: string) => void;
//   type?: string; placeholder?: string; optional?: boolean;
//   icon?: React.ReactNode;
// }
// const Field = ({ label, field, value, onChange, type = "text", placeholder, optional, icon }: FieldProps) => (
//   <div className="flex flex-col">
//     <label className={labelCls}>
//       {label}{optional && <span className="normal-case text-blue-300 font-semibold tracking-normal ml-1">(optional)</span>}
//     </label>
//     <div className="relative">
//       {icon && <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300">{icon}</span>}
//       <input
//         type={type} value={value} placeholder={placeholder ?? label}
//         onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(field, e.target.value)}
//         className={`${inputCls} ${icon ? "pl-10" : ""}`}
//       />
//     </div>
//   </div>
// );

// /* ═══════════════════════════════════════════════════════════
//    Password Field
// ═══════════════════════════════════════════════════════════ */
// const PasswordField = ({ label, field, value, onChange }: {
//   label: string; field: string; value: string; onChange: (f: string, v: string) => void;
// }) => {
//   const [show, setShow] = useState(false);
//   return (
//     <div className="flex flex-col">
//       <label className={labelCls}>{label}</label>
//       <div className="relative">
//         <input
//           type={show ? "text" : "password"} value={value} placeholder={label}
//           onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(field, e.target.value)}
//           className={`${inputCls} pr-12`}
//         />
//         <button type="button" onClick={() => setShow(s => !s)}
//           className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-blue-500 transition-colors">
//           {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//         </button>
//       </div>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════════
//    Dropdown
// ═══════════════════════════════════════════════════════════ */
// const Dropdown = ({ label, field, value, onChange, options, icon }: {
//   label: string; field: string; value: string;
//   onChange: (f: string, v: string) => void; options: string[]; icon?: React.ReactNode;
// }) => (
//   <div className="flex flex-col">
//     <label className={labelCls}>{label}</label>
//     <div className="relative">
//       {icon && <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300">{icon}</span>}
//       <select value={value} onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(field, e.target.value)}
//         className={`${inputCls} appearance-none pr-10 cursor-pointer ${icon ? "pl-10" : ""}`}>
//         <option value="">Select…</option>
//         {options.map(o => <option key={o} value={o}>{o}</option>)}
//       </select>
//       <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
//     </div>
//   </div>
// );

// /* ═══════════════════════════════════════════════════════════
//    DOB Picker
// ═══════════════════════════════════════════════════════════ */
// const DOBPicker = ({ dob_d, dob_m, dob_y, onChange }: {
//   dob_d: string; dob_m: string; dob_y: string; onChange: (f: string, v: string) => void;
// }) => {
//   const [open, setOpen] = useState(false);
//   const [calYear, setCalYear] = useState(() => { const y = parseInt(dob_y); return isNaN(y) ? new Date().getFullYear() - 20 : y; });
//   const [calMonth, setCalMonth] = useState(() => { const m = parseInt(dob_m); return isNaN(m) ? 0 : m - 1; });
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
//     document.addEventListener("mousedown", h);
//     return () => document.removeEventListener("mousedown", h);
//   }, []);

//   const calcAge = () => {
//     const d = parseInt(dob_d), m = parseInt(dob_m), y = parseInt(dob_y);
//     if (!d || !m || !y || y < 1900 || y > new Date().getFullYear()) return null;
//     const today = new Date();
//     let age = today.getFullYear() - y;
//     if (today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d)) age--;
//     return age >= 0 ? age : null;
//   };
//   const age = calcAge();
//   const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
//   const firstDay = new Date(calYear, calMonth, 1).getDay();

//   const selectDay = (day: number) => {
//     onChange("dob_d", String(day).padStart(2, "0"));
//     onChange("dob_m", String(calMonth + 1).padStart(2, "0"));
//     onChange("dob_y", String(calYear));
//     setOpen(false);
//   };
//   const ic = "h-11 rounded-xl border-2 border-blue-100 bg-blue-50 text-center text-base font-semibold text-slate-800 placeholder:text-blue-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all";

//   return (
//     <div className="flex flex-col">
//       <div className="flex items-center justify-between mb-1">
//         <label className={labelCls + " mb-0"}>Date of Birth</label>
//         {age !== null && (
//           <span className="text-xs font-black text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">{age} yrs</span>
//         )}
//       </div>
//       <div className="relative" ref={ref}>
//         <div className="flex gap-1.5 items-center">
//           <input placeholder="DD" value={dob_d} maxLength={2}
//             onChange={e => onChange("dob_d", e.target.value.replace(/\D/g, "").slice(0, 2))}
//             className={`${ic} w-14`} />
//           <input placeholder="MM" value={dob_m} maxLength={2}
//             onChange={e => { const v = e.target.value.replace(/\D/g, "").slice(0, 2); onChange("dob_m", v); if (parseInt(v) >= 1 && parseInt(v) <= 12) setCalMonth(parseInt(v) - 1); }}
//             className={`${ic} w-14`} />
//           <input placeholder="YYYY" value={dob_y} maxLength={4}
//             onChange={e => { const v = e.target.value.replace(/\D/g, "").slice(0, 4); onChange("dob_y", v); if (v.length === 4) setCalYear(parseInt(v)); }}
//             className={`${ic} flex-1`} />
//           <button type="button" onClick={() => setOpen(o => !o)}
//             className="h-11 w-11 shrink-0 flex items-center justify-center rounded-xl border-2 border-blue-100 bg-blue-50 hover:border-blue-500 hover:bg-blue-100 transition-all">
//             <CalendarDays className="w-5 h-5 text-blue-400" />
//           </button>
//         </div>
//         {open && (
//           <div className="absolute top-14 left-0 z-50 bg-white rounded-2xl border-2 border-blue-100 shadow-2xl shadow-blue-100 p-4 w-72 mt-1">
//             <div className="flex items-center justify-between mb-3">
//               <button type="button" onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); }}
//                 className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-100">
//                 <ChevronLeft className="w-4 h-4 text-blue-500" />
//               </button>
//               <div className="flex items-center gap-2">
//                 <select value={calMonth} onChange={e => setCalMonth(parseInt(e.target.value))}
//                   className="text-sm font-bold text-blue-700 bg-transparent border-none outline-none cursor-pointer">
//                   {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
//                 </select>
//                 <input type="number" value={calYear} onChange={e => setCalYear(parseInt(e.target.value) || calYear)}
//                   className="text-sm font-bold text-blue-700 w-16 text-center border-2 border-blue-100 rounded-lg px-1 py-0.5 focus:outline-none focus:border-blue-400 bg-blue-50" />
//               </div>
//               <button type="button" onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); }}
//                 className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-100">
//                 <ChevronRight className="w-4 h-4 text-blue-500" />
//               </button>
//             </div>
//             <div className="grid grid-cols-7 mb-1">
//               {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
//                 <div key={d} className="text-center text-[10px] font-black tracking-wider text-blue-300 py-1">{d}</div>
//               ))}
//             </div>
//             <div className="grid grid-cols-7 gap-y-0.5">
//               {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
//               {Array.from({ length: daysInMonth }).map((_, i) => {
//                 const day = i + 1;
//                 const selected = parseInt(dob_d) === day && parseInt(dob_m) === calMonth + 1 && parseInt(dob_y) === calYear;
//                 return (
//                   <button key={day} type="button" onClick={() => selectDay(day)}
//                     className={`h-8 w-full rounded-lg text-sm font-bold transition-all ${selected ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "hover:bg-blue-50 text-slate-700"}`}>
//                     {day}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════════
//    Section Divider
// ═══════════════════════════════════════════════════════════ */
// const Divider = ({ label }: { label: string }) => (
//   <div className="flex items-center gap-3 my-5">
//     <div className="h-px flex-1 bg-blue-100" />
//     <span className="text-[10px] font-black tracking-[0.25em] uppercase text-blue-400 px-2 bg-blue-50 border border-blue-100 rounded-full py-0.5">{label}</span>
//     <div className="h-px flex-1 bg-blue-100" />
//   </div>
// );

// /* ═══════════════════════════════════════════════════════════
//    Progress Steps
// ═══════════════════════════════════════════════════════════ */
// const STEPS = ["Personal Info", "College Info", "Contact & Security"];
// const StepBar = ({ current }: { current: number }) => (
//   <div className="flex items-center gap-0 mb-8">
//     {STEPS.map((s, i) => (
//       <div key={i} className="flex items-center flex-1 last:flex-none">
//         <div className="flex flex-col items-center gap-1.5">
//           <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all duration-300 ${
//             i < current ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200"
//             : i === current ? "bg-white border-blue-600 text-blue-600 shadow-lg shadow-blue-100"
//             : "bg-blue-50 border-blue-200 text-blue-300"
//           }`}>
//             {i < current ? <CheckCircle className="w-4 h-4" /> : i + 1}
//           </div>
//           <span className={`text-[9px] font-black tracking-widest uppercase whitespace-nowrap transition-colors ${
//             i <= current ? "text-blue-600" : "text-blue-300"
//           }`}>{s}</span>
//         </div>
//         {i < STEPS.length - 1 && (
//           <div className={`flex-1 h-0.5 mx-2 mb-5 rounded-full transition-all duration-300 ${i < current ? "bg-blue-600" : "bg-blue-100"}`} />
//         )}
//       </div>
//     ))}
//   </div>
// );

// /* ═══════════════════════════════════════════════════════════
//    Phone Field
// ═══════════════════════════════════════════════════════════ */
// const PhoneField = ({ value, onChange }: { value: string; onChange: (f: string, v: string) => void }) => {
//   const digits = value.replace(/\D/g, "");
//   const complete = digits.length === 10;
//   return (
//     <div className="flex flex-col">
//       <div className="flex items-center justify-between mb-1">
//         <label className={labelCls + " mb-0"}>Phone Number</label>
//         <span className={`text-xs font-bold px-2 py-0.5 rounded-full border transition-all ${complete ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-blue-300 bg-blue-50 border-blue-100"}`}>
//           {digits.length}/10
//         </span>
//       </div>
//       <div className="flex gap-2">
//         <div className="h-11 flex items-center justify-center px-3 rounded-xl border-2 border-blue-100 bg-blue-50 text-sm font-black text-blue-500 shrink-0 select-none">
//           +91
//         </div>
//         <input type="tel" value={value} maxLength={10} placeholder="10-digit mobile number"
//           onChange={e => onChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
//           className={`${inputCls} flex-1 font-mono tracking-widest`} />
//       </div>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════════
//    Main Component
// ═══════════════════════════════════════════════════════════ */
// export default function HRSignup() {
//   const [form, setForm] = useState<F>(INIT);
//   const [step, setStep] = useState(0);
//   const [submitting, setSubmitting] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const navigate = useNavigate();

//   const set = (field: string, val: string) => setForm(p => ({ ...p, [field]: val }));
//   const v = (k: keyof F) => form[k] as string;

//   /* ── validation per step ── */
//   const stepValid = () => {
//     if (step === 0) return v("firstName") && v("lastName") && v("dob_d") && v("dob_m") && v("dob_y");
//     if (step === 1) return v("collegeCode") && v("collegeName") && v("currentYear") && v("collegeState") && v("collegeCity");
//     if (step === 2) return v("phone").length === 10 && v("email") && v("password") && v("password") === v("confirmPassword");
//     return false;
//   };

//   const handleNext = () => { if (stepValid()) setStep(s => s + 1); };
//   const handleBack = () => setStep(s => s - 1);

//   const handleSubmit = async () => {
//     if (!stepValid()) return;
//     setSubmitting(true); setErrorMsg("");
//     try {
//       const payload = {
//         first_name:    v("firstName"),
//         last_name:     v("lastName"),
//         dob:           buildDOB(v("dob_d"), v("dob_m"), v("dob_y")),
//         college_code:  v("collegeCode"),
//         college_name:  v("collegeName"),
//         roll_number:   v("rollNumber") || null,
//         current_year:  v("currentYear"),
//         college_state: v("collegeState"),
//         college_city:  v("collegeCity"),
//         phone:         v("phone"),
//         email:         v("email"),
//         password:      v("password"),
//       };
//       const res = await fetch(`${BASE}/hr/signup/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       if (!res.ok) {
//         const err = await res.json().catch(() => ({}));
//         const msg = Object.entries(err)
//           .map(([k, val]) => `${k}: ${Array.isArray(val) ? val[0] : val}`)
//           .join(" | ");
//         throw new Error(msg || `Server error ${res.status}`);
//       }
//       const data = await res.json();
//       // ✅ Go to the standalone verify page, carrying the email
//       navigate("/verify", { state: { email: data.email } });
//     } catch (err: unknown) {
//       setErrorMsg(err instanceof Error ? err.message : "Signup failed.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50"
//       style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
//       <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>

//       {/* ── Navbar ── */}
//       <nav className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b-2 border-blue-100 shadow-sm shadow-blue-50">
//         <div className="max-w-2xl mx-auto px-6 h-full flex items-center justify-between">
//           <Link to="/" className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-600 transition-colors">
//             <ArrowLeft className="w-4 h-4" /> Back
//           </Link>
//           <div className="flex items-center gap-2.5">
//             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-200">
//               <User className="w-4 h-4 text-white" />
//             </div>
//             <span className="text-base font-black tracking-tight text-blue-900">HR Registration</span>
//           </div>
//           <span className="text-[10px] font-black tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
//             Sign Up
//           </span>
//         </div>
//       </nav>

//       <main className="max-w-2xl mx-auto px-4 py-10 pb-20">

//         {/* ── Header ── */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 shadow-xl shadow-blue-200 mb-4">
//             <GraduationCap className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-2xl font-black text-blue-900 tracking-tight">Create HR Account</h1>
//           <p className="text-sm font-semibold text-blue-400 mt-1">Join the HR Network · Takes less than 2 minutes</p>
//         </div>

//         {/* ── Step bar ── */}
//         <StepBar current={step} />

//         {/* ── Card ── */}
//         <div className="bg-white rounded-3xl border-2 border-blue-100 shadow-lg shadow-blue-50 overflow-hidden">

//           {/* Card header */}
//           <div className="flex items-center gap-3 px-6 py-4 border-b-2 border-blue-50 bg-gradient-to-r from-blue-50 to-white">
//             <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200 shrink-0">
//               {step === 0 ? <User className="w-4 h-4 text-white" />
//                : step === 1 ? <Building2 className="w-4 h-4 text-white" />
//                : <Mail className="w-4 h-4 text-white" />}
//             </div>
//             <span className="text-sm font-black tracking-widest uppercase text-blue-700">{STEPS[step]}</span>
//             <span className="ml-auto text-[10px] font-black tracking-widest uppercase text-blue-400 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
//               Step {step + 1} of {STEPS.length}
//             </span>
//           </div>

//           <div className="p-6 space-y-5">

//             {/* ── Step 0: Personal Info ── */}
//             {step === 0 && (
//               <>
//                 <div className="grid grid-cols-2 gap-4">
//                   <Field label="First Name" field="firstName" value={v("firstName")} onChange={set} icon={<User className="w-4 h-4" />} />
//                   <Field label="Last Name" field="lastName" value={v("lastName")} onChange={set} icon={<User className="w-4 h-4" />} />
//                 </div>
//                 <DOBPicker dob_d={v("dob_d")} dob_m={v("dob_m")} dob_y={v("dob_y")} onChange={set} />
//               </>
//             )}

//             {/* ── Step 1: College Info ── */}
//             {step === 1 && (
//               <>
//                 <div className="grid grid-cols-2 gap-4">
//                   <Field label="College Code" field="collegeCode" value={v("collegeCode")} onChange={set}
//                     icon={<Hash className="w-4 h-4" />} placeholder="e.g. JNTUH001" />
//                   <Dropdown label="Current Year" field="currentYear" value={v("currentYear")} onChange={set}
//                     options={CURRENT_YEARS} icon={<GraduationCap className="w-4 h-4" />} />
//                 </div>
//                 <Field label="College Name" field="collegeName" value={v("collegeName")} onChange={set}
//                   icon={<Building2 className="w-4 h-4" />} placeholder="Full college name" />
//                 <Field label="Roll Number" field="rollNumber" value={v("rollNumber")} onChange={set}
//                   optional icon={<Hash className="w-4 h-4" />} placeholder="Your roll / student number" />
//                 <Divider label="College Location" />
//                 <div className="grid grid-cols-2 gap-4">
//                   <Dropdown label="College State" field="collegeState" value={v("collegeState")} onChange={set}
//                     options={INDIAN_STATES} icon={<MapPin className="w-4 h-4" />} />
//                   <Field label="College City" field="collegeCity" value={v("collegeCity")} onChange={set}
//                     icon={<MapPin className="w-4 h-4" />} placeholder="City / District" />
//                 </div>
//               </>
//             )}

//             {/* ── Step 2: Contact & Security ── */}
//             {step === 2 && (
//               <>
//                 <PhoneField value={v("phone")} onChange={set} />
//                 <Field label="Email Address" field="email" value={v("email")} onChange={set}
//                   type="email" icon={<Mail className="w-4 h-4" />} placeholder="you@example.com" />
//                 <Divider label="Set Password" />
//                 <PasswordField label="Password" field="password" value={v("password")} onChange={set} />
//                 <PasswordField label="Confirm Password" field="confirmPassword" value={v("confirmPassword")} onChange={set} />
//                 {v("confirmPassword") && v("password") !== v("confirmPassword") && (
//                   <div className="flex items-center gap-2 text-red-500 text-xs font-bold">
//                     <AlertCircle className="w-3.5 h-3.5 shrink-0" /> Passwords do not match
//                   </div>
//                 )}
//                 {v("confirmPassword") && v("password") === v("confirmPassword") && v("password").length >= 6 && (
//                   <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold">
//                     <CheckCircle className="w-3.5 h-3.5 shrink-0" /> Passwords match
//                   </div>
//                 )}
//               </>
//             )}

//           </div>

//           {/* ── Navigation buttons ── */}
//           <div className="px-6 pb-6 flex items-center gap-3">
//             {step > 0 && (
//               <button onClick={handleBack}
//                 className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-blue-200 bg-blue-50 text-blue-600 text-sm font-black hover:bg-blue-100 hover:border-blue-400 transition-all">
//                 <ChevronLeft className="w-4 h-4" /> Back
//               </button>
//             )}
//             <div className="flex-1" />
//             {step < STEPS.length - 1 ? (
//               <button onClick={handleNext} disabled={!stepValid()}
//                 className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white text-sm font-black shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0">
//                 Next <ChevronRight className="w-4 h-4" />
//               </button>
//             ) : (
//               <button onClick={handleSubmit} disabled={submitting || !stepValid()}
//                 className="flex items-center gap-2.5 px-10 py-3 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white text-sm font-black shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0">
//                 {submitting
//                   ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating Account…</>
//                   : "Create Account →"
//                 }
//               </button>
//             )}
//           </div>

//           {/* ── Error banner ── */}
//           {errorMsg && (
//             <div className="mx-6 mb-6 flex items-start gap-3 px-5 py-4 rounded-2xl bg-red-50 border-2 border-red-200">
//               <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
//               <div>
//                 <p className="text-sm font-black text-red-600">Registration failed</p>
//                 <p className="text-xs font-semibold text-red-400 mt-0.5 break-all">{errorMsg}</p>
//               </div>
//             </div>
//           )}

//         </div>

//         {/* ── Already have account ── */}
//         <p className="text-center text-sm font-semibold text-blue-400 mt-6">
//           Already have an account?{" "}
//           <Link to="/" className="text-blue-600 font-black hover:underline">Sign In →</Link>
//         </p>

//       </main>
//     </div>
//   );
// }




import { useState, useRef, useEffect, ChangeEvent } from "react";
import {
  User, Mail, Building2, MapPin, Hash,
  GraduationCap, CalendarDays, ChevronLeft, ChevronRight,
  ChevronDown, ArrowLeft, CheckCircle, AlertCircle, Loader2, Eye, EyeOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

/* ═══════════════════════════════════════════════════════════
   Constants
═══════════════════════════════════════════════════════════ */
const BASE = "http://192.168.0.8:8000/api";

// States where college name is fetched as a dropdown
const DROPDOWN_STATES = ["Andhra Pradesh", "Telangana"];

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman & Nicobar Islands","Chandigarh","Dadra & Nagar Haveli","Daman & Diu",
  "Delhi","Jammu & Kashmir","Ladakh","Lakshadweep","Puducherry",
];

const CURRENT_YEARS = ["1st Year","2nd Year","3rd Year","4th Year","5th Year","Graduated"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

/* ═══════════════════════════════════════════════════════════
   Form state
═══════════════════════════════════════════════════════════ */
const INIT = {
  firstName: "", lastName: "",
  dob_d: "", dob_m: "", dob_y: "",
  collegeCode: "", collegeName: "",
  rollNumber: "",
  currentYear: "",
  collegeState: "", collegeCity: "",
  phone: "", email: "",
  password: "", confirmPassword: "",
};
type F = typeof INIT;

/* ═══════════════════════════════════════════════════════════
   Helpers
═══════════════════════════════════════════════════════════ */
const buildDOB = (d: string, m: string, y: string) => {
  if (!d || !m || !y || y.length < 4) return null;
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
};

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
   Dropdown
═══════════════════════════════════════════════════════════ */
const Dropdown = ({ label, field, value, onChange, options, icon }: {
  label: string; field: string; value: string;
  onChange: (f: string, v: string) => void; options: string[]; icon?: React.ReactNode;
}) => (
  <div className="flex flex-col">
    <label className={labelCls}>{label}</label>
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
   University record from API
═══════════════════════════════════════════════════════════ */
interface University { name: string; }

/* ═══════════════════════════════════════════════════════════
   useUniversities — fetch college names for a given state
═══════════════════════════════════════════════════════════ */
function useUniversities(state: string) {
  const [colleges, setColleges] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isDropdown = DROPDOWN_STATES.includes(state);

  useEffect(() => {
    if (!isDropdown) { setColleges([]); setError(""); return; }
    setLoading(true); setError("");
    fetch(`${BASE}/universities/?state=${encodeURIComponent(state)}`)
      .then(r => { if (!r.ok) throw new Error("Failed to fetch"); return r.json(); })
      .then((data: University[]) => setColleges(data.map(u => u.name).sort()))
      .catch(() => setError("Could not load colleges for this state."))
      .finally(() => setLoading(false));
  }, [state, isDropdown]);

  return { isDropdown, loading, error, colleges };
}

/* ═══════════════════════════════════════════════════════════
   SmartSelect — dropdown with loading / error / fallback states
═══════════════════════════════════════════════════════════ */
interface SmartSelectProps {
  label: string; field: string; value: string;
  onChange: (f: string, v: string) => void;
  options: string[]; icon?: React.ReactNode;
  loading?: boolean; error?: string; loadingLabel?: string;
  placeholder?: string; count?: number;
  fallbackPlaceholder?: string;
}
const SmartSelect = ({
  label, field, value, onChange, options, icon,
  loading, error, loadingLabel, placeholder, count, fallbackPlaceholder,
}: SmartSelectProps) => {
  if (loading) {
    return (
      <div className="flex flex-col">
        <label className={labelCls}>{label}</label>
        <div className={`${inputCls} flex items-center gap-2 text-blue-400`}>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span className="text-sm font-semibold">{loadingLabel ?? `Loading ${label.toLowerCase()}…`}</span>
        </div>
      </div>
    );
  }

  if (error || options.length === 0) {
    return (
      <div className="flex flex-col gap-1.5">
        {error && (
          <div className="flex items-center gap-1.5 text-amber-600 text-xs font-bold">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
          </div>
        )}
        <Field label={label} field={field} value={value} onChange={onChange}
          icon={icon} placeholder={fallbackPlaceholder ?? label} />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <label className={labelCls + " mb-0"}>{label}</label>
        {count !== undefined && (
          <span className="text-[10px] font-black tracking-wider text-blue-400 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full uppercase">
            {count} found
          </span>
        )}
      </div>
      <div className="relative">
        {icon && <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300">{icon}</span>}
        <select value={value} onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(field, e.target.value)}
          className={`${inputCls} appearance-none pr-10 cursor-pointer ${icon ? "pl-10" : ""}`}>
          <option value="">{placeholder ?? `Select ${label.toLowerCase()}…`}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   Step 1 Fields
═══════════════════════════════════════════════════════════ */
const Step1Fields = ({ form, set, v }: {
  form: F;
  set: (f: string, v: string) => void;
  v: (k: keyof F) => string;
}) => {
  const { isDropdown, loading, error, colleges } = useUniversities(v("collegeState"));

  const handleStateChange = (_f: string, val: string) => {
    set("collegeState", val);
    set("collegeName", "");
  };

  return (
    <>
      {/* ── LOCATION FIRST ── */}
      <Divider label="College Location" />
      <div className="grid grid-cols-2 gap-4">
        <Dropdown
          label="College State" field="collegeState" value={v("collegeState")}
          onChange={handleStateChange}
          options={INDIAN_STATES} icon={<MapPin className="w-4 h-4" />}
        />
        <Field label="College City" field="collegeCity" value={v("collegeCity")} onChange={set}
          icon={<MapPin className="w-4 h-4" />} placeholder="City / District" />
      </div>

      {/* ── COLLEGE INFO BELOW ── */}
      <Divider label="College Info" />
      <div className="grid grid-cols-2 gap-4">
        <Field label="College Code" field="collegeCode" value={v("collegeCode")} onChange={set}
          icon={<Hash className="w-4 h-4" />} placeholder="e.g. JNTUH001" />
        <Dropdown label="Current Year" field="currentYear" value={v("currentYear")} onChange={set}
          options={CURRENT_YEARS} icon={<GraduationCap className="w-4 h-4" />} />
      </div>

      {/* College Name — dropdown for AP/Telangana, free-text otherwise */}
      {isDropdown ? (
        <SmartSelect
          label="College Name" field="collegeName" value={v("collegeName")}
          onChange={set}
          options={colleges}
          icon={<Building2 className="w-4 h-4" />}
          loading={loading} error={error}
          loadingLabel="Loading colleges…"
          placeholder="Select your college…"
          count={colleges.length || undefined}
          fallbackPlaceholder="Full college name"
        />
      ) : (
        <Field label="College Name" field="collegeName" value={v("collegeName")} onChange={set}
          icon={<Building2 className="w-4 h-4" />} placeholder="Full college name" />
      )}

      <Field label="Roll Number" field="rollNumber" value={v("rollNumber")} onChange={set}
        optional icon={<Hash className="w-4 h-4" />} placeholder="Your roll / student number" />
    </>
  );
};

/* ═══════════════════════════════════════════════════════════
   DOB Picker
═══════════════════════════════════════════════════════════ */
const DOBPicker = ({ dob_d, dob_m, dob_y, onChange }: {
  dob_d: string; dob_m: string; dob_y: string; onChange: (f: string, v: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [calYear, setCalYear] = useState(() => { const y = parseInt(dob_y); return isNaN(y) ? new Date().getFullYear() - 20 : y; });
  const [calMonth, setCalMonth] = useState(() => { const m = parseInt(dob_m); return isNaN(m) ? 0 : m - 1; });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const calcAge = () => {
    const d = parseInt(dob_d), m = parseInt(dob_m), y = parseInt(dob_y);
    if (!d || !m || !y || y < 1900 || y > new Date().getFullYear()) return null;
    const today = new Date();
    let age = today.getFullYear() - y;
    if (today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d)) age--;
    return age >= 0 ? age : null;
  };
  const age = calcAge();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDay = new Date(calYear, calMonth, 1).getDay();

  const selectDay = (day: number) => {
    onChange("dob_d", String(day).padStart(2, "0"));
    onChange("dob_m", String(calMonth + 1).padStart(2, "0"));
    onChange("dob_y", String(calYear));
    setOpen(false);
  };
  const ic = "h-11 rounded-xl border-2 border-blue-100 bg-blue-50 text-center text-base font-semibold text-slate-800 placeholder:text-blue-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all";

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <label className={labelCls + " mb-0"}>Date of Birth</label>
        {age !== null && (
          <span className="text-xs font-black text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">{age} yrs</span>
        )}
      </div>
      <div className="relative" ref={ref}>
        <div className="flex gap-1.5 items-center">
          <input placeholder="DD" value={dob_d} maxLength={2}
            onChange={e => onChange("dob_d", e.target.value.replace(/\D/g, "").slice(0, 2))}
            className={`${ic} w-14`} />
          <input placeholder="MM" value={dob_m} maxLength={2}
            onChange={e => { const v = e.target.value.replace(/\D/g, "").slice(0, 2); onChange("dob_m", v); if (parseInt(v) >= 1 && parseInt(v) <= 12) setCalMonth(parseInt(v) - 1); }}
            className={`${ic} w-14`} />
          <input placeholder="YYYY" value={dob_y} maxLength={4}
            onChange={e => { const v = e.target.value.replace(/\D/g, "").slice(0, 4); onChange("dob_y", v); if (v.length === 4) setCalYear(parseInt(v)); }}
            className={`${ic} flex-1`} />
          <button type="button" onClick={() => setOpen(o => !o)}
            className="h-11 w-11 shrink-0 flex items-center justify-center rounded-xl border-2 border-blue-100 bg-blue-50 hover:border-blue-500 hover:bg-blue-100 transition-all">
            <CalendarDays className="w-5 h-5 text-blue-400" />
          </button>
        </div>
        {open && (
          <div className="absolute top-14 left-0 z-50 bg-white rounded-2xl border-2 border-blue-100 shadow-2xl shadow-blue-100 p-4 w-72 mt-1">
            <div className="flex items-center justify-between mb-3">
              <button type="button" onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); }}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-100">
                <ChevronLeft className="w-4 h-4 text-blue-500" />
              </button>
              <div className="flex items-center gap-2">
                <select value={calMonth} onChange={e => setCalMonth(parseInt(e.target.value))}
                  className="text-sm font-bold text-blue-700 bg-transparent border-none outline-none cursor-pointer">
                  {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
                </select>
                <input type="number" value={calYear} onChange={e => setCalYear(parseInt(e.target.value) || calYear)}
                  className="text-sm font-bold text-blue-700 w-16 text-center border-2 border-blue-100 rounded-lg px-1 py-0.5 focus:outline-none focus:border-blue-400 bg-blue-50" />
              </div>
              <button type="button" onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); }}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-100">
                <ChevronRight className="w-4 h-4 text-blue-500" />
              </button>
            </div>
            <div className="grid grid-cols-7 mb-1">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                <div key={d} className="text-center text-[10px] font-black tracking-wider text-blue-300 py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-0.5">
              {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const selected = parseInt(dob_d) === day && parseInt(dob_m) === calMonth + 1 && parseInt(dob_y) === calYear;
                return (
                  <button key={day} type="button" onClick={() => selectDay(day)}
                    className={`h-8 w-full rounded-lg text-sm font-bold transition-all ${selected ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "hover:bg-blue-50 text-slate-700"}`}>
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        )}
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
const STEPS = ["Personal Info", "College Info", "Contact & Security"];
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
   Phone Field
═══════════════════════════════════════════════════════════ */
const PhoneField = ({ value, onChange }: { value: string; onChange: (f: string, v: string) => void }) => {
  const digits = value.replace(/\D/g, "");
  const complete = digits.length === 10;
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <label className={labelCls + " mb-0"}>Phone Number</label>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border transition-all ${complete ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-blue-300 bg-blue-50 border-blue-100"}`}>
          {digits.length}/10
        </span>
      </div>
      <div className="flex gap-2">
        <div className="h-11 flex items-center justify-center px-3 rounded-xl border-2 border-blue-100 bg-blue-50 text-sm font-black text-blue-500 shrink-0 select-none">
          +91
        </div>
        <input type="tel" value={value} maxLength={10} placeholder="10-digit mobile number"
          onChange={e => onChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
          className={`${inputCls} flex-1 font-mono tracking-widest`} />
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   Main Component
═══════════════════════════════════════════════════════════ */
export default function HRSignup() {
  const [form, setForm] = useState<F>(INIT);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const set = (field: string, val: string) => setForm(p => ({ ...p, [field]: val }));
  const v = (k: keyof F) => form[k] as string;

  /* ── validation per step ── */
  const stepValid = () => {
    if (step === 0) return v("firstName") && v("lastName") && v("dob_d") && v("dob_m") && v("dob_y");
    if (step === 1) return v("collegeState") && v("collegeCity") && v("collegeCode") && v("collegeName") && v("currentYear");
    if (step === 2) return v("phone").length === 10 && v("email") && v("password") && v("password") === v("confirmPassword");
    return false;
  };

  const handleNext = () => { if (stepValid()) setStep(s => s + 1); };
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    if (!stepValid()) return;
    setSubmitting(true); setErrorMsg("");
    try {
      const payload = {
        first_name:    v("firstName"),
        last_name:     v("lastName"),
        dob:           buildDOB(v("dob_d"), v("dob_m"), v("dob_y")),
        college_code:  v("collegeCode"),
        college_name:  v("collegeName"),
        roll_number:   v("rollNumber") || null,
        current_year:  v("currentYear"),
        college_state: v("collegeState"),
        college_city:  v("collegeCity"),
        phone:         v("phone"),
        email:         v("email"),
        password:      v("password"),
      };
      const res = await fetch(`${BASE}/hr/signup/`, {
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
      const data = await res.json();
      navigate("/verify", { state: { email: data.email } });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Signup failed.");
    } finally {
      setSubmitting(false);
    }
  };

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
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-black tracking-tight text-blue-900">HR Registration</span>
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
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-blue-900 tracking-tight">Create HR Account</h1>
          <p className="text-sm font-semibold text-blue-400 mt-1">Join the HR Network · Takes less than 2 minutes</p>
        </div>

        {/* ── Step bar ── */}
        <StepBar current={step} />

        {/* ── Card ── */}
        <div className="bg-white rounded-3xl border-2 border-blue-100 shadow-lg shadow-blue-50 ">

          {/* Card header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b-2 border-blue-50 bg-gradient-to-r from-blue-50 to-white">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200 shrink-0">
              {step === 0 ? <User className="w-4 h-4 text-white" />
               : step === 1 ? <Building2 className="w-4 h-4 text-white" />
               : <Mail className="w-4 h-4 text-white" />}
            </div>
            <span className="text-sm font-black tracking-widest uppercase text-blue-700">{STEPS[step]}</span>
            <span className="ml-auto text-[10px] font-black tracking-widest uppercase text-blue-400 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
              Step {step + 1} of {STEPS.length}
            </span>
          </div>

          <div className="p-6 space-y-5">

            {/* ── Step 0: Personal Info ── */}
            {step === 0 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="First Name" field="firstName" value={v("firstName")} onChange={set} icon={<User className="w-4 h-4" />} />
                  <Field label="Last Name" field="lastName" value={v("lastName")} onChange={set} icon={<User className="w-4 h-4" />} />
                </div>
                <DOBPicker dob_d={v("dob_d")} dob_m={v("dob_m")} dob_y={v("dob_y")} onChange={set} />
              </>
            )}

            {/* ── Step 1: College Info ── */}
            {step === 1 && (
              <Step1Fields form={form} set={set} v={v} />
            )}

            {/* ── Step 2: Contact & Security ── */}
            {step === 2 && (
              <>
                <PhoneField value={v("phone")} onChange={set} />
                <Field label="Email Address" field="email" value={v("email")} onChange={set}
                  type="email" icon={<Mail className="w-4 h-4" />} placeholder="you@example.com" />
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

          </div>

          {/* ── Navigation buttons ── */}
          <div className="px-6 pb-6 flex items-center gap-3">
            {step > 0 && (
              <button onClick={handleBack}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-blue-200 bg-blue-50 text-blue-600 text-sm font-black hover:bg-blue-100 hover:border-blue-400 transition-all">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            )}
            <div className="flex-1" />
            {step < STEPS.length - 1 ? (
              <button onClick={handleNext} disabled={!stepValid()}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white text-sm font-black shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={submitting || !stepValid()}
                className="flex items-center gap-2.5 px-10 py-3 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white text-sm font-black shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0">
                {submitting
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating Account…</>
                  : "Create Account →"
                }
              </button>
            )}
          </div>

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