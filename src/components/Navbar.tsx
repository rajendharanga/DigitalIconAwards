import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenModal: (defaultRole?: 'Creator' | 'Brand' | 'Media' | 'Other') => void;
}

const NAV_ITEMS = [
  { label: 'The Awards', href: '#the-idea' },
  { label: 'Creators', href: '#the-new-icon' },
  { label: 'The Culture', href: '#the-culture' },
  { label: 'Partners', href: '#creator-culture-nexus' },
  { label: 'About', href: '#the-mystery' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);

      const sections = NAV_ITEMS.map((item) => item.href.replace('#', ''));
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240 && rect.bottom >= 160) {
            current = `#${id}`;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080706]/90 backdrop-blur-md border-b border-[#C6A15B]/25 py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.75)]'
          : 'bg-gradient-to-b from-[#080706]/85 via-[#080706]/40 to-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Zone 1: Brand Logo */}
        <a
          href="#top"
          onClick={scrollToTop}
          aria-label="Digital ICON Awards Home"
          className="inline-flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A15B]"
        >
          <img
            src="https://static.wixstatic.com/media/14ff0a_cbb2ac5c05a04b4abad6eaf1aad7e6e8~mv2.png"
            alt="Digital ICON Awards"
            referrerPolicy="no-referrer"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-200 hover:scale-[1.02]"
          />
        </a>

        {/* Zone 2: 5 clean text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-9 text-xs tracking-[0.18em] uppercase font-sans"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative py-1 whitespace-nowrap transition-colors duration-200 group ${
                  isActive ? 'text-[#E6C982]' : 'text-[#F4EFE4]/75 hover:text-[#F4EFE4]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-[1px] bg-[#C6A15B] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onOpenModal()}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase font-medium text-[#F4EFE4] border border-[#C6A15B]/45 bg-[#15110B]/70 hover:bg-[#C6A15B] hover:text-[#080706] hover:border-[#E6C982] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E6C982]"
          >
            ENTER THE ICON WORLD
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-[#F4EFE4] hover:text-[#E6C982] border border-[#C6A15B]/25 bg-[#15110B]/60 transition-colors duration-200 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080706]/98 backdrop-blur-xl border-b border-[#C6A15B]/30 px-6 pt-6 pb-8">
          <nav className="flex flex-col space-y-5" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="flex items-center justify-between py-2 border-b border-[#C6A15B]/10 text-sm tracking-[0.22em] uppercase text-[#F4EFE4] hover:text-[#E6C982] transition-colors"
              >
                <span>{item.label}</span>
                <span className="font-serif italic text-xs text-[#8E8575] tabular-nums">
                  0{idx + 1}
                </span>
              </a>
            ))}
            <div className="pt-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal();
                }}
                className="w-full py-3.5 px-6 text-xs tracking-[0.22em] uppercase font-medium text-[#080706] bg-gradient-to-r from-[#C6A15B] via-[#E6C982] to-[#C6A15B] hover:opacity-95 transition-opacity whitespace-nowrap cursor-pointer"
              >
                ENTER THE ICON WORLD
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
