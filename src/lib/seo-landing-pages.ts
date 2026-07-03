export type SeoLandingPage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  audience: string;
  intro: string;
  benefits: string[];
  process: string[];
  whoFor: string[];
  sections: Array<{ heading: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedServices: Array<{ label: string; href: string }>;
  relatedPosts: Array<{ label: string; href: string }>;
};

const sharedProcess = [
  "Submit your document securely with the required style guide, journal instructions, or institutional requirements.",
  "We confirm the scope, word count, turnaround, and any specialist requirements before work begins.",
  "A human editor reviews grammar, clarity, consistency, formatting issues, and author-facing comments where helpful.",
  "You receive the edited file with tracked changes where applicable, plus notes on anything that needs your decision.",
];

const academicFaqs = [
  {
    question: "Will the editor change my academic argument?",
    answer: "No. PeekBooks Editors improves clarity, grammar, structure, and presentation while preserving your research meaning and academic integrity. Editors may flag unclear logic or missing context, but authors remain responsible for final scholarly decisions.",
  },
  {
    question: "Can you follow university or journal style requirements?",
    answer: "Yes. Include your department guidelines, supervisor comments, journal instructions, or required style guide when you submit the file. The editor will use those requirements when checking consistency, formatting, terminology, citations, and presentation.",
  },
  {
    question: "Is my document confidential?",
    answer: "Yes. Manuscripts are handled through a private submission workflow, and editorial access is limited to the work required for your project. We do not publish, share, or reuse client documents.",
  },
];

