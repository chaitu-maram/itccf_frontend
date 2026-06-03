
// import { useState, useMemo, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   Search, X, ChevronUp, ChevronDown, ChevronsUpDown,
//   ChevronLeft, ChevronRight, Download, FileText,
//   Users, Briefcase, Lightbulb, Award, Phone, Mail,
//   Code2, HeartPulse, BookOpen, Coins,
//   Wrench, Megaphone, Building2, TrendingUp, Home,
//   CheckSquare, Trash2, UserCheck, Loader2, AlertCircle,
//   Globe, MapPin, Menu,
// } from "lucide-react";

// /* ─── API CONFIG ────────────────────────────────────────────── */
// const API_URL     = "http://192.168.0.6:8000/api/students/filter/";
// const API_URL_ALL = "http://192.168.0.6:8000/api/students/all/";

// /* ─── TYPES ─────────────────────────────────────────────────── */
// interface RawStudent {
//   id?: number;
//   surname?: string;
//   name?: string;
//   academic?: string;
//   experience_years?: number | string;
//   core_spec_v1?: string;
//   technical_v1?: string;
//   non_tech_v1?: string;
//   general_cat_v1?: string;
//   mobile_personal?: string;
//   email?: string;
//   designation?: string;
//   company_name?: string;
//   photo?: string;
//   hr_photo?: string;
//   is_unlocked?: boolean;
// }

// interface Student {
//   id: number;
//   name: string;
//   qual: string;
//   exp: number;
//   field: string;
//   phone: string;
//   email: string;
//   designation: string;
//   company: string;
//   photo?: string;
//   hr_photo?: string;
//   isUnlocked: boolean;
// }

// interface EmployerInfo {
//   employer_id: string;
//   name: string;
//   company_name: string;
// }

// interface QualMeta {
//   bg: string;
//   col: string;
//   border: string;
// }

// interface AvatarColor {
//   bg: string;
//   col: string;
// }

// interface ColDef {
//   lbl: string;
//   k: keyof Student | null;
//   w: string;
// }

// interface SelectionBarProps {
//   count: number;
//   onClear: () => void;
//   onExportSelected: () => void;
//   onDeleteSelected: () => void;
//   onPayForData: () => void;
// }

// interface StatCardProps {
//   icon: React.ElementType;
//   iconBg: string;
//   iconCol: string;
//   val: string | number;
//   label: string;
// }

// interface SortIconProps {
//   on: boolean;
//   dir: "asc" | "desc";
// }

// interface CheckboxProps {
//   checked: boolean;
//   indeterminate?: boolean;
//   onChange: () => void;
//   style?: React.CSSProperties;
// }

// interface ErrorStateProps {
//   message: string;
//   onRetry: () => void;
// }

// /* ─── VIEW MODE ─────────────────────────────────────────────── */
// type ViewMode = "location" | "all";

// /* ─── NORMALISE ─────────────────────────────────────────────── */
// const normalise = (raw: RawStudent, index: number): Student => ({
//   id: raw.id ?? index,
//   name: `${raw.surname ?? ""} ${raw.name ?? ""}`.trim() || "—",
//   qual: raw.academic ?? "—",
//   exp: Number(raw.experience_years) || 0,
//   field:
//     raw.core_spec_v1 ||
//     raw.technical_v1 ||
//     raw.non_tech_v1 ||
//     raw.general_cat_v1 ||
//     "—",
//   phone: raw.mobile_personal ?? "—",
//   email: raw.email ?? "—",
//   designation: raw.designation ?? "—",
//   company: raw.company_name ?? "—",
//   photo: raw.photo,
//   hr_photo: raw.hr_photo,
//   isUnlocked: raw.is_unlocked ?? false,
// });

// /* ─── DATA ─────────────────────────────────────────────────── */
// const QUALS_META: Record<string, QualMeta> = {
//   SSC:               { bg: "#FFF1F2", col: "#C81A40", border: "#FECDD3" },
//   ITI:               { bg: "#FFFBEB", col: "#D97706", border: "#FDE68A" },
//   Polytechnic:       { bg: "#ECFDF5", col: "#059669", border: "#A7F3D0" },
//   Intermediate:      { bg: "#EFF6FF", col: "#2563EB", border: "#BFDBFE" },
//   "U.G (Degree)":    { bg: "#F5F3FF", col: "#7C3AED", border: "#DDD6FE" },
//   "P.G (Degree)":    { bg: "#F0F9FF", col: "#0284C7", border: "#BAE6FD" },
//   "U.G(B.Tech/B.E)": { bg: "#E0F2FE", col: "#0369A1", border: "#7DD3FC" },
//   "P.G(M.Tech/M.E)": { bg: "#F3E8FF", col: "#9333EA", border: "#D8B4FE" },
// };

// const FIELD_ICONS: Record<string, React.ElementType> = {
//   "IT / Software":  Code2,
//   "Healthcare":     HeartPulse,
//   "Education":      BookOpen,
//   "Finance":        Coins,
//   "Engineering":    Wrench,
//   "Marketing":      Megaphone,
//   "Administration": Building2,
//   "Sales":          TrendingUp,
// };

// const AVATARS: AvatarColor[] = [
//   { bg: "#DBEAFE", col: "#1D4ED8" }, { bg: "#D1FAE5", col: "#065F46" },
//   { bg: "#EDE9FE", col: "#6D28D9" }, { bg: "#FEE2E2", col: "#991B1B" },
//   { bg: "#FEF3C7", col: "#92400E" }, { bg: "#FCE7F3", col: "#9D174D" },
//   { bg: "#E0F2FE", col: "#0369A1" }, { bg: "#F0FDF4", col: "#166534" },
// ];

// const NAV = ["Home", "About Us", "Authorised HRs", "Core Committee", "Services", "Projects", "Associates", "Gallery", "Contact Us"];
// const PAGE_SZ = 8;
// const RATE_PER_PERSON = 50;

// /* ─── HELPERS ───────────────────────────────────────────────── */
// const initials = (name: string): string =>
//   name.split(" ").slice(0, 2).map(w => w[0]).join("");

// const cardShadow = "0 1px 3px rgba(37,99,235,0.06), 0 8px 24px rgba(37,99,235,0.10), 0 1px 0 rgba(255,255,255,0.9) inset";

// /* ─── SORT ICON ─────────────────────────────────────────────── */
// const SortIcon = ({ on, dir }: SortIconProps) =>
//   !on
//     ? <ChevronsUpDown style={{ width: 11, height: 11, color: "#93C5FD", flexShrink: 0 }} />
//     : dir === "asc"
//       ? <ChevronUp style={{ width: 11, height: 11, color: "#2563EB", flexShrink: 0 }} />
//       : <ChevronDown style={{ width: 11, height: 11, color: "#2563EB", flexShrink: 0 }} />;

// /* ─── CHECKBOX ──────────────────────────────────────────────── */
// const Checkbox = ({ checked, indeterminate, onChange, style }: CheckboxProps) => (
//   <label style={{ display: "inline-flex", alignItems: "center", cursor: "pointer", ...style }}>
//     <input
//       type="checkbox"
//       checked={checked}
//       ref={el => { if (el) el.indeterminate = !!indeterminate; }}
//       onChange={onChange}
//       style={{ display: "none" }}
//     />
//     <span style={{
//       width: 17, height: 17, borderRadius: 5, border: "2px solid",
//       borderColor: checked || indeterminate ? "#2563EB" : "#93C5FD",
//       background: checked || indeterminate ? "linear-gradient(135deg,#2563EB,#3B82F6)" : "rgba(255,255,255,0.9)",
//       display: "flex", alignItems: "center", justifyContent: "center",
//       flexShrink: 0, transition: "all 0.15s",
//       boxShadow: checked || indeterminate ? "0 2px 6px rgba(37,99,235,0.30)" : "none",
//     }}>
//       {indeterminate && !checked
//         ? <span style={{ width: 8, height: 2, background: "#fff", borderRadius: 1, display: "block" }} />
//         : checked
//           ? <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
//               <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           : null}
//     </span>
//   </label>
// );

// /* ─── SELECTION ACTION BAR ──────────────────────────────────── */
// function SelectionBar({ count, onClear, onExportSelected, onDeleteSelected, onPayForData }: SelectionBarProps) {
//   if (!count) return null;
//   return (
//     <div style={{
//       position: "sticky", top: 68, zIndex: 90,
//       background: "linear-gradient(135deg,#1D4ED8,#2563EB)",
//       padding: "10px 16px",
//       display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
//       boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
//     }}>
//       <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//         <UserCheck style={{ width: 16, height: 16, color: "rgba(255,255,255,0.9)" }} />
//         <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{count} selected</span>
//       </div>
//       <div style={{ marginLeft: "auto", display: "flex", flexWrap: "wrap", gap: 7 }}>
//         <button onClick={onPayForData} style={{
//           display: "flex", alignItems: "center", gap: 6, padding: "7px 12px",
//           background: "linear-gradient(135deg,#16A34A,#22C55E)",
//           border: "1px solid rgba(255,255,255,0.3)",
//           borderRadius: 9, color: "#fff", fontSize: 11, fontWeight: 700,
//           cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap",
//         }}
//           onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
//           onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
//           💳 Pay (₹{RATE_PER_PERSON}/person)
//         </button>
//         <button onClick={onDeleteSelected} style={{
//           display: "flex", alignItems: "center", gap: 6, padding: "7px 12px",
//           background: "rgba(239,68,68,0.25)", border: "1px solid rgba(239,68,68,0.5)",
//           borderRadius: 9, color: "#FCA5A5", fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
//         }}
//           onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.40)"}
//           onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.25)"}>
//           <Trash2 style={{ width: 13, height: 13 }} /> Delete
//         </button>
//         <button onClick={onClear} style={{
//           display: "flex", alignItems: "center", gap: 5, padding: "7px 10px",
//           background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)",
//           borderRadius: 9, color: "rgba(255,255,255,0.8)", fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
//         }}
//           onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.20)"}
//           onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}>
//           <X style={{ width: 12, height: 12 }} /> Clear
//         </button>
//       </div>
//     </div>
//   );
// }

// /* ─── STAT CARD ─────────────────────────────────────────────── */
// function StatCard({ icon: Icon, iconBg, iconCol, val, label }: StatCardProps) {
//   return (
//     <div style={{
//       flex: "1 1 120px", minWidth: 110, maxWidth: 200,
//       background: "rgba(255,255,255,0.85)",
//       border: "1px solid #BFDBFE",
//       borderRadius: 14,
//       padding: "10px 14px",
//       display: "flex", alignItems: "center", gap: 10,
//       boxShadow: "0 2px 8px rgba(37,99,235,0.07)",
//     }}>
//       <div style={{ width: 34, height: 34, borderRadius: 10, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//         <Icon style={{ width: 17, height: 17, color: iconCol }} />
//       </div>
//       <div>
//         <div style={{ fontSize: 18, fontWeight: 700, color: "#1E3A5F", letterSpacing: "-0.5px" }}>{val}</div>
//         <div style={{ fontSize: 10.5, color: "#64748B", marginTop: 1 }}>{label}</div>
//       </div>
//     </div>
//   );
// }

// /* ─── LOADING STATE ─────────────────────────────────────────── */
// function LoadingState() {
//   return (
//     <tr>
//       <td colSpan={9} style={{ padding: "80px 20px", textAlign: "center" }}>
//         <Loader2 style={{ width: 36, height: 36, color: "#3B82F6", display: "block", margin: "0 auto 12px", animation: "spin 1s linear infinite" }} />
//         <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>Loading persons from database…</p>
//       </td>
//     </tr>
//   );
// }

// /* ─── ERROR STATE ───────────────────────────────────────────── */
// function ErrorState({ message, onRetry }: ErrorStateProps) {
//   return (
//     <tr>
//       <td colSpan={9} style={{ padding: "60px 20px", textAlign: "center" }}>
//         <AlertCircle style={{ width: 40, height: 40, color: "#F87171", display: "block", margin: "0 auto 12px" }} />
//         <p style={{ fontSize: 13, color: "#EF4444", margin: "0 0 12px" }}>{message}</p>
//         <button onClick={onRetry} style={{
//           padding: "8px 20px", fontSize: 12, fontWeight: 700, color: "#fff",
//           background: "linear-gradient(135deg,#2563EB,#1D4ED8)", border: "none",
//           borderRadius: 9, cursor: "pointer", boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
//         }}>
//           Retry
//         </button>
//       </td>
//     </tr>
//   );
// }

// /* ─── EMPLOYER INFO BAR ─────────────────────────────────────── */
// function EmployerInfoBar({ employer, onLogout }: { employer: EmployerInfo | null; onLogout: () => void }) {
//   const empId      = employer?.employer_id  ?? localStorage.getItem("employer_id")      ?? "—";
//   const empName    = employer?.name         ?? localStorage.getItem("employer_name")    ?? "—";
//   const empCompany = employer?.company_name ?? localStorage.getItem("employer_company") ?? "—";

