
// import { useState, useRef, useEffect, ChangeEvent, useCallback } from "react";
// import {
//   User, Camera, FileSignature, ArrowLeft, ChevronDown,
//   CalendarDays, ChevronLeft, ChevronRight, AlertCircle, RefreshCw,
//   CheckCircle, Loader2, X, FolderOpen, SwitchCamera,
//   ZoomIn, RotateCcw,
// } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const BASE = "http://192.168.0.6:8000/api";

// const ACADEMIC_API: Record<string, string> = {
//   "SSC":             `${BASE}/vocational/`,
//   "Intermediate":    `${BASE}/intermediate/`,
//   "Polytechnic":     `${BASE}/polytechnic/`,
//   "ITI":             `${BASE}/iti/`,
//   "U.G (Degree)":    `${BASE}/degree/`,
//   "P.G (Degree)":    `${BASE}/degree/`,
//   "U.G(B.Tech/B.E)": `${BASE}/ug/`,
//   "P.G(M.Tech/M.E)": `${BASE}/pg/`,
// };

// const NO_SPEC = new Set(["Below SSC", "SSC"]);
// const HAS_SUBCOURSE = new Set(["U.G (Degree)", "P.G (Degree)"]);
// const NOT_YET = new Set<string>([]);

// const JOB_ROWS = [
//   { field: "coreSpec",   label: "Core Specialization", opt1: "Interest Field 1", opt2: "Interest Field 2" },
//   { field: "technical",  label: "Technical",           opt1: "Interest Field 1", opt2: "Interest Field 2" },
//   { field: "nonTech",    label: "Non-Technical",       opt1: "Interest Field 1", opt2: "Interest Field 2" },
//   { field: "generalCat", label: "General Category",    opt1: "Interest Field 1", opt2: "Interest Field 2" },
//   { field: "jobNature",  label: "Any Job Nature",      opt1: "Interest Field 1", opt2: "Interest Field 2" },
// ];

// /* ═══════════════════════════════════════════════════════════
//    UploadSourceModal
// ═══════════════════════════════════════════════════════════ */
// interface UploadSourceModalProps {
//   open: boolean; label: string;
//   onCamera: () => void; onDevice: () => void; onClose: () => void;
// }
// const UploadSourceModal = ({ open, label, onCamera, onDevice, onClose }: UploadSourceModalProps) => {
//   useEffect(() => {
//     if (!open) return;
//     const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
//     document.addEventListener("keydown", handler);
//     return () => document.removeEventListener("keydown", handler);
//   }, [open, onClose]);
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
//       style={{ backgroundColor: "rgba(15,23,42,0.55)", backdropFilter: "blur(4px)" }}
//       onClick={onClose}>
//       <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-blue-100 w-full max-w-xs p-6 flex flex-col gap-5"
//         onClick={e => e.stopPropagation()}>
//         <button type="button" onClick={onClose}
//           className="absolute top-4 right-4 w-7 h-7 rounded-full bg-blue-50 hover:bg-red-50 border border-blue-100 flex items-center justify-center transition-colors group">
//           <X className="w-3.5 h-3.5 text-blue-400 group-hover:text-red-500" />
//         </button>
//         <div className="flex flex-col gap-1">
//           <span className="text-[10px] font-black tracking-[0.2em] uppercase text-blue-400">Upload</span>
//           <span className="text-base font-black text-slate-800">{label}</span>
//           <span className="text-xs font-semibold text-blue-300">Choose how you'd like to add the image</span>
//         </div>
//         <div className="grid grid-cols-2 gap-3">
//           <button type="button" onClick={() => { onCamera(); onClose(); }}
//             className="flex flex-col items-center justify-center gap-3 py-6 rounded-2xl border-2 border-blue-200 bg-blue-50 hover:border-blue-500 hover:bg-blue-100 transition-all duration-150 group">
//             <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
//               <Camera className="w-6 h-6 text-white" />
//             </div>
//             <div className="flex flex-col items-center gap-0.5">
//               <span className="text-sm font-black text-blue-700">Camera</span>
//               <span className="text-[10px] font-semibold text-blue-400">Take a photo now</span>
//             </div>
//           </button>
//           <button type="button" onClick={() => { onDevice(); onClose(); }}
//             className="flex flex-col items-center justify-center gap-3 py-6 rounded-2xl border-2 border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-blue-50 transition-all duration-150 group">
//             <div className="w-12 h-12 rounded-2xl bg-slate-700 flex items-center justify-center shadow-lg shadow-slate-200 group-hover:scale-105 transition-transform">
//               <FolderOpen className="w-6 h-6 text-white" />
//             </div>
//             <div className="flex flex-col items-center gap-0.5">
//               <span className="text-sm font-black text-slate-700">Device</span>
//               <span className="text-[10px] font-semibold text-slate-400">Browse from files</span>
//             </div>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════════
//    CameraModal
// ═══════════════════════════════════════════════════════════ */
// interface CameraModalProps {
//   open: boolean; label: string;
//   onCapture: (file: File) => void; onClose: () => void;
// }
// const CameraModal = ({ open, label, onCapture, onClose }: CameraModalProps) => {
//   const videoRef  = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const streamRef = useRef<MediaStream | null>(null);
//   const [facing,   setFacing]   = useState<"user" | "environment">("user");
//   const [error,    setError]    = useState<string | null>(null);
//   const [captured, setCaptured] = useState<string | null>(null);
//   const [starting, setStarting] = useState(false);

//   const stopStream = useCallback(() => {
//     streamRef.current?.getTracks().forEach(t => t.stop());
//     streamRef.current = null;
//   }, []);

//   const startCamera = useCallback(async (facingMode: "user" | "environment") => {
//     stopStream(); setError(null); setStarting(true);
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false,
//       });
//       streamRef.current = stream;
//       if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play(); }
//     } catch { setError("Camera access denied. Please allow camera permission in your browser."); }
//     finally { setStarting(false); }
//   }, [stopStream]);

//   useEffect(() => {
//     if (open) { setCaptured(null); startCamera(facing); }
//     else { stopStream(); setCaptured(null); }
//     return stopStream;
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [open]);

//   const switchCamera = async () => {
//     const next = facing === "user" ? "environment" : "user";
//     setFacing(next); setCaptured(null); await startCamera(next);
//   };

//   const takeSnap = () => {
//     const video = videoRef.current; const canvas = canvasRef.current;
//     if (!video || !canvas) return;
//     canvas.width = video.videoWidth || 640; canvas.height = video.videoHeight || 480;
//     const ctx = canvas.getContext("2d"); if (!ctx) return;
//     if (facing === "user") { ctx.translate(canvas.width, 0); ctx.scale(-1, 1); }
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//     setCaptured(canvas.toDataURL("image/jpeg", 0.92)); stopStream();
//   };

//   const retake = () => { setCaptured(null); startCamera(facing); };

//   const usePhoto = () => {
//     if (!canvasRef.current) return;
//     canvasRef.current.toBlob(blob => {
//       if (!blob) return;
//       const file = new File([blob], `${label.replace(/\s+/g, "_")}_${Date.now()}.jpg`, { type: "image/jpeg" });
//       onCapture(file); onClose();
//     }, "image/jpeg", 0.92);
//   };

//   useEffect(() => {
//     if (!open) return;
//     const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
//     document.addEventListener("keydown", handler);
//     return () => document.removeEventListener("keydown", handler);
//   }, [open, onClose]);

//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-[110] flex items-center justify-center p-4"
//       style={{ backgroundColor: "rgba(5,10,24,0.82)", backdropFilter: "blur(6px)" }}>
//       <div className="relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl w-full max-w-lg border border-slate-700">
//         <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800">
//           <div className="flex items-center gap-2.5">
//             <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
//               <Camera className="w-4 h-4 text-white" />
//             </div>
//             <div>
//               <span className="text-sm font-black text-white tracking-wide">{label}</span>
//               <span className="ml-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
//                 {facing === "user" ? "Front cam" : "Rear cam"}
//               </span>
//             </div>
//           </div>
//           <button type="button" onClick={onClose}
//             className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-red-900/60 flex items-center justify-center transition-colors">
//             <X className="w-4 h-4 text-slate-400" />
//           </button>
//         </div>
//         <div className="relative bg-black aspect-video flex items-center justify-center overflow-hidden">
//           {error ? (
//             <div className="flex flex-col items-center gap-3 px-8 text-center">
//               <AlertCircle className="w-10 h-10 text-red-400" />
//               <p className="text-sm font-bold text-red-300">{error}</p>
//               <button type="button" onClick={() => startCamera(facing)}
//                 className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-black">
//                 <RefreshCw className="w-3.5 h-3.5" /> Retry
//               </button>
//             </div>
//           ) : captured ? (
//             <img src={captured} alt="Captured" className="w-full h-full object-cover" />
//           ) : (
//             <>
//               <video ref={videoRef} className="w-full h-full object-cover"
//                 style={{ transform: facing === "user" ? "scaleX(-1)" : "none" }} muted playsInline />
//               {starting && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-black/60">
//                   <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
//                 </div>
//               )}
//               {!starting && (
//                 <div className="absolute inset-0 pointer-events-none">
//                   <div className="absolute inset-8 rounded-xl border border-white/10" />
//                   {(["top-8 left-8","top-8 right-8","bottom-8 left-8","bottom-8 right-8"] as const).map((pos, i) => (
//                     <div key={i} className={`absolute w-5 h-5 ${pos} border-blue-400
//                       ${i === 0 ? "border-t-2 border-l-2 rounded-tl" : ""}
//                       ${i === 1 ? "border-t-2 border-r-2 rounded-tr" : ""}
//                       ${i === 2 ? "border-b-2 border-l-2 rounded-bl" : ""}
//                       ${i === 3 ? "border-b-2 border-r-2 rounded-br" : ""}`} />
//                   ))}
//                 </div>
//               )}
//             </>
//           )}
//           <canvas ref={canvasRef} className="hidden" />
//         </div>
//         <div className="px-5 py-4 bg-slate-900 flex items-center justify-between gap-3">
//           {captured ? (
//             <>
//               <button type="button" onClick={retake}
//                 className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold border border-slate-700 transition-colors">
//                 <RotateCcw className="w-4 h-4" /> Retake
//               </button>
//               <button type="button" onClick={usePhoto}
//                 className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-black transition-colors shadow-lg shadow-blue-900/40">
//                 <ZoomIn className="w-4 h-4" /> Use this photo
//               </button>
//             </>
//           ) : (
//             <>
//               <button type="button" onClick={switchCamera} disabled={!!error || starting}
//                 className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center transition-colors disabled:opacity-40"
//                 title="Switch camera">
//                 <SwitchCamera className="w-5 h-5 text-slate-300" />
//               </button>
//               <button type="button" onClick={takeSnap} disabled={!!error || starting}
//                 className="w-16 h-16 rounded-full border-4 border-white bg-white/10 hover:bg-white/20 active:scale-90 transition-all flex items-center justify-center shadow-xl disabled:opacity-40">
//                 <div className="w-11 h-11 rounded-full bg-white" />
//               </button>
//               <div className="w-11 h-11" />
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════════
//    ImageUpload
// ═══════════════════════════════════════════════════════════ */
// interface ImageUploadProps {
//   label: string; value: File | null; onChange: (file: File | null) => void;
//   height?: string; compact?: boolean;
// }
// const ImageUpload = ({ label, value, onChange, height = "h-28", compact = false }: ImageUploadProps) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [preview,    setPreview]    = useState<string | null>(null);
//   const [sourceOpen, setSourceOpen] = useState(false);
//   const [cameraOpen, setCameraOpen] = useState(false);

//   useEffect(() => {
//     if (!value) { setPreview(null); return; }
//     const url = URL.createObjectURL(value);
//     setPreview(url);
//     return () => URL.revokeObjectURL(url);
//   }, [value]);

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] ?? null; onChange(file); e.target.value = "";
//   };
//   const handleClear = (e: React.MouseEvent) => { e.stopPropagation(); onChange(null); };

//   return (
//     <>
//       <div className="flex flex-col gap-1.5">
//         <label className={`font-black tracking-widest uppercase text-blue-500 ${compact ? "text-[10px]" : "text-xs"}`}>{label}</label>
//         <div onClick={() => setSourceOpen(true)}
//           className={`relative flex flex-col items-center justify-center gap-2 w-full ${height} rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer group overflow-hidden
//             ${preview ? "border-blue-400 bg-blue-50" : "border-blue-200 bg-blue-50 hover:border-blue-500 hover:bg-blue-100"}`}>
//           {preview ? (
//             <>
//               <img src={preview} alt={label} className="absolute inset-0 w-full h-full object-cover" />
//               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all flex flex-col items-center justify-center gap-1.5">
//                 <Camera className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
//                 <span className="text-white text-[10px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Change</span>
//               </div>
//               <button type="button" onClick={handleClear}
//                 className="absolute top-1.5 right-1.5 z-10 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-md transition-colors">
//                 <X className="w-3 h-3 text-white" />
//               </button>
//             </>
//           ) : (
//             <div className="flex flex-col items-center gap-2 pointer-events-none select-none">
//               <Camera className={`text-blue-300 group-hover:text-blue-500 transition-colors ${compact ? "w-4 h-4" : "w-6 h-6"}`} />
//               <span className={`font-black tracking-widest uppercase text-blue-300 group-hover:text-blue-500 ${compact ? "text-[9px]" : "text-[10px]"}`}>{label}</span>
//               <div className="flex items-center gap-1.5">
//                 <span className="flex items-center gap-1 text-[9px] font-bold text-blue-400 bg-blue-100 group-hover:bg-blue-200 px-2 py-0.5 rounded-full transition-all">
//                   <Camera className="w-2.5 h-2.5" /> Camera
//                 </span>
//                 <span className="flex items-center gap-1 text-[9px] font-bold text-blue-400 bg-blue-100 group-hover:bg-blue-200 px-2 py-0.5 rounded-full transition-all">
//                   <FolderOpen className="w-2.5 h-2.5" /> Device
//                 </span>
//               </div>
//             </div>
//           )}
//         </div>
//         {value && (
//           <span className="text-[10px] font-bold text-emerald-600 truncate">
//             ✓ {value.name.length > 24 ? value.name.slice(0, 22) + "…" : value.name}
//           </span>
//         )}
//       </div>
//       <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
//       <UploadSourceModal open={sourceOpen} label={label} onClose={() => setSourceOpen(false)}
//         onCamera={() => { setSourceOpen(false); setCameraOpen(true); }}
//         onDevice={() => { setSourceOpen(false); fileInputRef.current?.click(); }} />
//       <CameraModal open={cameraOpen} label={label} onClose={() => setCameraOpen(false)}
//         onCapture={file => { onChange(file); setCameraOpen(false); }} />
//     </>
//   );
// };

