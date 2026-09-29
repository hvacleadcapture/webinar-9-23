import { Check, Minus, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Display, Kicker, SlidePad } from "./primitives";

/**
 * ============================================================================
 *  Credibility slides (28 Sept: "make this the most credible webinar they've
 *  ever seen").
 * ============================================================================
 *
 * EVERY NUMBER ON THESE SLIDES HAS A SOURCE, and the source is written next to
 * it in this file. Nothing here is estimated, rounded up or "about". If a
 * number cannot be sourced it does not go on a slide -- the vault's round-two
 * notes already cut "25+ companies / $30M" for exactly that reason.
 *
 * Rankings are Search Console average position for the query, NOT a Maps-pack
 * rank, and the slides say "Search Console" so nobody reads them as a promise
 * about the map.
 */

/* ------------------------------------------------------------------------ */
/*  Reference call: R&D Plumbing                                             */
/* ------------------------------------------------------------------------ */

/*
 * Facts from the rd-plumbing skill and ~/cjp-vault/clients/rd-plumbing.md:
 * brand-new LLC, launched with CJP 7 July 2026; Duncan Dupree, Master Plumber;
 * Baldwin County, Alabama. What was built is from the site repo's history.
 *
 * DO NOT ADD: reviews or stars (he has none yet), "licensed & insured", years
 * in business, any lead/call/job figure, "verified on Google" (the profile is
 * still in verification), a street address, or any name but "Duncan".
 */
const RD_NOW = [
  "rdplumbingco.com, built",
  "Logo + brand from scratch",
  "A page per service + town",
  "Google profile + Facebook",
  "His own AI estimating tool",
];

