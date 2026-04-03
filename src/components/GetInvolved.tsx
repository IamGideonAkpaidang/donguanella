import { Button } from "@/components/ui/button";
import { Heart, Users, Handshake } from "lucide-react";

const ways = [
  { icon: Heart, title: "Donate", description: "Your financial support provides therapy, education, and care for children in need.", cta: "Give Today" },
  { icon: Users, title: "Volunteer", description: "Share your time and skills to make a direct impact in a child's life.", cta: "Join Us" },
  { icon: Handshake, title: "Partner", description: "Collaborate with us as an organization to expand our reach and deepen our impact.", cta: "Get in Touch" },
];

const GetInvolved = () => (
  <section className="py-20 md:py-28 bg-warm">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-sm font-semibold tracking-widest text-secondary uppercase mb-4">Get Involved</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Be Part of the Mission</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {ways.map((w) => (
          <div key={w.title} className="bg-card rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <w.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-card-foreground mb-3">{w.title}</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">{w.description}</p>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              {w.cta}
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default GetInvolved;
