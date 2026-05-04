import { Link } from "react-router-dom";
import SectionHeading from "../../components/SectionHeading";
import {
  BookOpen,
  Key,
  Terminal,
  Layers,
  Webhook,
  Code2,
  FileAudio,
  Gauge,
  ArrowRight,
  Search,
} from "lucide-react";

const sections = [
  { icon: BookOpen, title: "Getting Started", desc: "Quick start guide, installation, and first generation.", tag: "Beginner" },
  { icon: Key, title: "Authentication", desc: "API key management, OAuth2, and secure token handling.", tag: "Setup" },
  { icon: Terminal, title: "API Reference", desc: "Complete endpoint documentation with request and response examples.", tag: "Reference" },
  { icon: Layers, title: "Generation Endpoints", desc: "Text-to-audio, MIDI, preset, and multi-format generation.", tag: "Core" },
  { icon: Webhook, title: "Webhooks", desc: "Real-time event notifications and callback configuration.", tag: "Advanced" },
  { icon: Code2, title: "SDKs", desc: "Official SDKs for Python, JavaScript, and C++ integration.", tag: "Libraries" },
  { icon: FileAudio, title: "Export Formats", desc: "Supported audio, MIDI, preset, and project data formats.", tag: "Reference" },
  { icon: Gauge, title: "Rate Limits", desc: "API rate limits, quotas, and best practices for optimization.", tag: "Operations" },
];

export default function Documentation() {
  return (
    <section className="section-padding waveform-bg relative overflow-hidden">
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-accent-cyan/10 blur-3xl" />
      <div className="container-max relative z-10">
        <SectionHeading
          badge="Documentation"
          title="Developer Documentation"
          subtitle="Everything you need to integrate SoundAI into your applications and workflows."
        />

        <div className="mx-auto mb-12 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300 dark:text-light-bg/30" />
            <input type="text" placeholder="Search documentation..." className="soft-input pl-12" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => (
            <Link key={section.title} to="/api" className="card group hover:border-accent-cyan/20">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-cyan/10 transition-colors group-hover:bg-accent-cyan/20">
                  <section.icon className="h-4.5 w-4.5 text-accent-cyan" />
                </div>
                <span className="soft-badge">{section.tag}</span>
              </div>
              <h3 className="mb-1 font-poppins text-sm font-semibold transition-colors group-hover:text-accent-cyan">
                {section.title}
              </h3>
              <p className="text-xs leading-relaxed text-gray-500 dark:text-light-bg/50">{section.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-sm text-gray-500 dark:text-light-bg/45">Need help getting started?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/api" className="btn-primary text-xs">
              API Reference <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
            <Link to="/support" className="btn-secondary text-xs">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