export function ReferenceCallSlide() {
  return (
    <SlidePad className="justify-center">
      <p className="flex items-center gap-3 font-display text-[length:var(--text-kicker)] font-medium tracking-kicker text-accent uppercase">
        <span className="live-dot size-2.5 rounded-full bg-accent" />
        You clicked an ad. You don&rsquo;t know me yet.
      </p>
      <div className="mt-4 flex items-center gap-6">
        <Display className="text-5xl min-[701px]:text-[4.6rem]">Reference call.</Display>
        <span className="flex items-center gap-2.5 rounded-full bg-accent px-5 py-2.5 font-display text-2xl font-semibold tracking-display text-accent-fg uppercase max-[700px]:hidden">
          <Phone className="size-6" strokeWidth={2.5} aria-hidden />
          Live
        </span>
      </div>

      <div className="mt-6 grid min-h-0 items-start gap-8 min-[901px]:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col">
          <img src="/slides/rd/rd-logo-white.png" alt="R&D Plumbing Co. logo" className="h-auto w-[300px] max-w-full" />
          <p className="mt-4 text-[1.6rem] leading-snug text-fg">
            Duncan Dupree <span className="text-muted">· Master Plumber</span>
            <span className="block text-muted">Baldwin County, Alabama</span>
          </p>

          <div className="mt-6 grid grid-cols-[0.8fr_1.2fr] gap-4">
            <div className="rounded-xl bg-surface px-6 py-5 shadow-[var(--shadow-border)]">
              <p className="font-display text-kicker tracking-kicker text-subtle uppercase">July · then</p>
              <ul className="mt-3 space-y-1.5 text-[1.35rem] leading-snug text-muted">
                <li>Brand-new company</li>
                <li>No website</li>
                <li>No logo</li>
                <li>No Google profile</li>
              </ul>
            </div>
            <div className="rounded-xl bg-surface-warm px-6 py-5 shadow-[0_0_0_2px_var(--color-accent)]">
              <p className="font-display text-kicker tracking-kicker text-accent uppercase">Now</p>
              <ul className="mt-3 space-y-1.5 text-[1.35rem] leading-snug text-fg">
                {RD_NOW.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className="mt-1 size-[1.2rem] shrink-0 text-accent" strokeWidth={2.5} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <figure className="flex aspect-[16/11.5] min-h-0 flex-col overflow-hidden rounded-xl bg-[#1b1b1b] shadow-[var(--shadow-photo)] max-[900px]:hidden">
          <div className="flex shrink-0 items-center gap-2 px-4 py-3">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 flex-1 rounded-md bg-[#0f0f0f] px-4 py-1.5 text-[1.05rem] text-muted">
              rdplumbingco.com
            </span>
          </div>
          <img
            src="/slides/rd/rd-site.jpg"
            alt="The R&D Plumbing Co. homepage CJP built"
            className="min-h-0 w-full flex-1 object-cover object-left-top"
          />
        </figure>
      </div>
    </SlidePad>
  );
}

/* ------------------------------------------------------------------------ */
/*  Results: the real screenshots, and what each one means                   */
/* ------------------------------------------------------------------------ */

/*
 * Every image in public/slides/results/ is a crop of the client's own Google
 * account, captured 28 Sept 2026 (Search Console unless noted). Nothing in an
 * image is edited; crops only drop the account chrome and, on the chart
 * captures, the summary tiles.
 *
 *  AutoGloss   Search Console, autoglossnc.com, clicks daily 24 Aug-26 Sep.
 *              17 days before the 10 Sept launch = 12 clicks, 17 after = 42
 *              (vault clients/autogloss.md, 27 Sept).
 *  Benrishi    Search Console, sc-domain:benrishico.com, impressions weekly
 *              1 Jun-26 Sep. Jul 2,948 -> Aug 4,273 = +45% (August report;
 *              the Jul+Aug total of 7.22K was re-checked in GSC). NO licence
 *              or credential wording anywhere near this client.
 *  Potts       GA4 events report, Aug-Sep: generate_lead 29, click_to_call 9.
 *  Two Koats   Search Console, last 28 days to 26 Sep, top queries. "painter"
 *              1.2 over 269 impressions; "exterior painters virginia beach"
 *              3.4 over 145. (The earlier "#1 painter in virginia beach" was
 *              a one-day reading; its 28-day average is 3.7, so it is gone.)
 *  A2Z         Search Console, last 90 days, top queries: "concrete near me"
 *              3.9, "concrete work near me" 2.1, "concrete foundation
 *              contractors" 1.0. September clicks were DOWN, so no traffic
 *              claim for A2Z.
 *  SmithStraw  Google Ads, Jan 24-Sep 23 2026: 31 phone call leads, 18
 *              contacts.
 */
type Result = {
  name: string;
  where: string;
  img: string;
  alt: string;
  source: string;
  big: string;
  bigLabel: string;
  means: string;
};

const RESULTS_TRAFFIC: Result[] = [
  {
    name: "AutoGloss",
    where: "Detailing · Fuquay-Varina, NC",
    img: "/slides/results/autogloss-gsc.png",
    alt: "Google Search Console clicks chart for AutoGloss, rising after September 10",
    source: "Google Search Console · clicks from Google, per day",
    big: "12 → 42",
    bigLabel: "clicks, 17 days before vs after",
    means: "The new site went live September 10. Look where the line jumps. More than 3× the people clicked through to him from Google.",
  },
  {
    name: "Benrishi Electrical",
    where: "Electrician · West Chester, OH",
    img: "/slides/results/benrishi-gsc.png",
    alt: "Google Search Console impressions chart for Benrishi Electrical, June to September",
    source: "Google Search Console · times shown on Google, per week",
    big: "+45%",
    bigLabel: "shown on Google, July → August",
    means: "Every point on that line is people searching for an electrician and seeing his name. More of them in August than in July.",
  },
];

const RESULTS_LEADS: Result[] = [
  {
    name: "Potts Brothers",
    where: "Remodeling · Arlington, VA",
    img: "/slides/results/potts-ga4-leads.png",
    alt: "Google Analytics events for Potts Brothers showing generate_lead 29 and click_to_call 9",
    source: "Google Analytics · website, Aug – Sept",
    big: "29 + 9",
    bigLabel: "lead forms + taps to call",
    means: "generate_lead is someone filling out the form. click_to_call is someone tapping their number. Real people asking for a price.",
  },
  {
    name: "SmithStraw",
    where: "Pine straw · Fairhope, AL",
    img: "/slides/results/smithstraw-ads.png",
    alt: "Google Ads leads summary for SmithStraw showing 31 phone call leads and 18 contacts",
    source: "Google Ads · Jan 24 – Sept 23",
    big: "31",
    bigLabel: "phone calls from Google Ads",
    means: "Plus 18 more contacts. The phone rings from people searching for pine straw right now, not someday.",
  },
];

const RESULTS_RANKS: Result[] = [
  {
    name: "Two Koats Painting",
    where: "Painter · Virginia Beach, VA",
    img: "/slides/results/twokoats-gsc-queries.png",
    alt: "Google Search Console queries for Two Koats Painting: painter at 1.2, exterior painters virginia beach at 3.4",
    source: "Google Search Console · last 28 days",
    big: "1.2",
    bigLabel: "average spot for “painter”",
    means: "Position is where he shows up on Google. 1.2 means the top, for 269 searches of “painter”. Top 5 for exterior painters in Virginia Beach.",
  },
  {
    name: "A2Z Concrete",
    where: "Concrete · Gainesville, FL",
    img: "/slides/results/a2z-gsc-queries.png",
    alt: "Google Search Console queries for A2Z Concrete: concrete near me 3.9, concrete work near me 2.1",
    source: "Google Search Console · last 90 days",
    big: "Page 1",
    bigLabel: "for “near me” searches",
    means: "These people never typed his name. They typed “concrete near me” and found A2Z on the first page.",
  },
];

const RESULT_SLIDES = {
  traffic: { n: 1, title: "More people finding them on Google.", results: RESULTS_TRAFFIC },
  leads: { n: 2, title: "Forms filled out. Phones ringing.", results: RESULTS_LEADS },
  ranks: { n: 3, title: "Where they show up on Google.", results: RESULTS_RANKS },
} as const;

function ResultsSlide({ which }: { which: keyof typeof RESULT_SLIDES }) {
  const { n, title, results } = RESULT_SLIDES[which];
  return (
    <SlidePad>
      <Kicker>Real results · {n} of 3 · straight from their Google accounts</Kicker>
      <Display className="mt-2 text-4xl min-[701px]:text-[3.1rem]">{title}</Display>
      <div className="mt-4 mb-2 flex min-h-0 flex-1 flex-col gap-4">
        {results.map((r) => (
          <article
            key={r.name}
            className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)] min-[901px]:grid-cols-[1.35fr_1fr]"
          >
            <div className="flex min-h-0 items-center justify-center bg-white p-4">
              <img src={r.img} alt={r.alt} className="max-h-full max-w-full object-contain" />
            </div>
            <div className="flex min-h-0 flex-col justify-center px-7 py-4">
              <p className="text-[0.95rem] tracking-wide text-subtle uppercase">{r.source}</p>
              <p className="mt-1 font-display text-[1.7rem] font-semibold uppercase leading-tight tracking-display">
                {r.name} <span className="text-[1.1rem] font-normal tracking-normal text-subtle normal-case">· {r.where}</span>
              </p>
              <p className="mt-2 flex items-baseline gap-3">
                <span className="font-display text-[3rem] leading-none font-semibold whitespace-nowrap tracking-display text-accent tabular-nums">
                  {r.big}
                </span>
                <span className="text-[1.2rem] leading-snug text-fg">{r.bigLabel}</span>
              </p>
              <p className="mt-3 border-l-[3px] border-accent pl-3 text-[1.2rem] leading-snug text-muted">
                <span className="font-semibold text-fg">What it means: </span>
                {r.means}
              </p>
            </div>
          </article>
        ))}
      </div>
    </SlidePad>
  );
}

