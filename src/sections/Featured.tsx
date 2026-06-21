import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LiquidGlassNavigation from '../components/LiquidGlassNavigation';

gsap.registerPlugin(ScrollTrigger);

export default function Featured() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Nav animation
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
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
      id="featured"
      className="relative py-32 lg:py-40"
      style={{ background: '#ececec' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p
            className="text-xs uppercase tracking-[3px] font-medium mb-4"
            style={{ color: '#f2ae72' }}
          >
            Browse Categories
          </p>
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-1px]"
            style={{ color: '#1c1c1c' }}
          >
            The Liquid Index
          </h2>
          <p
            className="mt-6 text-lg font-light max-w-lg mx-auto leading-relaxed"
            style={{ color: 'rgba(28,28,28,0.6)' }}
          >
            Hover to explore our complete range of premium commercial lighting solutions
          </p>
        </div>

        {/* Liquid Glass Navigation */}
        <div ref={navRef}>
          <LiquidGlassNavigation />
        </div>

        {/* Category Grid - fallback visual */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[
            { name: 'LED Bulbs', count: '48 Products' },
            { name: 'Tube Lights', count: '36 Products' },
            { name: 'Surface Panels', count: '24 Products' },
            { name: 'Downlights', count: '62 Products' },
            { name: 'Pendants', count: '18 Products' },
          ].map((cat) => (
            <div
              key={cat.name}
              className="group p-5 rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              style={{
                background: 'rgba(28,28,28,0.03)',
                border: '1px solid rgba(28,28,28,0.06)',
              }}
            >
              <h3
                className="text-sm font-medium mb-1"
                style={{ color: '#1c1c1c' }}
              >
                {cat.name}
              </h3>
              <p
                className="text-xs"
                style={{ color: 'rgba(28,28,28,0.4)' }}
              >
                {cat.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
