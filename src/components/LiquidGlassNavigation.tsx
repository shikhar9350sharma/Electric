import { useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';

interface NavItem {
  label: string;
  image: string;
  description: string;
}

const navItems: NavItem[] = [
  { label: 'LED Bulbs', image: '/images/product-1.jpg', description: 'Energy-efficient retrofit solutions' },
  { label: 'Tube Lights', image: '/images/product-4.jpg', description: 'Linear fluorescent replacements' },
  { label: 'Surface Panels', image: '/images/product-5.jpg', description: 'Flush-mount ceiling systems' },
  { label: 'Downlights', image: '/images/product-1.jpg', description: 'Recessed architectural lighting' },
  { label: 'Pendants', image: '/images/product-2.jpg', description: 'Suspended cylinder luminaires' },
  { label: 'Track Lights', image: '/images/product-3.jpg', description: 'Adjustable spotlight systems' },
  { label: 'Flood Lights', image: '/images/product-6.jpg', description: 'High-power outdoor illumination' },
  { label: 'Strip Lights', image: '/images/product-7.jpg', description: 'Flexible accent lighting' },
  { label: 'Street Lights', image: '/images/product-8.jpg', description: 'Urban roadway luminaires' },
  { label: 'Accessories', image: '/images/product-3.jpg', description: 'Drivers, dimmers & controls' },
];

export default function LiquidGlassNavigation() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const imageTransforms = useRef<Map<number, HTMLDivElement>>(new Map());
  const rafId = useRef<number | undefined>(undefined);

  const handleMouseEnter = useCallback((index: number, el: HTMLDivElement) => {
    setActiveIndex(index);
    
    const rect = el.getBoundingClientRect();
    const wrapperRect = wrapperRef.current?.getBoundingClientRect();
    if (!wrapperRect || !pillRef.current) return;

    gsap.to(pillRef.current, {
      x: rect.left - wrapperRect.left,
      y: rect.top - wrapperRect.top,
      width: rect.width,
      height: rect.height,
      opacity: 1,
      scale: 1,
      duration: 0.35,
      ease: 'power2.out',
    });
  }, []);

  const handleMouseLeaveWrapper = useCallback(() => {
    setActiveIndex(null);
    if (pillRef.current) {
      gsap.to(pillRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, []);

  // Track mouse for 3D image tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const updateImages = () => {
      if (activeIndex !== null && wrapperRef.current) {
        const wrapperRect = wrapperRef.current.getBoundingClientRect();
        const centerX = wrapperRect.left + wrapperRect.width / 2;
        const centerY = wrapperRect.top + wrapperRect.height / 2;
        
        const deltaX = (mousePos.current.x - centerX) / wrapperRect.width;
        const deltaY = (mousePos.current.y - centerY) / wrapperRect.height;

        const imgEl = imageTransforms.current.get(activeIndex);
        if (imgEl) {
          gsap.to(imgEl, {
            x: (mousePos.current.x - wrapperRect.left) - 120,
            y: (mousePos.current.y - wrapperRect.top) - 80,
            rotateX: -deltaY * 12,
            rotateY: deltaX * 12,
            duration: 0.5,
            ease: 'power2.out',
          });
        }
      }
      rafId.current = requestAnimationFrame(updateImages);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId.current = requestAnimationFrame(updateImages);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [activeIndex]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full max-w-3xl mx-auto py-8"
      onMouseLeave={handleMouseLeaveWrapper}
    >
      {/* Liquid Glass Pill */}
      <div
        ref={pillRef}
        className="liquid-glass-pill absolute top-0 left-0 rounded-2xl pointer-events-none"
        style={{
          opacity: 0,
          transform: 'scale(0.9)',
          zIndex: 1,
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.2), 0 8px 32px rgba(0,0,0,0.1)',
        }}
      />

      {/* Nav Items */}
      <div className="relative z-[2] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {navItems.map((item, index) => (
          <div
            key={item.label}
            className="nav-item relative px-4 py-5 rounded-2xl cursor-pointer transition-colors duration-200 text-center group"
            onMouseEnter={(e) => handleMouseEnter(index, e.currentTarget)}
          >
            <span
              className="text-sm font-medium uppercase tracking-[1px] transition-colors duration-200"
              style={{
                color: activeIndex === index ? '#1c1c1c' : '#1c1c1c',
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Floating Images Container */}
      <div
        ref={imagesContainerRef}
        className="absolute inset-0 pointer-events-none"
        style={{ perspective: '1000px', zIndex: 3 }}
      >
        {navItems.map((item, index) => (
          <div
            key={`img-${item.label}`}
            ref={(el) => {
              if (el) imageTransforms.current.set(index, el);
            }}
            className="absolute top-0 left-0 transition-opacity duration-300"
            style={{
              opacity: activeIndex === index ? 1 : 0,
              transformStyle: 'preserve-3d',
              width: '240px',
              pointerEvents: 'none',
            }}
          >
            <div
              className="rounded-xl overflow-hidden shadow-2xl"
              style={{
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              }}
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-40 object-cover"
                draggable={false}
              />
              <div
                className="px-4 py-3"
                style={{ background: 'rgba(28,28,28,0.95)' }}
              >
                <p className="text-xs uppercase tracking-[1px] font-medium" style={{ color: '#f2ae72' }}>
                  {item.label}
                </p>
                <p className="text-xs mt-1" style={{ color: 'rgba(236,236,236,0.6)' }}>
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
