// // import { useState, useRef, useEffect, useCallback } from "react";
// // import { Mail, ChevronRight } from "lucide-react";

// // const navLinks = [
// //   "HOME", "ABOUT US", "AUTHORISED HRS", "CORE COMMITTEE",
// //   "SERVICES", "PROJECTS", "ASSOCIATES", "GALLERY", "CONTACT US"
// // ];

// // const topTabs = [
// //   "PG & Degree Colleges (MBA/ BBA/BBM/B.com)",
// //   "Industrial Associates",
// //   "Entrepreneur Sources",
// //   "Entrepreneur Sources"
// // ];

// // const jobData = [
// //   { org: "Hospitals", vacancies: 25, jobType: "Medical / Admin Staff" },
// //   { org: "Schools", vacancies: 12, jobType: "Teaching / Admin" },
// //   { org: "Colleges", vacancies: 19, jobType: "Faculty / Admin" },
// //   { org: "IT Industry", vacancies: 124, jobType: "Software / Support Eng." },
// //   { org: "Hardware Industry", vacancies: 22, jobType: "Technician / Engineer" },
// //   { org: "Service Sector", vacancies: 232, jobType: "Customer Support / Ops" },
// //   { org: "Banks", vacancies: 34, jobType: "HR Manager / Executive" },
// // ];

// // const PAGE_SIZE = 4;

// // function JobGrid() {
// //   const [filterText, setFilterText] = useState("");
// //   const [currentPage, setCurrentPage] = useState(0);
// //   const [sortConfig, setSortConfig] = useState({ key: null, dir: "asc" });

// //   const filtered = jobData.filter((r) => {
// //     const q = filterText.toLowerCase();
// //     return (
// //       r.org.toLowerCase().includes(q) ||
// //       r.jobType.toLowerCase().includes(q) ||
// //       String(r.vacancies).includes(q)
// //     );
// //   });

// //   const sorted = [...filtered].sort((a, b) => {
// //     if (!sortConfig.key) return 0;
// //     const valA = a[sortConfig.key];
// //     const valB = b[sortConfig.key];
// //     if (typeof valA === "number") {
// //       return sortConfig.dir === "asc" ? valA - valB : valB - valA;
// //     }
// //     return sortConfig.dir === "asc"
// //       ? String(valA).localeCompare(String(valB))
// //       : String(valB).localeCompare(String(valA));
// //   });

// //   const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
// //   const paginated = sorted.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

// //   const handleSort = (key) => {
// //     setSortConfig((prev) =>
// //       prev.key === key
// //         ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
// //         : { key, dir: "asc" }
// //     );
// //     setCurrentPage(0);
// //   };

// //   const SortIcon = ({ col }) => {
// //     if (sortConfig.key !== col) return <span className="text-gray-300 ml-1">⇅</span>;
// //     return <span className="ml-1">{sortConfig.dir === "asc" ? "↑" : "↓"}</span>;
// //   };

// //   return (
// //     <div className="border border-border rounded">
// //       <h3 className="text-destructive font-bold px-3 pt-3 pb-1 text-sm">
// //         Search for JOB
// //       </h3>
// //       <div className="m-2">
// //         {/* Quick filter */}
// //         <div className="flex items-center gap-2 mb-2">
// //           <input
// //             type="text"
// //             placeholder="Search..."
// //             value={filterText}
// //             onChange={(e) => {
// //               setFilterText(e.target.value);
// //               setCurrentPage(0);
// //             }}
// //             className="w-full px-2 py-1 text-xs border border-border rounded bg-card focus:outline-none focus:ring-1 focus:ring-primary"
// //           />
// //           {filterText && (
// //             <button
// //               onClick={() => { setFilterText(""); setCurrentPage(0); }}
// //               className="text-xs text-muted-foreground hover:text-foreground"
// //             >
// //               ✕
// //             </button>
// //           )}
// //         </div>

// //         {/* AG-style grid table */}
// //         <div className="border border-border rounded overflow-hidden text-xs">
// //           {/* Header */}
// //           <div className="grid grid-cols-[2fr_1fr_2fr] bg-[hsl(210,40%,88%)] font-bold text-foreground border-b border-border">
// //             {[
// //               { label: "Organization Type", key: "org" },
// //               { label: "Vacancies", key: "vacancies" },
// //               { label: "Type / Nature of Job", key: "jobType" },
// //             ].map((col) => (
// //               <button
// //                 key={col.key}
// //                 onClick={() => handleSort(col.key)}
// //                 className="px-2 py-2 text-left hover:bg-[hsl(210,40%,82%)] border-r last:border-r-0 border-border flex items-center gap-1 w-full"
// //               >
// //                 {col.label}
// //                 <SortIcon col={col.key} />
// //               </button>
// //             ))}
// //           </div>

// //           {/* Rows */}
// //           {paginated.length === 0 ? (
// //             <div className="text-center text-muted-foreground py-6 text-xs">
// //               No results found.
// //             </div>
// //           ) : (
// //             paginated.map((row, i) => (
// //               <div
// //                 key={i}
// //                 className="grid grid-cols-[2fr_1fr_2fr] border-b last:border-b-0 border-border bg-[hsl(80,40%,88%)] hover:bg-[hsl(80,40%,82%)] transition-colors"
// //               >
// //                 <div className="px-2 py-2 border-r border-border font-medium truncate">
// //                   {row.org}
// //                 </div>
// //                 <div className="px-2 py-2 border-r border-border text-center">
// //                   <span className="bg-blue-100 text-blue-800 font-semibold rounded-full px-2 py-0.5 text-[11px]">
// //                     {row.vacancies}
// //                   </span>
// //                 </div>
// //                 <div className="px-2 py-2 text-muted-foreground truncate">
// //                   {row.jobType}
// //                 </div>
// //               </div>
// //             ))
// //           )}
// //         </div>

// //         {/* Pagination */}
// //         <div className="flex items-center justify-between mt-2">
// //           <div className="flex gap-1">
// //             <button
// //               disabled={currentPage === 0}
// //               onClick={() => setCurrentPage((p) => p - 1)}
// //               className="px-2 py-0.5 text-xs border border-border rounded disabled:opacity-40 hover:bg-accent"
// //             >
// //               ‹ Prev
// //             </button>
// //             <button
// //               disabled={currentPage >= totalPages - 1}
// //               onClick={() => setCurrentPage((p) => p + 1)}
// //               className="px-2 py-0.5 text-xs border border-border rounded disabled:opacity-40 hover:bg-accent"
// //             >
// //               Next ›
// //             </button>
// //           </div>
// //           <span className="text-[11px] text-muted-foreground">
// //             Page {currentPage + 1} of {totalPages} · {sorted.length} rows
// //           </span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // const Index = () => {
// //   const [hrId, setHrId] = useState("");
// //   const [hrPass, setHrPass] = useState("");
// //   const [empId, setEmpId] = useState("");
// //   const [empPass, setEmpPass] = useState("");

// //   return (
// //     <div className="min-h-screen bg-background">
// //       {/* Top Header */}
// //       <div className="bg-gradient-to-b from-[hsl(210,50%,92%)] to-[hsl(210,50%,85%)] border-b-2 border-primary">
// //         <div className="max-w-6xl mx-auto flex items-center gap-3 py-3 px-4">
// //           <div className="flex items-center gap-2 shrink-0">
// //             <div className="w-14 h-14 rounded-full border-2 border-muted-foreground flex items-center justify-center bg-card">
// //               <span className="text-primary font-bold text-lg italic">HR</span>
// //             </div>
// //           </div>
// //           <div className="flex flex-wrap gap-2">
// //             {topTabs.map((tab, i) => (
// //               <button
// //                 key={i}
// //                 className="px-3 py-1.5 border border-border bg-card hover:bg-accent text-sm text-primary font-semibold underline rounded"
// //               >
// //                 {tab}
// //               </button>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Navigation Bar */}
// //       <nav className="bg-gradient-to-r from-[hsl(210,70%,55%)] to-[hsl(210,70%,45%)] text-primary-foreground">
// //         <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-1 px-4 py-1.5">
// //           {navLinks.map((link, i) => (
// //             <a
// //               key={i}
// //               href="#"
// //               className="px-2 py-0.5 text-xs font-bold tracking-wide hover:underline uppercase"
// //             >
// //               {link}
// //               {i < navLinks.length - 1 && <span className="ml-2">:</span>}
// //             </a>
// //           ))}
// //         </div>
// //       </nav>

// //       {/* Main Content - 1:1:3 columns */}
// //       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1fr_3fr] gap-4 p-4">
// //         {/* Authorised HR Login */}
// //         <div className="border border-border rounded">
// //           <h3 className="text-primary font-bold underline px-3 pt-3 pb-1 text-sm">
// //             Authorised HR Login
// //           </h3>
// //           <div className="bg-[hsl(20,40%,90%)] m-2 rounded p-3 min-h-[280px] flex flex-col justify-between">
// //             <div>
// //               <p className="text-xs text-foreground mb-3">
// //                 ID No:...... Password:.........
// //               </p>
// //               <input
// //                 type="text"
// //                 placeholder="ID No"
// //                 value={hrId}
// //                 onChange={(e) => setHrId(e.target.value)}
// //                 className="w-full mb-2 px-2 py-1 text-sm border border-border rounded bg-card"
// //               />
// //               <input
// //                 type="password"
// //                 placeholder="Password"
// //                 value={hrPass}
// //                 onChange={(e) => setHrPass(e.target.value)}
// //                 className="w-full mb-2 px-2 py-1 text-sm border border-border rounded bg-card"
// //               />
// //               <button className="px-4 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90">
// //                 Login
// //               </button>
// //             </div>
// //             <p className="text-xs text-foreground mt-4">
// //               Declaration Form*: and Security insurance ECS
// //             </p>
// //           </div>
// //         </div>

// //         {/* Employer Login */}
// //         <div className="border border-border rounded">
// //           <h3 className="font-bold px-3 pt-3 pb-1 text-sm text-foreground">
// //             Employer Login for Staff Requirement:
// //           </h3>
// //           <div className="bg-[hsl(140,30%,92%)] m-2 rounded p-3 min-h-[280px] flex flex-col justify-between">
// //             <div>
// //               <p className="text-xs text-foreground mb-3">
// //                 ID No:...... Password:.........
// //               </p>
// //               <input
// //                 type="text"
// //                 placeholder="ID No"
// //                 value={empId}
// //                 onChange={(e) => setEmpId(e.target.value)}
// //                 className="w-full mb-2 px-2 py-1 text-sm border border-border rounded bg-card"
// //               />
// //               <input
// //                 type="password"
// //                 placeholder="Password"
// //                 value={empPass}
// //                 onChange={(e) => setEmpPass(e.target.value)}
// //                 className="w-full mb-2 px-2 py-1 text-sm border border-border rounded bg-card"
// //               />
// //               <button className="px-4 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90">
// //                 Login
// //               </button>
// //             </div>
// //             <div className="mt-4">
// //               <p className="text-sm text-foreground">Organization Profile</p>
// //               <p className="text-xs text-foreground mt-2">Terms & conditions apply**:</p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Search for JOB — AG Grid */}
// //         <JobGrid />
// //       </div>

// //       {/* Bottom Bar */}
// //       <div className="max-w-6xl mx-auto px-4 pb-4">
// //         <div className="border-t-2 border-primary pt-3">
// //           <div className="flex flex-wrap items-center justify-between gap-4">
// //             <div>
// //               <p className="text-xs font-bold italic text-foreground mb-1">
// //                 Qualification wise data folders
// //               </p>
// //               <div className="flex gap-3 items-center">
// //                 {["SSC", "ITI", "Diploma", "Intermediate", "Degree", "PG"].map((item, i) => (
// //                   <div key={i} className="flex flex-col items-center">
// //                     <Mail className="w-14 h-14 text-orange-500" fill="orange" strokeWidth={1.5} />
// //                     <span className="text-[10px] font-bold text-foreground mt-1">{item}</span>
// //                   </div>
// //                 ))}
// //                 <ChevronRight className="w-10 h-10 text-pink-500 self-start mt-1" />
// //               </div>
// //             </div>
// //             <a href="#" className="text-sm font-bold text-foreground hover:underline">
// //               HR login for New Membership &gt;&gt;&gt;
// //             </a>
// //             <a href="#" className="text-sm font-bold text-foreground hover:underline">
// //               Admin Login &gt;&gt;&gt;
// //             </a>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Index;









// // import { useState } from "react";
// // import {
// //   Mail, ChevronRight, Search, X, ChevronUp, ChevronDown,
// //   ChevronsUpDown, LogIn, Briefcase, Building2, GraduationCap,
// //   ArrowRight, Users, Shield, ChevronLeft
// // } from "lucide-react";

// // /* ─────────────────────────── DATA ─────────────────────────── */

// // const navLinks = [
// //   "Home", "About Us", "Authorised HRs", "Core Committee",
// //   "Services", "Projects", "Associates", "Gallery", "Contact Us",
// // ];

// // const topTabs = [
// //   "PG & Degree Colleges",
// //   "Industrial Associates",
// //   "Entrepreneur Sources",
// //   "Entrepreneur Network",
// // ];

// // const jobData = [
// //   { org: "Hospitals",        vacancies: 25,  jobType: "Medical / Admin Staff"     },
// //   { org: "Schools",          vacancies: 12,  jobType: "Teaching / Admin"           },
// //   { org: "Colleges",         vacancies: 19,  jobType: "Faculty / Admin"            },
// //   { org: "IT Industry",      vacancies: 124, jobType: "Software / Support Eng."    },
// //   { org: "Hardware Industry",vacancies: 22,  jobType: "Technician / Engineer"      },
// //   { org: "Service Sector",   vacancies: 232, jobType: "Customer Support / Ops"     },
// //   { org: "Banks",            vacancies: 34,  jobType: "HR Manager / Executive"     },
// // ];

// // const qualifications = ["SSC", "ITI", "Diploma", "Intermediate", "Degree", "PG"];

// // /* ─────────────────────────── PALETTE ──────────────────────── */
// // /*  Background : #F0F4FF (very light lavender-blue)
// //     Surface    : #FFFFFF
// //     Primary    : #6366F1 (indigo-500)  — HR card accent
// //     Secondary  : #10B981 (emerald-500) — Employer card accent
// //     Nav        : #EEF2FF (indigo-50 tint)
// //     Border     : #E2E8F0 (slate-200)
// //     Text-main  : #1E293B (slate-800)
// //     Text-muted : #64748B (slate-500)
// //     Badge hi   : #ECFDF5 / #065F46
// //     Badge mid  : #EFF6FF / #1E40AF
// //     Badge low  : #F1F5F9 / #475569            */

// // const ROW_HEIGHT  = 52;   // px per data row
// // const PAGE_SIZE   = 5;    // rows per page
// // const TABLE_H     = ROW_HEIGHT * PAGE_SIZE; // 260 px — fixed body height

// // /* ─────────────────────── VACANCY BADGE ────────────────────── */
// // const vacancyStyle = (n) => {
// //   if (n >= 100) return { pill: "bg-emerald-50 text-emerald-700 border border-emerald-200", bar: "#10B981" };
// //   if (n >=  30) return { pill: "bg-blue-50   text-blue-700   border border-blue-200",     bar: "#3B82F6" };
// //   return              { pill: "bg-slate-100  text-slate-600  border border-slate-200",    bar: "#94A3B8" };
// // };

// // /* ─────────────────────── SORT ICON ────────────────────────── */
// // function SortIcon({ active, dir }) {
// //   if (!active) return <ChevronsUpDown className="w-3 h-3 text-slate-300 shrink-0" />;
// //   return dir === "asc"
// //     ? <ChevronUp   className="w-3 h-3 text-violet-500 shrink-0" />
// //     : <ChevronDown className="w-3 h-3 text-violet-500 shrink-0" />;
// // }

// // /* ──────────────────────── JOB GRID ────────────────────────── */
// // function JobGrid() {
// //   const [q,    setQ]    = useState("");
// //   const [page, setPage] = useState(0);
// //   const [sort, setSort] = useState({ key: null, dir: "asc" });

// //   const filtered = jobData.filter((r) => {
// //     const lq = q.toLowerCase();
// //     return r.org.toLowerCase().includes(lq)
// //         || r.jobType.toLowerCase().includes(lq)
// //         || String(r.vacancies).includes(lq);
// //   });

// //   const sorted = [...filtered].sort((a, b) => {
// //     if (!sort.key) return 0;
// //     const A = a[sort.key], B = b[sort.key];
// //     if (typeof A === "number") return sort.dir === "asc" ? A - B : B - A;
// //     return sort.dir === "asc"
// //       ? String(A).localeCompare(String(B))
// //       : String(B).localeCompare(String(A));
// //   });

// //   const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
// //   const safeP      = Math.min(page, totalPages - 1);
// //   const rows       = sorted.slice(safeP * PAGE_SIZE, (safeP + 1) * PAGE_SIZE);
// //   // Pad rows so table height stays fixed
// //   const padded     = [...rows, ...Array(PAGE_SIZE - rows.length).fill(null)];
// //   const maxV       = Math.max(...jobData.map((d) => d.vacancies));

// //   const handleSort = (key) => {
// //     setSort((p) => p.key === key ? { key, dir: p.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" });
// //     setPage(0);
// //   };

// //   const cols = [
// //     { label: "Organization",   key: "org",       w: "40%" },
// //     { label: "Openings",       key: "vacancies", w: "20%" },
// //     { label: "Role Category",  key: "jobType",   w: "40%" },
// //   ];

// //   /* page numbers */
// //   const pageNums = Array.from({ length: totalPages }, (_, i) => i);

// //   return (
// //     <div
// //       className="flex flex-col rounded-2xl overflow-hidden"
// //       style={{
// //         background: "#FFFFFF",
// //         border: "1px solid #E2E8F0",
// //         boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(99,102,241,0.07)",
// //       }}
// //     >
// //       {/* ── Card top bar ── */}
// //       <div
// //         className="flex items-center justify-between px-5 py-4"
// //         style={{ borderBottom: "1px solid #F1F5F9", background: "#FAFBFF" }}
// //       >
// //         <div className="flex items-center gap-3">
// //           <div
// //             className="w-9 h-9 rounded-xl flex items-center justify-center"
// //             style={{ background: "linear-gradient(135deg,#818CF8,#6366F1)" }}
// //           >
// //             <Briefcase className="w-4 h-4 text-white" />
// //           </div>
// //           <div>
// //             <p className="font-semibold text-sm" style={{ color: "#1E293B" }}>Job Listings</p>
// //             <p className="text-xs" style={{ color: "#94A3B8" }}>{filtered.length} positions available</p>
// //           </div>
// //         </div>

// //         {/* Search */}
// //         <div className="relative" style={{ width: 240 }}>
// //           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "#94A3B8" }} />
// //           <input
// //             type="text"
// //             placeholder="Search roles…"
// //             value={q}
// //             onChange={(e) => { setQ(e.target.value); setPage(0); }}
// //             style={{
// //               width: "100%", paddingLeft: 32, paddingRight: q ? 28 : 12,
// //               paddingTop: 7, paddingBottom: 7,
// //               fontSize: 13, background: "#F8FAFC",
// //               border: "1px solid #E2E8F0", borderRadius: 10,
// //               outline: "none", color: "#1E293B",
// //             }}
// //             onFocus={(e) => { e.target.style.borderColor = "#818CF8"; e.target.style.boxShadow = "0 0 0 3px rgba(129,140,248,0.15)"; }}
// //             onBlur={(e)  => { e.target.style.borderColor = "#E2E8F0"; e.target.style.boxShadow = "none"; }}
// //           />
// //           {q && (
// //             <button
// //               onClick={() => { setQ(""); setPage(0); }}
// //               className="absolute right-2.5 top-1/2 -translate-y-1/2"
// //               style={{ color: "#94A3B8", lineHeight: 1 }}
// //             >
// //               <X className="w-3.5 h-3.5" />
// //             </button>
// //           )}
// //         </div>
// //       </div>

// //       {/* ── Table header ── */}
// //       <div className="flex" style={{ background: "#F8F9FF", borderBottom: "1px solid #E2E8F0" }}>
// //         {cols.map((col) => (
// //           <button
// //             key={col.key}
// //             onClick={() => handleSort(col.key)}
// //             style={{ width: col.w, textAlign: "left" }}
// //             className="flex items-center gap-1.5 px-4 py-3 text-left transition-colors"
// //             onMouseEnter={(e) => e.currentTarget.style.background = "#EEF2FF"}
// //             onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
// //           >
// //             <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", color: "#64748B", textTransform: "uppercase" }}>
// //               {col.label}
// //             </span>
// //             <SortIcon active={sort.key === col.key} dir={sort.dir} />
// //           </button>
// //         ))}
// //       </div>

// //       {/* ── Fixed-height table body ── */}
// //       <div style={{ height: TABLE_H, overflow: "hidden" }}>
// //         {padded.map((row, i) =>
// //           row === null ? (
// //             /* Empty padding row */
// //             <div
// //               key={`pad-${i}`}
// //               className="flex"
// //               style={{ height: ROW_HEIGHT, borderBottom: "1px solid #F8FAFC", background: i % 2 === 0 ? "#FEFEFE" : "#FAFBFF" }}
// //             />
// //           ) : (
// //             /* Data row */
// //             <div
// //               key={i}
// //               className="flex items-center transition-colors cursor-pointer group"
// //               style={{
// //                 height: ROW_HEIGHT,
// //                 borderBottom: "1px solid #F1F5F9",
// //                 background: i % 2 === 0 ? "#FFFFFF" : "#FAFBFF",
// //               }}
// //               onMouseEnter={(e) => e.currentTarget.style.background = "#F0F4FF"}
// //               onMouseLeave={(e) => e.currentTarget.style.background = i % 2 === 0 ? "#FFFFFF" : "#FAFBFF"}
// //             >
// //               {/* Org */}
// //               <div className="flex items-center gap-2.5 px-4" style={{ width: "40%" }}>
// //                 <div
// //                   className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors"
// //                   style={{ background: "#EEF2FF" }}
// //                 >
// //                   <Building2 className="w-3.5 h-3.5" style={{ color: "#6366F1" }} />
// //                 </div>
// //                 <span className="truncate text-sm font-medium" style={{ color: "#1E293B" }}>{row.org}</span>
// //               </div>

// //               {/* Vacancies */}
// //               <div className="px-4 flex flex-col gap-1" style={{ width: "20%" }}>
// //                 <span
// //                   className={`text-xs font-semibold px-2.5 py-0.5 rounded-full inline-block w-fit ${vacancyStyle(row.vacancies).pill}`}
// //                 >
// //                   {row.vacancies}
// //                 </span>
// //                 <div style={{ height: 3, background: "#F1F5F9", borderRadius: 99, width: "80%" }}>
// //                   <div style={{
// //                     height: "100%", borderRadius: 99,
// //                     width: `${(row.vacancies / maxV) * 100}%`,
// //                     background: vacancyStyle(row.vacancies).bar,
// //                     transition: "width 0.3s ease",
// //                   }} />
// //                 </div>
// //               </div>

// //               {/* Job type */}
// //               <div className="px-4 flex items-center justify-between" style={{ width: "40%" }}>
// //                 <span className="truncate text-sm" style={{ color: "#64748B" }}>{row.jobType}</span>
// //                 <ArrowRight
// //                   className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ml-2"
// //                   style={{ color: "#6366F1" }}
// //                 />
// //               </div>
// //             </div>
// //           )
// //         )}
// //       </div>

// //       {/* ── Pagination ── */}
// //       <div
// //         className="flex items-center justify-between px-5 py-3"
// //         style={{ borderTop: "1px solid #F1F5F9", background: "#FAFBFF" }}
// //       >
// //         {/* Left: row info */}
// //         <p style={{ fontSize: 12, color: "#94A3B8" }}>
// //           Showing{" "}
// //           <span style={{ fontWeight: 600, color: "#475569" }}>
// //             {sorted.length === 0 ? 0 : safeP * PAGE_SIZE + 1}–{Math.min((safeP + 1) * PAGE_SIZE, sorted.length)}
// //           </span>{" "}
// //           of <span style={{ fontWeight: 600, color: "#475569" }}>{sorted.length}</span>
// //         </p>

// //         {/* Right: page controls */}
// //         <div className="flex items-center gap-1">
// //           <button
// //             disabled={safeP === 0}
// //             onClick={() => setPage((p) => p - 1)}
// //             className="flex items-center justify-center w-7 h-7 rounded-lg transition-colors disabled:opacity-30"
// //             style={{ border: "1px solid #E2E8F0", background: "#FFF" }}
// //             onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.background = "#EEF2FF")}
// //             onMouseLeave={(e) => e.currentTarget.style.background = "#FFF"}
// //           >
// //             <ChevronLeft className="w-3.5 h-3.5" style={{ color: "#475569" }} />
// //           </button>

// //           {pageNums.map((n) => (
// //             <button
// //               key={n}
// //               onClick={() => setPage(n)}
// //               className="flex items-center justify-center w-7 h-7 rounded-lg transition-all"
// //               style={{
// //                 fontSize: 12, fontWeight: 600,
// //                 border: n === safeP ? "1px solid #6366F1" : "1px solid #E2E8F0",
// //                 background: n === safeP ? "#6366F1" : "#FFF",
// //                 color: n === safeP ? "#FFF" : "#64748B",
// //               }}
// //             >
// //               {n + 1}
// //             </button>
// //           ))}

// //           <button
// //             disabled={safeP >= totalPages - 1}
// //             onClick={() => setPage((p) => p + 1)}
// //             className="flex items-center justify-center w-7 h-7 rounded-lg transition-colors disabled:opacity-30"
// //             style={{ border: "1px solid #E2E8F0", background: "#FFF" }}
// //             onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.background = "#EEF2FF")}
// //             onMouseLeave={(e) => e.currentTarget.style.background = "#FFF"}
// //           >
// //             <ChevronRight className="w-3.5 h-3.5" style={{ color: "#475569" }} />
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ──────────────────────── LOGIN CARD ──────────────────────── */
// // function LoginCard({ title, subtitle, iconColor, iconBg, btnColor, btnHover, footerText, fields }) {
// //   const [vals, setVals] = useState(fields.map(() => ""));

// //   return (
// //     <div
// //       className="rounded-2xl flex flex-col overflow-hidden"
// //       style={{
// //         background: "#FFFFFF",
// //         border: "1px solid #E2E8F0",
// //         boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)",
// //       }}
// //     >
// //       {/* Accent top strip */}
// //       <div style={{ height: 4, background: `linear-gradient(90deg, ${iconColor}, ${btnColor})` }} />

// //       <div className="p-5 flex flex-col gap-4 flex-1">
// //         {/* Header */}
// //         <div className="flex items-start gap-3">
// //           <div
// //             className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
// //             style={{ background: iconBg }}
// //           >
// //             <LogIn className="w-4.5 h-4.5" style={{ color: iconColor, width: 18, height: 18 }} />
// //           </div>
// //           <div>
// //             <p className="text-sm font-semibold" style={{ color: "#1E293B" }}>{title}</p>
// //             <p className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>{subtitle}</p>
// //           </div>
// //         </div>

// //         {/* Fields */}
// //         <div className="flex flex-col gap-2.5">
// //           {fields.map((f, i) => (
// //             <input
// //               key={i}
// //               type={f.type}
// //               placeholder={f.placeholder}
// //               value={vals[i]}
// //               onChange={(e) => setVals((v) => v.map((x, j) => j === i ? e.target.value : x))}
// //               style={{
// //                 width: "100%", padding: "8px 12px", fontSize: 13,
// //                 background: "#F8FAFC", border: "1px solid #E2E8F0",
// //                 borderRadius: 10, outline: "none", color: "#1E293B",
// //               }}
// //               onFocus={(e) => {
// //                 e.target.style.borderColor = iconColor;
// //                 e.target.style.boxShadow = `0 0 0 3px ${iconBg}`;
// //               }}
// //               onBlur={(e) => {
// //                 e.target.style.borderColor = "#E2E8F0";
// //                 e.target.style.boxShadow = "none";
// //               }}
// //             />
// //           ))}

// //           <button
// //             className="w-full py-2 rounded-xl text-sm font-semibold text-white transition-all active:scale-95"
// //             style={{ background: btnColor, marginTop: 2 }}
// //             onMouseEnter={(e) => e.currentTarget.style.background = btnHover}
// //             onMouseLeave={(e) => e.currentTarget.style.background = btnColor}
// //           >
// //             Sign In
// //           </button>
// //         </div>

// //         {/* Footer */}
// //         <p className="text-xs mt-auto pt-3" style={{ color: "#94A3B8", borderTop: "1px solid #F1F5F9", lineHeight: 1.6 }}>
// //           {footerText}
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ─────────────────────── QUAL FOLDER ──────────────────────── */
// // const qualColors = [
// //   { bg: "#FFF7ED", border: "#FED7AA", icon: "#F97316" },
// //   { bg: "#F0FDF4", border: "#BBF7D0", icon: "#22C55E" },
// //   { bg: "#EFF6FF", border: "#BFDBFE", icon: "#3B82F6" },
// //   { bg: "#FDF4FF", border: "#E9D5FF", icon: "#A855F7" },
// //   { bg: "#FFF1F2", border: "#FECDD3", icon: "#F43F5E" },
// //   { bg: "#F0FDFA", border: "#99F6E4", icon: "#14B8A6" },
// // ];

// // /* ─────────────────────── ROOT COMPONENT ───────────────────── */
// // const Index = () => (
// //   <div className="min-h-screen" style={{ background: "#F0F4FF", fontFamily: "'Inter', system-ui, sans-serif" }}>

// //     {/* ════════════════ HEADER ════════════════ */}
// //     <header style={{ background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
// //       <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center gap-4 flex-wrap">
// //         {/* Logo */}
// //         <div className="flex items-center gap-3 shrink-0">
// //           <div
// //             className="w-10 h-10 rounded-2xl flex items-center justify-center"
// //             style={{ background: "linear-gradient(135deg,#818CF8,#6366F1)", boxShadow: "0 4px 12px rgba(99,102,241,0.3)" }}
// //           >
// //             <span style={{ color: "#FFF", fontWeight: 700, fontSize: 15, letterSpacing: "-0.5px" }}>HR</span>
// //           </div>
// //           <div>
// //             <p style={{ fontSize: 10, color: "#94A3B8", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
// //               Connect Portal
// //             </p>
// //             <p style={{ fontSize: 14, color: "#1E293B", fontWeight: 700, lineHeight: 1.2 }}>HR Network</p>
// //           </div>
// //         </div>

// //         {/* Top tabs */}
// //         <div className="flex flex-wrap gap-2 ml-2">
// //           {topTabs.map((tab, i) => (
// //             <button
// //               key={i}
// //               style={{
// //                 padding: "5px 12px", fontSize: 12, fontWeight: 500,
// //                 color: "#6366F1", background: "#EEF2FF",
// //                 border: "1px solid #C7D2FE", borderRadius: 8,
// //               }}
// //               onMouseEnter={(e) => e.currentTarget.style.background = "#E0E7FF"}
// //               onMouseLeave={(e) => e.currentTarget.style.background = "#EEF2FF"}
// //             >
// //               {tab}
// //             </button>
// //           ))}
// //         </div>
// //       </div>
// //     </header>

