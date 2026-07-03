declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    clarity?: (...args: unknown[]) => void;
    posthog?: { capture: (event: string, props?: Record<string, unknown>) => void };
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const CLARITY_ID = import.meta.env.VITE_CLARITY_PROJECT_ID as string | undefined;
const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;

export function initAnalytics() {
  if (typeof window === "undefined") return;

  if (GA_ID) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { anonymize_ip: true });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  }

  if (CLARITY_ID) {
    const script = document.createElement("script");
    script.innerHTML = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${CLARITY_ID}");`;
    document.head.appendChild(script);
  }

  if (POSTHOG_KEY) {
    console.info("[analytics] PostHog key configured — wire posthog-js when ready.");
  }
}

export function trackEvent(name: string, properties?: Record<string, unknown>) {
  window.gtag?.("event", name, properties);
  window.posthog?.capture(name, properties);
}

export function trackPageView(path: string) {
  window.gtag?.("event", "page_view", { page_path: path });
  trackEvent("page_view", { path });
}
