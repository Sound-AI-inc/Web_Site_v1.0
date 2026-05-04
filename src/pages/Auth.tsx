import { useMemo, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, ArrowUpRight, LockKeyhole } from "lucide-react";

const INTERFACE_URL =
  (import.meta.env.VITE_INTERFACE_URL as string | undefined)?.replace(/\/$/, "") ??
  "http://127.0.0.1:4173";

const providers = [
  { label: "Continue with Google" },
  { label: "Continue with Spotify" },
  { label: "Continue with Apple" },
];

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignUp = location.pathname === "/sign-up";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const copy = useMemo(
    () =>
      isSignUp
        ? {
            eyebrow: "Create your workspace",
            title: "Sign up for SoundAI",
            description:
              "Create an account to unlock your SoundAI workspace. After registration we'll collect a few details and activate an 8-day free period.",
            cta: "Continue to onboarding",
            switchText: "Already have an account?",
            switchLink: "/sign-in",
            switchLabel: "Sign in",
          }
        : {
            eyebrow: "Welcome back",
            title: "Sign in to SoundAI",
            description:
              "Access saved generations, prompt history, and the current SoundAI interface.",
            cta: "Sign in",
            switchText: "Need an account?",
            switchLink: "/sign-up",
            switchLabel: "Sign up",
          },
    [isSignUp],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    if (isSignUp) {
      navigate("/welcome", { state: { email: email.trim() } });
      return;
    }
    window.location.href = `${INTERFACE_URL}/app/generator`;
  };

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(62%_42%_at_50%_14%,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.54)_34%,rgba(255,255,255,0)_66%),radial-gradient(46%_36%_at_18%_36%,rgba(161,231,238,0.42)_0%,rgba(161,231,238,0)_68%),radial-gradient(42%_34%_at_84%_38%,rgba(255,60,130,0.18)_0%,rgba(255,60,130,0)_72%),linear-gradient(180deg,#eff3f6_0%,#e7eef6_24%,#c1caf6_48%,#ff98a8_76%,#ff3c82_100%)]">
      <div className="container-max px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-accent-pink">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="max-w-xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-pink">
              {copy.eyebrow}
            </div>
            <h1 className="mt-4 font-poppins text-4xl font-semibold leading-tight text-gray-900 sm:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-5 text-base leading-7 text-gray-600">
              {copy.description}
            </p>

            <div className="mt-8 rounded-[28px] border border-gray-200 bg-white/82 p-6 backdrop-blur">
              <div className="text-sm font-semibold text-gray-900">
                SoundAI access flow
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Sign in sends returning users straight into the interface. Sign up continues to an onboarding form where we prepare the initial workspace and free trial.
              </p>
              <Link
                to="/products/users"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-pink transition-colors hover:text-accent-cyan"
              >
                Explore creator workflow
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-[30px] border border-gray-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="mb-6">
              <h2 className="font-poppins text-2xl font-semibold text-gray-900">{copy.title}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                {copy.switchText}{" "}
                <Link to={copy.switchLink} className="font-semibold text-accent-pink hover:text-accent-cyan">
                  {copy.switchLabel}
                </Link>
              </p>
            </div>

            <div className="space-y-3">
              {providers.map((provider) => (
                <button
                  key={provider.label}
                  type="button"
                  className="flex w-full items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-white"
                >
                  {provider.label}
                </button>
              ))}
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-gray-400">or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition-colors focus:border-accent-pink/50 focus:ring-1 focus:ring-accent-pink/20"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder={isSignUp ? "Create a password" : "Enter your password"}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition-colors focus:border-accent-pink/50 focus:ring-1 focus:ring-accent-pink/20"
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full justify-center py-3">
                {copy.cta}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
