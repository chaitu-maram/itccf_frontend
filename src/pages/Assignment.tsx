// import { useState, useEffect } from "react";
// import {
//   ArrowLeft, ClipboardList, Clock, CheckCircle,
//   ChevronDown, ChevronUp, Loader2, AlertCircle, RefreshCw
// } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";

// /* ═══════════════════════════════════════════════════════════
//    API base
// ═══════════════════════════════════════════════════════════ */
// const BASE = "http://192.168.0.6:8000/api";

// /* ═══════════════════════════════════════════════════════════
//    Types
// ═══════════════════════════════════════════════════════════ */
// interface Question {
//   id: number;
//   question: string;
//   section?: string; // API may or may not return this
// }

// interface APIResponse {
//   student_id: number;
//   student_name: string;
//   questions: Question[] | string[]; // handle both shapes
// }

// /* ═══════════════════════════════════════════════════════════
//    Normalise whatever the API returns into { id, question, section }
//    Supports:
//      - Array of strings           → ["Q1 text", "Q2 text", ...]
//      - Array of objects           → [{ id, question, section? }, ...]
//      - Object with section keys   → { Academic: [...], Aptitude: [...] }
// ═══════════════════════════════════════════════════════════ */
// interface NormQuestion { id: number; question: string; section: string; }

// const normalise = (raw: APIResponse): NormQuestion[] => {
//   const qs = raw.questions;

//   // Case 1: plain string array
//   if (Array.isArray(qs) && typeof qs[0] === "string") {
//     return (qs as string[]).map((q, i) => ({
//       id: i + 1,
//       question: q,
//       section: i < Math.ceil(qs.length / 2) ? "Academic" : "Aptitude",
//     }));
//   }

//   // Case 2: object array
//   if (Array.isArray(qs)) {
//     return (qs as Question[]).map((q, i) => ({
//       id: q.id ?? i + 1,
//       question: q.question,
//       section: q.section ?? (i < qs.length / 2 ? "Academic" : "Aptitude"),
//     }));
//   }

//   // Case 3: object keyed by section  { Academic: [...], Aptitude: [...] }
//   const obj = qs as unknown as Record<string, string[] | Question[]>;
//   const result: NormQuestion[] = [];
//   let counter = 1;
//   Object.entries(obj).forEach(([section, items]) => {
//     (items as (string | Question)[]).forEach(item => {
//       result.push({
//         id: counter++,
//         question: typeof item === "string" ? item : item.question,
//         section,
//       });
//     });
//   });
//   return result;
// };

// /* ═══════════════════════════════════════════════════════════
//    Section style map
// ═══════════════════════════════════════════════════════════ */
// const SECTION_STYLE: Record<string, { badge: string; header: string }> = {
//   Academic: {
//     badge:  "bg-indigo-50 text-indigo-600 border-indigo-200",
//     header: "bg-indigo-600 hover:bg-indigo-700",
//   },
//   Aptitude: {
//     badge:  "bg-amber-50 text-amber-600 border-amber-200",
//     header: "bg-amber-500 hover:bg-amber-600",
//   },
// };

// const getSectionStyle = (section: string) =>
//   SECTION_STYLE[section] ?? {
//     badge:  "bg-slate-50 text-slate-600 border-slate-200",
//     header: "bg-slate-600 hover:bg-slate-700",
//   };

// /* ═══════════════════════════════════════════════════════════
//    QuestionCard
// ═══════════════════════════════════════════════════════════ */
// interface QuestionCardProps {
//   q: NormQuestion;
//   globalIdx: number;
//   answer: string;
//   onChange: (id: number, val: string) => void;
// }

// const QuestionCard = ({ q, globalIdx, answer, onChange }: QuestionCardProps) => {
//   const filled = answer.trim().length > 0;
//   const style  = getSectionStyle(q.section);

//   return (
//     <div className={`rounded-2xl border transition-all duration-200 bg-white overflow-hidden
//       ${filled ? "border-indigo-200 shadow-sm shadow-indigo-100" : "border-slate-200"}`}>

//       {/* Header */}
//       <div className="flex items-start gap-4 px-5 pt-5 pb-3">
//         {/* Number badge */}
//         <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-black
//           ${filled ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400"}`}>
//           {String(globalIdx + 1).padStart(2, "0")}
//         </div>

//         <div className="flex-1 min-w-0">
//           {/* Section tag */}
//           <span className={`inline-block text-[9px] font-extrabold tracking-[0.18em] uppercase
//             border rounded-full px-2.5 py-0.5 mb-2 ${style.badge}`}>
//             {q.section}
//           </span>
//           {/* Question text */}
//           <p className="text-sm font-semibold text-slate-700 leading-relaxed">{q.question}</p>
//         </div>
//       </div>

//       {/* Answer textarea */}
//       <div className="px-5 pb-5">
//         <textarea
//           rows={3}
//           value={answer}
//           onChange={e => onChange(q.id, e.target.value)}
//           placeholder="Type your answer here…"
//           className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3
//             text-sm text-slate-800 placeholder:text-slate-300 resize-none
//             transition-all duration-150
//             focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100
//             focus:bg-white"
//         />
//         <div className="flex justify-end mt-1">
//           <span className="text-[10px] text-slate-300 font-semibold">
//             {answer.trim().length} chars
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════════
//    ProgressBar
// ═══════════════════════════════════════════════════════════ */
// const ProgressBar = ({ answered, total }: { answered: number; total: number }) => {
//   const pct = total > 0 ? Math.round((answered / total) * 100) : 0;
//   return (
//     <div className="flex items-center gap-3">
//       <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
//         <div
//           className="h-full rounded-full bg-indigo-500 transition-all duration-500"
//           style={{ width: `${pct}%` }}
//         />
//       </div>
//       <span className="text-xs font-extrabold text-slate-400 shrink-0">
//         {answered}/{total}
//       </span>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════════
//    SectionBlock — collapsible group of questions
// ═══════════════════════════════════════════════════════════ */
// interface SectionBlockProps {
//   section: string;
//   questions: NormQuestion[];
//   allQuestions: NormQuestion[];
//   answers: Record<number, string>;
//   onChange: (id: number, val: string) => void;
// }

// const SectionBlock = ({ section, questions, allQuestions, answers, onChange }: SectionBlockProps) => {
//   const [open, setOpen] = useState(true);
//   const style = getSectionStyle(section);
//   const sectionAnswered = questions.filter(q => (answers[q.id] || "").trim().length > 0).length;

//   return (
//     <div>
//       <button
//         onClick={() => setOpen(o => !o)}
//         className={`w-full flex items-center justify-between px-5 py-3 rounded-xl
//           text-white mb-3 transition-colors ${style.header}`}>
//         <span className="text-[11px] font-black tracking-[0.18em] uppercase">
//           {section}
//         </span>
//         <div className="flex items-center gap-2">
//           <span className="text-[10px] font-bold opacity-75">
//             {sectionAnswered}/{questions.length} answered
//           </span>
//           {open
//             ? <ChevronUp className="w-4 h-4 opacity-75" />
//             : <ChevronDown className="w-4 h-4 opacity-75" />}
//         </div>
//       </button>

//       {open && (
//         <div className="space-y-4">
//           {questions.map(q => (
//             <QuestionCard
//               key={q.id}
//               q={q}
//               globalIdx={allQuestions.findIndex(aq => aq.id === q.id)}
//               answer={answers[q.id] || ""}
//               onChange={onChange}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════════
//    Main Component
// ═══════════════════════════════════════════════════════════ */
// const Assignment = () => {
//   const location  = useLocation();
//   const state     = location.state as { studentId?: number; name?: string; regnNo?: string } | null;
//   const studentId = state?.studentId;
//   const name      = state?.name   || "Candidate";
//   const regnNo    = state?.regnNo || "—";

//   /* ── Fetch state ── */
//   const [questions, setQuestions]   = useState<NormQuestion[]>([]);
//   const [fetchStatus, setFetchStatus] = useState<"loading" | "success" | "error">("loading");
//   const [fetchError, setFetchError]   = useState("");

//   /* ── Answer + submit state ── */
//   const [answers, setAnswers]     = useState<Record<number, string>>({});
//   const [submitted, setSubmitted] = useState(false);

//   /* ── Fetch questions ── */
//   const fetchQuestions = async () => {
//     if (!studentId) {
//       setFetchStatus("error");
//       setFetchError("No student ID found. Please go back and resubmit the enrollment form.");
//       return;
//     }

//     setFetchStatus("loading");
//     setFetchError("");

//     try {
//       const res = await fetch(`${BASE}/auth/students/${studentId}/generate_questions/`);
//       if (!res.ok) throw new Error(`Server returned ${res.status}`);
//       const data: APIResponse = await res.json();
//       const normalised = normalise(data);
//       if (normalised.length === 0) throw new Error("No questions returned from API.");
//       setQuestions(normalised);
//       setFetchStatus("success");
//     } catch (err: unknown) {
//       setFetchStatus("error");
//       setFetchError(err instanceof Error ? err.message : "Failed to load questions.");
//     }
//   };

//   useEffect(() => { fetchQuestions(); }, [studentId]);

//   /* ── Derived ── */
//   const sections  = [...new Set(questions.map(q => q.section))];
//   const answered  = questions.filter(q => (answers[q.id] || "").trim().length > 0).length;
//   const allDone   = questions.length > 0 && answered === questions.length;

//   const setAnswer = (id: number, val: string) =>
//     setAnswers(prev => ({ ...prev, [id]: val }));

//   const handleSubmit = () => {
//     if (!allDone) return;
//     setSubmitted(true);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   /* ════════════════════════════════════════════════════════
//      SUCCESS SCREEN
//   ════════════════════════════════════════════════════════ */
//   if (submitted) {
//     return (
//       <div className="min-h-screen bg-[#EEF0F8] flex items-center justify-center px-4"
//         style={{ fontFamily: "'Outfit', sans-serif" }}>
//         <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-10 max-w-md w-full text-center">
//           <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200
//             flex items-center justify-center mx-auto mb-5">
//             <CheckCircle className="w-8 h-8 text-emerald-500" />
//           </div>
//           <h2 className="text-xl font-black text-slate-800 tracking-tight mb-2">
//             Assignment Submitted!
//           </h2>
//           <p className="text-sm text-slate-400 font-semibold mb-1">
//             All {questions.length} answers recorded for
//           </p>
//           <p className="text-base font-extrabold text-indigo-600 mb-6">{name}</p>
//           <Link to="/"
//             className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-indigo-600
//               text-white text-sm font-extrabold tracking-wide shadow-lg shadow-indigo-200
//               hover:bg-indigo-700 transition-all">
//             <ArrowLeft className="w-4 h-4" /> Back to Home
//           </Link>
//         </div>
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');`}</style>
//       </div>
//     );
//   }

//   /* ════════════════════════════════════════════════════════
//      MAIN RENDER
//   ════════════════════════════════════════════════════════ */
//   return (
//     <div className="min-h-screen bg-[#EEF0F8]" style={{ fontFamily: "'Outfit', sans-serif" }}>

//       {/* ── Sticky Navbar ── */}
//       <nav className="sticky top-0 z-30 h-14 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
//         <div className="max-w-3xl mx-auto px-6 h-full flex items-center justify-between">
//           <Link to="/" className="flex items-center gap-1.5 text-sm font-semibold
//             text-slate-500 hover:text-indigo-600 transition-colors">
//             <ArrowLeft className="w-4 h-4" /> Back
//           </Link>

//           <div className="flex items-center gap-2">
//             <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center
//               justify-center shadow-md shadow-indigo-200">
//               <ClipboardList className="w-3.5 h-3.5 text-white" />
//             </div>
//             <span className="text-sm font-black tracking-tight text-slate-800">Assignment</span>
//           </div>

//           <span className="text-[9px] font-extrabold tracking-[0.18em] text-indigo-500
//             uppercase bg-indigo-50 px-2.5 py-1 rounded-full">
//             {fetchStatus === "success" ? `${questions.length} Qs` : "Loading…"}
//           </span>
//         </div>
//       </nav>

//       <main className="max-w-3xl mx-auto px-4 py-8 pb-32 space-y-6">