//   return (
//     <div style={{
//       background: "linear-gradient(90deg,#1E3A5F,#2563EB)",
//       padding: "7px 16px",
//       display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
//       borderBottom: "1px solid rgba(255,255,255,0.08)",
//     }}>
//       <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//         <UserCheck style={{ width: 12, height: 12, color: "rgba(255,255,255,0.45)" }} />
//         <span style={{ fontSize: 10, color: "rgba(255,255,255,0.50)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Employer</span>
//         <span style={{ fontSize: 11.5, color: "#fff", fontWeight: 700 }}>{empName}</span>
//       </div>
//       <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.18)", flexShrink: 0 }} />
//       <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//         <span style={{ fontSize: 10, color: "rgba(255,255,255,0.50)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>ID</span>
//         <span style={{ fontSize: 11.5, color: "#93C5FD", fontWeight: 800, letterSpacing: "0.04em" }}>{empId}</span>
//       </div>
//       <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.18)", flexShrink: 0, display: "none" }} className="md-divider" />
//       <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//         <Building2 style={{ width: 12, height: 12, color: "rgba(255,255,255,0.45)" }} />
//         <span style={{ fontSize: 10, color: "rgba(255,255,255,0.50)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Co.</span>
//         <span style={{ fontSize: 11.5, color: "#fff", fontWeight: 700, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{empCompany}</span>
//       </div>
//       <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
//         <span style={{ fontSize: 9, color: "rgba(255,255,255,0.38)", fontStyle: "italic", display: "none" }} className="emp-hint">
//           🔒 Unlocked contacts are exclusive to your account
//         </span>
//         <button
//           onClick={onLogout}
//           style={{
//             display: "flex", alignItems: "center", gap: 5,
//             padding: "5px 11px", fontSize: 11, fontWeight: 700,
//             background: "rgba(239,68,68,0.18)", border: "1px solid rgba(239,68,68,0.45)",
//             borderRadius: 8, color: "#FCA5A5", cursor: "pointer", transition: "all 0.15s",
//             letterSpacing: "0.04em", whiteSpace: "nowrap",
//           }}
//           onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.32)"; e.currentTarget.style.color = "#FEE2E2"; }}
//           onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.18)"; e.currentTarget.style.color = "#FCA5A5"; }}
//         >
//           ⏻ Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// /* ─── VIEW MODE TOGGLE ──────────────────────────────────────── */
// function ViewModeToggle({ mode, onChange, locationCount, allCount, loadingAll }: {
//   mode: ViewMode;
//   onChange: (m: ViewMode) => void;
//   locationCount: number;
//   allCount: number;
//   loadingAll: boolean;
// }) {
//   return (
//     <div style={{
//       display: "inline-flex",
//       background: "rgba(219,234,254,0.55)",
//       border: "1.5px solid #BFDBFE",
//       borderRadius: 14,
//       padding: 4,
//       gap: 3,
//       boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
//     }}>
//       <button
//         onClick={() => onChange("location")}
//         style={{
//           display: "flex", alignItems: "center", gap: 6,
//           padding: "7px 12px", borderRadius: 10, fontSize: 12, fontWeight: 700,
//           border: "none", cursor: "pointer", transition: "all 0.18s",
//           background: mode === "location" ? "linear-gradient(135deg,#2563EB,#1D4ED8)" : "transparent",
//           color: mode === "location" ? "#fff" : "#3B82F6",
//           boxShadow: mode === "location" ? "0 3px 12px rgba(37,99,235,0.35)" : "none",
//           whiteSpace: "nowrap",
//         }}
//       >
//         <MapPin style={{ width: 13, height: 13, flexShrink: 0 }} />
//         My Location
//         <span style={{
//           display: "inline-flex", alignItems: "center", justifyContent: "center",
//           minWidth: 20, height: 17, borderRadius: 99, fontSize: 10, fontWeight: 800,
//           padding: "0 4px",
//           background: mode === "location" ? "rgba(255,255,255,0.25)" : "#DBEAFE",
//           color: mode === "location" ? "#fff" : "#1D4ED8",
//         }}>
//           {locationCount}
//         </span>
//       </button>

//       <button
//         onClick={() => onChange("all")}
//         style={{
//           display: "flex", alignItems: "center", gap: 6,
//           padding: "7px 12px", borderRadius: 10, fontSize: 12, fontWeight: 700,
//           border: "none", cursor: "pointer", transition: "all 0.18s",
//           background: mode === "all" ? "linear-gradient(135deg,#7C3AED,#6D28D9)" : "transparent",
//           color: mode === "all" ? "#fff" : "#7C3AED",
//           boxShadow: mode === "all" ? "0 3px 12px rgba(109,40,217,0.35)" : "none",
//           whiteSpace: "nowrap",
//         }}
//       >
//         <Globe style={{ width: 13, height: 13, flexShrink: 0 }} />
//         All Employees
//         <span style={{
//           display: "inline-flex", alignItems: "center", justifyContent: "center",
//           minWidth: 20, height: 17, borderRadius: 99, fontSize: 10, fontWeight: 800,
//           padding: "0 4px",
//           background: mode === "all" ? "rgba(255,255,255,0.25)" : "#EDE9FE",
//           color: mode === "all" ? "#fff" : "#6D28D9",
//         }}>
//           {loadingAll ? "…" : allCount}
//         </span>
//       </button>
//     </div>
//   );
// }

// /* ─── MAIN COMPONENT ────────────────────────────────────────── */
// export default function ListPersons() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   /* ── View mode ── */
//   const [viewMode, setViewMode] = useState<ViewMode>("location");

//   /* ── Mobile nav toggle ── */
//   const [navOpen, setNavOpen] = useState(false);

//   /* ── API state — location data ── */
//   const [locationData, setLocationData]       = useState<Student[]>([]);
//   const [loadingLocation, setLoadingLocation] = useState<boolean>(true);
//   const [errorLocation, setErrorLocation]     = useState<string | null>(null);

//   /* ── API state — all employees data ── */
//   const [allData, setAllData]       = useState<Student[]>([]);
//   const [loadingAll, setLoadingAll] = useState<boolean>(false);
//   const [errorAll, setErrorAll]     = useState<string | null>(null);

//   /* ── Employer info ── */
//   const [employer, setEmployer] = useState<EmployerInfo | null>(null);

//   /* ── UI state ── */
//   const [search, setSearch]     = useState<string>("");
//   const [qual, setQual]         = useState<string>("All");
//   const [sortK, setSortK]       = useState<keyof Student | null>(null);
//   const [sortD, setSortD]       = useState<"asc" | "desc">("asc");
//   const [page, setPage]         = useState<number>(0);
//   const [selected, setSelected] = useState<Set<number>>(new Set());

//   /* ── Active data based on view mode ── */
//   const data    = viewMode === "location" ? locationData : allData;
//   const loading = viewMode === "location" ? loadingLocation : loadingAll;
//   const error   = viewMode === "location" ? errorLocation : errorAll;

//   /* ── Fetch location-filtered data ── */
//   const fetchLocationData = async (): Promise<void> => {
//     setLoadingLocation(true);
//     setErrorLocation(null);
//     try {
//       const employerId = localStorage.getItem("employer_id");
//       if (!employerId) {
//         setErrorLocation("No employer session found. Please log in.");
//         setLoadingLocation(false);
//         return;
//       }
//       const res = await fetch(`${API_URL}?employer_id=${employerId}`, {
//         headers: { "Content-Type": "application/json" },
//       });
//       if (!res.ok) throw new Error(`Server returned ${res.status}: ${res.statusText}`);
//       const json = await res.json();
//       const raw: RawStudent[] = Array.isArray(json)
//         ? json
//         : (json.students ?? json.results ?? []);
//       if (json.employer) {
//         setEmployer(json.employer);
//         localStorage.setItem("employer_id",      json.employer.employer_id ?? "");
//         localStorage.setItem("employer_name",    json.employer.name        ?? "");
//         localStorage.setItem("employer_company", json.employer.company_name ?? "");
//       }
//       setLocationData(raw.map((item, i) => normalise(item, i)));
//     } catch (err: unknown) {
//       setErrorLocation(err instanceof Error ? err.message : "Failed to load data.");
//     } finally {
//       setLoadingLocation(false);
//     }
//   };

//   /* ── Fetch all employees data ── */
//   const fetchAllData = async (): Promise<void> => {
//     setLoadingAll(true);
//     setErrorAll(null);
//     try {
//       const employerId = localStorage.getItem("employer_id");
//       if (!employerId) {
//         setErrorAll("No employer session found. Please log in.");
//         setLoadingAll(false);
//         return;
//       }
//       const res = await fetch(`${API_URL_ALL}?employer_id=${employerId}`, {
//         headers: { "Content-Type": "application/json" },
//       });
//       if (!res.ok) throw new Error(`Server returned ${res.status}: ${res.statusText}`);
//       const json = await res.json();

//       console.log("RAW JSON type:", Array.isArray(json) ? "array" : "object");
//       console.log("RAW JSON keys:", Array.isArray(json) ? "N/A" : Object.keys(json));
//       const sample = Array.isArray(json) ? json.slice(0,3) : (json.students ?? json.results ?? []).slice(0,3);
//       console.log("FIRST 3 ROWS:", JSON.stringify(sample, null, 2));

//       const raw: RawStudent[] = Array.isArray(json)
//         ? json
//         : (json.students ?? json.results ?? []);
//       setAllData(raw.map((item, i) => normalise(item, i)));
//     } catch (err: unknown) {
//       setErrorAll(err instanceof Error ? err.message : "Failed to load all employees.");
//     } finally {
//       setLoadingAll(false);
//     }
//   };

//   /* ── Handle view mode switch ── */
//   const handleViewModeChange = (mode: ViewMode): void => {
//     setViewMode(mode);
//     setSearch("");
//     setQual("All");
//     setSortK(null);
//     setSortD("asc");
//     setPage(0);
//     setSelected(new Set());
//   };

//   /* ── Effect 1: re-fetch location data on every navigation ── */
//   useEffect(() => {
//     fetchLocationData();
//     setAllData([]);
//   }, [location.key]);

//   /* ── Effect 2: re-fetch all-employees data whenever viewMode switches ── */
//   useEffect(() => {
//     if (viewMode === "all") {
//       fetchAllData();
//     }
//   }, [viewMode, location.key]);

//   /* ── Derived values ── */
//   const MAX_EXP = data.length ? Math.max(...data.map(p => p.exp), 1) : 1;

//   /* ── Filter + sort ── */
//   const filtered = useMemo(() => {
//     let d = data.filter(p => {
//       const q = search.toLowerCase();
//       const matchS = !q
//         || p.name.toLowerCase().includes(q)
//         || p.field.toLowerCase().includes(q)
//         || p.qual.toLowerCase().includes(q)
//         || p.email.toLowerCase().includes(q)
//         || p.phone.includes(q);
//       const matchQ = qual === "All" || p.qual === qual;
//       return matchS && matchQ;
//     });
//     if (sortK) {
//       d = [...d].sort((a, b) => {
//         const A = a[sortK] as string | number;
//         const B = b[sortK] as string | number;
//         const r = typeof A === "number" ? A - (B as number) : String(A).localeCompare(String(B));
//         return sortD === "asc" ? r : -r;
//       });
//     }
//     d.sort((a, b) => {
//       if (a.isUnlocked === b.isUnlocked) return 0;
//       return a.isUnlocked ? -1 : 1;
//     });
//     return d;
//   }, [data, search, qual, sortK, sortD]);

//   const totPg = Math.max(1, Math.ceil(filtered.length / PAGE_SZ));
//   const sp    = Math.min(page, totPg - 1);
//   const rows  = filtered.slice(sp * PAGE_SZ, (sp + 1) * PAGE_SZ);
//   const pad   = [...rows, ...Array<null>(PAGE_SZ - rows.length).fill(null)];

//   const pageIds    = rows.map(r => r.id);
//   const allPageSel = pageIds.length > 0 && pageIds.every(id => selected.has(id));
//   const someSel    = pageIds.some(id => selected.has(id)) && !allPageSel;

//   const flip     = (k: keyof Student): void => { setSortD(p => sortK === k ? (p === "asc" ? "desc" : "asc") : "asc"); setSortK(k); setPage(0); };
//   const onSearch = (v: string): void => { setSearch(v); setPage(0); };
//   const onQual   = (q: string): void => { setQual(q); setPage(0); };

//   /* ── Checkbox logic ── */
//   const toggleRow  = (id: number): void => setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
//   const togglePage = (): void => setSelected(s => { const n = new Set(s); allPageSel ? pageIds.forEach(id => n.delete(id)) : pageIds.forEach(id => n.add(id)); return n; });
//   const clearSel   = (): void => setSelected(new Set());

//   /* ── Export CSV ── */
//   const exportCSV = (exportRows: Student[]): void => {
//     const hdr   = ["S.No", "Name", "Qualification", "Experience (yrs)", "Field", "Phone", "Email"];
//     const lines = [hdr, ...exportRows.map((p, i) => [i + 1, p.name, p.qual, p.exp, p.field, p.phone, p.email])];
//     const csv   = lines.map(r => r.join(",")).join("\n");
//     const a     = document.createElement("a");
//     a.href      = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
//     a.download  = "hr_persons.csv";
//     a.click();
//   };
//   const exportAll      = (): void => exportCSV(filtered);
//   const exportSelected = (): void => exportCSV(data.filter(p => selected.has(p.id)));