// //     {/* ════════════════ NAVBAR ════════════════ */}
// //     <nav style={{ background: "#EEF2FF", borderBottom: "1px solid #C7D2FE" }}>
// //       <div className="max-w-screen-xl mx-auto px-6 flex flex-wrap gap-0.5 py-1.5">
// //         {navLinks.map((link, i) => (
// //           <a
// //             key={i}
// //             href="#"
// //             style={{
// //               padding: "5px 12px", fontSize: 11.5, fontWeight: 600,
// //               color: "#4338CA", letterSpacing: "0.04em",
// //               textDecoration: "none", borderRadius: 8,
// //               textTransform: "uppercase",
// //             }}
// //             onMouseEnter={(e) => {
// //               e.currentTarget.style.background = "#C7D2FE";
// //               e.currentTarget.style.color = "#312E81";
// //             }}
// //             onMouseLeave={(e) => {
// //               e.currentTarget.style.background = "transparent";
// //               e.currentTarget.style.color = "#4338CA";
// //             }}
// //           >
// //             {link}
// //           </a>
// //         ))}
// //       </div>
// //     </nav>

// //     {/* ════════════════ MAIN GRID ════════════════ */}
// //     <main className="max-w-screen-xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-[1fr_1fr_3fr] gap-5 items-start">

// //       {/* HR Login */}
// //       <LoginCard
// //         title="Authorised HR Login"
// //         subtitle="Access your HR dashboard"
// //         iconColor="#6366F1"
// //         iconBg="#EEF2FF"
// //         btnColor="#6366F1"
// //         btnHover="#4F46E5"
// //         footerText="Declaration Form & Security Insurance ECS required for portal activation."
// //         fields={[
// //           { type: "text",     placeholder: "HR ID No." },
// //           { type: "password", placeholder: "Password"  },
// //         ]}
// //       />

// //       {/* Employer Login */}
// //       <LoginCard
// //         title="Employer Login"
// //         subtitle="Post staff requirements"
// //         iconColor="#10B981"
// //         iconBg="#ECFDF5"
// //         btnColor="#10B981"
// //         btnHover="#059669"
// //         footerText="Organization Profile required. Terms & conditions apply to all listings."
// //         fields={[
// //           { type: "text",     placeholder: "Employer ID No." },
// //           { type: "password", placeholder: "Password"         },
// //         ]}
// //       />

// //       {/* Job Grid */}
// //       <JobGrid />
// //     </main>

// //     {/* ════════════════ FOOTER STRIP ════════════════ */}
// //     <footer className="max-w-screen-xl mx-auto px-6 pb-8">
// //       <div
// //         className="rounded-2xl px-6 py-5 flex flex-wrap items-center justify-between gap-6"
// //         style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
// //       >
// //         {/* Qual folders */}
// //         <div>
// //           <p
// //             className="flex items-center gap-1.5 mb-3"
// //             style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.08em", textTransform: "uppercase" }}
// //           >
// //             <GraduationCap style={{ width: 13, height: 13 }} />
// //             Qualification-wise Data Folders
// //           </p>
// //           <div className="flex gap-3 items-end flex-wrap">
// //             {qualifications.map((item, i) => {
// //               const c = qualColors[i % qualColors.length];
// //               return (
// //                 <button
// //                   key={i}
// //                   className="flex flex-col items-center gap-1.5 group"
// //                   style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
// //                 >
// //                   <div
// //                     className="w-11 h-11 rounded-xl flex items-center justify-center transition-all"
// //                     style={{ background: c.bg, border: `1px solid ${c.border}` }}
// //                     onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
// //                     onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
// //                   >
// //                     <Mail style={{ width: 18, height: 18, color: c.icon }} />
// //                   </div>
// //                   <span style={{ fontSize: 10, fontWeight: 700, color: "#64748B" }}>{item}</span>
// //                 </button>
// //               );
// //             })}
// //             <ChevronRight style={{ width: 16, height: 16, color: "#C4B5FD", marginBottom: 16 }} />
// //           </div>
// //         </div>

// //         {/* Action links */}
// //         <div className="flex flex-col gap-3">
// //           <a
// //             href="#"
// //             className="flex items-center gap-2 group"
// //             style={{ textDecoration: "none", fontSize: 13, fontWeight: 600, color: "#6366F1" }}
// //           >
// //             <span>HR Login for New Membership</span>
// //             <ArrowRight
// //               style={{ width: 14, height: 14, transition: "transform 0.2s" }}
// //               onMouseEnter={(e) => e.currentTarget.style.transform = "translateX(4px)"}
// //             />
// //           </a>
// //           <a
// //             href="#"
// //             className="flex items-center gap-2 group"
// //             style={{ textDecoration: "none", fontSize: 13, fontWeight: 600, color: "#64748B" }}
// //           >
// //             <span>Admin Login</span>
// //             <ArrowRight style={{ width: 14, height: 14 }} />
// //           </a>
// //         </div>
// //       </div>
// //     </footer>
// //   </div>
// // );

// // export default Index;








// // import { useState } from "react";
// // import {
// //   Mail, Search, X, ChevronUp, ChevronDown, ChevronsUpDown,
// //   Briefcase, Building2, GraduationCap, ArrowRight,
// //   ChevronLeft, ChevronRight, LogIn, Sparkles, TrendingUp,
// // } from "lucide-react";

// // /* ───────────────────────────── DATA ───────────────────────────── */
// // const navLinks = ["Home","About Us","Authorised HRs","Core Committee","Services","Projects","Associates","Gallery","Contact Us"];
// // const topTabs  = ["PG & Degree Colleges","Industrial Associates","Entrepreneur Sources","Entrepreneur Network"];
// // const jobData  = [
// //   { org:"Hospitals",         vacancies:25,  jobType:"Medical / Admin Staff"    },
// //   { org:"Schools",           vacancies:12,  jobType:"Teaching / Admin"          },
// //   { org:"Colleges",          vacancies:19,  jobType:"Faculty / Admin"           },
// //   { org:"IT Industry",       vacancies:124, jobType:"Software / Support Eng."   },
// //   { org:"Hardware Industry", vacancies:22,  jobType:"Technician / Engineer"     },
// //   { org:"Service Sector",    vacancies:232, jobType:"Customer Support / Ops"    },
// //   { org:"Banks",             vacancies:34,  jobType:"HR Manager / Executive"    },
// // ];
// // const qualifications = ["SSC","ITI","Diploma","Intermediate","Degree","PG"];

// // /* ───────────────────────── CONSTANTS ──────────────────────────── */
// // const ROW_H    = 54;
// // const PAGE_SZ  = 5;
// // const TABLE_H  = ROW_H * PAGE_SZ;

// // /* ───────────────────────── HELPERS ────────────────────────────── */
// // const badgeStyle = (n) => {
// //   if (n >= 100) return { from:"#34D399", to:"#059669", text:"#fff" };
// //   if (n >=  30) return { from:"#60A5FA", to:"#2563EB", text:"#fff" };
// //                 return { from:"#A78BFA", to:"#7C3AED", text:"#fff" };
// // };

// // const SortIcon = ({ active, dir }) =>
// //   !active
// //     ? <ChevronsUpDown style={{width:12,height:12,color:"rgba(255,255,255,0.35)",flexShrink:0}}/>
// //     : dir==="asc"
// //       ? <ChevronUp   style={{width:12,height:12,color:"#FCD34D",flexShrink:0}}/>
// //       : <ChevronDown style={{width:12,height:12,color:"#FCD34D",flexShrink:0}}/>;

// // /* ═══════════════════════ JOB GRID ═════════════════════════════ */
// // function JobGrid() {
// //   const [q,    setQ]    = useState("");
// //   const [page, setPage] = useState(0);
// //   const [sort, setSort] = useState({ key:null, dir:"asc" });

// //   const filtered = jobData.filter(r => {
// //     const lq = q.toLowerCase();
// //     return r.org.toLowerCase().includes(lq)
// //         || r.jobType.toLowerCase().includes(lq)
// //         || String(r.vacancies).includes(lq);
// //   });

// //   const sorted = [...filtered].sort((a,b) => {
// //     if (!sort.key) return 0;
// //     const A=a[sort.key], B=b[sort.key];
// //     if (typeof A==="number") return sort.dir==="asc" ? A-B : B-A;
// //     return sort.dir==="asc" ? String(A).localeCompare(String(B)) : String(B).localeCompare(String(A));
// //   });

// //   const totalPages = Math.max(1, Math.ceil(sorted.length/PAGE_SZ));
// //   const safeP      = Math.min(page, totalPages-1);
// //   const rows       = sorted.slice(safeP*PAGE_SZ, (safeP+1)*PAGE_SZ);
// //   const padded     = [...rows, ...Array(PAGE_SZ-rows.length).fill(null)];
// //   const maxV       = Math.max(...jobData.map(d=>d.vacancies));

// //   const handleSort = key => {
// //     setSort(p => p.key===key ? {key, dir:p.dir==="asc"?"desc":"asc"} : {key, dir:"asc"});
// //     setPage(0);
// //   };

// //   const cols = [
// //     {label:"Organization",  key:"org",       w:"38%"},
// //     {label:"Openings",      key:"vacancies", w:"20%"},
// //     {label:"Role Category", key:"jobType",   w:"42%"},
// //   ];

// //   /* Glassmorphism card style */
// //   const cardStyle = {
// //     borderRadius: 20,
// //     overflow: "hidden",
// //     background: "rgba(255,255,255,0.72)",
// //     backdropFilter: "blur(20px)",
// //     WebkitBackdropFilter: "blur(20px)",
// //     border: "1px solid rgba(255,255,255,0.9)",
// //     boxShadow: "0 8px 32px rgba(99,102,241,0.13), 0 1.5px 6px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.8)",
// //   };

// //   return (
// //     <div style={cardStyle}>

// //       {/* ── Top bar ── */}
// //       <div style={{
// //         background: "linear-gradient(135deg,#6366F1 0%,#8B5CF6 50%,#A78BFA 100%)",
// //         padding: "16px 20px",
// //         display:"flex", alignItems:"center", justifyContent:"space-between",
// //         position:"relative", overflow:"hidden",
// //       }}>
// //         {/* Glossy sheen overlay */}
// //         <div style={{
// //           position:"absolute", inset:0,
// //           background:"linear-gradient(135deg,rgba(255,255,255,0.25) 0%,rgba(255,255,255,0.05) 50%,transparent 100%)",
// //           pointerEvents:"none",
// //         }}/>
// //         {/* Decorative orbs */}
// //         <div style={{position:"absolute",right:-20,top:-20,width:90,height:90,borderRadius:"50%",background:"rgba(255,255,255,0.08)",pointerEvents:"none"}}/>
// //         <div style={{position:"absolute",right:40,bottom:-30,width:60,height:60,borderRadius:"50%",background:"rgba(255,255,255,0.06)",pointerEvents:"none"}}/>

// //         <div style={{display:"flex",alignItems:"center",gap:12,position:"relative"}}>
// //           <div style={{
// //             width:38,height:38,borderRadius:12,
// //             background:"rgba(255,255,255,0.2)",
// //             backdropFilter:"blur(8px)",
// //             border:"1px solid rgba(255,255,255,0.35)",
// //             display:"flex",alignItems:"center",justifyContent:"center",
// //             boxShadow:"0 2px 8px rgba(0,0,0,0.15)",
// //           }}>
// //             <Briefcase style={{width:18,height:18,color:"#fff"}}/>
// //           </div>
// //           <div>
// //             <p style={{fontSize:15,fontWeight:700,color:"#fff",margin:0,letterSpacing:"-0.2px"}}>Live Job Listings</p>
// //             <p style={{fontSize:11,color:"rgba(255,255,255,0.75)",margin:0}}>
// //               <Sparkles style={{width:10,height:10,display:"inline",marginRight:3}}/>
// //               {filtered.length} positions available
// //             </p>
// //           </div>
// //         </div>

// //         {/* Search box */}
// //         <div style={{position:"relative",width:230}}>
// //           <Search style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",width:13,height:13,color:"rgba(255,255,255,0.6)"}}/>
// //           <input
// //             type="text"
// //             placeholder="Search roles…"
// //             value={q}
// //             onChange={e=>{setQ(e.target.value);setPage(0);}}
// //             style={{
// //               width:"100%",paddingLeft:30,paddingRight:q?28:10,
// //               paddingTop:7,paddingBottom:7,fontSize:12.5,
// //               background:"rgba(255,255,255,0.18)",
// //               backdropFilter:"blur(8px)",
// //               border:"1px solid rgba(255,255,255,0.35)",
// //               borderRadius:10,outline:"none",color:"#fff",
// //               boxSizing:"border-box",
// //             }}
// //             onFocus={e=>{e.target.style.background="rgba(255,255,255,0.28)";e.target.style.borderColor="rgba(255,255,255,0.7)";}}
// //             onBlur={e=>{e.target.style.background="rgba(255,255,255,0.18)";e.target.style.borderColor="rgba(255,255,255,0.35)";}}
// //           />
// //           {q&&<button onClick={()=>{setQ("");setPage(0);}} style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",padding:0,color:"rgba(255,255,255,0.7)"}}>
// //             <X style={{width:12,height:12}}/>
// //           </button>}
// //         </div>
// //       </div>

// //       {/* ── Column headers ── */}
// //       <div style={{display:"flex",background:"linear-gradient(180deg,#F5F3FF 0%,#EEF2FF 100%)",borderBottom:"1px solid rgba(99,102,241,0.12)"}}>
// //         {cols.map(col=>(
// //           <button key={col.key} onClick={()=>handleSort(col.key)}
// //             style={{
// //               width:col.w,display:"flex",alignItems:"center",gap:5,
// //               padding:"10px 16px",background:"transparent",border:"none",cursor:"pointer",
// //               fontSize:10.5,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",
// //               color:"#6366F1",transition:"background 0.15s",
// //             }}
// //             onMouseEnter={e=>e.currentTarget.style.background="rgba(99,102,241,0.07)"}
// //             onMouseLeave={e=>e.currentTarget.style.background="transparent"}
// //           >
// //             {col.label}
// //             <SortIcon active={sort.key===col.key} dir={sort.dir}/>
// //           </button>
// //         ))}
// //       </div>

// //       {/* ── Fixed body ── */}
// //       <div style={{height:TABLE_H,overflow:"hidden"}}>
// //         {padded.map((row,i)=>{
// //           if (!row) return (
// //             <div key={`pad-${i}`} style={{
// //               height:ROW_H,display:"flex",
// //               borderBottom:"1px solid rgba(226,232,240,0.6)",
// //               background: i%2===0 ? "#FFFFFF" : "rgba(238,242,255,0.3)",
// //             }}/>
// //           );

// //           const bs = badgeStyle(row.vacancies);
// //           const isEven = i%2===0;
// //           return (
// //             <div key={i}
// //               style={{
// //                 height:ROW_H,display:"flex",alignItems:"center",
// //                 borderBottom:"1px solid rgba(226,232,240,0.6)",
// //                 background: isEven ? "#FFFFFF" : "rgba(238,242,255,0.35)",
// //                 cursor:"pointer",transition:"background 0.15s, transform 0.1s",
// //               }}
// //               onMouseEnter={e=>{e.currentTarget.style.background="linear-gradient(90deg,rgba(238,242,255,0.9),rgba(221,214,254,0.35))";}}
// //               onMouseLeave={e=>{e.currentTarget.style.background=isEven?"#FFFFFF":"rgba(238,242,255,0.35)";}}
// //             >
// //               {/* Org */}
// //               <div style={{width:"38%",padding:"0 16px",display:"flex",alignItems:"center",gap:10}}>
// //                 <div style={{
// //                   width:30,height:30,borderRadius:9,flexShrink:0,
// //                   background:"linear-gradient(135deg,#EEF2FF,#DDD6FE)",
// //                   border:"1px solid rgba(99,102,241,0.2)",
// //                   display:"flex",alignItems:"center",justifyContent:"center",
// //                   boxShadow:"inset 0 1px 2px rgba(255,255,255,0.8)",
// //                 }}>
// //                   <Building2 style={{width:14,height:14,color:"#6366F1"}}/>
// //                 </div>
// //                 <span style={{fontSize:13,fontWeight:600,color:"#1E293B",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{row.org}</span>
// //               </div>

// //               {/* Vacancies */}
// //               <div style={{width:"20%",padding:"0 16px"}}>
// //                 <span style={{
// //                   display:"inline-block",padding:"3px 11px",borderRadius:99,fontSize:12,fontWeight:700,
// //                   background:`linear-gradient(135deg,${bs.from},${bs.to})`,color:bs.text,
// //                   boxShadow:`0 2px 8px ${bs.from}55`,letterSpacing:"0.02em",
// //                 }}>
// //                   {row.vacancies}
// //                 </span>
// //                 <div style={{height:3,background:"rgba(226,232,240,0.8)",borderRadius:99,marginTop:5,width:"75%",overflow:"hidden"}}>
// //                   <div style={{
// //                     height:"100%",borderRadius:99,
// //                     background:`linear-gradient(90deg,${bs.from},${bs.to})`,
// //                     width:`${(row.vacancies/maxV)*100}%`,
// //                     boxShadow:`0 0 6px ${bs.from}88`,
// //                     transition:"width 0.4s ease",
// //                   }}/>
// //                 </div>
// //               </div>

// //               {/* Role */}
// //               <div style={{width:"42%",padding:"0 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
// //                 <span style={{fontSize:13,color:"#64748B",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{row.jobType}</span>
// //                 <div style={{
// //                   width:24,height:24,borderRadius:7,background:"rgba(99,102,241,0)",
// //                   display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
// //                   transition:"background 0.15s",
// //                 }}>
// //                   <ArrowRight style={{width:13,height:13,color:"#A5B4FC"}}/>
// //                 </div>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>

// //       {/* ── Pagination ── */}
// //       <div style={{
// //         display:"flex",alignItems:"center",justifyContent:"space-between",
// //         padding:"10px 20px",
// //         background:"linear-gradient(180deg,#F5F3FF,#EEF2FF)",
// //         borderTop:"1px solid rgba(99,102,241,0.1)",
// //       }}>
// //         <p style={{fontSize:12,color:"#64748B",margin:0}}>
// //           Showing{" "}
// //           <b style={{color:"#4F46E5"}}>{sorted.length===0?0:safeP*PAGE_SZ+1}–{Math.min((safeP+1)*PAGE_SZ,sorted.length)}</b>
// //           {" "}of{" "}
// //           <b style={{color:"#4F46E5"}}>{sorted.length}</b>
// //         </p>
// //         <div style={{display:"flex",alignItems:"center",gap:5}}>
// //           {/* Prev */}
// //           <button disabled={safeP===0} onClick={()=>setPage(p=>p-1)}
// //             style={{
// //               width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",
// //               background:safeP===0?"#F1F5F9":"#fff",border:"1px solid rgba(99,102,241,0.2)",
// //               cursor:safeP===0?"not-allowed":"pointer",opacity:safeP===0?0.4:1,
// //               boxShadow:"0 1px 3px rgba(0,0,0,0.06)",transition:"all 0.15s",
// //             }}
// //             onMouseEnter={e=>safeP!==0&&(e.currentTarget.style.background="#EEF2FF")}
// //             onMouseLeave={e=>e.currentTarget.style.background=safeP===0?"#F1F5F9":"#fff"}
// //           >
// //             <ChevronLeft style={{width:14,height:14,color:"#6366F1"}}/>
// //           </button>

// //           {/* Page numbers */}
// //           {Array.from({length:totalPages},(_,n)=>(
// //             <button key={n} onClick={()=>setPage(n)}
// //               style={{
// //                 width:30,height:30,borderRadius:9,
// //                 display:"flex",alignItems:"center",justifyContent:"center",
// //                 fontSize:12,fontWeight:700,cursor:"pointer",
// //                 transition:"all 0.15s",
// //                 background: n===safeP
// //                   ? "linear-gradient(135deg,#6366F1,#8B5CF6)"
// //                   : "#fff",
// //                 border: n===safeP
// //                   ? "1px solid transparent"
// //                   : "1px solid rgba(99,102,241,0.2)",
// //                 color: n===safeP ? "#fff" : "#6366F1",
// //                 boxShadow: n===safeP
// //                   ? "0 2px 8px rgba(99,102,241,0.4)"
// //                   : "0 1px 3px rgba(0,0,0,0.06)",
// //               }}
// //             >{n+1}</button>
// //           ))}

// //           {/* Next */}
// //           <button disabled={safeP>=totalPages-1} onClick={()=>setPage(p=>p+1)}
// //             style={{
// //               width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",
// //               background:safeP>=totalPages-1?"#F1F5F9":"#fff",border:"1px solid rgba(99,102,241,0.2)",
// //               cursor:safeP>=totalPages-1?"not-allowed":"pointer",opacity:safeP>=totalPages-1?0.4:1,
// //               boxShadow:"0 1px 3px rgba(0,0,0,0.06)",transition:"all 0.15s",
// //             }}
// //             onMouseEnter={e=>safeP<totalPages-1&&(e.currentTarget.style.background="#EEF2FF")}
// //             onMouseLeave={e=>e.currentTarget.style.background=safeP>=totalPages-1?"#F1F5F9":"#fff"}
// //           >
// //             <ChevronRight style={{width:14,height:14,color:"#6366F1"}}/>
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ═══════════════════════ LOGIN CARD ════════════════════════════ */
// // function LoginCard({ title, subtitle, grad, glowColor, fields }) {
// //   const [vals, setVals] = useState(fields.map(()=>""));

// //   return (
// //     <div style={{
// //       borderRadius:20,overflow:"hidden",
// //       background:"rgba(255,255,255,0.75)",
// //       backdropFilter:"blur(20px)",
// //       WebkitBackdropFilter:"blur(20px)",
// //       border:"1px solid rgba(255,255,255,0.9)",
// //       boxShadow:`0 8px 32px ${glowColor}22, 0 1.5px 6px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.9)`,
// //     }}>
// //       {/* Gradient header */}
// //       <div style={{
// //         background:grad,padding:"18px 18px 16px",position:"relative",overflow:"hidden",
// //       }}>
// //         <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.22) 0%,transparent 60%)",pointerEvents:"none"}}/>
// //         <div style={{position:"absolute",right:-15,top:-15,width:70,height:70,borderRadius:"50%",background:"rgba(255,255,255,0.1)",pointerEvents:"none"}}/>
// //         <div style={{
// //           width:36,height:36,borderRadius:11,marginBottom:10,
// //           background:"rgba(255,255,255,0.22)",border:"1px solid rgba(255,255,255,0.4)",
// //           backdropFilter:"blur(6px)",
// //           display:"flex",alignItems:"center",justifyContent:"center",
// //           boxShadow:"0 2px 8px rgba(0,0,0,0.12)",position:"relative",
// //         }}>
// //           <LogIn style={{width:16,height:16,color:"#fff"}}/>
// //         </div>
// //         <p style={{fontSize:13.5,fontWeight:700,color:"#fff",margin:0,position:"relative",letterSpacing:"-0.2px"}}>{title}</p>
// //         <p style={{fontSize:11,color:"rgba(255,255,255,0.72)",margin:"2px 0 0",position:"relative"}}>{subtitle}</p>
// //       </div>

// //       {/* Body */}
// //       <div style={{padding:16,display:"flex",flexDirection:"column",gap:10}}>
// //         {fields.map((f,i)=>(
// //           <div key={i} style={{position:"relative"}}>
// //             <input
// //               type={f.type}
// //               placeholder={f.placeholder}
// //               value={vals[i]}
// //               onChange={e=>setVals(v=>v.map((x,j)=>j===i?e.target.value:x))}
// //               style={{
// //                 width:"100%",padding:"9px 12px",fontSize:13,
// //                 background:"rgba(248,250,252,0.9)",
// //                 border:"1px solid rgba(226,232,240,0.8)",
// //                 borderRadius:11,outline:"none",color:"#1E293B",
// //                 boxSizing:"border-box",
// //                 boxShadow:"inset 0 1px 3px rgba(0,0,0,0.04)",
// //                 transition:"all 0.2s",
// //               }}
// //               onFocus={e=>{e.target.style.borderColor=glowColor;e.target.style.boxShadow=`0 0 0 3px ${glowColor}22, inset 0 1px 3px rgba(0,0,0,0.04)`;}}
// //               onBlur={e=>{e.target.style.borderColor="rgba(226,232,240,0.8)";e.target.style.boxShadow="inset 0 1px 3px rgba(0,0,0,0.04)";}}
// //             />
// //           </div>
// //         ))}

// //         {/* Glossy button */}
// //         <button
// //           style={{
// //             width:"100%",padding:"9px",marginTop:2,
// //             background:grad,color:"#fff",fontWeight:700,fontSize:13,
// //             border:"none",borderRadius:11,cursor:"pointer",
// //             position:"relative",overflow:"hidden",
// //             boxShadow:`0 4px 14px ${glowColor}44`,
// //             transition:"transform 0.15s, box-shadow 0.15s",
// //           }}
// //           onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow=`0 6px 20px ${glowColor}55`;}}
// //           onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=`0 4px 14px ${glowColor}44`;}}
// //           onMouseDown={e=>e.currentTarget.style.transform="scale(0.97)"}
// //           onMouseUp={e=>e.currentTarget.style.transform="translateY(-1px)"}
// //         >
// //           <span style={{position:"relative",zIndex:1}}>Sign In →</span>
// //           <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.2) 0%,transparent 60%)",pointerEvents:"none"}}/>
// //         </button>

// //         <p style={{fontSize:10.5,color:"#94A3B8",lineHeight:1.6,margin:0,paddingTop:8,borderTop:"1px dashed rgba(226,232,240,0.8)"}}>
// //           {fields[0].footerText}
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ══════════════════ QUAL FOLDER BUTTON ════════════════════════ */
// // const qualCfg = [
// //   {from:"#FB923C",to:"#EA580C",glow:"#FB923C"},
// //   {from:"#34D399",to:"#059669",glow:"#34D399"},
// //   {from:"#60A5FA",to:"#2563EB",glow:"#60A5FA"},
// //   {from:"#C084FC",to:"#9333EA",glow:"#C084FC"},
// //   {from:"#FB7185",to:"#E11D48",glow:"#FB7185"},
// //   {from:"#2DD4BF",to:"#0D9488",glow:"#2DD4BF"},
// // ];

// // /* ═════════════════════════ ROOT ════════════════════════════════ */
// // const Index = () => (
// //   <div style={{
// //     minHeight:"100vh",
// //     fontFamily:"'Inter',system-ui,sans-serif",
// //     background:"linear-gradient(135deg,#EEF2FF 0%,#F5F3FF 30%,#FDF4FF 60%,#EFF6FF 100%)",
// //     position:"relative",
// //   }}>
// //     {/* Ambient background blobs */}
// //     <div style={{position:"fixed",top:-120,left:-80,width:420,height:420,borderRadius:"50%",background:"radial-gradient(circle,rgba(165,180,252,0.35),transparent 70%)",pointerEvents:"none",zIndex:0}}/>
// //     <div style={{position:"fixed",bottom:-100,right:-60,width:380,height:380,borderRadius:"50%",background:"radial-gradient(circle,rgba(196,181,253,0.3),transparent 70%)",pointerEvents:"none",zIndex:0}}/>
// //     <div style={{position:"fixed",top:"40%",left:"55%",width:260,height:260,borderRadius:"50%",background:"radial-gradient(circle,rgba(147,197,253,0.2),transparent 70%)",pointerEvents:"none",zIndex:0}}/>

// //     <div style={{position:"relative",zIndex:1}}>

// //       {/* ══════ HEADER ══════ */}
// //       <header style={{
// //         background:"rgba(255,255,255,0.75)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",
// //         borderBottom:"1px solid rgba(255,255,255,0.9)",
// //         boxShadow:"0 1px 20px rgba(99,102,241,0.08)",
// //       }}>
// //         <div style={{maxWidth:1280,margin:"0 auto",padding:"12px 24px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
// //           {/* Logo */}
// //           <div style={{display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
// //             <div style={{
// //               width:44,height:44,borderRadius:14,
// //               background:"linear-gradient(135deg,#818CF8,#6366F1,#4F46E5)",
// //               boxShadow:"0 4px 16px rgba(99,102,241,0.45), inset 0 1px 0 rgba(255,255,255,0.3)",
// //               display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",
// //             }}>
// //               <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.25) 0%,transparent 60%)"}}/>
// //               <span style={{color:"#fff",fontWeight:800,fontSize:16,letterSpacing:"-0.5px",position:"relative"}}>HR</span>
// //             </div>
// //             <div>
// //               <p style={{fontSize:9.5,color:"#A5B4FC",fontWeight:800,letterSpacing:"0.15em",textTransform:"uppercase",margin:0}}>Connect Portal</p>
// //               <p style={{fontSize:15,color:"#1E293B",fontWeight:800,lineHeight:1.15,margin:0,letterSpacing:"-0.4px"}}>HR Network</p>
// //             </div>
// //           </div>

// //           {/* Divider */}
// //           <div style={{width:1,height:32,background:"rgba(99,102,241,0.15)",flexShrink:0}}/>

// //           {/* Top tabs */}
// //           <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
// //             {topTabs.map((tab,i)=>(
// //               <button key={i} style={{
// //                 padding:"5px 13px",fontSize:12,fontWeight:600,
// //                 color:"#6366F1",background:"rgba(238,242,255,0.8)",
// //                 border:"1px solid rgba(199,210,254,0.7)",borderRadius:99,cursor:"pointer",
// //                 backdropFilter:"blur(8px)",
// //                 boxShadow:"inset 0 1px 0 rgba(255,255,255,0.7), 0 1px 4px rgba(99,102,241,0.1)",
// //                 transition:"all 0.15s",
// //               }}
// //               onMouseEnter={e=>{e.currentTarget.style.background="rgba(199,210,254,0.8)";e.currentTarget.style.transform="translateY(-1px)";}}
// //               onMouseLeave={e=>{e.currentTarget.style.background="rgba(238,242,255,0.8)";e.currentTarget.style.transform="none";}}
// //               >{tab}</button>
// //             ))}
// //           </div>
// //         </div>
// //       </header>

// //       {/* ══════ NAVBAR ══════ */}
// //       <nav style={{
// //         background:"rgba(238,242,255,0.85)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",
// //         borderBottom:"1px solid rgba(199,210,254,0.6)",
// //       }}>
// //         <div style={{maxWidth:1280,margin:"0 auto",padding:"4px 24px",display:"flex",flexWrap:"wrap",gap:2}}>
// //           {navLinks.map((link,i)=>(
// //             <a key={i} href="#" style={{
// //               padding:"6px 13px",fontSize:11,fontWeight:700,
// //               color:"#4338CA",letterSpacing:"0.06em",textDecoration:"none",
// //               borderRadius:8,textTransform:"uppercase",transition:"all 0.15s",
// //             }}
// //             onMouseEnter={e=>{e.currentTarget.style.background="rgba(199,210,254,0.7)";e.currentTarget.style.color="#312E81";}}
// //             onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#4338CA";}}
// //             >{link}</a>
// //           ))}
// //         </div>
// //       </nav>

// //       {/* ══════ MAIN GRID ══════ */}
// //       <main style={{maxWidth:1280,margin:"0 auto",padding:"24px 24px",display:"grid",gridTemplateColumns:"1fr 1fr 3fr",gap:20,alignItems:"start"}}>

// //         <LoginCard
// //           title="Authorised HR Login"
// //           subtitle="Access your HR dashboard"
// //           grad="linear-gradient(135deg,#818CF8,#6366F1,#4F46E5)"
// //           glowColor="#6366F1"
// //           fields={[
// //             {type:"text",     placeholder:"HR ID No.",      footerText:"Declaration Form & Security Insurance ECS required for portal activation."},
// //             {type:"password", placeholder:"Password",       footerText:""},
// //           ]}
// //         />

