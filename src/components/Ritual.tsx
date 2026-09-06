import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import palmOil from "../assets/palm-oil.jpg";
import hairRake from "../assets/hair-rake.jpg";
import oilMacro from "../assets/oil-macro.jpg";
import dropSkin from "../assets/drop-skin.jpg";
import { RITUAL_STEPS } from "../data";

gsap.registerPlugin(ScrollTrigger);

/* ACT III — THE RITUAL.
   The camera stays still; time moves. Four verified movements: warm, massage,
   wait (a slow 30-minute arc), rinse.
   Reduced motion: the theatre collapses into a calm stacked list with one
   poster image — nothing overlaps, nothing moves. */

const STEP_IMAGES = [
  { src: palmOil, cls: "", alt: "A pool of golden oil warmed in a cupped palm" },
  { src: hairRake, cls: "", alt: "Hands massaging oil through dark hair" },
  { src: oilMacro, cls: "brightness-[0.7]", alt: "Golden oil resting in dark glass while the formula works" },
  { src: dropSkin, cls: "brightness-[1.15] saturate-[1.1]", alt: "A final drop of oil, ready to be rinsed away" },
];

const C = 2 * Math.PI * 96; // ring circumference

export default function Ritual() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const steps = gsap.utils.toArray<HTMLElement>(".rt-step");
        const imgs = gsap.utils.toArray<HTMLElement>(".rt-img");

        /* build the theatre only when motion is welcome */
        gsap.set(".s3", { height: "480vh" });
        gsap.set(".rt-stage", { height: window.innerWidth >= 768 ? "46vh" : "38vh" });
        gsap.set(".rt-poster", { autoAlpha: 0 });
        gsap.set(steps, { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, autoAlpha: 0, y: 60 });
        gsap.set(imgs, { autoAlpha: 0, scale: 1.08 });
        gsap.set(steps[0], { autoAlpha: 1, y: 0 });
        gsap.set(imgs[0], { autoAlpha: 1, scale: 1 });
        gsap.set(".rt-ring-wrap", { autoAlpha: 0 });
        gsap.set(".rt-arc", { strokeDashoffset: C });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".s3",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
          },
        });

        RITUAL_STEPS.forEach((_, i) => {
          const t = i * 1.2;
          if (i > 0) {
            tl.to(steps[i - 1], { autoAlpha: 0, y: -60, duration: 0.45, ease: "power2.in" }, t - 0.45)
              .to(imgs[i - 1], { autoAlpha: 0, scale: 1.04, duration: 0.55, ease: "none" }, t - 0.5)
              .to(steps[i], { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, t)
              .to(imgs[i], { autoAlpha: 1, scale: 1, duration: 0.55, ease: "none" }, t - 0.1);
          }
        });

        // the WAIT step — reveal and slowly fill the 30-minute arc
        tl.to(".rt-ring-wrap", { autoAlpha: 1, duration: 0.4 }, 2.4).to(
          ".rt-arc",
          { strokeDashoffset: C * 0.22, duration: 1.1, ease: "none" },
          2.5
        );

        // coda
        gsap.fromTo(
          ".rt-coda",
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".rt-coda", start: "top 82%" },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <section className="s3 relative min-h-screen bg-umber" aria-label="The ritual">
        <div className="sticky top-0 flex min-h-screen flex-col overflow-hidden md:flex-row">
          {/* text column */}
          <div className="relative flex flex-1 flex-col justify-center px-6 pt-14 md:h-full md:w-[46%] md:flex-none md:px-14 md:pt-0">
            <p className="kicker text-amber">chapter iii — the ritual</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-bone/45">
              The instructions, as they should be experienced — four movements,
              repeated one to three evenings a week.
            </p>

            <div className="rt-stage relative mt-6 md:mt-10">
              {RITUAL_STEPS.map((s) => (
                <div key={s.n} className="rt-step flex flex-col justify-center py-14 md:py-0">
                  <span className="kicker text-glow/70">{s.n}</span>
                  <h3 className="halo mt-3 font-serif text-6xl font-light text-bone md:text-8xl">
                    {s.title}
                  </h3>
                  <p className="mt-5 max-w-sm font-serif text-xl leading-snug text-bone/70 italic md:text-2xl">
                    {s.line}
                  </p>
                </div>
              ))}
            </div>

            <div className="hairline mt-4 w-full md:mt-8" />
            <p className="kicker mt-4 pb-8 text-bone/35 md:pb-0">
              leave in — 30 minutes or overnight
            </p>
          </div>

          {/* image column */}
          <div className="relative h-[52vh] md:h-full md:flex-1">
            <div className="absolute inset-4 overflow-hidden md:inset-10">
              {/* static poster — default & reduced-motion */}
              <img
                src={palmOil}
                alt="A pool of golden oil warmed in a cupped palm"
                className="rt-poster absolute inset-0 h-full w-full object-cover"
              />
              {/* animated layers */}
              {STEP_IMAGES.map((im, i) => (
                <img
                  key={i}
                  src={im.src}
                  alt={im.alt}
                  loading="lazy"
                  className={`rt-img absolute inset-0 h-full w-full object-cover opacity-0 will-change-[opacity,transform] ${im.cls}`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-r from-umber/60 via-transparent to-transparent" />

              {/* the ritual clock */}
              <div className="rt-ring-wrap absolute inset-0 flex items-center justify-center">
                <div className="relative size-52 md:size-72">
                  <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full -rotate-90">
                    <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(242,233,216,0.14)" strokeWidth="1" />
                    <circle
                      className="rt-arc"
                      cx="100"
                      cy="100"
                      r="96"
                      fill="none"
                      stroke="#e8ac5c"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray={C}
                      strokeDashoffset={C * 0.22}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-serif text-6xl font-light text-bone md:text-7xl">30</span>
                    <span className="kicker mt-2 text-bone/55">minutes — at least</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* coda — cadence & results window (verified) */}
      <section className="rt-coda bg-umber px-6 pt-10 pb-32 text-center md:pb-44">
        <p className="mx-auto max-w-2xl font-serif text-3xl leading-snug font-light text-bone md:text-5xl">
          Repeat one to three evenings a week.
          <span className="mt-2 block text-glow italic">Around a month, if you keep the ritual.</span>
        </p>
        <p className="kicker mt-8 text-bone/35">rinses out with one shampoo</p>
      </section>
    </div>
  );
}
