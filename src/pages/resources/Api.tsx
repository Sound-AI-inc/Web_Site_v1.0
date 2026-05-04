import { Link } from "react-router-dom";
import SectionHeading from "../../components/SectionHeading";
import { ArrowRight, Shield, Zap, Cloud, Globe } from "lucide-react";

const endpoints = [
  {
    method: "POST",
    path: "/v1/generate",
    desc: "Generate audio, MIDI, presets, and project data from a text prompt.",
  },
  {
    method: "GET",
    path: "/v1/assets/{id}",
    desc: "Retrieve a generated asset by ID with download URLs.",
  },
  {
    method: "POST",
    path: "/v1/generate/batch",
    desc: "Generate multiple assets from an array of prompts.",
  },
  {
    method: "GET",
    path: "/v1/assets/{id}/status",
    desc: "Check generation status and progress for async requests.",
  },
  {
    method: "POST",
    path: "/v1/webhooks",
    desc: "Register webhook endpoints for generation event notifications.",
  },
  {
    method: "GET",
    path: "/v1/usage",
    desc: "Retrieve API usage statistics and remaining quota.",
  },
];

const responseExample = `{
  "id": "gen_8x7k2m9p",
  "status": "completed",
  "prompt": "Dark ambient pad, 120 BPM, A minor",
  "assets": {
    "audio": {
      "url": "https://cdn.soundai.studio/gen_8x7k2m9p.wav",
      "format": "wav",
      "duration": 8.0,
      "sample_rate": 48000
    },
    "midi": {
      "url": "https://cdn.soundai.studio/gen_8x7k2m9p.mid",
      "format": "midi",
      "tracks": 1
    },
    "preset": {
      "url": "https://cdn.soundai.studio/gen_8x7k2m9p.fxp",
      "format": "fxp",
      "plugin": "SoundAI Synth"
    },
    "project_data": {
      "bpm": 120,
      "key": "Am",
      "scale": "natural_minor",
      "genre": "ambient",
      "tags": ["dark", "pad", "analog", "atmospheric"]
    }
  },
  "created_at": "2026-03-15T10:30:00Z"
}`;

export default function Api() {
  return (
    <>
      <section className="section-padding waveform-bg relative overflow-hidden">
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent-cyan/10 blur-3xl" />
        <div className="container-max relative z-10">
          <div className="max-w-3xl">
            <span className="mb-6 inline-block rounded-full border border-accent-cyan/20 bg-accent-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-cyan">
              API Reference
            </span>
            <h1 className="mb-6 font-poppins text-4xl font-extrabold leading-tight md:text-5xl">
              SoundAI <span className="gradient-text">API</span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-gray-500 dark:text-light-bg/60">
              REST and GraphQL endpoints for AI audio generation with secure authentication,
              JSON responses, and cloud-hosted asset delivery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/docs" className="btn-primary text-sm">
                Get API Key <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/docs" className="btn-secondary text-sm">
                View Full Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { icon: Zap, label: "REST + GraphQL", desc: "Flexible query methods" },
              { icon: Shield, label: "Secure Auth", desc: "API key + OAuth2" },
              { icon: Cloud, label: "Cloud Delivery", desc: "CDN-hosted assets" },
              { icon: Globe, label: "Global Edge", desc: "Low-latency access" },
            ].map((item) => (
              <div key={item.label} className="card py-6 text-center">
                <item.icon className="mx-auto mb-3 h-7 w-7 text-accent-cyan" />
                <p className="font-poppins text-sm font-semibold">{item.label}</p>
                <p className="mt-1 text-xs text-gray-400 dark:text-light-bg/40">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding waveform-bg">
        <div className="container-max">
          <SectionHeading
            badge="Endpoints"
            title="Core API Endpoints"
            subtitle="Key endpoints for generating, retrieving, and managing audio assets."
          />
          <div className="mx-auto max-w-4xl space-y-3">
            {endpoints.map((endpoint) => (
              <div key={endpoint.path} className="card flex flex-col gap-3 sm:flex-row sm:items-center">
                <span
                  className={`inline-block rounded px-2.5 py-1 text-xs font-bold ${
                    endpoint.method === "POST"
                      ? "bg-accent-pink/10 text-accent-pink"
                      : "bg-accent-cyan/10 text-accent-cyan"
                  }`}
                >
                  {endpoint.method}
                </span>
                <code className="flex-1 font-mono text-sm text-gray-600 dark:text-light-bg/70">{endpoint.path}</code>
                <p className="text-xs text-gray-400 dark:text-light-bg/40 sm:max-w-xs sm:text-right">{endpoint.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <SectionHeading badge="Response" title="Example Response" subtitle="JSON response from the /v1/generate endpoint." />
          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 dark:border-white/5 dark:bg-dark-bg/60">
              <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-3 dark:border-white/5">
                <div className="h-3 w-3 rounded-full bg-accent-pink/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
                <div className="h-3 w-3 rounded-full bg-green-400/60" />
                <span className="ml-3 font-mono text-xs text-gray-300 dark:text-light-bg/30">200 OK - application/json</span>
              </div>
              <pre className="overflow-x-auto p-6 text-sm leading-relaxed">
                <code className="font-mono text-gray-600 dark:text-light-bg/70">{responseExample}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
