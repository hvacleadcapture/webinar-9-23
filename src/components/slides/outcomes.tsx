import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Check, Globe, MessageSquare, RotateCcw, Star, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Display, Kicker, SlidePad } from "./primitives";

/**
 * Outcomes shown while the system runs (29 Sept: "show outcomes, not systems,
 * but show the system producing them"). Same pattern as the missed-call demo:
 * each slide plays itself on arrival so he can talk over it, and "Play again"
 * remounts it.
 *
 * Every number here must be on record. Where one isn't, the comment says whose
 * figure it is. Demo conversations are labelled "Example" on the slide.
 */

function appear(at: number): CSSProperties {
  return { opacity: 0, animation: `rise-in 480ms var(--ease-out) ${at}ms forwards` };
}

/** Counts 0 → to, starting `delay` ms after mount, over `ms`. */
function useCount(to: number, delay: number, ms: number) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / ms));
      setV(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, delay, ms]);
  return v;
}

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

function Replay({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      data-no-advance
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="flex items-center gap-2 rounded-md px-4 py-2 text-[1.05rem] text-subtle transition-colors hover:bg-surface hover:text-fg"
    >
      <RotateCcw className="size-4" aria-hidden />
      Play again
    </button>
  );
}

function Phone({ title, sub, children }: { title: string; sub: string; children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      <div className="house-glow pointer-events-none absolute inset-x-[-10%] top-[10%] h-[80%] opacity-50" aria-hidden />
      <div className="relative rounded-[3rem] bg-[#050505] p-3 shadow-[0_0_0_2px_#2e2e2e,0_40px_90px_-30px_rgba(0,0,0,0.9)]">
        <div className="flex h-[560px] flex-col overflow-hidden rounded-[2.4rem] bg-bg-elevated">
          <div className="flex items-center gap-3 border-b border-line px-6 pt-6 pb-4">
            <span className="flex size-11 items-center justify-center rounded-full bg-surface-2">
              <MessageSquare className="size-5 text-accent" aria-hidden />
            </span>
            <span>
              <span className="block text-[1.3rem] font-semibold text-fg">{title}</span>
              <span className="block text-[1rem] text-subtle">{sub}</span>
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/*  R&D Plumbing: nothing in July → one $20,000 job off the website          */
/* ------------------------------------------------------------------------ */

/**
 * RD_JOB is Christian's figure (said 29 Sept 2026: "I got him a twenty
 * thousand dollar job"). It is NOT in cjp-vault clients/rd-plumbing.md; the
 * 29 Sept reel note flagged it as unverifiable. Change it here only.
 * The July "nothing" and the 7 July launch are on record.
 */
const RD_JOB = 20_000;

function RdStory() {
  const job = useCount(RD_JOB, 5200, 1600);
  return (
    <div className="grid min-h-0 flex-1 items-center gap-10 min-[901px]:grid-cols-[1fr_1fr_1.1fr]">
      <div style={appear(200)} className="rounded-xl bg-surface px-7 py-6 shadow-[var(--shadow-border)]">
        <p className="font-display text-2xl font-semibold uppercase tracking-display text-subtle">July · Before</p>
        <ul className="mt-4 space-y-3 text-[1.35rem] text-muted">
          {["No website", "No logo", "No Google profile"].map((t, i) => (
            <li key={t} style={appear(600 + i * 350)} className="flex items-center gap-3">
              <X className="size-6 shrink-0 text-subtle" strokeWidth={2.5} aria-hidden />
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div style={appear(2100)} className="rounded-xl bg-surface px-7 py-6 shadow-[var(--shadow-border)]">
        <p className="font-display text-2xl font-semibold uppercase tracking-display text-fg">We built it</p>
        <ul className="mt-4 space-y-3 text-[1.35rem] text-fg">
          {["rdplumbingco.com, live", "Logo + brand", "A page per service"].map((t, i) => (
            <li key={t} style={appear(2500 + i * 350)} className="flex items-center gap-3">
              <Check className="size-6 shrink-0 text-accent" strokeWidth={3} aria-hidden />
              {t}
            </li>
          ))}
        </ul>
        <div style={appear(4000)} className="mt-5 flex items-center gap-3 rounded-lg bg-[#2a1410] px-4 py-3 text-[1.15rem] text-fg">
          <Globe className="size-5 shrink-0 text-accent" aria-hidden />
          New lead · from the website
        </div>
      </div>
      <div style={appear(5000)} className="rounded-xl bg-surface-warm px-8 py-8 text-center shadow-[0_0_0_2px_var(--color-accent)]">
        <p className="font-display text-2xl font-semibold uppercase tracking-display text-fg">One job</p>
        <p className="slide-num mt-2 font-display text-[5.5rem] leading-none font-semibold tracking-display text-accent tabular-nums">
          {money(job)}
        </p>
        <p className="mt-3 text-[1.3rem] text-muted">off the website we built him.</p>
      </div>
    </div>
  );
}

export function RdOutcomeSlide() {
  const [run, setRun] = useState(0);
  return (
    <SlidePad>
      <Kicker>Duncan · R&amp;D Plumbing · Baldwin County, AL</Kicker>
      <Display className="mt-3 text-4xl min-[701px]:text-[3.3rem]">
        Brand new in July. <span className="text-accent">Then this.</span>
      </Display>
      <div key={run} className="mt-8 flex min-h-0 flex-1 flex-col">
        <RdStory />
      </div>
      <div className="flex justify-end">
        <Replay onClick={() => setRun((r) => r + 1)} />
      </div>
    </SlidePad>
  );
}

/* ------------------------------------------------------------------------ */
/*  AutoGloss: leads landing, counted                                        */
/* ------------------------------------------------------------------------ */

/**
 * On record (clients/autogloss.md, 27 Sept): site live 10 Sept, 18 real leads
 * in two weeks, 10 from the site and 8 from the ads page; Search Console
 * clicks 42 vs 12 over the 17 days after vs before. Leads are shown as
 * source chips only: no names.
 */
const AG_LEADS: ("site" | "ads")[] = [
  "site", "ads", "site", "site", "ads", "site", "ads", "site", "ads",
  "site", "ads", "site", "ads", "site", "ads", "site", "ads", "site",
];

function AutoGlossRun() {
  const clicks = useCount(42, 3600, 1800);
  const site = useCount(10, 600, 4200);
  const ads = useCount(8, 600, 4200);
  return (
    <div className="grid min-h-0 flex-1 items-start gap-10 min-[901px]:grid-cols-[1.15fr_0.85fr]">
      <div>
        <div className="flex items-baseline gap-5">
          <p className="slide-num font-display text-[5.5rem] leading-none font-semibold text-accent tabular-nums">
            {site + ads}
          </p>
          <p className="text-[1.6rem] text-fg">
            real leads, first two weeks
            <span className="block text-[1.2rem] text-muted">
              {site} from the site · {ads} from the ads page
            </span>
          </p>
        </div>
        <ol className="mt-6 grid grid-cols-6 gap-3">
          {AG_LEADS.map((src, i) => (
            <li
              key={i}
              style={appear(600 + i * 230)}
              className={cn(
                "rounded-lg px-3 py-3 text-center text-[1rem] font-semibold",
                src === "site" ? "bg-accent text-accent-fg" : "bg-surface-2 text-fg",
              )}
            >
              {src === "site" ? "Site" : "Ads page"}
            </li>
          ))}
        </ol>
      </div>
      <div style={appear(3400)} className="rounded-xl bg-surface px-7 py-6 shadow-[var(--shadow-border)]">
        <p className="font-display text-xl font-semibold uppercase tracking-display text-subtle">Clicks from Google search</p>
        <div className="mt-5 space-y-4">
          <Bar label="17 days before" value={12} max={42} />
          <Bar label="17 days after" value={clicks} max={42} accent />
        </div>
        <blockquote style={appear(5600)} className="mt-6 border-l-4 border-accent pl-5">
          <p className="text-[1.6rem] leading-snug text-fg">&ldquo;It&rsquo;s hitting all my expectations.&rdquo;</p>
          <footer className="mt-1 text-[1.05rem] text-subtle">Jeff Miller, owner · 27 Sept</footer>
        </blockquote>
      </div>
    </div>
  );
}

function Bar({ label, value, max, accent }: { label: string; value: number; max: number; accent?: boolean }) {
  return (
    <div>
      <div className="flex justify-between text-[1.15rem]">
        <span className="text-muted">{label}</span>
        <span className={cn("slide-num font-semibold tabular-nums", accent ? "text-accent" : "text-fg")}>{value}</span>
      </div>
      <div className="mt-1.5 h-4 overflow-hidden rounded-full bg-bg">
        <div
          className={cn("h-full rounded-full", accent ? "bg-accent" : "bg-line-strong")}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );
}

export function AutoGlossLiveSlide() {
  const [run, setRun] = useState(0);
  return (
    <SlidePad>
      <Kicker>Case study · AutoGloss · Fuquay-Varina, NC</Kicker>
      <Display className="mt-3 text-4xl min-[701px]:text-[3.3rem]">
        New site on September 10. <span className="text-accent">Watch the next two weeks.</span>
      </Display>
      <div key={run} className="mt-8 flex min-h-0 flex-1 flex-col">
        <AutoGlossRun />
      </div>
      <div className="flex justify-end">
        <Replay onClick={() => setRun((r) => r + 1)} />
      </div>
    </SlidePad>
  );
}

/* ------------------------------------------------------------------------ */
/*  Review request: job closed → five stars on Google                        */
/* ------------------------------------------------------------------------ */

function ReviewRun() {
  return (
    <div className="flex flex-1 flex-col justify-end gap-3 px-5 pb-5">
      <div style={appear(300)} className="flex items-center justify-center gap-2 rounded-full bg-surface-2 px-4 py-2 text-[1.1rem] text-fg">
        <Check className="size-5 text-accent" strokeWidth={3} aria-hidden />
        You tapped <span className="font-semibold">Closed</span> · 4:12 PM
      </div>
      <div style={appear(1600)} className="flex flex-col items-end">
        <p className="max-w-[88%] rounded-3xl rounded-br-md bg-accent px-5 py-3 text-[1.15rem] leading-snug text-accent-fg">
          Thanks for having us out today! How did we do? Tap a star.
        </p>
        <span className="mt-1.5 px-2 text-[1rem] text-subtle">Sent automatically · 4:12 PM</span>
      </div>
      <div style={appear(3200)} className="flex justify-start gap-1.5 px-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            style={appear(3300 + i * 180)}
            className="size-9 fill-[#f5b301] text-[#f5b301]"
            aria-hidden
          />
        ))}
      </div>
      <div style={appear(4600)} className="rounded-2xl bg-surface-2 px-5 py-4">
        <p className="text-[1rem] text-subtle">Sent to your Google page</p>
        <p className="mt-1 text-[1.15rem] text-fg">&ldquo;Showed up on time, fixed it fast. Would call again.&rdquo;</p>
      </div>
    </div>
  );
}

export function ReviewDemoSlide() {
  const [run, setRun] = useState(0);
  return (
    <SlidePad className="justify-center">
      <div className="grid min-h-0 flex-1 items-center gap-14 min-[901px]:grid-cols-[1fr_480px]">
        <div>
          <Kicker>Reviews · watch it happen</Kicker>
          <Display className="mt-4 text-5xl min-[701px]:text-[4rem]">
            Job done. <span className="text-accent">Review asked.</span>
          </Display>
          <ul className="mt-8 space-y-4 text-2xl text-fg">
            {[
              ["You tap Closed.", "That's the only thing you do."],
              ["They get asked in seconds.", "While they're still happy you showed up."],
              ["Happy goes to Google.", "Unhappy tells you first, so you can make it right."],
            ].map(([a, b], i) => (
              <li key={a} className="flex gap-5">
                <span className="slide-num w-14 shrink-0 font-display text-3xl font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-semibold">{a}</span>
                  <span className="block text-lg text-muted">{b}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Phone title="Your customer" sub="Example conversation">
            <ReviewRun key={run} />
          </Phone>
          <div className="mt-3 flex justify-center">
            <Replay onClick={() => setRun((r) => r + 1)} />
          </div>
        </div>
      </div>
    </SlidePad>
  );
}

/* ------------------------------------------------------------------------ */
/*  A2Z Concrete: ~$3,000 in ads → 25 leads → one $37,000 driveway           */
/* ------------------------------------------------------------------------ */

/** On record in the deck since PR #8 (Christian's A2Z numbers). */
function AdsRun() {
  const spend = useCount(3000, 400, 3200);
  const leads = useCount(25, 400, 3200);
  const job = useCount(37_000, 4200, 1600);
  return (
    <div className="grid min-h-0 flex-1 items-center gap-8 min-[901px]:grid-cols-[1fr_1fr_1.2fr]">
      <div style={appear(200)} className="rounded-xl bg-surface px-7 py-7 shadow-[var(--shadow-border)]">
        <p className="font-display text-xl font-semibold uppercase tracking-display text-subtle">Ad spend</p>
        <p className="slide-num mt-2 font-display text-[4.2rem] leading-none font-semibold text-fg tabular-nums">{money(spend)}</p>
        <p className="mt-2 text-[1.2rem] text-muted">About $500 a month</p>
      </div>
      <div style={appear(500)} className="rounded-xl bg-surface px-7 py-7 shadow-[var(--shadow-border)]">
        <p className="font-display text-xl font-semibold uppercase tracking-display text-subtle">Tracked leads</p>
        <p className="slide-num mt-2 font-display text-[4.2rem] leading-none font-semibold text-fg tabular-nums">{leads}</p>
        <p className="mt-2 text-[1.2rem] text-muted">Calls and forms, counted</p>
      </div>
      <div style={appear(4000)} className="rounded-xl bg-surface-warm px-8 py-8 text-center shadow-[0_0_0_2px_var(--color-accent)]">
        <p className="font-display text-2xl font-semibold uppercase tracking-display text-fg">One driveway</p>
        <p className="slide-num mt-2 font-display text-[5.5rem] leading-none font-semibold text-accent tabular-nums">{money(job)}</p>
        <p style={appear(6000)} className="mt-3 text-[1.3rem] text-fg">Paid for the ads more than 12 times over.</p>
      </div>
    </div>
  );
}

export function AdsDemoSlide() {
  const [run, setRun] = useState(0);
  return (
    <SlidePad>
      <Kicker>When you&rsquo;re ready for ads · A2Z Concrete</Kicker>
      <Display className="mt-3 text-4xl min-[701px]:text-[3.3rem]">
        Foundation first. <span className="text-accent">Then the ads pay.</span>
      </Display>
      <div key={run} className="mt-8 flex min-h-0 flex-1 flex-col">
        <AdsRun />
      </div>
      <div className="flex items-center justify-between gap-6">
        <p className="text-[1.2rem] text-muted">
          Richard, SmithStraw: <span className="text-fg">49 tracked results, 31 of them phone calls.</span>
        </p>
        <Replay onClick={() => setRun((r) => r + 1)} />
      </div>
    </SlidePad>
  );
}