export function ResultsTrafficSlide() {
  return <ResultsSlide which="traffic" />;
}

export function ResultsLeadsSlide() {
  return <ResultsSlide which="leads" />;
}

export function ResultsRanksSlide() {
  return <ResultsSlide which="ranks" />;
}

/* ------------------------------------------------------------------------ */
/*  Case study: AutoGloss                                                    */
/* ------------------------------------------------------------------------ */

/*
 * Source: ~/cjp-vault/clients/autogloss.md, entries of 27 Sept, and the
 * 27 Sept call (Fathom). Leads are real form leads 10-23 Sept (10 website,
 * 8 ads landing page). Ads: Sept 1-27, 23 conversions at about $30, cost per
 * click $2.71 vs $3.80 in August.
 *
 * DO NOT ADD: revenue (September was down on August), "veteran-owned" (not in
 * writing from Jeff).
 */
const AUTOGLOSS_STATS = [
  { value: "18", label: "Real leads in the first 2 weeks", sub: "10 from the site, 8 from the ads page" },
  { value: "3.5×", label: "Clicks from Google search", sub: "42 vs 12, 17 days after vs before" },
  { value: "$2.71", label: "Cost per click, September", sub: "Down from $3.80 in August" },
];

export function AutoGlossSlide() {
  return (
    <SlidePad>
      <Kicker>Case study · AutoGloss · Fuquay-Varina, NC</Kicker>
      <Display className="mt-3 text-4xl min-[701px]:text-[3.3rem]">
        New site on September 10. <span className="text-accent">Here&rsquo;s the next two weeks.</span>
      </Display>
      <div className="mt-8 grid min-h-0 flex-1 items-start gap-8 min-[901px]:grid-cols-[1.05fr_0.95fr]">
        <div className="flex min-h-0 flex-col gap-4">
          {AUTOGLOSS_STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-6 rounded-xl bg-surface px-7 py-5 shadow-[var(--shadow-border)]">
              <p className="w-48 shrink-0 font-display text-[4.2rem] leading-none font-semibold tracking-display text-accent tabular-nums">
                {s.value}
              </p>
              <div>
                <p className="text-[1.7rem] font-semibold leading-snug text-fg">{s.label}</p>
                <p className="text-[1.3rem] text-muted">{s.sub}</p>
              </div>
            </div>
          ))}
          <blockquote className="mt-3 border-l-4 border-accent pl-5">
            <p className="text-[2.1rem] leading-snug text-fg">&ldquo;It&rsquo;s hitting all my expectations.&rdquo;</p>
            <footer className="mt-1 text-[1.15rem] text-subtle">Jeff Miller, owner · 27 Sept</footer>
          </blockquote>
        </div>
        <figure className="flex min-h-0 flex-col max-[900px]:hidden">
          <img
            src="/slides/user-added/auto-gloss-website.png"
            alt="The AutoGloss website CJP built"
            className="photo-frame w-full rounded-lg object-contain"
          />
          <figcaption className="mt-3 text-[1.15rem] text-subtle">autoglossnc.com · built by CJP</figcaption>
        </figure>
      </div>
    </SlidePad>
  );
}