// /* ═══════════════════════════════════════════════════════════
//    SignatureUpload
// ═══════════════════════════════════════════════════════════ */
// interface SignatureUploadProps { value: File | null; onChange: (file: File | null) => void; }
// const SignatureUpload = ({ value, onChange }: SignatureUploadProps) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [preview,    setPreview]    = useState<string | null>(null);
//   const [sourceOpen, setSourceOpen] = useState(false);
//   const [cameraOpen, setCameraOpen] = useState(false);

//   useEffect(() => {
//     if (!value) { setPreview(null); return; }
//     const url = URL.createObjectURL(value);
//     setPreview(url);
//     return () => URL.revokeObjectURL(url);
//   }, [value]);

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] ?? null; onChange(file); e.target.value = "";
//   };
//   const handleClear = (e: React.MouseEvent) => { e.stopPropagation(); onChange(null); };

//   return (
//     <>
//       <div className="flex flex-col gap-2 items-end w-full sm:w-64">
//         <span className="text-xs font-black tracking-widest uppercase text-blue-400">Digital Signature</span>
//         <div onClick={() => setSourceOpen(true)}
//           className={`relative flex items-center justify-center gap-2.5 h-14 w-full rounded-2xl cursor-pointer border-2 border-dashed transition-all overflow-hidden group
//             ${preview ? "border-blue-400 bg-blue-50" : "border-blue-200 bg-blue-50 hover:border-blue-500 hover:bg-blue-100"}`}>
//           {preview ? (
//             <>
//               <img src={preview} alt="Signature" className="absolute inset-0 w-full h-full object-contain p-1.5" />
//               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all flex items-center justify-center">
//                 <span className="text-white text-[10px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Change</span>
//               </div>
//               <button type="button" onClick={handleClear}
//                 className="absolute top-1 right-1 z-10 w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-md transition-colors">
//                 <X className="w-2.5 h-2.5 text-white" />
//               </button>
//             </>
//           ) : (
//             <>
//               <FileSignature className="w-4 h-4 text-blue-300 group-hover:text-blue-600 shrink-0 transition-colors" />
//               <span className="text-sm font-bold text-blue-300 group-hover:text-blue-600">Sign here</span>
//               <div className="flex items-center gap-1">
//                 <span className="flex items-center gap-0.5 text-[9px] font-bold text-blue-300 bg-blue-100 px-1.5 py-0.5 rounded-full">
//                   <Camera className="w-2 h-2" /> Cam
//                 </span>
//                 <span className="flex items-center gap-0.5 text-[9px] font-bold text-blue-300 bg-blue-100 px-1.5 py-0.5 rounded-full">
//                   <FolderOpen className="w-2 h-2" /> File
//                 </span>
//               </div>
//             </>
//           )}
//         </div>
//         {value && <span className="text-[10px] font-bold text-emerald-500">Signature uploaded ✓</span>}
//       </div>
//       <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
//       <UploadSourceModal open={sourceOpen} label="Digital Signature" onClose={() => setSourceOpen(false)}
//         onCamera={() => { setSourceOpen(false); setCameraOpen(true); }}
//         onDevice={() => { setSourceOpen(false); fileInputRef.current?.click(); }} />
//       <CameraModal open={cameraOpen} label="Digital Signature" onClose={() => setCameraOpen(false)}
//         onCapture={file => { onChange(file); setCameraOpen(false); }} />
//     </>
//   );
// };

// /* ═══════════════════════════════════════════════════════════
//    Field
// ═══════════════════════════════════════════════════════════ */
// interface FieldProps {
//   label: string; field: string; value: string;
//   onChange: (field: string, val: string) => void;
//   type?: string; placeholder?: string; className?: string;
// }
// const Field = ({ label, field, value, onChange, type = "text", placeholder, className = "" }: FieldProps) => (
//   <div className={`flex flex-col gap-1.5 ${className}`}>
//     <label className="text-xs font-black tracking-widest uppercase text-blue-500">{label}</label>
//     <input type={type} placeholder={placeholder ?? label} value={value}
//       onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(field, e.target.value)}
//       className="h-11 w-full rounded-xl border-2 border-blue-100 bg-blue-50 px-4 text-base font-semibold text-slate-800 placeholder:text-blue-200 transition-all duration-150 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" />
//   </div>
// );

// /* ═══════════════════════════════════════════════════════════
//    Dropdown
// ═══════════════════════════════════════════════════════════ */
// interface DropdownProps {
//   label: string; field: string; value: string;
//   onChange: (field: string, val: string) => void;
//   options?: string[]; className?: string;
// }
// const Dropdown = ({ label, field, value, onChange, options = [], className = "" }: DropdownProps) => (
//   <div className={`flex flex-col gap-1.5 ${className}`}>
//     <label className="text-xs font-black tracking-widest uppercase text-blue-500">{label}</label>
//     <div className="relative">
//       <select value={value} onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(field, e.target.value)}
//         className="h-11 w-full appearance-none rounded-xl border-2 border-blue-100 bg-blue-50 pl-4 pr-10 text-base font-semibold text-slate-800 cursor-pointer transition-all duration-150 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100">
//         <option value="">Select…</option>
//         {options.map((o) => <option key={o} value={o}>{o}</option>)}
//       </select>
//       <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
//     </div>
//   </div>
// );

// /* ═══════════════════════════════════════════════════════════
//    SpecField
// ═══════════════════════════════════════════════════════════ */
// interface SpecFieldProps { academic: string; value: string; onChange: (f: string, v: string) => void; }
// const SpecField = ({ academic, value, onChange }: SpecFieldProps) => {
//   const [options, setOptions] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error,   setError]   = useState<string | null>(null);
//   const cache = useRef<Record<string, string[]>>({});

//   const fetchOptions = async (ac: string) => {
//     const url = ACADEMIC_API[ac];
//     if (!url) return;
//     if (cache.current[ac]) { setOptions(cache.current[ac]); return; }
//     setLoading(true); setError(null); setOptions([]);
//     try {
//       const res  = await fetch(url);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const data = await res.json();
//       const specs: string[] = Array.isArray(data)
//         ? [...new Set<string>(data.map((item: { specialization: string }) => item.specialization))]
//         : [];
//       cache.current[ac] = specs;
//       setOptions(specs);
//     } catch { setError("Could not load options."); setOptions([]); }
//     finally   { setLoading(false); }
//   };

//   useEffect(() => {
//     setOptions([]); setError(null); onChange("specialization", "");
//     if (academic && ACADEMIC_API[academic]) fetchOptions(academic);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [academic]);

//   if (!academic || NO_SPEC.has(academic)) return null;
//   if (NOT_YET.has(academic)) return (
//     <div className="flex flex-col gap-1.5">
//       <label className="text-xs font-black tracking-widest uppercase text-blue-500">Specialization</label>
//       <div className="h-11 rounded-xl border-2 border-dashed border-blue-100 bg-blue-50 flex items-center px-4">
//         <span className="text-sm font-semibold text-blue-300 italic">Not applicable for {academic}</span>
//       </div>
//     </div>
//   );
//   if (!ACADEMIC_API[academic]) return null;

//   return (
//     <div className="flex flex-col gap-1.5">
//       <label className="text-xs font-black tracking-widest uppercase text-blue-500">Specialization</label>
//       <div className="relative">
//         <select value={value} disabled={loading || !!error}
//           onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange("specialization", e.target.value)}
//           className="h-11 w-full appearance-none rounded-xl border-2 border-blue-100 bg-blue-50 pl-4 pr-10 text-base font-semibold text-slate-800 cursor-pointer transition-all duration-150 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:opacity-60 disabled:cursor-not-allowed">
//           <option value="">{loading ? "Loading…" : error ? "Failed to load" : "Select…"}</option>
//           {options.map((o) => <option key={o} value={o}>{o}</option>)}
//         </select>
//         {loading
//           ? <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-blue-500" viewBox="0 0 24 24" fill="none">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//             </svg>
//           : <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
//         }
//       </div>
//       {error && (
//         <div className="flex items-center gap-2 mt-0.5">
//           <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
//           <span className="text-xs text-red-500 font-bold">{error}</span>
//           <button type="button" onClick={() => { delete cache.current[academic]; fetchOptions(academic); }}
//             className="ml-auto flex items-center gap-1 text-xs font-bold text-blue-500 hover:text-blue-700 transition-colors">
//             <RefreshCw className="w-3 h-3" /> Retry
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════════
//    SubCourseField
// ═══════════════════════════════════════════════════════════ */
// interface SubCourseFieldProps {
//   academic: string;
//   specialization: string;
//   value: string;
//   onChange: (f: string, v: string) => void;
// }
// const SubCourseField = ({ academic, specialization, value, onChange }: SubCourseFieldProps) => {
//   const [allData,  setAllData]  = useState<{ specialization: string; sub_course: string }[]>([]);
//   const [options,  setOptions]  = useState<string[]>([]);
//   const [loading,  setLoading]  = useState(false);
//   const [error,    setError]    = useState<string | null>(null);
//   const cache = useRef<{ specialization: string; sub_course: string }[] | null>(null);

//   const fetchData = async () => {
//     const url = ACADEMIC_API[academic];
//     if (!url) return;
//     if (cache.current) { setAllData(cache.current); return; }
//     setLoading(true); setError(null);
//     try {
//       const res  = await fetch(url);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const data = await res.json();
//       cache.current = Array.isArray(data) ? data : [];
//       setAllData(cache.current);
//     } catch { setError("Could not load sub-courses."); }
//     finally   { setLoading(false); }
//   };

//   useEffect(() => {
//     cache.current = null;
//     setAllData([]); setOptions([]); setError(null);
//     onChange("subCourse", "");
//     if (academic && HAS_SUBCOURSE.has(academic)) fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [academic]);

//   useEffect(() => {
//     onChange("subCourse", "");
//     if (!specialization) {
//       const all = [...new Set<string>(allData.map(d => d.sub_course).filter(Boolean))];
//       setOptions(all);
//     } else {
//       const filtered = [
//         ...new Set<string>(
//           allData
//             .filter(d => d.specialization === specialization)
//             .map(d => d.sub_course)
//             .filter(Boolean)
//         ),
//       ];
//       setOptions(filtered);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [specialization, allData]);

//   if (!academic || !HAS_SUBCOURSE.has(academic)) return null;

//   return (
//     <div className="flex flex-col gap-1.5">
//       <label className="text-xs font-black tracking-widest uppercase text-blue-500">Sub Course</label>
//       <div className="relative">
//         <select value={value} disabled={loading || !!error}
//           onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange("subCourse", e.target.value)}
//           className="h-11 w-full appearance-none rounded-xl border-2 border-blue-100 bg-blue-50 pl-4 pr-10 text-base font-semibold text-slate-800 cursor-pointer transition-all duration-150 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:opacity-60 disabled:cursor-not-allowed">
//           <option value="">{loading ? "Loading…" : error ? "Failed to load" : "Select…"}</option>
//           {options.map((o) => <option key={o} value={o}>{o}</option>)}
//         </select>
//         {loading
//           ? <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-blue-500" viewBox="0 0 24 24" fill="none">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//             </svg>
//           : <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
//         }
//       </div>
//       {error && (
//         <div className="flex items-center gap-2 mt-0.5">
//           <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
//           <span className="text-xs text-red-500 font-bold">{error}</span>
//           <button type="button" onClick={() => { cache.current = null; fetchData(); }}
//             className="ml-auto flex items-center gap-1 text-xs font-bold text-blue-500 hover:text-blue-700 transition-colors">
//             <RefreshCw className="w-3 h-3" /> Retry
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════════
//    Divider
// ═══════════════════════════════════════════════════════════ */
// const Divider = ({ label }: { label: string }) => (
//   <div className="flex items-center gap-3 my-6">
//     <div className="h-px flex-1 bg-blue-100" />
//     <span className="text-[10px] font-black tracking-[0.25em] uppercase text-blue-400 px-2 bg-blue-50 border border-blue-100 rounded-full py-0.5">{label}</span>
//     <div className="h-px flex-1 bg-blue-100" />
//   </div>
// );

// /* ═══════════════════════════════════════════════════════════
//    DOB Picker
// ═══════════════════════════════════════════════════════════ */
// const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// interface DOBPickerProps { dob_d: string; dob_m: string; dob_y: string; onChange: (f: string, v: string) => void; }
// const DOBPicker = ({ dob_d, dob_m, dob_y, onChange }: DOBPickerProps) => {
//   const [open,     setOpen]     = useState(false);
//   const [calYear,  setCalYear]  = useState(() => { const y = parseInt(dob_y); return isNaN(y) ? new Date().getFullYear() - 20 : y; });
//   const [calMonth, setCalMonth] = useState(() => { const m = parseInt(dob_m); return isNaN(m) ? 0 : m - 1; });
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
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
//   const firstDay    = new Date(calYear, calMonth, 1).getDay();

//   const selectDay = (day: number) => {
//     onChange("dob_d", String(day).padStart(2, "0"));
//     onChange("dob_m", String(calMonth + 1).padStart(2, "0"));
//     onChange("dob_y", String(calYear));
//     setOpen(false);
//   };

//   const inputCls = "h-11 rounded-xl border-2 border-blue-100 bg-blue-50 text-center text-base font-semibold text-slate-800 placeholder:text-blue-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all";