//   /* ── Delete selected ── */
//   const deleteSelected = (): void => {
//     if (viewMode === "location") {
//       setLocationData(d => d.filter(p => !selected.has(p.id)));
//     } else {
//       setAllData(d => d.filter(p => !selected.has(p.id)));
//     }
//     setSelected(new Set());
//     setPage(0);
//   };

//   /* ── Pay for Data ── */
//   const handlePayForData = (): void => {
//     navigate("/pay-for-data", { state: { selectedIds: Array.from(selected) } });
//   };

//   /* ── Logout ── */
//   const handleLogout = (): void => {
//     localStorage.removeItem("employer_id");
//     localStorage.removeItem("employer_name");
//     localStorage.removeItem("employer_company");
//     navigate("/");
//   };

//   /* ── Stats ── */
//   const avgExp = data.length
//     ? (data.reduce((s, p) => s + p.exp, 0) / data.length).toFixed(1)
//     : "0.0";
//   const fields = [...new Set(data.map(p => p.field))].length;
//   const quals  = [...new Set(data.map(p => p.qual))].length;

//   /* ── Qualification filter pills ── */
//   const qualOptions = ["All", ...Object.keys(QUALS_META).filter(q => data.some(p => p.qual === q))];

//   const COLS: ColDef[] = [
//     { lbl: "S.No",             k: null,    w: "52px"  },
//     { lbl: "Name",             k: "name",  w: "190px" },
//     { lbl: "Qualification",    k: "qual",  w: "130px" },
//     { lbl: "Experience",       k: "exp",   w: "145px" },
//     { lbl: "Interested Field", k: "field", w: "155px" },
//     { lbl: "CV",               k: null,    w: "100px" },
//     { lbl: "Phone",            k: "phone", w: "135px" },
//     { lbl: "Email",            k: "email", w: "195px" },
//   ];

//   const pulseStyle = `
//     @keyframes livePulse{0%{transform:scale(1);opacity:.8}70%{transform:scale(2.4);opacity:0}100%{transform:scale(2.4);opacity:0}}
//     @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
//     @media(min-width:768px){
//       .emp-hint{display:inline!important;}
//       .md-divider{display:block!important;}
//     }
//   `;

//   const accentGrad   = viewMode === "all" ? "linear-gradient(135deg,#7C3AED,#6D28D9)" : "linear-gradient(135deg,#2563EB,#1D4ED8)";
//   const accentLight  = viewMode === "all" ? "#EDE9FE" : "#EFF6FF";
//   const accentBorder = viewMode === "all" ? "#DDD6FE" : "#BFDBFE";
//   const accentText   = viewMode === "all" ? "#6D28D9" : "#2563EB";

//   return (
//     <div style={{ minHeight: "100vh", fontFamily: "'Inter',system-ui,sans-serif", background: "linear-gradient(160deg,#EFF6FF 0%,#DBEAFE 35%,#EFF6FF 65%,#F0F9FF 100%)", position: "relative" }}>
//       <style>{pulseStyle}</style>

//       {/* ── BACKGROUND BLOBS ── */}
//       <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
//         <div style={{ position: "absolute", width: 700, height: 500, borderRadius: "50%", top: -200, left: -200, background: "radial-gradient(ellipse,rgba(147,197,253,0.35) 0%,transparent 70%)" }} />
//         <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", bottom: -150, right: -100, background: "radial-gradient(ellipse,rgba(186,230,253,0.40) 0%,transparent 70%)" }} />
//         <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", top: "30%", right: "15%", background: "radial-gradient(ellipse,rgba(219,234,254,0.50) 0%,transparent 70%)" }} />
//       </div>

//       <div style={{ position: "relative", zIndex: 1 }}>

//         {/* ── HEADER ── */}
//         <header style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid #BFDBFE", boxShadow: "0 2px 20px rgba(37,99,235,0.09)", position: "sticky", top: 0, zIndex: 100 }}>
//           <div style={{ maxWidth: 1400, margin: "0 auto", padding: "10px 16px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 11, flexShrink: 0 }}>
//               <div style={{ width: 42, height: 42, borderRadius: 13, position: "relative", overflow: "hidden", background: "linear-gradient(135deg,#2563EB,#1D4ED8)", boxShadow: "0 0 0 1px rgba(37,99,235,0.3),0 6px 18px rgba(37,99,235,0.35),inset 0 1px 0 rgba(255,255,255,0.25)" }}>
//                 <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(255,255,255,0.22) 0%,transparent 60%)" }} />
//                 <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
//                   <span style={{ color: "#fff", fontWeight: 800, fontSize: 15, letterSpacing: "-0.5px" }}>HR</span>
//                 </div>
//               </div>
//               <div>
//                 <p style={{ margin: 0, fontSize: 9, color: "#3B82F6", fontWeight: 800, letterSpacing: "0.17em", textTransform: "uppercase" }}>Connect Portal</p>
//                 <p style={{ margin: 0, fontSize: 15, color: "#1E3A5F", fontWeight: 800, letterSpacing: "-0.4px" }}>HR Network</p>
//               </div>
//             </div>

//             {/* Breadcrumb — hidden on small screens */}
//             <div style={{ width: 1, height: 34, background: "#BFDBFE", flexShrink: 0, display: "none" }} id="hdr-divider" />
//             <div id="breadcrumb" style={{ display: "none", alignItems: "center", gap: 7, fontSize: 11.5, color: "#64748B" }}>
//               <Home style={{ width: 12, height: 12, color: "#3B82F6" }} />
//               <a href="#" style={{ color: "#3B82F6", fontWeight: 600, textDecoration: "none" }}>Home</a>
//               <span style={{ color: "#93C5FD" }}>›</span>
//               <a href="#" style={{ color: "#3B82F6", fontWeight: 600, textDecoration: "none" }}>Dashboard</a>
//               <span style={{ color: "#93C5FD" }}>›</span>
//               <span style={{ color: "#1E3A5F", fontWeight: 600 }}>
//                 {viewMode === "location" ? "Persons From Your Location" : "All Employees"}
//               </span>
//             </div>

//             <style>{`
//               @media(min-width:768px){
//                 #hdr-divider{display:block!important;}
//                 #breadcrumb{display:flex!important;}
//               }
//             `}</style>

//             <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
//               <button onClick={() => navigate("/postjob")} style={{
//                 background: "linear-gradient(135deg,#2563EB,#1D4ED8)", color: "#fff",
//                 border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 700,
//                 cursor: "pointer", boxShadow: "0 4px 12px rgba(37,99,235,0.3)", whiteSpace: "nowrap",
//               }}>
//                 + Post Job
//               </button>
//               <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(220,252,231,0.7)", border: "1px solid #86EFAC", padding: "4px 10px 4px 7px", borderRadius: 99, boxShadow: "0 1px 6px rgba(34,197,94,0.12)" }}>
//                 <div style={{ position: "relative", width: 10, height: 10, flexShrink: 0 }}>
//                   <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#22C55E", animation: "livePulse 1.6s ease-out infinite" }} />
//                   <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#22C55E", animation: "livePulse 1.6s ease-out infinite 0.5s" }} />
//                   <div style={{ position: "absolute", inset: "2px", borderRadius: "50%", background: "#16A34A", boxShadow: "0 0 4px rgba(22,163,74,0.6)" }} />
//                 </div>
//                 <span style={{ fontSize: 10, color: "#15803D", fontWeight: 800, letterSpacing: "0.1em" }}>LIVE</span>
//               </div>
//               {/* Mobile nav toggle */}
//               <button
//                 onClick={() => setNavOpen(o => !o)}
//                 style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, background: "#EFF6FF", border: "1.5px solid #BFDBFE", borderRadius: 9, cursor: "pointer" }}
//                 id="nav-toggle"
//               >
//                 <Menu style={{ width: 16, height: 16, color: "#2563EB" }} />
//               </button>
//             </div>
//           </div>

//           {/* ── MOBILE NAV DROPDOWN ── */}
//           {navOpen && (
//             <div style={{ borderTop: "1px solid #DBEAFE", background: "rgba(255,255,255,0.97)", padding: "8px 16px 10px" }}>
//               <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
//                 {NAV.map((lk, i) => (
//                   <a key={i} href="#" style={{ padding: "6px 12px", fontSize: 10.5, fontWeight: 700, color: "#3B82F6", letterSpacing: "0.06em", textDecoration: "none", borderRadius: 8, textTransform: "uppercase", transition: "all 0.15s" }}
//                     onMouseEnter={e => { e.currentTarget.style.background = "#DBEAFE"; e.currentTarget.style.color = "#1D4ED8"; }}
//                     onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#3B82F6"; }}>
//                     {lk}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           )}
//         </header>

//         {/* ── DESKTOP NAV BAR ── */}
//         <nav id="desktop-nav" style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: "1px solid #DBEAFE", display: "none" }}>
//           <div style={{ maxWidth: 1400, margin: "0 auto", padding: "5px 28px", display: "flex", flexWrap: "wrap", gap: 2 }}>
//             {NAV.map((lk, i) => (
//               <a key={i} href="#" style={{ padding: "6px 13px", fontSize: 10.5, fontWeight: 700, color: "#3B82F6", letterSpacing: "0.06em", textDecoration: "none", borderRadius: 8, textTransform: "uppercase", transition: "all 0.15s" }}
//                 onMouseEnter={e => { e.currentTarget.style.background = "#DBEAFE"; e.currentTarget.style.color = "#1D4ED8"; }}
//                 onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#3B82F6"; }}>
//                 {lk}
//               </a>
//             ))}
//           </div>
//         </nav>
//         <style>{`@media(min-width:768px){#desktop-nav{display:block!important;}#nav-toggle{display:none!important;}}`}</style>

//         {/* ── EMPLOYER INFO BAR ── */}
//         <EmployerInfoBar employer={employer} onLogout={handleLogout} />

//         {/* ── SELECTION BAR ── */}
//         <SelectionBar
//           count={selected.size}
//           onClear={clearSel}
//           onExportSelected={exportSelected}
//           onDeleteSelected={deleteSelected}
//           onPayForData={handlePayForData}
//         />

//         {/* ── MAIN ── */}
//         <main style={{ maxWidth: 1400, margin: "0 auto", padding: "18px 16px 40px" }}>

//           {/* ── VIEW MODE TOGGLE + CONTEXT BADGE ── */}
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
//             <ViewModeToggle
//               mode={viewMode}
//               onChange={handleViewModeChange}
//               locationCount={locationData.length}
//               allCount={allData.length}
//               loadingAll={loadingAll}
//             />
//             <div style={{
//               display: "flex", alignItems: "center", gap: 7,
//               padding: "5px 12px", borderRadius: 99,
//               background: viewMode === "all" ? "rgba(237,233,254,0.8)" : "rgba(219,234,254,0.8)",
//               border: `1.5px solid ${viewMode === "all" ? "#DDD6FE" : "#BFDBFE"}`,
//               fontSize: 11, fontWeight: 700,
//               color: viewMode === "all" ? "#6D28D9" : "#1D4ED8",
//               maxWidth: "100%",
//             }}>
//               {viewMode === "all"
//                 ? <><Globe style={{ width: 12, height: 12, flexShrink: 0 }} /><span>Showing all employees across all locations</span></>
//                 : <><MapPin style={{ width: 12, height: 12, flexShrink: 0 }} /><span>Showing employees matching your pin code</span></>
//               }
//             </div>
//           </div>

//           {/* ── STAT CARDS ── */}
//           <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
//             <StatCard icon={Users}       iconBg={accentLight}  iconCol={accentText} val={loading ? "…" : data.length} label="Total Persons"  />
//             <StatCard icon={Briefcase}   iconBg="#D1FAE5" iconCol="#059669" val={loading ? "…" : avgExp + "y"} label="Avg Experience" />
//             <StatCard icon={Lightbulb}   iconBg="#EDE9FE" iconCol="#7C3AED" val={loading ? "…" : fields}      label="Fields Covered" />
//             <StatCard icon={Award}       iconBg="#FEF3C7" iconCol="#D97706" val={loading ? "…" : quals}       label="Qualifications" />
//             {selected.size > 0 && (
//               <StatCard icon={CheckSquare} iconBg="#DCFCE7" iconCol="#16A34A" val={selected.size} label="Selected" />
//             )}
//           </div>

//           {/* ── TOOLBAR ── */}
//           <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
//               <div style={{ width: 40, height: 40, borderRadius: 12, background: accentGrad, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 12px ${viewMode === "all" ? "rgba(109,40,217,0.30)" : "rgba(37,99,235,0.30)"}` }}>
//                 {viewMode === "all"
//                   ? <Globe style={{ width: 17, height: 17, color: "#fff" }} />
//                   : <Users style={{ width: 17, height: 17, color: "#fff" }} />
//                 }
//               </div>
//               <div>
//                 <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#1E3A5F", letterSpacing: "-0.3px" }}>
//                   {viewMode === "all" ? "All Employees" : "List of Persons"}
//                 </p>
//                 <p style={{ margin: 0, fontSize: 11, color: "#64748B" }}>
//                   {loading ? "Loading…" : `${filtered.length} person${filtered.length !== 1 ? "s" : ""} found`}
//                 </p>
//               </div>
//             </div>

