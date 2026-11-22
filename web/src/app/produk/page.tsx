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

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <h1 className="text-balance font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            Katalog Produk
          </h1>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            Produk Probiogreen tersedia untuk empat sektor: pertanian,
            perkebunan, peternakan, dan perikanan. Pilih kategori untuk melihat
            produk yang sesuai dengan kebutuhan Anda.
          </p>

          <h2 className="sr-only">Daftar produk</h2>
<div className="mt-8 flex flex-wrap gap-3">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
            >
              Semua
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.value)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          {loading && (
            <div aria-live="polite" className="text-muted-foreground">
              Sedang memuat produk...
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
            >
              {error}
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <p className="text-muted-foreground">
              Tidak ada produk untuk kategori ini.
            </p>
          )}

          {!loading && products.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
