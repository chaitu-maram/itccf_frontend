import { useState } from "react";
import {
  Search, X, ChevronUp, ChevronDown, ChevronsUpDown,
  Briefcase, Building2, GraduationCap, ArrowRight,
  ChevronLeft, ChevronRight, LogIn, Zap, UserPlus, UserCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

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

const tier = n =>
  n >= 100 ? { a:"#7C3AED", b:"#6D28D9", txt:"#fff", glow:"rgba(124,58,237,0.32)", bar:"#8B5CF6" }
: n >=  30 ? { a:"#A855F7", b:"#9333EA", txt:"#fff", glow:"rgba(168,85,247,0.28)", bar:"#C084FC" }
:            { a:"#C084FC", b:"#A855F7", txt:"#fff", glow:"rgba(192,132,252,0.25)", bar:"#DDD6FE" };

const SortIco = ({ on, dir }) =>
  !on ? <ChevronsUpDown style={{width:11,height:11,color:"#C4B5FD",flexShrink:0}}/>
: dir === "asc"
  ? <ChevronUp   style={{width:11,height:11,color:"#7C3AED",flexShrink:0}}/>
  : <ChevronDown style={{width:11,height:11,color:"#7C3AED",flexShrink:0}}/>;

const cardShadow = "0 1px 3px rgba(124,58,237,0.07), 0 8px 24px rgba(109,40,217,0.12), 0 1px 0 rgba(255,255,255,0.9) inset";

const G = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
  * { font-family: 'Outfit', system-ui, sans-serif !important; }

  /* ── Envelope ── */
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

  /* ── Triple Chevron ── */
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

  /* ── Live pulse ── */
  @keyframes livePulse{0%{transform:scale(1);opacity:.8}70%{transform:scale(2.4);opacity:0}100%{transform:scale(2.4);opacity:0}}

  /* ── Signup buttons ── */
  .su-hr:hover{background:#EDE9FE !important;border-color:#7C3AED !important;border-style:solid !important;color:#4C1D95 !important;box-shadow:0 4px 14px rgba(124,58,237,0.18) !important;transform:translateY(-1px);}
  .su-emp:hover{background:#F0FDF4 !important;border-color:#22C55E !important;border-style:solid !important;color:#15803D !important;box-shadow:0 4px 14px rgba(34,197,94,0.18) !important;transform:translateY(-1px);}

  /* ── NAVBAR (IMPROVED) ── */
  .nav-root {
    background: linear-gradient(180deg, #3B0764 0%, #4C1D95 60%, #5B21B6 100%);
    border-bottom: 1px solid rgba(196,181,253,0.18);
    box-shadow: 0 4px 28px rgba(76,29,149,0.35), 0 1px 0 rgba(255,255,255,0.06) inset;
    position: relative;
    overflow: hidden;
  }
  .nav-root::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(167,139,250,0.08) 0%, transparent 25%, transparent 75%, rgba(196,181,253,0.07) 100%);
    pointer-events: none;
  }
  .nav-root::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(196,181,253,0.45) 25%, rgba(167,139,250,0.65) 50%, rgba(196,181,253,0.45) 75%, transparent 100%);
    pointer-events: none;
  }
  .nav-inner {
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 28px;
    display: flex;
    align-items: center;
    height: 50px;
    gap: 1px;
  }
  .nav-link {
    position: relative;
    padding: 7px 13px;
    font-size: 10.5px;
    font-weight: 700;
    color: rgba(221,214,254,0.78);
    letter-spacing: 0.07em;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.18s ease;
    white-space: nowrap;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    border: 1px solid transparent;
    user-select: none;
  }
  .nav-link:hover {
    color: #fff;
    background: rgba(255,255,255,0.10);
    border-color: rgba(196,181,253,0.20);
    transform: translateY(-1px);
  }
  .nav-link.active {
    color: #fff;
    background: linear-gradient(135deg, rgba(139,92,246,0.55), rgba(167,139,250,0.28));
    border-color: rgba(196,181,253,0.38);
    box-shadow: 0 2px 14px rgba(109,40,217,0.38), inset 0 1px 0 rgba(255,255,255,0.14);
  }
  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 55%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #C4B5FD, transparent);
    border-radius: 99px;
  }
  .nav-active-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #E9D5FF;
    box-shadow: 0 0 6px rgba(233,213,255,0.9);
    flex-shrink: 0;
    display: none;
  }
  .nav-link.active .nav-active-dot { display: block; }
  .nav-sep {
    width: 1px;
    height: 20px;
    background: rgba(196,181,253,0.18);
    flex-shrink: 0;
    margin: 0 5px;
  }
  .nav-search-wrap {
    margin-left: auto;
    position: relative;
    flex-shrink: 0;
  }
  .nav-search-wrap svg {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 13px;
    height: 13px;
    color: rgba(196,181,253,0.55);
    pointer-events: none;
  }
  .nav-search-input {
    width: 170px;
    padding: 6px 12px 6px 30px;
    background: rgba(255,255,255,0.09);
    border: 1px solid rgba(196,181,253,0.22);
    border-radius: 10px;
    font-size: 11.5px;
    font-family: 'Outfit', sans-serif;
    color: #fff;
    outline: none;
    transition: all 0.22s ease;
  }
  .nav-search-input::placeholder { color: rgba(196,181,253,0.50); }
  .nav-search-input:focus {
    background: rgba(255,255,255,0.15);
    border-color: rgba(196,181,253,0.55);
    width: 210px;
    box-shadow: 0 0 0 3px rgba(167,139,250,0.18);
  }

  /* ── Responsive layout ── */
  .main-grid {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 22px;
    align-items: stretch;
  }
  .login-card-wrap { display: flex; flex-direction: column; }
  .login-card-inner { flex: 1; display: flex; flex-direction: column; }
  .login-form-body  { flex: 1; display: flex; flex-direction: column; }
  .job-board-wrap { display: flex; flex-direction: column; }
  .job-board-inner { flex: 1; display: flex; flex-direction: column; }
  .job-table-body  { flex: 1; overflow: hidden; }
  .nav-scroll { display:flex; flex-wrap:wrap; gap:2px; }
  .tabs-scroll { display:flex; flex-wrap:wrap; gap:7px; }
  .env-row { display:flex; gap:14px; align-items:flex-end; flex-wrap:wrap; }

  @media (max-width: 900px) {
    .main-grid { grid-template-columns: 1fr !important; }
    .page-pad  { padding: 16px 14px !important; }
    .header-inner { flex-wrap: wrap; gap: 10px !important; padding: 12px 14px !important; }
    .tabs-scroll  { display: flex; overflow-x: auto; flex-wrap: nowrap; padding-bottom: 4px; -webkit-overflow-scrolling: touch; }
    .tabs-scroll::-webkit-scrollbar { display: none; }
    .nav-inner { overflow-x: auto; padding: 0 14px; -webkit-overflow-scrolling: touch; }
    .nav-inner::-webkit-scrollbar { display: none; }
    .footer-inner { flex-direction: column !important; gap: 16px !important; padding: 18px 14px !important; }
    .footer-divider { display: none !important; }
    .env-row { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 6px; -webkit-overflow-scrolling: touch; }
    .env-row::-webkit-scrollbar { display: none; }
    .tcc-wrap { margin-bottom: 0 !important; }
    .live-badge { display: none; }
    .nav-search-wrap { display: none; }
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
function Envelope({ label, body, border, lid, line, stamp }) {
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

/* ══════ LOGIN CARD ════════════════════════════════════════ */
function LoginCard() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  return (
    <div className="login-card-inner" style={{borderRadius:20,overflow:"hidden",background:"#FFFFFF",border:"1px solid #DDD6FE",boxShadow:cardShadow}}>
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
      <div className="login-form-body" style={{padding:"20px 18px 20px",display:"flex",flexDirection:"column",gap:11}}>
        <input type="text" placeholder="User ID / HR ID No." value={id} onChange={e=>setId(e.target.value)}
          style={{width:"100%",padding:"10px 14px",fontSize:13,boxSizing:"border-box",background:"#FAF5FF",border:"1.5px solid #DDD6FE",borderRadius:11,outline:"none",color:"#2E1065",transition:"all 0.2s"}}
          onFocus={e=>{e.target.style.borderColor="#7C3AED";e.target.style.background="#F3E8FF";e.target.style.boxShadow="0 0 0 3px rgba(196,181,253,0.45)";}}
          onBlur={e=>{e.target.style.borderColor="#DDD6FE";e.target.style.background="#FAF5FF";e.target.style.boxShadow="none";}}
        />
        <input type="password" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)}
          style={{width:"100%",padding:"10px 14px",fontSize:13,boxSizing:"border-box",background:"#FAF5FF",border:"1.5px solid #DDD6FE",borderRadius:11,outline:"none",color:"#2E1065",transition:"all 0.2s"}}
          onFocus={e=>{e.target.style.borderColor="#7C3AED";e.target.style.background="#F3E8FF";e.target.style.boxShadow="0 0 0 3px rgba(196,181,253,0.45)";}}
          onBlur={e=>{e.target.style.borderColor="#DDD6FE";e.target.style.background="#FAF5FF";e.target.style.boxShadow="none";}}
        />
        <button
          style={{width:"100%",padding:"11px",marginTop:1,background:"linear-gradient(135deg,#4C1D95,#7C3AED,#A855F7)",color:"#fff",fontWeight:700,fontSize:13.5,border:"none",borderRadius:12,cursor:"pointer",position:"relative",overflow:"hidden",boxShadow:"0 4px 18px rgba(124,58,237,0.45)",transition:"transform 0.15s,box-shadow 0.15s"}}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(124,58,237,0.50)";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 18px rgba(124,58,237,0.45)";}}
          onMouseDown={e=>e.currentTarget.style.transform="scale(0.97)"}
          onMouseUp={e=>e.currentTarget.style.transform="translateY(-2px)"}>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 60%)",pointerEvents:"none"}}/>
          <span style={{position:"relative"}}>Sign In →</span>
        </button>
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
        <Link to="/employer-signup" className="su-emp"
          style={{display:"flex",alignItems:"center",gap:8,padding:"9px 14px",background:"#F0FFF4",border:"1.5px dashed #86EFAC",borderRadius:12,textDecoration:"none",fontSize:12.5,fontWeight:700,color:"#15803D",transition:"all 0.18s",cursor:"pointer",boxSizing:"border-box"}}>
          <div style={{width:26,height:26,borderRadius:8,background:"linear-gradient(135deg,#DCFCE7,#BBF7D0)",border:"1px solid #86EFAC",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <UserCheck style={{width:13,height:13,color:"#16A34A"}}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:1}}>
            <span style={{fontSize:12.5,fontWeight:700,lineHeight:1}}>Sign Up as Employer</span>
            <span style={{fontSize:9.5,color:"#4ADE80",fontWeight:500,lineHeight:1}}>Post jobs & hire talent</span>
          </div>
          <ArrowRight style={{width:12,height:12,color:"#86EFAC",marginLeft:"auto",flexShrink:0}}/>
        </Link>
        <div style={{flex:1}}/>
        <p style={{margin:"2px 0 0",fontSize:10,color:"#A78BFA",lineHeight:1.6,borderTop:"1px solid #F3E8FF",paddingTop:10,textAlign:"center"}}>
          Declaration Form &amp; Security Insurance ECS required for activation.
        </p>
      </div>
    </div>
  );
}

