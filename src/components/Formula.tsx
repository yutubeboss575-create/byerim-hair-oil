import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OILS } from "../data";

gsap.registerPlugin(ScrollTrigger);

/* ACT V — THE FORMULA.
   Not an ingredient grid: one oil-drop descends a thread from CUTICLE to CORTEX
   while the eight oils ignite one by one. Weight classes are a creative reading
   of the verified "varied molecular weights" claim. */

export default function Formula() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const rows = gsap.utils.toArray<HTMLElement>(".fo-row");
        const drop = document.querySelector<HTMLElement>(".fo-drop");

        gsap.set(".s5-pin", { height: "640vh" });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ".s5-pin",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
          },
        });

        tl.fromTo(drop, { top: "0%" }, { top: "100%", duration: 8 }, 0);

        rows.forEach((row, i) => {
          tl.fromTo(
            row,
            { autoAlpha: 0.18, x: -18, filter: "blur(2px)" },
            { autoAlpha: 1, x: 0, filter: "blur(0px)", duration: 0.5, ease: "power1.out" },
            0.35 + i * 0.92
          );
          const name = row.querySelector(".fo-name");
          tl.to(name, { color: "#f2e9d8", duration: 0.4 }, 0.4 + i * 0.92);
        });

        tl.fromTo(
          ".fo-out-note",
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
          7.9
        );
      });

      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        gsap.utils.toArray<HTMLElement>(".fo-row").forEach((row) => {
          gsap.fromTo(
            row,
            { autoAlpha: 0, y: 40 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: row, start: "top 86%" },
            }
          );
        });
        gsap.fromTo(
          ".fo-out-note",
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".fo-out-note", start: "top 88%" },
          }
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".fo-head",
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".s5-intro", start: "top 75%" },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="bg-ink text-bone">
      {/* intro */}
      <section className="s5-intro px-6 pt-28 pb-16 md:px-12 md:pt-40 md:pb-24" aria-label="The formula">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-6">
            <p className="kicker text-amber">chapter v — the formula</p>
            <div className="hairline flex-1" />
          </div>
          <h2 className="fo-head mt-10 max-w-4xl font-serif text-[11vw] leading-[1.0] font-light tracking-[-0.02em] md:text-[5.6vw]">
            Eight oils.
            <span className="block italic text-glow">One architecture.</span>
          </h2>
          <p className="fo-head mt-8 max-w-md text-sm leading-relaxed text-bone/55">
            Every oil in the formula carries a different molecular weight — so the
            blend can travel the full length of the hair, from the cuticle to the
            inner cortex. Follow one drop down.
          </p>
        </div>
      </section>

      {/* the descent — desktop pinned theatre */}
      <section className="s5-pin relative" aria-label="The eight oils">
        <div className="md:sticky md:top-0 md:flex md:h-screen md:items-center md:overflow-hidden">
          <div className="mx-auto flex w-full max-w-6xl gap-10 px-6 py-10 md:gap-24 md:px-12">
            {/* thread rail */}
            <div className="relative hidden w-40 shrink-0 md:block">
              <span className="kicker absolute -top-10 left-1/2 -translate-x-1/2 text-bone/45">cuticle</span>
              <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-bone/12" />
              <div className="fo-drop absolute left-1/2 top-0 size-3 -translate-x-1/2 rounded-full bg-glow shadow-[0_0_24px_6px_rgba(232,172,92,0.55)]" />
              <span className="kicker absolute -bottom-10 left-1/2 -translate-x-1/2 text-glow">cortex</span>
            </div>

            {/* oil rows */}
            <div className="relative flex-1">
              {OILS.map((o) => (
                <div
                  key={o.n}
                  className="fo-row flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-bone/8 py-5 md:py-[1.9vh] md:pl-16"
                >
                  <span className="fo-idx kicker text-glow/70">{o.n}</span>
                  <h3 className="fo-name font-serif text-3xl font-light text-bone/90 md:text-[2.9vw] md:leading-none">
                    {o.name}
                  </h3>
                  <p className="w-full max-w-md text-[13px] leading-relaxed text-bone/50 md:w-auto md:flex-1 md:pl-4">
                    {o.role}
                  </p>
                  <span className="kicker hidden text-bone/30 md:inline">{o.weight}</span>
                </div>
              ))}
              <p className="fo-out-note mt-8 max-w-xl font-serif text-xl leading-snug text-bone/80 italic md:text-2xl">
                100% natural. Ayurvedic ingredients. Made in the UK — the lightest
                oil reaches deepest last, and seals the rest in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* footnote */}
      <section className="border-t border-bone/8 px-6 py-10 md:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-[11px] leading-relaxed tracking-[0.14em] text-bone/35 uppercase md:flex-row md:justify-between">
          <p>weight classes — a reading of the formula&rsquo;s varied molecular weights</p>
          <p>may contain linalool &amp; limonene (&lt;1%) · patch test 48h before first use</p>
        </div>
      </section>
    </div>
  );
}
