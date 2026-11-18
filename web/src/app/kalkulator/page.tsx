"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { consultationHref } from "@/lib/site";

type Mode = "plant" | "livestock" | "fishery";

const modeOptions: Array<{ value: Mode; label: string; hint: string }> = [
  { value: "plant", label: "Pertanian", hint: "Luas lahan (m²)" },
  { value: "livestock", label: "Peternakan", hint: "Jumlah populasi" },
  { value: "fishery", label: "Perikanan", hint: "Volume kolam (m³)" },
];

const commoditiesByMode: Record<Mode, Array<{ value: string; label: string }>> = {
  plant: [
    { value: "padi", label: "Padi" },
    { value: "jagung", label: "Jagung" },
  ],
  livestock: [{ value: "ayam-broiler", label: "Ayam broiler" }],
  fishery: [{ value: "nila", label: "Nila" }],
};

interface CalcPackage {
  label: string;
  qty: number;
  subtotal_idr: number | null;
}

interface CalcResult {
  available: boolean;
  message?: string;
  total_ml?: number;
  display?: string;
  packages?: CalcPackage[];
  estimated_cost_idr?: number | null;
  schedule?: Array<{ week: number; dose_ml: number }>;
  notes?: string[];
  disclaimer: string;
}

export default function KalkulatorPage() {
  const [mode, setMode] = useState<Mode>("plant");
  const [commodity, setCommodity] = useState("padi");
  const [amount, setAmount] = useState("");
  const [days, setDays] = useState("30");
  const [result, setResult] = useState<CalcResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changeMode = (next: Mode) => {
    setMode(next);
    setCommodity(commoditiesByMode[next][0].value);
    setResult(null);
    setError(null);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const payload: Record<string, string | number> = {
      mode,
      commodity_slug: commodity,
    };

    if (mode === "plant") payload.area_m2 = Number(amount);
    if (mode === "livestock") payload.population = Number(amount);
    if (mode === "fishery") payload.volume_m3 = Number(amount);
    if (mode !== "plant") payload.days = Number(days || 30);

    try {
      const res = await fetch("/api/v1/calculator/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok) {
        const first = json?.errors ? Object.values(json.errors)[0] : null;
        throw new Error(
          (Array.isArray(first) ? first[0] : first) || json.message || "Gagal menghitung.",
        );
      }

      setResult(json.data as CalcResult);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setAmount("");
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:py-20">
          <h1 className="text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Hitung kebutuhan Probiogreen
          </h1>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Masukkan luas lahan, populasi, atau volume kolam. Angka dosis memakai
            rata-rata pupuk organik cair, jadi anggap hasilnya perkiraan awal.
          </p>

          <form onSubmit={submit} className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="mode" className="text-sm font-medium">
                Sektor
              </label>
              <select
                id="mode"
                value={mode}
                onChange={(e) => changeMode(e.target.value as Mode)}
                className="w-full rounded-lg border border-input bg-background py-2 pl-2.5 pr-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {modeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="commodity" className="text-sm font-medium">
                Komoditas
              </label>
              <select
                id="commodity"
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
                className="w-full rounded-lg border border-input bg-background py-2 pl-2.5 pr-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {commoditiesByMode[mode].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="amount" className="text-sm font-medium">
                {modeOptions.find((option) => option.value === mode)?.hint}
              </label>
              <Input
                id="amount"
                name="amount"
                type="number"
                inputMode="numeric"
                min={1}
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={mode === "plant" ? "5000" : mode === "livestock" ? "1000" : "150"}
              />
            </div>

            {mode !== "plant" && (
              <div className="flex flex-col gap-2">
                <label htmlFor="days" className="text-sm font-medium">
                  Lama siklus (hari)
                </label>
                <Input
                  id="days"
                  name="days"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={365}
                  required
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
              </div>
            )}

            <div className="sm:col-span-2">
              <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? "Menghitung..." : "Hitung kebutuhan"}
              </Button>
            </div>
          </form>

          {error && (
            <div
              role="alert"
              className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
            >
              {error}
            </div>
          )}

          {result && (
            <div aria-live="polite" className="mt-10 rounded-lg border border-border bg-card p-6">
              {!result.available ? (
                <>
                  <h2 className="font-heading text-xl font-semibold">Belum bisa dihitung</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {result.message ?? "Dosis untuk komoditas ini belum tersedia."}
                  </p>
                </>
              ) : (
                <>
                  <h2 className="font-heading text-xl font-semibold">Hasil perkiraan</h2>
                  <p className="mt-3 font-mono text-3xl font-semibold tabular-nums">
                    {result.total_ml?.toLocaleString("id-ID")} ml
                    {result.display ? (
                      <span className="ml-2 font-sans text-base font-normal text-muted-foreground">
                        ({result.display})
                      </span>
                    ) : null}
                  </p>

                  {result.packages && result.packages.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium">Kemasan yang perlu dibeli</h3>
                      <ul className="mt-2 divide-y divide-border">
                        {result.packages.map((pkg) => (
                          <li key={pkg.label} className="flex justify-between py-2 text-sm">
                            <span>
                              {pkg.label} × {pkg.qty}
                            </span>
                            <span className="font-mono tabular-nums text-muted-foreground">
                              {pkg.subtotal_idr !== null
                                ? `Rp ${pkg.subtotal_idr.toLocaleString("id-ID")}`
                                : "Harga menyusul"}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {typeof result.estimated_cost_idr === "number" && (
                        <p className="mt-3 text-sm">
                          Estimasi biaya:{" "}
                          <span className="font-mono font-medium text-primary">
                            Rp {result.estimated_cost_idr.toLocaleString("id-ID")}
                          </span>
                        </p>
                      )}
                    </div>
                  )}

                  {result.schedule && result.schedule.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium">Jadwal aplikasi</h3>
                      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                        {result.schedule.map((item) => (
                          <li
                            key={item.week}
                            className="flex justify-between rounded border border-border/60 bg-background px-3 py-2 text-sm"
                          >
                            <span>Minggu {item.week}</span>
                            <span className="font-mono tabular-nums">
                              {item.dose_ml.toLocaleString("id-ID")} ml
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                    {result.disclaimer}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Button asChild>
                      <Link href={consultationHref}>Tanya kebutuhan ini</Link>
                    </Button>
                    <Button type="button" variant="outline" onClick={reset}>
                      Hitung lagi
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
