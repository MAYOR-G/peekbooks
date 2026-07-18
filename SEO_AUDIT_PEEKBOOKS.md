# PeekBooks SEO audit

Audit date: 18 July 2026  
Production origin: `https://www.peekbookeditors.com`  
Search baseline: supplied Google Search Console and Bing Webmaster Tools data for the previous three months  
Scope: local `peekbooks` application, production HTML/headers, all generated routes, content sources, forms, payments, storage, security controls, sitemap and robots rules

## Executive summary

Initial SEO health score: **72/100**.

PeekBooks is a Next.js 16 App Router application deployed on Vercel. The important pages are prerendered or statically generated; titles, descriptions, canonicals, H1s, article copy, internal links and JSON-LD are present in initial HTML. No framework or rendering migration is needed.

The strongest verified foundations are clean `200` responses for all 32 sitemap entries, absolute self-referencing HTTPS canonicals, a single H1 on every indexable page, server-rendered article content, private Blob storage in source, Paystack webhook signature validation, and no tracked production secrets.

The highest-priority problems are:

1. Unsupported `AggregateRating`, self-controlled `Review`, and invented flat-price `Offer` markup is emitted sitewide.
2. `/thesis-editing` is missing, leaving a valuable commercial intent split between an article and broader academic-editing page.
3. `/submit/complete` is both `noindex` and included in the sitemap.
4. Commercial service pages share too much template copy and do not cover the distinct user questions indicated by Search Console.
5. One live internal link points to the nonexistent `/academic-proofreading-cost-2026` path.
6. Sitewide FAQ markup is inappropriate for this ordinary commercial site, although visible FAQ content is useful and can remain.
7. The homepage contains unsupported absolute claims, unverifiable testimonials and an institution/journal marquee that can imply endorsement.
8. The homepage H1 is initially hidden by client animation, producing a measured lab LCP of 4.06 seconds on a throttled mobile run.
9. Turnstile production variables appear inconsistent: the contact widget is live, but the submission widget is absent while the submission API requires a token.
10. The admin cookie is scoped to `/admin` while protected browser requests use `/api/admin`, breaking authenticated admin actions.

Search Console data is directional, not a promise of stable rank. The pages with small but promising positions (`/pricing`, `/editors`, `/submit`, `/about`, `/services/additional`, selected articles and `/journal-paper-editing`) are protected from aggressive rewriting.

## Architecture and operational inventory

| Area | Verified implementation |
|---|---|
| Framework/router | Next.js 16.1.6, React 19, App Router under `src/app` |
| Rendering | Static prerender for core pages; SSG via `generateStaticParams` for service landing pages and articles; dynamic SSR for admin and completion page; server route handlers for APIs |
| Metadata | Central `buildPageMetadata()` in `src/lib/seo.ts`; per-route layouts plus dynamic metadata for landing pages/articles |
| Blog source | `src/lib/blog.ts` plus `src/lib/new-learning-center-posts.ts`; one in-code authoritative array returned by `getAllBlogPosts()` |
| Service-page source | `src/lib/seo-landing-pages.ts`; shared rendering template at `src/app/[seoSlug]/page.tsx` |
| Structured data | `src/lib/seo.ts`; root Organization/WebSite/ProfessionalService, landing Service/Breadcrumb/FAQ, article BlogPosting/Breadcrumb/FAQ |
| Sitemap/robots | Next metadata routes: `src/app/sitemap.ts`, `src/app/robots.ts` |
| Redirects | No application redirects configured. Vercel currently redirects non-canonical host with a temporary `307` in one chain. |
| Canonicals | Absolute `https://www.peekbookeditors.com` canonicals from the central metadata helper |
| Header/footer | `src/components/layouts/navbar.tsx`, `src/components/layouts/footer.tsx` |
| Images | Next Image for primary assets; two generated article assets added during this work; existing OG default is oversized and mismatched |
| Analytics/verifications | Google HTML verification file exists. No analytics client, Bing verification tag/file or GSC API integration found. |
| IndexNow | Absent at baseline |
| Authentication | Shared admin password/session-secret cookie; no end-user account system despite a visible inert `/login` page |
| Submission/storage | DOCX/TXT analysis, Vercel Blob private storage in production or filesystem fallback locally |
| Pricing/payment | Server-recalculated service/word-count/turnaround pricing; Paystack initialization, verification and signed webhook |
| Forms | Contact and manuscript submission use Turnstile when configured; in-process rate limiter |
| Deployment | Vercel-compatible Next application; no checked-in deployment workflow file |
| Commands | `npm run lint`, `npx tsc --noEmit --incremental false`, `npm run build`, `npm run start` |
| “Codex SEO” resource | The workspace contains the Codex SEO toolkit/skills and scripts. It is an audit support resource, not runtime application code. No separate supplied screenshot folder was found; the pasted Search Console/Bing values were used as the supplied baseline. |

