import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <main>
      <section className="section-padding">
        <div className="container-max text-center">
          <h1 className="font-poppins text-3xl font-semibold">Thank you</h1>
          <p className="mt-3 text-gray-600">We've received your request. We'll be in touch with next steps.</p>
          <div className="mt-6">
            <Link to="/" className="btn-secondary">Return to site</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
