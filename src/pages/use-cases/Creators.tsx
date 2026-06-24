import SectionHeading from "./../../components/SectionHeading";
import { Link } from "react-router-dom";

export default function Creators() {
  return (
    <main>
      <section className="section-padding">
        <div className="container-max">
          <SectionHeading
            badge="Use Case"
            title="Creators & Composers"
            subtitle="AI-assisted composition and iteration workflows"
          />

          <h1 className="mt-6 font-poppins text-2xl font-semibold">Workflow preview</h1>
          <ol className="mt-4 list-inside list-decimal text-gray-600">
            <li>Generate motifs, MIDI phrases, and supporting samples from prompts.</li>
            <li>Refine arrangements by editing generated MIDI and swapping presets.</li>
            <li>Export stems and project-ready assets for finishing in your DAW.</li>
          </ol>

          <div className="mt-8">
            <Link to="/waitlist" className="btn-primary">
              Join Waitlist
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
