import type { ComponentType } from "react";
import {
  PenSlide,
  ProofSlide,
  ScenariosSlide,
  StartingSlide,
  TakeHomeSlide,
  TitleSlide,
  WholeListSlide,
  WhySlide,
} from "./opening";
import {
  AiSlide,
  CheckpointSlide,
  CitationsSlide,
  KeywordsSlide,
  PhoneSlide,
  PostingSlide,
  ProfileSlide,
  ReviewsSlide,
  ServicePagesSlide,
  TierHeader,
  WebsiteSlide,
} from "./tiers";
import {
  HousePricingSlide,
  MathSlide,
  PyramidSlide,
  WhatYouGetSlide,
  ScoreRecapSlide,
  StructureSlide,
} from "./house";
import { AdsProofSlide, CtaSlide, ProofClipsSlide } from "./close";
import { MissedCallDemoSlide } from "./demo";
import { AutoGlossSlide, PriceCompareSlide, ReferenceCallSlide, ResultsWallSlide } from "./credibility";

export type SlideDef = {
  id: string;
  title: string;
  notes: string;
  Component: ComponentType;
};

function T1() {
  return (
    <TierHeader
      n="Tier one"
      title="You have it. Does it pass?"
      sub="Google profile, reviews, website."
      active={1}
    />
  );
}
function Check1() {
  return <CheckpointSlide tier={1} />;
}
function Check2() {
  return <CheckpointSlide tier={2} />;
}
function T2() {
  return (
    <TierHeader
      n="Tier two"
      title="Found for more than your name"
      sub="A page for every service. Posting, every week — we automate it."
      active={4}
    />
  );
}
function T3() {
  return (
    <TierHeader
      n="Tier three"
      title="The part almost nobody does"
      sub="AI visibility. Keywords. Citations. When the phone rings."
      active={6}
    />
  );
}