/* ------------------------------------------------------------------------ */
/*  Piece by piece vs one plan                                               */
/* ------------------------------------------------------------------------ */

/*
 * Market ranges, deliberately conservative (entry-level / small-business
 * tiers, enterprise and national-agency highs left out). Researched 28 Sept:
 *  Website build   Nopio 2026 HVAC website cost; Skill Mammoth contractor sites
 *  Hosting/maint.  WebFX website maintenance pricing ($75-200 typical managed)
 *  Reviews         NiceJob pricing ($75 / $125); Podium Core $399
 *  Missed-call     CallRail from $55, Lead Conversion from $95; HelpGenie $40-80
 *  GBP management  Merchynt 2026 ($200-400 typical)
 *  Local SEO       $1,000-3,000: Christian's figure, 29 Sept 2026 (was GoodFirms $500-1,500)
 *  Content         WebFX content pricing ($150-600 per post, 2-4 a month)
 *  Citations       BrightLocal Manage $54/mo; Yext SMB $199-999/yr
 *  Rank tracking   BrightLocal Track $41/mo
 *  Ads management  $1,500-5,000: Christian's figure, 29 Sept 2026
 *  (Listings + citations row removed 29 Sept: CJP only does this on the Google profile.)
 *
 * Which plan covers which line follows the "Check by check" slide
 * (house.tsx): Essentials = reviews, website, AI-readable site, missed-call
 * text back; Growth adds the rest of the nine; Pro adds running the ads.
 */
type Tier = 1 | 2 | 3;
const PIECES: { item: string; market: string; from: Tier }[] = [
  { item: "Website build", market: "$2,500–$10,000 once", from: 1 },
  { item: "Hosting + upkeep", market: "$75–$200/mo", from: 1 },
  { item: "Review requests, automatic", market: "$75–$399/mo", from: 1 },
  { item: "Missed-call text back", market: "$50–$150/mo", from: 1 },
  { item: "Google profile managed", market: "$200–$400/mo", from: 2 },
  { item: "Local SEO", market: "$1,000–$3,000/mo", from: 2 },
  { item: "Posts + blog, every week", market: "$300–$1,000/mo", from: 2 },
  { item: "Rank tracking + monthly report", market: "$40–$100/mo", from: 2 },
  { item: "Google Ads / LSA managed", market: "$1,500–$5,000/mo", from: 3 },
];
const PLANS: { name: string; price: string; tier: Tier }[] = [
  { name: "Essentials", price: "$297", tier: 1 },
  { name: "Growth", price: "$497", tier: 2 },
  { name: "Pro", price: "$997", tier: 3 },
];