/* ══════ JOB GRID ══════════════════════════════════════════ */
function JobGrid() {
  const [q,   setQ]  = useState("");
  const [pg,  setPg] = useState(0);
  const [srt, setSrt]= useState({ k:null, d:"asc" });

  const filt = JOBS.filter(r => {
    const lq = q.toLowerCase();
    return r.org.toLowerCase().includes(lq) || r.role.toLowerCase().includes(lq) || String(r.n).includes(lq);
  });
  const srtd = [...filt].sort((a,b) => {
    if (!srt.k) return 0;
    const A=a[srt.k], B=b[srt.k];
    return typeof A==="number"
      ? srt.d==="asc"?A-B:B-A
      : srt.d==="asc"?String(A).localeCompare(String(B)):String(B).localeCompare(String(A));
  });
  const totPg = Math.max(1,Math.ceil(srtd.length/PAGE_SZ));
  const sp    = Math.min(pg,totPg-1);
  const rows  = srtd.slice(sp*PAGE_SZ,(sp+1)*PAGE_SZ);
  const pad   = [...rows,...Array(PAGE_SZ-rows.length).fill(null)];
  const flip  = k=>{setSrt(p=>p.k===k?{k,d:p.d==="asc"?"desc":"asc"}:{k,d:"asc"});setPg(0);};

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

/* ══════ NAV SEARCH ICON ═══════════════════════════════════ */
function NavSearchIcon() {
  return (
    <svg style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",width:13,height:13,pointerEvents:"none"}} viewBox="0 0 16 16" fill="none" stroke="rgba(196,181,253,0.55)" strokeWidth="1.8">
      <circle cx="6.5" cy="6.5" r="4.5"/>
      <path d="M10 10 L14 14" strokeLinecap="round"/>
    </svg>
  );
}

/* ══════ ROOT ══════════════════════════════════════════════ */
export default function Index() {
  const [activeNav, setActiveNav] = useState("Home");
  const [navSearch, setNavSearch] = useState("");

  // Group separators after these links
  const NAV_GROUPS = [
    ["Home", "About Us", "Authorised HRs", "Core Committee"],
    ["Services", "Projects", "Associates", "Gallery"],
    ["Contact Us"],
  ];

  return (
    <div style={{minHeight:"100vh",fontFamily:"'Outfit',system-ui,sans-serif",background:"linear-gradient(160deg,#F5F3FF 0%,#EDE9FE 35%,#F5F3FF 65%,#FAF5FF 100%)",position:"relative"}}>
      <style>{G}</style>

      {/* Background blobs */}
      <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
        <div style={{position:"absolute",width:700,height:500,borderRadius:"50%",top:-200,left:-200,background:"radial-gradient(ellipse,rgba(196,181,253,0.30) 0%,transparent 70%)"}}/>
        <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",bottom:-150,right:-100,background:"radial-gradient(ellipse,rgba(233,213,255,0.38) 0%,transparent 70%)"}}/>
        <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",top:"30%",right:"15%",background:"radial-gradient(ellipse,rgba(221,214,254,0.45) 0%,transparent 70%)"}}/>
      </div>

      <div style={{position:"relative",zIndex:1}}>

        {/* ── HEADER ── */}
        <header style={{background:"rgba(255,255,255,0.80)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:"1px solid #DDD6FE",boxShadow:"0 2px 20px rgba(124,58,237,0.09)"}}>
          <div className="header-inner" style={{maxWidth:1300,margin:"0 auto",padding:"13px 28px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
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
                  onMouseEnter={e=>{e.currentTarget.style.background="#DDD6FE";e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 3px 10px rgba(124,58,237,0.18)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(237,233,254,0.75)";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                  {t}
                </button>
              ))}
            </div>
            <div className="live-badge" style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:7,flexShrink:0,background:"rgba(220,252,231,0.7)",border:"1px solid #86EFAC",padding:"4px 10px 4px 7px",borderRadius:99,boxShadow:"0 1px 6px rgba(34,197,94,0.12)"}}>
              <div style={{position:"relative",width:10,height:10,flexShrink:0}}>
                <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"#22C55E",animation:"livePulse 1.6s ease-out infinite"}}/>
                <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"#22C55E",animation:"livePulse 1.6s ease-out infinite 0.5s"}}/>
                <div style={{position:"absolute",inset:"2px",borderRadius:"50%",background:"#16A34A",boxShadow:"0 0 4px rgba(22,163,74,0.6)"}}/>
              </div>
              <span style={{fontSize:10.5,color:"#15803D",fontWeight:800,letterSpacing:"0.1em"}}>LIVE</span>
            </div>
          </div>
        </header>

        {/* ── NAVBAR (IMPROVED) ── */}
        <nav className="nav-root">
          <div className="nav-inner">
            {NAV_GROUPS.map((group, gi) => (
              <>
                {gi > 0 && <div key={`sep-${gi}`} className="nav-sep"/>}
                {group.map(lk => (
                  <a key={lk}
                    className={`nav-link${activeNav === lk ? " active" : ""}`}
                    href="#"
                    onClick={e => { e.preventDefault(); setActiveNav(lk); }}>
                    <span className="nav-active-dot"/>
                    {lk}
                  </a>
                ))}
              </>
            ))}
            {/* Search */}
            <div className="nav-search-wrap">
              <NavSearchIcon/>
              <input
                className="nav-search-input"
                type="text"
                placeholder="Search…"
                value={navSearch}
                onChange={e => setNavSearch(e.target.value)}
              />
            </div>
          </div>
        </nav>

        {/* ── MAIN ── */}
        <main className="main-grid page-pad" style={{maxWidth:1300,margin:"0 auto",padding:"26px 28px"}}>
          <div className="login-card-wrap" style={{display:"flex",flexDirection:"column"}}>
            <LoginCard/>
          </div>
          <div className="job-board-wrap" style={{display:"flex",flexDirection:"column"}}>
            <JobGrid/>
          </div>
        </main>

        {/* ── FOOTER ── */}
        <footer style={{maxWidth:1300,margin:"0 auto",padding:"0 28px 36px"}}>
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



