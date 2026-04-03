import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer id="contact" className="bg-foreground text-primary-foreground py-16">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-10 mb-12">
        <div>
          <h3 className="font-serif text-xl font-bold mb-4">Donguanella</h3>
          <p className="text-primary-foreground/60 text-sm leading-relaxed">
            Restoring dignity and transforming lives through compassionate rehabilitation and care.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase">Quick Links</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/60">
            <li><a href="#about" className="hover:text-primary-foreground transition-colors">About Us</a></li>
            <li><a href="#services" className="hover:text-primary-foreground transition-colors">Services</a></li>
            <li><a href="#impact" className="hover:text-primary-foreground transition-colors">Our Impact</a></li>
            <li><a href="#centres" className="hover:text-primary-foreground transition-colors">Centres</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase">Get Involved</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/60">
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Donate</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Volunteer</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Partner With Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/60">
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@donguanella.org</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +234 800 000 0000</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Lagos, Nigeria</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 pt-8 text-center text-sm text-primary-foreground/40">
        © {new Date().getFullYear()} Donguanella Rehabilitation Centres. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
