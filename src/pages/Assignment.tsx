


import { useState, useEffect } from "react";
import {
  ArrowLeft, ClipboardList, CheckCircle, Loader2,
  AlertCircle, RefreshCw, Trophy, XCircle, Printer
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BASE = "http://192.168.0.6:8000/api";

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

/* ── Mobile Section Card ── */
const MobileSectionCard = ({
  section,
  questions,
  selectedOptions,
  onSelectOption,
  examSubmitted,
}: {
  section: typeof SECTIONS[0];
  questions: NormMCQ[];
  selectedOptions: Record<number, number>;
  onSelectOption: (qId: number, optIndex: number) => void;
  examSubmitted: boolean;
}) => {
  const secAnswered = questions.filter(q => selectedOptions[q.id] !== undefined).length;

  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      border: "1px solid #e2e8f0",
      overflow: "hidden",
      marginBottom: 16,
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    }}>
      {/* Section Header */}
      <div style={{
        background: section.color,
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>{section.label}</span>
        <span style={{
          fontSize: 11, fontWeight: 700, color: "#fff",
          background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "2px 10px",
        }}>
          {secAnswered}/{questions.length}
        </span>
      </div>

      {/* Questions */}
      <div>
        {questions.map((q, i) => {
          const isAnswered = selectedOptions[q.id] !== undefined;
          return (
            <div key={q.id} style={{
              borderBottom: i < questions.length - 1 ? "1px solid #e2e8f0" : "none",
              background: i % 2 === 0 ? "#fff" : "#fafbff",
              padding: "12px 14px",
            }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <span style={{
                  fontSize: 11, fontWeight: 800, color: "#64748b",
                  flexShrink: 0, paddingTop: 1,
                }}>
                  {i + 1}.
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#1e293b", lineHeight: 1.5 }}>
                  {q.question}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5, paddingLeft: 20 }}>
                {q.options.map((opt, oi) => {
                  const isSelected = selectedOptions[q.id] === oi;
                  const disabled = examSubmitted;
                  return (
                    <label
                      key={oi}
                      onClick={() => !disabled && onSelectOption(q.id, oi)}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 8,
                        cursor: disabled ? "default" : "pointer",
                        borderRadius: 6,
                        padding: "5px 8px",
                        background: isSelected ? "#eff6ff" : "transparent",
                        border: isSelected ? "1px solid #bfdbfe" : "1px solid transparent",
                        transition: "all 0.12s",
                        opacity: disabled && !isSelected ? 0.55 : 1,
                      }}
                    >
                      <span style={{
                        width: 16, height: 16, borderRadius: "50%",
                        border: `2px solid ${isSelected ? "#2563eb" : "#cbd5e1"}`,
                        background: isSelected ? "#2563eb" : "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, marginTop: 1, transition: "all 0.12s",
                      }}>
                        {isSelected && (
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff", display: "block" }} />
                        )}
                      </span>
                      <span style={{
                        fontSize: 11, lineHeight: 1.5,
                        color: isSelected ? "#1e40af" : "#475569",
                        fontWeight: isSelected ? 600 : 400,
                      }}>
                        <span style={{ fontWeight: 800, color: isSelected ? "#1e40af" : "#94a3b8", marginRight: 3 }}>
                          {OPTION_LABELS[oi]}.
                        </span>
                        {opt}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
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
        <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e2e8f0", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", padding: "32px 24px", maxWidth: 440, width: "100%", textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: passed ? "#f0fdf4" : "#fef2f2", border: `1px solid ${passed ? "#bbf7d0" : "#fecaca"}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            {passed ? <Trophy size={32} color="#16a34a" /> : <XCircle size={32} color="#dc2626" />}
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
            {passed ? "Interview Complete" : "Interview Recorded"}
          </h2>
          <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 24px", fontWeight: 500 }}>{name} · {regnNo}</p>

          {/* Section scores */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24, flexWrap: "wrap" }}>
            {SECTIONS.map(sec => (
              <div key={sec.key} style={{ background: sec.light, border: `1px solid ${sec.accent}22`, borderRadius: 12, padding: "10px 14px", textAlign: "center", minWidth: 80 }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: sec.accent }}>{bySection[sec.key] ?? 0}/4</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: sec.color, marginTop: 2 }}>{sec.key}</div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div style={{ fontSize: 32, fontWeight: 900, color: passed ? "#16a34a" : "#dc2626", marginBottom: 6 }}>
            {total}<span style={{ fontSize: 18, fontWeight: 600, color: "#94a3b8" }}>/{totalMax}</span>
          </div>
          <p style={{ fontSize: 13, fontWeight: 700, color: passed ? "#16a34a" : "#dc2626", marginBottom: 28 }}>{pct}%</p>

          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
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

        /* Desktop: 3-column grid */
        .section-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          border-bottom: 2px solid #e2e8f0;
        }

        /* Tablet: 2-column grid */
        @media (max-width: 900px) {
          .section-grid {
            grid-template-columns: 1fr 1fr;
          }
          .section-col:last-child {
            grid-column: 1 / -1;
            border-right: none !important;
          }
        }

        /* Mobile: hide desktop grid, show mobile cards */
        @media (max-width: 600px) {
          .section-grid {
            display: none !important;
          }
          .mobile-sections {
            display: block !important;
          }
          .sheet-header-right {
            display: none !important;
          }
          .sheet-header-name {
            font-size: 15px !important;
          }
          .nav-progress {
            display: none !important;
          }
          .nav-answered {
            font-size: 11px !important;
          }
          .submit-footer {
            flex-direction: column !important;
            gap: 12px !important;
            align-items: stretch !important;
          }
          .submit-footer-left {
            text-align: center;
          }
          .submit-footer-right {
            justify-content: center !important;
          }
          .profile-accept-row {
            justify-content: center !important;
            flex-wrap: wrap;
          }
        }

        /* Show mobile sections only on mobile */
        .mobile-sections {
          display: none;
        }

        /* Tablet: column border fix */
        @media (max-width: 900px) and (min-width: 601px) {
          .section-col-border {
            border-right: 2px solid #e2e8f0 !important;
          }
        }
      `}</style>

      {/* Navbar */}
      <nav className="no-print" style={{
        background: "#fff",
        borderBottom: "1px solid #e2e8f0",
        padding: "0 16px",
        height: 52,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
      }}>
        <Link to="/studentprofile" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#64748b", textDecoration: "none", flexShrink: 0 }}>
          <ArrowLeft size={15} /> Back
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 6, overflow: "hidden" }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "#1e40af", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <ClipboardList size={14} color="#fff" />
          </div>
          <span style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Interview Scoresheet</span>
        </div>
        {/* Live progress pill */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <div className="nav-answered" style={{ fontSize: 12, fontWeight: 700, color: answeredCount === totalMax ? "#16a34a" : "#64748b", whiteSpace: "nowrap" }}>
            {answeredCount}/{totalMax}
          </div>
          <div className="nav-progress" style={{ width: 60, height: 6, borderRadius: 99, background: "#e2e8f0", overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 99, background: answeredCount === totalMax ? "#16a34a" : "#2563eb", width: `${progressPct}%`, transition: "width 0.3s ease" }} />
          </div>
        </div>
      </nav>

      {/* Sheet */}
      <div className="print-sheet" style={{
        maxWidth: 1100,
        margin: "16px auto",
        background: "#fff",
        borderRadius: 16,
        border: "1px solid #cbd5e1",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        overflow: "hidden",
        marginLeft: "max(16px, calc(50% - 550px))",
        marginRight: "max(16px, calc(50% - 550px))",
      }}>

        {/* Sheet header */}
        <div style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #1e40af 100%)",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 3 }}>
              Auto Generated Interview Questions
            </div>
            <div className="sheet-header-name" style={{ fontSize: 17, fontWeight: 900, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", fontWeight: 500, marginTop: 2 }}>Regn. No: {regnNo}</div>
          </div>
          {/* No score shown during exam */}
          <div className="sheet-header-right" style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.75)", whiteSpace: "nowrap" }}>
              {answeredCount} of {totalMax} answered
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontWeight: 500, marginTop: 2 }}>Score shown after submission</div>
          </div>
        </div>

        {/* ── DESKTOP / TABLET: 3-column section grid ── */}
        <div className="section-grid">
          {SECTIONS.map((sec, si) => {
            const qs          = sectionQs(sec.key);
            const secAnswered = qs.filter(q => selectedOptions[q.id] !== undefined).length;

            return (
              <div
                key={sec.key}
                className={`section-col ${si < 2 ? "section-col-border" : ""}`}
                style={{ borderRight: si < 2 ? "2px solid #e2e8f0" : "none" }}
              >
                {/* Section header */}
                <div style={{ background: sec.color, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", lineHeight: 1.3 }}>{sec.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "2px 8px", flexShrink: 0, marginLeft: 6 }}>
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

        {/* ── MOBILE: stacked section cards ── */}
        <div className="mobile-sections" style={{ padding: "16px 12px" }}>
          {SECTIONS.map(sec => (
            <MobileSectionCard
              key={sec.key}
              section={sec}
              questions={sectionQs(sec.key)}
              selectedOptions={selectedOptions}
              onSelectOption={handleSelectOption}
              examSubmitted={false}
            />
          ))}
        </div>

        {/* Submit footer */}
        <div
          className="submit-footer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 16px",
            borderTop: "1px solid #e2e8f0",
            gap: 12,
          }}
        >
          <div className="submit-footer-left" style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>
            Answered: <strong style={{ color: "#1e293b" }}>{answeredCount}/{totalMax}</strong>
            {answeredCount < totalMax && (
              <span style={{ marginLeft: 6, fontSize: 12, color: "#f59e0b", fontWeight: 600 }}>
                ⚠ {totalMax - answeredCount} unanswered
              </span>
            )}
          </div>
          <div
            className="submit-footer-right"
            style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", whiteSpace: "nowrap" }}>Profile accepted</span>
            <div className="profile-accept-row" style={{ display: "flex", gap: 6 }}>
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
                padding: "9px 20px", borderRadius: 10,
                background: profileAccepted === null ? "#e2e8f0" : "#1e40af",
                color: profileAccepted === null ? "#94a8b8" : "#fff",
                fontSize: 13, fontWeight: 800, border: "none",
                cursor: profileAccepted === null ? "not-allowed" : "pointer",
                transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6,
                whiteSpace: "nowrap",
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