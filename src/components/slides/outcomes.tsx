import { useState } from "react";
import { Display, Kicker, SlidePad } from "./primitives";
import {
  Browser,
  GoogleSearch,
  Invoice,
  LockScreen,
  PhoneAlert,
  Replay,
  Result,
  Tap,
  appear,
  money,
  prog,
  useElapsed,
} from "./demo-kit";
import { cn } from "@/lib/utils";

/**
 * Client outcomes, played out on the client's real website (29 Sept 2026:
 * "show his website, show proof, don't just show words"). The sites are
 * full-page screenshots taken 29 Sept (public/slides/proof). The Google
 * search, the phone alert and the invoice are an illustration of how the job
 * came in, and the slide says so; the dollar figures are the real part.
 */

function Stage({
  ms,
  children,
}: {
  ms: number;
  children: (t: number) => React.ReactNode;
}) {
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
  return <div className="mt-5 flex min-h-0 flex-1 flex-col">{children(t)}</div>;
}

/** Full-page site screenshot inside a browser, scrolled by `y` (px of the 800px-wide image). */
function Site({ src, y, height = 430 }: { src: string; y: number; height?: number }) {
  return (
    <div className="relative overflow-hidden" style={{ height }}>
      <img
        src={src}
        alt=""
        className="w-full"
        style={{ transform: `translateY(-${y}px)`, transition: "transform 120ms linear" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/*  R&D Plumbing                                                             */
/* ------------------------------------------------------------------------ */

/**
 * RD_JOB is Christian's figure (29 Sept 2026: "I got him a twenty thousand
 * dollar job"). It is NOT in cjp-vault clients/rd-plumbing.md. He is calling
 * Duncan live to confirm it. Change it here only.
 */
const RD_JOB = 20_000;
const RD_MS = 13_000;

function RdRun(t: number) {
  const onSite = t >= 3300;
  // hero → down through services and gallery → back up to the estimate form
  const y =
    t < 4200 ? 0 : t < 6800 ? 2600 * prog(t, 4200, 2600) : 2600 - 1950 * prog(t, 6800, 1400);
  return (
    <div className="grid min-h-0 flex-1 gap-8 min-[901px]:grid-cols-[1.5fr_1fr]">
      <div style={appear(100)}>
        <Browser url={onSite ? "rdplumbingco.com" : "google.com/search?q=plumber+baldwin+county"}>
          {onSite ? (
            <div className="relative">
              <Site src="/slides/proof/rd-scroll.jpg" y={y} />
              {t > 8400 ? (
                <div
                  style={appear(0)}
                  className="absolute right-6 bottom-6 flex items-center gap-2 rounded-lg bg-[#15803d] px-4 py-3 text-[1.1rem] font-semibold text-white shadow-lg"
                >
                  <span className="relative">
                    Estimate request sent
                    <Tap at={0} />
                  </span>
                </div>
              ) : null}
            </div>
          ) : (
            <GoogleSearch q="plumber baldwin county" t={t} typeAt={300}>
              {t > 1900 ? (
                <div style={appear(0)} className="space-y-2">
                  <div className="relative">
                    <Result hot label="rdplumbingco.com" title="R&D Plumbing Co. | Baldwin County Plumber" line="Commercial and custom residential plumbing across Baldwin County…" />
                    {t > 2600 ? <Tap at={0} /> : null}
                  </div>
                  <Result label="Plumber · Baldwin County" title="Another plumbing company" line="…" />
                  <Result label="Directory" title="Top 10 plumbers near you" line="…" />
                </div>
              ) : null}
            </GoogleSearch>
          )}
        </Browser>
        <p className="mt-3 text-[1.05rem] text-subtle">
          {onSite ? "rdplumbingco.com · the real site, scrolled" : "Someone searches. He's there."}
        </p>
      </div>
      <div className="relative">
        <LockScreen>
          <PhoneAlert
            t={t}
            at={8900}
            app="rdplumbingco.com"
            title="New estimate request"
            line="Homeowner · wants a quote this week"
          />
        </LockScreen>
        {t > 10000 ? (
          <div className="absolute inset-x-0 bottom-0">
            <Invoice from="R&D Plumbing Co." job="One job" amount={RD_JOB} t={t} at={10000} />
          </div>
        ) : null}
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
const AG_MS = 12_500;

function AgRun(t: number) {
  const y = 4400 * prog(t, 800, 9000);
  const landed = AG_LEADS.filter((_, i) => t > 1500 + i * 380);
  const site = landed.filter((s) => s === "site").length;
  const ads = landed.length - site;
  const clicks = Math.round(12 + 30 * prog(t, 8600, 1800));
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
          <p className="slide-num font-display text-[5rem] leading-none font-semibold text-accent tabular-nums">
            {landed.length}
          </p>
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
        {t > 8400 ? (
          <div style={appear(0)} className="rounded-xl bg-surface px-6 py-5 shadow-[var(--shadow-border)]">
            <p className="font-display text-lg font-semibold uppercase tracking-display text-subtle">Clicks from Google search</p>
            <Bar label="17 days before" value={12} />
            <Bar label="17 days after" value={clicks} accent />
          </div>
        ) : null}
        {t > 10600 ? (
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
/*  A2Z Concrete: an ad → calls → one $37,000 driveway                       */
/* ------------------------------------------------------------------------ */

/** Figures on record in the deck since PR #8: ~$3,000 spend (~$500/mo), 25 tracked leads, one $37,000 driveway. */
const A2Z_MS = 14_500;

function A2zRun(t: number) {
  const onReport = t >= 4200;
  const k = prog(t, 4600, 3200);
  const spend = Math.round(3000 * k);
  const leads = Math.round(25 * k);
  const barK = prog(t, 11200, 1400);
  return (
    <div className="grid min-h-0 flex-1 gap-8 min-[901px]:grid-cols-[1.5fr_1fr]">
      <div style={appear(100)} className="flex min-h-0 flex-col">
        {onReport ? (
          <div style={appear(0)} className="flex min-h-0 flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Tile label="Ad spend" value={money(spend)} sub="About $500 a month" />
              <Tile label="Tracked leads" value={String(leads)} sub="Calls and forms" />
            </div>
            <div className="min-h-0 overflow-hidden rounded-xl bg-white p-2 shadow-[var(--shadow-border)]">
              <img src="/slides/user-added/a2z-leads.png" alt="A2Z Concrete Google Ads lead report" className="max-h-[250px] w-full object-contain" />
            </div>
            {t > 11000 ? (
              <div style={appear(0)} className="space-y-2">
                <MoneyBar label="Ad spend" value="$3,000" pct={(3000 / 37000) * 100 * barK} />
                <MoneyBar label="One driveway" value="$37,000" pct={100 * barK} accent />
              </div>
            ) : null}
          </div>
        ) : (
          <Browser url="google.com/search?q=concrete+driveway+near+me">
            <GoogleSearch q="concrete driveway near me" t={t} typeAt={300}>
              {t > 1900 ? (
                <div style={appear(0)} className="space-y-2">
                  <div className="relative">
                    <Result hot label="Sponsored · A2Z Concrete" title="Concrete Driveways · Free Estimates" line="Call now · Driveways, patios, foundations" />
                    {t > 2800 ? <Tap at={0} /> : null}
                  </div>
                  <Result label="Sponsored" title="Another concrete company" line="…" />
                  <Result label="Directory" title="Best concrete contractors near you" line="…" />
                </div>
              ) : null}
            </GoogleSearch>
          </Browser>
        )}
        <p className="mt-3 text-[1.05rem] text-subtle">
          {onReport ? "A2Z's real Google Ads lead report" : "The ad we run. Illustration."}
        </p>
      </div>
      <div className="relative">
        <LockScreen>
          <PhoneAlert t={t} at={3200} app="Phone" title="Incoming call" line="From your Google ad" />
        </LockScreen>
        {t > 8200 ? (
          <div className="absolute inset-x-0 bottom-0">
            <Invoice from="A2Z Concrete" job="Driveway" amount={37_000} t={t} at={8200} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Tile({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl bg-surface px-6 py-4 shadow-[var(--shadow-border)]">
      <p className="font-display text-lg font-semibold uppercase tracking-display text-subtle">{label}</p>
      <p className="slide-num font-display text-[3.2rem] leading-none font-semibold text-fg tabular-nums">{value}</p>
      <p className="mt-1 text-[1rem] text-muted">{sub}</p>
    </div>
  );
}

function MoneyBar({ label, value, pct, accent }: { label: string; value: string; pct: number; accent?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-40 shrink-0 text-[1.05rem] text-muted">{label}</span>
      <div className="h-8 flex-1 overflow-hidden rounded-md bg-bg">
        <div className={cn("h-full rounded-md", accent ? "bg-[#15803d]" : "bg-line-strong")} style={{ width: `${pct}%` }} />
      </div>
      <span className={cn("w-28 shrink-0 text-right font-display text-2xl font-semibold tabular-nums", accent ? "text-[#22c55e]" : "text-fg")}>{value}</span>
    </div>
  );
}

export function AdsDemoSlide() {
  return (
    <SlidePad>
      <Kicker>When you&rsquo;re ready for ads · A2Z Concrete</Kicker>
      <Display className="mt-3 text-4xl min-[701px]:text-[3rem]">
        About $3,000 in ads. <span className="text-accent">One $37,000 driveway.</span>
      </Display>
      <Stage ms={A2Z_MS}>{A2zRun}</Stage>
      <p className="-mt-8 text-[1.1rem] text-muted">
        Richard, SmithStraw: <span className="text-fg">49 tracked results, 31 of them phone calls.</span>
      </p>
    </SlidePad>
  );
}
