


// import { useState } from "react";
// import {
//   Search, X, ChevronUp, ChevronDown, ChevronsUpDown,
//   Briefcase, Building2, GraduationCap, ArrowRight,
//   ChevronLeft, ChevronRight, LogIn, Zap, UserPlus, UserCheck,
//   Loader2, AlertCircle,
// } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";

// /* ═══════════════════════════════════════════════════════════
//    Constants
// ═══════════════════════════════════════════════════════════ */
// const BASE = "http://192.168.29.136:8000/api";

// const NAV  = ["Home","About Us","Authorised HRs","Core Committee","Services","Projects","Associates","Gallery","Contact Us"];
// const TABS = ["PG & Degree Colleges","Industrial Associates","Entrepreneur Sources","Entrepreneur Network"];
// const JOBS = [
//   { org:"Hospitals",         n:0,  role:"Administration"   },
//   { org:"Schools",           n:0,  role:"Administration"   },
//   { org:"Colleges",          n:0,  role:"Administration"   },
//   { org:"IT Industry",       n:0, role:"Engineer"  },
//   { org:"Hardware Industry", n:0,  role:"Engineer"    },
//   { org:"Service Sector",    n:0, role:"Faculty"   },
//   { org:"Banks",             n:0,  role:"Faculty"   },
  
//   { org:"Hospitals",         n:0,  role:"Nursing"         },
//   { org:"Colleges",          n:0,  role:"Librarian"          },
//   { org:"IT Industry",       n:0, role:"Developer"  },
//   { org:"Service Sector",    n:0, role:"Support"  },
//   { org:"Banks",             n:0,  role:"Clerk"   },
//   { org:"Hardware Industry", n:0,  role:"Technician"   },
//   { org:"IT Industry",       n:0,  role:"System Admin"     },
//   { org:"Schools",           n:0,  role:"System Admin"     },
//   { org:"Banks",             n:0,  role:"Accountant"       },
//   { org:"Service Sector",    n:0,  role:"Accountant"       },
//   { org:"Hospitals",         n:0,  role:"Security"         },
//   { org:"Colleges",          n:0,  role:"Security"         },
//   { org:"Banks",             n:0,  role:"HR Manager"       },
//   { org:"IT Industry",       n:0,  role:"HR Manager"       },
//   { org:"IT Industry",       n:0,  role:"Data Analyst"     },
//   { org:"Hardware Industry", n:0,  role:"Quality Tester"   },
//   { org:"Service Sector",    n:0,  role:"Sales Officer"    },
//   { org:"Retail Sector",     n:0,  role:"Sales Officer"    },
//   { org:"Retail Sector",     n:0,  role:"Store Manager"    },
//   { org:"Logistics",         n:0,  role:"Driver"           },
//   { org:"Logistics",         n:0,  role:"Warehouse Staff"  },
//   { org:"Logistics",         n:0,  role:"Supply Chain Mgr" },
//   { org:"Hospitals",         n:0,  role:"Doctor"           },
//   { org:"Schools",           n:0,  role:"Counselor"        },
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

//   @keyframes livePulse{0%{transform:scale(1);opacity:.8}70%{transform:scale(2.4);opacity:0}100%{transform:scale(2.4);opacity:0}}

//   .su-hr:hover{background:#EDE9FE !important;border-color:#7C3AED !important;border-style:solid !important;color:#4C1D95 !important;box-shadow:0 4px 14px rgba(124,58,237,0.18) !important;transform:translateY(-1px);}
//   .su-emp:hover{background:#F0FDF4 !important;border-color:#22C55E !important;border-style:solid !important;color:#15803D !important;box-shadow:0 4px 14px rgba(34,197,94,0.18) !important;transform:translateY(-1px);}

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
//   .tv-panel-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; }

//   .nav-scroll { display:flex; flex-wrap:wrap; gap:2px; }
//   .tabs-scroll { display:flex; flex-wrap:wrap; gap:7px; }
//   .env-row { display:flex; gap:14px; align-items:flex-end; flex-wrap:wrap; }

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

// /* ══════ YOUTUBE PANEL ═════════════════════════════════════ */
// const YT_IDS = [
//   { id: "aBeIbTOKSiI", label: "Career Spotlight" },
//   { id: "HAnw168huqA", label: "Career Advice"    },
// ];

// function YouTubePanel() {
//   return (
//     <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:18, padding:"20px 0" }}>
//       {YT_IDS.map(({ id, label }) => (
//         <div key={id} style={{ width:"100%", border:"2px solid #7C3AED", borderRadius:14, padding:10, background:"transparent" }}>
//           <div style={{ borderRadius:8, overflow:"hidden", background:"#0d0d0d", position:"relative", lineHeight:0 }}>
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
//   const navigate = useNavigate();
//   const [id, setId] = useState("");
//   const [pw, setPw] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

  


//   const handleSignIn = async () => {

//   // =========================
//   // VALIDATION
//   // =========================
//   if (!id.trim() || !pw.trim()) {

//     setError(
//       "Please enter your ID/email and password."
//     );

//     return;
//   }

//   setLoading(true);
//   setError("");

//   try {

//     // =========================
//     // SINGLE SIGNIN API
//     // =========================
//     const res = await fetch(
//       `${BASE}/signin/`,
//       {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify({
//           identifier: id.trim(),
//           password: pw,
//         }),
//       }
//     );

//     const data = await res.json();

//     // =========================
//     // LOGIN FAILED
//     // =========================
//     if (!res.ok) {

//       setError(
//         data.error ||
//         data.message ||
//         "Login failed."
//       );

//       return;
//     }

//     // =========================
//     // SAVE COMMON DATA
//     // =========================
//     localStorage.setItem(
//       "user_type",
//       data.role
//     );

//     // OPTIONAL TOKEN
//     if (data.token) {

//       localStorage.setItem(
//         "token",
//         data.token
//       );
//     }

//     // =========================
//     // HR LOGIN
//     // =========================
//     if (data.role === "hr") {

//       localStorage.setItem(
//         "hr_id",
//         data.hr_id
//       );

//       localStorage.setItem(
//         "hr_name",
//         data.name
//       );

//       localStorage.setItem(
//         "hr_email",
//         data.email
//       );

//       navigate("/hr/dashboard");

//       return;
//     }

//     // =========================
//     // EMPLOYER LOGIN
//     // =========================
//     if (data.role === "employer") {

//       localStorage.setItem(
//         "employer_id",
//         data.employer_id
//       );

//       localStorage.setItem(
//         "employer_name",
//         data.name
//       );

//       localStorage.setItem(
//         "employer_email",
//         data.email
//       );

//       localStorage.setItem(
//         "company_name",
//         data.company_name
//       );

//       // redirect employer
//       navigate("/listpersons");

//       return;
//     }

//     // =========================
//     // UNKNOWN ROLE
//     // =========================
//     setError("Invalid account type.");

//   } catch (error) {

//     console.error(error);

//     setError(
//       "Network error. Please check your connection."
//     );

//   } finally {

//     setLoading(false);
//   }
// };
//   /* ── Enter key support ── */
//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") handleSignIn();
//   };

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

//         {/* ID field — accepts hr_id, employer_id, or email */}
//         <div>
//           <label style={{fontSize:9,fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase",color:"#A78BFA",display:"block",marginBottom:4}}>
//             HR ID / Employer ID / Email
//           </label>
//           <input
//             type="text"
//             placeholder="e.g. HR1205260001 or you@email.com"
//             value={id}
//             onChange={e => { setId(e.target.value); setError(""); }}
//             onKeyDown={handleKeyDown}
//             style={{width:"100%",padding:"10px 14px",fontSize:12.5,boxSizing:"border-box",background:"#FAF5FF",border:"1.5px solid #DDD6FE",borderRadius:11,outline:"none",color:"#2E1065",transition:"all 0.2s"}}
//             onFocus={e=>{e.target.style.borderColor="#7C3AED";e.target.style.background="#F3E8FF";e.target.style.boxShadow="0 0 0 3px rgba(196,181,253,0.45)";}}
//             onBlur={e=>{e.target.style.borderColor="#DDD6FE";e.target.style.background="#FAF5FF";e.target.style.boxShadow="none";}}
//           />
//         </div>

//         <div>
//           <label style={{fontSize:9,fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase",color:"#A78BFA",display:"block",marginBottom:4}}>
//             Password
//           </label>
//           <input
//             type="password"
//             placeholder="Password"
//             value={pw}
//             onChange={e => { setPw(e.target.value); setError(""); }}
//             onKeyDown={handleKeyDown}
//             style={{width:"100%",padding:"10px 14px",fontSize:13,boxSizing:"border-box",background:"#FAF5FF",border:"1.5px solid #DDD6FE",borderRadius:11,outline:"none",color:"#2E1065",transition:"all 0.2s"}}
//             onFocus={e=>{e.target.style.borderColor="#7C3AED";e.target.style.background="#F3E8FF";e.target.style.boxShadow="0 0 0 3px rgba(196,181,253,0.45)";}}
//             onBlur={e=>{e.target.style.borderColor="#DDD6FE";e.target.style.background="#FAF5FF";e.target.style.boxShadow="none";}}
//           />
//         </div>

//         {/* Error message */}
//         {error && (
//           <div style={{display:"flex",alignItems:"center",gap:7,background:"#FFF1F2",border:"1.5px solid #FECDD3",borderRadius:10,padding:"8px 12px"}}>
//             <AlertCircle style={{width:14,height:14,color:"#F43F5E",flexShrink:0}}/>
//             <span style={{fontSize:11.5,fontWeight:600,color:"#BE123C",lineHeight:1.4}}>{error}</span>
//           </div>
//         )}

//         {/* Sign In button */}
//         <button
//           onClick={handleSignIn}
//           disabled={loading}
//           style={{width:"100%",padding:"11px",marginTop:1,background:"linear-gradient(135deg,#4C1D95,#7C3AED,#A855F7)",color:"#fff",fontWeight:700,fontSize:13.5,border:"none",borderRadius:12,cursor:loading?"not-allowed":"pointer",position:"relative",overflow:"hidden",boxShadow:"0 4px 18px rgba(124,58,237,0.45)",transition:"transform 0.15s,box-shadow 0.15s",opacity:loading?0.8:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}
//           onMouseEnter={e=>{if(!loading){e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(124,58,237,0.50)";}}}
//           onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 18px rgba(124,58,237,0.45)";}}
//           onMouseDown={e=>{if(!loading)e.currentTarget.style.transform="scale(0.97)";}}
//           onMouseUp={e=>{if(!loading)e.currentTarget.style.transform="translateY(-2px)";}}>
//           <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 60%)",pointerEvents:"none"}}/>
//           {loading
//             ? <><Loader2 style={{width:15,height:15,animation:"spin 1s linear infinite"}}/> Signing in…</>
//             : <span style={{position:"relative"}}>Sign In →</span>
//           }
//         </button>

//         {/* Hint */}
//         <p style={{margin:0,fontSize:10,color:"#C4B5FD",textAlign:"center",lineHeight:1.5}}>
//           Use your <b style={{color:"#9333EA"}}>HR ID</b> (e.g. HR1205260001),{" "}
//           <b style={{color:"#9333EA"}}>Employer ID</b> (e.g. EM1605260001), or registered <b style={{color:"#9333EA"}}>email</b>
//         </p>

//         {/* Divider */}
//         <div style={{display:"flex",alignItems:"center",gap:8,margin:"2px 0"}}>
//           <div style={{flex:1,height:1,background:"linear-gradient(90deg,transparent,#DDD6FE)"}}/>
//           <span style={{fontSize:10,color:"#C4B5FD",fontWeight:700,letterSpacing:"0.07em",whiteSpace:"nowrap"}}>New here? Sign up as</span>
//           <div style={{flex:1,height:1,background:"linear-gradient(90deg,#DDD6FE,transparent)"}}/>
//         </div>

//         {/* HR signup link */}
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

