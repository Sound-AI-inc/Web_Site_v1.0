import type { GenerationRequest, GenerationResult, ModelConfig } from "../types";
import { formatGenerationResult } from "../outputFormatter";

export async function generateWithGithubMidi(
  modelConfig: ModelConfig,
  request: GenerationRequest,
): Promise<GenerationResult> {
  if (modelConfig.provider !== "github") {
    throw new Error(`Model ${modelConfig.id} is not a GitHub-hosted MIDI model.`);
  }

  const encodedPrompt = btoa(unescape(encodeURIComponent(request.prompt)));
  return formatGenerationResult(modelConfig, `data:audio/midi;base64,${encodedPrompt}`, request);
}
