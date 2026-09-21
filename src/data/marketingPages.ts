export type PageCategory = "solutions" | "use-cases" | "resources" | "features";

export interface WorkflowStep {
  title: string;
  body: string;
}

export interface ProductVisual {
  label: string;
  title: string;
  body: string;
  points: string[];
  art?: "waveform" | "pianoroll" | "preset" | "library" | "export" | "workspace";
}

export interface RelatedLink {
  label: string;
  href: string;
  desc: string;
}

export interface MarketingPageDef {
  slug: string;
  path: string;
  category: PageCategory;
  title: string;
  h1: string;
  statement: string;
  description: string;
  keywords: string[];
  lead: string;
  /** Distinct explanatory sections (replaces the old shared template). */
  sections: { heading: string; body: string; list?: string[] }[];
  workflow?: WorkflowStep[];
  visual?: ProductVisual;
  related?: RelatedLink[];
  comingLater?: string;
  emptyState?: boolean;
}

function page(
  category: PageCategory,
  slug: string,
  h1: string,
  statement: string,
  lead: string,
  opts: Partial<MarketingPageDef> = {},
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
    statement,
    description: `${lead} Join Early Access.`,
    keywords,
    lead,
    sections: [],
    ...opts,
  };
}

/* ------------------------------------------------------------------ */
/* Solutions — one narrative per audience                              */
/* ------------------------------------------------------------------ */