## Full page inventory before implementation

All titles and descriptions were unique at baseline. “Initial” is the approximate visible-text character count in the server response, confirming substantive content is not dependent on client rendering. “Links” is the number of unique internal paths in initial HTML. Root Organization/WebSite/ProfessionalService schema inherited by every route is abbreviated as `Root`; this sitewide inheritance is itself a finding.

| URL | HTTP | Index | Title | Description | H1 | Canonical | Map | Schema | Initial | Links | Action / priority |
|---|---:|---|---|---|---|---|---|---|---:|---:|---|
| `/` | 200 | Yes | Professional Editing and Proofreading Services | Unique broad service description | Professional proofreading, editing, and formatting for serious writing. | self | Yes | Root + FAQ | 5,266 | 21 | Remove unsupported root/review/FAQ schema and claims; expose H1 immediately. P0/P1 |
| `/about` | 200 | Yes | About PeekBooks Editors | Unique company/process description | About Us | self | Yes | Root | 3,553 | 20 | Protect URL/intent; substantiate people/process claims. P2 |
| `/services` | 200 | Yes | Editing, Proofreading, and Document Services | Unique service-hub description | Our Services | self | Yes | Root | 1,915 | 20 | Keep as hub; add thesis-editing discovery. P1 |
| `/pricing` | 200 | Yes | Editing and Proofreading Pricing | Unique calculator description | Pricing that follows the service you choose. | self | Yes | Root + FAQ | 3,261 | 20 | Protect; remove FAQ markup; add thesis-editing route. P1 |
| `/editors` | 200 | Yes | Meet the Editors | Unique editor-standards description | Meet the standards behind our editing. | self | Yes | Root | 3,255 | 20 | Protect; do not add Person schema without genuine profiles. P1 |
| `/contact` | 200 | Yes | Contact PeekBooks Editors | Unique support description | Talk with Peekbooks | self | Yes | Root + duplicate ProfessionalService | 1,313 | 20 | Standardise brand/H1; remove duplicate unverified local schema. P1 |
| `/submit` | 200 | Yes | Submit Manuscript for Editing or Proofreading | Unique secure-upload description | Submit Manuscript | self | Yes | Root + FAQ | 2,882 | 20 | Protect workflow; remove FAQ markup; add thesis-editing context. P1 |
| `/submit/complete` | 200 | **No** | Submission Complete | Unique confirmation description | Confirming your payment | self | **Yes** | Root | 1,037 | 20 | Remove from sitemap; keep noindex. P0 |
| `/blog` | 200 | Yes | Editing and Proofreading Blog | Unique blog-index description | The Peekbooks Blog | self | Yes | Root | 3,725 | 30 | Standardise brand; keep one authoritative article/date source. P1 |
| `/privacy` | 200 | Yes | Privacy Policy | Unique privacy description | Privacy Policy | self | Yes | Root | 2,693 | 20 | Expand accurate storage, retention, processors and deletion disclosure. P1 |
| `/terms` | 200 | Yes | Terms of Service | Unique terms description | Terms of Service | self | Yes | Root | 2,784 | 20 | Align timing/payment and service-scope wording. P2 |
| `/services/editing` | 200 | Yes | Editing and Proofreading Services | Unique catalogue description | Academic & Non-Academic Editing Services | self | Yes | Root + FAQ | 4,453 | 20 | Keep as hub; add thesis-editing route; remove FAQ markup. P1 |
| `/services/additional` | 200 | Yes | Additional Editing Support Services | Unique additional-services description | Specialized Finishing Services | self | Yes | Root | 3,233 | 20 | Protect existing intent and URL. P2 |
| `/dissertation-proofreading` | 200 | Yes | Dissertation Proofreading Services for Graduate Students | Unique dissertation description | Dissertation Proofreading Services | self | Yes | Root + Breadcrumb + Service + FAQ | 4,899 | 22 | Major content expansion and distinct scope. P0 |
| `/thesis-proofreading` | 200 | Yes | Thesis Proofreading Services for Master’s and PhD Work | Unique thesis description | Thesis Proofreading Services | self | Yes | Root + Breadcrumb + Service + FAQ | 4,568 | 22 | Differentiate final-stage thesis work; link editing/timeline/language guides. P0 |
| `/academic-editing` | 200 | Yes | Academic Editing Services for Research Papers and Theses | Unique academic-editing description | Academic Editing Services | self | Yes | Root + Breadcrumb + Service + FAQ | 4,560 | 22 | Own research-paper/academic-paper intent; remove thesis title overlap. P0 |
| `/manuscript-editing` | 200 | Yes | Manuscript Editing Services for Authors and Researchers | Unique manuscript description | Manuscript Editing Services | self | Yes | Root + Breadcrumb + Service + FAQ | 4,076 | 22 | Narrow to book/professional manuscripts. P1 |
| `/journal-paper-editing` | 200 | Yes | Journal Paper Editing Services Before Submission | Unique journal description | Journal Paper Editing Services | self | Yes | Root + Breadcrumb + Service + FAQ | 4,494 | 22 | Protect; retain journal/research-manuscript ownership. P1 |
| `/cv-editing-service` | 200 | Yes | CV Editing Service for Academic and Professional Applications | Unique CV description | CV Editing Service | self | Yes | Root + Breadcrumb + Service + FAQ | 4,025 | 22 | Keep; remove FAQ markup. P2 |
| `/business-document-editing` | 200 | Yes | Business Document Editing Services for Clear Professional Writing | Unique business description | Business Document Editing Services | self | Yes | Root + Breadcrumb + Service + FAQ | 4,007 | 22 | Keep; remove FAQ markup. P2 |
| `/proofreading-services-uk` | 200 | Yes | Proofreading Services UK: Academic and Professional Editing | Unique UK description | Proofreading Services UK | self | Yes | Root + Breadcrumb + Service + FAQ | 4,173 | 22 | Retain only with verifiable regional value; reciprocal hreflang decision below. P1 |
| `/proofreading-services-usa` | 200 | Yes | Proofreading Services USA: Academic and Professional Editing | Unique USA description | Proofreading Services USA | self | Yes | Root + Breadcrumb + Service + FAQ | 4,119 | 22 | Retain only with verifiable regional value; reciprocal hreflang decision below. P1 |
| `/blog/how-to-choose-research-philosophy-for-thesis` | 200 | Yes | How to Choose a Research Philosophy for Your Thesis | Unique methodology description | Same as title | self | Yes | Root + BlogPosting + Breadcrumb + FAQ | 12,989 | 20 | Protect URL/intent; remove FAQ markup; verify author entity. P2 |
| `/blog/editing-and-proofreading-before-manuscript-submission` | 200 | Yes | Why Editing and Proofreading Matter Before Submission | Unique pre-submission description | The Importance of Editing and Proofreading Before Manuscript Submission | self | Yes | Root + BlogPosting + Breadcrumb + FAQ | 13,241 | 20 | Differentiate as broad manuscript workflow. P1 |
| `/blog/dissertation-proofreading-checklist` | 200 | Yes | Dissertation Proofreading Checklist for Graduate Students | Unique checklist description | Same as title | self | Yes | Root + BlogPosting + Breadcrumb + FAQ | 6,934 | 20 | Keep informational; link cost/timeline/service. P2 |
| `/blog/thesis-editing-vs-proofreading` | 200 | Yes | Thesis Editing vs Proofreading: Which Service Do You Need? | Unique service-selection description | Thesis Editing vs Thesis Proofreading: What Do You Need? | self | Yes | Root + BlogPosting + Breadcrumb + FAQ | 5,903 | 20 | Add required table and link both commercial pages. P0 |
| `/blog/academic-proofreading-cost-2026` | 200 | Yes | Academic Proofreading Cost in 2026: What to Expect | Unique academic-cost description | How Much Does Academic Proofreading Cost in 2026? | self | Yes | Root + BlogPosting + Breadcrumb + FAQ | 5,486 | 20 | Add PhD answer using actual calculator logic; differentiate. P0 |
| `/blog/journal-manuscript-editing-submission` | 200 | Yes | Journal Manuscript Editing Before Submission: 2026 Guide | Unique journal description | Journal Manuscript Editing: How to Prepare Before Submission | self | Yes | Root + BlogPosting + Breadcrumb + FAQ | 5,281 | 20 | Add post-submission stages and journal-policy caveat. P0 |
| `/blog/research-paper-grammar-formatting-mistakes` | 200 | Yes | Common Grammar and Formatting Mistakes in Research Papers | Unique mistakes description | Same as title | self | Yes | Root + BlogPosting + Breadcrumb + FAQ | 5,077 | 20 | Add manuscript/pricing/submit links; do not expand into generic checklist. P1 |
| `/blog/professional-editing-clarity-structure-readability` | 200 | Yes | How Professional Editing Improves Clarity and Readability | Unique clarity description | How Professional Editing Improves Clarity, Structure, and Readability | self | Yes | Root + BlogPosting + Breadcrumb + FAQ | 5,194 | 20 | Keep; remove FAQ markup. P2 |
| `/blog/editing-vs-proofreading` | 200 | Yes | Proofreading vs Editing: Which Service Do You Need? | Unique general-comparison description | Proofreading vs Editing: Which One Does Your Document Need? | self | Yes | Root + BlogPosting + Breadcrumb + FAQ | 3,998 | 20 | Protect; keep document-neutral. P1 |
| `/blog/how-much-does-proofreading-cost` | 200 | Yes | How Much Does Proofreading Cost in 2026? | Unique general-cost description | Same as title | self | Yes | Root + BlogPosting + Breadcrumb + FAQ | 4,429 | 21 | Fix broken link; restrict to general/business/author documents. P0 |
| `/admin` | 200 | No | Admin | Private administration area | Peekbooks Admin | self | No | Root (unwanted) | 79 | 0 | Keep noindex; fix auth/session and remove inherited site schema. P0 security |
| `/login` | 200 | No | Login | Private login area | **Missing** | self | No | Root (unwanted) | 232 | 1 | Inert interface; add H1 or remove until genuine auth exists. P2 |

