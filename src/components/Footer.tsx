import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border py-16">
      <div className="container mx-auto px-6">
        {/* Logo section */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="font-bold text-foreground mb-4">Company</h3>
            <div className="space-y-2 text-sm">
              <Link
                to="/about"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                to="/services"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Services
              </Link>
              <a
                href="/#portfolio"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Work
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-4">Resources</h3>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">Blog (coming soon)</p>
              <p className="text-muted-foreground">Case Studies</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Phone: +91-7006009596</p>
              <p>WhatsApp: +91-8899990966</p>
              <p>Email: info@northpeaktechnologies.com</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-4">Social</h3>
            <div className="space-y-2 text-sm">
              <a
                href="https://instagram.com/northpeaktechnologies"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/northpeaks-teachnologies"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <div className="flex flex-col items-center gap-2">
            <img
              src="/company_logo.png"
              alt="NorthPeak Technologies"
              className="h-8 w-auto"
            />
            <p>
              © {new Date().getFullYear()} NorthPeak Technologies. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
