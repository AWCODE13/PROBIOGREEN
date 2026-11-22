import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroCarousel } from "@/components/hero-carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PopularProducts } from "@/components/site/popular-products";
import { consultationHref } from "@/lib/site";

const sectors = [
  {
    title: "Pertanian",
    description:
      "Pupuk hayati dan pembenah tanah untuk lahan pangan, hortikultura, dan perkebunan.",
  },
  {
    title: "Peternakan",
    description:
      "Suplemen organik untuk mendukung nafsu makan, pencernaan, dan kebersihan kandang.",
  },
  {
    title: "Perikanan",
    description:
      "Suplemen untuk budidaya kolam dan tambak, dari persiapan air sampai panen.",
  },
];

const tonalTiles = [
  "bg-primary-container text-on-primary-container",
  "bg-secondary-container text-on-secondary-container",
  "bg-tertiary-container text-on-tertiary-container",
];

const outputs = [
  "Total kebutuhan produk dalam liter atau mililiter",
  "Jumlah kemasan yang perlu dibeli",
  "Perkiraan biaya berdasarkan harga kemasan",
  "Jadwal aplikasi selama satu siklus",
];

const limits = [
  {
    title: "Estimasi, bukan janji",
    body: "Angka dari kalkulator berasal dari dosis anjuran. Hasilnya titik awal untuk menyusun anggaran, bukan jaminan kenaikan produksi.",
    // Limit ini paling kritis - ditandai dengan badge
    critical: true,
  },
  {
    title: "Kondisi lapangan berbeda",
    body: "Tanah, air, iklim, dan fase pertumbuhan bisa mengubah kebutuhan. Periksa kembali dengan penyuluh atau tim kami sebelum aplikasi.",
    // Limit menengah - tetap penting
    critical: false,
  },
  {
    title: "Tanpa klaim yang belum ada",
    body: "Kami tidak menampilkan nomor izin, sertifikasi, atau angka hasil panen yang belum benar-benar kami miliki.",
    // Limit ini bisa dilayangkan
    critical: false,
  },
];

const faqs = [
  {
    question: "Apakah perlu membuat akun?",
    answer:
      "Tidak. Kalkulator bisa dipakai langsung tanpa mendaftar, tanpa email, dan tanpa biaya.",
  },
  {
    question: "Dari mana angka dosisnya berasal?",
    answer:
      "Dosis mengikuti anjuran produk yang dikelola tim Probiogreen. Setiap hasil perhitungan adalah estimasi, bukan jaminan hasil panen.",
  },
  {
    question: "Mengapa hasil saya bisa berbeda dari perhitungan?",
    answer:
      "Kondisi tanah, kualitas air, iklim, dan fase pertumbuhan memengaruhi kebutuhan aktual. Kalkulator memberi titik awal yang lebih terukur, bukan angka mutlak.",
  },
  {
    question: "Apakah produk sudah terdaftar di Kementan?",
    answer:
      "Kami hanya menampilkan informasi legalitas yang benar-benar kami miliki. Sampai itu tersedia, tidak ada klaim pendaftaran di situs ini.",
  },
  {
    question: "Bagaimana cara membeli produknya?",
    answer:
      "Hasil perhitungan bisa dikirim ke WhatsApp kami, lengkap dengan komoditas dan kebutuhannya. Tim akan mengonfirmasi ketersediaan dan harga.",
  },
];

