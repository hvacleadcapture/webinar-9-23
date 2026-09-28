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
/*  Results wall                                                             */
/* ------------------------------------------------------------------------ */

/*
 * Sources (all ~/cjp-vault unless noted):
 *  AutoGloss      clients/autogloss.md, 27 Sept: Search Console clicks, 17 days
 *                 after the 10 Sept launch vs the 17 days before.
 *  Potts Brothers clients/potts-brothers.md + reports/potts-brothers/
 *                 2026-09-21-checkup.md: human-classified enquiries Jul -> Aug.
 *  Benrishi       August report (sent, not disputed): Search Console
 *                 impressions 2,948 -> 4,273. Reviews from benrishi-gbp.png.
 *                 NO licence/credential wording (benrishi-performance-fix).
 *  Two Koats      cjp-crm Signal ranking push 24 Sept (Search Console average
 *                 position). Do NOT claim review growth.
 *  A2Z Concrete   cjp-crm ranking push 4 Aug; August report clicks 28 -> 42.
 *  SmithStraw     clients/smithstraw.md 24 Sept: Google Ads, 3 conversions at
 *                 $7.09 on "pine straw near me".
 */
const WALL = [
  {
    name: "AutoGloss",
    where: "Detailing · Fuquay-Varina, NC",
    big: "12 → 42",
    what: "Clicks from Google search, 17 days before vs after the new site",
  },
  {
    name: "Potts Brothers",
    where: "Remodeling · Arlington, VA",
    big: "+50%",
    what: "Real enquiries, July to August (8 → 12). Mostly garages and additions",
  },
  {
    name: "Benrishi Electrical",
    where: "Electrician · West Chester, OH",
    big: "+45%",
    what: "Times shown on Google search, July to August. 177 reviews, 5.0",
  },
  {
    name: "Two Koats Painting",
    where: "Painter · Virginia Beach, VA",
    big: "#1",
    what: "“painter in virginia beach” · Search Console, 24 Sept",
  },
  {
    name: "A2Z Concrete",
    where: "Concrete · Gainesville, FL",
    big: "#1",
    what: "“concrete contractor” · Search Console. Clicks up 50% in August",
  },
  {
    name: "SmithStraw",
    where: "Pine straw · Fairhope, AL",
    big: "$7.09",
    what: "Per lead from Google Ads on “pine straw near me”",
  },
];

export function ResultsWallSlide() {
  return (
    <SlidePad>
      <div className="flex items-end justify-between gap-8">
        <div>
          <Kicker>More results · Google&rsquo;s numbers, not mine</Kicker>
          <Display className="mt-3 text-4xl min-[701px]:text-[4rem]">Six more businesses.</Display>
        </div>
        <p className="hidden max-w-[30ch] pb-1 text-right text-base leading-snug text-muted min-[901px]:block">
          Real clients. Every number is from their Google Search Console, Analytics or Ads account.
        </p>
      </div>
      <div className="mt-7 grid min-h-0 flex-1 grid-cols-1 gap-4 min-[901px]:grid-cols-3 min-[901px]:grid-rows-2">
        {WALL.map((c) => (
          <article
            key={c.name}
            className="flex min-h-0 flex-col justify-between rounded-xl bg-surface px-7 py-5 shadow-[var(--shadow-border)]"
          >
            <div>
              <p className="font-display text-[1.9rem] font-semibold uppercase leading-snug tracking-display">{c.name}</p>
              <p className="text-[1.2rem] text-subtle">{c.where}</p>
            </div>
            <div className="mt-4">
              <p className="font-display text-[3.8rem] leading-none font-semibold tracking-display text-accent tabular-nums">
                {c.big}
              </p>
              <p className="mt-2 text-[1.3rem] leading-snug text-fg">{c.what}</p>
            </div>
          </article>
        ))}
      </div>
    </SlidePad>
  );
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
 *  Local SEO       GoodFirms 2026 ($500-1,500 local); Ahrefs SEO pricing survey
 *  Content         WebFX content pricing ($150-600 per post, 2-4 a month)
 *  Citations       BrightLocal Manage $54/mo; Yext SMB $199-999/yr
 *  Rank tracking   BrightLocal Track $41/mo
 *  Ads management  WebFX Google Ads Lite $750/mo; ClicksGeek 2026 $500-750
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
  { item: "Local SEO", market: "$500–$1,500/mo", from: 2 },
  { item: "Posts + blog, every week", market: "$300–$1,000/mo", from: 2 },
  { item: "Listings + citations", market: "$20–$85/mo", from: 2 },
  { item: "Rank tracking + monthly report", market: "$40–$100/mo", from: 2 },
  { item: "Google Ads / LSA managed", market: "$500–$1,000/mo", from: 3 },
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
            $1,760–$4,834 a month. <span className="text-accent">Or one plan.</span>
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
        <span className="text-fg">$1,260–$3,834/mo</span>. Pro replaces <span className="text-fg">$1,760–$4,834/mo</span>.
      </p>
    </SlidePad>
  );
}
