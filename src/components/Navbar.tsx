import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = ["About", "Services", "Impact", "Centres", "Contact"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong shadow-elegant py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <a href="#" className="font-serif text-xl font-bold tracking-tight transition-colors duration-300"
          style={{ color: scrolled ? 'hsl(215, 60%, 28%)' : 'hsl(40, 33%, 98%)' }}>
          Donguanella
        </a>
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className={`text-[13px] font-medium tracking-wide transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:transition-all after:duration-300 hover:after:w-full ${
                scrolled
                  ? "text-muted-foreground hover:text-primary after:bg-primary"
                  : "text-primary-foreground/80 hover:text-primary-foreground after:bg-primary-foreground"
              }`}
            >
              {l}
            </a>
          ))}
          <Button
            size="sm"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-6 text-[13px] font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Donate
          </Button>
        </div>
        <button
          className={`md:hidden transition-colors duration-300 ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden glass-strong mx-4 mt-2 rounded-2xl px-6 py-4 animate-scale-in">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {l}
            </a>
          ))}
          <Button
            size="sm"
            className="mt-3 w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full font-semibold"
          >
            Donate
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
