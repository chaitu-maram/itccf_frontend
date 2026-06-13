
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
const BASE = "http://192.168.0.6:8000/api";

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
   Validation helpers
═══════════════════════════════════════════════════════════ */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

function validateName(val: string, label: string): string {
  if (!val.trim()) return `${label} is required.`;
  if (val.trim().length < 2) return `${label} must be at least 2 characters.`;
  if (/\d/.test(val)) return `${label} should not contain numbers.`;
  if (/[^a-zA-Z\s'\-.]/.test(val)) return `${label} contains invalid characters.`;
  return "";
}

function validateDOB(d: string, m: string, y: string): string {
  if (!d || !m || !y) return "Please enter your complete date of birth.";
  const day = parseInt(d), month = parseInt(m), year = parseInt(y);
  if (isNaN(day) || day < 1 || day > 31) return "Day must be between 1 and 31.";
  if (isNaN(month) || month < 1 || month > 12) return "Month must be between 1 and 12.";
  if (isNaN(year) || y.length < 4) return "Enter a valid 4-digit year.";
  if (year < 1900 || year > new Date().getFullYear()) return "Year seems out of range.";
  // Check real date validity
  const date = new Date(year, month - 1, day);
  if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year)
    return "This date doesn't exist. Please check day/month.";
  // Age check: must be at least 15 years old
  const today = new Date();
  let age = today.getFullYear() - year;
  if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day)) age--;
  if (age < 15) return "You must be at least 15 years old to register.";
  if (age > 80) return "Please enter a valid date of birth.";
  return "";
}

function validatePhone(phone: string): string {
  if (!phone) return "Phone number is required.";
  if (phone.length < 10) return `${10 - phone.length} more digit${10 - phone.length > 1 ? "s" : ""} needed.`;
  if (!/^[6-9]\d{9}$/.test(phone)) return "Enter a valid Indian mobile number (starts with 6–9).";
  return "";
}

function validateEmail(email: string): string {
  if (!email.trim()) return "Email address is required.";
  if (!EMAIL_REGEX.test(email)) return "Enter a valid email address (e.g. you@example.com).";
  return "";
}

function validatePassword(password: string): string {
  if (!password) return "Password is required.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  if (!/[A-Za-z]/.test(password)) return "Password must contain at least one letter.";
  return "";
}

