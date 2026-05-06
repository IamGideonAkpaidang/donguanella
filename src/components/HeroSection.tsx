import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 md:pt-0 md:pb-0">
    <div className="absolute inset-0">
      <img
        src={heroBg}
        alt="Children receiving compassionate care at Donguanella"
        width={1920}
        height={1080}
        className="w-full h-full object-cover scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent" />
    </div>
    <div className="absolute top-1/4 right-[15%] w-72 h-72 rounded-full bg-secondary/10 blur-3xl animate-float" />
    <div className="absolute bottom-1/4 left-[10%] w-96 h-96 rounded-full bg-primary-foreground/5 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
    <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
      <div className="animate-fade-in-up">
        <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mt-2 md:mt-0 mb-8 text-primary-foreground/90 text-xs font-medium tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          Servants of Charity
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-[0.95] mb-8 tracking-tight">
          Restoring Dignity.
          <br />
          <span className="text-gradient-gold">Transforming Lives.</span>
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/75 mb-12 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
          Providing compassionate rehabilitation, education, and care for
          children and young persons with disabilities across Nigeria.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base px-10 py-7 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-500 group"
          >
            <Link to="/get-involved">
              Donate Now
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent border-2 border-secondary/60 text-primary-foreground hover:bg-secondary hover:text-secondary-foreground hover:border-secondary text-base px-10 py-7 rounded-full backdrop-blur-sm transition-all duration-500"
          >
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
  </section>
);

export default HeroSection;
