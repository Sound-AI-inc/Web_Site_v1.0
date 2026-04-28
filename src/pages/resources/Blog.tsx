import { Link } from "react-router-dom";
import SectionHeading from "../../components/SectionHeading";
import { Clock, ArrowRight, Tag } from "lucide-react";

const categories = [
  "All",
  "AI & Music Production",
  "Workflow Tutorials",
  "Creator Economy",
  "Product Updates",
  "Research",
];

const posts = [
  {
    title: "Why Modular AI Beats Full-Track Generation",
    category: "AI & Music Production",
    date: "Mar 15, 2026",
    readTime: "6 min read",
    excerpt:
      "Full-track AI generation faces legal, creative, and workflow challenges. Here's why modular asset generation is the future of AI-assisted music production.",
  },
  {
    title: "Getting Started: Your First AI-Generated Sample Pack",
    category: "Workflow Tutorials",
    date: "Mar 10, 2026",
    readTime: "8 min read",
    excerpt:
      "A step-by-step guide to generating your first audio samples, MIDI patterns, and VST presets using SoundAI's natural language interface.",
  },
  {
    title: "The State of AI in the Creator Economy",
    category: "Creator Economy",
    date: "Mar 5, 2026",
    readTime: "10 min read",
    excerpt:
      "How AI tools are reshaping independent music production and what it means for creators, labels, and platforms.",
  },
  {
    title: "SoundAI Beta Launch: What's New",
    category: "Product Updates",
    date: "Feb 28, 2026",
    readTime: "4 min read",
    excerpt:
      "Introducing our public beta with text-to-audio generation, MIDI synthesis, VST preset creation, and DAW-native export.",
  },
  {
    title: "Neural Audio Synthesis: A Technical Overview",
    category: "Research",
    date: "Feb 20, 2026",
    readTime: "12 min read",
    excerpt:
      "A deep dive into the architecture behind SoundAI's multi-modal generation pipeline, from text embeddings to audio waveforms.",
  },
  {
    title: "Integrating AI Samples into Your Ableton Workflow",
    category: "Workflow Tutorials",
    date: "Feb 15, 2026",
    readTime: "7 min read",
    excerpt:
      "Practical tips for incorporating AI-generated assets into your existing Ableton Live projects without disrupting your creative flow.",
  },
];

export default function Blog() {
  return (
    <section className="relative overflow-hidden waveform-bg section-padding">
      <div className="absolute top-0 -right-32 h-96 w-96 rounded-full bg-accent-pink/10 blur-3xl" />
      <div className="container-max relative z-10">
        <SectionHeading
          badge="Blog"
          title="Insights & Updates"
          subtitle="Explore the latest in AI music production, creator workflows, and product updates."
        />

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                index === 0
                  ? "bg-accent-pink text-white"
                  : "border border-gray-200/85 bg-white/75 text-gray-500 shadow-[0_6px_20px_rgba(15,23,42,0.04)] hover:border-accent-pink/25 hover:text-gray-900 dark:border-white/10 dark:bg-white/[0.05] dark:text-light-bg/50 dark:hover:bg-white/[0.09] dark:hover:text-light-bg"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.title} className="card group flex flex-col">
              <div className="mb-3 flex items-center gap-2">
                <Tag className="h-3 w-3 text-accent-pink" />
                <span className="text-xs font-medium text-accent-pink">{post.category}</span>
              </div>
              <h3 className="mb-2 font-poppins text-lg font-semibold leading-snug transition-colors group-hover:text-accent-pink">
                {post.title}
              </h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-500 dark:text-light-bg/50">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-light-bg/35">
                  <Clock className="h-3 w-3" />
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <Link to="#" className="flex items-center gap-1 text-xs font-semibold text-accent-pink">
                  Read <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
