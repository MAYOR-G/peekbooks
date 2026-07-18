import { SubmitForm } from "@/components/submit/submit-form";
import { Container } from "@/components/layouts/container";
import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";
import { generateFAQSchema } from "@/lib/seo";

const submitFaqs = [
  {
    question: "What should I include when I submit my manuscript?",
    answer: "Upload the latest document version and include your service choice, turnaround, style guide, journal or university instructions, and any notes about sections that need special attention.",
  },
  {
    question: "Is the upload flow confidential?",
    answer: "Yes. Submitted files are handled through the private manuscript workflow and used only to quote, manage, and complete the requested editing or proofreading service.",
  },
  {
    question: "Can I submit a dissertation, thesis, CV, or business document?",
    answer: "Yes. The submit flow supports academic manuscripts, dissertations, theses, journal papers, business documents, CVs, resumes, and other professional writing projects.",
  },
];

export default function SubmitPage() {
  const faqSchema = generateFAQSchema(submitFaqs);

  return (
    <>
      <Navbar />
      <main className="relative flex-1 pb-20 pt-28 sm:pt-32">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <div className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(circle_at_top,_rgba(30,58,138,0.10),_transparent_58%)]" />
        <div className="absolute left-1/2 top-28 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/6 blur-[96px]" />

        <Container className="max-w-[1240px]">
          <SubmitForm />
        </Container>
        <Container className="mt-16 max-w-3xl">
          <section className="rounded-3xl border border-border/70 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-serif text-2xl font-bold text-foreground">Submission questions</h2>
            <div className="mt-6 space-y-4">
              {submitFaqs.map((faq) => (
                <details key={faq.question} className="rounded-2xl bg-slate-50 p-5">
                  <summary className="cursor-pointer font-semibold text-foreground">{faq.question}</summary>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
