import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/layouts/container";
import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";
import { SITE_CONTACT } from "@/lib/site";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="relative flex-1 overflow-hidden pb-20 pt-28 sm:pt-32">
        <div className="absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(circle_at_top,_rgba(30,58,138,0.10),_transparent_58%)]" />
        <Container className="grid gap-10 lg:grid-cols-[0.82fr_1fr] lg:items-start">
          <section className="space-y-6">
            <span className="inline-flex rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Secure contact
            </span>
            <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Talk with Peekbooks
            </h1>
            <p className="max-w-xl text-base leading-8 text-muted-foreground">
              Send project questions, attachment-based enquiries, or payment follow-up notes. Messages are stored in a private admin inbox so replies stay in one conversation.
            </p>
            <div className="rounded-[24px] border border-border/70 bg-white p-5 text-sm leading-7 text-muted-foreground shadow-sm">
              <p className="font-semibold text-foreground">Direct email</p>
              <a className="text-primary" href={`mailto:${SITE_CONTACT.publicEmail}`}>
                {SITE_CONTACT.publicEmail}
              </a>
              <p className="mt-4 font-semibold text-foreground">Phone</p>
              <a className="text-primary" href={`tel:${SITE_CONTACT.phone.replace(/\s+/g, "")}`}>
                {SITE_CONTACT.phone}
              </a>
            </div>
          </section>
          <ContactForm />
        </Container>
      </main>
      <Footer />
    </>
  );
}
