import type { GenerationRequest, GenerationResult, ModelConfig } from "../types";
import { formatGenerationResult } from "../outputFormatter";

type ProOptions = {
  endpointBaseUrl?: string;
  timeoutMs?: number;
};

function mockProData(modelConfig: ModelConfig): string {
  if (modelConfig.output_type === "audio") return "soundai-pro://placeholder/audio";
  if (modelConfig.output_type === "midi") return "soundai-pro://placeholder/midi";
  return "soundai-pro://placeholder/preset";
}

export async function generateWithPro(
  modelConfig: ModelConfig,
  prompt: string,
  request: GenerationRequest,
  options: ProOptions = {},
): Promise<GenerationResult> {
  if (modelConfig.provider !== "internal") {
    throw new Error(`Model ${modelConfig.id} is not an internal Pro model.`);
  }

  const baseUrl = options.endpointBaseUrl?.replace(/\/$/, "");
  if (!baseUrl) {
    return formatGenerationResult(modelConfig, mockProData(modelConfig), request);
  }

  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), options.timeoutMs ?? 30_000);

  try {
    const response = await fetch(`${baseUrl}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model_id: modelConfig.id,
        component: modelConfig.component,
        prompt,
        output_type: modelConfig.output_type,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Internal Pro endpoint returned HTTP ${response.status}`);
    }

    const payload = (await response.json()) as { data?: string; metadata?: Partial<GenerationResult["metadata"]> };
    return formatGenerationResult(modelConfig, payload.data ?? mockProData(modelConfig), request, payload.metadata);
  } finally {
    globalThis.clearTimeout(timeout);
  }
}
