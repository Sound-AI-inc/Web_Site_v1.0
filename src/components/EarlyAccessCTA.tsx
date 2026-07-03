import { Link } from "react-router-dom";

interface EarlyAccessCTAProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function EarlyAccessCTA({
  title = "Join the Early Access list",
  subtitle = "Be first in line when SoundAI opens production access. One identity across marketing, billing, and workspace.",
  className = "",
}: EarlyAccessCTAProps) {
  return (
    <section className={`m-section ${className}`}>
      <div className="container-max">
        <div className="m-cta-panel">
          <div className="relative z-10 max-w-2xl">
            <p className="m-kicker">Early Access</p>
            <h2 className="mt-3 font-poppins text-3xl font-semibold tracking-tight text-text md:text-4xl">{title}</h2>
            <p className="mt-4 font-codec text-base leading-relaxed text-text/70">{subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/early-access" className="btn-primary">
                Join Early Access
              </Link>
              <Link to="/pricing" className="btn-secondary">
                View pricing
              </Link>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full bg-primary/10 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-10 right-20 h-40 w-40 rounded-full bg-accent-light/30 blur-3xl" aria-hidden />
        </div>
      </div>
    </section>
  );
}
