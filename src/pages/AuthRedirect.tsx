import { Link } from "react-router-dom";
import { Hammer } from "lucide-react";

export default function AuthRedirect() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Hammer className="h-6 w-6" />
        </div>
        <h1 className="mt-4 font-poppins text-3xl font-semibold text-text">Workspace in development</h1>
        <p className="mt-3 font-codec text-sm leading-6 text-text/65">
          Sign-in and workspace access are not open yet. Follow the developing process or join Early Access.
        </p>
        <Link to="/developing-process" className="btn-primary mt-6 inline-flex">
          View developing process
        </Link>
      </div>
    </section>
  );
}
