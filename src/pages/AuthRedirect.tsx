import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const INTERFACE_URL =
  (import.meta.env.VITE_INTERFACE_URL as string | undefined)?.replace(/\/$/, "") ??
  "http://127.0.0.1:4173";

function targetPath(pathname: string): string {
  if (pathname === "/sign-in") return "/sign-in";
  return "/sign-up";
}

export default function AuthRedirect() {
  const { pathname } = useLocation();
  const target = `${INTERFACE_URL}${targetPath(pathname)}`;

  useEffect(() => {
    window.location.replace(target);
  }, [target]);

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="font-poppins text-3xl font-semibold text-gray-950">Opening SoundAI OAuth</h1>
        <p className="mt-3 text-sm leading-6 text-gray-500">
          Registration now lives inside the SoundAI interface. You will be redirected automatically.
        </p>
        <a href={target} className="btn-primary mt-6">
          Continue to OAuth
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
