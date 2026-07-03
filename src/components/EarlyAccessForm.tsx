import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  submitEarlyAccess,
  type EarlyAccessPayload,
  type InterestedPlan,
  type RoleType,
} from "../lib/earlyAccessService";
import { supabaseConfigured } from "../lib/supabase";
import { trackEvent } from "../lib/analytics";

const PLANS: { value: InterestedPlan; label: string }[] = [
  { value: "free", label: "Free" },
  { value: "lite", label: "Lite" },
  { value: "pro", label: "Pro" },
  { value: "enterprise", label: "Enterprise" },
];

const ROLES: { value: RoleType; label: string }[] = [
  { value: "producer", label: "Producer / Creator" },
  { value: "developer", label: "Developer" },
  { value: "investor", label: "Investor" },
  { value: "creator", label: "Content Creator" },
];

interface EarlyAccessFormProps {
  compact?: boolean;
}

export default function EarlyAccessForm({ compact = false }: EarlyAccessFormProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<EarlyAccessPayload>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    profession: "",
    musicExperience: "",
    discoverySource: "",
    interestedPlan: "free",
    roleType: "producer",
    consent: false,
    newsletter: false,
  });

  const update = <K extends keyof EarlyAccessPayload>(key: K, value: EarlyAccessPayload[K]) => {
    setForm((prev: EarlyAccessPayload) => ({ ...prev, [key]: value }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.consent) {
      setError("Please accept the privacy policy to join Early Access.");
      return;
    }

    setLoading(true);
    const result = await submitEarlyAccess(form);
    setLoading(false);

    if (!result.ok) {
      setError(result.error ?? "Something went wrong. Please try again.");
      return;
    }

    trackEvent("early_access_signup", {
      plan: form.interestedPlan,
      role: form.roleType,
      source: form.discoverySource,
    });
    navigate("/thank-you", { state: { email: form.email } });
  }

  const inputClass =
    "w-full rounded-xl border border-text/10 bg-white/80 px-4 py-3 text-sm font-codec text-text placeholder:text-text/35 backdrop-blur-sm transition focus:border-primary/40 focus:outline-none focus:ring-4 focus:ring-primary/10";

  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-4" : "space-y-5"}>
      {!supabaseConfigured() && (
        <p className="rounded-xl border border-accent-light/40 bg-accent-light/10 px-4 py-3 text-xs font-codec text-text/70">
          Supabase is not configured locally. Submissions are stored in your browser until production env vars are set.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-xs font-poppins font-medium uppercase tracking-wider text-text/50">First name</span>
          <input required className={inputClass} value={form.firstName} onChange={(e) => update("firstName", e.target.value)} />
        </label>
        <label className="block space-y-1.5">
          <span className="text-xs font-poppins font-medium uppercase tracking-wider text-text/50">Last name</span>
          <input required className={inputClass} value={form.lastName} onChange={(e) => update("lastName", e.target.value)} />
        </label>
      </div>

      <label className="block space-y-1.5">
        <span className="text-xs font-poppins font-medium uppercase tracking-wider text-text/50">Email</span>
        <input required type="email" className={inputClass} value={form.email} onChange={(e) => update("email", e.target.value)} />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-xs font-poppins font-medium uppercase tracking-wider text-text/50">Country</span>
          <input required className={inputClass} value={form.country} onChange={(e) => update("country", e.target.value)} />
        </label>
        <label className="block space-y-1.5">
          <span className="text-xs font-poppins font-medium uppercase tracking-wider text-text/50">Profession</span>
          <input required className={inputClass} value={form.profession} onChange={(e) => update("profession", e.target.value)} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-xs font-poppins font-medium uppercase tracking-wider text-text/50">Music experience</span>
          <select required className={inputClass} value={form.musicExperience} onChange={(e) => update("musicExperience", e.target.value)}>
            <option value="">Select level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="professional">Professional</option>
            <option value="studio">Studio / Enterprise</option>
          </select>
        </label>
        <label className="block space-y-1.5">
          <span className="text-xs font-poppins font-medium uppercase tracking-wider text-text/50">Your role</span>
          <select required className={inputClass} value={form.roleType} onChange={(e) => update("roleType", e.target.value as RoleType)}>
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block space-y-1.5">
        <span className="text-xs font-poppins font-medium uppercase tracking-wider text-text/50">How did you hear about SoundAI?</span>
        <input required className={inputClass} value={form.discoverySource} onChange={(e) => update("discoverySource", e.target.value)} />
      </label>

      <fieldset className="space-y-2">
        <legend className="text-xs font-poppins font-medium uppercase tracking-wider text-text/50">Interested plan</legend>
        <div className="flex flex-wrap gap-2">
          {PLANS.map((plan) => (
            <label
              key={plan.value}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-codec transition ${
                form.interestedPlan === plan.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-text/10 bg-white/60 text-text/70 hover:border-primary/30"
              }`}
            >
              <input
                type="radio"
                name="plan"
                className="sr-only"
                checked={form.interestedPlan === plan.value}
                onChange={() => update("interestedPlan", plan.value)}
              />
              {plan.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-3">
        <label className="flex items-start gap-3 text-sm font-codec text-text/75">
          <input required type="checkbox" className="mt-1 accent-primary" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} />
          <span>I agree to the processing of my data per the SoundAI Privacy Policy and consent to Early Access communications.</span>
        </label>
        <label className="flex items-start gap-3 text-sm font-codec text-text/75">
          <input type="checkbox" className="mt-1 accent-primary" checked={form.newsletter} onChange={(e) => update("newsletter", e.target.checked)} />
          <span>Subscribe to the SoundAI newsletter for product updates.</span>
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto disabled:opacity-60">
        {loading ? "Submitting…" : "Join Early Access"}
      </button>
    </form>
  );
}