//             {/* Qual pills — scrollable on mobile */}
//             <div style={{ display: "flex", gap: 6, flexWrap: "wrap", flex: 1, minWidth: 0 }}>
//               {qualOptions.map(q => {
//                 const active = qual === q;
//                 return (
//                   <button key={q} onClick={() => onQual(q)} style={{
//                     padding: "5px 12px", fontSize: 11, fontWeight: 600, borderRadius: 99, cursor: "pointer", border: "1.5px solid", transition: "all 0.15s", whiteSpace: "nowrap",
//                     background: active ? accentGrad : `${accentLight}B2`,
//                     color:       active ? "#fff" : accentText,
//                     borderColor: active ? accentText : accentBorder,
//                     boxShadow:   active ? `0 3px 10px ${viewMode === "all" ? "rgba(109,40,217,0.30)" : "rgba(37,99,235,0.30)"}` : "none",
//                   }}>{q}</button>
//                 );
//               })}
//             </div>

//             {/* Search + Export row */}
//             <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", flexWrap: "wrap" }}>
//               <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
//                 <Search style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 13, height: 13, color: "#93C5FD" }} />
//                 <input
//                   type="text"
//                   placeholder="Search name, field, qualification…"
//                   value={search}
//                   onChange={e => onSearch(e.target.value)}
//                   style={{ width: "100%", paddingLeft: 30, paddingRight: search ? 30 : 14, paddingTop: 9, paddingBottom: 9, fontSize: 12, background: "rgba(255,255,255,0.90)", border: "1.5px solid #BFDBFE", borderRadius: 11, outline: "none", color: "#1E3A5F", boxSizing: "border-box", transition: "all 0.2s" }}
//                   onFocus={e => { e.target.style.borderColor = accentText; e.target.style.boxShadow = `0 0 0 3px ${viewMode === "all" ? "rgba(109,40,217,0.15)" : "rgba(59,130,246,0.15)"}`; }}
//                   onBlur={e => { e.target.style.borderColor = "#BFDBFE"; e.target.style.boxShadow = "none"; }}
//                 />
//                 {search && (
//                   <button onClick={() => onSearch("")} style={{ position: "absolute", right: 9, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#93C5FD", display: "flex", padding: 0 }}>
//                     <X style={{ width: 13, height: 13 }} />
//                   </button>
//                 )}
//               </div>
              
//             </div>
//           </div>

//           {/* ── TABLE CARD ── */}
//           <div style={{ borderRadius: 18, overflow: "hidden", background: "#fff", border: `1px solid ${accentBorder}`, boxShadow: cardShadow }}>

//             {viewMode === "all" && !loading && !error && (
//               <div style={{
//                 background: "linear-gradient(90deg,rgba(237,233,254,0.9),rgba(245,243,255,0.9))",
//                 borderBottom: "1.5px solid #DDD6FE",
//                 padding: "8px 16px",
//                 display: "flex", alignItems: "center", gap: 8,
//               }}>
//                 <Globe style={{ width: 13, height: 13, color: "#7C3AED", flexShrink: 0 }} />
//                 <span style={{ fontSize: 11.5, fontWeight: 600, color: "#6D28D9" }}>
//                   Viewing all <strong>{allData.length}</strong> employees across all locations.
//                   Contact details are only visible for records you have unlocked.
//                 </span>
//               </div>
//             )}

//             <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
//               <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
//                 <thead>
//                   <tr style={{ background: accentLight, borderBottom: `1.5px solid ${accentBorder}` }}>
//                     <th style={{ width: 44, padding: "12px 8px 12px 14px", textAlign: "center" }}>
//                       <Checkbox checked={allPageSel} indeterminate={someSel} onChange={togglePage} />
//                     </th>
//                     {COLS.map(c => (
//                       <th key={c.lbl}
//                         onClick={c.k ? () => flip(c.k as keyof Student) : undefined}
//                         style={{ width: c.w, padding: "12px 12px", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: sortK === c.k ? accentText : "#3B82F6", textAlign: "left", cursor: c.k ? "pointer" : "default", userSelect: "none", whiteSpace: "nowrap", transition: "all 0.15s" }}
//                         onMouseEnter={e => { if (c.k) { e.currentTarget.style.background = accentBorder; e.currentTarget.style.color = accentText; } }}
//                         onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = sortK === c.k ? accentText : "#3B82F6"; }}>
//                         <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
//                           {c.lbl}
//                           {c.k && <SortIcon on={sortK === c.k} dir={sortD} />}
//                         </div>
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading ? (
//                     <LoadingState />
//                   ) : error ? (
//                     <ErrorState message={error} onRetry={viewMode === "location" ? fetchLocationData : fetchAllData} />
//                   ) : filtered.length === 0 ? (
//                     <tr><td colSpan={9} style={{ padding: "60px 20px", textAlign: "center" }}>
//                       <Search style={{ width: 40, height: 40, color: "#BFDBFE", display: "block", margin: "0 auto 12px" }} />
//                       <p style={{ fontSize: 13, color: "#94A3B8" }}>No persons found matching your search.</p>
//                     </td></tr>
//                   ) : pad.map((row, i) => {
//                     const even = i % 2 === 0;
//                     if (!row) return (
//                       <tr key={`pad${i}`} style={{ height: 54, background: even ? "#fff" : "#F8FBFF", borderBottom: "1px solid #F0F7FF" }}>
//                         <td colSpan={9} />
//                       </tr>
//                     );
//                     const idx        = sp * PAGE_SZ + i;
//                     const av         = AVATARS[row.id % AVATARS.length];
//                     const qm         = QUALS_META[row.qual] ?? { bg: "#F8FAFC", col: "#64748B", border: "#CBD5E1" };
//                     const FieldI     = FIELD_ICONS[row.field] ?? Lightbulb;
//                     const pct        = Math.round((row.exp / MAX_EXP) * 100);
//                     const isSel      = selected.has(row.id);
//                     const isUnlocked = row.isUnlocked;

//                     return (
//                       <tr key={row.id} style={{
//                         height: 54, borderBottom: "1px solid #EFF6FF", cursor: "pointer", transition: "background 0.12s",
//                         background: isSel ? `${accentLight}80` : even ? "#fff" : "#F8FBFF",
//                       }}
//                         onMouseEnter={e => e.currentTarget.style.background = isSel ? `${accentLight}AA` : accentLight}
//                         onMouseLeave={e => e.currentTarget.style.background = isSel ? `${accentLight}80` : even ? "#fff" : "#F8FBFF"}>

//                         <td style={{ padding: "0 8px 0 14px", textAlign: "center", verticalAlign: "middle" }}>
//                           <Checkbox checked={isSel} onChange={() => toggleRow(row.id)} />
//                         </td>

//                         {/* S.No */}
//                         <td style={{ padding: "0 12px", verticalAlign: "middle", width: "52px" }}>
//                           <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
//                             <span style={{ fontSize: 11, fontWeight: 700, color: "#93C5FD" }}>{idx + 1}</span>
//                             {isUnlocked && (
//                               <span style={{ fontSize: 8, fontWeight: 800, color: "#16A34A", background: "#DCFCE7", border: "1px solid #BBF7D0", borderRadius: 4, padding: "1px 3px", letterSpacing: "0.04em" }}>
//                                 ✓ OPEN
//                               </span>
//                             )}
//                           </div>
//                         </td>

//                         {/* Name */}
//                         <td style={{ padding: "0 12px", verticalAlign: "middle" }}>
//                           <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
//                             <div style={{ width: 32, height: 32, borderRadius: 9, background: av.bg, color: av.col, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
//                               {initials(row.name)}
//                             </div>
//                             <span style={{ fontSize: 12.5, fontWeight: 600, color: "#1E3A5F", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 140 }}>{row.name}</span>
//                           </div>
//                         </td>

//                         {/* Qualification */}
//                         <td style={{ padding: "0 12px", verticalAlign: "middle" }}>
//                           <span style={{ display: "inline-block", padding: "3px 9px", borderRadius: 99, fontSize: 10.5, fontWeight: 700, background: qm.bg, color: qm.col, border: `1.5px solid ${qm.border}`, whiteSpace: "nowrap" }}>
//                             {row.qual}
//                           </span>
//                         </td>

//                         {/* Experience */}
//                         <td style={{ padding: "0 12px", verticalAlign: "middle" }}>
//                           <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
//                             <div style={{ height: 4, borderRadius: 99, background: "#DBEAFE", width: 70, overflow: "hidden", flexShrink: 0 }}>
//                               <div style={{ height: "100%", borderRadius: 99, background: accentGrad, width: `${pct}%`, transition: "width 0.4s ease" }} />
//                             </div>
//                             <span style={{ fontSize: 11.5, color: "#64748B", whiteSpace: "nowrap" }}>{row.exp} yr{row.exp !== 1 ? "s" : ""}</span>
//                           </div>
//                         </td>

//                         {/* Field */}
//                         <td style={{ padding: "0 12px", verticalAlign: "middle" }}>
//                           <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 9px", borderRadius: 8, fontSize: 11, fontWeight: 600, background: accentLight, color: accentText, border: `1px solid ${accentBorder}`, whiteSpace: "nowrap" }}>
//                             <FieldI style={{ width: 11, height: 11, flexShrink: 0 }} />{row.field}
//                           </span>
//                         </td>

//                         {/* CV */}
//                         <td style={{ padding: "0 12px", verticalAlign: "middle" }}>
//                           {isUnlocked ? (
//                             <button
//                               onClick={() => {
//                                 const employerId = localStorage.getItem("employer_id") ?? "";
//                                 const url = `http://192.168.0.6:8000/api/students/${row.id}/cv/?employer_id=${employerId}`;
//                                 window.open(url, "_blank");
//                               }}
//                               style={{
//                                 display: "inline-flex", alignItems: "center", gap: 5,
//                                 padding: "5px 10px", borderRadius: 9, fontSize: 11, fontWeight: 700,
//                                 color: accentText, background: accentLight, border: `1.5px solid ${accentBorder}`,
//                                 cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap"
//                               }}
//                               onMouseEnter={e => { e.currentTarget.style.background = accentBorder; e.currentTarget.style.transform = "translateY(-1px)"; }}
//                               onMouseLeave={e => { e.currentTarget.style.background = accentLight; e.currentTarget.style.transform = "none"; }}>
//                               <FileText style={{ width: 11, height: 11 }} /> View CV
//                             </button>
//                           ) : (
//                             <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 9, fontSize: 11, fontWeight: 700, color: "#94A3B8", background: "#F8FAFC", border: "1.5px solid #E2E8F0", whiteSpace: "nowrap" }}>
//                               🔒 Locked
//                             </span>
//                           )}
//                         </td>

//                         {/* Phone */}
//                         <td style={{ padding: "0 12px", verticalAlign: "middle" }}>
//                           {isUnlocked ? (
//                             <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: "#64748B", whiteSpace: "nowrap" }}>
//                               <Phone style={{ width: 11, height: 11, color: "#93C5FD", flexShrink: 0 }} />
//                               {row.phone}
//                             </span>
//                           ) : (
//                             <span style={{ fontSize: 13, color: "#CBD5E1", letterSpacing: 3 }}>••••••••••</span>
//                           )}
//                         </td>

//                         {/* Email */}
//                         <td style={{ padding: "0 12px", verticalAlign: "middle" }}>
//                           {isUnlocked ? (
//                             <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: "#64748B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 170 }}>
//                               <Mail style={{ width: 11, height: 11, color: "#93C5FD", flexShrink: 0 }} />
//                               {row.email}
//                             </span>
//                           ) : (
//                             <span style={{ fontSize: 13, color: "#CBD5E1", letterSpacing: 3 }}>••••••••••••••••</span>
//                           )}
//                         </td>

//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>

//             {/* ── PAGINATION ── */}
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: accentLight, borderTop: `1.5px solid ${accentBorder}`, flexWrap: "wrap", gap: 8 }}>
//               <p style={{ margin: 0, fontSize: 11.5, color: "#64748B" }}>
//                 <span style={{ fontWeight: 700, color: accentText }}>{filtered.length === 0 ? 0 : sp * PAGE_SZ + 1}–{Math.min((sp + 1) * PAGE_SZ, filtered.length)}</span>
//                 {" of "}
//                 <span style={{ fontWeight: 700, color: "#334155" }}>{filtered.length}</span>
//                 {selected.size > 0 && <span style={{ marginLeft: 10, fontWeight: 700, color: "#16A34A" }}>· {selected.size} selected</span>}
//               </p>
//               <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
//                 <button disabled={sp === 0} onClick={() => setPage(p => p - 1)}
//                   style={{ width: 30, height: 30, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", background: sp === 0 ? "#F1F5F9" : "#fff", border: "1.5px solid", borderColor: sp === 0 ? "#E2E8F0" : accentBorder, cursor: sp === 0 ? "not-allowed" : "pointer", opacity: sp === 0 ? 0.4 : 1, transition: "all 0.15s" }}
//                   onMouseEnter={e => sp !== 0 && (e.currentTarget.style.background = accentLight)}
//                   onMouseLeave={e => { e.currentTarget.style.background = sp === 0 ? "#F1F5F9" : "#fff"; }}>
//                   <ChevronLeft style={{ width: 14, height: 14, color: accentText }} />
//                 </button>
//                 {Array.from({ length: totPg }, (_, n) => (
//                   <button key={n} onClick={() => setPage(n)} style={{ width: 30, height: 30, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s", background: n === sp ? accentGrad : "#fff", border: n === sp ? `1.5px solid ${accentText}` : `1.5px solid ${accentBorder}`, color: n === sp ? "#fff" : accentText, boxShadow: n === sp ? `0 3px 10px ${viewMode === "all" ? "rgba(109,40,217,0.35)" : "rgba(37,99,235,0.35)"}` : "0 1px 3px rgba(37,99,235,0.08)" }}>
//                     {n + 1}
//                   </button>
//                 ))}
//                 <button disabled={sp >= totPg - 1} onClick={() => setPage(p => p + 1)}
//                   style={{ width: 30, height: 30, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", background: sp >= totPg - 1 ? "#F1F5F9" : "#fff", border: "1.5px solid", borderColor: sp >= totPg - 1 ? "#E2E8F0" : accentBorder, cursor: sp >= totPg - 1 ? "not-allowed" : "pointer", opacity: sp >= totPg - 1 ? 0.4 : 1, transition: "all 0.15s" }}
//                   onMouseEnter={e => sp < totPg - 1 && (e.currentTarget.style.background = accentLight)}
//                   onMouseLeave={e => { e.currentTarget.style.background = sp >= totPg - 1 ? "#F1F5F9" : "#fff"; }}>
//                   <ChevronRight style={{ width: 14, height: 14, color: accentText }} />
//                 </button>
//               </div>
//             </div>
//           </div>

