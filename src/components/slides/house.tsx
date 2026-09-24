import { useDeck } from "@/lib/deck-store";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Body, Display, HouseGraphic, Kicker, SlidePad } from "./primitives";
import { NINE as NINE_CHECKS } from "@/lib/nine";

const NINE = [
  { n: 1, label: "Google profile", layer: "Reputation" },
  { n: 2, label: "Reviews", layer: "Reputation" },
  { n: 3, label: "Website in five seconds", layer: "Reputation" },
  { n: 4, label: "A page for every service", layer: "Ranking" },
  { n: 5, label: "Posting, every week", layer: "Ranking" },
  { n: 6, label: "AI visibility", layer: "Ranking" },
  { n: 7, label: "Keywords + rankings", layer: "Ranking" },
  { n: 8, label: "Citations + local links", layer: "Ranking" },
  { n: 9, label: "When the phone rings", layer: "Reputation" },
];

export function ScoreRecapSlide() {
  const marks = useDeck((s) => s.marks);
  const toggle = useDeck((s) => s.toggleMark);
  const score = useDeck((s) => s.score());
  return (
    <SlidePad>
      <Kicker>Add it up</Kicker>
      <div className="mt-3 flex items-end justify-between gap-6">
        <Display className="text-5xl">Your nine.</Display>
        <p className="font-display text-5xl font-semibold tracking-display text-accent slide-num">
          {score}
          <span className="text-subtle"> / 9</span>
        </p>
      </div>
      <ol className="mt-8 grid flex-1 grid-cols-1 gap-3 min-[901px]:grid-cols-3">
        {NINE.map((item) => {
          const on = Boolean(marks[item.n]);
          return (
            <li key={item.n}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(item.n);
                }}
                className={cn(
                  "flex w-full items-center gap-4 rounded-lg px-5 py-4 text-left transition-colors duration-[var(--motion-quick)]",
                  on ? "bg-surface-2" : "bg-surface",
                )}
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-sm",
                    on ? "bg-accent text-accent-fg" : "bg-bg text-subtle",
                  )}
                >
                  {on ? (
                    <Check className="size-4" strokeWidth={2.5} />
                  ) : (
                    <span className="slide-num text-sm">{item.n}</span>
                  )}
                </span>
                <span>
                  <span className="block text-lg text-fg">{item.label}</span>
                  <span className="text-sm text-subtle">{item.layer}</span>
                </span>
              </button>
            </li>
          );
        })}
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
      <Body className="mt-3 max-w-[54ch]">
        I can help you wherever you are in the journey. I am not going to push ads on you if you don't
        need them.
      </Body>
      <div className="mt-5 min-h-0 flex-1">
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
      <Body className="mt-3 max-w-[46ch]">
        Foundation. Frame. Roof. Pick the level you need. Not more.
      </Body>
      <div className="mt-2 min-h-0 flex-1">
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
 * Right after the prices. From the 24 Sept critique: say exactly what each
 * price buys, and how the two plans together cover the nine. Every line is
 * from the plan copy in cjp-frontdesk (src/lib/plans.ts) or the sales scripts.
 */
export function WhatYouGetSlide() {
  const cols = [
    {
      name: "Essentials",
      price: "$297",
      count: "4 of the nine",
      lead: "The foundation.",
      checks: NINE_CHECKS.filter((c) => c.plan === "essentials"),
    },
    {
      name: "Growth",
      price: "$497",
      count: "All nine",
      lead: "Everything in Essentials, plus:",
      checks: NINE_CHECKS.filter((c) => c.plan === "growth"),
    },
  ];
  return (
    <SlidePad>
      <Kicker>What you actually get</Kicker>
      <Display className="mt-3 text-4xl">Check by check.</Display>
      <div className="mt-6 grid min-h-0 gap-5 min-[901px]:grid-cols-2">
        {cols.map((col) => (
          <section
            key={col.name}
            className={cn(
              "flex flex-col rounded-xl px-7 py-6",
              col.name === "Growth"
                ? "bg-surface-warm shadow-[0_0_0_2px_var(--color-accent)]"
                : "bg-surface shadow-[var(--shadow-border)]",
            )}
          >
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-display text-2xl font-semibold uppercase tracking-display">
                {col.name} <span className="text-accent">{col.price}</span>
                <span className="text-lg text-subtle">/mo</span>
              </p>
              <p className="font-display text-xl font-semibold uppercase tracking-display text-accent">{col.count}</p>
            </div>
            <p className="mt-1 text-base text-muted">{col.lead}</p>
            <ul className="mt-5 space-y-4">
              {col.checks.map((c) => (
                <li key={c.n} className="flex items-baseline gap-4">
                  <span className="slide-num w-9 shrink-0 font-display text-xl font-semibold text-accent">
                    {String(c.n).padStart(2, "0")}
                  </span>
                  <span className="text-lg leading-snug text-fg">{c.weDo}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-5 text-lg text-muted">
        Pro, $997: all nine, plus we run your Google ads. Month to month on all three.
      </p>
    </SlidePad>
  );
}
