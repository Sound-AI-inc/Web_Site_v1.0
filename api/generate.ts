import type { IncomingMessage, ServerResponse } from "node:http";
import { createClient } from "@supabase/supabase-js";
import { logGenerationEvent } from "../src/lib/ai/logging";
import { routeGenerationRequest, type GenerationRequest, type SoundAIUser } from "../src/lib/ai/router";
import { readJson } from "./_lib/readJson";

type GenerateApiRequest = {
  user: SoundAIUser;
  request: GenerationRequest;
};

function json(response: ServerResponse, statusCode: number, body: unknown): void {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(body));
}

function getServerSupabase() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) return null;
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default async function handler(request: IncomingMessage, response: ServerResponse): Promise<void> {
  if (request.method !== "POST") {
    json(response, 405, { error: "Method not allowed" });
    return;
  }

  try {
    const payload = await readJson<GenerateApiRequest>(request);
    if (!payload.user?.id || !payload.user.plan || !payload.request?.prompt) {
      json(response, 400, { error: "user.id, user.plan, and request.prompt are required" });
      return;
    }

    const supabase = getServerSupabase();
    const routed = await routeGenerationRequest(payload.user, payload.request, {
      hfApiToken: process.env.HUGGINGFACE_API_TOKEN,
      hfEndpointBaseUrl: process.env.HUGGINGFACE_INFERENCE_BASE_URL,
      proEndpointBaseUrl: process.env.SOUNDAI_INTERNAL_INFERENCE_URL,
      timeoutMs: Number(process.env.AI_INFERENCE_TIMEOUT_MS ?? 60000),
      retries: Number(process.env.AI_INFERENCE_RETRIES ?? 2),
      logEvent: (event) => logGenerationEvent(supabase, event),
    });

    json(response, 200, routed);
  } catch (error) {
    json(response, 500, {
      error: error instanceof Error ? error.message : "Unknown generation error",
    });
  }
}