//         {/* Employer signup link */}
//         <Link to="/employer/signup" className="su-emp"
//           style={{display:"flex",alignItems:"center",gap:8,padding:"9px 14px",background:"#F0FFF4",border:"1.5px dashed #86EFAC",borderRadius:12,textDecoration:"none",fontSize:12.5,fontWeight:700,color:"#15803D",transition:"all 0.18s",cursor:"pointer",boxSizing:"border-box"}}>
//           <div style={{width:26,height:26,borderRadius:8,background:"linear-gradient(135deg,#DCFCE7,#BBF7D0)",border:"1px solid #86EFAC",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
//             <UserCheck style={{width:13,height:13,color:"#16A34A"}}/>
//           </div>
//           <div style={{display:"flex",flexDirection:"column",gap:1}}>
//             <span style={{fontSize:12.5,fontWeight:700,lineHeight:1}}>Sign Up as Employer</span>
//             <span style={{fontSize:9.5,color:"#4ADE80",fontWeight:500,lineHeight:1}}>Post jobs &amp; hire talent</span>
//           </div>
//           <ArrowRight style={{width:12,height:12,color:"#86EFAC",marginLeft:"auto",flexShrink:0}}/>
//         </Link>

//         <div style={{flex:1}}/>

//         <p style={{margin:"2px 0 0",fontSize:10,color:"#A78BFA",lineHeight:1.6,borderTop:"1px solid #F3E8FF",paddingTop:10,textAlign:"center"}}>
//           Declaration Form &amp; Security Insurance ECS required for activation.
//         </p>
//       </div>

//       {/* Spin keyframe */}
//       <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
//     </div>
//   );
// }

// function JobGrid() {
//   const [q,   setQ]  = useState("");
//   const [pg,  setPg] = useState(0);

//   const UNIQUE_ORGS = Array.from(new Set(JOBS.map(j => j.org))).sort((a, b) => a.localeCompare(b));
  
//   const MATRIX_DATA = Array.from(new Set(JOBS.map(j => j.role))).map(role => {
//     const row: Record<string, string | number> = { role };
//     UNIQUE_ORGS.forEach(org => {
//       const match = JOBS.find(j => j.role === role && j.org === org);
//       row[org] = match ? match.n : 0;
//     });
//     return row;
//   });

//   const filt = MATRIX_DATA.filter(r => {
//     const lq = q.toLowerCase();
//     return String(r.role).toLowerCase().includes(lq);
//   }).sort((a, b) => String(a.role).localeCompare(String(b.role)));

//   const totPg = Math.max(1, Math.ceil(filt.length / PAGE_SZ));
//   const sp    = Math.min(pg, totPg - 1);
//   const rows  = filt.slice(sp * PAGE_SZ, (sp + 1) * PAGE_SZ);
//   const pad   = [...rows, ...Array(PAGE_SZ - rows.length).fill(null)];

//   return (
//     <div className="job-board-inner" style={{borderRadius:20,overflow:"hidden",background:"#FFFFFF",border:"1px solid #DDD6FE",boxShadow:cardShadow, display: "flex", flexDirection: "column"}}>

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
//                 {filt.length} unique roles
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

//       <div style={{width: "100%", overflowX: "auto", display: "flex", flexDirection: "column", flex: 1}}>
//         <div style={{minWidth: `${200 + UNIQUE_ORGS.length * 100}px`}}>
//           {/* Column headers */}
//           <div style={{display:"flex",background:"#F5F3FF",borderBottom:"1.5px solid #DDD6FE",flexShrink:0}}>
//             <div style={{width:200,padding:"11px 16px",fontSize:10.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"#7C3AED"}}>Role</div>
//             {UNIQUE_ORGS.map(org => (
//               <div key={org} style={{width:100,padding:"11px 16px",fontSize:10.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"#7C3AED",textAlign:"center"}}>{org}</div>
//             ))}
//           </div>

//           {/* Rows */}
//           <div className="job-table-body" style={{flex:1}}>
//             {pad.map((row,i)=>{
//               const even=i%2===0;
//               if(!row) return <div key={`p${i}`} style={{height:ROW_H,display:"flex",background:even?"#FFFFFF":"#FAFAFF",borderBottom:"1px solid #F5F3FF"}}/>;
//               return(
//                 <div key={i} style={{height:ROW_H,display:"flex",alignItems:"center",background:even?"#FFFFFF":"#FAFAFF",borderBottom:"1px solid #F5F3FF",cursor:"pointer",transition:"background 0.15s"}}
//                   onMouseEnter={e=>e.currentTarget.style.background="#F5F3FF"}
//                   onMouseLeave={e=>e.currentTarget.style.background=even?"#FFFFFF":"#FAFAFF"}>
                  
//                   {/* Role Name */}
//                   <div style={{width:200,padding:"0 16px",display:"flex",alignItems:"center",gap:10}}>
//                     <div style={{width:30,height:30,borderRadius:9,flexShrink:0,background:"linear-gradient(135deg,#EDE9FE,#DDD6FE)",border:"1px solid #C4B5FD",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.8)"}}>
//                       <Briefcase style={{width:13,height:13,color:"#7C3AED"}}/>
//                     </div>
//                     <span style={{fontSize:13,fontWeight:600,color:"#2E1065",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{row.role}</span>
//                   </div>

//                   {/* Organization counts */}
//                   {UNIQUE_ORGS.map(org => {
//                     const count = Number(row[org] || 0);
//                     const t = tier(count);
//                     return (
//                       <div key={org} style={{width:100,padding:"0 16px",display:"flex",alignItems:"center",justifyContent:"center"}}>
//                         {count > 0 ? (
//                           <span style={{display:"inline-block",padding:"3px 11px",borderRadius:99,fontSize:11.5,fontWeight:700,background:`linear-gradient(135deg,${t.a},${t.b})`,color:t.txt,boxShadow:`0 2px 10px ${t.glow}`,letterSpacing:"0.02em"}}>
//                             {count}
//                           </span>
//                         ) : (
//                           <span style={{color:"#D8B4FE",fontWeight:600}}>-</span>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Pagination footer */}
//       <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 20px",background:"#F5F3FF",borderTop:"1.5px solid #DDD6FE",flexShrink:0,flexWrap:"wrap",gap:8}}>
//         <p style={{margin:0,fontSize:12,color:"#7C3AED"}}>
//           Showing{" "}
//           <span style={{fontWeight:700,color:"#6D28D9"}}>{filt.length===0?0:sp*PAGE_SZ+1}–{Math.min((sp+1)*PAGE_SZ,filt.length)}</span>
//           {" of "}
//           <span style={{fontWeight:700,color:"#2E1065"}}>{filt.length}</span>
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

//       <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
//         <div style={{position:"absolute",width:700,height:500,borderRadius:"50%",top:-200,left:-200,background:"radial-gradient(ellipse,rgba(196,181,253,0.30) 0%,transparent 70%)"}}/>
//         <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",bottom:-150,right:-100,background:"radial-gradient(ellipse,rgba(233,213,255,0.38) 0%,transparent 70%)"}}/>
//         <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",top:"30%",right:"15%",background:"radial-gradient(ellipse,rgba(221,214,254,0.45) 0%,transparent 70%)"}}/>
//       </div>

//       <div style={{position:"relative",zIndex:1}}>

//         {/* ── HEADER ── */}
//         <header style={{background:"rgba(255,255,255,0.80)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:"1px solid #DDD6FE",boxShadow:"0 2px 20px rgba(124,58,237,0.09)"}}>
//           <div className="header-inner" style={{maxWidth:1400,margin:"0 auto",padding:"13px 28px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
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
//             <div className="tabs-scroll" style={{flex:1}}>
//               {TABS.map((t,i)=>(
//                 <button key={i} style={{padding:"5px 14px",fontSize:11.5,fontWeight:600,color:"#7C3AED",background:"rgba(237,233,254,0.75)",border:"1px solid #C4B5FD",borderRadius:99,cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap"}}
//                   onMouseEnter={e=>{e.currentTarget.style.background="#DDD6FE";e.currentTarget.style.transform="translateY(-1px)";}}
//                   onMouseLeave={e=>{e.currentTarget.style.background="rgba(237,233,254,0.75)";e.currentTarget.style.transform="none";}}>
//                   {t}
//                 </button>
//               ))}
//             </div>
//             <div className="live-badge" style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:7,flexShrink:0,background:"rgba(220,252,231,0.7)",border:"1px solid #86EFAC",padding:"4px 10px 4px 7px",borderRadius:99}}>
//               <div style={{position:"relative",width:10,height:10,flexShrink:0}}>
//                 <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"#22C55E",animation:"livePulse 1.6s ease-out infinite"}}/>
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

//         {/* ── MAIN ── */}
//         <main className="main-grid page-pad" style={{maxWidth:1400,margin:"0 auto",padding:"26px 28px"}}>
//           <div className="login-card-wrap"><LoginCard/></div>
//           <div className="job-board-wrap"style={{
//     maxWidth: "450px",
//     width: "100%",
//     margin: "0 auto"
//   }}><JobGrid/></div>
//           <div className="tv-panel-wrap"><YouTubePanel/></div>
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


// import { useState, useRef } from "react";
// import {
//   Search, X, ChevronUp, ChevronDown, ChevronsUpDown,
//   Briefcase, Building2, GraduationCap, ArrowRight,
//   ChevronLeft, ChevronRight, LogIn, Zap, UserPlus, UserCheck,
//   Loader2, AlertCircle,
// } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";

// const BASE = "http://192.168.0.6:8000/api";

// const NAV  = ["Home","About Us","Authorised HRs","Core Committee","Services","Projects","Associates","Gallery","Contact Us"];
// const TABS = ["PG & Degree Colleges","Industrial Associates","Entrepreneur Sources","Entrepreneur Network"];
// const JOBS = [
//   { org:"Hospitals",         n:0,  role:"Administration"   },
//   { org:"Schools",           n:0,  role:"Administration"   },
//   { org:"Colleges",          n:0,  role:"Administration"   },
//   { org:"IT Industry",       n:0,  role:"Engineer"         },
//   { org:"Hardware Industry", n:0,  role:"Engineer"         },
//   { org:"Service Sector",    n:0,  role:"Faculty"          },
//   { org:"Banks",             n:0,  role:"Faculty"          },
//   { org:"Hospitals",         n:0,  role:"Nursing"          },
//   { org:"Colleges",          n:0,  role:"Librarian"        },
//   { org:"IT Industry",       n:0,  role:"Developer"        },
//   { org:"Service Sector",    n:0,  role:"Support"          },
//   { org:"Banks",             n:0,  role:"Clerk"            },
//   { org:"Hardware Industry", n:0,  role:"Technician"       },
//   { org:"IT Industry",       n:0,  role:"System Admin"     },
//   { org:"Schools",           n:0,  role:"System Admin"     },
//   { org:"Banks",             n:0,  role:"Accountant"       },
//   { org:"Service Sector",    n:0,  role:"Accountant"       },
//   { org:"Hospitals",         n:0,  role:"Security"         },
//   { org:"Colleges",          n:0,  role:"Security"         },
//   { org:"Banks",             n:0,  role:"HR Manager"       },
//   { org:"IT Industry",       n:0,  role:"HR Manager"       },
//   { org:"IT Industry",       n:0,  role:"Data Analyst"     },
//   { org:"Hardware Industry", n:0,  role:"Quality Tester"   },
//   { org:"Service Sector",    n:0,  role:"Sales Officer"    },
//   { org:"Retail Sector",     n:0,  role:"Sales Officer"    },
//   { org:"Retail Sector",     n:0,  role:"Store Manager"    },
//   { org:"Logistics",         n:0,  role:"Driver"           },
//   { org:"Logistics",         n:0,  role:"Warehouse Staff"  },
//   { org:"Logistics",         n:0,  role:"Supply Chain Mgr" },
//   { org:"Hospitals",         n:0,  role:"Doctor"           },
//   { org:"Schools",           n:0,  role:"Counselor"        },
// ];

// const QUALS = [
//   { label:"Below SSC", body:"#FFF7ED", border:"#F97316", lid:"#F97316", line:"#FED7AA", stamp:"#EA580C" },
//   { label:"SSC",       body:"#FFF1F2", border:"#F43F5E", lid:"#F43F5E", line:"#FECDD3", stamp:"#C81A40" },
//   { label:"ITI",       body:"#FFFBEB", border:"#F59E0B", lid:"#F59E0B", line:"#FDE68A", stamp:"#D97706" },
//   { label:"Diploma",   body:"#F5F3FF", border:"#8B5CF6", lid:"#8B5CF6", line:"#DDD6FE", stamp:"#7C3AED" },
//   { label:"Inter",     body:"#FAF5FF", border:"#A855F7", lid:"#A855F7", line:"#E9D5FF", stamp:"#9333EA" },
//   { label:"Degree",    body:"#F3E8FF", border:"#C084FC", lid:"#C084FC", line:"#F3E8FF", stamp:"#A855F7" },
//   { label:"PG",        body:"#EDE9FE", border:"#7C3AED", lid:"#7C3AED", line:"#C4B5FD", stamp:"#6D28D9" },
// ];

