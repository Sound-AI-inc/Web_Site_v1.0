import { Link } from "react-router-dom";
import SectionHeading from "../../components/SectionHeading";
import {
  Terminal,
  Cloud,
  Webhook,
  Key,
  Layers,
  Gauge,
  ArrowRight,
  Code2,
  Cpu,
  Globe,
} from "lucide-react";

const features = [
  { icon: Terminal, title: "REST & GraphQL API", desc: "Flexible endpoints for text-to-audio, MIDI, and preset generation." },
  { icon: Gauge, title: "Usage-Based Pricing", desc: "Pay only for what you generate with transparent scaling." },
  { icon: Layers, title: "Multi-Format Endpoints", desc: "Request audio, MIDI, presets, or all formats from one call." },
  { icon: Webhook, title: "Webhooks", desc: "Real-time event notifications for generation status and delivery." },
  { icon: Cloud, title: "Scalable Cloud Backend", desc: "Infrastructure designed for large generation workloads." },
  { icon: Cpu, title: "DAW & Platform Integration", desc: "SDKs for integrating into DAWs, games, apps, and web platforms." },
];

const codeExample = `const response = await fetch('https://api.soundai.studio/v1/generate', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: 'Dark ambient pad, 120 BPM, A minor',
    formats: ['wav', 'midi', 'preset', 'project_data'],
    options: {
      bpm: 120,
      key: 'Am',
      duration: 8,
      quality: 'high'
    }
  })
});

const { assets } = await response.json();
// assets.audio -> .wav download URL
// assets.midi -> .mid download URL
// assets.preset -> .fxp download URL
// assets.project_data -> { bpm, key, scale, genre, tags }`;

export default function ForDevelopers() {
  return (
    <>
      <section className="section-padding waveform-bg relative overflow-hidden">
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent-cyan/15 blur-3xl" />
        <div className="container-max relative z-10">
          <div className="max-w-3xl">
            <span className="mb-6 inline-block rounded-full border border-accent-cyan/20 bg-accent-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-cyan">
              For Developers
            </span>
            <h1 className="mb-6 font-poppins text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              AI Audio
              <br />
              <span className="gradient-text">Infrastructure</span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-gray-500 dark:text-light-bg/60 md:text-xl">
              Integrate modular AI audio generation into applications, games, and platforms with
              multi-format output and cloud-scale delivery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/api" className="btn-primary">
                Access API Documentation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/docs" className="btn-secondary">
                View SDKs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <SectionHeading
            badge="Quick Start"
            title="Generate Audio in Minutes"
            subtitle="Simple API for text-to-audio, MIDI, and preset generation."
          />
          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 dark:border-white/5 dark:bg-dark-bg/60">
              <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-3 dark:border-white/5">
                <div className="h-3 w-3 rounded-full bg-accent-pink/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
                <div className="h-3 w-3 rounded-full bg-green-400/60" />
                <span className="ml-3 font-mono text-xs text-gray-300 dark:text-light-bg/30">generate.js</span>
              </div>
              <pre className="overflow-x-auto p-6 text-sm leading-relaxed">
                <code className="font-mono text-gray-600 dark:text-light-bg/70">{codeExample}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding waveform-bg">
        <div className="container-max">
          <SectionHeading
            badge="Platform Features"
            title="Built for Scale"
            subtitle="Everything needed to integrate AI audio generation into a product."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="card group">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-cyan/10 transition-colors group-hover:bg-accent-cyan/20">
                  <feature.icon className="h-5 w-5 text-accent-cyan" />
                </div>
                <h3 className="mb-2 font-poppins font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-light-bg/50">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <SectionHeading badge="Integrations" title="Works Where You Build" />
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { icon: Code2, label: "Web Apps" },
              { icon: Cpu, label: "Game Engines" },
              { icon: Globe, label: "Platforms" },
              { icon: Key, label: "Secure Auth" },
            ].map((item) => (
              <div key={item.label} className="card py-8 text-center">
                <item.icon className="mx-auto mb-3 h-8 w-8 text-accent-pink" />
                <p className="font-poppins text-sm font-semibold">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