const solutions: MarketingPageDef[] = [
  page("solutions", "music-producers", "AI music production tools for producers",
    "Modular AI assets that drop into the tracks you're already finishing.",
    "Producers juggle sound selection, arrangement, and deadlines. SoundAI generates audio samples, MIDI ideas, and preset starting points you can audition, edit, and export — without handing the whole track to an algorithm.",
    {
      sections: [
        {
          heading: "Who this is for",
          body: "Independent and professional producers working in a DAW who want faster sound selection and more starting points — while keeping full creative control over arrangement, mix, and release.",
        },
        {
          heading: "The problem it solves",
          body: "Sample packs go stale, preset browsing eats sessions, and full-song generators don't fit a producer's workflow. You need fresh, targeted material at the idea stage — not a finished track you didn't ask for.",
          list: [
            "Generate one-shots, textures, and loops aimed at the genre and mood you're working in.",
            "Get MIDI chord, bass, and melody sketches you can re-voice with your own instruments.",
            "Create preset starting points for sound design instead of scrolling factory banks.",
          ],
        },
        {
          heading: "How modular assets help",
          body: "SoundAI outputs building blocks, not masters. Each generation is a separate asset you keep, discard, or iterate on — so your session stays yours and your sound stays distinct.",
        },
      ],
      workflow: [
        { title: "Describe the idea", body: "Prompt with mood, tempo, key, or reference feel — e.g. a dark techno kick or an airy vocal chop bed." },
        { title: "Audition and keep", body: "Generate a few variants, preview them, and save only what earns a place in the project." },
        { title: "Finish in your DAW", body: "Export audio or MIDI files and arrange, process, and mix with the tools you already trust." },
      ],
      visual: {
        label: "Producer workflow",
        title: "From prompt to project asset",
        body: "A producer's generations live as files with musical context — ready to drag into a session.",
        points: ["Audio one-shots + loops", "Editable MIDI sketches", "Preset starting points", "Export files for any DAW"],
      },
      related: [
        { label: "Audio Sample Generation", href: "/use-cases/audio-sample-generation", desc: "What audio outputs cover." },
        { label: "MIDI Generation", href: "/use-cases/midi-generation", desc: "Why MIDI stays editable." },
        { label: "Export", href: "/features/export", desc: "How assets leave SoundAI." },
      ],
    },
    ["AI music production tools"]),
  page("solutions", "composers", "AI-assisted composition infrastructure",
    "Thematic material and variations that respect orchestration craft.",
    "Composers need motifs, harmonic movement, and arrangement options — not auto-finished cues. SoundAI generates MIDI-first musical ideas you can orchestrate, re-harmonize, and develop with your own voice.",
    {
      sections: [
        {
          heading: "Who this is for",
          body: "Media, concert, and library composers who sketch at the piano or in notation/DAW and want more raw material to develop — themes, ostinatos, progressions, and textural beds.",
        },
        {
          heading: "The problem it solves",
          body: "Blank-page starts and deadline pressure push composers toward the same harmonic habits. A modular generator offers alternative motifs and progressions to react against — material to shape, not to ship as-is.",
          list: [
            "Generate melodic motifs and counter-lines in a chosen key and feel.",
            "Explore chord progressions and bass movement as editable MIDI.",
            "Sketch ambient beds and transitions to sit under orchestration.",
          ],
        },
        {
          heading: "How modular assets help",
          body: "Because outputs are symbolic MIDI plus supporting audio, you can re-voice every note for real or sampled instruments, adjust phrasing, and keep full authorship of the final score.",
        },
      ],
      workflow: [
        { title: "Set the brief", body: "Key, tempo, meter, and emotional direction — the constraints a real cue would carry." },
        { title: "Develop the sketch", body: "Take the MIDI into your notation or DAW workflow and orchestrate, extend, and refine." },
        { title: "Archive the material", body: "Save strong motifs to your library for reuse across cues and projects." },
      ],
      visual: {
        label: "Composer workflow",
        title: "MIDI-first, orchestration-ready",
        body: "Symbolic output means every note remains yours to voice, phrase, and score.",
        points: ["Motifs + variations", "Chord progressions", "Ostinatos + bass lines", "Ambient beds"],
      },
      related: [
        { label: "MIDI Generation", href: "/use-cases/midi-generation", desc: "The symbolic workflow in detail." },
        { label: "AI Workspace", href: "/use-cases/ai-workspace", desc: "Where sketches and assets live." },
        { label: "Prompt System", href: "/features/prompt-system", desc: "How briefs stay repeatable." },
      ],
    },
    ["AI-assisted composition"]),
  page("solutions", "beatmakers", "AI sample generator for beatmakers",
    "Drums, loops, and one-shots at the speed of ideas.",
    "Beatmakers live or die by sound selection. SoundAI generates drums, melodic loops, and textures from a short prompt — so you can audition fresh material without digging through the same packs.",
    {
      sections: [
        {
          heading: "Who this is for",
          body: "Hip-hop, trap, drill, lo-fi, and electronic beatmakers building beats in the DAW or on pads — anyone whose workflow starts with finding the right sound.",
        },
        {
          heading: "The problem it solves",
          body: "Overused loops and one-shots make beats sound interchangeable. Prompt-driven generation gives you targeted drums, 808 movement, and melodic beds shaped to your tempo and vibe.",
          list: [
            "Generate kicks, snares, hats, and percussion with a defined character.",
            "Get melodic loops and bass MIDI to chop, pitch, and rearrange.",
            "Create transitions, risers, and impacts to structure the beat.",
          ],
        },
        {
          heading: "How modular assets help",
          body: "Every output is a separate file you can chop, layer, and process. Your drums stay yours — SoundAI just widens the pool you pick from.",
        },
      ],
      workflow: [
        { title: "Call the vibe", body: "Tempo, drum feel, and mood — e.g. a swung 140 BPM drill bounce with dark bells." },
        { title: "Chop and layer", body: "Keep the best generations, stack drums, and flip melodic material your way." },
        { title: "Export the kit", body: "Save favorites to your library and export stems for the mix." },
      ],
      visual: {
        label: "Beatmaker workflow",
        title: "Sounds built to be chopped",
        body: "Short, punchy, loopable material that survives pitching, slicing, and stacking.",
        points: ["Drum one-shots", "808 + bass MIDI", "Melodic loops", "Risers + impacts"],
      },
      related: [
        { label: "Audio Sample Generation", href: "/use-cases/audio-sample-generation", desc: "The sample workflow." },
        { label: "Asset Library", href: "/features/asset-library", desc: "Keep every keeper." },
        { label: "Creative Workflow", href: "/use-cases/creative-workflow", desc: "Repeatable beat pipelines." },
      ],
    },
    ["AI sample generator"]),
  page("solutions", "sound-designers", "AI sound design for professional media",
    "Bespoke textures, impacts, and atmospheres on brief.",
    "Sound designers need original material that no library has. SoundAI generates textures, impacts, whooshes, and beds from descriptive prompts — raw matter to layer, mangle, and master.",
    {
      sections: [
        {
          heading: "Who this is for",
          body: "Sound designers for film, games, trailers, and installations who build signature sounds from layered sources and need fresh raw material fast.",
        },
        {
          heading: "The problem it solves",
          body: "Commercial libraries get recognized and overused. Generating bespoke source material gives you unique layers no other project is using.",
          list: [
            "Generate evolving textures and drones with defined movement.",
            "Create impacts, hits, and transitions with weight and tail.",
            "Sketch atmospheres and beds to sit under designed elements.",
          ],
        },
        {
          heading: "How modular assets help",
          body: "Outputs arrive as audio files you can pitch, stretch, convolve, and stack — the same way you'd treat any field recording or synth render.",
        },
      ],
      workflow: [
        { title: "Write the brief", body: "Material, space, and motion — e.g. a metallic evolving drone with slow filter sweep." },
        { title: "Generate source layers", body: "Produce several variants and pick the ones with the right character." },
        { title: "Design the final", body: "Layer, process, and master in your editor or DAW of choice." },
      ],
      visual: {
        label: "Sound-design workflow",
        title: "Source material, not finished SFX",
        body: "Generations are designed to be layered — characterful raw audio for your chain.",
        points: ["Textures + drones", "Impacts + hits", "Transitions + risers", "Atmospheres + beds"],
      },
      related: [
        { label: "Audio Sample Generation", href: "/use-cases/audio-sample-generation", desc: "Audio output detail." },
        { label: "VST Preset Generation", href: "/use-cases/vst-preset-generation", desc: "Synth starting points." },
        { label: "Export", href: "/features/export", desc: "Getting files out cleanly." },
      ],
    },
    ["AI sound design"]),
  page("solutions", "game-audio", "Game audio AI generation",
    "Repeatable, variation-friendly assets for interactive media.",
    "Game audio needs families of related sounds — footsteps, UI, ambience layers, stingers — that stay coherent across a project. SoundAI generates variations on a brief so sets of assets feel like they belong together.",
    {
      sections: [
        {
          heading: "Who this is for",
          body: "Game audio designers, interactive media composers, and small teams shipping varied, coherent sound without a large library budget.",
        },
        {
          heading: "The problem it solves",
          body: "Games need many related variants (not one hero sound), and asset lists change constantly. Prompt-driven generation produces coherent sets quickly — UI blips, pickups, ambience beds, and musical stingers in the same world.",
          list: [
            "Generate variation sets: same brief, multiple takes.",
            "Create ambience beds and loops for scenes and menus.",
            "Sketch adaptive-music MIDI ideas to develop in middleware.",
          ],
        },
        {
          heading: "How modular assets help",
          body: "Files with consistent character are easy to name, batch, and hand to implementation — via your engine or audio middleware workflow.",
        },
      ],
      workflow: [
        { title: "Define the world", body: "Art direction in words: material, tone, and energy level for the asset family." },
        { title: "Generate variants", body: "Produce several takes per asset so implementation has round-robins and options." },
        { title: "Implement as usual", body: "Export files and integrate through your existing engine or middleware pipeline." },
      ],
      visual: {
        label: "Game-audio workflow",
        title: "Coherent families of sounds",
        body: "One brief, many variants — built for implementation, not demos.",
        points: ["Variation sets", "UI + pickup sounds", "Ambience beds", "Stingers + MIDI sketches"],
      },
      related: [
        { label: "Audio Sample Generation", href: "/use-cases/audio-sample-generation", desc: "Audio output detail." },
        { label: "Asset Organization", href: "/use-cases/asset-organization", desc: "Keeping sets tidy." },
        { label: "Integrations", href: "/features/integrations", desc: "How SoundAI fits toolchains." },
      ],
    },
    ["game audio AI"]),
  page("solutions", "film-tv", "AI music tools for film and television",
    "Cinematic sketches and beds to develop against picture.",
    "Picture deadlines don't wait for inspiration. SoundAI generates cinematic textures, pulses, transitions, and MIDI sketches you can cut against picture and then replace or develop with final instrumentation.",
    {
      sections: [
        {
          heading: "Who this is for",
          body: "Media composers, music editors, and trailer/post teams who need temp-worthy material fast — and editable sources rather than locked stereo AI songs.",
        },
        {
          heading: "The problem it solves",
          body: "Temp tracks create clearance and originality problems; full-song AI outputs can't be edited to picture. Modular cues — drones, pulses, hits, MIDI themes — cut cleanly and get replaced or finished properly.",
          list: [
            "Generate tension beds, pulses, and drones for temp cuts.",
            "Create braams, hits, and transitions for trailers and acts.",
            "Sketch thematic MIDI to develop with live or sampled forces.",
          ],
        },
        {
          heading: "How modular assets help",
          body: "Separate audio and MIDI layers mean the music editor can recut, the composer can re-voice, and nothing arrives as an uneditable stereo file pretending to be a score.",
        },
      ],
      workflow: [
        { title: "Spot the scene", body: "Mood, pace, and hit points — the same language as a spotting session." },
        { title: "Cut the sketch", body: "Generate beds and accents, lay them against picture, adjust." },
        { title: "Finish properly", body: "Develop kept ideas with final instrumentation and mix." },
      ],
      visual: {
        label: "Film + TV workflow",
        title: "Temp-worthy, finishable",
        body: "Editable layers that survive the journey from temp to final.",
        points: ["Tension beds", "Braams + hits", "Transitions", "Thematic MIDI"],
      },
      related: [
        { label: "Audio Sample Generation", href: "/use-cases/audio-sample-generation", desc: "Cinematic audio detail." },
        { label: "MIDI Generation", href: "/use-cases/midi-generation", desc: "Editable themes." },
        { label: "Export", href: "/features/export", desc: "Files for the cutting room." },
      ],
    },
    ["AI music tools film TV"]),
  page("solutions", "content-creators", "AI audio assets for creators",
    "Intros, beds, and stingers without the stock-music sound.",
    "Channels need a lot of short, consistent audio — intros, beds, transitions, outros. SoundAI generates matching sets from one brief so a channel sounds like itself instead of a stock library.",
    {
      sections: [
        {
          heading: "Who this is for",
          body: "YouTubers, podcasters, streamers, and short-form creators who publish often and want a recognizable sonic identity across episodes.",
        },
        {
          heading: "The problem it solves",
          body: "Stock music is recognizable, repetitive, and hard to match across episodes. Generating a small family of beds, stingers, and loops from one brief keeps every upload on-brand.",
          list: [
            "Generate intro/outro beds in your channel's energy.",
            "Create transitions and stingers that match the bed.",
            "Get loopable background music that sits under voice.",
          ],
        },
        {
          heading: "How modular assets help",
          body: "Short, loopable files drop straight into an editor timeline — no stems to untangle, no full songs to cut down.",
        },
      ],
      workflow: [
        { title: "Describe the channel", body: "Energy, tempo, and vibe — e.g. upbeat tech explainer with warm low end." },
        { title: "Build the kit", body: "Generate intro, bed, transition, and outro variants that match." },
        { title: "Reuse every upload", body: "Save the set to your library and reach for it each episode." },
      ],
      visual: {
        label: "Creator workflow",
        title: "A sonic kit for the channel",
        body: "Matching short-form assets that loop cleanly under voice.",
        points: ["Intro + outro beds", "Transitions", "Stingers", "Loopable backgrounds"],
      },
      related: [
        { label: "Audio Sample Generation", href: "/use-cases/audio-sample-generation", desc: "Short-form audio detail." },
        { label: "Creative Workflow", href: "/use-cases/creative-workflow", desc: "Repeatable episode pipelines." },
        { label: "Billing", href: "/features/billing", desc: "How usage works." },
      ],
    },
    ["AI audio assets creators"]),
  page("solutions", "audio-engineers", "AI audio engineering workflows",
    "Source material with export discipline built in.",
    "Engineers care about what happens after generation: file integrity, format choice, naming, and handoff. SoundAI treats every output as a deliverable — audio or MIDI files with a clear path into the session.",
    {
      sections: [
        {
          heading: "Who this is for",
          body: "Mixing, mastering, and post engineers who receive (or now generate) source material and need predictable files, formats, and organization.",
        },
        {
          heading: "The problem it solves",
          body: "AI tools that trap audio inside an app create extra work. SoundAI's job is to hand you files — WAV or MP3 audio, standard MIDI — that behave like any other professional source in the session.",
          list: [
            "Choose delivery formats suited to the job (WAV for production, MP3 for sketches).",
            "Keep generations project-scoped so sessions stay organized.",
            "Preview and favorite before anything reaches the timeline.",
          ],
        },
        {
          heading: "How modular assets help",
          body: "No proprietary lock-in at the file level: audio and MIDI exports open in any DAW or editor, processed with the same chains as recorded material.",
        },
      ],
      workflow: [
        { title: "Generate the source", body: "Prompt for the exact layer needed — a sub drop, a texture, a MIDI part." },
        { title: "Audit and select", body: "Preview, compare variants, keep only what meets the bar." },
        { title: "Bring to session", body: "Export and treat it like any recorded source: edit, process, mix." },
      ],
      visual: {
        label: "Engineer workflow",
        title: "Files first, hype never",
        body: "Deliverables that respect the session: standard formats, clean handoff.",
        points: ["WAV + MP3 audio", "Standard MIDI files", "Project-scoped library", "Preview before export"],
      },
      related: [
        { label: "Export", href: "/features/export", desc: "The DAW handoff." },
        { label: "Asset Library", href: "/features/asset-library", desc: "Session-grade organization." },
        { label: "Credits", href: "/features/credits", desc: "What generation costs." },
      ],
    },
    ["AI audio engineering"]),
  page("solutions", "creative-studios", "Studio-grade AI music infrastructure",
    "Shared generation capacity with project-level order.",
    "Studios run parallel briefs across clients and need every asset traceable: who prompted, which project it belongs to, what's final. SoundAI organizes generation output by project with a shared library.",
    {
      sections: [
        {
          heading: "Who this is for",
          body: "Production studios, agencies, and music houses running multiple briefs where handoffs, versioning, and asset reuse determine whether AI helps or creates chaos.",
        },
        {
          heading: "The problem it solves",
          body: "Unmanaged generation scatters files across chats and desktops. A project-scoped workspace means prompts, variants, and keepers stay attached to the brief they serve.",
          list: [
            "Keep prompts, variants, and keepers attached to each project.",
            "Build a shared library of approved sounds across briefs.",
            "Track generation usage through credits rather than expense chaos.",
          ],
        },
        {
          heading: "How modular assets help",
          body: "Small, named, reusable assets compound in value: a texture approved on one brief becomes the starting point for the next.",
        },
      ],
      workflow: [
        { title: "Brief per project", body: "Each client or campaign gets its own project scope and prompt history." },
        { title: "Generate and approve", body: "Internal rounds happen in the workspace; only keepers reach the client." },
        { title: "Reuse the library", body: "Approved assets stay searchable for future briefs." },
      ],
      visual: {
        label: "Studio workflow",
        title: "Order across parallel briefs",
        body: "Project scope plus shared library — the two things studios actually need.",
        points: ["Project-scoped prompts", "Shared asset library", "Approval via keepers", "Credit-tracked usage"],
      },
      related: [
        { label: "AI Workspace", href: "/use-cases/ai-workspace", desc: "The project environment." },
        { label: "Team Collaboration", href: "/use-cases/team-collaboration", desc: "Honest status of team features." },
        { label: "Projects", href: "/features/projects", desc: "How scoping works." },
      ],
    },
    ["studio AI music infrastructure"]),
];

