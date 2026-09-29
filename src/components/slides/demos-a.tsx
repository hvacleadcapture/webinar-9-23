import type { CSSProperties, ReactNode } from "react";
import { Check, Globe, MapPin, Navigation, Phone, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { appear, prog } from "./demo-kit";

/**
 * Demos for checks 1-5, second pass (29 Sept 2026, later): slower, built on
 * real client captures, and each one ENDS on its finished frame and holds it
 * (no fade to screenshots any more).
 *
 * Pure functions of t (ms since the slide mounted). Anything that appears
 * mid-demo is mounted with `t > x` and animates with appear(0).
 *
 * Real sources, captured 29 Sept 2026 into /public/slides/proof:
 *   - Google profiles: /slides/user-added/{93-electric,benrishi,two-koats}-gbp.png
 *     (names, ratings, review counts, categories, hours, Two Koats' address,
 *     phone and description as shown there; blurred fields left out).
 *   - Sites: megarlockconstruction.com, autoglossnc.com, gordoncraneco.com
 *     (full-page, 800px wide).
 *   - R&D's service, town and blog pages, rdplumbingco.com (top of page).
 * Benrishi: no licence talk, per the Benrishi rules.
 */

const pop = appear(0, 420);

/** The kit's rAF clock can hand the first frame a slightly negative t. */
const clampT = (t: number) => (Number.isFinite(t) && t > 0 ? t : 0);

function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full bg-black/60 px-2.5 py-0.5 text-[0.8rem] uppercase tracking-wide text-white/80",
        className,
      )}
    >
      {children}
    </span>
  );
}

function Stars({ n = 5, className }: { n?: number; className?: string }) {
  return (
    <span className={cn("inline-flex", className)}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn("size-[1em]", i < Math.round(n) ? "fill-[#fbbc04] text-[#fbbc04]" : "fill-[#dadce0] text-[#dadce0]")}
          aria-hidden
        />
      ))}
    </span>
  );
}

/** Browser chrome sized to its screenshot (the kit's Browser has a fixed height, which crops page captures). */
function Frame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-[0_0_0_2px_#2e2e2e,0_30px_70px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-2 bg-[#e4e4e0] px-3 py-2">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 flex-1 truncate rounded-md bg-white px-2.5 py-0.5 text-[0.85rem] text-[#555]">{url}</span>
      </div>
      {children}
    </div>
  );
}

/** Fades a block in over 600ms from `at`. */
function fade(t: number, at: number, ms = 600): CSSProperties {
  const k = prog(t, at, ms);
  return { opacity: k, transform: `translateY(${(1 - k) * 10}px)` };
}

/* ------------------------------------------------------------------------ */
/*  1 · Google profile, set up right: 93 Electric → Benrishi → Two Koats     */
/* ------------------------------------------------------------------------ */

type Gbp = {
  strip: string;
  name: string;
  rating: string;
  count: number;
  category: string;
  address?: string;
  phone?: string;
  hours: string;
  about?: string;
  button: string;
};

const GBPS: Gbp[] = [
  {
    strip: "/slides/proof/gbp-93-strip.png",
    name: "93 Electric",
    rating: "5.0",
    count: 66,
    category: "Electrician in Ravalli County, Montana",
    address: "Stevensville, MT 59870",
    phone: "(406) 519-9513",
    hours: "Closes 7 PM",
    button: "Book online",
  },
  {
    strip: "/slides/proof/gbp-benrishi-strip.png",
    name: "Benrishi Electrical",
    rating: "5.0",
    count: 177,
    category: "Electrician",
    hours: "Closes 5 PM",
    button: "Save",
  },
  {
    strip: "/slides/proof/gbp-twokoats-strip.png",
    name: "Two Koats Painting, LLC",
    rating: "5.0",
    count: 160,
    category: "Painter in Virginia Beach, Virginia",
    address: "249 Central Park Ave Ste 300-68, Virginia Beach, VA 23462",
    phone: "(757) 288-1905",
    hours: "",
    about: "Residential and commercial painter offering interior and exterior painting services and house painting.",
    button: "Directions",
  },
];

