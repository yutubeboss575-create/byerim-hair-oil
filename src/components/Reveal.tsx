import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import pedestal from "../assets/pedestal.jpg";
import bottleBackup from "../assets/bottle-backup.jpg";
import { BADGES, BOTTLE_CDN, PRODUCT_URL } from "../data";

gsap.registerPlugin(ScrollTrigger);

/* ACT VI — THE REVEAL.
   The untouched official product photograph (served from the brand's own CDN)
   rises into a pool of morning light. Packaging accuracy is sacred. */

export default function Reveal() {
  const root = useRef<HTMLElement>(null);
  const [bottleSrc, setBottleSrc] = useState(BOTTLE_CDN);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".s6", { height: "340vh" });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ".s6",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
          },
        });

        tl.fromTo(".rv-glow", { autoAlpha: 0.1, scale: 0.65 }, { autoAlpha: 0.85, scale: 1.15, duration: 2.6 }, 0)
          .fromTo(".rv-bg", { autoAlpha: 0.12, scale: 1.06 }, { autoAlpha: 0.4, scale: 1, duration: 2.6 }, 0)
          .fromTo(
            ".rv-bottle",
            { y: 170, scale: 0.78, autoAlpha: 0.6 },
            { y: 0, scale: 1, autoAlpha: 1, duration: 2.2, ease: "power1.inOut" },
            0.3
          )
          .fromTo(".rv-ghost", { yPercent: 12, autoAlpha: 0 }, { yPercent: -8, autoAlpha: 0.6, duration: 3 }, 0)
          .fromTo(
            ".rv-copy",
            { autoAlpha: 0, y: 44 },
            { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" },
            2.3
          );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="reveal" className="s6 relative min-h-screen bg-ink" aria-label="The product">
      <div className="sticky top-0 h-screen overflow-hidden">
        <img
          src={pedestal}
          alt=""
          aria-hidden
          loading="lazy"
          className="rv-bg absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/30 to-ink/80" />

        <div
          className="rv-glow absolute left-1/2 top-1/2 size-[130vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(232,172,92,0.5) 0%, rgba(199,129,54,0.18) 38%, transparent 68%)",
          }}
        />

        <div className="rv-ghost pointer-events-none absolute inset-0 flex items-center justify-center select-none">
          <span className="font-serif text-[34vw] leading-none tracking-[-0.05em] text-bone/[0.05] italic">
            N°8
          </span>
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-end pb-0">
          <img
            src={bottleSrc}
            onError={() => setBottleSrc(bottleBackup)}
            alt="ByErim Hair Oil — amber glass bottle with dropper cap and minimal label"
            className="rv-bottle h-[52vh] w-auto object-contain drop-shadow-[0_70px_90px_rgba(0,0,0,0.7)] md:h-[62vh]"
          />
        </div>

        {/* copy plate */}
        <div className="rv-copy absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-ink via-ink/85 to-transparent px-6 pt-24 pb-10 text-center">
          <p className="kicker text-glow">for hair · for beard</p>
          <h2 className="halo mt-3 font-serif text-5xl font-light tracking-[-0.01em] text-bone md:text-6xl">
            ByErim Hair Oil
          </h2>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {BADGES.map((b) => (
              <span
                key={b}
                className="rounded-full border border-bone/15 px-4 py-1.5 text-[10px] tracking-[0.22em] text-bone/60 uppercase"
              >
                {b}
              </span>
            ))}
          </div>
          <div className="mt-7">
            <a
              href={PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-bone px-8 py-4 text-[12px] font-semibold tracking-[0.24em] text-ink uppercase transition-colors duration-300 hover:bg-glow"
            >
              Buy now — at byerim.com
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
