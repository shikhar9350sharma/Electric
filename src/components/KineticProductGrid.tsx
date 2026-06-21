import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  specs: string;
}

const products: Product[] = [
  { id: 1, name: 'Arco Downlight Pro', category: 'Downlights', image: '/images/product-1.jpg', specs: '12W | 3000K | CRI90' },
  { id: 2, name: 'Luma Cylinder Pendant', category: 'Pendants', image: '/images/product-2.jpg', specs: '18W | 2700K | Dimmable' },
  { id: 3, name: 'TrackSpot Precision', category: 'Track Lights', image: '/images/product-3.jpg', specs: '25W | 4000K | 24° Beam' },
  { id: 4, name: 'Linea Suspended', category: 'Tube Lights', image: '/images/product-4.jpg', specs: '40W | 3500K | 4ft' },
  { id: 5, name: 'FlatPanel Ultra', category: 'Surface Panels', image: '/images/product-5.jpg', specs: '36W | 4000K | 600x600' },
  { id: 6, name: 'Force Flood Max', category: 'Flood Lights', image: '/images/product-6.jpg', specs: '100W | 5000K | IP65' },
  { id: 7, name: 'FlexStrip Pro', category: 'Strip Lights', image: '/images/product-7.jpg', specs: '14.4W/m | 2700K | 5m Roll' },
  { id: 8, name: 'RoadMaster LED', category: 'Street Lights', image: '/images/product-8.jpg', specs: '150W | 4000K | IP66' },
  { id: 9, name: 'Arco Mini Downlight', category: 'Downlights', image: '/images/product-1.jpg', specs: '8W | 3000K | CRI90' },
  { id: 10, name: 'Luma Twin Pendant', category: 'Pendants', image: '/images/product-2.jpg', specs: '2x12W | 3000K | Dimmable' },
  { id: 11, name: 'TrackSpot Wide', category: 'Track Lights', image: '/images/product-3.jpg', specs: '30W | 3000K | 36° Beam' },
  { id: 12, name: 'Linea Surface', category: 'Tube Lights', image: '/images/product-4.jpg', specs: '20W | 4000K | 2ft' },
  { id: 13, name: 'FlatPanel Slim', category: 'Surface Panels', image: '/images/product-5.jpg', specs: '24W | 3000K | 300x300' },
  { id: 14, name: 'Force Flood Mini', category: 'Flood Lights', image: '/images/product-6.jpg', specs: '50W | 4000K | IP65' },
  { id: 15, name: 'FlexStrip RGB', category: 'Strip Lights', image: '/images/product-7.jpg', specs: '19.2W/m | RGB+W | 5m Roll' },
  { id: 16, name: 'RoadMaster Solar', category: 'Street Lights', image: '/images/product-8.jpg', specs: '80W | 4000K | Solar Panel' },
];

export default function KineticProductGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((item, index) => {
        if (!item) return;

        const column = (index % 4) + 1;
        const distFromCenter = Math.abs(2.5 - column);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        tl.fromTo(
          item,
          {
            rotationZ: 0,
            rotationY: 0,
            rotationX: 0,
            yPercent: 0,
            scaleY: 1,
          },
          {
            rotationZ: 0.3 * distFromCenter * 1.5,
            rotationY: 130 * distFromCenter * 0.01,
            rotationX: 60 * distFromCenter * 0.01,
            yPercent: 200 * distFromCenter * 0.01,
            scaleY: 1 - 0.05 * distFromCenter,
            delay: 0.2 * Math.abs(2.5 - column) * 0.1,
            ease: 'none',
          }
        );

        // Counter-rotate the image inside
        const img = item.querySelector('.grid-item-img') as HTMLElement;
        if (img) {
          tl.fromTo(
            img,
            { rotationZ: 0 },
            { rotationZ: -0.3 * distFromCenter * 1.5, ease: 'none' },
            0
          );
        }
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        rowGap: '15vh',
      }}
    >
      {products.map((product, index) => (
        <div
          key={product.id}
          ref={(el) => { itemRefs.current[index] = el; }}
          className="group relative rounded-2xl overflow-hidden cursor-pointer"
          style={{
            transformOrigin: '50% 100%',
            background: '#252525',
            aspectRatio: '16/10',
          }}
        >
          {/* Image */}
          <div className="grid-item-img absolute inset-0 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Overlay gradient */}
          <div
            className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(to top, rgba(28,28,28,0.95) 0%, rgba(28,28,28,0.3) 50%, transparent 100%)',
            }}
          />

          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <p
              className="text-xs uppercase tracking-[1px] font-medium mb-1"
              style={{ color: '#f2ae72' }}
            >
              {product.category}
            </p>
            <h3
              className="text-lg font-medium mb-1"
              style={{ color: '#ececec' }}
            >
              {product.name}
            </h3>
            <p
              className="text-sm font-light"
              style={{ color: 'rgba(236,236,236,0.6)' }}
            >
              {product.specs}
            </p>
            
            <button
              className="mt-4 text-xs uppercase tracking-[1px] font-medium flex items-center gap-2 transition-colors duration-300 hover:gap-3"
              style={{ color: '#f2ae72' }}
            >
              View Details
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Top badge */}
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs uppercase tracking-[1px] font-medium"
            style={{
              background: 'rgba(242,174,114,0.15)',
              color: '#f2ae72',
              backdropFilter: 'blur(8px)',
            }}
          >
            {product.category}
          </div>
        </div>
      ))}
    </div>
  );
}
