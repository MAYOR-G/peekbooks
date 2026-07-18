# PeekBooks post-deployment SEO checklist

Use this after the production deployment. Record date, operator, result and evidence for each item.

## Deployment and crawl

- [ ] Confirm deployment contains the audited commit and both Turnstile variables are configured together.
- [ ] Confirm `https://www.peekbookeditors.com/robots.txt` returns `200 text/plain`, allows public assets/pages, repeats private disallows for specific crawler groups and references the absolute sitemap.
- [ ] Confirm `https://www.peekbookeditors.com/sitemap.xml` returns `200 application/xml` and valid XML.
- [ ] Confirm the sitemap contains canonical public `200` pages only.
- [ ] Confirm `/submit/complete`, `/admin`, `/login`, `/api/*`, redirects, 404s and noindex pages are absent from the sitemap.
- [ ] Confirm `/thesis-editing` and both new articles are present.
- [ ] Confirm article `lastmod` values match substantive content dates and static route values are accurate/omitted.
- [ ] Confirm HTTP, apex and trailing-slash variants redirect directly and permanently to the HTTPS `www` canonical; correct the remaining apex `307` in Vercel/domain settings.
- [ ] Confirm no staging/preview host is indexable.

## Page-level checks

- [ ] Run `npm run seo:check -- https://www.peekbookeditors.com` and save the output.
- [ ] Inspect initial HTML for homepage, priority services, blog index and both new articles.
- [ ] Confirm exactly one H1, unique title/description and absolute self-canonical on every public page.
- [ ] Confirm no public page became `noindex`.
- [ ] Confirm private routes are `noindex, nofollow` and APIs send `X-Robots-Tag: noindex` plus private/no-store caching.
- [ ] Confirm all BlogPosting and BreadcrumbList JSON-LD parses.
- [ ] Confirm Organization/WebSite markup appears only where intended and contains verified visible facts.
- [ ] Confirm the owner-restored Review, AggregateRating, OfferCatalog and FAQPage markup is present only on the intended pages and matches the visible content/business records supplied by the owner.
- [ ] Confirm regional hreflang matches the documented decision and is reciprocal if enabled.
- [ ] Test a controlled nonexistent URL: real `404`, noindex, no homepage canonical/schema.

## Links, content and dates

- [ ] Confirm every blog card is a real anchor and every published article appears once.
- [ ] Confirm both new article cards, images, alt text, dates and schema dates match their pages and sitemap.
- [ ] Confirm no draft appears.
- [ ] Confirm the broken `/academic-proofreading-cost-2026` path is gone.
- [ ] Test header, service dropdown, footer, mobile navigation and contextual article links.
- [ ] Confirm `/thesis-editing` is linked from the service menu, thesis proofreading, academic editing, comparison article, pricing and submit.
- [ ] Confirm article CTA links lead to one relevant service and submit/pricing without excessive repetition.

## Workflow and security smoke tests

- [ ] Upload a safe DOCX and TXT in the approved test environment; reject invalid extension, oversize and malformed files.
- [ ] Complete Turnstile on contact and submit; confirm production fails safely if configuration is incomplete.
- [ ] Test quote calculation for each service/turnaround boundary and confirm public/server currencies match.
- [ ] Complete a Paystack test payment; confirm signature/reference/currency/amount/metadata checks and one idempotent notification.
- [ ] Test direct refresh on `/submit/complete` without exposing customer/manuscript details.
- [ ] Log in as admin and test status, reply, attachment and manuscript download actions.
- [ ] Confirm unauthorized/other-record download/update attempts return 401/403/404 without data leakage.
- [ ] Confirm downloaded responses are private/no-store and filenames are sanitized.
- [ ] Test contact spam/rate-limit behavior without sending real customer data.
- [ ] Confirm retention/purge and deletion-request procedures with a test document.
- [ ] Confirm routine editor notification email contains metadata only and requires protected admin retrieval for the manuscript.

## Performance/accessibility

- [ ] Test mobile and desktop homepage; confirm H1/intro/primary CTA are visible before hydration.
- [ ] Run Lighthouse/PageSpeed when quota permits and record LCP, INP and CLS; compare field data when available.
- [ ] Confirm only the true above-fold/LCP image is prioritized; inspect responsive `sizes` and intrinsic dimensions.
- [ ] Confirm no request is made to the broken external noise SVG.
- [ ] Test reduced-motion, keyboard navigation, focus visibility, service dropdown, form labels and touch targets.
- [ ] Check colour contrast without altering the established visual identity.

## Google Search Console

- [ ] Inspect `/dissertation-proofreading`.
- [ ] Inspect `/thesis-proofreading`.
- [ ] Inspect `/thesis-editing`.
- [ ] Inspect `/academic-editing`.
- [ ] Inspect `/journal-paper-editing`.
- [ ] Inspect `/blog/how-long-does-thesis-proofreading-take`.
- [ ] Inspect `/blog/british-vs-american-english-thesis-journal`.
- [ ] Inspect `/blog`.
- [ ] Request indexing only for new or substantially changed priority URLs.
- [ ] Resubmit sitemap only if location/structure changed.
- [ ] Validate Review Snippets cleanup.
- [ ] Compare the next 28 days against the previous 28 days by page/query, noting low sample sizes.

## Bing Webmaster Tools and IndexNow

- [ ] Confirm sitemap processing and inspect both new URLs.
- [ ] Run the documented IndexNow command only after successful production deployment for added/updated URLs.
- [ ] Confirm key file is reachable and response is logged without manuscript/customer/payment data.
- [ ] Do not resubmit unchanged URLs; remember IndexNow does not guarantee indexing.
- [ ] Monitor UK, USA, thesis, dissertation, cost and clarity/readability queries.
- [ ] Compare clicks, impressions, CTR and average position after 28 days.

## Manual owner actions

- [ ] Verify official legal/brand name and approved `PeekBooks Editors` usage.
- [ ] Verify office ownership/staffing, addresses, phone/currency/policy availability and regional service facts.
- [ ] Verify every editor profile/qualification before adding visible profile or Person schema.
- [ ] Verify testimonial consent, exact wording, date, identity and source before republishing.
- [ ] Verify two-editor QA, deadlines, specialism count, native-language and satisfaction-policy claims with operational evidence.
- [ ] Review privacy wording with legal counsel for storage, email processing, retention, deletion and cross-border processors.
- [ ] Configure named admin accounts/MFA and a durable rate limiter outside this SEO change set.

No checklist outcome should be interpreted as a ranking, traffic, acceptance, grade, sales or timeline guarantee.
