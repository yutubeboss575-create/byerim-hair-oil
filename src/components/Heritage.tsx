import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import combHeritage from "../assets/comb-heritage.jpg";

gsap.registerPlugin(ScrollTrigger);

/* ACT IV — HANDED DOWN.
   One quiet sepia memory. No dramatized biography — a comb, a bowl, a ritual.
   Founder facts are press-verified (CNBC / Moneycontrol). */

export default function Heritage() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".hg-line",
          { autoAlpha: 0, y: 60, rotateX: 8 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.14,
            scrollTrigger: { trigger: ".hg-head", start: "top 78%" },
          }
        );

        gsap.fromTo(
          ".hg-fig",
          { clipPath: "inset(12% 8% 12% 8%)", scale: 0.98 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: ".hg-fig", start: "top 90%", end: "top 30%", scrub: 0.6 },
          }
        );

        // slow memory drift inside the frame
        gsap.to(".hg-img", {
          scale: 1.1,
          duration: 14,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.fromTo(
          ".hg-body",
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".hg-body", start: "top 82%" },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-cream px-6 py-28 text-ink md:py-44" aria-label="Heritage">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-6">
          <p className="kicker text-raagi">chapter iv — handed down</p>
          <div className="hairline flex-1" />
        </div>

        <h2 className="hg-head mt-12 font-serif text-[13vw] leading-[0.98] font-light tracking-[-0.02em] md:text-[7.2vw]">
          <span className="hg-line block">Six years.</span>
          <span className="hg-line block">Two generations.</span>
          <span className="hg-line block italic text-raagi">One recipe.</span>
        </h2>

        <div className="mt-16 grid items-start gap-10 md:mt-28 md:grid-cols-[1.2fr_1fr] md:gap-20">
          <figure className="hg-fig relative overflow-hidden">
            <img
              src={combHeritage}
              alt="A wooden comb and a small brass bowl of golden oil on a weathered table in morning light"
              loading="lazy"
              className="hg-img aspect-[4/3] w-full object-cover sepia-[0.22] contrast-[0.96]"
            />
            <figcaption className="mt-3 text-[11px] tracking-[0.18em] text-ink/45 uppercase">
              a memory, interpreted — not a photograph of anyone
            </figcaption>
          </figure>

          <div className="hg-body md:pt-6">
            <p className="font-serif text-2xl leading-snug text-ink/85 md:text-[1.7rem]">
              Before it was a brand, it was a Sunday evening — hair oiled, combed
              and braided the way <span className="italic">Erim Kaur&rsquo;s grandmother</span> taught her.
            </p>
            <p className="mt-6 text-[15px] leading-relaxed text-ink/60">
              Together they spent six years refining the blend — eight oils, weighed
              against one another until the recipe felt right. In 2019, Erim founded
              ByErim in London, and the ritual became this formula. It is still made
              in the UK. It is still 100% natural. It is still the same evening.
            </p>
            <div className="hairline my-8 w-24" />
            <p className="text-[15px] leading-relaxed text-ink/60">
              Nothing about it was invented for a campaign. That is exactly why the
              story is short — and why it holds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
