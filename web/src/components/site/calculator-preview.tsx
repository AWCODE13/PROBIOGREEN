"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const previews = {
  tanaman: {
    fields: [
      { label: "Komoditas", value: "Padi sawah" },
      { label: "Luas lahan", value: "5.000 m²" },
    ],
    result: [
      { label: "Kebutuhan produk", value: "Belum diisi" },
      { label: "Kemasan", value: "Belum diisi" },
      { label: "Estimasi biaya", value: "Belum diisi" },
    ],
  },
  ternak: {
    fields: [
      { label: "Jenis ternak", value: "Ayam broiler" },
      { label: "Populasi", value: "2.000 ekor" },
      { label: "Lama siklus", value: "30 hari" },
    ],
    result: [
      { label: "Kebutuhan per hari", value: "Belum diisi" },
      { label: "Total per siklus", value: "Belum diisi" },
      { label: "Estimasi biaya", value: "Belum diisi" },
    ],
  },
  ikan: {
    fields: [
      { label: "Jenis ikan", value: "Nila" },
      { label: "Volume kolam", value: "150 m³" },
      { label: "Lama siklus", value: "60 hari" },
    ],
    result: [
      { label: "Kebutuhan per hari", value: "Belum diisi" },
      { label: "Total per siklus", value: "Belum diisi" },
      { label: "Estimasi biaya", value: "Belum diisi" },
    ],
  },
} as const;

type Mode = keyof typeof previews;

function FieldRows({ rows }: { rows: readonly { label: string; value: string }[] }) {
  return (
    <dl className="divide-y divide-border/70">
      {rows.map((row) => (
        <div key={row.label} className="flex items-baseline justify-between gap-6 py-2.5">
          <dt className="text-sm text-muted-foreground">{row.label}</dt>
          <dd className="text-sm font-medium tabular-nums">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Preview({ mode }: { mode: Mode }) {
  const data = previews[mode];
  return (
    <div className="space-y-4">
      <FieldRows rows={data.fields} />
      <div className="rounded-md border border-dashed border-border bg-background/60 p-4">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Hasil
        </p>
        <FieldRows rows={data.result} />
      </div>
    </div>
  );
}

export function CalculatorPreview() {
  return (
    <div className="w-full rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Pratinjau kalkulator
        </p>
        <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
          Contoh tampilan
        </span>
      </div>

      <Tabs defaultValue="tanaman">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tanaman">Tanaman</TabsTrigger>
          <TabsTrigger value="ternak">Ternak</TabsTrigger>
          <TabsTrigger value="ikan">Ikan</TabsTrigger>
        </TabsList>
        <TabsContent value="tanaman" className="pt-4">
          <Preview mode="tanaman" />
        </TabsContent>
        <TabsContent value="ternak" className="pt-4">
          <Preview mode="ternak" />
        </TabsContent>
        <TabsContent value="ikan" className="pt-4">
          <Preview mode="ikan" />
        </TabsContent>
      </Tabs>

      <p className="mt-4 border-t border-border/70 pt-3 text-xs leading-relaxed text-muted-foreground">
        Angka kebutuhan muncul setelah luas lahan atau populasi diisi. Data dosis
        mengikuti anjuran produk.
      </p>
    </div>
  );
}
