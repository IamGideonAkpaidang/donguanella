import { Button } from "@/components/ui/button";

const FinalCTA = () => (
  <section className="py-20 md:py-28 bg-primary text-primary-foreground">
    <div className="container mx-auto px-6 text-center max-w-3xl">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
        Together, We Can Transform Lives
      </h2>
      <p className="text-primary-foreground/80 text-lg mb-10 leading-relaxed">
        Your support — whether through donation, volunteering, or partnership — brings hope, healing, and dignity to children who need it most.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base px-8 py-6 font-semibold">
          Donate Now
        </Button>
        <Button size="lg" variant="outline" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 py-6">
          Contact Us
        </Button>
      </div>
    </div>
  </section>
);

export default FinalCTA;
