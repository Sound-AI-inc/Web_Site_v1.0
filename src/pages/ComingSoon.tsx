import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bell, Mail, Rocket, Sparkles } from "lucide-react";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,60,130,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(161,231,238,0.28),_transparent_32%)]" />

      <div className="container-max relative px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-accent-pink dark:text-light-bg/45 dark:hover:text-accent-pink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-pink/20 bg-accent-pink/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-pink">
              <Sparkles className="h-3.5 w-3.5" />
              Product in development
            </div>

            <h1 className="mt-6 font-poppins text-4xl font-semibold leading-tight text-gray-900 dark:text-light-bg sm:text-5xl lg:text-6xl">
              SoundAI is being shaped for the first beta cohort.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-500 dark:text-light-bg/55">
              Registration and login surfaces are designed, but public access is still gated.
              For now, site CTAs route here so interested users can request beta testing access.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["Text-to-audio generation", "In progress"],
                ["MIDI and preset export", "Next up"],
                ["DAW and platform integrations", "Planned"],
              ].map(([label, status]) => (
                <div
                  key={label}
                  className="rounded-[24px] border border-gray-200 bg-white/80 p-5 backdrop-blur dark:border-white/10 dark:bg-white/5"
                >
                  <div className="text-sm font-semibold text-gray-900 dark:text-light-bg">{label}</div>
                  <div className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-accent-pink">
                    {status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-dark-deeper">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-pink/20 to-accent-cyan/20">
              <Rocket className="h-7 w-7 text-accent-pink" />
            </div>

            <h2 className="font-poppins text-2xl font-semibold text-gray-900 dark:text-light-bg">
              Request beta testing
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-light-bg/55">
              Leave an email and we will contact you when the first wave of access opens.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-light-bg/70">
                    Work email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-light-bg/35" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="name@company.com"
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition-colors focus:border-accent-pink/50 focus:ring-1 focus:ring-accent-pink/20 dark:border-white/10 dark:bg-white/5 dark:text-light-bg dark:placeholder-light-bg/30"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full justify-center py-3">
                  <Bell className="mr-2 h-4 w-4" />
                  Request beta access
                </button>
              </form>
            ) : (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 dark:border-emerald-400/20 dark:bg-emerald-400/10">
                <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  Beta request received
                </div>
                <div className="mt-1 text-sm text-emerald-700/80 dark:text-emerald-200/80">
                  We will reach out to {email} as soon as the next testing wave opens.
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
