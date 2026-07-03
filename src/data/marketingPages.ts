export type PageCategory = "solutions" | "use-cases" | "resources" | "features";

export interface MarketingPageDef {
  slug: string;
  path: string;
  category: PageCategory;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  lead: string;
  sections: { heading: string; body: string }[];
}

function page(
  category: PageCategory,
  slug: string,
  h1: string,
  description: string,
  lead: string,
  sections: { heading: string; body: string }[],
  keywords: string[] = [],
): MarketingPageDef {
  const prefix =
    category === "solutions"
      ? "/solutions"
      : category === "use-cases"
        ? "/use-cases"
        : category === "features"
          ? "/features"
          : "/resources";
  return {
    slug,
    path: `${prefix}/${slug}`,
    category,
    title: h1,
    h1,
    description,
    keywords,
    lead,
    sections,
  };
}

const defaultSections = (topic: string) => [
  {
    heading: `Why ${topic} teams choose SoundAI`,
    body: `SoundAI is built as modular AI music infrastructure — not a consumer toy. ${topic} workflows benefit from governed generation, export-grade formats, and a unified workspace that scales from solo creators to studio teams.`,
  },
  {
    heading: "Production-grade outputs",
    body: "Generate audio samples, MIDI, and VST-oriented presets with consistent metadata, versioning, and export paths aligned to professional DAW pipelines.",
  },
  {
    heading: "Early Access",
    body: "SoundAI is preparing for production launch. Join Early Access to receive onboarding priority, product updates, and billing alignment when accounts go live.",
  },
];

export const marketingPages: MarketingPageDef[] = [
  ...[
    ["music-producers", "AI music production tools for producers", "SoundAI gives producers a governed layer for sample and MIDI generation — integrated with projects, libraries, and export."],
    ["composers", "AI-assisted composition infrastructure", "Modular generation for motifs, arrangements, and asset libraries without breaking orchestration workflows."],
    ["beatmakers", "AI sample generator for beatmakers", "One-shots, loops, and drum material with prompt control and library organization."],
    ["sound-designers", "AI sound design for professional media", "Textures, impacts, and bespoke sonic material with format fidelity."],
    ["game-audio", "Game audio AI generation", "Interactive-ready assets with repeatable generation and team libraries."],
    ["film-tv", "AI music tools for film and television", "Cinematic cues and production libraries with export governance."],
    ["content-creators", "AI audio assets for creators", "Channel-ready samples and MIDI with licensing-aware workflows."],
    ["audio-engineers", "AI audio engineering workflows", "Format control, export paths, and integration with professional tooling."],
    ["creative-studios", "Studio-grade AI music infrastructure", "Team collaboration, asset governance, and scalable generation."],
  ].map(([slug, h1, lead]) =>
    page("solutions", slug as string, h1 as string, `${lead} Join Early Access.`, lead as string, defaultSections(h1 as string), ["AI music production tools"]),
  ),

  ...[
    ["audio-sample-generation", "AI sample generator for producers", "Generate production-ready audio samples with prompt control and library sync."],
    ["midi-generation", "MIDI generation AI", "Create MIDI patterns and arrangements aligned to your project structure."],
    ["vst-preset-generation", "AI VST preset generation", "Preset-oriented generation for plugin-centric workflows."],
    ["audio-asset-library", "AI audio asset library", "Organize, version, and retrieve generated assets across projects."],
    ["ai-workspace", "AI music workspace", "A unified environment for generation, editing, and export."],
    ["team-collaboration", "Team collaboration for audio production", "Shared libraries and governed workflows for studio teams."],
    ["creative-workflow", "Creative workflow automation", "Connect prompts, generation, and export into repeatable pipelines."],
    ["asset-organization", "Audio asset organization", "Metadata, favorites, and project-scoped asset management."],
  ].map(([slug, h1, lead]) =>
    page("use-cases", slug as string, h1 as string, `${lead} SoundAI Early Access.`, lead as string, defaultSections(h1 as string), [h1 as string]),
  ),

  ...[
    ["blog", "SoundAI Blog", "Product updates, production insights, and infrastructure thinking."],
    ["announcements", "SoundAI Announcements", "Official product and company announcements."],
    ["changelog", "SoundAI Changelog", "Release notes and platform changes."],
    ["events", "SoundAI Events", "Workshops, demos, and community sessions."],
    ["guides", "SoundAI Guides", "How-to guides for AI-assisted production."],
    ["insights", "SoundAI Insights", "Research and industry analysis."],
    ["user-stories", "SoundAI User Stories", "How teams use modular AI music infrastructure."],
    ["initiatives", "SoundAI Initiatives", "Community and education programs."],
    ["ambassador-program", "SoundAI Ambassador Program", "Partner with SoundAI to grow the ecosystem."],
    ["school", "SoundAI School", "Learning resources for AI-assisted music production."],
    ["forum", "SoundAI Forum", "Community discussions and support."],
    ["activity", "SoundAI Activity", "Community activity and updates."],
  ].map(([slug, h1, lead]) =>
    page("resources", slug as string, h1 as string, lead as string, lead as string, defaultSections("SoundAI"), []),
  ),

  ...[
    ["ai-generation", "AI Generation", "Core generation engine for audio, MIDI, and presets."],
    ["projects", "Projects", "Project-scoped asset organization and versioning."],
    ["asset-library", "Asset Library", "Central library for generated and imported assets."],
    ["prompt-system", "Prompt System", "Structured prompts, templates, and history."],
    ["editor-mode", "Editor Mode", "Refine and arrange generated material."],
    ["workspace", "Workspace", "The SoundAI production environment."],
    ["export", "Export", "Export paths for DAWs and delivery formats."],
    ["integrations", "Integrations", "Connect SoundAI to your toolchain."],
    ["billing", "Billing", "Plans, credits, and subscription alignment."],
    ["credits", "Credits", "Usage-based credits for generation."],
    ["collaboration", "Collaboration", "Team features on the roadmap."],
  ].map(([slug, h1, lead]) =>
    page("features", slug as string, h1 as string, `${lead} Part of SoundAI infrastructure.`, lead as string, defaultSections(h1 as string), []),
  ),
];

export function getMarketingPage(path: string): MarketingPageDef | undefined {
  return marketingPages.find((p) => p.path === path);
}
