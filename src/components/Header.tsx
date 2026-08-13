import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { SoundAILogoLink } from "./SoundAILogo";

const navLinks = [
  { label: "Product", href: "/products/users" },
  { label: "Features", href: "/features/ai-generation" },
  { label: "For Creators", href: "/products/users" },
  { label: "For Producers", href: "/use-cases/producers" },
  { label: "Studios / Enterprise", href: "/solutions/creative-studios" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources/blog" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-text/5 bg-surface/80 backdrop-blur-xl">
      <div className="container-max flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <SoundAILogoLink />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="rounded-lg px-3 py-2 font-poppins text-sm font-medium text-text/80 transition hover:bg-white/60 hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to="/developing-process"
            className="rounded-lg px-3 py-2 font-poppins text-sm font-medium text-text/80 transition hover:bg-white/60 hover:text-text"
          >
            Sign In
          </Link>
          <Link to="/early-access" className="btn-primary !px-4 !py-2 !text-sm">
            Get Early Access
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-text/5 bg-surface/95 px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-poppins text-sm font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2 border-t border-text/5 pt-4">
            <Link to="/developing-process" className="font-poppins text-sm font-medium" onClick={() => setMobileOpen(false)}>
              Sign In
            </Link>
            <Link to="/early-access" className="btn-primary text-center" onClick={() => setMobileOpen(false)}>
              Get Early Access
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
