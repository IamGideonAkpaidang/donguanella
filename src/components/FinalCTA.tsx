import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTA = () => (
  <section className="section-padding bg-gradient-primary text-primary-foreground relative overflow-hidden">
    {/* Decorative */}
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent" />
    <div className="absolute top-1/3 right-[10%] w-64 h-64 rounded-full bg-secondary/15 blur-[80px]" />
    <div className="absolute bottom-1/3 left-[10%] w-48 h-48 rounded-full bg-primary-foreground/5 blur-[60px]" />

    <div className="container mx-auto px-6 text-center max-w-3xl relative">
      <div className="inline-flex items-center gap-2 border border-primary-foreground/15 rounded-full px-5 py-2 mb-10 text-primary-foreground/70 text-xs font-medium tracking-widest uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
        Join Our Mission
      </div>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight leading-[1.05]">
        Together, We Can
        <br />
        <span className="text-gradient-gold">Transform Lives</span>
      </h2>
      <p className="text-primary-foreground/65 text-lg mb-12 leading-relaxed max-w-xl mx-auto">
        Your support — whether through donation, volunteering, or partnership
        — brings hope, healing, and dignity to children who need it most.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base px-10 py-7 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-500 group"
        >
          Donate Now
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="bg-transparent border-secondary/40 text-primary-foreground hover:bg-secondary hover:text-secondary-foreground hover:border-secondary text-base px-10 py-7 rounded-full backdrop-blur-sm transition-all duration-500"
        >
          Contact Us
        </Button>
      </div>
    </div>
  </section>
);

export default FinalCTA;
