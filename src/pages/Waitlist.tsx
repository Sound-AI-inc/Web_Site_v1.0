import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("producer");
  const [source, setSource] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // For now, store to localStorage as a placeholder for server submission
    const payload = { email, role, source, createdAt: new Date().toISOString() };
    const key = `waitlist:${email}:${Date.now()}`;
    localStorage.setItem(key, JSON.stringify(payload));
    navigate("/thank-you");
  }

  return (
    <main>
      <section className="section-padding">
        <div className="container-max">
          <h1 className="font-poppins text-3xl font-semibold">Join the SoundAI waitlist</h1>
          <p className="mt-3 text-gray-600">Select your role so we can route invites and product updates.</p>

          <form onSubmit={handleSubmit} className="mt-6 max-w-md">
            <label className="block">
              <div className="text-sm font-semibold">Email</div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-md border px-3 py-2"
              />
            </label>

            <label className="mt-4 block">
              <div className="text-sm font-semibold">Role</div>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-2 w-full rounded-md border px-3 py-2">
                <option value="producer">Producer</option>
                <option value="sound-designer">Sound Designer</option>
                <option value="game-audio">Game Audio</option>
                <option value="developer">Developer / Integrator</option>
                <option value="investor">Investor</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label className="mt-4 block">
              <div className="text-sm font-semibold">How did you hear about us?</div>
              <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="Optional" className="mt-2 w-full rounded-md border px-3 py-2" />
            </label>

            <div className="mt-6 flex gap-3">
              <button type="submit" className="btn-primary">Join Waitlist</button>
              <button type="button" onClick={() => navigate(-1)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