//   return (
//     <div className="flex flex-col gap-1.5">
//       <div className="flex items-center justify-between">
//         <label className="text-xs font-black tracking-widest uppercase text-blue-500">Date of Birth</label>
//         {age !== null && (
//           <span className="text-xs font-black tracking-wide text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">{age} yrs</span>
//         )}
//       </div>
//       <div className="relative" ref={ref}>
//         <div className="flex gap-1.5 items-center">
//           <input placeholder="DD" value={dob_d} maxLength={2}
//             onChange={e => onChange("dob_d", e.target.value.replace(/\D/g, "").slice(0, 2))}
//             className={`${inputCls} w-14`} />
//           <input placeholder="MM" value={dob_m} maxLength={2}
//             onChange={e => {
//               const v = e.target.value.replace(/\D/g, "").slice(0, 2);
//               onChange("dob_m", v);
//               if (parseInt(v) >= 1 && parseInt(v) <= 12) setCalMonth(parseInt(v) - 1);
//             }}
//             className={`${inputCls} w-10`} />
//           <input placeholder="YYYY" value={dob_y} maxLength={4}
//   onChange={e => {
//     const v = e.target.value.replace(/\D/g, "").slice(0, 4);
//     onChange("dob_y", v);
//     if (v.length === 4) setCalYear(parseInt(v));
//   }}
//   className={`${inputCls} w-20`}
// />
//           <button type="button" onClick={() => setOpen(o => !o)}
//             className="h-11 w-11 shrink-0 flex items-center justify-center rounded-xl border-2 border-blue-100 bg-blue-50 hover:border-blue-500 hover:bg-blue-100 transition-all">
//             <CalendarDays className="w-5 h-5 text-blue-400" />
//           </button>
//         </div>
//         {open && (
//           <div className="absolute top-13 left-0 z-50 bg-white rounded-2xl border-2 border-blue-100 shadow-2xl shadow-blue-100 p-4 w-72 mt-1"
//             style={{ maxWidth: "calc(100vw - 32px)" }}>
//             <div className="flex items-center justify-between mb-3">
//               <button type="button"
//                 onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); }}
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
//               <button type="button"
//                 onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); }}
//                 className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-100">
//                 <ChevronRight className="w-4 h-4 text-blue-500" />
//               </button>
//             </div>
//             <div className="grid grid-cols-7 mb-1">
//               {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
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
//    Aadhar Field
// ═══════════════════════════════════════════════════════════ */
// const AadharField = ({ value, onChange }: { value: string; onChange: (f: string, v: string) => void }) => {
//   const format   = (raw: string) => raw.replace(/\D/g, "").slice(0, 12).replace(/(\d{4})(?=\d)/g, "$1-");
//   const digits   = value.replace(/-/g, "");
//   const complete = digits.length === 12;
//   return (
//     <div className="flex flex-col gap-1.5">
//       <div className="flex items-center justify-between">
//         <label className="text-xs font-black tracking-widest uppercase text-blue-500">Aadhar No.</label>
//         <span className={`text-xs font-bold tracking-wide px-2 py-0.5 rounded-full transition-all border ${complete ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-blue-300 bg-blue-50 border-blue-100"}`}>
//           {digits.length}/12
//         </span>
//       </div>
//       <input value={value} onChange={e => onChange("aadharNo", format(e.target.value))}
//         placeholder="XXXX-XXXX-XXXX" maxLength={14}
//         className="h-11 w-full rounded-xl border-2 border-blue-100 bg-blue-50 px-4 text-base font-bold text-slate-800 placeholder:text-blue-200 font-mono tracking-widest transition-all duration-150 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" />
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════════
//    Experience Field
// ═══════════════════════════════════════════════════════════ */
// const ExperienceField = ({ years, months, onChange }: { years: string; months: string; onChange: (f: string, v: string) => void }) => (
//   <div className="flex flex-col gap-1.5">
//     <label className="text-xs font-black tracking-widest uppercase text-blue-500">Experience</label>
//     <div className="flex gap-2">
//       <div className="relative flex-1">
//         <select value={years} onChange={e => onChange("experienceYears", e.target.value)}
//           className="h-11 w-full appearance-none rounded-xl border-2 border-blue-100 bg-blue-50 pl-4 pr-8 text-base font-semibold text-slate-800 cursor-pointer transition-all focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100">
//           <option value="">Yrs</option>
//           {["Fresher","1","2","3","4","5","6","7","8","9","10","10+"].map(o => (
//             <option key={o} value={o}>{o === "Fresher" ? "Fresher" : `${o} yr${o === "1" ? "" : "s"}`}</option>
//           ))}
//         </select>
//         <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
//       </div>
//       <div className="relative flex-1">
//         <select value={months} onChange={e => onChange("experienceMonths", e.target.value)}
//           className="h-11 w-full appearance-none rounded-xl border-2 border-blue-100 bg-blue-50 pl-4 pr-8 text-base font-semibold text-slate-800 cursor-pointer transition-all focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100">
//           <option value="">Mos</option>
//           {["0","1","2","3","4","5","6","7","8","9","10","11"].map(o => (
//             <option key={o} value={o}>{o} mo{o === "1" ? "" : "s"}</option>
//           ))}
//         </select>
//         <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
//       </div>
//     </div>
//   </div>
// );

// /* ═══════════════════════════════════════════════════════════
//    JobRow
// ═══════════════════════════════════════════════════════════ */
// interface JobRowProps {
//   label: string; opt1: string; opt2: string;
//   checked: boolean; val1: string; val2: string;
//   onCheck: () => void; onVal1: (v: string) => void; onVal2: (v: string) => void;
// }
// const JobRow = ({ label, opt1, opt2, checked, val1, val2, onCheck, onVal1, onVal2 }: JobRowProps) => (
//   <div className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${checked ? "border-blue-400 bg-blue-50 shadow-md shadow-blue-100" : "border-blue-100 bg-white hover:border-blue-200"}`}>
//     <label className="flex items-center gap-3 px-4 py-3.5 cursor-pointer select-none">
//       <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all duration-150 ${checked ? "bg-blue-600 border-blue-600 shadow-md shadow-blue-200" : "border-blue-200 bg-white"}`}
//         onClick={onCheck}>
//         {checked && (
//           <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 12 12" fill="none">
//             <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//         )}
//       </div>
//       <span className="text-sm font-bold text-slate-700" onClick={onCheck}>{label}</span>
//     </label>
//     {checked && (
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-4 pb-4">
//         <div className="flex flex-col gap-1.5">
//           <label className="text-[10px] font-black tracking-widest uppercase text-blue-500">{opt1}</label>
//           <input value={val1} onChange={e => onVal1(e.target.value)} placeholder={opt1}
//             className="h-10 w-full rounded-xl border-2 border-blue-200 bg-white px-3 text-sm font-semibold text-slate-800 placeholder:text-blue-200 transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
//         </div>
//         <div className="flex flex-col gap-1.5">
//           <label className="text-[10px] font-black tracking-widest uppercase text-blue-500">{opt2}</label>
//           <input value={val2} onChange={e => onVal2(e.target.value)} placeholder={opt2}
//             className="h-10 w-full rounded-xl border-2 border-blue-200 bg-white px-3 text-sm font-semibold text-slate-800 placeholder:text-blue-200 transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
//         </div>
//       </div>
//     )}
//   </div>
// );

// /* ═══════════════════════════════════════════════════════════
//    Card
// ═══════════════════════════════════════════════════════════ */
// const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
//   <div className={`bg-white rounded-3xl border-2 border-blue-100 shadow-lg shadow-blue-50 overflow-hidden ${className}`}>
//     {children}
//   </div>
// );
// const CardHeader = ({ icon, title, badge }: { icon?: React.ReactNode; title: string; badge?: string }) => (
//   <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b-2 border-blue-50 bg-gradient-to-r from-blue-50 to-white">
//     {icon && (
//       <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200 shrink-0">{icon}</div>
//     )}
//     <span className="text-sm font-black tracking-widest uppercase text-blue-700">{title}</span>
//     {badge && (
//       <span className="ml-auto text-[10px] font-black tracking-widest uppercase text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">{badge}</span>
//     )}
//   </div>
// );

// /* ═══════════════════════════════════════════════════════════
//    Form initial state
// ═══════════════════════════════════════════════════════════ */
// const INIT = {
//   hrName: "", idNo: "", password: "", loginsCount: "",
//   percentageObtained: "", successRate: "",
//   surname: "", name: "", dob_d: "", dob_m: "", dob_y: "",
//   regnNo: "", date: "", fatherMotherName: "",
//   academic: "", specialization: "", subCourse: "", extraCurricular: "", pincode: "",
//   additionalQualification: "", drivingLicence: "",
//   aadharNo: "", mobilePersonal: "", mobileReference: "",
//   hNo: "", streetColony: "", area: "", district: "",
//   houseOwnRent: "", email: "", reservation: "",
//   height: "", weight: "", eyeSite: "", bloodGroup: "", anyJob: "",
//   experienceYears: "", experienceMonths: "",
//   companyName: "", designation: "", lastSalary: "",
//   reasonLeaving: "", jobType: "", techStack: "",
//   coreSpec_checked:   false, coreSpec_v1:   "", coreSpec_v2:   "",
//   technical_checked:  false, technical_v1:  "", technical_v2:  "",
//   nonTech_checked:    false, nonTech_v1:    "", nonTech_v2:    "",
//   generalCat_checked: false, generalCat_v1: "", generalCat_v2: "",
//   jobNature_checked:  false, jobNature_v1:  "", jobNature_v2:  "",
// };
// type F = typeof INIT;

// const buildDOB = (d: string, m: string, y: string): string | null => {
//   if (!d || !m || !y || y.length < 4) return null;
//   return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
// };

// /* ═══════════════════════════════════════════════════════════
//    Build multipart FormData
// ═══════════════════════════════════════════════════════════ */
// const buildFormData = (form: F, hrPhoto: File | null, studentPhoto: File | null, signature: File | null): FormData => {
//   const fd = new FormData();
//   const a  = (key: string, val: string | null | undefined) => { if (val) fd.append(key, val); };
//   const ab = (key: string, val: boolean) => fd.append(key, String(val));

//   const hrId = localStorage.getItem("hr_id");
//   if (hrId) fd.append("hr_id", hrId);

//   a("hr_name", form.hrName);          a("id_no", form.idNo);
//   a("password", form.password);
//   if (form.loginsCount)        fd.append("logins_count",        form.loginsCount);
//   if (form.percentageObtained) fd.append("percentage_obtained", form.percentageObtained);
//   if (form.successRate)        fd.append("success_rate",        form.successRate);
//   a("surname", form.surname);         a("name", form.name);
//   a("father_mother_name", form.fatherMotherName);
//   const dob = buildDOB(form.dob_d, form.dob_m, form.dob_y);
//   if (dob) fd.append("dob", dob);
//   a("regn_no", form.regnNo);          a("date", form.date);
//   a("academic", form.academic);       a("specialization", form.specialization);
//   a("sub_course", form.subCourse);
//   a("extra_curricular", form.extraCurricular);
//   a("additional_qualification", form.additionalQualification);
//   a("driving_licence", form.drivingLicence);
//   a("aadhar_no", form.aadharNo);
//   a("mobile_personal", form.mobilePersonal);
//   a("mobile_reference", form.mobileReference);
//   a("h_no", form.hNo);               a("street_colony", form.streetColony);
//   a("area", form.area);              a("district", form.district);
//   a("house_own_rent", form.houseOwnRent);
//   a("pincode", form.pincode);
//   a("email", form.email);            a("reservation", form.reservation);
//   if (form.height) fd.append("height", form.height);
//   if (form.weight) fd.append("weight", form.weight);
//   a("eye_site", form.eyeSite);       a("blood_group", form.bloodGroup);
//   a("any_job", form.anyJob);
//   a("experience_years", form.experienceYears);
//   a("experience_months", form.experienceMonths);
//   a("company_name", form.companyName);
//   a("designation", form.designation);
//   a("last_salary", form.lastSalary);
//   a("reason_leaving", form.reasonLeaving);
//   a("job_type", form.jobType);       a("tech_stack", form.techStack);
//   ab("core_spec_checked",   form.coreSpec_checked);
//   a("core_spec_v1",         form.coreSpec_v1); a("core_spec_v2", form.coreSpec_v2);
//   ab("technical_checked",   form.technical_checked);
//   a("technical_v1",         form.technical_v1); a("technical_v2", form.technical_v2);
//   ab("non_tech_checked",    form.nonTech_checked);
//   a("non_tech_v1",          form.nonTech_v1); a("non_tech_v2", form.nonTech_v2);
//   ab("general_cat_checked", form.generalCat_checked);
//   a("general_cat_v1",       form.generalCat_v1); a("general_cat_v2", form.generalCat_v2);
//   ab("job_nature_checked",  form.jobNature_checked);
//   a("job_nature_v1",        form.jobNature_v1); a("job_nature_v2", form.jobNature_v2);

//   if (hrPhoto)      fd.append("hr_photo",          hrPhoto,      hrPhoto.name);
//   if (studentPhoto) fd.append("photo",             studentPhoto, studentPhoto.name);
//   if (signature)    fd.append("digital_signature", signature,    signature.name);

//   return fd;
// };

// /* ═══════════════════════════════════════════════════════════
//    Main Component
// ═══════════════════════════════════════════════════════════ */
// const StudentProfile = () => {
//   const [form,         setForm]         = useState<F>(INIT);
//   const [hrPhoto,      setHrPhoto]      = useState<File | null>(null);
//   const [studentPhoto, setStudentPhoto] = useState<File | null>(null);
//   const [signature,    setSignature]    = useState<File | null>(null);
//   const [submitting,   setSubmitting]   = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
//   const [errorMsg,     setErrorMsg]     = useState<string>("");
//   const navigate = useNavigate();

//   const set = (field: string, val: string | boolean) =>
//     setForm(p => ({ ...p, [field]: val }));
//   const v  = (k: keyof F) => form[k] as string;
//   const vb = (k: keyof F) => form[k] as boolean;

//   const showSpec      = !!form.academic && !NO_SPEC.has(form.academic);
//   const showSubCourse = HAS_SUBCOURSE.has(form.academic);

//   const qualColCount = [true, showSpec, showSubCourse].filter(Boolean).length;
//   const qualGridCls  = qualColCount === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : qualColCount === 2 ? "sm:grid-cols-2" : "grid-cols-1";

//   const handleSubmit = async () => {
//     setSubmitting(true); setSubmitStatus("idle"); setErrorMsg("");
//     try {
//       const fd = buildFormData(form, hrPhoto, studentPhoto, signature);
//       const res = await fetch(`${BASE}/students/`, { method: "POST", body: fd });
//       if (!res.ok) {
//         const errData = await res.json().catch(() => ({}));
//         const messages = Object.entries(errData)
//           .map(([k, v]) => `${k}: ${Array.isArray(v) ? v[0] : v}`)
//           .join(" | ");
//         throw new Error(messages || `Server error ${res.status}`);
//       }
//       const created = await res.json();
//       setSubmitStatus("success");
//       setTimeout(() => {
//         navigate("/assignment", {
//           state: {
//             studentId: created.id,
//             name:      `${form.name} ${form.surname}`.trim() || "Candidate",
//             regnNo:    form.regnNo || "—",
//           },
//         });
//       }, 1200);
//     } catch (err: unknown) {
//       setSubmitStatus("error");
//       setErrorMsg(err instanceof Error ? err.message : "Submission failed.");
//     } finally { setSubmitting(false); }
//   };

//   useEffect(() => {
//     const hrId = localStorage.getItem("hr_id");
//     if (!hrId) return;
//     axios.get(`http://127.0.0.1:8000/api/hr/${hrId}/`)
//       .then((res) => {
//         set("hrName", `${res.data.first_name} ${res.data.last_name}`);
//         set("idNo", res.data.hr_id);
//       })
//       .catch((err) => { console.log(err); });
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50"
//       style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
//         * { box-sizing: border-box; }
//       `}</style>

