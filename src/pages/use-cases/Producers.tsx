import SectionHeading from "./../../components/SectionHeading";
import { Link } from "react-router-dom";

export default function Producers() {
  return (
    <main>
      <section className="section-padding">
        <div className="container-max">
          <SectionHeading
            badge="Use Case"
            title="Music Producers"
            subtitle="DAW-native asset generation to accelerate arrangement and sound design"
          />

          <h1 className="mt-6 font-poppins text-2xl font-semibold">Workflow preview</h1>
          <ol className="mt-4 list-inside list-decimal text-gray-600">
            <li>Prompt to generate stems, MIDI, and presets.</li>
            <li>Import assets into your DAW; edit MIDI and swap presets.</li>
            <li>Iterate with targeted prompts and export production-grade stems.</li>
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