// const PAGE_SZ = 7;
// const ROW_H   = 54;
// const COL_ROLE_W = 160;
// const COL_ORG_W  = 100;
// const SCROLL_STEP = 300;

// const tier = (n: number) =>
//   n >= 100 ? { a:"#7C3AED", b:"#6D28D9", txt:"#fff", glow:"rgba(124,58,237,0.32)" }
// : n >=  30 ? { a:"#A855F7", b:"#9333EA", txt:"#fff", glow:"rgba(168,85,247,0.28)" }
// :            { a:"#C084FC", b:"#A855F7", txt:"#fff", glow:"rgba(192,132,252,0.25)" };

// const cardShadow = "0 1px 3px rgba(124,58,237,0.07), 0 8px 24px rgba(109,40,217,0.12), 0 1px 0 rgba(255,255,255,0.9) inset";

// const G = `
//   @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
//   * { font-family: 'Outfit', system-ui, sans-serif !important; }

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

//   @keyframes livePulse{0%{transform:scale(1);opacity:.8}70%{transform:scale(2.4);opacity:0}100%{transform:scale(2.4);opacity:0}}
//   @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

//   .su-hr:hover{background:#EDE9FE !important;border-color:#7C3AED !important;border-style:solid !important;color:#4C1D95 !important;box-shadow:0 4px 14px rgba(124,58,237,0.18) !important;transform:translateY(-1px);}
//   .su-emp:hover{background:#F0FDF4 !important;border-color:#22C55E !important;border-style:solid !important;color:#15803D !important;box-shadow:0 4px 14px rgba(34,197,94,0.18) !important;transform:translateY(-1px);}

//   /* table scroll arrow buttons */
//   .tbl-scroll-btn {
//     width: 32px; height: 32px; border-radius: 50%;
//     border: 1.5px solid #C4B5FD;
//     background: linear-gradient(135deg,#F5F3FF,#EDE9FE);
//     box-shadow: 0 2px 10px rgba(124,58,237,0.18);
//     display: flex; align-items: center; justify-content: center;
//     cursor: pointer; flex-shrink: 0; transition: all 0.18s;
//   }
//   .tbl-scroll-btn:hover:not(:disabled){
//     background: linear-gradient(135deg,#7C3AED,#A855F7);
//     border-color: #7C3AED;
//     box-shadow: 0 4px 16px rgba(124,58,237,0.38);
//     transform: scale(1.08);
//   }
//   .tbl-scroll-btn:disabled{ opacity:0.3; cursor:not-allowed; }

//   /* frozen role column */
//   .frozen-col {
//     position: sticky; left: 0; z-index: 3;
//     background: inherit;
//   }
//   .frozen-col-hdr {
//     position: sticky; left: 0; z-index: 4;
//     background: #F5F3FF;
//   }

//   /* table container shadow hints */
//   .tbl-viewport {
//     overflow-x: auto;
//     overflow-y: hidden;
//     scroll-behavior: smooth;
//     -webkit-overflow-scrolling: touch;
//   }
//   .tbl-viewport::-webkit-scrollbar { height: 5px; }
//   .tbl-viewport::-webkit-scrollbar-track { background: #F5F3FF; }
//   .tbl-viewport::-webkit-scrollbar-thumb { background: #C4B5FD; border-radius: 99px; }

//   /* main 3-col grid */
//   .main-grid {
//     display: grid;
//     grid-template-columns: 320px 1fr 300px;
//     gap: 22px;
//     align-items: start;
//   }
//   @media (max-width: 1200px) {
//     .main-grid { grid-template-columns: 300px 1fr !important; }
//     .yt-col { display: none !important; }
//   }
//   @media (max-width: 820px) {
//     .main-grid { grid-template-columns: 1fr !important; }
//     .page-pad { padding: 16px 14px !important; }
//   }

//   .nav-scroll { display:flex; flex-wrap:wrap; gap:2px; }
//   .tabs-scroll { display:flex; flex-wrap:wrap; gap:7px; }
//   .env-row { display:flex; gap:14px; align-items:flex-end; flex-wrap:wrap; }

//   @media (max-width: 900px) {
//     .header-inner { flex-wrap:wrap; gap:10px !important; padding:12px 14px !important; }
//     .tabs-scroll { overflow-x:auto; flex-wrap:nowrap; padding-bottom:4px; -webkit-overflow-scrolling:touch; }
//     .tabs-scroll::-webkit-scrollbar { display:none; }
//     .nav-scroll { overflow-x:auto; flex-wrap:nowrap; padding:4px 14px; -webkit-overflow-scrolling:touch; }
//     .nav-scroll::-webkit-scrollbar { display:none; }
//     .footer-inner { flex-direction:column !important; gap:16px !important; padding:18px 14px !important; }
//     .footer-divider { display:none !important; }
//     .env-row { flex-wrap:nowrap; overflow-x:auto; padding-bottom:6px; -webkit-overflow-scrolling:touch; }
//     .env-row::-webkit-scrollbar { display:none; }
//     .tcc-wrap { margin-bottom:0 !important; }
//     .live-badge { display:none; }
//   }
//   @media (max-width: 600px) {
//     .header-logo-text p:first-child { font-size:8.5px !important; }
//     .header-logo-text p:last-child  { font-size:13px !important; }
//   @keyframes fadeIn {
//     from { opacity:0; transform:translateX(-50%) translateY(6px); }
//     to   { opacity:1; transform:translateX(-50%) translateY(0); }
// }
//   }
// `;

// /* ══════ TRIPLE CHEVRON ════════════════════════════════════ */
// function TripleChevron() {
//   const chevColors = ["#6D28D9","#9333EA","#C084FC"];
//   return (
//     <div className="tcc-wrap">
//       <div className="tcc-pill">
//         <span className="tcc-label">View All</span>
//         {chevColors.map((color,i) => (
//           <svg key={i} className="chev-svg" width="13" height="22" viewBox="0 0 13 22" fill="none"
//             style={{marginLeft:i===0?2:-3}}>
//             <path className={`chev-path-${i+1}`} d="M2.5 3.5 L10.5 11 L2.5 18.5"
//               stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
//               strokeDasharray="28" strokeDashoffset="28"/>
//           </svg>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ══════ ENVELOPE ══════════════════════════════════════════ */
// function Envelope({ label, body, border, lid, line, stamp, onClick }: {
//   label:string; body:string; border:string; lid:string; line:string; stamp:string; onClick?:()=>void;
// }) {
//   return (
//     <div className="env-wrap" tabIndex={0} aria-label={`${label} data folder`} onClick={onClick}>
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

// /* ══════ YOUTUBE PANEL ═════════════════════════════════════ */
// const YT_IDS = [
//   { id:"aBeIbTOKSiI", label:"Career Spotlight" },
//   { id:"HAnw168huqA", label:"Career Advice"    },
// ];

// function YouTubePanel() {
//   return (
//     <div style={{display:"flex",flexDirection:"column",gap:18,padding:"0"}}>
//       {YT_IDS.map(({id,label}) => (
//         <div key={id} style={{border:"2px solid #7C3AED",borderRadius:14,padding:10,background:"transparent"}}>
//           <div style={{borderRadius:8,overflow:"hidden",background:"#0d0d0d",position:"relative",lineHeight:0}}>
//             <div style={{position:"absolute",inset:0,zIndex:2,pointerEvents:"none",borderRadius:8,background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 3px)"}}/>
//             <div style={{position:"absolute",top:0,left:0,right:0,height:"36%",zIndex:3,pointerEvents:"none",borderRadius:"8px 8px 0 0",background:"linear-gradient(180deg,rgba(255,255,255,0.05) 0%,transparent 100%)"}}/>
//             <iframe
//               src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
//               title={label}
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               style={{width:"100%",aspectRatio:"16/9",border:"none",display:"block"}}
//             />
//           </div>
//           <div style={{display:"flex",alignItems:"center",marginTop:9,padding:"0 2px"}}>
//             <div style={{width:5,height:5,borderRadius:"50%",background:"#7C3AED",flexShrink:0}}/>
//             <div style={{flex:1,height:1,background:"#7C3AED33",margin:"0 6px"}}/>
//             <span style={{fontSize:9,fontWeight:800,letterSpacing:"0.14em",color:"#7C3AED",textTransform:"uppercase",whiteSpace:"nowrap"}}>{label}</span>
//             <div style={{flex:1,height:1,background:"#7C3AED33",margin:"0 6px"}}/>
//             <div style={{width:5,height:5,borderRadius:"50%",background:"#7C3AED",flexShrink:0}}/>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// /* ══════ LOGIN CARD ════════════════════════════════════════ */
// function LoginCard() {
//   const navigate = useNavigate();
//   const [id, setId] = useState("");
//   const [pw, setPw] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSignIn = async () => {
//     if (!id.trim() || !pw.trim()) { setError("Please enter your ID/email and password."); return; }
//     setLoading(true); setError("");
//     try {
//       const res = await fetch(`${BASE}/signin/`, {
//         method:"POST", headers:{"Content-Type":"application/json"},
//         body:JSON.stringify({identifier:id.trim(),password:pw}),
//       });
//       const data = await res.json();
//       if (!res.ok) { setError(data.error||data.message||"Login failed."); return; }
//       localStorage.setItem("user_type",data.role);
//       if (data.token) localStorage.setItem("token",data.token);
//       if (data.role==="hr") {
//         localStorage.setItem("hr_id",data.hr_id);
//         localStorage.setItem("hr_name",data.name);
//         localStorage.setItem("hr_email",data.email);
//         navigate("/hr/dashboard"); return;
//       }
//       if (data.role==="employer") {
//         localStorage.setItem("employer_id",data.employer_id);
//         localStorage.setItem("employer_name",data.name);
//         localStorage.setItem("employer_email",data.email);
//         localStorage.setItem("company_name",data.company_name);
//         navigate("/listpersons"); return;
//       }
//       setError("Invalid account type.");
//     } catch { setError("Network error. Please check your connection."); }
//     finally { setLoading(false); }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key==="Enter") handleSignIn(); };

//   return (
//     <div style={{borderRadius:20,overflow:"hidden",background:"#FFFFFF",border:"1px solid #DDD6FE",boxShadow:cardShadow}}>
//       {/* Header */}
//       {/* <div style={{background:"linear-gradient(135deg,#4C1D95 0%,#7C3AED 55%,#A855F7 100%)",padding:"22px 20px 18px",position:"relative",overflow:"hidden"}}>
//         <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.04) 60%,transparent 100%)",pointerEvents:"none"}}/>
//         <div style={{position:"absolute",right:-22,top:-22,width:90,height:90,borderRadius:"50%",background:"rgba(255,255,255,0.08)",pointerEvents:"none"}}/>
//         <div style={{position:"absolute",left:-10,bottom:-20,width:60,height:60,borderRadius:"50%",background:"rgba(196,181,253,0.15)",pointerEvents:"none"}}/>
//         <div style={{width:40,height:40,borderRadius:13,marginBottom:13,background:"rgba(255,255,255,0.20)",border:"1px solid rgba(255,255,255,0.40)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",boxShadow:"0 3px 10px rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.35)"}}>
//           <LogIn style={{width:17,height:17,color:"#fff"}}/>
//         </div>
//         <p style={{margin:0,fontSize:15,fontWeight:700,color:"#fff",letterSpacing:"-0.3px",position:"relative"}}>Login for HR &amp; Employer</p>
//         <p style={{margin:"3px 0 0",fontSize:11,color:"rgba(255,255,255,0.70)",position:"relative"}}>Sign in to access your dashboard</p>
//       </div> */}

//       <div style={{background:"linear-gradient(135deg,#4C1D95 0%,#7C3AED 55%,#A855F7 100%)",padding:"22px 20px 18px",position:"relative",overflow:"hidden"}}>
//   <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.04) 60%,transparent 100%)",pointerEvents:"none"}}/>
//   <div style={{position:"absolute",right:-22,top:-22,width:90,height:90,borderRadius:"50%",background:"rgba(255,255,255,0.08)",pointerEvents:"none"}}/>
//   <div style={{position:"absolute",left:-10,bottom:-20,width:60,height:60,borderRadius:"50%",background:"rgba(196,181,253,0.15)",pointerEvents:"none"}}/>

