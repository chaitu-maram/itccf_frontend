// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Briefcase,
//   Building2,
//   MapPin,
//   DollarSign,
//   ChevronLeft,
//   Users,
//   Plus,
//   Trash2,
// } from 'lucide-react';

// const inputCls =
//   "h-11 w-full rounded-xl border-2 border-blue-100 bg-blue-50 px-4 " +
//   "text-base font-medium text-slate-800 placeholder:text-slate-400 " +
//   "transition-all duration-150 focus:outline-none focus:border-blue-500 " +
//   "focus:bg-white focus:ring-4 focus:ring-blue-100";

// const labelCls =
//   "text-sm font-semibold text-slate-700 mb-2 block tracking-normal";

// export default function PostJob() {
//   const navigate = useNavigate();

//   const initialJobState = {
//     title: '',
//     company: '',
//     location: '',
//     type: 'Full-time',
//     salary: '',
//     availableJobs: '',
//     description: '',
//   };

//   const [jobs, setJobs] = useState([{ ...initialJobState }]);

//   const handleChange = (
//     index: number,
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const updatedJobs = [...jobs];
//     updatedJobs[index] = {
//       ...updatedJobs[index],
//       [e.target.name]: e.target.value,
//     };
//     setJobs(updatedJobs);
//   };

//   const addAnotherJob = () => {
//     setJobs([...jobs, { ...initialJobState }]);
//   };

//   const removeJob = (index: number) => {
//     if (jobs.length > 1) {
//       const updatedJobs = jobs.filter((_, i) => i !== index);
//       setJobs(updatedJobs);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Jobs Posted:', jobs);
//     alert(`${jobs.length} Job(s) Posted Successfully! (Mock)`);
//     navigate('/listpersons');
//   };

//   return (
//     <div
//       style={{
//         minHeight: '100vh',
//         fontFamily: "'Inter',system-ui,sans-serif",
//         background: '#EFF6FF',
//         padding: '40px 20px',
//       }}
//     >
//       <div style={{ maxWidth: '700px', margin: '0 auto' }}>
//         <button
//           onClick={() => navigate(-1)}
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '6px',
//             background: 'transparent',
//             border: 'none',
//             color: '#3B82F6',
//             cursor: 'pointer',
//             fontWeight: 600,
//             padding: 0,
//             marginBottom: '20px',
//           }}
//         >
//           <ChevronLeft style={{ width: 16, height: 16 }} /> Back
//         </button>

//         <div style={{ marginBottom: '30px' }}>
//           <h1
//             style={{
//               fontSize: '28px',
//               color: '#1E3A5F',
//               marginBottom: '8px',
//               fontWeight: 800,
//             }}
//           >
//             Post Jobs
//           </h1>

//           <p
//             style={{
//               color: '#64748B',
//               fontSize: '14px',
//               margin: 0,
//             }}
//           >
//             Fill in the details below to publish one or more open positions.
//           </p>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '24px',
//           }}
//         >
//           {jobs.map((job, index) => (
//             <div
//               key={index}
//               style={{
//                 background: '#fff',
//                 borderRadius: '16px',
//                 boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
//                 padding: '30px',
//                 border: '1px solid #BFDBFE',
//                 position: 'relative',
//               }}
//             >
//               {/* Header */}
//               <div
//                 style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   borderBottom: '1px solid #E2E8F0',
//                   paddingBottom: '16px',
//                   marginBottom: '20px',
//                 }}
//               >
//                 <div
//                   style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '10px',
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: '34px',
//                       height: '34px',
//                       borderRadius: '10px',
//                       background:
//                         'linear-gradient(135deg, #3B82F6, #2563EB)',
//                       color: '#fff',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       fontWeight: 800,
//                       fontSize: '14px',
//                       boxShadow: '0 4px 10px rgba(37,99,235,0.25)',
//                     }}
//                   >
//                     {index + 1}
//                   </div>

//                   <h2
//                     style={{
//                       fontSize: '18px',
//                       color: '#1E293B',
//                       fontWeight: 700,
//                       margin: 0,
//                     }}
//                   >
//                     Job Posting
//                   </h2>
//                 </div>

//                 {jobs.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeJob(index)}
//                     style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '4px',
//                       background: 'rgba(239,68,68,0.1)',
//                       color: '#EF4444',
//                       border: 'none',
//                       borderRadius: '6px',
//                       padding: '6px 12px',
//                       fontSize: '13px',
//                       fontWeight: 600,
//                       cursor: 'pointer',
//                     }}
//                   >
//                     <Trash2 style={{ width: 14, height: 14 }} />
//                     Remove
//                   </button>
//                 )}
//               </div>

