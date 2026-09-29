import type { ReactNode } from "react";
import { DemoThenPicture } from "./demo-kit";
import { PostingDemo, POSTING_MS, ProfileDemo, PROFILE_MS, ReviewsDemo, REVIEWS_MS, ServicePagesDemo, SERVICE_PAGES_MS, WebsiteDemo, WEBSITE_MS } from "./demos-a";
import { AiDemo, AI_MS, CitationsDemo, CITATIONS_MS, KeywordsDemo, KEYWORDS_MS, PhoneDemo, PHONE_MS } from "./demos-b";
import { Body, DashItem, Display, HouseGraphic, Kicker, NineRail, Plain, SlidePad } from "./primitives";

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
          <Display className="mt-4 text-5xl min-[701px]:text-[3.9rem]">{title}</Display>
          {score ? <Plain n={score} /> : null}
          <ul className="mt-6 space-y-3">
            {items.map((item) => (
              <DashItem key={item}>{item}</DashItem>
            ))}
          </ul>
          {caption ? <p className="mt-8 text-sm text-subtle">{caption}</p> : null}
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
          <Kicker>Reputation · 1 of 4</Kicker>
          <Display className="mt-4 text-5xl min-[701px]:text-[3.9rem]">Your Google profile</Display>
          <Plain n={1} />
          <ul className="mt-6 space-y-3">
            {["Right main category", "Every service listed", "Photo + post, last 30 days"].map((item) => (
              <DashItem key={item}>{item}</DashItem>
            ))}
          </ul>
        </div>
        <DemoThenPicture duration={PROFILE_MS} demo={ProfileDemo} className="hidden w-[500px] shrink-0 min-[901px]:flex" />
        <NineRail active={1} />
      </div>
    </SlidePad>
  );
}

export function ReviewsSlide() {
  return (
    <Split
      kicker="Reputation · 2 of 4"
      title="Your reviews"
      items={["New review, last 30 days", "A reply on every one", "Asked for automatically"]}
      score={2}
    >
      <DemoThenPicture duration={REVIEWS_MS} demo={ReviewsDemo} className="hidden w-[480px] shrink-0 min-[1100px]:flex" />
    </Split>
  );
}

export function WebsiteSlide() {
  return (
    <SlidePad>
      <div className="flex min-h-0 flex-1 gap-8">
        <div className="flex min-w-0 flex-1 flex-col">
          <Kicker>Reputation · 3 of 4</Kicker>
          <Display className="mt-4 text-4xl min-[701px]:text-[3rem]">Your website, in five seconds</Display>
          <p className="mt-4 text-[1.3rem] leading-snug text-muted">A stranger lands on your site. Do they know what you do, where, and how to call?</p>
          <ul className="mt-6 space-y-3">
            {["What you do + where", "Licensed + insured", "Tap-to-call button", "All without scrolling"].map((item) => (
              <DashItem key={item}>{item}</DashItem>
            ))}
          </ul>
        </div>
        <DemoThenPicture duration={WEBSITE_MS} demo={WebsiteDemo} className="hidden w-[640px] shrink-0 min-[1000px]:flex" />
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
          <Kicker>Ranking · 1 of 5</Kicker>
          <Display className="mt-4 text-5xl min-[701px]:text-[3.9rem]">
            A page for every service
          </Display>
          <Plain n={5} />
          <ul className="mt-10 space-y-5">
            {["One page per job", "Not one “services” page", "Every job that pays you"].map((item) => (
              <DashItem key={item}>{item}</DashItem>
            ))}
          </ul>
        </div>
        <DemoThenPicture duration={SERVICE_PAGES_MS} demo={ServicePagesDemo} className="hidden w-[500px] shrink-0 min-[901px]:flex" />
        <NineRail active={5} />
      </div>
    </SlidePad>
  );
}

export function PostingSlide() {
  return (
    <SlidePad>
      <div className="flex min-h-0 flex-1 gap-8">
        <div className="flex min-w-0 flex-1 flex-col">
          <Kicker>Ranking · 2 of 5</Kicker>
          <Display className="mt-4 text-5xl min-[701px]:text-[3.9rem]">
            We post. Every week. For you.
          </Display>
          <Plain n={6} />
          <ul className="mt-6 space-y-3">
            {["Every Wednesday and Saturday", "On your website and your Google profile", "We write it and post it"].map((item) => (
              <DashItem key={item}>{item}</DashItem>
            ))}
          </ul>
        </div>
        <DemoThenPicture duration={POSTING_MS} demo={PostingDemo} className="hidden w-[480px] shrink-0 min-[1000px]:flex" />
        <NineRail active={6} />
      </div>
    </SlidePad>
  );
}