//   {/* ← flex row: text left, icon right */}
//   <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative"}}>
//     <div>
//       <p style={{margin:0,fontSize:15,fontWeight:700,color:"#fff",letterSpacing:"-0.3px"}}>Login for HR &amp; Employer</p>
//       <p style={{margin:"3px 0 0",fontSize:11,color:"rgba(255,255,255,0.70)"}}>Sign in to access your dashboard</p>
//     </div>
//     <div style={{width:40,height:40,borderRadius:13,background:"rgba(255,255,255,0.20)",border:"1px solid rgba(255,255,255,0.40)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 3px 10px rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.35)"}}>
//       <LogIn style={{width:17,height:17,color:"#fff"}}/>
//     </div>
//   </div>
// </div>

//       {/* Body */}
//       <div style={{padding:"20px 18px",display:"flex",flexDirection:"column",gap:11}}>
//         <div>
//           <label style={{fontSize:9,fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase",color:"#A78BFA",display:"block",marginBottom:4}}>HR ID / Employer ID / Email</label>
//           <input type="text" placeholder="e.g. HR1205260001 or you@email.com" value={id}
//             onChange={e=>{setId(e.target.value);setError("");}} onKeyDown={handleKeyDown}
//             style={{width:"100%",padding:"10px 14px",fontSize:12.5,boxSizing:"border-box",background:"#FAF5FF",border:"1.5px solid #DDD6FE",borderRadius:11,outline:"none",color:"#2E1065",transition:"all 0.2s"}}
//             onFocus={e=>{e.target.style.borderColor="#7C3AED";e.target.style.background="#F3E8FF";e.target.style.boxShadow="0 0 0 3px rgba(196,181,253,0.45)";}}
//             onBlur={e=>{e.target.style.borderColor="#DDD6FE";e.target.style.background="#FAF5FF";e.target.style.boxShadow="none";}}/>
//         </div>
//         <div>
//           <label style={{fontSize:9,fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase",color:"#A78BFA",display:"block",marginBottom:4}}>Password</label>
//           <input type="password" placeholder="Password" value={pw}
//             onChange={e=>{setPw(e.target.value);setError("");}} onKeyDown={handleKeyDown}
//             style={{width:"100%",padding:"10px 14px",fontSize:13,boxSizing:"border-box",background:"#FAF5FF",border:"1.5px solid #DDD6FE",borderRadius:11,outline:"none",color:"#2E1065",transition:"all 0.2s"}}
//             onFocus={e=>{e.target.style.borderColor="#7C3AED";e.target.style.background="#F3E8FF";e.target.style.boxShadow="0 0 0 3px rgba(196,181,253,0.45)";}}
//             onBlur={e=>{e.target.style.borderColor="#DDD6FE";e.target.style.background="#FAF5FF";e.target.style.boxShadow="none";}}/>
//         </div>
//         {error && (
//           <div style={{display:"flex",alignItems:"center",gap:7,background:"#FFF1F2",border:"1.5px solid #FECDD3",borderRadius:10,padding:"8px 12px"}}>
//             <AlertCircle style={{width:14,height:14,color:"#F43F5E",flexShrink:0}}/>
//             <span style={{fontSize:11.5,fontWeight:600,color:"#BE123C",lineHeight:1.4}}>{error}</span>
//           </div>
//         )}
//         <button onClick={handleSignIn} disabled={loading}
//           style={{width:"100%",padding:"11px",marginTop:1,background:"linear-gradient(135deg,#4C1D95,#7C3AED,#A855F7)",color:"#fff",fontWeight:700,fontSize:13.5,border:"none",borderRadius:12,cursor:loading?"not-allowed":"pointer",position:"relative",overflow:"hidden",boxShadow:"0 4px 18px rgba(124,58,237,0.45)",transition:"transform 0.15s,box-shadow 0.15s",opacity:loading?0.8:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}
//           onMouseEnter={e=>{if(!loading){e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(124,58,237,0.50)";}}}
//           onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 18px rgba(124,58,237,0.45)";}}
//           onMouseDown={e=>{if(!loading)e.currentTarget.style.transform="scale(0.97)";}}
//           onMouseUp={e=>{if(!loading)e.currentTarget.style.transform="translateY(-2px)";}}>
//           <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 60%)",pointerEvents:"none"}}/>
//           {loading ? <><Loader2 style={{width:15,height:15,animation:"spin 1s linear infinite"}}/> Signing in…</> : <span style={{position:"relative"}}>Sign In →</span>}
//         </button>
//         <p style={{margin:0,fontSize:10,color:"#C4B5FD",textAlign:"center",lineHeight:1.5}}>
//           Use your <b style={{color:"#9333EA"}}>HR ID</b> (e.g. HR1205260001),{" "}
//           <b style={{color:"#9333EA"}}>Employer ID</b> (e.g. EM1605260001), or registered <b style={{color:"#9333EA"}}>email</b>
//         </p>
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
//             <span style={{fontSize:9.5,color:"#4ADE80",fontWeight:500,lineHeight:1}}>Post jobs &amp; hire talent</span>
//           </div>
//           <ArrowRight style={{width:12,height:12,color:"#86EFAC",marginLeft:"auto",flexShrink:0}}/>
//         </Link>
//         <p style={{margin:"2px 0 0",fontSize:10,color:"#A78BFA",lineHeight:1.6,borderTop:"1px solid #F3E8FF",paddingTop:10,textAlign:"center"}}>
//           Declaration Form &amp; Security Insurance ECS required for activation.
//         </p>
//       </div>
//     </div>
//   );
// }

// /* ══════ JOB GRID ══════════════════════════════════════════ */
// function JobGrid() {
//   const [q, setQ]   = useState("");
//   const [pg, setPg] = useState(0);
//   const [canScrollLeft,  setCanScrollLeft]  = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(true);
//   const viewportRef = useRef<HTMLDivElement>(null);

//   const UNIQUE_ORGS = Array.from(new Set(JOBS.map(j => j.org))).sort((a,b) => a.localeCompare(b));
//   const MATRIX_DATA = Array.from(new Set(JOBS.map(j => j.role))).map(role => {
//     const row: Record<string,string|number> = { role };
//     UNIQUE_ORGS.forEach(org => {
//       const match = JOBS.find(j => j.role===role && j.org===org);
//       row[org] = match ? match.n : 0;
//     });
//     return row;
//   });

//   const filt = MATRIX_DATA
//     .filter(r => String(r.role).toLowerCase().includes(q.toLowerCase()))
//     .sort((a,b) => String(a.role).localeCompare(String(b.role)));

//   const totPg = Math.max(1, Math.ceil(filt.length / PAGE_SZ));
//   const sp    = Math.min(pg, totPg - 1);
//   const rows  = filt.slice(sp*PAGE_SZ, (sp+1)*PAGE_SZ);
//   const pad   = [...rows, ...Array(PAGE_SZ - rows.length).fill(null)];

//   const totalTableW = COL_ROLE_W + UNIQUE_ORGS.length * COL_ORG_W;

//   /* sync arrow state with scroll position */
//   const onScroll = () => {
//     const el = viewportRef.current;
//     if (!el) return;
//     setCanScrollLeft(el.scrollLeft > 4);
//     setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
//   };

//   const scrollLeft  = () => { viewportRef.current?.scrollBy({ left: -SCROLL_STEP, behavior:"smooth" }); };
//   const scrollRight = () => { viewportRef.current?.scrollBy({ left:  SCROLL_STEP, behavior:"smooth" }); };

//   /* check initial state once mounted */
//   const initViewport = (el: HTMLDivElement|null) => {
//     (viewportRef as React.MutableRefObject<HTMLDivElement|null>).current = el;
//     if (el) setCanScrollRight(el.scrollWidth > el.clientWidth + 4);
//   };

//   return (
//     <div style={{borderRadius:20,overflow:"hidden",background:"#FFFFFF",border:"1px solid #DDD6FE",boxShadow:cardShadow,display:"flex",flexDirection:"column"}}>

//       {/* ── Header ── */}
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
//                 {filt.length} unique roles
//               </p>
//             </div>
//           </div>
//           <div style={{position:"relative",flex:"1 1 180px",maxWidth:260,minWidth:140}}>
//             <Search style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",width:13,height:13,color:"rgba(255,255,255,0.6)"}}/>
//             <input type="text" placeholder="Search roles…" value={q}
//               onChange={e=>{setQ(e.target.value);setPg(0);}}
//               style={{width:"100%",paddingLeft:30,paddingRight:q?28:12,paddingTop:8,paddingBottom:8,fontSize:12.5,background:"rgba(255,255,255,0.16)",border:"1px solid rgba(255,255,255,0.32)",borderRadius:10,outline:"none",color:"#fff",boxSizing:"border-box",transition:"all 0.2s"}}
//               onFocus={e=>{e.target.style.background="rgba(255,255,255,0.26)";e.target.style.borderColor="rgba(255,255,255,0.65)";}}
//               onBlur={e=>{e.target.style.background="rgba(255,255,255,0.16)";e.target.style.borderColor="rgba(255,255,255,0.32)";}}/>
//             {q&&<button onClick={()=>{setQ("");setPg(0);}} style={{position:"absolute",right:9,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",padding:0,color:"rgba(255,255,255,0.7)"}}>
//               <X style={{width:12,height:12}}/>
//             </button>}
//           </div>
//         </div>
//       </div>

//       {/* ── Scroll controls bar ── */}
//       <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 16px 4px",background:"#F5F3FF",borderBottom:"1px solid #EDE9FE",gap:8,flexShrink:0}}>
//         <span style={{fontSize:9.5,fontWeight:700,letterSpacing:"0.09em",textTransform:"uppercase",color:"#A78BFA"}}>
//           {UNIQUE_ORGS.length} organisations · scroll to see all →
//         </span>
//         <div style={{display:"flex",gap:6}}>
//           <button className="tbl-scroll-btn" onClick={scrollLeft} disabled={!canScrollLeft} aria-label="Scroll table left">
//             <ChevronLeft style={{width:15,height:15,color:"#7C3AED"}}/>
//           </button>
//           <button className="tbl-scroll-btn" onClick={scrollRight} disabled={!canScrollRight} aria-label="Scroll table right">
//             <ChevronRight style={{width:15,height:15,color:"#7C3AED"}}/>
//           </button>
//         </div>
//       </div>

//       {/* ── Table viewport ── */}
//       <div
//         className="tbl-viewport"
//         ref={initViewport}
//         onScroll={onScroll}
//         style={{flex:1}}
//       >
//         <div style={{width:totalTableW,minWidth:"100%"}}>

//           {/* Column headers */}
//           <div style={{display:"flex",background:"#F5F3FF",borderBottom:"1.5px solid #DDD6FE",position:"sticky",top:0,zIndex:4}}>
//             <div className="frozen-col-hdr" style={{width:COL_ROLE_W,minWidth:COL_ROLE_W,padding:"11px 14px",fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"#7C3AED",boxShadow:"2px 0 8px rgba(124,58,237,0.08)"}}>
//               Role
//             </div>
//             {UNIQUE_ORGS.map(org => (
//               <div key={org} style={{width:COL_ORG_W,minWidth:COL_ORG_W,padding:"11px 6px",fontSize:9.5,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:"#7C3AED",textAlign:"center",flexShrink:0,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
//                 {org}
//               </div>
//             ))}
//           </div>

//           {/* Data rows */}
//           {pad.map((row,i) => {
//             const even = i%2===0;
//             if (!row) return (
//               <div key={`p${i}`} style={{height:ROW_H,display:"flex",background:even?"#FFFFFF":"#FAFAFF",borderBottom:"1px solid #F5F3FF"}}/>
//             );
//             return (
//               <div key={i} style={{height:ROW_H,display:"flex",alignItems:"center",background:even?"#FFFFFF":"#FAFAFF",borderBottom:"1px solid #F5F3FF",cursor:"pointer",transition:"background 0.15s"}}
//                 onMouseEnter={e=>e.currentTarget.style.background="#F5F3FF"}
//                 onMouseLeave={e=>e.currentTarget.style.background=even?"#FFFFFF":"#FAFAFF"}>

//                 {/* Frozen role name */}
//                 <div className="frozen-col" style={{width:COL_ROLE_W,minWidth:COL_ROLE_W,padding:"0 12px",display:"flex",alignItems:"center",gap:8,boxShadow:"2px 0 8px rgba(124,58,237,0.07)"}}>
//                   <div style={{width:28,height:28,borderRadius:8,flexShrink:0,background:"linear-gradient(135deg,#EDE9FE,#DDD6FE)",border:"1px solid #C4B5FD",display:"flex",alignItems:"center",justifyContent:"center"}}>
//                     <Briefcase style={{width:12,height:12,color:"#7C3AED"}}/>
//                   </div>
//                   <span style={{fontSize:12,fontWeight:600,color:"#2E1065",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{row.role}</span>
//                 </div>

