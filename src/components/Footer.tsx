import { Link } from "react-router-dom";
import { Mail, Twitter, Github, Linkedin, Youtube } from "lucide-react";

const footerNav = [
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Team", to: "/team" },
      { label: "Roadmap", to: "/roadmap" },
      { label: "Careers", to: "/careers" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "For Users", to: "/products/users" },
      { label: "For Developers", to: "/products/developers" },
      { label: "For Investors", to: "/products/investors" },
      { label: "Partnerships", to: "/products/partnerships" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", to: "/blog" },
      { label: "Documentation", to: "/docs" },
      { label: "API", to: "/api" },
      { label: "Support", to: "/support" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Use", to: "/legal/terms" },
      { label: "Privacy Policy", to: "/legal/privacy" },
      { label: "Legal Center", to: "/legal/center" },
      { label: "Licenses", to: "/legal/licenses" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/50 bg-[linear-gradient(180deg,rgba(250,252,255,0.92),rgba(244,247,252,0.94))] transition-colors dark:border-white/8 dark:bg-[linear-gradient(180deg,rgba(10,14,20,0.9),rgba(7,10,14,0.98))]">
      <div className="container-max section-padding">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-gray-200/80 pb-12 dark:border-white/8 md:flex-row md:items-center">
          <div>
            <h3 className="mb-1 font-poppins text-xl font-bold text-gray-950 dark:text-white">Stay in the loop</h3>
            <p className="text-sm text-gray-500 dark:text-light-bg/50">Get updates on new features, tutorials, and product launches.</p>
          </div>
          <div className="flex w-full md:w-auto">
            <input type="email" placeholder="you@example.com" className="soft-input flex-1 rounded-l-2xl rounded-r-none md:w-72" />
            <button className="btn-primary rounded-l-none rounded-r-2xl px-6 text-xs">Subscribe</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          {footerNav.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 font-poppins text-sm font-semibold text-gray-950 dark:text-white">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-gray-500 transition-colors hover:text-accent-pink dark:text-light-bg/50">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200/80 pt-8 dark:border-white/8 md:flex-row">
          <div className="flex items-center gap-3">
            <img src="/logo SoundAI v1.5 (1).svg" alt="SoundAI" className="soundai-logo-mark h-11 w-11 object-contain" />
            <span className="font-poppins text-sm font-semibold text-gray-950 dark:text-white">SoundAI</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="mailto:hello@soundai.studio" className="text-gray-400 transition-colors hover:text-accent-cyan dark:text-light-bg/40">
              <Mail className="h-4 w-4" />
            </a>
            <a href="#" className="text-gray-400 transition-colors hover:text-accent-cyan dark:text-light-bg/40">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="text-gray-400 transition-colors hover:text-accent-cyan dark:text-light-bg/40">
              <Github className="h-4 w-4" />
            </a>
            <a href="#" className="text-gray-400 transition-colors hover:text-accent-cyan dark:text-light-bg/40">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="#" className="text-gray-400 transition-colors hover:text-accent-cyan dark:text-light-bg/40">
              <Youtube className="h-4 w-4" />
            </a>
          </div>

          <p className="text-xs text-gray-400 dark:text-light-bg/30">&copy; {new Date().getFullYear()} SoundAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
