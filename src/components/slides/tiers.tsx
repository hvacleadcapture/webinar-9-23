import type { ReactNode } from "react";
import { Body, DashItem, Display, Kicker, NineRail, Photo, ScoreChip, SlidePad } from "./primitives";

function Split({
  kicker,
  title,
  items,
  score,
  children,
  caption,
}: {
  kicker: string;
  title: string;
  items: string[];
  score?: number;
  children?: ReactNode;
  caption?: string;
}) {
  return (
    <SlidePad>
      <div className="flex min-h-0 flex-1 gap-10">
        <div className="flex min-w-0 flex-1 flex-col">
          <Kicker>{kicker}</Kicker>
          <Display className="mt-4 max-w-[12ch] text-5xl min-[701px]:text-6xl">{title}</Display>
          <ul className="mt-10 space-y-5">
            {items.map((item) => (
              <DashItem key={item}>{item}</DashItem>
            ))}
          </ul>
          {caption ? <p className="mt-8 text-sm text-subtle">{caption}</p> : null}
          {score ? <ScoreChip n={score} /> : null}
        </div>
        {children}
        <NineRail active={score} />
      </div>
    </SlidePad>
  );
}

export function TierHeader({
  n,
  title,
  sub,
  active,
}: {
  n: string;
  title: string;
  sub: string;
  active?: number;
}) {
  return (
    <SlidePad className="justify-center">
      <div className="flex items-end justify-between gap-8">
        <div>
          <Kicker>{n}</Kicker>
          <Display className="mt-4 text-6xl min-[701px]:text-[7rem]">{title}</Display>
          <Body className="mt-6 max-w-[34ch] text-xl">{sub}</Body>
        </div>
        <NineRail active={active} />
      </div>
    </SlidePad>
  );
}

export function ProfileSlide() {
  return (
    <SlidePad>
      <div className="flex min-h-0 flex-1 gap-8">
        <div className="flex min-w-0 flex-1 flex-col">
          <Kicker>Tier one · 1 of 3</Kicker>
          <Display className="mt-4 max-w-[12ch] text-5xl min-[701px]:text-6xl">Your Google profile</Display>
          <ul className="mt-8 space-y-4">
            {["Right main category", "Every service listed", "Photo + post, last 30 days"].map((item) => (
              <DashItem key={item}>{item}</DashItem>
            ))}
          </ul>
          <ScoreChip n={1} />
        </div>
        <div className="hidden min-w-0 flex-[1.55] gap-3 min-[901px]:grid min-[901px]:grid-cols-3">
          {[
            ["/slides/user-added/benrishi-gbp.png", "Benrishi Electrical Google Business Profile"],
            ["/slides/user-added/two-koats-gbp.png", "Two Koats Painting Google Business Profile"],
            ["/slides/user-added/93-electric-gbp.png", "93 Electric Google Business Profile"],
          ].map(([src, alt]) => (
            <div key={src} className="flex min-h-0 items-center justify-center overflow-hidden rounded-lg bg-surface shadow-[var(--shadow-border)]">
              <img src={src} alt={alt} className="max-h-full w-full object-contain" />
            </div>
          ))}
        </div>
        <NineRail active={1} />
      </div>
    </SlidePad>
  );
}

export function ReviewsSlide() {
  return (
    <Split
      kicker="Tier one · 2 of 3"
      title="Your reviews"
      items={["New review, last 30 days", "A reply on every one", "Asked for automatically"]}
      score={2}
    >
      <Photo
        src="/slides/reviews-compare.jpg"
        alt="Four reviews versus ninety-two reviews on two electrician listings"
        className="hidden w-[380px] shrink-0 min-[1100px]:block"
        caption="their listing (4 reviews) · the top competitor (92)"
      />
    </Split>
  );
}