/* ------------------------------------------------------------------ */
/* Use cases — workflow-specific narratives                            */
/* ------------------------------------------------------------------ */

const useCases: MarketingPageDef[] = [
  page("use-cases", "audio-sample-generation", "AI sample generator for producers",
    "Production-ready audio, from one-shot to atmosphere.",
    "Generate production-ready audio samples with prompt control: define mood, instruments, and character, audition variants, and export files that behave like any professional source in your session.",
    {
      sections: [
        {
          heading: "What can be created",
          body: "Short, focused sounds rather than full songs — material designed to be layered, chopped, and arranged.",
          list: [
            "One-shots: kicks, snares, hats, percussion, bass hits.",
            "Textures and atmospheres: drones, beds, evolving pads.",
            "Impacts and transitions: risers, downlifters, braams, hits.",
            "Loops and production elements: melodic beds, rhythmic layers.",
          ],
        },
        {
          heading: "Prompt to generation",
          body: "Describe what you hear in your head — mood, tempo, key, instruments, space. SoundAI interprets the brief and returns a small set of variants so you can compare character, not just accept a single take.",
        },
        {
          heading: "Preview before you commit",
          body: "Audition generations in the workspace, keep favorites, and discard the rest. Only keepers reach your library — and only library assets reach your DAW.",
        },
        {
          heading: "From workspace to session",
          body: "Export as WAV for production or MP3 for sketches, then arrange and process with your own chains. No proprietary player, no lock-in at the file level.",
        },
      ],
      workflow: [
        { title: "Prompt", body: "Mood, instruments, tempo, and character in plain words." },
        { title: "Generate", body: "A small set of variants to compare — not one take-it-or-leave-it file." },
        { title: "Preview + keep", body: "Audition, favorite the keepers, discard the rest." },
        { title: "Export", body: "WAV or MP3 files ready for any DAW session." },
      ],
      visual: {
        label: "Audio pipeline",
        art: "waveform",
        title: "Prompt → variants → keepers",
        body: "A generation round is a comparison exercise: several takes, one brief, keepers only.",
        points: ["One-shots + percussion", "Textures + atmospheres", "Impacts + transitions", "WAV / MP3 export"],
      },
      related: [
        { label: "MIDI Generation", href: "/use-cases/midi-generation", desc: "When you need notes, not audio." },
        { label: "Asset Library", href: "/features/asset-library", desc: "Where keepers live." },
        { label: "Export", href: "/features/export", desc: "The DAW handoff." },
      ],
    },
    ["AI sample generator"]),
  page("use-cases", "midi-generation", "MIDI generation AI",
    "Notes you can edit — not audio pretending to be music.",
    "Create MIDI patterns, progressions, and motifs aligned to your project: key, tempo, and feel in — editable notes out. Re-voice everything with your own instruments.",
    {
      sections: [
        {
          heading: "Why MIDI is a separate output",
          body: "Audio is a recording of a decision; MIDI is the decision itself. MIDI generations stay fully editable — change the sound, the voicing, the rhythm, or the harmony after generation without quality loss.",
        },
        {
          heading: "What MIDI covers",
          body: "Musical ideas at every scale of the arrangement process.",
          list: [
            "Chord progressions and harmonic rhythm in a chosen key.",
            "Melodies, motifs, and counter-lines to develop.",
            "Bass lines and rhythmic patterns locked to your tempo.",
            "Arps, ostinatos, and accompaniment figures.",
          ],
        },
        {
          heading: "The editable workflow",
          body: "Generations arrive as standard MIDI you can open anywhere: quantize, transpose, re-voice, split across instruments. Your instruments, your mix — SoundAI supplies the notes to react to.",
        },
        {
          heading: "DAW-oriented by design",
          body: "Export MIDI files and drop them into any DAW or notation workflow. Nothing is trapped inside the workspace; the workspace is where ideas start, not where they're held.",
        },
      ],
      workflow: [
        { title: "Set constraints", body: "Key, tempo, meter, and feel — the frame the idea must fit." },
        { title: "Generate ideas", body: "Progressions, melodies, or rhythmic patterns as MIDI." },
        { title: "Edit freely", body: "Re-voice, transpose, and rearrange with your own instruments." },
        { title: "Arrange", body: "Develop keepers into full sections in your DAW." },
      ],
      visual: {
        label: "MIDI pipeline",
        art: "pianoroll",
        title: "Constraints in, notes out",
        body: "Symbolic output means every parameter of the music stays under your control.",
        points: ["Progressions + harmony", "Melodies + motifs", "Bass + rhythm", "Standard MID export"],
      },
      related: [
        { label: "Audio Sample Generation", href: "/use-cases/audio-sample-generation", desc: "When you need rendered audio." },
        { label: "Editor Mode", href: "/features/editor-mode", desc: "Refining generated material." },
        { label: "Prompt System", href: "/features/prompt-system", desc: "Repeatable musical briefs." },
      ],
    },
    ["MIDI generation AI"]),
  page("use-cases", "vst-preset-generation", "AI VST preset generation",
    "Sound-design starting points for synth workflows.",
    "Preset-oriented generation for plugin-centric workflows: describe the timbre and movement you want, get editable starting points to refine in your own synths — faster than scrolling factory banks.",
    {
      sections: [
        {
          heading: "What preset generation is",
          body: "Instead of finished audio, you get sound-design direction: timbral briefs and parameter starting points that narrow the search for a bass, lead, pad, or key sound — which you then finish in your instrument of choice.",
        },
        {
          heading: "The exploration workflow",
          body: "Sound design is search. Generating several related starting points from one timbral brief lets you compare character quickly — bright vs. dark, aggressive vs. soft, static vs. moving — before committing session time.",
          list: [
            "Bass, lead, pad, pluck, and key starting points.",
            "Movement and modulation direction to develop further.",
            "Character comparisons from a single brief.",
          ],
        },
        {
          heading: "Editable by definition",
          body: "A preset is only useful if you can change it. SoundAI's preset workflow assumes you finish the sound yourself — cutoff, envelopes, effects, and all — in the synths you already own.",
        },
        {
          heading: "An honest boundary",
          body: "We don't claim universal compatibility with specific instruments. Treat preset output as sound-design guidance and transferable settings direction, finished in your own toolchain.",
        },
      ],
      workflow: [
        { title: "Describe the timbre", body: "Character, movement, and role in the track — e.g. a warm analog-style pad with slow motion." },
        { title: "Compare directions", body: "Audition starting points and pick the character worth developing." },
        { title: "Finish in your synth", body: "Recreate and refine with your own instruments and effects." },
      ],
      visual: {
        label: "Preset pipeline",
        art: "preset",
        title: "Timbre brief → direction → your synth",
        body: "Starting points that respect the craft: you always finish the sound.",
        points: ["Bass + lead seeds", "Pad + key beds", "Movement direction", "Finished in your toolchain"],
      },
      related: [
        { label: "Audio Sample Generation", href: "/use-cases/audio-sample-generation", desc: "Rendered audio instead." },
        { label: "AI Generation", href: "/features/ai-generation", desc: "How the engine works." },
        { label: "Editor Mode", href: "/features/editor-mode", desc: "Refining material." },
      ],
    },
    ["AI VST preset generation"]),
  page("use-cases", "audio-asset-library", "AI audio asset library",
    "Every keeper, searchable, project-scoped.",
    "Generate, preview, iterate, save, organize, export: the asset lifecycle in one place. Audio, MIDI, and presets live as named, project-scoped assets — not scattered downloads.",
    {
      sections: [
        {
          heading: "The asset lifecycle",
          body: "Generation is only step one. SoundAI structures everything after it: preview variants, favorite keepers, organize by project, and export when a sound earns a session slot.",
        },
        {
          heading: "What the library holds",
          body: "All three output families in one searchable place.",
          list: [
            "Audio: one-shots, loops, textures, transitions.",
            "MIDI: progressions, melodies, rhythmic patterns.",
            "Presets: sound-design starting points and direction.",
            "Favorites and project scope so keepers stay findable.",
          ],
        },
        {
          heading: "Organization without overhead",
          body: "Project scoping keeps client and personal work separate; favorites separate keepers from auditions. The goal is a library that compounds — every brief makes the next one faster.",
        },
      ],
      workflow: [
        { title: "Generate", body: "Prompt-driven variants attached to a project." },
        { title: "Preview + iterate", body: "Audition, favorite, re-prompt what almost worked." },
        { title: "Save + organize", body: "Keepers land in the project-scoped library." },
        { title: "Export", body: "Files out to the DAW when they're needed." },
      ],
      visual: {
        label: "Library lifecycle",
        art: "library",
        title: "Generate → preview → keep → export",
        body: "Six stages, one home for every asset you decide to keep.",
        points: ["Preview + favorites", "Project scoping", "Audio / MIDI / presets", "Searchable keepers"],
      },
      related: [
        { label: "Asset Library", href: "/features/asset-library", desc: "The feature in detail." },
        { label: "Asset Organization", href: "/use-cases/asset-organization", desc: "Organizing well." },
        { label: "Projects", href: "/features/projects", desc: "Project scoping." },
      ],
    },
    ["AI audio asset library"]),
  page("use-cases", "ai-workspace", "AI music workspace",
    "Generation, conversation, assets, and iteration in one place.",
    "A unified environment for generation, editing, and export: AI generation plus conversational refinement, with assets, iteration history, and organization attached to each project.",
    {
      sections: [
        {
          heading: "The workspace idea",
          body: "AI generation plus conversation plus assets plus iteration plus organization. Instead of scattered chats and downloads, each project holds its prompts, variants, keepers, and history together.",
        },
        {
          heading: "Conversation as iteration",
          body: "First prompts are rarely perfect. The workspace keeps prompt history so refinements — darker, slower, fewer notes, more air — build on what came before instead of starting over.",
        },
        {
          heading: "What stays out",
          body: "The workspace is not a DAW replacement: arrangement, mixing, and mastering happen in your production environment. SoundAI handles idea generation and asset preparation — then hands off clean files.",
        },
      ],
      workflow: [
        { title: "Prompt", body: "Start with a musical brief in plain words." },
        { title: "Iterate", body: "Refine conversationally; history keeps context." },
        { title: "Organize", body: "Keepers attach to the project automatically." },
        { title: "Export", body: "Files out when the idea is ready for production." },
      ],
      visual: {
        label: "Workspace concept",
        art: "workspace",
        title: "One project, full context",
        body: "Prompts, variants, and keepers travel together — no lost files.",
        points: ["Prompt history", "Variant comparison", "Project keepers", "Export handoff"],
      },
      related: [
        { label: "Workspace", href: "/features/workspace", desc: "The feature in detail." },
        { label: "Prompt System", href: "/features/prompt-system", desc: "Structured prompting." },
        { label: "Projects", href: "/features/projects", desc: "Project scoping." },
      ],
    },
    ["AI music workspace"]),
  page("use-cases", "team-collaboration", "Team collaboration for audio production",
    "Shared libraries today; team roles on the roadmap.",
    "Shared libraries and project-scoped workflows suit small teams now. Full multi-user collaboration — roles, permissions, shared billing — is planned, not yet available.",
    {
      sections: [
        {
          heading: "What works today",
          body: "Project scoping and a shared asset library already help small teams: prompts and keepers stay attached to the brief, and approved sounds are reusable across projects.",
        },
        {
          heading: "What is not there yet",
          body: "We won't pretend otherwise: team roles, permissions, real-time co-editing, and consolidated team billing are not currently available. They are on the roadmap.",
        },
      ],
      comingLater: "Team collaboration — roles, shared workspaces, and consolidated billing — is planned for a later release. Today, use project scoping and the shared library for lightweight team workflows, and join Early Access to be notified when team features land.",
      related: [
        { label: "AI Workspace", href: "/use-cases/ai-workspace", desc: "The project environment." },
        { label: "Collaboration", href: "/features/collaboration", desc: "Feature status." },
        { label: "Creative Studios", href: "/solutions/creative-studios", desc: "Studio workflows." },
      ],
    },
    ["team collaboration audio"]),
  page("use-cases", "creative-workflow", "Creative workflow automation",
    "Repeatable pipelines from prompt to export.",
    "Connect prompts, generation, and export into repeatable pipelines: saved prompt patterns, project-scoped iteration, and a consistent path from idea to DAW-ready file.",
    {
      sections: [
        {
          heading: "Why repeatability matters",
          body: "One-off generations are fun; pipelines ship work. Saved prompt patterns plus project history turn 'I got lucky once' into a process you can rerun for every brief, episode, or cue.",
        },
        {
          heading: "The pipeline",
          body: "Brief with a template, generate variants, keep what works, export on a schedule. The same loop serves weekly episodes, sample-pack building, and cue batches.",
        },
      ],
      workflow: [
        { title: "Template the brief", body: "Save prompt patterns for recurring needs — intros, drops, beds." },
        { title: "Generate in batches", body: "Run variants per brief; compare and keep." },
        { title: "Export consistently", body: "Same formats, same naming discipline, every time." },
      ],
      visual: {
        label: "Pipeline concept",
        title: "Brief → batch → keep → ship",
        body: "A loop you can run weekly — not a lucky accident.",
        points: ["Prompt templates", "Batch variants", "Keepers only", "Consistent export"],
      },
      related: [
        { label: "Prompt System", href: "/features/prompt-system", desc: "Templates and history." },
        { label: "Projects", href: "/features/projects", desc: "Scoping the pipeline." },
        { label: "Export", href: "/features/export", desc: "The final step." },
      ],
    },
    ["creative workflow automation"]),
  page("use-cases", "asset-organization", "Audio asset organization",
    "Metadata, favorites, and project scope that scale.",
    "Metadata, favorites, and project-scoped asset management: keep every generation findable, separate keepers from auditions, and build a library that gets more valuable with each project.",
    {
      sections: [
        {
          heading: "The real problem",
          body: "Downloads folders are where sounds go to die. Without scope and favorites, last month's perfect texture is unfindable when the new brief needs it.",
        },
        {
          heading: "How SoundAI organizes",
          body: "Every generation carries its prompt context and project scope. Favorites mark keepers; projects separate clients and personal work; the library stays searchable instead of chronological.",
          list: [
            "Project scope per brief or client.",
            "Favorites to separate keepers from auditions.",
            "Prompt context attached to every asset.",
            "Audio, MIDI, and presets in one place.",
          ],
        },
      ],
      workflow: [
        { title: "Scope it", body: "Generate inside the project the asset serves." },
        { title: "Favorite keepers", body: "Mark what earned its place; discard the rest." },
        { title: "Reuse later", body: "Search the library when the next brief rhymes." },
      ],
      visual: {
        label: "Organization concept",
        title: "Findable beats plentiful",
        body: "A hundred organized sounds beat ten thousand lost ones.",
        points: ["Project scope", "Favorites", "Prompt context", "One searchable library"],
      },
      related: [
        { label: "Asset Library", href: "/features/asset-library", desc: "The feature in detail." },
        { label: "Projects", href: "/features/projects", desc: "Scoping." },
        { label: "AI Workspace", href: "/use-cases/ai-workspace", desc: "Where it all lives." },
      ],
    },
    ["audio asset organization"]),
];