// //         <LoginCard
// //           title="Employer Login"
// //           subtitle="Post staff requirements"
// //           grad="linear-gradient(135deg,#34D399,#10B981,#059669)"
// //           glowColor="#10B981"
// //           fields={[
// //             {type:"text",     placeholder:"Employer ID No.", footerText:"Organization Profile required. Terms & conditions apply to all listings."},
// //             {type:"password", placeholder:"Password",        footerText:""},
// //           ]}
// //         />

// //         <JobGrid/>
// //       </main>

// //       {/* ══════ FOOTER ══════ */}
// //       <footer style={{maxWidth:1280,margin:"0 auto",padding:"0 24px 32px"}}>
// //         <div style={{
// //           borderRadius:20,padding:"20px 24px",
// //           display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:20,
// //           background:"rgba(255,255,255,0.72)",
// //           backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",
// //           border:"1px solid rgba(255,255,255,0.9)",
// //           boxShadow:"0 4px 24px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
// //         }}>

// //           {/* Qual folders */}
// //           <div>
// //             <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:12}}>
// //               <GraduationCap style={{width:13,height:13,color:"#A5B4FC"}}/>
// //               <span style={{fontSize:10,fontWeight:800,color:"#A5B4FC",letterSpacing:"0.1em",textTransform:"uppercase"}}>
// //                 Qualification-wise Data Folders
// //               </span>
// //             </div>
// //             <div style={{display:"flex",gap:10,alignItems:"flex-end",flexWrap:"wrap"}}>
// //               {qualifications.map((item,i)=>{
// //                 const c = qualCfg[i%qualCfg.length];
// //                 return (
// //                   <button key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,background:"none",border:"none",cursor:"pointer",padding:0}}>
// //                     <div style={{
// //                       width:44,height:44,borderRadius:13,
// //                       background:`linear-gradient(135deg,${c.from},${c.to})`,
// //                       boxShadow:`0 4px 12px ${c.glow}44, inset 0 1px 0 rgba(255,255,255,0.3)`,
// //                       display:"flex",alignItems:"center",justifyContent:"center",
// //                       position:"relative",overflow:"hidden",
// //                       transition:"transform 0.2s, box-shadow 0.2s",
// //                     }}
// //                     onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px) scale(1.05)";e.currentTarget.style.boxShadow=`0 8px 20px ${c.glow}55`;}}
// //                     onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=`0 4px 12px ${c.glow}44`;}}
// //                     >
// //                       <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.25) 0%,transparent 60%)"}}/>
// //                       <Mail style={{width:18,height:18,color:"#fff",position:"relative"}}/>
// //                     </div>
// //                     <span style={{fontSize:10,fontWeight:700,color:"#64748B"}}>{item}</span>
// //                   </button>
// //                 );
// //               })}
// //               <div style={{alignSelf:"flex-start",marginTop:8,opacity:0.5}}>
// //                 <ChevronRight style={{width:16,height:16,color:"#818CF8"}}/>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Divider */}
// //           <div style={{width:1,height:60,background:"rgba(226,232,240,0.8)",flexShrink:0}}/>

// //           {/* Links */}
// //           <div style={{display:"flex",flexDirection:"column",gap:12}}>
// //             {[
// //               {label:"HR Login for New Membership",color:"#6366F1",glow:"rgba(99,102,241,0.15)"},
// //               {label:"Admin Login",               color:"#64748B",glow:"transparent"},
// //             ].map((l,i)=>(
// //               <a key={i} href="#" style={{
// //                 display:"flex",alignItems:"center",gap:8,textDecoration:"none",
// //                 fontSize:13,fontWeight:700,color:l.color,
// //                 padding:"7px 14px",borderRadius:10,
// //                 background:l.glow,border:`1px solid ${l.glow==="transparent"?"rgba(226,232,240,0.5)":"rgba(99,102,241,0.15)"}`,
// //                 transition:"all 0.15s",boxSizing:"border-box",
// //               }}
// //               onMouseEnter={e=>{e.currentTarget.style.transform="translateX(3px)";}}
// //               onMouseLeave={e=>{e.currentTarget.style.transform="none";}}
// //               >
// //                 <TrendingUp style={{width:14,height:14}}/>
// //                 {l.label}
// //                 <ArrowRight style={{width:13,height:13,marginLeft:"auto"}}/>
// //               </a>
// //             ))}
// //           </div>
// //         </div>
// //       </footer>
// //     </div>
// //   </div>
// // );

// // export default Index;


// // version 2

// // import { useState } from "react";
// // import {
// //   Search, X, ChevronUp, ChevronDown, ChevronsUpDown,
// //   Briefcase, Building2, GraduationCap, ArrowRight,
// //   ChevronLeft, ChevronRight, LogIn, Zap,
// // } from "lucide-react";

// // const NAV  = ["Home","About Us","Authorised HRs","Core Committee","Services","Projects","Associates","Gallery","Contact Us"];
// // const TABS = ["PG & Degree Colleges","Industrial Associates","Entrepreneur Sources","Entrepreneur Network"];
// // const JOBS = [
// //   { org:"Hospitals",         n:25,  role:"Medical / Admin Staff"   },
// //   { org:"Schools",           n:12,  role:"Teaching / Admin"         },
// //   { org:"Colleges",          n:19,  role:"Faculty / Admin"          },
// //   { org:"IT Industry",       n:124, role:"Software / Support Eng."  },
// //   { org:"Hardware Industry", n:22,  role:"Technician / Engineer"    },
// //   { org:"Service Sector",    n:232, role:"Customer Support / Ops"   },
// //   { org:"Banks",             n:34,  role:"HR Manager / Executive"   },
// // ];

// // // Below SSC added BEFORE SSC
// // const QUALS = [
// //   { label:"Below SSC",  body:"#FFF7ED", border:"#F97316", lid:"#F97316", line:"#FED7AA", stamp:"#EA580C" },
// //   { label:"SSC",        body:"#FFF1F2", border:"#F43F5E", lid:"#F43F5E", line:"#FECDD3", stamp:"#C81A40" },
// //   { label:"ITI",        body:"#FFFBEB", border:"#F59E0B", lid:"#F59E0B", line:"#FDE68A", stamp:"#D97706" },
// //   { label:"Diploma",    body:"#ECFDF5", border:"#10B981", lid:"#10B981", line:"#A7F3D0", stamp:"#059669" },
// //   { label:"Inter",      body:"#EFF6FF", border:"#3B82F6", lid:"#3B82F6", line:"#BFDBFE", stamp:"#2563EB" },
// //   { label:"Degree",     body:"#F5F3FF", border:"#8B5CF6", lid:"#8B5CF6", line:"#DDD6FE", stamp:"#7C3AED" },
// //   { label:"PG",         body:"#F0F9FF", border:"#0EA5E9", lid:"#0EA5E9", line:"#BAE6FD", stamp:"#0284C7" },
// // ];

// // const ROW_H   = 54;
// // const PAGE_SZ = 5;
// // const TABLE_H = ROW_H * PAGE_SZ;
// // const MAX_V   = Math.max(...JOBS.map(j => j.n));

// // const tier = n =>
// //   n >= 100 ? { a:"#2563EB", b:"#1D4ED8", txt:"#fff", glow:"rgba(37,99,235,0.30)", bar:"#3B82F6" }
// // : n >=  30 ? { a:"#0EA5E9", b:"#0284C7", txt:"#fff", glow:"rgba(14,165,233,0.28)", bar:"#0EA5E9" }
// // :            { a:"#6366F1", b:"#4F46E5", txt:"#fff", glow:"rgba(99,102,241,0.25)", bar:"#818CF8" };

// // const SortIco = ({ on, dir }) =>
// //   !on ? <ChevronsUpDown style={{width:11,height:11,color:"#93C5FD",flexShrink:0}}/>
// // : dir === "asc"
// //   ? <ChevronUp   style={{width:11,height:11,color:"#2563EB",flexShrink:0}}/>
// //   : <ChevronDown style={{width:11,height:11,color:"#2563EB",flexShrink:0}}/>;

// // const cardShadow = "0 1px 3px rgba(37,99,235,0.06), 0 8px 24px rgba(37,99,235,0.10), 0 1px 0 rgba(255,255,255,0.9) inset";

// // const G = `
// //   .env-wrap{display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;user-select:none;}
// //   .env-lbl{font-size:9.5px;font-weight:700;letter-spacing:.06em;color:#64748B;text-align:center;transition:color .2s;white-space:nowrap;}
// //   .env-wrap:hover .env-lbl{color:#1E3A5F;}
// //   .env-svg{display:block;transition:transform .22s cubic-bezier(.34,1.56,.64,1);}
// //   .env-wrap:hover .env-svg{transform:translateY(-6px) scale(1.07);}
// //   .env-wrap:active .env-svg{transform:scale(0.95);}
// //   .env-paper{transition:transform .32s cubic-bezier(.34,1.4,.64,1) .05s;}
// //   .env-wrap:hover .env-paper{transform:translateY(-18px);}
// //   .env-flap{transform-origin:50% 0%;transition:transform .35s cubic-bezier(.34,1.3,.64,1) .1s;}
// //   .env-wrap:hover .env-flap{transform:rotateX(-170deg);}

// //   @keyframes arrowPing {
// //     0%   { transform: translateX(0px);  }
// //     30%  { transform: translateX(13px); }
// //     55%  { transform: translateX(-5px); }
// //     80%  { transform: translateX(9px);  }
// //     100% { transform: translateX(0px);  }
// //   }
// //   .arrow-anim { animation: arrowPing 3s ease-in-out infinite; }

// //   @keyframes livePulse{0%{transform:scale(1);opacity:.8}70%{transform:scale(2.4);opacity:0}100%{transform:scale(2.4);opacity:0}}
// // `;

// // /* ══════ ENVELOPE ══════════════════════════════════════════ */
// // function Envelope({ label, body, border, lid, line, stamp }) {
// //   return (
// //     <div className="env-wrap" tabIndex={0} aria-label={`${label} data folder`}>
// //       <svg className="env-svg" width="58" height="60" viewBox="0 0 70 72" fill="none">
// //         <g className="env-paper">
// //           <rect x="16" y="10" width="38" height="44" rx="3" fill="white" stroke={border} strokeWidth=".8"/>
// //           <rect x="21" y="17" width="28" height="2" rx="1" fill={line}/>
// //           <rect x="21" y="22" width="28" height="2" rx="1" fill={line}/>
// //           <rect x="21" y="27" width="20" height="2" rx="1" fill={line}/>
// //           <rect x="21" y="32" width="24" height="2" rx="1" fill={line}/>
// //           <rect x="21" y="37" width="16" height="2" rx="1" fill={line}/>
// //         </g>
// //         <rect x="4" y="30" width="62" height="40" rx="4" fill={body}/>
// //         <rect x="4" y="30" width="62" height="40" rx="4" stroke={border} strokeWidth="1.2"/>
// //         <path d="M4 70 L35 50 L4 30"  fill={line}/>
// //         <path d="M66 70 L35 50 L66 30" fill={line}/>
// //         <path d="M4 70 L35 50 L66 70" fill={body} style={{filter:"brightness(0.96)"}}/>
// //         <path d="M4 30 L35 50 L66 30" fill="none" stroke={border} strokeWidth="0.8" opacity=".4"/>
// //         <g className="env-flap">
// //           <path d="M4 30 L35 50 L66 30 Q66 26 62 26 L8 26 Q4 26 4 30 Z" fill={lid}/>
// //         </g>
// //         <rect x="52" y="33" width="10" height="8" rx="1.5" fill={stamp} opacity=".75"/>
// //         <rect x="53" y="34" width="8"  height="6" rx=".8"  fill="white" opacity=".35"/>
// //       </svg>
// //       <span className="env-lbl">{label}</span>
// //     </div>
// //   );
// // }

// // /* ══════ ANIMATED ARROW ════════════════════════════════════ */
// // function AnimatedArrow() {
// //   return (
// //     <div className="arrow-anim" style={{display:"flex",alignItems:"center",alignSelf:"center",marginLeft:6,marginBottom:18}}>
// //       <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
// //         <circle cx="22" cy="22" r="21" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1.4"/>
// //         <path d="M11 22 H31 M22 13 L32 22 L22 31"
// //           stroke="#2563EB" strokeWidth="2.8"
// //           strokeLinecap="round" strokeLinejoin="round"/>
// //       </svg>
// //     </div>
// //   );
// // }

// // /* ══════ SINGLE LOGIN CARD ═════════════════════════════════ */
// // function LoginCard() {
// //   const [id, setId] = useState("");
// //   const [pw, setPw] = useState("");

// //   return (
// //     <div style={{borderRadius:20,overflow:"hidden",background:"#FFFFFF",border:"1px solid #BFDBFE",boxShadow:cardShadow}}>
// //       {/* header */}
// //       <div style={{background:"linear-gradient(135deg,#1D4ED8 0%,#2563EB 55%,#3B82F6 100%)",padding:"22px 20px 18px",position:"relative",overflow:"hidden"}}>
// //         <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.04) 60%,transparent 100%)",pointerEvents:"none"}}/>
// //         <div style={{position:"absolute",right:-22,top:-22,width:90,height:90,borderRadius:"50%",background:"rgba(255,255,255,0.10)",pointerEvents:"none"}}/>
// //         <div style={{width:40,height:40,borderRadius:13,marginBottom:13,background:"rgba(255,255,255,0.22)",border:"1px solid rgba(255,255,255,0.45)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",boxShadow:"0 3px 10px rgba(0,0,0,0.12),inset 0 1px 0 rgba(255,255,255,0.35)"}}>
// //           <LogIn style={{width:17,height:17,color:"#fff"}}/>
// //         </div>
// //         <p style={{margin:0,fontSize:15,fontWeight:700,color:"#fff",letterSpacing:"-0.3px",position:"relative"}}>Login for Hr & Employer</p>
// //         <p style={{margin:"3px 0 0",fontSize:11,color:"rgba(255,255,255,0.72)",position:"relative"}}>Sign in to access your dashboard</p>
// //       </div>

// //       {/* form */}
// //       <div style={{padding:"22px 18px 22px",display:"flex",flexDirection:"column",gap:12}}>
// //         <input type="text" placeholder="User ID / HR ID No." value={id}
// //           onChange={e => setId(e.target.value)}
// //           style={{width:"100%",padding:"10px 14px",fontSize:13,boxSizing:"border-box",background:"#F8FBFF",border:"1.5px solid #BFDBFE",borderRadius:11,outline:"none",color:"#1E3A5F",transition:"all 0.2s"}}
// //           onFocus={e=>{e.target.style.borderColor="#2563EB";e.target.style.background="#EFF6FF";e.target.style.boxShadow="0 0 0 3px rgba(219,234,254,0.6)";}}
// //           onBlur={e=>{e.target.style.borderColor="#BFDBFE";e.target.style.background="#F8FBFF";e.target.style.boxShadow="none";}}
// //         />
// //         <input type="password" placeholder="Password" value={pw}
// //           onChange={e => setPw(e.target.value)}
// //           style={{width:"100%",padding:"10px 14px",fontSize:13,boxSizing:"border-box",background:"#F8FBFF",border:"1.5px solid #BFDBFE",borderRadius:11,outline:"none",color:"#1E3A5F",transition:"all 0.2s"}}
// //           onFocus={e=>{e.target.style.borderColor="#2563EB";e.target.style.background="#EFF6FF";e.target.style.boxShadow="0 0 0 3px rgba(219,234,254,0.6)";}}
// //           onBlur={e=>{e.target.style.borderColor="#BFDBFE";e.target.style.background="#F8FBFF";e.target.style.boxShadow="none";}}
// //         />
// //         <button
// //           style={{width:"100%",padding:"11px",marginTop:2,background:"linear-gradient(135deg,#1D4ED8,#3B82F6)",color:"#fff",fontWeight:700,fontSize:13.5,border:"none",borderRadius:12,cursor:"pointer",position:"relative",overflow:"hidden",boxShadow:"0 4px 16px rgba(37,99,235,0.40)",transition:"transform 0.15s,box-shadow 0.15s"}}
// //           onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 22px rgba(37,99,235,0.45)";}}
// //           onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 16px rgba(37,99,235,0.40)";}}
// //           onMouseDown={e=>e.currentTarget.style.transform="scale(0.97)"}
// //           onMouseUp={e=>e.currentTarget.style.transform="translateY(-2px)"}>
// //           <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.2) 0%,transparent 60%)",pointerEvents:"none"}}/>
// //           <span style={{position:"relative"}}>Sign In →</span>
// //         </button>
// //         <p style={{margin:"2px 0 0",fontSize:10.5,color:"#94A3B8",lineHeight:1.6,borderTop:"1px solid #EFF6FF",paddingTop:10,textAlign:"center"}}>
// //           Declaration Form &amp; Security Insurance ECS required for activation.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ══════ JOB GRID ══════════════════════════════════════════ */
// // function JobGrid() {
// //   const [q,   setQ]  = useState("");
// //   const [pg,  setPg] = useState(0);
// //   const [srt, setSrt]= useState({ k:null, d:"asc" });

// //   const filt = JOBS.filter(r => {
// //     const lq = q.toLowerCase();
// //     return r.org.toLowerCase().includes(lq) || r.role.toLowerCase().includes(lq) || String(r.n).includes(lq);
// //   });
// //   const srtd = [...filt].sort((a,b) => {
// //     if (!srt.k) return 0;
// //     const A=a[srt.k], B=b[srt.k];
// //     return typeof A==="number"
// //       ? srt.d==="asc"?A-B:B-A
// //       : srt.d==="asc"?String(A).localeCompare(String(B)):String(B).localeCompare(String(A));
// //   });
// //   const totPg = Math.max(1,Math.ceil(srtd.length/PAGE_SZ));
// //   const sp    = Math.min(pg,totPg-1);
// //   const rows  = srtd.slice(sp*PAGE_SZ,(sp+1)*PAGE_SZ);
// //   const pad   = [...rows,...Array(PAGE_SZ-rows.length).fill(null)];
// //   const flip  = k=>{setSrt(p=>p.k===k?{k,d:p.d==="asc"?"desc":"asc"}:{k,d:"asc"});setPg(0);};
// //   const cols  = [
// //     {lbl:"Organization",k:"org", w:"37%"},
// //     {lbl:"Openings",    k:"n",   w:"21%"},
// //     {lbl:"Role",        k:"role",w:"42%"},
// //   ];

// //   return (
// //     <div style={{borderRadius:20,overflow:"hidden",background:"#FFFFFF",border:"1px solid #BFDBFE",boxShadow:cardShadow}}>
// //       {/* header */}
// //       <div style={{background:"linear-gradient(135deg,#1D4ED8 0%,#2563EB 50%,#3B82F6 100%)",padding:"18px 20px",position:"relative",overflow:"hidden"}}>
// //         <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.05) 50%,transparent 100%)",pointerEvents:"none"}}/>
// //         <div style={{position:"absolute",right:-30,top:-30,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,0.08)",pointerEvents:"none"}}/>
// //         <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative"}}>
// //           <div style={{display:"flex",alignItems:"center",gap:13}}>
// //             <div style={{width:42,height:42,borderRadius:13,background:"rgba(255,255,255,0.2)",border:"1px solid rgba(255,255,255,0.4)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.3)"}}>
// //               <Briefcase style={{width:18,height:18,color:"#fff"}}/>
// //             </div>
// //             <div>
// //               <p style={{margin:0,fontSize:15,fontWeight:700,color:"#fff",letterSpacing:"-0.3px"}}>Live Job Board</p>
// //               <p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.72)"}}>
// //                 <Zap style={{width:9,height:9,display:"inline",marginRight:3,verticalAlign:"middle"}}/>
// //                 {filt.length} active listings
// //               </p>
// //             </div>
// //           </div>
// //           <div style={{position:"relative",width:230}}>
// //             <Search style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",width:13,height:13,color:"rgba(255,255,255,0.6)"}}/>
// //             <input type="text" placeholder="Search roles…" value={q}
// //               onChange={e=>{setQ(e.target.value);setPg(0);}}
// //               style={{width:"100%",paddingLeft:30,paddingRight:q?28:12,paddingTop:8,paddingBottom:8,fontSize:12.5,background:"rgba(255,255,255,0.18)",border:"1px solid rgba(255,255,255,0.35)",borderRadius:10,outline:"none",color:"#fff",boxSizing:"border-box",transition:"all 0.2s"}}
// //               onFocus={e=>{e.target.style.background="rgba(255,255,255,0.28)";e.target.style.borderColor="rgba(255,255,255,0.7)";}}
// //               onBlur={e=>{e.target.style.background="rgba(255,255,255,0.18)";e.target.style.borderColor="rgba(255,255,255,0.35)";}}
// //             />
// //             {q&&<button onClick={()=>{setQ("");setPg(0);}} style={{position:"absolute",right:9,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",padding:0,color:"rgba(255,255,255,0.7)"}}>
// //               <X style={{width:12,height:12}}/>
// //             </button>}
// //           </div>
// //         </div>
// //       </div>

// //       {/* col headers */}
// //       <div style={{display:"flex",background:"#EFF6FF",borderBottom:"1.5px solid #BFDBFE"}}>
// //         {cols.map(c=>(
// //           <button key={c.k} onClick={()=>flip(c.k)}
// //             style={{width:c.w,display:"flex",alignItems:"center",gap:5,padding:"11px 16px",background:"transparent",border:"none",cursor:"pointer",fontSize:10.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"#3B82F6",transition:"all 0.15s"}}
// //             onMouseEnter={e=>{e.currentTarget.style.background="#DBEAFE";e.currentTarget.style.color="#1D4ED8";}}
// //             onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#3B82F6";}}>
// //             {c.lbl}<SortIco on={srt.k===c.k} dir={srt.d}/>
// //           </button>
// //         ))}
// //       </div>

// //       {/* rows */}
// //       <div style={{height:TABLE_H,overflow:"hidden"}}>
// //         {pad.map((row,i)=>{
// //           const even=i%2===0;
// //           if(!row) return <div key={`p${i}`} style={{height:ROW_H,display:"flex",background:even?"#FFFFFF":"#F8FBFF",borderBottom:"1px solid #F0F7FF"}}/>;
// //           const t=tier(row.n);
// //           return(
// //             <div key={i} style={{height:ROW_H,display:"flex",alignItems:"center",background:even?"#FFFFFF":"#F8FBFF",borderBottom:"1px solid #EFF6FF",cursor:"pointer",transition:"background 0.15s"}}
// //               onMouseEnter={e=>e.currentTarget.style.background="#EFF6FF"}
// //               onMouseLeave={e=>e.currentTarget.style.background=even?"#FFFFFF":"#F8FBFF"}>
// //               <div style={{width:"37%",padding:"0 16px",display:"flex",alignItems:"center",gap:10}}>
// //                 <div style={{width:30,height:30,borderRadius:9,flexShrink:0,background:"linear-gradient(135deg,#DBEAFE,#BFDBFE)",border:"1px solid #93C5FD",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.8)"}}>
// //                   <Building2 style={{width:13,height:13,color:"#2563EB"}}/>
// //                 </div>
// //                 <span style={{fontSize:13,fontWeight:600,color:"#1E3A5F",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{row.org}</span>
// //               </div>
// //               <div style={{width:"21%",padding:"0 16px"}}>
// //                 <span style={{display:"inline-block",padding:"3px 11px",borderRadius:99,fontSize:11.5,fontWeight:700,background:`linear-gradient(135deg,${t.a},${t.b})`,color:t.txt,boxShadow:`0 2px 10px ${t.glow}`,letterSpacing:"0.02em"}}>{row.n}</span>
// //                 <div style={{height:3,background:"#DBEAFE",borderRadius:99,marginTop:6,width:"78%",overflow:"hidden"}}>
// //                   <div style={{height:"100%",borderRadius:99,background:`linear-gradient(90deg,${t.a},${t.bar})`,width:`${(row.n/MAX_V)*100}%`,transition:"width 0.4s ease"}}/>
// //                 </div>
// //               </div>
// //               <div style={{width:"42%",padding:"0 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
// //                 <span style={{fontSize:13,color:"#64748B",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{row.role}</span>
// //                 <ArrowRight style={{width:13,height:13,color:"#93C5FD",flexShrink:0}}/>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>

// //       {/* pagination */}
// //       <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 20px",background:"#EFF6FF",borderTop:"1.5px solid #BFDBFE"}}>
// //         <p style={{margin:0,fontSize:12,color:"#64748B"}}>
// //           Showing{" "}
// //           <span style={{fontWeight:700,color:"#2563EB"}}>{srtd.length===0?0:sp*PAGE_SZ+1}–{Math.min((sp+1)*PAGE_SZ,srtd.length)}</span>
// //           {" of "}
// //           <span style={{fontWeight:700,color:"#334155"}}>{srtd.length}</span>
// //         </p>
// //         <div style={{display:"flex",alignItems:"center",gap:5}}>
// //           <button disabled={sp===0} onClick={()=>setPg(p=>p-1)}
// //             style={{width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",background:sp===0?"#F1F5F9":"#FFFFFF",border:"1.5px solid",borderColor:sp===0?"#E2E8F0":"#BFDBFE",cursor:sp===0?"not-allowed":"pointer",opacity:sp===0?0.4:1,transition:"all 0.15s"}}
// //             onMouseEnter={e=>sp!==0&&(e.currentTarget.style.background="#DBEAFE")}
// //             onMouseLeave={e=>{e.currentTarget.style.background=sp===0?"#F1F5F9":"#FFFFFF";}}>
// //             <ChevronLeft style={{width:14,height:14,color:"#2563EB"}}/>
// //           </button>
// //           {Array.from({length:totPg},(_,n)=>(
// //             <button key={n} onClick={()=>setPg(n)}
// //               style={{width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.15s",background:n===sp?"linear-gradient(135deg,#2563EB,#3B82F6)":"#FFFFFF",border:n===sp?"1.5px solid #2563EB":"1.5px solid #BFDBFE",color:n===sp?"#fff":"#3B82F6",boxShadow:n===sp?"0 3px 10px rgba(37,99,235,0.35)":"0 1px 3px rgba(37,99,235,0.08)"}}>
// //               {n+1}
// //             </button>
// //           ))}
// //           <button disabled={sp>=totPg-1} onClick={()=>setPg(p=>p+1)}
// //             style={{width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",background:sp>=totPg-1?"#F1F5F9":"#FFFFFF",border:"1.5px solid",borderColor:sp>=totPg-1?"#E2E8F0":"#BFDBFE",cursor:sp>=totPg-1?"not-allowed":"pointer",opacity:sp>=totPg-1?0.4:1,transition:"all 0.15s"}}
// //             onMouseEnter={e=>sp<totPg-1&&(e.currentTarget.style.background="#DBEAFE")}
// //             onMouseLeave={e=>{e.currentTarget.style.background=sp>=totPg-1?"#F1F5F9":"#FFFFFF";}}>
// //             <ChevronRight style={{width:14,height:14,color:"#2563EB"}}/>
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ══════ ROOT ══════════════════════════════════════════════ */
// // export default function Index() {
// //   return (
// //     <div style={{minHeight:"100vh",fontFamily:"'Inter',system-ui,sans-serif",background:"linear-gradient(160deg,#EFF6FF 0%,#DBEAFE 35%,#EFF6FF 65%,#F0F9FF 100%)",position:"relative"}}>
// //       <style>{G}</style>

// //       {/* ambient blobs */}
// //       <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
// //         <div style={{position:"absolute",width:700,height:500,borderRadius:"50%",top:-200,left:-200,background:"radial-gradient(ellipse,rgba(147,197,253,0.35) 0%,transparent 70%)"}}/>
// //         <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",bottom:-150,right:-100,background:"radial-gradient(ellipse,rgba(186,230,253,0.40) 0%,transparent 70%)"}}/>
// //         <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",top:"30%",right:"15%",background:"radial-gradient(ellipse,rgba(219,234,254,0.50) 0%,transparent 70%)"}}/>
// //       </div>

// //       <div style={{position:"relative",zIndex:1}}>

// //         {/* ═══ HEADER ═══ */}
// //         <header style={{background:"rgba(255,255,255,0.82)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:"1px solid #BFDBFE",boxShadow:"0 2px 20px rgba(37,99,235,0.09)"}}>
// //           <div style={{maxWidth:1300,margin:"0 auto",padding:"13px 28px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
// //             {/* logo */}
// //             <div style={{display:"flex",alignItems:"center",gap:13,flexShrink:0}}>
// //               <div style={{width:46,height:46,borderRadius:15,position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#2563EB,#1D4ED8)",boxShadow:"0 0 0 1px rgba(37,99,235,0.3),0 6px 18px rgba(37,99,235,0.35),inset 0 1px 0 rgba(255,255,255,0.25)"}}>
// //                 <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.22) 0%,transparent 60%)"}}/>
// //                 <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
// //                   <span style={{color:"#fff",fontWeight:800,fontSize:17,letterSpacing:"-0.5px"}}>HR</span>
// //                 </div>
// //               </div>
// //               <div>
// //                 <p style={{margin:0,fontSize:9.5,color:"#3B82F6",fontWeight:800,letterSpacing:"0.17em",textTransform:"uppercase"}}>Connect Portal</p>
// //                 <p style={{margin:0,fontSize:16,color:"#1E3A5F",fontWeight:800,letterSpacing:"-0.4px"}}>HR Network</p>
// //               </div>
// //             </div>
// //             <div style={{width:1,height:34,background:"#BFDBFE",flexShrink:0}}/>
// //             {/* tabs */}
// //             <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
// //               {TABS.map((t,i)=>(
// //                 <button key={i} style={{padding:"5px 14px",fontSize:11.5,fontWeight:600,color:"#2563EB",background:"rgba(219,234,254,0.7)",border:"1px solid #93C5FD",borderRadius:99,cursor:"pointer",transition:"all 0.15s"}}
// //                   onMouseEnter={e=>{e.currentTarget.style.background="#BFDBFE";e.currentTarget.style.transform="translateY(-1px)";}}
// //                   onMouseLeave={e=>{e.currentTarget.style.background="rgba(219,234,254,0.7)";e.currentTarget.style.transform="none";}}>
// //                   {t}
// //                 </button>
// //               ))}
// //             </div>
// //             {/* live dot */}
// //             <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:7,flexShrink:0,background:"rgba(220,252,231,0.7)",border:"1px solid #86EFAC",padding:"4px 10px 4px 7px",borderRadius:99,boxShadow:"0 1px 6px rgba(34,197,94,0.12)"}}>
// //               <div style={{position:"relative",width:10,height:10,flexShrink:0}}>
// //                 <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"#22C55E",animation:"livePulse 1.6s ease-out infinite"}}/>
// //                 <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"#22C55E",animation:"livePulse 1.6s ease-out infinite 0.5s"}}/>
// //                 <div style={{position:"absolute",inset:"2px",borderRadius:"50%",background:"#16A34A",boxShadow:"0 0 4px rgba(22,163,74,0.6)"}}/>
// //               </div>
// //               <span style={{fontSize:10.5,color:"#15803D",fontWeight:800,letterSpacing:"0.1em"}}>LIVE</span>
// //             </div>
// //           </div>
// //         </header>

// //         {/* ═══ NAVBAR ═══ */}
// //         <nav style={{background:"rgba(255,255,255,0.75)",backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",borderBottom:"1px solid #DBEAFE"}}>
// //           <div style={{maxWidth:1300,margin:"0 auto",padding:"5px 28px",display:"flex",flexWrap:"wrap",gap:2}}>
// //             {NAV.map((lk,i)=>(
// //               <a key={i} href="#" style={{padding:"6px 13px",fontSize:10.5,fontWeight:700,color:"#3B82F6",letterSpacing:"0.06em",textDecoration:"none",borderRadius:8,textTransform:"uppercase",transition:"all 0.15s"}}
// //                 onMouseEnter={e=>{e.currentTarget.style.background="#DBEAFE";e.currentTarget.style.color="#1D4ED8";}}
// //                 onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#3B82F6";}}>
// //                 {lk}
// //               </a>
// //             ))}
// //           </div>
// //         </nav>

