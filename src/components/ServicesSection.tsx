import { ArrowUpRight, Church, Megaphone, Presentation, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";
import img1 from "@/assets/gallery/img1.jpg";
import img25 from "@/assets/gallery/img25.jpg";
import img44 from "@/assets/gallery/img44.jpg";
import img51 from "@/assets/gallery/img51.jpg";

const services = [
  {
    icon: HeartHandshake,
    title: "Apostolate",
    description: "Holistic care, rehabilitation, education and dignified support for children with special needs and elderly persons.",
    image: img1,
    href: "/services#apostolate",
    eyebrow: "Care & rehabilitation",
  },
  {
    icon: Church,
    title: "Priest and Religious",
    description: "Pastoral presence, spiritual accompaniment and compassionate ministry rooted in the charism of the Servants of Charity.",
    image: img51,
    href: "/services#priest-and-religious",
    eyebrow: "Pastoral ministry",
  },
  {
    icon: Megaphone,
    title: "Advocacy and Project",
    description: "Inclusive projects and public advocacy that advance dignity, opportunity and participation for vulnerable people.",
    image: img44,
    href: "/services#advocacy-and-project",
    eyebrow: "Inclusion & outreach",
  },
  {
    icon: Presentation,
    title: "Trainings and Conferences",
    description: "Practical courses, workshops and conferences that strengthen caregivers, families, educators and professionals.",
    image: img25,
    href: "/services#trainings-and-conferences",
    eyebrow: "Knowledge & capacity",
  },
];

const ServicesSection = () => (
  <section id="services" className="section-padding bg-gradient-subtle relative overflow-hidden">
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />

    <div className="container mx-auto px-6 relative">
      <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
        <span className="label-style">What We Do</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 tracking-tight">
          Four Ways We Serve
        </h2>
        <p className="text-muted-foreground mt-5 leading-relaxed">
          Our mission brings together compassionate care, spiritual service, advocacy and knowledge-sharing.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {services.map((service, i) => (
          <Link
            to={service.href}
            key={service.title}
            aria-label={`Explore ${service.title}`}
            className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-border/50 hover-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <img
              src={service.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/55 to-foreground/10" />
            <div
            key={s.title}
              className="absolute inset-x-0 bottom-0 p-7 md:p-9"
          >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                  <service.icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-6 w-6 text-primary-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
              <span className="text-xs font-semibold uppercase text-secondary">{service.eyebrow}</span>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold text-primary-foreground">
                {service.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/80">
                {service.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
