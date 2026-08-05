# PeekBooks Editors SEO Audit and Implementation

Date: 2026-08-05  
Production site: https://www.peekbookeditors.com  
Local verification: http://127.0.0.1:3000  
Framework: Next.js 16.2.10, React 19.2.3, App Router, static generation for public marketing/blog/service pages, dynamic server routes for admin/API/payment/submission completion.

## Executive SEO Summary

PeekBooks Editors already had a solid public-page SEO foundation: self-referencing production canonicals, noindex protection on private pages, API `X-Robots-Tag` headers, structured data on priority pages, human-editing service pages, and a project SEO regression crawler.

The main weaknesses found were content architecture and crawl depth: the blog archive had no crawlable pagination path for more than 12 posts, no topic category pages, several requested strategic posts were absent, the sitemap did not include archive/category routes, `/submit/complete` was not blocked in `robots.txt`, and the two proofreading-cost articles needed clearer search-intent separation. Search Console was not available in the local environment, so keyword/cannibalisation recommendations are search-intent based.

## Baseline Results

- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `npm test`: failed because no `test` script exists.
- `npm run build`: initially failed because production Turnstile env vars were not configured.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY=1 TURNSTILE_SECRET_KEY=1 npm run build`: initially failed in sandbox because `next/font` could not fetch Google Fonts; passed with network approval.

## Final Verification Results

- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY=1 TURNSTILE_SECRET_KEY=1 npm run build`: passed, 67 generated pages.
- `npm run seo:check -- http://127.0.0.1:3000`: passed with `errors: []`.
- Sitemap status: `200`.
- Sitemap URL count: `54`.
- Duplicate sitemap paths: none.
- Broken internal links: none.
- API routes: private/no-store caching and `X-Robots-Tag: noindex, nofollow, noarchive`.
- Private routes checked: `/admin`, `/login`, `/submit/complete` are noindex and absent from sitemap.

## URL Inventory

All final sitemap URLs returned as canonical production URLs:

`/`, `/about`, `/services`, `/pricing`, `/editors`, `/contact`, `/submit`, `/blog`, `/privacy`, `/terms`, `/services/editing`, `/services/additional`, `/dissertation-proofreading`, `/thesis-proofreading`, `/thesis-editing`, `/academic-editing`, `/manuscript-editing`, `/journal-paper-editing`, `/cv-editing-service`, `/business-document-editing`, `/proofreading-services-uk`, `/proofreading-services-usa`, `/blog/page/2`, `/blog/category/academic-editing`, `/blog/category/ai-and-writing-tools`, `/blog/category/authors-and-manuscripts`, `/blog/category/business-writing`, `/blog/category/careers-and-cvs`, `/blog/category/formatting-and-references`, `/blog/category/research-and-journals`, `/blog/category/thesis-and-dissertation`, `/blog/apa-7-reference-list-checklist`, `/blog/business-report-proofreading-checklist`, `/blog/cv-proofreading-checklist`, `/blog/academic-english-editing-non-native-speakers`, `/blog/prepare-manuscript-for-editing`, `/blog/proofread-tables-and-figures-research-paper`, `/blog/how-to-review-tracked-changes-in-word`, `/blog/human-vs-ai-proofreading-academic-research`, `/blog/journal-cover-letter-checklist`, `/blog/manuscript-editing-vs-proofreading-authors`, `/blog/phd-thesis-proofreading-checklist`, `/blog/british-vs-american-english-thesis-journal`, `/blog/how-long-does-thesis-proofreading-take`, `/blog/how-to-choose-research-philosophy-for-thesis`, `/blog/editing-and-proofreading-before-manuscript-submission`, `/blog/professional-editing-clarity-structure-readability`, `/blog/research-paper-grammar-formatting-mistakes`, `/blog/journal-manuscript-editing-submission`, `/blog/academic-proofreading-cost-2026`, `/blog/thesis-editing-vs-proofreading`, `/blog/how-much-does-proofreading-cost`, `/blog/dissertation-proofreading-checklist`, `/blog/editing-vs-proofreading`.

## Page-To-Keyword Map

- Homepage: `professional editing and proofreading services`.
- Main services: `editing and proofreading services`.
- Dissertation proofreading: `dissertation proofreading service`.
- Thesis proofreading: `thesis proofreading service`.
- Thesis editing: `thesis editing services`.
- Academic editing: `academic editing services`.
- Manuscript editing: `manuscript editing services`.
- Journal paper editing: `journal paper editing service`.
- CV editing: `CV editing service`.
- Business document editing: `business document editing service`.
- UK location page: `proofreading services UK`.
- USA location page: `proofreading services USA`.
- General cost article: `how much does proofreading cost`.
- Academic cost article: `academic proofreading cost`.
- Thesis timeline article: `how long does thesis proofreading take`.
- Thesis comparison article: `thesis editing vs proofreading`.

## Cannibalisation Findings and Decisions

