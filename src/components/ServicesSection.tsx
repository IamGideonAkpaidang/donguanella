import { Heart, BookOpen, Wrench, Hand } from "lucide-react";

const services = [
  { icon: Heart, title: "Rehabilitation & Therapy", description: "Physiotherapy, speech therapy, and behavioural support tailored to each child's unique needs." },
  { icon: BookOpen, title: "Special Education", description: "Adaptive curricula designed to unlock every child's learning potential in a supportive environment." },
  { icon: Wrench, title: "Vocational Training", description: "Practical skills training to empower young persons toward independence and meaningful contribution." },
  { icon: Hand, title: "Occupational Therapy", description: "Building daily living skills and motor development through guided, compassionate practice." },
];

const ServicesSection = () => (
  <section id="services" className="py-20 md:py-28 bg-muted">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-sm font-semibold tracking-widest text-secondary uppercase mb-4">What We Do</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Our Services</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((s) => (
          <div key={s.title} className="bg-card rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-14 h-14 rounded-full bg-gold-light flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <s.icon className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-card-foreground mb-3">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