//         {/* ── Header card ── */}
//         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
//           <div className="flex items-start justify-between gap-4">
//             <div>
//               <p className="text-[10px] font-extrabold tracking-[0.18em] uppercase text-slate-400 mb-1">
//                 Candidate Assignment
//               </p>
//               <h1 className="text-lg font-black text-slate-800 tracking-tight">{name}</h1>
//               <p className="text-xs text-slate-400 font-semibold mt-0.5">Regn. No: {regnNo}</p>
//             </div>
//             <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
//               <Clock className="w-4 h-4" />
//               <span className="text-xs font-bold">No time limit</span>
//             </div>
//           </div>

//           {/* Progress — only when loaded */}
//           {fetchStatus === "success" && (
//             <>
//               <div className="mt-5">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-[10px] font-extrabold tracking-[0.15em] uppercase text-slate-400">
//                     Progress
//                   </span>
//                   <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full
//                     ${allDone ? "text-emerald-600 bg-emerald-50" : "text-indigo-500 bg-indigo-50"}`}>
//                     {allDone ? "All answered ✓" : `${questions.length - answered} remaining`}
//                   </span>
//                 </div>
//                 <ProgressBar answered={answered} total={questions.length} />
//               </div>

//               {/* Section legend */}
//               {sections.length > 0 && (
//                 <div className="flex flex-wrap gap-4 mt-4">
//                   {sections.map(sec => {
//                     const style = getSectionStyle(sec);
//                     const count = questions.filter(q => q.section === sec).length;
//                     return (
//                       <div key={sec} className="flex items-center gap-1.5">
//                         <span className={`text-[9px] font-extrabold tracking-[0.15em] uppercase
//                           border rounded-full px-2 py-0.5 ${style.badge}`}>
//                           {sec}
//                         </span>
//                         <span className="text-[10px] font-bold text-slate-400">{count} questions</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </>
//           )}
//         </div>

//         {/* ── LOADING ── */}
//         {fetchStatus === "loading" && (
//           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12
//             flex flex-col items-center gap-4">
//             <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100
//               flex items-center justify-center">
//               <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
//             </div>
//             <div className="text-center">
//               <p className="text-sm font-bold text-slate-700">Generating your questions…</p>
//               <p className="text-xs text-slate-400 mt-1">This may take a few seconds</p>
//             </div>
//           </div>
//         )}

//         {/* ── ERROR ── */}
//         {fetchStatus === "error" && (
//           <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-8
//             flex flex-col items-center gap-4 text-center">
//             <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100
//               flex items-center justify-center">
//               <AlertCircle className="w-6 h-6 text-red-400" />
//             </div>
//             <div>
//               <p className="text-sm font-bold text-red-600 mb-1">Failed to load questions</p>
//               <p className="text-xs text-slate-400 mb-4 max-w-sm">{fetchError}</p>
//               <button
//                 onClick={fetchQuestions}
//                 className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl
//                   bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors">
//                 <RefreshCw className="w-3.5 h-3.5" /> Retry
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ── QUESTIONS — grouped by section ── */}
//         {fetchStatus === "success" && sections.map(section => (
//           <SectionBlock
//             key={section}
//             section={section}
//             questions={questions.filter(q => q.section === section)}
//             allQuestions={questions}
//             answers={answers}
//             onChange={setAnswer}
//           />
//         ))}

//       </main>

//       {/* ── Sticky Submit Footer — only when loaded ── */}
//       {fetchStatus === "success" && (
//         <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur
//           border-t border-slate-200 shadow-lg px-4 py-4">
//           <div className="max-w-3xl mx-auto flex items-center gap-4">
//             <div className="flex-1">
//               <ProgressBar answered={answered} total={questions.length} />
//             </div>
//             <button
//               onClick={handleSubmit}
//               disabled={!allDone}
//               className="shrink-0 px-8 py-3 rounded-xl bg-indigo-600 text-white text-sm
//                 font-extrabold tracking-wide shadow-lg shadow-indigo-300/40
//                 hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0
//                 transition-all duration-200
//                 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0">
//               Submit Assignment
//             </button>
//           </div>
//           {!allDone && (
//             <p className="text-center text-[10px] text-slate-400 font-semibold mt-2">
//               Answer all {questions.length - answered} remaining question{questions.length - answered !== 1 ? "s" : ""} to submit
//             </p>
//           )}
//         </div>
//       )}

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
//         *, *::before, *::after { box-sizing: border-box; }
//       `}</style>
//     </div>
//   );
// };

// export default Assignment;



// import { useState, useEffect } from "react";
// import {
//   ArrowLeft, ClipboardList, Clock, CheckCircle,
//   ChevronDown, ChevronUp, Loader2, AlertCircle, RefreshCw,
//   Trophy, XCircle
// } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";

// /* ═══════════════════════════════════════════════════════════
//    API base
// ═══════════════════════════════════════════════════════════ */
// const BASE = "http://192.168.0.7:8000/api";

// /* ═══════════════════════════════════════════════════════════
//    Types
// ═══════════════════════════════════════════════════════════ */
// interface RawMCQ {
//   id?: number;
//   question: string;
//   options?: string[];            // ["A. ...", "B. ...", "C. ...", "D. ..."]
//   choices?: string[];            // alternate key
//   answer?: string;               // "A" | "B" | "C" | "D"
//   correct_answer?: string;
//   correct?: string;
//   section?: string;
// }

// interface NormMCQ {
//   id: number;
//   question: string;
//   options: string[];             // just the text, index = A/B/C/D
//   correctIndex: number;          // 0-based
//   section: string;
// }

// interface APIResponse {
//   student_id?: number;
//   student_name?: string;
//   questions: RawMCQ[] | string[];
// }

// /* ═══════════════════════════════════════════════════════════
//    Parse MCQ block from raw text  e.g.:
//    "Question: What is...?\nA. ...\nB. ...\nAnswer: B"
// ═══════════════════════════════════════════════════════════ */
// const parseTextBlock = (block: string, id: number, section: string): NormMCQ | null => {
//   const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
//   const qLine = lines.find(l => /^question:/i.test(l));
//   if (!qLine) return null;

//   const question = qLine.replace(/^question:\s*/i, "").trim();
//   const optLines = lines.filter(l => /^[A-D][.)]\s+/i.test(l));
//   const ansLine  = lines.find(l => /^answer:/i.test(l));

//   if (optLines.length < 2) return null;

//   const options = optLines.map(l => l.replace(/^[A-D][.)]\s+/i, "").trim());
//   const ansLetter = ansLine ? ansLine.replace(/^answer:\s*/i, "").trim().toUpperCase().charAt(0) : "A";
//   const correctIndex = "ABCD".indexOf(ansLetter);

//   return { id, question, options, correctIndex: correctIndex >= 0 ? correctIndex : 0, section };
// };

// const letterToIndex = (letter: string): number => {
//   const idx = "ABCD".indexOf(letter.trim().toUpperCase().charAt(0));
//   return idx >= 0 ? idx : 0;
// };

// /* ═══════════════════════════════════════════════════════════
//    Normalise API response → NormMCQ[]
// ═══════════════════════════════════════════════════════════ */
// const normalise = (raw: APIResponse): NormMCQ[] => {
//   const qs = raw.questions;
//   const result: NormMCQ[] = [];

//   // Case 1: array of plain text blocks (each is an MCQ string)
//   if (Array.isArray(qs) && typeof qs[0] === "string") {
//     (qs as string[]).forEach((block, i) => {
//       const section = i < Math.ceil(qs.length / 2) ? "Academic" : "Aptitude";
//       const q = parseTextBlock(block, i + 1, section);
//       if (q) result.push(q);
//     });
//     return result;
//   }

//   // Case 2: array of objects
//   if (Array.isArray(qs)) {
//     (qs as RawMCQ[]).forEach((q, i) => {
//       const section = q.section ?? (i < qs.length / 2 ? "Academic" : "Aptitude");
//       const rawOptions = q.options ?? q.choices ?? [];
//       const rawAnswer  = q.answer ?? q.correct_answer ?? q.correct ?? "A";

//       // If options still include prefix letters like "A. text", strip them
//       const options = rawOptions.map(o => o.replace(/^[A-D][.)]\s+/i, "").trim());

//       if (options.length >= 2) {
//         result.push({
//           id: q.id ?? i + 1,
//           question: q.question,
//           options,
//           correctIndex: letterToIndex(rawAnswer),
//           section,
//         });
//       } else {
//         // fallback: treat object as text block
//         const text = `Question: ${q.question}\n${rawOptions.join("\n")}\nAnswer: ${rawAnswer}`;
//         const parsed = parseTextBlock(text, q.id ?? i + 1, section);
//         if (parsed) result.push(parsed);
//       }
//     });
//     return result;
//   }

//   // Case 3: keyed by section  { Academic: [...], Aptitude: [...] }
//   const obj = qs as unknown as Record<string, (string | RawMCQ)[]>;
//   let counter = 1;
//   Object.entries(obj).forEach(([section, items]) => {
//     items.forEach(item => {
//       if (typeof item === "string") {
//         const q = parseTextBlock(item, counter++, section);
//         if (q) result.push(q);
//       } else {
//         const rawOptions = item.options ?? item.choices ?? [];
//         const rawAnswer  = item.answer ?? item.correct_answer ?? item.correct ?? "A";
//         const options = rawOptions.map(o => o.replace(/^[A-D][.)]\s+/i, "").trim());
//         if (options.length >= 2) {
//           result.push({ id: counter++, question: item.question, options, correctIndex: letterToIndex(rawAnswer), section });
//         }
//       }
//     });
//   });
//   return result;
// };

// /* ═══════════════════════════════════════════════════════════
//    Section style map
// ═══════════════════════════════════════════════════════════ */
// const SECTION_STYLE: Record<string, { badge: string; header: string }> = {
//   Academic: { badge: "bg-indigo-50 text-indigo-600 border-indigo-200", header: "bg-indigo-600 hover:bg-indigo-700" },
//   Aptitude: { badge: "bg-amber-50 text-amber-600 border-amber-200",   header: "bg-amber-500 hover:bg-amber-600" },
// };
// const getSectionStyle = (section: string) =>
//   SECTION_STYLE[section] ?? { badge: "bg-slate-50 text-slate-600 border-slate-200", header: "bg-slate-600 hover:bg-slate-700" };

// /* ═══════════════════════════════════════════════════════════
//    Option label helper
// ═══════════════════════════════════════════════════════════ */
// const OPTION_LETTERS = ["A", "B", "C", "D"];

// /* ═══════════════════════════════════════════════════════════
//    MCQCard
// ═══════════════════════════════════════════════════════════ */
// interface MCQCardProps {
//   q: NormMCQ;
//   globalIdx: number;
//   selected: number | null;        // chosen option index (0-based), or null
//   onSelect: (id: number, optIndex: number) => void;
// }

// const MCQCard = ({ q, globalIdx, selected, onSelect }: MCQCardProps) => {
//   const answered = selected !== null;
//   const style    = getSectionStyle(q.section);

//   return (
//     <div className={`rounded-2xl border transition-all duration-200 bg-white overflow-hidden
//       ${answered ? "border-indigo-200 shadow-sm shadow-indigo-100" : "border-slate-200"}`}>

//       {/* Header */}
//       <div className="flex items-start gap-4 px-5 pt-5 pb-3">
//         <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-black
//           ${answered ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400"}`}>
//           {String(globalIdx + 1).padStart(2, "0")}
//         </div>
//         <div className="flex-1 min-w-0">
//           <span className={`inline-block text-[9px] font-extrabold tracking-[0.18em] uppercase
//             border rounded-full px-2.5 py-0.5 mb-2 ${style.badge}`}>
//             {q.section}
//           </span>
//           <p className="text-sm font-semibold text-slate-700 leading-relaxed">{q.question}</p>
//         </div>
//       </div>