//         </main>
//       </div>
//     </div>
//   );
// }



import { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Search, X, ChevronUp, ChevronDown, ChevronsUpDown,
  ChevronLeft, ChevronRight, Download, FileText,
  Users, Briefcase, Lightbulb, Award, Phone, Mail,
  Code2, HeartPulse, BookOpen, Coins,
  Wrench, Megaphone, Building2, TrendingUp, Home,
  CheckSquare, Trash2, UserCheck, Loader2, AlertCircle,
  Globe, MapPin, Menu,
} from "lucide-react";

/* ─── API CONFIG ────────────────────────────────────────────── */
const API_URL     = "http://192.168.0.6:8000/api/students/filter/";
const API_URL_ALL = "http://192.168.0.6:8000/api/students/all/";
const CV_BASE     = "http://192.168.0.6:8000/api/students";

/* ─── TYPES ─────────────────────────────────────────────────── */
interface RawStudent {
  id?: number;
  surname?: string;
  name?: string;
  academic?: string;
  experience_years?: number | string;
  core_spec_v1?: string;
  technical_v1?: string;
  non_tech_v1?: string;
  general_cat_v1?: string;
  mobile_personal?: string;
  email?: string;
  designation?: string;
  company_name?: string;
  photo?: string;
  hr_photo?: string;
  is_unlocked?: boolean;
}

interface Student {
  id: number;
  name: string;
  qual: string;
  exp: number;
  field: string;
  phone: string;
  email: string;
  designation: string;
  company: string;
  photo?: string;
  hr_photo?: string;
  isUnlocked: boolean;
}

interface EmployerInfo {
  employer_id: string;
  name: string;
  company_name: string;
}

interface QualMeta {
  bg: string;
  col: string;
  border: string;
}

interface AvatarColor {
  bg: string;
  col: string;
}

interface ColDef {
  lbl: string;
  k: keyof Student | null;
  w: string;
}

interface SelectionBarProps {
  count: number;
  onClear: () => void;
  onExportSelected: () => void;
  onDeleteSelected: () => void;
  onPayForData: () => void;
}

interface StatCardProps {
  icon: React.ElementType;
  iconBg: string;
  iconCol: string;
  val: string | number;
  label: string;
}

interface SortIconProps {
  on: boolean;
  dir: "asc" | "desc";
}

interface CheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  style?: React.CSSProperties;
}

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

/* ─── VIEW MODE ─────────────────────────────────────────────── */
type ViewMode = "location" | "all";

/* ─── NORMALISE ─────────────────────────────────────────────── */
const normalise = (raw: RawStudent, index: number): Student => ({
  id: raw.id ?? index,
  name: `${raw.surname ?? ""} ${raw.name ?? ""}`.trim() || "—",
  qual: raw.academic ?? "—",
  exp: Number(raw.experience_years) || 0,
  field:
    raw.core_spec_v1 ||
    raw.technical_v1 ||
    raw.non_tech_v1 ||
    raw.general_cat_v1 ||
    "—",
  phone: raw.mobile_personal ?? "—",
  email: raw.email ?? "—",
  designation: raw.designation ?? "—",
  company: raw.company_name ?? "—",
  photo: raw.photo,
  hr_photo: raw.hr_photo,
  isUnlocked: raw.is_unlocked ?? false,
});

/* ─── DATA ─────────────────────────────────────────────────── */
const QUALS_META: Record<string, QualMeta> = {
  SSC:               { bg: "#FFF1F2", col: "#C81A40", border: "#FECDD3" },
  ITI:               { bg: "#FFFBEB", col: "#D97706", border: "#FDE68A" },
  Polytechnic:       { bg: "#ECFDF5", col: "#059669", border: "#A7F3D0" },
  Intermediate:      { bg: "#EFF6FF", col: "#2563EB", border: "#BFDBFE" },
  "U.G (Degree)":    { bg: "#F5F3FF", col: "#7C3AED", border: "#DDD6FE" },
  "P.G (Degree)":    { bg: "#F0F9FF", col: "#0284C7", border: "#BAE6FD" },
  "U.G(B.Tech/B.E)": { bg: "#E0F2FE", col: "#0369A1", border: "#7DD3FC" },
  "P.G(M.Tech/M.E)": { bg: "#F3E8FF", col: "#9333EA", border: "#D8B4FE" },
};

const FIELD_ICONS: Record<string, React.ElementType> = {
  "IT / Software":  Code2,
  "Healthcare":     HeartPulse,
  "Education":      BookOpen,
  "Finance":        Coins,
  "Engineering":    Wrench,
  "Marketing":      Megaphone,
  "Administration": Building2,
  "Sales":          TrendingUp,
};

const AVATARS: AvatarColor[] = [
  { bg: "#DBEAFE", col: "#1D4ED8" }, { bg: "#D1FAE5", col: "#065F46" },
  { bg: "#EDE9FE", col: "#6D28D9" }, { bg: "#FEE2E2", col: "#991B1B" },
  { bg: "#FEF3C7", col: "#92400E" }, { bg: "#FCE7F3", col: "#9D174D" },
  { bg: "#E0F2FE", col: "#0369A1" }, { bg: "#F0FDF4", col: "#166534" },
];

const NAV = ["Home", "About Us", "Authorised HRs", "Core Committee", "Services", "Projects", "Associates", "Gallery", "Contact Us"];
const PAGE_SZ = 8;
const RATE_PER_PERSON = 50;

/* ─── HELPERS ───────────────────────────────────────────────── */
const initials = (name: string): string =>
  name.split(" ").slice(0, 2).map(w => w[0]).join("");

const cardShadow = "0 1px 3px rgba(37,99,235,0.06), 0 8px 24px rgba(37,99,235,0.10), 0 1px 0 rgba(255,255,255,0.9) inset";

/* ─── BLOB CV DOWNLOAD ──────────────────────────────────────── */
// Uses fetch + blob so mobile browsers save to Downloads
// instead of opening/previewing the PDF inline.
const downloadCVBlob = async (
  studentId: number,
  studentName: string,
  employerId: string,
  onStart: () => void,
  onDone: () => void,
  onError: (msg: string) => void,
): Promise<void> => {
  onStart();
  try {
    const url = `${CV_BASE}/${studentId}/cv/?employer_id=${employerId}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `CV_${studentName.replace(/\s+/g, "_")}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(blobUrl);
  } catch (err: unknown) {
    onError(err instanceof Error ? err.message : "Download failed");
  } finally {
    onDone();
  }
};

/* ─── CV DOWNLOAD BUTTON ────────────────────────────────────── */
interface CVButtonProps {
  studentId: number;
  studentName: string;
  accentLight: string;
  accentText: string;
  accentBorder: string;
}
function CVButton({ studentId, studentName, accentLight, accentText, accentBorder }: CVButtonProps) {
  const [downloading, setDownloading] = useState(false);
  const [dlError,     setDlError]     = useState<string | null>(null);

  const handleClick = () => {
    const employerId = localStorage.getItem("employer_id") ?? "";
    setDlError(null);
    downloadCVBlob(
      studentId,
      studentName,
      employerId,
      () => setDownloading(true),
      () => setDownloading(false),
      (msg) => { setDlError(msg); setDownloading(false); },
    );
  };

  if (dlError) {
    return (
      <button
        onClick={handleClick}
        title={dlError}
        style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          padding: "5px 10px", borderRadius: 9, fontSize: 11, fontWeight: 700,
          color: "#EF4444", background: "#FEF2F2", border: "1.5px solid #FECACA",
          cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap",
        }}>
        <AlertCircle style={{ width: 11, height: 11 }} /> Retry
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={downloading}
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        padding: "5px 10px", borderRadius: 9, fontSize: 11, fontWeight: 700,
        color: downloading ? "#94A3B8" : accentText,
        background: downloading ? "#F1F5F9" : accentLight,
        border: `1.5px solid ${downloading ? "#E2E8F0" : accentBorder}`,
        cursor: downloading ? "not-allowed" : "pointer",
        transition: "all 0.15s", whiteSpace: "nowrap",
        opacity: downloading ? 0.75 : 1,
      }}
      onMouseEnter={e => { if (!downloading) { e.currentTarget.style.background = accentBorder; e.currentTarget.style.transform = "translateY(-1px)"; } }}
      onMouseLeave={e => { e.currentTarget.style.background = downloading ? "#F1F5F9" : accentLight; e.currentTarget.style.transform = "none"; }}>
      {downloading
        ? <><Loader2 style={{ width: 11, height: 11, animation: "spin 1s linear infinite" }} /> Saving…</>
        : <><FileText style={{ width: 11, height: 11 }} /> View CV</>
      }
    </button>
  );
}

/* ─── SORT ICON ─────────────────────────────────────────────── */
const SortIcon = ({ on, dir }: SortIconProps) =>
  !on
    ? <ChevronsUpDown style={{ width: 11, height: 11, color: "#93C5FD", flexShrink: 0 }} />
    : dir === "asc"
      ? <ChevronUp style={{ width: 11, height: 11, color: "#2563EB", flexShrink: 0 }} />
      : <ChevronDown style={{ width: 11, height: 11, color: "#2563EB", flexShrink: 0 }} />;

/* ─── CHECKBOX ──────────────────────────────────────────────── */
const Checkbox = ({ checked, indeterminate, onChange, style }: CheckboxProps) => (
  <label style={{ display: "inline-flex", alignItems: "center", cursor: "pointer", ...style }}>
    <input
      type="checkbox"
      checked={checked}
      ref={el => { if (el) el.indeterminate = !!indeterminate; }}
      onChange={onChange}
      style={{ display: "none" }}
    />
    <span style={{
      width: 17, height: 17, borderRadius: 5, border: "2px solid",
      borderColor: checked || indeterminate ? "#2563EB" : "#93C5FD",
      background: checked || indeterminate ? "linear-gradient(135deg,#2563EB,#3B82F6)" : "rgba(255,255,255,0.9)",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, transition: "all 0.15s",
      boxShadow: checked || indeterminate ? "0 2px 6px rgba(37,99,235,0.30)" : "none",
    }}>
      {indeterminate && !checked
        ? <span style={{ width: 8, height: 2, background: "#fff", borderRadius: 1, display: "block" }} />
        : checked
          ? <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
              <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          : null}
    </span>
  </label>
);

