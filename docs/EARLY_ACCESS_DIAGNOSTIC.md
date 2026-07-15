# Early Access Pipeline — Diagnostic Report

## Live 502 root cause (Jul 2026)

`POST https://website.soundai-inc.workers.dev/early-access` returned:

```json
{"success":false,"error":"Supabase insert failed (404): {}"}
```

| Layer | Status | Finding |
|-------|--------|---------|
| Worker routing | OK | POST reaches Worker (not 405) |
| Secrets present | Partial | Worker called Supabase (URL + key loaded) |
| Supabase REST | **404** | `early_access` table/route missing or wrong project |
| Google Sheets | Not called | Correct — only runs after successful Supabase write |

**Fix:** Run `supabase/schema/early_access.sql` in the Supabase SQL Editor for project `xnjugeewwjclgsaynthi`, then redeploy the Worker with the **service_role** key (not anon).

## Pipeline

```
Frontend (CountrySelect ISO)
  → Cloudflare Worker POST /early-access
    → Validate secrets + payload
    → Supabase UPSERT /rest/v1/early_access?on_conflict=email
    → Google Sheets (best-effort; failures do not roll back Supabase)
```

## Worker diagnostics

Every error response includes:

- `success: false`
- `error` — human-readable root cause
- `subsystem` — `Worker` | `Validation` | `Supabase` | `Google Sheets`
- `status` — upstream HTTP status when applicable
- `details` / `stack` / `missing` — extra context

Cloudflare logs every lifecycle step: `request_received` → `payload_parsed` → `validation_ok` → `supabase_request` / `supabase_response` → `sheets_*` → `success` | `error_response`.

## Required secrets

| Secret | Required | Notes |
|--------|----------|-------|
| `SUPABASE_URL` | Yes (var or secret) | Set in `wrangler.toml` `[vars]` |
| `SUPABASE_SERVICE_ROLE_KEY` | **Yes** | Must be JWT `role=service_role`. Worker rejects anon key. |
| `GOOGLE_SHEETS_WEBAPP_URL` | Optional for success | `/exec` web app URL; missing → `sheetsWarning` |

```bash
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
npx wrangler secret put GOOGLE_SHEETS_WEBAPP_URL
npm run deploy:worker
```

## Country of Residence

- Searchable ISO 3166-1 dropdown (`CountrySelect`)
- Payload: `country` (name) + `countryCode` (alpha-2)
- Stored: `early_access.country`, `early_access.country_code`
- Sheets columns: **Country of Residence**, **Country Code**

## Test scenarios

### 1. Successful registration

```bash
curl.exe -i -X POST "https://website.soundai-inc.workers.dev/early-access" ^
  -H "Content-Type: application/json" ^
  --data-binary "@tmp/test-payload.json"
```

Expect: `200` `{ "success": true, "sheetsSynced": true|false }`

### 2. Duplicate email (UPSERT)

Same payload twice → `200` both times; one row in Supabase (updated).

### 3. Invalid payload / missing fields

Omit `countryCode` or `consent` → `400`, `subsystem: "Validation"`.

### 4. Missing Worker secrets

Unset `SUPABASE_SERVICE_ROLE_KEY` → `500`, `missing: ["SUPABASE_SERVICE_ROLE_KEY"]`.

### 5. Anon key instead of service_role

Worker detects JWT `role=anon` → descriptive `500` before calling Supabase.

### 6. Supabase unavailable / table missing

Expect: `502`, `subsystem: "Supabase"`, body/details with status `404` or network error. **Sheets not called.**

### 7. Google Sheets unavailable

Supabase succeeds → `200` with `sheetsSynced: false`, `sheetsWarning: "..."`. Row preserved in Supabase.

## Deploy checklist

1. [ ] Run `supabase/schema/early_access.sql` in Supabase SQL Editor
2. [ ] `wrangler secret put SUPABASE_SERVICE_ROLE_KEY` (service_role only)
3. [ ] `wrangler secret put GOOGLE_SHEETS_WEBAPP_URL` (optional)
4. [ ] Update Google Apps Script from `google-apps-script/early-access.gs` + redeploy web app
5. [ ] `npm run deploy:worker`
6. [ ] Verify POST → 200 and row in Supabase + Sheets

## Security

- Service role key: Worker / Vercel server env only — never `VITE_*` / git.
- Frontend does not write to Supabase for Early Access in production.