//               <div className="flex flex-col gap-5">
//                 {/* Company */}
//                 <div className="flex flex-col">
//                   <label className={labelCls}>Company Name</label>

//                   <div className="relative">
//                     <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400">
//                       <Building2 className="w-4 h-4" />
//                     </span>

//                     <input
//                       name="company"
//                       value={job.company}
//                       onChange={(e) => handleChange(index, e)}
//                       placeholder="e.g. HR Connect Inc."
//                       required
//                       className={`${inputCls} pl-10`}
//                     />
//                   </div>
//                 </div>


//                 {/* Job Title */}
//                 <div className="flex flex-col">
//                   <label className={labelCls}>Job Role</label>

//                   <div className="relative">
//                     <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400">
//                       <Briefcase className="w-4 h-4" />
//                     </span>

//                     <input
//                       name="title"
//                       value={job.title}
//                       onChange={(e) => handleChange(index, e)}
//                       placeholder="e.g. Senior React Developer"
//                       required
//                       className={`${inputCls} pl-10`}
//                     />
//                   </div>
//                 </div>

               

//                 <div className="flex gap-4 flex-wrap">
//                   {/* Location */}
//                   <div className="flex flex-col flex-1 min-w-[200px]">
//                     <label className={labelCls}>Location</label>

//                     <div className="relative">
//                       <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400">
//                         <MapPin className="w-4 h-4" />
//                       </span>

//                       <input
//                         name="location"
//                         value={job.location}
//                         onChange={(e) => handleChange(index, e)}
//                         placeholder="e.g. Remote or Hyderabad"
//                         required
//                         className={`${inputCls} pl-10`}
//                       />
//                     </div>
//                   </div>

//                   {/* Employment Type */}
                 
//                 </div>

//                 <div className="flex gap-4 flex-wrap">
//                   {/* Salary */}
//                   <div className="flex flex-col flex-1 min-w-[200px]">
//                     <label className={labelCls}>
//                       Salary (Optional)
//                     </label>

//                     <div className="relative">
//                       <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400">
//                         <DollarSign className="w-4 h-4" />
//                       </span>

//                       <input
//                         name="salary"
//                         value={job.salary}
//                         onChange={(e) => handleChange(index, e)}
//                         placeholder="e.g. ₹8 LPA - ₹12 LPA"
//                         className={`${inputCls} pl-10`}
//                       />
//                     </div>
//                   </div>

//                   {/* Available Jobs */}
//                   <div className="flex flex-col flex-1 min-w-[200px]">
//                     <label className={labelCls}>
//                       No. of Available Jobs
//                     </label>

//                     <div className="relative">
//                       <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400">
//                         <Users className="w-4 h-4" />
//                       </span>

//                       <input
//                         type="number"
//                         min="1"
//                         name="availableJobs"
//                         value={job.availableJobs}
//                         onChange={(e) => handleChange(index, e)}
//                         placeholder="e.g. 5"
//                         required
//                         className={`${inputCls} pl-10`}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <div className="flex flex-col">
//                   <label className={labelCls}>Job Description</label>

//                   <textarea
//                     name="description"
//                     value={job.description}
//                     onChange={(e) => handleChange(index, e)}
//                     placeholder="Describe responsibilities, requirements, and benefits..."
//                     required
//                     rows={4}
//                     className="w-full rounded-xl border-2 border-blue-100 bg-blue-50 px-4 py-3 text-base font-medium text-slate-800 placeholder:text-slate-400 transition-all duration-150 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 resize-none"
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* Action Buttons */}
//           <div
//             style={{
//               display: 'flex',
//               gap: '16px',
//               marginTop: '10px',
//             }}
//           >
//             <button
//               type="button"
//               onClick={addAnotherJob}
//               style={{
//                 flex: 1,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 gap: '8px',
//                 background: '#fff',
//                 color: '#2563EB',
//                 fontWeight: 700,
//                 padding: '14px',
//                 borderRadius: '10px',
//                 border: '2px dashed #93C5FD',
//                 cursor: 'pointer',
//                 transition: 'all 0.2s',
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = '#EFF6FF';
//                 e.currentTarget.style.borderColor = '#60A5FA';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = '#fff';
//                 e.currentTarget.style.borderColor = '#93C5FD';
//               }}
//             >
//               <Plus style={{ width: 18, height: 18 }} />
//               Post Another Job
//             </button>

