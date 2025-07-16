import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginSelection from "./pages/LoginSelection";
import FarmerLogin from "./pages/FarmerLogin";
import OTPVerification from "./pages/OTPVerification";
import AdminLogin from "./pages/AdminLogin";
import FarmerDashboard from "./pages/FarmerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginSelection />} />
          <Route path="/farmer-login" element={<FarmerLogin />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