//       {/* Options */}
//       <div className="px-5 pb-5 space-y-2.5">
//         {q.options.map((opt, idx) => {
//           const isSelected = selected === idx;
//           return (
//             <button
//               key={idx}
//               onClick={() => onSelect(q.id, idx)}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left
//                 transition-all duration-150 group
//                 ${isSelected
//                   ? "border-indigo-400 bg-indigo-50 shadow-sm shadow-indigo-100"
//                   : "border-slate-200 bg-slate-50 hover:border-indigo-200 hover:bg-indigo-50/40"
//                 }`}
//             >
//               {/* Letter badge */}
//               <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px]
//                 font-black shrink-0 transition-colors
//                 ${isSelected
//                   ? "bg-indigo-600 text-white"
//                   : "bg-white border border-slate-200 text-slate-400 group-hover:border-indigo-200 group-hover:text-indigo-400"
//                 }`}>
//                 {OPTION_LETTERS[idx]}
//               </span>
//               <span className={`text-sm font-semibold leading-snug
//                 ${isSelected ? "text-indigo-700" : "text-slate-600"}`}>
//                 {opt}
//               </span>
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════════
//    ProgressBar
// ═══════════════════════════════════════════════════════════ */
// const ProgressBar = ({ answered, total }: { answered: number; total: number }) => {
//   const pct = total > 0 ? Math.round((answered / total) * 100) : 0;
//   return (
//     <div className="flex items-center gap-3">
//       <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
//         <div className="h-full rounded-full bg-indigo-500 transition-all duration-500"
//           style={{ width: `${pct}%` }} />
//       </div>
//       <span className="text-xs font-extrabold text-slate-400 shrink-0">{answered}/{total}</span>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════════
//    SectionBlock — collapsible group of MCQs
// ═══════════════════════════════════════════════════════════ */
// interface SectionBlockProps {
//   section: string;
//   questions: NormMCQ[];
//   allQuestions: NormMCQ[];
//   selections: Record<number, number>;
//   onSelect: (id: number, optIndex: number) => void;
// }

// const SectionBlock = ({ section, questions, allQuestions, selections, onSelect }: SectionBlockProps) => {
//   const [open, setOpen] = useState(true);
//   const style = getSectionStyle(section);
//   const sectionAnswered = questions.filter(q => selections[q.id] !== undefined).length;

//   return (
//     <div>
//       <button
//         onClick={() => setOpen(o => !o)}
//         className={`w-full flex items-center justify-between px-5 py-3 rounded-xl
//           text-white mb-3 transition-colors ${style.header}`}>
//         <span className="text-[11px] font-black tracking-[0.18em] uppercase">{section}</span>
//         <div className="flex items-center gap-2">
//           <span className="text-[10px] font-bold opacity-75">{sectionAnswered}/{questions.length} answered</span>
//           {open ? <ChevronUp className="w-4 h-4 opacity-75" /> : <ChevronDown className="w-4 h-4 opacity-75" />}
//         </div>
//       </button>

//       {open && (
//         <div className="space-y-4">
//           {questions.map(q => (
//             <MCQCard
//               key={q.id}
//               q={q}
//               globalIdx={allQuestions.findIndex(aq => aq.id === q.id)}
//               selected={selections[q.id] ?? null}
//               onSelect={onSelect}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════════
//    Results screen
// ═══════════════════════════════════════════════════════════ */
// interface ResultsProps {
//   questions: NormMCQ[];
//   selections: Record<number, number>;
//   name: string;
// }

// const ResultsScreen = ({ questions, selections, name }: ResultsProps) => {
//   const score  = questions.filter(q => selections[q.id] === q.correctIndex).length;
//   const total  = questions.length;
//   const pct    = Math.round((score / total) * 100);
//   const passed = pct >= 50;

//   return (
//     <div className="min-h-screen bg-[#EEF0F8] px-4 py-10" style={{ fontFamily: "'Outfit', sans-serif" }}>
//       <div className="max-w-2xl mx-auto space-y-6">

//         {/* Score card */}
//         <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center">
//           <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5
//             ${passed ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"}`}>
//             {passed
//               ? <Trophy className="w-8 h-8 text-emerald-500" />
//               : <XCircle className="w-8 h-8 text-red-400" />}
//           </div>

//           <h2 className="text-xl font-black text-slate-800 tracking-tight mb-1">
//             {passed ? "Well Done!" : "Better Luck Next Time"}
//           </h2>
//           <p className="text-sm text-slate-400 font-semibold mb-4">{name}</p>

//           {/* Big score */}
//           <div className={`inline-flex items-end gap-1 px-8 py-4 rounded-2xl mb-3
//             ${passed ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"}`}>
//             <span className={`text-5xl font-black ${passed ? "text-emerald-600" : "text-red-500"}`}>
//               {score}
//             </span>
//             <span className="text-xl font-extrabold text-slate-400 mb-1.5">/{total}</span>
//           </div>

//           <p className={`text-sm font-extrabold mb-6 ${passed ? "text-emerald-600" : "text-red-500"}`}>
//             {pct}% correct
//           </p>

//           <Link to="/hr/dashboard"
//             className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-indigo-600
//               text-white text-sm font-extrabold tracking-wide shadow-lg shadow-indigo-200
//               hover:bg-indigo-700 transition-all">
//             <ArrowLeft className="w-4 h-4" /> Back to Home
//           </Link>
//         </div>

//         {/* Question-by-question review */}
//         <div className="space-y-4">
//           <h3 className="text-xs font-black tracking-[0.18em] uppercase text-slate-400 px-1">
//             Question Review
//           </h3>
//           {questions.map((q, globalIdx) => {
//             const chosen  = selections[q.id] ?? null;
//             const correct = q.correctIndex;
//             const isRight = chosen === correct;

//             return (
//               <div key={q.id} className={`bg-white rounded-2xl border overflow-hidden
//                 ${isRight ? "border-emerald-200" : "border-red-200"}`}>

//                 {/* Question header */}
//                 <div className={`px-5 py-3 flex items-center gap-3
//                   ${isRight ? "bg-emerald-50" : "bg-red-50"}`}>
//                   <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black
//                     ${isRight ? "bg-emerald-500 text-white" : "bg-red-400 text-white"}`}>
//                     {String(globalIdx + 1).padStart(2, "0")}
//                   </div>
//                   <p className="text-sm font-bold text-slate-700 flex-1 leading-snug">{q.question}</p>
//                   {isRight
//                     ? <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
//                     : <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
//                 </div>

//                 {/* Options */}
//                 <div className="px-5 py-4 space-y-2">
//                   {q.options.map((opt, idx) => {
//                     const isChosen  = chosen === idx;
//                     const isCorrect = correct === idx;
//                     let cls = "border-slate-100 bg-slate-50 text-slate-500";
//                     let badgeCls = "bg-slate-200 text-slate-500";

//                     if (isCorrect) {
//                       cls      = "border-emerald-200 bg-emerald-50 text-emerald-700";
//                       badgeCls = "bg-emerald-500 text-white";
//                     } else if (isChosen && !isCorrect) {
//                       cls      = "border-red-200 bg-red-50 text-red-600";
//                       badgeCls = "bg-red-400 text-white";
//                     }

//                     return (
//                       <div key={idx} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border ${cls}`}>
//                         <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 ${badgeCls}`}>
//                           {OPTION_LETTERS[idx]}
//                         </span>
//                         <span className="text-xs font-semibold leading-snug">{opt}</span>
//                         {isCorrect && <span className="ml-auto text-[9px] font-extrabold text-emerald-600 uppercase tracking-wide">Correct</span>}
//                         {isChosen && !isCorrect && <span className="ml-auto text-[9px] font-extrabold text-red-500 uppercase tracking-wide">Your answer</span>}
//                       </div>
//                     );
//                   })}
//                   {chosen === null && (
//                     <p className="text-[10px] font-bold text-slate-400 italic pl-1">Not attempted</p>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//       <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');`}</style>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════════
//    Main Component
// ═══════════════════════════════════════════════════════════ */
// const Assignment = () => {
//   const location  = useLocation();
//   const state     = location.state as { studentId?: number; name?: string; regnNo?: string } | null;
//   const studentId = state?.studentId;
//   const name      = state?.name   || "Candidate";
//   const regnNo    = state?.regnNo || "—";

//   /* ── Fetch state ── */
//   const [questions, setQuestions]     = useState<NormMCQ[]>([]);
//   const [fetchStatus, setFetchStatus] = useState<"loading" | "success" | "error">("loading");
//   const [fetchError, setFetchError]   = useState("");

//   /* ── Selection + submit state ── */
//   const [selections, setSelections] = useState<Record<number, number>>({}); // qId → optionIndex
//   const [submitted, setSubmitted]   = useState(false);

//   /* ── Fetch questions ── */
//   const fetchQuestions = async () => {
//     if (!studentId) {
//       setFetchStatus("error");
//       setFetchError("No student ID found. Please go back and resubmit the enrollment form.");
//       return;
//     }
//     setFetchStatus("loading");
//     setFetchError("");
//     try {
//       const res = await fetch(`${BASE}/auth/students/${studentId}/generate_questions/`);
//       if (!res.ok) throw new Error(`Server returned ${res.status}`);
//       const data: APIResponse = await res.json();
//       const normalised = normalise(data);
//       if (normalised.length === 0) throw new Error("No MCQ questions returned from API.");
//       setQuestions(normalised);
//       setFetchStatus("success");
//     } catch (err: unknown) {
//       setFetchStatus("error");
//       setFetchError(err instanceof Error ? err.message : "Failed to load questions.");
//     }
//   };

//   useEffect(() => { fetchQuestions(); }, [studentId]);

//   /* ── Derived ── */
//   const sections  = [...new Set(questions.map(q => q.section))];
//   const answered  = questions.filter(q => selections[q.id] !== undefined).length;
//   const allDone   = questions.length > 0 && answered === questions.length;

//   const handleSelect = (id: number, optIndex: number) =>
//     setSelections(prev => ({ ...prev, [id]: optIndex }));

//   const handleSubmit = async () => {
//     if (!allDone) return;

//     const score = questions.filter(q => selections[q.id] === q.correctIndex).length;
//     const percentage = parseFloat(((score / questions.length) * 100).toFixed(2));

//     try {
//       const res = await fetch(`${BASE}/auth/students/${studentId}/submit_score/`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ score: percentage }),
//       });
//       if (!res.ok) console.error("Score save failed:", await res.text());
//     } catch (err) {
//       console.error("Score save error:", err);
//     }

//     setSubmitted(true);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   /* ════════════════════════════════════════════════════════
//      RESULTS SCREEN
//   ════════════════════════════════════════════════════════ */
//   if (submitted) {
//     return <ResultsScreen questions={questions} selections={selections} name={name} />;
//   }

//   /* ════════════════════════════════════════════════════════
//      MAIN RENDER
//   ════════════════════════════════════════════════════════ */
//   return (
//     <div className="min-h-screen bg-[#EEF0F8]" style={{ fontFamily: "'Outfit', sans-serif" }}>

//       {/* ── Sticky Navbar ── */}
//       <nav className="sticky top-0 z-30 h-14 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
//         <div className="max-w-3xl mx-auto px-6 h-full flex items-center justify-between">
//           <Link to="/studentprofile" className="flex items-center gap-1.5 text-sm font-semibold
//             text-slate-500 hover:text-indigo-600 transition-colors">
//             <ArrowLeft className="w-4 h-4" /> Back
//           </Link>
//           <div className="flex items-center gap-2">
//             <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center
//               justify-center shadow-md shadow-indigo-200">
//               <ClipboardList className="w-3.5 h-3.5 text-white" />
//             </div>
//             <span className="text-sm font-black tracking-tight text-slate-800">MCQ Assignment</span>
//           </div>
//           <span className="text-[9px] font-extrabold tracking-[0.18em] text-indigo-500
//             uppercase bg-indigo-50 px-2.5 py-1 rounded-full">
//             {fetchStatus === "success" ? `${questions.length} Qs` : "Loading…"}
//           </span>
//         </div>
//       </nav>

//       <main className="max-w-3xl mx-auto px-4 py-8 pb-32 space-y-6">

//         {/* ── Header card ── */}
//         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
//           <div className="flex items-start justify-between gap-4">
//             <div>
//               <p className="text-[10px] font-extrabold tracking-[0.18em] uppercase text-slate-400 mb-1">
//                 Candidate MCQ Test
//               </p>
//               <h1 className="text-lg font-black text-slate-800 tracking-tight">{name}</h1>
//               <p className="text-xs text-slate-400 font-semibold mt-0.5">Regn. No: {regnNo}</p>
//             </div>
//             <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
//               <Clock className="w-4 h-4" />
//               <span className="text-xs font-bold">No time limit</span>
//             </div>
//           </div>

//           {fetchStatus === "success" && (
//             <>
//               <div className="mt-5">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-[10px] font-extrabold tracking-[0.15em] uppercase text-slate-400">
//                     Progress
//                   </span>
//                   <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full
//                     ${allDone ? "text-emerald-600 bg-emerald-50" : "text-indigo-500 bg-indigo-50"}`}>
//                     {allDone ? "All answered ✓" : `${questions.length - answered} remaining`}
//                   </span>
//                 </div>
//                 <ProgressBar answered={answered} total={questions.length} />
//               </div>