//             <button
//               type="submit"
//               style={{
//                 flex: 2,
//                 background:
//                   'linear-gradient(135deg, #2563EB, #1D4ED8)',
//                 color: '#fff',
//                 fontWeight: 700,
//                 padding: '14px',
//                 borderRadius: '10px',
//                 border: 'none',
//                 cursor: 'pointer',
//                 boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
//               }}
//             >
//               Submit All Jobs
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Briefcase,
//   Building2,
//   MapPin,
//   DollarSign,
//   ChevronLeft,
//   Users,
//   Plus,
//   Trash2,
//   CheckCircle2,
//   Loader2,
//   AlertCircle,
// } from 'lucide-react';

// const BASE = 'http://192.168.0.7:8000/api';

// /* ── shared job shape ── */
// const ORGS = [
//   'Hospitals', 'Schools', 'Colleges', 'IT Industry',
//   'Hardware Industry', 'Service Sector', 'Banks', 'Retail Sector',
//   'Logistics',
// ];

// const ROLES = [
//   'Administration', 'Engineer', 'Faculty', 'Nursing', 'Librarian',
//   'Developer', 'Support', 'Clerk', 'Technician', 'System Admin',
//   'Accountant', 'Security', 'HR Manager', 'Data Analyst',
//   'Quality Tester', 'Sales Officer', 'Store Manager', 'Driver',
//   'Warehouse Staff', 'Supply Chain Mgr', 'Doctor', 'Counselor',
// ];

// const blank = () => ({
//   org: '',
//   role: '',
//   location: '',
//   salary: '',
//   availableJobs: '',
//   description: '',
// });

// /* ── tiny helpers ── */
// const inputBase: React.CSSProperties = {
//   width: '100%', boxSizing: 'border-box',
//   height: 44, borderRadius: 12,
//   border: '2px solid #DDD6FE',
//   background: '#FAF5FF',
//   padding: '0 14px',
//   fontSize: 13.5, fontWeight: 500,
//   color: '#2E1065',
//   fontFamily: "'Outfit', system-ui, sans-serif",
//   outline: 'none', transition: 'all .18s',
// };
// const selectBase: React.CSSProperties = { ...inputBase, cursor: 'pointer', appearance: 'none' as const };
// const labelSt: React.CSSProperties = {
//   display: 'block', marginBottom: 5,
//   fontSize: 9.5, fontWeight: 800,
//   letterSpacing: '0.11em', textTransform: 'uppercase',
//   color: '#A78BFA',
// };

// function Field({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 180 }}>
//       <label style={labelSt}>{label}</label>
//       <div style={{ position: 'relative' }}>
//         {icon && (
//           <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#A78BFA', display: 'flex' }}>
//             {icon}
//           </span>
//         )}
//         {children}
//       </div>
//     </div>
//   );
// }

// const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//   e.target.style.borderColor = '#7C3AED';
//   e.target.style.background = '#F3E8FF';
//   e.target.style.boxShadow = '0 0 0 3px rgba(196,181,253,0.40)';
// };
// const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//   e.target.style.borderColor = '#DDD6FE';
//   e.target.style.background = '#FAF5FF';
//   e.target.style.boxShadow = 'none';
// };

// /* ════════════════════════════════════════════════════════════ */
// export default function PostJob() {
//   const navigate = useNavigate();
//   const [jobs, setJobs] = useState([blank()]);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');

//   const employerId = localStorage.getItem('employer_id') || '';
//   const companyName = localStorage.getItem('company_name') || '';

//   /* redirect if not logged in as employer */
//   useEffect(() => {
//     if (localStorage.getItem('user_type') !== 'employer') navigate('/');
//   }, [navigate]);

//   const set = (i: number, key: string, val: string) => {
//     setJobs(prev => prev.map((j, idx) => idx === i ? { ...j, [key]: val } : j));
//   };

//   const addJob = () => setJobs(prev => [...prev, blank()]);
//   const removeJob = (i: number) => setJobs(prev => prev.filter((_, idx) => idx !== i));

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(''); setLoading(true);

//     /* validate */
//     for (const j of jobs) {
//       if (!j.org || !j.role || !j.availableJobs) {
//         setError('Please fill Organisation, Role, and No. of Jobs for every entry.');
//         setLoading(false); return;
//       }
//     }

//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`${BASE}/jobs/post/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         body: JSON.stringify({
//           employer_id: employerId,
//           jobs: jobs.map(j => ({
//             org: j.org,
//             role: j.role,
//             location: j.location,
//             salary: j.salary,
//             available_jobs: Number(j.availableJobs),
//             description: j.description,
//           })),
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) { setError(data.error || data.message || 'Failed to post jobs.'); return; }

