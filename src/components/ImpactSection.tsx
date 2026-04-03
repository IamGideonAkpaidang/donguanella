const stats = [
  { number: "6+", label: "Centres Across Nigeria", sub: "Nationwide presence" },
  { number: "25+", label: "Years of Service", sub: "Established legacy" },
  { number: "3,000+", label: "Children Supported", sub: "Lives transformed" },
  { number: "200+", label: "Dedicated Staff", sub: "Compassionate team" },
];

const ImpactSection = () => (
  <section id="impact" className="section-padding bg-gradient-primary text-primary-foreground relative overflow-hidden">
    {/* Decorative elements */}
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent" />
    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent" />
    <div className="absolute top-1/4 right-[10%] w-80 h-80 rounded-full bg-secondary/10 blur-[100px]" />
    <div className="absolute bottom-1/4 left-[5%] w-64 h-64 rounded-full bg-primary-foreground/5 blur-[80px]" />

    <div className="container mx-auto px-6 relative">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <span className="label-style !text-secondary/80">Our Impact</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 tracking-tight">
          Making a Difference
          <br />
          <span className="text-gradient-gold">Every Day</span>
        </h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="text-center p-8 rounded-3xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm hover:bg-primary-foreground/10 transition-all duration-500"
          >
            <div className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-gradient-gold mb-4">
              {s.number}
            </div>
            <p className="text-primary-foreground/90 text-sm font-medium mb-1">
              {s.label}
            </p>
            <p className="text-primary-foreground/50 text-xs">{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactSection;
