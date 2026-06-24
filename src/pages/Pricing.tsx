import SectionHeading from "./../components/SectionHeading";
import { Link } from "react-router-dom";

export default function Pricing() {
  return (
    <main>
      <section className="section-padding">
        <div className="container-max">
          <SectionHeading
            badge="Pricing"
            title="Access tiers and limits"
            subtitle="Credits, workflow access, and asset limits — presented plainly"
          />

          <h1 className="mt-6 font-poppins text-2xl font-semibold">Tier overview</h1>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="card">
              <h3 className="font-poppins text-lg font-semibold">Free</h3>
              <p className="text-sm text-gray-600">Limited testing tier: small number of credits, lower quality models.</p>
            </div>
            <div className="card">
              <h3 className="font-poppins text-lg font-semibold">Lite</h3>
              <p className="text-sm text-gray-600">Subscription for individual creators: more credits, access to higher-quality models.</p>
            </div>
            <div className="card">
              <h3 className="font-poppins text-lg font-semibold">Pro</h3>
              <p className="text-sm text-gray-600">Workspace access, team features, priority compute, and expanded asset limits.</p>
            </div>
          </div>

          <div className="mt-8">
            <Link to="/waitlist" className="btn-primary">
              Request Access / Join Waitlist
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
