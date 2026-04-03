import { MapPin } from "lucide-react";

const centres = [
  { name: "Lagos Centre", location: "Lagos, Nigeria", established: "1998" },
  { name: "Abuja Centre", location: "Abuja, Nigeria", established: "2003" },
  { name: "Enugu Centre", location: "Enugu, Nigeria", established: "2005" },
  { name: "Calabar Centre", location: "Calabar, Nigeria", established: "2008" },
  { name: "Jos Centre", location: "Jos, Nigeria", established: "2012" },
  { name: "Owerri Centre", location: "Owerri, Nigeria", established: "2016" },
];

const CentresSection = () => (
  <section id="centres" className="section-padding bg-background relative overflow-hidden">
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />

    <div className="container mx-auto px-6 relative">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <span className="label-style">Our Centres</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 tracking-tight">
          Locations Across <span className="text-gradient-gold">Nigeria</span>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {centres.map((c, i) => (
          <div
            key={c.name}
            className="group flex items-center gap-5 bg-card rounded-2xl p-6 border border-border/50 hover-lift cursor-default"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="w-12 h-12 rounded-2xl bg-gold-light flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
              <MapPin className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground tracking-tight">{c.name}</h3>
              <p className="text-sm text-muted-foreground">{c.location}</p>
            </div>
            <span className="text-xs text-muted-foreground/60 font-mono">{c.established}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CentresSection;
