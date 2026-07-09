import { Link } from "react-router-dom";
import { featuresNav, legalFooter, productsFooter, resourcesFooter } from "../data/navigation";
import { SoundAILogoLink } from "./SoundAILogo";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-text/8 bg-white/50">
      <div className="container-max section-padding pb-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SoundAILogoLink size="lg" />
            <p className="mt-4 max-w-sm font-codec text-sm leading-relaxed text-text/65">
              Modular AI music infrastructure for production-grade assets. The future layer of music production systems.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/early-access" className="btn-primary !px-4 !py-2 !text-sm">
                Join Early Access
              </Link>
              <Link to="/developing-process" className="btn-secondary !px-4 !py-2 !text-sm">
                Workspace
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-poppins text-xs font-semibold uppercase tracking-wider text-text/45">Products</h3>
            <ul className="mt-4 space-y-2">
              {productsFooter.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="font-codec text-sm text-text/70 transition hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-poppins text-xs font-semibold uppercase tracking-wider text-text/45">Features</h3>
            <ul className="mt-4 space-y-2">
              {featuresNav.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="font-codec text-sm text-text/70 transition hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-poppins text-xs font-semibold uppercase tracking-wider text-text/45">Resources</h3>
            <ul className="mt-4 space-y-2">
              {resourcesFooter.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="font-codec text-sm text-text/70 transition hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 font-poppins text-xs font-semibold uppercase tracking-wider text-text/45">Legal</h3>
            <ul className="mt-4 space-y-2">
              {legalFooter.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="font-codec text-sm text-text/70 transition hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-text/8 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-codec text-xs text-text/50">© {new Date().getFullYear()} Sound-AI Inc. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 font-codec text-xs text-text/50">
            <Link to="/about" className="hover:text-primary">
              About / Vision
            </Link>
            <Link to="/legal/privacy" className="hover:text-primary">
              Privacy
            </Link>
            <Link to="/legal/terms" className="hover:text-primary">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
