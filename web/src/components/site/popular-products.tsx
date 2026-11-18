"use client";

import { useEffect, useState } from "react";
import { ProductCard, type Product } from "@/components/site/product-card";

export function PopularProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/v1/products?popular=1")
      .then((res) => (res.ok ? res.json() : { data: [] }))
      .then((json) => {
        if (!cancelled) setProducts(json.data ?? []);
      })
      .catch(() => {
        if (!cancelled) setProducts([]);
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loaded && products.length === 0) return null;

  return (
    <div className="mt-10">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-heading text-lg font-semibold">Produk populer</h3>
        <p className="font-mono text-xs text-muted-foreground">Harga per kemasan</p>
      </div>

      <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {!loaded
          ? [0, 1, 2].map((key) => (
              <div
                key={key}
                aria-hidden="true"
                className="h-72 animate-pulse rounded-lg border border-border bg-card"
              />
            ))
          : products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}
