import { cn } from "@/lib/utils";

export type HouseLayer = "reach" | "rankings" | "reputation" | "all";

const REPUTATION = [
  "01  Google profile",
  "02  Reviews",
  "03  Website in five seconds",
  "09  When the phone rings",
];

const RANKINGS = [
  "04  A page for every service",
  "05  Posting, every week",
  "06  AI visibility",
  "07  Keywords + rankings",
  "08  Citations + local links",
];

const REACH = ["After all that — ads that convert"];

export const HOUSE_PRICING = [
  {
    layer: "reach" as const,
    kicker: "Reach · the roof",
    name: "Pro",
    tag: "Search ads / Local Service Ads",
    price: "$997",
    items: ["Google Search ads", "Local Service Ads", "Conversion tracking"],
  },
  {
    layer: "rankings" as const,
    kicker: "Ranking · the frame",
    name: "Growth",
    tag: "Targeted SEO",
    price: "$497",
    items: ["Google Business Profile", "Review generation", "Citations + keywords"],
  },
  {
    layer: "reputation" as const,
    kicker: "Reputation · the foundation",
    name: "Essentials",
    tag: "AI website + SEO agents",
    price: "$297",
    items: ["Custom AI website", "Built for Google + AI search", "SEO agents — auto-updates"],
  },
];

export const HOUSE_PATHS = [
  {
    layer: "reach" as const,
    kicker: "Reach · the roof",
    title: "Ready for ads",
    body: "Some of you have the foundation and the frame — and you're ready for the roof. Ads, only then.",
  },
  {
    layer: "rankings" as const,
    kicker: "Ranking · the frame",
    title: "Foundation + the frame",
    body: "Some of you need the foundation and a tune-up on the frame. We fix both.",
  },
  {
    layer: "reputation" as const,
    kicker: "Reputation · the foundation",
    title: "Foundation only",
    body: "Some of you just need the foundation. Reputation. We build that, and we stop there.",
  },
];

export function HouseGraphic({
  highlight = "all",
  showItems = false,
  mode = "plain",
  compact = false,
  className,
}: {
  highlight?: HouseLayer;
  showItems?: boolean;
  mode?: "plain" | "items" | "pricing" | "paths";
  compact?: boolean;
  className?: string;
}) {
  const lists = showItems || mode === "items";
  const aside = mode === "pricing" || mode === "paths" || lists;

  return (
    <div
      className={cn(
        "grid h-full min-h-0 items-center gap-8",
        aside ? "grid-cols-[1.05fr_0.95fr] max-[700px]:grid-cols-1" : "grid-cols-1",
        className,
      )}
    >
      <HouseSvg highlight={highlight} compact={compact} aside={aside} />
      {lists ? (
        <div className="flex flex-col gap-4">
          <LayerList
            title="Reach"
            items={REACH}
            active={highlight === "all" || highlight === "reach"}
            accent
          />
          <LayerList
            title="Ranking · 4–8"
            items={RANKINGS}
            active={highlight === "all" || highlight === "rankings"}
          />
          <LayerList
            title="Reputation · 1, 2, 3, 9"
            items={REPUTATION}
            active={highlight === "all" || highlight === "reputation"}
          />
        </div>
      ) : null}
      {mode === "pricing" ? <PricingAside highlight={highlight} /> : null}
      {mode === "paths" ? <PathsAside highlight={highlight} /> : null}
    </div>
  );
}

export function HousePyramid(props: {
  highlight?: HouseLayer;
  showItems?: boolean;
}) {
  return <HouseGraphic highlight={props.highlight} showItems={props.showItems} mode={props.showItems ? "items" : "plain"} />;
}

