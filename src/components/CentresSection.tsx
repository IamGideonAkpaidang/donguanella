import { MapPin } from "lucide-react";

const centres = [
  { name: "Lagos Centre", location: "Lagos, Nigeria" },
  { name: "Abuja Centre", location: "Abuja, Nigeria" },
  { name: "Enugu Centre", location: "Enugu, Nigeria" },
  { name: "Calabar Centre", location: "Calabar, Nigeria" },
  { name: "Jos Centre", location: "Jos, Nigeria" },
  { name: "Owerri Centre", location: "Owerri, Nigeria" },
];

const CentresSection = () => (
  <section id="centres" className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-sm font-semibold tracking-widest text-secondary uppercase mb-4">Our Centres</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Locations Across Nigeria</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {centres.map((c) => (
          <div key={c.name} className="flex items-center gap-4 bg-muted rounded-lg p-5">
            <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{c.name}</h3>
              <p className="text-sm text-muted-foreground">{c.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CentresSection;
