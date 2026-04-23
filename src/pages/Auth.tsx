import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, ArrowUpRight } from "lucide-react";

const providers = [
  {
    label: "Continue with Google",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09A6.96 6.96 0 0 1 5.49 12c0-.73.13-1.43.35-2.09V7.07H2.18A11.95 11.95 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l4.47-2.84-.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    ),
  },
  {
    label: "Continue with Spotify",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path fill="#1DB954" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.38-1.32 9.78-.66 13.5 1.62.36.18.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z" />
      </svg>
    ),
  },
  {
    label: "Continue with Apple",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
    ),
  },
];

function AuthCard({
  title,
  description,
  email,
  setEmail,
  cta,
}: {
  title: string;
  description: string;
  email: string;
  setEmail: (value: string) => void;
  cta: string;
}) {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-dark-deeper">
      <div className="mb-6">
        <h2 className="font-poppins text-2xl font-semibold text-gray-900 dark:text-light-bg">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-light-bg/55">
          {description}
        </p>
      </div>

      <div className="space-y-3">
        {providers.map((provider) => (
          <button
            key={provider.label}
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-light-bg/80 dark:hover:bg-white/10"
          >
            {provider.icon}
            {provider.label}
          </button>
        ))}
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-gray-400 dark:bg-dark-deeper dark:text-light-bg/35">
            or continue with email
          </span>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-light-bg/70">
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-light-bg/35" />
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition-colors focus:border-accent-pink/50 focus:ring-1 focus:ring-accent-pink/20 dark:border-white/10 dark:bg-white/5 dark:text-light-bg dark:placeholder-light-bg/30"
            />
          </div>
        </div>
        <button type="submit" className="btn-primary w-full justify-center py-3">
          {cta}
        </button>
      </form>
    </div>
  );
}

export default function Auth() {
  const [signInEmail, setSignInEmail] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top_left,_rgba(255,60,130,0.16),_transparent_38%),radial-gradient(circle_at_top_right,_rgba(161,231,238,0.24),_transparent_42%)]" />

      <div className="container-max px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-accent-pink dark:text-light-bg/45 dark:hover:text-accent-pink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="max-w-xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-pink">
              Access design
            </div>
            <h1 className="mt-4 font-poppins text-4xl font-semibold leading-tight text-gray-900 dark:text-light-bg sm:text-5xl">
              Dedicated sign in and registration flows for the product launch.
            </h1>
            <p className="mt-5 text-base leading-7 text-gray-500 dark:text-light-bg/55">
              The auth surface is ready as a standalone page with Google, Spotify, Apple,
              and email entry. For now, all main site CTAs still route to the beta waitlist
              while the product is in active development.
            </p>

            <div className="mt-8 rounded-[28px] border border-gray-200 bg-white/80 p-6 backdrop-blur dark:border-white/10 dark:bg-white/5">
              <div className="text-sm font-semibold text-gray-900 dark:text-light-bg">
                Current launch behavior
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-light-bg/55">
                The header button intentionally sends visitors to the coming soon page so they
                can request beta access before full account creation opens.
              </p>
              <Link
                to="/coming-soon"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-pink transition-colors hover:text-accent-cyan"
              >
                Go to Product in Development
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <AuthCard
              title="Sign in"
              description="Return to saved projects, prompt history, and team workspaces."
              email={signInEmail}
              setEmail={setSignInEmail}
              cta="Continue to account"
            />
            <AuthCard
              title="Create account"
              description="Reserve a new workspace for audio generation, MIDI exports, and beta access."
              email={signUpEmail}
              setEmail={setSignUpEmail}
              cta="Create account"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