export function WebsiteSlide() {
  return (
    <SlidePad>
      <div className="flex min-h-0 flex-1 gap-8">
        <div className="flex min-w-0 flex-1 flex-col">
          <Kicker>Tier one · 3 of 3</Kicker>
          <Display className="mt-4 max-w-[12ch] text-5xl min-[701px]:text-6xl">Your website, in five seconds</Display>
          <ul className="mt-8 space-y-4">
            {["What you do + where", "Licensed + insured", "Tap-to-call button", "All without scrolling"].map((item) => (
              <DashItem key={item}>{item}</DashItem>
            ))}
          </ul>
          <p className="mt-7 text-sm text-subtle">M.E. Garlock · then compare what a stronger contractor site looks like.</p>
          <ScoreChip n={3} />
        </div>
        <div className="hidden w-[520px] shrink-0 flex-col gap-2 min-[1000px]:flex">
          {[
            ["/slides/garlock-site.jpg", "M.E. Garlock Construction"],
            ["/slides/user-added/auto-gloss-website.png", "Auto Gloss"],
            ["/slides/user-added/gordon-crane-website.png", "Gordon Crane Co."],
          ].map(([src, alt]) => (
            <div key={src} className="min-h-0 flex-1 overflow-hidden rounded-lg bg-surface shadow-[var(--shadow-border)]">
              <img src={src} alt={alt} className="h-full w-full object-cover object-top" />
            </div>
          ))}
        </div>
        <NineRail active={3} />
      </div>
    </SlidePad>
  );
}

export function ServicePagesSlide() {
  return (
    <SlidePad>
      <div className="flex min-h-0 flex-1 gap-10">
        <div className="flex min-w-0 flex-1 flex-col">
          <Kicker>Tier two · 1 of 2</Kicker>
          <Display className="mt-4 max-w-[12ch] text-5xl min-[701px]:text-6xl">
            A page for every service
          </Display>
          <ul className="mt-10 space-y-5">
            {["One page per job", "Not one “services” page", "Every job that pays you"].map((item) => (
              <DashItem key={item}>{item}</DashItem>
            ))}
          </ul>
          <ScoreChip n={4} />
        </div>
        <div className="hidden w-[420px] shrink-0 flex-col gap-4 min-[901px]:flex">
          <div className="rounded-lg bg-surface px-5 py-4 shadow-[var(--shadow-border)]">
            <p className="text-kicker tracking-kicker text-subtle uppercase">Most sites</p>
            <p className="mt-2 font-mono text-lg text-muted">/services</p>
          </div>
          <div className="rounded-lg bg-surface px-5 py-4 shadow-[var(--shadow-border)]">
            <p className="text-kicker tracking-kicker text-accent uppercase">The site above yours</p>
            <ul className="mt-3 space-y-2 font-mono text-lg text-fg">
              <li>/panel-upgrades</li>
              <li>/ev-charger-install</li>
              <li>/generator-hookup</li>
              <li>/knob-and-tube-rewiring</li>
              <li>/recessed-lighting</li>
            </ul>
          </div>
          <p className="text-sm text-subtle">an example · one page for everything vs one page per job</p>
        </div>
        <NineRail active={4} />
      </div>
    </SlidePad>
  );
}

export function PostingSlide() {
  return (
    <SlidePad>
      <div className="flex min-h-0 flex-1 gap-8">
        <div className="flex min-w-0 flex-1 flex-col">
          <Kicker>Tier two · 2 of 2</Kicker>
          <Display className="mt-4 max-w-[12ch] text-5xl min-[701px]:text-6xl">
            We post. Every week. For you.
          </Display>
          <ul className="mt-8 space-y-4">
            {["Something new, last 7 days", "Google. Site. Facebook. Instagram.", "We automate all of it"].map((item) => (
              <DashItem key={item}>{item}</DashItem>
            ))}
          </ul>
          <p className="mt-7 max-w-[36ch] text-xl leading-normal text-muted">
            One system can keep the website and Google profile active instead of letting both go stale.
          </p>
          <ScoreChip n={5} />
        </div>
        <div className="hidden w-[520px] shrink-0 grid-rows-2 gap-3 min-[1000px]:grid">
          <div className="min-h-0 overflow-hidden rounded-lg bg-surface shadow-[var(--shadow-border)]">
            <img src="/slides/user-added/blog-posts.png" alt="Contractor website blog with recent posts" className="h-full w-full object-cover object-top" />
          </div>
          <div className="min-h-0 overflow-hidden rounded-lg bg-surface shadow-[var(--shadow-border)]">
            <img src="/slides/user-added/google-posts.png" alt="Google Business Profile posts published for an electrical contractor" className="h-full w-full object-contain" />
          </div>
        </div>
        <NineRail active={5} />
      </div>
    </SlidePad>
  );
}

