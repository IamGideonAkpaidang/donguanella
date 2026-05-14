import { Button } from "@/components/ui/button";
import { Heart, Users, Handshake, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ways = [
  {
    icon: Heart,
    title: "Donate",
    description: "Your financial support provides therapy, education, and care for children in need.",
    cta: "Give Today",
    accent: "primary",
    href: "/get-involved",
  },
  {
    icon: Users,
    title: "Volunteer",
    description: "Share your time and skills to make a direct impact in a child's life.",
    cta: "Join Us",
    accent: "accent",
    href: "/contact",
  },
  {
    icon: Handshake,
    title: "Partner",
    description: "Collaborate with us as an organization to expand our reach and deepen our impact.",
    cta: "Get in Touch",
    accent: "secondary",
    href: "/contact",
  },
];

const GetInvolved = () => (
  <section className="section-padding bg-gradient-warm relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[120px]" />

    <div className="container mx-auto px-6 relative">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <span className="label-style">Get Involved</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 tracking-tight">
          Be Part of the <span className="text-gradient-gold">Mission</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {ways.map((w, i) => (
          <div
            key={w.title}
            className="group relative bg-card rounded-3xl p-10 text-center border border-border/50 hover-lift"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className={`w-18 h-18 w-[72px] h-[72px] rounded-2xl bg-${w.accent}/10 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500`}>
              <w.icon className={`w-8 h-8 text-${w.accent}`} />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-card-foreground mb-4 tracking-tight">
              {w.title}
            </h3>
            <p className="text-muted-foreground mb-8 leading-[1.8]">
              {w.description}
            </p>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-border hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/btn"
            >
              <Link to={w.href}>
                {w.cta}
                <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default GetInvolved;
