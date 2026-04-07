import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Work", path: "/#portfolio", external: true },
  { label: "About", path: "/about" },
  // { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash === "#portfolio") {
      // Small delay to ensure the page has loaded
      const timer = setTimeout(() => {
        const element = document.getElementById("portfolio");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else if (location.pathname === "/" && !location.hash) {
      // Scroll to top when on home page without hash
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/company_logo.png"
            alt="NorthPeak Technologies"
            className="h-10 w-auto"
          />
          <span className="text-xl font-bold tracking-tight">
            <span className="gradient-text">NorthPeak</span>{" "}
            <span className="text-foreground">Technologies</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
            item.external ? (
              <button
                key={item.label}
                onClick={() => navigate("/#portfolio")}
                className={`text-sm font-medium transition-colors hover:text-foreground text-muted-foreground bg-transparent border-0 cursor-pointer`}
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  location.pathname === item.path
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link to="/contact">
            <Button className="gradient-bg text-primary-foreground hover:opacity-90 rounded-full px-6">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-border px-6 pb-6 pt-2 space-y-4">
          {navItems.map((item) =>
            item.external ? (
              <button
                key={item.label}
                onClick={() => {
                  navigate("/#portfolio");
                  setOpen(false);
                }}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors bg-transparent border-0 cursor-pointer w-full text-left"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setOpen(false)}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ),
          )}
          <Link to="/contact" onClick={() => setOpen(false)}>
            <Button className="gradient-bg text-primary-foreground w-full rounded-full">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
