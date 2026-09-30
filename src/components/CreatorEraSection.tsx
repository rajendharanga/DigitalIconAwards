import React from 'react';

interface EraChapter {
  number: string;
  title: string;
  kicker: string;
  copy: string;
  spanClass: string;
  surfaceClass: string;
}

const ERA_CHAPTERS: EraChapter[] = [
  {
    number: '01',
    title: 'VOICE',
    kicker: 'Authentic Perspective',
    copy: 'Across languages, regions, and dialects, individual voices now command the cultural resonance once reserved for legacy studios.',
    spanClass: 'lg:col-span-7',
    surfaceClass: 'bg-[#FBF8F1] text-[#15110B] border-[#15110B]/15',
  },
  {
    number: '02',
    title: 'CULTURE',
    kicker: 'The Pulse of Bharat',
    copy: 'What India watches, debates, and celebrates is written in real time by digital storytellers.',
    spanClass: 'lg:col-span-5',
    surfaceClass: 'bg-[#1F1810] text-[#F4EFE4] border-[#C6A15B]/30',
  },
  {
    number: '03',
    title: 'COMMUNITY',
    kicker: 'Shared Belonging',
    copy: 'Audiences have evolved into living movements bound by curiosity, identity, and conviction.',
    spanClass: 'lg:col-span-5',
    surfaceClass: 'bg-[#E2D6C1] text-[#15110B] border-[#15110B]/15',
  },
  {
    number: '04',
    title: 'CREATIVITY',
    kicker: 'A New Visual Craft',
    copy: 'Every screen has become a cinema hall, an editorial canvas, and a stage for fearless original expression.',
    spanClass: 'lg:col-span-7',
    surfaceClass: 'bg-[#FBF8F1] text-[#15110B] border-[#15110B]/15',
  },
];

export const CreatorEraSection: React.FC = () => {
  return (
    <section
      id="the-culture"
      className="relative py-28 md:py-40 px-6 md:px-12 bg-[#ECE3D2] text-[#15110B] border-t border-[#15110B]/15 overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto">
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="text-xs uppercase tracking-[0.32em] text-[#8A682D] font-semibold">
                THE CREATOR ERA
              </span>
              <span className="h-[1px] w-14 bg-[#8A682D]/50" />
            </div>
            <h2
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] leading-[1.05] text-[#15110B] font-normal"
              style={{ textWrap: 'balance' }}
            >
              India is entering its{' '}
              <span className="italic text-[#8A682D]">Creator Era.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#4A4237] max-w-md font-light leading-relaxed">
            A cultural movement defined by independent voices, regional depth, and creative
            fearlessness.
          </p>
        </div>

        {/* Asymmetric Bento Editorial Mosaic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {ERA_CHAPTERS.map((chapter) => {
            const isDarkCard = chapter.number === '02';
            return (
              <article
                key={chapter.title}
                className={`${chapter.spanClass} ${chapter.surfaceClass} border p-8 sm:p-11 flex flex-col justify-between min-h-[270px] transition-transform duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between mb-10">
                  <span
                    className={`font-serif italic text-2xl tabular-nums ${
                      isDarkCard ? 'text-[#E6C982]' : 'text-[#8A682D]'
                    }`}
                  >
                    {chapter.number}
                  </span>
                  <span
                    className={`text-[11px] uppercase tracking-[0.24em] ${
                      isDarkCard ? 'text-[#C6A15B]' : 'text-[#6E6353]'
                    }`}
                  >
                    {chapter.kicker}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-[0.04em] mb-4">
                    {chapter.title}
                  </h3>
                  <p
                    className={`text-base leading-relaxed font-light max-w-xl ${
                      isDarkCard ? 'text-[#F4EFE4]/80' : 'text-[#2C251D]/85'
                    }`}
                  >
                    {chapter.copy}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
