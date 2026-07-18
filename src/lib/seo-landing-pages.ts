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
    metaDescription: "Dissertation proofreading for grammar, headings, references, tables, figures, cross-references and university formatting, with tracked changes where applicable.",
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
      {
        heading: "When a dissertation is ready for proofreading",
        body: "Proofreading is most efficient after the argument, chapter order, supervisor revisions, tables, figures, appendices, and reference list are stable. If chapters still need substantial restructuring, paragraph development, or rewriting for clarity, choose editing before the final proofread.",
      },
      {
        heading: "Consistency across a long dissertation",
        body: "The review can check grammar, spelling, punctuation, capitalization, abbreviations, tense, terminology, headings, numbering, captions, and cross-references across chapters. British or American English preferences and supplied graduate-school rules are applied consistently rather than guessed.",
      },
      {
        heading: "Front matter, tables, figures, and appendices",
        body: "A final dissertation check can include the title page, abstract, contents lists, lists of tables and figures, chapter headings, captions, footnotes, appendices, and visible links between the main text and supporting material. Editors flag missing or inconsistent items for the author to resolve.",
      },
      {
        heading: "Citations and reference-list consistency",
        body: "Editors can check visible consistency between in-text citations and the reference list, names, dates, punctuation, capitalization, and the supplied referencing style. They do not verify the truth of sources, invent missing references, or guarantee that every bibliographic record is complete unless a separate reference-checking scope is agreed.",
      },
      {
        heading: "Tracked changes and what happens after delivery",
        body: "Where the file format supports it, edits are returned with tracked changes and comments. The author should allow time to accept or reject revisions, answer comments, update cross-references after changes, and inspect the final exported file before submission.",
      },
      {
        heading: "Turnaround, pricing, and what to upload",
        body: "Timing and price depend on the final word count, service level, document condition, tables and figures, formatting or reference work, specialist material, and the available delivery window. Upload the stable manuscript, university instructions, preferred English variety, deadline, and any supervisor comments that affect the agreed scope.",
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
      { label: "How Long Thesis Proofreading Takes", href: "/blog/how-long-does-thesis-proofreading-take" },
    ],
  },
  {
    slug: "thesis-proofreading",
    title: "Thesis Proofreading Services",
    metaTitle: "Thesis Proofreading Services for Master’s and PhD Work",
    metaDescription: "Final-stage thesis proofreading for Master’s and PhD work, covering language, long-document consistency, references, tables, figures and British or American English.",
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
      {
        heading: "Final-stage proofreading for Master’s and doctoral theses",
        body: "A thesis is ready for proofreading when its research question, evidence, chapter sequence, supervisor revisions, and core conclusions are settled. The proofread then concentrates on language accuracy and final-document consistency rather than developing the argument.",
      },
      {
        heading: "Long-document consistency and thesis cross-references",
        body: "The review can track terminology, abbreviations, tense, capitalization, headings, numbering, table and figure labels, equation presentation, citations, bibliography style, and references between chapters and appendices. Authors remain responsible for checking data, equations, and the final correctness of every cross-reference.",
      },
      {
        heading: "Supervisor and graduate-school requirements",
        body: "Provide the current graduate-school template, supervisor comments, style guide, submission checklist, and required English variety. Institution instructions take priority over a general preference for British or American English.",
      },
      {
        heading: "Author review, scheduling, and service boundaries",
        body: "Plan a separate author-review period after delivery so you can evaluate tracked changes, answer comments, and check the final file. Proofreading does not write research, restructure an unfinished thesis, alter data, guarantee an examination result, or replace supervisor approval. If the language still needs paragraph- or chapter-level work, thesis editing should come first.",
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
      { label: "Thesis editing", href: "/thesis-editing" },
      { label: "Editing services", href: "/services/editing" },
      { label: "Pricing", href: "/pricing" },
      { label: "Submit manuscript", href: "/submit" },
    ],
    relatedPosts: [
      { label: "Thesis Editing vs Proofreading", href: "/blog/thesis-editing-vs-proofreading" },
      { label: "How Long Thesis Proofreading Takes", href: "/blog/how-long-does-thesis-proofreading-take" },
      { label: "British vs American English", href: "/blog/british-vs-american-english-thesis-journal" },
    ],
  },
  {
    slug: "thesis-editing",
    title: "Thesis Editing Services",
    metaTitle: "Thesis Editing Services for Master’s and PhD Research",
    metaDescription: "Thesis editing for sentence clarity, paragraph flow, academic tone and chapter consistency while preserving the author’s argument and research decisions.",
    keywords: ["thesis editing", "thesis editing services", "thesis editor", "edit my thesis"],
    audience: "Master’s and doctoral researchers whose thesis content is substantially drafted but still needs sentence-, paragraph-, and chapter-level clarity work before final proofreading.",
    intro: "Thesis editing improves how an established research argument is communicated. PeekBooks Editors works on sentence clarity, paragraph flow, academic tone, repetition, transitions, and consistency while preserving the author’s evidence, voice, and scholarly decisions.",
    benefits: [
      "Clearer sentences and paragraphs without replacing the author’s argument.",
      "Stronger transitions and more consistent terminology across chapters.",
      "Comments where evidence, meaning, or structure requires an author decision.",
      "Tracked changes where the document format supports them.",
    ],
    process: sharedProcess,
    whoFor: ["Master’s thesis authors", "Doctoral researchers", "Multilingual authors writing in English", "Authors responding to supervisor comments before final proofreading"],
    sections: [
      {
        heading: "Thesis editing versus thesis proofreading",
        body: "Editing is appropriate when sentences, paragraph flow, repetition, academic tone, or chapter transitions still impede the reader. Proofreading is a later, narrower check for grammar, punctuation, spelling, formatting, and consistency after the writing is stable. Some theses need editing first and a separate final proofread after author revisions.",
      },
      {
        heading: "Sentence-level editing and paragraph flow",
        body: "An editor can clarify long or ambiguous sentences, reduce unnecessary repetition, improve transitions, and help each paragraph establish one clear purpose. Changes should make the reasoning easier to follow without adding claims or evidence that the thesis has not established.",
      },
      {
        heading: "Alignment across thesis chapters",
        body: "The review can compare the abstract and introduction with the stated aims, help the literature review maintain a clear line of discussion, improve methodology presentation, and make results and discussion sections easier to read. Comments flag mismatches or gaps that require the author’s scholarly judgment.",
      },
      {
        heading: "Academic tone, terminology, and repetition",
        body: "Editing can replace vague or inflated wording with precise academic language, unify terminology and abbreviations, and reduce repeated explanations across chapters. Discipline-specific terms are retained when they carry necessary meaning.",
      },
      {
        heading: "Author decisions, Track Changes, and academic integrity",
        body: "Where possible, revisions are delivered with Track Changes so the author can accept, reject, or adapt them. Editors may comment on unclear logic or missing context, but they do not invent arguments, fabricate citations, rewrite research as their own, alter data, or promise examiner approval, grades, or publication.",
      },
      {
        heading: "How pricing and turnaround are determined",
        body: "The quote and schedule depend on final word count, the level of language intervention, document condition, technical material, tables and figures, formatting or reference work, and the delivery window available. Upload a representative, stable draft plus supervisor or institution instructions so the scope can be confirmed accurately.",
      },
    ],
    faqs: [
      ...academicFaqs,
      {
        question: "Can thesis editing preserve my voice?",
        answer: "Yes. The editor’s role is to clarify the writing while preserving the author’s meaning and research contribution. Track Changes and comments allow you to review every important decision.",
      },
      {
        question: "Should proofreading happen after thesis editing?",
        answer: "Usually, yes. After you review the edits and make any final content changes, a separate proofread can check the stable document for remaining language and formatting errors.",
      },
    ],
    relatedServices: [
      { label: "Thesis proofreading", href: "/thesis-proofreading" },
      { label: "Dissertation proofreading", href: "/dissertation-proofreading" },
      { label: "Academic editing", href: "/academic-editing" },
      { label: "Pricing", href: "/pricing" },
      { label: "Submit manuscript", href: "/submit" },
    ],
    relatedPosts: [
      { label: "Thesis Editing vs Proofreading", href: "/blog/thesis-editing-vs-proofreading" },
      { label: "How Long Thesis Proofreading Takes", href: "/blog/how-long-does-thesis-proofreading-take" },
      { label: "British vs American English", href: "/blog/british-vs-american-english-thesis-journal" },
    ],
  },
  {
    slug: "academic-editing",
    title: "Academic Editing Services",
    metaTitle: "Academic Editing Services for Research Papers",
    metaDescription: "Academic paper editing for sentence clarity, paragraph flow, research-section readability, terminology and academic tone, with tracked changes where applicable.",
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
    whoFor: ["Research-paper authors", "Postgraduate students", "University researchers", "Multilingual academics", "Grant and proposal writers"],
    sections: [
      {
        heading: "What academic editing improves",
        body: "Academic editing goes beyond proofreading. It can refine long sentences, improve transitions, reduce repetition, clarify technical phrasing, and make the manuscript easier for reviewers, supervisors, and readers to follow.",
      },
      {
        heading: "Human editing for scholarly work",
        body: "Every project is reviewed by a human editor. Automated tools can catch surface errors, but scholarly writing often needs judgment about tone, emphasis, discipline conventions, and whether a revision preserves the author’s intended meaning.",
      },
      {
        heading: "Documents covered by academic editing",
        body: "Suitable documents include research papers, coursework, proposals, reports, conference papers, grant text, literature reviews, and academic chapters. Dedicated thesis and journal-paper services are available when the document needs thesis-specific continuity or target-journal preparation.",
      },
      {
        heading: "Research-paper sections and paragraph structure",
        body: "Editing can improve the readability of abstracts, introductions, literature reviews, methods, results, discussions, and conclusions. The editor checks whether sentences and paragraphs communicate the author’s intended relationship between purpose, evidence, interpretation, and limitations without changing the research itself.",
      },
      {
        heading: "Terminology and multilingual-author support",
        body: "The review can make English phrasing more natural, maintain discipline terminology, reduce ambiguous pronouns, and unify abbreviations, tense, and key terms. The author’s supplied glossary, institutional rules, or target-reader expectations guide decisions where several phrasings are possible.",
      },
      {
        heading: "Comments, tracked changes, and requirements",
        body: "Where possible, edits are shown with tracked changes and comments. Provide the style guide, assessment instructions, supervisor notes, or journal requirements that affect the scope. Comments identify places where only the author can confirm evidence, meaning, or disciplinary accuracy.",
      },
      {
        heading: "What an academic editor will not do",
        body: "Academic editing does not write assessed work for the author, create results, invent sources, fabricate arguments, alter data, hide plagiarism, or guarantee grades, publication, journal acceptance, or supervisor approval.",
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
      { label: "Thesis editing", href: "/thesis-editing" },
      { label: "Dissertation proofreading", href: "/dissertation-proofreading" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
    relatedPosts: [
      { label: "How Editing Improves Clarity", href: "/blog/professional-editing-clarity-structure-readability" },
      { label: "Journal Manuscript Editing", href: "/blog/journal-manuscript-editing-submission" },
      { label: "British vs American English", href: "/blog/british-vs-american-english-thesis-journal" },
    ],
  },
  {
    slug: "manuscript-editing",
    title: "Book and Professional Manuscript Editing Services",
    metaTitle: "Book and Professional Manuscript Editing Services",
    metaDescription: "Professional manuscript editing for books, reports and long-form author documents, covering clarity, voice, flow, consistency and publication preparation.",
    keywords: ["manuscript editing", "manuscript editing services", "professional manuscript editor", "book manuscript editing"],
    audience: "Book authors, nonfiction writers, professionals, and organizations preparing long-form manuscripts for publication, stakeholder review, or professional use.",
    intro: "Manuscript editing helps a draft become clearer, more consistent, and easier to read. PeekBooks Editors reviews sentence structure, flow, tone, grammar, consistency, and presentation while preserving the author’s intent.",
    benefits: [
      "Sharper sentences and smoother transitions.",
      "Reduced repetition, ambiguity, and wordiness.",
      "Consistent terminology, style, capitalization, and formatting cues.",
      "A professional editorial pass before submission, publication, or stakeholder review.",
    ],
    process: sharedProcess,
    whoFor: ["Book authors", "Independent authors", "Business and policy writers", "Nonfiction writers", "Organizations preparing long-form publications"],
    sections: [
      {
        heading: "Manuscript editing for different document types",
        body: "The right edit depends on the manuscript. A nonfiction book may need voice and long-range consistency, an author manuscript may need smoother narrative flow, and a professional report may need directness and executive readability. Scholarly journal articles belong on the dedicated journal-paper editing service.",
      },
      {
        heading: "Tracked changes and author review",
        body: "Where possible, edits are delivered with tracked changes so you can accept, reject, and understand revisions. Comments are used for unclear meaning, missing context, or choices that should remain with the author.",
      },
      {
        heading: "Long-form consistency and author voice",
        body: "A manuscript edit can check names, terminology, capitalization, chronology, headings, tone, and repeated ideas across a long document. Revisions aim to make the work coherent while preserving the author’s voice and intended audience.",
      },
      {
        heading: "What manuscript editing does not promise",
        body: "The service does not guarantee publication, publisher interest, sales, reviews, or reader response. Editors do not invent facts, write unsupported material, or replace the author’s responsibility for permissions, citations, legal review, and final publication decisions.",
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
    metaTitle: "Journal Paper and Manuscript Editing Before Submission",
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
      {
        heading: "Target-journal requirements and revised submissions",
        body: "Provide the current author instructions, reference style, word limits, figure requirements, reporting checklist, and reviewer or editor comments. Editing can improve the clarity of a revised manuscript and response text, but the author must decide how to address every scientific or editorial request.",
      },
      {
        heading: "Journal language, formatting, and reviewer readability",
        body: "The review can improve concise technical language, section transitions, terminology, abbreviations, captions, visible reference-style consistency, and the readability of the abstract, methods, results, and discussion. It does not assess research validity or guarantee that a journal will send the paper for review or accept it.",
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
      { label: "British vs American English", href: "/blog/british-vs-american-english-thesis-journal" },
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
      { label: "British vs American English", href: "/blog/british-vs-american-english-thesis-journal" },
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
      { label: "British vs American English", href: "/blog/british-vs-american-english-thesis-journal" },
    ],
  },
];

export function getSeoLandingPage(slug: string) {
  return SEO_LANDING_PAGES.find((page) => page.slug === slug);
}