//               {sections.length > 0 && (
//                 <div className="flex flex-wrap gap-4 mt-4">
//                   {sections.map(sec => {
//                     const style = getSectionStyle(sec);
//                     const count = questions.filter(q => q.section === sec).length;
//                     return (
//                       <div key={sec} className="flex items-center gap-1.5">
//                         <span className={`text-[9px] font-extrabold tracking-[0.15em] uppercase
//                           border rounded-full px-2 py-0.5 ${style.badge}`}>{sec}</span>
//                         <span className="text-[10px] font-bold text-slate-400">{count} questions</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </>
//           )}
//         </div>

//         {/* ── LOADING ── */}
//         {fetchStatus === "loading" && (
//           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12
//             flex flex-col items-center gap-4">
//             <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100
//               flex items-center justify-center">
//               <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
//             </div>
//             <div className="text-center">
//               <p className="text-sm font-bold text-slate-700">Generating your questions…</p>
//               <p className="text-xs text-slate-400 mt-1">This may take a few seconds</p>
//             </div>
//           </div>
//         )}

//         {/* ── ERROR ── */}
//         {fetchStatus === "error" && (
//           <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-8
//             flex flex-col items-center gap-4 text-center">
//             <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100
//               flex items-center justify-center">
//               <AlertCircle className="w-6 h-6 text-red-400" />
//             </div>
//             <div>
//               <p className="text-sm font-bold text-red-600 mb-1">Failed to load questions</p>
//               <p className="text-xs text-slate-400 mb-4 max-w-sm">{fetchError}</p>
//               <button onClick={fetchQuestions}
//                 className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl
//                   bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors">
//                 <RefreshCw className="w-3.5 h-3.5" /> Retry
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ── MCQ QUESTIONS — grouped by section ── */}
//         {fetchStatus === "success" && sections.map(section => (
//           <SectionBlock
//             key={section}
//             section={section}
//             questions={questions.filter(q => q.section === section)}
//             allQuestions={questions}
//             selections={selections}
//             onSelect={handleSelect}
//           />
//         ))}

//       </main>

//       {/* ── Sticky Submit Footer ── */}
//       {fetchStatus === "success" && (
//         <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur
//           border-t border-slate-200 shadow-lg px-4 py-4">
//           <div className="max-w-3xl mx-auto flex items-center gap-4">
//             <div className="flex-1">
//               <ProgressBar answered={answered} total={questions.length} />
//             </div>
//             <button
//               onClick={handleSubmit}
//               disabled={!allDone}
//               className="shrink-0 px-8 py-3 rounded-xl bg-indigo-600 text-white text-sm
//                 font-extrabold tracking-wide shadow-lg shadow-indigo-300/40
//                 hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0
//                 transition-all duration-200
//                 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0">
//               Submit Test
//             </button>
//           </div>
//           {!allDone && (
//             <p className="text-center text-[10px] text-slate-400 font-semibold mt-2">
//               Answer all {questions.length - answered} remaining question{questions.length - answered !== 1 ? "s" : ""} to submit
//             </p>
//           )}
//         </div>
//       )}

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
//         *, *::before, *::after { box-sizing: border-box; }
//       `}</style>
//     </div>
//   );
// };

// export default Assignment;


// import { useState, useEffect } from "react";
// import {
//   ArrowLeft, ClipboardList, CheckCircle, Loader2,
//   AlertCircle, RefreshCw, Trophy, XCircle, Printer
// } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";

// const BASE = "http://192.168.0.7:8000/api";

// /* ── Types ── */
// interface RawMCQ {
//   id?: number;
//   question: string;
//   options?: string[];
//   choices?: string[];
//   answer?: string;
//   correct_answer?: string;
//   correct?: string;
//   section?: string;
// }
// interface NormMCQ {
//   id: number;
//   question: string;
//   options: string[];
//   correctIndex: number;
//   section: string;
// }
// interface APIResponse {
//   student_id?: number;
//   student_name?: string;
//   questions: RawMCQ[] | string[];
// }

// /* ── Parsers (unchanged logic) ── */
// const parseTextBlock = (block: string, id: number, section: string): NormMCQ | null => {
//   const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
//   const qLine = lines.find(l => /^question:/i.test(l));
//   if (!qLine) return null;
//   const question = qLine.replace(/^question:\s*/i, "").trim();
//   const optLines = lines.filter(l => /^[A-D][.)]\s+/i.test(l));
//   const ansLine  = lines.find(l => /^answer:/i.test(l));
//   if (optLines.length < 2) return null;
//   const options = optLines.map(l => l.replace(/^[A-D][.)]\s+/i, "").trim());
//   const ansLetter = ansLine ? ansLine.replace(/^answer:\s*/i, "").trim().toUpperCase().charAt(0) : "A";
//   const correctIndex = "ABCD".indexOf(ansLetter);
//   return { id, question, options, correctIndex: correctIndex >= 0 ? correctIndex : 0, section };
// };
// const letterToIndex = (letter: string): number => {
//   const idx = "ABCD".indexOf(letter.trim().toUpperCase().charAt(0));
//   return idx >= 0 ? idx : 0;
// };
// const normalise = (raw: APIResponse): NormMCQ[] => {
//   const qs = raw.questions;
//   const result: NormMCQ[] = [];
//   if (Array.isArray(qs) && typeof qs[0] === "string") {
//     (qs as string[]).forEach((block, i) => {
//       const section = i < 10 ? "Personal" : i < 20 ? "Technical" : "Professional";
//       const q = parseTextBlock(block, i + 1, section);
//       if (q) result.push(q);
//     });
//     return result;
//   }
//   if (Array.isArray(qs)) {
//     (qs as RawMCQ[]).forEach((q, i) => {
//       const section = q.section ?? (i < 10 ? "Personal" : i < 20 ? "Technical" : "Professional");
//       const rawOptions = q.options ?? q.choices ?? [];
//       const rawAnswer  = q.answer ?? q.correct_answer ?? q.correct ?? "A";
//       const options = rawOptions.map(o => o.replace(/^[A-D][.)]\s+/i, "").trim());
//       if (options.length >= 2) {
//         result.push({ id: q.id ?? i + 1, question: q.question, options, correctIndex: letterToIndex(rawAnswer), section });
//       } else {
//         const text = `Question: ${q.question}\n${rawOptions.join("\n")}\nAnswer: ${rawAnswer}`;
//         const parsed = parseTextBlock(text, q.id ?? i + 1, section);
//         if (parsed) result.push(parsed);
//       }
//     });
//     return result;
//   }
//   const obj = qs as unknown as Record<string, (string | RawMCQ)[]>;
//   let counter = 1;
//   Object.entries(obj).forEach(([section, items]) => {
//     items.forEach(item => {
//       if (typeof item === "string") {
//         const q = parseTextBlock(item, counter++, section);
//         if (q) result.push(q);
//       } else {
//         const rawOptions = item.options ?? item.choices ?? [];
//         const rawAnswer  = item.answer ?? item.correct_answer ?? item.correct ?? "A";
//         const options = rawOptions.map(o => o.replace(/^[A-D][.)]\s+/i, "").trim());
//         if (options.length >= 2)
//           result.push({ id: counter++, question: item.question, options, correctIndex: letterToIndex(rawAnswer), section });
//       }
//     });
//   });
//   return result;
// };

// /* ── Section config ── */
// const SECTIONS = [
//   { key: "Personal",     label: "Personal / Psychology / Attitude", color: "#1a3a5c", light: "#e8f0fb", accent: "#2563eb" },
//   { key: "Technical",    label: "Technical",                         color: "#1a4a2e", light: "#e6f4ec", accent: "#16a34a" },
//   { key: "Professional", label: "Professional / Responsibility",     color: "#4a1a1a", light: "#fdf0ee", accent: "#dc2626" },
// ];

// /* ── Score column per section ── */
// const ScoreColumn = ({
//   questions, checked, onToggle
// }: {
//   questions: NormMCQ[];
//   checked: Record<number, boolean>;
//   onToggle: (id: number) => void;
// }) => {
//   const rows = Array.from({ length: 10 }, (_, i) => questions[i] ?? null);
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
//       {rows.map((q, i) => (
//         <div key={i} style={{
//           display: "flex", alignItems: "center", gap: 10,
//           padding: "5px 8px",
//           borderBottom: "1px solid #e2e8f0",
//           minHeight: 36,
//           background: i % 2 === 0 ? "#fff" : "#fafbff",
//         }}>
//           <span style={{ fontSize: 11, fontWeight: 700, color: "#64748b", width: 18, flexShrink: 0 }}>
//             {i + 1}.
//           </span>
//           {q ? (
//             <>
//               <span style={{
//                 flex: 1, fontSize: 11, color: "#334155", lineHeight: 1.4,
//                 overflow: "hidden", display: "-webkit-box",
//                 WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const,
//               }}>
//                 {q.question}
//               </span>
//               <label style={{ display: "flex", alignItems: "center", cursor: "pointer", flexShrink: 0 }}>
//                 <input
//                   type="checkbox"
//                   checked={!!checked[q.id]}
//                   onChange={() => onToggle(q.id)}
//                   style={{ display: "none" }}
//                 />
//                 <span style={{
//                   width: 22, height: 22, borderRadius: 5,
//                   border: `2px solid ${checked[q.id] ? "#2563eb" : "#cbd5e1"}`,
//                   background: checked[q.id] ? "#2563eb" : "#fff",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   transition: "all 0.15s", flexShrink: 0,
//                 }}>
//                   {checked[q.id] && (
//                     <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
//                       <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                   )}
//                 </span>
//               </label>
//             </>
//           ) : (
//             <span style={{ flex: 1 }} />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// /* ── Main Component ── */
// const Assignment = () => {
//   const location  = useLocation();
//   const state     = location.state as {
//     studentId?: number; name?: string; regnNo?: string;
//     hobbies?: string; vision?: string; lifeAmbition?: string;
//     relatedTrack?: string; comfortZone?: string;
//     directJob?: string; trainingRequired?: string;
//     expectedSalary?: string; negotiable?: string;
//   } | null;

//   const studentId = state?.studentId;
//   const name      = state?.name   || "Candidate";
//   const regnNo    = state?.regnNo || "—";

//   /* Auto-fill from student state */
//   const hobbies       = state?.hobbies        || "—";
//   const vision        = state?.vision         || "—";
//   const lifeAmbition  = state?.lifeAmbition   || "—";
//   const relatedTrack  = state?.relatedTrack   || "—";
//   const comfortZone   = state?.comfortZone    || "—";
//   const directJob     = state?.directJob      || "—";
//   const trainingReq   = state?.trainingRequired || "—";
//   const expectedSal   = state?.expectedSalary || "—";
//   const negotiable    = state?.negotiable     || "—";

//   /* Fetch state */
//   const [questions, setQuestions]     = useState<NormMCQ[]>([]);
//   const [fetchStatus, setFetchStatus] = useState<"loading" | "success" | "error">("loading");
//   const [fetchError, setFetchError]   = useState("");

//   /* Checkbox state per question */
//   const [checked, setChecked] = useState<Record<number, boolean>>({});
//   const [submitted, setSubmitted] = useState(false);
//   const [profileAccepted, setProfileAccepted] = useState<"Y" | "N" | null>(null);
//   const [hrSatisfactory, setHrSatisfactory] = useState("");

//   const fetchQuestions = async () => {
//     if (!studentId) {
//       setFetchStatus("error");
//       setFetchError("No student ID found. Please go back and resubmit.");
//       return;
//     }
//     setFetchStatus("loading");
//     setFetchError("");
//     try {
//       const res = await fetch(`${BASE}/auth/students/${studentId}/generate_questions/`);
//       if (!res.ok) throw new Error(`Server returned ${res.status}`);
//       const data: APIResponse = await res.json();
//       const normalised = normalise(data);
//       if (normalised.length === 0) throw new Error("No questions returned from API.");
//       setQuestions(normalised);
//       setFetchStatus("success");
//     } catch (err: unknown) {
//       setFetchStatus("error");
//       setFetchError(err instanceof Error ? err.message : "Failed to load questions.");
//     }
//   };

//   useEffect(() => { fetchQuestions(); }, [studentId]);

//   const toggleCheck = (id: number) =>
//     setChecked(prev => ({ ...prev, [id]: !prev[id] }));

