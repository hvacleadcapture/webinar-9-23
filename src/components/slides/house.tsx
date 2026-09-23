import { useDeck } from "@/lib/deck-store";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Body, Display, HouseGraphic, Kicker, SlidePad } from "./primitives";

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
      <div className="mt-5 min-h-0 flex-1">
        <HouseGraphic mode="pricing" />
      </div>
    </SlidePad>
  );
}
