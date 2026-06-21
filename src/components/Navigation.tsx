import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Categories', href: '#featured' },
  { label: 'Collection', href: '#collection' },
  { label: 'Dealers', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(236,236,236,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px) saturate(150%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(150%)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
              className="flex items-center gap-2"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="14"
                  cy="14"
                  r="12"
                  stroke={scrolled ? '#1c1c1c' : '#ececec'}
                  strokeWidth="1.5"
                />
                <circle
                  cx="14"
                  cy="14"
                  r="6"
                  fill={scrolled ? '#f2ae72' : '#f2ae72'}
                  opacity="0.9"
                />
                <circle
                  cx="14"
                  cy="14"
                  r="2"
                  fill={scrolled ? '#1c1c1c' : '#ececec'}
                />
              </svg>
              <span
                className="text-lg font-medium tracking-[-0.5px]"
                style={{ color: scrolled ? '#1c1c1c' : '#ececec' }}
              >
                ElectricEye
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className="text-xs uppercase tracking-[1px] font-medium transition-colors duration-200"
                  style={{
                    color: scrolled ? '#1c1c1c' : 'rgba(236,236,236,0.7)',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = '#f2ae72';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = scrolled ? '#1c1c1c' : 'rgba(236,236,236,0.7)';
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
                className="text-xs uppercase tracking-[1px] font-medium px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  background: scrolled ? '#1c1c1c' : 'rgba(236,236,236,0.1)',
                  color: '#ececec',
                  border: scrolled ? 'none' : '1px solid rgba(236,236,236,0.2)',
                }}
              >
                Get a Quote
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span
                  className="block h-px w-full transition-all duration-300"
                  style={{
                    background: scrolled ? '#1c1c1c' : '#ececec',
                    transform: mobileOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none',
                  }}
                />
                <span
                  className="block h-px w-full transition-all duration-300"
                  style={{
                    background: scrolled ? '#1c1c1c' : '#ececec',
                    opacity: mobileOpen ? 0 : 1,
                  }}
                />
                <span
                  className="block h-px w-full transition-all duration-300"
                  style={{
                    background: scrolled ? '#1c1c1c' : '#ececec',
                    transform: mobileOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-500"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          background: 'rgba(236,236,236,0.97)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
              className="text-2xl font-medium tracking-[-0.5px]"
              style={{ color: '#1c1c1c' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
            className="mt-4 px-8 py-3 rounded-full text-sm uppercase tracking-[1px] font-medium"
            style={{ background: '#1c1c1c', color: '#ececec' }}
          >
            Get a Quote
          </a>
        </div>
      </div>
    </>
  );
}
