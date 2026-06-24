export type SoundAIComponent = "SoundCraft" | "MidiCraft" | "VSTCraft" | "Infrastructure";
export type ModelTier = "lite" | "pro";
export type ModelProvider = "huggingface" | "github" | "internal";
export type ModelInputType = "text" | "midi" | "audio";
export type ModelOutputType = "audio" | "midi" | "preset";
export type ModelLicense =
  | "MIT"
  | "Apache-2.0"
  | "CC-BY-NC-4.0"
  | "CC-BY-SA-4.0"
  | "Research"
  | "Proprietary";

export type UserPlan = "free" | "premium" | "enterprise";

export type ModelConfig = {
  id: string;
  component: SoundAIComponent;
  tier: ModelTier;
  provider: ModelProvider;
  input_type: ModelInputType;
  output_type: ModelOutputType;
  endpoint?: string;
  license: ModelLicense;
  commercial_use: boolean;
};

export type DatasetConfig = {
  name: string;
  source: string;
  type: "audio" | "midi" | "multimodal";
  license: string;
  applicable_models: string[];
  usage: "training" | "conditioning";
};

export type GenerationResult = {
  type: ModelOutputType;
  data: string;
  metadata: {
    bpm?: number;
    key?: string;
    duration?: number;
    model_used: string;
    component: string;
    license: string;
    commercial_use: boolean;
  };
};

export type SoundAIUser = {
  id: string;
  plan: UserPlan;
};

export type GenerationRequest = {
  prompt: string;
  component: SoundAIComponent;
  mode?: ModelTier;
  model_id?: string;
  input_type?: ModelInputType;
  output_type?: ModelOutputType;
  dataset?: string;
  commercial_intent?: boolean;
  metadata?: {
    bpm?: number;
    key?: string;
    duration?: number;
  };
};

export type ComplianceResult = {
  allowed: boolean;
  usage_restriction: string;
  output_label: string;
};

export type GenerationLogEvent = {
  user_id: string;
  model_id: string;
  component: SoundAIComponent;
  tier: ModelTier;
  latency_ms: number;
  token_usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
  error?: string;
  metadata?: Record<string, unknown>;
};

export type RouteGenerationOptions = {
  hfApiToken?: string;
  hfEndpointBaseUrl?: string;
  proEndpointBaseUrl?: string;
  timeoutMs?: number;
  retries?: number;
  logEvent?: (event: GenerationLogEvent) => Promise<void>;
};

export type RoutedGenerationResponse = {
  result: GenerationResult;
  compliance: ComplianceResult;
  model: ModelConfig;
  dataset?: DatasetConfig;
  fallback_used: boolean;
};
