# Cloudflare deployment configuration audit

**Date:** 2026-07-30  
**Error observed:** `Missing entry-point to Worker script or to assets directory`  
**Scope:** Infrastructure / Wrangler / CI only (no application code changes in this fix)

---

## 1. Intended architecture (from repository evidence)

| Signal | Location | Conclusion |
|--------|----------|------------|
| `wrangler.toml` with `main` + `[assets]` | Repo root | **Worker + static assets** (single Worker script + Vite `dist/`) |
| `worker/src/index.ts` | Early Access API | Worker runs before assets on `/early-access*` |
| `deploy:worker` → `npm run build && wrangler deploy` | `package.json` | Deploy target is **Cloudflare Workers**, not Pages-only |
| `workers_dev = true`, worker name `website` | `wrangler.toml` | `*.workers.dev` host (e.g. `website.soundai-inc.workers.dev`) |
| `api/early-access.ts` | Vercel serverless | **Separate** path for `web-site-v1-0.vercel.app` |
| No `functions/`, no `_routes.json`, no `pages_build_output_dir` | Repo | **Not** Cloudflare Pages Functions layout |
| No `.github/workflows` in repo | — | Deploy is driven by **Cloudflare dashboard** (Workers Builds / Git integration), not GitHub Actions in-repo |

**Verdict:** This project is intended to deploy as **Static assets + Worker** via **`wrangler deploy`**, not as a pure Cloudflare Pages static site and not as Pages + Functions.

---

## 2. Configuration inventory

| File | Present | Role |
|------|---------|------|
| `wrangler.jsonc` | **Yes** | Primary config for Wrangler 4 CI (`versions upload` / `deploy`) |
| `wrangler.toml` | Yes | Mirror of jsonc for local tooling |
| `package.json` | Yes | `build` → `tsc -b && vite build`; `deploy:worker` runs build then deploy |
| `vite.config.ts` | Yes | Standard Vite; default output **`dist/`** (no custom `outDir`) |
| `dist/` | Gitignored | Must be produced **during CI build** before `wrangler deploy` |
| `worker/src/index.ts` | Yes | Worker entry (tracked in git) |
| Cloudflare Pages config in repo | **No** | Any Pages settings exist only in the Cloudflare dashboard |

---

## 3. What Wrangler expects (this repo)

Both are defined in `wrangler.toml` (valid for Wrangler 4.x):

```toml
main = "worker/src/index.ts"

[assets]
directory = "./dist"
binding = "ASSETS"
```

- **`main`:** TypeScript Worker bundle (Early Access API + asset fetcher).
- **`[assets].directory`:** Must exist on disk at deploy time (Vite build output).

`pages_build_output_dir` is for **Cloudflare Pages**-oriented Wrangler configs. This repo does **not** use that model; adding it without switching to Pages would be the wrong architecture.

---

## 4. Why Wrangler reports “Missing entry-point…”

Wrangler emits this when it **cannot resolve either**:

1. A Worker entry (`main` or CLI path), **and**
2. An assets directory (`[assets].directory` or `--assets=./dist`),

**from the current working directory / config file location.**

Local verification (repo root, after `npm run build`):

```bash
npx wrangler@4 deploy --dry-run
```

→ Succeeds: reads 71 files from `./dist`, bundles `worker/src/index.ts`.

So **`wrangler.toml` content is correct** when:

- CWD = repository root (where `wrangler.toml` lives), and  
- `./dist` exists (post-build), and  
- `./worker/src/index.ts` exists.

### Most likely CI/dashboard causes (in order)

1. **Wrong “Root directory” in Cloudflare Build settings**  
   If root is set to a monorepo path (e.g. `Frontend/soundai-website_v1.6`) but this GitHub repo **is already** the site root (`Web_Site_v1.0`), Wrangler runs in a folder **without** `wrangler.toml` / `worker/` → missing entry-point.

2. **`wrangler deploy` without a prior build**  
   `dist/` is gitignored. If CI runs only `npx wrangler deploy` (no `npm run build`), `./dist` is missing. Depending on Wrangler version and flags, that can surface as the combined “missing entry-point or assets directory” error.

3. **Cloudflare Pages project using Workers deploy command**  
   Pages preset “Vite” + output `dist` is correct for **static Pages**. Adding **`wrangler deploy`** on a Pages project **without** a Wrangler config at that root causes the same error. This repo should use **Workers** (Git-connected Worker + assets), not Pages-only upload, for `website.soundai-inc.workers.dev`.

4. **Deploy command not using repo root**  
   Custom deploy scripts must run from the directory containing `wrangler.toml`, or pass `--config=/path/to/wrangler.toml`.

---

## 5. Which configuration is “incorrect”?

| Layer | Status |
|-------|--------|
| `wrangler.toml` (`main` + `[assets]`) | **Correct** for Static + Worker model |
| Vite → `dist/` | **Correct** |
| `package.json` `deploy:worker` | **Correct** locally; CI must invoke equivalent |
| Cloudflare dashboard (root dir, build, deploy command) | **Likely incorrect** — not stored in git; must be aligned manually |
| Missing `[build]` in `wrangler.toml` | **Gap** for Workers Builds (build may not run before deploy) |
| `wrangler` not in `devDependencies` | **Gap** — CI relies on floating `npx wrangler@4` |

Application code, auth, routing, and UI are **not** the cause of this error.

---

## 6. Deployment model to use

**Use:** Cloudflare **Workers** with **static assets** (current `wrangler.toml` design).

**Do not use for this hostname/API:**

- Cloudflare **Pages-only** static deploy (no Worker → POST `/early-access` breaks), or  
- `wrangler pages deploy ./dist` without the Worker script (same breakage).

**Keep Vercel** for the marketing deploy that uses `api/early-access.ts` if that remains in use.

---

## 7. Minimal configuration changes (applied in repo)

1. **`wrangler.toml`** — add `[build] command = "npm run build"` so Workers Builds always creates `dist/` before deploy.
2. **`package.json`** — pin `wrangler` as a devDependency; add `"deploy": "npm run deploy:worker"` for dashboard commands that call `npm run deploy`.
3. **Dashboard (manual)** — set **Root directory** to `/` (empty), **Build** aligned with `npm run build`, deploy via Worker + `wrangler.toml` (not Pages-only).

---

## 8. Cloudflare dashboard checklist

- [ ] Project type: **Worker** (with static assets), name `website`
- [ ] **Root directory:** empty (repo root) — **not** `Frontend/...` unless the repo layout changes
- [ ] **Build command:** `npm run build` (or rely on `[build]` in `wrangler.toml`)
- [ ] **Deploy:** Wrangler deploy using root `wrangler.toml` (not `wrangler pages deploy ./dist` alone)
- [ ] **Do not** use Pages “output directory only” for the Worker hostname if API routes are required
- [ ] Secrets: `SUPABASE_SERVICE_ROLE_KEY`, `GOOGLE_SHEETS_WEBAPP_URL` on the Worker

---

## 9. Verify after fix

```bash
npm ci
npm run build
npx wrangler deploy --dry-run
npm run deploy:worker   # when authenticated
```

Expected: assets read from `./dist`, Worker bundle uploads, no “Missing entry-point” error.