function getPasswordScore(password: string): number {
  if (!password) return 0;
  return [
    password.length >= 8,
    password.length >= 12,
    /[A-Z]/.test(password) || /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;
}

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
type Errors = Partial<Record<keyof F | "dob", string>>;

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

const inputErrCls =
  "h-11 w-full rounded-xl border-2 border-red-300 bg-red-50 px-4 " +
  "text-base font-semibold text-slate-800 placeholder:text-red-200 " +
  "transition-all duration-150 focus:outline-none focus:border-red-500 " +
  "focus:bg-white focus:ring-4 focus:ring-red-100";

const labelCls = "text-xs font-black tracking-widest uppercase text-blue-500 mb-1 block";

/* Inline field error */
const FieldError = ({ msg }: { msg?: string }) =>
  msg ? (
    <div className="flex items-center gap-1.5 mt-1 text-red-500 text-[11px] sm:text-xs font-bold">
      <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
      <span>{msg}</span>
    </div>
  ) : null;

/* ═══════════════════════════════════════════════════════════
   Field
═══════════════════════════════════════════════════════════ */
interface FieldProps {
  label: string; field: string; value: string;
  onChange: (f: string, v: string) => void;
  type?: string; placeholder?: string; optional?: boolean;
  icon?: React.ReactNode; error?: string;
}
const Field = ({ label, field, value, onChange, type = "text", placeholder, optional, icon, error }: FieldProps) => (
  <div className="flex flex-col">
    <label className={labelCls}>
      {label}{optional && <span className="normal-case text-blue-300 font-semibold tracking-normal ml-1">(optional)</span>}
    </label>
    <div className="relative">
      {icon && <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300">{icon}</span>}
      <input
        type={type} value={value} placeholder={placeholder ?? label}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(field, e.target.value)}
        className={`${error ? inputErrCls : inputCls} ${icon ? "pl-10" : ""}`}
      />
    </div>
    <FieldError msg={error} />
  </div>
);

/* ═══════════════════════════════════════════════════════════
   Password Field
═══════════════════════════════════════════════════════════ */
const PasswordField = ({ label, field, value, onChange, error }: {
  label: string; field: string; value: string;
  onChange: (f: string, v: string) => void; error?: string;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col">
      <label className={labelCls}>{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"} value={value} placeholder={label}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(field, e.target.value)}
          className={`${error ? inputErrCls : inputCls} pr-12`}
        />
        <button type="button" onClick={() => setShow(s => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-blue-500 transition-colors">
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      <FieldError msg={error} />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   Dropdown
═══════════════════════════════════════════════════════════ */
const Dropdown = ({ label, field, value, onChange, options, icon, error }: {
  label: string; field: string; value: string;
  onChange: (f: string, v: string) => void; options: string[];
  icon?: React.ReactNode; error?: string;
}) => (
  <div className="flex flex-col">
    <label className={labelCls}>{label}</label>
    <div className="relative">
      {icon && <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300">{icon}</span>}
      <select value={value} onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(field, e.target.value)}
        className={`${error ? inputErrCls : inputCls} appearance-none pr-10 cursor-pointer ${icon ? "pl-10" : ""}`}>
        <option value="">Select…</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
    </div>
    <FieldError msg={error} />
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
  fallbackPlaceholder?: string; fieldError?: string;
}
const SmartSelect = ({
  label, field, value, onChange, options, icon,
  loading, error, loadingLabel, placeholder, count, fallbackPlaceholder, fieldError,
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
          icon={icon} placeholder={fallbackPlaceholder ?? label} error={fieldError} />
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
          className={`${fieldError ? inputErrCls : inputCls} appearance-none pr-10 cursor-pointer ${icon ? "pl-10" : ""}`}>
          <option value="">{placeholder ?? `Select ${label.toLowerCase()}…`}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
      </div>
      <FieldError msg={fieldError} />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   Step 1 Fields  (receives errors + clearError from parent)
═══════════════════════════════════════════════════════════ */
const Step1Fields = ({ form, set, v, errors, clearError }: {
  form: F;
  set: (f: string, v: string) => void;
  v: (k: keyof F) => string;
  errors: Errors;
  clearError: (k: keyof F | "dob") => void;
}) => {
  const { isDropdown, loading, error, colleges } = useUniversities(v("collegeState"));

  const handleStateChange = (_f: string, val: string) => {
    set("collegeState", val);
    set("collegeName", "");
    clearError("collegeState");
    clearError("collegeName");
  };

  return (
    <>
      {/* ── LOCATION FIRST ── */}
      <Divider label="College Location" />
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
        <Dropdown
          label="College State" field="collegeState" value={v("collegeState")}
          onChange={handleStateChange}
          options={INDIAN_STATES} icon={<MapPin className="w-4 h-4" />}
          error={errors.collegeState}
        />
        <Field label="College City" field="collegeCity" value={v("collegeCity")}
          onChange={(f, val) => { set(f, val); clearError("collegeCity"); }}
          icon={<MapPin className="w-4 h-4" />} placeholder="City / District"
          error={errors.collegeCity}
        />
      </div>

      {/* ── COLLEGE INFO BELOW ── */}
      <Divider label="College Info" />
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
        <Field label="College Code" field="collegeCode" value={v("collegeCode")}
          onChange={(f, val) => { set(f, val); clearError("collegeCode"); }}
          icon={<Hash className="w-4 h-4" />} placeholder="e.g. JNTUH001"
          error={errors.collegeCode}
        />
        <Dropdown label="Current Year" field="currentYear" value={v("currentYear")}
          onChange={(f, val) => { set(f, val); clearError("currentYear"); }}
          options={CURRENT_YEARS} icon={<GraduationCap className="w-4 h-4" />}
          error={errors.currentYear}
        />
      </div>

      {/* College Name — dropdown for AP/Telangana, free-text otherwise */}
      {isDropdown ? (
        <SmartSelect
          label="College Name" field="collegeName" value={v("collegeName")}
          onChange={(f, val) => { set(f, val); clearError("collegeName"); }}
          options={colleges}
          icon={<Building2 className="w-4 h-4" />}
          loading={loading} error={error}
          loadingLabel="Loading colleges…"
          placeholder="Select your college…"
          count={colleges.length || undefined}
          fallbackPlaceholder="Full college name"
          fieldError={errors.collegeName}
        />
      ) : (
        <Field label="College Name" field="collegeName" value={v("collegeName")}
          onChange={(f, val) => { set(f, val); clearError("collegeName"); }}
          icon={<Building2 className="w-4 h-4" />} placeholder="Full college name"
          error={errors.collegeName}
        />
      )}

      <Field label="Roll Number" field="rollNumber" value={v("rollNumber")}
        onChange={(f, val) => { set(f, val); clearError("rollNumber"); }}
        optional icon={<Hash className="w-4 h-4" />} placeholder="Your roll / student number"
      />
    </>
  );
};

/* ═══════════════════════════════════════════════════════════
   DOB Picker
═══════════════════════════════════════════════════════════ */
const DOBPicker = ({ dob_d, dob_m, dob_y, onChange, error, onClear }: {
  dob_d: string; dob_m: string; dob_y: string;
  onChange: (f: string, v: string) => void;
  error?: string; onClear?: () => void;
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
    if (onClear) onClear();
    setOpen(false);
  };

  const baseIc = "h-11 rounded-xl border-2 text-center text-base font-semibold text-slate-800 placeholder:text-blue-200 focus:outline-none focus:ring-4 transition-all";
  const normalIc = `${baseIc} border-blue-100 bg-blue-50 focus:border-blue-500 focus:bg-white focus:ring-blue-100`;
  const errIc = `${baseIc} border-red-300 bg-red-50 focus:border-red-500 focus:bg-white focus:ring-red-100`;
  const ic = error ? errIc : normalIc;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <label className={labelCls + " mb-0"}>Date of Birth</label>
        {age !== null && !error && (
          <span className="text-xs font-black text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">{age} yrs</span>
        )}
        {error && (
          <span className="text-[10px] font-black text-red-500 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">Invalid</span>
        )}
      </div>
      <div className="relative" ref={ref}>
        <div className="flex gap-1.5 items-center">
          <input placeholder="DD" value={dob_d} maxLength={2}
            onChange={e => { onChange("dob_d", e.target.value.replace(/\D/g, "").slice(0, 2)); if (onClear) onClear(); }}
            className={`${ic} w-14`} />
          <input placeholder="MM" value={dob_m} maxLength={2}
            onChange={e => {
              const v = e.target.value.replace(/\D/g, "").slice(0, 2);
              onChange("dob_m", v);
              if (parseInt(v) >= 1 && parseInt(v) <= 12) setCalMonth(parseInt(v) - 1);
              if (onClear) onClear();
            }}
            className={`${ic} w-14`} />
          <input placeholder="YYYY" value={dob_y} maxLength={4}
            onChange={e => {
              const v = e.target.value.replace(/\D/g, "").slice(0, 4);
              onChange("dob_y", v);
              if (v.length === 4) setCalYear(parseInt(v));
              if (onClear) onClear();
            }}
            className={`${ic} flex-1`} />
          <button type="button" onClick={() => setOpen(o => !o)}
            className={`h-11 w-11 shrink-0 flex items-center justify-center rounded-xl border-2 transition-all ${error ? "border-red-300 bg-red-50 hover:border-red-400" : "border-blue-100 bg-blue-50 hover:border-blue-500 hover:bg-blue-100"}`}>
            <CalendarDays className={`w-5 h-5 ${error ? "text-red-400" : "text-blue-400"}`} />
          </button>
        </div>
        <FieldError msg={error} />
        {open && (
          <div className="absolute top-14 left-0 z-50 bg-white rounded-2xl border-2 border-blue-100 shadow-2xl shadow-blue-100 p-3 w-full max-w-[288px] mt-1">
            <div className="flex items-center justify-between mb-3">
              <button type="button" onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); }}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-100">
                <ChevronLeft className="w-4 h-4 text-blue-500" />
              </button>
              <div className="flex items-center gap-1.5">
                <select value={calMonth} onChange={e => setCalMonth(parseInt(e.target.value))}
                  className="text-xs font-bold text-blue-700 bg-transparent border-none outline-none cursor-pointer">
                  {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
                </select>
                <input type="number" value={calYear} onChange={e => setCalYear(parseInt(e.target.value) || calYear)}
                  className="text-xs font-bold text-blue-700 w-14 text-center border-2 border-blue-100 rounded-lg px-1 py-0.5 focus:outline-none focus:border-blue-400 bg-blue-50" />
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
          <span className={`text-[8px] sm:text-[9px] font-black tracking-wider sm:tracking-widest uppercase whitespace-nowrap transition-colors ${
            i <= current ? "text-blue-600" : "text-blue-300"
          }`}>{s}</span>
        </div>
        {i < STEPS.length - 1 && (
          <div className={`flex-1 h-0.5 mx-1 sm:mx-2 mb-5 rounded-full transition-all duration-300 ${i < current ? "bg-blue-600" : "bg-blue-100"}`} />
        )}
      </div>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════
   Phone Field
═══════════════════════════════════════════════════════════ */
const PhoneField = ({ value, onChange, error }: {
  value: string; onChange: (f: string, v: string) => void; error?: string;
}) => {
  const digits = value.replace(/\D/g, "");
  const complete = digits.length === 10;
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <label className={labelCls + " mb-0"}>Phone Number</label>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border transition-all ${
          complete ? "text-emerald-700 bg-emerald-50 border-emerald-200"
          : error ? "text-red-500 bg-red-50 border-red-200"
          : "text-blue-300 bg-blue-50 border-blue-100"
        }`}>
          {digits.length}/10
        </span>
      </div>
      <div className="flex gap-2">
        <div className="h-11 flex items-center justify-center px-3 rounded-xl border-2 border-blue-100 bg-blue-50 text-sm font-black text-blue-500 shrink-0 select-none">
          +91
        </div>
        <input type="tel" value={value} maxLength={10} placeholder="10-digit mobile number"
          onChange={e => onChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
          className={`${error ? inputErrCls : inputCls} flex-1 font-mono tracking-widest`} />
      </div>
      <FieldError msg={error} />
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
  const [fieldErrors, setFieldErrors] = useState<Errors>({});
  const navigate = useNavigate();

  const set = (field: string, val: string) => {
    setForm(p => ({ ...p, [field]: val }));
    // Clear error on edit
    setFieldErrors(prev => ({ ...prev, [field]: "" }));
  };

  const clearError = (key: keyof F | "dob") => {
    setFieldErrors(prev => ({ ...prev, [key]: "" }));
  };

  const v = (k: keyof F) => form[k] as string;

  /* ── Per-step validation — sets field errors and returns true if valid ── */
  const validateStep = (s: number): boolean => {
    const errs: Errors = {};

    if (s === 0) {
      const fnErr = validateName(v("firstName"), "First Name");
      if (fnErr) errs.firstName = fnErr;
      const lnErr = validateName(v("lastName"), "Last Name");
      if (lnErr) errs.lastName = lnErr;
      const dobErr = validateDOB(v("dob_d"), v("dob_m"), v("dob_y"));
      if (dobErr) errs.dob = dobErr;
    }

    if (s === 1) {
      if (!v("collegeState")) errs.collegeState = "Please select your college state.";
      if (!v("collegeCity").trim()) errs.collegeCity = "College city is required.";
      if (!v("collegeCode").trim()) errs.collegeCode = "College code is required.";
      else if (v("collegeCode").trim().length < 3) errs.collegeCode = "College code seems too short.";
      if (!v("collegeName").trim()) errs.collegeName = "College name is required.";
      if (!v("currentYear")) errs.currentYear = "Please select your current year.";
    }

    if (s === 2) {
      const phoneErr = validatePhone(v("phone"));
      if (phoneErr) errs.phone = phoneErr;
      const emailErr = validateEmail(v("email"));
      if (emailErr) errs.email = emailErr;
      const pwErr = validatePassword(v("password"));
      if (pwErr) errs.password = pwErr;
      if (!v("confirmPassword")) errs.confirmPassword = "Please confirm your password.";
      else if (v("password") !== v("confirmPassword")) errs.confirmPassword = "Passwords do not match.";
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Lightweight check for disabling buttons (no side effects)
  const stepValid = () => {
    if (step === 0)
      return v("firstName").trim().length >= 2 &&
        v("lastName").trim().length >= 2 &&
        v("dob_d") && v("dob_m") && v("dob_y").length === 4;
    if (step === 1)
      return v("collegeState") && v("collegeCity").trim() &&
        v("collegeCode").trim() && v("collegeName").trim() && v("currentYear");
    if (step === 2)
      return v("phone").length === 10 &&
        EMAIL_REGEX.test(v("email")) &&
        v("password").length >= 6 &&
        v("password") === v("confirmPassword");
    return false;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep(s => s + 1);
  };

  const handleBack = () => {
    setFieldErrors({});
    setStep(s => s - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;
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

  // Count errors for the summary banner
  const errorCount = Object.values(fieldErrors).filter(Boolean).length;
  const pwScore = getPasswordScore(v("password"));
  const pwLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const pwColors = ["", "bg-red-400", "bg-amber-400", "bg-blue-400", "bg-emerald-500"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-30 h-14 sm:h-16 bg-white/95 backdrop-blur-md border-b-2 border-blue-100 shadow-sm shadow-blue-50">
        <div className="max-w-2xl mx-auto px-3 sm:px-6 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 text-sm font-bold text-blue-400 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-200">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm sm:text-base font-black tracking-tight text-blue-900">HR Registration</span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-black tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-200 px-2 sm:px-3 py-1 rounded-full">
            Sign Up
          </span>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-10 pb-16 sm:pb-20">

        {/* ── Header ── */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 shadow-xl shadow-blue-200 mb-3 sm:mb-4">
            <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-blue-900 tracking-tight">Create HR Account</h1>
          <p className="text-xs sm:text-sm font-semibold text-blue-400 mt-1">Join the HR Network · Takes less than 2 minutes</p>
        </div>

        {/* ── Step bar ── */}
        <StepBar current={step} />

        {/* ── Card ── */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-blue-100 shadow-lg shadow-blue-50">

          {/* Card header */}
          <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b-2 border-blue-50 bg-gradient-to-r from-blue-50 to-white">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200 shrink-0">
              {step === 0 ? <User className="w-4 h-4 text-white" />
               : step === 1 ? <Building2 className="w-4 h-4 text-white" />
               : <Mail className="w-4 h-4 text-white" />}
            </div>
            <span className="text-xs sm:text-sm font-black tracking-widest uppercase text-blue-700">{STEPS[step]}</span>
            <span className="ml-auto text-[9px] sm:text-[10px] font-black tracking-widest uppercase text-blue-400 bg-blue-50 border border-blue-100 px-2 sm:px-2.5 py-0.5 rounded-full whitespace-nowrap">
              {step + 1} / {STEPS.length}
            </span>
          </div>

          {/* ── Validation summary banner ── */}
          {errorCount > 0 && (
            <div className="mx-4 sm:mx-6 mt-4 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border-2 border-red-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <p className="text-xs sm:text-sm font-bold text-red-600">
                Please fix {errorCount} error{errorCount > 1 ? "s" : ""} before continuing.
              </p>
            </div>
          )}

          <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">

            {/* ── Step 0: Personal Info ── */}
            {step === 0 && (
              <>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                  <Field
                    label="First Name" field="firstName" value={v("firstName")}
                    onChange={(f, val) => { set(f, val); clearError("firstName"); }}
                    icon={<User className="w-4 h-4" />}
                    error={fieldErrors.firstName}
                  />
                  <Field
                    label="Last Name" field="lastName" value={v("lastName")}
                    onChange={(f, val) => { set(f, val); clearError("lastName"); }}
                    icon={<User className="w-4 h-4" />}
                    error={fieldErrors.lastName}
                  />
                </div>
                <DOBPicker
                  dob_d={v("dob_d")} dob_m={v("dob_m")} dob_y={v("dob_y")}
                  onChange={set}
                  error={fieldErrors.dob}
                  onClear={() => clearError("dob")}
                />
              </>
            )}

            {/* ── Step 1: College Info ── */}
            {step === 1 && (
              <Step1Fields
                form={form} set={set} v={v}
                errors={fieldErrors}
                clearError={clearError}
              />
            )}

            {/* ── Step 2: Contact & Security ── */}
            {step === 2 && (
              <>
                <PhoneField
                  value={v("phone")}
                  onChange={(f, val) => { set(f, val); clearError("phone"); }}
                  error={fieldErrors.phone}
                />

                <Field
                  label="Email Address" field="email" value={v("email")}
                  onChange={(f, val) => { set(f, val); clearError("email"); }}
                  type="email" icon={<Mail className="w-4 h-4" />} placeholder="you@example.com"
                  error={fieldErrors.email}
                />
                {v("email") && !fieldErrors.email && EMAIL_REGEX.test(v("email")) && (
                  <div className="flex items-center gap-1.5 -mt-2 text-emerald-600 text-[11px] sm:text-xs font-semibold">
                    <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> Valid email address
                  </div>
                )}

                <Divider label="Set Password" />

                <PasswordField
                  label="Password" field="password" value={v("password")}
                  onChange={(f, val) => { set(f, val); clearError("password"); }}
                  error={fieldErrors.password}
                />
                {/* Password strength bar */}
                {v("password") && !fieldErrors.password && (
                  <div className="flex items-center gap-2 -mt-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          i < pwScore ? pwColors[pwScore] : "bg-blue-100"
                        }`}
                      />
                    ))}
                    <span className="text-[10px] font-black text-blue-400 whitespace-nowrap">
                      {pwLabels[pwScore] ?? ""}
                    </span>
                  </div>
                )}

                <PasswordField
                  label="Confirm Password" field="confirmPassword" value={v("confirmPassword")}
                  onChange={(f, val) => { set(f, val); clearError("confirmPassword"); }}
                  error={fieldErrors.confirmPassword}
                />
                {/* Match indicator — only show when no error and both filled */}
                {v("confirmPassword") && !fieldErrors.confirmPassword &&
                  v("password") === v("confirmPassword") && v("password").length >= 6 && (
                  <div className="flex items-center gap-2 -mt-2 text-emerald-600 text-xs font-bold">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0" /> Passwords match
                  </div>
                )}
              </>
            )}

          </div>

          {/* ── Navigation buttons ── */}
          <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex items-center gap-2 sm:gap-3">
            {step > 0 && (
              <button onClick={handleBack}
                className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border-2 border-blue-200 bg-blue-50 text-blue-600 text-sm font-black hover:bg-blue-100 hover:border-blue-400 transition-all">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            )}
            <div className="flex-1" />
            {step < STEPS.length - 1 ? (
              <button onClick={handleNext} disabled={!stepValid()}
                className="flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white text-sm font-black shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={submitting || !stepValid()}
                className="flex items-center gap-2 px-6 sm:px-10 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white text-sm font-black shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0">
                {submitting
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating…</>
                  : "Create Account →"
                }
              </button>
            )}
          </div>

          {/* ── Error banner ── */}
          {errorMsg && (
            <div className="mx-4 sm:mx-6 mb-4 sm:mb-6 flex items-start gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl bg-red-50 border-2 border-red-200">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-black text-red-600">Registration failed</p>
                <p className="text-xs font-semibold text-red-400 mt-0.5 break-all">{errorMsg}</p>
              </div>
            </div>
          )}

        </div>

        {/* ── Already have account ── */}
        <p className="text-center text-sm font-semibold text-blue-400 mt-5 sm:mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-black hover:underline">Sign In →</Link>
        </p>

      </main>
    </div>
  );
}