import { Heart, BookOpen, Wrench, Hand } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Rehabilitation & Therapy",
    description: "Physiotherapy, speech therapy, and behavioural support tailored to each child's unique needs.",
    gradient: "from-primary/10 to-accent/10",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: BookOpen,
    title: "Special Education",
    description: "Adaptive curricula designed to unlock every child's learning potential in a supportive environment.",
    gradient: "from-secondary/10 to-gold-light",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
  },
  {
    icon: Wrench,
    title: "Vocational Training",
    description: "Practical skills training to empower young persons toward independence and meaningful contribution.",
    gradient: "from-accent/10 to-primary/5",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
  {
    icon: Hand,
    title: "Occupational Therapy",
    description: "Building daily living skills and motor development through guided, compassionate practice.",
    gradient: "from-gold-light to-warm",
    iconBg: "bg-gold-light",
    iconColor: "text-secondary",
  },
];

const ServicesSection = () => (
  <section id="services" className="section-padding bg-gradient-subtle relative overflow-hidden">
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />

    <div className="container mx-auto px-6 relative">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <span className="label-style">What We Do</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 tracking-tight">
          Our Services
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <div
            key={s.title}
            className="group relative bg-card rounded-3xl p-8 border border-border/50 hover-lift cursor-default"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Hover gradient overlay */}
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative">
              <div className={`w-14 h-14 rounded-2xl ${s.iconBg} flex items-center justify-center mb-7 group-hover:scale-110 transition-transform duration-500`}>
                <s.icon className={`w-6 h-6 ${s.iconColor}`} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-card-foreground mb-3 tracking-tight">
                {s.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-[1.8]">
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