//   const sectionQs = (key: string) => questions.filter(q => q.section === key);
//   const sectionScore = (key: string) => {
//     const qs = sectionQs(key);
//     return qs.filter(q => checked[q.id]).length;
//   };
//   const totalScore = SECTIONS.reduce((s, sec) => s + sectionScore(sec.key), 0);
//   const totalMax   = questions.length;

//   const handleSubmit = async () => {
//     const percentage = totalMax > 0 ? parseFloat(((totalScore / totalMax) * 100).toFixed(2)) : 0;
//     try {
//       const res = await fetch(`${BASE}/auth/students/${studentId}/submit_score/`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ score: percentage }),
//       });
//       if (!res.ok) console.error("Score save failed:", await res.text());
//     } catch (err) { console.error("Score save error:", err); }
//     setSubmitted(true);
//   };

//   /* ── Submitted screen ── */
//   if (submitted) {
//     const pct    = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;
//     const passed = pct >= 50;
//     return (
//       <div style={{ minHeight: "100vh", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", padding: 24 }}>
//         <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e2e8f0", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", padding: 48, maxWidth: 440, width: "100%", textAlign: "center" }}>
//           <div style={{ width: 64, height: 64, borderRadius: 18, background: passed ? "#f0fdf4" : "#fef2f2", border: `1px solid ${passed ? "#bbf7d0" : "#fecaca"}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
//             {passed ? <Trophy size={32} color="#16a34a" /> : <XCircle size={32} color="#dc2626" />}
//           </div>
//           <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
//             {passed ? "Interview Complete" : "Interview Recorded"}
//           </h2>
//           <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 24px", fontWeight: 500 }}>{name} · {regnNo}</p>
//           <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 24 }}>
//             {SECTIONS.map(sec => (
//               <div key={sec.key} style={{ background: sec.light, border: `1px solid ${sec.accent}22`, borderRadius: 12, padding: "10px 18px", textAlign: "center" }}>
//                 <div style={{ fontSize: 22, fontWeight: 900, color: sec.accent }}>{sectionScore(sec.key)}/10</div>
//                 <div style={{ fontSize: 10, fontWeight: 700, color: sec.color, marginTop: 2 }}>{sec.key}</div>
//               </div>
//             ))}
//           </div>
//           <div style={{ fontSize: 32, fontWeight: 900, color: passed ? "#16a34a" : "#dc2626", marginBottom: 6 }}>
//             {totalScore}/{totalMax}
//           </div>
//           <p style={{ fontSize: 13, fontWeight: 700, color: passed ? "#16a34a" : "#dc2626", marginBottom: 28 }}>{pct}% score</p>
//           <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
//             <Link to="/hr/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 10, background: "#1e40af", color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
//               <ArrowLeft size={14} /> Dashboard
//             </Link>
//             <button onClick={() => window.print()} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 10, background: "#f8fafc", border: "1.5px solid #e2e8f0", color: "#334155", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
//               <Printer size={14} /> Print
//             </button>
//           </div>
//         </div>
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>
//       </div>
//     );
//   }

//   /* ── Loading / Error ── */
//   if (fetchStatus === "loading") {
//     return (
//       <div style={{ minHeight: "100vh", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
//         <div style={{ textAlign: "center" }}>
//           <Loader2 size={36} color="#2563eb" style={{ animation: "spin 1s linear infinite", display: "block", margin: "0 auto 14px" }} />
//           <p style={{ fontSize: 14, fontWeight: 600, color: "#64748b" }}>Generating interview questions…</p>
//         </div>
//         <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}} @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>
//       </div>
//     );
//   }

//   if (fetchStatus === "error") {
//     return (
//       <div style={{ minHeight: "100vh", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
//         <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #fecaca", padding: 40, textAlign: "center", maxWidth: 400 }}>
//           <AlertCircle size={36} color="#dc2626" style={{ margin: "0 auto 14px" }} />
//           <p style={{ fontSize: 14, fontWeight: 700, color: "#dc2626", marginBottom: 8 }}>Failed to load questions</p>
//           <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 20 }}>{fetchError}</p>
//           <button onClick={fetchQuestions} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 20px", borderRadius: 9, background: "#2563eb", color: "#fff", fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer" }}>
//             <RefreshCw size={13} /> Retry
//           </button>
//         </div>
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>
//       </div>
//     );
//   }

//   /* ── MAIN SCORESHEET ── */
//   return (
//     <div style={{ minHeight: "100vh", background: "#edf2f7", fontFamily: "'DM Sans', sans-serif", paddingBottom: 80 }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
//         * { box-sizing: border-box; }
//         @media print {
//           .no-print { display: none !important; }
//           body { background: white; }
//           .print-sheet { box-shadow: none !important; margin: 0 !important; }
//         }
//       `}</style>

//       {/* Navbar */}
//       <nav className="no-print" style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
//         <Link to="/studentprofile" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#64748b", textDecoration: "none" }}>
//           <ArrowLeft size={15} /> Back
//         </Link>
//         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//           <div style={{ width: 28, height: 28, borderRadius: 8, background: "#1e40af", display: "flex", alignItems: "center", justifyContent: "center" }}>
//             <ClipboardList size={14} color="#fff" />
//           </div>
//           <span style={{ fontSize: 14, fontWeight: 800, color: "#0f172a" }}>Interview Scoresheet</span>
//         </div>
//         <button onClick={() => window.print()} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "#64748b", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "5px 12px", cursor: "pointer" }}>
//           <Printer size={13} /> Print
//         </button>
//       </nav>

//       {/* Sheet */}
//       <div className="print-sheet" style={{ maxWidth: 1100, margin: "24px auto", background: "#fff", borderRadius: 16, border: "1px solid #cbd5e1", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", overflow: "hidden" }}>

//         {/* Sheet header */}
//         <div style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #1e40af 100%)", padding: "18px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <div>
//             <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>Auto Generated Interview Questions · Score Obtained</div>
//             <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: "-0.3px" }}>{name}</div>
//             <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", fontWeight: 500, marginTop: 2 }}>Regn. No: {regnNo}</div>
//           </div>
//           <div style={{ textAlign: "right" }}>
//             <div style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>{totalScore}<span style={{ fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>/{totalMax}</span></div>
//             <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>Total Score</div>
//           </div>
//         </div>

//         {/* 3-column section grid */}
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "2px solid #e2e8f0" }}>
//           {SECTIONS.map((sec, si) => {
//             const qs    = sectionQs(sec.key);
//             const score = sectionScore(sec.key);
//             return (
//               <div key={sec.key} style={{ borderRight: si < 2 ? "2px solid #e2e8f0" : "none" }}>
//                 {/* Section header */}
//                 <div style={{ background: sec.color, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                   <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", letterSpacing: "0.05em" }}>{sec.label}</span>
//                   <span style={{ fontSize: 13, fontWeight: 900, color: "#fff", background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "2px 10px", minWidth: 48, textAlign: "center" }}>
//                     {score}/10
//                   </span>
//                 </div>

//                 {/* Q header row */}
//                 <div style={{ display: "flex", alignItems: "center", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "5px 8px 5px 26px" }}>
//                   <span style={{ flex: 1, fontSize: 10, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Question</span>
//                   <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", width: 32, textAlign: "center" }}>✓</span>
//                 </div>

//                 {/* Question rows */}
//                 <ScoreColumn questions={qs} checked={checked} onToggle={toggleCheck} />
//               </div>
//             );
//           })}
//         </div>

//         {/* Info row: Hobbies, Vision, Life ambition, Related Track, Comfort zone */}
//         <div style={{ borderBottom: "2px solid #e2e8f0" }}>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", borderBottom: "1px solid #e2e8f0" }}>
//             {[
//               { label: "Hobbies",             value: hobbies },
//               { label: "Vision",               value: vision },
//               { label: "Life Ambition / Goal", value: lifeAmbition },
//               { label: "Related Track",        value: relatedTrack },
//               { label: "Comfort Zone",         value: comfortZone },
//             ].map((item, i) => (
//               <div key={i} style={{ borderRight: i < 4 ? "1px solid #e2e8f0" : "none", padding: "10px 14px" }}>
//                 <div style={{ fontSize: 9.5, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>{item.label}</div>
//                 <div style={{ fontSize: 12, fontWeight: 600, color: "#1e293b", minHeight: 32, background: "#f8faff", borderRadius: 6, padding: "6px 8px", border: "1px solid #e2e8f0" }}>
//                   {item.value}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* HR Exe. Report */}
//         <div>
//           <div style={{ padding: "8px 16px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
//             <span style={{ fontSize: 11, fontWeight: 800, color: "#1e293b", textTransform: "uppercase", letterSpacing: "0.12em" }}>HR Exe. Report</span>
//           </div>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", borderBottom: "1px solid #e2e8f0" }}>
//             {[
//               { label: "Direct Job",        value: directJob },
//               { label: "Training Required", value: trainingReq },
//               { label: "Expected Salary pm",value: expectedSal },
//               { label: "Negotiable",        value: negotiable },
//             ].map((item, i) => (
//               <div key={i} style={{ borderRight: "1px solid #e2e8f0", padding: "10px 14px" }}>
//                 <div style={{ fontSize: 9.5, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>{item.label}</div>
//                 <div style={{ fontSize: 12, fontWeight: 600, color: "#1e293b", minHeight: 32, background: "#f8faff", borderRadius: 6, padding: "6px 8px", border: "1px solid #e2e8f0" }}>
//                   {item.value}
//                 </div>
//               </div>
//             ))}
//             {/* HR Satisfactory % — editable */}
//             <div style={{ padding: "10px 14px" }}>
//               <div style={{ fontSize: 9.5, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>HR Satisfactory %</div>
//               <input
//                 type="number"
//                 min={0} max={100}
//                 value={hrSatisfactory}
//                 onChange={e => setHrSatisfactory(e.target.value)}
//                 placeholder="0–100"
//                 style={{ width: "100%", fontSize: 12, fontWeight: 600, color: "#1e293b", minHeight: 32, background: "#f8faff", borderRadius: 6, padding: "6px 8px", border: "1px solid #bfdbfe", outline: "none" }}
//               />
//             </div>
//           </div>

//           {/* Submit row */}
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px" }}>
//             {/* Submit checkbox */}
//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, fontWeight: 700, color: "#1e293b" }}>
//                 <input type="checkbox" id="submit-chk" style={{ display: "none" }} />
//                 <span style={{ width: 22, height: 22, borderRadius: 5, border: "2px solid #2563eb", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0 }} />
//                 Submit
//               </label>
//             </div>

//             {/* Profile accepted Y/N */}
//             <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//               <span style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>Profile accepted</span>
//               <div style={{ display: "flex", gap: 6 }}>
//                 {(["Y", "N"] as const).map(opt => (
//                   <button
//                     key={opt}
//                     onClick={() => setProfileAccepted(opt)}
//                     style={{
//                       width: 34, height: 34, borderRadius: 8, fontWeight: 800, fontSize: 14,
//                       border: `2px solid ${profileAccepted === opt ? (opt === "Y" ? "#16a34a" : "#dc2626") : "#cbd5e1"}`,
//                       background: profileAccepted === opt ? (opt === "Y" ? "#f0fdf4" : "#fef2f2") : "#fff",
//                       color: profileAccepted === opt ? (opt === "Y" ? "#16a34a" : "#dc2626") : "#94a3b8",
//                       cursor: "pointer", transition: "all 0.15s",
//                     }}
//                   >
//                     {opt}
//                   </button>
//                 ))}
//               </div>

//               {/* Final submit */}
//               <button
//                 onClick={handleSubmit}
//                 disabled={profileAccepted === null}
//                 style={{
//                   padding: "9px 24px", borderRadius: 10, background: profileAccepted === null ? "#e2e8f0" : "#1e40af",
//                   color: profileAccepted === null ? "#94a3b8" : "#fff", fontSize: 13, fontWeight: 800,
//                   border: "none", cursor: profileAccepted === null ? "not-allowed" : "pointer",
//                   transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6,
//                 }}
//               >
//                 <CheckCircle size={14} /> Save & Submit
//               </button>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Assignment;


// import { useState, useEffect } from "react";
// import {
//   ArrowLeft, ClipboardList, CheckCircle, Loader2,
//   AlertCircle, RefreshCw, Trophy, XCircle, Printer
// } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";

// const BASE = "http://192.168.0.7:8000/api";

