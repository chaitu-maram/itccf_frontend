import { useState, useMemo } from "react";
import {
  Search, X, ChevronUp, ChevronDown, ChevronsUpDown,
  ChevronLeft, ChevronRight, Download, FileText,
  Users, Briefcase, Lightbulb, Award, Phone, Mail,
  GraduationCap, Code2, HeartPulse, BookOpen, Coins,
  Wrench, Megaphone, Building2, TrendingUp, Home,
  CheckSquare, Trash2, UserCheck,
} from "lucide-react";

/* ─── DATA ─────────────────────────────────────────────────── */
const QUALS_META = {
  SSC:          { bg:"#FFF1F2", col:"#C81A40", border:"#FECDD3" },
  ITI:          { bg:"#FFFBEB", col:"#D97706", border:"#FDE68A" },
  Diploma:      { bg:"#ECFDF5", col:"#059669", border:"#A7F3D0" },
  Intermediate: { bg:"#EFF6FF", col:"#2563EB", border:"#BFDBFE" },
  Degree:       { bg:"#F5F3FF", col:"#7C3AED", border:"#DDD6FE" },
  PG:           { bg:"#F0F9FF", col:"#0284C7", border:"#BAE6FD" },
};

const FIELD_ICONS = {
  "IT / Software":  Code2,
  "Healthcare":     HeartPulse,
  "Education":      BookOpen,
  "Finance":        Coins,
  "Engineering":    Wrench,
  "Marketing":      Megaphone,
  "Administration": Building2,
  "Sales":          TrendingUp,
};

const AVATARS = [
  { bg:"#DBEAFE", col:"#1D4ED8" },{ bg:"#D1FAE5", col:"#065F46" },
  { bg:"#EDE9FE", col:"#6D28D9" },{ bg:"#FEE2E2", col:"#991B1B" },
  { bg:"#FEF3C7", col:"#92400E" },{ bg:"#FCE7F3", col:"#9D174D" },
  { bg:"#E0F2FE", col:"#0369A1" },{ bg:"#F0FDF4", col:"#166534" },
];

const PEOPLE = [
  { id:1,  name:"Anjali Sharma",    qual:"PG",           exp:6,  field:"Healthcare",     phone:"9866001001", email:"anjali.s@hrnet.in" },
  { id:2,  name:"Ravi Kumar",       qual:"Degree",        exp:4,  field:"IT / Software",  phone:"9866001002", email:"ravi.k@hrnet.in" },
  { id:3,  name:"Priya Reddy",      qual:"Intermediate",  exp:2,  field:"Education",      phone:"9866001003", email:"priya.r@hrnet.in" },
  { id:4,  name:"Mohammed Farhan",  qual:"Diploma",       exp:7,  field:"Engineering",    phone:"9866001004", email:"m.farhan@hrnet.in" },
  { id:5,  name:"Sneha Patel",      qual:"PG",            exp:9,  field:"Finance",        phone:"9866001005", email:"sneha.p@hrnet.in" },
  { id:6,  name:"Arjun Nair",       qual:"Degree",        exp:3,  field:"Marketing",      phone:"9866001006", email:"arjun.n@hrnet.in" },
  { id:7,  name:"Kavitha Iyer",     qual:"SSC",           exp:1,  field:"Sales",          phone:"9866001007", email:"kavitha.i@hrnet.in" },
  { id:8,  name:"Deepak Rao",       qual:"ITI",           exp:5,  field:"Engineering",    phone:"9866001008", email:"deepak.r@hrnet.in" },
  { id:9,  name:"Lakshmi Varma",    qual:"PG",            exp:11, field:"Administration", phone:"9866001009", email:"lakshmi.v@hrnet.in" },
  { id:10, name:"Suresh Babu",      qual:"Diploma",       exp:8,  field:"IT / Software",  phone:"9866001010", email:"suresh.b@hrnet.in" },
  { id:11, name:"Nandini Kulkarni", qual:"Degree",        exp:4,  field:"Finance",        phone:"9866001011", email:"nandini.k@hrnet.in" },
  { id:12, name:"Kiran Reddy",      qual:"Intermediate",  exp:2,  field:"Marketing",      phone:"9866001012", email:"kiran.r@hrnet.in" },
  { id:13, name:"Divya Menon",      qual:"PG",            exp:7,  field:"Healthcare",     phone:"9866001013", email:"divya.m@hrnet.in" },
  { id:14, name:"Ramesh Gupta",     qual:"SSC",           exp:1,  field:"Sales",          phone:"9866001014", email:"ramesh.g@hrnet.in" },
  { id:15, name:"Pooja Singh",      qual:"Degree",        exp:5,  field:"Education",      phone:"9866001015", email:"pooja.s@hrnet.in" },
  { id:16, name:"Anil Choudary",    qual:"ITI",           exp:6,  field:"Engineering",    phone:"9866001016", email:"anil.c@hrnet.in" },
  { id:17, name:"Shalini Krishnan", qual:"PG",            exp:10, field:"Administration", phone:"9866001017", email:"shalini.k@hrnet.in" },
  { id:18, name:"Venkat Rao",       qual:"Diploma",       exp:3,  field:"IT / Software",  phone:"9866001018", email:"venkat.r@hrnet.in" },
  { id:19, name:"Meena Joshi",      qual:"Degree",        exp:8,  field:"Finance",        phone:"9866001019", email:"meena.j@hrnet.in" },
  { id:20, name:"Prasad Yadav",     qual:"Intermediate",  exp:4,  field:"Healthcare",     phone:"9866001020", email:"prasad.y@hrnet.in" },
  { id:21, name:"Rohini Das",       qual:"PG",            exp:6,  field:"Marketing",      phone:"9866001021", email:"rohini.d@hrnet.in" },
  { id:22, name:"Sanjay Mitra",     qual:"SSC",           exp:2,  field:"Sales",          phone:"9866001022", email:"sanjay.m@hrnet.in" },
  { id:23, name:"Asha Thomas",      qual:"Degree",        exp:9,  field:"Education",      phone:"9866001023", email:"asha.t@hrnet.in" },
  { id:24, name:"Harish Pillai",    qual:"ITI",           exp:5,  field:"Engineering",    phone:"9866001024", email:"harish.p@hrnet.in" },
  { id:25, name:"Radha Kumari",     qual:"PG",            exp:13, field:"Administration", phone:"9866001025", email:"radha.k@hrnet.in" },
];