version 2


import { useState } from "react";
import {
  Search, X, ChevronUp, ChevronDown, ChevronsUpDown,
  Briefcase, Building2, GraduationCap, ArrowRight,
  ChevronLeft, ChevronRight, LogIn, Zap, UserPlus, UserCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

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

const PAGE_SZ = 7; // show all 7 rows so heights match naturally
const MAX_V   = Math.max(...JOBS.map(j => j.n));
const ROW_H   = 54;

const tier = n =>
  n >= 100 ? { a:"#7C3AED", b:"#6D28D9", txt:"#fff", glow:"rgba(124,58,237,0.32)", bar:"#8B5CF6" }
: n >=  30 ? { a:"#A855F7", b:"#9333EA", txt:"#fff", glow:"rgba(168,85,247,0.28)", bar:"#C084FC" }
:            { a:"#C084FC", b:"#A855F7", txt:"#fff", glow:"rgba(192,132,252,0.25)", bar:"#DDD6FE" };

const SortIco = ({ on, dir }) =>
  !on ? <ChevronsUpDown style={{width:11,height:11,color:"#C4B5FD",flexShrink:0}}/>
: dir === "asc"
  ? <ChevronUp   style={{width:11,height:11,color:"#7C3AED",flexShrink:0}}/>
  : <ChevronDown style={{width:11,height:11,color:"#7C3AED",flexShrink:0}}/>;

const cardShadow = "0 1px 3px rgba(124,58,237,0.07), 0 8px 24px rgba(109,40,217,0.12), 0 1px 0 rgba(255,255,255,0.9) inset";

const G = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
  * { font-family: 'Outfit', system-ui, sans-serif !important; }

  /* ── Envelope ── */
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

  /* ── Triple Chevron ── */
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

  /* ── Live pulse ── */
  @keyframes livePulse{0%{transform:scale(1);opacity:.8}70%{transform:scale(2.4);opacity:0}100%{transform:scale(2.4);opacity:0}}

  /* ── Signup buttons ── */
  .su-hr:hover{background:#EDE9FE !important;border-color:#7C3AED !important;border-style:solid !important;color:#4C1D95 !important;box-shadow:0 4px 14px rgba(124,58,237,0.18) !important;transform:translateY(-1px);}
  .su-emp:hover{background:#F0FDF4 !important;border-color:#22C55E !important;border-style:solid !important;color:#15803D !important;box-shadow:0 4px 14px rgba(34,197,94,0.18) !important;transform:translateY(-1px);}

  /* ── Responsive layout ── */
  .main-grid {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 22px;
    align-items: stretch;
  }
  .login-card-wrap { display: flex; flex-direction: column; }
  .login-card-inner { flex: 1; display: flex; flex-direction: column; }
  .login-form-body  { flex: 1; display: flex; flex-direction: column; }

  /* Job board stretches to fill */
  .job-board-wrap { display: flex; flex-direction: column; }
  .job-board-inner { flex: 1; display: flex; flex-direction: column; }
  .job-table-body  { flex: 1; overflow: hidden; }

  /* Nav scroll on mobile */
  .nav-scroll { display:flex; flex-wrap:wrap; gap:2px; }

  /* Tabs scroll */
  .tabs-scroll { display:flex; flex-wrap:wrap; gap:7px; }

  /* Footer envelopes scroll */
  .env-row { display:flex; gap:14px; align-items:flex-end; flex-wrap:wrap; }

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
function Envelope({ label, body, border, lid, line, stamp }) {
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

/* ══════ LOGIN CARD ════════════════════════════════════════ */
function LoginCard() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

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

      {/* Form body — flex:1 so it stretches */}
      <div className="login-form-body" style={{padding:"20px 18px 20px",display:"flex",flexDirection:"column",gap:11}}>

        <input type="text" placeholder="User ID / HR ID No." value={id} onChange={e=>setId(e.target.value)}
          style={{width:"100%",padding:"10px 14px",fontSize:13,boxSizing:"border-box",background:"#FAF5FF",border:"1.5px solid #DDD6FE",borderRadius:11,outline:"none",color:"#2E1065",transition:"all 0.2s"}}
          onFocus={e=>{e.target.style.borderColor="#7C3AED";e.target.style.background="#F3E8FF";e.target.style.boxShadow="0 0 0 3px rgba(196,181,253,0.45)";}}
          onBlur={e=>{e.target.style.borderColor="#DDD6FE";e.target.style.background="#FAF5FF";e.target.style.boxShadow="none";}}
        />
        <input type="password" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)}
          style={{width:"100%",padding:"10px 14px",fontSize:13,boxSizing:"border-box",background:"#FAF5FF",border:"1.5px solid #DDD6FE",borderRadius:11,outline:"none",color:"#2E1065",transition:"all 0.2s"}}
          onFocus={e=>{e.target.style.borderColor="#7C3AED";e.target.style.background="#F3E8FF";e.target.style.boxShadow="0 0 0 3px rgba(196,181,253,0.45)";}}
          onBlur={e=>{e.target.style.borderColor="#DDD6FE";e.target.style.background="#FAF5FF";e.target.style.boxShadow="none";}}
        />

        <button
          style={{width:"100%",padding:"11px",marginTop:1,background:"linear-gradient(135deg,#4C1D95,#7C3AED,#A855F7)",color:"#fff",fontWeight:700,fontSize:13.5,border:"none",borderRadius:12,cursor:"pointer",position:"relative",overflow:"hidden",boxShadow:"0 4px 18px rgba(124,58,237,0.45)",transition:"transform 0.15s,box-shadow 0.15s"}}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(124,58,237,0.50)";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 18px rgba(124,58,237,0.45)";}}
          onMouseDown={e=>e.currentTarget.style.transform="scale(0.97)"}
          onMouseUp={e=>e.currentTarget.style.transform="translateY(-2px)"}>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 60%)",pointerEvents:"none"}}/>
          <span style={{position:"relative"}}>Sign In →</span>
        </button>

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

        <Link to="/employer-signup" className="su-emp"
          style={{display:"flex",alignItems:"center",gap:8,padding:"9px 14px",background:"#F0FFF4",border:"1.5px dashed #86EFAC",borderRadius:12,textDecoration:"none",fontSize:12.5,fontWeight:700,color:"#15803D",transition:"all 0.18s",cursor:"pointer",boxSizing:"border-box"}}>
          <div style={{width:26,height:26,borderRadius:8,background:"linear-gradient(135deg,#DCFCE7,#BBF7D0)",border:"1px solid #86EFAC",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <UserCheck style={{width:13,height:13,color:"#16A34A"}}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:1}}>
            <span style={{fontSize:12.5,fontWeight:700,lineHeight:1}}>Sign Up as Employer</span>
            <span style={{fontSize:9.5,color:"#4ADE80",fontWeight:500,lineHeight:1}}>Post jobs & hire talent</span>
          </div>
          <ArrowRight style={{width:12,height:12,color:"#86EFAC",marginLeft:"auto",flexShrink:0}}/>
        </Link>

        {/* Spacer pushes footer note to bottom */}
        <div style={{flex:1}}/>

        <p style={{margin:"2px 0 0",fontSize:10,color:"#A78BFA",lineHeight:1.6,borderTop:"1px solid #F3E8FF",paddingTop:10,textAlign:"center"}}>
          Declaration Form &amp; Security Insurance ECS required for activation.
        </p>
      </div>
    </div>
  );
}