export const SLIDES: SlideDef[] = [
  {
    id: "starting",
    title: "Starting soon",
    notes: "Hold slide before the webinar starts. We're live at 7:10 PM EST. Say it out loud as people join: drop your email or the last 4 of your phone in the chat. That is the attendance list, and it is who gets the text tonight.",
    Component: StartingSlide,
  },
  {
    id: "reference",
    title: "Reference call",
    notes: "You clicked a random ad, you have no idea who I am. So before anything else: a reference call, live. Call Duncan at R&D Plumbing, Baldwin County, Alabama. Brand-new company, came to us in July with nothing: no site, no logo, no Google profile. Let him say what it's been like working with us. Don't put numbers in his mouth: he has no reviews yet and his Google profile is still in verification, so keep it to the experience. Call him Duncan.",
    Component: ReferenceCallSlide,
  },
  {
    id: "title",
    title: "The nine things",
    notes: "Start on time. Promise the list, never an outcome.",
    Component: TitleSlide,
  },
  {
    id: "why",
    title: "Why you're here",
    notes: "One line. Leverage technology to grow the business. Don't add a speech.",
    Component: WhySlide,
  },
  {
    id: "proof",
    title: "Client results",
    notes: "Potts Brothers, Mission Decks, M.E. Garlock. Google's numbers, not ours. Point at leads, form starts, and the Garlock organic-search screenshot. Don't oversell.",
    Component: ProofSlide,
  },
  {
    id: "results-wall",
    title: "Six more businesses",
    notes: "Rapid-fire, one line each. Every number is from their own Search Console, Analytics or Ads. The #1s are Search Console average position for that search, not the map, so say 'on Google search'. Benrishi: no licence talk.",
    Component: ResultsWallSlide,
  },
  {
    id: "autogloss",
    title: "Case study: AutoGloss",
    notes: "Jeff Miller, detailing, Fuquay-Varina NC. New site went up September 10. 18 real leads in the next two weeks, 10 from the site and 8 from the ads page. Clicks from Google search 42 vs 12. Cost per click down from $3.80 to $2.71. Don't mention revenue, and don't say veteran-owned.",
    Component: AutoGlossSlide,
  },
  {
    id: "scenarios",
    title: "Three scenarios",
    notes: "Hundreds of contractors. Most are in one of these three. No fault of their own.",
    Component: ScenariosSlide,
  },
  {
    id: "pen",
    title: "Score yourself",
    notes: "Pace: this crowd includes owners with zero background. Read the plain-words line (the one with the orange bar) on every check before the bullets. Pen and paper. Mean it. If you have to think, it's a no. At the end you will ask for the number.",
    Component: PenSlide,
  },
  {
    id: "takehome",
    title: "The list goes home with you",
    notes: "Say it out loud: don't copy the slides, the whole checklist is at go.cjp-enterprises.com/nine. Only write down your score. Then plant the hook: stick around to the end: questions, and I'll tell you what I found when I pulled up your business. Don't say what it is yet. Leave it up for a slow count of five so people can scan the code.",
    Component: TakeHomeSlide,
  },
  {
    id: "list",
    title: "The whole list",
    notes: "Finite list. Not a secret. Nine things in three tiers. Keep moving.",
    Component: WholeListSlide,
  },
  {
    id: "t1",
    title: "Tier one",
    notes: "Most of you have all three. The question is whether they pass.",
    Component: T1,
  },
  {
    id: "profile",
    title: "Google profile",
    notes: "Right category, every service, photo and post in last 30 days. Three real Google Business Profiles are shown on the right.",
    Component: ProfileSlide,
  },
  {
    id: "reviews",
    title: "Reviews",
    notes: "Freshness + replies. Fix tonight: reply to last five.",
    Component: ReviewsSlide,
  },
  {
    id: "website",
    title: "Website in five seconds",
    notes: "Garlock plus two stronger contractor website examples on the right. What, where, licensed, tap-to-call — no scroll. That's the bar.",
    Component: WebsiteSlide,
  },
  {
    id: "check1",
    title: "Quick check: tier one",
    notes: "Slow down here. Say each one back in one line. Then stop talking and read the chat for ten seconds. Answer a question in ten seconds, or park it once for Q&A.",
    Component: Check1,
  },
  {
    id: "t2",
    title: "Tier two",
    notes: "Two things. Found for more than your own name.",
    Component: T2,
  },
  {
    id: "pages",
    title: "A page per job",
    notes: "If it makes you money, it gets its own page.",
    Component: ServicePagesSlide,
  },
  {
    id: "posting",
    title: "Posting every week",
    notes: "Two examples: a contractor blog and Google Business Profile posts. Lean on automation. We post to Google and the site, plus Facebook and Instagram. Do NOT call socials backlinks.",
    Component: PostingSlide,
  },
  {
    id: "check2",
    title: "Quick check: tier two",
    notes: "Same as before. Say the two back. Read the chat. Tier three is the least familiar part for most people, so go slower there than you think you need to.",
    Component: Check2,
  },
  {
    id: "t3",
    title: "Tier three",
    notes: "This is where it gets past the basics. Move.",
    Component: T3,
  },
  {
    id: "ai",
    title: "AI visibility",
    notes: "Capped at 90 seconds. Don't say GEO or AEO.",
    Component: AiSlide,
  },
  {
    id: "keywords",
    title: "Keywords + rankings",
    notes: "Checking from the office tells you nothing.",
    Component: KeywordsSlide,
  },
  {
    id: "citations",
    title: "Citations + links",
    notes: "Potts Brothers search results showing local links and social profiles. Tedious, not hard.",
    Component: CitationsSlide,
  },
  {
    id: "phone",
    title: "When the phone rings",
    notes: "The missed-call screenshot is the visual. The point is simple: if the phone rings and nobody answers, text back immediately. That's nine. Add up the score.",
    Component: PhoneSlide,
  },
  {
    id: "missed-call-demo",
    title: "Missed call, text back",
    notes: "Let it play, talk over it. You miss the call because you're on a job, the text goes out by itself in seconds, they text back instead of calling the next guy, job booked. Say it's an example conversation, not a real customer. Hit Play again if the chat wants to see it twice.",
    Component: MissedCallDemoSlide,
  },
  {
    id: "score",
    title: "Your score",
    notes: "Ask for the number. Then tie the nine back into the house.",
    Component: ScoreRecapSlide,
  },
  {
    id: "math",
    title: "What is it costing you?",
    notes: "Slow down. Ask all three out loud and wait for the chat. Then the math: their average job times one more a week, times 52. Their number, never ours. Tell one real client story here in plain contractor words (what the phone was doing before, what it does now) using only numbers from the proof slide. No invented stats.",
    Component: MathSlide,
  },
  {
    id: "pyramid",
    title: "The house",
    notes: "Reputation at the bottom. Ranking in the middle. Reach on the roof. Don't invert it.",
    Component: PyramidSlide,
  },
  {
    id: "structure",
    title: "How I structure my services",
    notes: "No prices yet. Some guys only need the foundation. Some need foundation + frame. Some are ready for ads. Meet them where they are. Do not push ads.",
    Component: StructureSlide,
  },
  {
    id: "house-pricing",
    title: "The house, priced",
    notes: "Same house. Price next to each level. Essentials is the foundation. Growth is the frame. Pro is the roof. Next slide spells out what each one does.",
    Component: HousePricingSlide,
  },
  {
    id: "piece-by-piece",
    title: "Piece by piece vs one plan",
    notes: "If you went out and bought all of this separately, low-end small-business prices, it's $1,760 to $4,834 a month, plus $2,500 to $10,000 for the website. Walk down the checks: Essentials already covers the website, reviews and missed-call text back. Growth is everything but the ads. Ad spend isn't in any of these numbers. Sources for every range are in credibility.tsx.",
    Component: PriceCompareSlide,
  },
  {
    id: "what-you-get",
    title: "What you get, check by check",
    notes: "This answers the Hometown Air note: say exactly what each price buys. Essentials covers four of the nine. Growth covers all nine. Walk the Growth column line by line. Posts are twice a week. If asked about ads: that's Pro, only once the foundation is working.",
    Component: WhatYouGetSlide,
  },
  {
    id: "ads-proof",
    title: "When you're ready for ads",
    notes: "This is the transition into paid advertising. A2Z: 25 tracked leads. One job was a $37,000 driveway on roughly $3,000 in ad spend, about $500/month. Richard: 49 tracked results, including 31 phone call leads. Do not imply every client gets the same outcome.",
    Component: AdsProofSlide,
  },
  {
    id: "clips",
    title: "Hear it from the owners",
    notes: "Click play on Micah and Richard. These are the two YouTube testimonials provided for the webinar.",
    Component: ProofClipsSlide,
  },
  {
    id: "cta",
    title: "What happens next",
    notes: "The close. I audited every one of your businesses, and I'll follow up with each one of you to schedule a call to go over the audit. I have some times open Thursday and Friday if anyone wants to book in: if you're available, type in the chat. If not, I'll follow up with each of you by phone and we'll schedule a time to go over your audit results. No QR code, no discount. Leave it up for questions.",
    Component: CtaSlide,
  },
];
