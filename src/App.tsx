import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import Featured from './sections/Featured';
import Collection from './sections/Collection';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Only initialize Lenis on desktop (screens > 768px)
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
      lenisRef.current = new Lenis({
        lerp: 0.2,
        smoothWheel: true,
        autoResize: true,        //Enable auto-resize
      });

      // Connect Lenis to GSAP ScrollTrigger
      lenisRef.current.on('scroll', ScrollTrigger.update);

      // Store the ticker function in a variable for proper cleanup
      const tickerFn = (time: number) => {
        lenisRef.current?.raf(time * 1000);
      };

      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      //  Handle window resize to re-check mobile/desktop
      const handleResize = () => {
        const nowMobile = window.innerWidth <= 768;
        if (nowMobile && lenisRef.current) {
          lenisRef.current.destroy();
          lenisRef.current = null;
          gsap.ticker.remove(tickerFn);
          // Refresh ScrollTrigger after destroying Lenis
          ScrollTrigger.refresh();
        }
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        gsap.ticker.remove(tickerFn);
        lenisRef.current?.destroy();
        lenisRef.current = null;
      };
    }

  
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="w-full overflow-x-hidden">
        <div id="hero">
          <Hero />
        </div>
        <Featured />
        <Collection />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;