## Private and application endpoints

All API endpoints are excluded from the sitemap and disallowed in robots.txt. Robots is not treated as an access-control mechanism. Baseline responses lacked `X-Robots-Tag: noindex` and explicit private/no-store policy.

| Route | Methods/purpose | Baseline unauthenticated result | Indexing/cache action |
|---|---|---|---|
| `/api/admin/login` | POST admin login | GET 405 | Add API-wide noindex/no-store headers |
| `/api/admin/messages/[threadId]/attachments/[replyId]` | GET protected attachment | 401 | Preserve auth; noindex/no-store |
| `/api/admin/messages/[threadId]/reply` | POST protected reply/upload | GET 405 | Preserve auth; noindex/no-store |
| `/api/admin/submissions/[submissionId]/download` | GET protected manuscript | 401 | Preserve auth; noindex/no-store; safe filename |
| `/api/admin/submissions/[submissionId]/status` | POST protected status update | GET 405 | Preserve auth; noindex/no-store |
| `/api/contact` | POST contact form/attachment | GET 405 | Turnstile/rate limit; noindex/no-store |
| `/api/manuscripts/analyze` | POST upload/word count/draft | GET 405 | Strengthen file validation, quotas and lifecycle |
| `/api/paystack/webhook` | POST signed event | GET 405 | Preserve signature validation; idempotency needed |
| `/api/submissions` | POST create/update and initialize payment | GET 405 | Validate ownership/ID/state; noindex/no-store |
| `/api/submissions/verify` | GET payment verification | 400 without reference | Minimise output; make read-only/customer-authenticated; no-store |

