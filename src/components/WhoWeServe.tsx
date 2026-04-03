const disabilities = [
  { label: "Down Syndrome", emoji: "💛" },
  { label: "Autism Spectrum", emoji: "🧩" },
  { label: "Cerebral Palsy", emoji: "💪" },
  { label: "Intellectual Disabilities", emoji: "🌟" },
  { label: "Physical Disabilities", emoji: "🤝" },
  { label: "Speech & Language", emoji: "💬" },
];

const WhoWeServe = () => (
  <section className="section-padding bg-background relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-light/30 blur-[150px]" />

    <div className="container mx-auto px-6 text-center relative">
      <span className="label-style">Who We Serve</span>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6 tracking-tight">
        Children & Young Persons
        <br />
        with <span className="text-gradient-gold">Disabilities</span>
      </h2>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
        We welcome and support children and young persons across a wide range
        of disabilities, providing individualized care plans for each.
      </p>
      <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
        {disabilities.map((d, i) => (
          <span
            key={d.label}
            className="group glass-strong rounded-full px-7 py-4 text-sm font-medium text-foreground hover-lift cursor-default flex items-center gap-2.5 shadow-sm"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className="text-base group-hover:scale-125 transition-transform duration-300">{d.emoji}</span>
            {d.label}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default WhoWeServe;
