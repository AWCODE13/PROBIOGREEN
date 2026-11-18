import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Variant {
    id: number;
    label: string;
    price_idr: number | null;
}

interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    is_popular: boolean;
    image_url: string | null;
    variants: Variant[];
}

export default function ProductEdit({ product }: { product: Product }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        name: product.name,
        description: product.description,
        is_popular: product.is_popular,
        image: null as File | null,
        variants: product.variants.map((v) => ({ id: v.id, price_idr: v.price_idr })),
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        post(`/admin/products/${product.id}`, { forceFormData: true });
    };

    const setPrice = (id: number, value: string) => {
        setData(
            'variants',
            data.variants.map((v) =>
                v.id === id ? { ...v, price_idr: value === '' ? null : Number(value) } : v,
            ),
        );
    };

    return (
        <>
            <Head title={`Ubah ${product.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form
                    onSubmit={submit}
                    className="flex max-w-2xl flex-col gap-6 rounded-lg border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border"
                >
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">Ubah produk</h3>
                        <p className="mt-1 text-sm capitalize text-muted-foreground">{product.category}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Nama</Label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description">Deskripsi</Label>
                        <textarea
                            id="description"
                            rows={5}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        />
                        {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="image">Foto produk (JPG/PNG, maks 4 MB)</Label>
                        {product.image_url && (
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="h-32 w-32 rounded-md object-cover"
                            />
                        )}
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('image', e.target.files?.[0] ?? null)}
                            className="text-sm text-muted-foreground file:mr-3 file:rounded-md file:border file:border-input file:bg-transparent file:px-3 file:py-1.5 file:text-sm"
                        />
                        {errors.image && <p className="text-sm text-destructive">{errors.image}</p>}
                    </div>

                    <div className="flex flex-col gap-3">
                        <Label>Harga per kemasan (kosongkan jika belum dijual)</Label>
                        {data.variants.map((variant, index) => (
                            <div key={variant.id} className="flex items-center gap-3">
                                <span className="w-20 text-sm text-muted-foreground">
                                    {product.variants[index].label}
                                </span>
                                <Input
                                    type="number"
                                    min={0}
                                    step={1000}
                                    placeholder="35000"
                                    value={variant.price_idr ?? ''}
                                    onChange={(e) => setPrice(variant.id, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>

                    <label className="flex items-center gap-3 text-sm">
                        <input
                            type="checkbox"
                            checked={data.is_popular}
                            onChange={(e) => setData('is_popular', e.target.checked)}
                            className="size-4 rounded border-input"
                        />
                        Tampilkan sebagai produk populer di landing page
                    </label>

                    <div className="flex items-center gap-3">
                        <Button type="submit" disabled={processing}>
                            Simpan
                        </Button>
                        <Link href="/admin/products" className="text-sm text-muted-foreground hover:underline">
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}
