import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const centres = [
  { name: "Lagos Centre", address: "Lagos, Nigeria", coords: "6.5244,3.3792" },
  { name: "Abuja Centre", address: "Abuja, Nigeria", coords: "9.0579,7.4951" },
  { name: "Enugu Centre", address: "Enugu, Nigeria", coords: "6.4584,7.5464" },
  { name: "Calabar Centre", address: "Calabar, Nigeria", coords: "4.9517,8.3220" },
  { name: "Jos Centre", address: "Jos, Nigeria", coords: "9.8965,8.8583" },
  { name: "Owerri Centre", address: "Owerri, Nigeria", coords: "5.4836,7.0333" },
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
    <section id="contact" className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold tracking-widest text-secondary uppercase mb-4">
            Contact Us
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Get in Touch
          </h2>
          <p className="mt-4 text-muted-foreground">
            Have questions or want to get involved? Reach out to us — we'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
            <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="contact-name">Name *</Label>
                <Input
                  id="contact-name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  maxLength={100}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="contact-email">Email *</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  maxLength={255}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="contact-phone">Phone</Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  placeholder="+234 800 000 0000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  maxLength={20}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="contact-message">Message *</Label>
                <Textarea
                  id="contact-message"
                  placeholder="How can we help you?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  maxLength={1000}
                  rows={5}
                  className="mt-1.5"
                />
              </div>
              <Button
                type="submit"
                disabled={sending}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {sending ? "Sending..." : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>

            {/* Contact info */}
            <div className="mt-8 pt-6 border-t border-border space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-secondary" />
                info@donguanella.org
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-secondary" />
                +234 800 000 0000
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-secondary" />
                Lagos, Nigeria
              </div>
            </div>
          </div>

          {/* Map + Locations */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl overflow-hidden border border-border shadow-sm flex-1 min-h-[300px]">
              <iframe
                title="Donguanella Centre Locations"
                src="https://www.openstreetmap.org/export/embed.html?bbox=2.5,4.0,10.0,10.5&layer=mapnik"
                className="w-full h-full min-h-[300px]"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {centres.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-3 bg-card rounded-lg p-4 border border-border"
                >
                  <div className="w-8 h-8 rounded-full bg-gold-light flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.address}</p>
                  </div>
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
