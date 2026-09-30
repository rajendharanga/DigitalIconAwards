import React, { useState } from 'react';

interface NexusNode {
  id: string;
  quadrant: string;
  label: string;
  statement: string;
}

const NEXUS_NODES: NexusNode[] = [
  {
    id: 'creators',
    quadrant: 'NORTH WEST · I',
    label: 'CREATORS',
    statement:
      'Independent storytellers, thinkers, and artists whose original perspectives command the imagination of millions across Bharat.',
  },
  {
    id: 'culture',
    quadrant: 'NORTH EAST · II',
    label: 'CULTURE',
    statement:
      'The living tapestry of language, cinema, music, humor, and aspiration that defines contemporary Indian identity.',
  },
  {
    id: 'brands',
    quadrant: 'SOUTH WEST · III',
    label: 'BRANDS',
    statement:
      'Forward-looking institutions that move beyond interruption to co-author meaningful cultural moments.',
  },
  {
    id: 'community',
    quadrant: 'SOUTH EAST · IV',
    label: 'COMMUNITY',
    statement:
      'Passionate ecosystems of audiences and believers who transform individual expressions into national movements.',
  },
];

export const EcosystemAndUniverse: React.FC = () => {
  const [selectedNexus, setSelectedNexus] = useState<number>(0);

  return (
    <section
      id="creator-culture-nexus"
      className="relative py-28 md:py-40 px-6 md:px-12 bg-[#16110B] text-[#F4EFE4] border-t border-[#C6A15B]/25 overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#C6A15B]/50" />
            <span className="text-xs uppercase tracking-[0.32em] text-[#C6A15B]">
              CREATOR × CULTURE
            </span>
            <span className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#C6A15B]/50" />
          </div>
          <h2
            className="font-serif text-3xl sm:text-5xl md:text-6xl leading-[1.08] text-[#F4EFE4] font-normal"
            style={{ textWrap: 'balance' }}
          >
            Where four forces <span className="italic text-gold-metallic">converge.</span>
          </h2>
        </div>

        {/* 4-Quadrant Architectural Crossroads Layout */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 border border-[#C6A15B]/30 bg-[#0E0B07]">
          {/* Central Intersection Medallion (Desktop) */}
          <div
            aria-hidden="true"
            className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-[#16110B] border border-[#E6C982]/60 items-center justify-center shadow-[0_0_30px_rgba(198,161,91,0.35)]"
          >
            <span className="font-serif italic text-2xl text-[#E6C982]">×</span>
          </div>

          {NEXUS_NODES.map((node, idx) => {
            const isSelected = selectedNexus === idx;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedNexus(idx)}
                onMouseEnter={() => setSelectedNexus(idx)}
                className={`text-left p-8 sm:p-12 lg:p-14 border-[#C6A15B]/20 transition-all duration-300 cursor-pointer focus-visible:outline-none ${
                  idx % 2 === 0 ? 'md:border-r' : ''
                } ${idx < 2 ? 'border-b' : 'border-b md:border-b-0'} ${
                  isSelected
                    ? 'bg-[#231B11] text-[#F4EFE4]'
                    : 'bg-transparent text-[#F4EFE4]/70 hover:bg-[#1A140D]'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.26em] text-[#C6A15B] mb-6">
                  <span>{node.quadrant}</span>
                  <span>{isSelected ? 'ACTIVE FORCE' : 'INTERSECT'}</span>
                </div>

                <h3
                  className={`font-serif text-3xl sm:text-5xl tracking-[0.05em] mb-4 transition-colors ${
                    isSelected ? 'text-gold-metallic' : 'text-[#F4EFE4]'
                  }`}
                >
                  {node.label}
                </h3>

                <p className="text-sm sm:text-base leading-relaxed text-[#F4EFE4]/80 font-light max-w-md">
                  {node.statement}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
