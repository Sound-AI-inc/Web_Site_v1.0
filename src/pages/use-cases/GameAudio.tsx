import SectionHeading from "./../../components/SectionHeading";
import { Link } from "react-router-dom";

export default function GameAudio() {
  return (
    <main>
      <section className="section-padding">
        <div className="container-max">
          <SectionHeading
            badge="Use Case"
            title="Game Audio"
            subtitle="Adaptive, runtime-friendly asset pipelines"
          />

          <h1 className="mt-6 font-poppins text-2xl font-semibold">Workflow preview</h1>
          <ol className="mt-4 list-inside list-decimal text-gray-600">
            <li>Generate loopable stems and MIDI events optimized for runtime.</li>
            <li>Attach metadata for adaptive playback and versioning.</li>
            <li>Export engine-ready assets and integration references.</li>
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
