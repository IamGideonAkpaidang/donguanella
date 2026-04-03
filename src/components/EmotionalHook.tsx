const EmotionalHook = () => (
  <section className="section-padding bg-background relative overflow-hidden">
    {/* Subtle decorative background */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-warm/50 to-transparent" />

    <div className="container mx-auto px-6 max-w-4xl text-center relative">
      <div className="flex items-center justify-center gap-4 mb-10">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-secondary" />
        <div className="w-2 h-2 rounded-full bg-secondary/60" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-secondary" />
      </div>
      <p className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-snug font-medium tracking-tight">
        Every child deserves{" "}
        <span className="text-gradient-gold italic">dignity</span>,{" "}
        <span className="text-gradient-gold italic">love</span>, and the
        chance to{" "}
        <span className="text-gradient-gold italic">thrive</span> —
        regardless of ability.
      </p>
      <div className="flex items-center justify-center gap-4 mt-10">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-secondary" />
        <div className="w-2 h-2 rounded-full bg-secondary/60" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-secondary" />
      </div>
    </div>
  </section>
);

export default EmotionalHook;