export const SEO_LANDING_PAGES: SeoLandingPage[] = [
  {
    slug: "dissertation-proofreading",
    title: "Dissertation Proofreading Services",
    metaTitle: "Dissertation Proofreading Services for Graduate Students",
    metaDescription: "Professional dissertation proofreading for grammar, formatting, citations, consistency, and final submission confidence. Get a secure quote today.",
    keywords: ["dissertation proofreading", "dissertation proofreading services", "PhD proofreading", "graduate proofreading"],
    audience: "PhD, DBA, EdD, master’s, and graduate students preparing a final dissertation for supervisor, committee, or university submission.",
    intro: "Dissertation proofreading is the final quality review before submission. PeekBooks Editors checks grammar, punctuation, spelling, consistency, headings, tables, citations, and formatting details so your research is presented cleanly and professionally.",
    benefits: [
      "Cleaner academic language without changing your research meaning.",
      "Consistent headings, terminology, capitalization, abbreviations, tables, figures, and references.",
      "Careful review of punctuation, grammar, spelling, tense, and sentence-level clarity.",
      "Comments for ambiguous wording, missing information, or formatting issues that need author confirmation.",
    ],
    process: sharedProcess,
    whoFor: ["Graduate students preparing final submission", "PhD candidates after supervisor revisions", "International students writing in English", "Researchers who need a final grammar and formatting check"],
    sections: [
      {
        heading: "What dissertation proofreading includes",
        body: "A dissertation proofread focuses on final-stage polish. The editor checks language accuracy, formatting consistency, chapter-level presentation, citation details, and obvious typographical errors. If your dissertation still needs argument restructuring or heavy rewriting, academic editing may be a better fit.",
      },
      {
        heading: "Academic integrity and author control",
        body: "Your editor improves presentation and readability while preserving your voice and research contribution. We do not write new research, invent citations, or alter findings. Where a sentence is unclear, the editor can suggest a clearer wording or leave a comment for your decision.",
      },
    ],
    faqs: [
      ...academicFaqs,
      {
        question: "When should I book dissertation proofreading?",
        answer: "Book proofreading after the dissertation content is stable and major supervisor revisions are complete. This prevents paying to proofread sections that may later be rewritten, moved, or removed.",
      },
    ],
    relatedServices: [
      { label: "Academic editing", href: "/academic-editing" },
      { label: "Thesis proofreading", href: "/thesis-proofreading" },
      { label: "Pricing", href: "/pricing" },
      { label: "Submit manuscript", href: "/submit" },
    ],
    relatedPosts: [
      { label: "Dissertation Proofreading Checklist", href: "/blog/dissertation-proofreading-checklist" },
      { label: "Academic Proofreading Cost in 2026", href: "/blog/academic-proofreading-cost-2026" },
    ],
  },
  {
    slug: "thesis-proofreading",
    title: "Thesis Proofreading Services",
    metaTitle: "Thesis Proofreading Services for Master’s and PhD Work",
    metaDescription: "Human thesis proofreading for grammar, formatting, citations, clarity, and consistency. Prepare your thesis for confident submission.",
    keywords: ["thesis proofreading", "thesis proofreading service", "master thesis proofreading", "PhD thesis proofreading"],
    audience: "Master’s and doctoral students who need a careful final review before submitting their thesis.",
    intro: "Thesis proofreading helps remove avoidable language and formatting errors before your work reaches supervisors, examiners, or a graduate school office. PeekBooks Editors provides human review for clarity, consistency, grammar, and academic presentation.",
    benefits: [
      "Correction of grammar, punctuation, spelling, and usage errors.",
      "Consistent terminology, tense, heading style, tables, figures, and captions.",
      "Final checks for references, citations, bibliography formatting, and cross-references.",
      "Secure handling of unpublished academic work.",
    ],
    process: sharedProcess,
    whoFor: ["Master’s students", "Doctoral students", "ESL and international students", "Researchers converting thesis chapters into papers"],
    sections: [
      {
        heading: "Proofreading vs thesis editing",
        body: "Proofreading is best when the thesis argument, chapter structure, and evidence are already settled. Editing is more suitable when you need help with flow, transitions, sentence structure, and readability before the final proofread.",
      },
      {
        heading: "Style guide support",
        body: "Editors can work with APA, MLA, Chicago, Harvard, Vancouver, or university-specific requirements when you provide the relevant instructions. The review focuses on consistency and clean presentation rather than changing scholarly substance.",
      },
    ],
    faqs: [
      ...academicFaqs,
      {
        question: "Can you proofread a thesis with tables and figures?",
        answer: "Yes. Editors check captions, numbering, references to tables and figures, spacing, and consistency. They do not verify the scientific accuracy of data values unless that is agreed as a specialist scope.",
      },
    ],
    relatedServices: [
      { label: "Dissertation proofreading", href: "/dissertation-proofreading" },
      { label: "Academic editing", href: "/academic-editing" },
      { label: "Editing services", href: "/services/editing" },
      { label: "Submit manuscript", href: "/submit" },
    ],
    relatedPosts: [
      { label: "Thesis Editing vs Proofreading", href: "/blog/thesis-editing-vs-proofreading" },
      { label: "Research Paper Mistakes", href: "/blog/research-paper-grammar-formatting-mistakes" },
    ],
  },
  {
    slug: "academic-editing",
    title: "Academic Editing Services",
    metaTitle: "Academic Editing Services for Research Papers and Theses",
    metaDescription: "Academic editing for theses, dissertations, journal papers, and research manuscripts. Improve clarity, structure, tone, and readability.",
    keywords: ["academic editing", "academic editing services", "research paper editing", "English academic editing"],
    audience: "Researchers, postgraduate students, academics, and international authors preparing scholarly documents in English.",
    intro: "Academic editing improves how your research is communicated. PeekBooks Editors focuses on clarity, flow, sentence structure, terminology consistency, tone, and reader comprehension while protecting your meaning and academic integrity.",
    benefits: [
      "Improved readability and logical flow at sentence and paragraph level.",
      "More precise academic tone without unnecessary jargon or inflated language.",
      "Cleaner transitions between methods, results, discussion, and conclusion sections.",
      "Editorial comments that flag unclear claims, missing context, or author decisions.",
    ],
    process: sharedProcess,
    whoFor: ["Journal authors", "Graduate students", "University researchers", "ESL academics", "Grant and proposal writers"],
    sections: [
      {
        heading: "What academic editing improves",
        body: "Academic editing goes beyond proofreading. It can refine long sentences, improve transitions, reduce repetition, clarify technical phrasing, and make the manuscript easier for reviewers, supervisors, and readers to follow.",
      },
      {
        heading: "Human editing for scholarly work",
        body: "Every project is reviewed by a human editor. Automated tools can catch surface errors, but scholarly writing often needs judgment about tone, emphasis, discipline conventions, and whether a revision preserves the author’s intended meaning.",
      },
    ],
    faqs: [
      ...academicFaqs,
      {
        question: "Do you edit for non-native English authors?",
        answer: "Yes. Academic editing is especially useful for authors who want more natural English phrasing, clearer sentence structure, and a polished scholarly tone while keeping their original ideas intact.",
      },
    ],
    relatedServices: [
      { label: "Journal paper editing", href: "/journal-paper-editing" },
      { label: "Dissertation proofreading", href: "/dissertation-proofreading" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
    relatedPosts: [
      { label: "How Editing Improves Clarity", href: "/blog/professional-editing-clarity-structure-readability" },
      { label: "Journal Manuscript Editing", href: "/blog/journal-manuscript-editing-submission" },
    ],
  },
  {
    slug: "manuscript-editing",
    title: "Manuscript Editing Services",
    metaTitle: "Manuscript Editing Services for Authors and Researchers",
    metaDescription: "Professional manuscript editing for academic papers, books, reports, and professional documents. Improve clarity, structure, and readiness.",
    keywords: ["manuscript editing", "manuscript editing services", "professional manuscript editor", "book manuscript editing"],
    audience: "Researchers, authors, professionals, and organizations preparing manuscripts for publication, submission, or review.",
    intro: "Manuscript editing helps a draft become clearer, more consistent, and easier to read. PeekBooks Editors reviews sentence structure, flow, tone, grammar, consistency, and presentation while preserving the author’s intent.",
    benefits: [
      "Sharper sentences and smoother transitions.",
      "Reduced repetition, ambiguity, and wordiness.",
      "Consistent terminology, style, capitalization, and formatting cues.",
      "A professional editorial pass before submission, publication, or stakeholder review.",
    ],
    process: sharedProcess,
    whoFor: ["Academic authors", "Independent authors", "Business writers", "Nonfiction writers", "Researchers preparing manuscripts for journals"],
    sections: [
      {
        heading: "Manuscript editing for different document types",
        body: "The right edit depends on the manuscript. A journal paper may need concise technical language, a book manuscript may need rhythm and consistency, and a business report may need directness and executive readability.",
      },
      {
        heading: "Tracked changes and author review",
        body: "Where possible, edits are delivered with tracked changes so you can accept, reject, and understand revisions. Comments are used for unclear meaning, missing context, or choices that should remain with the author.",
      },
    ],
    faqs: [
      {
        question: "Is manuscript editing the same as proofreading?",
        answer: "No. Editing improves clarity, flow, wording, tone, and structure. Proofreading is the final check for grammar, spelling, punctuation, and formatting errors after the text is already stable.",
      },
      {
        question: "Can I submit a book manuscript?",
        answer: "Yes. PeekBooks Editors can review nonfiction, fiction, professional, and academic book manuscripts. Large manuscripts may require custom timing and a confirmed quote after review.",
      },
      {
        question: "Will the editor rewrite my manuscript?",
        answer: "The editor may revise sentences for clarity and flow, but the work remains yours. We do not ghostwrite, add unsupported claims, or replace author judgment.",
      },
    ],
    relatedServices: [
      { label: "Journal paper editing", href: "/journal-paper-editing" },
      { label: "Business document editing", href: "/business-document-editing" },
      { label: "Pricing", href: "/pricing" },
      { label: "Submit manuscript", href: "/submit" },
    ],
    relatedPosts: [
      { label: "Professional Editing and Readability", href: "/blog/professional-editing-clarity-structure-readability" },
      { label: "Editing vs Proofreading", href: "/blog/editing-vs-proofreading" },
    ],
  },
  {
    slug: "journal-paper-editing",
    title: "Journal Paper Editing Services",
    metaTitle: "Journal Paper Editing Services Before Submission",
    metaDescription: "Prepare your research article for journal submission with human editing for clarity, structure, grammar, formatting, and reviewer readability.",
    keywords: ["journal paper editing", "journal manuscript editing", "research article editing", "paper editing service"],
    audience: "Researchers and academics preparing articles, reviews, case reports, or short communications for journal submission.",
    intro: "Journal paper editing prepares a manuscript for reviewers by improving clarity, concision, structure, grammar, and consistency. PeekBooks Editors helps authors present their work in polished English before submission.",
    benefits: [
      "Clearer abstract, introduction, methods, results, discussion, and conclusion sections.",
      "Concise sentences that reduce reviewer friction.",
      "Consistent terminology, abbreviations, tables, figures, and reference style cues.",
      "Support for journal instructions when supplied by the author.",
    ],
    process: sharedProcess,
    whoFor: ["First-time journal authors", "International research teams", "Postdoctoral researchers", "Clinicians and scientists preparing papers"],
    sections: [
      {
        heading: "Before journal submission",
        body: "A strong paper is not only correct; it is easy for reviewers to follow. Editing can clarify the research question, tighten transitions, reduce wordiness, and make the manuscript read as a coherent contribution.",
      },
      {
        heading: "Responsible editing support",
        body: "Editors do not guarantee acceptance or manipulate results. The service improves presentation and language quality so the editorial decision can focus on the research itself.",
      },
    ],
    faqs: [
      ...academicFaqs,
      {
        question: "Can you format my paper for a specific journal?",
        answer: "If you provide the target journal’s author instructions, the editor can check visible formatting and style consistency. Complex template conversion may be handled as a formatting service.",
      },
    ],
    relatedServices: [
      { label: "Academic editing", href: "/academic-editing" },
      { label: "Manuscript editing", href: "/manuscript-editing" },
      { label: "Additional services", href: "/services/additional" },
      { label: "Submit manuscript", href: "/submit" },
    ],
    relatedPosts: [
      { label: "Journal Manuscript Editing Before Submission", href: "/blog/journal-manuscript-editing-submission" },
      { label: "Research Paper Grammar and Formatting Mistakes", href: "/blog/research-paper-grammar-formatting-mistakes" },
    ],
  },
  {
    slug: "cv-editing-service",
    title: "CV Editing Service",
    metaTitle: "CV Editing Service for Academic and Professional Applications",
    metaDescription: "Professional CV and resume editing for clarity, structure, grammar, tone, and application readiness. Improve your document before submission.",
    keywords: ["CV editing service", "resume editing", "academic CV editing", "professional CV proofreading"],
    audience: "Applicants, academics, graduates, executives, and professionals preparing CVs, resumes, cover letters, or personal statements.",
    intro: "A CV editing service helps your experience read clearly, professionally, and consistently. PeekBooks Editors reviews grammar, structure, phrasing, formatting, and role alignment so your application materials are easier to scan.",
    benefits: [
      "Clearer achievement-led bullet points.",
      "Consistent tense, formatting, punctuation, and capitalization.",
      "Professional tone for academic, corporate, and graduate applications.",
      "Improved readability without exaggerating credentials.",
    ],
    process: sharedProcess,
    whoFor: ["Job seekers", "Graduate school applicants", "Academic researchers", "Professionals changing roles", "Applicants writing in English as an additional language"],
    sections: [
      {
        heading: "CV editing that keeps your record honest",
        body: "A strong CV should clarify your experience, not inflate it. Editors improve wording, organization, and readability while preserving the accuracy of your education, roles, publications, awards, and responsibilities.",
      },
      {
        heading: "Application document support",
        body: "You can submit a CV, resume, cover letter, personal statement, LinkedIn summary, or supporting application text. The editor can help create consistency across the full application package.",
      },
    ],
    faqs: [
      {
        question: "Can you edit an academic CV?",
        answer: "Yes. Editors can review academic CVs for publications, conference papers, grants, teaching experience, research roles, and formatting consistency while preserving field-specific conventions.",
      },
      {
        question: "Do you write resumes from scratch?",
        answer: "PeekBooks Editors focuses on editing and improving existing documents. If you need writing support, submit your materials and request guidance so the team can confirm the appropriate scope.",
      },
      {
        question: "Can you edit a cover letter with my CV?",
        answer: "Yes. You can submit both documents so the editor can improve tone, grammar, consistency, and alignment between your CV and application letter.",
      },
    ],
    relatedServices: [
      { label: "Business document editing", href: "/business-document-editing" },
      { label: "Additional services", href: "/services/additional" },
      { label: "Pricing", href: "/pricing" },
      { label: "Submit document", href: "/submit" },
    ],
    relatedPosts: [
      { label: "How Editing Improves Clarity", href: "/blog/professional-editing-clarity-structure-readability" },
      { label: "Editing vs Proofreading", href: "/blog/editing-vs-proofreading" },
    ],
  },
  {
    slug: "business-document-editing",
    title: "Business Document Editing Services",
    metaTitle: "Business Document Editing Services for Clear Professional Writing",
    metaDescription: "Business document editing for reports, proposals, website copy, presentations, manuals, and professional communications.",
    keywords: ["business document editing", "business proofreading", "professional document editing", "proposal editing"],
    audience: "Companies, consultants, founders, nonprofit teams, and professionals preparing business-critical writing.",
    intro: "Business document editing improves clarity, tone, structure, grammar, and consistency so readers can act on your message. PeekBooks Editors supports reports, proposals, manuals, website copy, presentations, and professional communications.",
    benefits: [
      "Clearer executive language and fewer distracting errors.",
      "Consistent terminology, tone, formatting, headings, and punctuation.",
      "Improved flow for proposals, reports, manuals, and public-facing copy.",
      "Confidential handling of sensitive commercial documents.",
    ],
    process: sharedProcess,
    whoFor: ["Business owners", "Consultants", "Corporate teams", "Nonprofit teams", "Professionals preparing reports and proposals"],
    sections: [
      {
        heading: "Editing for business outcomes",
        body: "Business writing needs to be direct, credible, and easy to scan. Editors improve sentence clarity, remove ambiguity, tighten repetitive phrasing, and help the document sound professional for its intended audience.",
      },
      {
        heading: "Documents we can support",
        body: "Common projects include proposals, annual reports, manuals, presentations, training materials, web pages, marketing copy, policy documents, and client-facing communications.",
      },
    ],
    faqs: [
      {
        question: "Can you edit confidential business documents?",
        answer: "Yes. Business documents are handled through a secure submission workflow, and access is limited to the editorial work required for your project.",
      },
      {
        question: "Will you change our brand voice?",
        answer: "No. Editors improve clarity and consistency while respecting your intended brand voice. Provide tone guidelines or sample copy if your organization has established language rules.",
      },
      {
        question: "Can you edit website copy?",
        answer: "Yes. Website copy can be edited for grammar, clarity, scanability, tone, consistency, and reader action. For SEO copy needs, include target pages and preferred keywords in your brief.",
      },
    ],
    relatedServices: [
      { label: "CV editing service", href: "/cv-editing-service" },
      { label: "Manuscript editing", href: "/manuscript-editing" },
      { label: "Contact", href: "/contact" },
      { label: "Submit document", href: "/submit" },
    ],
    relatedPosts: [
      { label: "Professional Editing and Readability", href: "/blog/professional-editing-clarity-structure-readability" },
      { label: "Academic Proofreading Cost in 2026", href: "/blog/academic-proofreading-cost-2026" },
    ],
  },
  {
    slug: "proofreading-services-uk",
    title: "Proofreading Services UK",
    metaTitle: "Proofreading Services UK | Academic and Professional Editing",
    metaDescription: "UK proofreading services for academic, business, CV, and manuscript documents. Human editors, secure handling, and clear quotes.",
    keywords: ["proofreading services UK", "UK proofreading", "academic proofreading UK", "professional proofreading UK"],
    audience: "Students, researchers, authors, and professionals in the United Kingdom who need English proofreading or editing support.",
    intro: "PeekBooks Editors provides proofreading services for UK clients preparing academic, business, CV, and manuscript documents. Our editors support British English conventions, style consistency, grammar, punctuation, and final presentation.",
    benefits: [
      "Support for British English spelling, punctuation, and usage where requested.",
      "Secure online submission for clients across England, Scotland, Wales, and Northern Ireland.",
      "Academic and professional document review with transparent quoting.",
      "Human editing for grammar, clarity, consistency, and formatting details.",
    ],
    process: sharedProcess,
    whoFor: ["UK university students", "Researchers preparing journal papers", "Professionals applying for roles", "Businesses preparing reports and proposals"],
    sections: [
      {
        heading: "UK academic and professional proofreading",
        body: "Whether you are preparing a dissertation in Glasgow, a journal paper in London, or a business report for a UK client, your editor can work with British English preferences and supplied institutional or brand requirements.",
      },
      {
        heading: "Online service with clear communication",
        body: "The workflow is remote and secure. Submit your document, choose the service and turnaround, and receive your edited file digitally. Contact support if your project needs a custom scope.",
      },
    ],
    faqs: [
      {
        question: "Do you proofread in British English?",
        answer: "Yes. Request British English during submission and include any university, journal, or organization style requirements. Editors can check spelling, punctuation, terminology, and formatting consistency against those preferences.",
      },
      {
        question: "Are you only for UK clients?",
        answer: "No. PeekBooks Editors supports clients worldwide, with service pages for UK and USA clients because spelling, style, and submission expectations can differ by region.",
      },
      {
        question: "Can UK students submit dissertations and theses?",
        answer: "Yes. UK students can submit dissertations, theses, essays, research papers, and application documents for proofreading or editing.",
      },
    ],
    relatedServices: [
      { label: "Dissertation proofreading", href: "/dissertation-proofreading" },
      { label: "Thesis proofreading", href: "/thesis-proofreading" },
      { label: "Proofreading services USA", href: "/proofreading-services-usa" },
      { label: "Pricing", href: "/pricing" },
    ],
    relatedPosts: [
      { label: "Dissertation Proofreading Checklist", href: "/blog/dissertation-proofreading-checklist" },
      { label: "Academic Proofreading Cost in 2026", href: "/blog/academic-proofreading-cost-2026" },
    ],
  },
  {
    slug: "proofreading-services-usa",
    title: "Proofreading Services USA",
    metaTitle: "Proofreading Services USA | Academic and Professional Editing",
    metaDescription: "USA proofreading services for academic papers, dissertations, business documents, CVs, and manuscripts. Human editors and secure submission.",
    keywords: ["proofreading services USA", "US proofreading", "academic proofreading USA", "American English proofreading"],
    audience: "Students, researchers, authors, and professionals in the United States who need English proofreading or editing support.",
    intro: "PeekBooks Editors provides proofreading services for USA clients preparing academic, business, CV, and manuscript documents. Editors can support American English spelling, grammar, punctuation, and style consistency when requested.",
    benefits: [
      "Support for American English conventions and US academic requirements.",
      "Secure online submission for clients across the United States.",
      "Human proofreading and editing for academic, business, and author documents.",
      "Clear pricing flow with service and turnaround selection.",
    ],
    process: sharedProcess,
    whoFor: ["US university students", "Researchers preparing journal papers", "Professionals preparing CVs and resumes", "Businesses preparing client-facing documents"],
    sections: [
      {
        heading: "US academic and professional proofreading",
        body: "Editors can work with APA, MLA, Chicago, AMA, university instructions, journal requirements, or business style guidance supplied by the client. The goal is clean, consistent English that supports your submission purpose.",
      },
      {
        heading: "Remote proofreading with secure handling",
        body: "Upload your file through the submission flow, choose your service and turnaround, and receive the edited document digitally. For large or complex documents, contact support before submission.",
      },
    ],
    faqs: [
      {
        question: "Do you proofread in American English?",
        answer: "Yes. Request American English during submission and include any style requirements. Editors can check spelling, punctuation, grammar, terminology, and formatting consistency against US conventions.",
      },
      {
        question: "Can you edit documents for US universities?",
        answer: "Yes. PeekBooks Editors supports dissertations, theses, research papers, application documents, personal statements, and journal manuscripts for US academic contexts.",
      },
      {
        question: "Do you guarantee acceptance or grades?",
        answer: "No. Ethical editing improves presentation and readability but cannot guarantee grades, admissions outcomes, publication, or journal acceptance.",
      },
    ],
    relatedServices: [
      { label: "Academic editing", href: "/academic-editing" },
      { label: "Journal paper editing", href: "/journal-paper-editing" },
      { label: "Proofreading services UK", href: "/proofreading-services-uk" },
      { label: "Submit manuscript", href: "/submit" },
    ],
    relatedPosts: [
      { label: "Thesis Editing vs Proofreading", href: "/blog/thesis-editing-vs-proofreading" },
      { label: "Journal Manuscript Editing", href: "/blog/journal-manuscript-editing-submission" },
    ],
  },
];

export function getSeoLandingPage(slug: string) {
  return SEO_LANDING_PAGES.find((page) => page.slug === slug);
}