/* ─── SELECTION ACTION BAR ──────────────────────────────────── */
function SelectionBar({ count, onClear, onExportSelected, onDeleteSelected, onPayForData }: SelectionBarProps) {
  if (!count) return null;
  return (
    <div style={{
      position: "sticky", top: 68, zIndex: 90,
      background: "linear-gradient(135deg,#1D4ED8,#2563EB)",
      padding: "10px 16px",
      display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
      boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <UserCheck style={{ width: 16, height: 16, color: "rgba(255,255,255,0.9)" }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{count} selected</span>
      </div>
      <div style={{ marginLeft: "auto", display: "flex", flexWrap: "wrap", gap: 7 }}>
        <button onClick={onPayForData} style={{
          display: "flex", alignItems: "center", gap: 6, padding: "7px 12px",
          background: "linear-gradient(135deg,#16A34A,#22C55E)",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: 9, color: "#fff", fontSize: 11, fontWeight: 700,
          cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap",
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
          💳 Pay (₹{RATE_PER_PERSON}/person)
        </button>
        <button onClick={onDeleteSelected} style={{
          display: "flex", alignItems: "center", gap: 6, padding: "7px 12px",
          background: "rgba(239,68,68,0.25)", border: "1px solid rgba(239,68,68,0.5)",
          borderRadius: 9, color: "#FCA5A5", fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.40)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.25)"}>
          <Trash2 style={{ width: 13, height: 13 }} /> Delete
        </button>
        <button onClick={onClear} style={{
          display: "flex", alignItems: "center", gap: 5, padding: "7px 10px",
          background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: 9, color: "rgba(255,255,255,0.8)", fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.20)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}>
          <X style={{ width: 12, height: 12 }} /> Clear
        </button>
      </div>
    </div>
  );
}

/* ─── STAT CARD ─────────────────────────────────────────────── */
function StatCard({ icon: Icon, iconBg, iconCol, val, label }: StatCardProps) {
  return (
    <div style={{
      flex: "1 1 120px", minWidth: 110, maxWidth: 200,
      background: "rgba(255,255,255,0.85)",
      border: "1px solid #BFDBFE",
      borderRadius: 14,
      padding: "10px 14px",
      display: "flex", alignItems: "center", gap: 10,
      boxShadow: "0 2px 8px rgba(37,99,235,0.07)",
    }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon style={{ width: 17, height: 17, color: iconCol }} />
      </div>
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#1E3A5F", letterSpacing: "-0.5px" }}>{val}</div>
        <div style={{ fontSize: 10.5, color: "#64748B", marginTop: 1 }}>{label}</div>
      </div>
    </div>
  );
}

/* ─── LOADING STATE ─────────────────────────────────────────── */
function LoadingState() {
  return (
    <tr>
      <td colSpan={9} style={{ padding: "80px 20px", textAlign: "center" }}>
        <Loader2 style={{ width: 36, height: 36, color: "#3B82F6", display: "block", margin: "0 auto 12px", animation: "spin 1s linear infinite" }} />
        <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>Loading persons from database…</p>
      </td>
    </tr>
  );
}

/* ─── ERROR STATE ───────────────────────────────────────────── */
function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <tr>
      <td colSpan={9} style={{ padding: "60px 20px", textAlign: "center" }}>
        <AlertCircle style={{ width: 40, height: 40, color: "#F87171", display: "block", margin: "0 auto 12px" }} />
        <p style={{ fontSize: 13, color: "#EF4444", margin: "0 0 12px" }}>{message}</p>
        <button onClick={onRetry} style={{
          padding: "8px 20px", fontSize: 12, fontWeight: 700, color: "#fff",
          background: "linear-gradient(135deg,#2563EB,#1D4ED8)", border: "none",
          borderRadius: 9, cursor: "pointer", boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
        }}>
          Retry
        </button>
      </td>
    </tr>
  );
}

/* ─── EMPLOYER INFO BAR ─────────────────────────────────────── */
function EmployerInfoBar({ employer, onLogout }: { employer: EmployerInfo | null; onLogout: () => void }) {
  const empId      = employer?.employer_id  ?? localStorage.getItem("employer_id")      ?? "—";
  const empName    = employer?.name         ?? localStorage.getItem("employer_name")    ?? "—";
  const empCompany = employer?.company_name ?? localStorage.getItem("employer_company") ?? "—";

  return (
    <div style={{
      background: "linear-gradient(90deg,#1E3A5F,#2563EB)",
      padding: "7px 16px",
      display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <UserCheck style={{ width: 12, height: 12, color: "rgba(255,255,255,0.45)" }} />
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.50)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Employer</span>
        <span style={{ fontSize: 11.5, color: "#fff", fontWeight: 700 }}>{empName}</span>
      </div>
      <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.18)", flexShrink: 0 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.50)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>ID</span>
        <span style={{ fontSize: 11.5, color: "#93C5FD", fontWeight: 800, letterSpacing: "0.04em" }}>{empId}</span>
      </div>
      <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.18)", flexShrink: 0, display: "none" }} className="md-divider" />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Building2 style={{ width: 12, height: 12, color: "rgba(255,255,255,0.45)" }} />
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.50)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Co.</span>
        <span style={{ fontSize: 11.5, color: "#fff", fontWeight: 700, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{empCompany}</span>
      </div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.38)", fontStyle: "italic", display: "none" }} className="emp-hint">
          🔒 Unlocked contacts are exclusive to your account
        </span>
        <button
          onClick={onLogout}
          style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "5px 11px", fontSize: 11, fontWeight: 700,
            background: "rgba(239,68,68,0.18)", border: "1px solid rgba(239,68,68,0.45)",
            borderRadius: 8, color: "#FCA5A5", cursor: "pointer", transition: "all 0.15s",
            letterSpacing: "0.04em", whiteSpace: "nowrap",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.32)"; e.currentTarget.style.color = "#FEE2E2"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.18)"; e.currentTarget.style.color = "#FCA5A5"; }}
        >
          ⏻ Logout
        </button>
      </div>
    </div>
  );
}

/* ─── VIEW MODE TOGGLE ──────────────────────────────────────── */
function ViewModeToggle({ mode, onChange, locationCount, allCount, loadingAll }: {
  mode: ViewMode;
  onChange: (m: ViewMode) => void;
  locationCount: number;
  allCount: number;
  loadingAll: boolean;
}) {
  return (
    <div style={{
      display: "inline-flex",
      background: "rgba(219,234,254,0.55)",
      border: "1.5px solid #BFDBFE",
      borderRadius: 14,
      padding: 4,
      gap: 3,
      boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
    }}>
      <button
        onClick={() => onChange("location")}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "7px 12px", borderRadius: 10, fontSize: 12, fontWeight: 700,
          border: "none", cursor: "pointer", transition: "all 0.18s",
          background: mode === "location" ? "linear-gradient(135deg,#2563EB,#1D4ED8)" : "transparent",
          color: mode === "location" ? "#fff" : "#3B82F6",
          boxShadow: mode === "location" ? "0 3px 12px rgba(37,99,235,0.35)" : "none",
          whiteSpace: "nowrap",
        }}
      >
        <MapPin style={{ width: 13, height: 13, flexShrink: 0 }} />
        My Location
        <span style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          minWidth: 20, height: 17, borderRadius: 99, fontSize: 10, fontWeight: 800,
          padding: "0 4px",
          background: mode === "location" ? "rgba(255,255,255,0.25)" : "#DBEAFE",
          color: mode === "location" ? "#fff" : "#1D4ED8",
        }}>
          {locationCount}
        </span>
      </button>

      <button
        onClick={() => onChange("all")}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "7px 12px", borderRadius: 10, fontSize: 12, fontWeight: 700,
          border: "none", cursor: "pointer", transition: "all 0.18s",
          background: mode === "all" ? "linear-gradient(135deg,#7C3AED,#6D28D9)" : "transparent",
          color: mode === "all" ? "#fff" : "#7C3AED",
          boxShadow: mode === "all" ? "0 3px 12px rgba(109,40,217,0.35)" : "none",
          whiteSpace: "nowrap",
        }}
      >
        <Globe style={{ width: 13, height: 13, flexShrink: 0 }} />
        All Employees
        <span style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          minWidth: 20, height: 17, borderRadius: 99, fontSize: 10, fontWeight: 800,
          padding: "0 4px",
          background: mode === "all" ? "rgba(255,255,255,0.25)" : "#EDE9FE",
          color: mode === "all" ? "#fff" : "#6D28D9",
        }}>
          {loadingAll ? "…" : allCount}
        </span>
      </button>
    </div>
  );
}

