export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href?: string;
  items: NavLink[];
}

export const solutionsNav: NavGroup = {
  label: "Solutions",
  items: [
    { label: "Music Producers", href: "/solutions/music-producers", description: "Sample and MIDI workflows for modern production." },
    { label: "Composers", href: "/solutions/composers", description: "Orchestration-ready assets and modular generation." },
    { label: "Beatmakers", href: "/solutions/beatmakers", description: "Drums, loops, and one-shots at production speed." },
    { label: "Sound Designers", href: "/solutions/sound-designers", description: "SFX, textures, and bespoke sonic material." },
    { label: "Game Audio", href: "/solutions/game-audio", description: "Adaptive assets for interactive media." },
    { label: "Film & TV", href: "/solutions/film-tv", description: "Cinematic cues and production libraries." },
    { label: "Content Creators", href: "/solutions/content-creators", description: "Royalty-aware assets for digital channels." },
    { label: "Audio Engineers", href: "/solutions/audio-engineers", description: "Format fidelity and export-grade outputs." },
    { label: "Creative Studios", href: "/solutions/creative-studios", description: "Team workflows and asset governance." },
  ],
};

export const useCasesNav: NavGroup = {
  label: "Use Cases",
  items: [
    { label: "Audio Sample Generation", href: "/use-cases/audio-sample-generation" },
    { label: "MIDI Generation", href: "/use-cases/midi-generation" },
    { label: "VST Preset Generation", href: "/use-cases/vst-preset-generation" },
    { label: "Audio Asset Library", href: "/use-cases/audio-asset-library" },
    { label: "AI Workspace", href: "/use-cases/ai-workspace" },
    { label: "Team Collaboration", href: "/use-cases/team-collaboration" },
    { label: "Creative Workflow", href: "/use-cases/creative-workflow" },
    { label: "Asset Organization", href: "/use-cases/asset-organization" },
  ],
};

export const resourcesNav: NavGroup = {
  label: "Resources",
  items: [
    { label: "Blog", href: "/resources/blog" },
    { label: "Announcements", href: "/resources/announcements" },
    { label: "SoundAI Changelog", href: "/resources/changelog" },
    { label: "Events", href: "/resources/events" },
    { label: "Guides", href: "/resources/guides" },
    { label: "Insights", href: "/resources/insights" },
    { label: "User Stories", href: "/resources/user-stories" },
    { label: "Initiatives", href: "/resources/initiatives" },
    { label: "Ambassador Program", href: "/resources/ambassador-program" },
    { label: "School", href: "/resources/school" },
  ],
};

export const featuresNav: NavLink[] = [
  { label: "AI Generation", href: "/features/ai-generation" },
  { label: "Projects", href: "/features/projects" },
  { label: "Asset Library", href: "/features/asset-library" },
  { label: "Prompt System", href: "/features/prompt-system" },
  { label: "Editor Mode", href: "/features/editor-mode" },
  { label: "Workspace", href: "/features/workspace" },
  { label: "Export", href: "/features/export" },
  { label: "Integrations", href: "/features/integrations" },
  { label: "Billing", href: "/features/billing" },
  { label: "Credits", href: "/features/credits" },
  { label: "Collaboration", href: "/features/collaboration" },
];

export const productsFooter: NavLink[] = [
  { label: "Audio Samples", href: "/use-cases/audio-sample-generation" },
  { label: "MIDI", href: "/use-cases/midi-generation" },
  { label: "VST Presets", href: "/use-cases/vst-preset-generation" },
  { label: "Workspace", href: "/features/workspace" },
  { label: "Library", href: "/features/asset-library" },
  { label: "Export", href: "/features/export" },
];

export const legalFooter: NavLink[] = [
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Cookie Settings", href: "/legal/cookies" },
  { label: "Contact", href: "/support" },
  { label: "Feedback", href: "/support" },
  { label: "Support", href: "/support" },
];

export const resourcesFooter: NavLink[] = [
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/resources/blog" },
  { label: "Changelog", href: "/resources/changelog" },
  { label: "Docs", href: "/docs" },
  { label: "Forum", href: "/resources/forum" },
  { label: "Activity", href: "/resources/activity" },
  { label: "Ambassador", href: "/resources/ambassador-program" },
  { label: "School", href: "/resources/school" },
];