const PER_PROFILE = 6200;
export const PROFILE_MS = 23_000;

const CHECKLIST = ["Category", "Hours", "Phone + website", "Photos", "Weekly post"];

/** The Google knowledge-panel look. `k` = seconds into this profile's build (ms). */
function GbpPanel({ g, k }: { g: Gbp; k: number }) {
  const on = (at: number) => k >= at;
  return (
    <div className="overflow-hidden rounded-2xl bg-white text-[#202124] shadow-[0_0_0_1px_#dadce0,0_30px_70px_-30px_rgba(0,0,0,0.9)]">
      <div className="relative">
        <img src={g.strip} alt="" className="h-[118px] w-full object-cover" />
        {on(3600) ? (
          <span style={pop} className="absolute bottom-2 left-2 rounded-full bg-[#1a73e8] px-3 py-1 text-[0.85rem] font-medium text-white">
            + Job photos added
          </span>
        ) : null}
      </div>
      <div className="px-5 pt-3 pb-4">
        <p className="text-[1.45rem] leading-tight">{g.name}</p>
        <p className="mt-1 flex items-center gap-1.5 text-[1rem]">
          {g.rating} <Stars className="text-[1rem]" /> <span className="text-[#1a0dab]">{g.count} Google reviews</span>
        </p>
        <p className="min-h-[1.4rem] text-[0.98rem] text-[#70757a]" style={fade(k, 500)}>
          {g.category}
        </p>
        <div className="mt-3 flex gap-2" style={fade(k, 1300)}>
          {[
            [Globe, "Website"],
            [Navigation, g.button === "Book online" ? "Directions" : g.button],
            [Phone, "Call"],
          ].map(([Icon, label]) => {
            const I = Icon as typeof Globe;
            return (
              <span key={label as string} className="flex items-center gap-1.5 rounded-full border border-[#dadce0] px-3 py-1.5 text-[0.9rem] text-[#1a73e8]">
                <I className="size-4" aria-hidden />
                {label as string}
              </span>
            );
          })}
        </div>
        {g.button === "Book online" ? (
          <p className="mt-2 rounded-full bg-[#1a73e8] py-1.5 text-center text-[0.95rem] font-medium text-white" style={fade(k, 1600)}>
            Book online
          </p>
        ) : null}
        <div className="mt-3 space-y-1 border-t border-[#e8eaed] pt-3 text-[0.92rem]" style={fade(k, 2200)}>
          {g.about ? <p className="text-[#3c4043]">{g.about}</p> : null}
          {g.address ? (
            <p>
              <b>Address:</b> {g.address}
            </p>
          ) : null}
          {g.phone ? (
            <p>
              <b>Phone:</b> <span className="text-[#1a0dab]">{g.phone}</span>
            </p>
          ) : null}
          {g.hours ? (
            <p>
              <b>Hours:</b> <span className="text-[#188038]">Open</span> · {g.hours}
            </p>
          ) : null}
        </div>
        {on(4400) ? (
          <div style={pop} className="mt-3 rounded-lg border border-[#dadce0] px-3 py-2">
            <p className="text-[0.8rem] uppercase tracking-wide text-[#70757a]">Updates · this week</p>
            <p className="text-[0.95rem]">New post published to the profile</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ProfileDemo(t: number) {
  t = clampT(t);
  const idx = Math.min(2, Math.floor(t / PER_PROFILE));
  const k = t - idx * PER_PROFILE;
  const final = t >= PER_PROFILE * 3;
  if (final) {
    return (
      <div className="flex h-full flex-col gap-2.5">
        <p style={pop} className="font-display text-xl font-semibold uppercase tracking-display text-fg">
          Three real profiles. <span className="text-accent">Every box filled.</span>
        </p>
        {GBPS.map((g, i) => (
          <div
            key={g.name}
            style={appear(i * 200, 420)}
            className="flex items-center gap-3 overflow-hidden rounded-xl bg-white p-2.5 text-[#202124] shadow-[0_0_0_1px_#dadce0]"
          >
            <img src={g.strip} alt="" className="h-[88px] w-[150px] shrink-0 rounded-lg object-cover object-left" />
            <div className="min-w-0">
              <p className="truncate text-[1.15rem] leading-tight">{g.name}</p>
              <p className="mt-0.5 flex items-center gap-1 text-[0.92rem]">
                {g.rating} <Stars className="text-[0.9rem]" /> <span className="text-[#1a0dab]">{g.count} reviews</span>
              </p>
              <p className="truncate text-[0.88rem] text-[#70757a]">{g.category}</p>
              <p className="mt-1 flex items-center gap-1 text-[0.85rem] text-[#188038]">
                <Check className="size-3.5" strokeWidth={3} aria-hidden /> Optimized
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  const g = GBPS[idx];
  const done = CHECKLIST.filter((_, i) => k >= 700 + i * 900).length;
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-[1rem] text-muted">
          Setting up <span className="text-fg">{g.name}</span>
        </p>
        <span className="text-[0.95rem] text-subtle">{idx + 1} of 3</span>
      </div>
      <div key={idx} style={appear(0, 500)}>
        <GbpPanel g={g} k={k} />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {CHECKLIST.map((c, i) => (
          <span
            key={c}
            className={cn(
              "flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.85rem] transition-colors",
              i < done ? "bg-accent text-accent-fg" : "bg-surface-2 text-subtle",
            )}
          >
            {i < done ? <Check className="size-3.5" strokeWidth={3} aria-hidden /> : null}
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/*  2 · Reviews: a painter nearby vs Two Koats, and the automatic ask        */
/* ------------------------------------------------------------------------ */

/**
 * Two Koats: 5.0 · 160 Google reviews (two-koats-gbp.png). The painter nearby
 * is unnamed and tagged Illustration. No review text is invented: the new
 * review shows as stars only.
 */
export const REVIEWS_MS = 19_000;

function ReviewHeader({
  name,
  rating,
  count,
  last,
  strong,
  tag,
}: {
  name: string;
  rating: number;
  count: number;
  last: string;
  strong?: boolean;
  tag?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-xl bg-white px-4 py-3 text-[#202124]",
        strong ? "shadow-[0_0_0_3px_var(--color-accent)]" : "shadow-[0_0_0_1px_#dadce0]",
      )}
    >
      {tag ? <Tag className="absolute top-2 right-2 bg-[#f1f3f4] text-[#5f6368]">{tag}</Tag> : null}
      <p className="text-[1.15rem] leading-tight">{name}</p>
      <p className="mt-1 flex items-center gap-1.5 text-[1rem]">
        {rating.toFixed(1)} <Stars n={rating} className="text-[1rem]" />
        <span className="text-[#1a0dab]">{count} Google reviews</span>
      </p>
      <p className="text-[0.88rem] text-[#70757a]">{last}</p>
    </div>
  );
}

export function ReviewsDemo(t: number) {
  t = clampT(t);
  if (t >= 13_500) {
    return (
      <div className="flex h-full flex-col justify-center gap-4">
        <p style={pop} className="font-display text-xl font-semibold uppercase tracking-display text-fg">
          Same town. Same trade. <span className="text-accent">Who gets the call?</span>
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div style={appear(150)} className="rounded-xl bg-white px-4 py-5 text-center text-[#202124] shadow-[0_0_0_1px_#dadce0]">
            <p className="text-[0.95rem] text-[#70757a]">A painter nearby</p>
            <p className="slide-num mt-1 font-display text-[4rem] leading-none font-semibold">4</p>
            <p className="text-[0.95rem]">Google reviews</p>
            <Stars n={4} className="mt-2 text-[1.1rem]" />
            <p className="mt-2 text-[0.8rem] text-[#9aa0a6]">Illustration</p>
          </div>
          <div style={appear(400)} className="rounded-xl bg-white px-4 py-5 text-center text-[#202124] shadow-[0_0_0_3px_var(--color-accent)]">
            <p className="text-[0.95rem] text-[#70757a]">Two Koats Painting</p>
            <p className="slide-num mt-1 font-display text-[4rem] leading-none font-semibold text-[#188038]">160</p>
            <p className="text-[0.95rem]">Google reviews</p>
            <Stars className="mt-2 text-[1.1rem]" />
            <p className="mt-2 text-[0.8rem] text-[#9aa0a6]">5.0 · Virginia Beach</p>
          </div>
        </div>
        <p style={appear(900)} className="text-center text-[1.1rem] text-muted">
          Every job gets asked. <span className="text-fg">That&rsquo;s how you get to 160.</span>
        </p>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col gap-3">
      <p className="text-[1rem] text-muted">&ldquo;painter virginia beach&rdquo;</p>
      <div style={fade(t, 200)}>
        <ReviewHeader name="A painter nearby" rating={4} count={4} last="Last review: 8 months ago" tag="Illustration" />
      </div>
      <div style={fade(t, 1200)}>
        <ReviewHeader name="Two Koats Painting, LLC" rating={5} count={160} last="Painter in Virginia Beach, Virginia" strong />
      </div>
      {t > 3200 ? (
        <div style={pop} className="flex flex-1 flex-col gap-2.5 rounded-2xl bg-bg-elevated px-4 py-3 shadow-[var(--shadow-border)]">
          <div className="flex items-center justify-between">
            <p className="text-[0.95rem] text-subtle">Customer&rsquo;s phone</p>
            <Tag className="bg-surface-2 text-subtle">How the ask works</Tag>
          </div>
          <p className="self-center rounded-full bg-surface-2 px-3 py-1 text-[0.9rem] text-fg">
            <Check className="mr-1 inline size-4 text-accent" strokeWidth={3} aria-hidden />
            Job marked done
          </p>
          {t > 4800 ? (
            <p style={pop} className="max-w-[90%] self-end rounded-2xl rounded-br-md bg-accent px-4 py-2.5 text-[1rem] leading-snug text-accent-fg">
              Thanks for choosing Two Koats! How did we do? Tap a star to leave a Google review.
            </p>
          ) : null}
          {t > 7000 ? (
            <div className="flex gap-1.5 self-start px-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  style={appear(i * 260, 360)}
                  className="size-9 fill-[#fbbc04] text-[#fbbc04]"
                  aria-hidden
                />
              ))}
            </div>
          ) : null}
          {t > 9600 ? (
            <div style={pop} className="rounded-xl bg-white px-4 py-2.5 text-[#202124]">
              <p className="text-[0.85rem] text-[#70757a]">Posted to Google · Two Koats Painting</p>
              <p className="flex items-center gap-1.5 text-[1rem]">
                <Stars className="text-[1rem]" /> New 5-star review · just now
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/*  3 · Website in five seconds: Garlock, AutoGloss, Gordon Crane, all on    */
/*  screen; focus moves one at a time and ends back on Garlock's hero.       */
/* ------------------------------------------------------------------------ */

type Site = { src: string; url: string; name: string; checks: string[]; depth: number };

/** depth = how far down the focused site scrolls, as a % of the page's own height. */
const SITES: Site[] = [
  {
    src: "/slides/proof/garlock-scroll.jpg",
    url: "megarlockconstruction.com",
    name: "M.E. Garlock Construction",
    checks: ["Custom homes", "Boonville + North Country", "Tap to call"],
    depth: 20,
  },
  {
    src: "/slides/proof/autogloss-scroll.jpg",
    url: "autoglossnc.com",
    name: "AutoGloss",
    checks: ["Detailing + ceramic coating", "Fuquay-Varina", "Tap to call"],
    depth: 20,
  },
  {
    src: "/slides/proof/gordon-scroll.jpg",
    url: "gordoncraneco.com",
    name: "Gordon Crane Co.",
    checks: ["Crane service", "Southwest Florida", "Tap to call"],
    depth: 26,
  },
];

const PER_SITE = 9400;
const BACK_TO_GARLOCK = PER_SITE * 3;
export const WEBSITE_MS = 32_500;

/** A browser whose viewport is `h` px tall, showing a full-page capture scrolled `y`% down. */
function Viewport({ site, h, y, small }: { site: Site; h: number; y: number; small?: boolean }) {
  return (
    <div className={cn("overflow-hidden rounded-lg bg-white", small ? "shadow-[0_0_0_1px_#2e2e2e]" : "shadow-[0_0_0_2px_var(--color-accent),0_30px_70px_-30px_rgba(0,0,0,0.9)]")}>
      <div className={cn("flex items-center gap-1.5 bg-[#e4e4e0]", small ? "px-2 py-1" : "px-3 py-2")}>
        <span className={cn("rounded-full bg-[#ff5f57]", small ? "size-1.5" : "size-2.5")} />
        <span className={cn("rounded-full bg-[#febc2e]", small ? "size-1.5" : "size-2.5")} />
        <span className={cn("rounded-full bg-[#28c840]", small ? "size-1.5" : "size-2.5")} />
        <span className={cn("ml-1.5 flex-1 truncate rounded bg-white text-[#555]", small ? "px-1.5 text-[0.65rem]" : "px-2.5 py-0.5 text-[0.85rem]")}>{site.url}</span>
      </div>
      <div className="overflow-hidden" style={{ height: h }}>
        <img src={site.src} alt={site.name} className="block w-full" style={{ transform: `translateY(-${y}%)` }} />
      </div>
    </div>
  );
}

export function WebsiteDemo(t: number) {
  t = clampT(t);
  const back = t >= BACK_TO_GARLOCK;
  const idx = back ? 0 : Math.min(2, Math.floor(t / PER_SITE));
  const k = back ? 6000 : t - idx * PER_SITE;
  const s = SITES[idx];
  // land on the hero and hold while the clock runs, slow scroll, ease back up
  const down = back ? 0 : prog(k, 5400, 2600);
  const up = back ? 0 : prog(k, 8000, 1000);
  const y = s.depth * down * (1 - up);
  const secs = Math.max(0, 5 - Math.floor(k / 1000));
  const others = SITES.filter((_, i) => i !== idx);
  return (
    <div className="flex h-full flex-col gap-3">
      <p className="text-[1rem] text-muted">
        {back ? (
          <>
            Five seconds. <span className="text-fg">They know who you are.</span>
          </>
        ) : (
          <>
            <span className="text-fg">{s.name}</span> · the five-second test
          </>
        )}
      </p>
      <div className="grid grid-cols-[1fr_190px] gap-3">
        <div className="relative">
          <div key={`${idx}-${back}`} style={appear(0, 600)}>
            <Viewport site={s} h={372} y={y} />
          </div>
          {!back && k < 5200 ? (
            <span className="slide-num absolute top-12 right-3 flex size-14 items-center justify-center rounded-full bg-accent font-display text-3xl font-semibold text-accent-fg shadow-lg">
              {secs}
            </span>
          ) : null}
        </div>
        <div className="flex flex-col gap-3">
          {others.map((o) => (
            <div key={o.url} className="opacity-70">
              <Viewport site={o} h={150} y={0} small />
              <p className="mt-1 truncate text-[0.8rem] text-subtle">{o.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {s.checks.map((c, i) =>
          back || k > 1000 + i * 1200 ? (
            <span key={`${idx}-${c}`} style={pop} className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-[0.92rem] font-semibold text-accent-fg">
              <Check className="size-4" strokeWidth={3} aria-hidden />
              {c}
            </span>
          ) : null,
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/*  4 · A page for every service: R&D's real pages                           */
/* ------------------------------------------------------------------------ */

const PAGES = [
  { src: "/slides/proof/svc-emergency.jpg", url: "/services/emergency-service" },
  { src: "/slides/proof/svc-commercial.jpg", url: "/services/commercial-construction" },
  { src: "/slides/proof/svc-newcon.jpg", url: "/services/residential-new-construction" },
  { src: "/slides/proof/svc-repairs.jpg", url: "/services/repairs-and-service" },
  { src: "/slides/proof/svc-filtration.jpg", url: "/services/whole-house-water-filtration" },
  { src: "/slides/proof/area-fairhope.jpg", url: "/service-areas/fairhope" },
  { src: "/slides/proof/area-daphne.jpg", url: "/service-areas/daphne" },
  { src: "/slides/proof/area-gulf-shores.jpg", url: "/service-areas/gulf-shores" },
];
/** R&D has 5 service pages and 11 town pages (rdplumbingco.com nav, 29 Sept). */
const TOTAL_PAGES = 16;
const PER_PAGE = 2000;
export const SERVICE_PAGES_MS = 21_500;

export function ServicePagesDemo(t: number) {
  t = clampT(t);
  const gridAt = PER_PAGE * PAGES.length + 300;
  if (t >= gridAt) {
    return (
      <div className="flex h-full flex-col gap-3">
        <p style={pop} className="font-display text-xl font-semibold uppercase tracking-display text-fg">
          One page per job. <span className="text-accent">One per town.</span>
        </p>
        <div className="grid grid-cols-3 gap-2">
          {PAGES.map((p, i) => (
            <figure key={p.url} style={appear(i * 90, 380)}>
              <img src={p.src} alt="" className="aspect-[16/10] w-full rounded-md object-cover object-top shadow-[0_0_0_1px_#2e2e2e]" />
              <figcaption className="mt-0.5 truncate font-mono text-[0.75rem] text-subtle">{p.url}</figcaption>
            </figure>
          ))}
          <div style={appear(800, 380)} className="flex aspect-[16/10] flex-col items-center justify-center rounded-md bg-surface-2 text-center">
            <p className="slide-num font-display text-3xl font-semibold text-accent">+{TOTAL_PAGES - PAGES.length}</p>
            <p className="text-[0.8rem] text-muted">more town pages</p>
          </div>
        </div>
        <p style={appear(1000)} className="mt-auto rounded-lg bg-surface px-4 py-3 text-[1.05rem] text-fg shadow-[var(--shadow-border)]">
          <span className="slide-num font-display text-2xl font-semibold text-accent">{TOTAL_PAGES}</span> pages Google can show for R&amp;D Plumbing
        </p>
      </div>
    );
  }
  const idx = Math.min(PAGES.length - 1, Math.floor(t / PER_PAGE));
  const p = PAGES[idx];
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <p className="text-[1rem] text-muted">rdplumbingco.com</p>
        <p className="text-[1rem] text-fg">
          <span className="slide-num font-display text-2xl font-semibold text-accent">{idx + 1}</span> pages
        </p>
      </div>
      <div key={idx} style={appear(0, 450)}>
        <Frame url={`rdplumbingco.com${p.url}`}>
          <img src={p.src} alt="" className="block w-full" />
        </Frame>
      </div>
      <div className="grid grid-cols-8 gap-1">
        {PAGES.map((q, i) => (
          <div
            key={q.url}
            className={cn("h-10 overflow-hidden rounded-sm transition-opacity", i <= idx ? "opacity-100" : "opacity-15")}
          >
            <img src={q.src} alt="" className="h-full w-full object-cover object-top" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/*  5 · Posting: every Wednesday + Saturday, website blog + Google profile   */
/* ------------------------------------------------------------------------ */

/**
 * Real R&D posts and dates (rdplumbingco.com/blog, 29 Sept): Wed 2 Sept
 * "She Thought Her Septic Tank Was Bad…", Sat 5 Sept "Convenience Store
 * Plumbing…". R&D's Google profile was still in verification on 29 Sept, so
 * the Google-profile copy is tagged Illustration. Blog + Google only: no
 * Facebook or Instagram (Christian, 29 Sept).
 */
const WEEK = [
  ["Mon", "31"],
  ["Tue", "1"],
  ["Wed", "2"],
  ["Thu", "3"],
  ["Fri", "4"],
  ["Sat", "5"],
  ["Sun", "6"],
] as const;

const POSTS = [
  {
    day: "Wed",
    src: "/slides/proof/post-wed.jpg",
    title: "She Thought Her Septic Tank Was Bad. It Was the Line Under Her House.",
    at: 1200,
  },
  {
    day: "Sat",
    src: "/slides/proof/post-sat.jpg",
    title: "Convenience Store Plumbing: Food Service, Restrooms and Floor Drains",
    at: 7600,
  },
];
export const POSTING_MS = 19_500;

export function PostingDemo(t: number) {
  t = clampT(t);
  const finalAt = 14_000;
  const posted = POSTS.filter((p) => t >= p.at + 3600).map((p) => p.day);
  const active = [...POSTS].reverse().find((p) => t >= p.at);
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="grid grid-cols-7 gap-1">
        {WEEK.map(([d, n]) => {
          const done = posted.includes(d as "Wed" | "Sat");
          const live = active?.day === d && !done && t < finalAt;
          return (
            <div
              key={d}
              className={cn(
                "flex flex-col items-center rounded-md py-1.5 text-[0.85rem] transition-colors",
                done ? "bg-accent text-accent-fg" : live ? "bg-surface-2 text-fg shadow-[0_0_0_2px_var(--color-accent)]" : "bg-surface text-subtle",
              )}
            >
              <span>{d}</span>
              <span className="slide-num font-semibold">{done ? <Check className="size-4" strokeWidth={3} aria-hidden /> : n}</span>
            </div>
          );
        })}
      </div>
      {t >= finalAt ? (
        <div className="flex min-h-0 flex-1 flex-col gap-3">
          <div style={appear(0, 500)}>
            <Frame url="rdplumbingco.com/blog">
              <img src="/slides/proof/blog.jpg" alt="R&D Plumbing blog" className="block w-full" />
            </Frame>
          </div>
          <p style={appear(400)} className="font-display text-lg font-semibold uppercase tracking-display text-fg">
            Every Wednesday and Saturday. <span className="text-accent">You didn&rsquo;t touch it.</span>
          </p>
          <p style={appear(700)} className="text-[0.9rem] text-muted">Website blog + Google profile · R&amp;D Plumbing&rsquo;s real posts</p>
        </div>
      ) : active ? (
        <div key={active.day} className="flex min-h-0 flex-1 flex-col gap-3">
          <div style={appear(0, 500)}>
            <Frame url={`rdplumbingco.com/blog · ${active.day === "Wed" ? "Wed Sept 2" : "Sat Sept 5"}`}>
              <img src={active.src} alt="" className="block w-full" />
            </Frame>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["Website blog", active.at + 1400, false],
              ["Google profile", active.at + 2600, true],
            ].map(([label, at, illus]) =>
              t >= (at as number) ? (
                <div key={label as string} style={pop} className="rounded-lg bg-white px-3 py-2 text-[#202124]">
                  <p className="flex items-center gap-1.5 text-[0.9rem] font-semibold">
                    {label === "Website blog" ? <Globe className="size-4 text-[#1a73e8]" aria-hidden /> : <MapPin className="size-4 text-[#ea4335]" aria-hidden />}
                    {label as string}
                    <Check className="ml-auto size-4 text-[#188038]" strokeWidth={3} aria-hidden />
                  </p>
                  <p className="line-clamp-1 text-[0.8rem] text-[#5f6368]">{active.title}</p>
                  {illus ? <p className="text-[0.7rem] text-[#9aa0a6]">Illustration</p> : null}
                </div>
              ) : (
                <div key={label as string} className="rounded-lg bg-surface px-3 py-2 text-[0.9rem] text-subtle">
                  {label as string}
                </div>
              ),
            )}
          </div>
        </div>
      ) : (
        <p className="text-[1rem] text-muted">This week&rsquo;s posts…</p>
      )}
    </div>
  );
}
