import { SubmitForm } from "@/components/submit/submit-form";
import { Container } from "@/components/layouts/container";
import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";

export default function SubmitPage() {
  return (
    <>
      <Navbar />
      <main className="relative flex-1 overflow-hidden pb-20 pt-28 sm:pt-32">
        <div className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(circle_at_top,_rgba(30,58,138,0.10),_transparent_58%)]" />
        <div className="absolute left-1/2 top-28 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/6 blur-[96px]" />

        <Container className="max-w-[1240px]">
          <SubmitForm />
        </Container>
      </main>
      <Footer />
    </>
  );
}