// interface RawMCQ {
//   id?: number;
//   question: string;
//   options?: string[];
//   choices?: string[];
//   answer?: string;
//   correct_answer?: string;
//   correct?: string;
//   section?: string;
// }
// interface NormMCQ {
//   id: number;
//   question: string;
//   options: string[];
//   correctIndex: number;
//   section: string;
// }
// interface APIResponse {
//   student_id?: number;
//   student_name?: string;
//   questions: RawMCQ[] | string[];
// }

// const parseTextBlock = (block: string, id: number, section: string): NormMCQ | null => {
//   const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
//   const qLine = lines.find(l => /^question:/i.test(l));
//   if (!qLine) return null;
//   const question = qLine.replace(/^question:\s*/i, "").trim();
//   const optLines = lines.filter(l => /^[A-D][.)]\s+/i.test(l));
//   const ansLine  = lines.find(l => /^answer:/i.test(l));
//   if (optLines.length < 2) return null;
//   const options = optLines.map(l => l.replace(/^[A-D][.)]\s+/i, "").trim());
//   const ansLetter = ansLine ? ansLine.replace(/^answer:\s*/i, "").trim().toUpperCase().charAt(0) : "A";
//   const correctIndex = "ABCD".indexOf(ansLetter);
//   return { id, question, options, correctIndex: correctIndex >= 0 ? correctIndex : 0, section };
// };

// const letterToIndex = (letter: string): number => {
//   const idx = "ABCD".indexOf(letter.trim().toUpperCase().charAt(0));
//   return idx >= 0 ? idx : 0;
// };

// const normalise = (raw: APIResponse): NormMCQ[] => {
//   const qs = raw.questions;
//   const result: NormMCQ[] = [];

//   if (Array.isArray(qs) && typeof qs[0] === "string") {
//     (qs as string[]).forEach((block, i) => {
//       const sectionMatch = block.match(/^section:\s*(\w+)/i);
//       let section = sectionMatch ? sectionMatch[1] : null;
//       if (!section) {
//         section = i < 5 ? "Personal" : i < 10 ? "Technical" : "Professional";
//       } else {
//         if (/personal/i.test(section)) section = "Personal";
//         else if (/technical/i.test(section)) section = "Technical";
//         else section = "Professional";
//       }
//       const q = parseTextBlock(block, i + 1, section);
//       if (q) result.push(q);
//     });
//     return result;
//   }

//   if (Array.isArray(qs)) {
//     (qs as RawMCQ[]).forEach((q, i) => {
//       const section = q.section ?? (i < 5 ? "Personal" : i < 10 ? "Technical" : "Professional");
//       const rawOptions = q.options ?? q.choices ?? [];
//       const rawAnswer  = q.answer ?? q.correct_answer ?? q.correct ?? "A";
//       const options = rawOptions.map(o => o.replace(/^[A-D][.)]\s+/i, "").trim());
//       if (options.length >= 2) {
//         result.push({ id: q.id ?? i + 1, question: q.question, options, correctIndex: letterToIndex(rawAnswer), section });
//       } else {
//         const text = `Question: ${q.question}\n${rawOptions.join("\n")}\nAnswer: ${rawAnswer}`;
//         const parsed = parseTextBlock(text, q.id ?? i + 1, section);
//         if (parsed) result.push(parsed);
//       }
//     });
//     return result;
//   }

//   const obj = qs as unknown as Record<string, (string | RawMCQ)[]>;
//   let counter = 1;
//   Object.entries(obj).forEach(([section, items]) => {
//     items.forEach(item => {
//       if (typeof item === "string") {
//         const q = parseTextBlock(item, counter++, section);
//         if (q) result.push(q);
//       } else {
//         const rawOptions = item.options ?? item.choices ?? [];
//         const rawAnswer  = item.answer ?? item.correct_answer ?? item.correct ?? "A";
//         const options = rawOptions.map(o => o.replace(/^[A-D][.)]\s+/i, "").trim());
//         if (options.length >= 2)
//           result.push({ id: counter++, question: item.question, options, correctIndex: letterToIndex(rawAnswer), section });
//       }
//     });
//   });
//   return result;
// };

// const SECTIONS = [
//   { key: "Personal",     label: "Personal / Psychology / Attitude", color: "#1a3a5c", light: "#e8f0fb", accent: "#2563eb" },
//   { key: "Technical",    label: "Technical",                         color: "#1a4a2e", light: "#e6f4ec", accent: "#16a34a" },
//   { key: "Professional", label: "Professional / Responsibility",     color: "#4a1a1a", light: "#fdf0ee", accent: "#dc2626" },
// ];

// const OPTION_LABELS = ["A", "B", "C", "D"];

// /* ── Score column ── */
// const ScoreColumn = ({
//   questions,
//   checked,
//   selectedOptions,
//   onSelectOption,
// }: {
//   questions: NormMCQ[];
//   checked: Record<number, boolean>;
//   selectedOptions: Record<number, number>;
//   onSelectOption: (qId: number, optIndex: number) => void;
// }) => {
//   const rows = Array.from({ length: 5 }, (_, i) => questions[i] ?? null);

//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       {rows.map((q, i) => (
//         <div
//           key={i}
//           style={{
//             borderBottom: "1px solid #e2e8f0",
//             background: i % 2 === 0 ? "#fff" : "#fafbff",
//             padding: "10px 12px",
//           }}
//         >
//           {q ? (
//             <div style={{ display: "flex", gap: 10 }}>
//               <div style={{ flex: 1, minWidth: 0 }}>
//                 {/* Question text */}
//                 <div style={{ display: "flex", gap: 6, marginBottom: 7 }}>
//                   <span style={{ fontSize: 11, fontWeight: 800, color: "#64748b", flexShrink: 0, paddingTop: 1 }}>
//                     {i + 1}.
//                   </span>
//                   <span style={{ fontSize: 11, fontWeight: 600, color: "#1e293b", lineHeight: 1.45 }}>
//                     {q.question}
//                   </span>
//                 </div>

//                 {/* Options */}
//                 <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 18 }}>
//                   {q.options.map((opt, oi) => {
//                     const isSelected = selectedOptions[q.id] === oi;
//                     const isAnswered = selectedOptions[q.id] !== undefined;
//                     const isCorrect  = oi === q.correctIndex;

//                     // After selection: green = correct, red = wrong selection, neutral = unselected
//                     let bg = "transparent";
//                     let border = "1px solid transparent";
//                     let textColor = "#475569";
//                     let labelColor = "#94a3b8";

//                     if (isAnswered) {
//                       if (isCorrect) {
//                         bg = "#f0fdf4";
//                         border = "1px solid #86efac";
//                         textColor = "#15803d";
//                         labelColor = "#15803d";
//                       } else if (isSelected) {
//                         bg = "#fef2f2";
//                         border = "1px solid #fca5a5";
//                         textColor = "#b91c1c";
//                         labelColor = "#b91c1c";
//                       }
//                     } else if (isSelected) {
//                       bg = "#eff6ff";
//                       border = "1px solid #bfdbfe";
//                       textColor = "#1e40af";
//                       labelColor = "#1e40af";
//                     }

//                     return (
//                       <label
//                         key={oi}
//                         onClick={() => onSelectOption(q.id, oi)}
//                         style={{
//                           display: "flex",
//                           alignItems: "flex-start",
//                           gap: 6,
//                           cursor: "pointer",
//                           borderRadius: 5,
//                           padding: "3px 6px",
//                           background: bg,
//                           border,
//                           transition: "all 0.12s",
//                         }}
//                       >
//                         {/* Radio-style indicator */}
//                         <span
//                           style={{
//                             width: 15,
//                             height: 15,
//                             borderRadius: "50%",
//                             border: `2px solid ${isSelected ? (isAnswered && !isCorrect ? "#ef4444" : "#2563eb") : "#cbd5e1"}`,
//                             background: isSelected ? (isAnswered && !isCorrect ? "#ef4444" : "#2563eb") : "#fff",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             flexShrink: 0,
//                             marginTop: 1,
//                             transition: "all 0.12s",
//                           }}
//                         >
//                           {isSelected && (
//                             <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff", display: "block" }} />
//                           )}
//                         </span>

//                         {/* Option label + text */}
//                         <span style={{ fontSize: 10, lineHeight: 1.45, color: textColor, fontWeight: isSelected ? 600 : 400 }}>
//                           <span style={{ fontWeight: 800, color: labelColor, marginRight: 3 }}>
//                             {OPTION_LABELS[oi]}.
//                           </span>
//                           {opt}
//                         </span>
//                       </label>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div style={{ height: 40 }} />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// /* ── Main Component ── */
// const Assignment = () => {
//   const location = useLocation();
//   const state = location.state as {
//     studentId?: number;
//     name?: string;
//     regnNo?: string;
//   } | null;

//   const studentId = state?.studentId;
//   const name      = state?.name   || "Candidate";
//   const regnNo    = state?.regnNo || "—";

//   const [questions, setQuestions]             = useState<NormMCQ[]>([]);
//   const [fetchStatus, setFetchStatus]         = useState<"loading" | "success" | "error">("loading");
//   const [fetchError, setFetchError]           = useState("");
//   const [checked, setChecked]                 = useState<Record<number, boolean>>({});
//   const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
//   const [submitted, setSubmitted]             = useState(false);
//   const [profileAccepted, setProfileAccepted] = useState<"Y" | "N" | null>(null);

//   const fetchQuestions = async () => {
//     if (!studentId) {
//       setFetchStatus("error");
//       setFetchError("No student ID found. Please go back and resubmit.");
//       return;
//     }
//     setFetchStatus("loading");
//     setFetchError("");
//     try {
//       const res = await fetch(`${BASE}/auth/students/${studentId}/generate_questions/`);
//       if (!res.ok) throw new Error(`Server returned ${res.status}`);
//       const data: APIResponse = await res.json();
//       const normalised = normalise(data);
//       if (normalised.length === 0) throw new Error("No questions returned from API.");
//       setQuestions(normalised);
//       setFetchStatus("success");
//     } catch (err: unknown) {
//       setFetchStatus("error");
//       setFetchError(err instanceof Error ? err.message : "Failed to load questions.");
//     }
//   };

//   useEffect(() => { fetchQuestions(); }, [studentId]);

//   const handleSelectOption = (qId: number, optIndex: number) => {
//     setSelectedOptions(prev => ({ ...prev, [qId]: optIndex }));
//     const q = questions.find(q => q.id === qId);
//     if (q) {
//       setChecked(prev => ({ ...prev, [qId]: optIndex === q.correctIndex }));
//     }
//   };

//   const sectionQs    = (key: string) => questions.filter(q => q.section === key);
//   const sectionScore = (key: string) => sectionQs(key).filter(q => checked[q.id]).length;
//   const totalScore   = SECTIONS.reduce((s, sec) => s + sectionScore(sec.key), 0);
//   const totalMax     = questions.length;

//   const handleSubmit = async () => {
//     const percentage = totalMax > 0 ? parseFloat(((totalScore / totalMax) * 100).toFixed(2)) : 0;
//     try {
//       const res = await fetch(`${BASE}/auth/students/${studentId}/submit_score/`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ score: percentage }),
//       });
//       if (!res.ok) console.error("Score save failed:", await res.text());
//     } catch (err) { console.error("Score save error:", err); }
//     setSubmitted(true);
//   };

//   /* ── Submitted screen ── */
//   if (submitted) {
//     const pct    = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;
//     const passed = pct >= 50;
//     return (
//       <div style={{ minHeight: "100vh", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", padding: 24 }}>
//         <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e2e8f0", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", padding: 48, maxWidth: 440, width: "100%", textAlign: "center" }}>
//           <div style={{ width: 64, height: 64, borderRadius: 18, background: passed ? "#f0fdf4" : "#fef2f2", border: `1px solid ${passed ? "#bbf7d0" : "#fecaca"}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
//             {passed ? <Trophy size={32} color="#16a34a" /> : <XCircle size={32} color="#dc2626" />}
//           </div>
//           <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
//             {passed ? "Interview Complete" : "Interview Recorded"}
//           </h2>
//           <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 24px", fontWeight: 500 }}>{name} · {regnNo}</p>
//           <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 24 }}>
//             {SECTIONS.map(sec => (
//               <div key={sec.key} style={{ background: sec.light, border: `1px solid ${sec.accent}22`, borderRadius: 12, padding: "10px 18px", textAlign: "center" }}>
//                 <div style={{ fontSize: 22, fontWeight: 900, color: sec.accent }}>{sectionScore(sec.key)}/5</div>
//                 <div style={{ fontSize: 10, fontWeight: 700, color: sec.color, marginTop: 2 }}>{sec.key}</div>
//               </div>
//             ))}
//           </div>
//           <div style={{ fontSize: 32, fontWeight: 900, color: passed ? "#16a34a" : "#dc2626", marginBottom: 6 }}>
//             {totalScore}<span style={{ fontSize: 18, fontWeight: 600, color: "#94a3b8" }}>/{totalMax}</span>
//           </div>
//           <p style={{ fontSize: 13, fontWeight: 700, color: passed ? "#16a34a" : "#dc2626", marginBottom: 28 }}>{pct}%</p>
//           <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
//             <Link to="/hr/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 10, background: "#1e40af", color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
//               <ArrowLeft size={14} /> Dashboard
//             </Link>
//             <button onClick={() => window.print()} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 10, background: "#f8fafc", border: "1.5px solid #e2e8f0", color: "#334155", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
//               <Printer size={14} /> Print
//             </button>
//           </div>
//         </div>
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>
//       </div>
//     );
//   }

