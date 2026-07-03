export interface CreditPackage {
  credits: number;
  price: number;
}

export interface PricingOption {
  id: string;
  label: string;
  price: string;
  cadence: string;
  note?: string;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  highlight?: boolean;
  cta: string;
  creditPackages?: CreditPackage[];
  pricingNote?: string;
  pricingOptions?: PricingOption[];
  proOnly?: boolean;
}

export const plans: Plan[] = [
  {
    id: "trial",
    name: "Free Trial",
    price: "$0",
    cadence: "/7 days",
    description:
      "Get started with 20 free credits for 7 days. Spent credits are restored over the trial period while the subscription is active.",
    features: [
      "20 free credits",
      "Credits restore over 7 days while trial is active",
      "Basic audio generation",
      "MP3 exports",
      "Community support",
    ],
    cta: "Subscribe Now",
  },
  {
    id: "standard",
    name: "Standard",
    price: "$7",
    cadence: "/one-time",
    description:
      "Perfect for new creators. Includes 30 credits, advanced audio generation, WAV exports, and basic library access. Credits reload with timed refills after spend events.",
    features: [
      "30 generation credits",
      "Auto-recharge 30 credits after full spend",
      "Advanced audio editing",
      "WAV exports",
      "Basic sound library access",
      "Email support",
    ],
    highlight: true,
    pricingOptions: [
      { id: "monthly", label: "One-time", price: "$7", cadence: "/one-time" },
      {
        id: "annual",
        label: "Annual",
        price: "$84",
        cadence: "/year",
        note: "12 months of Standard — save vs. monthly top-ups.",
      },
    ],
    cta: "Subscribe Now",
  },
  {
    id: "premium",
    name: "Premium Flex",
    price: "$50",
    cadence: "/month",
    description:
      "Flexible monthly plan — starts at 50 credits/month and scales to 3000. Unlocks full Pro interface.",
    proOnly: true,
    features: [
      "50 generation credits (expandable)",
      "Pro interface unlocked",
      "Advanced AI editing & plugins",
      "All formats (WAV, MIDI, MP3, VST)",
      "Access to full sound library",
      "Priority support",
      "Commercial usage rights",
    ],
    creditPackages: [
      { credits: 50, price: 50 },
      { credits: 100, price: 85 },
      { credits: 500, price: 380 },
      { credits: 1000, price: 700 },
      { credits: 3000, price: 1800 },
    ],
    pricingNote: "Monthly subscription. Prices adjust dynamically based on selected credit package.",
    cta: "Subscribe Now",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    cadence: "pricing",
    description:
      "AI infrastructure for studios, labels, and enterprise partners. Scalable. Secure. Customizable.",
    features: [
      "Dedicated AI cluster / private GPU node",
      "Custom model deployment & training",
      "Multi-user licensing & RBAC",
      "Enterprise-grade security (SOC 2 / GDPR / ISO 27001)",
    ],
    cta: "Contact sales",
  },
];
