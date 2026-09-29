import type { ReactNode } from "react";
import { Check, Image as ImageIcon, MessageSquare, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Browser, GoogleSearch, Result, Tap, appear, prog, typed } from "./demo-kit";

/**
 * Demos for checks 1-5 (29 Sept 2026, "show it, don't tell it"). Each is a
 * pure function of t (ms since the slide mounted); DemoThenPicture re-renders
 * it every 100ms and fades to the real screenshots when it ends.
 *
 * Elements that appear mid-demo are mounted conditionally (`t > x`) and
 * animate with appear(0), so their animation starts when they mount.
 * Client names, services, reviews and post titles are real (autoglossnc.com,
 * rdplumbingco.com, read 29 Sept 2026); the mechanics around them are tagged
 * "how it works" or "Illustration".
 */

const pop = appear(0, 360);

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[0.85rem] uppercase tracking-wide text-subtle">
      {children}
    </span>
  );
}

function Meter({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <div className="flex justify-between text-[0.95rem]">
        <span className="text-muted">{label}</span>
        <span className="slide-num font-semibold text-accent tabular-nums">{Math.round(value)}%</span>
      </div>
      <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-bg">
        <div className="h-full rounded-full bg-accent" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/*  1 · Google profile, optimized (AutoGloss)                                */
/* ------------------------------------------------------------------------ */

/**
 * Real: the Google name, the six services (autoglossnc.com service pages) and
 * "5.0 · 91 Google reviews" (on autoglossnc.com, 29 Sept 2026). The primary
 * category isn't recorded in clients/autogloss.md, so the demo fills empty
 * fields and never claims a "before" value.
 */
export const PROFILE_MS = 10500;

const GBP_NAME = "AUTOGLOSS Detailing & Ceramic Coating";
const GBP_SERVICES = [
  "Ceramic Coating",
  "Paint Correction",
  "Car Detailing",
  "Interior Detailing",
  "Exterior Detailing",
  "Machine Polishing",
];

export const ProfileDemo = (t: number): ReactNode => {
  const cat = typed("Car detailing service", t, 700, 18);
  const servicesShown = GBP_SERVICES.filter((_, i) => t > 2600 + i * 400).length;
  const upload = prog(t, 5400, 1400);
  const strength =
    25 + (t > 2000 ? 20 : 0) + servicesShown * 5 + (upload >= 1 ? 10 : 0) + (t > 7600 ? 15 : 0);
  return (
    <div className="flex h-full w-full flex-col gap-3 rounded-2xl bg-bg-elevated p-5 shadow-[var(--shadow-border)]">
      <div>
        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-[1.15rem] font-semibold text-fg">Edit profile</p>
          <Tag>AutoGloss · how we set it up</Tag>
        </div>
        <p className="mt-1 text-[1rem] text-muted">
          {GBP_NAME} · <span className="text-[#f5b301]">5.0 ★</span> · 91 Google reviews
        </p>
      </div>

      <div className="rounded-xl bg-surface px-4 py-3">
        <p className="text-[0.85rem] uppercase tracking-wide text-subtle">Primary category</p>
        <p className="mt-1 flex min-h-[1.8rem] items-center text-[1.2rem] text-fg">
          {cat}
          {t < 2000 ? <span className="ml-0.5 h-5 w-0.5 animate-pulse bg-fg" /> : null}
          {t > 2000 ? <Check style={pop} className="ml-2 size-5 text-accent" strokeWidth={3} aria-hidden /> : null}
        </p>
      </div>

      <div className="rounded-xl bg-surface px-4 py-3">
        <p className="text-[0.85rem] uppercase tracking-wide text-subtle">Services</p>
        <div className="mt-2 flex min-h-[4.6rem] flex-wrap gap-2">
          {GBP_SERVICES.slice(0, servicesShown).map((s) => (
            <span key={s} style={pop} className="rounded-full bg-accent px-3 py-1 text-[0.95rem] font-semibold text-accent-fg">
              + {s}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-xl bg-surface px-4 py-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-surface-2">
          <ImageIcon className="size-6 text-accent" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[0.95rem] text-fg">{t > 5400 ? "Uploading job photo" : "Add job photo"}</p>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-bg">
            <div className="h-full rounded-full bg-accent" style={{ width: `${upload * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="min-h-[3.4rem]">
        {t > 7600 ? (
          <div style={pop} className="flex items-center gap-2 rounded-xl bg-[#14301d] px-4 py-3 text-[1rem] text-[#86efac]">
            <Check className="size-5" strokeWidth={3} aria-hidden />
            Post published to the profile
          </div>
        ) : null}
      </div>

      <div className="mt-auto rounded-xl bg-surface px-4 py-3">
        <Meter value={Math.min(100, strength)} label="Profile filled in" />
        {t > 9000 ? (
          <p style={pop} className="mt-2 text-[1.05rem] font-semibold text-fg">
            Every box filled. <span className="text-accent">Done for you.</span>
          </p>
        ) : null}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------------ */
/*  2 · Reviews: asked automatically, a real one lands (AutoGloss)           */
/* ------------------------------------------------------------------------ */

/**
 * The ask (text, stars) is an illustration of how the request works. The
 * review that lands is real: Erika Rankin's Google review, quoted on
 * autoglossnc.com's "91 five-star reviews" section (read 29 Sept 2026).
 * No owner reply is written in Jeff's voice; the chip just says one posted.
 */
export const REVIEWS_MS = 11000;

export const ReviewsDemo = (t: number): ReactNode => {
  const stars = [0, 1, 2, 3, 4].filter((i) => t > 2900 + i * 170).length;
  return (
    <div className="flex h-full w-full flex-col gap-3">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl bg-bg-elevated shadow-[var(--shadow-border)]">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-surface-2">
            <MessageSquare className="size-4 text-accent" aria-hidden />
          </span>
          <span className="flex-1 text-[1.05rem] font-semibold text-fg">Your customer</span>
          <Tag>How the ask works</Tag>
        </div>
        <div className="flex flex-1 flex-col justify-end gap-2.5 px-4 pb-4">
          {t > 300 ? (
            <div style={pop} className="flex items-center justify-center gap-2 rounded-full bg-surface-2 px-3 py-1.5 text-[0.95rem] text-fg">
              <Check className="size-4 text-accent" strokeWidth={3} aria-hidden />
              Job marked <b>Closed</b>
            </div>
          ) : null}
          {t > 1300 ? (
            <div style={pop} className="flex flex-col items-end">
              <p className="max-w-[90%] rounded-2xl rounded-br-md bg-accent px-4 py-2 text-[1rem] leading-snug text-accent-fg">
                Thanks for choosing AutoGloss! How did we do? Tap a star.
              </p>
              <span className="mt-1 text-[0.85rem] text-subtle">Sent automatically</span>
            </div>
          ) : null}
          <div className="flex h-8 gap-1">
            {[0, 1, 2, 3, 4].map((i) =>
              i < stars ? <Star key={i} style={pop} className="size-8 fill-[#f5b301] text-[#f5b301]" aria-hidden /> : null,
            )}
          </div>
          {t > 4200 ? (
            <div style={pop} className="rounded-xl bg-surface-2 px-3 py-2 text-[0.95rem] text-fg">
              Sent to the Google page ↓
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex min-h-0 flex-[1.1] flex-col rounded-2xl bg-white px-5 py-4 text-[#1a1a1a]">
        <div className="flex items-baseline justify-between gap-3">
          <p className="truncate text-[1.05rem] font-semibold">AUTOGLOSS Detailing &amp; Ceramic Coating</p>
          <p className="shrink-0 text-[1rem]">
            <span className="font-semibold">5.0</span> <span className="text-[#f5b301]">★</span> · 91 reviews
          </p>
        </div>
        {t > 5600 ? (
          <div style={pop} className="mt-3 rounded-lg bg-[#f1f5f1] px-3 py-2">
            <p className="text-[0.95rem]">
              <b>Erika R.</b> <span className="text-[#f5b301]">★★★★★</span> <span className="text-[#777]">Google review</span>
            </p>
            <p className="mt-1 text-[0.95rem] leading-snug">
              &ldquo;Jeff did an amazing job removing a painted on pinstripe from my new Jeep Grand Cherokee! He
              responded quickly to my call&hellip;&rdquo;
            </p>
            {t > 7600 ? (
              <span style={pop} className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#e8f0fe] px-2.5 py-0.5 text-[0.85rem] text-[#1a73e8]">
                <Check className="size-3.5" strokeWidth={3} aria-hidden />
                Reply posted
              </span>
            ) : null}
          </div>
        ) : null}
        {t > 9000 ? (
          <p style={pop} className="mt-auto text-[1rem] font-semibold">
            Asked every job. Answered every time.
          </p>
        ) : null}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------------ */
/*  3 · Website: five seconds, then the whole real build                     */
/* ------------------------------------------------------------------------ */

export const WEBSITE_MS = 12000;

export const WebsiteDemo = (t: number): ReactNode => {
  const secs = Math.max(0, 5 - Math.floor(t / 1000));
  const scroll = prog(t, 5600, 5400);
  const checks = ["What + where", "Licensed + insured", "Tap to call"];
  return (
    <div className="flex h-full w-full flex-col gap-3">
      <div className="relative">
        <Browser url="rdplumbingco.com">
          <img
            src="/slides/proof/rd-scroll.jpg"
            alt="R&D Plumbing Co. website, top to bottom"
            className="w-full"
            style={{ transform: `translateY(calc(${-scroll} * (100% - 430px)))` }}
          />
          {t < 5400 ? (
            <div className="absolute top-3 right-3 flex size-16 items-center justify-center rounded-full bg-black/80 font-display text-[2rem] font-semibold text-white tabular-nums">
              {secs}
            </div>
          ) : null}
        </Browser>
      </div>
      <div className="flex min-h-[3rem] flex-wrap gap-2">
        {t < 5600
          ? checks.map((c, i) =>
              t > 1200 + i * 1100 ? (
                <span key={c} style={pop} className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-[1rem] font-semibold text-accent-fg">
                  <Check className="size-4" strokeWidth={3} aria-hidden />
                  {c}
                </span>
              ) : null,
            )
          : null}
        {t >= 5600 && t < 10800 ? (
          <span style={pop} className="rounded-full bg-surface-2 px-3 py-1.5 text-[1rem] text-fg">
            Services · gallery · service areas · FAQ · free estimate
          </span>
        ) : null}
        {t >= 10800 ? (
          <span style={pop} className="font-display text-[1.4rem] font-semibold uppercase tracking-display text-fg">
            Built right. <span className="text-accent">Not a template.</span>
          </span>
        ) : null}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------------ */
/*  4 · A page for every service (R&D's real pages)                          */
/* ------------------------------------------------------------------------ */

export const SERVICE_PAGES_MS = 12000;

const RD_SERVICES: [string, string][] = [
  ["Emergency Service", "emergency-service"],
  ["Commercial Construction", "commercial-construction"],
  ["Residential New Construction", "residential-new-construction"],
  ["Repairs & Service", "repairs-and-service"],
  ["Whole-House Water Filtration", "whole-house-water-filtration"],
];
const RD_AREAS = [
  "Fairhope", "Daphne", "Spanish Fort", "Foley", "Gulf Shores", "Orange Beach",
  "Loxley", "Robertsdale", "Silverhill", "Bay Minette", "Mobile",
];
const slug = (s: string) => s.toLowerCase().replace(/ /g, "-");

export const ServicePagesDemo = (t: number): ReactNode => {
  const svc = RD_SERVICES.filter((_, i) => t > 300 + i * 450).length;
  const areas = RD_AREAS.filter((_, i) => t > 2700 + i * 260).length;
  const pages = svc + areas;
  const search = t > 7000;
  return (
    <div className="flex h-full w-full flex-col gap-3">
      {!search ? (
        <div className="flex min-h-0 flex-1 flex-col rounded-2xl bg-white px-5 py-4 text-[#1a1a1a]">
          <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-2">
            <p className="text-[1.05rem] font-bold">R&amp;D PLUMBING CO.</p>
            <p className="text-[0.95rem] text-[#555]">Services ▾ · Service areas ▾</p>
          </div>
          <div className="mt-3 grid min-h-0 flex-1 grid-cols-2 gap-x-4">
            <ul className="space-y-1.5">
              <li className="text-[0.8rem] font-semibold uppercase tracking-wide text-[#888]">Services</li>
              {RD_SERVICES.slice(0, svc).map(([name, s]) => (
                <li key={s} style={pop}>
                  <p className="text-[0.95rem] font-semibold leading-tight">{name}</p>
                  <p className="truncate font-mono text-[0.75rem] text-[#15803d]">/services/{s}</p>
                </li>
              ))}
            </ul>
            <ul className="space-y-0.5">
              <li className="text-[0.8rem] font-semibold uppercase tracking-wide text-[#888]">Service areas</li>
              {RD_AREAS.slice(0, areas).map((a) => (
                <li key={a} style={pop} className="flex items-baseline justify-between gap-2">
                  <span className="text-[0.95rem] font-semibold">{a}</span>
                  <span className="truncate font-mono text-[0.72rem] text-[#15803d]">/{slug(a)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div style={pop} className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-white text-[#1a1a1a]">
          <GoogleSearch q="emergency plumber daphne al" t={t} typeAt={7300}>
            {t > 8600 ? (
              <div style={pop} className="relative">
                <Result
                  label="rdplumbingco.com › service-areas › daphne"
                  title="Plumber in Daphne, AL · R&D Plumbing Co."
                  line="Emergency plumbing in Daphne and across Baldwin County…"
                  hot
                />
                {t > 9400 ? <Tap at={0} /> : null}
              </div>
            ) : null}
            {t > 8600 ? (
              <>
                <Result label="example.com" title="Another plumber" line="Services · About · Contact" />
                <Result label="example.com" title="A directory listing" line="Top 10 plumbers near you" />
              </>
            ) : null}
          </GoogleSearch>
          <span className="absolute top-4 right-4 rounded-full bg-[#eee] px-2.5 py-0.5 text-[0.8rem] uppercase tracking-wide text-[#777]">
            Illustration
          </span>
        </div>
      )}
      <div className="flex items-center justify-between rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
        <p className="text-[1.05rem] text-fg">
          <span className="slide-num font-display text-[1.8rem] font-semibold text-accent tabular-nums">{pages}</span>{" "}
          pages Google can show
        </p>
        {t > 10000 ? (
          <p style={pop} className="text-[1rem] font-semibold text-fg">
            One per job. One per town.
          </p>
        ) : null}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------------ */
/*  5 · Posting: Wednesday + Saturday, every week                            */
/* ------------------------------------------------------------------------ */

export const POSTING_MS = 11500;

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const CHANNELS = ["Google", "Website", "Facebook", "Instagram"];
/** Real titles from rdplumbingco.com/blog (read 29 Sept 2026). */
const POSTS = [
  { day: 2, at: 400, title: "Grinder Pump Failures: What Baldwin County Property Owners Need to Know" },
  { day: 5, at: 4400, title: "She Thought Her Septic Tank Was Bad. It Was the Line Under Her House." },
];

export const PostingDemo = (t: number): ReactNode => {
  const current = t < POSTS[1].at ? POSTS[0] : POSTS[1];
  const local = t - current.at;
  const published = CHANNELS.filter((_, i) => local > 2000 + i * 300).length;
  const nextWeek = t > 8400;
  return (
    <div className="flex h-full w-full flex-col gap-3 rounded-2xl bg-bg-elevated p-5 shadow-[var(--shadow-border)]">
      <div className="flex items-center justify-between">
        <p className="text-[1.2rem] font-semibold text-fg">Posting calendar</p>
        <Tag>R&amp;D Plumbing&rsquo;s real posts</Tag>
      </div>

      {[0, 1].map((week) =>
        week === 1 && !nextWeek ? null : (
          <div key={week} style={week === 1 ? pop : undefined}>
            <p className="mb-1 text-[0.85rem] uppercase tracking-wide text-subtle">{week === 0 ? "This week" : "Next week"}</p>
            <div className="grid grid-cols-7 gap-1.5">
              {DAYS.map((d, i) => {
                const done =
                  week === 1
                    ? i === 2 || i === 5
                    : POSTS.some((p) => p.day === i && t > p.at + 3400);
                const live = week === 0 && POSTS.some((p) => p.day === i && t > p.at && t <= p.at + 3400);
                return (
                  <div
                    key={d}
                    className={cn(
                      "flex flex-col items-center rounded-lg py-2 text-[0.95rem]",
                      done ? "bg-accent text-accent-fg" : live ? "bg-surface-2 text-fg shadow-[0_0_0_2px_var(--color-accent)]" : "bg-surface text-subtle",
                    )}
                  >
                    {d}
                    <span className="h-4">{done ? <Check className="size-4" strokeWidth={3} aria-hidden /> : null}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ),
      )}

      {!nextWeek ? (
        <div key={current.day} style={pop} className="rounded-xl bg-white px-4 py-3 text-[#1a1a1a]">
          <p className="text-[0.8rem] uppercase tracking-wide text-[#888]">{DAYS[current.day]} · new post</p>
          <p className="mt-1 min-h-[3rem] text-[1.1rem] font-semibold leading-snug">
            {typed(current.title, t, current.at + 200, 40)}
          </p>
        </div>
      ) : null}

      {!nextWeek ? (
        <div className="grid grid-cols-2 gap-2">
          {CHANNELS.map((c, i) => (
            <div
              key={c}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2 text-[1rem]",
                i < published ? "bg-[#14301d] text-[#86efac]" : "bg-surface text-subtle",
              )}
            >
              {c}
              {i < published ? (
                <span style={pop} className="flex items-center gap-1 text-[0.9rem]">
                  <Check className="size-4" strokeWidth={3} aria-hidden />
                  Published
                </span>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      {t > 9400 ? (
        <p style={pop} className="mt-auto font-display text-[1.4rem] font-semibold uppercase leading-tight tracking-display text-fg">
          Twice a week. Every week. <span className="text-accent">You didn&rsquo;t touch it.</span>
        </p>
      ) : null}
    </div>
  );
};
