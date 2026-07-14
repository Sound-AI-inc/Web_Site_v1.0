# Early Access Pipeline — Diagnostic Report

## Root cause of HTTP 405

`https://website.soundai-inc.workers.dev/early-access` was served by **Cloudflare static assets only**.

| Method  | Before fix | Cause |
|---------|------------|--------|
| GET     | 200 HTML   | SPA fallback (correct for page view) |
| POST    | **405**    | Assets handler rejects non-GET/HEAD |
| OPTIONS | **405**    | No CORS preflight handler |

The marketing form POSTed to `/early-access`, but no Worker API ran before the asset layer.

## Fix

1. Added `worker/src/index.ts` + `wrangler.toml` with `run_worker_first` for `/early-access` and `/api/early-access`.
2. **GET/HEAD** → SPA assets (marketing page).
3. **POST/OPTIONS** → API: validate → **Supabase upsert** (source of truth) → **Google Sheets** (best-effort, retries). Sheets failures never fail the user flow after Supabase succeeds.
4. Frontend tries same-origin, then `/api/early-access`, then `https://website.soundai-inc.workers.dev/early-access`.

## Deploy (Cloudflare)

```bash
npm install
npm run build
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
npx wrangler secret put GOOGLE_SHEETS_WEBAPP_URL
npm run deploy:worker
```

## Verify

```bash
curl.exe -i -X OPTIONS "https://website.soundai-inc.workers.dev/early-access" -H "Origin: https://web-site-v1-0.vercel.app" -H "Access-Control-Request-Method: POST"

curl.exe -i -X POST "https://website.soundai-inc.workers.dev/early-access" ^
  -H "Content-Type: application/json" ^
  -d "{\"firstName\":\"Test\",\"lastName\":\"User\",\"email\":\"test@example.com\",\"country\":\"US\",\"profession\":\"Producer\",\"musicExperience\":\"professional\",\"discoverySource\":\"curl\",\"interestedPlan\":\"trial\",\"roleType\":\"producer\",\"consent\":true,\"newsletter\":false}"
```

Expected: OPTIONS → 204, POST → 200 `{ "success": true, ... }` and a row in Supabase `early_access`.

## Security

- Service role key: Worker secret only — never in frontend / git.
- Google Sheets URL: Worker secret only.
- Anon key may remain as `VITE_SUPABASE_ANON_KEY` for client features; Early Access writes only server-side.

## Checklist after deploy

- [ ] Worker reachable
- [ ] POST accepted (not 405)
- [ ] OPTIONS CORS ok
- [ ] Supabase insert ok
- [ ] Sheets append ok (or non-fatal warning logged)
