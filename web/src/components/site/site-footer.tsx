import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { consultationHref, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer id="kontak" className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="text-[15px] font-semibold tracking-tight">{site.name}</p>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Alat bantu keputusan untuk pertanian, peternakan, dan perikanan.
          </p>
        </div>

        <nav aria-label="Navigasi footer">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Halaman
          </p>
          <ul className="space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Kontak
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              {site.whatsappNumber ? (
                <Link
                  href={consultationHref}
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <MessageCircle aria-hidden="true" className="size-4" />
                  WhatsApp
                </Link>
              ) : (
                <span className="text-muted-foreground">
                  WhatsApp belum dikonfigurasi
                </span>
              )}
            </li>
            {site.email ? (
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail aria-hidden="true" className="size-4" />
                  {site.email}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p className="max-w-xl leading-relaxed">
            Hasil perhitungan bersifat estimasi berdasarkan dosis anjuran. Kondisi
            lahan, air, dan iklim dapat mengubah kebutuhan aktual.
          </p>
        </div>
      </div>
    </footer>
  );
}
