import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Body, Display, HouseGraphic, Kicker, SlidePad } from "./primitives";
import { NINE as NINE_CHECKS } from "@/lib/nine";

const NINE = [
  { n: 1, label: "Google profile", layer: "Reputation" },
  { n: 2, label: "Reviews", layer: "Reputation" },
  { n: 3, label: "Website in five seconds", layer: "Reputation" },
  { n: 4, label: "When the phone rings", layer: "Reputation" },
  { n: 5, label: "A page for every service", layer: "Ranking" },
  { n: 6, label: "Posting, every week", layer: "Ranking" },
  { n: 7, label: "AI visibility", layer: "Ranking" },
  { n: 8, label: "Keywords + rankings", layer: "Ranking" },
  { n: 9, label: "Citations + local links", layer: "Ranking" },
];

export function ScoreRecapSlide() {
  return (
    <SlidePad>
      <Kicker>Add it up</Kicker>
      <Display className="mt-3 text-4xl min-[701px]:text-[3.2rem]">Your nine. What did you get?</Display>
      <p className="mt-2 text-[1.35rem] text-muted">
        Put your number in the chat.{" "}
        <span className="text-fg">I already ran the real one on your business.</span>{" "}
        <span className="text-accent">You get it at the end.</span>
      </p>
      <ol className="mt-6 grid flex-1 grid-cols-1 gap-3 min-[901px]:grid-cols-3">
        {NINE.map((item) => (
          <li key={item.n} className="flex items-center gap-4 rounded-lg bg-surface px-5 py-4">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-sm bg-bg text-subtle">
              <span className="slide-num text-sm">{item.n}</span>
            </span>
            <span>
              <span className="block text-lg text-fg">{item.label}</span>
              <span className="text-sm text-subtle">{item.layer}</span>
            </span>
          </li>
        ))}
      </ol>
    </SlidePad>
  );
}

export function PyramidSlide() {
  return (
    <SlidePad>
      <Kicker>The house</Kicker>
      <Display className="mt-3 text-4xl">Reputation. Then ranking. Then reach.</Display>
      <div className="mt-4 min-h-0 flex-1">
        <HouseGraphic highlight="all" mode="items" />
      </div>
    </SlidePad>
  );
}

export function StructureSlide() {
  return (
    <SlidePad>
      <Kicker>How I work</Kicker>
      <Display className="mt-3 text-4xl">How I structure my services.</Display>
      <Body className="mt-2 max-w-[60ch] leading-snug">
        I can help you wherever you are in the journey. I am not going to push ads on you if you don't
        need them.
      </Body>
      <div className="mt-3 min-h-0 flex-1">
        <HouseGraphic mode="paths" />
      </div>
    </SlidePad>
  );
}

export function HousePricingSlide() {
  return (
    <SlidePad>
      <Kicker>Where each plan sits</Kicker>
      <Display className="mt-3 text-4xl">The house, with a price.</Display>
      <Body className="mt-2 max-w-[46ch]">
        Foundation. Frame. Roof. Pick the level you need. Not more.
      </Body>
      <div className="mt-1 min-h-0 flex-1">
        <HouseGraphic mode="pricing" />
      </div>
    </SlidePad>
  );
}

/**
 * Straight after the score, before any pitch. From the 24 Sept critique
 * (Hometown Air): dig into their pain in contractor terms, then show the
 * answer. No number of ours on this slide on purpose: they do the math on
 * their own jobs, so nothing here is a promise.
 */
export function MathSlide() {
  const qs = [
    "Are you booking more jobs than this time last year?",
    "If nothing changes, where is the business a year from now?",
    "What's your average job worth?",
  ];
  return (
    <SlidePad className="justify-center">
      <Kicker>Your numbers, not mine</Kicker>
      <Display className="mt-4 max-w-[18ch] text-5xl min-[701px]:text-[4.4rem]">
        What is it costing you?
      </Display>
      <ol className="mt-10 space-y-5">
        {qs.map((q, i) => (
          <li key={q} className="flex gap-5 text-xl text-fg">
            <span className="slide-num w-10 shrink-0 font-display font-semibold text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            {q}
          </li>
        ))}
      </ol>
      <p className="mt-10 rounded-lg bg-surface px-6 py-5 font-display text-3xl font-semibold uppercase tracking-display text-fg shadow-[var(--shadow-border)]">
        One more job a week from Google, no ad spend:
        <span className="mt-2 block text-accent">$______ × 52 = $______ a year</span>
      </p>
    </SlidePad>
  );
}

/**
 * Right after the prices. 29 Sept 2026: the old two-column version was a wall
 * of words. Now a grid: the nine down the side, the three plans across, a
 * check where the plan does it. Which plan covers which check comes from
 * nine.ts (`plan`), which mirrors cjp-frontdesk plans.ts.
 */
export function WhatYouGetSlide() {
  const plans = [
    { name: "Essentials", price: "$297", tier: 1 },
    { name: "Growth", price: "$497", tier: 2 },
    { name: "Pro", price: "$997", tier: 3 },
  ];
  const rows = [
    ...NINE_CHECKS.map((c) => ({ label: c.name.replace(/^Your (\w)/, (_, ch: string) => ch.toUpperCase()), from: c.plan === "essentials" ? 1 : 2 })),
    { label: "Google ads + Local Service Ads, run for you", from: 3 },
  ];
  return (
    <SlidePad>
      <div className="flex items-end justify-between gap-8">
        <div>
          <Kicker>What you actually get</Kicker>
          <Display className="mt-3 text-4xl">Check by check.</Display>
        </div>
        <p className="pb-1 text-lg text-muted">Month to month. All three.</p>
      </div>
      <div className="mt-5 min-h-0 overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th className="px-6 py-3" />
              {plans.map((p) => (
                <th key={p.name} className={cn("w-44 px-4 py-3 text-center", p.tier === 2 && "bg-surface-warm")}>
                  <span className="block font-display text-[1.4rem] font-semibold tracking-display text-fg uppercase">{p.name}</span>
                  <span className="block font-display text-[1.8rem] font-semibold text-accent">
                    {p.price}
                    <span className="text-[1rem] text-subtle">/mo</span>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.label} className="border-b border-line/60 last:border-b-0">
                <td className="px-6 py-[0.35rem] text-[1.3rem] text-fg">
                  <span className="slide-num mr-3 inline-block w-7 font-display text-accent">
                    {i < 9 ? String(i + 1).padStart(2, "0") : "+"}
                  </span>
                  {r.label}
                </td>
                {plans.map((p) => (
                  <td key={p.name} className={cn("px-4 py-[0.35rem]", p.tier === 2 && "bg-surface-warm")}>
                    {p.tier >= r.from ? (
                      <Check
                        className="mx-auto size-6 text-accent"
                        strokeWidth={3}
                        aria-label="Included"
                        style={{ opacity: 0, animation: `rise-in 360ms var(--ease-out) ${300 + p.tier * 500 + i * 60}ms forwards` }}
                      />
                    ) : (
                      <span className="mx-auto block h-0.5 w-4 bg-line-strong" aria-label="Not included" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SlidePad>
  );
}
