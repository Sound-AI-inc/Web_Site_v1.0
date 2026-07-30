/**
 * Cloudflare Workers Builds sometimes run `wrangler versions upload` from the
 * build output directory (./dist) instead of the repo root. Without a config
 * file there, Wrangler reports "Missing entry-point to Worker script or to
 * assets directory". This script writes a dist-local wrangler.jsonc that
 * points back to the Worker entry and treats dist as the assets directory.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(root, "dist");

const distConfig = {
  $schema: "../node_modules/wrangler/config-schema.json",
  name: "website",
  main: "../worker/src/index.ts",
  compatibility_date: "2024-11-01",
  workers_dev: true,
  assets: {
    directory: ".",
    binding: "ASSETS",
    not_found_handling: "single-page-application",
    run_worker_first: ["/early-access*", "/api/early-access*"],
  },
  vars: {
    SUPABASE_URL: "https://xnjugeewwjclgsaynthi.supabase.co",
    ALLOWED_ORIGINS:
      "https://web-site-v1-0.vercel.app,https://website.soundai-inc.workers.dev,http://localhost:5173,http://127.0.0.1:5173",
  },
  observability: {
    logs: { enabled: true, invocation_logs: true },
    traces: { enabled: false },
  },
};

mkdirSync(distDir, { recursive: true });
writeFileSync(join(distDir, "wrangler.jsonc"), `${JSON.stringify(distConfig, null, 2)}\n`, "utf8");
console.log("[cloudflare] wrote dist/wrangler.jsonc for output-directory deploys");
