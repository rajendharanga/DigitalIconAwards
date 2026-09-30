import React, { useEffect, useRef, useState } from 'react';

const STATEMENT_ROWS = [
  {
    numeral: '01',
    word: 'CREATE.',
    descriptor: 'Originality that commands the cultural stage.',
  },
  {
    numeral: '02',
    word: 'INFLUENCE.',
    descriptor: 'Conviction that shifts how millions think and feel.',
  },
  {
    numeral: '03',
    word: 'IMPACT.',
    descriptor: 'Resonance that endures far beyond the feed.',
  },
];

export const EditorialSections: React.FC = () => {
  const [newIconVisible, setNewIconVisible] = useState(false);
  const [revealedCount, setRevealedCount] = useState(3);
  const [ideaImgError, setIdeaImgError] = useState(false);

  const newIconRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === newIconRef.current && entry.isIntersecting) {
            setNewIconVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (newIconRef.current) observer.observe(newIconRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!newIconVisible) return;
    setRevealedCount(1);
    const t1 = window.setTimeout(() => setRevealedCount(2), 380);
    const t2 = window.setTimeout(() => setRevealedCount(3), 760);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [newIconVisible]);

  return (
    <>
      {/* SECTION 01 — THE IDEA (Warm Alabaster / Champagne Editorial Magazine Spread Layout) */}
      <section
        id="the-idea"
        className="relative py-28 md:py-40 px-6 md:px-12 bg-[#F4EFE4] text-[#15110B] border-t border-[#C6A15B]/30 overflow-hidden"
      >
        {/* Subtle Warm Architectural Grid Hairlines */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute top-0 bottom-0 left-12 w-[1px] bg-[#15110B]/8 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="hidden lg:block absolute top-0 bottom-0 right-12 w-[1px] bg-[#15110B]/8 pointer-events-none"
        />

        <div className="max-w-[1320px] mx-auto">
          {/* Top Editorial Masthead Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-14 border-b border-[#15110B]/15">
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-[0.34em] text-[#8A682D] font-semibold">
                THE IDEA
              </span>
              <span className="h-[1px] w-12 bg-[#8A682D]/50" />
            </div>
            <span className="text-xs uppercase tracking-[0.24em] text-[#5C5346]">
              CULTURAL MONOGRAPH · BHARAT
            </span>
          </div>

          {/* Oversized Magazine Spread Headline */}
          <div className="max-w-4xl mb-16">
            <h2
              className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[4.85rem] leading-[1.02] text-[#15110B] font-normal"
              style={{ textWrap: 'balance' }}
            >
              The internet created a new generation of{' '}
              <span className="italic text-[#8A682D]">icons.</span>
            </h2>
          </div>

          {/* Asymmetric 12-Column Editorial Spread: Image Left (7 cols) + Drop-Cap Essay Right (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left: New Warm Luxury Editorial Photography */}
            <div className="lg:col-span-7">
              <div className="relative bg-[#EAE1D0] border border-[#15110B]/15 p-3 sm:p-5 shadow-[0_24px_60px_rgba(21,17,11,0.08)]">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#15110B]">
                  {!ideaImgError ? (
                    <img
                      src="https://static.wixstatic.com/media/14ff0a_ccaa6ba9b6f94981ae660d5c532871d1~mv2.png"
                      alt="Digital ICON Awards — The Idea"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={() => setIdeaImgError(true)}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#EFE6D4] via-[#DFCFAF] to-[#C6A15B]" />
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between text-xs font-serif italic text-[#5C5346] px-1">
                  <span>Plate I — The Stage of Modern Cultural Voice</span>
                  <span className="not-italic uppercase tracking-[0.2em] text-[10px] text-[#8A682D] font-sans">
                    EDITORIAL ARCHIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Editorial Essay Column with Drop Cap */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full lg:pt-4">
              <div className="space-y-8">
                <p className="text-lg sm:text-xl md:text-2xl leading-[1.7] text-[#15110B]/90 font-light first-letter:font-serif first-letter:text-6xl first-letter:float-left first-letter:mr-4 first-letter:leading-none first-letter:text-[#8A682D]">
                  Digital culture has changed how India discovers, influences, entertains and
                  connects.
                </p>

                <div className="pl-6 border-l-2 border-[#8A682D]">
                  <p className="font-serif italic text-2xl sm:text-3xl leading-[1.35] text-[#15110B]">
                    Digital ICON Awards exists to celebrate the voices shaping that culture.
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-[#15110B]/15 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-[#5C5346]">
                <span>NEW CULTURAL INSTITUTION</span>
                <span className="text-[#8A682D] font-medium">INDIA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02 — THE NEW ICON (Asymmetric Split-Screen Ledger on Rich Warm Bronze-Espresso) */}
      <section
        id="the-new-icon"
        ref={newIconRef}
        className="relative py-28 md:py-40 px-6 md:px-12 bg-gradient-to-b from-[#1B140C] via-[#140F09] to-[#1B140C] text-[#F4EFE4] border-t border-[#C6A15B]/25 overflow-hidden"
      >
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Sticky/Anchored Manifesto Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.34em] text-[#E6C982] mb-5">
                  THE NEW ICON
                </p>
                <h2
                  className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-[#F4EFE4] font-normal mb-10"
                  style={{ textWrap: 'balance' }}
                >
                  WHO BECOMES AN <span className="italic text-gold-metallic">ICON?</span>
                </h2>
              </div>

              <blockquote className="p-7 sm:p-8 bg-[#241B11]/80 border-l-2 border-[#E6C982]">
                <p className="font-serif italic text-2xl sm:text-3xl leading-[1.38] text-[#F4EFE4]">
                  &ldquo;An ICON is more than a follower count.
                  <br />
                  <span className="text-[#E6C982]">It is a voice people remember.&rdquo;</span>
                </p>
              </blockquote>
            </div>

            {/* Right Cascading Typographic Ledger (7 cols) */}
            <div className="lg:col-span-7 divide-y divide-[#C6A15B]/25 border-y border-[#C6A15B]/25">
              {STATEMENT_ROWS.map((row, idx) => {
                const isRevealed = idx < revealedCount;
                return (
                  <div
                    key={row.word}
                    className={`py-8 sm:py-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 transition-all duration-700 ${
                      isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="font-serif italic text-lg text-[#C6A15B] tabular-nums">
                        {row.numeral}
                      </span>
                      <span
                        className={`font-serif text-5xl sm:text-6xl md:text-7xl tracking-[0.03em] leading-none ${
                          idx === 1 ? 'italic text-gold-metallic' : 'text-[#F4EFE4]'
                        }`}
                      >
                        {row.word}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-[#F4EFE4]/75 font-light sm:max-w-[260px] sm:text-right">
                      {row.descriptor}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
