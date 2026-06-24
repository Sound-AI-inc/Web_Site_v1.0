import SectionHeading from "./../../components/SectionHeading";
import { Link } from "react-router-dom";

export default function SoundDesign() {
  return (
    <main>
      <section className="section-padding">
        <div className="container-max">
          <SectionHeading
            badge="Use Case"
            title="Sound Designers"
            subtitle="Preset and sample pipelines for creative sound design"
          />

          <h1 className="mt-6 font-poppins text-2xl font-semibold">Workflow preview</h1>
          <ol className="mt-4 list-inside list-decimal text-gray-600">
            <li>Generate targeted textures and presets from descriptive prompts.</li>
            <li>Refine parameters and export plugin-ready presets.</li>
            <li>Deliver sample packs and patches with embedded metadata.</li>
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
