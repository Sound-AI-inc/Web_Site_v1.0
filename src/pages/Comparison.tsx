import SectionHeading from "./../components/SectionHeading";
import { Link } from "react-router-dom";

export default function Comparison() {
  return (
    <main>
      <section className="section-padding">
        <div className="container-max">
          <SectionHeading
            badge="Comparison"
            title="Positioning vs other approaches"
            subtitle="Why SoundAI is a production tool, not a consumer music generator"
          />

          <h1 className="mt-6 font-poppins text-2xl font-semibold">How we differ</h1>
          <ul className="mt-4 list-inside list-disc text-gray-600">
            <li>Modular asset outputs (audio, MIDI, presets) vs full-track generation.</li>
            <li>DAW-native handoff and editing-first outputs.</li>
            <li>Designed for integration into professional pipelines, not isolated consumer apps.</li>
            <li>Explicit focus on production quality, metadata, and rights-aware outputs.</li>
          </ul>

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
