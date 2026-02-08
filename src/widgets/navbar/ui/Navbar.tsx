'use client';

import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { Menu, Search, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-500 ease-out'
        )}
      >
        <div
          className={cn(
            'mx-auto transition-all duration-500 ease-out',
            isScrolled
              ? 'max-w-7xl px-12 sm:px-6 py-3'
              : 'max-w-520 px-6 sm:px-8 py-5'
          )}
        >
          <div
            className={cn(
              'flex items-center justify-between',
              'transition-all duration-500 ease-out',
              isScrolled && [
                'rounded-2xl',
                'bg-white/20 backdrop-blur-[10px]',
                'px-4 sm:px-6 py-3.5',
                'border border-neutral-400/20',
                'ring-1 ring-black/5',
              ],
              !isScrolled && ['border border-transparent']
            )}
          >
            {/* Logo */}
            <Link href="#" className="flex items-center gap-2 sm:gap-3 group relative z-10">
              {/* <div
              className={cn(
                'relative overflow-hidden rounded-xl sm:rounded-2xl',
                'bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500',
                'flex items-center justify-center',
                'transition-all duration-300 ease-out',
                'group-hover:scale-110 group-hover:rotate-3',
                'shadow-lg group-hover:shadow-xl',
                'group-hover:shadow-primary-500/50',
                isScrolled ? 'w-10 h-10' : 'w-11 h-11 sm:w-12 sm:h-12'
              )}
            >
              <span className="text-white font-bold text-lg sm:text-xl relative z-10">
                NBF
              </span>
              <div
                className={cn(
                  'absolute inset-0',
                  'bg-gradient-to-br from-white/40 via-white/10 to-transparent',
                  'opacity-0 group-hover:opacity-100',
                  'transition-opacity duration-300'
                )}
              />
            </div> */}
              <div className="flex items-center gap-2">
                <Search className="size-5 text-primary" />
                <span className="text-lg font-bold tracking-tight">
                  MetaChecker
                </span>
              </div>
            </Link>



            <Button asChild size="sm">
              <Link href="/metadata">Open Tool</Link>
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}