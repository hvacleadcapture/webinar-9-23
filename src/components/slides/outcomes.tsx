import { useState } from "react";
import { Phone as PhoneIcon } from "lucide-react";
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
import {
  Banner,
  FeedHead,
  LeadDetails,
  LeadRow,
  LockScreen,
  PhoneShell,
  SignalScreen,
  SmsScreen,
  TapRing,
  Tracker,
  riseIn,
  type FeedStatus,
  type RowData,
} from "./signal-app";

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

/** A browser window with a content area of fixed height (the kit's Browser is 430px). */
function BrowserFrame({ url, height, children }: { url: string; height: number; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#f6f6f4] shadow-[0_0_0_2px_#2e2e2e,0_40px_90px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-2 bg-[#e4e4e0] px-4 py-2.5">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-[0.95rem] text-[#555]">{url}</span>
      </div>
      <div className="relative overflow-hidden text-[#1a1a1a]" style={{ height }}>
        {children}
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
const RD_MS = 35_000;

/*
 * The estimate form is R&D's real form (public/slides/proof/rd-form-card.jpg,
 * captured 29 Sept at 2x). Field boxes are its real positions, in the card's
 * own CSS px (576 × 843), measured off the live page. Karen is a sample
 * customer: the slide tags the flow as an illustration.
 */
const FORM_W = 576;
const FORM_SHOWN = 600; // px the card is drawn at
const FS = FORM_SHOWN / FORM_W;
const KAREN = {
  name: "Karen W.",
  email: "karen.w@example.com",
  phone: "(251) 555-0147",
  type: "Repairs & service",
  details: "Whole-house repipe, 1970s home in Daphne. Can you quote it?",
};
const FIELDS: { key: keyof typeof KAREN; x: number; y: number; w: number; h: number; at: number; cps: number }[] = [
  { key: "name", x: 26, y: 218, w: 243, h: 50, at: 11200, cps: 12 },
  { key: "email", x: 285, y: 218, w: 243, h: 50, at: 12300, cps: 16 },
  { key: "phone", x: 26, y: 314, w: 243, h: 50, at: 13900, cps: 14 },
  { key: "details", x: 26, y: 410, w: 503, h: 146, at: 17000, cps: 20 },
];

function RdForm({ t }: { t: number }) {
  // top of the card → the fields, then down to the details box and the button
  const y = 170 + 230 * prog(t, 15900, 900);
  const sent = t > 20700;
  return (
    <div className="absolute inset-0 flex justify-center bg-[#f4f4f4]">
      <div className="relative" style={{ width: FORM_SHOWN, transform: `translate3d(0, ${-y * FS}px, 0)` }}>
        <img src="/slides/proof/rd-form-card.jpg" alt="R&D Plumbing's estimate form" className="block w-full" />
        {FIELDS.map((f) => {
          const v = typed(KAREN[f.key], t, f.at, f.cps);
          const focused = t >= f.at && t < f.at + (KAREN[f.key].length / f.cps) * 1000 + 300;
          if (!v && !focused) return null;
          return (
            <div
              key={f.key}
              className="absolute bg-white"
              style={{
                left: f.x * FS,
                top: f.y * FS,
                width: f.w * FS,
                height: f.h * FS,
                padding: `${14 * FS}px ${17 * FS}px`,
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 16 * FS,
                lineHeight: 1.45,
                color: "#111",
                border: `${focused ? 2 : 1}px solid ${focused ? "#111" : "#d4d4d4"}`,
              }}
            >
              {v}
              {focused ? <span className="ml-px inline-block h-[1.05em] w-0.5 bg-[#111] align-[-0.15em]" /> : null}
            </div>
          );
        })}
        {t > 15300 ? (
          <div
            className="absolute flex items-center justify-between bg-white"
            style={{
              left: 285 * FS,
              top: 314 * FS,
              width: 243 * FS,
              height: 48 * FS,
              padding: `0 ${14 * FS}px 0 ${21 * FS}px`,
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 16 * FS,
              color: "#111",
              border: "1px solid #d4d4d4",
              ...riseIn(t, 15300, 250),
            }}
          >
            {KAREN.type}
            <span className="text-[0.8em]">▾</span>
          </div>
        ) : null}
        <div className="absolute" style={{ left: 25 * FS, top: 671 * FS, width: 512 * FS, height: 54 * FS }}>
          {sent ? (
            <div className="flex h-full items-center justify-center bg-[#15803d] font-semibold text-white" style={{ fontSize: 15 * FS }}>
              ✓ Sent. Duncan will get back to you.
            </div>
          ) : null}
          <TapRing t={t} at={20300} />
        </div>
      </div>
    </div>
  );
}

const RD_ROW: RowData = { key: "karen", title: "Karen W.", sub: "Daphne · Repairs & service", time: "just now", status: "new", tel: true };
const RD_FACTS = {
  name: "Karen W.",
  city: "Daphne",
  phone: KAREN.phone,
  email: KAREN.email,
  service: KAREN.type,
  message: KAREN.details,
  from: "rdplumbingco.com · estimate form",
};

function DuncanPhone({ t }: { t: number }) {
  const buzz = t > 21000 && t < 21700 ? Math.sin((t - 21000) / 18) * 4 : 0;
  if (t < 24000) {
    return (
      <PhoneShell scale={0.72} height={680} shake={buzz}>
        <LockScreen>
          {t > 21000 ? (
            <div style={{ ...riseIn(t, 21000), position: "relative" }}>
              <Banner title="New lead · R&D Plumbing Co." body={`Karen W. · ${KAREN.type}\nDaphne · wants a quote`} />
              <TapRing t={t} at={23400} dark />
            </div>
          ) : null}
        </LockScreen>
      </PhoneShell>
    );
  }
  const open = t > 25700;
  const status: FeedStatus = t > 30600 ? "closed" : t > 28600 ? "contacted" : "new";
  const drafting = t > 30700 && t < 33000;
  const draft = drafting ? typed(`${money(RD_JOB)} job.`, t, 31100, 10) : null;
  const saved = t >= 33000;
  const scroll = open ? 110 * prog(t, 26000, 800) + 110 * prog(t, 30700, 700) : 0;
  return (
    <PhoneShell scale={0.72} height={680}>
      <SignalScreen org="R&D Plumbing Co." view="feed" scroll={scroll}>
        <FeedHead />
        <ul className="sig-list" style={{ listStyle: "none", padding: 0 }}>
          <LeadRow
            r={{ ...RD_ROW, status, time: status === "closed" ? "3d ago" : RD_ROW.time }}
            open={open}
            tap={{ t, at: 25300 }}
            style={riseIn(t, 24100)}
          >
            <LeadDetails p={RD_FACTS} tapCall={{ t, at: 27200 }} />
            <Tracker
              t={t}
              status={status}
              draft={draft}
              note={saved ? `${money(RD_JOB)} job.` : undefined}
              taps={{ contacted: 28400, closed: 30400, save: 32700 }}
            />
          </LeadRow>
        </ul>
      </SignalScreen>
    </PhoneShell>
  );
}

function KarenPhone({ t }: { t: number }) {
  const buzz = t > 21300 && t < 22000 ? Math.sin((t - 21300) / 18) * 4 : 0;
  const text = "Thanks for reaching out to R&D Plumbing Co.! Duncan will call you shortly.";
  if (t < 22800) {
    return (
      <PhoneShell scale={0.5} height={680} shake={buzz}>
        <LockScreen>
          {t > 21300 ? (
            <div style={{ ...riseIn(t, 21300), position: "relative" }}>
              <Banner icon="messages" title="R&D Plumbing Co." body={text} />
            </div>
          ) : null}
        </LockScreen>
      </PhoneShell>
    );
  }
  return (
    <PhoneShell scale={0.5} height={680} statusDark bg="#fff">
      <SmsScreen from="R&D Plumbing Co." bubbles={[{ text, meta: "Sent automatically · seconds after her request", style: riseIn(t, 22900) }]} />
    </PhoneShell>
  );
}

function rdCaption(t: number) {
  if (t < 21000) return "Duncan's phone";
  if (t < 24000) return "His phone buzzes.";
  if (t < 27000) return "Everything she typed, right there.";
  if (t < 29300) return "He calls her back.";
  if (t < 30400) return "A few days later…";
  return "Job won. He logs it.";
}

function RdRun(t: number) {
  const onSite = t >= 4800;
  const onForm = t >= 10600;
  // land on the hero and hold, then scroll slowly through the real site
  const y = t < 6300 ? 0 : 1800 * prog(t, 6300, 3500);
  const url = onForm ? "rdplumbingco.com/#free-estimate" : onSite ? "rdplumbingco.com" : "google.com/search?q=plumber+baldwin+county";
  return (
    <div className="grid min-h-0 flex-1 items-start gap-6 min-[901px]:grid-cols-[1fr_auto_auto]">
      <div style={appear(100)} className="min-w-0">
        <BrowserFrame url={url} height={470}>
          {onForm ? (
            <RdForm t={t} />
          ) : onSite ? (
            <Site src="/slides/proof/rd-scroll.jpg" y={y} height={470} />
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
        </BrowserFrame>
        <p className="mt-3 text-[1.05rem] text-subtle">
          {onSite ? "rdplumbingco.com · R&D's real site and form." : "Someone searches. He's there."} Karen is a sample customer (illustration).
        </p>
      </div>
      <div className="flex flex-col items-center">
        <KarenPhone t={t} />
        <p className="mt-2 text-[1rem] text-subtle">{t < 21300 ? "Karen's phone" : "She hears back in seconds."}</p>
      </div>
      <div className="flex flex-col items-center">
        <DuncanPhone t={t} />
        {t > 33000 ? (
          <p className="mt-1 font-display text-xl font-semibold uppercase tracking-display text-accent" style={riseIn(t, 33000)}>
            {money(RD_JOB)} job. Logged.
          </p>
        ) : (
          <p className="mt-2 text-[1rem] text-fg">{rdCaption(t)}</p>
        )}
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
const A2Z_MS = 28_000;

/**
 * 29 Sept (later): the Google ad stays on screen the whole time (search → his
 * ad → his real landing page → a call), and the six-months numbers sit beside
 * it instead of replacing it. Landing page captured 29 Sept
 * (public/slides/proof/a2z-scroll.jpg); the call number is the one on it.
 */
function A2zRun(t: number) {
  const onSite = t >= 5500;
  const calling = t >= 7200;
  const k = prog(t, 9500, 8000);
  const months = Math.min(6, Math.floor(k * 6.0001));
  const spend = Math.round(3000 * k);
  const leads = Math.round(25 * k);
  const perLead = leads ? Math.round(spend / leads) : 0;
  // slow look down the page while the months fill, then back up to the hero
  const y = t < 11000 ? 0 : t < 16500 ? 1300 * prog(t, 11000, 5500) : 1300 - 1300 * prog(t, 16500, 2200);
  return (
    <div className="grid min-h-0 flex-1 gap-8 min-[901px]:grid-cols-[1.3fr_1fr]">
      <div style={appear(100)} className="flex min-h-0 flex-col">
        <Browser url={onSite ? "a2zconcretegainsville.com/landing-page" : "google.com/search?q=concrete+driveway+near+me"}>
          {onSite ? (
            <div className="relative">
              <Site src="/slides/proof/a2z-scroll.jpg" y={y} />
              {calling ? (
                <div
                  style={appear(0)}
                  className="absolute inset-x-6 bottom-5 flex items-center gap-3 rounded-xl bg-[#111827]/95 px-4 py-3 text-white shadow-lg"
                >
                  <span className="relative flex size-9 items-center justify-center rounded-full bg-[#16a34a]">
                    <PhoneIcon className="size-4" aria-hidden />
                    {t < 9000 ? <Tap at={0} /> : null}
                  </span>
                  <span className="text-[1.05rem] leading-tight">
                    <span className="block font-semibold">Calling A2Z Concrete</span>
                    <span className="block text-[0.9rem] text-white/70">From his Google ad</span>
                  </span>
                </div>
              ) : null}
            </div>
          ) : (
            <GoogleSearch q="concrete driveway near me" t={t} typeAt={400}>
              {t > 2600 ? (
                <div style={appear(0)} className="space-y-2">
                  <div className="relative">
                    <Result hot label="Sponsored · A2Z Concrete" title="Concrete Driveways · Free Estimates" line="Driveways, patios, foundations · Call now" />
                    {t > 4200 ? <Tap at={0} /> : null}
                  </div>
                  <Result label="Sponsored" title="Another concrete company" line="…" />
                </div>
              ) : null}
            </GoogleSearch>
          )}
        </Browser>
        <p className="mt-3 text-[1.05rem] text-subtle">
          {onSite ? "a2zconcretegainsville.com · his real landing page" : "His ad, on top. (Illustration)"}
        </p>
      </div>
      <div className="flex min-h-0 flex-col gap-3">
        {t >= 9000 ? (
          <div style={appear(0)} className="rounded-xl bg-surface px-6 py-4 shadow-[var(--shadow-border)]">
            <p className="font-display text-lg font-semibold uppercase tracking-display text-subtle">Six months of ads</p>
            <div className="mt-3 grid grid-cols-6 gap-1.5">
              {[1, 2, 3, 4, 5, 6].map((m) => (
                <div
                  key={m}
                  className={cn(
                    "rounded-md py-1.5 text-center text-[0.9rem] font-semibold transition-colors duration-500",
                    m <= months ? "bg-accent text-accent-fg" : "bg-bg text-subtle",
                  )}
                >
                  Mo {m}
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <Tile label="Spent" value={money(spend)} />
              <Tile label="Leads" value={String(leads)} />
              <Tile label="Per lead" value={perLead ? `~${money(perLead)}` : "—"} />
            </div>
          </div>
        ) : null}
        {t > 19000 ? (
          <div style={appear(0)} className="rounded-2xl bg-surface-warm px-7 py-4 shadow-[0_0_0_2px_var(--color-accent)]">
            <p className="font-display text-xl font-semibold uppercase tracking-display text-fg">One of those leads</p>
            <p className="slide-num mt-1 font-display text-[3.6rem] leading-none font-semibold text-accent tabular-nums">
              {money(Math.round(37_000 * prog(t, 19300, 2000)))}
            </p>
            <p className="mt-1 text-[1.2rem] text-fg">A driveway.</p>
          </div>
        ) : null}
        {t > 22500 ? (
          <p style={appear(0)} className="px-1 text-[1.35rem] leading-snug text-fg">
            That one job paid for <span className="font-semibold text-accent">the whole service</span> and{" "}
            <span className="font-semibold text-accent">all the ad spend.</span>
          </p>
        ) : null}
        {t > 25000 ? (
          <p style={appear(0)} className="px-1 font-display text-2xl font-semibold uppercase tracking-display text-fg">
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
      <p className="slide-num font-display text-[2.2rem] leading-none font-semibold text-fg tabular-nums">{value}</p>
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
