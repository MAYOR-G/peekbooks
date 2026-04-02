"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BookOpenText } from "lucide-react";

import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Container } from "@/components/layouts/container";
import { Button } from "@/components/ui/button";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 w-full pt-20">
        <section className="relative overflow-hidden border-b border-white/10 bg-primary pb-20 pt-24">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
          <div className="absolute right-0 top-0 h-full w-1/2 rounded-bl-full bg-linear-to-bl from-white/5 to-transparent blur-3xl pointer-events-none" />

          <Container className="relative z-10 flex flex-col items-center text-center sm:items-start sm:text-left">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl space-y-4"
            >
              <motion.h1
                variants={fadeUpVariant}
                className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
              >
                About Us
              </motion.h1>
              <motion.p
                variants={fadeUpVariant}
                className="max-w-2xl text-lg font-medium leading-snug text-white/80 sm:text-xl md:text-2xl"
              >
                Professional Editors With Publishing Experience
              </motion.p>
            </motion.div>
          </Container>
        </section>

        <section className="bg-background py-24 sm:py-32">
          <Container>
            <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-24">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex justify-center lg:col-span-4 lg:justify-end"
              >
                <div className="flex flex-col items-center">
                  <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-primary shadow-2xl sm:h-32 sm:w-32">
                    <BookOpenText size={64} className="text-white" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col text-center">
                    <span className="text-3xl font-extrabold leading-none tracking-[0.04em] text-foreground sm:text-4xl">
                      PEEK<span className="text-primary">BOOKS</span>
                    </span>
                    <span className="mt-2 text-sm font-semibold uppercase leading-none tracking-[0.2em] text-muted-foreground">
                      Proofreading
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="flex max-w-3xl flex-col gap-8 lg:col-span-8"
              >
                <motion.p
                  variants={fadeUpVariant}
                  className="text-lg font-medium leading-relaxed text-foreground/80"
                >
                  PEEKBOOKS is a trusted brand in author services for the global
                  research community. Since our establishment, we have worked with
                  researchers in hundreds of universities and research labs around
                  the globe, improving the communication of their research and
                  helping them achieve successful publication. Our services are
                  preferred by leading publishers, societies, and academic
                  institutions worldwide.
                </motion.p>
                <motion.p
                  variants={fadeUpVariant}
                  className="text-lg leading-relaxed text-foreground/80"
                >
                  <strong className="font-bold text-foreground">Quality first</strong>{" "}
                  is at the heart of everything we do. This approach ensures that
                  our clients receive only the best quality output and a superior
                  user experience. Our dedication to quality and the authors&apos;
                  need show that we will never compromise on our standard at any
                  cost.
                </motion.p>
                <motion.p
                  variants={fadeUpVariant}
                  className="text-lg leading-relaxed text-foreground/80"
                >
                  PEEKBOOKS Editing Services promotes all principles of ethical
                  publishing and encourages authors by offering services and
                  support that are relevant and appropriate to the highest
                  academic guidelines.
                </motion.p>
              </motion.div>
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden border-y border-border/40 bg-white py-24 sm:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.02)_0,transparent_100%)] pointer-events-none" />
          <Container className="relative z-10 max-w-4xl text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={fadeUpVariant}
                className="mb-8 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
              >
                Every manuscript is handled by <br className="hidden sm:block" />
                subject-based experts
              </motion.h2>
              <motion.p
                variants={fadeUpVariant}
                className="mx-auto max-w-3xl text-xl italic leading-relaxed text-foreground/80"
              >
                &quot;At PEEKBOOKS editing services, we take pride in delivering
                high-quality English editing and proofreading for every document,
                whether it is academic, business, application, or bestseller. Our
                editors combine years of experience in every order with
                unparalleled commitment to make every document publication-worthy.&quot;
              </motion.p>
            </motion.div>
          </Container>
        </section>

        <section className="bg-[#FAF9F6] py-24 sm:py-32">
          <Container className="max-w-5xl">
            <div className="space-y-10 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
              >
                Qualification of Our Editors
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mx-auto max-w-4xl rounded-3xl border border-border/50 bg-white p-8 shadow-xs sm:p-12 md:p-16"
              >
                <p className="text-lg leading-relaxed text-foreground/80 sm:text-xl">
                  Each editor at PEEKBOOKS&apos;s services has been selected because
                  of their highly specialized technical research background.
                  <strong className="font-semibold text-foreground">
                    {" "}All our editors have earned master&apos;s or PhD degrees
                    from top-tier institutions and possess immense publishing
                    experience.
                  </strong>
                  <br />
                  <br />
                  Our numerous and diverse staff enables us to ensure that each
                  order is strictly assigned to editors with direct, hands-on
                  experience related to the very field of study corresponding to
                  your manuscript.
                </p>
              </motion.div>
            </div>
          </Container>
        </section>

        <section className="relative flex items-center overflow-hidden bg-black py-32 sm:py-48">
          <div className="absolute inset-0 z-0 scale-105 transform">
            <Image
              src="/editor-2.png"
              alt="Professional Editing Environment"
              fill
              className="object-cover opacity-60 mix-blend-luminosity grayscale-[30%]"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-black/40" />
          </div>

          <Container className="relative z-10">
            <div className="max-w-3xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="space-y-8"
              >
                <motion.h2
                  variants={fadeUpVariant}
                  className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl"
                >
                  Selection of editors
                </motion.h2>

                <div className="space-y-6">
                  <motion.p
                    variants={fadeUpVariant}
                    className="text-lg font-medium leading-relaxed text-white/90 drop-shadow-md sm:text-xl"
                  >
                    At PEEKBOOKS editing services, our editors are carefully
                    screened to ensure their editing skills are exceptional. Each
                    of them has years of writing and publishing experience.
                  </motion.p>

                  <motion.p
                    variants={fadeUpVariant}
                    className="text-base leading-relaxed text-white/80 sm:text-lg"
                  >
                    They know exactly how to carefully analyze each sentence to
                    identify and fix grammatical errors while still maintaining
                    the proper meaning and nuance of the idea being conveyed by
                    the author. In addition, insightful comments are added to
                    provide further writing insights for the author, guiding them
                    to improve their overall manuscript composition.
                  </motion.p>

                  <motion.p
                    variants={fadeUpVariant}
                    className="text-base leading-relaxed text-white/80 sm:text-lg"
                  >
                    Our experienced editors have edited over{" "}
                    <strong className="font-bold text-white">12,000+ manuscripts</strong>{" "}
                    in the last decade and rigidly maintain the highest standards
                    of thoroughness and quality. They improve the grammar, flow,
                    formatting, and readability of your papers, ensuring the
                    language in your document is clearly stated, grammatically
                    correct, and publication-ready.
                  </motion.p>
                </div>

                <motion.div variants={fadeUpVariant} className="pt-8">
                  <Button
                    size="lg"
                    className="h-14 bg-white px-8 text-base font-bold text-black transition-all hover:scale-[1.02] hover:bg-white/90"
                  >
                    <Link href="/editors">View Our Editors</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </Container>
        </section>

        <section className="bg-primary py-16 text-white">
          <Container className="flex flex-col items-center justify-between gap-8 text-center sm:flex-row sm:text-left">
            <div>
              <h3 className="mb-2 font-serif text-2xl font-bold">
                Ready to perfect your manuscript?
              </h3>
              <p className="text-white/80">
                Get a clear delivery date and price estimate instantly.
              </p>
            </div>
            <Button
              size="lg"
              variant="outline"
              className="h-14 shrink-0 border-white/30 bg-transparent px-8 text-white hover:bg-white/10"
            >
              <Link href="/pricing">Get Started</Link>
            </Button>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
