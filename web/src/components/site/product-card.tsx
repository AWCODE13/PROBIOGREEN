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

const categoryLabel = (category: string) =>
  category.charAt(0).toUpperCase() + category.slice(1);

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col rounded-[28px] bg-surface-container-high p-3 text-on-primary-container">
      <div className="relative">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-[22px] bg-surface-container object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex aspect-[4/3] w-full items-center justify-center rounded-[22px] bg-secondary-container text-xs font-medium uppercase tracking-widest text-on-secondary-container"
          >
            Foto menyusul
          </div>
        )}

        <span className="absolute left-3 top-3 rounded-full bg-surface-container/95 px-2.5 py-1 text-[11px] font-medium text-on-primary-container">
          {categoryLabel(product.category)}
        </span>

        {product.is_popular ? (
          <span className="absolute right-3 top-3 rounded-full bg-tertiary-container px-2.5 py-1 text-[11px] font-medium text-on-tertiary-container">
            Populer
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <h3 className="font-dm-sans text-lg font-semibold leading-snug">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-on-primary-container/70">
          {product.form === "liquid" ? "Cair" : "Padat"}
        </p>

        <dl className="mt-4 space-y-2">
          {product.variants.map((variant) => (
            <div
              key={variant.id}
              className="flex items-baseline justify-between gap-3 rounded-[14px_4px_14px_4px] bg-surface-container px-3 py-2 text-sm"
            >
              <dt className="font-medium">{variant.label}</dt>
              <dd
                className={
                  variant.price_idr
                    ? "font-semibold text-primary"
                    : "text-xs text-on-primary-container/70"
                }
              >
                {variant.price_idr ? rupiah(variant.price_idr) : "Hubungi kami"}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto pt-5">
          <Button asChild className="rounded-md px-4 py-2">
            <Link href="/kalkulator">Hitung kebutuhan</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