/* ─── MAIN COMPONENT ────────────────────────────────────────── */
export default function ListPersons() {
  const navigate = useNavigate();
  const location = useLocation();

  /* ── View mode ── */
  const [viewMode, setViewMode] = useState<ViewMode>("location");

  /* ── Mobile nav toggle ── */
  const [navOpen, setNavOpen] = useState(false);

  /* ── API state — location data ── */
  const [locationData, setLocationData]       = useState<Student[]>([]);
  const [loadingLocation, setLoadingLocation] = useState<boolean>(true);
  const [errorLocation, setErrorLocation]     = useState<string | null>(null);

  /* ── API state — all employees data ── */
  const [allData, setAllData]       = useState<Student[]>([]);
  const [loadingAll, setLoadingAll] = useState<boolean>(false);
  const [errorAll, setErrorAll]     = useState<string | null>(null);

  /* ── Employer info ── */
  const [employer, setEmployer] = useState<EmployerInfo | null>(null);

  /* ── UI state ── */
  const [search, setSearch]     = useState<string>("");
  const [qual, setQual]         = useState<string>("All");
  const [sortK, setSortK]       = useState<keyof Student | null>(null);
  const [sortD, setSortD]       = useState<"asc" | "desc">("asc");
  const [page, setPage]         = useState<number>(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  /* ── Active data based on view mode ── */
  const data    = viewMode === "location" ? locationData : allData;
  const loading = viewMode === "location" ? loadingLocation : loadingAll;
  const error   = viewMode === "location" ? errorLocation : errorAll;

  /* ── Fetch location-filtered data ── */
  const fetchLocationData = async (): Promise<void> => {
    setLoadingLocation(true);
    setErrorLocation(null);
    try {
      const employerId = localStorage.getItem("employer_id");
      if (!employerId) {
        setErrorLocation("No employer session found. Please log in.");
        setLoadingLocation(false);
        return;
      }
      const res = await fetch(`${API_URL}?employer_id=${employerId}`, {
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}: ${res.statusText}`);
      const json = await res.json();
      const raw: RawStudent[] = Array.isArray(json)
        ? json
        : (json.students ?? json.results ?? []);
      if (json.employer) {
        setEmployer(json.employer);
        localStorage.setItem("employer_id",      json.employer.employer_id ?? "");
        localStorage.setItem("employer_name",    json.employer.name        ?? "");
        localStorage.setItem("employer_company", json.employer.company_name ?? "");
      }
      setLocationData(raw.map((item, i) => normalise(item, i)));
    } catch (err: unknown) {
      setErrorLocation(err instanceof Error ? err.message : "Failed to load data.");
    } finally {
      setLoadingLocation(false);
    }
  };

  /* ── Fetch all employees data ── */
  const fetchAllData = async (): Promise<void> => {
    setLoadingAll(true);
    setErrorAll(null);
    try {
      const employerId = localStorage.getItem("employer_id");
      if (!employerId) {
        setErrorAll("No employer session found. Please log in.");
        setLoadingAll(false);
        return;
      }
      const res = await fetch(`${API_URL_ALL}?employer_id=${employerId}`, {
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}: ${res.statusText}`);
      const json = await res.json();

      console.log("RAW JSON type:", Array.isArray(json) ? "array" : "object");
      console.log("RAW JSON keys:", Array.isArray(json) ? "N/A" : Object.keys(json));
      const sample = Array.isArray(json) ? json.slice(0,3) : (json.students ?? json.results ?? []).slice(0,3);
      console.log("FIRST 3 ROWS:", JSON.stringify(sample, null, 2));

      const raw: RawStudent[] = Array.isArray(json)
        ? json
        : (json.students ?? json.results ?? []);
      setAllData(raw.map((item, i) => normalise(item, i)));
    } catch (err: unknown) {
      setErrorAll(err instanceof Error ? err.message : "Failed to load all employees.");
    } finally {
      setLoadingAll(false);
    }
  };

  /* ── Handle view mode switch ── */
  const handleViewModeChange = (mode: ViewMode): void => {
    setViewMode(mode);
    setSearch("");
    setQual("All");
    setSortK(null);
    setSortD("asc");
    setPage(0);
    setSelected(new Set());
  };

  /* ── Effect 1: re-fetch location data on every navigation ── */
  useEffect(() => {
    fetchLocationData();
    setAllData([]);
  }, [location.key]);

  /* ── Effect 2: re-fetch all-employees data whenever viewMode switches ── */
  useEffect(() => {
    if (viewMode === "all") {
      fetchAllData();
    }
  }, [viewMode, location.key]);

  /* ── Derived values ── */
  const MAX_EXP = data.length ? Math.max(...data.map(p => p.exp), 1) : 1;

  /* ── Filter + sort ── */
  const filtered = useMemo(() => {
    let d = data.filter(p => {
      const q = search.toLowerCase();
      const matchS = !q
        || p.name.toLowerCase().includes(q)
        || p.field.toLowerCase().includes(q)
        || p.qual.toLowerCase().includes(q)
        || p.email.toLowerCase().includes(q)
        || p.phone.includes(q);
      const matchQ = qual === "All" || p.qual === qual;
      return matchS && matchQ;
    });
    if (sortK) {
      d = [...d].sort((a, b) => {
        const A = a[sortK] as string | number;
        const B = b[sortK] as string | number;
        const r = typeof A === "number" ? A - (B as number) : String(A).localeCompare(String(B));
        return sortD === "asc" ? r : -r;
      });
    }
    d.sort((a, b) => {
      if (a.isUnlocked === b.isUnlocked) return 0;
      return a.isUnlocked ? -1 : 1;
    });
    return d;
  }, [data, search, qual, sortK, sortD]);

  const totPg = Math.max(1, Math.ceil(filtered.length / PAGE_SZ));
  const sp    = Math.min(page, totPg - 1);
  const rows  = filtered.slice(sp * PAGE_SZ, (sp + 1) * PAGE_SZ);
  const pad   = [...rows, ...Array<null>(PAGE_SZ - rows.length).fill(null)];

  const pageIds    = rows.map(r => r.id);
  const allPageSel = pageIds.length > 0 && pageIds.every(id => selected.has(id));
  const someSel    = pageIds.some(id => selected.has(id)) && !allPageSel;

  const flip     = (k: keyof Student): void => { setSortD(p => sortK === k ? (p === "asc" ? "desc" : "asc") : "asc"); setSortK(k); setPage(0); };
  const onSearch = (v: string): void => { setSearch(v); setPage(0); };
  const onQual   = (q: string): void => { setQual(q); setPage(0); };

  /* ── Checkbox logic ── */
  const toggleRow  = (id: number): void => setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const togglePage = (): void => setSelected(s => { const n = new Set(s); allPageSel ? pageIds.forEach(id => n.delete(id)) : pageIds.forEach(id => n.add(id)); return n; });
  const clearSel   = (): void => setSelected(new Set());

  /* ── Export CSV ── */
  const exportCSV = (exportRows: Student[]): void => {
    const hdr   = ["S.No", "Name", "Qualification", "Experience (yrs)", "Field", "Phone", "Email"];
    const lines = [hdr, ...exportRows.map((p, i) => [i + 1, p.name, p.qual, p.exp, p.field, p.phone, p.email])];
    const csv   = lines.map(r => r.join(",")).join("\n");
    const a     = document.createElement("a");
    a.href      = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    a.download  = "hr_persons.csv";
    a.click();
  };
  const exportAll      = (): void => exportCSV(filtered);
  const exportSelected = (): void => exportCSV(data.filter(p => selected.has(p.id)));

  /* ── Delete selected ── */
  const deleteSelected = (): void => {
    if (viewMode === "location") {
      setLocationData(d => d.filter(p => !selected.has(p.id)));
    } else {
      setAllData(d => d.filter(p => !selected.has(p.id)));
    }
    setSelected(new Set());
    setPage(0);
  };

  /* ── Pay for Data ── */
  const handlePayForData = (): void => {
    navigate("/pay-for-data", { state: { selectedIds: Array.from(selected) } });
  };

  /* ── Logout ── */
  const handleLogout = (): void => {
    localStorage.removeItem("employer_id");
    localStorage.removeItem("employer_name");
    localStorage.removeItem("employer_company");
    navigate("/");
  };

  /* ── Stats ── */
  const avgExp = data.length
    ? (data.reduce((s, p) => s + p.exp, 0) / data.length).toFixed(1)
    : "0.0";
  const fields = [...new Set(data.map(p => p.field))].length;
  const quals  = [...new Set(data.map(p => p.qual))].length;

  /* ── Qualification filter pills ── */
  const qualOptions = ["All", ...Object.keys(QUALS_META).filter(q => data.some(p => p.qual === q))];

  const COLS: ColDef[] = [
    { lbl: "S.No",             k: null,    w: "52px"  },
    { lbl: "Name",             k: "name",  w: "190px" },
    { lbl: "Qualification",    k: "qual",  w: "130px" },
    { lbl: "Experience",       k: "exp",   w: "145px" },
    { lbl: "Interested Field", k: "field", w: "155px" },
    { lbl: "CV",               k: null,    w: "100px" },
    { lbl: "Phone",            k: "phone", w: "135px" },
    { lbl: "Email",            k: "email", w: "195px" },
  ];

  const pulseStyle = `
    @keyframes livePulse{0%{transform:scale(1);opacity:.8}70%{transform:scale(2.4);opacity:0}100%{transform:scale(2.4);opacity:0}}
    @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @media(min-width:768px){
      .emp-hint{display:inline!important;}
      .md-divider{display:block!important;}
    }
  `;

  const accentGrad   = viewMode === "all" ? "linear-gradient(135deg,#7C3AED,#6D28D9)" : "linear-gradient(135deg,#2563EB,#1D4ED8)";
  const accentLight  = viewMode === "all" ? "#EDE9FE" : "#EFF6FF";
  const accentBorder = viewMode === "all" ? "#DDD6FE" : "#BFDBFE";
  const accentText   = viewMode === "all" ? "#6D28D9" : "#2563EB";

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter',system-ui,sans-serif", background: "linear-gradient(160deg,#EFF6FF 0%,#DBEAFE 35%,#EFF6FF 65%,#F0F9FF 100%)", position: "relative" }}>
      <style>{pulseStyle}</style>

      {/* ── BACKGROUND BLOBS ── */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", width: 700, height: 500, borderRadius: "50%", top: -200, left: -200, background: "radial-gradient(ellipse,rgba(147,197,253,0.35) 0%,transparent 70%)" }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", bottom: -150, right: -100, background: "radial-gradient(ellipse,rgba(186,230,253,0.40) 0%,transparent 70%)" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", top: "30%", right: "15%", background: "radial-gradient(ellipse,rgba(219,234,254,0.50) 0%,transparent 70%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── HEADER ── */}
        <header style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid #BFDBFE", boxShadow: "0 2px 20px rgba(37,99,235,0.09)", position: "sticky", top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "10px 16px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, flexShrink: 0 }}>
              <div style={{ width: 42, height: 42, borderRadius: 13, position: "relative", overflow: "hidden", background: "linear-gradient(135deg,#2563EB,#1D4ED8)", boxShadow: "0 0 0 1px rgba(37,99,235,0.3),0 6px 18px rgba(37,99,235,0.35),inset 0 1px 0 rgba(255,255,255,0.25)" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(255,255,255,0.22) 0%,transparent 60%)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontWeight: 800, fontSize: 15, letterSpacing: "-0.5px" }}>HR</span>
                </div>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 9, color: "#3B82F6", fontWeight: 800, letterSpacing: "0.17em", textTransform: "uppercase" }}>Connect Portal</p>
                <p style={{ margin: 0, fontSize: 15, color: "#1E3A5F", fontWeight: 800, letterSpacing: "-0.4px" }}>HR Network</p>
              </div>
            </div>

            {/* Breadcrumb — hidden on small screens */}
            <div style={{ width: 1, height: 34, background: "#BFDBFE", flexShrink: 0, display: "none" }} id="hdr-divider" />
            <div id="breadcrumb" style={{ display: "none", alignItems: "center", gap: 7, fontSize: 11.5, color: "#64748B" }}>
              <Home style={{ width: 12, height: 12, color: "#3B82F6" }} />
              <a href="#" style={{ color: "#3B82F6", fontWeight: 600, textDecoration: "none" }}>Home</a>
              <span style={{ color: "#93C5FD" }}>›</span>
              <a href="#" style={{ color: "#3B82F6", fontWeight: 600, textDecoration: "none" }}>Dashboard</a>
              <span style={{ color: "#93C5FD" }}>›</span>
              <span style={{ color: "#1E3A5F", fontWeight: 600 }}>
                {viewMode === "location" ? "Persons From Your Location" : "All Employees"}
              </span>
            </div>

            <style>{`
              @media(min-width:768px){
                #hdr-divider{display:block!important;}
                #breadcrumb{display:flex!important;}
              }
            `}</style>

            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              <button onClick={() => navigate("/postjob")} style={{
                background: "linear-gradient(135deg,#2563EB,#1D4ED8)", color: "#fff",
                border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 700,
                cursor: "pointer", boxShadow: "0 4px 12px rgba(37,99,235,0.3)", whiteSpace: "nowrap",
              }}>
                + Post Job
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(220,252,231,0.7)", border: "1px solid #86EFAC", padding: "4px 10px 4px 7px", borderRadius: 99, boxShadow: "0 1px 6px rgba(34,197,94,0.12)" }}>
                <div style={{ position: "relative", width: 10, height: 10, flexShrink: 0 }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#22C55E", animation: "livePulse 1.6s ease-out infinite" }} />
                  <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#22C55E", animation: "livePulse 1.6s ease-out infinite 0.5s" }} />
                  <div style={{ position: "absolute", inset: "2px", borderRadius: "50%", background: "#16A34A", boxShadow: "0 0 4px rgba(22,163,74,0.6)" }} />
                </div>
                <span style={{ fontSize: 10, color: "#15803D", fontWeight: 800, letterSpacing: "0.1em" }}>LIVE</span>
              </div>
              {/* Mobile nav toggle */}
              <button
                onClick={() => setNavOpen(o => !o)}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, background: "#EFF6FF", border: "1.5px solid #BFDBFE", borderRadius: 9, cursor: "pointer" }}
                id="nav-toggle"
              >
                <Menu style={{ width: 16, height: 16, color: "#2563EB" }} />
              </button>
            </div>
          </div>

          {/* ── MOBILE NAV DROPDOWN ── */}
          {navOpen && (
            <div style={{ borderTop: "1px solid #DBEAFE", background: "rgba(255,255,255,0.97)", padding: "8px 16px 10px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {NAV.map((lk, i) => (
                  <a key={i} href="#" style={{ padding: "6px 12px", fontSize: 10.5, fontWeight: 700, color: "#3B82F6", letterSpacing: "0.06em", textDecoration: "none", borderRadius: 8, textTransform: "uppercase", transition: "all 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#DBEAFE"; e.currentTarget.style.color = "#1D4ED8"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#3B82F6"; }}>
                    {lk}
                  </a>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* ── DESKTOP NAV BAR ── */}
        <nav id="desktop-nav" style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: "1px solid #DBEAFE", display: "none" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "5px 28px", display: "flex", flexWrap: "wrap", gap: 2 }}>
            {NAV.map((lk, i) => (
              <a key={i} href="#" style={{ padding: "6px 13px", fontSize: 10.5, fontWeight: 700, color: "#3B82F6", letterSpacing: "0.06em", textDecoration: "none", borderRadius: 8, textTransform: "uppercase", transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#DBEAFE"; e.currentTarget.style.color = "#1D4ED8"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#3B82F6"; }}>
                {lk}
              </a>
            ))}
          </div>
        </nav>
        <style>{`@media(min-width:768px){#desktop-nav{display:block!important;}#nav-toggle{display:none!important;}}`}</style>

        {/* ── EMPLOYER INFO BAR ── */}
        <EmployerInfoBar employer={employer} onLogout={handleLogout} />

        {/* ── SELECTION BAR ── */}
        <SelectionBar
          count={selected.size}
          onClear={clearSel}
          onExportSelected={exportSelected}
          onDeleteSelected={deleteSelected}
          onPayForData={handlePayForData}
        />

        {/* ── MAIN ── */}
        <main style={{ maxWidth: 1400, margin: "0 auto", padding: "18px 16px 40px" }}>

          {/* ── VIEW MODE TOGGLE + CONTEXT BADGE ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
            <ViewModeToggle
              mode={viewMode}
              onChange={handleViewModeChange}
              locationCount={locationData.length}
              allCount={allData.length}
              loadingAll={loadingAll}
            />
            <div style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "5px 12px", borderRadius: 99,
              background: viewMode === "all" ? "rgba(237,233,254,0.8)" : "rgba(219,234,254,0.8)",
              border: `1.5px solid ${viewMode === "all" ? "#DDD6FE" : "#BFDBFE"}`,
              fontSize: 11, fontWeight: 700,
              color: viewMode === "all" ? "#6D28D9" : "#1D4ED8",
              maxWidth: "100%",
            }}>
              {viewMode === "all"
                ? <><Globe style={{ width: 12, height: 12, flexShrink: 0 }} /><span>Showing all employees across all locations</span></>
                : <><MapPin style={{ width: 12, height: 12, flexShrink: 0 }} /><span>Showing employees matching your pin code</span></>
              }
            </div>
          </div>

          {/* ── STAT CARDS ── */}
          <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
            <StatCard icon={Users}       iconBg={accentLight}  iconCol={accentText} val={loading ? "…" : data.length} label="Total Persons"  />
            <StatCard icon={Briefcase}   iconBg="#D1FAE5" iconCol="#059669" val={loading ? "…" : avgExp + "y"} label="Avg Experience" />
            <StatCard icon={Lightbulb}   iconBg="#EDE9FE" iconCol="#7C3AED" val={loading ? "…" : fields}      label="Fields Covered" />
            <StatCard icon={Award}       iconBg="#FEF3C7" iconCol="#D97706" val={loading ? "…" : quals}       label="Qualifications" />
            {selected.size > 0 && (
              <StatCard icon={CheckSquare} iconBg="#DCFCE7" iconCol="#16A34A" val={selected.size} label="Selected" />
            )}
          </div>

          {/* ── TOOLBAR ── */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: accentGrad, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 12px ${viewMode === "all" ? "rgba(109,40,217,0.30)" : "rgba(37,99,235,0.30)"}` }}>
                {viewMode === "all"
                  ? <Globe style={{ width: 17, height: 17, color: "#fff" }} />
                  : <Users style={{ width: 17, height: 17, color: "#fff" }} />
                }
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#1E3A5F", letterSpacing: "-0.3px" }}>
                  {viewMode === "all" ? "All Employees" : "List of Persons"}
                </p>
                <p style={{ margin: 0, fontSize: 11, color: "#64748B" }}>
                  {loading ? "Loading…" : `${filtered.length} person${filtered.length !== 1 ? "s" : ""} found`}
                </p>
              </div>
            </div>

            {/* Qual pills — scrollable on mobile */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", flex: 1, minWidth: 0 }}>
              {qualOptions.map(q => {
                const active = qual === q;
                return (
                  <button key={q} onClick={() => onQual(q)} style={{
                    padding: "5px 12px", fontSize: 11, fontWeight: 600, borderRadius: 99, cursor: "pointer", border: "1.5px solid", transition: "all 0.15s", whiteSpace: "nowrap",
                    background: active ? accentGrad : `${accentLight}B2`,
                    color:       active ? "#fff" : accentText,
                    borderColor: active ? accentText : accentBorder,
                    boxShadow:   active ? `0 3px 10px ${viewMode === "all" ? "rgba(109,40,217,0.30)" : "rgba(37,99,235,0.30)"}` : "none",
                  }}>{q}</button>
                );
              })}
            </div>

            {/* Search + Export row */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", flexWrap: "wrap" }}>
              <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
                <Search style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 13, height: 13, color: "#93C5FD" }} />
                <input
                  type="text"
                  placeholder="Search name, field, qualification…"
                  value={search}
                  onChange={e => onSearch(e.target.value)}
                  style={{ width: "100%", paddingLeft: 30, paddingRight: search ? 30 : 14, paddingTop: 9, paddingBottom: 9, fontSize: 12, background: "rgba(255,255,255,0.90)", border: "1.5px solid #BFDBFE", borderRadius: 11, outline: "none", color: "#1E3A5F", boxSizing: "border-box", transition: "all 0.2s" }}
                  onFocus={e => { e.target.style.borderColor = accentText; e.target.style.boxShadow = `0 0 0 3px ${viewMode === "all" ? "rgba(109,40,217,0.15)" : "rgba(59,130,246,0.15)"}`; }}
                  onBlur={e => { e.target.style.borderColor = "#BFDBFE"; e.target.style.boxShadow = "none"; }}
                />
                {search && (
                  <button onClick={() => onSearch("")} style={{ position: "absolute", right: 9, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#93C5FD", display: "flex", padding: 0 }}>
                    <X style={{ width: 13, height: 13 }} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── TABLE CARD ── */}
          <div style={{ borderRadius: 18, overflow: "hidden", background: "#fff", border: `1px solid ${accentBorder}`, boxShadow: cardShadow }}>

            {viewMode === "all" && !loading && !error && (
              <div style={{
                background: "linear-gradient(90deg,rgba(237,233,254,0.9),rgba(245,243,255,0.9))",
                borderBottom: "1.5px solid #DDD6FE",
                padding: "8px 16px",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <Globe style={{ width: 13, height: 13, color: "#7C3AED", flexShrink: 0 }} />
                <span style={{ fontSize: 11.5, fontWeight: 600, color: "#6D28D9" }}>
                  Viewing all <strong>{allData.length}</strong> employees across all locations.
                  Contact details are only visible for records you have unlocked.
                </span>
              </div>
            )}

            <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
                <thead>
                  <tr style={{ background: accentLight, borderBottom: `1.5px solid ${accentBorder}` }}>
                    <th style={{ width: 44, padding: "12px 8px 12px 14px", textAlign: "center" }}>
                      <Checkbox checked={allPageSel} indeterminate={someSel} onChange={togglePage} />
                    </th>
                    {COLS.map(c => (
                      <th key={c.lbl}
                        onClick={c.k ? () => flip(c.k as keyof Student) : undefined}
                        style={{ width: c.w, padding: "12px 12px", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: sortK === c.k ? accentText : "#3B82F6", textAlign: "left", cursor: c.k ? "pointer" : "default", userSelect: "none", whiteSpace: "nowrap", transition: "all 0.15s" }}
                        onMouseEnter={e => { if (c.k) { e.currentTarget.style.background = accentBorder; e.currentTarget.style.color = accentText; } }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = sortK === c.k ? accentText : "#3B82F6"; }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          {c.lbl}
                          {c.k && <SortIcon on={sortK === c.k} dir={sortD} />}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <LoadingState />
                  ) : error ? (
                    <ErrorState message={error} onRetry={viewMode === "location" ? fetchLocationData : fetchAllData} />
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan={9} style={{ padding: "60px 20px", textAlign: "center" }}>
                      <Search style={{ width: 40, height: 40, color: "#BFDBFE", display: "block", margin: "0 auto 12px" }} />
                      <p style={{ fontSize: 13, color: "#94A3B8" }}>No persons found matching your search.</p>
                    </td></tr>
                  ) : pad.map((row, i) => {
                    const even = i % 2 === 0;
                    if (!row) return (
                      <tr key={`pad${i}`} style={{ height: 54, background: even ? "#fff" : "#F8FBFF", borderBottom: "1px solid #F0F7FF" }}>
                        <td colSpan={9} />
                      </tr>
                    );
                    const idx        = sp * PAGE_SZ + i;
                    const av         = AVATARS[row.id % AVATARS.length];
                    const qm         = QUALS_META[row.qual] ?? { bg: "#F8FAFC", col: "#64748B", border: "#CBD5E1" };
                    const FieldI     = FIELD_ICONS[row.field] ?? Lightbulb;
                    const pct        = Math.round((row.exp / MAX_EXP) * 100);
                    const isSel      = selected.has(row.id);
                    const isUnlocked = row.isUnlocked;

                    return (
                      <tr key={row.id} style={{
                        height: 54, borderBottom: "1px solid #EFF6FF", cursor: "pointer", transition: "background 0.12s",
                        background: isSel ? `${accentLight}80` : even ? "#fff" : "#F8FBFF",
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = isSel ? `${accentLight}AA` : accentLight}
                        onMouseLeave={e => e.currentTarget.style.background = isSel ? `${accentLight}80` : even ? "#fff" : "#F8FBFF"}>

                        <td style={{ padding: "0 8px 0 14px", textAlign: "center", verticalAlign: "middle" }}>
                          <Checkbox checked={isSel} onChange={() => toggleRow(row.id)} />
                        </td>

                        {/* S.No */}
                        <td style={{ padding: "0 12px", verticalAlign: "middle", width: "52px" }}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: "#93C5FD" }}>{idx + 1}</span>
                            {isUnlocked && (
                              <span style={{ fontSize: 8, fontWeight: 800, color: "#16A34A", background: "#DCFCE7", border: "1px solid #BBF7D0", borderRadius: 4, padding: "1px 3px", letterSpacing: "0.04em" }}>
                                ✓ OPEN
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Name */}
                        <td style={{ padding: "0 12px", verticalAlign: "middle" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 9, background: av.bg, color: av.col, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                              {initials(row.name)}
                            </div>
                            <span style={{ fontSize: 12.5, fontWeight: 600, color: "#1E3A5F", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 140 }}>{row.name}</span>
                          </div>
                        </td>

                        {/* Qualification */}
                        <td style={{ padding: "0 12px", verticalAlign: "middle" }}>
                          <span style={{ display: "inline-block", padding: "3px 9px", borderRadius: 99, fontSize: 10.5, fontWeight: 700, background: qm.bg, color: qm.col, border: `1.5px solid ${qm.border}`, whiteSpace: "nowrap" }}>
                            {row.qual}
                          </span>
                        </td>

                        {/* Experience */}
                        <td style={{ padding: "0 12px", verticalAlign: "middle" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                            <div style={{ height: 4, borderRadius: 99, background: "#DBEAFE", width: 70, overflow: "hidden", flexShrink: 0 }}>
                              <div style={{ height: "100%", borderRadius: 99, background: accentGrad, width: `${pct}%`, transition: "width 0.4s ease" }} />
                            </div>
                            <span style={{ fontSize: 11.5, color: "#64748B", whiteSpace: "nowrap" }}>{row.exp} yr{row.exp !== 1 ? "s" : ""}</span>
                          </div>
                        </td>

                        {/* Field */}
                        <td style={{ padding: "0 12px", verticalAlign: "middle" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 9px", borderRadius: 8, fontSize: 11, fontWeight: 600, background: accentLight, color: accentText, border: `1px solid ${accentBorder}`, whiteSpace: "nowrap" }}>
                            <FieldI style={{ width: 11, height: 11, flexShrink: 0 }} />{row.field}
                          </span>
                        </td>

                        {/* CV — uses blob download, no window.open */}
                        <td style={{ padding: "0 12px", verticalAlign: "middle" }}>
                          {isUnlocked ? (
                            <CVButton
                              studentId={row.id}
                              studentName={row.name}
                              accentLight={accentLight}
                              accentText={accentText}
                              accentBorder={accentBorder}
                            />
                          ) : (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 9, fontSize: 11, fontWeight: 700, color: "#94A3B8", background: "#F8FAFC", border: "1.5px solid #E2E8F0", whiteSpace: "nowrap" }}>
                              🔒 Locked
                            </span>
                          )}
                        </td>

                        {/* Phone */}
                        <td style={{ padding: "0 12px", verticalAlign: "middle" }}>
                          {isUnlocked ? (
                            <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: "#64748B", whiteSpace: "nowrap" }}>
                              <Phone style={{ width: 11, height: 11, color: "#93C5FD", flexShrink: 0 }} />
                              {row.phone}
                            </span>
                          ) : (
                            <span style={{ fontSize: 13, color: "#CBD5E1", letterSpacing: 3 }}>••••••••••</span>
                          )}
                        </td>

                        {/* Email */}
                        <td style={{ padding: "0 12px", verticalAlign: "middle" }}>
                          {isUnlocked ? (
                            <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: "#64748B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 170 }}>
                              <Mail style={{ width: 11, height: 11, color: "#93C5FD", flexShrink: 0 }} />
                              {row.email}
                            </span>
                          ) : (
                            <span style={{ fontSize: 13, color: "#CBD5E1", letterSpacing: 3 }}>••••••••••••••••</span>
                          )}
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ── PAGINATION ── */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: accentLight, borderTop: `1.5px solid ${accentBorder}`, flexWrap: "wrap", gap: 8 }}>
              <p style={{ margin: 0, fontSize: 11.5, color: "#64748B" }}>
                <span style={{ fontWeight: 700, color: accentText }}>{filtered.length === 0 ? 0 : sp * PAGE_SZ + 1}–{Math.min((sp + 1) * PAGE_SZ, filtered.length)}</span>
                {" of "}
                <span style={{ fontWeight: 700, color: "#334155" }}>{filtered.length}</span>
                {selected.size > 0 && <span style={{ marginLeft: 10, fontWeight: 700, color: "#16A34A" }}>· {selected.size} selected</span>}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                <button disabled={sp === 0} onClick={() => setPage(p => p - 1)}
                  style={{ width: 30, height: 30, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", background: sp === 0 ? "#F1F5F9" : "#fff", border: "1.5px solid", borderColor: sp === 0 ? "#E2E8F0" : accentBorder, cursor: sp === 0 ? "not-allowed" : "pointer", opacity: sp === 0 ? 0.4 : 1, transition: "all 0.15s" }}
                  onMouseEnter={e => sp !== 0 && (e.currentTarget.style.background = accentLight)}
                  onMouseLeave={e => { e.currentTarget.style.background = sp === 0 ? "#F1F5F9" : "#fff"; }}>
                  <ChevronLeft style={{ width: 14, height: 14, color: accentText }} />
                </button>
                {Array.from({ length: totPg }, (_, n) => (
                  <button key={n} onClick={() => setPage(n)} style={{ width: 30, height: 30, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s", background: n === sp ? accentGrad : "#fff", border: n === sp ? `1.5px solid ${accentText}` : `1.5px solid ${accentBorder}`, color: n === sp ? "#fff" : accentText, boxShadow: n === sp ? `0 3px 10px ${viewMode === "all" ? "rgba(109,40,217,0.35)" : "rgba(37,99,235,0.35)"}` : "0 1px 3px rgba(37,99,235,0.08)" }}>
                    {n + 1}
                  </button>
                ))}
                <button disabled={sp >= totPg - 1} onClick={() => setPage(p => p + 1)}
                  style={{ width: 30, height: 30, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", background: sp >= totPg - 1 ? "#F1F5F9" : "#fff", border: "1.5px solid", borderColor: sp >= totPg - 1 ? "#E2E8F0" : accentBorder, cursor: sp >= totPg - 1 ? "not-allowed" : "pointer", opacity: sp >= totPg - 1 ? 0.4 : 1, transition: "all 0.15s" }}
                  onMouseEnter={e => sp < totPg - 1 && (e.currentTarget.style.background = accentLight)}
                  onMouseLeave={e => { e.currentTarget.style.background = sp >= totPg - 1 ? "#F1F5F9" : "#fff"; }}>
                  <ChevronRight style={{ width: 14, height: 14, color: accentText }} />
                </button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}