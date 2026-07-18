# PeekBooks light security and reliability review

Review date: 18 July 2026  
Method: non-destructive source/configuration review, dependency audit, production response checks and unauthenticated endpoint smoke tests. No real manuscript, customer account, admin credential or payment was used.

The platform handles unpublished manuscripts and payment-related data. The issues below should be treated as operational risk, not merely SEO concerns.

## Remediation completed in this change set

- Upgraded Next.js and aligned build packages; compatible XML, Undici and PostCSS overrides were applied. Final `npm audit` result: **0 vulnerabilities** in both the full and production-only dependency trees.
- Added production build guards for incomplete Turnstile configuration and mismatched public/server currencies.
- Added one-time hashed draft capabilities, strict submission-ID validation, path containment, protected record states and payment reference/currency verification.
- Added file signature/container validation, DOCX archive limits, restrictive local permissions and server-derived MIME types.
- Changed public payment confirmation to a minimal POST response and added safe timeouts, timing-safe webhook comparison, API no-store/noindex headers and safer attachment filenames.
- Corrected the admin cookie path and production `__Host-` naming.
- Removed full manuscript attachments from editor notification email; the protected admin workflow is now the retrieval path.
- Replaced the inert public login form with an explicit account-unavailable page.
- Added report-only CSP, Permissions-Policy, stricter referrer policy and removed the powered-by header.

The findings below preserve the baseline evidence and identify remaining owner/operations work. Items completed above should be regression-tested after deployment.

## P0: production workflow blocker

### Turnstile configuration is inconsistent in production

- Server source requires a valid token whenever `TURNSTILE_SECRET_KEY` exists.
- The client widget renders only when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is embedded at build time.
- Production `/api/submissions` rejects a tokenless request, but production `/submit` did not contain the Turnstile widget while `/contact` did.
- This can allow upload/analysis and then block completion/payment.

Action: deploy both variables from the same environment/commit, rebuild all routes, invalidate stale artifacts and run upload → CAPTCHA → quote → Paystack test-mode smoke tests. The code will be hardened to fail a production build when exactly one Turnstile variable is configured.

## P1: major findings

| Finding | Evidence / impact | Action |
|---|---|---|
| Vulnerable runtime dependencies | Baseline audit reported high/moderate advisories affecting Next, XML parsing beneath Mammoth, Undici beneath Vercel Blob and PostCSS. | Remediated with reviewed non-force upgrades/overrides; final audit is zero. Preserve build/upload/payment/webhook regression tests. |
| Admin cookie path mismatch | Login cookie path is `/admin`, but protected browser calls use `/api/admin`; browser will not send the cookie. | Scope a `__Host-` secure cookie to `/`; add login/action integration tests. |
| Weak shared admin session | One shared password and static session-secret cookie; no identity, MFA, rotation, logout/revocation or audit trail. | Migrate to named accounts with established auth, MFA/passkeys, opaque revocable sessions and access logging. Manual larger project. |
| Submission ownership/state gap | Caller-supplied ID can read/update a draft; an existing paid record can be overwritten/reset. Filesystem paths interpolate the ID. | Strict UUID validation, signed one-time draft capability, path containment, and reject mutation after payment starts/completes. |
| Extension-only file validation | File extension/compressed size are checked, but magic bytes, archive expansion, entry count and malware are not. Untrusted DOCX is parsed. | Validate signatures/container, cap expanded size/entries, isolate parsing, quarantine/scan and derive MIME server-side. |
| Fail-open/local anti-abuse | Missing Turnstile secret accepts requests; rate limiter is per-instance and unbounded; analysis persists before payment. | Fail closed in production, use durable TTL rate limiting, quotas and pre-persistence proof. |
| No implemented retention/deletion lifecycle | Analysis persists manuscripts/drafts; no purge/delete route or scheduled cleanup exists. Privacy text promises need-based retention/deletion. | Define periods, purge abandoned drafts, delete record/blob atomically and log deletion requests. |
| Full manuscripts sent by email | Baseline Resend notification included a base64 manuscript attachment. | Remediated: routine editor notifications now contain metadata only; manuscript retrieval stays behind admin authentication. |
| Payment configuration/integrity gaps | Public and server currency variables can diverge; finalization checks amount but not all reference/currency/metadata invariants. | Validate at startup and verify reference, currency, amount, metadata and live/test environment before paid transition. |
| Non-atomic public payment finalization | Public GET verification mutates state/sends mail and can race the webhook; response exposes customer/file details to reference holders. | Idempotent durable event processing; customer-authenticated read-only polling with minimal output. |

## P2: moderate findings

- Sensitive API responses need explicit `Cache-Control: private, no-store`, `Pragma: no-cache` and `X-Robots-Tag: noindex`.
- Local fallback storage was observed with broad group/world-readable permissions. Use `0700` directories, `0600` files, restrictive umask and encrypted persistent volumes; disallow local fallback on serverless production.
- Add CSP in report-only mode first, Permissions-Policy, `strict-origin-when-cross-origin`, and disable `X-Powered-By`.
- Turnstile, Paystack and Resend fetches need abort timeouts; retries must be bounded and limited to safe/idempotent operations.
- Do not return internal `Error.message` to payment callers; return stable messages and log correlation IDs.
- Download filenames need a sanitized ASCII fallback plus RFC 5987 `filename*`.
- Blob/filesystem listing reads every record and needs indexed storage/cursor pagination at scale.
- `/login` is an inert account interface. Remove it or label it unavailable until genuine user authentication exists.
- Automated auth, authorization, upload, retention, payment-invariant and webhook-replay tests are absent.

## P3

- Webhook HMAC strings should be converted to equal-length buffers and compared with `timingSafeEqual`.

## Positive findings

- Paystack webhook signatures are verified before JSON processing.
- Payment amounts are recalculated server-side.
- Vercel Blob objects are configured private in source.
- Manuscript/attachment download routes require admin authentication in source.
- User text is normally React-escaped; notification HTML interpolations are escaped.
- No SQL datastore exists, so SQL injection is not applicable.
- No tracked secrets were found. Environment files, storage, build output and local deployment metadata are ignored.
- No production browser source map was confirmed.
- HSTS, frame denial and MIME sniffing protection are live.

## Privacy-policy alignment required

The policy must state, accurately and specifically:

- storage provider/location and whether local fallback is ever used in production;
- which staff/editors can access documents;
- retention periods for abandoned drafts, paid projects, messages and completed files;
- deletion-request workflow and legal/accounting exceptions;
- that Resend processes transactional messages and may process attachments deliberately exchanged in contact/admin replies; routine manuscript notifications no longer attach full manuscripts;
- Paystack payment processing, analytics actually in use and cross-border processors/transfers;
- whether any manuscript content is supplied to AI systems;
- contact point for privacy and deletion requests.

## Not verified

Production secret values/strength, Blob region/encryption/access logs/backups, Paystack mode and webhook history, Resend retention/SPF/DKIM/DMARC, editor operational access, incident response, backups, malware/WAF controls and actual deletion handling require owner/provider access.
