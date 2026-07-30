/**
 * Deploy from repository root with an explicit Wrangler config path.
 * Use as Cloudflare "Deploy command": npm run deploy
 */
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(root);

const config = join(root, "wrangler.jsonc");
if (!existsSync(config)) {
  console.error(`[cloudflare] missing config: ${config}`);
  process.exit(1);
}

function run(cmd) {
  console.log(`[cloudflare] ${cmd}`);
  execSync(cmd, { stdio: "inherit", cwd: root, env: process.env });
}

run("npm run build");
run("npx wrangler deploy --config wrangler.jsonc");
