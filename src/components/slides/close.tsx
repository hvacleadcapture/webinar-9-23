import { MessageSquare, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { CHECKLIST_URL } from "@/lib/nine";
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
    { id: "iTytr2YkC_A", name: "Micah", company: "Powered Up LLC" },
    { id: "cnmCmZLwttY", name: "Richard", company: "SmithStraw LLC" },
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

/**
 * The close. 28 Sept wording (Christian): I follow up with every one of you to
 * go over your audit; Thursday and Friday are open, so if you're free, type in
 * the chat; if not, I call you and we pick a time. Two cards, because it is
 * two paths and the viewer only has to find the one that is theirs.
 */
export function CtaSlide() {
  return (
    <SlidePad className="justify-center">
      <Kicker>I audited every one of your businesses</Kicker>
      <Display className="mt-4 max-w-[20ch] text-5xl min-[701px]:text-[4.9rem]">
        I&rsquo;ll follow up with each one of you to go over <span className="text-accent">your audit.</span>
      </Display>
      <div className="mt-10 grid gap-6 min-[901px]:grid-cols-2">
        <article className="rounded-xl bg-surface-warm px-9 py-7 shadow-[0_0_0_2px_var(--color-accent)]">
          <div className="flex items-center gap-4">
            <MessageSquare className="size-10 shrink-0 text-accent" strokeWidth={2} aria-hidden />
            <p className="font-display text-3xl font-semibold uppercase tracking-display text-fg">
              Thursday + Friday
            </p>
          </div>
          <p className="mt-5 text-2xl leading-snug text-fg">
            I have times open. Want one?{" "}
            <span className="font-semibold text-accent">Type it in the chat.</span>
          </p>
        </article>
        <article className="rounded-xl bg-surface px-9 py-7 shadow-[var(--shadow-border)]">
          <div className="flex items-center gap-4">
            <Phone className="size-10 shrink-0 text-accent" strokeWidth={2} aria-hidden />
            <p className="font-display text-3xl font-semibold uppercase tracking-display text-fg">
              Can&rsquo;t make those?
            </p>
          </div>
          <p className="mt-5 text-2xl leading-snug text-fg">
            I&rsquo;ll call each of you and we&rsquo;ll pick a time to go over your audit results.
          </p>
        </article>
      </div>
      <p className="mt-7 text-lg text-muted">
        Your checklist of the nine: <span className="text-fg">{CHECKLIST_URL}</span>
      </p>
    </SlidePad>
  );
}
