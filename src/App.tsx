import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import StudentProfile from "./pages/StudentProfile";
import Index from "./pages/Index";
import Assignment from "./pages/Assignment.tsx";
import Listpersons from "./pages/Listpersons.tsx";
import HRSignup from "./pages/Hrsignup.tsx";
import HRVerify from "./pages/HRVerify.tsx";   // ← add
import NotFound from "./pages/NotFound";
import HRPayment from "./pages/Hrpayment.tsx";
import EmployerSignup from "./pages/EmployerSignup.tsx";
import HRDashboard from "./pages/Hrdashboard.tsx"
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/studentprofile" element={<StudentProfile />} />
          <Route path="/assignment" element={<Assignment />} />
          <Route path="/listpersons" element={<Listpersons />} />
          <Route path="/signup" element={<HRSignup />} />
          <Route path="/verify" element={<HRVerify />} />  {/* ← add */}
          <Route path="/hr/dashboard" element={<HRDashboard />} />
          <Route path="/payment" element={<HRPayment />} />
          <Route path="/employer/signup" element={<EmployerSignup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;