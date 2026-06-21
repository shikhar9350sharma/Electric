import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import KineticProductGrid from '../components/KineticProductGrid';

gsap.registerPlugin(ScrollTrigger);

export default function Collection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        gridWrapperRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="relative py-32 lg:py-40"
      style={{ background: '#1c1c1c' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <p
            className="text-xs uppercase tracking-[3px] font-medium mb-4"
            style={{ color: '#f2ae72' }}
          >
            Full Collection
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-1px]"
            style={{ color: '#ececec' }}
          >
            Kinetic Gallery
          </h2>
          <p
            className="mt-6 text-lg font-light max-w-lg mx-auto leading-relaxed"
            style={{ color: 'rgba(236,236,236,0.5)' }}
          >
            Scroll through our curated range of architectural-grade luminaires
          </p>
        </div>

        {/* Product Grid */}
        <div ref={gridWrapperRef}>
          <KineticProductGrid />
        </div>

        {/* View All CTA */}
        <div className="mt-20 text-center">
          <button
            className="liquid-glass-pill inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm uppercase tracking-[1px] font-medium transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{
              color: '#ececec',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15), 0 8px 32px rgba(0,0,0,0.2)',
            }}
          >
            View Complete Catalog
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
