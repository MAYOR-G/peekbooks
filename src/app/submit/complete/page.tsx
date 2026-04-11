import { SubmitComplete } from "@/components/submit/submit-complete";
import { Container } from "@/components/layouts/container";
import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";

export default async function SubmitCompletePage({
  searchParams,
}: {
  searchParams: Promise<{
    reference?: string | string[];
    trxref?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const reference = firstParam(params.reference) ?? firstParam(params.trxref);

  return (
    <>
      <Navbar />
      <main className="relative flex-1 overflow-hidden pb-20 pt-28 sm:pt-32">
        <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_top,_rgba(30,58,138,0.10),_transparent_60%)]" />

        <Container className="max-w-[1240px]">
          <SubmitComplete reference={reference ?? null} />
        </Container>
      </main>
      <Footer />
    </>
  );
}

function firstParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value ?? null;
}