/* ------------------------------------------------------------------ */
/* Features — one purpose per page                                     */
/* ------------------------------------------------------------------ */

const features: MarketingPageDef[] = [
  page("features", "ai-generation", "AI Generation",
    "The core engine: prompt in, audio / MIDI / presets out.",
    "Core generation engine for audio, MIDI, and presets. Describe the musical idea in plain words; SoundAI returns a small set of variants per output family — never a locked full song.",
    {
      sections: [
        {
          heading: "What the engine does",
          body: "Interprets structured prompts — mood, tempo, key, timbre, role — and produces candidate assets in the requested family: rendered audio, symbolic MIDI, or preset direction.",
        },
        {
          heading: "What it deliberately does not do",
          body: "No full-track auto-songs, no uneditable stereo 'masters', no mystery black box. Variants are starting points you audition, keep, or discard — authorship stays with you.",
        },
      ],
      workflow: [
        { title: "Brief", body: "Constrained prompt with musical parameters." },
        { title: "Generate", body: "Variants per output family." },
        { title: "Select", body: "Preview, favorite, iterate, or discard." },
      ],
      visual: {
        label: "Engine concept",
        title: "One brief, three asset families",
        body: "Audio for character, MIDI for notes, presets for timbre direction.",
        points: ["Audio variants", "MIDI ideas", "Preset direction", "Keepers only"],
      },
      related: [
        { label: "Prompt System", href: "/features/prompt-system", desc: "How briefs are structured." },
        { label: "Credits", href: "/features/credits", desc: "What generation costs." },
        { label: "Audio Sample Generation", href: "/use-cases/audio-sample-generation", desc: "Audio in practice." },
      ],
    }),
  page("features", "projects", "Projects",
    "Every brief gets its own scope.",
    "Project-scoped asset organization and versioning. Prompts, variants, and keepers attach to the project they serve — clients, episodes, and cues stay separate by construction.",
    {
      sections: [
        {
          heading: "Why scoping matters",
          body: "Unscoped generation mixes client work with experiments. Projects keep each brief's context together so handoffs are clean and old keepers stay findable under the right name.",
        },
        {
          heading: "What a project holds",
          body: "Prompt history, generated variants, favorited keepers, and export records — the full trail from brief to delivered file.",
        },
      ],
      workflow: [
        { title: "Create the project", body: "Name it after the brief, client, or episode." },
        { title: "Generate inside it", body: "Every variant inherits the scope automatically." },
        { title: "Ship from it", body: "Exports trace back to the brief they served." },
      ],
      visual: {
        label: "Projects concept",
        title: "Context travels with assets",
        body: "No orphaned files: every keeper knows which brief created it.",
        points: ["Scoped prompts", "Variant history", "Keepers per project", "Traceable exports"],
      },
      related: [
        { label: "AI Workspace", href: "/use-cases/ai-workspace", desc: "Projects in context." },
        { label: "Asset Library", href: "/features/asset-library", desc: "Across projects." },
        { label: "Asset Organization", href: "/use-cases/asset-organization", desc: "Staying tidy." },
      ],
    }),
  page("features", "asset-library", "Asset Library",
    "Central library for everything you keep.",
    "Central library for generated assets across projects. Audio, MIDI, and presets — favorited keepers with prompt context, searchable and project-scoped.",
    {
      sections: [
        {
          heading: "What lives here",
          body: "Only keepers: the variants you favorited, with the prompt and project that produced them. Auditions and discards don't clutter the shelves.",
        },
        {
          heading: "Finding things again",
          body: "Project scope plus favorites plus prompt context beats folder archaeology. Search by what the sound is and where it came from.",
          list: [
            "Audio, MIDI, and preset keepers in one place.",
            "Favorites separate keepers from auditions.",
            "Project scope per brief or client.",
            "Prompt context attached to every asset.",
          ],
        },
      ],
      workflow: [
        { title: "Favorite", body: "Mark keepers during audition." },
        { title: "Scope", body: "Keepers inherit their project automatically." },
        { title: "Retrieve", body: "Search and re-export when the next brief needs them." },
      ],
      visual: {
        label: "Library concept",
        art: "library",
        title: "Keepers, not downloads",
        body: "A library that compounds: every project makes the next one faster.",
        points: ["Keepers only", "Prompt context", "Project scope", "Searchable"],
      },
      related: [
        { label: "Audio Asset Library", href: "/use-cases/audio-asset-library", desc: "The lifecycle view." },
        { label: "Export", href: "/features/export", desc: "Getting files out." },
        { label: "Projects", href: "/features/projects", desc: "Scoping." },
      ],
    }),
  page("features", "prompt-system", "Prompt System",
    "Structured briefs you can rerun.",
    "Structured prompts, templates, and history. Save the briefs that work, rerun them for new episodes or cues, and refine conversationally with full context.",
    {
      sections: [
        {
          heading: "Beyond the text box",
          body: "Musical briefs carry parameters — mood, tempo, key, timbre, role. The prompt system treats them as structured input, and keeps history so refinements build instead of restarting.",
        },
        {
          heading: "Templates for recurring work",
          body: "Weekly episodes, cue batches, and sample-kit building all repeat the same shapes. Templates turn working briefs into rerunnable starting points.",
        },
      ],
      workflow: [
        { title: "Write the brief", body: "Plain words with musical parameters." },
        { title: "Refine", body: "Iterate conversationally; history keeps context." },
        { title: "Save the pattern", body: "Template what works; rerun it next time." },
      ],
      visual: {
        label: "Prompt concept",
        title: "Briefs that improve",
        body: "History plus templates: every generation teaches the next brief.",
        points: ["Structured briefs", "Full history", "Rerunnable templates", "Conversational refine"],
      },
      related: [
        { label: "Creative Workflow", href: "/use-cases/creative-workflow", desc: "Pipelines built on prompts." },
        { label: "AI Generation", href: "/features/ai-generation", desc: "What prompts drive." },
        { label: "Editor Mode", href: "/features/editor-mode", desc: "After generation." },
      ],
    }),
  page("features", "editor-mode", "Editor Mode",
    "Refine generated material before export.",
    "Refine and arrange generated material: audition variants, compare takes, trim and select — then export only what earned a session slot.",
    {
      sections: [
        {
          heading: "What editing means here",
          body: "Selection and preparation, not a DAW replacement: compare variants side by side, trim, favorite, and organize. Arrangement and mixing stay in your production environment where they belong.",
        },
        {
          heading: "The refine loop",
          body: "Almost-right generations get re-prompted with adjustments — darker, slower, fewer notes — while history preserves what already worked.",
        },
      ],
      workflow: [
        { title: "Compare", body: "Audition variants against the brief." },
        { title: "Refine", body: "Re-prompt the near-misses with adjustments." },
        { title: "Prepare", body: "Trim, favorite, and stage keepers for export." },
      ],
      visual: {
        label: "Editor concept",
        title: "Selection is the edit",
        body: "Professional output comes from ruthless selection plus light preparation.",
        points: ["Variant compare", "Audition + favorite", "Re-prompt loop", "Export staging"],
      },
      related: [
        { label: "MIDI Generation", href: "/use-cases/midi-generation", desc: "Editable notes." },
        { label: "Export", href: "/features/export", desc: "After the edit." },
        { label: "Asset Library", href: "/features/asset-library", desc: "Where keepers land." },
      ],
    }),
  page("features", "workspace", "Workspace",
    "The SoundAI production environment.",
    "The SoundAI production environment: generation, conversation, assets, iteration, and organization per project — the connective tissue between a prompt and an exported file.",
    {
      sections: [
        {
          heading: "Five things, one place",
          body: "AI generation, conversational refinement, asset storage, iteration history, and project organization. The workspace exists so nothing about a generation gets lost between idea and export.",
        },
        {
          heading: "Not a DAW",
          body: "An explicit boundary: arrangement, mixing, and mastering happen in your production environment. The workspace prepares ideas and files — it doesn't replace the studio.",
        },
      ],
      workflow: [
        { title: "Generate", body: "Prompt inside a project scope." },
        { title: "Iterate", body: "Refine with conversational context." },
        { title: "Organize", body: "Keepers attach to the project." },
        { title: "Export", body: "Files out to production." },
      ],
      visual: {
        label: "Workspace concept",
        art: "workspace",
        title: "Generation + memory + order",
        body: "Prompts, variants, and keepers travel together per project.",
        points: ["Project scope", "Prompt history", "Keepers", "Export handoff"],
      },
      related: [
        { label: "AI Workspace", href: "/use-cases/ai-workspace", desc: "The workflow view." },
        { label: "Projects", href: "/features/projects", desc: "Scoping." },
        { label: "Prompt System", href: "/features/prompt-system", desc: "Briefing." },
      ],
    }),
  page("features", "export", "Export",
    "The bridge from SoundAI to your session.",
    "Export paths for DAWs and delivery formats. SoundAI hands you files — WAV or MP3 audio, standard MIDI — that open in any production environment. No lock-in, no proprietary player.",
    {
      sections: [
        {
          heading: "The handoff principle",
          body: "SoundAI's job ends with a clean file. Audio exports as WAV for production or MP3 for sketches; MIDI exports as standard files. Everything opens in any DAW or editor.",
        },
        {
          heading: "What export covers",
          body: "Keeper assets from your library, in the format suited to the job — production-grade WAV when quality matters, lightweight MP3 for sketches and sharing.",
          list: [
            "WAV audio for production sessions.",
            "MP3 audio for sketches and quick sharing.",
            "Standard MIDI files for notes and arrangements.",
            "Project context so exports stay traceable.",
          ],
        },
        {
          heading: "What export is not",
          body: "There are no native DAW integrations, plugin sync, or one-click session injection today. Export is a file handoff by design — honest, universal, and compatible with everything.",
        },
      ],
      workflow: [
        { title: "Select keepers", body: "Favorite the assets that earned a session slot." },
        { title: "Choose format", body: "WAV, MP3, or MIDI depending on the job." },
        { title: "Drop into session", body: "Files behave like any recorded source." },
      ],
      visual: {
        label: "Export concept",
        art: "export",
        title: "SoundAI → file → DAW",
        body: "A universal handoff instead of a fragile integration.",
        points: ["WAV + MP3", "Standard MIDI", "Any DAW", "No lock-in"],
      },
      related: [
        { label: "Integrations", href: "/features/integrations", desc: "Honest integration status." },
        { label: "Asset Library", href: "/features/asset-library", desc: "Where exports start." },
        { label: "Audio Engineers", href: "/solutions/audio-engineers", desc: "The engineer's view." },
      ],
    }),
  page("features", "integrations", "Integrations",
    "Designed to fit modern production workflows.",
    "Connect SoundAI to your toolchain — today through universal file export, tomorrow through deeper paths. Designed to fit into modern music production workflows without fragile fake connections.",
    {
      sections: [
        {
          heading: "What works today",
          body: "Universal file handoff: WAV and MP3 audio plus standard MIDI files that open in any DAW or editor. This is the integration — boring, reliable, compatible with everything you already use.",
        },
        {
          heading: "What is not claimed",
          body: "No native DAW plugins, no OAuth connections, no automatic session sync, no desktop app link today. This page will change when those paths genuinely ship — not before.",
        },
      ],
      comingLater: "Deeper workflow connections — plugin, desktop, and direct DAW paths — are on the roadmap. Until they ship, export files are the supported bridge, and this page stays honest about that.",
      related: [
        { label: "Export", href: "/features/export", desc: "Today's supported bridge." },
        { label: "AI Workspace", href: "/use-cases/ai-workspace", desc: "Where assets originate." },
        { label: "Game Audio", href: "/solutions/game-audio", desc: "Pipeline thinking." },
      ],
    }),
  page("features", "billing", "Billing",
    "Plans and access, without the maze.",
    "Plans, credits, and access for the SoundAI workspace. Lite and Pro are interface modes unlocked by plan — not separate products. See Pricing for the current plan lineup.",
    {
      sections: [
        {
          heading: "How billing is organized",
          body: "Plans grant workspace access and generation capacity; credits meter actual generation usage. Premium tiers unlock the full Pro interface; entry tiers work in Lite.",
        },
        {
          heading: "Where to look",
          body: "The Pricing page carries the current plans as offered. This page explains the concepts; Pricing carries the specifics — so the two can never disagree.",
        },
      ],
      related: [
        { label: "Pricing", href: "/pricing", desc: "Current plans." },
        { label: "Credits", href: "/features/credits", desc: "How usage is metered." },
        { label: "Early Access", href: "/early-access", desc: "Join the launch list." },
      ],
    }),
  page("features", "credits", "Credits",
    "Generation usage, metered simply.",
    "Usage-based credits for generation: each generation consumes credits; keepers cost nothing extra. Credits are the meter between your plan and the engine.",
    {
      sections: [
        {
          heading: "How credits work",
          body: "Generating variants spends credits; previewing, favoriting, organizing, and exporting do not. The meter runs on creation — everything after that is free.",
        },
        {
          heading: "Plans and refills",
          body: "Plans include credit allowances with their own refill behavior — see Pricing for the current specifics. The concept stays stable: pay for generation, not for library housekeeping.",
        },
      ],
      related: [
        { label: "Billing", href: "/features/billing", desc: "Plans and access." },
        { label: "Pricing", href: "/pricing", desc: "Current allowances." },
        { label: "AI Generation", href: "/features/ai-generation", desc: "What credits power." },
      ],
    }),
  page("features", "collaboration", "Collaboration",
    " Planned — not promised as shipped.",
    "Team features are on the roadmap. Today SoundAI suits solo creators and lightweight shared-library use; roles, permissions, and shared billing are planned, not available.",
    {
      sections: [
        {
          heading: "Honest status",
          body: "There is no multi-user workspace with roles and permissions today. Claiming otherwise would be fabrication — so this page says plainly: collaboration is coming later.",
        },
        {
          heading: "What small teams can do now",
          body: "Project scoping plus a shared library already cover lightweight teamwork: keep briefs separate, share keepers, and track usage through credits.",
        },
      ],
      comingLater: "Full collaboration — team roles, shared workspaces, consolidated billing — is planned. Join Early Access to be notified when team features land; until then, project scoping covers small-team needs.",
      related: [
        { label: "Team Collaboration", href: "/use-cases/team-collaboration", desc: "The workflow view." },
        { label: "Creative Studios", href: "/solutions/creative-studios", desc: "Studio workflows." },
        { label: "Projects", href: "/features/projects", desc: "Scoping today." },
      ],
    }),
];

/* ------------------------------------------------------------------ */
/* Resources — honest empty states, no fabricated archives             */
/* ------------------------------------------------------------------ */

const resourceDefs: [string, string, string][] = [
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
];

const resources: MarketingPageDef[] = resourceDefs.map(([slug, h1, lead]) =>
  page("resources", slug, h1, "A section we're growing into.",
    lead,
    {
      sections: [],
      emptyState: true,
      related: [
        { label: "Early Access", href: "/early-access", desc: "Get notified as sections open." },
        { label: "Support", href: "/support", desc: "Talk to us directly." },
        { label: "About", href: "/about", desc: "What SoundAI is building." },
      ],
    }),
);

export const marketingPages: MarketingPageDef[] = [...solutions, ...useCases, ...features, ...resources];

export function getMarketingPage(path: string): MarketingPageDef | undefined {
  return marketingPages.find((p) => p.path === path);
}
