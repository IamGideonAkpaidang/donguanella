import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground pt-20 pb-10">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1">
          <h3 className="font-serif text-2xl font-bold mb-4 tracking-tight">Donguanella</h3>
          <p className="text-primary-foreground/50 text-sm leading-[1.8]">
            Restoring dignity and transforming lives through compassionate
            rehabilitation and care.
          </p>
          <div className="flex gap-3 mt-6">
            {["Facebook", "Twitter", "Instagram"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-9 h-9 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 flex items-center justify-center text-xs text-primary-foreground/50 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-all duration-300"
              >
                {s[0]}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-6 text-xs tracking-[0.15em] uppercase text-primary-foreground/70">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm text-primary-foreground/45">
            {["About Us", "Services", "Our Impact", "Centres"].map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase().replace(/ /g, "").replace("our", "")}`}
                  className="hover:text-primary-foreground transition-colors duration-300"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-6 text-xs tracking-[0.15em] uppercase text-primary-foreground/70">
            Get Involved
          </h4>
          <ul className="space-y-3 text-sm text-primary-foreground/45">
            {["Donate", "Volunteer", "Partner With Us"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-primary-foreground transition-colors duration-300">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-6 text-xs tracking-[0.15em] uppercase text-primary-foreground/70">
            Contact
          </h4>
          <ul className="space-y-4 text-sm text-primary-foreground/45">
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-foreground/5 flex items-center justify-center flex-shrink-0">
                <Mail className="w-3.5 h-3.5" />
              </div>
              info@donguanella.org
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-foreground/5 flex items-center justify-center flex-shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </div>
              +234 800 000 0000
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-foreground/5 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              Lagos, Nigeria
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/30">
        <span>© {new Date().getFullYear()} Donguanella Rehabilitation Centres. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary-foreground/60 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary-foreground/60 transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
