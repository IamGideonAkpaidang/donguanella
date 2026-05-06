import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Heart, GraduationCap, Sprout, Brain, Stethoscope,
  Target, Shield, Lightbulb, Smile, Users, Ear, ArrowRight,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  { icon: Stethoscope, title: "Rehabilitation & Therapy", desc: "Comprehensive physiotherapy and rehabilitation programs tailored to each child's needs." },
  { icon: GraduationCap, title: "Special Education", desc: "Specialized educational programs designed for children with various learning disabilities." },
  { icon: Sprout, title: "Vocational Training", desc: "Agricultural activities including poultry, fishery, piggery, bakery, garri production, and crop farming as occupational therapy." },
  { icon: Brain, title: "Occupational Therapy", desc: "Developing independence through practical daily living skills and activities." },
  { icon: Ear, title: "Speech Therapy", desc: "Specialized speech and language therapy to improve communication abilities." },
  { icon: Activity, title: "Day-Care & Boarding", desc: "Both boarding and day-care rehabilitative assistance programs for flexible care." },
];

const categories = [
  { title: "Down Syndrome", desc: "Comprehensive support and development programs for children with Down syndrome." },
  { title: "Cerebral Palsy", desc: "Specialized physiotherapy and motor skills development for cerebral palsy." },
  { title: "Autism Spectrum", desc: "Tailored behavioural and social skills programs for autistic children." },
  { title: "Learning Disabilities", desc: "Structured educational support for various learning disabilities." },
  { title: "Intellectual Disabilities", desc: "Cognitive development and life skills training programs." },
];

const goals = [
  { icon: Heart, text: "Offer care and rehabilitation for persons with disability" },
  { icon: Shield, text: "Guarantee respect for their human dignity" },
  { icon: Lightbulb, text: "Develop every special child's potential" },
  { icon: Smile, text: "Nurture a life-long love for the disabled children" },
  { icon: Sprout, text: "Create an exciting environment" },
  { icon: Target, text: "Encourage domestic independent thinking" },
  { icon: GraduationCap, text: "Prepare every child to make a difference" },
  { icon: Users, text: "Ensure that everyone's voice and opportunity is heard" },
];

const Services = () => (
  <div className="min-h-screen">
    <Navbar />

    {/* Hero */}
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-primary overflow-hidden">
      <div className="absolute bottom-1/4 left-[10%] w-80 h-80 rounded-full bg-secondary/10 blur-[120px]" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl">
          <span className="label-style text-secondary/80">What We Do</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mt-4 tracking-tight leading-[1.05]">
            Our <span className="text-gradient-gold">Services</span>
          </h1>
          <p className="text-lg text-primary-foreground/70 mt-6 leading-relaxed max-w-2xl">
            We use a wide range of styles and resources to excite, motivate and rehabilitate children with special needs aged 9–25 to succeed and thrive.
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>

    {/* What We Do */}
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="label-style">Rehabilitation Services</span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 tracking-tight">
            How We <span className="text-gradient-gold">Help</span>
          </h2>
          <p className="text-muted-foreground mt-6 leading-[1.8]">
            Every child is valued. We care about children's early years rehabilitation and know that getting it right is crucial in providing the building blocks for their future.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group bg-card rounded-3xl p-8 border border-border/50 hover-lift"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3 tracking-tight">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-[1.8]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Categories */}
    <section className="section-padding bg-gradient-warm relative overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="label-style">Who We Serve</span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 tracking-tight">
            Categories of <span className="text-gradient-gold">Children We Care For</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((c, i) => (
            <div
              key={c.title}
              className={`group bg-card rounded-3xl p-8 border border-border/50 hover-lift ${i === categories.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <div className="w-3 h-3 rounded-full bg-secondary mb-6" />
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3 tracking-tight">{c.title}</h3>
              <p className="text-muted-foreground text-sm leading-[1.8]">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Primary Goals */}
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[120px]" />
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="label-style">Our Commitment</span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 tracking-tight">
            Primary <span className="text-gradient-gold">Goals</span>
          </h2>
          <p className="text-muted-foreground mt-6 leading-[1.8]">
            We aim to give every child, whatever their background or circumstances, the support they need to be healthy, stay safe, enjoy and achieve through learning, be happy and loved in society.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {goals.map((g, i) => (
            <div key={i} className="flex items-start gap-5 bg-card rounded-2xl p-6 border border-border/50 hover-lift">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <g.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-foreground font-medium text-sm leading-relaxed pt-2">{g.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-gradient-primary relative overflow-hidden">
      <div className="container mx-auto px-6 relative text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground tracking-tight">
          Want to support our mission?
        </h2>
        <p className="text-primary-foreground/70 mt-4 max-w-xl mx-auto">
          Your contributions help us provide essential services to children who need them most.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-10 py-7 font-semibold shadow-lg group">
            <Link to="/get-involved">
              Get Involved <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-secondary/40 text-primary-foreground hover:bg-secondary hover:text-secondary-foreground hover:border-secondary rounded-full px-10 py-7 transition-all duration-500">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Services;
