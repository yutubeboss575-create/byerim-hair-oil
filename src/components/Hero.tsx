import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import oilMacro from "../assets/oil-macro.jpg";
import dropSkin from "../assets/drop-skin.jpg";
import palmOil from "../assets/palm-oil.jpg";
import hairRake from "../assets/hair-rake.jpg";

gsap.registerPlugin(ScrollTrigger);

/* ACT I — CURIOSITY (dusk) + ACT II — FIRST CONTACT (tactility) */

const FRAMES = [
  {
    src: dropSkin,
    caption: "a drop, warmed",
    alt: "A single drop of golden oil pooling on skin, lit by warm light",
  },
  {
    src: palmOil,
    caption: "pooled in the palm",
    alt: "A cupped palm holding a small pool of amber oil",
  },
  {
    src: hairRake,
    caption: "combed through",
    alt: "Hands raking oil through long dark hair, strands catching the light",
  },
];

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* the scene only becomes a tall camera-run when motion is welcome */
        gsap.set(".s1", { height: "320vh" });

        /* ---- ACT I : the camera drifts out of the oil ---- */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".s1",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
          },
        });
        tl.fromTo(
          ".s1-img",
          { scale: 1.3, filter: "brightness(0.5) saturate(1.1)" },
          { scale: 1.02, filter: "brightness(0.95) saturate(1)", duration: 3, ease: "none" },
          0
        )
          .to(".s1-ghost", { yPercent: -16, duration: 3, ease: "none" }, 0)
          .fromTo(".s1-kicker", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 0.15)
          .fromTo(".s1-a", { autoAlpha: 0, y: 46 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.45)
          .to(".s1-a", { autoAlpha: 0, y: -46, duration: 0.55, ease: "power2.in" }, 1.55)
          .fromTo(".s1-b", { autoAlpha: 0, y: 46 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, 2.05)
          .to(".s1-hint", { autoAlpha: 0, duration: 0.4 }, 0.7);

        /* ---- ACT II : rack-focus across three tactile frames ---- */
        gsap.utils.toArray<HTMLElement>(".focus-pull").forEach((fig) => {
          const img = fig.querySelector("img");
          const cap = fig.querySelector("figcaption");
          gsap.fromTo(
            img,
            { filter: "blur(18px) saturate(0.8) brightness(0.9)", scale: 1.14 },
            {
              filter: "blur(0px) saturate(1) brightness(1)",
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: fig, start: "top 92%", end: "top 28%", scrub: 0.6 },
            }
          );
          gsap.fromTo(
            cap,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              ease: "none",
              scrollTrigger: { trigger: fig, start: "top 55%", end: "top 32%", scrub: 0.4 },
            }
          );
        });

        gsap.fromTo(
          ".s2-head",
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".s2", start: "top 78%" },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      {/* ============ ACT I — CURIOSITY ============ */}
      <section className="s1 relative min-h-screen" aria-label="Introduction">
        <div className="sticky top-0 h-screen overflow-hidden">
          <img
            src={oilMacro}
            alt="Macro of golden hair oil swirling slowly in dark glass"
            className="s1-img absolute inset-0 h-full w-full object-cover will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/10 to-ink" />
          <div className="vignette absolute inset-0" />

          <div className="s1-ghost pointer-events-none absolute inset-0 flex items-center justify-center select-none">
            <span className="font-serif text-[24vw] leading-none tracking-[-0.04em] text-bone/[0.05]">
              byerim
            </span>
          </div>

          <p className="s1-kicker kicker absolute top-24 left-1/2 -translate-x-1/2 text-bone/50 md:top-28">
            chapter i — dusk
          </p>

          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="s1-a halo absolute px-6 text-center font-serif text-[11vw] leading-[1.02] font-light tracking-[-0.02em] text-bone md:text-[6.4vw]">
              Before it was a formula,
            </h1>
            <p className="s1-b halo invisible absolute px-6 text-center font-serif text-[11vw] leading-[1.02] font-light tracking-[-0.02em] text-bone italic opacity-0 md:text-[6.4vw]">
              it was an evening ritual.
            </p>
          </div>

          <div className="s1-hint absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4">
            <span className="kicker text-bone/45">scroll — the camera is yours</span>
            <span className="scroll-line block h-14 w-px bg-glow/70" />
          </div>
        </div>
      </section>

      {/* ============ ACT II — FIRST CONTACT ============ */}
      <section className="s2 relative bg-ink px-5 pt-10 pb-32 md:px-12 md:pb-44" aria-label="First contact">
        <div className="s2-head mx-auto flex max-w-6xl flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker text-amber">chapter ii — first contact</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.05] font-light text-bone md:text-6xl">
              Glass. Oil. Skin. <span className="italic text-glow">Light.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-bone/50">
            The product stays in the dark a little longer. First, the body of it —
            the way it moves through a hand.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:mt-24 md:grid-cols-3 md:gap-8">
          {FRAMES.map((f, i) => (
            <figure
              key={f.caption}
              className={`focus-pull group ${i === 1 ? "md:mt-16" : i === 2 ? "md:mt-32" : ""}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={f.src}
                  alt={f.alt}
                  loading="lazy"
                  className="h-full w-full object-cover will-change-[filter,transform]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
              </div>
              <figcaption className="mt-4 flex items-baseline gap-3">
                <span className="kicker text-glow/80">0{i + 1}</span>
                <span className="font-serif text-lg text-bone/80 italic">{f.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
