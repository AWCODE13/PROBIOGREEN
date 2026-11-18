"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProductVariant {
  id: number;
  label: string;
  volume_ml: number;
  price_idr: number | null;
}

interface Product {
  id: number;
  slug: string;
  category: string;
  name: string;
  form: string;
  price_visible: boolean;
  variants: ProductVariant[];
}

export default function ProdukPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { value: "pertanian", label: "Pertanian" },
    { value: "perkebunan", label: "Perkebunan" },
    { value: "peternakan", label: "Peternakan" },
    { value: "perikanan", label: "Perikanan" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = selectedCategory
          ? `/api/v1/products?category=${selectedCategory}`
          : "/api/v1/products";
        const res = await fetch(url);
        if (!res.ok) throw new Error("Gagal memuat produk");
        const data = await res.json();
        setProducts(data.data || []);
      } catch (e: any) {
        setError(e.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <h1 className="text-balance font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            Katalog Produk
          </h1>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            Produk Probiogreen tersedia untuk empat sektor: pertanian, perkebunan, peternakan, dan perikanan. Pilih kategori untuk melihat produk yang sesuai dengan kebutuhan Anda.
          </p>

          {/* Filter Kategori */}
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

      {/* Product Grid */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          {loading && (
            <div className="text-center text-muted-foreground">
              Sedang memuat produk...
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="text-center text-muted-foreground">
              Tidak ada produk untuk kategori ini.
            </div>
          )}

          {!loading && products.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="rounded-lg border border-border bg-card p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-heading text-lg font-semibold">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground capitalize">
                    {product.category}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {product.form === "liquid" ? "Cair" : "Padat"}
                  </p>

                  {/* Variants */}
                  <div className="mt-4 space-y-2">
                    {product.variants.map((variant) => (
                      <div
                        key={variant.id}
                        className="flex items-center justify-between rounded border border-border/50 bg-background p-2 text-sm"
                      >
                        <span className="font-medium">{variant.label}</span>
                        {variant.price_idr ? (
                          <span className="text-primary">
                            Rp {variant.price_idr.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            Hubungi kami
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button asChild variant="outline" className="mt-4 w-full">
                    <Link href="/kalkulator">Hitung kebutuhan</Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