//       {/* Navbar */}
//       <nav className="sticky top-0 z-30 h-14 sm:h-16 bg-white/95 backdrop-blur-md border-b-2 border-blue-100 shadow-sm shadow-blue-50">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-2">
//           <Link to="/hr/dashboard" className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-600 transition-colors shrink-0">
//             <ArrowLeft className="w-4 h-4" />
//             <span className="hidden sm:inline">Back</span>
//           </Link>
//           <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
//             <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-200 shrink-0">
//               <User className="w-4 h-4 text-white" />
//             </div>
//             <span className="text-sm sm:text-base font-black tracking-tight text-blue-900 truncate">Candidate Enrollment</span>
//           </div>
//           <span className="text-[10px] font-black tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-200 px-2 sm:px-3 py-1 rounded-full shrink-0">Form</span>
//         </div>
//       </nav>

//       <main className="max-w-5xl mx-auto px-3 sm:px-4 py-5 sm:py-8 space-y-4 sm:space-y-5 pb-28">
//         <p className="text-sm font-semibold text-blue-400 px-1">
//           Fill in all details below and click <span className="text-blue-600 font-black">Submit Enrollment</span> when done.
//         </p>

//         {/* ═══ HR Information ═══ */}
//         <Card>
//           <CardHeader icon={<User className="w-4 h-4 text-white" />} title="HR Information" badge="Internal" />
//           <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
//             <div className="sm:col-span-1 lg:col-span-4 space-y-4">
//               <Field label="HR Name" field="hrName" value={v("hrName")} onChange={set} />
//               <Field label="ID No."  field="idNo"   value={v("idNo")}   onChange={set} />
//             </div>
//             <div className="sm:col-span-1 lg:col-span-4 space-y-4">
//               <Field label="No. of Logins Done" field="loginsCount" value={v("loginsCount")} onChange={set} />
//             </div>
//             <div className="sm:col-span-2 lg:col-span-4 flex flex-col items-center sm:items-end lg:items-center pt-1">
//               <div className="w-full max-w-[200px] sm:max-w-[170px]">
//                 <ImageUpload label="HR Photo" value={hrPhoto} onChange={setHrPhoto} height="h-32" />
//               </div>
//             </div>
//           </div>
//         </Card>

//         {/* ═══ Candidate Details ═══ */}
//         <Card>
//           <CardHeader icon={<User className="w-4 h-4 text-white" />} title="Candidate Details" />
//           <div className="p-4 sm:p-6">

//             {/* Name row + Student Photo */}
//             <div className="flex flex-col sm:flex-row gap-4 items-start">
//               <div className="w-full sm:flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <Field label="Surname"              field="surname"          value={v("surname")}          onChange={set} />
//                 <Field label="First Name"           field="name"             value={v("name")}             onChange={set} />
//                 <Field label="Father / Mother Name" field="fatherMotherName" value={v("fatherMotherName")} onChange={set} />
//               </div>
//               <div className="w-full sm:w-24 sm:shrink-0 flex sm:block justify-center">
//                 <div className="w-32 sm:w-full">
//                   <ImageUpload label="Photo" value={studentPhoto} onChange={setStudentPhoto} height="h-28 sm:h-24" compact />
//                 </div>
//               </div>
//             </div>

//             {/* DOB + Regn + Date */}
//             <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               <DOBPicker dob_d={v("dob_d")} dob_m={v("dob_m")} dob_y={v("dob_y")} onChange={set} />
//               {/* <Field label="Regn. No." field="regnNo" value={v("regnNo")} onChange={set} /> */}
//               <Field label="Date"      field="date"   value={v("date")}   onChange={set} />
//             </div>

//             {/* Qualification */}
//             <Divider label="Qualification" />
//             <div className={`grid grid-cols-1 gap-4 ${qualGridCls}`}>
//               <Dropdown
//                 label="Academic" field="academic" value={v("academic")}
//                 onChange={(field, val) => {
//                   set(field, val);
//                   set("specialization", "");
//                   set("subCourse", "");
//                 }}
//                 options={["Below SSC","SSC","Intermediate","Polytechnic","ITI","U.G (Degree)","P.G (Degree)","U.G(B.Tech/B.E)","P.G(M.Tech/M.E)"]}
//               />
//               {showSpec && (
//                 <SpecField academic={v("academic")} value={v("specialization")} onChange={set} />
//               )}
//               {showSubCourse && (
//                 <SubCourseField
//                   academic={v("academic")}
//                   specialization={v("specialization")}
//                   value={v("subCourse")}
//                   onChange={set}
//                 />
//               )}
//             </div>

//             {/* Row 2: Extra Curricular + Additional Qualification + Driving Licence */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//               <Dropdown label="Extra Curricular" field="extraCurricular" value={v("extraCurricular")} onChange={set}
//                 options={["Sports","Music","Dance","Drama","NCC","NSS","None"]} />
//               <Dropdown label="Additional Qualification" field="additionalQualification" value={v("additionalQualification")} onChange={set}
//                 options={["Tally","AutoCAD","MS Office","Photoshop","Programming","None"]} />
//               <Dropdown label="Driving Licence" field="drivingLicence" value={v("drivingLicence")} onChange={set}
//                 options={["2 Wheeler","4 Wheeler","Both","None"]} />
//             </div>

//             {/* Contact & Identity */}
//             <Divider label="Contact & Identity" />
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               <AadharField value={v("aadharNo")} onChange={set} />
//               <Field label="Email Address"        field="email"           value={v("email")}           onChange={set} type="email" />
//               <Field label="Mobile (Personal)"    field="mobilePersonal"  value={v("mobilePersonal")}  onChange={set} />
//               <Field label="Mobile (Reference)"   field="mobileReference" value={v("mobileReference")} onChange={set} />
//             </div>

//             {/* Address */}
//             <Divider label="Address" />
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               <Field    label="H. No."         field="hNo"          value={v("hNo")}          onChange={set} />
//               <Field    label="Street / Colony" field="streetColony" value={v("streetColony")} onChange={set} />
//               <Field    label="Area"            field="area"         value={v("area")}         onChange={set} />
//               <Dropdown label="District"        field="district"     value={v("district")}     onChange={set}
//                 options={["Hyderabad","Rangareddy","Medchal","Sangareddy","Nalgonda","Warangal","Karimnagar","Other"]} />
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
//               <Dropdown label="House Own / Rent"      field="houseOwnRent" value={v("houseOwnRent")} onChange={set} options={["Own","Rent"]} />
//               <Field    label="Pincode"               field="pincode"      value={v("pincode")}
//                 onChange={(f, val) => set(f, val.replace(/\D/g, "").slice(0, 6))} placeholder="6-digit pincode" />
//               <Field    label="Reservation (if any)"  field="reservation"  value={v("reservation")}  onChange={set} />
//             </div>

//             {/* Physical Information */}
//             <Divider label="Physical Information" />
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
//               <Field    label="Height (cm)" field="height"     value={v("height")}     onChange={set} />
//               <Field    label="Weight (kg)" field="weight"     value={v("weight")}     onChange={set} />
//               <Field    label="Eye Sight"   field="eyeSite"    value={v("eyeSite")}    onChange={set} />
//               <Dropdown label="Blood Group" field="bloodGroup" value={v("bloodGroup")} onChange={set}
//                 options={["A+","A-","B+","B-","AB+","AB-","O+","O-"]} />
//               <Dropdown label="Any Job"     field="anyJob"     value={v("anyJob")}     onChange={set} options={["Yes","No"]} />
//             </div>

//             {/* Experience */}
//             <Divider label="Experience" />
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               <ExperienceField years={v("experienceYears")} months={v("experienceMonths")} onChange={set} />
//               <Field label="Company Name" field="companyName" value={v("companyName")} onChange={set} />
//               <Field label="Designation"  field="designation" value={v("designation")}  onChange={set} />
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
//               <Field    label="Last Drawn Salary"  field="lastSalary"    value={v("lastSalary")}    onChange={set} />
//               <Field    label="Reason for Leaving" field="reasonLeaving" value={v("reasonLeaving")} onChange={set} />
//               <Dropdown label="Job Type"           field="jobType"       value={v("jobType")}       onChange={set}
//                 options={["Full Time","Part Time","Contract","Internship","Self Employed"]} />
//               <Field    label="Tech Stack Worked"  field="techStack"     value={v("techStack")}     onChange={set} placeholder="e.g. React, Django, SQL" />
//             </div>

//             {/* Digital Signature */}
//             <div className="mt-6 flex justify-center sm:justify-end">
//               <div className="w-full sm:w-64">
//                 <SignatureUpload value={signature} onChange={setSignature} />
//               </div>
//             </div>

//             {/* Nature of Job */}
//             <Divider label="Nature of Job Interested" />
//             <p className="text-xs text-blue-400 font-semibold mb-4 -mt-2">
//               Tick any that apply — extra fields will appear to fill in details.
//             </p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//               {JOB_ROWS.map(({ field, label, opt1, opt2 }) => (
//                 <JobRow key={field} label={label} opt1={opt1} opt2={opt2}
//                   checked={vb(`${field}_checked` as keyof F)}
//                   val1={v(`${field}_v1` as keyof F)}
//                   val2={v(`${field}_v2` as keyof F)}
//                   onCheck={() => {
//                     const cur = vb(`${field}_checked` as keyof F);
//                     set(`${field}_checked`, !cur);
//                     if (cur) { set(`${field}_v1`, ""); set(`${field}_v2`, ""); }
//                   }}
//                   onVal1={val => set(`${field}_v1`, val)}
//                   onVal2={val => set(`${field}_v2`, val)}
//                 />
//               ))}
//             </div>
//           </div>
//         </Card>

//         {/* Submit banners */}
//         {submitStatus === "success" && (
//           <div className="flex items-center gap-3 px-4 sm:px-5 py-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 shadow-sm">
//             <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
//             <div>
//               <p className="text-sm font-black text-emerald-700">Enrollment submitted successfully!</p>
//               <p className="text-xs font-semibold text-emerald-500 mt-0.5">Redirecting to assignment page…</p>
//             </div>
//           </div>
//         )}
//         {submitStatus === "error" && (
//           <div className="flex items-start gap-3 px-4 sm:px-5 py-4 rounded-2xl bg-red-50 border-2 border-red-200 shadow-sm">
//             <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
//             <div>
//               <p className="text-sm font-black text-red-600">Submission failed</p>
//               <p className="text-xs font-semibold text-red-400 mt-0.5 break-all">{errorMsg}</p>
//             </div>
//           </div>
//         )}

//         {/* Submit button */}
//         <div className="flex flex-col items-center gap-3 pt-2">
//           <button onClick={handleSubmit} disabled={submitting}
//             className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 sm:px-16 py-4 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white text-base font-black tracking-wide shadow-xl shadow-blue-200 hover:shadow-2xl hover:shadow-blue-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0">
//             {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting…</> : "Submit Enrollment"}
//           </button>
//           <p className="text-sm font-semibold text-blue-300 text-center">Ensure all fields are complete before submitting</p>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default StudentProfile;



