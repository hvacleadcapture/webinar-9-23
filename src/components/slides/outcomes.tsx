import { useState } from "react";
import { Display, Kicker, SlidePad } from "./primitives";
import {
  Browser,
  GoogleSearch,
  Replay,
  Result,
  Tap,
  appear,
  money,
  prog,
  typed,
  useElapsed,
} from "./demo-kit";
import { cn } from "@/lib/utils";

/**
 * Client outcomes, played out on the client's real website (29 Sept 2026:
 * "show his website, show proof, don't just show words"). The sites are
 * full-page screenshots taken 29 Sept (public/slides/proof). The Google
 * searches are an illustration of how the work came in, and say so; the
 * figures are the real part. No invoices or PAID stamps (his call, 29 Sept):
 * the money shows up where the client would actually record it.
 */

function Stage({ ms, children }: { ms: number; children: (t: number) => React.ReactNode }) {
  const [run, setRun] = useState(0);
  return (
    <>
      <StageClock key={run} ms={ms}>
        {children}
      </StageClock>
      <div className="flex justify-end">
        <Replay onClick={() => setRun((r) => r + 1)} />
      </div>
    </>
  );
}

function StageClock({ ms, children }: { ms: number; children: (t: number) => React.ReactNode }) {
  const t = useElapsed(ms + 300);
  return <div className="mt-5 flex min-h-0 flex-1 flex-col">{children(Math.min(t, ms))}</div>;
}