//       setSuccess(true);
//       setTimeout(() => navigate('/listpersons'), 2200);
//     } catch {
//       setError('Network error. Please check your connection.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ── success screen ── */
//   if (success) return (
//     <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(160deg,#F5F3FF,#EDE9FE,#F5F3FF)', fontFamily: "'Outfit',system-ui,sans-serif" }}>
//       <div style={{ textAlign: 'center', padding: 40 }}>
//         <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,#7C3AED,#A855F7)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 30px rgba(124,58,237,0.40)' }}>
//           <CheckCircle2 style={{ width: 36, height: 36, color: '#fff' }} />
//         </div>
//         <p style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#2E1065' }}>Jobs Posted Successfully!</p>
//         <p style={{ margin: '8px 0 0', fontSize: 13, color: '#7C3AED' }}>Redirecting to dashboard…</p>
//       </div>
//     </div>
//   );

//   /* ── main form ── */
//   return (
//     <div style={{ minHeight: '100vh', fontFamily: "'Outfit',system-ui,sans-serif", background: 'linear-gradient(160deg,#F5F3FF 0%,#EDE9FE 35%,#F5F3FF 65%,#FAF5FF 100%)', padding: '36px 20px' }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
//         * { font-family: 'Outfit', system-ui, sans-serif !important; }
//         @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
//         select option { background: #FAF5FF; color: #2E1065; }
//         /* custom select arrow */
//         .sel-wrap select { padding-right: 36px !important; }
//         .sel-arrow { position:absolute; right:12px; top:50%; transform:translateY(-50%); pointer-events:none; color:#A78BFA; }
//       `}</style>

//       <div style={{ maxWidth: 720, margin: '0 auto' }}>

//         {/* back */}
//         <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', color: '#7C3AED', cursor: 'pointer', fontWeight: 700, fontSize: 13, padding: 0, marginBottom: 24 }}>
//           <ChevronLeft style={{ width: 16, height: 16 }} /> Back
//         </button>

//         {/* page title */}
//         <div style={{ marginBottom: 28 }}>
//           <p style={{ margin: '0 0 4px', fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A855F7' }}>
//             {companyName || 'Employer Portal'}
//           </p>
//           <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#2E1065', letterSpacing: '-0.5px' }}>Post Job Openings</h1>
//           <p style={{ margin: '6px 0 0', fontSize: 13, color: '#7C3AED' }}>Add one or more roles — vacancy counts update live on the Home board.</p>
//         </div>

//         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

//           {jobs.map((job, i) => (
//             <div key={i} style={{ background: '#fff', borderRadius: 20, border: '1px solid #DDD6FE', boxShadow: '0 4px 24px rgba(124,58,237,0.09),inset 0 1px 0 rgba(255,255,255,0.9)', overflow: 'hidden' }}>

//               {/* card header */}
//               <div style={{ background: 'linear-gradient(135deg,#4C1D95 0%,#7C3AED 55%,#A855F7 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
//                 <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(255,255,255,0.16) 0%,transparent 60%)', pointerEvents: 'none' }} />
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
//                   <div style={{ width: 36, height: 36, borderRadius: 11, background: 'rgba(255,255,255,0.20)', border: '1px solid rgba(255,255,255,0.38)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: '#fff', backdropFilter: 'blur(6px)' }}>
//                     {i + 1}
//                   </div>
//                   <div>
//                     <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#fff' }}>Job Opening #{i + 1}</p>
//                     <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.68)' }}>
//                       {job.org && job.role ? `${job.role} @ ${job.org}` : 'Select organisation & role below'}
//                     </p>
//                   </div>
//                 </div>
//                 {jobs.length > 1 && (
//                   <button type="button" onClick={() => removeJob(i)}
//                     style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.30)', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', position: 'relative', transition: 'all .15s' }}
//                     onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.55)'; }}
//                     onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}>
//                     <Trash2 style={{ width: 13, height: 13 }} /> Remove
//                   </button>
//                 )}
//               </div>

//               {/* card body */}
//               <div style={{ padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>

//                 {/* Org + Role row */}
//                 <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
//                   <Field label="Organisation *" icon={<Building2 style={{ width: 15, height: 15 }} />}>
//                     <div className="sel-wrap" style={{ position: 'relative' }}>
//                       <select
//                         value={job.org}
//                         onChange={e => set(i, 'org', e.target.value)}
//                         required
//                         style={{ ...selectBase, paddingLeft: 36 }}
//                         onFocus={focusStyle as any}
//                         onBlur={blurStyle as any}
//                       >
//                         <option value="">Select organisation…</option>
//                         {ORGS.map(o => <option key={o} value={o}>{o}</option>)}
//                       </select>
//                       <span className="sel-arrow">
//                         <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
//                       </span>
//                     </div>
//                   </Field>