export function AiSlide() {
  return (
    <Split
      kicker="Tier three · 1 of 4"
      title="AI visibility"
      items={["People ask their phone now", "It gives one name, not ten", "Ask ChatGPT. Are you in it?"]}
      score={6}
      caption="Yelp, HomeAdvisor and Nextdoor tell ChatGPT, Claude and Perplexity: do not read this"
    >
      <Photo
        src="/slides/user-added/chatgpt-repair-near-me.png"
        alt="ChatGPT recommending specific local repair shops by name for a 'repair near me' search"
        className="hidden w-[360px] shrink-0 min-[1100px]:block"
        caption="ChatGPT names real businesses when asked — is yours one of them?"
        contain
      />
    </Split>
  );
}

export function KeywordsSlide() {
  return (
    <Split
      kicker="Tier three · 2 of 4"
      title="Keywords and rankings"
      items={["The 10 searches that pay you", "Where you rank for each", "From their street, not yours"]}
      score={7}
    >
      <Photo
        src="/slides/mappack.jpg"
        alt="Local map pack showing three electricians for a Taunton search"
        className="hidden w-[360px] shrink-0 min-[1100px]:block"
        caption={"“electrician taunton” · three get shown · it changes by street"}
      />
    </Split>
  );
}

export function CitationsSlide() {
  return (
    <SlidePad>
      <div className="flex min-h-0 flex-1 gap-8">
        <div className="flex min-w-0 flex-1 flex-col">
          <Kicker>Tier three · 3 of 4</Kicker>
          <Display className="mt-4 max-w-[14ch] text-5xl min-[701px]:text-6xl">
            Citations and local links
          </Display>
          <ul className="mt-8 space-y-4">
            {["Same name, address, phone", "Everywhere you're listed", "Your social profiles count too"].map((item) => (
              <DashItem key={item}>{item}</DashItem>
            ))}
          </ul>
          <p className="mt-7 text-sm text-subtle">Potts Brothers · Google, Instagram, Facebook, Angi, BBB, Houzz, Nextdoor and more.</p>
          <ScoreChip n={8} />
        </div>
        <div className="hidden w-[620px] shrink-0 grid-cols-2 gap-2 min-[1000px]:grid">
          {[
            ["/slides/user-added/potts-links-top-blurred.png", "Potts Brothers search results and social profiles", ""],
            ["/slides/user-added/potts-links-middle.png", "Potts Brothers local links and profiles", ""],
            ["/slides/user-added/potts-links-bottom.png", "Potts Brothers additional local links", ""],
            ["/slides/user-added/ds.png", "DS HomeTech website navigation and service menu", ""],
            ["/slides/user-added/service-rep.png", "Handyman repair website hero example", "col-span-2"],
          ].map(([src, alt, extra]) => (
            <div
              key={src}
              className={`h-40 overflow-hidden rounded-lg bg-surface shadow-[var(--shadow-border)] ${extra}`}
            >
              <img src={src} alt={alt} className="h-full w-full object-contain" />
            </div>
          ))}
        </div>
        <NineRail active={8} />
      </div>
    </SlidePad>
  );
}

export function PhoneSlide() {
  return (
    <Split
      kicker="Tier three · 4 of 4"
      title="When the phone rings"
      items={["A lot of local businesses miss calls", "Voicemail often means the caller keeps shopping", "Text back immediately instead of losing the lead"]}
      score={9}
    >
      <div className="hidden w-[470px] shrink-0 flex-col justify-center min-[1000px]:flex">
        <Photo
          src="/slides/user-added/missed-calls.png"
          alt="Google search showing statistics about missed calls for small businesses"
          caption="Industry search result · 25–62% missed-call range shown in the screenshot"
          contain
        />
      </div>
    </Split>
  );
}
