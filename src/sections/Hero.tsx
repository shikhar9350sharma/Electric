import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.7'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#1c1c1c' }}
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
        }}
      />
      
      {/* Radial vignette for text contrast */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(28,28,28,0.3) 0%, rgba(28,28,28,0.7) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p
          className="text-sm uppercase tracking-[3px] mb-6"
          style={{ color: '#f2ae72' }}
        >
          Premium Commercial Lighting
        </p>
        
        <h1
          ref={titleRef}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[120px] font-normal leading-[0.95] tracking-[-2px] mb-8"
          style={{ color: '#ececec' }}
        >
          Light{' '}
          <em className="font-light italic" style={{ color: '#f2ae72' }}>
            defines
          </em>
          <br />
          the space
        </h1>
        
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl font-light max-w-xl mx-auto mb-12 leading-relaxed"
          style={{ color: 'rgba(236,236,236,0.7)' }}
        >
          Premium commercial luminaires for architects and designers.
          Elevate every environment with precision lighting.
        </p>
        
        <button
          ref={ctaRef}
          onClick={scrollToCollection}
          className="liquid-glass-pill inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm uppercase tracking-[1px] font-medium transition-all duration-300 hover:scale-105 cursor-pointer"
          style={{
            color: '#ececec',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.2), 0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          Explore the Collection
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 3L8 13M8 13L13 8M8 13L3 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span
          className="text-xs uppercase tracking-[2px]"
          style={{ color: 'rgba(236,236,236,0.4)' }}
        >
          Scroll
        </span>
        <div
          className="w-[1px] h-8 animate-pulse"
          style={{ background: 'rgba(242,174,114,0.5)' }}
        />
      </div>
    </section>
  );
}