const NAV  = ["Home","About Us","Authorised HRs","Core Committee","Services","Projects","Associates","Gallery","Contact Us"];
const PAGE_SZ = 8;
const MAX_EXP = Math.max(...PEOPLE.map(p => p.exp));

/* ─── HELPERS ───────────────────────────────────────────────── */
const initials = name => name.split(" ").slice(0,2).map(w=>w[0]).join("");

const cardShadow = "0 1px 3px rgba(37,99,235,0.06), 0 8px 24px rgba(37,99,235,0.10), 0 1px 0 rgba(255,255,255,0.9) inset";

const SortIcon = ({ on, dir }) =>
  !on ? <ChevronsUpDown style={{width:11,height:11,color:"#93C5FD",flexShrink:0}}/>
: dir==="asc"
  ? <ChevronUp   style={{width:11,height:11,color:"#2563EB",flexShrink:0}}/>
  : <ChevronDown style={{width:11,height:11,color:"#2563EB",flexShrink:0}}/>;

/* ─── CHECKBOX ──────────────────────────────────────────────── */
const Checkbox = ({ checked, indeterminate, onChange, style }) => (
  <label style={{ display:"inline-flex", alignItems:"center", cursor:"pointer", ...style }}>
    <input
      type="checkbox"
      checked={checked}
      ref={el => { if (el) el.indeterminate = !!indeterminate; }}
      onChange={onChange}
      style={{ display:"none" }}
    />
    <span style={{
      width:17, height:17, borderRadius:5, border:"2px solid",
      borderColor: checked||indeterminate ? "#2563EB" : "#93C5FD",
      background:  checked||indeterminate ? "linear-gradient(135deg,#2563EB,#3B82F6)" : "rgba(255,255,255,0.9)",
      display:"flex", alignItems:"center", justifyContent:"center",
      flexShrink:0, transition:"all 0.15s",
      boxShadow: checked||indeterminate ? "0 2px 6px rgba(37,99,235,0.30)" : "none",
    }}>
      {indeterminate && !checked
        ? <span style={{width:8,height:2,background:"#fff",borderRadius:1,display:"block"}}/>
        : checked
          ? <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
              <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          : null}
    </span>
  </label>
);