export function AiSlide() {
  return (
    <Split
      kicker="Ranking · 3 of 5"
      title="AI visibility"
      items={["People ask their phone now", "It gives one name, not ten", "Ask ChatGPT. Are you in it?"]}
      score={7}
      caption="Yelp, HomeAdvisor and Nextdoor tell ChatGPT, Claude and Perplexity: do not read this"
    >
      <DemoThenPicture duration={AI_MS} demo={AiDemo} className="hidden w-[460px] shrink-0 min-[1100px]:flex" />
    </Split>
  );
}

export function KeywordsSlide() {
  return (
    <Split
      kicker="Ranking · 4 of 5"
      title="Keywords and rankings"
      items={["The 10 searches that pay you", "Where you rank for each", "From their street, not yours"]}
      score={8}
    >
      <DemoThenPicture duration={KEYWORDS_MS} demo={KeywordsDemo} className="hidden w-[460px] shrink-0 min-[1100px]:flex" />
    </Split>
  );
}

export function CitationsSlide() {
  return (
    <SlidePad>
      <div className="flex min-h-0 flex-1 gap-8">
        <div className="flex min-w-0 flex-1 flex-col">
          <Kicker>Ranking · 5 of 5</Kicker>
          <Display className="mt-4 text-5xl min-[701px]:text-[3.9rem]">
            Citations and local links
          </Display>
          <Plain n={9} />
          <ul className="mt-6 space-y-3">
            {["Same name, address, phone", "Everywhere you're listed", "Your social profiles count too"].map((item) => (
              <DashItem key={item}>{item}</DashItem>
            ))}
          </ul>
        </div>
        <DemoThenPicture duration={CITATIONS_MS} demo={CitationsDemo} className="hidden w-[460px] shrink-0 min-[1000px]:flex" />
        <NineRail active={9} />
      </div>
    </SlidePad>
  );
}

export function PhoneSlide() {
  return (
    <Split
      kicker="Reputation · 4 of 4"
      title="When the phone rings"
      items={["You miss the call", "A text goes out by itself", "They text back, not the next guy"]}
      score={4}
    >
      <DemoThenPicture duration={PHONE_MS} demo={PhoneDemo} className="hidden w-[470px] shrink-0 min-[1000px]:flex" />
    </Split>
  );
}

/**
 * Tier transitions (29 Sept 2026, replacing the "Quick check" word slides):
 * before each tier, the house with the level we're on lit up, so the room
 * sees where they are in the structure. Reputation (1-4) is the foundation,
 * Ranking (5-9) the frame, Reach (ads) the roof.
 */
const TIER_COPY = {
  reputation: {
    kicker: "Tier one",
    title: "Reputation.",
    accent: "The foundation.",
    sub: "Four things. When someone finds you, do they trust you enough to call?",
  },
  rankings: {
    kicker: "Reputation, done · Tier two",
    title: "Ranking.",
    accent: "The frame.",
    sub: "Five things. Getting found for more than your own name.",
  },
  reach: {
    kicker: "Tier three",
    title: "Reach.",
    accent: "The roof.",
    sub: "Ads. Only once the foundation and the frame are in.",
  },
} as const;

export function TierSlide({ layer }: { layer: keyof typeof TIER_COPY }) {
  const c = TIER_COPY[layer];
  return (
    <SlidePad>
      <div className="grid min-h-0 flex-1 items-center gap-10 min-[901px]:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Kicker>{c.kicker}</Kicker>
          <Display className="mt-4 text-6xl min-[701px]:text-[5.5rem]">
            {c.title} <span className="block text-accent">{c.accent}</span>
          </Display>
          <Body className="mt-6 max-w-[30ch] text-2xl">{c.sub}</Body>
        </div>
        <div className="h-full min-h-0">
          <HouseGraphic highlight={layer} mode="items" />
        </div>
      </div>
    </SlidePad>
  );
}