export function PriceCompareSlide() {
  return (
    <SlidePad>
      <div className="flex items-end justify-between gap-8">
        <div>
          <Kicker>If you bought it piece by piece</Kicker>
          <Display className="mt-3 text-4xl min-[701px]:text-[3.3rem]">
            $3,240–$10,249 a month. <span className="text-accent">Or one plan.</span>
          </Display>
        </div>
        <p className="hidden max-w-[26ch] pb-1 text-right text-sm leading-snug text-subtle min-[901px]:block">
          Low-end market prices for small businesses. Ad spend not included anywhere.
        </p>
      </div>

      <div className="mt-5 min-h-0 overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th className="px-6 py-3 font-display text-kicker font-medium tracking-kicker text-subtle uppercase">What you need</th>
              <th className="px-4 py-3 font-display text-kicker font-medium tracking-kicker text-subtle uppercase">Market price</th>
              {PLANS.map((p) => (
                <th
                  key={p.name}
                  className={cn("w-36 px-4 py-2.5 text-center", p.tier === 2 && "bg-surface-warm")}
                >
                  <span className="block font-display text-[1.3rem] font-semibold tracking-display text-fg uppercase">{p.name}</span>
                  <span className="block font-display text-[1.7rem] font-semibold text-accent">{p.price}<span className="text-[1rem] text-subtle">/mo</span></span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PIECES.map((row) => (
              <tr key={row.item} className="border-b border-line/60 last:border-b-0">
                <td className="px-6 py-[0.3rem] text-[1.25rem] text-fg">{row.item}</td>
                <td className="px-4 py-[0.3rem] text-[1.25rem] whitespace-nowrap text-muted tabular-nums">{row.market}</td>
                {PLANS.map((p) => (
                  <td key={p.name} className={cn("px-4 py-[0.3rem]", p.tier === 2 && "bg-surface-warm")}>
                    {p.tier >= row.from ? (
                      <Check className="mx-auto size-5 text-accent" strokeWidth={3} aria-label="Included" />
                    ) : (
                      <Minus className="mx-auto size-5 text-line-strong" aria-label="Not included" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[1.2rem] text-muted">
        Essentials replaces <span className="text-fg">$200–$749/mo</span> plus the website build. Growth replaces{" "}
        <span className="text-fg">$1,740–$5,249/mo</span>. Pro replaces <span className="text-fg">$3,240–$10,249/mo</span>.
      </p>
    </SlidePad>
  );
}

/* ------------------------------------------------------------------------ */
/*  Objections, answered before the chat asks                                */
/* ------------------------------------------------------------------------ */

/*
 * The three that actually come up, answered the cjp-growth-offer way: agree,
 * then move the frame. Never argue, never quote a statistic, never disparage
 * "the guy". Nothing here promises a result; the only commitments are ones the
 * pricing slide already makes (month to month, cancel any time) and the
 * reporting the "Check by check" slide already describes.
 */
const OBJECTIONS = [
  {
    q: "“I get all my work from referrals.”",
    a: "Good. That’s the business. But before a referral calls you, they Google you. This is what decides whether they call.",
  },
  {
    q: "“I already have a website guy.”",
    a: "Good. What does he do every month? The build is almost never the gap. It’s that nothing happens after it.",
  },
  {
    q: "“I’ve been burned by marketing before.”",
    a: "Then don’t take my word for it. Month to month, cancel any time, and every number comes out of your own Google account.",
  },
];

export function ObjectionsSlide() {
  return (
    <SlidePad className="justify-center">
      <Kicker>Before you ask</Kicker>
      <Display className="mt-3 text-4xl min-[701px]:text-[4rem]">What you&rsquo;re probably thinking.</Display>
      <div className="mt-8 flex flex-col gap-4">
        {OBJECTIONS.map((o) => (
          <article
            key={o.q}
            className="grid items-center gap-8 rounded-xl bg-surface px-8 py-6 shadow-[var(--shadow-border)] min-[901px]:grid-cols-[0.85fr_1.15fr]"
          >
            <p className="font-display text-[2.1rem] leading-tight font-semibold tracking-display text-fg uppercase">
              {o.q}
            </p>
            <p className="border-l-[3px] border-accent pl-5 text-[1.55rem] leading-snug text-muted">{o.a}</p>
          </article>
        ))}
      </div>
    </SlidePad>
  );
}
