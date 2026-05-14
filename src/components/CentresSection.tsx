import { MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const centres = [
  { name: "Abuja Centre", location: "Lugbe, FCT", region: "Head Office", established: "2003" },
  { name: "Owerri Centre", location: "Owerri, Imo State", region: "South-East", established: "2016" },
  { name: "Lagos Centre", location: "Lagos State", region: "South-West", established: "1998" },
  { name: "Ibadan Centre", location: "Moniya, Oyo State", region: "South-West", established: "2019" },
];

const CentresSection = () => (
  <section id="centres" className="section-padding bg-background relative overflow-hidden">
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
    <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full bg-secondary/5 blur-[120px]" />

    <div className="container mx-auto px-6 relative">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <span className="label-style">Our Centres</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 tracking-tight">
          Locations Across <span className="text-gradient-gold">Nigeria</span>
        </h2>
        <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
          Four communities. One mission. Visit any of our rehabilitation centres serving children and young persons with disabilities.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
        {centres.map((c, i) => (
          <Link
            key={c.name}
            to="/centres"
            className="group relative bg-card rounded-3xl p-7 border border-border/50 hover-lift overflow-hidden"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-secondary/5 blur-2xl group-hover:bg-secondary/15 transition-colors duration-700" />
            <div className="relative flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gold-light flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                <MapPin className="w-6 h-6 text-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-secondary/80 font-semibold">
                    {c.region}
                  </span>
                  <span className="text-xs text-muted-foreground/60 font-mono">est. {c.established}</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground tracking-tight">
                  {c.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{c.location}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 flex-shrink-0 group-hover:text-secondary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CentresSection;
