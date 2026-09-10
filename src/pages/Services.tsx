import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Activity, ArrowRight, Baby, Brain, Church, Ear, GraduationCap,
  HandHeart, HeartHandshake, Home, Megaphone, Presentation,
  Sprout, Stethoscope, UserRound, Users
} from "lucide-react";
import { Link } from "react-router-dom";
import img1 from "@/assets/gallery/img1.jpg";
import img25 from "@/assets/gallery/img25.jpg";
import img44 from "@/assets/gallery/img44.jpg";
import img51 from "@/assets/gallery/img51.jpg";

const childrenServices = [
  { icon: Stethoscope, title: "Rehabilitation & Therapy", desc: "Comprehensive physiotherapy and rehabilitation programmes tailored to each child's needs." },
  { icon: GraduationCap, title: "Special Education", desc: "Specialised educational programmes designed for children with diverse learning needs." },
  { icon: Sprout, title: "Vocational Training", desc: "Practical agricultural and livelihood activities that build confidence, skills and independence." },
  { icon: Brain, title: "Occupational Therapy", desc: "Developing independence through practical daily-living skills and guided activities." },
  { icon: Ear, title: "Speech Therapy", desc: "Specialised speech and language therapy that supports clearer communication." },
  { icon: Activity, title: "Day-Care & Boarding", desc: "Flexible day-care and residential rehabilitative assistance in a safe, caring environment." },
];

const elderlyServices = [
  { icon: Home, title: "Residential Care & Shelter", desc: "A safe, dignified home offering comfort, security and attentive care to elderly persons in need." },
  { icon: HandHeart, title: "Spiritual & Pastoral Care", desc: "Pastoral accompaniment, prayer and counselling that nurture faith, peace and dignity in later life." },
];

const majorServices = [
  {
    id: "priest-and-religious",
    icon: Church,
    label: "Faith in service",
    title: "Priest and Religious",
    description: "Our priests and religious bring the spirit and charism of the Servants of Charity into compassionate ministry, walking alongside the people entrusted to our care.",
    points: ["Pastoral presence and sacramental support", "Spiritual accompaniment and counselling", "Community ministry rooted in compassion"],
    image: img51,
    imageAlt: "Priests and religious gathered in fellowship",
  },
  {
    id: "advocacy-and-project",
    icon: Megaphone,
    label: "Dignity in action",
    title: "Advocacy and Project",
    description: "We champion the rights, dignity and inclusion of persons with disabilities and other vulnerable people through awareness, partnerships and practical community projects.",
    points: ["Disability-rights awareness and inclusion", "Community outreach and stakeholder engagement", "Projects that expand care and opportunity"],
    image: img44,
    imageAlt: "Advocates raising signs for disability rights and inclusive education",
  },
  {
    id: "trainings-and-conferences",
    icon: Presentation,
    label: "Knowledge that transforms",
    title: "Trainings and Conferences",
    description: "We equip caregivers, families, educators, religious and professionals with practical knowledge for effective, person-centred care and inclusive support.",
    points: ["Certificate courses for caregivers", "Workshops for families and professionals", "Conferences, seminars and shared learning"],
    image: img25,
    imageAlt: "Facilitators speaking during a training programme",
  },
];

const Services = () => (
  <div className="min-h-screen">
    <Navbar />

    <section className="relative overflow-hidden bg-gradient-primary pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="container relative mx-auto px-6">
        <div className="max-w-4xl">
          <span className="label-style text-secondary/80">What We Do</span>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] text-primary-foreground md:text-6xl lg:text-7xl">
            Service shaped by <span className="text-gradient-gold">dignity and love</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/75">
            Our work is expressed through four major areas: Apostolate, Priest and Religious, Advocacy and Project, and Trainings and Conferences.
          </p>
        </div>
      </div>
    </section>

    <section id="apostolate" className="scroll-mt-24 bg-background py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-2xl">
            <img src={img1} alt="Caregiver supporting children at a rehabilitation centre" className="aspect-[4/3] h-full w-full object-cover" />
          </div>
          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <HeartHandshake className="h-6 w-6 text-primary" />
            </div>
            <span className="label-style">Compassionate care</span>
            <h2 className="mt-3 text-3xl font-bold text-foreground md:text-5xl">Apostolate</h2>
            <p className="mt-5 leading-[1.8] text-muted-foreground">
              Our Apostolate restores dignity at every stage of life through holistic services for children with special needs and compassionate care for elderly persons.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10"><Baby className="h-5 w-5 text-primary" /></div>
            <div><span className="label-style">Apostolate I</span><h3 className="text-2xl font-bold text-foreground">Services to Children</h3></div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {childrenServices.map((service) => (
              <article key={service.title} className="group rounded-2xl border border-border/50 bg-card p-7 hover-lift">
                <service.icon className="mb-5 h-6 w-6 text-primary" />
                <h4 className="text-lg font-bold text-card-foreground">{service.title}</h4>
                <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">{service.desc}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-6xl">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/15"><UserRound className="h-5 w-5 text-secondary" /></div>
            <div><span className="label-style">Apostolate II</span><h3 className="text-2xl font-bold text-foreground">Services to the Elderly</h3></div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {elderlyServices.map((service) => (
              <article key={service.title} className="group rounded-2xl border border-border/50 bg-card p-7 hover-lift">
                <service.icon className="mb-5 h-6 w-6 text-secondary" />
                <h4 className="text-lg font-bold text-card-foreground">{service.title}</h4>
                <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">{service.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>

    {majorServices.map((service, index) => (
      <section key={service.id} id={service.id} className={`scroll-mt-24 py-20 md:py-28 ${index % 2 === 0 ? "bg-gradient-warm" : "bg-background"}`}>
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <img src={service.image} alt={service.imageAlt} className="aspect-[4/3] w-full rounded-2xl object-cover" loading="lazy" />
            </div>
            <div className={index % 2 === 1 ? "lg:order-1" : ""}>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10"><service.icon className="h-6 w-6 text-primary" /></div>
              <span className="label-style">{service.label}</span>
              <h2 className="mt-3 text-3xl font-bold text-foreground md:text-5xl">{service.title}</h2>
              <p className="mt-5 leading-[1.8] text-muted-foreground">{service.description}</p>
              <ul className="mt-7 space-y-3">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm font-medium text-foreground">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-secondary" />{point}
                  </li>
                ))}
              </ul>
              {service.id === "trainings-and-conferences" && (
                <Button asChild className="mt-8 rounded-full px-7"><Link to="/courses">Explore Our Courses <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              )}
            </div>
          </div>
        </div>
      </section>
    ))}

    <section className="bg-gradient-primary py-20">
      <div className="container mx-auto px-6 text-center">
        <Users className="mx-auto h-9 w-9 text-secondary" />
        <h2 className="mt-5 text-3xl font-bold text-primary-foreground md:text-4xl">Partner with our mission</h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/70">Join us in restoring dignity and creating opportunities for the people and communities we serve.</p>
        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="rounded-full bg-secondary px-9 text-secondary-foreground hover:bg-secondary/90"><Link to="/get-involved">Get Involved <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          <Button asChild size="lg" variant="outline" className="rounded-full border-secondary/50 bg-transparent px-9 text-primary-foreground hover:border-secondary hover:bg-secondary hover:text-secondary-foreground"><Link to="/contact">Contact Us</Link></Button>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Services;