/* ─── SELECTION ACTION BAR ──────────────────────────────────── */
function SelectionBar({ count, onClear, onExportSelected, onDeleteSelected }) {
  if (!count) return null;
  return (
    <div style={{
      position:"sticky", top:68, zIndex:90,
      background:"linear-gradient(135deg,#1D4ED8,#2563EB)",
      padding:"10px 28px",
      display:"flex", alignItems:"center", gap:14,
      boxShadow:"0 4px 16px rgba(37,99,235,0.35)",
    }}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <UserCheck style={{width:16,height:16,color:"rgba(255,255,255,0.9)"}}/>
        <span style={{fontSize:13,fontWeight:700,color:"#fff"}}>{count} selected</span>
      </div>
      <div style={{marginLeft:"auto",display:"flex",gap:8}}>
        <button onClick={onExportSelected} style={{
          display:"flex",alignItems:"center",gap:6,padding:"7px 14px",
          background:"rgba(255,255,255,0.2)",border:"1px solid rgba(255,255,255,0.4)",
          borderRadius:9,color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",
          transition:"all 0.15s",
        }}
          onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.30)"}
          onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.20)"}>
          <Download style={{width:13,height:13}}/> Export Selected
        </button>
        <button onClick={onDeleteSelected} style={{
          display:"flex",alignItems:"center",gap:6,padding:"7px 14px",
          background:"rgba(239,68,68,0.25)",border:"1px solid rgba(239,68,68,0.5)",
          borderRadius:9,color:"#FCA5A5",fontSize:12,fontWeight:700,cursor:"pointer",
          transition:"all 0.15s",
        }}
          onMouseEnter={e=>e.currentTarget.style.background="rgba(239,68,68,0.40)"}
          onMouseLeave={e=>e.currentTarget.style.background="rgba(239,68,68,0.25)"}>
          <Trash2 style={{width:13,height:13}}/> Delete
        </button>
        <button onClick={onClear} style={{
          display:"flex",alignItems:"center",gap:5,padding:"7px 12px",
          background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.25)",
          borderRadius:9,color:"rgba(255,255,255,0.8)",fontSize:12,fontWeight:600,cursor:"pointer",
          transition:"all 0.15s",
        }}
          onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.20)"}
          onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.12)"}>
          <X style={{width:12,height:12}}/> Clear
        </button>
      </div>
    </div>
  );
}

