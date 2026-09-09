import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const centres = [
  { name: "Abuja — Head Office", address: "House 52, Sector F, F.H.A Lugbe, FCT", phone: "+234 816 477 6544" },
  { name: "Owerri Centre", address: "Plot D7 141/146, Industrial Layout, Imo State", phone: "+234 812 385 3326" },
  { name: "Ibadan Centre", address: "Olukitbi Village, Moniya, Akinyele L.G.A, Oyo State", phone: "+234 708 433 8715" },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", phone: "", message: "" });
      toast({ title: "Message sent!", description: "We'll get back to you soon." });
    }, 1200);
  };

  return (
    <section id="contact" className="section-padding bg-muted relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] -translate-x-1/2" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="label-style">Contact Us</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 tracking-tight">
            Get in <span className="text-gradient-gold">Touch</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Have questions or want to get involved? Reach out to us — we'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-card rounded-3xl p-8 md:p-10 border border-border/50 shadow-elegant">
            <h3 className="font-serif text-xl font-semibold text-foreground mb-8 tracking-tight">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="contact-name" className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">Name *</Label>
                <Input
                  id="contact-name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  maxLength={100}
                  className="mt-2 rounded-xl border-border/60 bg-muted/50 focus:bg-card transition-colors h-12"
                />
              </div>
              <div>
                <Label htmlFor="contact-email" className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">Email *</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  maxLength={255}
                  className="mt-2 rounded-xl border-border/60 bg-muted/50 focus:bg-card transition-colors h-12"
                />
              </div>
              <div>
                <Label htmlFor="contact-phone" className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">Phone</Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  placeholder="+234 800 000 0000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  maxLength={20}
                  className="mt-2 rounded-xl border-border/60 bg-muted/50 focus:bg-card transition-colors h-12"
                />
              </div>
              <div>
                <Label htmlFor="contact-message" className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">Message *</Label>
                <Textarea
                  id="contact-message"
                  placeholder="How can we help you?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  maxLength={1000}
                  rows={5}
                  className="mt-2 rounded-xl border-border/60 bg-muted/50 focus:bg-card transition-colors"
                />
              </div>
              <Button
                type="submit"
                disabled={sending}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 font-semibold transition-all duration-300 group"
              >
                {sending ? "Sending..." : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                    <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            {/* Contact info */}
            <div className="mt-10 pt-8 border-t border-border/50 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-9 h-9 rounded-xl bg-gold-light flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-secondary" />
                </div>
                <span className="text-xs">info@donguanella.org</span>
              </div>
              <a href="tel:+2348164776544" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <div className="w-9 h-9 rounded-xl bg-gold-light flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-secondary" />
                </div>
                <span className="text-xs">+234 816 477 6544</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-9 h-9 rounded-xl bg-gold-light flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-secondary" />
                </div>
                <span className="text-xs">Lugbe, Abuja, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="bg-card rounded-3xl p-8 md:p-10 border border-border/50 shadow-elegant flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-xl font-semibold text-foreground tracking-tight">
                Visit a Centre
              </h3>
              <span className="text-[10px] uppercase tracking-[0.18em] text-secondary/80 font-semibold">
                3 Locations
              </span>
            </div>

            <ul className="space-y-4 flex-1">
              {centres.map((c) => (
                <li
                  key={c.name}
                  className="group flex items-start gap-4 rounded-2xl p-4 border border-border/50 bg-muted/40 hover:bg-card hover:border-secondary/40 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-light flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <MapPin className="w-4 h-4 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground tracking-tight">{c.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{c.address}</p>
                    <a
                      href={`tel:${c.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-secondary/80 mt-2 font-medium transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      {c.phone}
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Walk in any weekday between <span className="text-foreground font-semibold">9 AM – 5 PM</span>, or call ahead to schedule a guided visit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
