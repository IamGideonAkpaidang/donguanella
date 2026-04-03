import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroBg} alt="Children receiving compassionate care at Donguanella" width={1920} height={1080} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-primary/60" />
    </div>
    <div className="relative z-10 container mx-auto px-6 text-center max-w-3xl animate-fade-in-up">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6">
        Restoring Dignity.<br />Transforming Lives.
      </h1>
      <p className="text-lg md:text-xl text-primary-foreground/85 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
        Providing compassionate rehabilitation, education, and care for children and young persons with disabilities across Nigeria.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base px-8 py-6 font-semibold">
          Donate Now
        </Button>
        <Button size="lg" variant="outline" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 py-6">
          Learn More
        </Button>
      </div>
    </div>
  </section>
);

export default HeroSection;
