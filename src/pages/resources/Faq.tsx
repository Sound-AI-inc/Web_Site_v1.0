import { useState } from "react";
import SectionHeading from "../../components/SectionHeading";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What audio formats does SoundAI support?",
    a: "SoundAI supports WAV, FLAC, and MP3 for audio, standard MIDI (.mid) for patterns, and common preset formats such as FXP and VST3 Preset. Optional JSON project data can also be returned when a workflow needs it.",
  },
  {
    q: "Which DAWs are compatible with SoundAI?",
    a: "SoundAI supports Ableton Live, FL Studio, Logic Pro, Pro Tools, and any DAW that accepts standard WAV, MIDI, and VST or AU preset formats.",
  },
  {
    q: "Can I edit the generated assets?",
    a: "Yes. MIDI patterns can be rearranged, audio can be sliced and processed, and presets can be tweaked further inside your plugin chain.",
  },
  {
    q: "Who owns the generated assets?",
    a: "You retain full ownership and usage rights to the assets generated through your SoundAI account, subject to the product terms.",
  },
  {
    q: "Does SoundAI generate full songs or complete tracks?",
    a: "No. SoundAI focuses on modular production assets such as samples, MIDI patterns, and presets so you keep more creative control inside your own arrangement workflow.",
  },
  {
    q: "How does SoundAI handle copyright compliance?",
    a: "SoundAI is designed around licensed and proprietary training inputs plus clearer asset provenance. The modular workflow also reduces some of the ambiguity associated with full AI-generated songs.",
  },
  {
    q: "Is there an enterprise plan?",
    a: "Yes. Enterprise plans can include custom model work, dedicated infrastructure, SSO, volume licensing, and priority support.",
  },
  {
    q: "How does pricing work?",
    a: "SoundAI offers tiered plans with generation credits plus usage-based access for API customers. Refer to the pricing page for current plan details.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding waveform-bg relative overflow-hidden">
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-accent-cyan/10 blur-3xl" />
      <div className="container-max relative z-10">
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Common questions about SoundAI's capabilities, formats, ownership, and compliance."
        />

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.q}
              className={`card cursor-pointer transition-all ${openIndex === index ? "border-accent-pink/20" : ""}`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-poppins text-sm font-semibold md:text-base">{faq.q}</h3>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-accent-pink transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                />
              </div>
              {openIndex === index && (
                <p className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-light-bg/50">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
