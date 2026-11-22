"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const slides = [
  {
    badge: "Kalkulator Dosis Otomatis",
    headline: "Hitung kebutuhan dulu, sebelum membeli.",
    subtitle:
      "Masukkan luas lahan atau jumlah ternak. Kebutuhan produk, perkiraan biaya, dan jadwal aplikasi muncul dalam satu menit, tanpa akun.",
    primaryText: "Pelajari cara hitungnya",
    primaryHref: "#kalkulator",
    secondaryText: "Lihat kategori",
    secondaryHref: "#produk",
    image: "/images/laptop-seeds.png",
  },
  {
    badge: "Sektor Pertanian",
    headline: "Dosis tepat untuk setiap hektar lahan.",
    subtitle:
      "Sesuaikan takaran probiotik tanah dan tanaman berdasarkan jenis komoditas serta fase tanam.",
    primaryText: "Hitung dosis lahan",
    primaryHref: "#kalkulator",
    secondaryText: "Produk pertanian",
    secondaryHref: "#produk",
    image: "/images/farm-paddy.png",
  },
  {
    badge: "Peternakan & Perikanan",
    headline: "Optimalkan pakan dan kesehatan kolam.",
    subtitle:
      "Estimasi kebutuhan suplemen ternak dan probiotik air secara akurat sebelum belanja.",
    primaryText: "Hitung kebutuhan ternak",
    primaryHref: "#kalkulator",
    secondaryText: "Produk ternak & ikan",
    secondaryHref: "#produk",
    image: "/images/aquaculture.png",
  },
];

const AUTOPLAY_MS = 6000;

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setCurrentSlide((index + slides.length) % slides.length);
  }, []);

  const prevSlide = useCallback(() => goTo(currentSlide - 1), [currentSlide, goTo]);
  const nextSlide = useCallback(() => goTo(currentSlide + 1), [currentSlide, goTo]);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setTimeout(nextSlide, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [currentSlide, paused, nextSlide]);

  const slide = slides[currentSlide];

  return (
    <div className="mx-auto max-w-7xl px-6 pt-4">
      <div
        className="relative"
        role="region"
        aria-roledescription="carousel"
        aria-label="Sorotan Probiogreen"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") prevSlide();
          if (event.key === "ArrowRight") nextSlide();
        }}
      >
        <div className="relative h-[440px] overflow-hidden rounded-[32px] bg-[#D3EED9] shadow-none lg:h-[480px]">
          {/* Foto: separuh kanan, tanpa overlay gelap */}
          <div className="absolute inset-y-0 right-0 w-full lg:w-[62%]">
            <img
              key={slide.image}
              src={slide.image}
              alt={slide.headline}
              className="h-full w-full animate-[m3-carousel-img_520ms_cubic-bezier(0.2,0,0,1)] object-cover motion-reduce:animate-none"
            />
          </div>

          {/* Blend: pastel sage di kiri yang melebur ke foto */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#D3EED9] via-[#D3EED9] via-[70%] to-transparent lg:w-[65%]"
          />

          {/* Konten teks */}
          <div className="relative z-10 flex h-full max-w-xl flex-col justify-center px-8 lg:px-14">
            <div
              key={`content-${currentSlide}`}
              className="animate-[m3-carousel-text_420ms_cubic-bezier(0.2,0,0,1)] motion-reduce:animate-none"
            >
              <span className="mb-4 inline-flex w-fit items-center rounded-full bg-[#DCE6DC] px-3.5 py-1 text-xs font-medium text-[#072110]">
                {slide.badge}
              </span>

              <h2 className="mb-4 text-3xl font-bold leading-[1.15] tracking-tight text-[#072110] lg:text-5xl">
                {slide.headline}
              </h2>

              <p className="mb-7 text-base leading-relaxed text-[#1F3D29] lg:text-lg">
                {slide.subtitle}
              </p>

              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="rounded-full bg-[#1B6B38] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#155330]"
                >
                  <Link href={slide.primaryHref}>{slide.primaryText}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border border-[#1B6B38] bg-transparent px-6 py-2.5 text-sm font-medium text-[#1B6B38] hover:bg-[#1B6B38]/10 hover:text-[#1B6B38]"
                >
                  <Link href={slide.secondaryHref}>{slide.secondaryText}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigasi kiri/kanan */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Slide sebelumnya"
          className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#F8FAF6]/90 text-[#072110] shadow-none transition-colors hover:bg-[#F8FAF6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B6B38]"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Slide berikutnya"
          className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#F8FAF6]/90 text-[#072110] shadow-none transition-colors hover:bg-[#F8FAF6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B6B38]"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>

        {/* Indikator bawah */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center">
          {slides.map((item, index) => (
            <button
              key={item.badge}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Slide ${index + 1}: ${item.badge}`}
              aria-current={index === currentSlide}
              className="flex h-6 min-w-6 items-center justify-center rounded-full px-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B6B38]"
            >
              <span
                aria-hidden="true"
                className={
                  index === currentSlide
                    ? "block h-2.5 w-8 rounded-full bg-[#1B6B38] transition-all"
                    : "block h-2.5 w-2.5 rounded-full bg-[#072110]/30 transition-all hover:bg-[#072110]/50"
                }
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
