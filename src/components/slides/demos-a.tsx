import type { CSSProperties, ReactNode } from "react";
import { Check, Globe, MapPin, Navigation, Phone, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { appear, prog } from "./demo-kit";
import {
  Banner,
  FeedHead,
  LeadDetails,
  LeadRow,
  LockScreen,
  PhoneShell,
  ReviewAsk,
  ReviewsTab,
  SignalScreen,
  SmsScreen,
  TapRing,
  Tracker,
  riseIn,
  type FeedStatus,
} from "./signal-app";

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
export const REVIEWS_MS = 24_000;

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

/*
 * The ask, both sides, in Signal (29 Sept, later: "show the process of Signal
 * on the phone"). Two Koats' 5.0 / 160 is real; Linda, the Signal counts and
 * the review going up are an illustration of how the ask works, and say so.
 * No review text is written for anyone: the review posts as stars only.
 */
const TK = "Two Koats Painting, LLC";
const TK_ROW = { key: "linda", title: "Linda", sub: "Interior repaint · Virginia Beach", time: "2d ago", tel: true };
const ASK_TEXT = "Thanks for choosing Two Koats Painting, Linda! How did we do? Tap here: signal.cjp-enterprises.com/r/…";

function OwnerPhone({ t }: { t: number }) {
  const onReviews = t > 14300;
  const status: FeedStatus = t > 3400 ? "closed" : "contacted";
  const fresh = t > 15200;
  const asked = 18 + (t > 5000 ? 1 : 0);
  const toGoogle = 15 + (fresh ? 1 : 0);
  return (
    <PhoneShell scale={0.56} height={680}>
      <SignalScreen org={TK} view={onReviews ? "reviews" : "feed"} t={t} tapTab={{ view: "reviews", at: 14000 }} scroll={onReviews ? 0 : 150}>
        {onReviews ? (
          <ReviewsTab
            asked={asked}
            toGoogle={toGoogle}
            caught={1}
            rows={[
              ...(fresh ? [{ name: "Linda", date: "Sep 29", rating: 5, fresh: true, style: riseIn(t, 15200) }] : [{ name: "Linda", date: "Sep 29", rating: 0 }]),
              { name: "Past customer", date: "Sep 26", rating: 5 },
              { name: "Past customer", date: "Sep 22", rating: 5 },
            ]}
          />
        ) : (
          <>
            <FeedHead />
            <ul className="sig-list" style={{ listStyle: "none", padding: 0 }}>
              <LeadRow r={{ ...TK_ROW, status }} open>
                <LeadDetails p={{ name: "Linda", city: "Virginia Beach", phone: "(757) 555-0162", service: "Interior repaint" }} />
                <Tracker t={t} status={status} taps={{ closed: 3200 }} />
                {t > 3900 ? (
                  <p className="sig-hint" style={{ ...riseIn(t, 3900), marginTop: "0.5rem", fontWeight: 600, color: "#16a34a" }}>
                    ✓ Review request sent to Linda
                  </p>
                ) : null}
              </LeadRow>
            </ul>
          </>
        )}
      </SignalScreen>
    </PhoneShell>
  );
}

function CustomerPhone({ t }: { t: number }) {
  const buzz = t > 5000 && t < 5700 ? Math.sin((t - 5000) / 18) * 4 : 0;
  if (t < 6800) {
    return (
      <PhoneShell scale={0.56} height={680} shake={buzz}>
        <LockScreen>
          {t > 5000 ? (
            <div style={riseIn(t, 5000)}>
              <Banner icon="messages" title="Two Koats Painting" body={ASK_TEXT} />
            </div>
          ) : null}
        </LockScreen>
      </PhoneShell>
    );
  }
  if (t < 8800) {
    return (
      <PhoneShell scale={0.56} height={680} statusDark bg="#fff">
        <SmsScreen from="Two Koats Painting" bubbles={[{ text: ASK_TEXT, style: riseIn(t, 6900) }]} />
        <div style={{ position: "absolute", left: 60, top: 190 }}>
          <TapRing t={t} at={8200} />
        </div>
      </PhoneShell>
    );
  }
  if (t < 11600) {
    return (
      <PhoneShell scale={0.56} height={680} statusDark>
        <ReviewAsk business="Two Koats Painting" firstName="Linda" rating={t > 10400 ? 5 : null} tapStar={{ n: 5, at: 10200 }} t={t} />
      </PhoneShell>
    );
  }
  const posted = t > 13300;
  return (
    <PhoneShell scale={0.56} height={680} statusDark bg="#fff">
      <div style={{ position: "absolute", inset: 0, paddingTop: 60, fontFamily: "Roboto, Arial, sans-serif", color: "#202124" }}>
        <div style={{ padding: "10px 18px", borderBottom: "1px solid #e5e7eb", fontWeight: 600, fontSize: 18 }}>{TK}</div>
        <div style={{ padding: 18 }}>
          <div style={{ fontSize: 15, color: "#5f6368" }}>Linda · Posting publicly on Google</div>
          <div style={{ fontSize: 44, color: "#fbbc04", letterSpacing: 6, marginTop: 14 }}>★★★★★</div>
          <div style={{ marginTop: 14, minHeight: 120, padding: 12, borderRadius: 8, border: "1px solid #dadce0", fontSize: 16, color: "#80868b" }}>
            Share details of your own experience at this place
          </div>
          <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
            <span style={{ position: "relative", background: posted ? "#188038" : "#1a73e8", color: "#fff", padding: "10px 24px", borderRadius: 20, fontWeight: 600, fontSize: 16 }}>
              {posted ? "✓ Posted" : "Post"}
              <TapRing t={t} at={12900} dark />
            </span>
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}

function reviewCaption(t: number) {
  if (t < 3200) return "The job's done.";
  if (t < 5000) return "He taps Closed. That's all he does.";
  if (t < 8800) return "Linda gets asked in seconds.";
  if (t < 11600) return "She taps five stars.";
  if (t < 14000) return "It goes straight to Google.";
  return "Signal keeps score.";
}

export function ReviewsDemo(t: number) {
  t = clampT(t);
  const end = t > 17_500;
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-start justify-center gap-3">
        <div className="flex flex-col items-center">
          <CustomerPhone t={t} />
          <p className="mt-1 text-[0.85rem] text-subtle">Linda&rsquo;s phone</p>
        </div>
        <div className="flex flex-col items-center">
          <OwnerPhone t={t} />
          <p className="mt-1 text-[0.85rem] text-subtle">Two Koats, in Signal</p>
        </div>
      </div>
      {end ? (
        <div className="grid grid-cols-2 gap-3">
          <div style={appear(0, 500)} className="rounded-xl bg-white px-3 py-3 text-center text-[#202124] shadow-[0_0_0_1px_#dadce0]">
            <p className="text-[0.85rem] text-[#70757a]">A painter nearby</p>
            <p className="slide-num font-display text-[2.6rem] leading-none font-semibold">4</p>
            <p className="text-[0.85rem]">Google reviews</p>
          </div>
          <div style={appear(300, 500)} className="rounded-xl bg-white px-3 py-3 text-center text-[#202124] shadow-[0_0_0_3px_var(--color-accent)]">
            <p className="text-[0.85rem] text-[#70757a]">Two Koats Painting</p>
            <p className="slide-num font-display text-[2.6rem] leading-none font-semibold text-[#188038]">160</p>
            <p className="text-[0.85rem]">Google reviews · 5.0</p>
          </div>
          <p style={appear(900, 500)} className="col-span-2 text-center text-[1rem] text-fg">
            Every job gets asked. <span className="text-accent">That&rsquo;s how you get to 160.</span>
          </p>
        </div>
      ) : (
        <p className="text-center font-display text-lg font-semibold uppercase tracking-display text-fg">{reviewCaption(t)}</p>
      )}
      <p className="text-center text-[0.8rem] text-subtle">
        Two Koats&rsquo; 5.0 and 160 are real. Linda, the counts and the painter nearby are an illustration.
      </p>
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
  // land on the hero and hold (no countdown, 29 Sept), slow scroll, ease back up
  const down = back ? 0 : prog(k, 5400, 2600);
  const up = back ? 0 : prog(k, 8000, 1000);
  const y = s.depth * down * (1 - up);
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
 * Every Wednesday and Saturday, one post goes to the website blog AND the
 * Google Business Profile. Website side: R&D's real posts and dates
 * (rdplumbingco.com/blog, 29 Sept): Wed 2 Sept "She Thought Her Septic Tank
 * Was Bad…", Sat 5 Sept "Convenience Store Plumbing…". Google side: 93
 * Electric's real Google Business Profile posts (public/slides/user-added/
 * google-posts.png, cropped to proof/gbp-post-93-*.png; the profile text
 * names 93 Electric). R&D's own profile was still in verification, so the
 * Google half is a different real client and the slide says so. Blog +
 * Google only: no Facebook or Instagram (Christian, 29 Sept).
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
    date: "Wed Sept 2",
    src: "/slides/proof/post-wed.jpg",
    gbp: "/slides/proof/gbp-post-93-a.png",
    at: 1200,
  },
  {
    day: "Sat",
    date: "Sat Sept 5",
    src: "/slides/proof/post-sat.jpg",
    gbp: "/slides/proof/gbp-post-93-b.png",
    at: 9000,
  },
];
const FINAL_AT = 17_000;
export const POSTING_MS = 21_000;