//   if (fetchStatus === "loading") {
//     return (
//       <div style={{ minHeight: "100vh", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
//         <div style={{ textAlign: "center" }}>
//           <Loader2 size={36} color="#2563eb" style={{ animation: "spin 1s linear infinite", display: "block", margin: "0 auto 14px" }} />
//           <p style={{ fontSize: 14, fontWeight: 600, color: "#64748b" }}>Generating interview questions…</p>
//         </div>
//         <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}} @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>
//       </div>
//     );
//   }

//   if (fetchStatus === "error") {
//     return (
//       <div style={{ minHeight: "100vh", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
//         <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #fecaca", padding: 40, textAlign: "center", maxWidth: 400 }}>
//           <AlertCircle size={36} color="#dc2626" style={{ margin: "0 auto 14px" }} />
//           <p style={{ fontSize: 14, fontWeight: 700, color: "#dc2626", marginBottom: 8 }}>Failed to load questions</p>
//           <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 20 }}>{fetchError}</p>
//           <button onClick={fetchQuestions} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 20px", borderRadius: 9, background: "#2563eb", color: "#fff", fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer" }}>
//             <RefreshCw size={13} /> Retry
//           </button>
//         </div>
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>
//       </div>
//     );
//   }

//   /* ── MAIN SCORESHEET ── */
//   return (
//     <div style={{ minHeight: "100vh", background: "#edf2f7", fontFamily: "'DM Sans', sans-serif", paddingBottom: 80 }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
//         * { box-sizing: border-box; }
//         @media print {
//           .no-print { display: none !important; }
//           body { background: white; }
//           .print-sheet { box-shadow: none !important; margin: 0 !important; }
//         }
//       `}</style>

//       {/* Navbar */}
//       <nav className="no-print" style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
//         <Link to="/studentprofile" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#64748b", textDecoration: "none" }}>
//           <ArrowLeft size={15} /> Back
//         </Link>
//         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//           <div style={{ width: 28, height: 28, borderRadius: 8, background: "#1e40af", display: "flex", alignItems: "center", justifyContent: "center" }}>
//             <ClipboardList size={14} color="#fff" />
//           </div>
//           <span style={{ fontSize: 14, fontWeight: 800, color: "#0f172a" }}>Interview Scoresheet</span>
//         </div>
//         <button onClick={() => window.print()} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "#64748b", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "5px 12px", cursor: "pointer" }}>
//           <Printer size={13} /> Print
//         </button>
//       </nav>

//       {/* Sheet */}
//       <div className="print-sheet" style={{ maxWidth: 1100, margin: "24px auto", background: "#fff", borderRadius: 16, border: "1px solid #cbd5e1", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", overflow: "hidden" }}>

//         {/* Sheet header */}
//         <div style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #1e40af 100%)", padding: "18px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <div>
//             <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>
//               Auto Generated Interview Questions · Score Obtained
//             </div>
//             <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>{name}</div>
//             <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", fontWeight: 500, marginTop: 2 }}>Regn. No: {regnNo}</div>
//           </div>
//           <div style={{ textAlign: "right" }}>
//             <div style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>
//               {totalScore}<span style={{ fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>/{totalMax}</span>
//             </div>
//             <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>Total Score</div>
//           </div>
//         </div>

//         {/* 3-column section grid */}
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "2px solid #e2e8f0" }}>
//           {SECTIONS.map((sec, si) => {
//             const qs    = sectionQs(sec.key);
//             const score = sectionScore(sec.key);
//             return (
//               <div key={sec.key} style={{ borderRight: si < 2 ? "2px solid #e2e8f0" : "none" }}>
//                 {/* Section header */}
//                 <div style={{ background: sec.color, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                   <span style={{ fontSize: 11, fontWeight: 800, color: "#fff" }}>{sec.label}</span>
//                   <span style={{ fontSize: 13, fontWeight: 900, color: "#fff", background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "2px 10px" }}>
//                     {score}/5
//                   </span>
//                 </div>

//                 {/* Column subheader */}
//                 <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "5px 12px 5px 18px" }}>
//                   <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em" }}>Question & Options</span>
//                 </div>

//                 {/* Rows */}
//                 <ScoreColumn
//                   questions={qs}
//                   checked={checked}
//                   selectedOptions={selectedOptions}
//                   onSelectOption={handleSelectOption}
//                 />
//               </div>
//             );
//           })}
//         </div>

//         {/* Submit footer */}
//         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderTop: "1px solid #e2e8f0" }}>
//           <div style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>
//             Score: <strong style={{ color: "#1e293b" }}>{totalScore}/{totalMax}</strong>
//             &nbsp;·&nbsp;
//             <strong style={{ color: totalMax > 0 && (totalScore / totalMax) >= 0.5 ? "#16a34a" : "#dc2626" }}>
//               {totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0}%
//             </strong>
//           </div>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             <span style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>Profile accepted</span>
//             <div style={{ display: "flex", gap: 6 }}>
//               {(["Y", "N"] as const).map(opt => (
//                 <button
//                   key={opt}
//                   onClick={() => setProfileAccepted(opt)}
//                   style={{
//                     width: 34, height: 34, borderRadius: 8, fontWeight: 800, fontSize: 14,
//                     border: `2px solid ${profileAccepted === opt ? (opt === "Y" ? "#16a34a" : "#dc2626") : "#cbd5e1"}`,
//                     background: profileAccepted === opt ? (opt === "Y" ? "#f0fdf4" : "#fef2f2") : "#fff",
//                     color: profileAccepted === opt ? (opt === "Y" ? "#16a34a" : "#dc2626") : "#94a3b8",
//                     cursor: "pointer", transition: "all 0.15s",
//                   }}
//                 >
//                   {opt}
//                 </button>
//               ))}
//             </div>
//             <button
//               onClick={handleSubmit}
//               disabled={profileAccepted === null}
//               style={{
//                 padding: "9px 24px", borderRadius: 10,
//                 background: profileAccepted === null ? "#e2e8f0" : "#1e40af",
//                 color: profileAccepted === null ? "#94a8b8" : "#fff",
//                 fontSize: 13, fontWeight: 800, border: "none",
//                 cursor: profileAccepted === null ? "not-allowed" : "pointer",
//                 transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6,
//               }}
//             >
//               <CheckCircle size={14} /> Save & Submit
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Assignment;



import { useState, useEffect } from "react";
import {
  ArrowLeft, ClipboardList, CheckCircle, Loader2,
  AlertCircle, RefreshCw, Trophy, XCircle, Printer
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BASE = "http://192.168.0.7:8000/api";

interface RawMCQ {
  id?: number;
  question: string;
  options?: string[];
  choices?: string[];
  answer?: string;
  correct_answer?: string;
  correct?: string;
  section?: string;
}
interface NormMCQ {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  section: string;
}
interface APIResponse {
  student_id?: number;
  student_name?: string;
  questions: RawMCQ[] | string[];
}

const parseTextBlock = (block: string, id: number, section: string): NormMCQ | null => {
  const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
  const qLine = lines.find(l => /^question:/i.test(l));
  if (!qLine) return null;
  const question = qLine.replace(/^question:\s*/i, "").trim();
  const optLines = lines.filter(l => /^[A-D][.)]\s+/i.test(l));
  const ansLine  = lines.find(l => /^answer:/i.test(l));
  if (optLines.length < 2) return null;
  const options = optLines.map(l => l.replace(/^[A-D][.)]\s+/i, "").trim());
  const ansLetter = ansLine ? ansLine.replace(/^answer:\s*/i, "").trim().toUpperCase().charAt(0) : "A";
  const correctIndex = "ABCD".indexOf(ansLetter);
  return { id, question, options, correctIndex: correctIndex >= 0 ? correctIndex : 0, section };
};

const letterToIndex = (letter: string): number => {
  const idx = "ABCD".indexOf(letter.trim().toUpperCase().charAt(0));
  return idx >= 0 ? idx : 0;
};

const normalise = (raw: APIResponse): NormMCQ[] => {
  const qs = raw.questions;
  const result: NormMCQ[] = [];

  if (Array.isArray(qs) && typeof qs[0] === "string") {
    (qs as string[]).forEach((block, i) => {
      const sectionMatch = block.match(/^section:\s*(\w+)/i);
      let section = sectionMatch ? sectionMatch[1] : null;
      if (!section) {
        section = i < 5 ? "Personal" : i < 10 ? "Technical" : "Professional";
      } else {
        if (/personal/i.test(section)) section = "Personal";
        else if (/technical/i.test(section)) section = "Technical";
        else section = "Professional";
      }
      const q = parseTextBlock(block, i + 1, section);
      if (q) result.push(q);
    });
    return result;
  }

  if (Array.isArray(qs)) {
    (qs as RawMCQ[]).forEach((q, i) => {
      const section = q.section ?? (i < 5 ? "Personal" : i < 10 ? "Technical" : "Professional");
      const rawOptions = q.options ?? q.choices ?? [];
      const rawAnswer  = q.answer ?? q.correct_answer ?? q.correct ?? "A";
      const options = rawOptions.map(o => o.replace(/^[A-D][.)]\s+/i, "").trim());
      if (options.length >= 2) {
        result.push({ id: q.id ?? i + 1, question: q.question, options, correctIndex: letterToIndex(rawAnswer), section });
      } else {
        const text = `Question: ${q.question}\n${rawOptions.join("\n")}\nAnswer: ${rawAnswer}`;
        const parsed = parseTextBlock(text, q.id ?? i + 1, section);
        if (parsed) result.push(parsed);
      }
    });
    return result;
  }

  const obj = qs as unknown as Record<string, (string | RawMCQ)[]>;
  let counter = 1;
  Object.entries(obj).forEach(([section, items]) => {
    items.forEach(item => {
      if (typeof item === "string") {
        const q = parseTextBlock(item, counter++, section);
        if (q) result.push(q);
      } else {
        const rawOptions = item.options ?? item.choices ?? [];
        const rawAnswer  = item.answer ?? item.correct_answer ?? item.correct ?? "A";
        const options = rawOptions.map(o => o.replace(/^[A-D][.)]\s+/i, "").trim());
        if (options.length >= 2)
          result.push({ id: counter++, question: item.question, options, correctIndex: letterToIndex(rawAnswer), section });
      }
    });
  });
  return result;
};

const SECTIONS = [
  { key: "Personal",     label: "Personal / Psychology / Attitude", color: "#1a3a5c", light: "#e8f0fb", accent: "#2563eb" },
  { key: "Technical",    label: "Technical",                         color: "#1a4a2e", light: "#e6f4ec", accent: "#16a34a" },
  { key: "Professional", label: "Professional / Responsibility",     color: "#4a1a1a", light: "#fdf0ee", accent: "#dc2626" },
];

const OPTION_LABELS = ["A", "B", "C", "D"];

