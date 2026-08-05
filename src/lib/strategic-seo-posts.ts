import type { BlogPost } from "@/lib/blog";

const author = "PeekBooks Editorial Team";
const published = "2026-08-05";
const academicImage = "/editing-proofreading-manuscript-submission.webp";
const serviceImage = "/service-image.png";

export const STRATEGIC_SEO_POSTS: BlogPost[] = [
  {
    slug: "phd-thesis-proofreading-checklist",
    title: "PhD Thesis Proofreading Checklist Before Submission",
    seoTitle: "PhD Thesis Proofreading Checklist Before Submission",
    metaDescription: "Use this PhD thesis proofreading checklist to review chapters, terminology, cross-references, appendices, tables, figures, and final repository files.",
    excerpt: "A doctoral thesis proofreading checklist for long-document consistency, submission files, appendices, cross-references, and final review boundaries.",
    author,
    date: published,
    updated: published,
    readTime: "10 min read",
    tags: ["Thesis", "Checklist", "Proofreading"],
    category: "Thesis and Dissertation",
    heroImage: academicImage,
    heroImageAlt: "Doctoral thesis manuscript being reviewed before final submission",
    summary: [
      "Check a PhD thesis in separate passes for structure, terminology, references, tables, figures, and final files.",
      "Long multi-chapter documents need consistency checks that shorter dissertations may not expose.",
      "Proofreading should happen after supervisor revisions and before final repository upload.",
    ],
    faqs: [
      { question: "When should I use a PhD thesis proofreading checklist?", answer: "Use it after the thesis structure and supervisor revisions are stable, and before final submission or repository upload." },
      { question: "Is this different from a dissertation checklist?", answer: "Yes. This checklist focuses on doctoral-scale consistency across chapters, appendices, lists of tables and figures, cross-references, and final files." },
      { question: "Does proofreading include viva preparation?", answer: "No. Proofreading can improve the written thesis presentation, but viva or defence preparation is a separate academic activity." },
    ],
    content: `
      <p>A PhD thesis proofreading checklist has to account for scale. A doctoral manuscript may contain several years of terminology, revised chapter drafts, appendices, tables, figures, equations, and cross-references. The final proofread should make that long document feel controlled without changing the research itself.</p>
      <p>If the language still needs sentence-level development, compare <a href="/thesis-editing">thesis editing</a>. If the thesis is stable and needs final quality control, review the scope of <a href="/thesis-proofreading">thesis proofreading</a>.</p>
      <blockquote>Quick answer: check the thesis by system, not by chapter alone. Terminology, references, numbering, appendices, and final exported files need their own passes.</blockquote>
      <h2>Doctoral thesis proofreading checklist</h2>
      <table><thead><tr><th>Area</th><th>What to check</th><th>Author decision</th></tr></thead><tbody>
      <tr><td>Terminology</td><td>Key terms, abbreviations, variable names, spellings, and capitalization across all chapters.</td><td>Approve one preferred form and keep a glossary if needed.</td></tr>
      <tr><td>Cross-references</td><td>Chapter, section, table, figure, equation, and appendix references.</td><td>Refresh fields and confirm every referenced item exists.</td></tr>
      <tr><td>Front matter</td><td>Abstract, declaration, acknowledgements, contents, lists of tables and figures.</td><td>Match graduate-school wording exactly.</td></tr>
      <tr><td>Appendices</td><td>Labels, order, captions, permissions, and links from the main text.</td><td>Confirm what belongs in the submitted file.</td></tr>
      <tr><td>Repository file</td><td>PDF export, embedded fonts, page breaks, blank pages, file name, and required metadata.</td><td>Upload only the approved final version.</td></tr>
      </tbody></table>
      <h2>Long-document consistency</h2>
      <p>Read for consistency across the whole thesis. A method term introduced in Chapter 3 should not shift in Chapter 6. A figure renamed during revision should match the contents list, caption, and in-text callout.</p>
      <h2>Submission boundaries</h2>
      <p>A proofreader can flag unclear language and visible inconsistencies, but the author remains responsible for data accuracy, research claims, ethics statements, permissions, and institutional requirements. Proofreading does not guarantee an examination result.</p>
      <h2>Related help</h2>
      <p>For master’s dissertation work, see the <a href="/blog/dissertation-proofreading-checklist">dissertation proofreading checklist</a>. For scheduling, read <a href="/blog/how-long-does-thesis-proofreading-take">how long thesis proofreading takes</a>. When ready, <a href="/submit">submit the thesis securely</a> with your university checklist attached.</p>
    `,
  },
  {
    slug: "how-to-review-tracked-changes-in-word",
    title: "How to Review Tracked Changes After Professional Editing",
    seoTitle: "How to Review Tracked Changes in Word After Editing",
    metaDescription: "Learn how to review tracked changes in Word, show markup, handle comments, compare versions, refresh fields, and save a clean final file.",
    excerpt: "A practical guide to reviewing Microsoft Word tracked changes after professional editing without losing author control.",
    author,
    date: published,
    updated: published,
    readTime: "9 min read",
    tags: ["Editing", "Microsoft Word", "Tracked Changes"],
    category: "Formatting and References",
    heroImage: academicImage,
    heroImageAlt: "Edited Microsoft Word manuscript with tracked changes ready for author review",
    summary: [
      "Use All Markup while reviewing so hidden changes are not mistaken for removed changes.",
      "Accept or reject changes deliberately instead of accepting everything blindly.",
      "After review, refresh fields, check comments, and export a clean final PDF when required.",
    ],
    faqs: [
      { question: "Does No Markup remove tracked changes?", answer: "No. No Markup changes the view only. You must accept or reject tracked changes to remove them from the file." },
      { question: "Should I accept every professional edit?", answer: "No. Review each change for meaning, technical accuracy, and author preference before accepting it." },
      { question: "Can I compare my edited file with the original?", answer: "Yes. Word includes document comparison features; keep the original file so you can verify major changes when needed." },
    ],
    content: `
      <p>Knowing how to review tracked changes in Word helps you keep control after professional editing. The editor may improve grammar, clarity, consistency, and comments, but the final manuscript is still yours to approve.</p>
      <p>Microsoft’s current Word support explains that hiding markup is not the same as removing it: tracked changes remain until you accept or reject them. See Microsoft’s guides to <a href="https://support.microsoft.com/en-us/word/accept-or-reject-tracked-changes-in-word">accepting or rejecting tracked changes</a> and <a href="https://support.microsoft.com/en-US/Word/training/track-changes-in-word">using Track Changes in Word</a>.</p>
      <blockquote>Quick answer: review in All Markup, move through changes one by one, answer comments, refresh fields, and save both a tracked version and a clean final version.</blockquote>
      <h2>Review workflow</h2>
      <ol><li>Save a copy of the edited file before making decisions.</li><li>Switch to All Markup so insertions, deletions, comments, and formatting changes are visible.</li><li>Use Next and Previous to move through changes without skipping sections.</li><li>Accept helpful edits individually and reject wording that changes meaning.</li><li>Answer comments, check references, and refresh tables of contents or cross-references.</li><li>Save a clean final DOCX and export the required PDF.</li></ol>
      <h2>What to check before accepting a change</h2>
      <table><thead><tr><th>Change type</th><th>Check</th><th>Why it matters</th></tr></thead><tbody>
      <tr><td>Sentence rewrite</td><td>Does the meaning still match your evidence?</td><td>Clarity should not alter the claim.</td></tr>
      <tr><td>Terminology</td><td>Does the term match your field or style guide?</td><td>Automated or general wording can be too broad.</td></tr>
      <tr><td>Reference edit</td><td>Does the source still match the citation?</td><td>Authors remain responsible for source accuracy.</td></tr>
      <tr><td>Formatting</td><td>Did heading levels, captions, or lists update correctly?</td><td>Late layout changes can affect generated fields.</td></tr>
      </tbody></table>
      <h2>After professional editing</h2>
      <p>For academic files, allow time for author review before submission. For service help, compare <a href="/academic-editing">academic editing</a>, <a href="/manuscript-editing">manuscript editing</a>, or <a href="/journal-paper-editing">journal paper editing</a>.</p>
    `,
  },
  {
    slug: "cv-proofreading-checklist",
    title: "CV Proofreading Checklist Before Applying for a Job",
    seoTitle: "CV Proofreading Checklist Before Applying for a Job",
    metaDescription: "Proofread your CV before applying with checks for contact details, dates, job titles, achievements, spelling, formatting, file names, and PDF export.",
    excerpt: "A job-application checklist for catching CV errors before sending your resume or academic CV.",
    author,
    date: published,
    updated: published,
    readTime: "7 min read",
    tags: ["CV", "Careers", "Proofreading"],
    category: "Careers and CVs",
    heroImage: serviceImage,
    heroImageAlt: "Professional CV document being proofread before a job application",
    summary: ["Check factual details before style.", "Use consistent tense and formatting.", "Export and inspect the exact file you will submit."],
    faqs: [
      { question: "What is the most important CV proofreading check?", answer: "Contact details, dates, job titles, employer names, and application-specific requirements should be checked before wording polish." },
      { question: "Should a CV be sent as PDF?", answer: "Use the employer’s requested format. If PDF is allowed, inspect the exported file before sending." },
      { question: "Can a CV editor invent achievements?", answer: "No. Editing can clarify real achievements but should not invent roles, credentials, results, or dates." },
    ],
    content: `
      <p>A CV proofreading checklist protects you from avoidable application errors. Employers may scan quickly, so small mistakes in names, dates, file names, or formatting can make a strong record look careless.</p>
      <p>For deeper wording and structure support, see the <a href="/cv-editing-service">CV editing service</a>.</p>
      <h2>CV proofreading checklist</h2>
      <table><thead><tr><th>Area</th><th>Check</th><th>Common issue</th></tr></thead><tbody>
      <tr><td>Contact details</td><td>Email, phone, location, portfolio, LinkedIn.</td><td>Old phone number or broken profile URL.</td></tr>
      <tr><td>Dates</td><td>Month/year format and role chronology.</td><td>Mixed date styles or unexplained gaps.</td></tr>
      <tr><td>Job titles</td><td>Official titles, employer spelling, departments.</td><td>Inconsistent capitalization.</td></tr>
      <tr><td>Achievements</td><td>Clear action, result, and context.</td><td>Vague claims without support.</td></tr>
      <tr><td>Formatting</td><td>Spacing, bullets, headings, margins, page breaks.</td><td>Layout shifts after PDF export.</td></tr>
      </tbody></table>
      <h2>Final application pass</h2>
      <p>Tailor the CV to the role, check spelling in both British and American English contexts, and name the file clearly. Do not exaggerate responsibilities or qualifications. A polished CV should make true experience easier to understand.</p>
      <p>When ready, <a href="/submit">submit your CV for editing</a> or estimate the project on the <a href="/pricing">pricing page</a>.</p>
    `,
  },
  {
    slug: "business-report-proofreading-checklist",
    title: "Business Report Proofreading Checklist Before Sending",
    seoTitle: "Business Report Proofreading Checklist Before Sending",
    metaDescription: "Use this business report proofreading checklist to review names, dates, figures, tables, recommendations, version control, confidentiality, and PDF export.",
    excerpt: "A final-check guide for proofreading business reports before sending them to clients, boards, partners, or internal teams.",
    author,
    date: published,
    updated: published,
    readTime: "7 min read",
    tags: ["Business Writing", "Proofreading", "Reports"],
    category: "Business Writing",
    heroImage: serviceImage,
    heroImageAlt: "Business report pages being reviewed for errors before sending",
    summary: ["Verify facts and figures first.", "Check recommendations against the evidence in the report.", "Remove confidential or draft-only material before sending."],
    faqs: [
      { question: "What should be checked first in a business report?", answer: "Names, dates, figures, tables, and client terminology should come before style polish because factual errors carry the highest risk." },
      { question: "Can proofreading change recommendations?", answer: "No. Proofreading can clarify wording, but recommendations should remain the author or organization’s decision." },
      { question: "Should I proofread the PDF or source file?", answer: "Check both when possible. The source file catches editable text issues, while the PDF shows final page breaks and layout." },
    ],
    content: `
      <p>A business report proofreading checklist helps you catch errors before clients, boards, funders, or internal decision-makers read the document. The goal is clarity, accuracy, and confidence, not rewriting the business decision.</p>
      <p>For fuller language and structure support, see <a href="/business-document-editing">business document editing</a>.</p>
      <h2>Report proofreading checklist</h2>
      <table><thead><tr><th>Area</th><th>Check</th><th>Risk</th></tr></thead><tbody>
      <tr><td>Names and titles</td><td>Clients, teams, products, departments, and signatories.</td><td>Credibility loss from misspelt names.</td></tr>
      <tr><td>Dates and figures</td><td>Reporting periods, totals, percentages, currencies, and units.</td><td>Contradictory numbers across sections.</td></tr>
      <tr><td>Tables</td><td>Labels, source notes, column headings, and text callouts.</td><td>Readers cannot connect data to findings.</td></tr>
      <tr><td>Recommendations</td><td>Action wording, owners, deadlines, and conditions.</td><td>Unclear next steps.</td></tr>
      <tr><td>Confidentiality</td><td>Draft comments, hidden metadata, client-only details, and file name.</td><td>Unintended disclosure.</td></tr>
      </tbody></table>
      <h2>Final file control</h2>
      <p>Confirm the version number, remove unresolved comments, export the final PDF, and open it as a recipient would. For confidential work, use the <a href="/submit">secure submission workflow</a> when requesting editing support.</p>
    `,
  },
  {
    slug: "journal-cover-letter-checklist",
    title: "Journal Cover Letter Editing Checklist",
    seoTitle: "Journal Cover Letter Checklist Before Submission",
    metaDescription: "Prepare a journal cover letter with checks for editor name, manuscript title, article type, contribution, fit, ethics, declarations, attachments, and final proofreading.",
    excerpt: "A journal cover letter checklist for research authors preparing a careful submission package without implying acceptance guarantees.",
    author,
    date: published,
    updated: published,
    readTime: "8 min read",
    tags: ["Journal", "Cover Letter", "Checklist"],
    category: "Research and Journals",
    heroImage: academicImage,
    heroImageAlt: "Journal submission cover letter and manuscript checklist on a desk",
    summary: ["Match the current journal instructions.", "State the contribution clearly and honestly.", "Check declarations and attachments before upload."],
    faqs: [
      { question: "Does a journal cover letter guarantee acceptance?", answer: "No. It can help present the submission clearly, but acceptance depends on journal fit, originality, methods, ethics, evidence, and peer review." },
      { question: "Should I name the editor?", answer: "Use the editor’s correct name when the journal identifies one; otherwise use the journal’s preferred generic salutation." },
      { question: "Can an editor write ethical declarations for me?", answer: "No. An editor can check clarity, but authors must provide truthful declarations." },
    ],
    content: `
      <p>A journal cover letter should help the editorial office understand what you are submitting and why it fits the journal. It should not overpromise, exaggerate the contribution, or imply that language editing can guarantee acceptance.</p>
      <p>For the manuscript itself, see <a href="/journal-paper-editing">journal paper editing</a>.</p>
      <h2>Cover letter checklist</h2>
      <table><thead><tr><th>Item</th><th>Check</th><th>Why it matters</th></tr></thead><tbody>
      <tr><td>Editor name</td><td>Correct title, spelling, and journal role.</td><td>A wrong name makes the package look generic.</td></tr>
      <tr><td>Manuscript title</td><td>Exact title and article type.</td><td>Editorial staff match files quickly.</td></tr>
      <tr><td>Contribution</td><td>One concise statement of novelty or value.</td><td>Editors need a clear reason to consider the paper.</td></tr>
      <tr><td>Journal fit</td><td>Audience, scope, and article category.</td><td>Fit affects editorial screening.</td></tr>
      <tr><td>Declarations</td><td>Originality, conflicts, ethics, funding, suggested reviewers if required.</td><td>Missing declarations can delay processing.</td></tr>
      </tbody></table>
      <h2>Final proofread</h2>
      <p>Check attachments, file names, author order, corresponding-author email, and any portal-specific fields. If the manuscript also needs language review, <a href="/submit">submit the manuscript package</a> with the target journal instructions.</p>
    `,
  },
  {
    slug: "apa-7-reference-list-checklist",
    title: "APA 7 Reference List Checklist Before Submission",
    seoTitle: "APA 7 Reference List Checklist Before Submission",
    metaDescription: "Check an APA 7 reference list for author names, dates, titles, italics, DOI and URL format, alphabetical order, hanging indentation, and citation matching.",
    excerpt: "A responsible APA 7 checklist for reference-list consistency without reproducing copyrighted style-manual content.",
    author,
    date: published,
    updated: published,
    readTime: "8 min read",
    tags: ["APA 7", "References", "Formatting"],
    category: "Formatting and References",
    heroImage: academicImage,
    heroImageAlt: "APA reference list being checked before academic submission",
    summary: ["Match every in-text citation to the reference list.", "Check author, date, title, source, DOI, and URL details.", "Use official or institutional APA guidance where requirements differ."],
    faqs: [
      { question: "Should every in-text citation appear in the reference list?", answer: "Usually yes, except for special cases such as personal communications where the applicable style guidance says otherwise." },
      { question: "How are APA 7 DOI links formatted?", answer: "APA 7 commonly presents DOIs as URLs beginning with https://doi.org/." },
      { question: "Can an editor verify every source?", answer: "Editors can check visible consistency, but source accuracy and whether each source supports the argument remain the author’s responsibility unless a separate verification scope is agreed." },
    ],
    content: `
      <p>An APA 7 reference list checklist should help you find consistency problems without copying the style manual. Use your institution’s current instructions first, then consult reputable APA guidance for source-type details.</p>
      <p>The APA Style site explains reference-list and DOI practices, including <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls">DOI and URL presentation</a>. University libraries also publish practical APA 7 checklists; for example, the University of Canterbury summarises <a href="https://www.canterbury.ac.nz/study/study-support-info/citations-and-referencing/apa-style/creating-a-reference-list">reference-list layout and ordering</a>.</p>
      <h2>Reference list checklist</h2>
      <table><thead><tr><th>Area</th><th>Check</th><th>Common issue</th></tr></thead><tbody>
      <tr><td>Author names</td><td>Surnames, initials, order, group authors, and spelling.</td><td>Initials do not match the source.</td></tr>
      <tr><td>Dates</td><td>Year, full date where required, no-date entries, and same-author order.</td><td>In-text year differs from reference year.</td></tr>
      <tr><td>Titles</td><td>Capitalization, subtitles, proper nouns, and italics where applicable.</td><td>Title case copied into sentence-case contexts.</td></tr>
      <tr><td>DOIs and URLs</td><td>Working links and consistent presentation.</td><td>Old DOI formats mixed with current URL-style DOI links.</td></tr>
      <tr><td>Layout</td><td>Alphabetical order, hanging indentation, spacing, and heading.</td><td>Manual tabs create uneven indentation.</td></tr>
      </tbody></table>
      <h2>Match citations to references</h2>
      <p>Run two passes: first, highlight every in-text citation; second, check that each reference-list entry is cited. Remove background reading that is not cited if your instructions require only cited works.</p>
      <p>For language and reference consistency support, compare <a href="/academic-editing">academic editing</a> or <a href="/journal-paper-editing">journal paper editing</a>.</p>
    `,
  },
  {
    slug: "human-vs-ai-proofreading-academic-research",
    title: "Human vs AI Proofreading for Academic Research",
    seoTitle: "Human vs AI Proofreading for Academic Research",
    metaDescription: "Compare human and AI proofreading for academic research, including grammar, context, terminology, confidentiality, hallucinated corrections, references, and policy limits.",
    excerpt: "A careful comparison of human and AI proofreading for academic manuscripts, with academic-integrity and confidentiality boundaries.",
    author,
    date: published,
    updated: published,
    readTime: "9 min read",
    tags: ["AI", "Academic Writing", "Proofreading"],
    category: "AI and Writing Tools",
    heroImage: academicImage,
    heroImageAlt: "Academic manuscript being reviewed with human editorial judgment and writing software",
    summary: ["AI can help notice surface issues, but it can misunderstand context.", "Human proofreaders protect meaning, terminology, and author decisions.", "Always follow institutional AI and confidentiality policies."],
    faqs: [
      { question: "Can AI replace human academic proofreading?", answer: "AI can assist with surface checks, but human review is safer for context, technical meaning, references, author intent, and policy-sensitive work." },
      { question: "Is it safe to upload unpublished research to AI tools?", answer: "Check confidentiality, funder, journal, employer, and university rules before uploading unpublished or sensitive material." },
      { question: "Can AI help disguise AI-written work?", answer: "This guide does not support bypassing academic-integrity policies. Authors should follow institutional rules and disclose tool use where required." },
    ],
    content: `
      <p>Human vs AI proofreading is not only a grammar question. Academic research involves context, terminology, confidential data, citation responsibility, and author intent. A tool may suggest fluent wording that is still wrong for the study.</p>
      <p>For human review of academic documents, see <a href="/academic-editing">academic editing</a> or <a href="/thesis-proofreading">thesis proofreading</a>.</p>
      <h2>Comparison</h2>
      <table><thead><tr><th>Issue</th><th>AI proofreading</th><th>Human proofreading</th></tr></thead><tbody>
      <tr><td>Grammar</td><td>Can catch many surface patterns.</td><td>Checks grammar while preserving meaning.</td></tr>
      <tr><td>Context</td><td>May miss discipline-specific nuance.</td><td>Can query unclear meaning instead of guessing.</td></tr>
      <tr><td>References</td><td>May suggest plausible but false changes.</td><td>Can check visible consistency and flag author decisions.</td></tr>
      <tr><td>Confidentiality</td><td>Depends on the tool and policy.</td><td>Should use a defined confidential workflow.</td></tr>
      </tbody></table>
      <h2>Responsible use</h2>
      <p>Do not use proofreading tools to bypass academic-integrity rules, hide unauthorized assistance, or change research claims without review. Check your university, employer, funder, or journal policy before uploading unpublished files.</p>
      <p>When the document matters, use AI only as an aid and leave time for final human review.</p>
    `,
  },
  {
    slug: "academic-english-editing-non-native-speakers",
    title: "Editing Academic English for Non-Native Speakers",
    seoTitle: "Academic English Editing for Non-Native Speakers",
    metaDescription: "Academic English editing for non-native speakers can improve articles, prepositions, sentence structure, formal tone, terminology, and British or American English consistency.",
    excerpt: "A guide for multilingual scholars who want clearer academic English while preserving their own research meaning.",
    author,
    date: published,
    updated: published,
    readTime: "8 min read",
    tags: ["Academic English", "ESL", "Editing"],
    category: "Academic Editing",
    heroImage: academicImage,
    heroImageAlt: "Academic English manuscript being edited for clarity and author meaning",
    summary: ["Good editing preserves author meaning.", "Common support areas include articles, prepositions, sentence structure, tone, and terminology.", "The required English variety should be stated before editing."],
    faqs: [
      { question: "Does academic English editing change my ideas?", answer: "It should not. The editor improves English expression while preserving the author’s research meaning and decisions." },
      { question: "Is this only for students?", answer: "No. Researchers, journal authors, doctoral candidates, and professionals writing scholarly English can all use academic English editing." },
      { question: "Should I choose British or American English?", answer: "Follow the university, journal, or publisher instructions. If no rule exists, choose one variety and apply it consistently." },
    ],
    content: `
      <p>Academic English editing for non-native speakers helps strong research read more naturally in English. The goal is not to erase the author’s voice, but to remove language friction that distracts from the argument.</p>
      <p>For service scope, see <a href="/academic-editing">academic editing services</a>.</p>
      <h2>Common editing areas</h2>
      <table><thead><tr><th>Area</th><th>What improves</th><th>Example issue</th></tr></thead><tbody>
      <tr><td>Articles</td><td>Use of a, an, the, and zero article.</td><td>Overgeneral or missing article use.</td></tr>
      <tr><td>Prepositions</td><td>Natural phrasing in methods and analysis.</td><td>Similar words taking different prepositions.</td></tr>
      <tr><td>Sentence structure</td><td>Clear subject, verb, and relationship between clauses.</td><td>Long sentences where the main claim is buried.</td></tr>
      <tr><td>Formal tone</td><td>Precise academic wording.</td><td>Conversational or inflated phrasing.</td></tr>
      <tr><td>Terminology</td><td>Consistent specialist vocabulary.</td><td>Several translations of the same technical term.</td></tr>
      </tbody></table>
      <h2>Preserving meaning</h2>
      <p>A responsible editor comments when a sentence could mean two different things. They should not invent findings, add unsupported citations, or make the research sound more certain than it is.</p>
      <p>For English-variety decisions, read <a href="/blog/british-vs-american-english-thesis-journal">British vs American English for a thesis or journal paper</a>.</p>
    `,
  },
  {
    slug: "prepare-manuscript-for-editing",
    title: "How to Prepare a Manuscript for Professional Editing",
    seoTitle: "How to Prepare a Manuscript for Professional Editing",
    metaDescription: "Prepare a manuscript for editing by selecting the correct version, resolving comments, sharing guidelines, audience, deadline, files, tables, figures, and scope expectations.",
    excerpt: "A practical pre-editing checklist for authors, researchers, and professionals submitting a manuscript for human editing.",
    author,
    date: published,
    updated: published,
    readTime: "8 min read",
    tags: ["Manuscript", "Editing", "Preparation"],
    category: "Authors and Manuscripts",
    heroImage: academicImage,
    heroImageAlt: "Manuscript files and author notes prepared for professional editing",
    summary: ["Send one controlled version.", "Include audience, style, deadline, and scope notes.", "Resolve comments that should not be part of the edit."],
    faqs: [
      { question: "What file should I send for editing?", answer: "Send the latest editable file, usually DOCX, plus any style guide, target journal, publisher, or client instructions." },
      { question: "Should I remove comments before editing?", answer: "Remove comments that no longer matter and keep only comments that guide the editor." },
      { question: "Can I send tables and figures?", answer: "Yes, include tables, figures, captions, and supplementary files if they need language or consistency review." },
    ],
    content: `
      <p>Preparing a manuscript for professional editing helps the editor spend time on the right work instead of solving version problems. A clear submission also produces better comments and fewer avoidable delays.</p>
      <p>For long-form work, see <a href="/manuscript-editing">manuscript editing services</a>.</p>
      <h2>Before you upload</h2>
      <ol><li>Select the correct current version.</li><li>Resolve old comments and tracked changes that are no longer relevant.</li><li>Identify the audience, target journal, publisher, client, or reader group.</li><li>Attach style guidelines, citation rules, and formatting instructions.</li><li>State the deadline and your author-review buffer.</li><li>Include tables, figures, captions, appendices, and supplementary files that need review.</li><li>Explain whether you want proofreading, editing, formatting, or a combination.</li></ol>
      <h2>Scope expectations</h2>
      <p>Professional editing can improve clarity, flow, tone, consistency, and presentation. It should not invent facts, write unsupported sections, fabricate citations, or replace the author’s final judgment.</p>
      <p>When ready, <a href="/submit">submit your manuscript securely</a> with the project notes attached.</p>
    `,
  },
  {
    slug: "manuscript-editing-vs-proofreading-authors",
    title: "Manuscript Editing vs Proofreading for Authors",
    seoTitle: "Manuscript Editing vs Proofreading for Authors",
    metaDescription: "Compare manuscript editing and proofreading for authors, including developmental editing, line editing, copyediting, proofreading, timing, and what each stage delivers.",
    excerpt: "An author-focused guide to deciding whether a book manuscript needs developmental editing, line editing, copyediting, or proofreading.",
    author,
    date: published,
    updated: published,
    readTime: "9 min read",
    tags: ["Manuscript", "Authors", "Editing"],
    category: "Authors and Manuscripts",
    heroImage: academicImage,
    heroImageAlt: "Author manuscript pages marked for editing and proofreading stages",
    summary: ["Editing improves the manuscript before final polish.", "Proofreading is the last check after edits and layout are stable.", "Authors should choose the stage that matches the manuscript’s current condition."],
    faqs: [
      { question: "Is manuscript editing the same as proofreading?", answer: "No. Editing improves content expression, clarity, flow, and consistency. Proofreading catches final errors after the manuscript is stable." },
      { question: "Do authors need developmental editing?", answer: "Some manuscripts do, especially when structure, argument, chapter order, or reader promise is still unresolved." },
      { question: "When should proofreading happen?", answer: "Proofreading should happen after major editing and author revisions are complete, and ideally after layout is stable." },
    ],
    content: `
      <p>Manuscript editing vs proofreading for authors depends on where the book or long-form document is in its life. A rough manuscript needs editorial development. A near-final manuscript needs final error control.</p>
      <p>For service details, see <a href="/manuscript-editing">book and professional manuscript editing</a>.</p>
      <h2>Editing stages for authors</h2>
      <table><thead><tr><th>Stage</th><th>Focus</th><th>Best timing</th></tr></thead><tbody>
      <tr><td>Developmental editing</td><td>Structure, argument, sequence, reader promise.</td><td>Early or middle draft.</td></tr>
      <tr><td>Line editing</td><td>Style, voice, rhythm, sentence flow.</td><td>After structure is stable.</td></tr>
      <tr><td>Copyediting</td><td>Grammar, usage, consistency, factual queries.</td><td>Late manuscript stage.</td></tr>
      <tr><td>Proofreading</td><td>Typos, punctuation, layout and final consistency.</td><td>Final stage before publishing or sending.</td></tr>
      </tbody></table>
      <h2>How to choose</h2>
      <p>If chapters still move around, choose editing. If the manuscript reads well and you are mainly catching typos, choose proofreading. If you have just accepted major edits, proofread afterward because author revisions can introduce new errors.</p>
      <p>For general price factors, see <a href="/blog/how-much-does-proofreading-cost">how much proofreading costs</a> or use the <a href="/pricing">pricing page</a>.</p>
    `,
  },
  {
    slug: "proofread-tables-and-figures-research-paper",
    title: "How to Proofread Tables and Figures in a Research Paper",
    seoTitle: "How to Proofread Tables and Figures in a Research Paper",
    metaDescription: "Proofread tables and figures in a research paper by checking numbering, captions, units, labels, abbreviations, statistical wording, text callouts, notes, accessibility, and final files.",
    excerpt: "A research-paper checklist for proofreading tables, figures, captions, labels, units, abbreviations, and final exported files.",
    author,
    date: published,
    updated: published,
    readTime: "8 min read",
    tags: ["Research Papers", "Tables", "Figures"],
    category: "Research and Journals",
    heroImage: academicImage,
    heroImageAlt: "Research paper tables and figures being proofread for consistency",
    summary: ["Check tables and figures separately from body text.", "Match every caption and callout.", "Inspect the final exported file because layout can shift."],
    faqs: [
      { question: "Should every table and figure be mentioned in the text?", answer: "Usually yes. Each table or figure should have a clear callout where the reader needs it." },
      { question: "Can proofreading verify statistics?", answer: "Proofreading can check wording and visible consistency, but statistical correctness needs author or specialist verification." },
      { question: "Why check the final PDF?", answer: "Export can change page breaks, image resolution, caption placement, and table splits." },
    ],
    content: `
      <p>To proofread tables and figures in a research paper, review them as their own system. Tables, captions, units, labels, abbreviations, and text callouts often change after the main text seems finished.</p>
      <p>For journal submission support, see <a href="/journal-paper-editing">journal paper editing</a>.</p>
      <h2>Tables and figures checklist</h2>
      <table><thead><tr><th>Area</th><th>Check</th><th>Common issue</th></tr></thead><tbody>
      <tr><td>Numbering</td><td>Sequential table and figure labels.</td><td>Deleted figure leaves a numbering gap.</td></tr>
      <tr><td>Captions</td><td>Clear titles, notes, abbreviations, and source statements.</td><td>Caption wording differs from text.</td></tr>
      <tr><td>Units and labels</td><td>Axes, columns, units, decimals, and symbols.</td><td>Mixed units or unexplained abbreviations.</td></tr>
      <tr><td>Text callouts</td><td>Every table or figure is introduced at the right point.</td><td>Text refers to an old table number.</td></tr>
      <tr><td>Accessibility</td><td>Readable contrast, alt text where required, and non-color-only meaning.</td><td>Color alone carries the result.</td></tr>
      </tbody></table>
      <h2>Final export review</h2>
      <p>Open the final PDF or portal preview. Check resolution, page breaks, table splits, caption placement, and whether source notes remain attached to the correct item.</p>
      <p>For related language support, compare <a href="/academic-editing">academic editing</a> and <a href="/blog/journal-manuscript-editing-submission">journal manuscript editing before submission</a>.</p>
    `,
  },
];
