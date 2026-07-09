import { Link } from "react-router-dom";

export default function SoundAILogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const imgClass = size === "sm" ? "h-6" : size === "lg" ? "h-9" : "h-7";
  const textClass =
    size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-lg";

  return (
    <span className="inline-flex items-center gap-2.5">
      <img
        src="/logo SoundAI v1.5 (1).svg"
        alt=""
        aria-hidden
        className={`${imgClass} w-auto soundai-logo-mark`}
      />
      <span className={`font-poppins font-semibold tracking-tight text-text ${textClass}`}>SoundAI</span>
    </span>
  );
}

export function SoundAILogoLink({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <Link to="/" className="inline-flex items-center" aria-label="SoundAI home">
      <SoundAILogo size={size} />
    </Link>
  );
}