// //         {/* ═══ MAIN ═══ */}
// //         <main style={{maxWidth:1300,margin:"0 auto",padding:"26px 28px",display:"grid",gridTemplateColumns:"1fr 3fr",gap:22,alignItems:"start"}}>
// //           <LoginCard/>
// //           <JobGrid/>
// //         </main>

// //         {/* ═══ FOOTER ═══ */}
// //         <footer style={{maxWidth:1300,margin:"0 auto",padding:"0 28px 36px"}}>
// //           <div style={{borderRadius:22,padding:"22px 28px",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:20,background:"rgba(255,255,255,0.82)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:"1px solid #BFDBFE",boxShadow:"0 4px 24px rgba(37,99,235,0.09),inset 0 1px 0 rgba(255,255,255,0.9)"}}>

// //             {/* envelope folders */}
// //             <div>
// //               <p style={{margin:"0 0 16px",fontSize:10,fontWeight:800,color:"#93C5FD",letterSpacing:"0.1em",textTransform:"uppercase",display:"flex",alignItems:"center",gap:6}}>
// //                 <GraduationCap style={{width:12,height:12,color:"#3B82F6"}}/>
// //                 Qualification-wise Data Folders
// //               </p>
// //               {/* envelopes row: label appears BELOW each envelope, animated arrow at end */}
// //               <div style={{display:"flex",gap:14,alignItems:"flex-end",flexWrap:"wrap"}}>
// //                 {QUALS.map((q,i)=><Envelope key={i} {...q}/>)}
// //                 <AnimatedArrow/>
// //               </div>
// //             </div>

// //             <div style={{width:1,height:64,background:"#DBEAFE",flexShrink:0}}/>

// //             {/* action links */}
// //             <div style={{display:"flex",flexDirection:"column",gap:10}}>
// //               {[
// //                 {lbl:"HR Login for New Membership",col:"#2563EB",bg:"#EFF6FF", border:"#BFDBFE"},
// //                 {lbl:"Admin Login",               col:"#64748B",bg:"#F8FAFC", border:"#E2E8F0"},
// //               ].map((l,i)=>(
// //                 <a key={i} href="#" style={{display:"flex",alignItems:"center",gap:8,textDecoration:"none",fontSize:12.5,fontWeight:700,color:l.col,padding:"8px 16px",borderRadius:11,background:l.bg,border:`1.5px solid ${l.border}`,boxSizing:"border-box",transition:"all 0.15s",boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}
// //                   onMouseEnter={e=>{e.currentTarget.style.transform="translateX(4px)";e.currentTarget.style.boxShadow="0 4px 12px rgba(37,99,235,0.14)";}}
// //                   onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.05)";}}>
// //                   <ArrowRight style={{width:13,height:13,flexShrink:0}}/>
// //                   {l.lbl}
// //                   <ArrowRight style={{width:12,height:12,marginLeft:"auto",opacity:0.4}}/>
// //                 </a>
// //               ))}
// //             </div>

// //           </div>
// //         </footer>

// //       </div>
// //     </div>
// //   );
// // }

// // version 2 end


// // version3 start

// // import { useState } from "react";
// // import {
// //   Search, X, ChevronUp, ChevronDown, ChevronsUpDown,
// //   Briefcase, Building2, GraduationCap, ArrowRight,
// //   ChevronLeft, ChevronRight, LogIn, Zap,
// // } from "lucide-react";

// // const NAV  = ["Home","About Us","Authorised HRs","Core Committee","Services","Projects","Associates","Gallery","Contact Us"];
// // const TABS = ["PG & Degree Colleges","Industrial Associates","Entrepreneur Sources","Entrepreneur Network"];
// // const JOBS = [
// //   { org:"Hospitals",         n:25,  role:"Medical / Admin Staff"   },
// //   { org:"Schools",           n:12,  role:"Teaching / Admin"         },
// //   { org:"Colleges",          n:19,  role:"Faculty / Admin"          },
// //   { org:"IT Industry",       n:124, role:"Software / Support Eng."  },
// //   { org:"Hardware Industry", n:22,  role:"Technician / Engineer"    },
// //   { org:"Service Sector",    n:232, role:"Customer Support / Ops"   },
// //   { org:"Banks",             n:34,  role:"HR Manager / Executive"   },
// // ];

// // const QUALS = [
// //   { label:"Below SSC",  body:"#FFF7ED", border:"#F97316", lid:"#F97316", line:"#FED7AA", stamp:"#EA580C" },
// //   { label:"SSC",        body:"#FFF1F2", border:"#F43F5E", lid:"#F43F5E", line:"#FECDD3", stamp:"#C81A40" },
// //   { label:"ITI",        body:"#FFFBEB", border:"#F59E0B", lid:"#F59E0B", line:"#FDE68A", stamp:"#D97706" },
// //   { label:"Diploma",    body:"#F5F3FF", border:"#8B5CF6", lid:"#8B5CF6", line:"#DDD6FE", stamp:"#7C3AED" },
// //   { label:"Inter",      body:"#FAF5FF", border:"#A855F7", lid:"#A855F7", line:"#E9D5FF", stamp:"#9333EA" },
// //   { label:"Degree",     body:"#F3E8FF", border:"#C084FC", lid:"#C084FC", line:"#F3E8FF", stamp:"#A855F7" },
// //   { label:"PG",         body:"#EDE9FE", border:"#7C3AED", lid:"#7C3AED", line:"#C4B5FD", stamp:"#6D28D9" },
// // ];

// // const ROW_H   = 54;
// // const PAGE_SZ = 5;
// // const TABLE_H = ROW_H * PAGE_SZ;
// // const MAX_V   = Math.max(...JOBS.map(j => j.n));

// // const tier = n =>
// //   n >= 100 ? { a:"#7C3AED", b:"#6D28D9", txt:"#fff", glow:"rgba(124,58,237,0.32)", bar:"#8B5CF6" }
// // : n >=  30 ? { a:"#A855F7", b:"#9333EA", txt:"#fff", glow:"rgba(168,85,247,0.28)", bar:"#C084FC" }
// // :            { a:"#C084FC", b:"#A855F7", txt:"#fff", glow:"rgba(192,132,252,0.25)", bar:"#DDD6FE" };

// // const SortIco = ({ on, dir }) =>
// //   !on ? <ChevronsUpDown style={{width:11,height:11,color:"#C4B5FD",flexShrink:0}}/>
// // : dir === "asc"
// //   ? <ChevronUp   style={{width:11,height:11,color:"#7C3AED",flexShrink:0}}/>
// //   : <ChevronDown style={{width:11,height:11,color:"#7C3AED",flexShrink:0}}/>;

// // const cardShadow = "0 1px 3px rgba(124,58,237,0.07), 0 8px 24px rgba(109,40,217,0.12), 0 1px 0 rgba(255,255,255,0.9) inset";

// // const G = `
// //   @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');

// //   * { font-family: 'Outfit', system-ui, sans-serif !important; }

// //   .env-wrap{display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;user-select:none;}
// //   .env-lbl{font-size:9.5px;font-weight:700;letter-spacing:.06em;color:#7C3AED;text-align:center;transition:color .2s;white-space:nowrap;}
// //   .env-wrap:hover .env-lbl{color:#4C1D95;}
// //   .env-svg{display:block;transition:transform .22s cubic-bezier(.34,1.56,.64,1);}
// //   .env-wrap:hover .env-svg{transform:translateY(-6px) scale(1.07);}
// //   .env-wrap:active .env-svg{transform:scale(0.95);}
// //   .env-paper{transition:transform .32s cubic-bezier(.34,1.4,.64,1) .05s;}
// //   .env-wrap:hover .env-paper{transform:translateY(-18px);}
// //   .env-flap{transform-origin:50% 0%;transition:transform .35s cubic-bezier(.34,1.3,.64,1) .1s;}
// //   .env-wrap:hover .env-flap{transform:rotateX(-170deg);}

// //   @keyframes arrowPing {
// //     0%   { transform: translateX(0px);  }
// //     30%  { transform: translateX(13px); }
// //     55%  { transform: translateX(-5px); }
// //     80%  { transform: translateX(9px);  }
// //     100% { transform: translateX(0px);  }
// //   }
// //   .arrow-anim { animation: arrowPing 3s ease-in-out infinite; }

// //   @keyframes livePulse{0%{transform:scale(1);opacity:.8}70%{transform:scale(2.4);opacity:0}100%{transform:scale(2.4);opacity:0}}

// //   @keyframes shimmer {
// //     0% { background-position: -200% center; }
// //     100% { background-position: 200% center; }
// //   }
// // `;

// // function Envelope({ label, body, border, lid, line, stamp }) {
// //   return (
// //     <div className="env-wrap" tabIndex={0} aria-label={`${label} data folder`}>
// //       <svg className="env-svg" width="58" height="60" viewBox="0 0 70 72" fill="none">
// //         <g className="env-paper">
// //           <rect x="16" y="10" width="38" height="44" rx="3" fill="white" stroke={border} strokeWidth=".8"/>
// //           <rect x="21" y="17" width="28" height="2" rx="1" fill={line}/>
// //           <rect x="21" y="22" width="28" height="2" rx="1" fill={line}/>
// //           <rect x="21" y="27" width="20" height="2" rx="1" fill={line}/>
// //           <rect x="21" y="32" width="24" height="2" rx="1" fill={line}/>
// //           <rect x="21" y="37" width="16" height="2" rx="1" fill={line}/>
// //         </g>
// //         <rect x="4" y="30" width="62" height="40" rx="4" fill={body}/>
// //         <rect x="4" y="30" width="62" height="40" rx="4" stroke={border} strokeWidth="1.2"/>
// //         <path d="M4 70 L35 50 L4 30"  fill={line}/>
// //         <path d="M66 70 L35 50 L66 30" fill={line}/>
// //         <path d="M4 70 L35 50 L66 70" fill={body} style={{filter:"brightness(0.96)"}}/>
// //         <path d="M4 30 L35 50 L66 30" fill="none" stroke={border} strokeWidth="0.8" opacity=".4"/>
// //         <g className="env-flap">
// //           <path d="M4 30 L35 50 L66 30 Q66 26 62 26 L8 26 Q4 26 4 30 Z" fill={lid}/>
// //         </g>
// //         <rect x="52" y="33" width="10" height="8" rx="1.5" fill={stamp} opacity=".75"/>
// //         <rect x="53" y="34" width="8"  height="6" rx=".8"  fill="white" opacity=".35"/>
// //       </svg>
// //       <span className="env-lbl">{label}</span>
// //     </div>
// //   );
// // }

// // function AnimatedArrow() {
// //   return (
// //     <div className="arrow-anim" style={{display:"flex",alignItems:"center",alignSelf:"center",marginLeft:6,marginBottom:18}}>
// //       <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
// //         <circle cx="22" cy="22" r="21" fill="#EDE9FE" stroke="#C4B5FD" strokeWidth="1.4"/>
// //         <path d="M11 22 H31 M22 13 L32 22 L22 31"
// //           stroke="#7C3AED" strokeWidth="2.8"
// //           strokeLinecap="round" strokeLinejoin="round"/>
// //       </svg>
// //     </div>
// //   );
// // }

// // function LoginCard() {
// //   const [id, setId] = useState("");
// //   const [pw, setPw] = useState("");

// //   return (
// //     <div style={{borderRadius:20,overflow:"hidden",background:"#FFFFFF",border:"1px solid #DDD6FE",boxShadow:cardShadow}}>
// //       {/* header */}
// //       <div style={{background:"linear-gradient(135deg,#4C1D95 0%,#7C3AED 55%,#A855F7 100%)",padding:"22px 20px 18px",position:"relative",overflow:"hidden"}}>
// //         <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.04) 60%,transparent 100%)",pointerEvents:"none"}}/>
// //         {/* decorative orbs */}
// //         <div style={{position:"absolute",right:-22,top:-22,width:90,height:90,borderRadius:"50%",background:"rgba(255,255,255,0.08)",pointerEvents:"none"}}/>
// //         <div style={{position:"absolute",left:-10,bottom:-20,width:60,height:60,borderRadius:"50%",background:"rgba(196,181,253,0.15)",pointerEvents:"none"}}/>
// //         <div style={{width:40,height:40,borderRadius:13,marginBottom:13,background:"rgba(255,255,255,0.20)",border:"1px solid rgba(255,255,255,0.40)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",boxShadow:"0 3px 10px rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.35)"}}>
// //           <LogIn style={{width:17,height:17,color:"#fff"}}/>
// //         </div>
// //         <p style={{margin:0,fontSize:15,fontWeight:700,color:"#fff",letterSpacing:"-0.3px",position:"relative"}}>Login for Hr & Employer</p>
// //         <p style={{margin:"3px 0 0",fontSize:11,color:"rgba(255,255,255,0.70)",position:"relative"}}>Sign in to access your dashboard</p>
// //       </div>

// //       {/* form */}
// //       <div style={{padding:"22px 18px 22px",display:"flex",flexDirection:"column",gap:12}}>
// //         <input type="text" placeholder="User ID / HR ID No." value={id}
// //           onChange={e => setId(e.target.value)}
// //           style={{width:"100%",padding:"10px 14px",fontSize:13,boxSizing:"border-box",background:"#FAF5FF",border:"1.5px solid #DDD6FE",borderRadius:11,outline:"none",color:"#2E1065",transition:"all 0.2s"}}
// //           onFocus={e=>{e.target.style.borderColor="#7C3AED";e.target.style.background="#F3E8FF";e.target.style.boxShadow="0 0 0 3px rgba(196,181,253,0.45)";}}
// //           onBlur={e=>{e.target.style.borderColor="#DDD6FE";e.target.style.background="#FAF5FF";e.target.style.boxShadow="none";}}
// //         />
// //         <input type="password" placeholder="Password" value={pw}
// //           onChange={e => setPw(e.target.value)}
// //           style={{width:"100%",padding:"10px 14px",fontSize:13,boxSizing:"border-box",background:"#FAF5FF",border:"1.5px solid #DDD6FE",borderRadius:11,outline:"none",color:"#2E1065",transition:"all 0.2s"}}
// //           onFocus={e=>{e.target.style.borderColor="#7C3AED";e.target.style.background="#F3E8FF";e.target.style.boxShadow="0 0 0 3px rgba(196,181,253,0.45)";}}
// //           onBlur={e=>{e.target.style.borderColor="#DDD6FE";e.target.style.background="#FAF5FF";e.target.style.boxShadow="none";}}
// //         />
// //         <button
// //           style={{width:"100%",padding:"11px",marginTop:2,background:"linear-gradient(135deg,#4C1D95,#7C3AED,#A855F7)",backgroundSize:"200% auto",color:"#fff",fontWeight:700,fontSize:13.5,border:"none",borderRadius:12,cursor:"pointer",position:"relative",overflow:"hidden",boxShadow:"0 4px 18px rgba(124,58,237,0.45)",transition:"transform 0.15s,box-shadow 0.15s"}}
// //           onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(124,58,237,0.50)";}}
// //           onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 18px rgba(124,58,237,0.45)";}}
// //           onMouseDown={e=>e.currentTarget.style.transform="scale(0.97)"}
// //           onMouseUp={e=>e.currentTarget.style.transform="translateY(-2px)"}>
// //           <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 60%)",pointerEvents:"none"}}/>
// //           <span style={{position:"relative"}}>Sign In →</span>
// //         </button>
// //         <p style={{margin:"2px 0 0",fontSize:10.5,color:"#A78BFA",lineHeight:1.6,borderTop:"1px solid #F3E8FF",paddingTop:10,textAlign:"center"}}>
// //           Declaration Form &amp; Security Insurance ECS required for activation.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // function JobGrid() {
// //   const [q,   setQ]  = useState("");
// //   const [pg,  setPg] = useState(0);
// //   const [srt, setSrt]= useState({ k:null, d:"asc" });

// //   const filt = JOBS.filter(r => {
// //     const lq = q.toLowerCase();
// //     return r.org.toLowerCase().includes(lq) || r.role.toLowerCase().includes(lq) || String(r.n).includes(lq);
// //   });
// //   const srtd = [...filt].sort((a,b) => {
// //     if (!srt.k) return 0;
// //     const A=a[srt.k], B=b[srt.k];
// //     return typeof A==="number"
// //       ? srt.d==="asc"?A-B:B-A
// //       : srt.d==="asc"?String(A).localeCompare(String(B)):String(B).localeCompare(String(A));
// //   });
// //   const totPg = Math.max(1,Math.ceil(srtd.length/PAGE_SZ));
// //   const sp    = Math.min(pg,totPg-1);
// //   const rows  = srtd.slice(sp*PAGE_SZ,(sp+1)*PAGE_SZ);
// //   const pad   = [...rows,...Array(PAGE_SZ-rows.length).fill(null)];
// //   const flip  = k=>{setSrt(p=>p.k===k?{k,d:p.d==="asc"?"desc":"asc"}:{k,d:"asc"});setPg(0);};
// //   const cols  = [
// //     {lbl:"Organization",k:"org", w:"37%"},
// //     {lbl:"Openings",    k:"n",   w:"21%"},
// //     {lbl:"Role",        k:"role",w:"42%"},
// //   ];

// //   return (
// //     <div style={{borderRadius:20,overflow:"hidden",background:"#FFFFFF",border:"1px solid #DDD6FE",boxShadow:cardShadow}}>
// //       {/* header */}
// //       <div style={{background:"linear-gradient(135deg,#4C1D95 0%,#7C3AED 50%,#A855F7 100%)",padding:"18px 20px",position:"relative",overflow:"hidden"}}>
// //         <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.04) 50%,transparent 100%)",pointerEvents:"none"}}/>
// //         <div style={{position:"absolute",right:-30,top:-30,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,0.07)",pointerEvents:"none"}}/>
// //         <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative"}}>
// //           <div style={{display:"flex",alignItems:"center",gap:13}}>
// //             <div style={{width:42,height:42,borderRadius:13,background:"rgba(255,255,255,0.18)",border:"1px solid rgba(255,255,255,0.38)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.3)"}}>
// //               <Briefcase style={{width:18,height:18,color:"#fff"}}/>
// //             </div>
// //             <div>
// //               <p style={{margin:0,fontSize:15,fontWeight:700,color:"#fff",letterSpacing:"-0.3px"}}>Live Job Board</p>
// //               <p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.70)"}}>
// //                 <Zap style={{width:9,height:9,display:"inline",marginRight:3,verticalAlign:"middle"}}/>
// //                 {filt.length} active listings
// //               </p>
// //             </div>
// //           </div>
// //           <div style={{position:"relative",width:230}}>
// //             <Search style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",width:13,height:13,color:"rgba(255,255,255,0.6)"}}/>
// //             <input type="text" placeholder="Search roles…" value={q}
// //               onChange={e=>{setQ(e.target.value);setPg(0);}}
// //               style={{width:"100%",paddingLeft:30,paddingRight:q?28:12,paddingTop:8,paddingBottom:8,fontSize:12.5,background:"rgba(255,255,255,0.16)",border:"1px solid rgba(255,255,255,0.32)",borderRadius:10,outline:"none",color:"#fff",boxSizing:"border-box",transition:"all 0.2s"}}
// //               onFocus={e=>{e.target.style.background="rgba(255,255,255,0.26)";e.target.style.borderColor="rgba(255,255,255,0.65)";}}
// //               onBlur={e=>{e.target.style.background="rgba(255,255,255,0.16)";e.target.style.borderColor="rgba(255,255,255,0.32)";}}
// //             />
// //             {q&&<button onClick={()=>{setQ("");setPg(0);}} style={{position:"absolute",right:9,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",padding:0,color:"rgba(255,255,255,0.7)"}}>
// //               <X style={{width:12,height:12}}/>
// //             </button>}
// //           </div>
// //         </div>
// //       </div>

// //       {/* col headers */}
// //       <div style={{display:"flex",background:"#F5F3FF",borderBottom:"1.5px solid #DDD6FE"}}>
// //         {cols.map(c=>(
// //           <button key={c.k} onClick={()=>flip(c.k)}
// //             style={{width:c.w,display:"flex",alignItems:"center",gap:5,padding:"11px 16px",background:"transparent",border:"none",cursor:"pointer",fontSize:10.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"#7C3AED",transition:"all 0.15s"}}
// //             onMouseEnter={e=>{e.currentTarget.style.background="#EDE9FE";e.currentTarget.style.color="#4C1D95";}}
// //             onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#7C3AED";}}>
// //             {c.lbl}<SortIco on={srt.k===c.k} dir={srt.d}/>
// //           </button>
// //         ))}
// //       </div>

// //       {/* rows */}
// //       <div style={{height:TABLE_H,overflow:"hidden"}}>
// //         {pad.map((row,i)=>{
// //           const even=i%2===0;
// //           if(!row) return <div key={`p${i}`} style={{height:ROW_H,display:"flex",background:even?"#FFFFFF":"#FAFAFF",borderBottom:"1px solid #F5F3FF"}}/>;
// //           const t=tier(row.n);
// //           return(
// //             <div key={i} style={{height:ROW_H,display:"flex",alignItems:"center",background:even?"#FFFFFF":"#FAFAFF",borderBottom:"1px solid #F5F3FF",cursor:"pointer",transition:"background 0.15s"}}
// //               onMouseEnter={e=>e.currentTarget.style.background="#F5F3FF"}
// //               onMouseLeave={e=>e.currentTarget.style.background=even?"#FFFFFF":"#FAFAFF"}>
// //               <div style={{width:"37%",padding:"0 16px",display:"flex",alignItems:"center",gap:10}}>
// //                 <div style={{width:30,height:30,borderRadius:9,flexShrink:0,background:"linear-gradient(135deg,#EDE9FE,#DDD6FE)",border:"1px solid #C4B5FD",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.8)"}}>
// //                   <Building2 style={{width:13,height:13,color:"#7C3AED"}}/>
// //                 </div>
// //                 <span style={{fontSize:13,fontWeight:600,color:"#2E1065",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{row.org}</span>
// //               </div>
// //               <div style={{width:"21%",padding:"0 16px"}}>
// //                 <span style={{display:"inline-block",padding:"3px 11px",borderRadius:99,fontSize:11.5,fontWeight:700,background:`linear-gradient(135deg,${t.a},${t.b})`,color:t.txt,boxShadow:`0 2px 10px ${t.glow}`,letterSpacing:"0.02em"}}>{row.n}</span>
// //                 <div style={{height:3,background:"#EDE9FE",borderRadius:99,marginTop:6,width:"78%",overflow:"hidden"}}>
// //                   <div style={{height:"100%",borderRadius:99,background:`linear-gradient(90deg,${t.a},${t.bar})`,width:`${(row.n/MAX_V)*100}%`,transition:"width 0.4s ease"}}/>
// //                 </div>
// //               </div>
// //               <div style={{width:"42%",padding:"0 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
// //                 <span style={{fontSize:13,color:"#6D28D9",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{row.role}</span>
// //                 <ArrowRight style={{width:13,height:13,color:"#C4B5FD",flexShrink:0}}/>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>

