import { useState } from "react";
import {
  ArrowLeft, CreditCard, CheckCircle, AlertCircle,
  Loader2, Copy, QrCode, ShieldCheck, ChevronRight,
  ClipboardCheck, RefreshCw,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// ── swap your QR import here ──
import paymentQR from "../media/image.png";

const UPI_ID = "tsinfomedia@oksbi";
const RATE_PER_PERSON = 50;

type Phase = "qr" | "ack" | "submitting" | "success";

interface LocationState {
  selectedIds?: number[];
}

export default function PayForData() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedIds: number[] = (location.state as LocationState)?.selectedIds ?? [];
  const amount = selectedIds.length * RATE_PER_PERSON;
  const displayAmount = `₹${amount.toLocaleString("en-IN")}.00`;

  const [phase, setPhase] = useState<Phase>("qr");
  const [refId, setRefId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (): void => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // const handleSubmit = async (): Promise<void> => {
  //   const trimmed = refId.trim();
  //   if (!trimmed) { setError("Please enter a valid payment reference ID."); return; }
  //   setPhase("submitting");
  //   setError("");
  //   try {
  //     // Optional: POST to backend
  //     // await fetch("http://192.168.0.10:8000/api/hr/payment-confirm/", {
  //     //   method: "POST",
  //     //   headers: { "Content-Type": "application/json" },
  //     //   body: JSON.stringify({ reference_id: trimmed, ids: selectedIds }),
  //     // });

  //     await new Promise<void>(r => setTimeout(r, 1400));

  //     const existing: number[] = JSON.parse(localStorage.getItem("unlockedIds") ?? "[]");
  //     const merged = Array.from(new Set([...existing, ...selectedIds]));
  //     localStorage.setItem("unlockedIds", JSON.stringify(merged));

  //     setPhase("success");
  //     setTimeout(() => navigate("/listpersons"), 2000);
  //   } catch (err: unknown) {
  //     setError(err instanceof Error ? err.message : "Submission failed.");
  //     setPhase("ack");
  //   }
  // };


  const handleSubmit = async (): Promise<void> => {
  const trimmed = refId.trim();
  if (!trimmed) { setError("Please enter a valid payment reference ID."); return; }

  setPhase("submitting");
  setError("");

  try {
    const employerId = localStorage.getItem("employer_id");
    if (!employerId) {
      setError("No employer session found. Please log in again.");
      setPhase("ack");
      return;
    }

    // ── POST payment to backend — creates Payment records in DB ──
    const res = await fetch("http://192.168.0.7:8000/api/hr/payment-confirm/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        employer_id:  employerId,
        reference_id: trimmed,
        student_ids:  selectedIds,
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error ?? `Server error ${res.status}`);
    }

    // ── Payment saved in DB successfully ──
    setPhase("success");

    // ── Navigate back after 2s; location.key change triggers re-fetch ──
    setTimeout(() => navigate("/listpersons", { replace: false }), 2000);

  } catch (err: unknown) {
    setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    setPhase("ack");
  }
};

  if (phase === "success") {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center px-4"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>
        <div className="text-center space-y-5 max-w-sm">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-400 shadow-2xl shadow-emerald-200 mx-auto">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Payment Confirmed!</h1>
            <p className="text-sm font-semibold text-slate-400 mt-1">
              {selectedIds.length} candidate{selectedIds.length !== 1 ? "s" : ""} unlocked.
            </p>
          </div>
          <div className="flex items-center gap-2 justify-center text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2 w-fit mx-auto">
            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Returning to candidate list…
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>

      {/* Navbar */}
      <nav className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b-2 border-blue-100 shadow-sm shadow-blue-50">
        <div className="max-w-lg mx-auto px-6 h-full flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-600 transition-colors bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-200">
              <CreditCard className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-black tracking-tight text-blue-900">Pay for Data</span>
          </div>
          <span className="text-[10px] font-black tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            UPI
          </span>
        </div>
      </nav>

      <main className="max-w-lg mx-auto px-4 py-12 pb-24">

        {/* Hero */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 shadow-xl shadow-blue-200 mb-4">
            <QrCode className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-blue-900 tracking-tight">Unlock Candidate Data</h1>
          <p className="text-sm font-semibold text-blue-400 mt-1">
            ₹{RATE_PER_PERSON} per candidate × {selectedIds.length} selected
          </p>
        </div>

        {/* Summary pill */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl px-5 py-2 flex items-center gap-3">
            <span className="text-xs font-black text-blue-500 uppercase tracking-widest">Candidates</span>
            <span className="text-lg font-black text-blue-900">{selectedIds.length}</span>
            <span className="text-blue-300">×</span>
            <span className="text-xs font-black text-blue-500 uppercase tracking-widest">₹{RATE_PER_PERSON}</span>
            <span className="text-blue-300">=</span>
            <span className="text-lg font-black text-blue-900">{displayAmount}</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border-2 border-blue-100 shadow-lg shadow-blue-50 overflow-hidden">

          <div className="flex items-center gap-3 px-6 py-4 border-b-2 border-blue-50 bg-gradient-to-r from-blue-50 to-white">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200 shrink-0">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-black tracking-widest uppercase text-blue-700">Secure UPI Payment</span>
          </div>

          <div className="p-8 space-y-7">

            {/* Amount badge */}
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-r from-blue-600 to-sky-500 text-white px-8 py-3 rounded-2xl shadow-lg shadow-blue-200">
                <p className="text-[10px] font-black tracking-[0.2em] uppercase opacity-80 mb-0.5">Amount Due</p>
                <p className="text-3xl font-black tracking-tight">{displayAmount}</p>
              </div>
            </div>

            {/* QR */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative p-3 bg-white rounded-2xl border-2 border-blue-100 shadow-md shadow-blue-50">
                <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-blue-500 rounded-tl-lg pointer-events-none" />
                <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-blue-500 rounded-tr-lg pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-blue-500 rounded-bl-lg pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-blue-500 rounded-br-lg pointer-events-none" />
                <img src={paymentQR} alt="Payment QR Code" width={220} height={220} className="rounded-xl block" />
              </div>
              <p className="text-[11px] font-bold text-blue-400 tracking-wide">Scan with any UPI app</p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-blue-100" />
              <span className="text-[10px] font-black tracking-[0.25em] uppercase text-blue-400 px-2 bg-blue-50 border border-blue-100 rounded-full py-0.5">OR</span>
              <div className="h-px flex-1 bg-blue-100" />
            </div>

            {/* UPI ID */}
            <div className="space-y-1.5">
              <label className="text-xs font-black tracking-widest uppercase text-blue-500 block">UPI ID</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-11 flex items-center gap-2.5 rounded-xl border-2 border-blue-100 bg-blue-50 px-4">
                  <span className="text-sm font-black text-blue-700 truncate">{UPI_ID}</span>
                </div>
                <button
                  onClick={handleCopy}
                  className={`h-11 px-4 rounded-xl border-2 text-xs font-black transition-all shrink-0 flex items-center gap-1.5 ${
                    copied
                      ? "border-emerald-300 bg-emerald-50 text-emerald-600"
                      : "border-blue-200 bg-blue-50 text-blue-500 hover:bg-blue-100 hover:border-blue-400"
                  }`}
                >
                  {copied ? <><CheckCircle className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                </button>
              </div>
            </div>

            {/* Instruction */}
            <div className="flex gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-blue-500 leading-relaxed">
                After paying, click <strong className="text-blue-700">Acknowledge Payment</strong> and enter your UPI transaction reference number.
              </p>
            </div>

            {/* Acknowledge button */}
            {phase === "qr" && (
              <button
                onClick={() => setPhase("ack")}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white text-sm font-black shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <ClipboardCheck className="w-4 h-4" />
                Acknowledge Payment
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {/* Reference ID form */}
            {(phase === "ack" || phase === "submitting") && (
              <div className="space-y-4 border-t-2 border-blue-50 pt-6">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <p className="text-sm font-black text-slate-700">Payment Done? Enter Reference ID</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black tracking-widest uppercase text-blue-500 block">
                    UPI Reference / Transaction ID
                  </label>
                  <input
                    type="text"
                    value={refId}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setRefId(e.target.value); setError(""); }}
                    placeholder="e.g. 426831950012"
                    disabled={phase === "submitting"}
                    className="w-full h-11 rounded-xl border-2 border-blue-100 bg-blue-50 px-4 text-base font-semibold text-slate-800 placeholder:text-blue-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-50"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-500 text-xs font-bold justify-center bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => { setPhase("qr"); setError(""); }}
                    disabled={phase === "submitting"}
                    className="h-12 px-4 rounded-xl border-2 border-blue-200 bg-blue-50 text-xs font-black text-blue-500 hover:bg-blue-100 hover:border-blue-400 transition-all disabled:opacity-40 flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={phase === "submitting" || !refId.trim()}
                    className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-sm font-black shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                  >
                    {phase === "submitting"
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> Confirming…</>
                      : <><CheckCircle className="w-4 h-4" /> Confirm & Continue <ChevronRight className="w-4 h-4" /></>
                    }
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        <div className="flex items-center justify-center mt-8">
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-black text-blue-500 hover:text-blue-700 hover:underline transition-colors bg-transparent border-none cursor-pointer"
          >
            ← Back to candidates
          </button>
        </div>

      </main>
    </div>
  );
}