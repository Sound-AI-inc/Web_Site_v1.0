import { useMemo, useState, type FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

const INTERFACE_URL =
  (import.meta.env.VITE_INTERFACE_URL as string | undefined)?.replace(/\/$/, "") ??
  "http://127.0.0.1:4173";

export default function Onboarding() {
  const location = useLocation();
  const presetEmail = (location.state as { email?: string } | null)?.email ?? "";
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("Producer");
  const [goal, setGoal] = useState("Generate audio ideas faster");
  const [email] = useState(presetEmail);

  const freeTrialText = useMemo(
    () => "Your 8-day free period starts as soon as this workspace is created.",
    [],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = `${INTERFACE_URL}/app/generator`;
  };

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(62%_42%_at_50%_14%,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.54)_34%,rgba(255,255,255,0)_66%),radial-gradient(46%_36%_at_18%_36%,rgba(161,231,238,0.42)_0%,rgba(161,231,238,0)_68%),radial-gradient(42%_34%_at_84%_38%,rgba(255,60,130,0.18)_0%,rgba(255,60,130,0)_72%),linear-gradient(180deg,#eff3f6_0%,#e7eef6_24%,#c1caf6_48%,#ff98a8_76%,#ff3c82_100%)]">
      <div className="container-max px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Link to="/sign-up" className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-accent-pink">
          <ArrowLeft className="h-4 w-4" />
          Back to Sign Up
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-pink/20 bg-accent-pink/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-pink">
              <Sparkles className="h-3.5 w-3.5" />
              New workspace setup
            </div>
            <h1 className="mt-6 font-poppins text-4xl font-semibold leading-tight text-gray-900 sm:text-5xl">
              Tell us a bit about your SoundAI workspace.
            </h1>
            <p className="mt-5 text-base leading-7 text-gray-600">
              We will use these details later for onboarding defaults, product guidance, and the initial creator experience.
            </p>

            <div className="mt-8 rounded-[28px] border border-gray-200 bg-white/82 p-6 backdrop-blur">
              <div className="text-sm font-semibold text-gray-900">Free access activation</div>
              <p className="mt-2 text-sm leading-6 text-gray-500">{freeTrialText}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[30px] border border-gray-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                <input
                  value={email}
                  readOnly
                  className="w-full rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-500 outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Full name</label>
                <input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                  placeholder="Dmitriy Elat"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-accent-pink/50 focus:ring-1 focus:ring-accent-pink/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Primary role</label>
                <select
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-accent-pink/50 focus:ring-1 focus:ring-accent-pink/20"
                >
                  <option>Producer</option>
                  <option>Artist</option>
                  <option>Composer</option>
                  <option>Developer</option>
                  <option>Team Lead</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Main goal</label>
                <select
                  value={goal}
                  onChange={(event) => setGoal(event.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-accent-pink/50 focus:ring-1 focus:ring-accent-pink/20"
                >
                  <option>Generate audio ideas faster</option>
                  <option>Build MIDI themes</option>
                  <option>Create preset libraries</option>
                  <option>Test AI audio workflows</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-primary mt-6 w-full justify-center py-3">
              Activate free 8-day period
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
