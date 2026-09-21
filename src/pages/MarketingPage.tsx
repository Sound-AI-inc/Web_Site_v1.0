import { useLocation } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { getMarketingPage } from "../data/marketingPages";
import { SITE_NAME, SITE_URL } from "../lib/siteConfig";
import EarlyAccessCTA from "../components/EarlyAccessCTA";
import {
  ComingLater,
  EmptyResourceState,
  MarketingBody,
  MarketingHero,
  MarketingList,
  MarketingSection,
  ProductSurface,
  RelatedLinks,
  WorkflowSteps,
} from "../components/marketing/MarketingBlocks";

const categoryLabels: Record<string, string> = {
  solutions: "Solutions",
  "use-cases": "Use Cases",
  resources: "Resources",
  features: "Features",
};

const categoryHrefs: Record<string, string> = {
  solutions: "/solutions/music-producers",
  "use-cases": "/use-cases",
  resources: "/resources/blog",
  features: "/features/ai-generation",
};

export default function MarketingPage() {
  const { pathname } = useLocation();
  const page = getMarketingPage(pathname);

  usePageMeta({
    title: page?.title ?? "SoundAI",
    description: page?.description ?? "SoundAI — modular AI music production assets.",
    path: page?.path ?? pathname,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page?.title ?? "SoundAI",
      description: page?.description ?? "SoundAI — modular AI music production assets.",
      url: `${SITE_URL}${page?.path ?? pathname}`,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    },
  });

  if (!page) {
    return (
      <div className="section-padding container-max">
        <h1 className="font-poppins text-3xl font-semibold">Page not found</h1>
        <p className="mt-4 font-codec text-text/70">This page is being prepared.</p>
      </div>
    );
  }

  const catLabel = categoryLabels[page.category] ?? page.category;

  return (
    <article>
      <MarketingHero
        eyebrow={`${catLabel} · SoundAI`}
        h1={page.h1}
        lead={page.statement ? `${page.statement} ${page.lead}` : page.lead}
        crumb={{ label: catLabel, href: categoryHrefs[page.category] ?? "/" }}
      />

      {page.emptyState ? (
        <EmptyResourceState title={page.h1} />
      ) : (
        <>
          {page.visual && (
            <div className="m-section pt-0">
              <div className="container-max max-w-3xl">
                <ProductSurface
                  label={page.visual.label}
                  title={page.visual.title}
                  body={page.visual.body}
                  points={page.visual.points}
                />
              </div>
            </div>
          )}

          {page.sections.map((section) => (
            <MarketingSection key={section.heading} kicker={catLabel} title={section.heading}>
              <MarketingBody text={section.body} />
              {section.list && <MarketingList items={section.list} />}
            </MarketingSection>
          ))}

          {page.workflow && page.workflow.length > 0 && (
            <MarketingSection kicker="Workflow" title="How it works">
              <WorkflowSteps steps={page.workflow} />
            </MarketingSection>
          )}

          {page.comingLater && (
            <div className="m-section border-t border-text/5 pt-12 md:pt-16">
              <div className="container-max max-w-3xl">
                <ComingLater what={page.comingLater} />
              </div>
            </div>
          )}

          {page.related && page.related.length > 0 && (
            <div className="m-section border-t border-text/5 pt-12 md:pt-16">
              <div className="container-max max-w-3xl">
                <p className="m-kicker">Keep exploring</p>
                <RelatedLinks links={page.related} />
              </div>
            </div>
          )}
        </>
      )}

      <EarlyAccessCTA title={`Get Early Access for ${page.h1.split(" for ")[0]}`} />
    </article>
  );
}
