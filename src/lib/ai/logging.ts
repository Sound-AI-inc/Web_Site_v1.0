import type { GenerationLogEvent } from "./types";

type SupabaseInsertClient = {
  from: (table: string) => {
    insert: (values: Record<string, unknown>) => PromiseLike<{ error: { message: string } | null }>;
  };
};

export async function logGenerationEvent(
  supabase: SupabaseInsertClient | null,
  event: GenerationLogEvent,
): Promise<void> {
  if (!supabase) return;

  const { error } = await supabase.from("generation_logs").insert({
    user_id: event.user_id,
    model_id: event.model_id,
    component: event.component,
    tier: event.tier,
    latency_ms: event.latency_ms,
    token_usage: event.token_usage ?? null,
    error: event.error ?? null,
    metadata: event.metadata ?? {},
  });

  if (error) {
    throw new Error(`Failed to write generation log: ${error.message}`);
  }
}
