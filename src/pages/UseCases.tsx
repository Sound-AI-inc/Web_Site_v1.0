import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";

const useCases = [
  {
    title: "Music producers",
    description:
      "Generate stems, MIDI hooks, and presets as modular assets that land directly in the DAW. This workflow keeps producers in control of arrangement, sound design, and final mix decisions.",
    link: "/use-cases/producers",
  },
  {
    title: "Sound designers",
    description:
      "Create sampled textures, plugin patches, and curated preset layers from descriptive prompts, then refine them in a production session without re-creating the sound.",
    link: "/use-cases/sound-design",
  },
  {
    title: "Game audio teams",
    description:
      "Produce adaptive, engine-ready assets with metadata and versioned outputs designed for runtime integration and rapid iteration.",
    link: "/use-cases/game-audio",
  },
  {
    title: "Content creators",
    description:
      "Assemble audio building blocks that fit your narrative and timeline, then polish them in a familiar toolchain rather than starting from a finished track.",
    link: "/use-cases/creators",
  },
  {
    title: "AI-assisted composers",
    description:
      "Use AI-generated MIDI and patch suggestions to explore structure, harmonies, and texture without sacrificing compositional intent.",
    link: "/waitlist",
  },
];

export default function UseCases() {
  return (
    <main>
      <section className="section-padding">
        <div className="container-max">
          <SectionHeading
            badge="Use Cases"
            title="Practical workflows for modern audio teams"
            subtitle="Each use case explains how SoundAI fits into existing creative and production processes — not what buttons it has."
          />

          <div className="space-y-12">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="rounded-[28px] border border-gray-200 bg-white p-8 text-gray-700 shadow-[0_18px_60px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-dark-bg dark:text-light-bg">
                <h2 className="font-poppins text-2xl font-semibold text-gray-950 dark:text-white">{useCase.title}</h2>
                <p className="mt-4 max-w-3xl leading-relaxed text-gray-600 dark:text-light-bg/70">{useCase.description}</p>
                <div className="mt-6">
                  <Link to={useCase.link} className="btn-primary inline-flex items-center gap-2">
                    View workflow
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[28px] border border-accent-cyan/20 bg-accent-cyan/10 p-10 text-center">
            <h2 className="font-poppins text-3xl font-semibold text-dark">Need a custom workflow?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-light-bg/70">
              If your team has a unique production pipeline, join the waitlist and tell us your role. We'll prioritize early access for partners building with SoundAI.
            </p>
            <Link to="/waitlist" className="btn-secondary mt-8 inline-flex px-8 py-3 text-base">
              Join Waitlist
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
