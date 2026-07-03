import { usePageMeta } from "../hooks/usePageMeta";
import { SITE_NAME, SITE_URL, workspaceAuthUrl } from "../lib/siteConfig";
import BillingCard from "../components/pricing/BillingCard";
import BillingComparisonTable from "../components/pricing/BillingComparisonTable";
import { plans } from "../data/plans";
import EarlyAccessCTA from "../components/EarlyAccessCTA";

export default function Pricing() {
  usePageMeta({
    title: "Billing — Plans, usage and pricing",
    description:
      "SoundAI billing: Free Trial, Standard, Premium Flex, and Enterprise plans. Lite and Pro are interface modes. Compare credits, exports, and features.",
    path: "/pricing",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "SoundAI Billing & Pricing",
      url: `${SITE_URL}/pricing`,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    },
  });

  const remaining = 20;
  const totalCredits = 20;
  const usedCredits = totalCredits - remaining;
  const pct = totalCredits > 0 ? (usedCredits / totalCredits) * 100 : 0;

  return (
    <article>
      <header className="m-hero-compact">
        <div className="container-max">
          <p className="m-kicker">Billing</p>
          <h1 className="mt-4 font-poppins text-4xl font-semibold tracking-tight text-text md:text-5xl">Billing</h1>
          <p className="mt-4 font-codec text-lg text-text/70">Plan, usage and invoices</p>
          <p className="mt-2 max-w-2xl font-codec text-sm text-text/55">
            Lite and Pro are interface modes unlocked by plan — not separate products. Premium Flex unlocks the full Pro interface.
          </p>
        </div>
      </header>

      <section className="m-section pt-0">
        <div className="container-max pb-10">
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-card border border-text/10 bg-white p-5 shadow-flat-sm">
              <div className="app-section-title mb-2">Current plan</div>
              <div className="font-poppins text-xl font-semibold text-text">Standard</div>
              <p className="app-meta mt-1">Renews on May 14</p>
              <a href={workspaceAuthUrl("sign-in")} className="app-btn-ghost mt-4 inline-flex h-9 w-full items-center justify-center">
                Manage plan
              </a>
            </div>
            <div className="rounded-card border border-text/10 bg-white p-5 shadow-flat-sm md:col-span-2">
              <div className="app-section-title mb-2">Credits this month</div>
              <div className="flex items-baseline gap-2">
                <span className="font-poppins text-3xl font-semibold text-text">{remaining}</span>
                <span className="font-codec text-sm text-text/60">/ {totalCredits} generations</span>
              </div>
              <div className="mt-4 h-2 w-full rounded-full bg-surface-muted">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${pct}%` }} />
              </div>
              <p className="app-meta mt-2">Resets on May 14. Upgrade for more headroom.</p>
            </div>
          </div>

          <h2 className="app-section-title mb-4">Plans</h2>
          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((p) => (
              <BillingCard key={p.id} plan={p} current={p.id === "trial"} />
            ))}
          </div>

          <h2 className="app-section-title mb-4 mt-10">Compare plans</h2>
          <BillingComparisonTable />
        </div>
      </section>

      <EarlyAccessCTA
        title="Ready to subscribe?"
        subtitle="Join Early Access for priority onboarding, or sign in to the workspace to manage billing when accounts go live."
      />
    </article>
  );
}
