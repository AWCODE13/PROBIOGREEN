"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard, type Product } from "@/components/site/product-card";

const categories = [
  { value: "pertanian", label: "Pertanian" },
  { value: "perkebunan", label: "Perkebunan" },
  { value: "peternakan", label: "Peternakan" },
  { value: "perikanan", label: "Perikanan" },
];

const MAX_VISIBLE_CATEGORIES = 5; // Batas optimal Hick's Law: 5-9 pilihan

export default function ProdukPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const url = selectedCategory
      ? `/api/v1/products?category=${selectedCategory}`
      : "/api/v1/products";

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal memuat produk");
        return res.json();
      })
      .then((json) => setProducts(json.data ?? []))
      .catch((e: unknown) => {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setError(e instanceof Error ? e.message : "Terjadi kesalahan");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [selectedCategory]);

  // Hitung berapa kategori yang tampil dan berapa yang tersembunyi
  const visibleCategories = categories.slice(0, MAX_VISIBLE_CATEGORIES);
  const hiddenCategories = categories.slice(MAX_VISIBLE_CATEGORIES);
  const hasHidden = hiddenCategories.length > 0;

  return (
    <main className="min-h-screen bg-surface-container">
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="rounded-[32px] bg-primary-container p-7 text-on-primary-container sm:p-10">
            <span className="inline-flex w-fit items-center rounded-full bg-on-primary-container/10 px-3 py-1 text-xs font-medium">
              Katalog
            </span>
            <h1 className="mt-4 text-balance font-dm-sans text-4xl font-semibold tracking-tight sm:text-5xl">
              Katalog Produk
            </h1>
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-on-primary-container/85">
              Produk Probiogreen tersedia untuk empat sektor: pertanian,
              perkebunan, peternakan, dan perikanan. Pilih kategori untuk melihat
              produk yang sesuai dengan kebutuhan Anda.
            </p>
          </div>

          <h2 className="sr-only">Daftar produk</h2>
          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter kategori">
            <Button
              variant="ghost"
              aria-pressed={selectedCategory === null}
              onClick={() => setSelectedCategory(null)}
              className={
                selectedCategory === null
                  ? "rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90"
                  : "rounded-full bg-surface-container-high px-5 text-on-primary-container hover:bg-secondary-container hover:text-on-secondary-container"
              }
            >
              Semua
            </Button>
            {visibleCategories.map((cat) => (
              <Button
                key={cat.value}
                variant="ghost"
                aria-pressed={selectedCategory === cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={
                  selectedCategory === cat.value
                    ? "rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90"
                    : "rounded-full bg-surface-container-high px-5 text-on-primary-container hover:bg-secondary-container hover:text-on-secondary-container"
                }
              >
                {cat.label}
              </Button>
            ))}
            {hasHidden && (
              <Button
                variant="ghost"
                className="rounded-full bg-surface-container-high px-5 text-on-primary-container hover:bg-secondary-container hover:text-on-secondary-container"
                onClick={() => setSelectedCategory(null)}
              >
                Lihat semuai {hiddenCategories.length + 1}
              </Button>
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <div aria-live="polite" className="sr-only">
            {loading
              ? "Sedang memuat produk"
              : `${products.length} produk ditampilkan`}
          </div>

          {loading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[0, 1, 2, 3].map((key) => (
                <div
                  key={key}
                  aria-hidden="true"
                  className="h-80 animate-pulse rounded-[28px] bg-surface-container-high"
                />
              ))}
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="rounded-[24px] border border-destructive/30 bg-destructive/10 p-6 text-sm font-medium text-destructive"
            >
              {error}
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="rounded-[24px] bg-secondary-container p-6 text-sm text-on-secondary-container">
              Tidak ada produk untuk kategori ini.
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}