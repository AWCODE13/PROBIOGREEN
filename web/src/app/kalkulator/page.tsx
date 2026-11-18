"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { consultationHref } from "@/lib/site";

const modes = ["plant", "livestock", "fishery"];
const commodities = [
  { value: "padi", label: "Padi" },
  { value: "jagung", label: "Jagung" },
  { value: "ayam-broiler", label: "Ayam broiler" },
  { value: "nila", label: "Nila" },
];

interface CalcPackage {
  label: string;
  qty: number;
  subtotal_idr: number | null;
}

interface CalcSchedule {
  week: number;
  dose_ml: number;
}

interface CalcResult {
  available: boolean;
  total_ml?: number;
  display?: string;
  packages?: CalcPackage[];
  estimated_cost_idr?: number;
  price_complete?: boolean;
  schedule?: CalcSchedule[];
  notes?: string[];
  products?: Array<{ slug: string; name: string }>;
  disclaimer: string;
}

interface CalcForm {
  mode: string;
  commodity_slug: string;
  area_m2?: number;
  plants?: number;
  population?: number;
  volume_m3?: number;
  weight_g?: number;
  days?: number;
  locale?: string;
}

export default function KalkulatorPage() {
  const [form, setForm] = useState<CalcForm>({
    mode: "plant",
    commodity_slug: "padi",
  });
  const [result, setResult] = useState<CalcResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const val: string | number = typeof value === "number" ? value : value;
    setForm({ ...form, [name]: val });
  };

  const calculate = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch("/api/v1/calculator/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || "Gagal menghitung");
      setResult(data as CalcResult);
    } catch (e: any) {
      setError(e.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="kalkulator" className="scroll-mt-20 border-b border-border p-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-balance font-heading text-2xl font-semibold">
            Sedang menghitung...
            <span className="animate-spin inline-block mr-2 size-4" />
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Menghitung kebutuhan berdasarkan input Anda. Harap tunggu sebentar.
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="kalkulator" className="scroll-mt-20 border-b border-border p-6">
        <div className="mx-auto max-w-2xl bg-red-50 border-l-4 border-red-500 p-4">
          <h2 className="text-balance font-heading text-xl font-semibold text-red-800">
            Error
          </h2>
          <p className="mt-2 text-sm text-red-700">{error}</p>
          <Button asChild size="lg" className="mt-4" onClick={() => setError(null)}>
            <Link href="/">Coba lagi</Link>
          </Button>
        </div>
      </section>
    );
  }

  if (!result) {
    return (
      <section id="kalkulator" className="scroll-mt-20 border-b border-border p-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-balance font-heading text-2xl font-semibold">
            Hitung kebutuhan
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Masukkan komoditas, luas lahan/populasi, dan lama siklus.
          </p>
          <form
            className="mt-6 grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              calculate();
            }}
          >
            <select
              name="mode"
              onChange={handleChange}
              className="w-full rounded-lg border border-input py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="plant" disabled>
                {modes[0]}
              </option>
              <option value="livestock">{modes[1]}</option>
              <option value="fishery">{modes[2]}</option>
            </select>
            <select
              name="commodity_slug"
              onChange={handleChange}
              className="w-full rounded-lg border border-input py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {commodities.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            {form.mode === "plant" && (
              <Input
                name="area_m2"
                type="number"
                placeholder="Luas lahan (m2)"
                value={form.area_m2 !== undefined ? String(form.area_m2) : ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-input py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              />
            )}
            {form.mode === "livestock" && (
              <>
                <Input
                  name="population"
                  type="number"
                  placeholder="Populasi"
                  value={form.population !== undefined ? String(form.population) : ""}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-input py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Input
                  name="days"
                  type="number"
                  placeholder="Lama siklus (hari)"
                  value={form.days !== undefined ? String(form.days) : ""}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-input py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </>
            )}
            {form.mode === "fishery" && (
              <>
                <Input
                  name="volume_m3"
                  type="number"
                  placeholder="Volume kolam (m3)"
                  value={form.volume_m3 !== undefined ? String(form.volume_m3) : ""}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-input py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Input
                  name="days"
                  type="number"
                  placeholder="Lama siklus (hari)"
                  value={form.days !== undefined ? String(form.days) : ""}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-input py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </>
            )}
            <Button type="submit" className="w-full rounded-lg border border-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors">
              Hitung Dosis
            </Button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">
            Hasil perhitungan adalah estimasi berdasarkan dosis anjuran.
          </p>
        </div>
      </section>
    );
  }

  // Result shown
  return (
    <section id="kalkulator" className="scroll-mt-20 border-b border-border p-6">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-balance font-heading text-2xl font-semibold">
          Hasil Kalkulasi
        </h2>

        {/* Disclaimer */}
        <p className="mt-3 text-sm text-muted-foreground/85">
          {result!.disclaimer}
        </p>

        {/* Total & Display */}
        <div className="mt-4 text-3xl font-semibold">
          {result!.total_ml !== undefined
            ? `${result!.total_ml} ml`
            : "—"}
          {result!.display !== undefined
            ? <span className="ml-2">({result!.display})</span>
            : ""}
        </div>

        {/* Packages */}
        {result!.packages && result!.packages.length > 0 && (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-muted-foreground">
              Kemasan yang direkomendasikan:
            </p>
            {result!.packages.map((pkg, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="font-medium">
                  {pkg.label} x {pkg.qty}
                </span>
                {pkg.subtotal_idr !== null && (
                  <span className="text-primary">
                    Rp {pkg.subtotal_idr.toLocaleString()}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Estimated Cost */}
        {result!.estimated_cost_idr !== undefined && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              Estimasi biaya total:
            </p>
            <p className="font-medium">
              {result!.estimated_cost_idr.toLocaleString()} IDR
            </p>
          </div>
        )}

        {/* Schedule */}
        {result!.schedule && result!.schedule.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium text-muted-foreground">
              Jadwal aplikasi:
            </p>
            <ul className="mt-3 space-y-2">
              {result!.schedule.map((s) => (
                <li key={s.week} className="flex items-center gap-2">
                  <span className="font-mono text-sm">
                    Minggu {s.week}
                  </span>
                  <span className="text-primary">{s.dose_ml} ml</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Notes */}
        {result!.notes && result!.notes.length > 0 && (
          <div
            className="mt-4 p-3 border-l-4 border-primary/40 pl-3 text-sm text-muted-foreground"
          >
            <strong>Catatan:</strong>{result!.notes[0]}
          </div>
        )}

        {/* CTA */}
        <Button
          asChild
          size="lg"
          className="mt-6"
        >
          <Link href={consultationHref}>
            <span>Tanya kebutuhan ke tim Probiogreen</span>
          </Link>
        </Button>
      </div>
    </section>
  );
}