function HouseSvg({
  highlight,
  compact,
  aside,
}: {
  highlight: HouseLayer;
  compact?: boolean;
  aside?: boolean;
}) {
  const dim = (layer: Exclude<HouseLayer, "all">) => highlight !== "all" && highlight !== layer;

  return (
    <svg
      viewBox="0 -8 640 710"
      className={cn(
        "mx-auto h-full w-full",
        aside
          ? "max-h-[470px] max-[700px]:max-h-[220px]"
          : compact
            ? "max-h-[620px]"
            : "max-h-[740px]",
      )}
      role="img"
      aria-label="House in three layers: reputation at the foundation, ranking in the middle, reach on the roof"
    >
      <ellipse cx="330" cy="662" rx="210" ry="18" fill="rgba(0,0,0,0.45)" />

      <g className={cn("transition-opacity duration-[var(--motion-fast)]", dim("reputation") && "opacity-25")}>
        <polygon points="508,418 576,378 576,598 508,638" fill="var(--color-house-rep-side)" />
        <polygon points="148,418 508,418 508,638 148,638" fill="var(--color-house-rep)" />
        <polygon points="148,418 508,418 576,378 216,378" fill="var(--color-house-rep-top)" />
        <polygon points="132,638 524,638 548,658 108,658" fill="var(--color-house-void)" />
        <polygon points="524,638 576,598 600,618 548,658" fill="var(--color-house-rep-side)" />
        <rect x="292" y="528" width="72" height="110" rx="3" fill="var(--color-house-void)" />
        <rect x="172" y="508" width="48" height="48" fill="var(--color-house-void)" />
        <rect x="436" y="508" width="48" height="48" fill="var(--color-house-void)" />
        <rect x="172" y="552" width="48" height="4" fill="var(--color-accent)" />
        <rect x="436" y="552" width="48" height="4" fill="var(--color-accent)" />
        <circle cx="354" cy="586" r="4" fill="var(--color-accent)" />
        <text
          x="328"
          y="478"
          textAnchor="middle"
          fill="var(--color-fg)"
          fontFamily="Oswald, sans-serif"
          fontSize="26"
          fontWeight="600"
          letterSpacing="4"
        >
          REPUTATION
        </text>
      </g>

      <g className={cn("transition-opacity duration-[var(--motion-fast)]", dim("rankings") && "opacity-25")}>
        <polygon points="508,228 576,188 576,378 508,418" fill="var(--color-house-rank-side)" />
        <polygon points="148,228 508,228 508,418 148,418" fill="var(--color-house-rank)" />
        <polygon points="148,228 508,228 576,188 216,188" fill="var(--color-house-rank-top)" />
        <rect x="168" y="258" width="56" height="72" fill="var(--color-house-void)" />
        <rect x="432" y="258" width="56" height="72" fill="var(--color-house-void)" />
        <rect x="168" y="326" width="56" height="4" fill="var(--color-accent)" />
        <rect x="432" y="326" width="56" height="4" fill="var(--color-accent)" />
        <line x1="196" y1="258" x2="196" y2="330" stroke="var(--color-house-rank)" strokeWidth="3" />
        <line x1="460" y1="258" x2="460" y2="330" stroke="var(--color-house-rank)" strokeWidth="3" />
        <text
          x="328"
          y="324"
          textAnchor="middle"
          fill="var(--color-fg)"
          fontFamily="Oswald, sans-serif"
          fontSize="30"
          fontWeight="600"
          letterSpacing="4"
        >
          RANKING
        </text>
      </g>

      <g className={cn("transition-opacity duration-[var(--motion-fast)]", dim("reach") && "opacity-25")}>
        <polygon points="328,28 536,210 604,170 396,-4" fill="var(--color-house-reach-side)" />
        <polygon points="328,28 116,210 540,210" fill="var(--color-accent)" />
        <polygon points="328,28 540,210 564,196 328,8" fill="var(--color-accent-soft)" />
        <polygon points="328,28 116,210 92,196 328,8" fill="var(--color-house-reach-dark)" />
        <rect x="478" y="58" width="28" height="82" fill="var(--color-house-reach-dark)" />
        <rect x="472" y="50" width="40" height="14" fill="var(--color-house-void)" />
        <text
          x="328"
          y="168"
          textAnchor="middle"
          fill="var(--color-accent-fg)"
          fontFamily="Oswald, sans-serif"
          fontSize="32"
          fontWeight="700"
          letterSpacing="5"
        >
          REACH
        </text>
      </g>
    </svg>
  );
}

function LayerList({
  title,
  items,
  active,
  accent,
}: {
  title: string;
  items: string[];
  active: boolean;
  accent?: boolean;
}) {
  return (
    <div className={cn("transition-opacity duration-[var(--motion-fast)]", !active && "opacity-30")}>
      <p
        className={cn(
          "font-display text-kicker tracking-kicker uppercase",
          accent ? "text-accent" : "text-subtle",
        )}
      >
        {title}
      </p>
      <ul className="mt-1.5 space-y-0.5">
        {items.map((item) => (
          <li key={item} className="text-base leading-snug text-fg">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PricingAside({ highlight }: { highlight: HouseLayer }) {
  return (
    <div className="flex flex-col justify-center gap-3">
      {HOUSE_PRICING.map((plan) => {
        const on = highlight === "all" || highlight === plan.layer;
        return (
          <article
            key={plan.name}
            className={cn(
              "rounded-lg px-6 py-5 transition-opacity duration-[var(--motion-fast)]",
              plan.layer === "reach"
                ? "bg-surface-warm shadow-[0_0_0_1px_var(--color-accent)]"
                : "bg-surface shadow-[var(--shadow-border)]",
              !on && "opacity-30",
            )}
          >
            <p className="font-display text-kicker tracking-kicker text-accent uppercase">{plan.kicker}</p>
            <div className="mt-2 flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-semibold uppercase leading-snug tracking-display">
                  {plan.name}
                </h2>
                <p className="mt-1 text-sm text-muted">{plan.tag}</p>
              </div>
              <p className="text-right">
                <span className="font-display text-3xl font-semibold text-accent">{plan.price}</span>
                <span className="block text-sm text-subtle">/mo</span>
              </p>
            </div>
            <ul className="mt-3 space-y-1 text-sm text-muted">
              {plan.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}

function PathsAside({ highlight }: { highlight: HouseLayer }) {
  return (
    <div className="flex flex-col justify-center gap-3">
      {HOUSE_PATHS.map((path) => {
        const on = highlight === "all" || highlight === path.layer;
        return (
          <article
            key={path.kicker}
            className={cn(
              "rounded-lg bg-surface px-6 py-6 shadow-[var(--shadow-border)] transition-opacity duration-[var(--motion-fast)]",
              !on && "opacity-30",
            )}
          >
            <p className="font-display text-kicker tracking-kicker text-accent uppercase">{path.kicker}</p>
            <h2 className="mt-2 font-display text-2xl font-semibold uppercase leading-snug tracking-display">
              {path.title}
            </h2>
            <p className="mt-3 text-lg leading-normal text-fg">{path.body}</p>
          </article>
        );
      })}
    </div>
  );
}
