import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface ProductVariant {
  id: number;
  label: string;
  volume_ml: number;
  price_idr: number | null;
}

export interface Product {
  id: number;
  slug: string;
  category: string;
  name: string;
  description?: string | null;
  form: string;
  price_visible: boolean;
  image_url?: string | null;
  is_popular?: boolean;
  variants: ProductVariant[];
}

const rupiah = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md">
      {product.image_url ? (
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="aspect-[4/3] w-full bg-muted object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex aspect-[4/3] w-full items-center justify-center bg-muted text-xs uppercase tracking-widest text-muted-foreground"
        >
          Foto menyusul
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-lg font-semibold">{product.name}</h3>
        <p className="mt-1.5 text-xs capitalize text-muted-foreground">
          {product.category} · {product.form === "liquid" ? "Cair" : "Padat"}
        </p>

        <dl className="mt-4 space-y-2">
          {product.variants.map((variant) => (
            <div
              key={variant.id}
              className="flex items-center justify-between rounded border border-border/60 bg-background p-2 text-sm"
            >
              <dt className="font-medium">{variant.label}</dt>
              <dd className={variant.price_idr ? "text-primary" : "text-xs text-muted-foreground"}>
                {variant.price_idr ? rupiah(variant.price_idr) : "Hubungi kami"}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto pt-6">
          <Button asChild variant="outline" className="w-full">
            <Link href="/kalkulator">Hitung kebutuhan</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