/** Full-page site screenshot inside a browser, scrolled by `y` (px of the 800px-wide image). */
function Site({ src, y, height = 430 }: { src: string; y: number; height?: number }) {
  return (
    <div className="relative overflow-hidden" style={{ height }}>
      <img
        src={src}
        alt=""
        className="w-full"
        style={{ transform: `translate3d(0, -${y}px, 0)`, willChange: "transform" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/*  Signal, drawn in the app's own look (see public/slides/signal/*.jpg)     */
/* ------------------------------------------------------------------------ */

type Lead = { name: string; line: string; when: string };

function SignalPhone({
  business,
  leads,
  children,
}: {
  business: string;
  leads: Lead[];
  children?: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[360px] rounded-[2.6rem] bg-[#050505] p-2.5 shadow-[0_0_0_2px_#2e2e2e,0_40px_90px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex h-[520px] flex-col overflow-hidden rounded-[2.1rem] bg-[#f4f5f7] text-[#111827]">
        <div className="bg-gradient-to-b from-[#1e3a8a] to-[#172554] px-5 pt-8 pb-4 text-white">
          <p className="text-[1.25rem] font-bold leading-none">Signal</p>
          <p className="mt-1 text-[0.9rem] text-white/75">{business}</p>
        </div>
        <div className="mx-3 mt-3 flex gap-1 rounded-full bg-white p-1 text-[0.85rem] shadow-sm">
          {["Leads", "Messages", "Calendar", "Reviews"].map((tab, i) => (
            <span
              key={tab}
              className={cn("flex-1 rounded-full py-1.5 text-center", i === 0 ? "bg-[#eef2ff] font-semibold" : "text-[#6b7280]")}
            >
              {tab}
            </span>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-2 overflow-hidden px-3 pt-3">
          {leads.map((l) => (
            <div key={l.name + l.when} style={appear(0)} className="rounded-xl border-l-4 border-[#2563eb] bg-white px-3 py-2.5 shadow-sm">
              <div className="flex items-baseline justify-between">
                <p className="text-[1rem] font-semibold">{l.name}</p>
                <p className="text-[0.8rem] text-[#9ca3af]">{l.when}</p>
              </div>
              <p className="text-[0.85rem] text-[#2563eb]">{l.line}</p>
            </div>
          ))}
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/*  R&D Plumbing                                                             */
/* ------------------------------------------------------------------------ */

/**
 * RD_JOB is Christian's figure (29 Sept 2026: "I got him a twenty thousand
 * dollar job"). It is NOT in cjp-vault clients/rd-plumbing.md; he is
 * confirming it with Duncan. Shown as a note on the lead in Signal, marked
 * Closed. Change it here only.
 */
const RD_JOB = 20_000;
const RD_MS = 21_000;

function RdRun(t: number) {
  const onSite = t >= 4800;
  // land on the hero and hold, slow scroll through services and gallery, back up to the estimate form
  const y = t < 7500 ? 0 : t < 12500 ? 2600 * prog(t, 7500, 5000) : 2600 - 1950 * prog(t, 12500, 2200);
  const newLead = t > 15500;
  const opened = t > 17000;
  const closed = t > 17900;
  const note = typed(`${money(RD_JOB)} job.`, t, 18400, 12);
  return (
    <div className="grid min-h-0 flex-1 gap-8 min-[901px]:grid-cols-[1.5fr_1fr]">
      <div style={appear(100)}>
        <Browser url={onSite ? "rdplumbingco.com" : "google.com/search?q=plumber+baldwin+county"}>
          {onSite ? (
            <div className="relative">
              <Site src="/slides/proof/rd-scroll.jpg" y={y} />
              {t > 14600 ? (
                <div
                  style={appear(0)}
                  className="absolute right-6 bottom-6 rounded-lg bg-[#15803d] px-4 py-3 text-[1.1rem] font-semibold text-white shadow-lg"
                >
                  Estimate request sent
                </div>
              ) : null}
            </div>
          ) : (
            <GoogleSearch q="plumber baldwin county" t={t} typeAt={400}>
              {t > 2600 ? (
                <div style={appear(0)} className="space-y-2">
                  <div className="relative">
                    <Result
                      hot
                      label="rdplumbingco.com"
                      title="R&D Plumbing Co. | Baldwin County Plumber"
                      line="Commercial and custom residential plumbing across Baldwin County…"
                    />
                    {t > 3800 ? <Tap at={0} /> : null}
                  </div>
                  <Result label="Plumber · Baldwin County" title="Another plumbing company" line="…" />
                  <Result label="Directory" title="Top 10 plumbers near you" line="…" />
                </div>
              ) : null}
            </GoogleSearch>
          )}
        </Browser>
        <p className="mt-3 text-[1.05rem] text-subtle">
          {onSite ? "rdplumbingco.com · the real site" : "Someone searches. He's there. (Illustration)"}
        </p>
      </div>
      <div>
        <SignalPhone
          business="R&D Plumbing Co."
          leads={newLead ? [{ name: "New lead · website", line: "Estimate request · wants a quote", when: "just now" }] : []}
        >
          {newLead && !opened ? (
            <p style={appear(0)} className="mt-1 text-center text-[0.9rem] text-[#6b7280]">
              His phone buzzes.
            </p>
          ) : null}
          {opened ? (
            <div style={appear(0)} className="rounded-xl bg-white px-3 py-3 shadow-sm">
              <div className="flex gap-1.5 text-[0.85rem]">
                <span className="rounded-full bg-[#ede9fe] px-2.5 py-1 text-[#6d28d9]">Contacted</span>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 transition-colors duration-300",
                    closed ? "bg-[#dcfce7] font-semibold text-[#15803d]" : "bg-[#f3f4f6] text-[#6b7280]",
                  )}
                >
                  Closed
                </span>
              </div>
              <p className="mt-3 text-[0.8rem] uppercase tracking-wide text-[#9ca3af]">Note</p>
              <p className="mt-1 min-h-[2.8rem] rounded-lg border border-[#e5e7eb] px-3 py-2 text-[1.5rem] font-bold text-[#15803d]">
                {note}
              </p>
            </div>
          ) : null}
        </SignalPhone>
        <p className="mt-3 text-center text-[1.05rem] text-subtle">What it looks like in the app</p>
      </div>
    </div>
  );
}

export function RdOutcomeSlide() {
  return (
    <SlidePad>
      <Kicker>Duncan · R&amp;D Plumbing · Baldwin County, AL</Kicker>
      <Display className="mt-3 text-4xl min-[701px]:text-[3rem]">
        Found on Google. <span className="text-accent">One job: {money(RD_JOB)}.</span>
      </Display>
      <Stage ms={RD_MS}>{RdRun}</Stage>
    </SlidePad>
  );
}

/* ------------------------------------------------------------------------ */
/*  AutoGloss                                                                */
/* ------------------------------------------------------------------------ */

/**
 * On record (clients/autogloss.md, 27 Sept): site live 10 Sept, 18 real leads
 * in two weeks, 10 from the site and 8 from the ads page; Search Console
 * clicks 42 vs 12 over the 17 days after vs before. Leads show as source only.
 */
const AG_LEADS: ("site" | "ads")[] = [
  "site", "ads", "site", "site", "ads", "site", "ads", "site", "ads",
  "site", "ads", "site", "ads", "site", "ads", "site", "ads", "site",
];
const AG_MS = 22_000;

function AgRun(t: number) {
  // slow: land on the hero and hold, then scroll the whole site
  const y = t < 3000 ? 0 : 4400 * prog(t, 3000, 15000);
  const landed = AG_LEADS.filter((_, i) => t > 3000 + i * 650);
  const site = landed.filter((s) => s === "site").length;
  const ads = landed.length - site;
  const clicks = Math.round(12 + 30 * prog(t, 15500, 2500));
  return (
    <div className="grid min-h-0 flex-1 gap-8 min-[901px]:grid-cols-[1.35fr_1fr]">
      <div style={appear(100)}>
        <Browser url="autoglossnc.com">
          <Site src="/slides/proof/autogloss-scroll.jpg" y={y} />
        </Browser>
        <p className="mt-3 text-[1.05rem] text-subtle">autoglossnc.com · the real site, live since Sept 10</p>
      </div>
      <div className="flex min-h-0 flex-col gap-4">
        <div className="flex items-baseline gap-4">
          <p className="slide-num font-display text-[5rem] leading-none font-semibold text-accent tabular-nums">{landed.length}</p>
          <p className="text-[1.4rem] leading-tight text-fg">
            real leads, first two weeks
            <span className="block text-[1.1rem] text-muted">
              {site} from the site · {ads} from the ads page
            </span>
          </p>
        </div>
        <ol className="grid grid-cols-6 gap-2">
          {landed.map((src, i) => (
            <li
              key={i}
              style={appear(0, 320)}
              className={cn(
                "rounded-md py-2 text-center text-[0.9rem] font-semibold",
                src === "site" ? "bg-accent text-accent-fg" : "bg-surface-2 text-fg",
              )}
            >
              {src === "site" ? "Site" : "Ads"}
            </li>
          ))}
        </ol>
        {t > 15000 ? (
          <div style={appear(0)} className="rounded-xl bg-surface px-6 py-5 shadow-[var(--shadow-border)]">
            <p className="font-display text-lg font-semibold uppercase tracking-display text-subtle">Clicks from Google search</p>
            <Bar label="17 days before" value={12} />
            <Bar label="17 days after" value={clicks} accent />
          </div>
        ) : null}
        {t > 18500 ? (
          <blockquote style={appear(0)} className="border-l-4 border-accent pl-5">
            <p className="text-[1.5rem] leading-snug text-fg">&ldquo;It&rsquo;s hitting all my expectations.&rdquo;</p>
            <footer className="mt-1 text-[1rem] text-subtle">Jeff Miller, owner · 27 Sept</footer>
          </blockquote>
        ) : null}
      </div>
    </div>
  );
}

function Bar({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="mt-3">
      <div className="flex justify-between text-[1.05rem]">
        <span className="text-muted">{label}</span>
        <span className={cn("slide-num font-semibold tabular-nums", accent ? "text-accent" : "text-fg")}>{value}</span>
      </div>
      <div className="mt-1 h-3.5 overflow-hidden rounded-full bg-bg">
        <div className={cn("h-full rounded-full", accent ? "bg-accent" : "bg-line-strong")} style={{ width: `${(value / 42) * 100}%` }} />
      </div>
    </div>
  );
}

export function AutoGlossLiveSlide() {
  return (
    <SlidePad>
      <Kicker>Jeff Miller · AutoGloss · Fuquay-Varina, NC</Kicker>
      <Display className="mt-3 text-4xl min-[701px]:text-[3rem]">
        New site Sept 10. <span className="text-accent">18 leads in two weeks.</span>
      </Display>
      <Stage ms={AG_MS}>{AgRun}</Stage>
    </SlidePad>
  );
}

/* ------------------------------------------------------------------------ */
/*  A2Z Concrete: foundation first, then scale with ads                      */
/* ------------------------------------------------------------------------ */

/**
 * On record: Steve Sommers, A2Z Concrete (clients/a2z-concrete.md; longest
 * client; website + GBP + Google Ads). About $3,000 in ad spend over about six
 * months at roughly $500 a month, 25 tracked leads, one $37,000 driveway (all
 * in the deck since PR #8). ~$120 a lead is $3,000 / 25. Christian, 29 Sept:
 * "one job paid for the whole service plus ad spend, only after the
 * foundation."
 */
const A2Z_MS = 21_000;

function A2zRun(t: number) {
  const k = prog(t, 5200, 7000);
  const months = Math.min(6, Math.floor(k * 6.0001));
  const spend = Math.round(3000 * k);
  const leads = Math.round(25 * k);
  const perLead = leads ? Math.round(spend / leads) : 0;
  return (
    <div className="grid min-h-0 flex-1 gap-8 min-[901px]:grid-cols-[1.25fr_1fr]">
      <div className="flex min-h-0 flex-col">
        {t < 5000 ? (
          <div style={appear(100)}>
            <Browser url="google.com/search?q=concrete+driveway+near+me">
              <GoogleSearch q="concrete driveway near me" t={t} typeAt={400}>
                {t > 2600 ? (
                  <div style={appear(0)} className="space-y-2">
                    <div className="relative">
                      <Result hot label="Sponsored · A2Z Concrete" title="Concrete Driveways · Free Estimates" line="Driveways, patios, foundations · Call now" />
                      {t > 3800 ? <Tap at={0} /> : null}
                    </div>
                    <Result label="Sponsored" title="Another concrete company" line="…" />
                  </div>
                ) : null}
              </GoogleSearch>
            </Browser>
            <p className="mt-3 text-[1.05rem] text-subtle">His ad, on top. (Illustration)</p>
          </div>
        ) : (
          <div style={appear(0)} className="flex min-h-0 flex-col gap-4">
            <div className="rounded-xl bg-surface px-6 py-5 shadow-[var(--shadow-border)]">
              <p className="font-display text-lg font-semibold uppercase tracking-display text-subtle">Six months of ads</p>
              <div className="mt-3 grid grid-cols-6 gap-2">
                {[1, 2, 3, 4, 5, 6].map((m) => (
                  <div
                    key={m}
                    className={cn(
                      "rounded-md py-2 text-center text-[1rem] font-semibold transition-colors duration-500",
                      m <= months ? "bg-accent text-accent-fg" : "bg-bg text-subtle",
                    )}
                  >
                    Mo {m}
                  </div>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-4">
                <Tile label="Spent" value={money(spend)} />
                <Tile label="Leads" value={String(leads)} />
                <Tile label="Per lead" value={perLead ? `~${money(perLead)}` : "—"} />
              </div>
            </div>
            <div className="min-h-0 overflow-hidden rounded-xl bg-white p-2 shadow-[var(--shadow-border)]">
              <img src="/slides/user-added/a2z-leads.png" alt="A2Z Concrete's Google Ads lead report" className="max-h-[200px] w-full object-contain" />
            </div>
            <p className="text-[1.05rem] text-subtle">A2Z&rsquo;s real Google Ads lead report</p>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center gap-4">
        {t > 13000 ? (
          <div style={appear(0)} className="rounded-2xl bg-surface-warm px-7 py-6 shadow-[0_0_0_2px_var(--color-accent)]">
            <p className="font-display text-xl font-semibold uppercase tracking-display text-fg">One of those leads</p>
            <p className="slide-num mt-1 font-display text-[4.6rem] leading-none font-semibold text-accent tabular-nums">
              {money(Math.round(37_000 * prog(t, 13300, 1800)))}
            </p>
            <p className="mt-2 text-[1.3rem] text-fg">A driveway.</p>
          </div>
        ) : null}
        {t > 16000 ? (
          <div style={appear(0)} className="rounded-2xl bg-surface px-7 py-6 shadow-[var(--shadow-border)]">
            <p className="text-[1.45rem] leading-snug text-fg">
              That one job paid for <span className="font-semibold text-accent">the whole service</span> and{" "}
              <span className="font-semibold text-accent">all the ad spend.</span>
            </p>
          </div>
        ) : null}
        {t > 18500 ? (
          <p style={appear(0)} className="px-2 font-display text-2xl font-semibold uppercase tracking-display text-fg">
            Only after the foundation.
          </p>
        ) : null}
      </div>
    </div>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.95rem] uppercase tracking-wide text-subtle">{label}</p>
      <p className="slide-num font-display text-[2.6rem] leading-none font-semibold text-fg tabular-nums">{value}</p>
    </div>
  );
}

export function AdsDemoSlide() {
  return (
    <SlidePad>
      <Kicker>Steve · A2Z Concrete · when you&rsquo;re ready to scale</Kicker>
      <Display className="mt-3 text-4xl min-[701px]:text-[3rem]">
        Foundation&rsquo;s in. <span className="text-accent">Now we go get more traffic.</span>
      </Display>
      <Stage ms={A2Z_MS}>{A2zRun}</Stage>
    </SlidePad>
  );
}