/* ══════ JOB GRID ══════════════════════════════════════════ */
function JobGrid() {
  const [q,   setQ]  = useState("");
  const [pg,  setPg] = useState(0);
  const [srt, setSrt]= useState({ k:null, d:"asc" });

  const filt = JOBS.filter(r => {
    const lq = q.toLowerCase();
    return r.org.toLowerCase().includes(lq) || r.role.toLowerCase().includes(lq) || String(r.n).includes(lq);
  });
  const srtd = [...filt].sort((a,b) => {
    if (!srt.k) return 0;
    const A=a[srt.k], B=b[srt.k];
    return typeof A==="number"
      ? srt.d==="asc"?A-B:B-A
      : srt.d==="asc"?String(A).localeCompare(String(B)):String(B).localeCompare(String(A));
  });
  const totPg = Math.max(1,Math.ceil(srtd.length/PAGE_SZ));
  const sp    = Math.min(pg,totPg-1);
  const rows  = srtd.slice(sp*PAGE_SZ,(sp+1)*PAGE_SZ);
  const pad   = [...rows,...Array(PAGE_SZ-rows.length).fill(null)];
  const flip  = k=>{setSrt(p=>p.k===k?{k,d:p.d==="asc"?"desc":"asc"}:{k,d:"asc"});setPg(0);};

  const cols = [
    {lbl:"Organization", k:"org",  w:"37%", cls:"th-org",  bodyCls:"job-col-org"},
    {lbl:"Openings",     k:"n",    w:"21%", cls:"th-n",    bodyCls:"job-col-n"  },
    {lbl:"Role",         k:"role", w:"42%", cls:"th-role", bodyCls:"job-col-role"},
  ];

  return (
    <div className="job-board-inner" style={{borderRadius:20,overflow:"hidden",background:"#FFFFFF",border:"1px solid #DDD6FE",boxShadow:cardShadow}}>

      {/* Header */}
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

      {/* Column headers */}
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

      {/* Rows — flex:1 fills remaining height */}
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

      {/* Pagination footer */}
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

      {/* Background blobs */}
      <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
        <div style={{position:"absolute",width:700,height:500,borderRadius:"50%",top:-200,left:-200,background:"radial-gradient(ellipse,rgba(196,181,253,0.30) 0%,transparent 70%)"}}/>
        <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",bottom:-150,right:-100,background:"radial-gradient(ellipse,rgba(233,213,255,0.38) 0%,transparent 70%)"}}/>
        <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",top:"30%",right:"15%",background:"radial-gradient(ellipse,rgba(221,214,254,0.45) 0%,transparent 70%)"}}/>
      </div>

      <div style={{position:"relative",zIndex:1}}>

        {/* ── HEADER ── */}
        <header style={{background:"rgba(255,255,255,0.80)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:"1px solid #DDD6FE",boxShadow:"0 2px 20px rgba(124,58,237,0.09)"}}>
          <div className="header-inner" style={{maxWidth:1300,margin:"0 auto",padding:"13px 28px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>

            {/* Logo */}
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

            {/* Tabs */}
            <div className="tabs-scroll" style={{flex:1}}>
              {TABS.map((t,i)=>(
                <button key={i} style={{padding:"5px 14px",fontSize:11.5,fontWeight:600,color:"#7C3AED",background:"rgba(237,233,254,0.75)",border:"1px solid #C4B5FD",borderRadius:99,cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="#DDD6FE";e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 3px 10px rgba(124,58,237,0.18)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(237,233,254,0.75)";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                  {t}
                </button>
              ))}
            </div>

            {/* Live badge */}
            <div className="live-badge" style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:7,flexShrink:0,background:"rgba(220,252,231,0.7)",border:"1px solid #86EFAC",padding:"4px 10px 4px 7px",borderRadius:99,boxShadow:"0 1px 6px rgba(34,197,94,0.12)"}}>
              <div style={{position:"relative",width:10,height:10,flexShrink:0}}>
                <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"#22C55E",animation:"livePulse 1.6s ease-out infinite"}}/>
                <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"#22C55E",animation:"livePulse 1.6s ease-out infinite 0.5s"}}/>
                <div style={{position:"absolute",inset:"2px",borderRadius:"50%",background:"#16A34A",boxShadow:"0 0 4px rgba(22,163,74,0.6)"}}/>
              </div>
              <span style={{fontSize:10.5,color:"#15803D",fontWeight:800,letterSpacing:"0.1em"}}>LIVE</span>
            </div>
          </div>
        </header>

        {/* ── NAVBAR ── */}
        <nav style={{background:"rgba(255,255,255,0.72)",backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",borderBottom:"1px solid #EDE9FE",overflowX:"auto"}}>
          <div className="nav-scroll" style={{maxWidth:1300,margin:"0 auto",padding:"5px 28px"}}>
            {NAV.map((lk,i)=>(
              <a key={i} href="#" style={{padding:"6px 13px",fontSize:10.5,fontWeight:700,color:"#7C3AED",letterSpacing:"0.06em",textDecoration:"none",borderRadius:8,textTransform:"uppercase",transition:"all 0.15s",whiteSpace:"nowrap"}}
                onMouseEnter={e=>{e.currentTarget.style.background="#EDE9FE";e.currentTarget.style.color="#4C1D95";}}
                onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#7C3AED";}}>
                {lk}
              </a>
            ))}
          </div>
        </nav>

        {/* ── MAIN — equal-height grid ── */}
        <main className="main-grid page-pad" style={{maxWidth:1300,margin:"0 auto",padding:"26px 28px"}}>
          {/* Login card wrapper: flex column so inner can stretch */}
          <div className="login-card-wrap" style={{display:"flex",flexDirection:"column"}}>
            <LoginCard/>
          </div>
          {/* Job board wrapper */}
          <div className="job-board-wrap" style={{display:"flex",flexDirection:"column"}}>
            <JobGrid/>
          </div>
        </main>

        {/* ── FOOTER ── */}
        <footer style={{maxWidth:1300,margin:"0 auto",padding:"0 28px 36px"}}>
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