/* ── Score column — EXAM MODE: only shows selected state, never correct/wrong ── */
const ScoreColumn = ({
  questions,
  selectedOptions,
  onSelectOption,
  examSubmitted,
}: {
  questions: NormMCQ[];
  selectedOptions: Record<number, number>;
  onSelectOption: (qId: number, optIndex: number) => void;
  examSubmitted: boolean;
}) => {
  const rows = Array.from({ length: 5 }, (_, i) => questions[i] ?? null);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {rows.map((q, i) => (
        <div
          key={i}
          style={{
            borderBottom: "1px solid #e2e8f0",
            background: i % 2 === 0 ? "#fff" : "#fafbff",
            padding: "10px 12px",
          }}
        >
          {q ? (
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Question text */}
                <div style={{ display: "flex", gap: 6, marginBottom: 7 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#64748b", flexShrink: 0, paddingTop: 1 }}>
                    {i + 1}.
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#1e293b", lineHeight: 1.45 }}>
                    {q.question}
                  </span>
                </div>

                {/* Options — exam mode: blue = selected, no correct/wrong reveal */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 18 }}>
                  {q.options.map((opt, oi) => {
                    const isSelected = selectedOptions[q.id] === oi;
                    const disabled   = examSubmitted;

                    const bg        = isSelected ? "#eff6ff" : "transparent";
                    const border    = isSelected ? "1px solid #bfdbfe" : "1px solid transparent";
                    const textColor = isSelected ? "#1e40af" : "#475569";
                    const labelCol  = isSelected ? "#1e40af" : "#94a3b8";
                    const radioFill = isSelected ? "#2563eb" : "#fff";
                    const radioBdr  = isSelected ? "#2563eb" : "#cbd5e1";

                    return (
                      <label
                        key={oi}
                        onClick={() => !disabled && onSelectOption(q.id, oi)}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 6,
                          cursor: disabled ? "default" : "pointer",
                          borderRadius: 5,
                          padding: "3px 6px",
                          background: bg,
                          border,
                          transition: "all 0.12s",
                          opacity: disabled && !isSelected ? 0.55 : 1,
                        }}
                      >
                        {/* Radio indicator */}
                        <span
                          style={{
                            width: 15,
                            height: 15,
                            borderRadius: "50%",
                            border: `2px solid ${radioBdr}`,
                            background: radioFill,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            marginTop: 1,
                            transition: "all 0.12s",
                          }}
                        >
                          {isSelected && (
                            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff", display: "block" }} />
                          )}
                        </span>

                        {/* Option label + text */}
                        <span style={{ fontSize: 10, lineHeight: 1.45, color: textColor, fontWeight: isSelected ? 600 : 400 }}>
                          <span style={{ fontWeight: 800, color: labelCol, marginRight: 3 }}>
                            {OPTION_LABELS[oi]}.
                          </span>
                          {opt}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ height: 40 }} />
          )}
        </div>
      ))}
    </div>
  );
};

/* ── Main Component ── */
const Assignment = () => {
  const location = useLocation();
  const state = location.state as {
    studentId?: number;
    name?: string;
    regnNo?: string;
  } | null;

  const studentId = state?.studentId;
  const name      = state?.name   || "Candidate";
  const regnNo    = state?.regnNo || "—";

  const [questions, setQuestions]             = useState<NormMCQ[]>([]);
  const [fetchStatus, setFetchStatus]         = useState<"loading" | "success" | "error">("loading");
  const [fetchError, setFetchError]           = useState("");
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [submitted, setSubmitted]             = useState(false);
  const [profileAccepted, setProfileAccepted] = useState<"Y" | "N" | null>(null);

  const fetchQuestions = async () => {
    if (!studentId) {
      setFetchStatus("error");
      setFetchError("No student ID found. Please go back and resubmit.");
      return;
    }
    setFetchStatus("loading");
    setFetchError("");
    try {
      const res = await fetch(`${BASE}/auth/students/${studentId}/generate_questions/`);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data: APIResponse = await res.json();
      const normalised = normalise(data);
      if (normalised.length === 0) throw new Error("No questions returned from API.");
      setQuestions(normalised);
      setFetchStatus("success");
    } catch (err: unknown) {
      setFetchStatus("error");
      setFetchError(err instanceof Error ? err.message : "Failed to load questions.");
    }
  };

  useEffect(() => { fetchQuestions(); }, [studentId]);

  /* Only select the option — no answer reveal during exam */
  const handleSelectOption = (qId: number, optIndex: number) => {
    setSelectedOptions(prev => ({ ...prev, [qId]: optIndex }));
  };

  /* Compute scores silently at submit time */
  const sectionQs = (key: string) => questions.filter(q => q.section === key);

  const computeScore = (): { total: number; bySection: Record<string, number> } => {
    const bySection: Record<string, number> = {};
    let total = 0;
    for (const sec of SECTIONS) {
      const qs    = sectionQs(sec.key);
      const score = qs.filter(q => selectedOptions[q.id] === q.correctIndex).length;
      bySection[sec.key] = score;
      total += score;
    }
    return { total, bySection };
  };

  const totalMax = questions.length;

  const handleSubmit = async () => {
    const { total, bySection } = computeScore();
    const percentage = totalMax > 0 ? parseFloat(((total / totalMax) * 100).toFixed(2)) : 0;

    try {
      const res = await fetch(`${BASE}/auth/students/${studentId}/submit_score/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: percentage }),
      });
      if (!res.ok) console.error("Score save failed:", await res.text());
    } catch (err) { console.error("Score save error:", err); }

    setSubmitted(true);
  };

  /* ── Submitted screen ── */
  if (submitted) {
    const { total, bySection } = computeScore();
    const pct    = totalMax > 0 ? Math.round((total / totalMax) * 100) : 0;
    const passed = pct >= 50;

    return (
      <div style={{ minHeight: "100vh", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", padding: 24 }}>
        <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e2e8f0", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", padding: 48, maxWidth: 440, width: "100%", textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: passed ? "#f0fdf4" : "#fef2f2", border: `1px solid ${passed ? "#bbf7d0" : "#fecaca"}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            {passed ? <Trophy size={32} color="#16a34a" /> : <XCircle size={32} color="#dc2626" />}
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
            {passed ? "Interview Complete" : "Interview Recorded"}
          </h2>
          <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 24px", fontWeight: 500 }}>{name} · {regnNo}</p>

          {/* Section scores */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 24 }}>
            {SECTIONS.map(sec => (
              <div key={sec.key} style={{ background: sec.light, border: `1px solid ${sec.accent}22`, borderRadius: 12, padding: "10px 18px", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: sec.accent }}>{bySection[sec.key] ?? 0}/2</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: sec.color, marginTop: 2 }}>{sec.key}</div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div style={{ fontSize: 32, fontWeight: 900, color: passed ? "#16a34a" : "#dc2626", marginBottom: 6 }}>
            {total}<span style={{ fontSize: 18, fontWeight: 600, color: "#94a3b8" }}>/{totalMax}</span>
          </div>
          <p style={{ fontSize: 13, fontWeight: 700, color: passed ? "#16a34a" : "#dc2626", marginBottom: 28 }}>{pct}%</p>

          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <Link to="/hr/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 10, background: "#1e40af", color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
              <ArrowLeft size={14} /> Dashboard
            </Link>
            <button onClick={() => window.print()} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 10, background: "#f8fafc", border: "1.5px solid #e2e8f0", color: "#334155", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              <Printer size={14} /> Print
            </button>
          </div>
        </div>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>
      </div>
    );
  }

  if (fetchStatus === "loading") {
    return (
      <div style={{ minHeight: "100vh", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <Loader2 size={36} color="#2563eb" style={{ animation: "spin 1s linear infinite", display: "block", margin: "0 auto 14px" }} />
          <p style={{ fontSize: 14, fontWeight: 600, color: "#64748b" }}>Generating interview questions…</p>
        </div>
        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}} @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>
      </div>
    );
  }

  if (fetchStatus === "error") {
    return (
      <div style={{ minHeight: "100vh", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #fecaca", padding: 40, textAlign: "center", maxWidth: 400 }}>
          <AlertCircle size={36} color="#dc2626" style={{ margin: "0 auto 14px" }} />
          <p style={{ fontSize: 14, fontWeight: 700, color: "#dc2626", marginBottom: 8 }}>Failed to load questions</p>
          <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 20 }}>{fetchError}</p>
          <button onClick={fetchQuestions} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 20px", borderRadius: 9, background: "#2563eb", color: "#fff", fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer" }}>
            <RefreshCw size={13} /> Retry
          </button>
        </div>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>
      </div>
    );
  }

  /* ── Progress indicator ── */
  const answeredCount = Object.keys(selectedOptions).length;
  const progressPct   = totalMax > 0 ? Math.round((answeredCount / totalMax) * 100) : 0;

  /* ── MAIN SCORESHEET ── */
  return (
    <div style={{ minHeight: "100vh", background: "#edf2f7", fontFamily: "'DM Sans', sans-serif", paddingBottom: 80 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
          .print-sheet { box-shadow: none !important; margin: 0 !important; }
        }
      `}</style>

      {/* Navbar */}
      <nav className="no-print" style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
        <Link to="/studentprofile" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#64748b", textDecoration: "none" }}>
          <ArrowLeft size={15} /> Back
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "#1e40af", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ClipboardList size={14} color="#fff" />
          </div>
          <span style={{ fontSize: 14, fontWeight: 800, color: "#0f172a" }}>Interview Scoresheet</span>
        </div>
        {/* Live progress pill */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: answeredCount === totalMax ? "#16a34a" : "#64748b" }}>
            {answeredCount}/{totalMax} answered
          </div>
          <div style={{ width: 80, height: 6, borderRadius: 99, background: "#e2e8f0", overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 99, background: answeredCount === totalMax ? "#16a34a" : "#2563eb", width: `${progressPct}%`, transition: "width 0.3s ease" }} />
          </div>
        </div>
      </nav>

      {/* Sheet */}
      <div className="print-sheet" style={{ maxWidth: 1100, margin: "24px auto", background: "#fff", borderRadius: 16, border: "1px solid #cbd5e1", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", overflow: "hidden" }}>

        {/* Sheet header */}
        <div style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #1e40af 100%)", padding: "18px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>
              Auto Generated Interview Questions
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>{name}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", fontWeight: 500, marginTop: 2 }}>Regn. No: {regnNo}</div>
          </div>
          {/* No score shown during exam */}
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.75)" }}>
              {answeredCount} of {totalMax} answered
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontWeight: 500, marginTop: 2 }}>Score shown after submission</div>
          </div>
        </div>

        {/* 3-column section grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "2px solid #e2e8f0" }}>
          {SECTIONS.map((sec, si) => {
            const qs            = sectionQs(sec.key);
            const secAnswered   = qs.filter(q => selectedOptions[q.id] !== undefined).length;

            return (
              <div key={sec.key} style={{ borderRight: si < 2 ? "2px solid #e2e8f0" : "none" }}>
                {/* Section header */}
                <div style={{ background: sec.color, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#fff" }}>{sec.label}</span>
                  {/* Show answered count, NOT score */}
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "2px 10px" }}>
                    {secAnswered}/{qs.length}
                  </span>
                </div>

                {/* Column subheader */}
                <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "5px 12px 5px 18px" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em" }}>Question & Options</span>
                </div>

                {/* Rows — exam mode, no answer reveal */}
                <ScoreColumn
                  questions={qs}
                  selectedOptions={selectedOptions}
                  onSelectOption={handleSelectOption}
                  examSubmitted={false}
                />
              </div>
            );
          })}
        </div>

        {/* Submit footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderTop: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>
            Answered: <strong style={{ color: "#1e293b" }}>{answeredCount}/{totalMax}</strong>
            {answeredCount < totalMax && (
              <span style={{ marginLeft: 8, fontSize: 12, color: "#f59e0b", fontWeight: 600 }}>
                ⚠ {totalMax - answeredCount} unanswered
              </span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>Profile accepted</span>
            <div style={{ display: "flex", gap: 6 }}>
              {(["Y", "N"] as const).map(opt => (
                <button
                  key={opt}
                  onClick={() => setProfileAccepted(opt)}
                  style={{
                    width: 34, height: 34, borderRadius: 8, fontWeight: 800, fontSize: 14,
                    border: `2px solid ${profileAccepted === opt ? (opt === "Y" ? "#16a34a" : "#dc2626") : "#cbd5e1"}`,
                    background: profileAccepted === opt ? (opt === "Y" ? "#f0fdf4" : "#fef2f2") : "#fff",
                    color: profileAccepted === opt ? (opt === "Y" ? "#16a34a" : "#dc2626") : "#94a3b8",
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              disabled={profileAccepted === null}
              style={{
                padding: "9px 24px", borderRadius: 10,
                background: profileAccepted === null ? "#e2e8f0" : "#1e40af",
                color: profileAccepted === null ? "#94a8b8" : "#fff",
                fontSize: 13, fontWeight: 800, border: "none",
                cursor: profileAccepted === null ? "not-allowed" : "pointer",
                transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6,
              }}
            >
              <CheckCircle size={14} /> Save & Submit
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Assignment;