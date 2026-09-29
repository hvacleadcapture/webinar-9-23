import type { ReactNode } from "react";
import { AlertTriangle, Check, MessageSquare, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { appear, prog, typed } from "./demo-kit";
import { MISSED_CALL_STEPS } from "./demo";

/**
 * In-slide demos for checks 6–9. Each is a pure function of t (ms since the
 * slide mounted), re-rendered every 100ms. Christian's notes (29 Sept, later):
 * slow, readable, real clients, and the LAST frame is the picture that stays
 * up (nothing fades to a screenshot afterwards). Real data is cited per demo;
 * anything not verified is tagged "Illustration", and the phone thread says
 * "Example conversation".
 */

function Tag({ children, real }: { children: ReactNode; real?: boolean }) {
  return (
    <span className={cn("text-[0.8rem] uppercase tracking-widest", real ? "text-accent" : "text-subtle")}>{children}</span>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <p style={appear(0, 600)} className="mt-auto self-start rounded-full bg-accent px-3 py-1 text-[0.95rem] font-semibold text-accent-fg">
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------------ */
/*  6 · AI visibility: R&D's real site code gets read, the AI names them     */
/* ------------------------------------------------------------------------ */

/**
 * Real lines from the JSON-LD on https://www.rdplumbingco.com/ (read live
 * 29 Sept 2026, the Plumber block; "…" marks where a list is cut short). The
 * chat answer is an ILLUSTRATION: we have not verified what ChatGPT actually
 * says, and the slide says so.
 */
const CODE = [
  '"@type": "Plumber",',
  '"name": "R&D Plumbing Co. LLC",',
  '"telephone": "(251) 604-2483",',
  '"areaServed": ["Baldwin County, AL", "Fairhope, AL", "Daphne, AL", …],',
  '"knowsAbout": ["Emergency Plumbing Service", "Whole-House Water Filtration", …],',
  '"slogan": "Built right the first time."',
];
const ANSWER =
  "R&D Plumbing Co. serves Fairhope and all of Baldwin County. They handle emergency plumbing, repairs and whole-house water filtration. Call (251) 604-2483.";

// code types 0.3–8.7s · question 9.0–11.1s · reading 11.3–13.3s · answer 13.3–17.6s · hold
const CODE_AT = (i: number) => 300 + i * 1400;
const Q_AT = 9000;
const READ_AT = 11300;
const ANSWER_AT = 13300;

export const AI_MS = 19000;
export function AiDemo(t: number): ReactNode {
  const readLine = t < READ_AT ? -1 : Math.min(CODE.length - 1, Math.floor((t - READ_AT) / 330));
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="rounded-xl bg-[#0d1117] px-4 py-3 font-mono text-[0.82rem] leading-relaxed shadow-[var(--shadow-border)]">
        <p className="mb-1 flex items-center justify-between font-sans text-[0.9rem] text-subtle">
          <span>rdplumbingco.com, behind the scenes</span>
          <Tag real>Real code</Tag>
        </p>
        <p className="text-[#8b949e]">{"{"}</p>
        {CODE.map((line, i) => {
          const text = typed(line, t, CODE_AT(i), 40);
          if (!text) return null;
          const lit = i <= readLine;
          return (
            <p
              key={i}
              className={cn(
                "truncate rounded pl-3 transition-colors duration-500",
                lit ? "bg-accent/25 text-fg" : "text-[#7ee787]",
              )}
            >
              {text}
            </p>
          );
        })}
        {t > CODE_AT(CODE.length - 1) + 1000 ? <p className="text-[#8b949e]">{"}"}</p> : null}
      </div>

      <div className="flex min-h-0 flex-1 flex-col rounded-xl bg-[#f7f7f8] px-4 py-3 text-[#1a1a1a] shadow-[var(--shadow-border)]">
        <p className="flex items-center justify-between text-[0.95rem] font-semibold">
          <span className="flex items-center gap-2">
            <Sparkles className="size-4" aria-hidden /> ChatGPT
          </span>
          <span className="text-[0.8rem] font-normal uppercase tracking-widest text-[#888]">Illustration</span>
        </p>
        {t >= Q_AT ? (
          <div className="mt-3 flex justify-end">
            <p className="max-w-[85%] rounded-2xl bg-[#e8e8ea] px-4 py-2 text-[1rem]">
              {typed("Who's a good plumber in Fairhope, AL?", t, Q_AT, 18) || " "}
            </p>
          </div>
        ) : null}
        {t > READ_AT && t < ANSWER_AT ? (
          <p
            className="mt-3 flex items-center gap-2 text-[0.95rem] text-[#666]"
            style={{ animation: "live-pulse 1s ease-in-out infinite" }}
          >
            <span className="size-2 rounded-full bg-accent" /> Reading local business sites…
          </p>
        ) : null}
        {t >= ANSWER_AT ? <p className="mt-3 text-[1rem] leading-snug">{typed(ANSWER, t, ANSWER_AT, 35)}</p> : null}
        {t > 17800 ? <Pill>The site tells the AI exactly who you are.</Pill> : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/*  7 · Keywords + rankings: real Search Console positions, then the result  */
/* ------------------------------------------------------------------------ */

/**
 * Only numbers on record. Two Koats + A2Z: Search Console top queries as
 * cited in credibility.tsx (Two Koats last 28 days to 26 Sep; A2Z last 90
 * days). Potts: site-wide average position Sept 1-19 vs Aug 1-19, cjp-vault
 * clients/potts-brothers.md (2026-09-21 checkup). Positions count in from
 * "—"; the only "before" shown is Potts', because it is on record.
 */
const ROWS: { who: string; kw: string; pos: number; from?: number; note?: string }[] = [
  { who: "Two Koats", kw: "painter", pos: 1.2, note: "269 searches" },
  { who: "Two Koats", kw: "exterior painters virginia beach", pos: 3.4, note: "145 searches" },
  { who: "A2Z", kw: "concrete foundation contractors", pos: 1.0 },
  { who: "A2Z", kw: "concrete work near me", pos: 2.1 },
  { who: "A2Z", kw: "concrete near me", pos: 3.9 },
  { who: "Potts", kw: "every search, average", pos: 21.4, from: 25.0, note: "was 25.0 in Aug" },
];
// rows 0.8–8.4s · search typed 9.5–11.1s · result 12.0s · pill 14.5s · hold
const ROW_AT = (i: number) => 800 + i * 1300;

export const KEYWORDS_MS = 18000;
export function KeywordsDemo(t: number): ReactNode {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
        <p className="flex items-center justify-between text-[0.95rem] text-subtle">
          <span>Where they show up · Search Console</span>
          <Tag real>Real</Tag>
        </p>
        <ul className="mt-2 space-y-1.5">
          {ROWS.map((r, i) => {
            const at = ROW_AT(i);
            const k = prog(t, at, 1100);
            const shown = t < at ? null : r.from != null ? r.from + (r.pos - r.from) * k : r.pos;
            const lit = t >= at && t < at + 1300;
            return (
              <li
                key={r.kw}
                style={appear(100 + i * 150)}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-md px-1.5 text-[0.95rem] transition-colors duration-500",
                  lit && "bg-surface-2",
                )}
              >
                <span className="min-w-0 truncate">
                  <span className="text-subtle">{r.who} · </span>
                  <span className="text-fg">{r.kw}</span>
                  {r.note && k >= 1 ? <span className="text-subtle"> · {r.note}</span> : null}
                </span>
                <span
                  className={cn(
                    "w-12 shrink-0 text-right font-semibold tabular-nums",
                    shown != null && shown <= 10 ? "text-[#22c55e]" : "text-muted",
                  )}
                >
                  {shown == null ? "—" : shown.toFixed(1)}
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mt-2 text-[0.85rem] text-subtle">Average spot on Google. Lower is better. 1 is the top.</p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl bg-white px-4 py-3 text-[#1a1a1a] shadow-[var(--shadow-border)]">
        <p className="flex items-center justify-between text-[0.8rem] uppercase tracking-widest text-[#888]">
          <span>Google</span>
          <span>Illustration</span>
        </p>
        <div className="mt-2 rounded-full border border-[#ddd] px-4 py-2 text-[1rem]">
          {typed("painter virginia beach", t, 9500, 14) || " "}
        </div>
        <div className="mt-3 space-y-2">
          {t >= 12000 ? (
            <div style={appear(0, 600)} className="rounded-lg bg-[#fff7ed] px-3 py-2 shadow-[0_0_0_2px_var(--color-accent)]">
              <p className="text-[0.85rem] text-[#555]">Painter · Virginia Beach, VA</p>
              <p className="text-[1.15rem] font-semibold text-[#1a0dab]">Two Koats Painting</p>
            </div>
          ) : null}
          {[0, 1].map((i) =>
            t >= 12600 + i * 400 ? (
              <div key={i} style={appear(0, 600)} className="rounded-lg px-3 py-2">
                <div className="h-3 w-28 rounded bg-[#e5e5e5]" />
                <div className="mt-1.5 h-4 w-44 rounded bg-[#d4d4d8]" />
              </div>
            ) : null,
          )}
        </div>
        {t > 14500 ? <Pill>They typed the job, not his name.</Pill> : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/*  8 · Citations: Potts Brothers' real Google results, listing by listing   */
/* ------------------------------------------------------------------------ */

/**
 * Potts Brothers Construction, Arlington VA. NAP from cjp-vault
 * clients/potts-brothers.md frontmatter (address publication approved
 * 2026-09-17). The page is Google's real results for "Potts Brothers
 * Construction": public/slides/proof/potts-google.jpg is stacked from the
 * user-added potts-links-top-blurred + potts-links-middle screenshots (left
 * column only; the blurred panel is cropped out). Every tag states only what
 * that snippet actually shows. Houzz really does still list the old
 * Springfield address (6560 Backlick Rd), so it is flagged, not ticked.
 *
 * Row boxes are in the stacked image's own pixels (700 × 948).
 */
const IMG_H = 948;
const HITS: { site: string; top: number; bottom: number; ok: boolean; tag: string }[] = [
  { site: "Website", top: 55, bottom: 172, ok: true, tag: "Name" },
  { site: "Instagram", top: 202, bottom: 322, ok: true, tag: "Name · phone" },
  { site: "Facebook", top: 350, bottom: 492, ok: true, tag: "Name · phone" },
  { site: "BBB", top: 505, bottom: 626, ok: true, tag: "Phone · Arlington" },
  { site: "Houzz", top: 655, bottom: 797, ok: false, tag: "Old address · Springfield" },
  { site: "Nextdoor", top: 825, bottom: 946, ok: true, tag: "Name · phone · Arlington" },
];
const NAP = {
  name: "Potts Brothers Construction",
  phone: "(703) 866-5400",
  address: "2451 Crystal Dr, Suite 614A, Arlington, VA",
};
// search typed 0.4–2.4s · rows every 2.2s from 3.0s (scroll to the lower half 8.6–10.2s) · pill 16.8s · hold
const HIT_AT = (i: number) => 3000 + i * 2200;
const VIEW_PX = 390; // visible height of the results window; it scrolls to the bottom of the image

export const CITATIONS_MS = 20000;
export function CitationsDemo(t: number): ReactNode {
  const scroll = prog(t, 8600, 1600);
  const shown = HITS.filter((_, i) => t >= HIT_AT(i));
  const flagged = shown.filter((h) => !h.ok).length;
  return (
    <div className="flex h-full flex-col gap-2.5">
      <div className="rounded-xl bg-surface px-4 py-2.5 shadow-[var(--shadow-border)]">
        <p className="flex items-center justify-between text-[0.9rem] text-subtle">
          <span>One name, one phone, one address</span>
          <Tag real>Real Google results</Tag>
        </p>
        <p className="text-[1.05rem] font-semibold text-fg">{NAP.name}</p>
        <p className="text-[0.9rem] text-muted">
          {NAP.phone} · {NAP.address}
        </p>
      </div>

      <div className="relative shrink-0 overflow-hidden rounded-xl bg-white shadow-[var(--shadow-border)]" style={{ height: VIEW_PX }}>
        <div className="relative" style={{ transform: `translateY(calc(${-scroll} * (100% - ${VIEW_PX}px)))` }}>
          <img src="/slides/proof/potts-google.jpg" alt="Google's real results for Potts Brothers Construction" className="block w-full" />
          {/* the typed query sits over the real search box */}
          <div
            className="absolute bg-white text-[#1a1a1a]"
            style={{ left: "16.5%", top: "1.2%", width: "60%", height: "2.2%", fontSize: "0.72rem", lineHeight: 1.6 }}
          >
            {typed("Potts Brothers Construction", t, 400, 14)}
          </div>
          {HITS.map((h, i) =>
            t >= HIT_AT(i) ? (
              <div
                key={h.site}
                className="absolute inset-x-1 rounded-md"
                style={{
                  top: `${(h.top / IMG_H) * 100}%`,
                  height: `${((h.bottom - h.top) / IMG_H) * 100}%`,
                  boxShadow: `0 0 0 3px ${h.ok ? "#16a34a" : "#f59e0b"}`,
                  background: h.ok ? "rgba(22,163,74,0.06)" : "rgba(245,158,11,0.10)",
                  ...appear(0, 500),
                }}
              >
                <span
                  className={cn(
                    "absolute top-1 right-1 flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.72rem] font-semibold text-white",
                    h.ok ? "bg-[#16a34a]" : "bg-[#d97706]",
                  )}
                >
                  {h.ok ? <Check className="size-3" strokeWidth={3} aria-hidden /> : <AlertTriangle className="size-3" aria-hidden />}
                  {h.tag}
                </span>
              </div>
            ) : null,
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {shown.map((h) => (
          <span
            key={h.site}
            style={appear(0, 400)}
            className={cn(
              "flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.85rem] font-semibold",
              h.ok ? "bg-[#14532d] text-[#86efac]" : "bg-[#78350f] text-[#fcd34d]",
            )}
          >
            {h.ok ? <Check className="size-3.5" strokeWidth={3} aria-hidden /> : <AlertTriangle className="size-3.5" aria-hidden />}
            {h.site}
          </span>
        ))}
      </div>
      {t > 16800 ? (
        <Pill>
          {shown.length - flagged} match. {flagged} old address found. That&rsquo;s what we fix.
        </Pill>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/*  9 · When the phone rings: the stat, then the missed-call thread          */
/* ------------------------------------------------------------------------ */

/**
 * The stat is from the source page itself:
 * https://411locals.us/small-business-owners-dont-answer-62-of-phone-calls/
 * "62% of phone calls to small businesses are left unanswered" (411 Locals,
 * 18 Jan 2016). It is old and from a marketing firm; the slide names both so
 * he isn't overselling it. No real client conversation exists to show, so the
 * thread stays the labelled example, slowed down 1.5x.
 */
const STAT_PCT = 62;
const THREAD_AT = 4500;
const THREAD_SPEED = 1.5;

export const PHONE_MS = 18500;
export function PhoneDemo(t: number): ReactNode {
  const pct = Math.round(STAT_PCT * prog(t, 500, 1800));
  const lastStep = MISSED_CALL_STEPS[MISSED_CALL_STEPS.length - 1].at;
  const savedAt = THREAD_AT + lastStep * THREAD_SPEED + 900;
  return (
    <div className="flex h-full flex-col gap-3">
      <div style={appear(0, 600)} className="flex items-center gap-4 rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
        <p className="slide-num w-24 shrink-0 font-display text-[3rem] leading-none font-semibold text-accent tabular-nums">
          {pct}%
        </p>
        <div className="min-w-0">
          <p className="text-[1.05rem] leading-snug text-fg">of calls to small businesses go unanswered.</p>
          <p className="mt-0.5 text-[0.78rem] text-subtle">411 Locals study, Jan 2016 · 411locals.us</p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[440px] min-h-0 flex-1 rounded-[2.4rem] bg-[#050505] p-2.5 shadow-[0_0_0_2px_#2e2e2e,0_40px_90px_-30px_rgba(0,0,0,0.9)]">
        <div className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-bg-elevated">
          <div className="flex items-center gap-3 border-b border-line px-5 pt-4 pb-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-surface-2">
              <MessageSquare className="size-5 text-accent" aria-hidden />
            </span>
            <span className="flex-1">
              <span className="block text-[1.1rem] font-semibold text-fg">New customer</span>
              <span className="block text-[0.85rem] text-subtle">Example conversation</span>
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden px-4 pb-3 [&_p]:text-[0.95rem] [&_span]:text-[0.85rem]">
            {MISSED_CALL_STEPS.map((s, i) =>
              t >= THREAD_AT + s.at * THREAD_SPEED ? (
                <div key={i} style={appear(0, 600)}>
                  {s.node}
                </div>
              ) : null,
            )}
            {t >= savedAt ? (
              <div style={appear(0, 600)} className="flex justify-center">
                <span className="rounded-full bg-[#15803d] px-4 py-1.5 font-semibold text-white">Lead saved · it stayed yours</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