//                 {/* Org count cells */}
//                 {UNIQUE_ORGS.map(org => {
//                   const count = Number(row[org]||0);
//                   const t = tier(count);
//                   return (
//                     <div key={org} style={{width:COL_ORG_W,minWidth:COL_ORG_W,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
//                       {count > 0
//                         ? <span style={{display:"inline-block",padding:"2px 10px",borderRadius:99,fontSize:11,fontWeight:700,background:`linear-gradient(135deg,${t.a},${t.b})`,color:t.txt,boxShadow:`0 2px 8px ${t.glow}`}}>{count}</span>
//                         : <span style={{color:"#DDD6FE",fontSize:14,fontWeight:600}}>—</span>
//                       }
//                     </div>
//                   );
//                 })}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* ── Pagination footer ── */}
//       <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 20px",background:"#F5F3FF",borderTop:"1.5px solid #DDD6FE",flexShrink:0,flexWrap:"wrap",gap:8}}>
//         <p style={{margin:0,fontSize:12,color:"#7C3AED"}}>
//           Showing{" "}
//           <span style={{fontWeight:700,color:"#6D28D9"}}>{filt.length===0?0:sp*PAGE_SZ+1}–{Math.min((sp+1)*PAGE_SZ,filt.length)}</span>
//           {" of "}
//           <span style={{fontWeight:700,color:"#2E1065"}}>{filt.length}</span>
//         </p>
//         <div style={{display:"flex",alignItems:"center",gap:5}}>
//           <button disabled={sp===0} onClick={()=>setPg(p=>p-1)}
//             style={{width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",background:sp===0?"#F1F0F9":"#FFFFFF",border:"1.5px solid",borderColor:sp===0?"#E2D9F3":"#DDD6FE",cursor:sp===0?"not-allowed":"pointer",opacity:sp===0?0.4:1,transition:"all 0.15s"}}>
//             <ChevronLeft style={{width:14,height:14,color:"#7C3AED"}}/>
//           </button>
//           {Array.from({length:totPg},(_,n) => (
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
//   const [toastVisible, setToastVisible] = useState(false);   // ← add this
//   const toastTimer = useRef<ReturnType<typeof setTimeout>>(); // ← add this
  
//   function showToast() {                                      // ← add this
//     setToastVisible(true);
//     clearTimeout(toastTimer.current);
//     toastTimer.current = setTimeout(() => setToastVisible(false), 3000);
//   }
//   return (
//     <div style={{minHeight:"100vh",fontFamily:"'Outfit',system-ui,sans-serif",background:"linear-gradient(160deg,#F5F3FF 0%,#EDE9FE 35%,#F5F3FF 65%,#FAF5FF 100%)",position:"relative"}}>
//       <style>{G}</style>

//       {/* BG orbs */}
//       <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
//         <div style={{position:"absolute",width:700,height:500,borderRadius:"50%",top:-200,left:-200,background:"radial-gradient(ellipse,rgba(196,181,253,0.30) 0%,transparent 70%)"}}/>
//         <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",bottom:-150,right:-100,background:"radial-gradient(ellipse,rgba(233,213,255,0.38) 0%,transparent 70%)"}}/>
//         <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",top:"30%",right:"15%",background:"radial-gradient(ellipse,rgba(221,214,254,0.45) 0%,transparent 70%)"}}/>
//       </div>

//       <div style={{position:"relative",zIndex:1}}>

//         {/* ── HEADER ── */}
//         <header style={{background:"rgba(255,255,255,0.80)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:"1px solid #DDD6FE",boxShadow:"0 2px 20px rgba(124,58,237,0.09)"}}>
//           <div className="header-inner" style={{maxWidth:1400,margin:"0 auto",padding:"13px 28px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
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
//             <div className="tabs-scroll" style={{flex:1}}>
//               {TABS.map((t,i) => (
//                 <button key={i} style={{padding:"5px 14px",fontSize:11.5,fontWeight:600,color:"#7C3AED",background:"rgba(237,233,254,0.75)",border:"1px solid #C4B5FD",borderRadius:99,cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap"}}
//                   onMouseEnter={e=>{e.currentTarget.style.background="#DDD6FE";e.currentTarget.style.transform="translateY(-1px)";}}
//                   onMouseLeave={e=>{e.currentTarget.style.background="rgba(237,233,254,0.75)";e.currentTarget.style.transform="none";}}>
//                   {t}
//                 </button>
//               ))}
//             </div>
//             <div className="live-badge" style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:7,flexShrink:0,background:"rgba(220,252,231,0.7)",border:"1px solid #86EFAC",padding:"4px 10px 4px 7px",borderRadius:99}}>
//               <div style={{position:"relative",width:10,height:10,flexShrink:0}}>
//                 <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"#22C55E",animation:"livePulse 1.6s ease-out infinite"}}/>
//                 <div style={{position:"absolute",inset:"2px",borderRadius:"50%",background:"#16A34A",boxShadow:"0 0 4px rgba(22,163,74,0.6)"}}/>
//               </div>
//               <span style={{fontSize:10.5,color:"#15803D",fontWeight:800,letterSpacing:"0.1em"}}>LIVE</span>
//             </div>
//           </div>
//         </header>

//         {/* ── NAVBAR ── */}
//         <nav style={{background:"rgba(255,255,255,0.72)",backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",borderBottom:"1px solid #EDE9FE",overflowX:"auto"}}>
//           <div className="nav-scroll" style={{maxWidth:1400,margin:"0 auto",padding:"5px 28px"}}>
//             {NAV.map((lk,i) => (
//               <a key={i} href="#" style={{padding:"6px 13px",fontSize:10.5,fontWeight:700,color:"#7C3AED",letterSpacing:"0.06em",textDecoration:"none",borderRadius:8,textTransform:"uppercase",transition:"all 0.15s",whiteSpace:"nowrap"}}
//                 onMouseEnter={e=>{e.currentTarget.style.background="#EDE9FE";e.currentTarget.style.color="#4C1D95";}}
//                 onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#7C3AED";}}>
//                 {lk}
//               </a>
//             ))}
//           </div>
//         </nav>

//         {/* ── MAIN 3-COLUMN GRID ── */}
//         <main className="main-grid page-pad" style={{maxWidth:1400,margin:"0 auto",padding:"26px 28px"}}>
//           <LoginCard/>
//           <JobGrid/>
//           <div className="yt-col" style={{borderRadius:20,overflow:"hidden",background:"rgba(255,255,255,0.85)",border:"1px solid #DDD6FE",boxShadow:cardShadow}}>
//             <div style={{background:"linear-gradient(135deg,#4C1D95 0%,#7C3AED 55%,#A855F7 100%)",padding:"18px 20px",position:"relative",overflow:"hidden"}}>
//               <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.04) 60%,transparent 100%)",pointerEvents:"none"}}/>
//               <p style={{margin:0,fontSize:15,fontWeight:700,color:"#fff",letterSpacing:"-0.3px",position:"relative"}}>Career Videos</p>
//               <p style={{margin:"3px 0 0",fontSize:11,color:"rgba(255,255,255,0.70)",position:"relative"}}>Watch &amp; get inspired</p>
//             </div>
//             <div style={{padding:"14px"}}>
//               <YouTubePanel/>
//             </div>
//           </div>
//         </main>

//         {/* ── FOOTER ── */}
//         <footer style={{maxWidth:1400,margin:"0 auto",padding:"0 28px 36px"}}>
//           <div className="footer-inner" style={{position:"relative",borderRadius:22,padding:"22px 28px",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:20,background:"rgba(255,255,255,0.80)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:"1px solid #DDD6FE",boxShadow:"0 4px 24px rgba(124,58,237,0.09),inset 0 1px 0 rgba(255,255,255,0.9)"}}>
//             <div style={{flex:1,minWidth:0}}>
//               <p style={{margin:"0 0 16px",fontSize:10,fontWeight:800,color:"#C4B5FD",letterSpacing:"0.1em",textTransform:"uppercase",display:"flex",alignItems:"center",gap:6}}>
//                 <GraduationCap style={{width:12,height:12,color:"#7C3AED"}}/>
//                 Qualification-wise Data Folders
//               </p>
//               <div className="env-row">
//                 {QUALS.map((q,i) => <Envelope key={i} {...q} onClick={showToast}/>)}
//                 {/* {QUALS.map((q,i) => <Envelope key={i} {...q}/>)} */}
//                 <TripleChevron/>
//               </div>
//             </div>
//             <div className="footer-divider" style={{width:1,height:64,background:"#DDD6FE",flexShrink:0}}/>
//           {toastVisible && (
//     <div style={{
//       position:"absolute", bottom:16, left:"50%", transform:"translateX(-50%)",
//       background:"rgba(255,255,255,0.97)", border:"1px solid #DDD6FE",
//       borderRadius:12, padding:"9px 18px",
//       fontSize:12.5, fontWeight:600, color:"#5B21B6",
//       display:"flex", alignItems:"center", gap:8,
//       boxShadow:"0 4px 16px rgba(124,58,237,0.15)",
//       whiteSpace:"nowrap", pointerEvents:"none",
//       animation:"fadeIn .2s ease"
//     }}>
//       🔒 Please sign in to view the students data
//     </div>
//   )}
//           </div>
//         </footer>

//       </div>
//     </div>
//   );
// }