// //       {/* pagination */}
// //       <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 20px",background:"#F5F3FF",borderTop:"1.5px solid #DDD6FE"}}>
// //         <p style={{margin:0,fontSize:12,color:"#7C3AED"}}>
// //           Showing{" "}
// //           <span style={{fontWeight:700,color:"#6D28D9"}}>{srtd.length===0?0:sp*PAGE_SZ+1}–{Math.min((sp+1)*PAGE_SZ,srtd.length)}</span>
// //           {" of "}
// //           <span style={{fontWeight:700,color:"#2E1065"}}>{srtd.length}</span>
// //         </p>
// //         <div style={{display:"flex",alignItems:"center",gap:5}}>
// //           <button disabled={sp===0} onClick={()=>setPg(p=>p-1)}
// //             style={{width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",background:sp===0?"#F1F0F9":"#FFFFFF",border:"1.5px solid",borderColor:sp===0?"#E2D9F3":"#DDD6FE",cursor:sp===0?"not-allowed":"pointer",opacity:sp===0?0.4:1,transition:"all 0.15s"}}
// //             onMouseEnter={e=>sp!==0&&(e.currentTarget.style.background="#EDE9FE")}
// //             onMouseLeave={e=>{e.currentTarget.style.background=sp===0?"#F1F0F9":"#FFFFFF";}}>
// //             <ChevronLeft style={{width:14,height:14,color:"#7C3AED"}}/>
// //           </button>
// //           {Array.from({length:totPg},(_,n)=>(
// //             <button key={n} onClick={()=>setPg(n)}
// //               style={{width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.15s",background:n===sp?"linear-gradient(135deg,#6D28D9,#A855F7)":"#FFFFFF",border:n===sp?"1.5px solid #7C3AED":"1.5px solid #DDD6FE",color:n===sp?"#fff":"#7C3AED",boxShadow:n===sp?"0 3px 10px rgba(124,58,237,0.38)":"0 1px 3px rgba(124,58,237,0.08)"}}>
// //               {n+1}
// //             </button>
// //           ))}
// //           <button disabled={sp>=totPg-1} onClick={()=>setPg(p=>p+1)}
// //             style={{width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",background:sp>=totPg-1?"#F1F0F9":"#FFFFFF",border:"1.5px solid",borderColor:sp>=totPg-1?"#E2D9F3":"#DDD6FE",cursor:sp>=totPg-1?"not-allowed":"pointer",opacity:sp>=totPg-1?0.4:1,transition:"all 0.15s"}}
// //             onMouseEnter={e=>sp<totPg-1&&(e.currentTarget.style.background="#EDE9FE")}
// //             onMouseLeave={e=>{e.currentTarget.style.background=sp>=totPg-1?"#F1F0F9":"#FFFFFF";}}>
// //             <ChevronRight style={{width:14,height:14,color:"#7C3AED"}}/>
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default function Index() {
// //   return (
// //     <div style={{minHeight:"100vh",fontFamily:"'Outfit',system-ui,sans-serif",background:"linear-gradient(160deg,#F5F3FF 0%,#EDE9FE 35%,#F5F3FF 65%,#FAF5FF 100%)",position:"relative"}}>
// //       <style>{G}</style>

// //       {/* ambient blobs */}
// //       <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
// //         <div style={{position:"absolute",width:700,height:500,borderRadius:"50%",top:-200,left:-200,background:"radial-gradient(ellipse,rgba(196,181,253,0.30) 0%,transparent 70%)"}}/>
// //         <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",bottom:-150,right:-100,background:"radial-gradient(ellipse,rgba(233,213,255,0.38) 0%,transparent 70%)"}}/>
// //         <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",top:"30%",right:"15%",background:"radial-gradient(ellipse,rgba(221,214,254,0.45) 0%,transparent 70%)"}}/>
// //       </div>

// //       <div style={{position:"relative",zIndex:1}}>

// //         {/* ═══ HEADER ═══ */}
// //         <header style={{background:"rgba(255,255,255,0.80)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:"1px solid #DDD6FE",boxShadow:"0 2px 20px rgba(124,58,237,0.09)"}}>
// //           <div style={{maxWidth:1300,margin:"0 auto",padding:"13px 28px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
// //             {/* logo */}
// //             <div style={{display:"flex",alignItems:"center",gap:13,flexShrink:0}}>
// //               <div style={{width:46,height:46,borderRadius:15,position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#4C1D95,#7C3AED)",boxShadow:"0 0 0 1px rgba(124,58,237,0.3),0 6px 18px rgba(124,58,237,0.38),inset 0 1px 0 rgba(255,255,255,0.22)"}}>
// //                 <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.20) 0%,transparent 60%)"}}/>
// //                 <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
// //                   <span style={{color:"#fff",fontWeight:800,fontSize:17,letterSpacing:"-0.5px"}}>HR</span>
// //                 </div>
// //               </div>
// //               <div>
// //                 <p style={{margin:0,fontSize:9.5,color:"#A855F7",fontWeight:800,letterSpacing:"0.17em",textTransform:"uppercase"}}>Connect Portal</p>
// //                 <p style={{margin:0,fontSize:16,color:"#2E1065",fontWeight:800,letterSpacing:"-0.4px"}}>HR Network</p>
// //               </div>
// //             </div>
// //             <div style={{width:1,height:34,background:"#DDD6FE",flexShrink:0}}/>
// //             {/* tabs */}
// //             <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
// //               {TABS.map((t,i)=>(
// //                 <button key={i} style={{padding:"5px 14px",fontSize:11.5,fontWeight:600,color:"#7C3AED",background:"rgba(237,233,254,0.75)",border:"1px solid #C4B5FD",borderRadius:99,cursor:"pointer",transition:"all 0.15s"}}
// //                   onMouseEnter={e=>{e.currentTarget.style.background="#DDD6FE";e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 3px 10px rgba(124,58,237,0.18)";}}
// //                   onMouseLeave={e=>{e.currentTarget.style.background="rgba(237,233,254,0.75)";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
// //                   {t}
// //                 </button>
// //               ))}
// //             </div>
// //             {/* live dot */}
// //             <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:7,flexShrink:0,background:"rgba(220,252,231,0.7)",border:"1px solid #86EFAC",padding:"4px 10px 4px 7px",borderRadius:99,boxShadow:"0 1px 6px rgba(34,197,94,0.12)"}}>
// //               <div style={{position:"relative",width:10,height:10,flexShrink:0}}>
// //                 <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"#22C55E",animation:"livePulse 1.6s ease-out infinite"}}/>
// //                 <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"#22C55E",animation:"livePulse 1.6s ease-out infinite 0.5s"}}/>
// //                 <div style={{position:"absolute",inset:"2px",borderRadius:"50%",background:"#16A34A",boxShadow:"0 0 4px rgba(22,163,74,0.6)"}}/>
// //               </div>
// //               <span style={{fontSize:10.5,color:"#15803D",fontWeight:800,letterSpacing:"0.1em"}}>LIVE</span>
// //             </div>
// //           </div>
// //         </header>

// //         {/* ═══ NAVBAR ═══ */}
// //         <nav style={{background:"rgba(255,255,255,0.72)",backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",borderBottom:"1px solid #EDE9FE"}}>
// //           <div style={{maxWidth:1300,margin:"0 auto",padding:"5px 28px",display:"flex",flexWrap:"wrap",gap:2}}>
// //             {NAV.map((lk,i)=>(
// //               <a key={i} href="#" style={{padding:"6px 13px",fontSize:10.5,fontWeight:700,color:"#7C3AED",letterSpacing:"0.06em",textDecoration:"none",borderRadius:8,textTransform:"uppercase",transition:"all 0.15s"}}
// //                 onMouseEnter={e=>{e.currentTarget.style.background="#EDE9FE";e.currentTarget.style.color="#4C1D95";}}
// //                 onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#7C3AED";}}>
// //                 {lk}
// //               </a>
// //             ))}
// //           </div>
// //         </nav>

// //         {/* ═══ MAIN ═══ */}
// //         <main style={{maxWidth:1300,margin:"0 auto",padding:"26px 28px",display:"grid",gridTemplateColumns:"1fr 3fr",gap:22,alignItems:"start"}}>
// //           <LoginCard/>
// //           <JobGrid/>
// //         </main>

// //         {/* ═══ FOOTER ═══ */}
// //         <footer style={{maxWidth:1300,margin:"0 auto",padding:"0 28px 36px"}}>
// //           <div style={{borderRadius:22,padding:"22px 28px",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:20,background:"rgba(255,255,255,0.80)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:"1px solid #DDD6FE",boxShadow:"0 4px 24px rgba(124,58,237,0.09),inset 0 1px 0 rgba(255,255,255,0.9)"}}>

// //             {/* envelope folders */}
// //             <div>
// //               <p style={{margin:"0 0 16px",fontSize:10,fontWeight:800,color:"#C4B5FD",letterSpacing:"0.1em",textTransform:"uppercase",display:"flex",alignItems:"center",gap:6}}>
// //                 <GraduationCap style={{width:12,height:12,color:"#7C3AED"}}/>
// //                 Qualification-wise Data Folders
// //               </p>
// //               <div style={{display:"flex",gap:14,alignItems:"flex-end",flexWrap:"wrap"}}>
// //                 {QUALS.map((q,i)=><Envelope key={i} {...q}/>)}
// //                 <AnimatedArrow/>
// //               </div>
// //             </div>

// //             <div style={{width:1,height:64,background:"#DDD6FE",flexShrink:0}}/>

// //             {/* action links */}
// //             <div style={{display:"flex",flexDirection:"column",gap:10}}>
// //               {[
// //                 {lbl:"HR Login for New Membership", col:"#6D28D9", bg:"#F5F3FF", border:"#DDD6FE"},
// //                 {lbl:"Admin Login",                 col:"#64748B", bg:"#F8FAFC", border:"#E2E8F0"},
// //               ].map((l,i)=>(
// //                 <a key={i} href="#" style={{display:"flex",alignItems:"center",gap:8,textDecoration:"none",fontSize:12.5,fontWeight:700,color:l.col,padding:"8px 16px",borderRadius:11,background:l.bg,border:`1.5px solid ${l.border}`,boxSizing:"border-box",transition:"all 0.15s",boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}
// //                   onMouseEnter={e=>{e.currentTarget.style.transform="translateX(4px)";e.currentTarget.style.boxShadow="0 4px 14px rgba(124,58,237,0.16)";e.currentTarget.style.borderColor="#C4B5FD";}}
// //                   onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.05)";e.currentTarget.style.borderColor=l.border;}}>
// //                   <ArrowRight style={{width:13,height:13,flexShrink:0}}/>
// //                   {l.lbl}
// //                   <ArrowRight style={{width:12,height:12,marginLeft:"auto",opacity:0.4}}/>
// //                 </a>
// //               ))}
// //             </div>

// //           </div>
// //         </footer>

// //       </div>
// //     </div>
// //   );
// // }
// // version3 end
// // verion 4 start

// // import { useState } from "react";
// // import {
// //   Search, X, ChevronUp, ChevronDown, ChevronsUpDown,
// //   Briefcase, Building2, GraduationCap, ArrowRight,
// //   ChevronLeft, ChevronRight, LogIn, Zap, UserPlus, UserCheck,
// // } from "lucide-react";
// // import { Link } from "react-router-dom";

// // const NAV  = ["Home","About Us","Authorised HRs","Core Committee","Services","Projects","Associates","Gallery","Contact Us"];
// // const TABS = ["PG & Degree Colleges","Industrial Associates","Entrepreneur Sources","Entrepreneur Network"];
// // const JOBS = [
// //   { org:"Hospitals",         n:25,  role:"Medical / Admin Staff"   },
// //   { org:"Schools",           n:12,  role:"Teaching / Admin"         },
// //   { org:"Colleges",          n:19,  role:"Faculty / Admin"          },
// //   { org:"IT Industry",       n:124, role:"Software / Support Eng."  },
// //   { org:"Hardware Industry", n:22,  role:"Technician / Engineer"    },
// //   { org:"Service Sector",    n:232, role:"Customer Support / Ops"   },
// //   { org:"Banks",             n:34,  role:"HR Manager / Executive"   },
// // ];

// // const QUALS = [
// //   { label:"Below SSC",  body:"#FFF7ED", border:"#F97316", lid:"#F97316", line:"#FED7AA", stamp:"#EA580C" },
// //   { label:"SSC",        body:"#FFF1F2", border:"#F43F5E", lid:"#F43F5E", line:"#FECDD3", stamp:"#C81A40" },
// //   { label:"ITI",        body:"#FFFBEB", border:"#F59E0B", lid:"#F59E0B", line:"#FDE68A", stamp:"#D97706" },
// //   { label:"Diploma",    body:"#F5F3FF", border:"#8B5CF6", lid:"#8B5CF6", line:"#DDD6FE", stamp:"#7C3AED" },
// //   { label:"Inter",      body:"#FAF5FF", border:"#A855F7", lid:"#A855F7", line:"#E9D5FF", stamp:"#9333EA" },
// //   { label:"Degree",     body:"#F3E8FF", border:"#C084FC", lid:"#C084FC", line:"#F3E8FF", stamp:"#A855F7" },
// //   { label:"PG",         body:"#EDE9FE", border:"#7C3AED", lid:"#7C3AED", line:"#C4B5FD", stamp:"#6D28D9" },
// // ];

// // const PAGE_SZ = 7; // show all 7 rows so heights match naturally
// // const MAX_V   = Math.max(...JOBS.map(j => j.n));
// // const ROW_H   = 54;

// // const tier = n =>
// //   n >= 100 ? { a:"#7C3AED", b:"#6D28D9", txt:"#fff", glow:"rgba(124,58,237,0.32)", bar:"#8B5CF6" }
// // : n >=  30 ? { a:"#A855F7", b:"#9333EA", txt:"#fff", glow:"rgba(168,85,247,0.28)", bar:"#C084FC" }
// // :            { a:"#C084FC", b:"#A855F7", txt:"#fff", glow:"rgba(192,132,252,0.25)", bar:"#DDD6FE" };

// // const SortIco = ({ on, dir }) =>
// //   !on ? <ChevronsUpDown style={{width:11,height:11,color:"#C4B5FD",flexShrink:0}}/>
// // : dir === "asc"
// //   ? <ChevronUp   style={{width:11,height:11,color:"#7C3AED",flexShrink:0}}/>
// //   : <ChevronDown style={{width:11,height:11,color:"#7C3AED",flexShrink:0}}/>;

// // const cardShadow = "0 1px 3px rgba(124,58,237,0.07), 0 8px 24px rgba(109,40,217,0.12), 0 1px 0 rgba(255,255,255,0.9) inset";

// // const G = `
// //   @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
// //   * { font-family: 'Outfit', system-ui, sans-serif !important; }

// //   /* ── Envelope ── */
// //   .env-wrap{display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;user-select:none;}
// //   .env-lbl{font-size:9.5px;font-weight:700;letter-spacing:.06em;color:#7C3AED;text-align:center;transition:color .2s;white-space:nowrap;}
// //   .env-wrap:hover .env-lbl{color:#4C1D95;}
// //   .env-svg{display:block;transition:transform .22s cubic-bezier(.34,1.56,.64,1);}
// //   .env-wrap:hover .env-svg{transform:translateY(-6px) scale(1.07);}
// //   .env-wrap:active .env-svg{transform:scale(0.95);}
// //   .env-paper{transition:transform .32s cubic-bezier(.34,1.4,.64,1) .05s;}
// //   .env-wrap:hover .env-paper{transform:translateY(-18px);}
// //   .env-flap{transform-origin:50% 0%;transition:transform .35s cubic-bezier(.34,1.3,.64,1) .1s;}
// //   .env-wrap:hover .env-flap{transform:rotateX(-170deg);}

// //   /* ── Triple Chevron ── */
// //   .tcc-wrap{display:flex;align-items:center;align-self:center;margin-left:8px;margin-bottom:18px;cursor:pointer;}
// //   .tcc-pill{display:flex;align-items:center;gap:2px;padding:6px 14px 6px 11px;background:linear-gradient(135deg,#EDE9FE 0%,#F5F3FF 100%);border:1.5px solid #C4B5FD;border-radius:50px;box-shadow:0 3px 16px rgba(124,58,237,0.18),inset 0 1px 0 rgba(255,255,255,0.85);position:relative;overflow:hidden;transition:box-shadow 0.2s,transform 0.2s;}
// //   .tcc-pill:hover{box-shadow:0 6px 22px rgba(124,58,237,0.30),inset 0 1px 0 rgba(255,255,255,0.85);transform:translateY(-2px);}
// //   .tcc-pill::before{content:'';position:absolute;inset:0;background:linear-gradient(100deg,transparent 20%,rgba(196,181,253,0.45) 50%,transparent 80%);background-size:220% 100%;background-position:-220% center;animation:tccShimmer 2.4s ease-in-out infinite;border-radius:50px;pointer-events:none;}
// //   @keyframes tccShimmer{0%{background-position:-220% center}60%{background-position:220% center}100%{background-position:220% center}}
// //   .tcc-label{font-size:9px;font-weight:800;letter-spacing:0.13em;color:#7C3AED;text-transform:uppercase;margin-right:5px;opacity:0.8;white-space:nowrap;position:relative;}
// //   .chev-svg{display:block;position:relative;}
// //   .chev-path-1{animation:chevWave 1.6s ease-in-out infinite 0s;}
// //   .chev-path-2{animation:chevWave 1.6s ease-in-out infinite 0.2s;}
// //   .chev-path-3{animation:chevWave 1.6s ease-in-out infinite 0.4s;}
// //   @keyframes chevWave{0%{opacity:0;stroke-dashoffset:28}25%{opacity:0.5;stroke-dashoffset:14}50%{opacity:1;stroke-dashoffset:0}75%{opacity:0.5;stroke-dashoffset:-14}100%{opacity:0;stroke-dashoffset:-28}}

// //   /* ── Live pulse ── */
// //   @keyframes livePulse{0%{transform:scale(1);opacity:.8}70%{transform:scale(2.4);opacity:0}100%{transform:scale(2.4);opacity:0}}

// //   /* ── Signup buttons ── */
// //   .su-hr:hover{background:#EDE9FE !important;border-color:#7C3AED !important;border-style:solid !important;color:#4C1D95 !important;box-shadow:0 4px 14px rgba(124,58,237,0.18) !important;transform:translateY(-1px);}
// //   .su-emp:hover{background:#F0FDF4 !important;border-color:#22C55E !important;border-style:solid !important;color:#15803D !important;box-shadow:0 4px 14px rgba(34,197,94,0.18) !important;transform:translateY(-1px);}

// //   /* ── Responsive layout ── */
// //   .main-grid {
// //     display: grid;
// //     grid-template-columns: 320px 1fr;
// //     gap: 22px;
// //     align-items: stretch;
// //   }
// //   .login-card-wrap { display: flex; flex-direction: column; }
// //   .login-card-inner { flex: 1; display: flex; flex-direction: column; }
// //   .login-form-body  { flex: 1; display: flex; flex-direction: column; }

// //   /* Job board stretches to fill */
// //   .job-board-wrap { display: flex; flex-direction: column; }
// //   .job-board-inner { flex: 1; display: flex; flex-direction: column; }
// //   .job-table-body  { flex: 1; overflow: hidden; }

// //   /* Nav scroll on mobile */
// //   .nav-scroll { display:flex; flex-wrap:wrap; gap:2px; }

// //   /* Tabs scroll */
// //   .tabs-scroll { display:flex; flex-wrap:wrap; gap:7px; }

// //   /* Footer envelopes scroll */
// //   .env-row { display:flex; gap:14px; align-items:flex-end; flex-wrap:wrap; }

// //   @media (max-width: 900px) {
// //     .main-grid { grid-template-columns: 1fr !important; }
// //     .page-pad  { padding: 16px 14px !important; }
// //     .header-inner { flex-wrap: wrap; gap: 10px !important; padding: 12px 14px !important; }
// //     .tabs-scroll  { display: flex; overflow-x: auto; flex-wrap: nowrap; padding-bottom: 4px; -webkit-overflow-scrolling: touch; }
// //     .tabs-scroll::-webkit-scrollbar { display: none; }
// //     .nav-scroll { overflow-x: auto; flex-wrap: nowrap; padding: 4px 14px; -webkit-overflow-scrolling: touch; }
// //     .nav-scroll::-webkit-scrollbar { display: none; }
// //     .footer-inner { flex-direction: column !important; gap: 16px !important; padding: 18px 14px !important; }
// //     .footer-divider { display: none !important; }
// //     .env-row { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 6px; -webkit-overflow-scrolling: touch; }
// //     .env-row::-webkit-scrollbar { display: none; }
// //     .tcc-wrap { margin-bottom: 0 !important; }
// //     .live-badge { display: none; }
// //   }

// //   @media (max-width: 600px) {
// //     .header-logo-text p:first-child { font-size: 8.5px !important; }
// //     .header-logo-text p:last-child  { font-size: 13px !important; }
// //     .job-col-role { display: none !important; }
// //     .job-col-org  { width: 55% !important; }
// //     .job-col-n    { width: 45% !important; }
// //     .th-role      { display: none !important; }
// //     .th-org       { width: 55% !important; }
// //     .th-n         { width: 45% !important; }
// //   }
// // `;

// // /* ══════ TRIPLE CHEVRON ════════════════════════════════════ */
// // function TripleChevron() {
// //   const chevColors = ["#6D28D9", "#9333EA", "#C084FC"];
// //   return (
// //     <div className="tcc-wrap">
// //       <div className="tcc-pill">
// //         <span className="tcc-label">View All</span>
// //         {chevColors.map((color, i) => (
// //           <svg key={i} className="chev-svg" width="13" height="22" viewBox="0 0 13 22" fill="none"
// //             style={{marginLeft: i === 0 ? 2 : -3}}>
// //             <path className={`chev-path-${i+1}`}
// //               d="M2.5 3.5 L10.5 11 L2.5 18.5"
// //               stroke={color} strokeWidth="3"
// //               strokeLinecap="round" strokeLinejoin="round"
// //               strokeDasharray="28" strokeDashoffset="28"/>
// //           </svg>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // /* ══════ ENVELOPE ══════════════════════════════════════════ */
// // function Envelope({ label, body, border, lid, line, stamp }) {
// //   return (
// //     <div className="env-wrap" tabIndex={0} aria-label={`${label} data folder`}>
// //       <svg className="env-svg" width="58" height="60" viewBox="0 0 70 72" fill="none">
// //         <g className="env-paper">
// //           <rect x="16" y="10" width="38" height="44" rx="3" fill="white" stroke={border} strokeWidth=".8"/>
// //           <rect x="21" y="17" width="28" height="2" rx="1" fill={line}/>
// //           <rect x="21" y="22" width="28" height="2" rx="1" fill={line}/>
// //           <rect x="21" y="27" width="20" height="2" rx="1" fill={line}/>
// //           <rect x="21" y="32" width="24" height="2" rx="1" fill={line}/>
// //           <rect x="21" y="37" width="16" height="2" rx="1" fill={line}/>
// //         </g>
// //         <rect x="4" y="30" width="62" height="40" rx="4" fill={body}/>
// //         <rect x="4" y="30" width="62" height="40" rx="4" stroke={border} strokeWidth="1.2"/>
// //         <path d="M4 70 L35 50 L4 30" fill={line}/>
// //         <path d="M66 70 L35 50 L66 30" fill={line}/>
// //         <path d="M4 70 L35 50 L66 70" fill={body} style={{filter:"brightness(0.96)"}}/>
// //         <path d="M4 30 L35 50 L66 30" fill="none" stroke={border} strokeWidth="0.8" opacity=".4"/>
// //         <g className="env-flap">
// //           <path d="M4 30 L35 50 L66 30 Q66 26 62 26 L8 26 Q4 26 4 30 Z" fill={lid}/>
// //         </g>
// //         <rect x="52" y="33" width="10" height="8" rx="1.5" fill={stamp} opacity=".75"/>
// //         <rect x="53" y="34" width="8" height="6" rx=".8" fill="white" opacity=".35"/>
// //       </svg>
// //       <span className="env-lbl">{label}</span>
// //     </div>
// //   );
// // }

// // /* ══════ LOGIN CARD ════════════════════════════════════════ */
// // function LoginCard() {
// //   const [id, setId] = useState("");
// //   const [pw, setPw] = useState("");

// //   return (
// //     <div className="login-card-inner" style={{borderRadius:20,overflow:"hidden",background:"#FFFFFF",border:"1px solid #DDD6FE",boxShadow:cardShadow}}>

// //       {/* Card header */}
// //       <div style={{background:"linear-gradient(135deg,#4C1D95 0%,#7C3AED 55%,#A855F7 100%)",padding:"22px 20px 18px",position:"relative",overflow:"hidden",flexShrink:0}}>
// //         <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.04) 60%,transparent 100%)",pointerEvents:"none"}}/>
// //         <div style={{position:"absolute",right:-22,top:-22,width:90,height:90,borderRadius:"50%",background:"rgba(255,255,255,0.08)",pointerEvents:"none"}}/>
// //         <div style={{position:"absolute",left:-10,bottom:-20,width:60,height:60,borderRadius:"50%",background:"rgba(196,181,253,0.15)",pointerEvents:"none"}}/>
// //         <div style={{width:40,height:40,borderRadius:13,marginBottom:13,background:"rgba(255,255,255,0.20)",border:"1px solid rgba(255,255,255,0.40)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",boxShadow:"0 3px 10px rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.35)"}}>
// //           <LogIn style={{width:17,height:17,color:"#fff"}}/>
// //         </div>
// //         <p style={{margin:0,fontSize:15,fontWeight:700,color:"#fff",letterSpacing:"-0.3px",position:"relative"}}>Login for HR &amp; Employer</p>
// //         <p style={{margin:"3px 0 0",fontSize:11,color:"rgba(255,255,255,0.70)",position:"relative"}}>Sign in to access your dashboard</p>
// //       </div>

// //       {/* Form body — flex:1 so it stretches */}
// //       <div className="login-form-body" style={{padding:"20px 18px 20px",display:"flex",flexDirection:"column",gap:11}}>

// //         <input type="text" placeholder="User ID / HR ID No." value={id} onChange={e=>setId(e.target.value)}
// //           style={{width:"100%",padding:"10px 14px",fontSize:13,boxSizing:"border-box",background:"#FAF5FF",border:"1.5px solid #DDD6FE",borderRadius:11,outline:"none",color:"#2E1065",transition:"all 0.2s"}}
// //           onFocus={e=>{e.target.style.borderColor="#7C3AED";e.target.style.background="#F3E8FF";e.target.style.boxShadow="0 0 0 3px rgba(196,181,253,0.45)";}}
// //           onBlur={e=>{e.target.style.borderColor="#DDD6FE";e.target.style.background="#FAF5FF";e.target.style.boxShadow="none";}}
// //         />
// //         <input type="password" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)}
// //           style={{width:"100%",padding:"10px 14px",fontSize:13,boxSizing:"border-box",background:"#FAF5FF",border:"1.5px solid #DDD6FE",borderRadius:11,outline:"none",color:"#2E1065",transition:"all 0.2s"}}
// //           onFocus={e=>{e.target.style.borderColor="#7C3AED";e.target.style.background="#F3E8FF";e.target.style.boxShadow="0 0 0 3px rgba(196,181,253,0.45)";}}
// //           onBlur={e=>{e.target.style.borderColor="#DDD6FE";e.target.style.background="#FAF5FF";e.target.style.boxShadow="none";}}
// //         />

// //         <button
// //           style={{width:"100%",padding:"11px",marginTop:1,background:"linear-gradient(135deg,#4C1D95,#7C3AED,#A855F7)",color:"#fff",fontWeight:700,fontSize:13.5,border:"none",borderRadius:12,cursor:"pointer",position:"relative",overflow:"hidden",boxShadow:"0 4px 18px rgba(124,58,237,0.45)",transition:"transform 0.15s,box-shadow 0.15s"}}
// //           onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(124,58,237,0.50)";}}
// //           onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 18px rgba(124,58,237,0.45)";}}
// //           onMouseDown={e=>e.currentTarget.style.transform="scale(0.97)"}
// //           onMouseUp={e=>e.currentTarget.style.transform="translateY(-2px)"}>
// //           <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 60%)",pointerEvents:"none"}}/>
// //           <span style={{position:"relative"}}>Sign In →</span>
// //         </button>

// //         <div style={{display:"flex",alignItems:"center",gap:8,margin:"2px 0"}}>
// //           <div style={{flex:1,height:1,background:"linear-gradient(90deg,transparent,#DDD6FE)"}}/>
// //           <span style={{fontSize:10,color:"#C4B5FD",fontWeight:700,letterSpacing:"0.07em",whiteSpace:"nowrap"}}>New here? Sign up as</span>
// //           <div style={{flex:1,height:1,background:"linear-gradient(90deg,#DDD6FE,transparent)"}}/>
// //         </div>

// //         <Link to="/signup" className="su-hr"
// //           style={{display:"flex",alignItems:"center",gap:8,padding:"9px 14px",background:"#FAF5FF",border:"1.5px dashed #C4B5FD",borderRadius:12,textDecoration:"none",fontSize:12.5,fontWeight:700,color:"#7C3AED",transition:"all 0.18s",cursor:"pointer",boxSizing:"border-box"}}>
// //           <div style={{width:26,height:26,borderRadius:8,background:"linear-gradient(135deg,#EDE9FE,#DDD6FE)",border:"1px solid #C4B5FD",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
// //             <UserPlus style={{width:13,height:13,color:"#7C3AED"}}/>
// //           </div>
// //           <div style={{display:"flex",flexDirection:"column",gap:1}}>
// //             <span style={{fontSize:12.5,fontWeight:700,lineHeight:1}}>Sign Up as HR</span>
// //             <span style={{fontSize:9.5,color:"#A78BFA",fontWeight:500,lineHeight:1}}>Register as HR professional</span>
// //           </div>
// //           <ArrowRight style={{width:12,height:12,color:"#C4B5FD",marginLeft:"auto",flexShrink:0}}/>
// //         </Link>

// //         <Link to="/employer-signup" className="su-emp"
// //           style={{display:"flex",alignItems:"center",gap:8,padding:"9px 14px",background:"#F0FFF4",border:"1.5px dashed #86EFAC",borderRadius:12,textDecoration:"none",fontSize:12.5,fontWeight:700,color:"#15803D",transition:"all 0.18s",cursor:"pointer",boxSizing:"border-box"}}>
// //           <div style={{width:26,height:26,borderRadius:8,background:"linear-gradient(135deg,#DCFCE7,#BBF7D0)",border:"1px solid #86EFAC",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
// //             <UserCheck style={{width:13,height:13,color:"#16A34A"}}/>
// //           </div>
// //           <div style={{display:"flex",flexDirection:"column",gap:1}}>
// //             <span style={{fontSize:12.5,fontWeight:700,lineHeight:1}}>Sign Up as Employer</span>
// //             <span style={{fontSize:9.5,color:"#4ADE80",fontWeight:500,lineHeight:1}}>Post jobs & hire talent</span>
// //           </div>
// //           <ArrowRight style={{width:12,height:12,color:"#86EFAC",marginLeft:"auto",flexShrink:0}}/>
// //         </Link>

// //         {/* Spacer pushes footer note to bottom */}
// //         <div style={{flex:1}}/>

// //         <p style={{margin:"2px 0 0",fontSize:10,color:"#A78BFA",lineHeight:1.6,borderTop:"1px solid #F3E8FF",paddingTop:10,textAlign:"center"}}>
// //           Declaration Form &amp; Security Insurance ECS required for activation.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ══════ JOB GRID ══════════════════════════════════════════ */
// // function JobGrid() {
// //   const [q,   setQ]  = useState("");
// //   const [pg,  setPg] = useState(0);
// //   const [srt, setSrt]= useState({ k:null, d:"asc" });

// //   const filt = JOBS.filter(r => {
// //     const lq = q.toLowerCase();
// //     return r.org.toLowerCase().includes(lq) || r.role.toLowerCase().includes(lq) || String(r.n).includes(lq);
// //   });
// //   const srtd = [...filt].sort((a,b) => {
// //     if (!srt.k) return 0;
// //     const A=a[srt.k], B=b[srt.k];
// //     return typeof A==="number"
// //       ? srt.d==="asc"?A-B:B-A
// //       : srt.d==="asc"?String(A).localeCompare(String(B)):String(B).localeCompare(String(A));
// //   });
// //   const totPg = Math.max(1,Math.ceil(srtd.length/PAGE_SZ));
// //   const sp    = Math.min(pg,totPg-1);
// //   const rows  = srtd.slice(sp*PAGE_SZ,(sp+1)*PAGE_SZ);
// //   const pad   = [...rows,...Array(PAGE_SZ-rows.length).fill(null)];
// //   const flip  = k=>{setSrt(p=>p.k===k?{k,d:p.d==="asc"?"desc":"asc"}:{k,d:"asc"});setPg(0);};

// //   const cols = [
// //     {lbl:"Organization", k:"org",  w:"37%", cls:"th-org",  bodyCls:"job-col-org"},
// //     {lbl:"Openings",     k:"n",    w:"21%", cls:"th-n",    bodyCls:"job-col-n"  },
// //     {lbl:"Role",         k:"role", w:"42%", cls:"th-role", bodyCls:"job-col-role"},
// //   ];

// //   return (
// //     <div className="job-board-inner" style={{borderRadius:20,overflow:"hidden",background:"#FFFFFF",border:"1px solid #DDD6FE",boxShadow:cardShadow}}>

// //       {/* Header */}
// //       <div style={{background:"linear-gradient(135deg,#4C1D95 0%,#7C3AED 50%,#A855F7 100%)",padding:"18px 20px",position:"relative",overflow:"hidden",flexShrink:0}}>
// //         <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.04) 50%,transparent 100%)",pointerEvents:"none"}}/>
// //         <div style={{position:"absolute",right:-30,top:-30,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,0.07)",pointerEvents:"none"}}/>
// //         <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative",gap:12,flexWrap:"wrap"}}>
// //           <div style={{display:"flex",alignItems:"center",gap:13}}>
// //             <div style={{width:42,height:42,borderRadius:13,background:"rgba(255,255,255,0.18)",border:"1px solid rgba(255,255,255,0.38)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.3)",flexShrink:0}}>
// //               <Briefcase style={{width:18,height:18,color:"#fff"}}/>
// //             </div>
// //             <div>
// //               <p style={{margin:0,fontSize:15,fontWeight:700,color:"#fff",letterSpacing:"-0.3px"}}>Live Job Board</p>
// //               <p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.70)"}}>
// //                 <Zap style={{width:9,height:9,display:"inline",marginRight:3,verticalAlign:"middle"}}/>
// //                 {filt.length} active listings
// //               </p>
// //             </div>
// //           </div>
// //           <div style={{position:"relative",flex:"1 1 180px",maxWidth:260,minWidth:140}}>
// //             <Search style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",width:13,height:13,color:"rgba(255,255,255,0.6)"}}/>
// //             <input type="text" placeholder="Search roles…" value={q}
// //               onChange={e=>{setQ(e.target.value);setPg(0);}}
// //               style={{width:"100%",paddingLeft:30,paddingRight:q?28:12,paddingTop:8,paddingBottom:8,fontSize:12.5,background:"rgba(255,255,255,0.16)",border:"1px solid rgba(255,255,255,0.32)",borderRadius:10,outline:"none",color:"#fff",boxSizing:"border-box",transition:"all 0.2s"}}
// //               onFocus={e=>{e.target.style.background="rgba(255,255,255,0.26)";e.target.style.borderColor="rgba(255,255,255,0.65)";}}
// //               onBlur={e=>{e.target.style.background="rgba(255,255,255,0.16)";e.target.style.borderColor="rgba(255,255,255,0.32)";}}
// //             />
// //             {q&&<button onClick={()=>{setQ("");setPg(0);}} style={{position:"absolute",right:9,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",padding:0,color:"rgba(255,255,255,0.7)"}}>
// //               <X style={{width:12,height:12}}/>
// //             </button>}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Column headers */}
// //       <div style={{display:"flex",background:"#F5F3FF",borderBottom:"1.5px solid #DDD6FE",flexShrink:0}}>
// //         {cols.map(c=>(
// //           <button key={c.k} className={c.cls} onClick={()=>flip(c.k)}
// //             style={{width:c.w,display:"flex",alignItems:"center",gap:5,padding:"11px 16px",background:"transparent",border:"none",cursor:"pointer",fontSize:10.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"#7C3AED",transition:"all 0.15s"}}
// //             onMouseEnter={e=>{e.currentTarget.style.background="#EDE9FE";e.currentTarget.style.color="#4C1D95";}}
// //             onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#7C3AED";}}>
// //             {c.lbl}<SortIco on={srt.k===c.k} dir={srt.d}/>
// //           </button>
// //         ))}
// //       </div>

// //       {/* Rows — flex:1 fills remaining height */}
// //       <div className="job-table-body" style={{flex:1}}>
// //         {pad.map((row,i)=>{
// //           const even=i%2===0;
// //           if(!row) return <div key={`p${i}`} style={{height:ROW_H,display:"flex",background:even?"#FFFFFF":"#FAFAFF",borderBottom:"1px solid #F5F3FF"}}/>;
// //           const t=tier(row.n);
// //           return(
// //             <div key={i} style={{height:ROW_H,display:"flex",alignItems:"center",background:even?"#FFFFFF":"#FAFAFF",borderBottom:"1px solid #F5F3FF",cursor:"pointer",transition:"background 0.15s"}}
// //               onMouseEnter={e=>e.currentTarget.style.background="#F5F3FF"}
// //               onMouseLeave={e=>e.currentTarget.style.background=even?"#FFFFFF":"#FAFAFF"}>
// //               <div className="job-col-org" style={{width:"37%",padding:"0 16px",display:"flex",alignItems:"center",gap:10}}>
// //                 <div style={{width:30,height:30,borderRadius:9,flexShrink:0,background:"linear-gradient(135deg,#EDE9FE,#DDD6FE)",border:"1px solid #C4B5FD",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.8)"}}>
// //                   <Building2 style={{width:13,height:13,color:"#7C3AED"}}/>
// //                 </div>
// //                 <span style={{fontSize:13,fontWeight:600,color:"#2E1065",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{row.org}</span>
// //               </div>
// //               <div className="job-col-n" style={{width:"21%",padding:"0 16px"}}>
// //                 <span style={{display:"inline-block",padding:"3px 11px",borderRadius:99,fontSize:11.5,fontWeight:700,background:`linear-gradient(135deg,${t.a},${t.b})`,color:t.txt,boxShadow:`0 2px 10px ${t.glow}`,letterSpacing:"0.02em"}}>{row.n}</span>
// //                 <div style={{height:3,background:"#EDE9FE",borderRadius:99,marginTop:6,width:"78%",overflow:"hidden"}}>
// //                   <div style={{height:"100%",borderRadius:99,background:`linear-gradient(90deg,${t.a},${t.bar})`,width:`${(row.n/MAX_V)*100}%`,transition:"width 0.4s ease"}}/>
// //                 </div>
// //               </div>
// //               <div className="job-col-role" style={{width:"42%",padding:"0 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
// //                 <span style={{fontSize:13,color:"#6D28D9",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{row.role}</span>
// //                 <ArrowRight style={{width:13,height:13,color:"#C4B5FD",flexShrink:0}}/>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>

// //       {/* Pagination footer */}
// //       <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 20px",background:"#F5F3FF",borderTop:"1.5px solid #DDD6FE",flexShrink:0,flexWrap:"wrap",gap:8}}>
// //         <p style={{margin:0,fontSize:12,color:"#7C3AED"}}>
// //           Showing{" "}
// //           <span style={{fontWeight:700,color:"#6D28D9"}}>{srtd.length===0?0:sp*PAGE_SZ+1}–{Math.min((sp+1)*PAGE_SZ,srtd.length)}</span>
// //           {" of "}
// //           <span style={{fontWeight:700,color:"#2E1065"}}>{srtd.length}</span>
// //         </p>
// //         <div style={{display:"flex",alignItems:"center",gap:5}}>
// //           <button disabled={sp===0} onClick={()=>setPg(p=>p-1)}
// //             style={{width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",background:sp===0?"#F1F0F9":"#FFFFFF",border:"1.5px solid",borderColor:sp===0?"#E2D9F3":"#DDD6FE",cursor:sp===0?"not-allowed":"pointer",opacity:sp===0?0.4:1,transition:"all 0.15s"}}>
// //             <ChevronLeft style={{width:14,height:14,color:"#7C3AED"}}/>
// //           </button>
// //           {Array.from({length:totPg},(_,n)=>(
// //             <button key={n} onClick={()=>setPg(n)}
// //               style={{width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.15s",background:n===sp?"linear-gradient(135deg,#6D28D9,#A855F7)":"#FFFFFF",border:n===sp?"1.5px solid #7C3AED":"1.5px solid #DDD6FE",color:n===sp?"#fff":"#7C3AED",boxShadow:n===sp?"0 3px 10px rgba(124,58,237,0.38)":"0 1px 3px rgba(124,58,237,0.08)"}}>
// //               {n+1}
// //             </button>
// //           ))}
// //           <button disabled={sp>=totPg-1} onClick={()=>setPg(p=>p+1)}
// //             style={{width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",background:sp>=totPg-1?"#F1F0F9":"#FFFFFF",border:"1.5px solid",borderColor:sp>=totPg-1?"#E2D9F3":"#DDD6FE",cursor:sp>=totPg-1?"not-allowed":"pointer",opacity:sp>=totPg-1?0.4:1,transition:"all 0.15s"}}>
// //             <ChevronRight style={{width:14,height:14,color:"#7C3AED"}}/>
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ══════ ROOT ══════════════════════════════════════════════ */
// // export default function Index() {
// //   return (
// //     <div style={{minHeight:"100vh",fontFamily:"'Outfit',system-ui,sans-serif",background:"linear-gradient(160deg,#F5F3FF 0%,#EDE9FE 35%,#F5F3FF 65%,#FAF5FF 100%)",position:"relative"}}>
// //       <style>{G}</style>

// //       {/* Background blobs */}
// //       <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
// //         <div style={{position:"absolute",width:700,height:500,borderRadius:"50%",top:-200,left:-200,background:"radial-gradient(ellipse,rgba(196,181,253,0.30) 0%,transparent 70%)"}}/>
// //         <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",bottom:-150,right:-100,background:"radial-gradient(ellipse,rgba(233,213,255,0.38) 0%,transparent 70%)"}}/>
// //         <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",top:"30%",right:"15%",background:"radial-gradient(ellipse,rgba(221,214,254,0.45) 0%,transparent 70%)"}}/>
// //       </div>

// //       <div style={{position:"relative",zIndex:1}}>

// //         {/* ── HEADER ── */}
// //         <header style={{background:"rgba(255,255,255,0.80)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:"1px solid #DDD6FE",boxShadow:"0 2px 20px rgba(124,58,237,0.09)"}}>
// //           <div className="header-inner" style={{maxWidth:1300,margin:"0 auto",padding:"13px 28px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>

// //             {/* Logo */}
// //             <div style={{display:"flex",alignItems:"center",gap:13,flexShrink:0}}>
// //               <div style={{width:46,height:46,borderRadius:15,position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#4C1D95,#7C3AED)",boxShadow:"0 0 0 1px rgba(124,58,237,0.3),0 6px 18px rgba(124,58,237,0.38),inset 0 1px 0 rgba(255,255,255,0.22)"}}>
// //                 <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.20) 0%,transparent 60%)"}}/>
// //                 <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
// //                   <span style={{color:"#fff",fontWeight:800,fontSize:17,letterSpacing:"-0.5px"}}>HR</span>
// //                 </div>
// //               </div>
// //               <div className="header-logo-text">
// //                 <p style={{margin:0,fontSize:9.5,color:"#A855F7",fontWeight:800,letterSpacing:"0.17em",textTransform:"uppercase"}}>Connect Portal</p>
// //                 <p style={{margin:0,fontSize:16,color:"#2E1065",fontWeight:800,letterSpacing:"-0.4px"}}>HR Network</p>
// //               </div>
// //             </div>

// //             <div style={{width:1,height:34,background:"#DDD6FE",flexShrink:0}}/>

// //             {/* Tabs */}
// //             <div className="tabs-scroll" style={{flex:1}}>
// //               {TABS.map((t,i)=>(
// //                 <button key={i} style={{padding:"5px 14px",fontSize:11.5,fontWeight:600,color:"#7C3AED",background:"rgba(237,233,254,0.75)",border:"1px solid #C4B5FD",borderRadius:99,cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap"}}
// //                   onMouseEnter={e=>{e.currentTarget.style.background="#DDD6FE";e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 3px 10px rgba(124,58,237,0.18)";}}
// //                   onMouseLeave={e=>{e.currentTarget.style.background="rgba(237,233,254,0.75)";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
// //                   {t}
// //                 </button>
// //               ))}
// //             </div>

// //             {/* Live badge */}
// //             <div className="live-badge" style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:7,flexShrink:0,background:"rgba(220,252,231,0.7)",border:"1px solid #86EFAC",padding:"4px 10px 4px 7px",borderRadius:99,boxShadow:"0 1px 6px rgba(34,197,94,0.12)"}}>
// //               <div style={{position:"relative",width:10,height:10,flexShrink:0}}>
// //                 <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"#22C55E",animation:"livePulse 1.6s ease-out infinite"}}/>
// //                 <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"#22C55E",animation:"livePulse 1.6s ease-out infinite 0.5s"}}/>
// //                 <div style={{position:"absolute",inset:"2px",borderRadius:"50%",background:"#16A34A",boxShadow:"0 0 4px rgba(22,163,74,0.6)"}}/>
// //               </div>
// //               <span style={{fontSize:10.5,color:"#15803D",fontWeight:800,letterSpacing:"0.1em"}}>LIVE</span>
// //             </div>
// //           </div>
// //         </header>

// //         {/* ── NAVBAR ── */}
// //         <nav style={{background:"rgba(255,255,255,0.72)",backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",borderBottom:"1px solid #EDE9FE",overflowX:"auto"}}>
// //           <div className="nav-scroll" style={{maxWidth:1300,margin:"0 auto",padding:"5px 28px"}}>
// //             {NAV.map((lk,i)=>(
// //               <a key={i} href="#" style={{padding:"6px 13px",fontSize:10.5,fontWeight:700,color:"#7C3AED",letterSpacing:"0.06em",textDecoration:"none",borderRadius:8,textTransform:"uppercase",transition:"all 0.15s",whiteSpace:"nowrap"}}
// //                 onMouseEnter={e=>{e.currentTarget.style.background="#EDE9FE";e.currentTarget.style.color="#4C1D95";}}
// //                 onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#7C3AED";}}>
// //                 {lk}
// //               </a>
// //             ))}
// //           </div>
// //         </nav>

// //         {/* ── MAIN — equal-height grid ── */}
// //         <main className="main-grid page-pad" style={{maxWidth:1300,margin:"0 auto",padding:"26px 28px"}}>
// //           {/* Login card wrapper: flex column so inner can stretch */}
// //           <div className="login-card-wrap" style={{display:"flex",flexDirection:"column"}}>
// //             <LoginCard/>
// //           </div>
// //           {/* Job board wrapper */}
// //           <div className="job-board-wrap" style={{display:"flex",flexDirection:"column"}}>
// //             <JobGrid/>
// //           </div>
// //         </main>

// //         {/* ── FOOTER ── */}
// //         <footer style={{maxWidth:1300,margin:"0 auto",padding:"0 28px 36px"}}>
// //           <div className="footer-inner" style={{borderRadius:22,padding:"22px 28px",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:20,background:"rgba(255,255,255,0.80)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:"1px solid #DDD6FE",boxShadow:"0 4px 24px rgba(124,58,237,0.09),inset 0 1px 0 rgba(255,255,255,0.9)"}}>
// //             <div style={{flex:1,minWidth:0}}>
// //               <p style={{margin:"0 0 16px",fontSize:10,fontWeight:800,color:"#C4B5FD",letterSpacing:"0.1em",textTransform:"uppercase",display:"flex",alignItems:"center",gap:6}}>
// //                 <GraduationCap style={{width:12,height:12,color:"#7C3AED"}}/>
// //                 Qualification-wise Data Folders
// //               </p>
// //               <div className="env-row">
// //                 {QUALS.map((q,i)=><Envelope key={i} {...q}/>)}
// //                 <TripleChevron/>
// //               </div>
// //             </div>
// //             <div className="footer-divider" style={{width:1,height:64,background:"#DDD6FE",flexShrink:0}}/>
// //           </div>
// //         </footer>

// //       </div>
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import {
//   Search, X, ChevronUp, ChevronDown, ChevronsUpDown,
//   Briefcase, Building2, GraduationCap, ArrowRight,
//   ChevronLeft, ChevronRight, LogIn, Zap, UserPlus, UserCheck,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// const NAV  = ["Home","About Us","Authorised HRs","Core Committee","Services","Projects","Associates","Gallery","Contact Us"];
// const TABS = ["PG & Degree Colleges","Industrial Associates","Entrepreneur Sources","Entrepreneur Network"];
// const JOBS = [
//   { org:"Hospitals",         n:25,  role:"Medical / Admin Staff"   },
//   { org:"Schools",           n:12,  role:"Teaching / Admin"         },
//   { org:"Colleges",          n:19,  role:"Faculty / Admin"          },
//   { org:"IT Industry",       n:124, role:"Software / Support Eng."  },
//   { org:"Hardware Industry", n:22,  role:"Technician / Engineer"    },
//   { org:"Service Sector",    n:232, role:"Customer Support / Ops"   },
//   { org:"Banks",             n:34,  role:"HR Manager / Executive"   },
// ];

// const QUALS = [
//   { label:"Below SSC",  body:"#FFF7ED", border:"#F97316", lid:"#F97316", line:"#FED7AA", stamp:"#EA580C" },
//   { label:"SSC",        body:"#FFF1F2", border:"#F43F5E", lid:"#F43F5E", line:"#FECDD3", stamp:"#C81A40" },
//   { label:"ITI",        body:"#FFFBEB", border:"#F59E0B", lid:"#F59E0B", line:"#FDE68A", stamp:"#D97706" },
//   { label:"Diploma",    body:"#F5F3FF", border:"#8B5CF6", lid:"#8B5CF6", line:"#DDD6FE", stamp:"#7C3AED" },
//   { label:"Inter",      body:"#FAF5FF", border:"#A855F7", lid:"#A855F7", line:"#E9D5FF", stamp:"#9333EA" },
//   { label:"Degree",     body:"#F3E8FF", border:"#C084FC", lid:"#C084FC", line:"#F3E8FF", stamp:"#A855F7" },
//   { label:"PG",         body:"#EDE9FE", border:"#7C3AED", lid:"#7C3AED", line:"#C4B5FD", stamp:"#6D28D9" },
// ];




// const PAGE_SZ = 7;
// const MAX_V   = Math.max(...JOBS.map(j => j.n));
// const ROW_H   = 54;

// const tier = (n: number) =>
//   n >= 100 ? { a:"#7C3AED", b:"#6D28D9", txt:"#fff", glow:"rgba(124,58,237,0.32)", bar:"#8B5CF6" }
// : n >=  30 ? { a:"#A855F7", b:"#9333EA", txt:"#fff", glow:"rgba(168,85,247,0.28)", bar:"#C084FC" }
// :            { a:"#C084FC", b:"#A855F7", txt:"#fff", glow:"rgba(192,132,252,0.25)", bar:"#DDD6FE" };

// const SortIco = ({ on, dir }: { on: boolean; dir: string }) =>
//   !on ? <ChevronsUpDown style={{width:11,height:11,color:"#C4B5FD",flexShrink:0}}/>
// : dir === "asc"
//   ? <ChevronUp   style={{width:11,height:11,color:"#7C3AED",flexShrink:0}}/>
//   : <ChevronDown style={{width:11,height:11,color:"#7C3AED",flexShrink:0}}/>;

// const cardShadow = "0 1px 3px rgba(124,58,237,0.07), 0 8px 24px rgba(109,40,217,0.12), 0 1px 0 rgba(255,255,255,0.9) inset";

// const G = `
//   @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
//   * { font-family: 'Outfit', system-ui, sans-serif !important; }

//   /* ── Envelope ── */
//   .env-wrap{display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;user-select:none;}
//   .env-lbl{font-size:9.5px;font-weight:700;letter-spacing:.06em;color:#7C3AED;text-align:center;transition:color .2s;white-space:nowrap;}
//   .env-wrap:hover .env-lbl{color:#4C1D95;}
//   .env-svg{display:block;transition:transform .22s cubic-bezier(.34,1.56,.64,1);}
//   .env-wrap:hover .env-svg{transform:translateY(-6px) scale(1.07);}
//   .env-wrap:active .env-svg{transform:scale(0.95);}
//   .env-paper{transition:transform .32s cubic-bezier(.34,1.4,.64,1) .05s;}
//   .env-wrap:hover .env-paper{transform:translateY(-18px);}
//   .env-flap{transform-origin:50% 0%;transition:transform .35s cubic-bezier(.34,1.3,.64,1) .1s;}
//   .env-wrap:hover .env-flap{transform:rotateX(-170deg);}

//   /* ── Triple Chevron ── */
//   .tcc-wrap{display:flex;align-items:center;align-self:center;margin-left:8px;margin-bottom:18px;cursor:pointer;}
//   .tcc-pill{display:flex;align-items:center;gap:2px;padding:6px 14px 6px 11px;background:linear-gradient(135deg,#EDE9FE 0%,#F5F3FF 100%);border:1.5px solid #C4B5FD;border-radius:50px;box-shadow:0 3px 16px rgba(124,58,237,0.18),inset 0 1px 0 rgba(255,255,255,0.85);position:relative;overflow:hidden;transition:box-shadow 0.2s,transform 0.2s;}
//   .tcc-pill:hover{box-shadow:0 6px 22px rgba(124,58,237,0.30),inset 0 1px 0 rgba(255,255,255,0.85);transform:translateY(-2px);}
//   .tcc-pill::before{content:'';position:absolute;inset:0;background:linear-gradient(100deg,transparent 20%,rgba(196,181,253,0.45) 50%,transparent 80%);background-size:220% 100%;background-position:-220% center;animation:tccShimmer 2.4s ease-in-out infinite;border-radius:50px;pointer-events:none;}
//   @keyframes tccShimmer{0%{background-position:-220% center}60%{background-position:220% center}100%{background-position:220% center}}
//   .tcc-label{font-size:9px;font-weight:800;letter-spacing:0.13em;color:#7C3AED;text-transform:uppercase;margin-right:5px;opacity:0.8;white-space:nowrap;position:relative;}
//   .chev-svg{display:block;position:relative;}
//   .chev-path-1{animation:chevWave 1.6s ease-in-out infinite 0s;}
//   .chev-path-2{animation:chevWave 1.6s ease-in-out infinite 0.2s;}
//   .chev-path-3{animation:chevWave 1.6s ease-in-out infinite 0.4s;}
//   @keyframes chevWave{0%{opacity:0;stroke-dashoffset:28}25%{opacity:0.5;stroke-dashoffset:14}50%{opacity:1;stroke-dashoffset:0}75%{opacity:0.5;stroke-dashoffset:-14}100%{opacity:0;stroke-dashoffset:-28}}

//   /* ── Live pulse ── */
//   @keyframes livePulse{0%{transform:scale(1);opacity:.8}70%{transform:scale(2.4);opacity:0}100%{transform:scale(2.4);opacity:0}}

//   /* ── Signup buttons ── */
//   .su-hr:hover{background:#EDE9FE !important;border-color:#7C3AED !important;border-style:solid !important;color:#4C1D95 !important;box-shadow:0 4px 14px rgba(124,58,237,0.18) !important;transform:translateY(-1px);}
//   .su-emp:hover{background:#F0FDF4 !important;border-color:#22C55E !important;border-style:solid !important;color:#15803D !important;box-shadow:0 4px 14px rgba(34,197,94,0.18) !important;transform:translateY(-1px);}

//   /* ── Main 3-column grid ── */
//   .main-grid {
//     display: grid;
//     grid-template-columns: 320px 1fr 320px;
//     gap: 22px;
//     align-items: stretch;
//   }
//   .login-card-wrap { display: flex; flex-direction: column; }
//   .login-card-inner { flex: 1; display: flex; flex-direction: column; }
//   .login-form-body  { flex: 1; display: flex; flex-direction: column; }

//   .job-board-wrap { display: flex; flex-direction: column; }
//   .job-board-inner { flex: 1; display: flex; flex-direction: column; }
//   .job-table-body  { flex: 1; overflow: hidden; }

//   /* TV panel */
//   .tv-panel-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; }

//   /* ── TV styles ── */
//   .tv-body {
//     background: linear-gradient(160deg, #d4cfc8 0%, #b8b2aa 60%, #a09890 100%);
//     border-radius: 22px 22px 18px 18px;
//     padding: 18px 22px 22px;
//     box-shadow:
//       0 8px 32px rgba(0,0,0,0.38),
//       inset 0 2px 0 rgba(255,255,255,0.32),
//       inset 0 -2px 4px rgba(0,0,0,0.18);
//     border: 1px solid #8a8078;
//     width: 100%;
//     max-width: 300px;
//   }
//   .tv-bezel {
//     background: #1a1a1a;
//     border-radius: 12px;
//     padding: 10px;
//     box-shadow:
//       inset 0 4px 16px rgba(0,0,0,0.8),
//       inset 0 0 0 2px #111,
//       0 2px 8px rgba(0,0,0,0.4);
//   }
//   .tv-screen-wrap {
//     border-radius: 8px;
//     overflow: hidden;
//     position: relative;
//     box-shadow: inset 0 0 20px rgba(80,120,255,0.15);
//   }
//   .tv-scanlines {
//     position: absolute;
//     inset: 0;
//     background: repeating-linear-gradient(
//       0deg,
//       transparent,
//       transparent 3px,
//       rgba(0,0,0,0.07) 3px,
//       rgba(0,0,0,0.07) 4px
//     );
//     pointer-events: none;
//     z-index: 2;
//     border-radius: 8px;
//   }
//   .tv-glare {
//     position: absolute;
//     top: 0; left: 0; right: 0;
//     height: 35%;
//     background: linear-gradient(180deg, rgba(255,255,255,0.09) 0%, transparent 100%);
//     pointer-events: none;
//     z-index: 3;
//     border-radius: 8px 8px 0 0;
//   }
//   .tv-iframe-wrap {
//     position: relative;
//     padding-top: 56.25%;
//     background: #0f0f0f;
//   }
//   .tv-iframe-wrap iframe {
//     position: absolute;
//     top: 0; left: 0;
//     width: 100%; height: 100%;
//     border: none;
//     border-radius: 8px;
//   }
//   .tv-brand {
//     text-align: center;
//     margin-top: 8px;
//     font-size: 10px;
//     font-weight: 700;
//     letter-spacing: 0.18em;
//     color: #7a7068;
//     text-transform: uppercase;
//   }
//   .tv-controls {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     margin-top: 10px;
//     padding: 0 4px;
//   }
//   .tv-knob-group {
//     display: flex;
//     gap: 10px;
//     align-items: center;
//   }
//   .tv-knob-item {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 3px;
//   }
//   .tv-knob {
//     width: 24px; height: 24px;
//     border-radius: 50%;
//     background: radial-gradient(circle at 38% 35%, #888 0%, #4a4540 60%, #2a2520 100%);
//     box-shadow: 0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15);
//     border: 1px solid #333;
//     cursor: pointer;
//     position: relative;
//   }
//   .tv-knob-tick {
//     position: absolute;
//     top: 50%; left: 50%;
//     width: 2px; height: 8px;
//     background: #222;
//     border-radius: 1px;
//   }
//   .tv-knob-label {
//     font-size: 8px;
//     color: #8a8078;
//     letter-spacing: .05em;
//   }
//   .tv-power {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 4px;
//   }
//   .tv-led {
//     width: 8px; height: 8px;
//     border-radius: 50%;
//     background: #22c55e;
//     box-shadow: 0 0 6px #22c55e, 0 0 12px rgba(34,197,94,0.5);
//   }
//   .tv-led-label {
//     font-size: 8px;
//     color: #8a8078;
//   }
//   .tv-antenna-wrap {
//     display: flex;
//     gap: 28px;
//     margin-bottom: -2px;
//     position: relative;
//     z-index: 2;
//     justify-content: center;
//   }
//   .tv-antenna {
//     width: 3px; height: 52px;
//     background: #6b6b6b;
//     border-radius: 2px;
//   }
//   .tv-feet-wrap {
//     display: flex;
//     justify-content: space-between;
//     padding: 0 18px;
//   }
//   .tv-foot {
//     width: 18px; height: 10px;
//     background: linear-gradient(180deg, #a09890, #8a8078);
//     border-radius: 0 0 4px 4px;
//     box-shadow: 0 2px 4px rgba(0,0,0,0.3);
//   }
//   .tv-base {
//     width: 80%;
//     height: 8px;
//     background: linear-gradient(180deg, #888, #666);
//     border-radius: 0 0 6px 6px;
//     box-shadow: 0 3px 8px rgba(0,0,0,0.35);
//     margin: 0 auto;
//   }

//   /* Nav scroll on mobile */
//   .nav-scroll { display:flex; flex-wrap:wrap; gap:2px; }

//   /* Tabs scroll */
//   .tabs-scroll { display:flex; flex-wrap:wrap; gap:7px; }

//   /* Footer envelopes scroll */
//   .env-row { display:flex; gap:14px; align-items:flex-end; flex-wrap:wrap; }

//   /* ── Responsive ── */
//   @media (max-width: 1200px) {
//     .main-grid { grid-template-columns: 320px 1fr !important; }
//     .tv-panel-wrap { display: none !important; }
//   }
//   @media (max-width: 900px) {
//     .main-grid { grid-template-columns: 1fr !important; }
//     .page-pad  { padding: 16px 14px !important; }
//     .header-inner { flex-wrap: wrap; gap: 10px !important; padding: 12px 14px !important; }
//     .tabs-scroll  { display: flex; overflow-x: auto; flex-wrap: nowrap; padding-bottom: 4px; -webkit-overflow-scrolling: touch; }
//     .tabs-scroll::-webkit-scrollbar { display: none; }
//     .nav-scroll { overflow-x: auto; flex-wrap: nowrap; padding: 4px 14px; -webkit-overflow-scrolling: touch; }
//     .nav-scroll::-webkit-scrollbar { display: none; }
//     .footer-inner { flex-direction: column !important; gap: 16px !important; padding: 18px 14px !important; }
//     .footer-divider { display: none !important; }
//     .env-row { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 6px; -webkit-overflow-scrolling: touch; }
//     .env-row::-webkit-scrollbar { display: none; }
//     .tcc-wrap { margin-bottom: 0 !important; }
//     .live-badge { display: none; }
//   }
//   @media (max-width: 600px) {
//     .header-logo-text p:first-child { font-size: 8.5px !important; }
//     .header-logo-text p:last-child  { font-size: 13px !important; }
//     .job-col-role { display: none !important; }
//     .job-col-org  { width: 55% !important; }
//     .job-col-n    { width: 45% !important; }
//     .th-role      { display: none !important; }
//     .th-org       { width: 55% !important; }
//     .th-n         { width: 45% !important; }
//   }
// `;

// /* ══════ TRIPLE CHEVRON ════════════════════════════════════ */
// function TripleChevron() {
//   const chevColors = ["#6D28D9", "#9333EA", "#C084FC"];
//   return (
//     <div className="tcc-wrap">
//       <div className="tcc-pill">
//         <span className="tcc-label">View All</span>
//         {chevColors.map((color, i) => (
//           <svg key={i} className="chev-svg" width="13" height="22" viewBox="0 0 13 22" fill="none"
//             style={{marginLeft: i === 0 ? 2 : -3}}>
//             <path className={`chev-path-${i+1}`}
//               d="M2.5 3.5 L10.5 11 L2.5 18.5"
//               stroke={color} strokeWidth="3"
//               strokeLinecap="round" strokeLinejoin="round"
//               strokeDasharray="28" strokeDashoffset="28"/>
//           </svg>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ══════ ENVELOPE ══════════════════════════════════════════ */
// function Envelope({ label, body, border, lid, line, stamp }: {
//   label: string; body: string; border: string; lid: string; line: string; stamp: string;
// }) {
//   return (
//     <div className="env-wrap" tabIndex={0} aria-label={`${label} data folder`}>
//       <svg className="env-svg" width="58" height="60" viewBox="0 0 70 72" fill="none">
//         <g className="env-paper">
//           <rect x="16" y="10" width="38" height="44" rx="3" fill="white" stroke={border} strokeWidth=".8"/>
//           <rect x="21" y="17" width="28" height="2" rx="1" fill={line}/>
//           <rect x="21" y="22" width="28" height="2" rx="1" fill={line}/>
//           <rect x="21" y="27" width="20" height="2" rx="1" fill={line}/>
//           <rect x="21" y="32" width="24" height="2" rx="1" fill={line}/>
//           <rect x="21" y="37" width="16" height="2" rx="1" fill={line}/>
//         </g>
//         <rect x="4" y="30" width="62" height="40" rx="4" fill={body}/>
//         <rect x="4" y="30" width="62" height="40" rx="4" stroke={border} strokeWidth="1.2"/>
//         <path d="M4 70 L35 50 L4 30" fill={line}/>
//         <path d="M66 70 L35 50 L66 30" fill={line}/>
//         <path d="M4 70 L35 50 L66 70" fill={body} style={{filter:"brightness(0.96)"}}/>
//         <path d="M4 30 L35 50 L66 30" fill="none" stroke={border} strokeWidth="0.8" opacity=".4"/>
//         <g className="env-flap">
//           <path d="M4 30 L35 50 L66 30 Q66 26 62 26 L8 26 Q4 26 4 30 Z" fill={lid}/>
//         </g>
//         <rect x="52" y="33" width="10" height="8" rx="1.5" fill={stamp} opacity=".75"/>
//         <rect x="53" y="34" width="8" height="6" rx=".8" fill="white" opacity=".35"/>
//       </svg>
//       <span className="env-lbl">{label}</span>
//     </div>
//   );
// }

// /* ══════ TV / YOUTUBE PANEL ════════════════════════════════ */
// const YT_IDS = [
//   { id: "aBeIbTOKSiI", label: "Career Spotlight" },
//   { id: "HAnw168huqA", label: "Career Advice"    },
// ];

// function YouTubePanel() {
//   return (
//     <div style={{
//       display: "flex", flexDirection: "column",
//       alignItems: "center", gap: 18,
//       padding: "20px 0",
//       fontFamily: "'Outfit', system-ui, sans-serif",
//     }}>
//       {YT_IDS.map(({ id, label }) => (
//         <div key={id} style={{
//           width: "100%",
//           border: "2px solid #7C3AED",
//           borderRadius: 14, padding: 10,
//           background: "transparent",
//         }}>
//           {/* Screen */}
//           <div style={{ borderRadius: 8, overflow: "hidden", background: "#0d0d0d", position: "relative", lineHeight: 0 }}>
//             <div style={{ position:"absolute",inset:0,zIndex:2,pointerEvents:"none",borderRadius:8, background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 3px)" }}/>
//             <div style={{ position:"absolute",top:0,left:0,right:0,height:"36%",zIndex:3,pointerEvents:"none",borderRadius:"8px 8px 0 0", background:"linear-gradient(180deg,rgba(255,255,255,0.05) 0%,transparent 100%)" }}/>
//             <iframe
//               src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
//               title={label}
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               style={{ width:"100%", aspectRatio:"16/9", border:"none", display:"block" }}
//             />
//           </div>
//           {/* Label bar */}
//           <div style={{ display:"flex", alignItems:"center", marginTop:9, padding:"0 2px" }}>
//             <div style={{ width:5, height:5, borderRadius:"50%", background:"#7C3AED", flexShrink:0 }}/>
//             <div style={{ flex:1, height:1, background:"#7C3AED33", margin:"0 6px" }}/>
//             <span style={{ fontSize:9, fontWeight:800, letterSpacing:"0.14em", color:"#7C3AED", textTransform:"uppercase", whiteSpace:"nowrap" }}>{label}</span>
//             <div style={{ flex:1, height:1, background:"#7C3AED33", margin:"0 6px" }}/>
//             <div style={{ width:5, height:5, borderRadius:"50%", background:"#7C3AED", flexShrink:0 }}/>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
// /* ══════ LOGIN CARD ════════════════════════════════════════ */
// function LoginCard() {
//   const [id, setId] = useState("");
//   const [pw, setPw] = useState("");

//   return (
//     <div className="login-card-inner" style={{borderRadius:20,overflow:"hidden",background:"#FFFFFF",border:"1px solid #DDD6FE",boxShadow:cardShadow}}>

//       {/* Card header */}
//       <div style={{background:"linear-gradient(135deg,#4C1D95 0%,#7C3AED 55%,#A855F7 100%)",padding:"22px 20px 18px",position:"relative",overflow:"hidden",flexShrink:0}}>
//         <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.04) 60%,transparent 100%)",pointerEvents:"none"}}/>
//         <div style={{position:"absolute",right:-22,top:-22,width:90,height:90,borderRadius:"50%",background:"rgba(255,255,255,0.08)",pointerEvents:"none"}}/>
//         <div style={{position:"absolute",left:-10,bottom:-20,width:60,height:60,borderRadius:"50%",background:"rgba(196,181,253,0.15)",pointerEvents:"none"}}/>
//         <div style={{width:40,height:40,borderRadius:13,marginBottom:13,background:"rgba(255,255,255,0.20)",border:"1px solid rgba(255,255,255,0.40)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",boxShadow:"0 3px 10px rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.35)"}}>
//           <LogIn style={{width:17,height:17,color:"#fff"}}/>
//         </div>
//         <p style={{margin:0,fontSize:15,fontWeight:700,color:"#fff",letterSpacing:"-0.3px",position:"relative"}}>Login for HR &amp; Employer</p>
//         <p style={{margin:"3px 0 0",fontSize:11,color:"rgba(255,255,255,0.70)",position:"relative"}}>Sign in to access your dashboard</p>
//       </div>

//       {/* Form body */}
//       <div className="login-form-body" style={{padding:"20px 18px 20px",display:"flex",flexDirection:"column",gap:11}}>

//         <input type="text" placeholder="User ID / HR ID No." value={id} onChange={e=>setId(e.target.value)}
//           style={{width:"100%",padding:"10px 14px",fontSize:13,boxSizing:"border-box",background:"#FAF5FF",border:"1.5px solid #DDD6FE",borderRadius:11,outline:"none",color:"#2E1065",transition:"all 0.2s"}}
//           onFocus={e=>{e.target.style.borderColor="#7C3AED";e.target.style.background="#F3E8FF";e.target.style.boxShadow="0 0 0 3px rgba(196,181,253,0.45)";}}
//           onBlur={e=>{e.target.style.borderColor="#DDD6FE";e.target.style.background="#FAF5FF";e.target.style.boxShadow="none";}}
//         />
//         <input type="password" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)}
//           style={{width:"100%",padding:"10px 14px",fontSize:13,boxSizing:"border-box",background:"#FAF5FF",border:"1.5px solid #DDD6FE",borderRadius:11,outline:"none",color:"#2E1065",transition:"all 0.2s"}}
//           onFocus={e=>{e.target.style.borderColor="#7C3AED";e.target.style.background="#F3E8FF";e.target.style.boxShadow="0 0 0 3px rgba(196,181,253,0.45)";}}
//           onBlur={e=>{e.target.style.borderColor="#DDD6FE";e.target.style.background="#FAF5FF";e.target.style.boxShadow="none";}}
//         />

//         <button
//           style={{width:"100%",padding:"11px",marginTop:1,background:"linear-gradient(135deg,#4C1D95,#7C3AED,#A855F7)",color:"#fff",fontWeight:700,fontSize:13.5,border:"none",borderRadius:12,cursor:"pointer",position:"relative",overflow:"hidden",boxShadow:"0 4px 18px rgba(124,58,237,0.45)",transition:"transform 0.15s,box-shadow 0.15s"}}
//           onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(124,58,237,0.50)";}}
//           onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 18px rgba(124,58,237,0.45)";}}
//           onMouseDown={e=>e.currentTarget.style.transform="scale(0.97)"}
//           onMouseUp={e=>e.currentTarget.style.transform="translateY(-2px)"}>
//           <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 60%)",pointerEvents:"none"}}/>
//           <span style={{position:"relative"}}>Sign In →</span>
//         </button>

//         <div style={{display:"flex",alignItems:"center",gap:8,margin:"2px 0"}}>
//           <div style={{flex:1,height:1,background:"linear-gradient(90deg,transparent,#DDD6FE)"}}/>
//           <span style={{fontSize:10,color:"#C4B5FD",fontWeight:700,letterSpacing:"0.07em",whiteSpace:"nowrap"}}>New here? Sign up as</span>
//           <div style={{flex:1,height:1,background:"linear-gradient(90deg,#DDD6FE,transparent)"}}/>
//         </div>

//         <Link to="/signup" className="su-hr"
//           style={{display:"flex",alignItems:"center",gap:8,padding:"9px 14px",background:"#FAF5FF",border:"1.5px dashed #C4B5FD",borderRadius:12,textDecoration:"none",fontSize:12.5,fontWeight:700,color:"#7C3AED",transition:"all 0.18s",cursor:"pointer",boxSizing:"border-box"}}>
//           <div style={{width:26,height:26,borderRadius:8,background:"linear-gradient(135deg,#EDE9FE,#DDD6FE)",border:"1px solid #C4B5FD",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
//             <UserPlus style={{width:13,height:13,color:"#7C3AED"}}/>
//           </div>
//           <div style={{display:"flex",flexDirection:"column",gap:1}}>
//             <span style={{fontSize:12.5,fontWeight:700,lineHeight:1}}>Sign Up as HR</span>
//             <span style={{fontSize:9.5,color:"#A78BFA",fontWeight:500,lineHeight:1}}>Register as HR professional</span>
//           </div>
//           <ArrowRight style={{width:12,height:12,color:"#C4B5FD",marginLeft:"auto",flexShrink:0}}/>
//         </Link>

//         <Link to="/employer/signup" className="su-emp"
//           style={{display:"flex",alignItems:"center",gap:8,padding:"9px 14px",background:"#F0FFF4",border:"1.5px dashed #86EFAC",borderRadius:12,textDecoration:"none",fontSize:12.5,fontWeight:700,color:"#15803D",transition:"all 0.18s",cursor:"pointer",boxSizing:"border-box"}}>
//           <div style={{width:26,height:26,borderRadius:8,background:"linear-gradient(135deg,#DCFCE7,#BBF7D0)",border:"1px solid #86EFAC",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
//             <UserCheck style={{width:13,height:13,color:"#16A34A"}}/>
//           </div>
//           <div style={{display:"flex",flexDirection:"column",gap:1}}>
//             <span style={{fontSize:12.5,fontWeight:700,lineHeight:1}}>Sign Up as Employer</span>
//             <span style={{fontSize:9.5,color:"#4ADE80",fontWeight:500,lineHeight:1}}>Post jobs & hire talent</span>
//           </div>
//           <ArrowRight style={{width:12,height:12,color:"#86EFAC",marginLeft:"auto",flexShrink:0}}/>
//         </Link>

//         <div style={{flex:1}}/>

//         <p style={{margin:"2px 0 0",fontSize:10,color:"#A78BFA",lineHeight:1.6,borderTop:"1px solid #F3E8FF",paddingTop:10,textAlign:"center"}}>
//           Declaration Form &amp; Security Insurance ECS required for activation.
//         </p>
//       </div>
//     </div>
//   );
// }

// /* ══════ JOB GRID ══════════════════════════════════════════ */
// function JobGrid() {
//   const [q,   setQ]  = useState("");
//   const [pg,  setPg] = useState(0);
//   const [srt, setSrt]= useState<{ k: string | null; d: string }>({ k:null, d:"asc" });

//   const filt = JOBS.filter(r => {
//     const lq = q.toLowerCase();
//     return r.org.toLowerCase().includes(lq) || r.role.toLowerCase().includes(lq) || String(r.n).includes(lq);
//   });
//   const srtd = [...filt].sort((a,b) => {
//     if (!srt.k) return 0;
//     const A = (a as Record<string, unknown>)[srt.k];
//     const B = (b as Record<string, unknown>)[srt.k];
//     return typeof A === "number" && typeof B === "number"
//       ? srt.d==="asc" ? A-B : B-A
//       : srt.d==="asc" ? String(A).localeCompare(String(B)) : String(B).localeCompare(String(A));
//   });
//   const totPg = Math.max(1,Math.ceil(srtd.length/PAGE_SZ));
//   const sp    = Math.min(pg,totPg-1);
//   const rows  = srtd.slice(sp*PAGE_SZ,(sp+1)*PAGE_SZ);
//   const pad   = [...rows,...Array(PAGE_SZ-rows.length).fill(null)];
//   const flip  = (k: string) => { setSrt(p=>p.k===k?{k,d:p.d==="asc"?"desc":"asc"}:{k,d:"asc"}); setPg(0); };

//   const cols = [
//     {lbl:"Organization", k:"org",  w:"37%", cls:"th-org",  bodyCls:"job-col-org"},
//     {lbl:"Openings",     k:"n",    w:"21%", cls:"th-n",    bodyCls:"job-col-n"  },
//     {lbl:"Role",         k:"role", w:"42%", cls:"th-role", bodyCls:"job-col-role"},
//   ];

//   return (
//     <div className="job-board-inner" style={{borderRadius:20,overflow:"hidden",background:"#FFFFFF",border:"1px solid #DDD6FE",boxShadow:cardShadow}}>

//       {/* Header */}
//       <div style={{background:"linear-gradient(135deg,#4C1D95 0%,#7C3AED 50%,#A855F7 100%)",padding:"18px 20px",position:"relative",overflow:"hidden",flexShrink:0}}>
//         <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.04) 50%,transparent 100%)",pointerEvents:"none"}}/>
//         <div style={{position:"absolute",right:-30,top:-30,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,0.07)",pointerEvents:"none"}}/>
//         <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative",gap:12,flexWrap:"wrap"}}>
//           <div style={{display:"flex",alignItems:"center",gap:13}}>
//             <div style={{width:42,height:42,borderRadius:13,background:"rgba(255,255,255,0.18)",border:"1px solid rgba(255,255,255,0.38)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.3)",flexShrink:0}}>
//               <Briefcase style={{width:18,height:18,color:"#fff"}}/>
//             </div>
//             <div>
//               <p style={{margin:0,fontSize:15,fontWeight:700,color:"#fff",letterSpacing:"-0.3px"}}>Live Job Board</p>
//               <p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.70)"}}>
//                 <Zap style={{width:9,height:9,display:"inline",marginRight:3,verticalAlign:"middle"}}/>
//                 {filt.length} active listings
//               </p>
//             </div>
//           </div>
//           <div style={{position:"relative",flex:"1 1 180px",maxWidth:260,minWidth:140}}>
//             <Search style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",width:13,height:13,color:"rgba(255,255,255,0.6)"}}/>
//             <input type="text" placeholder="Search roles…" value={q}
//               onChange={e=>{setQ(e.target.value);setPg(0);}}
//               style={{width:"100%",paddingLeft:30,paddingRight:q?28:12,paddingTop:8,paddingBottom:8,fontSize:12.5,background:"rgba(255,255,255,0.16)",border:"1px solid rgba(255,255,255,0.32)",borderRadius:10,outline:"none",color:"#fff",boxSizing:"border-box",transition:"all 0.2s"}}
//               onFocus={e=>{e.target.style.background="rgba(255,255,255,0.26)";e.target.style.borderColor="rgba(255,255,255,0.65)";}}
//               onBlur={e=>{e.target.style.background="rgba(255,255,255,0.16)";e.target.style.borderColor="rgba(255,255,255,0.32)";}}
//             />
//             {q&&<button onClick={()=>{setQ("");setPg(0);}} style={{position:"absolute",right:9,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",padding:0,color:"rgba(255,255,255,0.7)"}}>
//               <X style={{width:12,height:12}}/>
//             </button>}
//           </div>
//         </div>
//       </div>

//       {/* Column headers */}
//       <div style={{display:"flex",background:"#F5F3FF",borderBottom:"1.5px solid #DDD6FE",flexShrink:0}}>
//         {cols.map(c=>(
//           <button key={c.k} className={c.cls} onClick={()=>flip(c.k)}
//             style={{width:c.w,display:"flex",alignItems:"center",gap:5,padding:"11px 16px",background:"transparent",border:"none",cursor:"pointer",fontSize:10.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"#7C3AED",transition:"all 0.15s"}}
//             onMouseEnter={e=>{e.currentTarget.style.background="#EDE9FE";e.currentTarget.style.color="#4C1D95";}}
//             onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#7C3AED";}}>
//             {c.lbl}<SortIco on={srt.k===c.k} dir={srt.d}/>
//           </button>
//         ))}
//       </div>

//       {/* Rows */}
//       <div className="job-table-body" style={{flex:1}}>
//         {pad.map((row,i)=>{
//           const even=i%2===0;
//           if(!row) return <div key={`p${i}`} style={{height:ROW_H,display:"flex",background:even?"#FFFFFF":"#FAFAFF",borderBottom:"1px solid #F5F3FF"}}/>;
//           const t=tier(row.n);
//           return(
//             <div key={i} style={{height:ROW_H,display:"flex",alignItems:"center",background:even?"#FFFFFF":"#FAFAFF",borderBottom:"1px solid #F5F3FF",cursor:"pointer",transition:"background 0.15s"}}
//               onMouseEnter={e=>e.currentTarget.style.background="#F5F3FF"}
//               onMouseLeave={e=>e.currentTarget.style.background=even?"#FFFFFF":"#FAFAFF"}>
//               <div className="job-col-org" style={{width:"37%",padding:"0 16px",display:"flex",alignItems:"center",gap:10}}>
//                 <div style={{width:30,height:30,borderRadius:9,flexShrink:0,background:"linear-gradient(135deg,#EDE9FE,#DDD6FE)",border:"1px solid #C4B5FD",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.8)"}}>
//                   <Building2 style={{width:13,height:13,color:"#7C3AED"}}/>
//                 </div>
//                 <span style={{fontSize:13,fontWeight:600,color:"#2E1065",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{row.org}</span>
//               </div>
//               <div className="job-col-n" style={{width:"21%",padding:"0 16px"}}>
//                 <span style={{display:"inline-block",padding:"3px 11px",borderRadius:99,fontSize:11.5,fontWeight:700,background:`linear-gradient(135deg,${t.a},${t.b})`,color:t.txt,boxShadow:`0 2px 10px ${t.glow}`,letterSpacing:"0.02em"}}>{row.n}</span>
//                 <div style={{height:3,background:"#EDE9FE",borderRadius:99,marginTop:6,width:"78%",overflow:"hidden"}}>
//                   <div style={{height:"100%",borderRadius:99,background:`linear-gradient(90deg,${t.a},${t.bar})`,width:`${(row.n/MAX_V)*100}%`,transition:"width 0.4s ease"}}/>
//                 </div>
//               </div>
//               <div className="job-col-role" style={{width:"42%",padding:"0 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
//                 <span style={{fontSize:13,color:"#6D28D9",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{row.role}</span>
//                 <ArrowRight style={{width:13,height:13,color:"#C4B5FD",flexShrink:0}}/>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Pagination footer */}
//       <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 20px",background:"#F5F3FF",borderTop:"1.5px solid #DDD6FE",flexShrink:0,flexWrap:"wrap",gap:8}}>
//         <p style={{margin:0,fontSize:12,color:"#7C3AED"}}>
//           Showing{" "}
//           <span style={{fontWeight:700,color:"#6D28D9"}}>{srtd.length===0?0:sp*PAGE_SZ+1}–{Math.min((sp+1)*PAGE_SZ,srtd.length)}</span>
//           {" of "}
//           <span style={{fontWeight:700,color:"#2E1065"}}>{srtd.length}</span>
//         </p>
//         <div style={{display:"flex",alignItems:"center",gap:5}}>
//           <button disabled={sp===0} onClick={()=>setPg(p=>p-1)}
//             style={{width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",background:sp===0?"#F1F0F9":"#FFFFFF",border:"1.5px solid",borderColor:sp===0?"#E2D9F3":"#DDD6FE",cursor:sp===0?"not-allowed":"pointer",opacity:sp===0?0.4:1,transition:"all 0.15s"}}>
//             <ChevronLeft style={{width:14,height:14,color:"#7C3AED"}}/>
//           </button>
//           {Array.from({length:totPg},(_,n)=>(
//             <button key={n} onClick={()=>setPg(n)}
//               style={{width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.15s",background:n===sp?"linear-gradient(135deg,#6D28D9,#A855F7)":"#FFFFFF",border:n===sp?"1.5px solid #7C3AED":"1.5px solid #DDD6FE",color:n===sp?"#fff":"#7C3AED",boxShadow:n===sp?"0 3px 10px rgba(124,58,237,0.38)":"0 1px 3px rgba(124,58,237,0.08)"}}>
//               {n+1}
//             </button>
//           ))}
//           <button disabled={sp>=totPg-1} onClick={()=>setPg(p=>p+1)}
//             style={{width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",background:sp>=totPg-1?"#F1F0F9":"#FFFFFF",border:"1.5px solid",borderColor:sp>=totPg-1?"#E2D9F3":"#DDD6FE",cursor:sp>=totPg-1?"not-allowed":"pointer",opacity:sp>=totPg-1?0.4:1,transition:"all 0.15s"}}>
//             <ChevronRight style={{width:14,height:14,color:"#7C3AED"}}/>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ══════ ROOT ══════════════════════════════════════════════ */
// export default function Index() {
//   return (
//     <div style={{minHeight:"100vh",fontFamily:"'Outfit',system-ui,sans-serif",background:"linear-gradient(160deg,#F5F3FF 0%,#EDE9FE 35%,#F5F3FF 65%,#FAF5FF 100%)",position:"relative"}}>
//       <style>{G}</style>

//       {/* Background blobs */}
//       <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
//         <div style={{position:"absolute",width:700,height:500,borderRadius:"50%",top:-200,left:-200,background:"radial-gradient(ellipse,rgba(196,181,253,0.30) 0%,transparent 70%)"}}/>
//         <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",bottom:-150,right:-100,background:"radial-gradient(ellipse,rgba(233,213,255,0.38) 0%,transparent 70%)"}}/>
//         <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",top:"30%",right:"15%",background:"radial-gradient(ellipse,rgba(221,214,254,0.45) 0%,transparent 70%)"}}/>
//       </div>

//       <div style={{position:"relative",zIndex:1}}>

//         {/* ── HEADER ── */}
//         <header style={{background:"rgba(255,255,255,0.80)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:"1px solid #DDD6FE",boxShadow:"0 2px 20px rgba(124,58,237,0.09)"}}>
//           <div className="header-inner" style={{maxWidth:1400,margin:"0 auto",padding:"13px 28px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>

//             {/* Logo */}
//             <div style={{display:"flex",alignItems:"center",gap:13,flexShrink:0}}>
//               <div style={{width:46,height:46,borderRadius:15,position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#4C1D95,#7C3AED)",boxShadow:"0 0 0 1px rgba(124,58,237,0.3),0 6px 18px rgba(124,58,237,0.38),inset 0 1px 0 rgba(255,255,255,0.22)"}}>
//                 <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.20) 0%,transparent 60%)"}}/>
//                 <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
//                   <span style={{color:"#fff",fontWeight:800,fontSize:17,letterSpacing:"-0.5px"}}>HR</span>
//                 </div>
//               </div>
//               <div className="header-logo-text">
//                 <p style={{margin:0,fontSize:9.5,color:"#A855F7",fontWeight:800,letterSpacing:"0.17em",textTransform:"uppercase"}}>Connect Portal</p>
//                 <p style={{margin:0,fontSize:16,color:"#2E1065",fontWeight:800,letterSpacing:"-0.4px"}}>HR Network</p>
//               </div>
//             </div>

//             <div style={{width:1,height:34,background:"#DDD6FE",flexShrink:0}}/>

//             {/* Tabs */}
//             <div className="tabs-scroll" style={{flex:1}}>
//               {TABS.map((t,i)=>(
//                 <button key={i} style={{padding:"5px 14px",fontSize:11.5,fontWeight:600,color:"#7C3AED",background:"rgba(237,233,254,0.75)",border:"1px solid #C4B5FD",borderRadius:99,cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap"}}
//                   onMouseEnter={e=>{e.currentTarget.style.background="#DDD6FE";e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 3px 10px rgba(124,58,237,0.18)";}}
//                   onMouseLeave={e=>{e.currentTarget.style.background="rgba(237,233,254,0.75)";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
//                   {t}
//                 </button>
//               ))}
//             </div>

//             {/* Live badge */}
//             <div className="live-badge" style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:7,flexShrink:0,background:"rgba(220,252,231,0.7)",border:"1px solid #86EFAC",padding:"4px 10px 4px 7px",borderRadius:99,boxShadow:"0 1px 6px rgba(34,197,94,0.12)"}}>
//               <div style={{position:"relative",width:10,height:10,flexShrink:0}}>
//                 <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"#22C55E",animation:"livePulse 1.6s ease-out infinite"}}/>
//                 <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"#22C55E",animation:"livePulse 1.6s ease-out infinite 0.5s"}}/>
//                 <div style={{position:"absolute",inset:"2px",borderRadius:"50%",background:"#16A34A",boxShadow:"0 0 4px rgba(22,163,74,0.6)"}}/>
//               </div>
//               <span style={{fontSize:10.5,color:"#15803D",fontWeight:800,letterSpacing:"0.1em"}}>LIVE</span>
//             </div>
//           </div>
//         </header>

//         {/* ── NAVBAR ── */}
//         <nav style={{background:"rgba(255,255,255,0.72)",backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",borderBottom:"1px solid #EDE9FE",overflowX:"auto"}}>
//           <div className="nav-scroll" style={{maxWidth:1400,margin:"0 auto",padding:"5px 28px"}}>
//             {NAV.map((lk,i)=>(
//               <a key={i} href="#" style={{padding:"6px 13px",fontSize:10.5,fontWeight:700,color:"#7C3AED",letterSpacing:"0.06em",textDecoration:"none",borderRadius:8,textTransform:"uppercase",transition:"all 0.15s",whiteSpace:"nowrap"}}
//                 onMouseEnter={e=>{e.currentTarget.style.background="#EDE9FE";e.currentTarget.style.color="#4C1D95";}}
//                 onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#7C3AED";}}>
//                 {lk}
//               </a>
//             ))}
//           </div>
//         </nav>

//         {/* ── MAIN — 3-column equal-height grid ── */}
//         <main className="main-grid page-pad" style={{maxWidth:1400,margin:"0 auto",padding:"26px 28px"}}>

//           {/* Col 1 — Login card */}
//           <div className="login-card-wrap">
//             <LoginCard/>
//           </div>

//           {/* Col 2 — Job board */}
//           <div className="job-board-wrap">
//             <JobGrid/>
//           </div>

//           {/* Col 3 — TV / YouTube panel */}
//           <div className="tv-panel-wrap">
//             <YouTubePanel/>
//           </div>

//         </main>

//         {/* ── FOOTER ── */}
//         <footer style={{maxWidth:1400,margin:"0 auto",padding:"0 28px 36px"}}>
//           <div className="footer-inner" style={{borderRadius:22,padding:"22px 28px",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:20,background:"rgba(255,255,255,0.80)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:"1px solid #DDD6FE",boxShadow:"0 4px 24px rgba(124,58,237,0.09),inset 0 1px 0 rgba(255,255,255,0.9)"}}>
//             <div style={{flex:1,minWidth:0}}>
//               <p style={{margin:"0 0 16px",fontSize:10,fontWeight:800,color:"#C4B5FD",letterSpacing:"0.1em",textTransform:"uppercase",display:"flex",alignItems:"center",gap:6}}>
//                 <GraduationCap style={{width:12,height:12,color:"#7C3AED"}}/>
//                 Qualification-wise Data Folders
//               </p>
//               <div className="env-row">
//                 {QUALS.map((q,i)=><Envelope key={i} {...q}/>)}
//                 <TripleChevron/>
//               </div>
//             </div>
//             <div className="footer-divider" style={{width:1,height:64,background:"#DDD6FE",flexShrink:0}}/>
//           </div>
//         </footer>

//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import {
  Search, X, ChevronUp, ChevronDown, ChevronsUpDown,
  Briefcase, Building2, GraduationCap, ArrowRight,
  ChevronLeft, ChevronRight, LogIn, Zap, UserPlus, UserCheck,
  Loader2, AlertCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

/* ═══════════════════════════════════════════════════════════
   Constants
═══════════════════════════════════════════════════════════ */
const BASE = "http://192.168.29.136:8000/api";

const NAV  = ["Home","About Us","Authorised HRs","Core Committee","Services","Projects","Associates","Gallery","Contact Us"];
const TABS = ["PG & Degree Colleges","Industrial Associates","Entrepreneur Sources","Entrepreneur Network"];
const JOBS = [
  { org:"Hospitals",         n:25,  role:"Medical / Admin Staff"   },
  { org:"Schools",           n:12,  role:"Teaching / Admin"         },
  { org:"Colleges",          n:19,  role:"Faculty / Admin"          },
  { org:"IT Industry",       n:124, role:"Software / Support Eng."  },
  { org:"Hardware Industry", n:22,  role:"Technician / Engineer"    },
  { org:"Service Sector",    n:232, role:"Customer Support / Ops"   },
  { org:"Banks",             n:34,  role:"HR Manager / Executive"   },
];

const QUALS = [
  { label:"Below SSC",  body:"#FFF7ED", border:"#F97316", lid:"#F97316", line:"#FED7AA", stamp:"#EA580C" },
  { label:"SSC",        body:"#FFF1F2", border:"#F43F5E", lid:"#F43F5E", line:"#FECDD3", stamp:"#C81A40" },
  { label:"ITI",        body:"#FFFBEB", border:"#F59E0B", lid:"#F59E0B", line:"#FDE68A", stamp:"#D97706" },
  { label:"Diploma",    body:"#F5F3FF", border:"#8B5CF6", lid:"#8B5CF6", line:"#DDD6FE", stamp:"#7C3AED" },
  { label:"Inter",      body:"#FAF5FF", border:"#A855F7", lid:"#A855F7", line:"#E9D5FF", stamp:"#9333EA" },
  { label:"Degree",     body:"#F3E8FF", border:"#C084FC", lid:"#C084FC", line:"#F3E8FF", stamp:"#A855F7" },
  { label:"PG",         body:"#EDE9FE", border:"#7C3AED", lid:"#7C3AED", line:"#C4B5FD", stamp:"#6D28D9" },
];

const PAGE_SZ = 7;
const MAX_V   = Math.max(...JOBS.map(j => j.n));
const ROW_H   = 54;

const tier = (n: number) =>
  n >= 100 ? { a:"#7C3AED", b:"#6D28D9", txt:"#fff", glow:"rgba(124,58,237,0.32)", bar:"#8B5CF6" }
: n >=  30 ? { a:"#A855F7", b:"#9333EA", txt:"#fff", glow:"rgba(168,85,247,0.28)", bar:"#C084FC" }
:            { a:"#C084FC", b:"#A855F7", txt:"#fff", glow:"rgba(192,132,252,0.25)", bar:"#DDD6FE" };

const SortIco = ({ on, dir }: { on: boolean; dir: string }) =>
  !on ? <ChevronsUpDown style={{width:11,height:11,color:"#C4B5FD",flexShrink:0}}/>
: dir === "asc"
  ? <ChevronUp   style={{width:11,height:11,color:"#7C3AED",flexShrink:0}}/>
  : <ChevronDown style={{width:11,height:11,color:"#7C3AED",flexShrink:0}}/>;

const cardShadow = "0 1px 3px rgba(124,58,237,0.07), 0 8px 24px rgba(109,40,217,0.12), 0 1px 0 rgba(255,255,255,0.9) inset";

const G = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
  * { font-family: 'Outfit', system-ui, sans-serif !important; }

  .env-wrap{display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;user-select:none;}
  .env-lbl{font-size:9.5px;font-weight:700;letter-spacing:.06em;color:#7C3AED;text-align:center;transition:color .2s;white-space:nowrap;}
  .env-wrap:hover .env-lbl{color:#4C1D95;}
  .env-svg{display:block;transition:transform .22s cubic-bezier(.34,1.56,.64,1);}
  .env-wrap:hover .env-svg{transform:translateY(-6px) scale(1.07);}
  .env-wrap:active .env-svg{transform:scale(0.95);}
  .env-paper{transition:transform .32s cubic-bezier(.34,1.4,.64,1) .05s;}
  .env-wrap:hover .env-paper{transform:translateY(-18px);}
  .env-flap{transform-origin:50% 0%;transition:transform .35s cubic-bezier(.34,1.3,.64,1) .1s;}
  .env-wrap:hover .env-flap{transform:rotateX(-170deg);}

  .tcc-wrap{display:flex;align-items:center;align-self:center;margin-left:8px;margin-bottom:18px;cursor:pointer;}
  .tcc-pill{display:flex;align-items:center;gap:2px;padding:6px 14px 6px 11px;background:linear-gradient(135deg,#EDE9FE 0%,#F5F3FF 100%);border:1.5px solid #C4B5FD;border-radius:50px;box-shadow:0 3px 16px rgba(124,58,237,0.18),inset 0 1px 0 rgba(255,255,255,0.85);position:relative;overflow:hidden;transition:box-shadow 0.2s,transform 0.2s;}
  .tcc-pill:hover{box-shadow:0 6px 22px rgba(124,58,237,0.30),inset 0 1px 0 rgba(255,255,255,0.85);transform:translateY(-2px);}
  .tcc-pill::before{content:'';position:absolute;inset:0;background:linear-gradient(100deg,transparent 20%,rgba(196,181,253,0.45) 50%,transparent 80%);background-size:220% 100%;background-position:-220% center;animation:tccShimmer 2.4s ease-in-out infinite;border-radius:50px;pointer-events:none;}
  @keyframes tccShimmer{0%{background-position:-220% center}60%{background-position:220% center}100%{background-position:220% center}}
  .tcc-label{font-size:9px;font-weight:800;letter-spacing:0.13em;color:#7C3AED;text-transform:uppercase;margin-right:5px;opacity:0.8;white-space:nowrap;position:relative;}
  .chev-svg{display:block;position:relative;}
  .chev-path-1{animation:chevWave 1.6s ease-in-out infinite 0s;}
  .chev-path-2{animation:chevWave 1.6s ease-in-out infinite 0.2s;}
  .chev-path-3{animation:chevWave 1.6s ease-in-out infinite 0.4s;}
  @keyframes chevWave{0%{opacity:0;stroke-dashoffset:28}25%{opacity:0.5;stroke-dashoffset:14}50%{opacity:1;stroke-dashoffset:0}75%{opacity:0.5;stroke-dashoffset:-14}100%{opacity:0;stroke-dashoffset:-28}}

  @keyframes livePulse{0%{transform:scale(1);opacity:.8}70%{transform:scale(2.4);opacity:0}100%{transform:scale(2.4);opacity:0}}

  .su-hr:hover{background:#EDE9FE !important;border-color:#7C3AED !important;border-style:solid !important;color:#4C1D95 !important;box-shadow:0 4px 14px rgba(124,58,237,0.18) !important;transform:translateY(-1px);}
  .su-emp:hover{background:#F0FDF4 !important;border-color:#22C55E !important;border-style:solid !important;color:#15803D !important;box-shadow:0 4px 14px rgba(34,197,94,0.18) !important;transform:translateY(-1px);}

  .main-grid {
    display: grid;
    grid-template-columns: 320px 1fr 320px;
    gap: 22px;
    align-items: stretch;
  }
  .login-card-wrap { display: flex; flex-direction: column; }
  .login-card-inner { flex: 1; display: flex; flex-direction: column; }
  .login-form-body  { flex: 1; display: flex; flex-direction: column; }
  .job-board-wrap { display: flex; flex-direction: column; }
  .job-board-inner { flex: 1; display: flex; flex-direction: column; }
  .job-table-body  { flex: 1; overflow: hidden; }
  .tv-panel-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; }

  .nav-scroll { display:flex; flex-wrap:wrap; gap:2px; }
  .tabs-scroll { display:flex; flex-wrap:wrap; gap:7px; }
  .env-row { display:flex; gap:14px; align-items:flex-end; flex-wrap:wrap; }

  @media (max-width: 1200px) {
    .main-grid { grid-template-columns: 320px 1fr !important; }
    .tv-panel-wrap { display: none !important; }
  }
  @media (max-width: 900px) {
    .main-grid { grid-template-columns: 1fr !important; }
    .page-pad  { padding: 16px 14px !important; }
    .header-inner { flex-wrap: wrap; gap: 10px !important; padding: 12px 14px !important; }
    .tabs-scroll  { display: flex; overflow-x: auto; flex-wrap: nowrap; padding-bottom: 4px; -webkit-overflow-scrolling: touch; }
    .tabs-scroll::-webkit-scrollbar { display: none; }
    .nav-scroll { overflow-x: auto; flex-wrap: nowrap; padding: 4px 14px; -webkit-overflow-scrolling: touch; }
    .nav-scroll::-webkit-scrollbar { display: none; }
    .footer-inner { flex-direction: column !important; gap: 16px !important; padding: 18px 14px !important; }
    .footer-divider { display: none !important; }
    .env-row { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 6px; -webkit-overflow-scrolling: touch; }
    .env-row::-webkit-scrollbar { display: none; }
    .tcc-wrap { margin-bottom: 0 !important; }
    .live-badge { display: none; }
  }
  @media (max-width: 600px) {
    .header-logo-text p:first-child { font-size: 8.5px !important; }
    .header-logo-text p:last-child  { font-size: 13px !important; }
    .job-col-role { display: none !important; }
    .job-col-org  { width: 55% !important; }
    .job-col-n    { width: 45% !important; }
    .th-role      { display: none !important; }
    .th-org       { width: 55% !important; }
    .th-n         { width: 45% !important; }
  }
`;

/* ══════ TRIPLE CHEVRON ════════════════════════════════════ */
function TripleChevron() {
  const chevColors = ["#6D28D9", "#9333EA", "#C084FC"];
  return (
    <div className="tcc-wrap">
      <div className="tcc-pill">
        <span className="tcc-label">View All</span>
        {chevColors.map((color, i) => (
          <svg key={i} className="chev-svg" width="13" height="22" viewBox="0 0 13 22" fill="none"
            style={{marginLeft: i === 0 ? 2 : -3}}>
            <path className={`chev-path-${i+1}`}
              d="M2.5 3.5 L10.5 11 L2.5 18.5"
              stroke={color} strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="28" strokeDashoffset="28"/>
          </svg>
        ))}
      </div>
    </div>
  );
}

/* ══════ ENVELOPE ══════════════════════════════════════════ */
function Envelope({ label, body, border, lid, line, stamp }: {
  label: string; body: string; border: string; lid: string; line: string; stamp: string;
}) {
  return (
    <div className="env-wrap" tabIndex={0} aria-label={`${label} data folder`}>
      <svg className="env-svg" width="58" height="60" viewBox="0 0 70 72" fill="none">
        <g className="env-paper">
          <rect x="16" y="10" width="38" height="44" rx="3" fill="white" stroke={border} strokeWidth=".8"/>
          <rect x="21" y="17" width="28" height="2" rx="1" fill={line}/>
          <rect x="21" y="22" width="28" height="2" rx="1" fill={line}/>
          <rect x="21" y="27" width="20" height="2" rx="1" fill={line}/>
          <rect x="21" y="32" width="24" height="2" rx="1" fill={line}/>
          <rect x="21" y="37" width="16" height="2" rx="1" fill={line}/>
        </g>
        <rect x="4" y="30" width="62" height="40" rx="4" fill={body}/>
        <rect x="4" y="30" width="62" height="40" rx="4" stroke={border} strokeWidth="1.2"/>
        <path d="M4 70 L35 50 L4 30" fill={line}/>
        <path d="M66 70 L35 50 L66 30" fill={line}/>
        <path d="M4 70 L35 50 L66 70" fill={body} style={{filter:"brightness(0.96)"}}/>
        <path d="M4 30 L35 50 L66 30" fill="none" stroke={border} strokeWidth="0.8" opacity=".4"/>
        <g className="env-flap">
          <path d="M4 30 L35 50 L66 30 Q66 26 62 26 L8 26 Q4 26 4 30 Z" fill={lid}/>
        </g>
        <rect x="52" y="33" width="10" height="8" rx="1.5" fill={stamp} opacity=".75"/>
        <rect x="53" y="34" width="8" height="6" rx=".8" fill="white" opacity=".35"/>
      </svg>
      <span className="env-lbl">{label}</span>
    </div>
  );
}

/* ══════ YOUTUBE PANEL ═════════════════════════════════════ */
const YT_IDS = [
  { id: "aBeIbTOKSiI", label: "Career Spotlight" },
  { id: "HAnw168huqA", label: "Career Advice"    },
];

function YouTubePanel() {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:18, padding:"20px 0" }}>
      {YT_IDS.map(({ id, label }) => (
        <div key={id} style={{ width:"100%", border:"2px solid #7C3AED", borderRadius:14, padding:10, background:"transparent" }}>
          <div style={{ borderRadius:8, overflow:"hidden", background:"#0d0d0d", position:"relative", lineHeight:0 }}>
            <div style={{ position:"absolute",inset:0,zIndex:2,pointerEvents:"none",borderRadius:8, background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 3px)" }}/>
            <div style={{ position:"absolute",top:0,left:0,right:0,height:"36%",zIndex:3,pointerEvents:"none",borderRadius:"8px 8px 0 0", background:"linear-gradient(180deg,rgba(255,255,255,0.05) 0%,transparent 100%)" }}/>
            <iframe
              src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
              title={label}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width:"100%", aspectRatio:"16/9", border:"none", display:"block" }}
            />
          </div>
          <div style={{ display:"flex", alignItems:"center", marginTop:9, padding:"0 2px" }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:"#7C3AED", flexShrink:0 }}/>
            <div style={{ flex:1, height:1, background:"#7C3AED33", margin:"0 6px" }}/>
            <span style={{ fontSize:9, fontWeight:800, letterSpacing:"0.14em", color:"#7C3AED", textTransform:"uppercase", whiteSpace:"nowrap" }}>{label}</span>
            <div style={{ flex:1, height:1, background:"#7C3AED33", margin:"0 6px" }}/>
            <div style={{ width:5, height:5, borderRadius:"50%", background:"#7C3AED", flexShrink:0 }}/>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════ LOGIN CARD ════════════════════════════════════════ */
function LoginCard() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ── Sign In handler ── */
  // const handleSignIn = async () => {
  //   if (!id.trim() || !pw.trim()) {
  //     setError("Please enter your ID and password.");
  //     return;
  //   }
  //   setLoading(true);
  //   setError("");

  //   try {
  //     // ── Try HR login first ──
  //     const hrRes = await fetch(`${BASE}/hr/login/`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ identifier: id.trim(), password: pw }),
  //     });

  //     if (hrRes.ok) {
  //       const hrData = await hrRes.json();
  //       // Store token / user info if your backend returns them
  //       if (hrData.token) localStorage.setItem("token", hrData.token);
  //       if (hrData.hr_id) localStorage.setItem("hr_id", hrData.hr_id);
  //       localStorage.setItem("user_type", "hr");
  //       navigate("/hr/dashboard");
  //       return;
  //     }

  //     // ── Try Employer login ──
  //     const empRes = await fetch(`${BASE}/employer/login/`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ identifier: id.trim(), password: pw }),
  //     });

  //     if (empRes.ok) {
  //       const empData = await empRes.json();
  //       if (empData.token) localStorage.setItem("token", empData.token);
  //       if (empData.employer_id) localStorage.setItem("employer_id", empData.employer_id);
  //       localStorage.setItem("user_type", "employer");
  //       navigate("/employer/dashboard");
  //       return;
  //     }

  //     // ── Both failed ──
  //     // Try to parse error message from whichever returned a body
  //     const errBody = hrRes.status === 400
  //       ? await hrRes.json().catch(() => ({}))
  //       : await empRes.json().catch(() => ({}));

  //     const msg = errBody?.error || errBody?.detail || errBody?.message;
  //     setError(msg || "Invalid ID or password. Please try again.");

  //   } catch {
  //     setError("Network error. Please check your connection.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleSignIn = async () => {

  // =========================
  // VALIDATION
  // =========================
  if (!id.trim() || !pw.trim()) {

    setError(
      "Please enter your ID/email and password."
    );

    return;
  }

  setLoading(true);
  setError("");

  try {

    // =========================
    // SINGLE SIGNIN API
    // =========================
    const res = await fetch(
      `${BASE}/signin/`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          identifier: id.trim(),
          password: pw,
        }),
      }
    );

    const data = await res.json();

    // =========================
    // LOGIN FAILED
    // =========================
    if (!res.ok) {

      setError(
        data.error ||
        data.message ||
        "Login failed."
      );

      return;
    }

    // =========================
    // SAVE COMMON DATA
    // =========================
    localStorage.setItem(
      "user_type",
      data.role
    );

    // OPTIONAL TOKEN
    if (data.token) {

      localStorage.setItem(
        "token",
        data.token
      );
    }

    // =========================
    // HR LOGIN
    // =========================
    if (data.role === "hr") {

      localStorage.setItem(
        "hr_id",
        data.hr_id
      );

      localStorage.setItem(
        "hr_name",
        data.name
      );

      localStorage.setItem(
        "hr_email",
        data.email
      );

      navigate("/hr/dashboard");

      return;
    }

    // =========================
    // EMPLOYER LOGIN
    // =========================
    if (data.role === "employer") {

      localStorage.setItem(
        "employer_id",
        data.employer_id
      );

      localStorage.setItem(
        "employer_name",
        data.name
      );

      localStorage.setItem(
        "employer_email",
        data.email
      );

      localStorage.setItem(
        "company_name",
        data.company_name
      );

      // redirect employer
      navigate("/listpersons");

      return;
    }

    // =========================
    // UNKNOWN ROLE
    // =========================
    setError("Invalid account type.");

  } catch (error) {

    console.error(error);

    setError(
      "Network error. Please check your connection."
    );

  } finally {

    setLoading(false);
  }
};
  /* ── Enter key support ── */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSignIn();
  };

  return (
    <div className="login-card-inner" style={{borderRadius:20,overflow:"hidden",background:"#FFFFFF",border:"1px solid #DDD6FE",boxShadow:cardShadow}}>

      {/* Card header */}
      <div style={{background:"linear-gradient(135deg,#4C1D95 0%,#7C3AED 55%,#A855F7 100%)",padding:"22px 20px 18px",position:"relative",overflow:"hidden",flexShrink:0}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.04) 60%,transparent 100%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",right:-22,top:-22,width:90,height:90,borderRadius:"50%",background:"rgba(255,255,255,0.08)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",left:-10,bottom:-20,width:60,height:60,borderRadius:"50%",background:"rgba(196,181,253,0.15)",pointerEvents:"none"}}/>
        <div style={{width:40,height:40,borderRadius:13,marginBottom:13,background:"rgba(255,255,255,0.20)",border:"1px solid rgba(255,255,255,0.40)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",boxShadow:"0 3px 10px rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.35)"}}>
          <LogIn style={{width:17,height:17,color:"#fff"}}/>
        </div>
        <p style={{margin:0,fontSize:15,fontWeight:700,color:"#fff",letterSpacing:"-0.3px",position:"relative"}}>Login for HR &amp; Employer</p>
        <p style={{margin:"3px 0 0",fontSize:11,color:"rgba(255,255,255,0.70)",position:"relative"}}>Sign in to access your dashboard</p>
      </div>

      {/* Form body */}
      <div className="login-form-body" style={{padding:"20px 18px 20px",display:"flex",flexDirection:"column",gap:11}}>

        {/* ID field — accepts hr_id, employer_id, or email */}
        <div>
          <label style={{fontSize:9,fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase",color:"#A78BFA",display:"block",marginBottom:4}}>
            HR ID / Employer ID / Email
          </label>
          <input
            type="text"
            placeholder="e.g. HR1205260001 or you@email.com"
            value={id}
            onChange={e => { setId(e.target.value); setError(""); }}
            onKeyDown={handleKeyDown}
            style={{width:"100%",padding:"10px 14px",fontSize:12.5,boxSizing:"border-box",background:"#FAF5FF",border:"1.5px solid #DDD6FE",borderRadius:11,outline:"none",color:"#2E1065",transition:"all 0.2s"}}
            onFocus={e=>{e.target.style.borderColor="#7C3AED";e.target.style.background="#F3E8FF";e.target.style.boxShadow="0 0 0 3px rgba(196,181,253,0.45)";}}
            onBlur={e=>{e.target.style.borderColor="#DDD6FE";e.target.style.background="#FAF5FF";e.target.style.boxShadow="none";}}
          />
        </div>

        <div>
          <label style={{fontSize:9,fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase",color:"#A78BFA",display:"block",marginBottom:4}}>
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={e => { setPw(e.target.value); setError(""); }}
            onKeyDown={handleKeyDown}
            style={{width:"100%",padding:"10px 14px",fontSize:13,boxSizing:"border-box",background:"#FAF5FF",border:"1.5px solid #DDD6FE",borderRadius:11,outline:"none",color:"#2E1065",transition:"all 0.2s"}}
            onFocus={e=>{e.target.style.borderColor="#7C3AED";e.target.style.background="#F3E8FF";e.target.style.boxShadow="0 0 0 3px rgba(196,181,253,0.45)";}}
            onBlur={e=>{e.target.style.borderColor="#DDD6FE";e.target.style.background="#FAF5FF";e.target.style.boxShadow="none";}}
          />
        </div>

        {/* Error message */}
        {error && (
          <div style={{display:"flex",alignItems:"center",gap:7,background:"#FFF1F2",border:"1.5px solid #FECDD3",borderRadius:10,padding:"8px 12px"}}>
            <AlertCircle style={{width:14,height:14,color:"#F43F5E",flexShrink:0}}/>
            <span style={{fontSize:11.5,fontWeight:600,color:"#BE123C",lineHeight:1.4}}>{error}</span>
          </div>
        )}

        {/* Sign In button */}
        <button
          onClick={handleSignIn}
          disabled={loading}
          style={{width:"100%",padding:"11px",marginTop:1,background:"linear-gradient(135deg,#4C1D95,#7C3AED,#A855F7)",color:"#fff",fontWeight:700,fontSize:13.5,border:"none",borderRadius:12,cursor:loading?"not-allowed":"pointer",position:"relative",overflow:"hidden",boxShadow:"0 4px 18px rgba(124,58,237,0.45)",transition:"transform 0.15s,box-shadow 0.15s",opacity:loading?0.8:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}
          onMouseEnter={e=>{if(!loading){e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(124,58,237,0.50)";}}}
          onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 18px rgba(124,58,237,0.45)";}}
          onMouseDown={e=>{if(!loading)e.currentTarget.style.transform="scale(0.97)";}}
          onMouseUp={e=>{if(!loading)e.currentTarget.style.transform="translateY(-2px)";}}>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 60%)",pointerEvents:"none"}}/>
          {loading
            ? <><Loader2 style={{width:15,height:15,animation:"spin 1s linear infinite"}}/> Signing in…</>
            : <span style={{position:"relative"}}>Sign In →</span>
          }
        </button>

        {/* Hint */}
        <p style={{margin:0,fontSize:10,color:"#C4B5FD",textAlign:"center",lineHeight:1.5}}>
          Use your <b style={{color:"#9333EA"}}>HR ID</b> (e.g. HR1205260001),{" "}
          <b style={{color:"#9333EA"}}>Employer ID</b> (e.g. EM1605260001), or registered <b style={{color:"#9333EA"}}>email</b>
        </p>

        {/* Divider */}
        <div style={{display:"flex",alignItems:"center",gap:8,margin:"2px 0"}}>
          <div style={{flex:1,height:1,background:"linear-gradient(90deg,transparent,#DDD6FE)"}}/>
          <span style={{fontSize:10,color:"#C4B5FD",fontWeight:700,letterSpacing:"0.07em",whiteSpace:"nowrap"}}>New here? Sign up as</span>
          <div style={{flex:1,height:1,background:"linear-gradient(90deg,#DDD6FE,transparent)"}}/>
        </div>

        {/* HR signup link */}
        <Link to="/signup" className="su-hr"
          style={{display:"flex",alignItems:"center",gap:8,padding:"9px 14px",background:"#FAF5FF",border:"1.5px dashed #C4B5FD",borderRadius:12,textDecoration:"none",fontSize:12.5,fontWeight:700,color:"#7C3AED",transition:"all 0.18s",cursor:"pointer",boxSizing:"border-box"}}>
          <div style={{width:26,height:26,borderRadius:8,background:"linear-gradient(135deg,#EDE9FE,#DDD6FE)",border:"1px solid #C4B5FD",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <UserPlus style={{width:13,height:13,color:"#7C3AED"}}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:1}}>
            <span style={{fontSize:12.5,fontWeight:700,lineHeight:1}}>Sign Up as HR</span>
            <span style={{fontSize:9.5,color:"#A78BFA",fontWeight:500,lineHeight:1}}>Register as HR professional</span>
          </div>
          <ArrowRight style={{width:12,height:12,color:"#C4B5FD",marginLeft:"auto",flexShrink:0}}/>
        </Link>

        {/* Employer signup link */}
        <Link to="/employer/signup" className="su-emp"
          style={{display:"flex",alignItems:"center",gap:8,padding:"9px 14px",background:"#F0FFF4",border:"1.5px dashed #86EFAC",borderRadius:12,textDecoration:"none",fontSize:12.5,fontWeight:700,color:"#15803D",transition:"all 0.18s",cursor:"pointer",boxSizing:"border-box"}}>
          <div style={{width:26,height:26,borderRadius:8,background:"linear-gradient(135deg,#DCFCE7,#BBF7D0)",border:"1px solid #86EFAC",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <UserCheck style={{width:13,height:13,color:"#16A34A"}}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:1}}>
            <span style={{fontSize:12.5,fontWeight:700,lineHeight:1}}>Sign Up as Employer</span>
            <span style={{fontSize:9.5,color:"#4ADE80",fontWeight:500,lineHeight:1}}>Post jobs &amp; hire talent</span>
          </div>
          <ArrowRight style={{width:12,height:12,color:"#86EFAC",marginLeft:"auto",flexShrink:0}}/>
        </Link>

        <div style={{flex:1}}/>

        <p style={{margin:"2px 0 0",fontSize:10,color:"#A78BFA",lineHeight:1.6,borderTop:"1px solid #F3E8FF",paddingTop:10,textAlign:"center"}}>
          Declaration Form &amp; Security Insurance ECS required for activation.
        </p>
      </div>

      {/* Spin keyframe */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ══════ JOB GRID ══════════════════════════════════════════ */
function JobGrid() {
  const [q,   setQ]  = useState("");
  const [pg,  setPg] = useState(0);
  const [srt, setSrt]= useState<{ k: string | null; d: string }>({ k:null, d:"asc" });

  const filt = JOBS.filter(r => {
    const lq = q.toLowerCase();
    return r.org.toLowerCase().includes(lq) || r.role.toLowerCase().includes(lq) || String(r.n).includes(lq);
  });
  const srtd = [...filt].sort((a,b) => {
    if (!srt.k) return 0;
    const A = (a as Record<string, unknown>)[srt.k];
    const B = (b as Record<string, unknown>)[srt.k];
    return typeof A === "number" && typeof B === "number"
      ? srt.d==="asc" ? A-B : B-A
      : srt.d==="asc" ? String(A).localeCompare(String(B)) : String(B).localeCompare(String(A));
  });
  const totPg = Math.max(1,Math.ceil(srtd.length/PAGE_SZ));
  const sp    = Math.min(pg,totPg-1);
  const rows  = srtd.slice(sp*PAGE_SZ,(sp+1)*PAGE_SZ);
  const pad   = [...rows,...Array(PAGE_SZ-rows.length).fill(null)];
  const flip  = (k: string) => { setSrt(p=>p.k===k?{k,d:p.d==="asc"?"desc":"asc"}:{k,d:"asc"}); setPg(0); };

  const cols = [
    {lbl:"Organization", k:"org",  w:"37%", cls:"th-org",  bodyCls:"job-col-org"},
    {lbl:"Openings",     k:"n",    w:"21%", cls:"th-n",    bodyCls:"job-col-n"  },
    {lbl:"Role",         k:"role", w:"42%", cls:"th-role", bodyCls:"job-col-role"},
  ];

  return (
    <div className="job-board-inner" style={{borderRadius:20,overflow:"hidden",background:"#FFFFFF",border:"1px solid #DDD6FE",boxShadow:cardShadow}}>
      <div style={{background:"linear-gradient(135deg,#4C1D95 0%,#7C3AED 50%,#A855F7 100%)",padding:"18px 20px",position:"relative",overflow:"hidden",flexShrink:0}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.04) 50%,transparent 100%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",right:-30,top:-30,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,0.07)",pointerEvents:"none"}}/>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative",gap:12,flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:13}}>
            <div style={{width:42,height:42,borderRadius:13,background:"rgba(255,255,255,0.18)",border:"1px solid rgba(255,255,255,0.38)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.3)",flexShrink:0}}>
              <Briefcase style={{width:18,height:18,color:"#fff"}}/>
            </div>
            <div>
              <p style={{margin:0,fontSize:15,fontWeight:700,color:"#fff",letterSpacing:"-0.3px"}}>Live Job Board</p>
              <p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.70)"}}>
                <Zap style={{width:9,height:9,display:"inline",marginRight:3,verticalAlign:"middle"}}/>
                {filt.length} active listings
              </p>
            </div>
          </div>
          <div style={{position:"relative",flex:"1 1 180px",maxWidth:260,minWidth:140}}>
            <Search style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",width:13,height:13,color:"rgba(255,255,255,0.6)"}}/>
            <input type="text" placeholder="Search roles…" value={q}
              onChange={e=>{setQ(e.target.value);setPg(0);}}
              style={{width:"100%",paddingLeft:30,paddingRight:q?28:12,paddingTop:8,paddingBottom:8,fontSize:12.5,background:"rgba(255,255,255,0.16)",border:"1px solid rgba(255,255,255,0.32)",borderRadius:10,outline:"none",color:"#fff",boxSizing:"border-box",transition:"all 0.2s"}}
              onFocus={e=>{e.target.style.background="rgba(255,255,255,0.26)";e.target.style.borderColor="rgba(255,255,255,0.65)";}}
              onBlur={e=>{e.target.style.background="rgba(255,255,255,0.16)";e.target.style.borderColor="rgba(255,255,255,0.32)";}}
            />
            {q&&<button onClick={()=>{setQ("");setPg(0);}} style={{position:"absolute",right:9,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",padding:0,color:"rgba(255,255,255,0.7)"}}>
              <X style={{width:12,height:12}}/>
            </button>}
          </div>
        </div>
      </div>

      <div style={{display:"flex",background:"#F5F3FF",borderBottom:"1.5px solid #DDD6FE",flexShrink:0}}>
        {cols.map(c=>(
          <button key={c.k} className={c.cls} onClick={()=>flip(c.k)}
            style={{width:c.w,display:"flex",alignItems:"center",gap:5,padding:"11px 16px",background:"transparent",border:"none",cursor:"pointer",fontSize:10.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"#7C3AED",transition:"all 0.15s"}}
            onMouseEnter={e=>{e.currentTarget.style.background="#EDE9FE";e.currentTarget.style.color="#4C1D95";}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#7C3AED";}}>
            {c.lbl}<SortIco on={srt.k===c.k} dir={srt.d}/>
          </button>
        ))}
      </div>

      <div className="job-table-body" style={{flex:1}}>
        {pad.map((row,i)=>{
          const even=i%2===0;
          if(!row) return <div key={`p${i}`} style={{height:ROW_H,display:"flex",background:even?"#FFFFFF":"#FAFAFF",borderBottom:"1px solid #F5F3FF"}}/>;
          const t=tier(row.n);
          return(
            <div key={i} style={{height:ROW_H,display:"flex",alignItems:"center",background:even?"#FFFFFF":"#FAFAFF",borderBottom:"1px solid #F5F3FF",cursor:"pointer",transition:"background 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.background="#F5F3FF"}
              onMouseLeave={e=>e.currentTarget.style.background=even?"#FFFFFF":"#FAFAFF"}>
              <div className="job-col-org" style={{width:"37%",padding:"0 16px",display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:30,height:30,borderRadius:9,flexShrink:0,background:"linear-gradient(135deg,#EDE9FE,#DDD6FE)",border:"1px solid #C4B5FD",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.8)"}}>
                  <Building2 style={{width:13,height:13,color:"#7C3AED"}}/>
                </div>
                <span style={{fontSize:13,fontWeight:600,color:"#2E1065",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{row.org}</span>
              </div>
              <div className="job-col-n" style={{width:"21%",padding:"0 16px"}}>
                <span style={{display:"inline-block",padding:"3px 11px",borderRadius:99,fontSize:11.5,fontWeight:700,background:`linear-gradient(135deg,${t.a},${t.b})`,color:t.txt,boxShadow:`0 2px 10px ${t.glow}`,letterSpacing:"0.02em"}}>{row.n}</span>
                <div style={{height:3,background:"#EDE9FE",borderRadius:99,marginTop:6,width:"78%",overflow:"hidden"}}>
                  <div style={{height:"100%",borderRadius:99,background:`linear-gradient(90deg,${t.a},${t.bar})`,width:`${(row.n/MAX_V)*100}%`,transition:"width 0.4s ease"}}/>
                </div>
              </div>
              <div className="job-col-role" style={{width:"42%",padding:"0 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontSize:13,color:"#6D28D9",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{row.role}</span>
                <ArrowRight style={{width:13,height:13,color:"#C4B5FD",flexShrink:0}}/>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 20px",background:"#F5F3FF",borderTop:"1.5px solid #DDD6FE",flexShrink:0,flexWrap:"wrap",gap:8}}>
        <p style={{margin:0,fontSize:12,color:"#7C3AED"}}>
          Showing{" "}
          <span style={{fontWeight:700,color:"#6D28D9"}}>{srtd.length===0?0:sp*PAGE_SZ+1}–{Math.min((sp+1)*PAGE_SZ,srtd.length)}</span>
          {" of "}
          <span style={{fontWeight:700,color:"#2E1065"}}>{srtd.length}</span>
        </p>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          <button disabled={sp===0} onClick={()=>setPg(p=>p-1)}
            style={{width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",background:sp===0?"#F1F0F9":"#FFFFFF",border:"1.5px solid",borderColor:sp===0?"#E2D9F3":"#DDD6FE",cursor:sp===0?"not-allowed":"pointer",opacity:sp===0?0.4:1,transition:"all 0.15s"}}>
            <ChevronLeft style={{width:14,height:14,color:"#7C3AED"}}/>
          </button>
          {Array.from({length:totPg},(_,n)=>(
            <button key={n} onClick={()=>setPg(n)}
              style={{width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.15s",background:n===sp?"linear-gradient(135deg,#6D28D9,#A855F7)":"#FFFFFF",border:n===sp?"1.5px solid #7C3AED":"1.5px solid #DDD6FE",color:n===sp?"#fff":"#7C3AED",boxShadow:n===sp?"0 3px 10px rgba(124,58,237,0.38)":"0 1px 3px rgba(124,58,237,0.08)"}}>
              {n+1}
            </button>
          ))}
          <button disabled={sp>=totPg-1} onClick={()=>setPg(p=>p+1)}
            style={{width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",background:sp>=totPg-1?"#F1F0F9":"#FFFFFF",border:"1.5px solid",borderColor:sp>=totPg-1?"#E2D9F3":"#DDD6FE",cursor:sp>=totPg-1?"not-allowed":"pointer",opacity:sp>=totPg-1?0.4:1,transition:"all 0.15s"}}>
            <ChevronRight style={{width:14,height:14,color:"#7C3AED"}}/>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════ ROOT ══════════════════════════════════════════════ */
export default function Index() {
  return (
    <div style={{minHeight:"100vh",fontFamily:"'Outfit',system-ui,sans-serif",background:"linear-gradient(160deg,#F5F3FF 0%,#EDE9FE 35%,#F5F3FF 65%,#FAF5FF 100%)",position:"relative"}}>
      <style>{G}</style>

      <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
        <div style={{position:"absolute",width:700,height:500,borderRadius:"50%",top:-200,left:-200,background:"radial-gradient(ellipse,rgba(196,181,253,0.30) 0%,transparent 70%)"}}/>
        <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",bottom:-150,right:-100,background:"radial-gradient(ellipse,rgba(233,213,255,0.38) 0%,transparent 70%)"}}/>
        <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",top:"30%",right:"15%",background:"radial-gradient(ellipse,rgba(221,214,254,0.45) 0%,transparent 70%)"}}/>
      </div>

      <div style={{position:"relative",zIndex:1}}>

        {/* ── HEADER ── */}
        <header style={{background:"rgba(255,255,255,0.80)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:"1px solid #DDD6FE",boxShadow:"0 2px 20px rgba(124,58,237,0.09)"}}>
          <div className="header-inner" style={{maxWidth:1400,margin:"0 auto",padding:"13px 28px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
            <div style={{display:"flex",alignItems:"center",gap:13,flexShrink:0}}>
              <div style={{width:46,height:46,borderRadius:15,position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#4C1D95,#7C3AED)",boxShadow:"0 0 0 1px rgba(124,58,237,0.3),0 6px 18px rgba(124,58,237,0.38),inset 0 1px 0 rgba(255,255,255,0.22)"}}>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.20) 0%,transparent 60%)"}}/>
                <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <span style={{color:"#fff",fontWeight:800,fontSize:17,letterSpacing:"-0.5px"}}>HR</span>
                </div>
              </div>
              <div className="header-logo-text">
                <p style={{margin:0,fontSize:9.5,color:"#A855F7",fontWeight:800,letterSpacing:"0.17em",textTransform:"uppercase"}}>Connect Portal</p>
                <p style={{margin:0,fontSize:16,color:"#2E1065",fontWeight:800,letterSpacing:"-0.4px"}}>HR Network</p>
              </div>
            </div>
            <div style={{width:1,height:34,background:"#DDD6FE",flexShrink:0}}/>
            <div className="tabs-scroll" style={{flex:1}}>
              {TABS.map((t,i)=>(
                <button key={i} style={{padding:"5px 14px",fontSize:11.5,fontWeight:600,color:"#7C3AED",background:"rgba(237,233,254,0.75)",border:"1px solid #C4B5FD",borderRadius:99,cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="#DDD6FE";e.currentTarget.style.transform="translateY(-1px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(237,233,254,0.75)";e.currentTarget.style.transform="none";}}>
                  {t}
                </button>
              ))}
            </div>
            <div className="live-badge" style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:7,flexShrink:0,background:"rgba(220,252,231,0.7)",border:"1px solid #86EFAC",padding:"4px 10px 4px 7px",borderRadius:99}}>
              <div style={{position:"relative",width:10,height:10,flexShrink:0}}>
                <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"#22C55E",animation:"livePulse 1.6s ease-out infinite"}}/>
                <div style={{position:"absolute",inset:"2px",borderRadius:"50%",background:"#16A34A",boxShadow:"0 0 4px rgba(22,163,74,0.6)"}}/>
              </div>
              <span style={{fontSize:10.5,color:"#15803D",fontWeight:800,letterSpacing:"0.1em"}}>LIVE</span>
            </div>
          </div>
        </header>

        {/* ── NAVBAR ── */}
        <nav style={{background:"rgba(255,255,255,0.72)",backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",borderBottom:"1px solid #EDE9FE",overflowX:"auto"}}>
          <div className="nav-scroll" style={{maxWidth:1400,margin:"0 auto",padding:"5px 28px"}}>
            {NAV.map((lk,i)=>(
              <a key={i} href="#" style={{padding:"6px 13px",fontSize:10.5,fontWeight:700,color:"#7C3AED",letterSpacing:"0.06em",textDecoration:"none",borderRadius:8,textTransform:"uppercase",transition:"all 0.15s",whiteSpace:"nowrap"}}
                onMouseEnter={e=>{e.currentTarget.style.background="#EDE9FE";e.currentTarget.style.color="#4C1D95";}}
                onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#7C3AED";}}>
                {lk}
              </a>
            ))}
          </div>
        </nav>

        {/* ── MAIN ── */}
        <main className="main-grid page-pad" style={{maxWidth:1400,margin:"0 auto",padding:"26px 28px"}}>
          <div className="login-card-wrap"><LoginCard/></div>
          <div className="job-board-wrap"><JobGrid/></div>
          <div className="tv-panel-wrap"><YouTubePanel/></div>
        </main>

        {/* ── FOOTER ── */}
        <footer style={{maxWidth:1400,margin:"0 auto",padding:"0 28px 36px"}}>
          <div className="footer-inner" style={{borderRadius:22,padding:"22px 28px",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:20,background:"rgba(255,255,255,0.80)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:"1px solid #DDD6FE",boxShadow:"0 4px 24px rgba(124,58,237,0.09),inset 0 1px 0 rgba(255,255,255,0.9)"}}>
            <div style={{flex:1,minWidth:0}}>
              <p style={{margin:"0 0 16px",fontSize:10,fontWeight:800,color:"#C4B5FD",letterSpacing:"0.1em",textTransform:"uppercase",display:"flex",alignItems:"center",gap:6}}>
                <GraduationCap style={{width:12,height:12,color:"#7C3AED"}}/>
                Qualification-wise Data Folders
              </p>
              <div className="env-row">
                {QUALS.map((q,i)=><Envelope key={i} {...q}/>)}
                <TripleChevron/>
              </div>
            </div>
            <div className="footer-divider" style={{width:1,height:64,background:"#DDD6FE",flexShrink:0}}/>
          </div>
        </footer>

      </div>
    </div>
  );
}