import SectionHeading from "./../components/SectionHeading";
import { Link } from "react-router-dom";

export default function Technology() {
  return (
    <main>
      <section className="section-padding">
        <div className="container-max">
          <SectionHeading
            badge="Technology"
            title="Multi-layer, production-focused architecture"
            subtitle="Audio, MIDI, and preset generation orchestrated across models"
          />

          <h1 className="mt-6 font-poppins text-2xl font-semibold">How it works (high level)</h1>
          <p className="mt-4 text-gray-600">
            SoundAI orchestrates multiple specialized models to produce synchronized outputs. A
            routing layer selects model candidates, then execution produces audio waveforms,
            note events (MIDI), and parameter patches for synths/plugins. Outputs are packaged
            with metadata for DAW import and compliance.
          </p>

          <h2 className="mt-8 font-poppins text-xl font-semibold">Infrastructure</h2>
          <p className="mt-3 text-gray-600">
            We leverage cloud inference layers and run-time orchestration; compute providers are
            abstracted (e.g. RunPod). Data and auth are managed via secure, auditable stores such
            as Supabase. Implementation details are intentionally high-level and avoid exposing
            proprietary algorithms.
          </p>

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
