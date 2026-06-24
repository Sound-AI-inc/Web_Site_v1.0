import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  Moon,
  Sun,
  X,
  ArrowUpRight,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

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
    label: "Product",
    eyebrow: "Product",
    title: "Modular AI music infrastructure",
    description: "How SoundAI composes assets: audio, MIDI, and presets as first-class outputs.",
    children: [
      { label: "Philosophy", description: "Modular generation philosophy and DAW-native thinking.", to: "/product/philosophy" },
      { label: "Technology", description: "Multi-model orchestration and inference architecture.", to: "/technology" },
      { label: "Comparison", description: "How SoundAI differs from monolithic music generators.", to: "/comparison" },
      { label: "Pricing & Access", description: "Access tiers, credits, and workflow limits.", to: "/pricing" },
    ],
  },
  {
    label: "Use Cases",
    eyebrow: "Workflows",
    title: "Role-driven workflows for creators and teams",
    description: "Practical workflows for producers, sound designers, game audio, and creators.",
    children: [
      { label: "Producers", description: "DAW-native asset generation for producers.", to: "/use-cases/producers" },
      { label: "Sound Design", description: "Preset and sample workflows for sound designers.", to: "/use-cases/sound-design" },
      { label: "Game Audio", description: "Adaptive, runtime-friendly asset pipelines.", to: "/use-cases/game-audio" },
      { label: "Creators & Composers", description: "Lightweight composition and iteration workflows.", to: "/use-cases/creators" },
    ],
  },
  {
    label: "Company",
    eyebrow: "Company",
    title: "Founders and vision",
    description: "Why SoundAI exists and our long-term product vision.",
    children: [
      { label: "About", description: "Founder-level narrative and vision.", to: "/about" },
      { label: "Team", description: "The engineers and creators behind SoundAI.", to: "/team" },
      { label: "Roadmap", description: "High-level roadmap and product direction.", to: "/roadmap" },
    ],
  },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const activeSection = useMemo(
    () => navItems.find((item) => item.label === activeMenu) ?? null,
    [activeMenu],
  );

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-gray-200/70 bg-white/88 backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-dark-deeper/80">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-6">
            <Link to="/" className="group flex shrink-0 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-200/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(241,245,249,0.92))] p-1.5 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-transform duration-300 group-hover:scale-[1.03] dark:border-white/10 dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(255,255,255,0.06))]">
                <img
                  src="/logo SoundAI v1.5 (1).svg"
                  alt="SoundAI"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="translate-y-[1px] leading-tight">
                <div className="font-poppins text-base font-semibold text-gray-900 dark:text-light-bg">
                  SoundAI
                </div>


            <div
              className="relative hidden flex-1 lg:block"
              onMouseLeave={() => setActiveMenu(null)}
            >
              <nav className="flex items-center justify-center gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onMouseEnter={() => setActiveMenu(item.label)}
                    onFocus={() => setActiveMenu(item.label)}
                    className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      activeMenu === item.label
                        ? "bg-gray-100 text-gray-900 dark:bg-white/10 dark:text-light-bg"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-light-bg/65 dark:hover:bg-white/5 dark:hover:text-light-bg"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        activeMenu === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ))}
              </nav>

              {activeSection && (
                <div className="absolute left-1/2 top-full z-50 mt-4 w-full max-w-5xl -translate-x-1/2">
                  <div className="overflow-hidden rounded-[28px] border border-gray-200/70 bg-white shadow-[0_22px_80px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-dark-deeper">
                    <div className="grid gap-0 lg:grid-cols-[1.15fr_1.85fr]">
                      <div className="border-b border-gray-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(246,248,252,0.96))] p-8 dark:border-white/10 dark:bg-dark-bg/70 lg:border-b-0 lg:border-r">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-pink">
                          {activeSection.eyebrow}
                        </div>
                        <h2 className="mt-3 max-w-sm font-poppins text-[28px] font-semibold leading-tight text-gray-900 dark:text-light-bg">
                          {activeSection.title}
                        </h2>
                        <p className="mt-4 max-w-md text-sm leading-6 text-gray-500 dark:text-light-bg/55">
                          {activeSection.description}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-2">
                          <span className="rounded-full border border-accent-pink/15 bg-accent-pink/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-pink">
                            Prompt to asset
                          </span>
                          <span className="rounded-full border border-accent-cyan/20 bg-accent-cyan/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-cyan">
                            Production ready
                          </span>
                        </div>
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
                            className="rounded-2xl border border-transparent px-5 py-4 transition-colors hover:border-gray-200 hover:bg-gray-50 dark:hover:border-white/10 dark:hover:bg-white/5"
                          >
                            <div className="font-poppins text-sm font-semibold text-gray-900 dark:text-light-bg">
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
              <button
                type="button"
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:border-accent-pink/30 hover:text-accent-pink dark:border-white/10 dark:bg-white/5 dark:text-light-bg/55"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              <Link to="/waitlist" className="btn-secondary hidden px-4 py-2.5 text-xs sm:inline-flex">
                Join Waitlist
              </Link>
              <Link to="/auth" className="btn-primary px-4 py-2.5 text-xs">
                Sign in
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 lg:hidden dark:border-white/10 dark:bg-white/5 dark:text-light-bg/65"
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
          <div
            className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto border-l border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-dark-deeper lg:hidden">
            <div className="mb-8 flex items-center justify-between">
              <div className="font-poppins text-lg font-semibold text-gray-900 dark:text-light-bg">
                Menu
              </div>
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
                        <div className="font-poppins text-sm font-semibold text-gray-900 dark:text-light-bg">
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
              <Link
                to="/auth"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full justify-center"
              >
                Sign in
              </Link>
              <Link
                to="/waitlist"
                onClick={() => setMobileOpen(false)}
                className="btn-secondary mt-3 w-full justify-center"
              >
                Join Waitlist
              </Link>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
