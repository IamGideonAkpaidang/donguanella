import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Heart, Users, Handshake, ArrowRight, Calendar,
  Megaphone, BookOpen, GraduationCap, Globe, Building2
} from "lucide-react";
import { Link } from "react-router-dom";

const GetInvolvedPage = () => (
  <div className="min-h-screen">
    <Navbar />

    {/* Hero */}
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-primary overflow-hidden">
      <div className="absolute top-1/4 right-[15%] w-80 h-80 rounded-full bg-secondary/10 blur-[120px]" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl">
          <span className="label-style text-secondary/80">Join Our Mission</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mt-4 tracking-tight leading-[1.05]">
            Get <span className="text-gradient-gold">Involved</span>
          </h1>
          <p className="text-lg text-primary-foreground/70 mt-6 leading-relaxed max-w-2xl">
            Centres of this kind cannot survive without the help and financial assistance of generous people like you. There is something for everyone, everywhere, every time.
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>

    {/* Ways to Help */}
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="label-style">Make a Difference</span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 tracking-tight">
            Ways to <span className="text-gradient-gold">Help</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: Heart,
              title: "Donate",
              desc: "Your financial support provides therapy, education, and care for children in need. Donations can be monthly, weekly, or yearly.",
              cta: "Give Today",
              href: "/contact",
            },
            {
              icon: Users,
              title: "Volunteer",
              desc: "Share your time and skills to make a direct impact in a child's life. Visit the centre nearest to you as an individual, a group, or an organization.",
              cta: "Join Us",
              href: "/contact",
            },
            {
              icon: Handshake,
              title: "Partner",
              desc: "Collaborate with us as an organization to expand our reach. We search for sustainable development projects and appeal to people of good will.",
              cta: "Get in Touch",
              href: "/contact",
            },
          ].map((w) => (
            <div key={w.title} className="group bg-card rounded-3xl p-10 text-center border border-border/50 hover-lift">
              <div className="w-[72px] h-[72px] rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
                <w.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-4 tracking-tight">{w.title}</h3>
              <p className="text-muted-foreground mb-8 leading-[1.8]">{w.desc}</p>
              <Button asChild variant="outline" className="rounded-full border-border hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/btn">
                <Link to={w.href}>
                  {w.cta} <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Celebrate with Children */}
    <section className="py-20 bg-gradient-warm relative overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-8">
            <Calendar className="w-7 h-7 text-secondary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Celebrate With the Children
          </h2>
          <p className="text-muted-foreground mt-6 leading-[1.9] text-lg">
            Visit the centre nearer to you as an individual, a group, or an organization and celebrate your birthday with the children. Share joy, love, and create unforgettable memories.
          </p>
          <Button asChild size="lg" className="mt-10 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-10 py-7 font-semibold shadow-lg group">
            <Link to="/centres">
              Find a Centre <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Advocacy & Projects */}
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="group bg-card rounded-3xl p-10 border border-border/50 hover-lift">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Megaphone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4 tracking-tight">Advocacy</h3>
            <p className="text-muted-foreground leading-[1.8]">
              Strategic advocacy is essential for policy and practice change. We engage in advocacy for children with special needs, bringing light to the difficulties surrounding those who have nobody to take care of them, aligned with the UN Convention on the Rights of Persons with Disabilities (UNCRPD).
            </p>
          </div>
          <div className="group bg-card rounded-3xl p-10 border border-border/50 hover-lift">
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Globe className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4 tracking-tight">Project Management</h3>
            <p className="text-muted-foreground leading-[1.8]">
              Our major focus is on gaining ground on suitable development projects for children with special needs. We appeal to the government, private institutions, and people of good will to help promote sustainable projects for the special children in our centres.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Training & Conferences */}
    <section className="section-padding bg-gradient-primary relative overflow-hidden">
      <div className="absolute top-1/3 right-[10%] w-72 h-72 rounded-full bg-secondary/10 blur-[100px]" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="label-style text-secondary/80">Training & Conferences</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mt-4 tracking-tight">
                Building Capacity Together
              </h2>
              <p className="text-primary-foreground/70 mt-6 leading-[1.9]">
                The institute organizes periodic training for staff, parents, the general public, and young people working in rehabilitation. These programs create awareness and sharpen understanding of identifying and assisting children with special needs.
              </p>
              <p className="text-primary-foreground/70 mt-4 leading-[1.9]">
                Every year we organize conferences on disability issues across different states as a way of creating awareness on the general reality of our mission.
              </p>
            </div>
            <div className="space-y-5">
              {[
                { icon: GraduationCap, text: "Staff training programs" },
                { icon: Users, text: "Parent education workshops" },
                { icon: BookOpen, text: "Annual disability conferences" },
                { icon: Heart, text: "Consultation & psychotherapy" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-4 glass rounded-2xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="text-primary-foreground/90 font-medium text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>

    {/* Motto CTA */}
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative text-center">
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground tracking-tight italic">
          "Save the teen, there is something for everyone,
          <br className="hidden md:block" /> everywhere, every time."
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-10 py-7 font-semibold shadow-lg group">
            <Link to="/contact">
              Contact Us <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default GetInvolvedPage;