import { useState, useRef, useEffect, ChangeEvent, useCallback } from "react";
import {
  User, Camera, FileSignature, ArrowLeft, ChevronDown,
  CalendarDays, ChevronLeft, ChevronRight, AlertCircle, RefreshCw,
  CheckCircle, Loader2, X, FolderOpen, SwitchCamera,
  ZoomIn, RotateCcw, MapPin, Navigation,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE = "http://192.168.0.6:8000/api";

const ACADEMIC_API: Record<string, string> = {
  "SSC":             `${BASE}/vocational/`,
  "Intermediate":    `${BASE}/intermediate/`,
  "Polytechnic":     `${BASE}/polytechnic/`,
  "ITI":             `${BASE}/iti/`,
  "U.G (Degree)":    `${BASE}/degree/`,
  "P.G (Degree)":    `${BASE}/degree/`,
  "U.G(B.Tech/B.E)": `${BASE}/ug/`,
  "P.G(M.Tech/M.E)": `${BASE}/pg/`,
};

const NO_SPEC = new Set(["Below SSC", "SSC"]);
const HAS_SUBCOURSE = new Set(["U.G (Degree)", "P.G (Degree)"]);
const NOT_YET = new Set<string>([]);

const JOB_ROWS = [
  { field: "coreSpec",   label: "Core Specialization", opt1: "Interest Field 1", opt2: "Interest Field 2" },
  { field: "technical",  label: "Technical",           opt1: "Interest Field 1", opt2: "Interest Field 2" },
  { field: "nonTech",    label: "Non-Technical",       opt1: "Interest Field 1", opt2: "Interest Field 2" },
  { field: "generalCat", label: "General Category",    opt1: "Interest Field 1", opt2: "Interest Field 2" },
  { field: "jobNature",  label: "Any Job Nature",      opt1: "Interest Field 1", opt2: "Interest Field 2" },
];

/* ═══════════════════════════════════════════════════════════
   Validation helpers
═══════════════════════════════════════════════════════════ */
const validators: Record<string, (v: string) => string | null> = {
  surname:        v => !v.trim() ? "Surname is required" : v.trim().length < 2 ? "Min 2 characters" : null,
  name:           v => !v.trim() ? "First name is required" : v.trim().length < 2 ? "Min 2 characters" : null,
  fatherMotherName: v => !v.trim() ? "Father/Mother name is required" : null,
  email:          v => !v.trim() ? "Email is required" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Invalid email address" : null,
  mobilePersonal: v => !v.trim() ? "Personal mobile is required" : !/^[6-9]\d{9}$/.test(v.replace(/\s/g, "")) ? "Enter valid 10-digit mobile" : null,
  mobileReference: v => v && !/^[6-9]\d{9}$/.test(v.replace(/\s/g, "")) ? "Enter valid 10-digit mobile" : null,
  aadharNo:       v => !v.trim() ? "Aadhar number is required" : v.replace(/-/g, "").length !== 12 ? "Aadhar must be 12 digits" : null,
  academic:       v => !v ? "Please select academic qualification" : null,
  district:       v => !v ? "Please select district" : null,
  hNo:            v => !v.trim() ? "House number is required" : null,
  streetColony:   v => !v.trim() ? "Street/Colony is required" : null,
  area:           v => !v.trim() ? "Area is required" : null,
  bloodGroup:     v => !v ? "Please select blood group" : null,
  height:         v => v && (isNaN(Number(v)) || Number(v) < 50 || Number(v) > 300) ? "Enter valid height in cm (50–300)" : null,
  weight:         v => v && (isNaN(Number(v)) || Number(v) < 10 || Number(v) > 300) ? "Enter valid weight in kg (10–300)" : null,
  pincode: v => !v.trim() ? "Pincode is required" : !/^\d{6}$/.test(v) ? "Pincode must be 6 digits" : null,
  date:           v => {
    if (!v.trim()) return "Date is required";
    const [dd, mm, yyyy] = v.split("-").map(Number);
    if (!dd || !mm || !yyyy) return "Use DD-MM-YYYY format";
    if (mm < 1 || mm > 12) return "Invalid month";
    if (dd < 1 || dd > 31) return "Invalid day";
    if (yyyy < 1900 || yyyy > new Date().getFullYear()) return "Invalid year";
    return null;
  },
};

const validateDOB = (d: string, m: string, y: string): string | null => {
  if (!d || !m || !y) return "Date of birth is required";
  const dd = parseInt(d), mm = parseInt(m), yy = parseInt(y);
  if (isNaN(dd) || isNaN(mm) || isNaN(yy)) return "Invalid date of birth";
  if (mm < 1 || mm > 12) return "Invalid month";
  if (dd < 1 || dd > 31) return "Invalid day";
  if (yy < 1900 || yy > new Date().getFullYear() - 10) return "Age must be at least 10 years";
  return null;
};

/* ═══════════════════════════════════════════════════════════
   UploadSourceModal
═══════════════════════════════════════════════════════════ */
interface UploadSourceModalProps {
  open: boolean; label: string;
  onCamera: () => void; onDevice: () => void; onClose: () => void;
}
const UploadSourceModal = ({ open, label, onCamera, onDevice, onClose }: UploadSourceModalProps) => {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(15,23,42,0.55)", backdropFilter: "blur(4px)" }}
      onClick={onClose}>
      <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-blue-100 w-full max-w-xs p-6 flex flex-col gap-5"
        onClick={e => e.stopPropagation()}>
        <button type="button" onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-blue-50 hover:bg-red-50 border border-blue-100 flex items-center justify-center transition-colors group">
          <X className="w-3.5 h-3.5 text-blue-400 group-hover:text-red-500" />
        </button>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-blue-400">Upload</span>
          <span className="text-base font-black text-slate-800">{label}</span>
          <span className="text-xs font-semibold text-blue-300">Choose how you'd like to add the image</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={() => { onCamera(); onClose(); }}
            className="flex flex-col items-center justify-center gap-3 py-6 rounded-2xl border-2 border-blue-200 bg-blue-50 hover:border-blue-500 hover:bg-blue-100 transition-all duration-150 group">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-sm font-black text-blue-700">Camera</span>
              <span className="text-[10px] font-semibold text-blue-400">Take a photo now</span>
            </div>
          </button>
          <button type="button" onClick={() => { onDevice(); onClose(); }}
            className="flex flex-col items-center justify-center gap-3 py-6 rounded-2xl border-2 border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-blue-50 transition-all duration-150 group">
            <div className="w-12 h-12 rounded-2xl bg-slate-700 flex items-center justify-center shadow-lg shadow-slate-200 group-hover:scale-105 transition-transform">
              <FolderOpen className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-sm font-black text-slate-700">Device</span>
              <span className="text-[10px] font-semibold text-slate-400">Browse from files</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   CameraModal
═══════════════════════════════════════════════════════════ */
interface CameraModalProps {
  open: boolean; label: string;
  onCapture: (file: File) => void; onClose: () => void;
}
const CameraModal = ({ open, label, onCapture, onClose }: CameraModalProps) => {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facing,   setFacing]   = useState<"user" | "environment">("user");
  const [error,    setError]    = useState<string | null>(null);
  const [captured, setCaptured] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
  }, []);

  const startCamera = useCallback(async (facingMode: "user" | "environment") => {
    stopStream(); setError(null); setStarting(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play(); }
    } catch { setError("Camera access denied. Please allow camera permission in your browser."); }
    finally { setStarting(false); }
  }, [stopStream]);

  useEffect(() => {
    if (open) { setCaptured(null); startCamera(facing); }
    else { stopStream(); setCaptured(null); }
    return stopStream;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const switchCamera = async () => {
    const next = facing === "user" ? "environment" : "user";
    setFacing(next); setCaptured(null); await startCamera(next);
  };

  const takeSnap = () => {
    const video = videoRef.current; const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth || 640; canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    if (facing === "user") { ctx.translate(canvas.width, 0); ctx.scale(-1, 1); }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setCaptured(canvas.toDataURL("image/jpeg", 0.92)); stopStream();
  };

  const retake = () => { setCaptured(null); startCamera(facing); };

  const usePhoto = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(blob => {
      if (!blob) return;
      const file = new File([blob], `${label.replace(/\s+/g, "_")}_${Date.now()}.jpg`, { type: "image/jpeg" });
      onCapture(file); onClose();
    }, "image/jpeg", 0.92);
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(5,10,24,0.82)", backdropFilter: "blur(6px)" }}>
      <div className="relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl w-full max-w-lg border border-slate-700">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-black text-white tracking-wide">{label}</span>
              <span className="ml-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {facing === "user" ? "Front cam" : "Rear cam"}
              </span>
            </div>
          </div>
          <button type="button" onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-red-900/60 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>
        <div className="relative bg-black aspect-video flex items-center justify-center overflow-hidden">
          {error ? (
            <div className="flex flex-col items-center gap-3 px-8 text-center">
              <AlertCircle className="w-10 h-10 text-red-400" />
              <p className="text-sm font-bold text-red-300">{error}</p>
              <button type="button" onClick={() => startCamera(facing)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-black">
                <RefreshCw className="w-3.5 h-3.5" /> Retry
              </button>
            </div>
          ) : captured ? (
            <img src={captured} alt="Captured" className="w-full h-full object-cover" />
          ) : (
            <>
              <video ref={videoRef} className="w-full h-full object-cover"
                style={{ transform: facing === "user" ? "scaleX(-1)" : "none" }} muted playsInline />
              {starting && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                </div>
              )}
              {!starting && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-8 rounded-xl border border-white/10" />
                  {(["top-8 left-8","top-8 right-8","bottom-8 left-8","bottom-8 right-8"] as const).map((pos, i) => (
                    <div key={i} className={`absolute w-5 h-5 ${pos} border-blue-400
                      ${i === 0 ? "border-t-2 border-l-2 rounded-tl" : ""}
                      ${i === 1 ? "border-t-2 border-r-2 rounded-tr" : ""}
                      ${i === 2 ? "border-b-2 border-l-2 rounded-bl" : ""}
                      ${i === 3 ? "border-b-2 border-r-2 rounded-br" : ""}`} />
                  ))}
                </div>
              )}
            </>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
        <div className="px-5 py-4 bg-slate-900 flex items-center justify-between gap-3">
          {captured ? (
            <>
              <button type="button" onClick={retake}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold border border-slate-700 transition-colors">
                <RotateCcw className="w-4 h-4" /> Retake
              </button>
              <button type="button" onClick={usePhoto}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-black transition-colors shadow-lg shadow-blue-900/40">
                <ZoomIn className="w-4 h-4" /> Use this photo
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={switchCamera} disabled={!!error || starting}
                className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center transition-colors disabled:opacity-40"
                title="Switch camera">
                <SwitchCamera className="w-5 h-5 text-slate-300" />
              </button>
              <button type="button" onClick={takeSnap} disabled={!!error || starting}
                className="w-16 h-16 rounded-full border-4 border-white bg-white/10 hover:bg-white/20 active:scale-90 transition-all flex items-center justify-center shadow-xl disabled:opacity-40">
                <div className="w-11 h-11 rounded-full bg-white" />
              </button>
              <div className="w-11 h-11" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   ImageUpload
═══════════════════════════════════════════════════════════ */
interface ImageUploadProps {
  label: string; value: File | null; onChange: (file: File | null) => void;
  height?: string; compact?: boolean;
}
const ImageUpload = ({ label, value, onChange, height = "h-28", compact = false }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview,    setPreview]    = useState<string | null>(null);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);

  useEffect(() => {
    if (!value) { setPreview(null); return; }
    const url = URL.createObjectURL(value);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null; onChange(file); e.target.value = "";
  };
  const handleClear = (e: React.MouseEvent) => { e.stopPropagation(); onChange(null); };

  return (
    <>
      <div className="flex flex-col gap-1.5">
        <label className={`font-black tracking-widest uppercase text-blue-500 ${compact ? "text-[10px]" : "text-xs"}`}>{label}</label>
        <div onClick={() => setSourceOpen(true)}
          className={`relative flex flex-col items-center justify-center gap-2 w-full ${height} rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer group overflow-hidden
            ${preview ? "border-blue-400 bg-blue-50" : "border-blue-200 bg-blue-50 hover:border-blue-500 hover:bg-blue-100"}`}>
          {preview ? (
            <>
              <img src={preview} alt={label} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all flex flex-col items-center justify-center gap-1.5">
                <Camera className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-white text-[10px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Change</span>
              </div>
              <button type="button" onClick={handleClear}
                className="absolute top-1.5 right-1.5 z-10 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-md transition-colors">
                <X className="w-3 h-3 text-white" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 pointer-events-none select-none">
              <Camera className={`text-blue-300 group-hover:text-blue-500 transition-colors ${compact ? "w-4 h-4" : "w-6 h-6"}`} />
              <span className={`font-black tracking-widest uppercase text-blue-300 group-hover:text-blue-500 ${compact ? "text-[9px]" : "text-[10px]"}`}>{label}</span>
              <div className="flex items-center gap-1.5">
                <span className="flex items-center gap-1 text-[9px] font-bold text-blue-400 bg-blue-100 group-hover:bg-blue-200 px-2 py-0.5 rounded-full transition-all">
                  <Camera className="w-2.5 h-2.5" /> Camera
                </span>
                <span className="flex items-center gap-1 text-[9px] font-bold text-blue-400 bg-blue-100 group-hover:bg-blue-200 px-2 py-0.5 rounded-full transition-all">
                  <FolderOpen className="w-2.5 h-2.5" /> Device
                </span>
              </div>
            </div>
          )}
        </div>
        {value && (
          <span className="text-[10px] font-bold text-emerald-600 truncate">
            ✓ {value.name.length > 24 ? value.name.slice(0, 22) + "…" : value.name}
          </span>
        )}
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      <UploadSourceModal open={sourceOpen} label={label} onClose={() => setSourceOpen(false)}
        onCamera={() => { setSourceOpen(false); setCameraOpen(true); }}
        onDevice={() => { setSourceOpen(false); fileInputRef.current?.click(); }} />
      <CameraModal open={cameraOpen} label={label} onClose={() => setCameraOpen(false)}
        onCapture={file => { onChange(file); setCameraOpen(false); }} />
    </>
  );
};

/* ═══════════════════════════════════════════════════════════
   SignatureUpload
═══════════════════════════════════════════════════════════ */
interface SignatureUploadProps { value: File | null; onChange: (file: File | null) => void; }
const SignatureUpload = ({ value, onChange }: SignatureUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview,    setPreview]    = useState<string | null>(null);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);

  useEffect(() => {
    if (!value) { setPreview(null); return; }
    const url = URL.createObjectURL(value);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null; onChange(file); e.target.value = "";
  };
  const handleClear = (e: React.MouseEvent) => { e.stopPropagation(); onChange(null); };

  return (
    <>
      <div className="flex flex-col gap-2 items-end w-full sm:w-64">
        <span className="text-xs font-black tracking-widest uppercase text-blue-400">Digital Signature</span>
        <div onClick={() => setSourceOpen(true)}
          className={`relative flex items-center justify-center gap-2.5 h-14 w-full rounded-2xl cursor-pointer border-2 border-dashed transition-all overflow-hidden group
            ${preview ? "border-blue-400 bg-blue-50" : "border-blue-200 bg-blue-50 hover:border-blue-500 hover:bg-blue-100"}`}>
          {preview ? (
            <>
              <img src={preview} alt="Signature" className="absolute inset-0 w-full h-full object-contain p-1.5" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all flex items-center justify-center">
                <span className="text-white text-[10px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Change</span>
              </div>
              <button type="button" onClick={handleClear}
                className="absolute top-1 right-1 z-10 w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-md transition-colors">
                <X className="w-2.5 h-2.5 text-white" />
              </button>
            </>
          ) : (
            <>
              <FileSignature className="w-4 h-4 text-blue-300 group-hover:text-blue-600 shrink-0 transition-colors" />
              <span className="text-sm font-bold text-blue-300 group-hover:text-blue-600">Sign here</span>
              <div className="flex items-center gap-1">
                <span className="flex items-center gap-0.5 text-[9px] font-bold text-blue-300 bg-blue-100 px-1.5 py-0.5 rounded-full">
                  <Camera className="w-2 h-2" /> Cam
                </span>
                <span className="flex items-center gap-0.5 text-[9px] font-bold text-blue-300 bg-blue-100 px-1.5 py-0.5 rounded-full">
                  <FolderOpen className="w-2 h-2" /> File
                </span>
              </div>
            </>
          )}
        </div>
        {value && <span className="text-[10px] font-bold text-emerald-500">Signature uploaded ✓</span>}
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      <UploadSourceModal open={sourceOpen} label="Digital Signature" onClose={() => setSourceOpen(false)}
        onCamera={() => { setSourceOpen(false); setCameraOpen(true); }}
        onDevice={() => { setSourceOpen(false); fileInputRef.current?.click(); }} />
      <CameraModal open={cameraOpen} label="Digital Signature" onClose={() => setCameraOpen(false)}
        onCapture={file => { onChange(file); setCameraOpen(false); }} />
    </>
  );
};

/* ═══════════════════════════════════════════════════════════
   Field
═══════════════════════════════════════════════════════════ */
interface FieldProps {
  label: string; field: string; value: string;
  onChange: (field: string, val: string) => void;
  type?: string; placeholder?: string; className?: string;
  error?: string | null; touched?: boolean; required?: boolean;
}
const Field = ({ label, field, value, onChange, type = "text", placeholder, className = "", error, touched, required = false }: FieldProps) => {
  const hasError = touched && error;
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-black tracking-widest uppercase text-blue-500">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder ?? label}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(field, e.target.value)}
        className={`h-11 w-full rounded-xl border-2 bg-blue-50 px-4 text-base font-semibold text-slate-800 placeholder:text-blue-200 transition-all duration-150 focus:outline-none focus:ring-4
          ${hasError
            ? "border-red-300 focus:border-red-500 focus:ring-red-100 bg-red-50"
            : "border-blue-100 focus:border-blue-500 focus:bg-white focus:ring-blue-100"
          }`}
      />
      {hasError && (
        <span className="flex items-center gap-1 text-xs font-bold text-red-500">
          <AlertCircle className="w-3 h-3 shrink-0" />{error}
        </span>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   Dropdown
═══════════════════════════════════════════════════════════ */
interface DropdownProps {
  label: string; field: string; value: string;
  onChange: (field: string, val: string) => void;
  options?: string[]; className?: string; error?: string | null; touched?: boolean; required?: boolean;
}
const Dropdown = ({ label, field, value, onChange, options = [], className = "", error, touched, required = false }: DropdownProps) => {
  const hasError = touched && error;
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-black tracking-widest uppercase text-blue-500">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(field, e.target.value)}
          className={`h-11 w-full appearance-none rounded-xl border-2 pl-4 pr-10 text-base font-semibold text-slate-800 cursor-pointer transition-all duration-150 focus:outline-none focus:ring-4
            ${hasError
              ? "border-red-300 focus:border-red-500 focus:ring-red-100 bg-red-50"
              : "border-blue-100 bg-blue-50 focus:border-blue-500 focus:bg-white focus:ring-blue-100"
            }`}>
          <option value="">Select…</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
      </div>
      {hasError && (
        <span className="flex items-center gap-1 text-xs font-bold text-red-500">
          <AlertCircle className="w-3 h-3 shrink-0" />{error}
        </span>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   SpecField
═══════════════════════════════════════════════════════════ */
interface SpecFieldProps { academic: string; value: string; onChange: (f: string, v: string) => void; }
const SpecField = ({ academic, value, onChange }: SpecFieldProps) => {
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const cache = useRef<Record<string, string[]>>({});

  const fetchOptions = async (ac: string) => {
    const url = ACADEMIC_API[ac];
    if (!url) return;
    if (cache.current[ac]) { setOptions(cache.current[ac]); return; }
    setLoading(true); setError(null); setOptions([]);
    try {
      const res  = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const specs: string[] = Array.isArray(data)
        ? [...new Set<string>(data.map((item: { specialization: string }) => item.specialization))]
        : [];
      cache.current[ac] = specs;
      setOptions(specs);
    } catch { setError("Could not load options."); setOptions([]); }
    finally   { setLoading(false); }
  };

  useEffect(() => {
    setOptions([]); setError(null); onChange("specialization", "");
    if (academic && ACADEMIC_API[academic]) fetchOptions(academic);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [academic]);

  if (!academic || NO_SPEC.has(academic)) return null;
  if (NOT_YET.has(academic)) return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-black tracking-widest uppercase text-blue-500">Specialization</label>
      <div className="h-11 rounded-xl border-2 border-dashed border-blue-100 bg-blue-50 flex items-center px-4">
        <span className="text-sm font-semibold text-blue-300 italic">Not applicable for {academic}</span>
      </div>
    </div>
  );
  if (!ACADEMIC_API[academic]) return null;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-black tracking-widest uppercase text-blue-500">Specialization</label>
      <div className="relative">
        <select value={value} disabled={loading || !!error}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange("specialization", e.target.value)}
          className="h-11 w-full appearance-none rounded-xl border-2 border-blue-100 bg-blue-50 pl-4 pr-10 text-base font-semibold text-slate-800 cursor-pointer transition-all duration-150 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:opacity-60 disabled:cursor-not-allowed">
          <option value="">{loading ? "Loading…" : error ? "Failed to load" : "Select…"}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        {loading
          ? <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-blue-500" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          : <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
        }
      </div>
      {error && (
        <div className="flex items-center gap-2 mt-0.5">
          <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
          <span className="text-xs text-red-500 font-bold">{error}</span>
          <button type="button" onClick={() => { delete cache.current[academic]; fetchOptions(academic); }}
            className="ml-auto flex items-center gap-1 text-xs font-bold text-blue-500 hover:text-blue-700 transition-colors">
            <RefreshCw className="w-3 h-3" /> Retry
          </button>
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   SubCourseField
═══════════════════════════════════════════════════════════ */
interface SubCourseFieldProps {
  academic: string;
  specialization: string;
  value: string;
  onChange: (f: string, v: string) => void;
}
const SubCourseField = ({ academic, specialization, value, onChange }: SubCourseFieldProps) => {
  const [allData,  setAllData]  = useState<{ specialization: string; sub_course: string }[]>([]);
  const [options,  setOptions]  = useState<string[]>([]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);
  const cache = useRef<{ specialization: string; sub_course: string }[] | null>(null);

  const fetchData = async () => {
    const url = ACADEMIC_API[academic];
    if (!url) return;
    if (cache.current) { setAllData(cache.current); return; }
    setLoading(true); setError(null);
    try {
      const res  = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      cache.current = Array.isArray(data) ? data : [];
      setAllData(cache.current);
    } catch { setError("Could not load sub-courses."); }
    finally   { setLoading(false); }
  };

  useEffect(() => {
    cache.current = null;
    setAllData([]); setOptions([]); setError(null);
    onChange("subCourse", "");
    if (academic && HAS_SUBCOURSE.has(academic)) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [academic]);

  useEffect(() => {
    onChange("subCourse", "");
    if (!specialization) {
      const all = [...new Set<string>(allData.map(d => d.sub_course).filter(Boolean))];
      setOptions(all);
    } else {
      const filtered = [
        ...new Set<string>(
          allData
            .filter(d => d.specialization === specialization)
            .map(d => d.sub_course)
            .filter(Boolean)
        ),
      ];
      setOptions(filtered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specialization, allData]);

  if (!academic || !HAS_SUBCOURSE.has(academic)) return null;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-black tracking-widest uppercase text-blue-500">Sub Course</label>
      <div className="relative">
        <select value={value} disabled={loading || !!error}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange("subCourse", e.target.value)}
          className="h-11 w-full appearance-none rounded-xl border-2 border-blue-100 bg-blue-50 pl-4 pr-10 text-base font-semibold text-slate-800 cursor-pointer transition-all duration-150 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:opacity-60 disabled:cursor-not-allowed">
          <option value="">{loading ? "Loading…" : error ? "Failed to load" : "Select…"}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        {loading
          ? <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-blue-500" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          : <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
        }
      </div>
      {error && (
        <div className="flex items-center gap-2 mt-0.5">
          <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
          <span className="text-xs text-red-500 font-bold">{error}</span>
          <button type="button" onClick={() => { cache.current = null; fetchData(); }}
            className="ml-auto flex items-center gap-1 text-xs font-bold text-blue-500 hover:text-blue-700 transition-colors">
            <RefreshCw className="w-3 h-3" /> Retry
          </button>
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   Divider
═══════════════════════════════════════════════════════════ */
const Divider = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3 my-6">
    <div className="h-px flex-1 bg-blue-100" />
    <span className="text-[10px] font-black tracking-[0.25em] uppercase text-blue-400 px-2 bg-blue-50 border border-blue-100 rounded-full py-0.5">{label}</span>
    <div className="h-px flex-1 bg-blue-100" />
  </div>
);

/* ═══════════════════════════════════════════════════════════
   DOB Picker
═══════════════════════════════════════════════════════════ */
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

interface DOBPickerProps {
  dob_d: string; dob_m: string; dob_y: string;
  onChange: (f: string, v: string) => void;
  error?: string | null; touched?: boolean;
}
const DOBPicker = ({ dob_d, dob_m, dob_y, onChange, error, touched }: DOBPickerProps) => {
  const [open,     setOpen]     = useState(false);
  const [calYear,  setCalYear]  = useState(() => { const y = parseInt(dob_y); return isNaN(y) ? new Date().getFullYear() - 20 : y; });
  const [calMonth, setCalMonth] = useState(() => { const m = parseInt(dob_m); return isNaN(m) ? 0 : m - 1; });
  const ref = useRef<HTMLDivElement>(null);
  const hasError = touched && error;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
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
  const firstDay    = new Date(calYear, calMonth, 1).getDay();

  const selectDay = (day: number) => {
    onChange("dob_d", String(day).padStart(2, "0"));
    onChange("dob_m", String(calMonth + 1).padStart(2, "0"));
    onChange("dob_y", String(calYear));
    setOpen(false);
  };

  const inputCls = `h-11 rounded-xl border-2 bg-blue-50 text-center text-base font-semibold text-slate-800 placeholder:text-blue-200 focus:outline-none focus:ring-4 transition-all
    ${hasError ? "border-red-300 focus:border-red-500 focus:ring-red-100 bg-red-50" : "border-blue-100 focus:border-blue-500 focus:bg-white focus:ring-blue-100"}`;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-black tracking-widest uppercase text-blue-500">
          Date of Birth<span className="text-red-400 ml-0.5">*</span>
        </label>
        {age !== null && (
          <span className="text-xs font-black tracking-wide text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">{age} yrs</span>
        )}
      </div>
      <div className="relative" ref={ref}>
        <div className="flex gap-1.5 items-center">
          <input placeholder="DD" value={dob_d} maxLength={2}
            onChange={e => onChange("dob_d", e.target.value.replace(/\D/g, "").slice(0, 2))}
            className={`${inputCls} w-14`} />
          <input placeholder="MM" value={dob_m} maxLength={2}
            onChange={e => {
              const v = e.target.value.replace(/\D/g, "").slice(0, 2);
              onChange("dob_m", v);
              if (parseInt(v) >= 1 && parseInt(v) <= 12) setCalMonth(parseInt(v) - 1);
            }}
            className={`${inputCls} w-10`} />
          <input placeholder="YYYY" value={dob_y} maxLength={4}
            onChange={e => {
              const v = e.target.value.replace(/\D/g, "").slice(0, 4);
              onChange("dob_y", v);
              if (v.length === 4) setCalYear(parseInt(v));
            }}
            className={`${inputCls} w-20`} />
          <button type="button" onClick={() => setOpen(o => !o)}
            className="h-11 w-11 shrink-0 flex items-center justify-center rounded-xl border-2 border-blue-100 bg-blue-50 hover:border-blue-500 hover:bg-blue-100 transition-all">
            <CalendarDays className="w-5 h-5 text-blue-400" />
          </button>
        </div>
        {hasError && (
          <span className="flex items-center gap-1 text-xs font-bold text-red-500 mt-1">
            <AlertCircle className="w-3 h-3 shrink-0" />{error}
          </span>
        )}
        {open && (
          <div className="absolute top-13 left-0 z-50 bg-white rounded-2xl border-2 border-blue-100 shadow-2xl shadow-blue-100 p-4 w-72 mt-1"
            style={{ maxWidth: "calc(100vw - 32px)" }}>
            <div className="flex items-center justify-between mb-3">
              <button type="button"
                onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); }}
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
              <button type="button"
                onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); }}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-100">
                <ChevronRight className="w-4 h-4 text-blue-500" />
              </button>
            </div>
            <div className="grid grid-cols-7 mb-1">
              {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
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
   Date Field — DD-MM-YYYY
═══════════════════════════════════════════════════════════ */
interface DateFieldProps {
  value: string;
  onChange: (field: string, val: string) => void;
  error?: string | null;
  touched?: boolean;
}
const DateField = ({ value, onChange, error, touched }: DateFieldProps) => {
  const hasError = touched && error;

  // Auto-insert dashes as user types
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/[^\d]/g, "").slice(0, 8);
    if (raw.length >= 5) raw = raw.slice(0, 2) + "-" + raw.slice(2, 4) + "-" + raw.slice(4);
    else if (raw.length >= 3) raw = raw.slice(0, 2) + "-" + raw.slice(2);
    onChange("date", raw);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-black tracking-widest uppercase text-blue-500">
        Date<span className="text-red-400 ml-0.5">*</span>
      </label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="DD-MM-YYYY"
        maxLength={10}
        className={`h-11 w-full rounded-xl border-2 bg-blue-50 px-4 text-base font-semibold text-slate-800 placeholder:text-blue-200 transition-all duration-150 focus:outline-none focus:ring-4 font-mono tracking-widest
          ${hasError
            ? "border-red-300 focus:border-red-500 focus:ring-red-100 bg-red-50"
            : "border-blue-100 focus:border-blue-500 focus:bg-white focus:ring-blue-100"
          }`}
      />
      {hasError && (
        <span className="flex items-center gap-1 text-xs font-bold text-red-500">
          <AlertCircle className="w-3 h-3 shrink-0" />{error}
        </span>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   Aadhar Field
═══════════════════════════════════════════════════════════ */
interface AadharFieldProps { value: string; onChange: (f: string, v: string) => void; error?: string | null; touched?: boolean; }
const AadharField = ({ value, onChange, error, touched }: AadharFieldProps) => {
  const format   = (raw: string) => raw.replace(/\D/g, "").slice(0, 12).replace(/(\d{4})(?=\d)/g, "$1-");
  const digits   = value.replace(/-/g, "");
  const complete = digits.length === 12;
  const hasError = touched && error;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-black tracking-widest uppercase text-blue-500">
          Aadhar No.<span className="text-red-400 ml-0.5">*</span>
        </label>
        <span className={`text-xs font-bold tracking-wide px-2 py-0.5 rounded-full transition-all border ${complete ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-blue-300 bg-blue-50 border-blue-100"}`}>
          {digits.length}/12
        </span>
      </div>
      <input value={value} onChange={e => onChange("aadharNo", format(e.target.value))}
        placeholder="XXXX-XXXX-XXXX" maxLength={14}
        className={`h-11 w-full rounded-xl border-2 bg-blue-50 px-4 text-base font-bold text-slate-800 placeholder:text-blue-200 font-mono tracking-widest transition-all duration-150 focus:outline-none focus:ring-4
          ${hasError
            ? "border-red-300 focus:border-red-500 focus:ring-red-100 bg-red-50"
            : "border-blue-100 focus:border-blue-500 focus:bg-white focus:ring-blue-100"
          }`} />
      {hasError && (
        <span className="flex items-center gap-1 text-xs font-bold text-red-500">
          <AlertCircle className="w-3 h-3 shrink-0" />{error}
        </span>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   Pincode Field — optional, with geolocation autofill
═══════════════════════════════════════════════════════════ */
interface PincodeFieldProps {
  value: string;
  onChange: (f: string, v: string) => void;
  onLocationFill: (data: { pincode: string; area: string; district: string }) => void;
  error?: string | null;
  touched?: boolean;
}
const PincodeField = ({ value, onChange, onLocationFill, error, touched }: PincodeFieldProps) => {
  const [locLoading, setLocLoading] = useState(false);
  const [locError,   setLocError]   = useState<string | null>(null);
  const [locSuccess, setLocSuccess] = useState(false);
  const hasError = touched && error;

  const fetchFromPincode = async (pin: string) => {
    if (pin.length !== 6) return;
    setLocLoading(true); setLocError(null); setLocSuccess(false);
    try {
      const res  = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await res.json();
      if (data[0]?.Status === "Success" && data[0]?.PostOffice?.[0]) {
        const po = data[0].PostOffice[0];
        onLocationFill({
          pincode:  pin,
          area:     po.Name || "",
          district: po.District || "",
        });
        setLocSuccess(true);
        setTimeout(() => setLocSuccess(false), 3000);
      } else {
        setLocError("Pincode not found");
      }
    } catch { setLocError("Could not fetch location"); }
    finally { setLocLoading(false); }
  };

  const useGeolocation = () => {
    if (!navigator.geolocation) { setLocError("Geolocation not supported"); return; }
    setLocLoading(true); setLocError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res  = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await res.json();
          const addr = data.address || {};
          const pin  = addr.postcode?.replace(/\s/g, "") || "";
          const area = addr.suburb || addr.neighbourhood || addr.village || addr.town || addr.city_district || "";
          const dist = addr.city || addr.county || addr.state_district || "";
          if (pin) {
            onLocationFill({ pincode: pin, area, district: dist });
            onChange("pincode", pin);
            setLocSuccess(true);
            setTimeout(() => setLocSuccess(false), 3000);
          } else {
            setLocError("Could not detect pincode from location");
          }
        } catch { setLocError("Location lookup failed"); }
        finally { setLocLoading(false); }
      },
      () => { setLocError("Location access denied"); setLocLoading(false); }
    );
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-black tracking-widest uppercase text-blue-500">
  Pincode<span className="text-red-400 ml-0.5">*</span>
</label>
        <button type="button" onClick={useGeolocation} disabled={locLoading}
          title="Auto-fill using your location"
          className="flex items-center gap-1 text-[10px] font-black text-blue-500 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2 py-0.5 rounded-full transition-all disabled:opacity-50">
          {locLoading
            ? <Loader2 className="w-3 h-3 animate-spin" />
            : locSuccess
            ? <CheckCircle className="w-3 h-3 text-emerald-500" />
            : <Navigation className="w-3 h-3" />
          }
          {locLoading ? "Detecting…" : locSuccess ? "Filled!" : "Use Location"}
        </button>
      </div>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300 pointer-events-none" />
        <input
          value={value}
          onChange={e => {
            const v = e.target.value.replace(/\D/g, "").slice(0, 6);
            onChange("pincode", v);
            if (v.length === 6) fetchFromPincode(v);
          }}
          placeholder="e.g. 500001 (optional)"
          maxLength={6}
          className={`h-11 w-full rounded-xl border-2 bg-blue-50 pl-9 pr-4 text-base font-semibold text-slate-800 placeholder:text-blue-200 transition-all duration-150 focus:outline-none focus:ring-4
            ${hasError
              ? "border-red-300 focus:border-red-500 focus:ring-red-100 bg-red-50"
              : "border-blue-100 focus:border-blue-500 focus:bg-white focus:ring-blue-100"
            }`}
        />
      </div>
      {locError && (
        <span className="flex items-center gap-1 text-xs font-bold text-amber-600">
          <AlertCircle className="w-3 h-3 shrink-0" />{locError}
        </span>
      )}
      {hasError && (
        <span className="flex items-center gap-1 text-xs font-bold text-red-500">
          <AlertCircle className="w-3 h-3 shrink-0" />{error}
        </span>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   Experience Field
═══════════════════════════════════════════════════════════ */
const ExperienceField = ({ years, months, onChange }: { years: string; months: string; onChange: (f: string, v: string) => void }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-black tracking-widest uppercase text-blue-500">Experience</label>
    <div className="flex gap-2">
      <div className="relative flex-1">
        <select value={years} onChange={e => onChange("experienceYears", e.target.value)}
          className="h-11 w-full appearance-none rounded-xl border-2 border-blue-100 bg-blue-50 pl-4 pr-8 text-base font-semibold text-slate-800 cursor-pointer transition-all focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100">
          <option value="">Yrs</option>
          {["Fresher","1","2","3","4","5","6","7","8","9","10","10+"].map(o => (
            <option key={o} value={o}>{o === "Fresher" ? "Fresher" : `${o} yr${o === "1" ? "" : "s"}`}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
      </div>
      <div className="relative flex-1">
        <select value={months} onChange={e => onChange("experienceMonths", e.target.value)}
          className="h-11 w-full appearance-none rounded-xl border-2 border-blue-100 bg-blue-50 pl-4 pr-8 text-base font-semibold text-slate-800 cursor-pointer transition-all focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100">
          <option value="">Mos</option>
          {["0","1","2","3","4","5","6","7","8","9","10","11"].map(o => (
            <option key={o} value={o}>{o} mo{o === "1" ? "" : "s"}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   JobRow
═══════════════════════════════════════════════════════════ */
interface JobRowProps {
  label: string; opt1: string; opt2: string;
  checked: boolean; val1: string; val2: string;
  onCheck: () => void; onVal1: (v: string) => void; onVal2: (v: string) => void;
}
const JobRow = ({ label, opt1, opt2, checked, val1, val2, onCheck, onVal1, onVal2 }: JobRowProps) => (
  <div className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${checked ? "border-blue-400 bg-blue-50 shadow-md shadow-blue-100" : "border-blue-100 bg-white hover:border-blue-200"}`}>
    <label className="flex items-center gap-3 px-4 py-3.5 cursor-pointer select-none">
      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all duration-150 ${checked ? "bg-blue-600 border-blue-600 shadow-md shadow-blue-200" : "border-blue-200 bg-white"}`}
        onClick={onCheck}>
        {checked && (
          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className="text-sm font-bold text-slate-700" onClick={onCheck}>{label}</span>
    </label>
    {checked && (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-4 pb-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black tracking-widest uppercase text-blue-500">{opt1}</label>
          <input value={val1} onChange={e => onVal1(e.target.value)} placeholder={`Enter ${opt1}`}
            className="h-10 w-full rounded-xl border-2 border-blue-200 bg-white px-3 text-sm font-semibold text-slate-800 placeholder:text-blue-200 transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black tracking-widest uppercase text-blue-500">{opt2}</label>
          <input value={val2} onChange={e => onVal2(e.target.value)} placeholder={`Enter ${opt2}`}
            className="h-10 w-full rounded-xl border-2 border-blue-200 bg-white px-3 text-sm font-semibold text-slate-800 placeholder:text-blue-200 transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
        </div>
      </div>
    )}
  </div>
);

/* ═══════════════════════════════════════════════════════════
   Card
═══════════════════════════════════════════════════════════ */
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-3xl border-2 border-blue-100 shadow-lg shadow-blue-50 overflow-hidden ${className}`}>
    {children}
  </div>
);
const CardHeader = ({ icon, title, badge }: { icon?: React.ReactNode; title: string; badge?: string }) => (
  <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b-2 border-blue-50 bg-gradient-to-r from-blue-50 to-white">
    {icon && (
      <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200 shrink-0">{icon}</div>
    )}
    <span className="text-sm font-black tracking-widest uppercase text-blue-700">{title}</span>
    {badge && (
      <span className="ml-auto text-[10px] font-black tracking-widest uppercase text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">{badge}</span>
    )}
  </div>
);

/* ═══════════════════════════════════════════════════════════
   Form initial state
═══════════════════════════════════════════════════════════ */
const INIT = {
  hrName: "", idNo: "", password: "", loginsCount: "",
  percentageObtained: "", successRate: "",
  surname: "", name: "", dob_d: "", dob_m: "", dob_y: "",
  regnNo: "", date: "", fatherMotherName: "",
  academic: "", specialization: "", subCourse: "", extraCurricular: "", pincode: "",
  additionalQualification: "", drivingLicence: "",
  aadharNo: "", mobilePersonal: "", mobileReference: "",
  hNo: "", streetColony: "", area: "", district: "",
  houseOwnRent: "", email: "", reservation: "",
  height: "", weight: "", eyeSite: "", bloodGroup: "", anyJob: "",
  experienceYears: "", experienceMonths: "",
  companyName: "", designation: "", lastSalary: "",
  reasonLeaving: "", jobType: "", techStack: "",
  coreSpec_checked:   false, coreSpec_v1:   "", coreSpec_v2:   "",
  technical_checked:  false, technical_v1:  "", technical_v2:  "",
  nonTech_checked:    false, nonTech_v1:    "", nonTech_v2:    "",
  generalCat_checked: false, generalCat_v1: "", generalCat_v2: "",
  jobNature_checked:  false, jobNature_v1:  "", jobNature_v2:  "",
};
type F = typeof INIT;

// Convert DD-MM-YYYY to YYYY-MM-DD for API
const buildDateForAPI = (ddmmyyyy: string): string | null => {
  if (!ddmmyyyy || ddmmyyyy.length < 10) return null;
  const [dd, mm, yyyy] = ddmmyyyy.split("-");
  if (!dd || !mm || !yyyy) return null;
  return `${yyyy}-${mm}-${dd}`;
};

const buildDOB = (d: string, m: string, y: string): string | null => {
  if (!d || !m || !y || y.length < 4) return null;
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
};

/* ═══════════════════════════════════════════════════════════
   Build multipart FormData
═══════════════════════════════════════════════════════════ */
const buildFormData = (form: F, hrPhoto: File | null, studentPhoto: File | null, signature: File | null): FormData => {
  const fd = new FormData();
  const a  = (key: string, val: string | null | undefined) => { if (val) fd.append(key, val); };
  const ab = (key: string, val: boolean) => fd.append(key, String(val));

  const hrId = localStorage.getItem("hr_id");
  if (hrId) fd.append("hr_id", hrId);

  a("hr_name", form.hrName);          a("id_no", form.idNo);
  a("password", form.password);
  if (form.loginsCount)        fd.append("logins_count",        form.loginsCount);
  if (form.percentageObtained) fd.append("percentage_obtained", form.percentageObtained);
  if (form.successRate)        fd.append("success_rate",        form.successRate);
  a("surname", form.surname);         a("name", form.name);
  a("father_mother_name", form.fatherMotherName);
  const dob = buildDOB(form.dob_d, form.dob_m, form.dob_y);
  if (dob) fd.append("dob", dob);
  a("regn_no", form.regnNo);
  // Convert date from DD-MM-YYYY to YYYY-MM-DD for API
  const apiDate = buildDateForAPI(form.date);
  if (apiDate) fd.append("date", apiDate);
  a("academic", form.academic);       a("specialization", form.specialization);
  a("sub_course", form.subCourse);
  a("extra_curricular", form.extraCurricular);
  a("additional_qualification", form.additionalQualification);
  a("driving_licence", form.drivingLicence);
  a("aadhar_no", form.aadharNo);
  a("mobile_personal", form.mobilePersonal);
  a("mobile_reference", form.mobileReference);
  a("h_no", form.hNo);               a("street_colony", form.streetColony);
  a("area", form.area);              a("district", form.district);
  a("house_own_rent", form.houseOwnRent);
  a("pincode", form.pincode);
  a("email", form.email);            a("reservation", form.reservation);
  if (form.height) fd.append("height", form.height);
  if (form.weight) fd.append("weight", form.weight);
  a("eye_site", form.eyeSite);       a("blood_group", form.bloodGroup);
  a("any_job", form.anyJob);
  a("experience_years", form.experienceYears);
  a("experience_months", form.experienceMonths);
  a("company_name", form.companyName);
  a("designation", form.designation);
  a("last_salary", form.lastSalary);
  a("reason_leaving", form.reasonLeaving);
  a("job_type", form.jobType);       a("tech_stack", form.techStack);
  ab("core_spec_checked",   form.coreSpec_checked);
  a("core_spec_v1",         form.coreSpec_v1); a("core_spec_v2", form.coreSpec_v2);
  ab("technical_checked",   form.technical_checked);
  a("technical_v1",         form.technical_v1); a("technical_v2", form.technical_v2);
  ab("non_tech_checked",    form.nonTech_checked);
  a("non_tech_v1",          form.nonTech_v1); a("non_tech_v2", form.nonTech_v2);
  ab("general_cat_checked", form.generalCat_checked);
  a("general_cat_v1",       form.generalCat_v1); a("general_cat_v2", form.generalCat_v2);
  ab("job_nature_checked",  form.jobNature_checked);
  a("job_nature_v1",        form.jobNature_v1); a("job_nature_v2", form.jobNature_v2);

  if (hrPhoto)      fd.append("hr_photo",          hrPhoto,      hrPhoto.name);
  if (studentPhoto) fd.append("photo",             studentPhoto, studentPhoto.name);
  if (signature)    fd.append("digital_signature", signature,    signature.name);

  return fd;
};

/* ═══════════════════════════════════════════════════════════
   Main Component
═══════════════════════════════════════════════════════════ */
const StudentProfile = () => {
  const [form,         setForm]         = useState<F>(INIT);
  const [hrPhoto,      setHrPhoto]      = useState<File | null>(null);
  const [studentPhoto, setStudentPhoto] = useState<File | null>(null);
  const [signature,    setSignature]    = useState<File | null>(null);
  const [submitting,   setSubmitting]   = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg,     setErrorMsg]     = useState<string>("");
  // Track which fields have been touched (for validation display)
  const [touched,      setTouched]      = useState<Record<string, boolean>>({});
  const [showAllErrors, setShowAllErrors] = useState(false);
  const navigate = useNavigate();

  const set = (field: string, val: string | boolean) => {
    setForm(p => ({ ...p, [field]: val }));
    setTouched(p => ({ ...p, [field]: true }));
  };
  const v  = (k: keyof F) => form[k] as string;
  const vb = (k: keyof F) => form[k] as boolean;

  const touch = (field: string) => setTouched(p => ({ ...p, [field]: true }));

  const showSpec      = !!form.academic && !NO_SPEC.has(form.academic);
  const showSubCourse = HAS_SUBCOURSE.has(form.academic);

  const qualColCount = [true, showSpec, showSubCourse].filter(Boolean).length;
  const qualGridCls  = qualColCount === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : qualColCount === 2 ? "sm:grid-cols-2" : "grid-cols-1";

  // Compute all validation errors
  const errors: Record<string, string | null> = {};
  Object.entries(validators).forEach(([k, fn]) => {
    errors[k] = fn(form[k as keyof F] as string);
  });
  errors["dob"] = validateDOB(form.dob_d, form.dob_m, form.dob_y);

  const isFieldTouched = (field: string) => showAllErrors || !!touched[field];

  const runAllValidations = (): boolean => {
    const requiredFields = ["surname","name","fatherMotherName","email","mobilePersonal","aadharNo","academic","district","hNo","streetColony","area","bloodGroup","date","pincode"];
    const hasErrors = requiredFields.some(f => errors[f]) || !!errors["dob"];
    return !hasErrors;
  };

  const handleSubmit = async () => {
    setShowAllErrors(true);
    // Touch all required fields
    const requiredFields = ["surname","name","fatherMotherName","email","mobilePersonal","aadharNo","academic","district","hNo","streetColony","area","bloodGroup","date","dob_d","dob_m","dob_y"];
    const newTouched: Record<string, boolean> = {};
    requiredFields.forEach(f => { newTouched[f] = true; });
    setTouched(p => ({ ...p, ...newTouched }));

    if (!runAllValidations()) {
      // Scroll to first error
      setTimeout(() => {
        const el = document.querySelector('[data-error="true"]');
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
      return;
    }

    setSubmitting(true); setSubmitStatus("idle"); setErrorMsg("");
    try {
      const fd = buildFormData(form, hrPhoto, studentPhoto, signature);
      const res = await fetch(`${BASE}/students/`, { method: "POST", body: fd });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        const messages = Object.entries(errData)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v[0] : v}`)
          .join(" | ");
        throw new Error(messages || `Server error ${res.status}`);
      }
      const created = await res.json();
      setSubmitStatus("success");
      setTimeout(() => {
        navigate("/assignment", {
          state: {
            studentId: created.id,
            name:      `${form.name} ${form.surname}`.trim() || "Candidate",
            regnNo:    form.regnNo || "—",
          },
        });
      }, 1200);
    } catch (err: unknown) {
      setSubmitStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Submission failed.");
    } finally { setSubmitting(false); }
  };

  useEffect(() => {
    const hrId = localStorage.getItem("hr_id");
    if (!hrId) return;
    axios.get(`http://127.0.0.1:8000/api/hr/${hrId}/`)
      .then((res) => {
        set("hrName", `${res.data.first_name} ${res.data.last_name}`);
        set("idNo", res.data.hr_id);
      })
      .catch((err) => { console.log(err); });
  }, []);

  // Count total validation errors for banner
  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      {/* Navbar */}
      <nav className="sticky top-0 z-30 h-14 sm:h-16 bg-white/95 backdrop-blur-md border-b-2 border-blue-100 shadow-sm shadow-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-2">
          <Link to="/hr/dashboard" className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-600 transition-colors shrink-0">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-200 shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm sm:text-base font-black tracking-tight text-blue-900 truncate">Candidate Enrollment</span>
          </div>
          <span className="text-[10px] font-black tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-200 px-2 sm:px-3 py-1 rounded-full shrink-0">Form</span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-5 sm:py-8 space-y-4 sm:space-y-5 pb-28">
        <div className="flex items-start gap-3 px-1">
          <p className="text-sm font-semibold text-blue-400 flex-1">
            Fill in all details below and click <span className="text-blue-600 font-black">Submit Enrollment</span> when done.
            Fields marked with <span className="text-red-400 font-black">*</span> are required.
          </p>
        </div>

        {/* Validation summary banner (shown after first submit attempt) */}
        {showAllErrors && errorCount > 0 && (
          <div className="flex items-start gap-3 px-4 py-3.5 rounded-2xl bg-amber-50 border-2 border-amber-200">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-black text-amber-700">Please fix {errorCount} error{errorCount > 1 ? "s" : ""} before submitting</p>
              <p className="text-xs font-semibold text-amber-500 mt-0.5">Scroll down to see highlighted fields</p>
            </div>
          </div>
        )}

        {/* ═══ HR Information ═══ */}
        <Card>
          <CardHeader icon={<User className="w-4 h-4 text-white" />} title="HR Information" badge="Internal" />
          <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
            <div className="sm:col-span-1 lg:col-span-4 space-y-4">
              <Field label="HR Name" field="hrName" value={v("hrName")} onChange={set}
                placeholder="e.g. Rajesh Kumar" />
              <Field label="ID No."  field="idNo"   value={v("idNo")}   onChange={set}
                placeholder="e.g. HR-2024-001" />
            </div>
            <div className="sm:col-span-1 lg:col-span-4 space-y-4">
              <Field label="No. of Logins Done" field="loginsCount" value={v("loginsCount")} onChange={set}
                placeholder="e.g. 5" />
            </div>
            <div className="sm:col-span-2 lg:col-span-4 flex flex-col items-center sm:items-end lg:items-center pt-1">
              <div className="w-full max-w-[200px] sm:max-w-[170px]">
                <ImageUpload label="HR Photo" value={hrPhoto} onChange={setHrPhoto} height="h-32" />
              </div>
            </div>
          </div>
        </Card>

        {/* ═══ Candidate Details ═══ */}
        <Card>
          <CardHeader icon={<User className="w-4 h-4 text-white" />} title="Candidate Details" />
          <div className="p-4 sm:p-6">

            {/* Name row + Student Photo */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-full sm:flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Surname" field="surname" value={v("surname")} onChange={set}
                  placeholder="e.g. Sharma" required
                  error={errors["surname"]} touched={isFieldTouched("surname")}
                  data-error={isFieldTouched("surname") && !!errors["surname"]} />
                <Field label="First Name" field="name" value={v("name")} onChange={set}
                  placeholder="e.g. Rahul" required
                  error={errors["name"]} touched={isFieldTouched("name")} />
                <Field label="Father / Mother Name" field="fatherMotherName" value={v("fatherMotherName")} onChange={set}
                  placeholder="e.g. Suresh Sharma" required
                  error={errors["fatherMotherName"]} touched={isFieldTouched("fatherMotherName")} />
              </div>
              <div className="w-full sm:w-24 sm:shrink-0 flex sm:block justify-center">
                <div className="w-32 sm:w-full">
                  <ImageUpload label="Photo" value={studentPhoto} onChange={setStudentPhoto} height="h-28 sm:h-24" compact />
                </div>
              </div>
            </div>

            {/* DOB + Date */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <DOBPicker
                dob_d={v("dob_d")} dob_m={v("dob_m")} dob_y={v("dob_y")} onChange={set}
                error={errors["dob"]} touched={isFieldTouched("dob_d") || isFieldTouched("dob_m") || isFieldTouched("dob_y")}
              />
              <DateField
                value={v("date")} onChange={set}
                error={errors["date"]} touched={isFieldTouched("date")}
              />
            </div>

            {/* Qualification */}
            <Divider label="Qualification" />
            <div className={`grid grid-cols-1 gap-4 ${qualGridCls}`}>
              <Dropdown
                label="Academic" field="academic" value={v("academic")}
                onChange={(field, val) => {
                  set(field, val);
                  set("specialization", "");
                  set("subCourse", "");
                }}
                options={["Below SSC","SSC","Intermediate","Polytechnic","ITI","U.G (Degree)","P.G (Degree)","U.G(B.Tech/B.E)","P.G(M.Tech/M.E)"]}
                required error={errors["academic"]} touched={isFieldTouched("academic")}
              />
              {showSpec && (
                <SpecField academic={v("academic")} value={v("specialization")} onChange={set} />
              )}
              {showSubCourse && (
                <SubCourseField
                  academic={v("academic")}
                  specialization={v("specialization")}
                  value={v("subCourse")}
                  onChange={set}
                />
              )}
            </div>

            {/* Row 2: Extra Curricular + Additional Qualification + Driving Licence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <Dropdown label="Extra Curricular" field="extraCurricular" value={v("extraCurricular")} onChange={set}
                options={["Sports","Music","Dance","Drama","NCC","NSS","None"]} />
              <Dropdown label="Additional Qualification" field="additionalQualification" value={v("additionalQualification")} onChange={set}
                options={["Tally","AutoCAD","MS Office","Photoshop","Programming","None"]} />
              <Dropdown label="Driving Licence" field="drivingLicence" value={v("drivingLicence")} onChange={set}
                options={["2 Wheeler","4 Wheeler","Both","None"]} />
            </div>

            {/* Contact & Identity */}
            <Divider label="Contact & Identity" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AadharField value={v("aadharNo")} onChange={set}
                error={errors["aadharNo"]} touched={isFieldTouched("aadharNo")} />
              <Field label="Email Address" field="email" value={v("email")} onChange={set}
                type="email" placeholder="e.g. rahul@email.com" required
                error={errors["email"]} touched={isFieldTouched("email")} />
              <Field label="Mobile (Personal)" field="mobilePersonal" value={v("mobilePersonal")} onChange={set}
                placeholder="e.g. 9876543210" required
                error={errors["mobilePersonal"]} touched={isFieldTouched("mobilePersonal")} />
              <Field label="Mobile (Reference)" field="mobileReference" value={v("mobileReference")} onChange={set}
                placeholder="e.g. 9876543211 (optional)"
                error={errors["mobileReference"]} touched={isFieldTouched("mobileReference")} />
            </div>

            {/* Address */}
            <Divider label="Address" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Field label="H. No." field="hNo" value={v("hNo")} onChange={set}
                placeholder="e.g. 4-56/A" required
                error={errors["hNo"]} touched={isFieldTouched("hNo")} />
              <Field label="Street / Colony" field="streetColony" value={v("streetColony")} onChange={set}
                placeholder="e.g. MG Road" required
                error={errors["streetColony"]} touched={isFieldTouched("streetColony")} />
              <Field label="Area" field="area" value={v("area")} onChange={set}
                placeholder="e.g. Ameerpet" required
                error={errors["area"]} touched={isFieldTouched("area")} />
              <Dropdown label="District" field="district" value={v("district")} onChange={set}
                options={["Hyderabad","Rangareddy","Medchal","Sangareddy","Nalgonda","Warangal","Karimnagar","Other"]}
                required error={errors["district"]} touched={isFieldTouched("district")} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <Dropdown label="House Own / Rent" field="houseOwnRent" value={v("houseOwnRent")} onChange={set}
                options={["Own","Rent"]} />
              <PincodeField
                value={v("pincode")}
                onChange={(f, val) => set(f, val)}
                onLocationFill={({ pincode, area, district }) => {
                  setForm(p => ({
                    ...p,
                    pincode,
                    area: area || p.area,
                    district: district || p.district,
                  }));
                  setTouched(p => ({ ...p, pincode: true, area: true, district: true }));
                }}
                error={errors["pincode"]} touched={isFieldTouched("pincode")}
              />
              <Field label="Reservation (if any)" field="reservation" value={v("reservation")} onChange={set}
                placeholder="e.g. OBC, SC, ST (optional)" />
            </div>

            {/* Physical Information */}
            <Divider label="Physical Information" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <Field label="Height (cm)" field="height" value={v("height")} onChange={set}
                placeholder="e.g. 170"
                error={errors["height"]} touched={isFieldTouched("height")} />
              <Field label="Weight (kg)" field="weight" value={v("weight")} onChange={set}
                placeholder="e.g. 65"
                error={errors["weight"]} touched={isFieldTouched("weight")} />
              <Field label="Eye Sight" field="eyeSite" value={v("eyeSite")} onChange={set}
                placeholder="e.g. 6/6 or Normal" />
              <Dropdown label="Blood Group" field="bloodGroup" value={v("bloodGroup")} onChange={set}
                options={["A+","A-","B+","B-","AB+","AB-","O+","O-"]}
                required error={errors["bloodGroup"]} touched={isFieldTouched("bloodGroup")} />
              <Dropdown label="Any Job" field="anyJob" value={v("anyJob")} onChange={set}
                options={["Yes","No"]} />
            </div>

            {/* Experience */}
            <Divider label="Experience" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <ExperienceField years={v("experienceYears")} months={v("experienceMonths")} onChange={set} />
              <Field label="Company Name" field="companyName" value={v("companyName")} onChange={set}
                placeholder="e.g. Infosys Ltd. (if applicable)" />
              <Field label="Designation" field="designation" value={v("designation")} onChange={set}
                placeholder="e.g. Software Engineer" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <Field label="Last Drawn Salary" field="lastSalary" value={v("lastSalary")} onChange={set}
                placeholder="e.g. ₹25,000/mo" />
              <Field label="Reason for Leaving" field="reasonLeaving" value={v("reasonLeaving")} onChange={set}
                placeholder="e.g. Better opportunity" />
              <Dropdown label="Job Type" field="jobType" value={v("jobType")} onChange={set}
                options={["Full Time","Part Time","Contract","Internship","Self Employed"]} />
              <Field label="Tech Stack Worked" field="techStack" value={v("techStack")} onChange={set}
                placeholder="e.g. React, Django, SQL" />
            </div>

            {/* Digital Signature */}
            <div className="mt-6 flex justify-center sm:justify-end">
              <div className="w-full sm:w-64">
                <SignatureUpload value={signature} onChange={setSignature} />
              </div>
            </div>

            {/* Nature of Job */}
            <Divider label="Nature of Job Interested" />
            <p className="text-xs text-blue-400 font-semibold mb-4 -mt-2">
              Tick any that apply — extra fields will appear to fill in details.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {JOB_ROWS.map(({ field, label, opt1, opt2 }) => (
                <JobRow key={field} label={label} opt1={opt1} opt2={opt2}
                  checked={vb(`${field}_checked` as keyof F)}
                  val1={v(`${field}_v1` as keyof F)}
                  val2={v(`${field}_v2` as keyof F)}
                  onCheck={() => {
                    const cur = vb(`${field}_checked` as keyof F);
                    set(`${field}_checked`, !cur);
                    if (cur) { set(`${field}_v1`, ""); set(`${field}_v2`, ""); }
                  }}
                  onVal1={val => set(`${field}_v1`, val)}
                  onVal2={val => set(`${field}_v2`, val)}
                />
              ))}
            </div>
          </div>
        </Card>

        {/* Submit banners */}
        {submitStatus === "success" && (
          <div className="flex items-center gap-3 px-4 sm:px-5 py-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 shadow-sm">
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <p className="text-sm font-black text-emerald-700">Enrollment submitted successfully!</p>
              <p className="text-xs font-semibold text-emerald-500 mt-0.5">Redirecting to assignment page…</p>
            </div>
          </div>
        )}
        {submitStatus === "error" && (
          <div className="flex items-start gap-3 px-4 sm:px-5 py-4 rounded-2xl bg-red-50 border-2 border-red-200 shadow-sm">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-black text-red-600">Submission failed</p>
              <p className="text-xs font-semibold text-red-400 mt-0.5 break-all">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Submit button */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <button onClick={handleSubmit} disabled={submitting}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 sm:px-16 py-4 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white text-base font-black tracking-wide shadow-xl shadow-blue-200 hover:shadow-2xl hover:shadow-blue-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0">
            {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting…</> : "Submit Enrollment"}
          </button>
          <p className="text-sm font-semibold text-blue-300 text-center">
            Fields marked <span className="text-red-400 font-black">*</span> are required
          </p>
        </div>
      </main>
    </div>
  );
};

export default StudentProfile;