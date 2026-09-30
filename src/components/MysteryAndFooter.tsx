import React, { useState } from 'react';
import { Check, Copy, ArrowUpRight } from 'lucide-react';

export type FooterDocType = 'about' | 'contact' | 'privacy' | 'terms' | null;

interface MysteryAndFooterProps {
  onOpenModal: (defaultRole?: 'Creator' | 'Brand' | 'Media' | 'Other') => void;
  onOpenFooterDoc: (doc: FooterDocType) => void;
}

const SOCIAL_CHANNELS = [
  {
    id: 'instagram',
    name: 'Instagram',
    renderIcon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 'youtube',
    name: 'YouTube',
    renderIcon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4.5" width="20" height="15" rx="4" />
        <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    renderIcon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2.5" />
        <line x1="8" y1="10" x2="8" y2="16.5" />
        <circle cx="8" cy="7.2" r="0.9" fill="currentColor" stroke="none" />
        <path d="M12 16.5V12.5C12 11.1 13.1 10 14.5 10C15.9 10 16.5 11.1 16.5 12.5V16.5" />
      </svg>
    ),
  },
  {
    id: 'x',
    name: 'X',
    renderIcon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export const MysteryAndFooter: React.FC<MysteryAndFooterProps> = ({
  onOpenModal,
  onOpenFooterDoc,
}) => {
  const [copiedHashtag, setCopiedHashtag] = useState(false);
  const [selectedChannelNote, setSelectedChannelNote] = useState<string | null>(null);

  const handleCopyHashtag = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('#DigitalIconAwards').catch(() => {});
    }
    setCopiedHashtag(true);
    window.setTimeout(() => setCopiedHashtag(false), 2600);
  };

  const handleSocialClick = (channelName: string) => {
    setSelectedChannelNote(
      `Official ${channelName} dispatches will go live alongside the inaugural reveal. Join the loop to be notified first.`
    );
  };

  return (
    <>
      {/* SECTION — THE UNVEILING (Warm Champagne-Gold Invitation Banner Layout) */}
      <section
        id="the-mystery"
        className="relative py-24 md:py-36 px-6 md:px-12 bg-[#F4EFE4] text-[#15110B] border-t border-[#C6A15B]/30 overflow-hidden"
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="relative bg-[#17120B] text-[#F4EFE4] border border-[#C6A15B]/45 p-10 sm:p-16 md:p-20 shadow-[0_30px_80px_rgba(21,17,11,0.18)] overflow-hidden">
            {/* Warm Gold Corner Accents */}
            <div className="absolute top-5 left-5 w-8 h-8 border-t border-l border-[#E6C982]/50" />
            <div className="absolute bottom-5 right-5 w-8 h-8 border-b border-r border-[#E6C982]/50" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.34em] text-[#E6C982] mb-4">
                  THE UNVEILING
                </p>
                <h2
                  className="font-serif text-4xl sm:text-6xl md:text-7xl leading-[1.03] text-[#F4EFE4] font-normal mb-5"
                  style={{ textWrap: 'balance' }}
                >
                  Something <span className="italic text-gold-metallic">iconic</span> is coming.
                </h2>
                <p className="font-serif italic text-xl sm:text-2xl text-[#F4EFE4]/80 font-light">
                  A new chapter in India&apos;s digital culture is about to begin.
                </p>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenModal()}
                  className="w-full sm:w-auto px-10 py-5 text-xs tracking-[0.28em] uppercase font-medium text-[#080706] bg-gradient-to-r from-[#C6A15B] via-[#F1DDA7] to-[#C6A15B] hover:brightness-110 transition-all duration-200 shadow-[0_0_40px_rgba(198,161,91,0.32)] whitespace-nowrap cursor-pointer"
                >
                  STAY IN THE LOOP
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION — SOCIAL PRESENCE (Horizontal Editorial Bar) */}
      <section
        id="social"
        className="relative py-20 md:py-24 px-6 md:px-12 bg-[#EAE0CE] text-[#15110B] border-t border-[#15110B]/10"
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[#8A682D] font-semibold mb-2">
                SOCIAL PRESENCE
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-[0.04em] uppercase text-[#15110B] font-normal">
                THE CONVERSATION STARTS HERE.
              </h2>
            </div>

            {/* Hashtag + Social Icons Strip */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleCopyHashtag}
                className="inline-flex items-center gap-3 px-5 py-3.5 border border-[#15110B]/25 bg-[#FBF8F1] hover:border-[#8A682D] transition-colors cursor-pointer"
              >
                <span className="font-serif italic text-xl sm:text-2xl text-[#8A682D]">
                  #DigitalIconAwards
                </span>
                {copiedHashtag ? (
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-[#15110B]">
                    <Check className="w-3.5 h-3.5" /> COPIED
                  </span>
                ) : (
                  <Copy className="w-4 h-4 text-[#6E6353]" />
                )}
              </button>

              {SOCIAL_CHANNELS.map((channel) => (
                <button
                  key={channel.id}
                  type="button"
                  onClick={() => handleSocialClick(channel.name)}
                  aria-label={channel.name}
                  className="inline-flex items-center gap-2.5 px-5 py-3.5 border border-[#15110B]/20 bg-[#FBF8F1] text-[#15110B] hover:bg-[#15110B] hover:text-[#F4EFE4] transition-colors cursor-pointer"
                >
                  {channel.renderIcon()}
                  <span className="text-xs uppercase tracking-[0.2em]">{channel.name}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedChannelNote && (
            <div className="mt-6 p-4 border border-[#8A682D]/40 bg-[#FBF8F1] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#15110B]">
              <span>{selectedChannelNote}</span>
              <button
                type="button"
                onClick={() => onOpenModal()}
                className="text-[11px] uppercase tracking-[0.22em] text-[#8A682D] font-semibold hover:underline whitespace-nowrap shrink-0 cursor-pointer"
              >
                STAY IN THE LOOP →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* MINIMAL LUXURY FOOTER */}
      <footer className="bg-[#080706] text-[#F4EFE4] border-t border-[#C6A15B]/25 pt-16 pb-12 px-6 md:px-12">
        <div className="max-w-[1320px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 pb-12 border-b border-[#C6A15B]/15">
            <div>
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-block mb-4"
              >
                <img
                  src="https://static.wixstatic.com/media/14ff0a_cbb2ac5c05a04b4abad6eaf1aad7e6e8~mv2.png"
                  alt="Digital ICON Awards"
                  referrerPolicy="no-referrer"
                  className="h-12 sm:h-14 w-auto object-contain"
                />
              </a>
              <p className="font-serif italic text-lg sm:text-xl text-[#8E8575]">
                Celebrating the voices shaping India&apos;s digital culture.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-xs uppercase tracking-[0.22em]">
              <button
                type="button"
                onClick={() => onOpenFooterDoc('about')}
                className="text-[#F4EFE4]/75 hover:text-[#E6C982] transition-colors cursor-pointer"
              >
                About
              </button>
              <button
                type="button"
                onClick={() => onOpenFooterDoc('contact')}
                className="text-[#F4EFE4]/75 hover:text-[#E6C982] transition-colors cursor-pointer"
              >
                Contact
              </button>
              <button
                type="button"
                onClick={() => onOpenFooterDoc('privacy')}
                className="text-[#F4EFE4]/75 hover:text-[#E6C982] transition-colors cursor-pointer"
              >
                Privacy
              </button>
              <button
                type="button"
                onClick={() => onOpenFooterDoc('terms')}
                className="text-[#F4EFE4]/75 hover:text-[#E6C982] transition-colors cursor-pointer"
              >
                Terms
              </button>

              <span aria-hidden="true" className="text-[#C6A15B]/40 hidden sm:inline">
                |
              </span>

              {SOCIAL_CHANNELS.map((social) => (
                <button
                  key={social.id}
                  type="button"
                  onClick={() => handleSocialClick(social.name)}
                  className="inline-flex items-center gap-1 text-[#8E8575] hover:text-[#E6C982] transition-colors cursor-pointer"
                >
                  <span>{social.name}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-70" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs tracking-[0.16em] text-[#8E8575]">
            <p>© 2026 Digital ICON Awards. All rights reserved.</p>
            <p className="uppercase text-[10px] tracking-[0.28em] text-[#8E8575]/80">
              INDIA&apos;S DIGITAL CREATOR CULTURE, REIMAGINED
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
