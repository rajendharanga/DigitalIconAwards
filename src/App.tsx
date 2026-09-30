/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EditorialSections } from './components/EditorialSections';
import { CreatorEraSection } from './components/CreatorEraSection';
import { EcosystemAndUniverse } from './components/EcosystemAndUniverse';
import { MysteryAndFooter, FooterDocType } from './components/MysteryAndFooter';
import { StayInTheLoopModal, FooterDocModal, RoleOption } from './components/StayInTheLoopModal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultRole, setDefaultRole] = useState<RoleOption>('Creator');
  const [footerDoc, setFooterDoc] = useState<FooterDocType>(null);
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Global viewport fade-in entry observer for all sections and footer
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('main section, footer');

    elements.forEach((el) => {
      el.classList.add('cinematic-section');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in-view');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleOpenModal = (role: RoleOption = 'Creator') => {
    setDefaultRole(role);
    setModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#080706] text-[#F4EFE4] selection:bg-[#C6A15B]/30 selection:text-[#F1DDA7]">
      {/* Subtle Desktop Ambient Cursor Glow */}
      <div
        aria-hidden="true"
        className="hidden lg:block fixed top-0 left-0 w-[380px] h-[380px] rounded-full pointer-events-none z-30 transition-transform duration-150 ease-out"
        style={{
          transform: `translate3d(${cursorPos.x - 190}px, ${cursorPos.y - 190}px, 0)`,
          background:
            'radial-gradient(circle, rgba(230, 201, 130, 0.055) 0%, rgba(198, 161, 91, 0.015) 45%, transparent 70%)',
        }}
      />

      {/* Sticky Luxury Navigation */}
      <Navbar onOpenModal={handleOpenModal} />

      {/* Main Storytelling Experience */}
      <main>
        {/* Hero Section */}
        <HeroSection onOpenModal={() => handleOpenModal('Creator')} />

        {/* The Idea & The New Icon */}
        <EditorialSections />

        {/* The Creator Era */}
        <CreatorEraSection />

        {/* Creator x Culture & The Digital Icon Universe */}
        <EcosystemAndUniverse />

        {/* The Mystery, Social Presence & Footer */}
        <MysteryAndFooter
          onOpenModal={handleOpenModal}
          onOpenFooterDoc={(doc) => setFooterDoc(doc)}
        />
      </main>

      {/* Stay in the Loop Lead Capture Modal */}
      <StayInTheLoopModal
        isOpen={modalOpen}
        defaultRole={defaultRole}
        onClose={() => setModalOpen(false)}
      />

      {/* Footer Editorial Info Modal */}
      <FooterDocModal
        docType={footerDoc}
        onClose={() => setFooterDoc(null)}
        onOpenStayInLoop={() => handleOpenModal('Creator')}
      />
    </div>
  );
}
