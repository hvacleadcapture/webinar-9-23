import type { ReactNode } from "react";
import { Check, MessageSquare, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { appear, prog, typed } from "./demo-kit";
import { MISSED_CALL_STEPS } from "./demo";

/**
 * In-slide demos for checks 6–9. Each is a pure function of t (ms since the
 * slide mounted); DemoThenPicture re-renders it every 100ms. Real client data
 * wherever it exists (sources cited per demo); anything not verified is
 * tagged "Illustration", and the phone thread says "Example conversation".
 */

function Tag({ children, real }: { children: ReactNode; real?: boolean }) {
  return (
    <span className={cn("text-[0.8rem] uppercase tracking-widest", real ? "text-accent" : "text-subtle")}>{children}</span>
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

export const AI_MS = 11000;
export function AiDemo(t: number): ReactNode {
  const readLine = t < 6200 ? -1 : Math.min(CODE.length - 1, Math.floor((t - 6200) / 280));
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="rounded-xl bg-[#0d1117] px-4 py-3 font-mono text-[0.82rem] leading-relaxed shadow-[var(--shadow-border)]">
        <p className="mb-1 flex items-center justify-between font-sans text-[0.9rem] text-subtle">
          <span>rdplumbingco.com, behind the scenes</span>
          <Tag real>Real code</Tag>
        </p>
        <p className="text-[#8b949e]">{"{"}</p>
        {CODE.map((line, i) => {
          const text = typed(line, t, 300 + i * 650, 70);
          if (!text) return null;
          const lit = t >= 6200 && i <= readLine;
          return (
            <p
              key={i}
              className={cn(
                "truncate rounded pl-3 transition-colors duration-300",
                lit ? "bg-accent/25 text-fg" : "text-[#7ee787]",
              )}
            >
              {text}
            </p>
          );
        })}
        {t > 4200 ? <p className="text-[#8b949e]">{"}"}</p> : null}
      </div>

      <div className="flex min-h-0 flex-1 flex-col rounded-xl bg-[#f7f7f8] px-4 py-3 text-[#1a1a1a] shadow-[var(--shadow-border)]">
        <p className="flex items-center justify-between text-[0.95rem] font-semibold">
          <span className="flex items-center gap-2">
            <Sparkles className="size-4" aria-hidden /> ChatGPT
          </span>
          <span className="text-[0.8rem] font-normal uppercase tracking-widest text-[#888]">Illustration</span>
        </p>
        <div className="mt-3 flex justify-end">
          <p className="max-w-[85%] rounded-2xl bg-[#e8e8ea] px-4 py-2 text-[1rem]">
            {typed("Who's a good plumber in Fairhope, AL?", t, 4400, 26) || " "}
          </p>
        </div>
        {t > 6000 && t < 7900 ? (
          <p
            className="mt-3 flex items-center gap-2 text-[0.95rem] text-[#666]"
            style={{ animation: "live-pulse 1s ease-in-out infinite" }}
          >
            <span className="size-2 rounded-full bg-accent" /> Reading local business sites…
          </p>
        ) : null}
        {t >= 7900 ? <p className="mt-3 text-[1rem] leading-snug">{typed(ANSWER, t, 7900, 60)}</p> : null}
        {t > 10200 ? (
          <p style={appear(0)} className="mt-auto self-start rounded-full bg-accent px-3 py-1 text-[0.9rem] font-semibold text-accent-fg">
            The site tells the AI exactly who you are.
          </p>
        ) : null}
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
 * "—"; the only "before" shown is Potts', because it is on record. No geo
 * grid: there is no per-cell grid data on record to draw.
 */
const ROWS: { who: string; kw: string; pos: number; from?: number; note?: string }[] = [
  { who: "Two Koats", kw: "painter", pos: 1.2, note: "269 searches" },
  { who: "Two Koats", kw: "exterior painters virginia beach", pos: 3.4, note: "145 searches" },
  { who: "A2Z", kw: "concrete foundation contractors", pos: 1.0 },
  { who: "A2Z", kw: "concrete work near me", pos: 2.1 },
  { who: "A2Z", kw: "concrete near me", pos: 3.9 },
  { who: "Potts", kw: "every search, average", pos: 21.4, from: 25.0, note: "was 25.0 in Aug" },
];

export const KEYWORDS_MS = 11000;
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
            const at = 600 + i * 700;
            const k = prog(t, at, 900);
            const shown = t < at ? null : r.from != null ? r.from + (r.pos - r.from) * k : r.pos;
            return (
              <li key={r.kw} style={appear(100 + i * 120)} className="flex items-center justify-between gap-3 text-[0.95rem]">
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
          {typed("painter virginia beach", t, 5200, 24) || " "}
        </div>
        <div className="mt-3 space-y-2">
          {t >= 6600 ? (
            <div style={appear(0)} className="rounded-lg bg-[#fff7ed] px-3 py-2 shadow-[0_0_0_2px_var(--color-accent)]">
              <p className="text-[0.85rem] text-[#555]">Painter · Virginia Beach, VA</p>
              <p className="text-[1.15rem] font-semibold text-[#1a0dab]">Two Koats Painting</p>
            </div>
          ) : null}
          {[0, 1].map((i) =>
            t >= 7000 + i * 300 ? (
              <div key={i} style={appear(0)} className="rounded-lg px-3 py-2">
                <div className="h-3 w-28 rounded bg-[#e5e5e5]" />
                <div className="mt-1.5 h-4 w-44 rounded bg-[#d4d4d8]" />
              </div>
            ) : null,
          )}
        </div>
        {t > 8800 ? (
          <p style={appear(0)} className="mt-auto self-start rounded-full bg-accent px-3 py-1 text-[0.9rem] font-semibold text-accent-fg">
            They typed the job, not his name.
          </p>
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/*  8 · Citations: Potts Brothers, every listing checked against one NAP     */
/* ------------------------------------------------------------------------ */

/**
 * Potts Brothers Construction, Arlington VA. Name, phone and address from
 * cjp-vault clients/potts-brothers.md frontmatter (address publication
 * approved 2026-09-17). The listings are the ones in the Citations slide's
 * own screenshots. Nothing claims a listing was ever wrong: each one is
 * checked and ticks Matched.
 */
const NAP = {
  name: "Potts Brothers Construction",
  phone: "(703) 866-5400",
  address: "2451 Crystal Dr, Suite 614A, Arlington, VA",
};
const LISTINGS = ["Google", "Facebook", "Instagram", "Angi", "BBB", "Houzz", "Nextdoor"];

export const CITATIONS_MS = 10000;
export function CitationsDemo(t: number): ReactNode {
  const checkedAt = (i: number) => 1800 + i * 850;
  const matched = LISTINGS.filter((_, i) => t >= checkedAt(i)).length;
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
        <p className="flex items-center justify-between text-[0.95rem] text-subtle">
          <span>One name, one phone, one address</span>
          <Tag real>Real</Tag>
        </p>
        <p style={appear(200)} className="mt-1 text-[1.15rem] font-semibold text-fg">
          {NAP.name}
        </p>
        <p style={appear(500)} className="text-[1rem] text-muted">
          {NAP.phone} · {NAP.address}
        </p>
      </div>
      <div className="flex min-h-0 flex-1 flex-col rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
        <p className="flex items-center justify-between text-[0.95rem] text-subtle">
          <span>Everywhere they&rsquo;re listed</span>
          <span className={cn("font-semibold tabular-nums", matched === LISTINGS.length ? "text-[#22c55e]" : "text-fg")}>
            {matched} of {LISTINGS.length} match
          </span>
        </p>
        <ul className="mt-2 space-y-1.5">
          {LISTINGS.map((site, i) => {
            const checking = t >= checkedAt(i) - 600 && t < checkedAt(i);
            const done = t >= checkedAt(i);
            return (
              <li
                key={site}
                style={appear(900 + i * 90)}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-md px-3 py-1.5 text-[1rem] transition-colors duration-300",
                  checking && "bg-surface-2",
                )}
              >
                <span className="font-semibold text-fg">{site}</span>
                {done ? (
                  <span className="flex items-center gap-1.5 text-[0.95rem] text-[#22c55e]">
                    <Check className="size-4" strokeWidth={3} aria-hidden /> Matched
                  </span>
                ) : (
                  <span className="text-[0.95rem] text-subtle">{checking ? "Checking…" : "—"}</span>
                )}
              </li>
            );
          })}
        </ul>
        {t > 8200 ? (
          <p style={appear(0)} className="mt-auto rounded-full bg-accent px-3 py-1 text-center text-[0.95rem] font-semibold text-accent-fg">
            Google sees one business, everywhere.
          </p>
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/*  9 · When the phone rings: the missed-call thread, in the slide           */
/* ------------------------------------------------------------------------ */

/** No real client conversation exists to show, so this stays the example thread. */
export const PHONE_MS = 10000;
export function PhoneDemo(t: number): ReactNode {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full max-w-[440px] rounded-[2.6rem] bg-[#050505] p-2.5 shadow-[0_0_0_2px_#2e2e2e,0_40px_90px_-30px_rgba(0,0,0,0.9)]">
        <div className="flex h-[520px] flex-col overflow-hidden rounded-[2.1rem] bg-bg-elevated">
          <div className="flex items-center gap-3 border-b border-line px-5 pt-5 pb-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-surface-2">
              <MessageSquare className="size-5 text-accent" aria-hidden />
            </span>
            <span className="flex-1">
              <span className="block text-[1.15rem] font-semibold text-fg">New customer</span>
              <span className="block text-[0.9rem] text-subtle">Example conversation</span>
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-end gap-2.5 overflow-hidden px-4 pb-4 text-[0.95rem] [&_p]:text-[1rem]">
            {MISSED_CALL_STEPS.map((s, i) =>
              t >= s.at ? (
                <div key={i} style={appear(0)}>
                  {s.node}
                </div>
              ) : null,
            )}
            {t >= 9000 ? (
              <div style={appear(0)} className="flex justify-center">
                <span className="rounded-full bg-[#15803d] px-4 py-1.5 text-[0.95rem] font-semibold text-white">
                  Lead saved · it stayed yours
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
