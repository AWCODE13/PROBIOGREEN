"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/site/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { consultationHref, site } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="grid size-8 place-items-center rounded-[12px_4px_12px_4px] bg-primary text-primary-foreground">
            <Sprout aria-hidden="true" className="size-4.5" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            {site.name}
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary-container hover:text-on-secondary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden rounded-full px-4 sm:inline-flex">
            <Link href={consultationHref}>Tanya kebutuhan</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label="Buka menu"
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left">{site.name}</SheetTitle>
              </SheetHeader>
              <nav aria-label="Navigasi seluler" className="px-4">
                <ul className="flex flex-col">
                  {site.nav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block border-b border-border/70 py-3 text-base text-foreground"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-6 w-full">
                  <Link href={consultationHref} onClick={() => setOpen(false)}>
                    Tanya kebutuhan
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
