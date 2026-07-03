import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { resourcesNav, solutionsNav, useCasesNav } from "../data/navigation";
import { workspaceAuthUrl } from "../lib/siteConfig";

type OpenMenu = "solutions" | "use-cases" | "resources" | null;

const megaMenus = [
  { id: "solutions" as const, ...solutionsNav, eyebrow: "Target users", blurb: "Professional workflows by role and studio type." },
  { id: "use-cases" as const, ...useCasesNav, eyebrow: "Capabilities", blurb: "What SoundAI generates and orchestrates in production." },
  { id: "resources" as const, ...resourcesNav, eyebrow: "Learn", blurb: "Updates, guides, and community programs." },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <header ref={navRef} className="fixed inset-x-0 top-0 z-50 border-b border-text/5 bg-surface/80 backdrop-blur-xl">
      <div className="container-max flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2" aria-label="SoundAI home">
          <img src="/logo SoundAI v1.5 (1).svg" alt="SoundAI" className="h-7 w-auto soundai-logo-mark" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {megaMenus.map((menu) => (
            <div key={menu.id} className="relative">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-lg px-3 py-2 font-poppins text-sm font-medium text-text/80 transition hover:bg-white/60 hover:text-text"
                aria-expanded={openMenu === menu.id}
                onClick={() => setOpenMenu(openMenu === menu.id ? null : menu.id)}
              >
                {menu.label}
                <ChevronDown className={`h-4 w-4 transition ${openMenu === menu.id ? "rotate-180" : ""}`} />
              </button>

              {openMenu === menu.id && (
                <div className="absolute left-0 top-full z-50 mt-2 w-[min(92vw,720px)] rounded-2xl border border-text/8 bg-white/95 p-6 shadow-flat backdrop-blur-xl">
                  <p className="text-xs font-poppins font-medium uppercase tracking-wider text-primary">{menu.eyebrow}</p>
                  <p className="mt-1 font-codec text-sm text-text/60">{menu.blurb}</p>
                  <ul className="mt-4 grid gap-1 sm:grid-cols-2">
                    {menu.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          to={item.href}
                          className="block rounded-xl px-3 py-2.5 transition hover:bg-surface"
                          onClick={() => setOpenMenu(null)}
                        >
                          <span className="font-poppins text-sm font-medium text-text">{item.label}</span>
                          {"description" in item && item.description && (
                            <span className="mt-0.5 block font-codec text-xs text-text/55">{item.description}</span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 font-poppins text-sm font-medium transition hover:bg-white/60 ${
                isActive ? "text-primary" : "text-text/80 hover:text-text"
              }`
            }
          >
            Pricing
          </NavLink>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={workspaceAuthUrl("sign-in")}
            className="rounded-lg px-3 py-2 font-poppins text-sm font-medium text-text/80 transition hover:bg-white/60 hover:text-text"
          >
            Sign In
          </a>
          <Link to="/early-access" className="btn-primary !px-4 !py-2 !text-sm">
            Early Access
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-text/5 bg-surface/95 px-4 py-4 lg:hidden">
          {megaMenus.map((menu) => (
            <div key={menu.id} className="mb-4">
              <p className="mb-2 font-poppins text-xs font-semibold uppercase tracking-wider text-text/45">{menu.label}</p>
              <ul className="space-y-1">
                {menu.items.slice(0, 6).map((item) => (
                  <li key={item.href}>
                    <Link to={item.href} className="block py-1.5 font-codec text-sm text-text/75" onClick={() => setMobileOpen(false)}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex flex-col gap-2 border-t border-text/5 pt-4">
            <Link to="/pricing" className="font-poppins text-sm font-medium" onClick={() => setMobileOpen(false)}>
              Pricing
            </Link>
            <a href={workspaceAuthUrl("sign-in")} className="font-poppins text-sm font-medium">
              Sign In
            </a>
            <Link to="/early-access" className="btn-primary text-center" onClick={() => setMobileOpen(false)}>
              Early Access
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
