const stats = [
  { number: "6+", label: "Centres Across Nigeria" },
  { number: "25+", label: "Years of Service" },
  { number: "3,000+", label: "Children Supported" },
  { number: "200+", label: "Dedicated Staff" },
];

const ImpactSection = () => (
  <section id="impact" className="py-20 md:py-28 bg-primary text-primary-foreground">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-sm font-semibold tracking-widest text-secondary uppercase mb-4">Our Impact</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Making a Difference Every Day</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-secondary mb-3">{s.number}</div>
            <p className="text-primary-foreground/75 text-sm md:text-base">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactSection;