//                   <Field label="Role *" icon={<Briefcase style={{ width: 15, height: 15 }} />}>
//                     <div className="sel-wrap" style={{ position: 'relative' }}>
//                       <select
//                         value={job.role}
//                         onChange={e => set(i, 'role', e.target.value)}
//                         required
//                         style={{ ...selectBase, paddingLeft: 36 }}
//                         onFocus={focusStyle as any}
//                         onBlur={blurStyle as any}
//                       >
//                         <option value="">Select role…</option>
//                         {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
//                       </select>
//                       <span className="sel-arrow">
//                         <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
//                       </span>
//                     </div>
//                   </Field>
//                 </div>

//                 {/* Location + Vacancies row */}
//                 <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
//                   <Field label="Location" icon={<MapPin style={{ width: 15, height: 15 }} />}>
//                     <input
//                       value={job.location}
//                       onChange={e => set(i, 'location', e.target.value)}
//                       placeholder="e.g. Hyderabad / Remote"
//                       style={{ ...inputBase, paddingLeft: 36 }}
//                       onFocus={focusStyle as any}
//                       onBlur={blurStyle as any}
//                     />
//                   </Field>

//                   <Field label="No. of Vacancies *" icon={<Users style={{ width: 15, height: 15 }} />}>
//                     <input
//                       type="number" min="1"
//                       value={job.availableJobs}
//                       onChange={e => set(i, 'availableJobs', e.target.value)}
//                       placeholder="e.g. 5"
//                       required
//                       style={{ ...inputBase, paddingLeft: 36 }}
//                       onFocus={focusStyle as any}
//                       onBlur={blurStyle as any}
//                     />
//                   </Field>
//                 </div>

//                 {/* Salary */}
//                 <Field label="Salary (Optional)" icon={<DollarSign style={{ width: 15, height: 15 }} />}>
//                   <input
//                     value={job.salary}
//                     onChange={e => set(i, 'salary', e.target.value)}
//                     placeholder="e.g. ₹8 LPA – ₹12 LPA"
//                     style={{ ...inputBase, paddingLeft: 36 }}
//                     onFocus={focusStyle as any}
//                     onBlur={blurStyle as any}
//                   />
//                 </Field>

//                 {/* Description */}
//                 <div>
//                   <label style={labelSt}>Job Description</label>
//                   <textarea
//                     value={job.description}
//                     onChange={e => set(i, 'description', e.target.value)}
//                     placeholder="Describe responsibilities, requirements, and benefits…"
//                     rows={3}
//                     style={{ ...inputBase, height: 'auto', padding: '12px 14px', resize: 'vertical', lineHeight: 1.55 } as React.CSSProperties}
//                     onFocus={focusStyle as any}
//                     onBlur={blurStyle as any}
//                   />
//                 </div>

//               </div>
//             </div>
//           ))}

//           {/* error */}
//           {error && (
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#FFF1F2', border: '1.5px solid #FECDD3', borderRadius: 12, padding: '10px 14px' }}>
//               <AlertCircle style={{ width: 15, height: 15, color: '#F43F5E', flexShrink: 0 }} />
//               <span style={{ fontSize: 12.5, fontWeight: 600, color: '#BE123C' }}>{error}</span>
//             </div>
//           )}

//           {/* action row */}
//           <div style={{ display: 'flex', gap: 14 }}>
//             <button
//               type="button" onClick={addJob}
//               style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, background: '#fff', color: '#7C3AED', fontWeight: 700, fontSize: 13.5, padding: '13px', borderRadius: 13, border: '2px dashed #C4B5FD', cursor: 'pointer', transition: 'all .18s' }}
//               onMouseEnter={e => { e.currentTarget.style.background = '#EDE9FE'; e.currentTarget.style.borderColor = '#7C3AED'; }}
//               onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#C4B5FD'; }}>
//               <Plus style={{ width: 17, height: 17 }} /> Add Another Role
//             </button>

