import { Link } from "react-router-dom";
import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import type { Plan } from "../../data/plans";

interface BillingCardProps {
  plan: Plan;
  current?: boolean;
}

export default function BillingCard({ plan, current }: BillingCardProps) {
  const isHighlight = plan.highlight;
  const [selectedPkg, setSelectedPkg] = useState(plan.creditPackages ? plan.creditPackages[0] : undefined);
  const [selectedOption, setSelectedOption] = useState(plan.pricingOptions ? plan.pricingOptions[0] : undefined);

  const displayPrice = selectedPkg ? `$${selectedPkg.price}` : selectedOption ? selectedOption.price : plan.price;
  const displayCadence = selectedPkg
    ? `/ ${selectedPkg.credits} credits`
    : selectedOption
      ? selectedOption.cadence
      : plan.cadence;

  const ctaHref =
    plan.id === "enterprise"
      ? "/support"
      : plan.id === "trial" && current
        ? undefined
        : "/developing-process";

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div
        className={`relative flex h-full min-h-0 flex-col gap-4 rounded-card border border-text/10 bg-white p-6 shadow-flat-sm ${
          isHighlight ? "ring-1 ring-primary/15" : ""
        }`}
      >
        {isHighlight && (
          <span className="absolute -top-3 left-6 rounded-full bg-primary px-2.5 py-1 font-poppins text-[10px] font-bold uppercase tracking-wider text-white">
            Popular
          </span>
        )}

        <header className="flex shrink-0 items-center gap-2">
          <h3 className="font-poppins text-base font-semibold text-text">{plan.name}</h3>
          {plan.proOnly && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 font-poppins text-[9px] font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3 w-3" />
              Pro
            </span>
          )}
        </header>

        <div className="shrink-0">
          <div className="font-poppins text-3xl font-semibold text-text">
            {displayPrice}
            {displayCadence && (
              <span className="ml-1 font-codec text-sm font-normal text-text/60">{displayCadence}</span>
            )}
          </div>
          {plan.description && (
            <p className="mt-2 font-codec text-xs leading-relaxed text-text/65">{plan.description}</p>
          )}
        </div>

        {plan.pricingOptions && selectedOption && (
          <div className="shrink-0">
            <span className="mb-1.5 block font-codec text-[11px] font-medium text-text/60">Choose billing</span>
            <div className="flex flex-col gap-1">
              {plan.pricingOptions.map((opt) => {
                const active = opt.id === selectedOption.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedOption(opt)}
                    className={`flex items-center justify-between rounded-button border px-3 py-2 font-codec text-xs transition-colors ${
                      active
                        ? "border-primary/60 bg-primary/5 text-primary"
                        : "border-text/10 text-text/65 hover:border-primary/30"
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span className="font-medium">
                      {opt.price}
                      <span className="ml-1 text-text/45">{opt.cadence}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            {selectedOption.note && (
              <p className="mt-1.5 font-codec text-[11px] italic text-text/45">{selectedOption.note}</p>
            )}
          </div>
        )}

        {plan.creditPackages && selectedPkg && (
          <div className="shrink-0">
            <span className="mb-1.5 block font-codec text-[11px] font-medium text-text/60">Select credits package</span>
            <div className="flex flex-col gap-1">
              {plan.creditPackages.map((pkg) => {
                const active = pkg.credits === selectedPkg.credits;
                return (
                  <button
                    key={pkg.credits}
                    type="button"
                    onClick={() => setSelectedPkg(pkg)}
                    className={`flex items-center justify-between rounded-button border px-3 py-2 font-codec text-xs transition-colors ${
                      active
                        ? "border-primary/60 bg-primary/5 text-primary"
                        : "border-text/10 text-text/65 hover:border-primary/30"
                    }`}
                  >
                    <span>{pkg.credits} credits</span>
                    <span className="font-medium">${pkg.price}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <ul className="flex min-h-0 flex-1 flex-col gap-2">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2 font-codec text-sm text-text/70">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {current ? (
          <button type="button" className="app-btn-ghost mt-auto h-10 shrink-0" disabled>
            Current plan
          </button>
        ) : ctaHref ? (
          <Link
            to={ctaHref}
            className={`mt-auto shrink-0 text-center ${isHighlight ? "app-btn-primary h-10 leading-10" : "app-btn-ghost h-10 leading-10"}`}
          >
            {plan.cta}
          </Link>
        ) : (
          <Link to="/early-access" className="app-btn-primary mt-auto h-10 shrink-0 text-center leading-10">
            Join Early Access
          </Link>
        )}

        {plan.pricingNote && (
          <p className="shrink-0 font-codec text-[11px] italic text-text/45">{plan.pricingNote}</p>
        )}
      </div>
    </div>
  );
}
