# PeekBooks Editors SEO and platform changelog

Implementation date: 18 July 2026  
Preferred production origin: `https://www.peekbookeditors.com`

This file records the changes made after the baseline audit. It does not promise rankings, traffic, conversions, publication, grades or acceptance.

## Audit and planning artifacts

- Added `SEO_AUDIT_PEEKBOOKS.md` with the pre-change architecture, route inventory, live-response evidence, technical findings, content/trust review and structured-data decisions.
- Added `SEO_KEYWORD_MAP.md` with one primary intent owner per commercial page/article.
- Added `SEO_CONTENT_OVERLAP.md` with retained, differentiated and deferred consolidation decisions.
- Added `SECURITY_REVIEW.md` and `POST_DEPLOYMENT_SEO_CHECKLIST.md`.
- Added an ignored `.seo-cache/` site summary and baseline directional scores for future comparison.

## Technical SEO

- Removed the noindex `/submit/complete` route from the XML sitemap.
- Removed fabricated static `lastmod`, `changefreq` and `priority` values; article `lastmod` remains tied to substantive update dates.
- Repeated private-path exclusions in the explicit AI crawler robots group.
- Added a dedicated noindex 404 metadata path without a homepage canonical.
- Removed meta-keywords output and allowed private/not-found routes to omit canonicals.
- Moved Organization and WebSite schema to the homepage instead of emitting the same entities on every route.
- Added API-wide private/no-store caching and `X-Robots-Tag: noindex, nofollow, noarchive` headers.
- Added a deterministic local SEO regression crawler (`npm run seo:check -- <origin>`).
- Added a verified IndexNow key file and an explicit changed-URL submission command. No URL was submitted before deployment.

## Structured data and trust

- The initial remediation removed self-controlled Review/AggregateRating markup, Offer pricing and broad FAQPage markup. On the owner’s subsequent instruction, the ProfessionalService aggregate rating, reviews, OfferCatalog and FAQPage markup were restored.
- Kept appropriate Service, BreadcrumbList and BlogPosting markup.
- Changed the editorial-team article author entity from Person to Organization.
- Removed unverified testimonials, institution-logo implications, numeric expertise/QA claims, universal confidentiality language and guarantees from the homepage.
- Standardized visible brand wording to **PeekBooks Editors**.
- Deferred LocalBusiness, Person/author-profile and regional hreflang additions until entity, staffing and regional-equivalence facts are verified.

### Owner-directed restoration

- Restored the three visible homepage testimonial cards.
- Restored the homepage ProfessionalService schema with AggregateRating, Review and OfferCatalog entries.
- Restored FAQPage schema on the homepage, focused service landing pages, articles with visible FAQs, pricing, submission and the main editing-services page.
- The unrelated journal/university logo marquee remains removed.

## Content and information architecture

- Added `/thesis-editing` as the commercial owner for thesis language-development intent, clearly separated from final-stage proofreading.
- Expanded dissertation, thesis proofreading, academic editing, manuscript editing and journal editing pages with distinct scope, stage, document and boundary information.
- Added exactly two articles:
  - `/blog/how-long-does-thesis-proofreading-take`
  - `/blog/british-vs-american-english-thesis-journal`
- Added original 1536×864 WebP hero images and descriptive alt text for both new articles.
- Added the requested thesis service decision table, PhD thesis cost factors, post-submission journal stages and research-paper service links.
- Fixed the broken `/academic-proofreading-cost-2026` internal link to `/blog/academic-proofreading-cost-2026`.
- Linked thesis editing from the navigation, footer, editing-services page, thesis pages, academic page, comparison article, pricing and submission contexts.

## Rendering and performance hygiene

- Ensured the homepage H1, introductory copy and primary CTA render visibly in initial HTML instead of starting hidden.
- Limited image priority to genuine above-the-fold/LCP candidates and added responsive `sizes` values.
- Removed the broken external noise SVG request.
- Preserved the established visual design and interactions; no framework migration or redesign was performed.

## Security and reliability

- Upgraded Next.js to 16.2.10 and aligned Next build/lint packages.
- Added compatible overrides for fixed XML, Undici and PostCSS versions; final full and production-only `npm audit` results are zero vulnerabilities.
- Added production Turnstile/currency configuration guards, external-fetch timeouts and timing-safe webhook signature comparison.
- Added strict ID/path validation, restrictive filesystem permissions, one-time hashed draft access, protected submission states and stronger payment invariants.
- Added file signature/container validation and DOCX archive expansion/entry limits.
- Changed public payment verification from mutating GET to minimal POST output.
- Corrected admin cookie scope and production `__Host-` naming.
- Removed full manuscript attachments from routine internal email notifications.
- Replaced the inert public account form with an accurate, noindex informational page.
- Updated privacy wording to reflect the current workflow and the absence of a universal automatic retention period.

## Validation completed

- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed on Next.js 16.2.10; 47 static/dynamic routes generated.
- Local production crawl: 34 sitemap URLs, all direct 200; no duplicate sitemap paths, metadata/H1/canonical/schema errors or broken internal links.
- Private route/API check: noindex private pages; every tested API response included private/no-store caching and `X-Robots-Tag` noindex.
- `npm audit` and `npm audit --omit=dev`: both zero vulnerabilities after remediation.

## Deployment and owner actions still required

- Configure and verify both Turnstile variables in the same production build; perform a real test-mode submission/payment/webhook cycle.
- Change the apex-host redirect from temporary 307 to a direct permanent redirect in the domain/Vercel configuration.
- Define and implement automated retention/purge periods for drafts, completed files and messages.
- Replace the shared admin credential/session model with named accounts, MFA/passkeys, revocable sessions and audit logging.
- Add durable distributed rate limiting, malware/quarantine controls and payment-event idempotency storage.
- Verify legal/brand entity, office/staffing facts, editor credentials, testimonial consent and any stronger service claims before publishing them or adding schema.
- Review the privacy policy with counsel and verify provider regions, retention, access logs, backups and cross-border processing.
- Run the post-deployment checklist, Search Console inspection and IndexNow changed-URL submission only after the production URLs are live.
