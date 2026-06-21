export default function Footer() {
  return (
    <footer
      className="relative py-16 lg:py-20"
      style={{ background: '#1c1c1c' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Top section */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3
              className="text-2xl font-medium tracking-[-0.5px] mb-4"
              style={{ color: '#ececec' }}
            >
              ElectricEye
            </h3>
            <p
              className="text-sm font-light leading-relaxed"
              style={{ color: 'rgba(236,236,236,0.5)' }}
            >
              Premium commercial lighting solutions for architects, designers, and lighting professionals across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-xs uppercase tracking-[2px] font-medium mb-6"
              style={{ color: '#f2ae72' }}
            >
              Products
            </h4>
            <ul className="space-y-3">
              {['LED Bulbs', 'Tube Lights', 'Surface Panels', 'Downlights', 'Track Lights'].map((item) => (
                <li key={item}>
                  <a
                    href="#collection"
                    className="text-sm font-light transition-colors duration-200 hover:text-[#f2ae72]"
                    style={{ color: 'rgba(236,236,236,0.6)' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="text-xs uppercase tracking-[2px] font-medium mb-6"
              style={{ color: '#f2ae72' }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {['About Us', 'Our Dealers', 'Trade Program', 'Projects', 'Careers'].map((item) => (
                <li key={item}>
                  <a
                    href="#contact"
                    className="text-sm font-light transition-colors duration-200 hover:text-[#f2ae72]"
                    style={{ color: 'rgba(236,236,236,0.6)' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4
              className="text-xs uppercase tracking-[2px] font-medium mb-6"
              style={{ color: '#f2ae72' }}
            >
              Support
            </h4>
            <ul className="space-y-3">
              {['Contact Us', 'Warranty Info', 'Installation Guide', 'Returns Policy', 'FAQ'].map((item) => (
                <li key={item}>
                  <a
                    href="#contact"
                    className="text-sm font-light transition-colors duration-200 hover:text-[#f2ae72]"
                    style={{ color: 'rgba(236,236,236,0.6)' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-8"
          style={{ background: 'rgba(236,236,236,0.08)' }}
        />

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs font-light"
            style={{ color: 'rgba(236,236,236,0.35)' }}
          >
            &copy; {new Date().getFullYear()} ElectricEye Lighting Pvt. Ltd. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs font-light transition-colors duration-200 hover:text-[#f2ae72]"
                style={{ color: 'rgba(236,236,236,0.35)' }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {[
              { name: 'LinkedIn', d: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z' },
              { name: 'Instagram', d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
              { name: 'Twitter', d: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
            ].map((social) => (
              <a
                key={social.name}
                href="#"
                className="transition-colors duration-200 hover:text-[#f2ae72]"
                style={{ color: 'rgba(236,236,236,0.4)' }}
                aria-label={social.name}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={social.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
