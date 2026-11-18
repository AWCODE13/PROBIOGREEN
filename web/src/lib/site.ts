export const site = {
  name: "Probiogreen",
  description:
    "Alat bantu keputusan untuk pertanian, peternakan, dan perikanan. Hitung kebutuhan produk, perkiraan biaya, dan jadwal aplikasi tanpa login.",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  nav: [
    { label: "Produk", href: "#produk" },
    { label: "Kalkulator", href: "#kalkulator" },
    { label: "Batasan", href: "#batasan" },
    { label: "Tanya", href: "#tanya" },
  ],
} as const;

export function whatsappHref(message: string): string | null {
  const digits = site.whatsappNumber.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const consultationHref =
  whatsappHref("Halo Probiogreen, saya ingin berkonsultasi.") ?? "#kontak";