/** Google's "Your posts" panel, the way it looks on a Business Profile. */
function GbpUpdates({ rows, label }: { rows: { src: string; at: number }[]; label: string }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white text-[#202124] shadow-[0_0_0_2px_#2e2e2e]">
      <div className="flex items-center gap-2 border-b border-[#e8eaed] px-3 py-2">
        <MapPin className="size-4 text-[#ea4335]" aria-hidden />
        <p className="text-[0.95rem] font-medium">Google Business Profile · Updates</p>
        <span className="ml-auto text-[0.75rem] text-[#5f6368]">{label}</span>
      </div>
      <div className="divide-y divide-[#e8eaed]">
        {rows.map((r) => (
          <img key={r.src} src={r.src} alt="" style={appear(r.at, 600)} className="block w-full px-2 py-1" />
        ))}
      </div>
    </div>
  );
}

export function PostingDemo(t: number) {
  t = clampT(t);
  const posted = POSTS.filter((p) => t >= p.at + 5200).map((p) => p.day);
  const active = [...POSTS].reverse().find((p) => t >= p.at);
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="grid grid-cols-7 gap-1">
        {WEEK.map(([d, n]) => {
          const done = posted.includes(d as "Wed" | "Sat");
          const live = active?.day === d && !done && t < FINAL_AT;
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
      {t >= FINAL_AT ? (
        <div key="final" className="flex min-h-0 flex-1 flex-col gap-2.5">
          <div style={appear(0, 600)}>
            <Frame url="rdplumbingco.com/blog">
              <div className="h-[170px] overflow-hidden">
                <img src="/slides/proof/blog.jpg" alt="R&D Plumbing blog" className="block w-full" />
              </div>
            </Frame>
          </div>
          <div style={appear(300, 600)}>
            <GbpUpdates label="93 Electric" rows={POSTS.map((p) => ({ src: p.gbp, at: 0 }))} />
          </div>
          <p style={appear(700)} className="font-display text-lg font-semibold uppercase leading-tight tracking-display text-fg">
            Every Wednesday and Saturday. <span className="text-accent">You didn&rsquo;t touch it.</span>
          </p>
          <p style={appear(1000)} className="text-[0.85rem] text-muted">
            Real posts: R&amp;D Plumbing&rsquo;s blog · 93 Electric&rsquo;s Google profile
          </p>
        </div>
      ) : active ? (
        <div key={active.day} className="flex min-h-0 flex-1 flex-col gap-2.5">
          <p style={appear(0)} className="flex items-center gap-2 text-[0.95rem] text-fg">
            <Globe className="size-4 text-[#1a73e8]" aria-hidden />
            <span className="font-semibold">Website blog</span>
            {t >= active.at + 1600 ? <Check style={pop} className="size-4 text-[#22c55e]" strokeWidth={3} aria-hidden /> : null}
          </p>
          <div style={appear(200, 700)}>
            <Frame url={`rdplumbingco.com/blog · ${active.date}`}>
              <div className="h-[190px] overflow-hidden">
                <img src={active.src} alt="" className="block w-full" />
              </div>
            </Frame>
          </div>
          {t >= active.at + 2600 ? (
            <>
              <p style={appear(0)} className="flex items-center gap-2 text-[0.95rem] text-fg">
                <MapPin className="size-4 text-[#ea4335]" aria-hidden />
                <span className="font-semibold">Google profile</span>
                {t >= active.at + 4200 ? <Check style={pop} className="size-4 text-[#22c55e]" strokeWidth={3} aria-hidden /> : null}
              </p>
              <div style={appear(200, 700)}>
                <GbpUpdates label="93 Electric · real post" rows={[{ src: active.gbp, at: 600 }]} />
              </div>
            </>
          ) : null}
        </div>
      ) : (
        <p className="text-[1rem] text-muted">This week&rsquo;s posts…</p>
      )}
    </div>
  );
}
