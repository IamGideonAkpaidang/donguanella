import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const centres = [
  { name: "Don Guanella Centre Nnebukwu", address: "P.O. Box 94, Orsu Obodo 473002, Oguta L.G.A, Imo State", phone: "+234 7036559953" },
  { name: "Our Lady of Providence, Owerri", address: "Plot D7 141/146, Industrial Layout, Owerri, Imo State", phone: "+234 8123853326" },
  { name: "Don Guanella Centre Abuja (Head Office)", address: "House 52, Sector F, First Avenue F.H.A Lugbe, Opposite Prognosy Supermarket, Airport Road, FCT Abuja, Nigeria", phone: "+234 8164776544" },
  { name: "St. Louis Guanella Centre, Ibadan", address: "Olukitbi Village, Moniya, Akinyele L.G.A, Ibadan, Oyo State", phone: "+234 7084338715" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    toast({ title: "Message sent!", description: "Thank you for reaching out. We'll get back to you soon." });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-primary overflow-hidden">
        <div className="absolute bottom-1/4 left-[10%] w-80 h-80 rounded-full bg-secondary/10 blur-[120px]" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl">
            <span className="label-style text-secondary/80">Reach Out</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mt-4 tracking-tight leading-[1.05]">
              Contact <span className="text-gradient-gold">Us</span>
            </h1>
            <p className="text-lg text-primary-foreground/70 mt-6 leading-relaxed max-w-2xl">
              We'd love to hear from you. Whether you want to donate, volunteer, partner, or simply learn more, get in touch.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Form + Map */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="container mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <div className="bg-card rounded-3xl p-8 md:p-12 border border-border/50 shadow-elegant">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">Send a Message</h2>
              <p className="text-muted-foreground mb-8">Fill in the form below and we'll respond as soon as possible.</p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className="rounded-xl border-border/60 bg-muted/30 h-12"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="rounded-xl border-border/60 bg-muted/30 h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <Input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+234..."
                      className="rounded-xl border-border/60 bg-muted/30 h-12"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                  <Textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help you?"
                    rows={5}
                    className="rounded-xl border-border/60 bg-muted/30 resize-none"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 font-semibold group">
                  Send Message <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>

            {/* Map */}
            <div className="space-y-8">
              <div className="rounded-3xl overflow-hidden border border-border/50 shadow-elegant">
                <iframe
                  title="Don Guanella Centres in Nigeria"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=2.5%2C5.5%2C10.5%2C10.5&layer=mapnik"
                  width="100%"
                  height="350"
                  className="w-full"
                  loading="lazy"
                />
              </div>
              <div className="bg-card rounded-3xl p-8 border border-border/50">
                <h3 className="font-serif text-xl font-bold text-foreground mb-2 tracking-tight">General Enquiries</h3>
                <p className="text-xs text-muted-foreground mb-4">Head Office — Abuja</p>
                <div className="space-y-3 mt-4">
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    House 52, Sector F, First Avenue F.H.A Lugbe, Opposite Prognosy Supermarket, Airport Road, FCT Abuja, Nigeria
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    +234 8164776544
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                    info@donguanella.org
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Centre Contacts */}
      <section className="section-padding bg-gradient-warm relative overflow-hidden">
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="label-style">Centre Contacts</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 tracking-tight">
              Reach Our <span className="text-gradient-gold">Centres Directly</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {centres.map((c) => (
              <div key={c.name} className="bg-card rounded-2xl p-7 border border-border/50 hover-lift">
                <h3 className="font-serif text-lg font-bold text-foreground mb-4 tracking-tight">{c.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {c.address}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    {c.phone}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="container mx-auto px-6 relative text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground tracking-tight">
            Need Consultation or Psychotherapy Assistance?
          </h2>
          <p className="text-primary-foreground/70 mt-4 max-w-xl mx-auto">
            Our team is available to provide professional guidance and support for families and individuals.
          </p>
          <Button size="lg" className="mt-10 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-10 py-7 font-semibold shadow-lg">
            Call Us Today
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
