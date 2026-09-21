import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import Breadcrumbs from "../seo/Breadcrumbs";

export function MarketingHero({
  eyebrow,
  h1,
  lead,
  crumb,
}: {
  eyebrow: string;
  h1: string;
  lead: string;
  crumb: { label: string; href: string };
}) {
  return (
    <header className="m-hero-compact">
      <div className="container-max">
        <Breadcrumbs items={[{ label: crumb.label, href: crumb.href }, { label: h1 }]} />
        <p className="m-kicker">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-poppins text-4xl font-semibold tracking-tight text-text md:text-5xl">
          {h1}
        </h1>
        <p className="mt-6 max-w-3xl font-codec text-lg leading-relaxed text-text/70">{lead}</p>
      </div>
    </header>
  );
}

export function MarketingSection({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="m-section border-t border-text/5 pt-12 md:pt-16">
      <div className="container-max max-w-3xl">
        <p className="m-kicker">{kicker}</p>
        <h2 className="mt-3 font-poppins text-2xl font-semibold tracking-tight text-text md:text-3xl">
          {title}
        </h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

export function MarketingBody({ text }: { text: string }) {
  return <p className="font-codec text-base leading-relaxed text-text/70">{text}</p>;
}

export function MarketingList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 font-codec text-base leading-relaxed text-text/70">
          <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function WorkflowSteps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="mt-6 space-y-6 border-l border-primary/20 pl-8">
      {steps.map((s, i) => (
        <li key={s.title} className="relative">
          <span
            aria-hidden
            className="absolute -left-[2.35rem] flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-poppins text-sm font-semibold text-primary"
          >
            {i + 1}
          </span>
          <h3 className="font-poppins text-lg font-semibold text-text">{s.title}</h3>
          <p className="mt-1.5 font-codec text-[15px] leading-relaxed text-text/70">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function ProductSurface({
  label,
  title,
  body,
  points,
}: {
  label: string;
  title: string;
  body: string;
  points: string[];
}) {
  return (
    <div className="m-preview-frame">
      <div className="flex items-center gap-2 border-b border-text/8 bg-white/90 px-4 py-2.5">
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-primary/80" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-accent-light" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-text/15" />
        <span className="ml-2 font-codec text-xs text-text/45">SoundAI · {label}</span>
      </div>
      <div className="bg-surface p-5 md:p-7">
        <h3 className="font-poppins text-xl font-semibold text-text">{title}</h3>
        <p className="mt-2 max-w-2xl font-codec text-sm leading-relaxed text-text/65">{body}</p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {points.map((p) => (
            <li
              key={p}
              className="rounded-xl border border-text/10 bg-white px-3.5 py-2.5 font-codec text-[13px] text-text/70"
            >
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function RelatedLinks({ links }: { links: { label: string; href: string; desc: string }[] }) {
  return (
    <nav aria-label="Related pages" className="mt-6 divide-y divide-text/8 border-y border-text/8">
      {links.map((l) => (
        <Link
          key={l.href}
          to={l.href}
          className="group flex items-center justify-between gap-4 py-4"
        >
          <span>
            <span className="font-poppins text-[15px] font-semibold text-text group-hover:text-primary">
              {l.label}
            </span>
            <span className="mt-0.5 block font-codec text-[13px] text-text/60">{l.desc}</span>
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-text/30 transition group-hover:translate-x-1 group-hover:text-primary" />
        </Link>
      ))}
    </nav>
  );
}

export function ComingLater({ what }: { what: string }) {
  return (
    <div className="mt-6 rounded-2xl border border-dashed border-text/15 bg-white/60 px-5 py-4">
      <p className="font-poppins text-sm font-semibold text-text">Coming later</p>
      <p className="mt-1 font-codec text-sm leading-relaxed text-text/65">{what}</p>
    </div>
  );
}

export function EmptyResourceState({ title }: { title: string }) {
  return (
    <div className="m-section pt-0">
      <div className="container-max max-w-3xl">
        <div className="rounded-2xl border border-dashed border-text/15 bg-white/60 px-6 py-12 text-center">
          <p className="font-poppins text-xl font-semibold text-text">Coming soon</p>
          <p className="mx-auto mt-3 max-w-md font-codec text-sm leading-relaxed text-text/60">
            We&rsquo;re building {title} as SoundAI grows. There is no archive here yet — and
            we&rsquo;d rather show an honest empty state than fabricated posts.
          </p>
          <Link to="/early-access" className="btn-primary mt-6">
            Join Early Access
          </Link>
        </div>
      </div>
    </div>
  );
}