//             <button
//               type="submit" disabled={loading}
//               style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'linear-gradient(135deg,#4C1D95,#7C3AED,#A855F7)', color: '#fff', fontWeight: 700, fontSize: 14, padding: '13px', borderRadius: 13, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 6px 20px rgba(124,58,237,0.40)', opacity: loading ? 0.8 : 1, transition: 'transform .15s,box-shadow .15s', position: 'relative', overflow: 'hidden' }}
//               onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(124,58,237,0.48)'; } }}
//               onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(124,58,237,0.40)'; }}>
//               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 60%)', pointerEvents: 'none' }} />
//               {loading
//                 ? <><Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} /> Posting…</>
//                 : <><CheckCircle2 style={{ width: 16, height: 16 }} /> Submit All Jobs</>
//               }
//             </button>
//           </div>

//           <p style={{ margin: 0, textAlign: 'center', fontSize: 11, color: '#C4B5FD', lineHeight: 1.6 }}>
//             Vacancy counts are reflected immediately on the Home Job Board after submission.
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  ChevronLeft,
  Users,
  Plus,
  Trash2,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from 'lucide-react';

const BASE = 'http://192.168.0.7:8000/api';

const ORGS = [
  'Hospitals', 'Schools', 'Colleges', 'IT Industry',
  'Hardware Industry', 'Service Sector', 'Banks', 'Retail Sector',
  'Logistics',
];

const ROLES = [
  'Administration', 'Engineer', 'Faculty', 'Nursing', 'Librarian',
  'Developer', 'Support', 'Clerk', 'Technician', 'System Admin',
  'Accountant', 'Security', 'HR Manager', 'Data Analyst',
  'Quality Tester', 'Sales Officer', 'Store Manager', 'Driver',
  'Warehouse Staff', 'Supply Chain Mgr', 'Doctor', 'Counselor',
];

const blank = () => ({
  org: '',
  role: '',
  location: '',
  salary: '',
  availableJobs: '',
  description: '',
});

const inputBase: React.CSSProperties = {
  width: '100%', boxSizing: 'border-box',
  height: 44, borderRadius: 12,
  border: '2px solid #DDD6FE',
  background: '#FAF5FF',
  padding: '0 14px',
  fontSize: 13.5, fontWeight: 500,
  color: '#2E1065',
  fontFamily: "'Outfit', system-ui, sans-serif",
  outline: 'none', transition: 'all .18s',
};
const selectBase: React.CSSProperties = { ...inputBase, cursor: 'pointer', appearance: 'none' as const };
const labelSt: React.CSSProperties = {
  display: 'block', marginBottom: 5,
  fontSize: 9.5, fontWeight: 800,
  letterSpacing: '0.11em', textTransform: 'uppercase',
  color: '#A78BFA',
};

function Field({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 180 }}>
      <label style={labelSt}>{label}</label>
      <div style={{ position: 'relative' }}>
        {icon && (
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#A78BFA', display: 'flex' }}>
            {icon}
          </span>
        )}
        {children}
      </div>
    </div>
  );
}

const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.target.style.borderColor = '#7C3AED';
  e.target.style.background = '#F3E8FF';
  e.target.style.boxShadow = '0 0 0 3px rgba(196,181,253,0.40)';
};
const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.target.style.borderColor = '#DDD6FE';
  e.target.style.background = '#FAF5FF';
  e.target.style.boxShadow = 'none';
};