function SectionHead({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-border pt-5">
      <p className="font-mono text-xs font-medium tabular-nums text-on-primary-container/80">
        {index}
      </p>
      <h2 className="mt-3 max-w-2xl text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
        {children}
      </h2>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <HeroCarousel />

      <section id="produk" className="scroll-mt-20 border-b border-border bg-surface-container">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHead index="01">Satu merek, tiga kebutuhan.</SectionHead>
          <p className="mt-5 max-w-xl text-pretty leading-relaxed text-on-primary-container/80">
            Setiap sektor punya cara pakai dan dosis yang berbeda. Kalkulator
            memilihkan jumlahnya berdasarkan komoditas yang kamu masukkan.
          </p>

          <PopularProducts />

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {sectors.map((sector, index) => (
              <div
                key={sector.title}
                className={`flex flex-col rounded-[56px_16px_56px_16px] p-6 ${tonalTiles[index % tonalTiles.length]}`}
              >
                <span
                  aria-hidden="true"
                  className="flex size-8 items-center justify-center rounded-[12px_4px_12px_4px] bg-background/60 font-mono text-[11px] tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-dm-sans text-lg font-semibold">
                  {sector.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed opacity-85">
                  {sector.description}
                </p>
                <Link
                  href="#kalkulator"
                  className="mt-auto pt-4 text-sm font-medium underline underline-offset-4 hover:no-underline"
                >
                  Hitung dosis
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button asChild className="rounded-full px-6">
              <Link href="/produk">Lihat semua produk</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="kalkulator" className="scroll-mt-20 border-b border-border bg-surface-container">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="rounded-[32px] bg-primary-container p-7 text-on-primary-container sm:p-9 lg:col-span-7">
              <p className="font-mono text-xs tabular-nums text-on-primary-container/70">
                02
              </p>
              <h2 className="mt-3 max-w-lg text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Tiga angka, sisanya kami hitung.
              </h2>
              <p className="mt-5 max-w-lg text-pretty leading-relaxed text-on-primary-container/85">
                Tidak perlu menebak berapa botol yang harus dibeli. Kalkulator
                menerjemahkan luas lahan, populasi, atau volume kolam menjadi
                kebutuhan yang bisa langsung dipakai untuk menyusun anggaran.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-2">
                {["Tanpa akun", "Tanpa aplikasi", "Hasil langsung"].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-on-primary-container/10 px-3 py-1 text-xs font-medium"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col rounded-[32px] bg-secondary-container p-7 text-on-secondary-container sm:p-9 lg:col-span-5">
              <h3 className="mt-2 font-dm-sans text-lg font-semibold">Yang kamu dapat</h3>
              <ol className="mt-5 space-y-3">
                {outputs.map((item, index) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-[12px_4px_12px_4px] bg-on-secondary-container/10 font-mono text-[11px] tabular-nums"
                    >
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-auto pt-7">
                <div className="flex flex-wrap items-center gap-3">
                  <Button asChild className="rounded-full px-5">
                    <Link href="/kalkulator">Buka kalkulator</Link>
                  </Button>
                  <Link
                    href={consultationHref}
                    className="text-sm font-medium underline underline-offset-4 hover:no-underline"
                  >
                    Tanya kebutuhan
                  </Link>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-on-secondary-container/75">
                  Hasil perhitungan adalah estimasi. Kondisi lahan, air, dan iklim
                  dapat mengubah kebutuhan aktual.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:col-span-12">
              <div className="rounded-[28px] bg-surface-container-high p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-on-primary-container/70">
                  Isian
                </p>
                <p className="mt-2 font-heading text-lg font-semibold">
                  Komoditas, ukuran, dan siklus.
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-on-primary-container/80">
                  Tiga kolom saja, sisanya memakai data dosis yang dikelola tim.
                </p>
              </div>

              <div className="rounded-[28px_8px_28px_8px] bg-tertiary-container p-6 text-on-tertiary-container">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] opacity-70">
                  Keluaran
                </p>
                <p className="mt-2 font-heading text-lg font-semibold">
                  Liter, kemasan, biaya.
                </p>
                <p className="mt-1.5 text-sm leading-relaxed opacity-85">
                  Anggapannya rata-rata pupuk organik cair, bukan dosis resmi
                  produk.
                </p>
              </div>

              <div className="rounded-[28px] bg-surface-container-high p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-on-primary-container/70">
                  Kecepatan
                </p>
                <p className="mt-2 font-heading text-lg font-semibold">
                  Sekitar satu menit.
                </p>
                <div aria-hidden="true" className="relative mt-5 h-3 overflow-hidden text-primary">
                  <svg
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                    className="m3-wave absolute inset-y-0 left-0 h-3 w-[200%]"
                  >
                    <path
                      d="M0 6 q 12.5 -6 25 0 t 25 0 t 25 0 t 25 0 t 25 0 t 25 0 t 25 0 t 25 0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="batasan" className="scroll-mt-20 border-b border-border bg-surface-container">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
            <SectionHead index="03">
              Batas yang kami sebut di depan.
            </SectionHead>
            <p className="text-pretty text-lg leading-relaxed text-on-primary-container/85">
              Alat ini dibuat untuk mengurangi salah beli, bukan untuk menjual
              harapan. Karena itu kami menuliskan batasannya di halaman depan.
            </p>
          </div>

          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="grid-column span-1">
              <dt className="mt-2 font-dm-sans font-semibold text-on-primary-container critical-dt">
                Estimasi, bukan janji
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-on-primary-container/80">
                Angka dari kalkulator berasal dari dosis anjuran. Hasilnya titik awal untuk menyusun anggaran, bukan jaminan kenaikan produksi.
              </dd>
            </div>
            <div className="grid-column span-1">
              <dt className="mt-2 font-dm-sans font-semibold">
                Kondisi lapangan berbeda
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed opacity-85">
                Tanah, air, iklim, dan fase pertumbuhan bisa mengubah kebutuhan. Periksa kembali dengan penyuluh atau tim kami sebelum aplikasi.
              </dd>
            </div>
            <div className="grid-column span-1">
              <dt className="mt-2 font-dm-sans font-semibold">
                Tanpa klaim yang belum ada
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed opacity-85">
                Kami tidak menampilkan nomor izin, sertifikasi, atau angka hasil panen yang belum benar-benar kami miliki.
              </dd>
            </div>
          </dl>

          {/* Critical badge overlay for first limit - positioned via CSS on the dt */}
          <style>{`
            .critical-badge {
              position: absolute;
              top: 8px;
              right: 8px;
              background: var(--primary);
              color: var(--primary-foreground);
              font-size: var(--font-xs);
              padding: 2px 6px;
              border-radius: 9999px;
            }
            .critical-dt::after {
              content: 'Direkomendasikan';
              position: absolute;
              top: 8px;
              right: 8px;
              background: var(--primary);
              color: var(--primary-foreground);
              font-size: var(--font-xs);
              padding: 2px 6px;
              border-radius: 9999px;
            }
          `}</style>
        </div>
      </section>

      <section id="tanya" className="scroll-mt-20 border-b border-border bg-surface-container">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-20">
          <SectionHead index="04">Sebelum kamu mulai.</SectionHead>

          {/* 3 FAQ kritis ditampilkan di atas lipatan */}
          <div className="space-y-3">
            {faqs.slice(0, 3).map((faq, index) => (
              <div
                key={faq.question}
                className="rounded-[22px] bg-surface-container-high px-5 p-4"
              >
                <div className="flex items-baseline justify-between">
                  <p className="text-[15px] font-dm-sans font-medium text-on-primary-container">
                    {faq.question}
                  </p>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-4 rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-on-primary-container/80">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Sisa FAQ di dalam accordion */}
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.slice(3).map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index + 3}`}
                className="rounded-[22px] bg-surface-container-high px-5 not-last:border-b-0"
              >
                <AccordionTrigger className="text-left text-[15px] font-dm-sans hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-on-primary-container/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-primary-container text-on-primary-container">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-end md:justify-between lg:py-16">
          <div className="max-w-xl">
            <h2 className="font-dm-sans text-2xl font-semibold tracking-tight sm:text-3xl text-on-primary-container">
              Belum yakin dengan dosisnya?
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-on-primary-container/85">
              Kirim komoditas dan luas lahannya. Tim kami bantu memeriksa
              kebutuhan dan ketersediaan produk.
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0 rounded-full bg-[#1B6B38] px-8 text-white hover:bg-[#155330]">
            <Link href={consultationHref}>Tanya kebutuhan</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
