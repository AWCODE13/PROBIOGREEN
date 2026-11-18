import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CalculatorPreview } from "@/components/site/calculator-preview";
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
  },
  {
    title: "Kondisi lapangan berbeda",
    body: "Tanah, air, iklim, dan fase pertumbuhan bisa mengubah kebutuhan. Periksa kembali dengan penyuluh atau tim kami sebelum aplikasi.",
  },
  {
    title: "Tanpa klaim yang belum ada",
    body: "Kami tidak menampilkan nomor izin, sertifikasi, atau angka hasil panen yang belum benar-benar kami miliki.",
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
      <p className="font-mono text-xs tabular-nums text-muted-foreground">
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
      <section className="border-b border-border">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:py-24">
          <div>
            <h1 className="text-balance font-heading text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-7xl">
              Hitung kebutuhan dulu, sebelum membeli.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Masukkan luas lahan atau jumlah ternak. Kebutuhan produk, perkiraan
              biaya, dan jadwal aplikasi muncul dalam satu menit, tanpa akun.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="#kalkulator">Pelajari cara hitungnya</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#produk">Lihat kategori</Link>
              </Button>
            </div>
            <p className="mt-7 text-sm text-muted-foreground">
              Pertanian
              <span aria-hidden="true" className="mx-2 text-border">
                /
              </span>
              Peternakan
              <span aria-hidden="true" className="mx-2 text-border">
                /
              </span>
              Perikanan
            </p>
          </div>

          <div className="lg:pl-2">
            <CalculatorPreview />
          </div>
        </div>
      </section>

      <section id="produk" className="scroll-mt-20 border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHead index="01">Satu merek, tiga kebutuhan.</SectionHead>
          <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Setiap sektor punya cara pakai dan dosis yang berbeda. Kalkulator
            memilihkan jumlahnya berdasarkan komoditas yang kamu masukkan.
          </p>

          <PopularProducts />

          <div className="mt-10 divide-y divide-border border-y border-border">
            {sectors.map((sector, index) => (
              <div
                key={sector.title}
                className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr_auto] sm:items-baseline sm:gap-6"
              >
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-xl font-semibold">
                    {sector.title}
                  </h3>
                  <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-muted-foreground">
                    {sector.description}
                  </p>
                </div>
                <Link
                  href="#kalkulator"
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Hitung dosis
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button asChild variant="outline">
              <Link href="/produk">Lihat semua produk</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="kalkulator" className="scroll-mt-20 border-b border-border">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:py-20">
          <div>
            <SectionHead index="02">Tiga angka, sisanya kami hitung.</SectionHead>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              Tidak perlu menebak berapa botol yang harus dibeli. Kalkulator
              menerjemahkan luas lahan, populasi, atau volume kolam menjadi
              kebutuhan yang bisa langsung dipakai untuk menyusun anggaran.
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Isian yang diminta sengaja sedikit: komoditas, ukuran lahan atau
              populasi, dan lama siklus untuk ternak dan ikan. Selebihnya dihitung
              dari data dosis yang dikelola tim.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-heading text-lg font-semibold">Yang kamu dapat</h3>
            <ul className="mt-4 divide-y divide-border">
              {outputs.map((item) => (
                <li key={item} className="py-3 text-sm leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              Hasil perhitungan adalah estimasi berdasarkan dosis anjuran.
              Kondisi lahan, air, dan iklim dapat mengubah kebutuhan aktual.
            </p>
            <Button asChild variant="outline" className="mt-5 w-full">
              <Link href={consultationHref}>Tanya kebutuhan</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="batasan" className="scroll-mt-20 border-b border-border">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-20">
          <SectionHead index="03">
            Batas yang kami sebut di depan.
          </SectionHead>
          <div>
            <p className="text-pretty text-lg leading-relaxed">
              Alat ini dibuat untuk mengurangi salah beli, bukan untuk menjual
              harapan. Karena itu kami menuliskan batasannya di halaman depan.
            </p>
            <dl className="mt-8 space-y-6">
              {limits.map((limit) => (
                <div key={limit.title} className="border-l border-primary/40 pl-5">
                  <dt className="font-medium">{limit.title}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {limit.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="tanya" className="scroll-mt-20 border-b border-border">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-20">
          <SectionHead index="04">Sebelum kamu mulai.</SectionHead>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-[15px]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-end md:justify-between lg:py-16">
          <div className="max-w-xl">
            <h2 className="text-balance font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Belum yakin dengan dosisnya?
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-primary-foreground/85">
              Kirim komoditas dan luas lahannya. Tim kami bantu memeriksa
              kebutuhan dan ketersediaan produk.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary" className="shrink-0">
            <Link href={consultationHref}>Tanya kebutuhan</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
