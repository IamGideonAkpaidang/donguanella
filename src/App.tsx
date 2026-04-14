import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Services from "./pages/Services.tsx";
import Centres from "./pages/Centres.tsx";
import GetInvolved from "./pages/GetInvolved.tsx";
import Contact from "./pages/Contact.tsx";
import Gallery from "./pages/Gallery.tsx";
import NotFound from "./pages/NotFound.tsx";

// LMS Pages
import Login from "./pages/lms/Login.tsx";
import Register from "./pages/lms/Register.tsx";
import Courses from "./pages/lms/Courses.tsx";
import CourseDetail from "./pages/lms/CourseDetail.tsx";
import Dashboard from "./pages/lms/Dashboard.tsx";
import Payment from "./pages/lms/Payment.tsx";
import PaymentVerify from "./pages/lms/PaymentVerify.tsx";
import AdminDashboard from "./pages/lms/AdminDashboard.tsx";
import AdminCourseDetail from "./pages/lms/AdminCourseDetail.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/centres" element={<Centres />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />

            {/* LMS Routes */}
            <Route path="/lms/login" element={<Login />} />
            <Route path="/lms/register" element={<Register />} />
            <Route path="/lms/courses" element={<Courses />} />
            <Route path="/lms/courses/:slug" element={<CourseDetail />} />
            <Route path="/lms/dashboard" element={<Dashboard />} />
            <Route path="/lms/payment/:courseId" element={<Payment />} />
            <Route path="/lms/payment/verify" element={<PaymentVerify />} />
            <Route path="/lms/admin" element={<AdminDashboard />} />
            <Route path="/lms/admin/courses/:courseId" element={<AdminCourseDetail />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