## Technical findings

- Production `robots.txt` and `sitemap.xml` return `200` with correct content types.
- All 32 baseline sitemap URLs return direct `200` and use HTTPS canonical URLs.
- The specific AI crawler robots group does not repeat the wildcard group’s `/admin/`, `/login/` and `/api/` exclusions; robots groups are not merged.
- Twenty-two sitemap URLs use a stale `2024-03-01` value. Google recommends accurate significant-change dates and ignores `priority`/`changefreq`.
- The apex HTTPS host temporarily redirects (`307`) to `www`; alternate host/protocol variants should redirect once with a permanent status in Vercel/domain configuration.
- Homepage H1/intro/CTA begin at opacity zero. One throttled mobile lab run produced FCP 1.976s, LCP 4.060s (H1), CLS 0, TTFB 315ms. This is diagnostic lab data, not CrUX field data.
- The whole homepage is a client component and ships roughly 317 KB compressed JavaScript with recurring timers.
- Three homepage images are preloaded; below-fold `/luxury-art.png` should not be priority. The hero needs accurate `sizes`.
- `https://grainy-gradients.vercel.app/noise.svg` returns 404 and should be removed or localized.
- Five PNG-named files are JPEG content. The default `/service-image.png` is 789 KB, is visually unrelated to PeekBooks, and has dimensions inconsistent with metadata.
- The 404 response correctly returns a 404/noindex outcome but inherits contradictory root metadata/schema.
- No CSP or Permissions-Policy is set. A nonce-compatible CSP should begin in report-only mode to avoid breaking Turnstile/Paystack/Next.

