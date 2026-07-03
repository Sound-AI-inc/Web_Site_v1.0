import { useEffect } from "react";
import { SITE_NAME, SITE_URL } from "../lib/siteConfig";

export interface PageMetaInput {
  title: string;
  description: string;
  path?: string;
  ogType?: string;
  jsonLd?: Record<string, unknown>;
}

function upsertMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function usePageMeta({ title, description, path = "", ogType = "website", jsonLd }: PageMetaInput) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} · ${SITE_NAME}`;
    const url = `${SITE_URL}${path}`;

    document.title = fullTitle;
    upsertMeta("description", description);
    upsertMeta("og:title", fullTitle, "property");
    upsertMeta("og:description", description, "property");
    upsertMeta("og:type", ogType, "property");
    upsertMeta("og:url", url, "property");
    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", fullTitle);
    upsertMeta("twitter:description", description);
    upsertLink("canonical", url);

    const existing = document.getElementById("soundai-jsonld");
    existing?.remove();

    if (jsonLd) {
      const script = document.createElement("script");
      script.id = "soundai-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById("soundai-jsonld")?.remove();
    };
  }, [title, description, path, ogType, jsonLd]);
}
