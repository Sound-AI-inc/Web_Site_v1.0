import { useLocation } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { getMarketingPage } from "../data/marketingPages";
import { SITE_NAME, SITE_URL } from "../lib/siteConfig";
import Breadcrumbs from "../components/seo/Breadcrumbs";
import EarlyAccessCTA from "../components/EarlyAccessCTA";

const categoryLabels: Record<string, string> = {
  solutions: "Solutions",
  "use-cases": "Use Cases",
  resources: "Resources",
  features: "Features",
};

export default function MarketingPage() {
  const { pathname } = useLocation();
  const page = getMarketingPage(pathname);

  if (!page) {
    return (
      <div className="section-padding container-max">
        <h1 className="font-poppins text-3xl font-semibold">Page not found</h1>
        <p className="mt-4 font-codec text-text/70">This page is being prepared.</p>
      </div>
    );
  }

  usePageMeta({
    title: page.title,
    description: page.description,
    path: page.path,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      description: page.description,
      url: `${SITE_URL}${page.path}`,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    },
  });

  const catLabel = categoryLabels[page.category] ?? page.category;

  return (
    <article>
      <header className="m-hero-compact">
        <div className="container-max">
          <Breadcrumbs
            items={[
              { label: catLabel, href: `/${page.category}` },
              { label: page.h1 },
            ]}
          />
          <p className="m-kicker">{catLabel}</p>
          <h1 className="mt-4 max-w-4xl font-poppins text-4xl font-semibold tracking-tight text-text md:text-5xl">{page.h1}</h1>
          <p className="mt-6 max-w-3xl font-codec text-lg leading-relaxed text-text/70">{page.lead}</p>
        </div>
      </header>

      <div className="m-section">
        <div className="container-max max-w-3xl space-y-12">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-poppins text-2xl font-semibold tracking-tight text-text">{section.heading}</h2>
              <p className="mt-4 font-codec text-base leading-relaxed text-text/70">{section.body}</p>
            </section>
          ))}
        </div>
      </div>

      <EarlyAccessCTA title={`Get Early Access for ${page.h1.split(" for ")[0]}`} />
    </article>
  );
}
