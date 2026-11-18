import { Head, Link } from '@inertiajs/react';

interface Variant {
    id: number;
    label: string;
    price_idr: number | null;
}

interface Product {
    id: number;
    name: string;
    category: string;
    is_popular: boolean;
    image_url: string | null;
    variants: Variant[];
}

export default function ProductsIndex({ products }: { products: Product[] }) {
    return (
        <>
            <Head title="Produk" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-lg border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border">
                    <h3 className="text-lg font-semibold text-foreground">Produk</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Ubah nama, deskripsi, harga, foto, dan tanda produk populer.
                    </p>

                    <div className="mt-6 overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-4 py-2 text-left font-medium text-muted-foreground">Foto</th>
                                    <th className="px-4 py-2 text-left font-medium text-muted-foreground">Produk</th>
                                    <th className="px-4 py-2 text-left font-medium text-muted-foreground">Kategori</th>
                                    <th className="px-4 py-2 text-left font-medium text-muted-foreground">Harga</th>
                                    <th className="px-4 py-2 text-left font-medium text-muted-foreground">Populer</th>
                                    <th className="px-4 py-2" />
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="border-b border-border">
                                        <td className="px-4 py-3">
                                            {product.image_url ? (
                                                <img
                                                    src={product.image_url}
                                                    alt={product.name}
                                                    className="h-12 w-12 rounded object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-12 w-12 items-center justify-center rounded bg-muted text-xs text-muted-foreground">
                                                    —
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 font-medium text-foreground">{product.name}</td>
                                        <td className="px-4 py-3 capitalize text-muted-foreground">{product.category}</td>
                                        <td className="px-4 py-3 font-mono text-foreground">
                                            {product.variants
                                                .map((v) =>
                                                    v.price_idr
                                                        ? `${v.label} · Rp ${v.price_idr.toLocaleString('id-ID')}`
                                                        : `${v.label} · —`,
                                                )
                                                .join(' / ')}
                                        </td>
                                        <td className="px-4 py-3">
                                            {product.is_popular ? (
                                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                                    Populer
                                                </span>
                                            ) : (
                                                <span className="text-xs text-muted-foreground">—</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <Link
                                                href={`/admin/products/${product.id}/edit`}
                                                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                                            >
                                                Ubah
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
