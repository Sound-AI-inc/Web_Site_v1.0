import { usePageMeta } from "../hooks/usePageMeta";
import { SITE_NAME, SITE_URL } from "../lib/siteConfig";
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

  return (
    <article>
      <header className="m-hero-compact">
        <div className="container-max">
          <p className="m-kicker">Billing</p>
          <h1 className="mt-4 font-poppins text-4xl font-semibold tracking-tight text-text md:text-5xl">Plans and usage</h1>
          <p className="mt-4 max-w-2xl font-codec text-lg leading-relaxed text-text/70">
            Plans grant workspace access and generation capacity; credits meter actual
            generation. Lite and Pro are interface modes unlocked by plan — not separate products.
          </p>
          <p className="mt-3 max-w-2xl font-codec text-sm leading-relaxed text-text/55">
            Billing activates at production launch. Join Early Access for onboarding priority —
            nothing is charged here today.
          </p>
        </div>
      </header>

      <section className="m-section pt-0">
        <div className="container-max pb-10">
          <h2 className="app-section-title mb-4">Plans</h2>
          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((p) => (
              <BillingCard key={p.id} plan={p} />
            ))}
          </div>

          <h2 className="app-section-title mb-4 mt-10">Compare plans</h2>
          <BillingComparisonTable />
        </div>
      </section>

      <EarlyAccessCTA
        title="Get notified at launch"
        subtitle="Join Early Access for priority onboarding when plans and billing go live. One identity across marketing, billing, and workspace."
      />
    </article>
  );
}
