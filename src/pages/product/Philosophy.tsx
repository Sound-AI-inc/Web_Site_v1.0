import SectionHeading from "../../components/SectionHeading";
import { Link } from "react-router-dom";

export default function ProductPhilosophy() {
  return (
    <main>
      <section className="section-padding">
        <div className="container-max">
          <SectionHeading
            badge="Product"
            title="Modular generation philosophy"
            subtitle="Asset-first, DAW-native, production-grade outputs"
          />

          <h1 className="mt-6 font-poppins text-2xl font-semibold">What SoundAI is</h1>
          <p className="mt-4 text-gray-600">
            SoundAI treats audio, MIDI, and plugin presets as first-class assets — generated,
            editable, and exportable into professional DAW workflows. We prioritize interoperability
            with existing production tools and an asset-based approach rather than full-track
            generation.
          </p>

          <h2 className="mt-8 font-poppins text-xl font-semibold">Why modular matters</h2>
          <p className="mt-3 text-gray-600">
            Modular outputs enable producers and teams to iterate on parts, swap models, and
            maintain provenance. This philosophy aligns with DAW-native thinking and product
            integration patterns used by studios and partners.
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
