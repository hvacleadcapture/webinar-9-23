import type { ReactNode } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDeck } from "@/lib/deck-store";
import { HouseGraphic } from "./house-pyramid";

export { HouseGraphic };

export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "font-display text-kicker font-medium tracking-kicker text-accent uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Display({
  children,
  className,
  as: Tag = "h1",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "p";
}) {
  return (
    <Tag
      className={cn(
        "font-display font-semibold uppercase leading-tight tracking-display text-fg",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Body({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-lg leading-normal text-muted", className)}>{children}</p>;
}

export function SlidePad({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "stagger-in flex h-full min-h-0 w-full flex-col px-16 py-14 max-[700px]:px-5 max-[700px]:pb-20 max-[700px]:pt-16",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Photo({
  src,
  alt,
  className,
  caption,
  contain,
}: {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
  contain?: boolean;
}) {
  return (
    <figure className={cn("flex min-h-0 min-w-0 flex-col", className)}>
      <img
        src={src}
        alt={alt}
        className={cn(
          "photo-frame min-h-0 w-full flex-1 rounded-lg",
          contain ? "object-contain bg-surface" : "object-cover object-top",
        )}
      />
      {caption ? <figcaption className="mt-3 shrink-0 text-sm text-subtle">{caption}</figcaption> : null}
    </figure>
  );
}

export function DashItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-4 text-xl font-medium text-fg">
      <span className="mt-2 block h-px w-8 shrink-0 bg-accent" />
      <span>{children}</span>
    </li>
  );
}

export function ScoreChip({ n }: { n: number }) {
  const on = useDeck((s) => s.marks[n]);
  const toggle = useDeck((s) => s.toggleMark);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggle(n);
      }}
      className={cn(
        "mt-8 inline-flex items-center gap-3 rounded-md px-4 py-3 text-sm font-semibold tracking-wide uppercase transition-[background-color,color,transform] duration-[var(--motion-quick)] ease-[var(--ease-out)] active:scale-[0.96]",
        on ? "bg-accent text-accent-fg" : "bg-surface-2 text-muted",
      )}
    >
      {on ? <Check className="size-4" strokeWidth={2.5} /> : <Minus className="size-4" />}
      {on ? "Point counted" : "Tap if you pass"}
    </button>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-line pt-5">
      <p className="font-display text-4xl font-semibold leading-tight tracking-display text-fg">
        {value}
      </p>
      <p className="mt-2 text-sm uppercase tracking-kicker text-muted">{label}</p>
    </div>
  );
}

export function NineRail({ active }: { active?: number }) {
  const items = [
    ["TIER 1", "Google profile", "Reviews", "Website, 5 seconds"],
    ["TIER 2", "A page per job", "Posting, every week"],
    ["TIER 3", "AI visibility", "Keywords + rankings", "Citations + links", "When the phone rings"],
  ] as const;

  let n = 0;
  return (
    <aside className="flex w-72 shrink-0 flex-col gap-6 border-l border-line pl-8 max-[700px]:hidden">
      {items.map(([tier, ...rest]) => (
        <div key={tier}>
          <p className="font-display text-kicker tracking-kicker text-subtle">{tier}</p>
          <ul className="mt-3 space-y-2">
            {rest.map((label) => {
              n += 1;
              const i = n;
              const is = active === i;
              return (
                <li key={label} className={cn("text-sm leading-snug", is ? "text-accent" : "text-muted")}>
                  <span className="slide-num mr-2 text-subtle">{String(i).padStart(2, "0")}</span>
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
}