/* ─── STAT CARD ─────────────────────────────────────────────── */
function StatCard({ icon: Icon, iconBg, iconCol, val, label }) {
  return (
    <div style={{
      flex:1, minWidth:130,
      background:"rgba(255,255,255,0.85)",
      border:"1px solid #BFDBFE",
      borderRadius:14,
      padding:"12px 16px",
      display:"flex", alignItems:"center", gap:12,
      boxShadow:"0 2px 8px rgba(37,99,235,0.07)",
    }}>
      <div style={{ width:36,height:36,borderRadius:10,background:iconBg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
        <Icon style={{width:18,height:18,color:iconCol}}/>
      </div>
      <div>
        <div style={{fontSize:20,fontWeight:700,color:"#1E3A5F",letterSpacing:"-0.5px"}}>{val}</div>
        <div style={{fontSize:11,color:"#64748B",marginTop:1}}>{label}</div>
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ────────────────────────────────────────── */
export default function ListPersons() {
  const [search, setSearch]       = useState("");
  const [qual,   setQual]         = useState("All");
  const [sortK,  setSortK]        = useState(null);
  const [sortD,  setSortD]        = useState("asc");
  const [page,   setPage]         = useState(0);
  const [selected, setSelected]   = useState(new Set());
  const [data,   setData]         = useState(PEOPLE);

  /* filter + sort */
  const filtered = useMemo(() => {
    let d = data.filter(p => {
      const q = search.toLowerCase();
      const matchS = !q || p.name.toLowerCase().includes(q) || p.field.toLowerCase().includes(q)
        || p.qual.toLowerCase().includes(q) || p.email.toLowerCase().includes(q) || p.phone.includes(q);
      const matchQ = qual==="All" || p.qual===qual;
      return matchS && matchQ;
    });
    if (sortK) {
      d = [...d].sort((a,b)=>{
        const A=a[sortK], B=b[sortK];
        const r = typeof A==="number" ? A-B : String(A).localeCompare(String(B));
        return sortD==="asc" ? r : -r;
      });
    }
    return d;
  }, [data, search, qual, sortK, sortD]);

  const totPg  = Math.max(1, Math.ceil(filtered.length / PAGE_SZ));
  const sp     = Math.min(page, totPg-1);
  const rows   = filtered.slice(sp*PAGE_SZ, (sp+1)*PAGE_SZ);
  const pad    = [...rows, ...Array(PAGE_SZ - rows.length).fill(null)];

  const pageIds        = rows.map(r=>r.id);
  const allPageSel     = pageIds.length>0 && pageIds.every(id=>selected.has(id));
  const someSel        = pageIds.some(id=>selected.has(id)) && !allPageSel;

  const flip = k => { setSortD(p => sortK===k ? (p==="asc"?"desc":"asc") : "asc"); setSortK(k); setPage(0); };
  const onSearch = v => { setSearch(v); setPage(0); };
  const onQual   = q => { setQual(q);  setPage(0); };

  /* checkbox logic */
  const toggleRow  = id => setSelected(s => { const n=new Set(s); n.has(id)?n.delete(id):n.add(id); return n; });
  const togglePage = () => {
    setSelected(s => {
      const n = new Set(s);
      allPageSel ? pageIds.forEach(id=>n.delete(id)) : pageIds.forEach(id=>n.add(id));
      return n;
    });
  };
  const clearSel = () => setSelected(new Set());

  /* export */
  const exportCSV = (rows) => {
    const hdr = ["S.No","Name","Qualification","Experience (yrs)","Field","Phone","Email"];
    const lines = [hdr, ...rows.map((p,i)=>[i+1,p.name,p.qual,p.exp,p.field,p.phone,p.email])];
    const csv = lines.map(r=>r.join(",")).join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8,"+encodeURIComponent(csv);
    a.download = "hr_persons.csv"; a.click();
  };
  const exportAll      = () => exportCSV(filtered);
  const exportSelected = () => exportCSV(data.filter(p=>selected.has(p.id)));

  /* delete selected */
  const deleteSelected = () => {
    setData(d => d.filter(p=>!selected.has(p.id)));
    setSelected(new Set());
    setPage(0);
  };

  const avgExp = (data.reduce((s,p)=>s+p.exp,0)/data.length).toFixed(1);
  const fields = [...new Set(data.map(p=>p.field))].length;
  const quals  = [...new Set(data.map(p=>p.qual))].length;

  const COLS = [
    { lbl:"S.No",            k:null,   w:"52px"  },
    { lbl:"Name",            k:"name", w:"190px" },
    { lbl:"Qualification",   k:"qual", w:"130px" },
    { lbl:"Experience",      k:"exp",  w:"145px" },
    { lbl:"Interested Field",k:"field",w:"155px" },
    { lbl:"CV",              k:null,   w:"100px" },
    { lbl:"Phone",           k:"phone",w:"135px" },
    { lbl:"Email",           k:"email",w:"195px" },
  ];

  /* pulse anim style */
  const pulseStyle = `
    @keyframes livePulse{0%{transform:scale(1);opacity:.8}70%{transform:scale(2.4);opacity:0}100%{transform:scale(2.4);opacity:0}}
  `;

  return (
    <div style={{ minHeight:"100vh", fontFamily:"'Inter',system-ui,sans-serif", background:"linear-gradient(160deg,#EFF6FF 0%,#DBEAFE 35%,#EFF6FF 65%,#F0F9FF 100%)", position:"relative" }}>
      <style>{pulseStyle}</style>

      {/* blobs */}
      <div style={{position:"fixed",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
        <div style={{position:"absolute",width:700,height:500,borderRadius:"50%",top:-200,left:-200,background:"radial-gradient(ellipse,rgba(147,197,253,0.35) 0%,transparent 70%)"}}/>
        <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",bottom:-150,right:-100,background:"radial-gradient(ellipse,rgba(186,230,253,0.40) 0%,transparent 70%)"}}/>
        <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",top:"30%",right:"15%",background:"radial-gradient(ellipse,rgba(219,234,254,0.50) 0%,transparent 70%)"}}/>
      </div>

      <div style={{position:"relative",zIndex:1}}>

        {/* ── HEADER ── */}
        <header style={{background:"rgba(255,255,255,0.82)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:"1px solid #BFDBFE",boxShadow:"0 2px 20px rgba(37,99,235,0.09)",position:"sticky",top:0,zIndex:100}}>
          <div style={{maxWidth:1400,margin:"0 auto",padding:"13px 28px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
            {/* logo */}
            <div style={{display:"flex",alignItems:"center",gap:13,flexShrink:0}}>
              <div style={{width:46,height:46,borderRadius:15,position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#2563EB,#1D4ED8)",boxShadow:"0 0 0 1px rgba(37,99,235,0.3),0 6px 18px rgba(37,99,235,0.35),inset 0 1px 0 rgba(255,255,255,0.25)"}}>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.22) 0%,transparent 60%)"}}/>
                <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <span style={{color:"#fff",fontWeight:800,fontSize:17,letterSpacing:"-0.5px"}}>HR</span>
                </div>
              </div>
              <div>
                <p style={{margin:0,fontSize:9.5,color:"#3B82F6",fontWeight:800,letterSpacing:"0.17em",textTransform:"uppercase"}}>Connect Portal</p>
                <p style={{margin:0,fontSize:16,color:"#1E3A5F",fontWeight:800,letterSpacing:"-0.4px"}}>HR Network</p>
              </div>
            </div>

            <div style={{width:1,height:34,background:"#BFDBFE",flexShrink:0}}/>

            {/* breadcrumb */}
            <div style={{display:"flex",alignItems:"center",gap:7,fontSize:12,color:"#64748B"}}>
              <Home style={{width:13,height:13,color:"#3B82F6"}}/>
              <a href="#" style={{color:"#3B82F6",fontWeight:600,textDecoration:"none"}}>Home</a>
              <span style={{color:"#93C5FD",fontSize:14}}>›</span>
              <a href="#" style={{color:"#3B82F6",fontWeight:600,textDecoration:"none"}}>HR Dashboard</a>
              <span style={{color:"#93C5FD",fontSize:14}}>›</span>
              <span style={{color:"#1E3A5F",fontWeight:600}}>List of Persons</span>
            </div>

            {/* live dot */}
            <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:7,flexShrink:0,background:"rgba(220,252,231,0.7)",border:"1px solid #86EFAC",padding:"4px 10px 4px 7px",borderRadius:99,boxShadow:"0 1px 6px rgba(34,197,94,0.12)"}}>
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
        <nav style={{background:"rgba(255,255,255,0.75)",backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",borderBottom:"1px solid #DBEAFE"}}>
          <div style={{maxWidth:1400,margin:"0 auto",padding:"5px 28px",display:"flex",flexWrap:"wrap",gap:2}}>
            {NAV.map((lk,i)=>(
              <a key={i} href="#" style={{padding:"6px 13px",fontSize:10.5,fontWeight:700,color:"#3B82F6",letterSpacing:"0.06em",textDecoration:"none",borderRadius:8,textTransform:"uppercase",transition:"all 0.15s"}}
                onMouseEnter={e=>{e.currentTarget.style.background="#DBEAFE";e.currentTarget.style.color="#1D4ED8";}}
                onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#3B82F6";}}>
                {lk}
              </a>
            ))}
          </div>
        </nav>

        {/* ── SELECTION BAR ── */}
        <SelectionBar
          count={selected.size}
          onClear={clearSel}
          onExportSelected={exportSelected}
          onDeleteSelected={deleteSelected}
        />

        {/* ── MAIN ── */}
        <main style={{maxWidth:1400,margin:"0 auto",padding:"26px 28px"}}>

          {/* stat cards */}
          <div style={{display:"flex",gap:14,marginBottom:18,flexWrap:"wrap"}}>
            <StatCard icon={Users}     iconBg="#DBEAFE" iconCol="#2563EB" val={data.length}  label="Total Persons"   />
            <StatCard icon={Briefcase} iconBg="#D1FAE5" iconCol="#059669" val={avgExp+"y"}   label="Avg Experience"  />
            <StatCard icon={Lightbulb} iconBg="#EDE9FE" iconCol="#7C3AED" val={fields}       label="Fields Covered"  />
            <StatCard icon={Award}     iconBg="#FEF3C7" iconCol="#D97706" val={quals}         label="Qualifications"  />
            {selected.size>0 &&
              <StatCard icon={CheckSquare} iconBg="#DCFCE7" iconCol="#16A34A" val={selected.size} label="Selected"/>
            }
          </div>

          {/* toolbar */}
          <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap",marginBottom:14}}>
            {/* title */}
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:42,height:42,borderRadius:13,background:"linear-gradient(135deg,#2563EB,#1D4ED8)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(37,99,235,0.30)"}}>
                <Users style={{width:18,height:18,color:"#fff"}}/>
              </div>
              <div>
                <p style={{margin:0,fontSize:15,fontWeight:700,color:"#1E3A5F",letterSpacing:"-0.3px"}}>List of Persons</p>
                <p style={{margin:0,fontSize:11,color:"#64748B"}}>{filtered.length} person{filtered.length!==1?"s":""} found</p>
              </div>
            </div>

            {/* qual pills */}
            <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
              {["All",...Object.keys(QUALS_META)].map(q=>{
                const active = qual===q;
                return (
                  <button key={q} onClick={()=>onQual(q)} style={{
                    padding:"5px 14px",fontSize:11.5,fontWeight:600,borderRadius:99,cursor:"pointer",border:"1.5px solid",transition:"all 0.15s",
                    background: active?"linear-gradient(135deg,#2563EB,#3B82F6)":"rgba(219,234,254,0.7)",
                    color:      active?"#fff":"#2563EB",
                    borderColor:active?"#2563EB":"#93C5FD",
                    boxShadow:  active?"0 3px 10px rgba(37,99,235,0.30)":"none",
                  }}>{q}</button>
                );
              })}
            </div>

            {/* search */}
            <div style={{position:"relative",flex:1,minWidth:220,maxWidth:360,marginLeft:"auto"}}>
              <Search style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",width:13,height:13,color:"#93C5FD"}}/>
              <input type="text" placeholder="Search name, field, qualification…" value={search}
                onChange={e=>onSearch(e.target.value)}
                style={{width:"100%",paddingLeft:32,paddingRight:search?32:14,paddingTop:9,paddingBottom:9,fontSize:12.5,background:"rgba(255,255,255,0.90)",border:"1.5px solid #BFDBFE",borderRadius:11,outline:"none",color:"#1E3A5F",boxSizing:"border-box",transition:"all 0.2s"}}
                onFocus={e=>{e.target.style.borderColor="#3B82F6";e.target.style.boxShadow="0 0 0 3px rgba(59,130,246,0.15)";}}
                onBlur={e=>{e.target.style.borderColor="#BFDBFE";e.target.style.boxShadow="none";}}
              />
              {search && <button onClick={()=>onSearch("")} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#93C5FD",display:"flex",padding:0}}>
                <X style={{width:13,height:13}}/>
              </button>}
            </div>

            {/* export */}
            <button onClick={exportAll} style={{display:"flex",alignItems:"center",gap:6,padding:"9px 16px",fontSize:12,fontWeight:700,color:"#2563EB",background:"#EFF6FF",border:"1.5px solid #BFDBFE",borderRadius:11,cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap"}}
              onMouseEnter={e=>{e.currentTarget.style.background="#DBEAFE";e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 4px 12px rgba(37,99,235,0.12)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="#EFF6FF";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
              <Download style={{width:13,height:13}}/> Export CSV
            </button>
          </div>

          {/* table card */}
          <div style={{borderRadius:20,overflow:"hidden",background:"#fff",border:"1px solid #BFDBFE",boxShadow:cardShadow}}>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",minWidth:1050}}>
                <thead>
                  <tr style={{background:"#EFF6FF",borderBottom:"1.5px solid #BFDBFE"}}>
                    {/* master checkbox */}
                    <th style={{width:44,padding:"12px 8px 12px 16px",textAlign:"center"}}>
                      <Checkbox
                        checked={allPageSel}
                        indeterminate={someSel}
                        onChange={togglePage}
                      />
                    </th>
                    {COLS.map(c=>(
                      <th key={c.lbl} onClick={c.k?()=>flip(c.k):undefined}
                        style={{width:c.w,padding:"12px 14px",fontSize:10.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:sortK===c.k?"#1D4ED8":"#3B82F6",textAlign:"left",cursor:c.k?"pointer":"default",userSelect:"none",whiteSpace:"nowrap",transition:"all 0.15s"}}
                        onMouseEnter={e=>{if(c.k){e.currentTarget.style.background="#DBEAFE";e.currentTarget.style.color="#1D4ED8";}}}
                        onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=sortK===c.k?"#1D4ED8":"#3B82F6";}}>
                        <div style={{display:"flex",alignItems:"center",gap:5}}>
                          {c.lbl}
                          {c.k && <SortIcon on={sortK===c.k} dir={sortD}/>}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={COLS.length+1} style={{padding:"60px 20px",textAlign:"center"}}>
                      <Search style={{width:40,height:40,color:"#BFDBFE",display:"block",margin:"0 auto 12px"}}/>
                      <p style={{fontSize:13,color:"#94A3B8"}}>No persons found matching your search.</p>
                    </td></tr>
                  ) : pad.map((row,i)=>{
                    const even = i%2===0;
                    if (!row) return (
                      <tr key={`pad${i}`} style={{height:56,background:even?"#fff":"#F8FBFF",borderBottom:"1px solid #F0F7FF"}}>
                        <td colSpan={COLS.length+1}/>
                      </tr>
                    );
                    const idx    = sp*PAGE_SZ + i;
                    const av     = AVATARS[row.id % AVATARS.length];
                    const qm     = QUALS_META[row.qual] || QUALS_META["Degree"];
                    const FieldI = FIELD_ICONS[row.field] || Lightbulb;
                    const pct    = Math.round((row.exp/MAX_EXP)*100);
                    const isSel  = selected.has(row.id);

                    return (
                      <tr key={row.id} style={{
                        height:56, borderBottom:"1px solid #EFF6FF", cursor:"pointer", transition:"background 0.12s",
                        background: isSel ? "rgba(219,234,254,0.50)" : even?"#fff":"#F8FBFF",
                      }}
                        onMouseEnter={e=>e.currentTarget.style.background=isSel?"rgba(219,234,254,0.65)":"#EFF6FF"}
                        onMouseLeave={e=>e.currentTarget.style.background=isSel?"rgba(219,234,254,0.50)":even?"#fff":"#F8FBFF"}>

                        {/* checkbox cell */}
                        <td style={{padding:"0 8px 0 16px",textAlign:"center",verticalAlign:"middle"}}>
                          <Checkbox checked={isSel} onChange={()=>toggleRow(row.id)}/>
                        </td>

                        {/* S.No */}
                        <td style={{padding:"0 14px",verticalAlign:"middle",width:"52px"}}>
                          <span style={{fontSize:11,fontWeight:700,color:"#93C5FD"}}>{idx+1}</span>
                        </td>

                        {/* Name */}
                        <td style={{padding:"0 14px",verticalAlign:"middle"}}>
                          <div style={{display:"flex",alignItems:"center",gap:10}}>
                            <div style={{width:34,height:34,borderRadius:10,background:av.bg,color:av.col,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0}}>
                              {initials(row.name)}
                            </div>
                            <span style={{fontSize:13,fontWeight:600,color:"#1E3A5F",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{row.name}</span>
                          </div>
                        </td>

                        {/* Qualification */}
                        <td style={{padding:"0 14px",verticalAlign:"middle"}}>
                          <span style={{display:"inline-block",padding:"3px 10px",borderRadius:99,fontSize:11,fontWeight:700,background:qm.bg,color:qm.col,border:`1.5px solid ${qm.border}`}}>
                            {row.qual}
                          </span>
                        </td>

                        {/* Experience */}
                        <td style={{padding:"0 14px",verticalAlign:"middle"}}>
                          <div style={{display:"flex",alignItems:"center",gap:8}}>
                            <div style={{height:4,borderRadius:99,background:"#DBEAFE",width:80,overflow:"hidden",flexShrink:0}}>
                              <div style={{height:"100%",borderRadius:99,background:"linear-gradient(90deg,#2563EB,#3B82F6)",width:`${pct}%`,transition:"width 0.4s ease"}}/>
                            </div>
                            <span style={{fontSize:12,color:"#64748B",whiteSpace:"nowrap"}}>{row.exp} yr{row.exp!==1?"s":""}</span>
                          </div>
                        </td>

                        {/* Field */}
                        <td style={{padding:"0 14px",verticalAlign:"middle"}}>
                          <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:8,fontSize:11.5,fontWeight:600,background:"#EFF6FF",color:"#2563EB",border:"1px solid #BFDBFE"}}>
                            <FieldI style={{width:12,height:12,flexShrink:0}}/>{row.field}
                          </span>
                        </td>

                        {/* CV */}
                        <td style={{padding:"0 14px",verticalAlign:"middle"}}>
                          <button style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:9,fontSize:11.5,fontWeight:700,color:"#2563EB",background:"#EFF6FF",border:"1.5px solid #BFDBFE",cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap"}}
                            onMouseEnter={e=>{e.currentTarget.style.background="#DBEAFE";e.currentTarget.style.borderColor="#93C5FD";e.currentTarget.style.transform="translateY(-1px)";}}
                            onMouseLeave={e=>{e.currentTarget.style.background="#EFF6FF";e.currentTarget.style.borderColor="#BFDBFE";e.currentTarget.style.transform="none";}}>
                            <FileText style={{width:12,height:12}}/> View CV
                          </button>
                        </td>

                        {/* Phone */}
                        <td style={{padding:"0 14px",verticalAlign:"middle"}}>
                          <span style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:"#64748B"}}>
                            <Phone style={{width:12,height:12,color:"#93C5FD",flexShrink:0}}/>{row.phone}
                          </span>
                        </td>

                        {/* Email */}
                        <td style={{padding:"0 14px",verticalAlign:"middle"}}>
                          <span style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:"#64748B"}}>
                            <Mail style={{width:12,height:12,color:"#93C5FD",flexShrink:0}}/>{row.email}
                          </span>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* pagination */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 20px",background:"#EFF6FF",borderTop:"1.5px solid #BFDBFE",flexWrap:"wrap",gap:8}}>
              <p style={{margin:0,fontSize:12,color:"#64748B"}}>
                Showing{" "}
                <span style={{fontWeight:700,color:"#2563EB"}}>{filtered.length===0?0:sp*PAGE_SZ+1}–{Math.min((sp+1)*PAGE_SZ,filtered.length)}</span>
                {" of "}
                <span style={{fontWeight:700,color:"#334155"}}>{filtered.length}</span>
                {selected.size>0 && <span style={{marginLeft:12,fontWeight:700,color:"#16A34A"}}>· {selected.size} selected</span>}
              </p>
              <div style={{display:"flex",alignItems:"center",gap:5}}>
                <button disabled={sp===0} onClick={()=>{setPage(p=>p-1);}}
                  style={{width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",background:sp===0?"#F1F5F9":"#fff",border:"1.5px solid",borderColor:sp===0?"#E2E8F0":"#BFDBFE",cursor:sp===0?"not-allowed":"pointer",opacity:sp===0?0.4:1,transition:"all 0.15s"}}
                  onMouseEnter={e=>sp!==0&&(e.currentTarget.style.background="#DBEAFE")}
                  onMouseLeave={e=>{e.currentTarget.style.background=sp===0?"#F1F5F9":"#fff";}}>
                  <ChevronLeft style={{width:14,height:14,color:"#2563EB"}}/>
                </button>
                {Array.from({length:totPg},(_,n)=>(
                  <button key={n} onClick={()=>setPage(n)} style={{width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.15s",background:n===sp?"linear-gradient(135deg,#2563EB,#3B82F6)":"#fff",border:n===sp?"1.5px solid #2563EB":"1.5px solid #BFDBFE",color:n===sp?"#fff":"#3B82F6",boxShadow:n===sp?"0 3px 10px rgba(37,99,235,0.35)":"0 1px 3px rgba(37,99,235,0.08)"}}>
                    {n+1}
                  </button>
                ))}
                <button disabled={sp>=totPg-1} onClick={()=>setPage(p=>p+1)}
                  style={{width:30,height:30,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",background:sp>=totPg-1?"#F1F5F9":"#fff",border:"1.5px solid",borderColor:sp>=totPg-1?"#E2E8F0":"#BFDBFE",cursor:sp>=totPg-1?"not-allowed":"pointer",opacity:sp>=totPg-1?0.4:1,transition:"all 0.15s"}}
                  onMouseEnter={e=>sp<totPg-1&&(e.currentTarget.style.background="#DBEAFE")}
                  onMouseLeave={e=>{e.currentTarget.style.background=sp>=totPg-1?"#F1F5F9":"#fff";}}>
                  <ChevronRight style={{width:14,height:14,color:"#2563EB"}}/>
                </button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}