export default function PostJob() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([blank()]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // ── FIX 1: read from localStorage inside component, log for debugging ──
  const employerId   = localStorage.getItem('employer_id')   || '';
  const companyName  = localStorage.getItem('company_name')  || '';

  // ── FIX 2: guard both user_type AND employer_id ──
  useEffect(() => {
    const userType  = localStorage.getItem('user_type');
    const empId     = localStorage.getItem('employer_id');

    // Debug log — remove after confirming it works
    console.log('user_type:', userType);
    console.log('employer_id:', empId);

    if (userType !== 'employer') {
      navigate('/');
      return;
    }
    if (!empId) {
      // employer_id missing — session issue, send back to login
      navigate('/');
    }
  }, [navigate]);

  const set = (i: number, key: string, val: string) => {
    setJobs(prev => prev.map((j, idx) => idx === i ? { ...j, [key]: val } : j));
  };

  const addJob  = () => setJobs(prev => [...prev, blank()]);
  const removeJob = (i: number) => setJobs(prev => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // ── FIX 3: guard employer_id before even trying to submit ──
    if (!employerId) {
      setError('Session expired. Please log in again.');
      setTimeout(() => navigate('/'), 1500);
      return;
    }

    setLoading(true);

    // validate
    for (const j of jobs) {
      if (!j.org || !j.role || !j.availableJobs) {
        setError('Please fill Organisation, Role, and No. of Jobs for every entry.');
        setLoading(false);
        return;
      }
    }

    try {
      const token = localStorage.getItem('token');

      // ── FIX 4: log what we are actually sending so you can see it in console ──
      const payload = {
        employer_id: employerId,
        jobs: jobs.map(j => ({
          org: j.org,
          role: j.role,
          location: j.location,
          salary: j.salary,
          available_jobs: Number(j.availableJobs),
          description: j.description,
        })),
      };
      console.log('Submitting payload:', JSON.stringify(payload, null, 2));

      const res = await fetch(`${BASE}/jobs/post/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log('Response:', data);

      if (!res.ok) {
        setError(data.error || data.message || 'Failed to post jobs.');
        return;
      }

      setSuccess(true);
      setTimeout(() => navigate('/listpersons'), 2200);
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // ── success screen ──
  if (success) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(160deg,#F5F3FF,#EDE9FE,#F5F3FF)', fontFamily: "'Outfit',system-ui,sans-serif" }}>
      <div style={{ textAlign: 'center', padding: 40 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,#7C3AED,#A855F7)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 30px rgba(124,58,237,0.40)' }}>
          <CheckCircle2 style={{ width: 36, height: 36, color: '#fff' }} />
        </div>
        <p style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#2E1065' }}>Jobs Posted Successfully!</p>
        <p style={{ margin: '8px 0 0', fontSize: 13, color: '#7C3AED' }}>Redirecting to dashboard…</p>
      </div>
    </div>
  );

  // ── main form ──
  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Outfit',system-ui,sans-serif", background: 'linear-gradient(160deg,#F5F3FF 0%,#EDE9FE 35%,#F5F3FF 65%,#FAF5FF 100%)', padding: '36px 20px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Outfit', system-ui, sans-serif !important; }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        select option { background: #FAF5FF; color: #2E1065; }
        .sel-wrap select { padding-right: 36px !important; }
        .sel-arrow { position:absolute; right:12px; top:50%; transform:translateY(-50%); pointer-events:none; color:#A78BFA; }
      `}</style>

      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        {/* back */}
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', color: '#7C3AED', cursor: 'pointer', fontWeight: 700, fontSize: 13, padding: 0, marginBottom: 24 }}>
          <ChevronLeft style={{ width: 16, height: 16 }} /> Back
        </button>

        {/* page title */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ margin: '0 0 4px', fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A855F7' }}>
            {companyName || 'Employer Portal'}
          </p>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#2E1065', letterSpacing: '-0.5px' }}>Post Job Openings</h1>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: '#7C3AED' }}>Add one or more roles — vacancy counts update live on the Home board.</p>

          {/* ── FIX 5: show employer_id on screen so you can confirm it's loaded ── */}
          {employerId && (
            <p style={{ margin: '4px 0 0', fontSize: 11, color: '#A78BFA' }}>
              Posting as: <strong>{employerId}</strong>
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {jobs.map((job, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 20, border: '1px solid #DDD6FE', boxShadow: '0 4px 24px rgba(124,58,237,0.09),inset 0 1px 0 rgba(255,255,255,0.9)', overflow: 'hidden' }}>

              {/* card header */}
              <div style={{ background: 'linear-gradient(135deg,#4C1D95 0%,#7C3AED 55%,#A855F7 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(255,255,255,0.16) 0%,transparent 60%)', pointerEvents: 'none' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 11, background: 'rgba(255,255,255,0.20)', border: '1px solid rgba(255,255,255,0.38)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: '#fff', backdropFilter: 'blur(6px)' }}>
                    {i + 1}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#fff' }}>Job Opening #{i + 1}</p>
                    <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.68)' }}>
                      {job.org && job.role ? `${job.role} @ ${job.org}` : 'Select organisation & role below'}
                    </p>
                  </div>
                </div>
                {jobs.length > 1 && (
                  <button type="button" onClick={() => removeJob(i)}
                    style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.30)', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', position: 'relative', transition: 'all .15s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.55)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}>
                    <Trash2 style={{ width: 13, height: 13 }} /> Remove
                  </button>
                )}
              </div>

              {/* card body */}
              <div style={{ padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>

                {/* Org + Role */}
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                  <Field label="Organisation *" icon={<Building2 style={{ width: 15, height: 15 }} />}>
                    <div className="sel-wrap" style={{ position: 'relative' }}>
                      <select
                        value={job.org}
                        onChange={e => set(i, 'org', e.target.value)}
                        required
                        style={{ ...selectBase, paddingLeft: 36 }}
                        onFocus={focusStyle as any}
                        onBlur={blurStyle as any}
                      >
                        <option value="">Select organisation…</option>
                        {ORGS.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                      <span className="sel-arrow">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                    </div>
                  </Field>

                  <Field label="Role *" icon={<Briefcase style={{ width: 15, height: 15 }} />}>
                    <div className="sel-wrap" style={{ position: 'relative' }}>
                      <select
                        value={job.role}
                        onChange={e => set(i, 'role', e.target.value)}
                        required
                        style={{ ...selectBase, paddingLeft: 36 }}
                        onFocus={focusStyle as any}
                        onBlur={blurStyle as any}
                      >
                        <option value="">Select role…</option>
                        {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <span className="sel-arrow">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                    </div>
                  </Field>
                </div>

                {/* Location + Vacancies */}
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                  <Field label="Location" icon={<MapPin style={{ width: 15, height: 15 }} />}>
                    <input
                      value={job.location}
                      onChange={e => set(i, 'location', e.target.value)}
                      placeholder="e.g. Hyderabad / Remote"
                      style={{ ...inputBase, paddingLeft: 36 }}
                      onFocus={focusStyle as any}
                      onBlur={blurStyle as any}
                    />
                  </Field>

                  <Field label="No. of Vacancies *" icon={<Users style={{ width: 15, height: 15 }} />}>
                    <input
                      type="number" min="1"
                      value={job.availableJobs}
                      onChange={e => set(i, 'availableJobs', e.target.value)}
                      placeholder="e.g. 5"
                      required
                      style={{ ...inputBase, paddingLeft: 36 }}
                      onFocus={focusStyle as any}
                      onBlur={blurStyle as any}
                    />
                  </Field>
                </div>

                {/* Salary */}
                <Field label="Salary (Optional)" icon={<DollarSign style={{ width: 15, height: 15 }} />}>
                  <input
                    value={job.salary}
                    onChange={e => set(i, 'salary', e.target.value)}
                    placeholder="e.g. ₹8 LPA – ₹12 LPA"
                    style={{ ...inputBase, paddingLeft: 36 }}
                    onFocus={focusStyle as any}
                    onBlur={blurStyle as any}
                  />
                </Field>

                {/* Description */}
                <div>
                  <label style={labelSt}>Job Description</label>
                  <textarea
                    value={job.description}
                    onChange={e => set(i, 'description', e.target.value)}
                    placeholder="Describe responsibilities, requirements, and benefits…"
                    rows={3}
                    style={{ ...inputBase, height: 'auto', padding: '12px 14px', resize: 'vertical', lineHeight: 1.55 } as React.CSSProperties}
                    onFocus={focusStyle as any}
                    onBlur={blurStyle as any}
                  />
                </div>

              </div>
            </div>
          ))}

          {/* error */}
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#FFF1F2', border: '1.5px solid #FECDD3', borderRadius: 12, padding: '10px 14px' }}>
              <AlertCircle style={{ width: 15, height: 15, color: '#F43F5E', flexShrink: 0 }} />
              <span style={{ fontSize: 12.5, fontWeight: 600, color: '#BE123C' }}>{error}</span>
            </div>
          )}

          {/* action row */}
          <div style={{ display: 'flex', gap: 14 }}>
            <button
              type="button" onClick={addJob}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, background: '#fff', color: '#7C3AED', fontWeight: 700, fontSize: 13.5, padding: '13px', borderRadius: 13, border: '2px dashed #C4B5FD', cursor: 'pointer', transition: 'all .18s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#EDE9FE'; e.currentTarget.style.borderColor = '#7C3AED'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#C4B5FD'; }}>
              <Plus style={{ width: 17, height: 17 }} /> Add Another Role
            </button>

            <button
              type="submit" disabled={loading}
              style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'linear-gradient(135deg,#4C1D95,#7C3AED,#A855F7)', color: '#fff', fontWeight: 700, fontSize: 14, padding: '13px', borderRadius: 13, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 6px 20px rgba(124,58,237,0.40)', opacity: loading ? 0.8 : 1, transition: 'transform .15s,box-shadow .15s', position: 'relative', overflow: 'hidden' }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(124,58,237,0.48)'; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(124,58,237,0.40)'; }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 60%)', pointerEvents: 'none' }} />
              {loading
                ? <><Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} /> Posting…</>
                : <><CheckCircle2 style={{ width: 16, height: 16 }} /> Submit All Jobs</>
              }
            </button>
          </div>

          <p style={{ margin: 0, textAlign: 'center', fontSize: 11, color: '#C4B5FD', lineHeight: 1.6 }}>
            Vacancy counts are reflected immediately on the Home Job Board after submission.
          </p>
        </form>
      </div>
    </div>
  );
}