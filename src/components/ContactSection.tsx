import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const centres = [
  { name: "Lagos", coords: "6.5244,3.3792" },
  { name: "Abuja", coords: "9.0579,7.4951" },
  { name: "Enugu", coords: "6.4584,7.5464" },
  { name: "Calabar", coords: "4.9517,8.3220" },
  { name: "Jos", coords: "9.8965,8.8583" },
  { name: "Owerri", coords: "5.4836,7.0333" },
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
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-9 h-9 rounded-xl bg-gold-light flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-secondary" />
                </div>
                <span className="text-xs">+234 800 000 0000</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-9 h-9 rounded-xl bg-gold-light flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-secondary" />
                </div>
                <span className="text-xs">Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Map + Locations */}
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl overflow-hidden border border-border/50 shadow-elegant flex-1 min-h-[320px]">
              <iframe
                title="Donguanella Centre Locations"
                src="https://www.openstreetmap.org/export/embed.html?bbox=2.5,4.0,10.0,10.5&layer=mapnik"
                className="w-full h-full min-h-[320px]"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {centres.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-3 bg-card rounded-2xl p-4 border border-border/50 hover:border-secondary/30 transition-colors duration-300"
                >
                  <div className="w-8 h-8 rounded-xl bg-gold-light flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-secondary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{c.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
