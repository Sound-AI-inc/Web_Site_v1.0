import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";

interface MenuLink {
  label: string;
  description: string;
  to: string;
}

interface MenuSection {
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  children: MenuLink[];
}

const navItems: MenuSection[] = [
  {
    label: "Company",
    eyebrow: "Company",
    title: "Meet the team building AI-native music creation",
    description: "Follow the roadmap, understand the product vision, and see how SoundAI is evolving.",
    children: [
      { label: "About", description: "What SoundAI is building and why.", to: "/about" },
      { label: "Team", description: "The engineers, operators, and creators behind the product.", to: "/team" },
      { label: "Roadmap", description: "What is shipping next across product and platform.", to: "/roadmap" },
      { label: "Careers", description: "Open roles and how we work.", to: "/careers" },
    ],
  },
  {
    label: "Products",
    eyebrow: "Product tracks",
    title: "Choose the workflow that matches your role",
    description: "SoundAI supports creators, developers, investors, and partners with dedicated product surfaces.",
    children: [
      { label: "For Users", description: "Generate audio assets and move from idea to material faster.", to: "/products/users" },
      { label: "For Developers", description: "Embed audio generation into apps and services.", to: "/products/developers" },
      { label: "For Investors", description: "Review traction, product direction, and strategy.", to: "/products/investors" },
      { label: "For Partnerships", description: "Explore integrations and commercial collaboration.", to: "/products/partnerships" },
    ],
  },
  {
    label: "Resources",
    eyebrow: "Documentation and learning",
    title: "Everything needed to evaluate the platform",
    description: "Browse docs, API references, support content, and product updates in one place.",
    children: [
      { label: "Blog", description: "Product notes, launches, and company updates.", to: "/blog" },
      { label: "Documentation", description: "Platform guides and implementation walkthroughs.", to: "/docs" },
      { label: "API", description: "Reference surface for developers and partners.", to: "/api" },
      { label: "Support", description: "Support channels, help flows, and guidance.", to: "/support" },
      { label: "FAQ", description: "Answers to common product and access questions.", to: "/faq" },
    ],
  },
  {
    label: "Legal",
    eyebrow: "Policies",
    title: "Review platform policies and legal information",
    description: "Access the operating policies, legal center, and product usage documentation.",
    children: [
      { label: "Terms of Use", description: "Platform terms and user responsibilities.", to: "/legal/terms" },
      { label: "Privacy Policy", description: "How data is handled across product surfaces.", to: "/legal/privacy" },
      { label: "Legal Center", description: "Central legal and policy hub.", to: "/legal/center" },
      { label: "Licenses", description: "Third-party and software license details.", to: "/legal/licenses" },
      { label: "Legal Information", description: "Additional company legal disclosures.", to: "/legal/info" },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const activeSection = useMemo(
    () => navItems.find((item) => item.label === activeMenu) ?? null,
    [activeMenu],
  );

  const cancelClose = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = window.setTimeout(() => {
      setActiveMenu(null);
      closeTimerRef.current = null;
    }, 260);
  };

  useEffect(() => () => cancelClose(), []);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/40 bg-white/80 backdrop-blur-2xl transition-colors dark:border-white/8 dark:bg-dark-deeper/72">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-6">
            <Link to="/" className="group flex shrink-0 items-center gap-3">
              <img
                src="/logo SoundAI v1.5 (1).svg"
                alt="SoundAI"
                className="soundai-logo-mark h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-[1.04] sm:h-12 sm:w-12"
              />
              <div className="font-poppins text-xl font-semibold tracking-[-0.02em] text-gray-950 dark:text-white">
                SoundAI
              </div>
            </Link>

            <div
              className="relative hidden flex-1 lg:block"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              <nav className="flex items-center justify-center gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onMouseEnter={() => {
                      cancelClose();
                      setActiveMenu(item.label);
                    }}
                    onFocus={() => {
                      cancelClose();
                      setActiveMenu(item.label);
                    }}
                    className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      activeMenu === item.label
                        ? "bg-gray-100/90 text-gray-950 dark:bg-white/10 dark:text-white"
                        : "text-gray-600 hover:bg-gray-100/85 hover:text-gray-950 dark:text-light-bg/65 dark:hover:bg-white/6 dark:hover:text-white"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${activeMenu === item.label ? "rotate-180" : ""}`} />
                  </button>
                ))}
              </nav>

              {activeSection && (
                <div
                  className="absolute left-1/2 top-full z-50 mt-5 w-full max-w-5xl -translate-x-1/2"
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <div className="overflow-hidden rounded-[34px] border border-white/60 bg-[rgba(255,255,255,0.9)] shadow-[0_30px_120px_rgba(15,23,42,0.16)] backdrop-blur-2xl dark:border-white/10 dark:bg-[rgba(10,14,20,0.88)]">
                    <div className="grid gap-0 lg:grid-cols-[1.08fr_1.92fr]">
                      <div className="border-b border-gray-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,247,252,0.94))] p-8 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(20,25,34,0.78),rgba(10,14,20,0.9))] lg:border-b-0 lg:border-r">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-pink">
                          {activeSection.eyebrow}
                        </div>
                        <h2 className="mt-3 max-w-sm font-poppins text-[30px] font-semibold leading-tight text-gray-950 dark:text-white">
                          {activeSection.title}
                        </h2>
                        <p className="mt-4 max-w-md text-sm leading-6 text-gray-500 dark:text-light-bg/55">
                          {activeSection.description}
                        </p>
                        <Link
                          to="/coming-soon"
                          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent-pink transition-colors hover:text-accent-cyan"
                        >
                          Join beta
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>

                      <div className="grid gap-2 p-5 sm:grid-cols-2">
                        {activeSection.children.map((link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            className="rounded-[22px] border border-transparent px-5 py-4 transition-colors hover:border-gray-200/80 hover:bg-gray-50/75 dark:hover:border-white/10 dark:hover:bg-white/5"
                          >
                            <div className="font-poppins text-sm font-semibold text-gray-950 dark:text-white">
                              {link.label}
                            </div>
                            <div className="mt-1 text-sm leading-6 text-gray-500 dark:text-light-bg/55">
                              {link.description}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Link to="/sign-in" className="btn-secondary hidden px-4 py-3 text-xs sm:inline-flex">
                Sign in
              </Link>
              <Link to="/sign-up" className="btn-primary px-5 py-3 text-xs">
                Sign up
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200/80 bg-white/82 text-gray-600 lg:hidden dark:border-white/10 dark:bg-white/5 dark:text-light-bg/65"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
          <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto border-l border-white/60 bg-[rgba(255,255,255,0.94)] p-6 backdrop-blur-2xl dark:border-white/10 dark:bg-dark-deeper lg:hidden">
            <div className="mb-8 flex items-center justify-between">
              <div className="font-poppins text-lg font-semibold text-gray-950 dark:text-white">Menu</div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 dark:border-white/10 dark:text-light-bg/65"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {navItems.map((section) => (
                <div key={section.label}>
                  <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-pink">
                    {section.label}
                  </div>
                  <div className="space-y-1">
                    {section.children.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-2xl px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
                      >
                        <div className="font-poppins text-sm font-semibold text-gray-950 dark:text-white">
                          {link.label}
                        </div>
                        <div className="mt-1 text-sm leading-6 text-gray-500 dark:text-light-bg/55">
                          {link.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6 dark:border-white/10">
              <Link to="/sign-up" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center">
                Sign up
              </Link>
              <Link to="/sign-in" onClick={() => setMobileOpen(false)} className="btn-secondary mt-3 w-full justify-center">
                Sign in
              </Link>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
