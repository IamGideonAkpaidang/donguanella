import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const links = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Centres", to: "/centres" },
  { label: "Get Involved", to: "/get-involved" },
  { label: "Gallery", to: "/gallery" },
  { label: "Courses", to: "/lms/courses" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong shadow-elegant py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link
          to="/"
          className="font-serif text-xl font-bold tracking-tight transition-colors duration-300"
          style={{ color: scrolled ? 'hsl(215, 60%, 28%)' : 'hsl(40, 33%, 98%)' }}
        >
          Donguanella
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-[13px] font-medium tracking-wide transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:transition-all after:duration-300 hover:after:w-full ${
                location.pathname === l.to
                  ? scrolled
                    ? "text-primary after:w-full after:bg-primary"
                    : "text-primary-foreground after:w-full after:bg-primary-foreground"
                  : scrolled
                    ? "text-muted-foreground hover:text-primary after:bg-primary"
                    : "text-primary-foreground/80 hover:text-primary-foreground after:bg-primary-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <Button
                asChild
                size="sm"
                variant="ghost"
                className={`rounded-full px-4 text-[13px] font-medium transition-all duration-300 ${
                  scrolled
                    ? "text-primary hover:bg-primary/10"
                    : "text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                <Link to={isAdmin ? "/lms/admin" : "/lms/dashboard"}>
                  <LayoutDashboard className="w-4 h-4" />
                  {isAdmin ? "Admin" : "Dashboard"}
                </Link>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => signOut()}
                className={`rounded-full px-4 text-[13px] font-medium transition-all duration-300 ${
                  scrolled
                    ? "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              asChild
              size="sm"
              variant="ghost"
              className={`rounded-full px-4 text-[13px] font-medium transition-all duration-300 ${
                scrolled
                  ? "text-primary hover:bg-primary/10"
                  : "text-primary-foreground hover:bg-primary-foreground/10"
              }`}
            >
              <Link to="/lms/login">Sign In</Link>
            </Button>
          )}
          <Button
            asChild
            size="sm"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-6 text-[13px] font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Link to="/get-involved">Donate</Link>
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
            <Link
              key={l.to}
              to={l.to}
              className={`block py-3 text-sm font-medium transition-colors ${
                location.pathname === l.to ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                to={isAdmin ? "/lms/admin" : "/lms/dashboard"}
                className="block py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {isAdmin ? "Admin Dashboard" : "My Dashboard"}
              </Link>
              <button
                onClick={() => signOut()}
                className="block w-full text-left py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex gap-2 mt-3">
              <Button asChild size="sm" variant="outline" className="flex-1 rounded-full font-semibold">
                <Link to="/lms/login">Sign In</Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="flex-1 rounded-full font-semibold">
                <Link to="/lms/register">Sign Up</Link>
              </Button>
            </div>
          )}
          <Button
            asChild
            size="sm"
            className="mt-3 w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full font-semibold"
          >
            <Link to="/get-involved">Donate</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
