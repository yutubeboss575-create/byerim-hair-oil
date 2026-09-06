import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Plus } from "lucide-react";
import stillOils from "../assets/still-oils.jpg";
import { FAQS, LEDGER, PRESS, PRODUCT_URL, SIZES } from "../data";

gsap.registerPlugin(ScrollTrigger);

/* ACT VII — PROOF (desire, morning light) + ACT VIII — YOURS (buy) */

export default function Conversion() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number>(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".pv-rise").forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 46 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 86%" },
            }
          );
        });
        gsap.fromTo(
          ".pv-fig",
          { clipPath: "inset(10% 6% 10% 6%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: ".pv-fig", start: "top 90%", end: "top 35%", scrub: 0.6 },
          }
        );
        gsap.fromTo(
          ".by-rise",
          { autoAlpha: 0, y: 60 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: "#buy", start: "top 65%" },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      {/* ============ ACT VII — PROOF ============ */}
      <section id="proof" className="bg-bone px-6 py-28 text-ink md:px-12 md:py-40" aria-label="Proof">
        <div className="mx-auto max-w-6xl">
          <div className="pv-rise flex items-center gap-6">
            <p className="kicker text-raagi">chapter vii — morning · proof</p>
            <div className="hairline flex-1" />
          </div>

          <h2 className="pv-rise mt-10 max-w-3xl font-serif text-[12vw] leading-[1.0] font-light tracking-[-0.02em] md:text-[5.4vw]">
            Nothing to hide.
            <span className="block italic text-raagi">Everything verified.</span>
          </h2>

          <div className="mt-16 grid items-start gap-12 md:mt-24 md:grid-cols-2 md:gap-20">
            <figure className="pv-fig overflow-hidden">
              <img
                src={stillOils}
                alt="Amla fruit, argan nuts, coconut, almonds, lavender, rosemary and bergamot beside a bottle of golden oil on warm stone"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover md:aspect-[4/4.6]"
              />
              <figcaption className="mt-3 text-[11px] tracking-[0.18em] text-ink/45 uppercase">
                the eight, before the blend — amla · argan · coconut · castor · almond · lavender · rosemary · bergamot
              </figcaption>
            </figure>

            <div>
              {LEDGER.map((l) => (
                <div key={l.fact} className="pv-rise flex items-baseline justify-between gap-6 border-t border-ink/10 py-5">
                  <p className="font-serif text-lg leading-snug text-ink/85 md:text-xl">{l.fact}</p>
                  <span className="kicker shrink-0 text-ink/35">{l.tag}</span>
                </div>
              ))}

              <div className="pv-rise mt-12 border-y border-ink/10 py-10 text-center">
                <p className="font-serif text-6xl font-light text-ink md:text-7xl">120,000<span className="text-amber">+</span></p>
                <p className="kicker mt-3 text-ink/45">customers worldwide · multi-award-winning</p>
                <p className="kicker mt-8 text-ink/35">featured in</p>
                <p className="mt-3 flex flex-wrap items-baseline justify-center gap-x-6 gap-y-1 font-serif text-2xl text-ink/75 italic md:text-3xl">
                  {PRESS.map((p) => (
                    <span key={p}>{p}</span>
                  ))}
                </p>
              </div>
            </div>
          </div>

          {/* FAQ — verified answers only */}
          <div className="mx-auto mt-24 max-w-3xl md:mt-32">
            <p className="pv-rise kicker mb-8 text-raagi">questions, answered honestly</p>
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="pv-rise border-b border-ink/10">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-serif text-xl text-ink/90 md:text-2xl">{f.q}</span>
                    <Plus
                      className={`size-5 shrink-0 text-raagi transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-7 pr-10 text-[15px] leading-relaxed text-ink/60">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ ACT VIII — YOURS ============ */}
      <section id="buy" className="relative overflow-hidden bg-ink px-6 py-32 text-bone md:py-44" aria-label="Buy">
        <div
          className="pointer-events-none absolute left-1/2 top-0 size-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(199,129,54,0.4) 0%, transparent 62%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="by-rise kicker text-glow">chapter viii — yours</p>
          <h2 className="by-rise halo mt-8 font-serif text-[13vw] leading-[1.0] font-light tracking-[-0.02em] md:text-[6vw]">
            One evening.
            <span className="block italic text-glow">Three evenings a week.</span>
          </h2>
          <p className="by-rise mx-auto mt-8 max-w-md text-sm leading-relaxed text-bone/55">
            Choose your size at byerim.com. This concept experience hands you to the
            real product page — the ritual continues there.
          </p>

          <div className="by-rise mx-auto mt-14 grid max-w-3xl gap-4 text-left md:grid-cols-2">
            {SIZES.map((s) => (
              <a
                key={s.size}
                href={PRODUCT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-bone/15 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-glow/70 hover:bg-bone/[0.03] md:p-9"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-4xl font-light md:text-5xl">{s.size}</span>
                  <ArrowUpRight className="size-5 text-bone/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-glow" />
                </div>
                <p className="kicker mt-4 text-glow/80">{s.mood}</p>
                <p className="mt-2 text-sm text-bone/50">{s.lasts}</p>
                <span className="mt-7 inline-flex items-center gap-2 border-b border-glow/60 pb-1 text-[11px] tracking-[0.24em] text-bone/80 uppercase transition-colors duration-300 group-hover:text-glow">
                  choose {s.size} at byerim.com
                </span>
              </a>
            ))}
          </div>

          <div className="by-rise mt-12">
            <a
              href={PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-bone px-10 py-5 text-[13px] font-semibold tracking-[0.26em] text-ink uppercase transition-colors duration-300 hover:bg-glow"
            >
              Buy now — byerim.com
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="mt-6 text-[11px] leading-relaxed tracking-[0.14em] text-bone/35 uppercase">
              US storefront $34.46 (50ml) — $55.14 (100ml) · regional pricing at checkout
              <br className="hidden md:block" />
              30-day returns on unused product · patch test 48 hours before first use
            </p>
          </div>
        </div>

        {/* footer */}
        <footer className="relative mx-auto mt-28 max-w-6xl border-t border-bone/10 pt-8 md:mt-36">
          <div className="flex flex-col gap-4 text-[11px] leading-relaxed tracking-[0.14em] text-bone/35 uppercase md:flex-row md:items-center md:justify-between">
            <p>
              a concept experience crafted around the real ByErim Hair Oil ·
              every product fact verified at byerim.com · not affiliated with ByErim
            </p>
            <a
              href={PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-bone/55 transition-colors hover:text-glow"
            >
              byerim.com/products/hair-oil <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </footer>
      </section>
    </div>
  );
}
