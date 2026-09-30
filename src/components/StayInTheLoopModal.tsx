import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { FooterDocType } from './MysteryAndFooter';

export type RoleOption = 'Creator' | 'Brand' | 'Media' | 'Other';

interface StayInTheLoopModalProps {
  isOpen: boolean;
  defaultRole?: RoleOption;
  onClose: () => void;
}

interface SubmissionRecord {
  name: string;
  email: string;
  mobile: string;
  role: RoleOption;
  referenceCode: string;
}

const ROLE_OPTIONS: RoleOption[] = ['Creator', 'Brand', 'Media', 'Other'];

export const StayInTheLoopModal: React.FC<StayInTheLoopModalProps> = ({
  isOpen,
  defaultRole = 'Creator',
  onClose,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [role, setRole] = useState<RoleOption>(defaultRole);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<SubmissionRecord | null>(null);

  useEffect(() => {
    if (defaultRole) {
      setRole(defaultRole);
    }
  }, [defaultRole]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMobile = mobile.trim();

    if (!trimmedName || trimmedName.length < 2) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const digitsOnly = trimmedMobile.replace(/[^\d]/g, '');
    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    const refCode = `DIA-${Math.floor(100000 + Math.random() * 900000)}`;
    const record: SubmissionRecord = {
      name: trimmedName,
      email: trimmedEmail,
      mobile: trimmedMobile,
      role,
      referenceCode: refCode,
    };

    try {
      const existing = JSON.parse(localStorage.getItem('dia_loop_registry') || '[]');
      localStorage.setItem('dia_loop_registry', JSON.stringify([...existing, record]));
    } catch {
      // Ignore storage quota issues
    }

    setSubmittedRecord(record);
  };

  const handleResetAndClose = () => {
    setErrorMessage(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#080706]/85 backdrop-blur-md"
      onClick={handleResetAndClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#15110B] border border-[#C6A15B]/45 p-7 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden"
      >
        {/* Top Gold Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E6C982] to-transparent" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-[#8E8575] hover:text-[#F4EFE4] border border-transparent hover:border-[#C6A15B]/30 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedRecord ? (
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#C6A15B] mb-3">
              DIGITAL ICON AWARDS · PRIVATE DISPATCH
            </p>
            <h3
              id="modal-headline"
              className="font-serif text-3xl sm:text-4xl text-[#F4EFE4] font-normal mb-2"
            >
              Stay in the <span className="italic text-gold-metallic">Loop.</span>
            </h3>
            <p className="text-sm text-[#8E8575] font-light mb-7">
              Be the first to know as the next chapter in India&apos;s digital culture unfolds.
            </p>

            {errorMessage && (
              <div
                role="alert"
                className="mb-6 p-3.5 border border-[#E6C982]/60 bg-[#080706] flex items-center gap-3 text-xs text-[#F1DDA7]"
              >
                <AlertCircle className="w-4 h-4 text-[#E6C982] shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={validateAndSubmit} className="space-y-5" noValidate>
              {/* Name */}
              <div>
                <label
                  htmlFor="dia-name"
                  className="block text-[11px] uppercase tracking-[0.22em] text-[#8E8575] mb-2"
                >
                  Name
                </label>
                <input
                  id="dia-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 text-sm bg-[#080706] border border-[#C6A15B]/30 text-[#F4EFE4] placeholder:text-[#8E8575]/50 focus:outline-none focus:border-[#E6C982] transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="dia-email"
                  className="block text-[11px] uppercase tracking-[0.22em] text-[#8E8575] mb-2"
                >
                  Email
                </label>
                <input
                  id="dia-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-4 py-3 text-sm bg-[#080706] border border-[#C6A15B]/30 text-[#F4EFE4] placeholder:text-[#8E8575]/50 focus:outline-none focus:border-[#E6C982] transition-colors"
                />
              </div>

              {/* Mobile */}
              <div>
                <label
                  htmlFor="dia-mobile"
                  className="block text-[11px] uppercase tracking-[0.22em] text-[#8E8575] mb-2"
                >
                  Mobile
                </label>
                <input
                  id="dia-mobile"
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 text-sm bg-[#080706] border border-[#C6A15B]/30 text-[#F4EFE4] placeholder:text-[#8E8575]/50 focus:outline-none focus:border-[#E6C982] transition-colors"
                />
              </div>

              {/* Role Selector: Creator / Brand / Media / Other */}
              <div>
                <span className="block text-[11px] uppercase tracking-[0.22em] text-[#8E8575] mb-2">
                  I am a
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {ROLE_OPTIONS.map((item) => {
                    const isSelected = role === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setRole(item)}
                        className={`py-2.5 px-3 text-xs tracking-[0.18em] uppercase border transition-all duration-200 whitespace-nowrap cursor-pointer ${
                          isSelected
                            ? 'bg-[#C6A15B] text-[#080706] border-[#E6C982] font-medium'
                            : 'bg-[#080706] text-[#F4EFE4]/80 border-[#C6A15B]/25 hover:border-[#C6A15B]/60'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA: KEEP ME CLOSE */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 text-xs tracking-[0.28em] uppercase font-medium text-[#080706] bg-gradient-to-r from-[#C6A15B] via-[#F1DDA7] to-[#C6A15B] hover:brightness-110 transition-all duration-200 shadow-[0_0_30px_rgba(198,161,91,0.28)] whitespace-nowrap cursor-pointer"
                >
                  KEEP ME CLOSE
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-4 text-center">
            <div className="w-12 h-12 mx-auto mb-5 flex items-center justify-center border border-[#C6A15B]/50 bg-[#080706] text-[#E6C982]">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <p className="text-[11px] uppercase tracking-[0.3em] text-[#C6A15B] mb-2">
              DISPATCH CONFIRMED · {submittedRecord.referenceCode}
            </p>

            <h3 className="font-serif text-3xl sm:text-4xl text-[#F4EFE4] mb-4">
              You are on the <span className="italic text-gold-metallic">Inner List.</span>
            </h3>

            <p className="text-sm text-[#F4EFE4]/80 font-light leading-relaxed mb-8 max-w-md mx-auto">
              Thank you, <span className="text-[#E6C982]">{submittedRecord.name}</span>. Your
              interest as <span className="text-[#E6C982]">{submittedRecord.role}</span> has been
              recorded. You will receive private updates at{' '}
              <span className="text-[#F4EFE4]">{submittedRecord.email}</span> as the reveal
              approaches.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-8 py-3.5 text-xs tracking-[0.24em] uppercase font-medium text-[#080706] bg-[#C6A15B] hover:bg-[#E6C982] transition-colors cursor-pointer"
              >
                RETURN TO EXPERIENCE
              </button>
              <button
                type="button"
                onClick={() => {
                  setSubmittedRecord(null);
                  setName('');
                  setEmail('');
                  setMobile('');
                }}
                className="px-6 py-3.5 text-xs tracking-[0.22em] uppercase text-[#8E8575] hover:text-[#F4EFE4] border border-[#C6A15B]/25 transition-colors cursor-pointer"
              >
                ADD ANOTHER CONTACT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface FooterDocModalProps {
  docType: FooterDocType;
  onClose: () => void;
  onOpenStayInLoop: () => void;
}

export const FooterDocModal: React.FC<FooterDocModalProps> = ({
  docType,
  onClose,
  onOpenStayInLoop,
}) => {
  if (!docType) return null;

  const contentMap: Record<
    Exclude<FooterDocType, null>,
    { eyebrow: string; title: string; paragraphs: string[] }
  > = {
    about: {
      eyebrow: 'ABOUT THE PROPERTY',
      title: 'Digital ICON Awards',
      paragraphs: [
        'Digital ICON Awards is a flagship cultural institution dedicated to celebrating the voices shaping India’s digital creator era.',
        'Positioned at the intersection of creators, culture, brands, and community, the platform honors originality, influence, and enduring cultural impact.',
      ],
    },
    contact: {
      eyebrow: 'INQUIRIES & DISPATCHES',
      title: 'Connect With Us',
      paragraphs: [
        'Digital ICON Awards is currently in its pre-reveal chapter.',
        'Creators, brand leaders, and media voices are invited to register via our private loop to receive official communications when the next chapter is unveiled.',
      ],
    },
    privacy: {
      eyebrow: 'PRIVACY STATEMENT',
      title: 'Stewardship of Information',
      paragraphs: [
        'We collect only the essential contact details you voluntarily provide—Name, Email, Mobile, and Role—solely to share official Digital ICON Awards updates.',
        'Your information is never sold or shared with unauthorized third parties.',
      ],
    },
    terms: {
      eyebrow: 'TERMS OF ACCESS',
      title: 'Brand & Intellectual Property',
      paragraphs: [
        'All visual marks, editorial copy, iconography, and design systems presented on Digital ICON Awards are protected intellectual property.',
        'This pre-reveal digital experience is intended as an editorial preview of the Digital ICON Awards universe.',
      ],
    },
  };

  const doc = contentMap[docType];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#080706]/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#15110B] border border-[#C6A15B]/45 p-7 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.95)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close document"
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-[#8E8575] hover:text-[#F4EFE4] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <p className="text-[11px] uppercase tracking-[0.3em] text-[#C6A15B] mb-3">{doc.eyebrow}</p>
        <h3 className="font-serif text-3xl sm:text-4xl text-[#F4EFE4] mb-6">{doc.title}</h3>

        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#F4EFE4]/80 font-light mb-8">
          {doc.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[#C6A15B]/20">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenStayInLoop();
            }}
            className="px-6 py-3 text-xs tracking-[0.24em] uppercase font-medium text-[#080706] bg-[#C6A15B] hover:bg-[#E6C982] transition-colors cursor-pointer"
          >
            STAY IN THE LOOP
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-xs tracking-[0.22em] uppercase text-[#8E8575] hover:text-[#F4EFE4] cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
