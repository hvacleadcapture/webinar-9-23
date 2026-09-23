import { cn } from "@/lib/utils";
import { Display, Kicker, SlidePad } from "./primitives";

const PLANS = [
  {
    name: "Essentials",
    price: "$297",
    tag: "AI Website + SEO Agents",
    items: [
      "Custom AI website",
      "Built for Google rankings",
      "Optimized for AI search",
      "SEO agents — auto-updates",
    ],
  },
  {
    name: "Growth",
    price: "$497",
    tag: "Targeted SEO",
    popular: true,
    items: [
      "Google Business Profile",
      "Review generation",
      "Citation building",
      "Keyword tracking",
    ],
  },
  {
    name: "Pro",
    price: "$997",
    tag: "Search Ads / Local Service Ads",
    items: [
      "Google Search ads",
      "Local Service Ads",
      "Conversion tracking",
      "Monthly optimization",
    ],
  },
];

export function PricingSlide() {
  return (
    <SlidePad>
      <div className="flex items-end justify-between gap-6">
        <div>
          <Kicker>Price breakdown</Kicker>
          <Display className="mt-3 text-4xl min-[701px]:text-5xl">Pick the level you need.</Display>
        </div>
        <p className="hidden max-w-[32ch] text-right text-sm text-subtle min-[901px]:block">
          Agencies charge $1,500–$3,000 a month, plus a contract. This is less. If you don't want it, no
          problem.
        </p>
      </div>
      <div className="mt-8 grid flex-1 grid-cols-1 gap-4 min-[901px]:grid-cols-3">
        {PLANS.map((plan) => (
          <article
            key={plan.name}
            className={cn(
              "flex flex-col rounded-xl px-6 py-6",
              plan.popular
                ? "bg-surface-warm shadow-[0_0_0_2px_var(--color-accent)]"
                : "bg-surface shadow-[var(--shadow-border)]",
            )}
          >
            <p className="font-display text-kicker tracking-kicker text-subtle uppercase">{plan.name}</p>
            {plan.popular ? (
              <p className="mt-1 font-display text-kicker tracking-kicker text-accent uppercase">Most chosen</p>
            ) : null}
            <h2 className="mt-3 font-display text-2xl font-semibold uppercase leading-snug tracking-display">
              {plan.tag}
            </h2>
            <p className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-4xl font-semibold text-accent">{plan.price}</span>
              <span className="text-sm text-muted">/mo</span>
            </p>
            <ul className="mt-6 space-y-2.5 text-base leading-snug text-fg">
              {plan.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="mt-5 text-sm text-subtle">
        Website $1,000 buyout. Cancel any time. Agencies run $1,500–$3,000 a month. Million other guys
        need this. If you don't, no problem.
      </p>
    </SlidePad>
  );
}

export function AdsProofSlide() {
  return (
    <SlidePad>
      <Kicker>When you're ready for ads</Kicker>
      <div className="mt-3 flex items-end justify-between gap-8">
        <Display className="max-w-[15ch] text-4xl min-[701px]:text-5xl">Then we can rock and roll.</Display>
        <p className="hidden max-w-[34ch] text-right text-sm text-subtle min-[901px]:block">
          Ads make sense after the foundation is in place — not before.
        </p>
      </div>
      <div className="mt-8 grid min-h-0 flex-1 gap-5 min-[901px]:grid-cols-2">
        <figure className="flex min-h-0 flex-col overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
          <img src="/slides/user-added/a2z-leads.png" alt="Google Ads lead reporting for A2Z Concrete showing 25 leads" className="min-h-0 flex-1 w-full object-contain" />
          <figcaption className="px-5 py-4">
            <p className="font-display text-xl font-semibold uppercase">A2Z Concrete</p>
            <p className="mt-1 text-sm text-muted">25 tracked leads</p>
            <p className="mt-3 text-lg leading-normal text-fg">
              One job came out to <span className="font-semibold text-accent">$37,000</span> on roughly <span className="font-semibold">$3,000</span> in ad spend — about $500/month.
            </p>
          </figcaption>
        </figure>
        <figure className="flex min-h-0 flex-col overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
          <img src="/slides/user-added/richard-leads.png" alt="Lead reporting for Richard showing 49 results and 31 phone call leads" className="min-h-0 flex-1 w-full object-contain" />
          <figcaption className="px-5 py-4">
            <p className="font-display text-xl font-semibold uppercase">Richard</p>
            <p className="mt-1 text-sm text-muted">49 tracked results · 31 phone call leads</p>
            <p className="mt-3 text-lg leading-normal text-fg">
              Once the foundation is working, paid traffic gives us another lever to pull.
            </p>
          </figcaption>
        </figure>
      </div>
    </SlidePad>
  );
}

export function ProofClipsSlide() {
  const videos = [
    { id: "cnmCmZLwttY", name: "Micah", company: "Powered Up LLC" },
    { id: "iTytr2YkC_A", name: "Richard", company: "SmithStraw LLC" },
  ];

  return (
    <SlidePad>
      <Kicker>Don't take my word for it</Kicker>
      <Display className="mt-3 text-4xl min-[701px]:text-5xl">Hear it from the owners.</Display>
      <div className="mt-8 grid min-h-0 flex-1 grid-cols-1 gap-6 min-[901px]:grid-cols-2">
        {videos.map((video) => (
          <figure key={video.id} className="flex min-h-0 flex-col">
            <div data-no-advance className="min-h-0 flex-1 overflow-hidden rounded-xl bg-black shadow-[var(--shadow-border)]">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                title={`${video.name} testimonial — ${video.company}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <figcaption className="mt-3">
              <p className="font-display text-xl font-semibold uppercase">{video.name}</p>
              <p className="text-sm text-subtle">{video.company} · Click play</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </SlidePad>
  );
}

export function CtaSlide() {
  return (
    <SlidePad className="justify-center">
      <div className="grid items-center gap-12 min-[901px]:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Kicker>Where to go</Kicker>
          <Display className="mt-4 max-w-[14ch] text-5xl min-[701px]:text-6xl">
            Talk one-on-one. Or get to work.
          </Display>
          <ul className="mt-8 space-y-4 text-xl text-fg">
            <li className="flex gap-4">
              <span className="mt-2 block h-px w-8 shrink-0 bg-accent" />
              <span>Want to talk one-on-one? Book a call.</span>
            </li>
            <li className="flex gap-4">
              <span className="mt-2 block h-px w-8 shrink-0 bg-accent" />
              <span>Ready to work with us? Scan the code.</span>
            </li>
          </ul>
          <p className="mt-10 font-display text-kicker tracking-kicker text-subtle uppercase">
            By the way
          </p>
          <p className="mt-2 max-w-[28ch] font-display text-3xl font-semibold uppercase leading-snug tracking-display text-accent">
            50% off the first month
          </p>
          <p className="mt-3 text-lg text-muted">
            Anyone who signs up from this webinar. First month only.
          </p>
          <p className="mt-8 font-display text-2xl font-semibold uppercase tracking-display text-fg">
            go.cjp-enterprises.com/start
          </p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl bg-fg p-8">
          <img
            src="/slides/qr-start.png"
            alt="QR code to book a call or get started with CJP"
            className="aspect-square w-full max-w-[360px] max-[700px]:max-w-[220px]"
          />
          <p className="mt-5 font-display text-sm tracking-kicker text-accent-fg uppercase">
            Book a call · or get to work
          </p>
        </div>
      </div>
    </SlidePad>
  );
}
