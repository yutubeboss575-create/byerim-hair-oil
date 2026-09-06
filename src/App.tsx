import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { ArrowUpRight } from "lucide-react";
import Hero from "./components/Hero";
import Ritual from "./components/Ritual";
import Heritage from "./components/Heritage";
import Formula from "./components/Formula";
import Reveal from "./components/Reveal";
import Conversion from "./components/Conversion";
import { PRODUCT_URL } from "./data";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [ready, setReady] = useState(false);
  const [showBuy, setShowBuy] = useState(false);
  const loader = useRef<HTMLDivElement>(null);

  /* smooth-scroll engine + opening curtain */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    let raf: ((t: number) => void) | null = null;

    if (!reduce) {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      raf = (t: number) => lenis!.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    const tl = gsap.timeline({
      delay: 0.25,
      onComplete: () => {
        setReady(true);
        requestAnimationFrame(() => ScrollTrigger.refresh());
      },
    });

    if (!reduce) {
      tl.fromTo(
        ".ld-word",
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" }
      )
        .fromTo(".ld-sub", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, "-=0.35")
        .to(".ld-inner", { autoAlpha: 0, y: -20, duration: 0.5, ease: "power2.in" }, "+=0.7")
        .to(loader.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" });
    } else {
      tl.to(loader.current, { autoAlpha: 0, duration: 0.3 });
    }

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      tl.kill();
      window.removeEventListener("load", onLoad);
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
    };
  }, []);

  /* sticky buy appears after the reveal, rests during the final buy scene */
  useEffect(() => {
    if (!ready) return;
    const st1 = ScrollTrigger.create({
      trigger: "#reveal",
      start: "top 45%",
      onEnter: () => setShowBuy(true),
      onLeaveBack: () => setShowBuy(false),
    });
    const st2 = ScrollTrigger.create({
      trigger: "#buy",
      start: "top 65%",
      onEnter: () => setShowBuy(false),
      onLeaveBack: () => setShowBuy(true),
    });
    return () => {
      st1.kill();
      st2.kill();
    };
  }, [ready]);

  return (
    <main id="top" className="bg-ink font-sans text-bone antialiased">
      {/* opening curtain */}
      {!ready && (
        <div ref={loader} className="fixed inset-0 z-[80] flex items-center justify-center bg-ink">
          <div className="ld-inner flex flex-col items-center gap-5">
            <span className="ld-word halo font-serif text-5xl font-light tracking-[-0.02em] text-bone md:text-6xl">
              byerim
            </span>
            <span className="ld-sub kicker text-glow/70">the ritual, handed down</span>
          </div>
        </div>
      )}

      {/* header */}
      <header
        className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 text-bone mix-blend-difference transition-all duration-1000 md:px-10 ${
          ready ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
        }`}
      >
        <a href="#top" className="font-serif text-2xl leading-none tracking-[-0.02em]">
          byerim
        </a>
        <div className="flex items-center gap-7">
          <span className="kicker hidden opacity-50 md:block">hair oil · an evening ritual</span>
          <a
            href={PRODUCT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-current px-5 py-2 text-[11px] tracking-[0.22em] uppercase transition-opacity duration-300 hover:opacity-60"
          >
            Buy <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </header>

      <Hero />
      <Ritual />
      <Heritage />
      <Formula />
      <Reveal />
      <Conversion />

      {/* sticky buy */}
      <a
        href={PRODUCT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-hidden={!showBuy}
        tabIndex={showBuy ? 0 : -1}
        className={`fixed inset-x-4 bottom-4 z-40 flex items-center justify-between gap-4 rounded-full bg-bone py-2 pr-2 pl-6 text-ink shadow-[0_24px_60px_rgba(0,0,0,0.5)] transition-all duration-500 md:inset-x-auto md:right-6 md:bottom-6 ${
          showBuy ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
        }`}
      >
        <span className="text-[13px] font-medium tracking-wide">ByErim Hair Oil</span>
        <span className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[11px] tracking-[0.2em] text-bone uppercase">
          Buy now <ArrowUpRight className="size-3.5" />
        </span>
      </a>

      {/* film grain + vignette */}
      <div className="grain pointer-events-none fixed inset-0 z-[70] opacity-[0.055]" />
      <a
        href={PRODUCT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="sr-only"
      >
        Buy the ByErim Hair Oil at byerim.com
      </a>
    </main>
  );
}