## On-page, content and trust findings

- The official style selected for implementation is **PeekBooks Editors**. Existing `Peekbooks`, `PEEK BOOKS`, `PeekBooks` and `PEEKBOOKS` forms are inconsistent.
- Dissertation, thesis, academic, manuscript and journal landing pages reuse a four-step process, several FAQs and the same two-section structure. Their H1s are good, but the distinctive body content is too shallow for the assigned intent.
- The homepage asserts `100% Confidential`, guaranteed deadlines, guaranteed satisfaction, duplicate senior review on every document, native editors in four countries, 19+ specialisms and publication-ready delivery. No business evidence ledger exists in the repository.
- Three visible testimonials lack verifiable consent/date/source records. They should be removed from view until the owner verifies them; removing only their schema is insufficient.
- The journal/university marquee can imply endorsement. No institutional relationship evidence was found.
- “PeekBooks Editorial Team” is coded as a `Person` in article schema. It should be an `Organization` until genuine named authors with visible profiles exist.
- Regional UK/USA offices and staffing cannot be verified from code. Pages may remain because they are distinct and already receiving impressions, but factual owner confirmation is required before LocalBusiness schema or stronger local claims.

## Structured-data decisions

- Keep Organization and WebSite on the homepage only.
- Keep `Service` on focused commercial landing pages.
- Keep BreadcrumbList on inner commercial pages and articles.
- Keep BlogPosting on articles; change the team author to Organization and use an accurate image.
- Remove self-controlled `Review` and `AggregateRating` markup.
- Remove invented `$45` Offer entries.
- Remove ordinary commercial `FAQPage` markup while preserving visible FAQ UI.
- Remove duplicate Contact-page ProfessionalService markup unless both locations and entity details are independently verified.
- Do not add Product, HowTo, unsupported Person, awards or review markup.

## Duplication, overlap and broken-link summary

- No duplicate titles, canonicals or sitemap locations were detected.
- One broken internal path was detected: `/academic-proofreading-cost-2026`; the destination is `/blog/academic-proofreading-cost-2026`.
- Material intent overlap exists in the cost pair and the journal/pre-submission pair. The comparison pair is retainable with clearer thesis-specific/general boundaries.
- Commercial overlap exists among academic, journal, manuscript and the missing thesis-editing service; detailed ownership is in `SEO_KEYWORD_MAP.md`.

## Recommendations deliberately rejected

- No URL renames, framework migration, meta-keywords, thin city pages, keyword-variation pages, blanket FAQ schema, Product schema or fake review markup.
- No East Lansing landing page based on two low-volume impressions.
- No consolidation of the UK/USA pages before business facts and existing search signals are reviewed.
- No consolidation of promising existing articles solely because terminology overlaps.
- No `llms.txt`, AEO or GEO markup presented as a Google ranking requirement; the existing file is informational only.
- No dependency force-fix or destructive upgrade.
- No promises about rankings, traffic, acceptance, grades or sales.

## Evidence and limitations

The live site, production headers, robots, sitemap, current build, source, and supplied query/page metrics were inspected. Google PageSpeed Insights returned quota errors, so no CrUX field data is claimed. GSC URL Inspection, analytics, Bing account access, testimonial permissions, editor credentials, office staffing, Blob configuration, Paystack mode/history, Resend retention and actual operational QA records were unavailable. Manual owner verification remains required for those facts.

Official references used:

- [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google redirects guidance](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google review snippet policy](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
- [Google article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [IndexNow documentation](https://www.indexnow.org/documentation)

