import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const dealerLocations = [
  {
    city: 'Mumbai',
    address: 'Light Tower, 45 Marine Lines, Mumbai 400002',
    phone: '+91 22 2287 4500',
    email: 'mumbai@electriceye.in',
    specialty: 'Commercial & Retail Lighting',
  },
  {
    city: 'Delhi',
    address: '12 Connaught Place, New Delhi 110001',
    phone: '+91 11 2345 6789',
    email: 'delhi@electriceye.in',
    specialty: 'Industrial & Warehouse Lighting',
  },
  {
    city: 'Bangalore',
    address: '88 MG Road, Bangalore 560001',
    phone: '+91 80 4567 8900',
    email: 'bangalore@electriceye.in',
    specialty: 'Smart & Architectural Lighting',
  },
  {
    city: 'Hyderabad',
    address: '22 Hitech City Road, Hyderabad 500081',
    phone: '+91 40 2345 6700',
    email: 'hyderabad@electriceye.in',
    specialty: 'Outdoor & Street Lighting',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const dealersRef = useRef<HTMLDivElement>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

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
        formRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        dealersRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.3,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDialogMessage('Thank you for your inquiry! Our team will connect you with the nearest dealer within 24 hours.');
    setShowDialog(true);
    if (formRef.current) formRef.current.reset();
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 lg:py-40"
      style={{ background: '#ececec' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <p
            className="text-xs uppercase tracking-[3px] font-medium mb-4"
            style={{ color: '#f2ae72' }}
          >
            Connect With Us
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-1px]"
            style={{ color: '#1c1c1c' }}
          >
            Find Your Dealer
          </h2>
          <p
            className="mt-6 text-lg font-light max-w-lg mx-auto leading-relaxed"
            style={{ color: 'rgba(28,28,28,0.6)' }}
          >
            Connect with an authorized ElectricEye dealer near you for quotes, bulk orders, and project consultation
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Inquiry Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl"
            style={{ background: '#f3f3f3', border: '1px solid rgba(28,28,28,0.06)' }}
          >
            <h3
              className="text-2xl font-medium mb-6"
              style={{ color: '#1c1c1c' }}
            >
              Send an Inquiry
            </h3>

            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-xs uppercase tracking-[1px] font-medium mb-2"
                    style={{ color: 'rgba(28,28,28,0.6)' }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#f2ae72] focus:border-transparent"
                    style={{
                      background: '#ececec',
                      border: '1px solid rgba(28,28,28,0.08)',
                      color: '#1c1c1c',
                    }}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    className="block text-xs uppercase tracking-[1px] font-medium mb-2"
                    style={{ color: 'rgba(28,28,28,0.6)' }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#f2ae72] focus:border-transparent"
                    style={{
                      background: '#ececec',
                      border: '1px solid rgba(28,28,28,0.08)',
                      color: '#1c1c1c',
                    }}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-xs uppercase tracking-[1px] font-medium mb-2"
                  style={{ color: 'rgba(28,28,28,0.6)' }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#f2ae72] focus:border-transparent"
                  style={{
                    background: '#ececec',
                    border: '1px solid rgba(28,28,28,0.08)',
                    color: '#1c1c1c',
                  }}
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label
                  className="block text-xs uppercase tracking-[1px] font-medium mb-2"
                  style={{ color: 'rgba(28,28,28,0.6)' }}
                >
                  Product Interest
                </label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#f2ae72] focus:border-transparent appearance-none cursor-pointer"
                  style={{
                    background: '#ececec',
                    border: '1px solid rgba(28,28,28,0.08)',
                    color: '#1c1c1c',
                  }}
                >
                  <option value="">Select a category</option>
                  <option value="led-bulbs">LED Bulbs</option>
                  <option value="tube-lights">Tube Lights</option>
                  <option value="surface-panels">Surface Panels</option>
                  <option value="downlights">Downlights</option>
                  <option value="pendants">Pendants</option>
                  <option value="track-lights">Track Lights</option>
                  <option value="flood-lights">Flood Lights</option>
                  <option value="strip-lights">Strip Lights</option>
                  <option value="street-lights">Street Lights</option>
                  <option value="bulk-order">Bulk / Project Order</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-xs uppercase tracking-[1px] font-medium mb-2"
                  style={{ color: 'rgba(28,28,28,0.6)' }}
                >
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#f2ae72] focus:border-transparent resize-none"
                  style={{
                    background: '#ececec',
                    border: '1px solid rgba(28,28,28,0.08)',
                    color: '#1c1c1c',
                  }}
                  placeholder="Tell us about your project requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-lg text-sm uppercase tracking-[1px] font-medium transition-all duration-300 hover:opacity-90 cursor-pointer"
                style={{
                  background: '#1c1c1c',
                  color: '#ececec',
                }}
              >
                Connect with Dealer
              </button>
            </div>
          </form>

          {/* Dealer Locations */}
          <div ref={dealersRef} className="space-y-4">
            <h3
              className="text-2xl font-medium mb-6"
              style={{ color: '#1c1c1c' }}
            >
              Authorized Dealers
            </h3>

            {dealerLocations.map((dealer) => (
              <div
                key={dealer.city}
                className="group p-6 rounded-2xl transition-all duration-300 hover:scale-[1.01] cursor-pointer"
                style={{
                  background: '#f3f3f3',
                  border: '1px solid rgba(28,28,28,0.06)',
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4
                        className="text-lg font-medium"
                        style={{ color: '#1c1c1c' }}
                      >
                        {dealer.city}
                      </h4>
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-[1px] font-medium"
                        style={{
                          background: 'rgba(242,174,114,0.15)',
                          color: '#f2ae72',
                        }}
                      >
                        {dealer.specialty}
                      </span>
                    </div>
                    <p
                      className="text-sm font-light mb-1"
                      style={{ color: 'rgba(28,28,28,0.6)' }}
                    >
                      {dealer.address}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <a
                        href={`tel:${dealer.phone}`}
                        className="text-sm flex items-center gap-1.5 transition-colors duration-200 hover:opacity-70"
                        style={{ color: '#1c1c1c' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                        </svg>
                        {dealer.phone}
                      </a>
                      <a
                        href={`mailto:${dealer.email}`}
                        className="text-sm flex items-center gap-1.5 transition-colors duration-200 hover:opacity-70"
                        style={{ color: '#1c1c1c' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                          <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        {dealer.email}
                      </a>
                    </div>
                  </div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="transition-all duration-300 group-hover:translate-x-1 flex-shrink-0 mt-1"
                    style={{ color: '#f2ae72' }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            ))}

            {/* Trade Account */}
            <div
              className="mt-8 p-6 rounded-2xl"
              style={{
                background: '#1c1c1c',
              }}
            >
              <h4
                className="text-lg font-medium mb-2"
                style={{ color: '#ececec' }}
              >
                Trade Account
              </h4>
              <p
                className="text-sm font-light mb-4"
                style={{ color: 'rgba(236,236,236,0.6)' }}
              >
                Architects, designers, and contractors can apply for exclusive trade pricing and priority support.
              </p>
              <button
                className="text-sm uppercase tracking-[1px] font-medium flex items-center gap-2 transition-all duration-300 hover:gap-3 cursor-pointer"
                style={{ color: '#f2ae72' }}
                onClick={() => {
                  setDialogMessage('Trade account applications are reviewed within 48 hours. Our team will contact you with next steps.');
                  setShowDialog(true);
                }}
              >
                Apply for Trade Account
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent
          className="sm:max-w-md"
          style={{ background: '#f3f3f3', border: '1px solid rgba(28,28,28,0.1)' }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: '#1c1c1c' }}>
              Inquiry Received
            </DialogTitle>
            <DialogDescription style={{ color: 'rgba(28,28,28,0.6)' }}>
              {dialogMessage}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setShowDialog(false)}
              className="px-6 py-2 rounded-lg text-sm uppercase tracking-[1px] font-medium transition-all duration-300 hover:opacity-90 cursor-pointer"
              style={{ background: '#1c1c1c', color: '#ececec' }}
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