import { useState, useRef, useEffect, useCallback } from "react";
import {
  Search, X,
  Briefcase, GraduationCap, ArrowRight,
  ChevronLeft, ChevronRight, LogIn, Zap, UserPlus, UserCheck,
  Loader2, AlertCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const BASE = "http://192.168.0.6:8000/api";

const NAV  = ["Home","About Us","Authorised HRs","Core Committee","Services","Projects","Associates","Gallery","Contact Us"];
const TABS = ["PG & Degree Colleges","Industrial Associates","Entrepreneur Sources","Entrepreneur Network"];

/* ─── Static seed: every (org,role) combo shown even before API responds ─── */
const JOBS_SEED = [
  { org:"Hospitals",         n:0,  role:"Administration"   },
  { org:"Schools",           n:0,  role:"Administration"   },
  { org:"Colleges",          n:0,  role:"Administration"   },
  { org:"IT Industry",       n:0,  role:"Engineer"         },
  { org:"Hardware Industry", n:0,  role:"Engineer"         },
  { org:"Service Sector",    n:0,  role:"Faculty"          },
  { org:"Banks",             n:0,  role:"Faculty"          },
  { org:"Hospitals",         n:0,  role:"Nursing"          },
  { org:"Colleges",          n:0,  role:"Librarian"        },
  { org:"IT Industry",       n:0,  role:"Developer"        },
  { org:"Service Sector",    n:0,  role:"Support"          },
  { org:"Banks",             n:0,  role:"Clerk"            },
  { org:"Hardware Industry", n:0,  role:"Technician"       },
  { org:"IT Industry",       n:0,  role:"System Admin"     },
  { org:"Schools",           n:0,  role:"System Admin"     },
  { org:"Banks",             n:0,  role:"Accountant"       },
  { org:"Service Sector",    n:0,  role:"Accountant"       },
  { org:"Hospitals",         n:0,  role:"Security"         },
  { org:"Colleges",          n:0,  role:"Security"         },
  { org:"Banks",             n:0,  role:"HR Manager"       },
  { org:"IT Industry",       n:0,  role:"HR Manager"       },
  { org:"IT Industry",       n:0,  role:"Data Analyst"     },
  { org:"Hardware Industry", n:0,  role:"Quality Tester"   },
  { org:"Service Sector",    n:0,  role:"Sales Officer"    },
  { org:"Retail Sector",     n:0,  role:"Sales Officer"    },
  { org:"Retail Sector",     n:0,  role:"Store Manager"    },
  { org:"Logistics",         n:0,  role:"Driver"           },
  { org:"Logistics",         n:0,  role:"Warehouse Staff"  },
  { org:"Logistics",         n:0,  role:"Supply Chain Mgr" },
  { org:"Hospitals",         n:0,  role:"Doctor"           },
  { org:"Schools",           n:0,  role:"Counselor"        },
];

const QUALS = [
  { label:"Below SSC", body:"#FFF7ED", border:"#F97316", lid:"#F97316", line:"#FED7AA", stamp:"#EA580C" },
  { label:"SSC",       body:"#FFF1F2", border:"#F43F5E", lid:"#F43F5E", line:"#FECDD3", stamp:"#C81A40" },
  { label:"ITI",       body:"#FFFBEB", border:"#F59E0B", lid:"#F59E0B", line:"#FDE68A", stamp:"#D97706" },
  { label:"Diploma",   body:"#F5F3FF", border:"#8B5CF6", lid:"#8B5CF6", line:"#DDD6FE", stamp:"#7C3AED" },
  { label:"Inter",     body:"#FAF5FF", border:"#A855F7", lid:"#A855F7", line:"#E9D5FF", stamp:"#9333EA" },
  { label:"Degree",    body:"#F3E8FF", border:"#C084FC", lid:"#C084FC", line:"#F3E8FF", stamp:"#A855F7" },
  { label:"PG",        body:"#EDE9FE", border:"#7C3AED", lid:"#7C3AED", line:"#C4B5FD", stamp:"#6D28D9" },
];

const PAGE_SZ    = 7;
const ROW_H      = 54;
const COL_ROLE_W = 160;
const COL_ORG_W  = 100;
const SCROLL_STEP = 300;

const tier = (n: number) =>
  n >= 100 ? { a:"#7C3AED", b:"#6D28D9", txt:"#fff", glow:"rgba(124,58,237,0.32)" }
: n >=  30 ? { a:"#A855F7", b:"#9333EA", txt:"#fff", glow:"rgba(168,85,247,0.28)" }
:            { a:"#C084FC", b:"#A855F7", txt:"#fff", glow:"rgba(192,132,252,0.25)" };

const cardShadow = "0 1px 3px rgba(124,58,237,0.07), 0 8px 24px rgba(109,40,217,0.12), 0 1px 0 rgba(255,255,255,0.9) inset";

/* ─── merge live API data into seed ─── */
function mergeLive(seed: typeof JOBS_SEED, live: { org:string; role:string; n:number }[]) {
  const result = seed.map(s => ({ ...s }));
  live.forEach(l => {
    const idx = result.findIndex(r => r.org === l.org && r.role === l.role);
    if (idx !== -1) result[idx].n = l.n;
    else result.push({ org: l.org, role: l.role, n: l.n });
  });
  return result;
}

/* ─── build matrix ─── */
function buildMatrix(jobs: { org:string; role:string; n:number }[]) {
  const orgs  = Array.from(new Set(jobs.map(j => j.org))).sort((a,b) => a.localeCompare(b));
  const roles = Array.from(new Set(jobs.map(j => j.role)));
  const matrix = roles.map(role => {
    const row: Record<string,string|number> = { role };
    orgs.forEach(org => {
      const match = jobs.find(j => j.role === role && j.org === org);
      row[org] = match ? match.n : 0;
    });
    return row;
  });
  return { orgs, matrix };
}

/* ════════════════════════════ STYLES ══════════════════════════ */
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
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes fadeIn{from{opacity:0;transform:translateX(-50%) translateY(6px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
  @keyframes skeletonPulse{0%,100%{opacity:.45}50%{opacity:.9}}

  .su-hr:hover{background:#EDE9FE !important;border-color:#7C3AED !important;border-style:solid !important;color:#4C1D95 !important;box-shadow:0 4px 14px rgba(124,58,237,0.18) !important;transform:translateY(-1px);}
  .su-emp:hover{background:#F0FDF4 !important;border-color:#22C55E !important;border-style:solid !important;color:#15803D !important;box-shadow:0 4px 14px rgba(34,197,94,0.18) !important;transform:translateY(-1px);}

  .tbl-scroll-btn{width:32px;height:32px;border-radius:50%;border:1.5px solid #C4B5FD;background:linear-gradient(135deg,#F5F3FF,#EDE9FE);box-shadow:0 2px 10px rgba(124,58,237,0.18);display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:all 0.18s;}
  .tbl-scroll-btn:hover:not(:disabled){background:linear-gradient(135deg,#7C3AED,#A855F7);border-color:#7C3AED;box-shadow:0 4px 16px rgba(124,58,237,0.38);transform:scale(1.08);}
  .tbl-scroll-btn:disabled{opacity:0.3;cursor:not-allowed;}

  .frozen-col{position:sticky;left:0;z-index:3;background:inherit;}
  .frozen-col-hdr{position:sticky;left:0;z-index:4;background:#F5F3FF;}

  .tbl-viewport{overflow-x:auto;overflow-y:hidden;scroll-behavior:smooth;-webkit-overflow-scrolling:touch;}
  .tbl-viewport::-webkit-scrollbar{height:5px;}
  .tbl-viewport::-webkit-scrollbar-track{background:#F5F3FF;}
  .tbl-viewport::-webkit-scrollbar-thumb{background:#C4B5FD;border-radius:99px;}

  .main-grid{display:grid;grid-template-columns:320px 1fr 300px;gap:22px;align-items:start;}
  @media(max-width:1200px){.main-grid{grid-template-columns:300px 1fr !important;}.yt-col{display:none !important;}}
  @media(max-width:820px){.main-grid{grid-template-columns:1fr !important;}.page-pad{padding:16px 14px !important;}}

  .nav-scroll{display:flex;flex-wrap:wrap;gap:2px;}
  .tabs-scroll{display:flex;flex-wrap:wrap;gap:7px;}
  .env-row{display:flex;gap:14px;align-items:flex-end;flex-wrap:wrap;}

  @media(max-width:900px){
    .header-inner{flex-wrap:wrap;gap:10px !important;padding:12px 14px !important;}
    .tabs-scroll{overflow-x:auto;flex-wrap:nowrap;padding-bottom:4px;-webkit-overflow-scrolling:touch;}
    .tabs-scroll::-webkit-scrollbar{display:none;}
    .nav-scroll{overflow-x:auto;flex-wrap:nowrap;padding:4px 14px;-webkit-overflow-scrolling:touch;}
    .nav-scroll::-webkit-scrollbar{display:none;}
    .footer-inner{flex-direction:column !important;gap:16px !important;padding:18px 14px !important;}
    .footer-divider{display:none !important;}
    .env-row{flex-wrap:nowrap;overflow-x:auto;padding-bottom:6px;-webkit-overflow-scrolling:touch;}
    .env-row::-webkit-scrollbar{display:none;}
    .tcc-wrap{margin-bottom:0 !important;}
    .live-badge{display:none;}
  }
  @media(max-width:600px){
    .header-logo-text p:first-child{font-size:8.5px !important;}
    .header-logo-text p:last-child{font-size:13px !important;}
  }
`;

/* ══════ TRIPLE CHEVRON ════════════════════════════════════════ */
function TripleChevron() {
  const chevColors = ["#6D28D9","#9333EA","#C084FC"];
  return (
    <div className="tcc-wrap">
      <div className="tcc-pill">
        <span className="tcc-label">View All</span>
        {chevColors.map((color,i) => (
          <svg key={i} className="chev-svg" width="13" height="22" viewBox="0 0 13 22" fill="none"
            style={{marginLeft:i===0?2:-3}}>
            <path className={`chev-path-${i+1}`} d="M2.5 3.5 L10.5 11 L2.5 18.5"
              stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="28" strokeDashoffset="28"/>
          </svg>
        ))}
      </div>
    </div>
  );
}

/* ══════ ENVELOPE ══════════════════════════════════════════════ */
function Envelope({ label, body, border, lid, line, stamp, onClick }: {
  label:string; body:string; border:string; lid:string; line:string; stamp:string; onClick?:()=>void;
}) {
  return (
    <div className="env-wrap" tabIndex={0} aria-label={`${label} data folder`} onClick={onClick}>
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

/* ══════ YOUTUBE PANEL ═════════════════════════════════════════ */
// const YT_IDS = [
//   { id:"aBeIbTOKSiI", label:"Career Spotlight" },
//   { id:"HAnw168huqA", label:"Career Advice"    },
// ];

// function YouTubePanel() {
//   return (
//     <div style={{display:"flex",flexDirection:"column",gap:18}}>
//       {YT_IDS.map(({id,label}) => (
//         <div key={id} style={{border:"2px solid #7C3AED",borderRadius:14,padding:10,background:"transparent"}}>
//           <div style={{borderRadius:8,overflow:"hidden",background:"#0d0d0d",position:"relative",lineHeight:0}}>
//             <div style={{position:"absolute",inset:0,zIndex:2,pointerEvents:"none",borderRadius:8,background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 3px)"}}/>
//             <iframe
//               src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
//               title={label}
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               style={{width:"100%",aspectRatio:"16/9",border:"none",display:"block"}}
//             />
//           </div>
//           <div style={{display:"flex",alignItems:"center",marginTop:9,padding:"0 2px"}}>
//             <div style={{width:5,height:5,borderRadius:"50%",background:"#7C3AED",flexShrink:0}}/>
//             <div style={{flex:1,height:1,background:"#7C3AED33",margin:"0 6px"}}/>
//             <span style={{fontSize:9,fontWeight:800,letterSpacing:"0.14em",color:"#7C3AED",textTransform:"uppercase",whiteSpace:"nowrap"}}>{label}</span>
//             <div style={{flex:1,height:1,background:"#7C3AED33",margin:"0 6px"}}/>
//             <div style={{width:5,height:5,borderRadius:"50%",background:"#7C3AED",flexShrink:0}}/>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


/* ══════ YOUTUBE PANEL ═════════════════════════════════════════ */
const YT_IDS = [
  { id: "aBeIbTOKSiI", label: "Career Spotlight", ch: "CH1" },
  { id: "HAnw168huqA", label: "Career Advice",    ch: "CH2" },
];

function YouTubePanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {YT_IDS.map(({ id, label, ch }, i) => (
        <div key={id} style={{ background: "#f5f5f5", borderRadius: "6px 6px 4px 4px", border: "2px solid #2e2e2e", padding: "10px 10px 8px", position: "relative" }}>

          {/* orange top accent */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#e05500", borderRadius: "4px 4px 0 0", opacity: 0.7 }} />

          {/* screen */}
          <div style={{ background: "#000", borderRadius: 3, overflow: "hidden", position: "relative", border: "1px solid #333", lineHeight: 0 }}>

            {/* top overlay: REC + timecode */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 8px", background: "linear-gradient(to bottom,rgba(0,0,0,0.75),transparent)", zIndex: 10, pointerEvents: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#e05500", animation: "ytRecBlink 1.4s ease-in-out infinite" }} />
                <span style={{ fontFamily: "monospace", fontSize: 10, color: "#e05500", letterSpacing: "0.1em" }}>REC</span>
              </div>
              <span style={{ fontFamily: "monospace", fontSize: 10, color: "#aaa", letterSpacing: "0.08em" }}>00:0{i + 1}:24:00</span>
            </div>

            <iframe
              src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
              title={label}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: "100%", aspectRatio: "16/9", border: "none", display: "block" }}
            />

            {/* bottom overlay: CH + VU + SDI */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 8px", background: "linear-gradient(to top,rgba(0,0,0,0.85),transparent)", zIndex: 10, pointerEvents: "none" }}>
              <span style={{ fontFamily: "monospace", fontSize: 9, color: "#888", letterSpacing: "0.1em" }}>{ch}</span>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 14 }}>
                {[10, 14, 8, 12, 6, 10].map((h, j) => (
                  <div key={j} style={{ width: 3, borderRadius: 1, background: "#e05500", height: h, animation: `ytVU${j} 0.6s ease-in-out infinite alternate` }} />
                ))}
              </div>
              <span style={{ fontFamily: "monospace", fontSize: 9, color: "#888", letterSpacing: "0.1em" }}>SDI</span>
            </div>
          </div>

          {/* bezel bottom */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 7, padding: "0 3px" }}>
            <div style={{ display: "flex", gap: 3 }}>
              {[0, 1, 2].map(k => (
                <div key={k} style={{ width: 18, height: 6, borderRadius: 1, background: "#2e2e2e", border: "1px solid #3a3a3a" }} />
              ))}
            </div>
            <span style={{ fontFamily: "monospace", fontSize: 9, fontWeight: 700, color: "#888", letterSpacing: "0.18em", textTransform: "uppercase" }}>{label}</span>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#e05500", animation: "ytRecBlink 1.4s ease-in-out infinite" }} />
          </div>

          {/* stand */}
          <div style={{ width: 14, height: 18, background: "#222", margin: "0 auto" }} />
          <div style={{ width: 58, height: 6, background: "#222", borderRadius: "0 0 3px 3px", margin: "0 auto" }} />

          {/* rack strip */}
          {/* <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#161616", borderRadius: 4, padding: "5px 12px", border: "1px solid #2a2a2a", marginTop: 4 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#e05500", flexShrink: 0 }} />
            <span style={{ fontFamily: "monospace", fontSize: 9, color: "#444", letterSpacing: "0.12em", flex: 1 }}>
              BROADCAST MONITOR {i + 1} — {ch} / SDI IN / 1080i
            </span>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#333" }} />
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#333" }} />
          </div> */}
        </div>
      ))}

      <style>{`
        @keyframes ytRecBlink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes ytVU0 { from{height:4px;background:#555} to{height:10px;background:#e05500} }
        @keyframes ytVU1 { from{height:4px;background:#555} to{height:14px;background:#e05500} }
        @keyframes ytVU2 { from{height:4px;background:#555} to{height:8px;background:#e05500}  }
        @keyframes ytVU3 { from{height:4px;background:#555} to{height:12px;background:#e05500} }
        @keyframes ytVU4 { from{height:4px;background:#555} to{height:6px;background:#e05500}  }
        @keyframes ytVU5 { from{height:4px;background:#555} to{height:10px;background:#e05500} }
      `}</style>
    </div>
  );
}

/* ══════ LOGIN CARD ════════════════════════════════════════════ */
function LoginCard() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    if (!id.trim() || !pw.trim()) { setError("Please enter your ID/email and password."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch(`${BASE}/signin/`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({identifier:id.trim(),password:pw}),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error||data.message||"Login failed."); return; }
      localStorage.setItem("user_type",data.role);
      if (data.token) localStorage.setItem("token",data.token);
      if (data.role==="hr") {
        localStorage.setItem("hr_id",data.hr_id);
        localStorage.setItem("hr_name",data.name);
        localStorage.setItem("hr_email",data.email);
        navigate("/hr/dashboard"); return;
      }
      if (data.role==="employer") {
        localStorage.setItem("employer_id",data.employer_id);
        localStorage.setItem("employer_name",data.name);
        localStorage.setItem("employer_email",data.email);
        localStorage.setItem("company_name",data.company_name);
        navigate("/listpersons"); return;
      }
      setError("Invalid account type.");
    } catch { setError("Network error. Please check your connection."); }
    finally { setLoading(false); }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key==="Enter") handleSignIn(); };

  return (
    <div style={{borderRadius:20,overflow:"hidden",background:"#FFFFFF",border:"1px solid #DDD6FE",boxShadow:cardShadow}}>
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#4C1D95 0%,#7C3AED 55%,#A855F7 100%)",padding:"22px 20px 18px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.04) 60%,transparent 100%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",right:-22,top:-22,width:90,height:90,borderRadius:"50%",background:"rgba(255,255,255,0.08)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",left:-10,bottom:-20,width:60,height:60,borderRadius:"50%",background:"rgba(196,181,253,0.15)",pointerEvents:"none"}}/>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative"}}>
          <div>
            <p style={{margin:0,fontSize:15,fontWeight:700,color:"#fff",letterSpacing:"-0.3px"}}>Login for HR &amp; Employer</p>
            <p style={{margin:"3px 0 0",fontSize:11,color:"rgba(255,255,255,0.70)"}}>Sign in to access your dashboard</p>
          </div>
          <div style={{width:40,height:40,borderRadius:13,background:"rgba(255,255,255,0.20)",border:"1px solid rgba(255,255,255,0.40)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 3px 10px rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.35)"}}>
            <LogIn style={{width:17,height:17,color:"#fff"}}/>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{padding:"20px 18px",display:"flex",flexDirection:"column",gap:11}}>
        <div>
          <label style={{fontSize:9,fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase",color:"#A78BFA",display:"block",marginBottom:4}}>HR ID / Employer ID / Email</label>
          <input type="text" placeholder="e.g. HR1205260001 or you@email.com" value={id}
            onChange={e=>{setId(e.target.value);setError("");}} onKeyDown={handleKeyDown}
            style={{width:"100%",padding:"10px 14px",fontSize:12.5,boxSizing:"border-box",background:"#FAF5FF",border:"1.5px solid #DDD6FE",borderRadius:11,outline:"none",color:"#2E1065",transition:"all 0.2s"}}
            onFocus={e=>{e.target.style.borderColor="#7C3AED";e.target.style.background="#F3E8FF";e.target.style.boxShadow="0 0 0 3px rgba(196,181,253,0.45)";}}
            onBlur={e=>{e.target.style.borderColor="#DDD6FE";e.target.style.background="#FAF5FF";e.target.style.boxShadow="none";}}/>
        </div>
        <div>
          <label style={{fontSize:9,fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase",color:"#A78BFA",display:"block",marginBottom:4}}>Password</label>
          <input type="password" placeholder="Password" value={pw}
            onChange={e=>{setPw(e.target.value);setError("");}} onKeyDown={handleKeyDown}
            style={{width:"100%",padding:"10px 14px",fontSize:13,boxSizing:"border-box",background:"#FAF5FF",border:"1.5px solid #DDD6FE",borderRadius:11,outline:"none",color:"#2E1065",transition:"all 0.2s"}}
            onFocus={e=>{e.target.style.borderColor="#7C3AED";e.target.style.background="#F3E8FF";e.target.style.boxShadow="0 0 0 3px rgba(196,181,253,0.45)";}}
            onBlur={e=>{e.target.style.borderColor="#DDD6FE";e.target.style.background="#FAF5FF";e.target.style.boxShadow="none";}}/>
        </div>
        {error && (
          <div style={{display:"flex",alignItems:"center",gap:7,background:"#FFF1F2",border:"1.5px solid #FECDD3",borderRadius:10,padding:"8px 12px"}}>
            <AlertCircle style={{width:14,height:14,color:"#F43F5E",flexShrink:0}}/>
            <span style={{fontSize:11.5,fontWeight:600,color:"#BE123C",lineHeight:1.4}}>{error}</span>
          </div>
        )}
        <button onClick={handleSignIn} disabled={loading}
          style={{width:"100%",padding:"11px",marginTop:1,background:"linear-gradient(135deg,#4C1D95,#7C3AED,#A855F7)",color:"#fff",fontWeight:700,fontSize:13.5,border:"none",borderRadius:12,cursor:loading?"not-allowed":"pointer",position:"relative",overflow:"hidden",boxShadow:"0 4px 18px rgba(124,58,237,0.45)",transition:"transform 0.15s,box-shadow 0.15s",opacity:loading?0.8:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}
          onMouseEnter={e=>{if(!loading){e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(124,58,237,0.50)";}}}
          onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 18px rgba(124,58,237,0.45)";}}
          onMouseDown={e=>{if(!loading)e.currentTarget.style.transform="scale(0.97)";}}
          onMouseUp={e=>{if(!loading)e.currentTarget.style.transform="translateY(-2px)";}}>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 60%)",pointerEvents:"none"}}/>
          {loading ? <><Loader2 style={{width:15,height:15,animation:"spin 1s linear infinite"}}/> Signing in…</> : <span style={{position:"relative"}}>Sign In →</span>}
        </button>
        <p style={{margin:0,fontSize:10,color:"#C4B5FD",textAlign:"center",lineHeight:1.5}}>
          Use your <b style={{color:"#9333EA"}}>HR ID</b> (e.g. HR1205260001),{" "}
          <b style={{color:"#9333EA"}}>Employer ID</b> (e.g. EM1605260001), or registered <b style={{color:"#9333EA"}}>email</b>
        </p>
        <div style={{display:"flex",alignItems:"center",gap:8,margin:"2px 0"}}>
          <div style={{flex:1,height:1,background:"linear-gradient(90deg,transparent,#DDD6FE)"}}/>
          <span style={{fontSize:10,color:"#C4B5FD",fontWeight:700,letterSpacing:"0.07em",whiteSpace:"nowrap"}}>New here? Sign up as</span>
          <div style={{flex:1,height:1,background:"linear-gradient(90deg,#DDD6FE,transparent)"}}/>
        </div>
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
        <p style={{margin:"2px 0 0",fontSize:10,color:"#A78BFA",lineHeight:1.6,borderTop:"1px solid #F3E8FF",paddingTop:10,textAlign:"center"}}>
          Declaration Form &amp; Security Insurance ECS required for activation.
        </p>
      </div>
    </div>
  );
}

/* ══════ JOB GRID ══════════════════════════════════════════════ */
function JobGrid() {
  /* ── state ── */
  const [jobs,       setJobs]       = useState(JOBS_SEED);
  const [boardLoad,  setBoardLoad]  = useState(true);   // initial fetch
  const [fetchErr,   setFetchErr]   = useState("");
  const [q,          setQ]          = useState("");
  const [pg,         setPg]         = useState(0);
  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  /* ── fetch live counts from backend ── */
  const fetchBoard = useCallback(async () => {
    try {
      const res  = await fetch(`${BASE}/jobs/board/`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const live: { org:string; role:string; n:number }[] = await res.json();
      setJobs(mergeLive(JOBS_SEED, live));
      setFetchErr("");
    } catch {
      setFetchErr("Live counts unavailable – showing last known data.");
    } finally {
      setBoardLoad(false);
    }
  }, []);

  useEffect(() => {
    fetchBoard();
    const id = setInterval(fetchBoard, 60_000); // refresh every 60 s
    return () => clearInterval(id);
  }, [fetchBoard]);

  /* auto-clear error banner after 4 s */
  useEffect(() => {
    if (!fetchErr) return;
    const t = setTimeout(() => setFetchErr(""), 4000);
    return () => clearTimeout(t);
  }, [fetchErr]);

  /* ── derived display data ── */
  const { orgs: UNIQUE_ORGS, matrix: MATRIX_DATA } = buildMatrix(jobs);
  const totalTableW = COL_ROLE_W + UNIQUE_ORGS.length * COL_ORG_W;

  const filt = MATRIX_DATA
    .filter(r => String(r.role).toLowerCase().includes(q.toLowerCase()))
    .sort((a,b) => String(a.role).localeCompare(String(b.role)));

  const totPg = Math.max(1, Math.ceil(filt.length / PAGE_SZ));
  const sp    = Math.min(pg, totPg - 1);
  const rows  = filt.slice(sp * PAGE_SZ, (sp + 1) * PAGE_SZ);
  const pad   = [...rows, ...Array(PAGE_SZ - rows.length).fill(null)];

  /* ── scroll helpers ── */
  const onScroll = () => {
    const el = viewportRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };
  const scrollLeft  = () => viewportRef.current?.scrollBy({ left:-SCROLL_STEP, behavior:"smooth" });
  const scrollRight = () => viewportRef.current?.scrollBy({ left: SCROLL_STEP, behavior:"smooth" });
  const initViewport = (el: HTMLDivElement | null) => {
    (viewportRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    if (el) setCanScrollRight(el.scrollWidth > el.clientWidth + 4);
  };

  return (
    <div style={{borderRadius:20,overflow:"hidden",background:"#FFFFFF",border:"1px solid #DDD6FE",boxShadow:cardShadow,display:"flex",flexDirection:"column"}}>

      {/* ── Header ── */}
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
                {boardLoad ? "Loading…" : `${filt.length} unique roles · refreshes every 60 s`}
              </p>
            </div>
          </div>
          {/* search */}
          <div style={{position:"relative",flex:"1 1 180px",maxWidth:260,minWidth:140}}>
            <Search style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",width:13,height:13,color:"rgba(255,255,255,0.6)"}}/>
            <input type="text" placeholder="Search roles…" value={q}
              onChange={e=>{setQ(e.target.value);setPg(0);}}
              style={{width:"100%",paddingLeft:30,paddingRight:q?28:12,paddingTop:8,paddingBottom:8,fontSize:12.5,background:"rgba(255,255,255,0.16)",border:"1px solid rgba(255,255,255,0.32)",borderRadius:10,outline:"none",color:"#fff",boxSizing:"border-box",transition:"all 0.2s"}}
              onFocus={e=>{e.target.style.background="rgba(255,255,255,0.26)";e.target.style.borderColor="rgba(255,255,255,0.65)";}}
              onBlur={e=>{e.target.style.background="rgba(255,255,255,0.16)";e.target.style.borderColor="rgba(255,255,255,0.32)";}}/>
            {q&&<button onClick={()=>{setQ("");setPg(0);}} style={{position:"absolute",right:9,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",padding:0,color:"rgba(255,255,255,0.7)"}}>
              <X style={{width:12,height:12}}/>
            </button>}
          </div>
        </div>
      </div>

      {/* ── fetch-error banner ── */}
      {fetchErr && (
        <div style={{background:"#FFF7ED",borderBottom:"1px solid #FED7AA",padding:"7px 18px",fontSize:12,fontWeight:600,color:"#C2410C",display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
          <span>⚠️</span> {fetchErr}
        </div>
      )}

      {/* ── Scroll controls bar ── */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 16px 4px",background:"#F5F3FF",borderBottom:"1px solid #EDE9FE",gap:8,flexShrink:0}}>
        <span style={{fontSize:9.5,fontWeight:700,letterSpacing:"0.09em",textTransform:"uppercase",color:"#A78BFA"}}>
          {UNIQUE_ORGS.length} organisations · scroll to see all →
        </span>
        <div style={{display:"flex",gap:6}}>
          <button className="tbl-scroll-btn" onClick={scrollLeft}  disabled={!canScrollLeft}  aria-label="Scroll left">
            <ChevronLeft  style={{width:15,height:15,color:"#7C3AED"}}/>
          </button>
          <button className="tbl-scroll-btn" onClick={scrollRight} disabled={!canScrollRight} aria-label="Scroll right">
            <ChevronRight style={{width:15,height:15,color:"#7C3AED"}}/>
          </button>
        </div>
      </div>

      {/* ── Table viewport ── */}
      <div className="tbl-viewport" ref={initViewport} onScroll={onScroll} style={{flex:1}}>
        <div style={{width:totalTableW,minWidth:"100%"}}>

          {/* Column headers */}
          <div style={{display:"flex",background:"#F5F3FF",borderBottom:"1.5px solid #DDD6FE",position:"sticky",top:0,zIndex:4}}>
            <div className="frozen-col-hdr" style={{width:COL_ROLE_W,minWidth:COL_ROLE_W,padding:"11px 14px",fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"#7C3AED",boxShadow:"2px 0 8px rgba(124,58,237,0.08)"}}>
              Role
            </div>
            {UNIQUE_ORGS.map(org => (
              <div key={org} style={{width:COL_ORG_W,minWidth:COL_ORG_W,padding:"11px 6px",fontSize:9.5,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:"#7C3AED",textAlign:"center",flexShrink:0,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                {org}
              </div>
            ))}
          </div>

          {/* ── Loading skeleton rows ── */}
          {boardLoad ? (
            Array.from({length:PAGE_SZ}).map((_,i) => (
              <div key={`sk${i}`} style={{height:ROW_H,display:"flex",alignItems:"center",background:i%2===0?"#FFFFFF":"#FAFAFF",borderBottom:"1px solid #F5F3FF",gap:0}}>
                {/* role cell skeleton */}
                <div className="frozen-col" style={{width:COL_ROLE_W,minWidth:COL_ROLE_W,padding:"0 12px",display:"flex",alignItems:"center",gap:8,boxShadow:"2px 0 8px rgba(124,58,237,0.07)"}}>
                  <div style={{width:28,height:28,borderRadius:8,background:"#EDE9FE",animation:"skeletonPulse 1.4s ease-in-out infinite",flexShrink:0}}/>
                  <div style={{height:12,borderRadius:6,background:"#EDE9FE",animation:"skeletonPulse 1.4s ease-in-out infinite",width:"65%"}}/>
                </div>
                {/* org cell skeletons */}
                {UNIQUE_ORGS.map(org => (
                  <div key={org} style={{width:COL_ORG_W,minWidth:COL_ORG_W,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <div style={{width:32,height:20,borderRadius:99,background:"#EDE9FE",animation:"skeletonPulse 1.4s ease-in-out infinite"}}/>
                  </div>
                ))}
              </div>
            ))
          ) : (
            /* ── Data rows ── */
            pad.map((row,i) => {
              const even = i%2===0;
              if (!row) return (
                <div key={`p${i}`} style={{height:ROW_H,display:"flex",background:even?"#FFFFFF":"#FAFAFF",borderBottom:"1px solid #F5F3FF"}}/>
              );
              return (
                <div key={i} style={{height:ROW_H,display:"flex",alignItems:"center",background:even?"#FFFFFF":"#FAFAFF",borderBottom:"1px solid #F5F3FF",cursor:"pointer",transition:"background 0.15s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#F5F3FF"}
                  onMouseLeave={e=>e.currentTarget.style.background=even?"#FFFFFF":"#FAFAFF"}>

                  {/* Frozen role name */}
                  <div className="frozen-col" style={{width:COL_ROLE_W,minWidth:COL_ROLE_W,padding:"0 12px",display:"flex",alignItems:"center",gap:8,boxShadow:"2px 0 8px rgba(124,58,237,0.07)"}}>
                    <div style={{width:28,height:28,borderRadius:8,flexShrink:0,background:"linear-gradient(135deg,#EDE9FE,#DDD6FE)",border:"1px solid #C4B5FD",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <Briefcase style={{width:12,height:12,color:"#7C3AED"}}/>
                    </div>
                    <span style={{fontSize:12,fontWeight:600,color:"#2E1065",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{row.role}</span>
                  </div>

                  {/* Org count cells */}
                  {UNIQUE_ORGS.map(org => {
                    const count = Number(row[org]||0);
                    const t = tier(count);
                    return (
                      <div key={org} style={{width:COL_ORG_W,minWidth:COL_ORG_W,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        {count > 0
                          ? <span style={{display:"inline-block",padding:"2px 10px",borderRadius:99,fontSize:11,fontWeight:700,background:`linear-gradient(135deg,${t.a},${t.b})`,color:t.txt,boxShadow:`0 2px 8px ${t.glow}`}}>{count}</span>
                          : <span style={{color:"#DDD6FE",fontSize:14,fontWeight:600}}>—</span>
                        }
                      </div>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── Pagination footer ── */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 20px",background:"#F5F3FF",borderTop:"1.5px solid #DDD6FE",flexShrink:0,flexWrap:"wrap",gap:8}}>
        <p style={{margin:0,fontSize:12,color:"#7C3AED"}}>
          {boardLoad ? (
            <span style={{color:"#C4B5FD",display:"flex",alignItems:"center",gap:6}}>
              <Loader2 style={{width:12,height:12,animation:"spin 1s linear infinite"}}/>
              Fetching live counts…
            </span>
          ) : (
            <>Showing{" "}
              <span style={{fontWeight:700,color:"#6D28D9"}}>{filt.length===0?0:sp*PAGE_SZ+1}–{Math.min((sp+1)*PAGE_SZ,filt.length)}</span>
              {" of "}
              <span style={{fontWeight:700,color:"#2E1065"}}>{filt.length}</span>
            </>
          )}
        </p>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          <button disabled={sp===0||boardLoad} onClick={()=>setPg(p=>p-1)}
            style={{width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",background:sp===0?"#F1F0F9":"#FFFFFF",border:"1.5px solid",borderColor:sp===0?"#E2D9F3":"#DDD6FE",cursor:sp===0?"not-allowed":"pointer",opacity:sp===0?0.4:1,transition:"all 0.15s"}}>
            <ChevronLeft style={{width:14,height:14,color:"#7C3AED"}}/>
          </button>
          {Array.from({length:totPg},(_,n) => (
            <button key={n} onClick={()=>setPg(n)} disabled={boardLoad}
              style={{width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.15s",background:n===sp?"linear-gradient(135deg,#6D28D9,#A855F7)":"#FFFFFF",border:n===sp?"1.5px solid #7C3AED":"1.5px solid #DDD6FE",color:n===sp?"#fff":"#7C3AED",boxShadow:n===sp?"0 3px 10px rgba(124,58,237,0.38)":"0 1px 3px rgba(124,58,237,0.08)"}}>
              {n+1}
            </button>
          ))}
          <button disabled={sp>=totPg-1||boardLoad} onClick={()=>setPg(p=>p+1)}
            style={{width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",background:sp>=totPg-1?"#F1F0F9":"#FFFFFF",border:"1.5px solid",borderColor:sp>=totPg-1?"#E2D9F3":"#DDD6FE",cursor:sp>=totPg-1?"not-allowed":"pointer",opacity:sp>=totPg-1?0.4:1,transition:"all 0.15s"}}>
            <ChevronRight style={{width:14,height:14,color:"#7C3AED"}}/>
          </button>
        </div>
      </div>

    </div>
  );
}

/* ══════ ROOT ══════════════════════════════════════════════════ */
export default function Index() {
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  function showToast() {
    setToastVisible(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 3000);
  }

  return (
    <div style={{minHeight:"100vh",fontFamily:"'Outfit',system-ui,sans-serif",background:"linear-gradient(160deg,#F5F3FF 0%,#EDE9FE 35%,#F5F3FF 65%,#FAF5FF 100%)",position:"relative"}}>
      <style>{G}</style>

      {/* BG orbs */}
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
              {TABS.map((t,i) => (
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
            {NAV.map((lk,i) => (
              <a key={i} href="#" style={{padding:"6px 13px",fontSize:10.5,fontWeight:700,color:"#7C3AED",letterSpacing:"0.06em",textDecoration:"none",borderRadius:8,textTransform:"uppercase",transition:"all 0.15s",whiteSpace:"nowrap"}}
                onMouseEnter={e=>{e.currentTarget.style.background="#EDE9FE";e.currentTarget.style.color="#4C1D95";}}
                onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#7C3AED";}}>
                {lk}
              </a>
            ))}
          </div>
        </nav>

        {/* ── MAIN 3-COLUMN GRID ── */}
        <main className="main-grid page-pad" style={{maxWidth:1400,margin:"0 auto",padding:"26px 28px"}}>
          <LoginCard/>
          <JobGrid/>
          <div className="yt-col" style={{borderRadius:20,overflow:"hidden",background:"rgba(255,255,255,0.85)",border:"1px solid #DDD6FE",boxShadow:cardShadow}}>
            <div style={{background:"linear-gradient(135deg,#4C1D95 0%,#7C3AED 55%,#A855F7 100%)",padding:"18px 20px",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.04) 60%,transparent 100%)",pointerEvents:"none"}}/>
              <p style={{margin:0,fontSize:15,fontWeight:700,color:"#fff",letterSpacing:"-0.3px",position:"relative"}}>Career Videos</p>
              <p style={{margin:"3px 0 0",fontSize:11,color:"rgba(255,255,255,0.70)",position:"relative"}}>Watch &amp; get inspired</p>
            </div>
            <div style={{padding:"14px"}}>
              <YouTubePanel/>
            </div>
          </div>
        </main>

        {/* ── FOOTER ── */}
        <footer style={{maxWidth:1400,margin:"0 auto",padding:"0 28px 36px"}}>
          <div className="footer-inner" style={{position:"relative",borderRadius:22,padding:"22px 28px",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:20,background:"rgba(255,255,255,0.80)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:"1px solid #DDD6FE",boxShadow:"0 4px 24px rgba(124,58,237,0.09),inset 0 1px 0 rgba(255,255,255,0.9)"}}>
            <div style={{flex:1,minWidth:0}}>
              <p style={{margin:"0 0 16px",fontSize:10,fontWeight:800,color:"#C4B5FD",letterSpacing:"0.1em",textTransform:"uppercase",display:"flex",alignItems:"center",gap:6}}>
                <GraduationCap style={{width:12,height:12,color:"#7C3AED"}}/>
                Qualification-wise Data Folders
              </p>
              <div className="env-row">
                {QUALS.map((q,i) => <Envelope key={i} {...q} onClick={showToast}/>)}
                <TripleChevron/>
              </div>
            </div>
            <div className="footer-divider" style={{width:1,height:64,background:"#DDD6FE",flexShrink:0}}/>
            {toastVisible && (
              <div style={{position:"absolute",bottom:16,left:"50%",transform:"translateX(-50%)",background:"rgba(255,255,255,0.97)",border:"1px solid #DDD6FE",borderRadius:12,padding:"9px 18px",fontSize:12.5,fontWeight:600,color:"#5B21B6",display:"flex",alignItems:"center",gap:8,boxShadow:"0 4px 16px rgba(124,58,237,0.15)",whiteSpace:"nowrap",pointerEvents:"none",animation:"fadeIn .2s ease"}}>
                🔒 Please sign in to view the students data
              </div>
            )}
          </div>
        </footer>

      </div>
    </div>
  );
}