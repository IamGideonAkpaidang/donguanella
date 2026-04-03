import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EmotionalHook from "@/components/EmotionalHook";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WhoWeServe from "@/components/WhoWeServe";
import ImpactSection from "@/components/ImpactSection";
import GetInvolved from "@/components/GetInvolved";
import TestimonialSection from "@/components/TestimonialSection";
import CentresSection from "@/components/CentresSection";
import FinalCTA from "@/components/FinalCTA";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <EmotionalHook />
    <AboutSection />
    <ServicesSection />
    <WhoWeServe />
    <ImpactSection />
    <GetInvolved />
    <TestimonialSection />
    <CentresSection />
    <ContactSection />
    <FinalCTA />
    <Footer />
  </div>
);

export default Index;