- General proofreading cost vs academic proofreading cost: retained both. General cost now focuses on business documents, CVs, author manuscripts, reports, professional documents, pricing models, and provider comparison. Academic cost stays focused on theses, dissertations, papers, references, university/journal requirements, and academic document complexity.
- Thesis timeline vs thesis comparison: retained both. Timeline targets scheduling/turnaround; comparison targets service selection and draft readiness.
- Thesis proofreading vs dissertation proofreading: retained both as separate commercial pages, with thesis framed around Master’s/doctoral thesis final checks and dissertation around graduate dissertation submission.
- Thesis editing vs academic editing: retained both. Thesis editing remains thesis-specific; academic editing is broader scholarly work.
- Academic editing vs journal paper editing: retained both. Journal page targets journal submission/reviewer readability.
- Manuscript editing vs journal paper editing: retained both. Manuscript page targets books/long-form author documents; journal page targets research articles.
- UK vs USA proofreading pages: retained both. They already have separate regional English and address signals; business should manually verify address accuracy.

## Implemented Changes

- Added 11 strategic blog articles in `src/lib/strategic-seo-posts.ts`.
- Added article categories and pagination helpers in `src/lib/blog.ts`.
- Limited `/blog` to 12 posts and added crawlable `/blog/page/2`.
- Added 8 non-empty blog category pages using suggested categories.
- Added crawlable category pagination support.
- Added unique metadata and self-referencing canonicals for blog archive pages, paginated archive pages, category pages, and category pagination.
- Updated sitemap generation to include blog pagination and category URLs.
- Added `/submit/complete` to robots disallow rules while preserving noindex metadata.
- Added `articleSection` to BlogPosting schema.
- Separated general proofreading-cost title/H1/description/content from academic-cost intent.
- Added a distinct meta description for the thesis editing-vs-proofreading article.
- Used official/current source links in the tracked-changes article and APA checklist.

## New Articles Created

- PhD Thesis Proofreading Checklist Before Submission.
- How to Review Tracked Changes After Professional Editing.
- CV Proofreading Checklist Before Applying for a Job.
- Business Report Proofreading Checklist Before Sending.
- Journal Cover Letter Editing Checklist.
- APA 7 Reference List Checklist Before Submission.
- Human vs AI Proofreading for Academic Research.
- Editing Academic English for Non-Native Speakers.
- How to Prepare a Manuscript for Professional Editing.
- Manuscript Editing vs Proofreading for Authors.
- How to Proofread Tables and Figures in a Research Paper.

## Structured Data

- Existing BlogPosting, BreadcrumbList, FAQPage, Organization, WebSite, ProfessionalService, and Service schema patterns were preserved.
- BlogPosting now includes `articleSection`.
- Publisher remains the verified organization, not invented individual authors.
- No fake ratings, awards, editor credentials, affiliations, or outcomes were added.

## Sitemap and Lastmod

- Blog articles use their genuine `updated` date for `lastModified`.
- New articles use `date` and `updated` of `2026-08-05` because they were created in this implementation.
- Static/protected pages were not assigned artificial lastmod dates.
- Sitemap excludes private/admin/login/API/submission-complete routes and includes canonical public routes only.

## Visual Regression Notes

Screenshots captured after implementation in `screenshots/seo-after/` for desktop, tablet, and mobile. Requested protected routes were covered: homepage, about, services, pricing, editors, contact, submit, one academic service, one professional service, blog archive, blog page 2, and one blog article.

Measured blog grid:

- Desktop `/blog`: 12 articles, 3 cards in first row.
- Tablet `/blog`: 12 articles, 2 cards in first row.
- Mobile `/blog`: 12 articles, 1 card in first row.
- Desktop `/blog/page/2`: 11 articles, 3 cards in first row.
- Tablet `/blog/page/2`: 11 articles, 2 cards in first row.
- Mobile `/blog/page/2`: 11 articles, 1 card in first row.

No protected page source files, pricing logic, payment logic, upload logic, auth logic, testimonials, reviews, statistics, header, footer, or global CSS were edited. Before screenshots were not captured before code edits in this run; regression protection was supported by limiting changes to blog/content/sitemap/robots/schema files and by post-change screenshots plus crawler verification.

## Protected Functionality Checklist

- Homepage design and sections preserved.
- Reviews, testimonials, statistics, pricing values, and pricing formulas not edited.
- About page, main services page, pricing page, editors page, contact page, submit manuscript page, header, and footer source untouched.
- Authentication, dashboard/admin, upload, payment, Paystack, notifications, and private file routes untouched.
- Contact and submit pages still render in local production screenshots.
- Private routes are noindex and API routes emit `X-Robots-Tag`.
- No global CSS changes made.

## Manual Actions Required

- Submit or resubmit sitemap in Google Search Console after deployment.
- Inspect priority URLs and request indexing only for new or materially updated pages.
- Monitor the two cost articles separately in GSC.
- Monitor the two thesis articles separately in GSC.
- Add genuine named editor/author profiles only after the business verifies names, qualifications, and profile details.
- Verify UK and USA addresses, phone, social profiles, and regional service facts.
- Continue collecting genuine reviews with source/consent records.
- Build legitimate backlinks from researchers, authors, institutions, professional associations, and publishing communities.
- Run production Lighthouse/PageSpeed and compare field data when available.
- Run real payment/upload/contact workflow smoke tests in a controlled production or staging environment with valid Turnstile, Paystack, Blob, and Resend credentials.

No rankings, clicks, leads, academic outcomes, publication outcomes, job outcomes, or traffic guarantees are implied.
