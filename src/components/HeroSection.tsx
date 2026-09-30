import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onOpenModal: () => void;
}

const HERO_3D_ASSET_URL =
  'https://static.wixstatic.com/media/14ff0a_7dbd38aa4cbf423bb1d27e200d9ef8fd~mv2.png';

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const primaryBtnRef = useRef<HTMLButtonElement | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [tilt3D, setTilt3D] = useState({ rx: 0, ry: 0, gx: 50, gy: 40 });
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const [imgError, setImgError] = useState(false);

  // Subtle floating golden dust particles on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const particleCount = Math.min(54, Math.floor(width / 28));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.16,
      vy: -Math.random() * 0.24 - 0.05,
      alpha: Math.random() * 0.45 + 0.12,
      phase: Math.random() * Math.PI * 2,
    }));

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -10) p.y = height + 10;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        const shimmer = prefersReducedMotion
          ? p.alpha
          : p.alpha * (0.65 + 0.35 * Math.sin(time * 0.0012 + p.phase));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 201, 130, ${shimmer.toFixed(3)})`;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: nx * 22, y: ny * 16 });
    setTilt3D({
      rx: -ny * 26,
      ry: nx * 32,
      gx: (nx + 0.5) * 100,
      gy: (ny + 0.5) * 100,
    });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
    setTilt3D({ rx: 0, ry: 0, gx: 50, gy: 40 });
  };

  const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!primaryBtnRef.current) return;
    const rect = primaryBtnRef.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    setBtnOffset({ x: dx * 0.14, y: dy * 0.22 });
  };

  const handleEnterWorld = () => {
    const el = document.getElementById('the-idea');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="top"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full flex flex-col justify-between items-center overflow-hidden bg-[#080706] pt-24 pb-10 px-6 md:px-12 select-none"
    >
      {/* Background Stage Image + Fallback */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-700 ease-out"
        style={{
          transform: `scale(1.05) translate3d(${-parallax.x * 0.5}px, ${-parallax.y * 0.5}px, 0)`,
        }}
      >
        {!imgError ? (
          <img
            src="/src/assets/images/hero_awards_stage_1790694035591.jpg"
            alt="Dark cinematic awards theatre stage with subtle golden light beams"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center opacity-45"
          />
        ) : (
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_#261E12_0%,_#080706_70%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080706]/80 via-[#080706]/35 to-[#080706]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_12%,#080706_85%)]" />
      </div>

      {/* Volumetric Golden Light Beams */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div
          className="animate-stage-beam-1 absolute -top-[25%] left-[22%] w-[26vw] min-w-[240px] h-[135%] origin-top"
          style={{
            background:
              'linear-gradient(180deg, rgba(241,221,167,0.2) 0%, rgba(198,161,91,0.06) 55%, rgba(8,7,6,0) 100%)',
            filter: 'blur(42px)',
          }}
        />
        <div
          className="animate-stage-beam-2 absolute -top-[25%] right-[22%] w-[24vw] min-w-[220px] h-[135%] origin-top"
          style={{
            background:
              'linear-gradient(180deg, rgba(230,201,130,0.18) 0%, rgba(198,161,91,0.05) 55%, rgba(8,7,6,0) 100%)',
            filter: 'blur(46px)',
          }}
        />
      </div>

      {/* Floating Golden Dust Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* Main Split / Centerpiece Hero Content */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto my-auto pt-6 pb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
        {/* Left / Center Editorial Identity (7 columns on desktop) */}
        <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start order-2 lg:order-1">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C6A15B]/70 lg:hidden" />
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.34em] text-[#E6C982]/90 font-sans">
              BHARAT DIGITAL CREATOR AWARDS
            </p>
            <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-[#C6A15B]/70 to-transparent" />
          </div>

          {/* Main Display Headline */}
          <h1
            className="font-serif text-5xl sm:text-7xl md:text-8xl xl:text-[6.2rem] leading-[0.96] tracking-[-0.01em] text-[#F4EFE4] font-normal mb-6"
            style={{ textWrap: 'balance' }}
          >
            <span>Digital </span>
            <span className="italic font-light text-gold-metallic px-1">ICON</span>
            <span> Awards</span>
          </h1>

          {/* Supporting Line */}
          <p
            className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#F4EFE4]/85 tracking-wide max-w-xl mb-10 font-light"
            style={{ textWrap: 'balance' }}
          >
            India&apos;s Digital Creator Culture, Reimagined.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4 sm:gap-5 w-full sm:w-auto">
            <button
              ref={primaryBtnRef}
              type="button"
              onClick={handleEnterWorld}
              onMouseMove={handleMagneticMove}
              onMouseLeave={() => setBtnOffset({ x: 0, y: 0 })}
              style={{
                transform: `translate3d(${btnOffset.x}px, ${btnOffset.y}px, 0)`,
              }}
              className="w-full sm:w-auto min-w-[220px] px-8 py-4 text-xs tracking-[0.26em] uppercase font-medium text-[#080706] bg-gradient-to-r from-[#C6A15B] via-[#F1DDA7] to-[#C6A15B] hover:brightness-110 transition-all duration-200 shadow-[0_0_35px_rgba(198,161,91,0.28)] whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F1DDA7]"
            >
              ENTER THE WORLD
            </button>

            <button
              type="button"
              onClick={onOpenModal}
              className="w-full sm:w-auto min-w-[220px] px-8 py-4 text-xs tracking-[0.26em] uppercase font-medium text-[#F4EFE4]/90 border border-[#C6A15B]/40 bg-[#15110B]/60 hover:border-[#E6C982] hover:text-[#F1DDA7] hover:bg-[#15110B] transition-all duration-200 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]"
            >
              COMING SOON
            </button>
          </div>
        </div>

        {/* Right / Centerpiece Large 3D Animated Hero Visual (5 columns on desktop) */}
        <div
          className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2 relative"
          style={{ perspective: '1400px' }}
        >
          {/* Ambient Golden Backlight Aura */}
          <div
            aria-hidden="true"
            className="
              absolute w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] md:w-[520px] md:h-[520px]
              rounded-full pointer-events-none animate-pulse-aura
            "
            style={{
              background:
                'radial-gradient(circle, rgba(230,201,130,0.28) 0%, rgba(198,161,91,0.10) 42%, rgba(8,7,6,0) 72%)',
              filter: 'blur(16px)',
            }}
          />

          {/* 3D Spinning Stage Pedestal Rings */}
          <div
            aria-hidden="true"
            className="absolute bottom-2 sm:bottom-4 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] rounded-full border border-[#C6A15B]/35 animate-hero-ring pointer-events-none"
            style={{
              boxShadow: '0 0 50px rgba(198, 161, 91, 0.22), inset 0 0 35px rgba(230, 201, 130, 0.14)',
            }}
          >
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#F1DDA7] shadow-[0_0_14px_#F1DDA7]" />
          </div>

          {/* Interactive 3D Tilt Wrapper + Continuous 3D Orbital Animation */}
          <div
            className="relative z-10 transition-transform duration-300 ease-out"
            style={{
              transform: `perspective(1400px) rotateX(${tilt3D.rx}deg) rotateY(${tilt3D.ry}deg) translate3d(${parallax.x * 0.7}px, ${parallax.y * 0.7}px, 30px)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="animate-hero-3d relative flex items-center justify-center">
              {/* Deep 3D Shadow Layer Behind Object */}
              <img
                src={HERO_3D_ASSET_URL}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className="absolute w-[300px] sm:w-[420px] md:w-[480px] lg:w-[540px] xl:w-[580px] max-h-[64vh] object-contain opacity-30 blur-xl pointer-events-none"
                style={{
                  transform: 'translateZ(-45px) translateY(18px) scale(0.96)',
                  filter: 'brightness(0.2) sepia(1) hue-rotate(5deg) blur(18px)',
                }}
              />

              {/* Primary Large 3D Hero Asset */}
              <img
                src={HERO_3D_ASSET_URL}
                alt="Digital ICON Awards 3D Emblem"
                referrerPolicy="no-referrer"
                className="relative w-[300px] sm:w-[420px] md:w-[480px] lg:w-[540px] xl:w-[580px] max-h-[64vh] object-contain drop-shadow-[0_28px_55px_rgba(0,0,0,0.9)]"
                style={{
                  transform: 'translateZ(35px)',
                  filter: 'drop-shadow(0 0 32px rgba(230, 201, 130, 0.24))',
                }}
              />

              {/* Dynamic 3D Specular Gold Glint Layer */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none rounded-full"
                style={{
                  transform: 'translateZ(55px)',
                  background: `radial-gradient(circle 180px at ${tilt3D.gx}% ${tilt3D.gy}%, rgba(241, 221, 167, 0.24), transparent 70%)`,
                  mixBlendMode: 'screen',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stage Scroll Cue */}
      <div className="relative z-20 flex flex-col items-center gap-2 pt-2">
        <button
          type="button"
          onClick={handleEnterWorld}
          aria-label="Scroll to The Idea section"
          className="group flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#8E8575] hover:text-[#E6C982] transition-colors cursor-pointer"
        >
          <span>THE PRELUDE</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#C6A15B] group-hover:translate-y-1 transition-transform duration-200" />
        </button>
      </div>
    </section>
  );
};
