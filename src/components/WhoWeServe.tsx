const disabilities = [
  "Down Syndrome",
  "Autism Spectrum Disorder",
  "Cerebral Palsy",
  "Intellectual Disabilities",
  "Physical Disabilities",
  "Speech & Language Disorders",
];

const WhoWeServe = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-6 text-center">
      <p className="text-sm font-semibold tracking-widest text-secondary uppercase mb-4">Who We Serve</p>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
        Children & Young Persons with Disabilities
      </h2>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
        We welcome and support children and young persons across a wide range of disabilities, providing individualized care plans for each.
      </p>
      <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
        {disabilities.map((d) => (
          <span key={d} className="bg-gold-light text-warm-foreground px-6 py-3 rounded-full text-sm font-medium">
            {d}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default WhoWeServe;
