import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const centres = [
  {
    name: "Don Guanella Centre Nnebukwu",
    location: "Oguta L.G.A, Owerri, Imo State",
    address: "P.O. Box 94, Orsu Obodo 473002, Oguta L.G.A, Owerri, Imo State, Nigeria",
    phone: "+234 7036559953",
    director: "Centre Director",
    established: "1992",
    description: "The first and founding centre of the Congregation in Africa, established in Nnebukwu, Oguta. This centre has been the bedrock of rehabilitative services in Nigeria.",
  },
  {
    name: "Our Lady of Providence Centre",
    location: "Owerri, Imo State",
    address: "Plot D7 141/146, Industrial Layout, Owerri, Imo State, Nigeria",
    phone: "+234 8123853326",
    director: "Centre Director",
    established: "1998",
    description: "Located in the industrial layout of Owerri, this centre provides both boarding and day-care rehabilitative assistance to children with special needs.",
  },
  {
    name: "Don Guanella Rehabilitation Centre",
    location: "Lugbe, Abuja FCT",
    address: "House 52, Sector F, First Avenue F.H.A Lugbe, Opposite Prognosy Supermarket, Airport Road, FCT Abuja, Nigeria",
    phone: "+234 8164776544",
    director: "Centre Director",
    established: "2003",
    description: "Strategically located in the Federal Capital Territory, this centre serves children and families across northern Nigeria.",
  },
  {
    name: "St. Louis Guanella Centre / House of Providence",
    location: "Ibadan, Oyo State",
    address: "Olukitbi Village, Moniya, Akinyele L.G.A / New Olubadan Palace Road, Yemetu Aladorin, Ibadan, Oyo State, Nigeria",
    phone: "+234 7084338715 / +234 8134728939",
    director: "Centre Director",
    established: "2008",
    description: "Serving the southwest region from two locations in Ibadan, providing comprehensive rehabilitation and educational services.",
  },
];

const Centres = () => (
  <div className="min-h-screen">
    <Navbar />

    {/* Hero */}
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-primary overflow-hidden">
      <div className="absolute top-1/3 right-[15%] w-72 h-72 rounded-full bg-secondary/10 blur-[120px]" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl">
          <span className="label-style text-secondary/80">Our Locations</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mt-4 tracking-tight leading-[1.05]">
            Our <span className="text-gradient-gold">Centres</span>
          </h1>
          <p className="text-lg text-primary-foreground/70 mt-6 leading-relaxed max-w-2xl">
            Four rehabilitation centres across Nigeria, with our mission extending to Ghana, Democratic Republic of Congo, and Tanzania.
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>

    {/* Centres Grid */}
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="container mx-auto px-6 relative">
        <div className="space-y-8 max-w-5xl mx-auto">
          {centres.map((c, i) => (
            <div
              key={c.name}
              className="group bg-card rounded-3xl border border-border/50 overflow-hidden hover-lift"
            >
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-secondary/10 text-secondary font-serif font-bold text-sm">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground/60">Est. {c.established}</span>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">
                      {c.name}
                    </h3>
                    <p className="text-muted-foreground leading-[1.8] mb-6 max-w-xl">
                      {c.description}
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{c.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{c.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Map */}
    <section className="py-20 bg-gradient-warm relative overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="label-style">Locations</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 tracking-tight">
            Across <span className="text-gradient-gold">Nigeria</span>
          </h2>
        </div>
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-border/50 shadow-elegant">
          <iframe
            title="Don Guanella Centres in Nigeria"
            src="https://www.openstreetmap.org/export/embed.html?bbox=2.5%2C5.5%2C10.5%2C10.5&layer=mapnik"
            width="100%"
            height="450"
            className="w-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    {/* Africa Expansion */}
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-3xl mx-auto">
          <span className="label-style">Beyond Nigeria</span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 tracking-tight">
            Our African <span className="text-gradient-gold">Expansion</span>
          </h2>
          <p className="text-muted-foreground mt-6 leading-[1.8]">
            From our founding in Nigeria, the Congregation has extended its mission across the African continent.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            {[
              { country: "Ghana", year: "1997" },
              { country: "DR Congo", year: "1996" },
              { country: "Tanzania", year: "2016" },
            ].map((c) => (
              <div key={c.country} className="bg-card rounded-2xl p-8 border border-border/50 hover-lift text-center">
                <span className="font-serif text-3xl font-bold text-gradient-gold">{c.year}</span>
                <p className="text-foreground font-semibold mt-3">{c.country}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-gradient-primary relative overflow-hidden">
      <div className="container mx-auto px-6 relative text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground tracking-tight">Visit a Centre Near You</h2>
        <p className="text-primary-foreground/70 mt-4 max-w-xl mx-auto">
          Come see the impact firsthand. Celebrate your birthday with the children, or volunteer your time.
        </p>
        <Button asChild size="lg" className="mt-10 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-10 py-7 font-semibold shadow-lg group">
          <Link to="/contact">
            Contact Us <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </section>

    <Footer />
  </div>
);

export default Centres;
