import type { ComponentType } from "react";
import {
  PenSlide,
  ScenariosSlide,
  StartingSlide,
  TakeHomeSlide,
  TitleSlide,
  WholeListSlide,
} from "./opening";
import {
  AiSlide,
  CitationsSlide,
  KeywordsSlide,
  PhoneSlide,
  PostingSlide,
  ProfileSlide,
  ReviewsSlide,
  ServicePagesSlide,
  TierSlide,
  WebsiteSlide,
} from "./tiers";
import {
  MathSlide,
  PyramidSlide,
  WhatYouGetSlide,
  ScoreRecapSlide,
  StructureSlide,
} from "./house";
import { CtaSlide, ProofClipsSlide } from "./close";
import { AfterYesSlide } from "./signal";
import { AdsDemoSlide, AutoGlossLiveSlide, RdOutcomeSlide } from "./outcomes";
import { ObjectionsSlide, PriceCompareSlide, ReferenceCallSlide, ResultsLeadsSlide, ResultsRanksSlide, ResultsTrafficSlide } from "./credibility";

export type SlideDef = {
  id: string;
  title: string;
  notes: string;
  Component: ComponentType;
};

function TierReputation() {
  return <TierSlide layer="reputation" />;
}
function TierRanking() {
  return <TierSlide layer="rankings" />;
}
function TierReach() {
  return <TierSlide layer="reach" />;
}

export const SLIDES: SlideDef[] = [
  {
    id: "starting",
    title: "Starting soon",
    notes: "[hold] Hold slide before the webinar starts. We're live at 7:10 PM EST. Say it out loud as people join: drop your email or the last 4 of your phone in the chat. That is the attendance list, and it is who gets the text tonight.",
    Component: StartingSlide,
  },
  {
    id: "reference",
    title: "Reference call",
    notes: "[~3 min] You clicked a random ad, you have no idea who I am. So before anything else: a reference call, live. Call Duncan at R&D Plumbing, Baldwin County, Alabama. Brand-new company, came to us in July with nothing: no site, no logo, no Google profile. Let him say what it's been like working with us. Don't put numbers in his mouth: he has no reviews yet and his Google profile is still in verification, so keep it to the experience. Call him Duncan.",
    Component: ReferenceCallSlide,
  },
  {
    id: "rd-outcome",
    title: "R&D: brand new to $20,000 job",
    notes: "[~1.5 min] Straight after Duncan hangs up. It plays itself, slowly: someone Googles a plumber in Baldwin County, R&D comes up, his real site scrolls, an estimate request goes in, it lands in Signal on his phone, he marks it Closed and notes $20,000. Say it once and let the number sit. The $20,000 is YOUR figure (not in the client record yet): confirm it with Duncan. Change it in outcomes.tsx (RD_JOB) if it's off.",
    Component: RdOutcomeSlide,
  },
  {
    id: "title",
    title: "The nine things",
    notes: "[~0.5 min] Start on time. Promise the list, never an outcome.",
    Component: TitleSlide,
  },
  {
    id: "results-traffic",
    title: "Real results: traffic",
    notes: "[~1 min] Screenshots straight out of their Google accounts. Point at the line, then read 'what it means'. AutoGloss: new site Sept 10, clicks from Google went 12 to 42 over the next 17 days. Benrishi: shown on Google 45% more in August than July. No licence talk on Benrishi.",
    Component: ResultsTrafficSlide,
  },
  {
    id: "results-leads",
    title: "Real results: leads + calls",
    notes: "[~1 min] Potts: 29 lead forms and 9 taps to call from the website, Aug to Sept, Google Analytics. SmithStraw: 31 phone calls from Google Ads plus 18 contacts. This is the phone ringing.",
    Component: ResultsLeadsSlide,
  },
  {
    id: "results-ranks",
    title: "Real results: rankings",
    notes: "[~1 min] Position is the average spot on Google search, lower is better. Two Koats: 1.2 for 'painter' across 269 searches, 3.4 for exterior painters Virginia Beach. A2Z: page one for concrete near me, concrete work near me. Say 'on Google search', not 'number one on the map'.",
    Component: ResultsRanksSlide,
  },
  {
    id: "autogloss",
    title: "Case study: AutoGloss",
    notes: "[~1.5 min] It plays slowly: Jeff's real site scrolls while his leads land one by one, 18 in two weeks (10 from the site, 8 from the ads page), then clicks from Google go 12 to 42. Site went up September 10. Don't mention revenue, and don't say veteran-owned.",
    Component: AutoGlossLiveSlide,
  },
  {
    id: "scenarios",
    title: "Three scenarios",
    notes: "[~1 min] Hundreds of contractors. Most are in one of these three. No fault of their own.",
    Component: ScenariosSlide,
  },
  {
    id: "pen",
    title: "Score yourself",
    notes: "[~0.5 min] Pace: this crowd includes owners with zero background. Read the plain-words line (the one with the orange bar) on every check before the bullets. Pen and paper. Mean it. If you have to think, it's a no. At the end you will ask for the number.",
    Component: PenSlide,
  },
  {
    id: "takehome",
    title: "The list goes home with you",
    notes: "[~0.5 min] Say it out loud: don't copy the slides, the whole checklist is at go.cjp-enterprises.com/nine. Only write down your score. Then plant the hook: stick around to the end, I already pulled up every one of your businesses and scored it, and at the end I'll tell you how to get yours. Don't say the number or what's in it yet. Leave it up for a slow count of five so people can scan the code.",
    Component: TakeHomeSlide,
  },
  {
    id: "list",
    title: "The whole list",
    notes: "[~0.5 min] Finite list. Not a secret. Nine things: four for reputation, five for ranking, then the roof is ads. Keep moving.",
    Component: WholeListSlide,
  },
  {
    id: "tier-reputation",
    title: "Tier one: Reputation",
    notes: "[~0.5 min] Point at the bottom of the house. We start with reputation, the foundation: four things. When someone finds you, do they trust you enough to call?",
    Component: TierReputation,
  },
  {
    id: "profile",
    title: "Google profile",
    notes: "[~2 min] The animation plays first: we get in and optimize it (category, every service, a photo, a post) until the profile is complete. Then the three real profiles fade in. Say: we go in there and optimize it completely for you. Right category, every service, photo and post in last 30 days. Three real Google Business Profiles are shown on the right.",
    Component: ProfileSlide,
  },
  {
    id: "reviews",
    title: "Reviews",
    notes: "[~1.5 min] Animation first: you tap Closed, the review ask goes out, five stars land on Google, the owner reply goes on. Then the real 4-vs-92 comparison fades in. Freshness + replies. Fix tonight: reply to last five.",
    Component: ReviewsSlide,
  },
  {
    id: "website",
    title: "Website in five seconds",
    notes: "[~2 min] Animation first: Duncan's real site, five-second test, then it scrolls the whole build. Then the three example sites fade in. Garlock plus two stronger contractor website examples on the right. What, where, licensed, tap-to-call — no scroll. That's the bar.",
    Component: WebsiteSlide,
  },
  {
    id: "phone",
    title: "When the phone rings",
    notes: "[~1.5 min] The missed-call demo now plays right on this slide and stays up. Talk over it: you miss the call, the text goes out by itself, they text back, job booked. The point is simple: if the phone rings and nobody answers, text back immediately. That's the foundation done.",
    Component: PhoneSlide,
  },
  {
    id: "tier-ranking",
    title: "Tier two: Ranking",
    notes: "[~0.5 min] Reputation, done: that's the foundation. Now the frame: ranking, five things, getting found for more than your own name. Read the chat for ten seconds before moving on.",
    Component: TierRanking,
  },
  {
    id: "pages",
    title: "A page per job",
    notes: "[~1.5 min] Animation first: R&D's real service and town pages fill in (16 of them), then a Daphne search lands on his Daphne page (that search is an illustration). If it makes you money, it gets its own page.",
    Component: ServicePagesSlide,
  },
  {
    id: "posting",
    title: "Posting every week",
    notes: "[~1.5 min] Animation plays and holds: R&D's real posts go up every Wednesday and Saturday, on the website blog and the Google Business Profile. That's it: NOT Facebook or Instagram. Say: we write it and post it, you don't touch it.",
    Component: PostingSlide,
  },
  {
    id: "ai",
    title: "AI visibility",
    notes: "[~1.5 min] Animation first: the code behind the site gets read, then ChatGPT names the business. Example company. Capped at 90 seconds. Don't say GEO or AEO.",
    Component: AiSlide,
  },
  {
    id: "keywords",
    title: "Keywords + rankings",
    notes: "[~1.5 min] Animation first: rankings climb, then the grid shows ranks from 25 spots around town. Example company. Checking from the office tells you nothing.",
    Component: KeywordsSlide,
  },
  {
    id: "citations",
    title: "Citations + links",
    notes: "[~1 min] Animation first: wrong listings get fixed one by one until 9 of 9 match, then local links get added. Example company. Potts Brothers search results showing local links and social profiles. Tedious, not hard. That's nine. Add up the score.",
    Component: CitationsSlide,
  },
  {
    id: "score",
    title: "Your score",
    notes: "[~1 min] Nobody can click anything, so ask out loud: count up your nine, put the number in the chat. Read the line on screen: I already ran the real one on your business, you get it at the end. Then tie the nine back into the house.",
    Component: ScoreRecapSlide,
  },
  {
    id: "tier-reach",
    title: "Tier three: Reach",
    notes: "[~0.5 min] The roof: reach, which is ads. Only once the foundation and the frame are in. That was the nine. Now the roof: what reach is. Steve at A2Z is the example on the next slide.",
    Component: TierReach,
  },
  {
    id: "ads-demo",
    title: "When you are ready for ads",
    notes: "[~1.5 min] The transition into ads. Say it: now the foundation's in, we have everything we need to start scaling, so we go get more traffic. Steve at A2Z Concrete did exactly that: about six months of ads, about $3,000 spent (roughly $500 a month), 25 tracked leads, so about $120 a lead. One of those leads was a $37,000 driveway, and that one job paid for the whole service and all the ad spend. Only after the foundation. Don't imply every client gets this.",
    Component: AdsDemoSlide,
  },
  {
    id: "math",
    title: "What is it costing you?",
    notes: "[~2 min] Slow down. Ask all three out loud and wait for the chat. Then the math: their average job times one more a week, times 52. Their number, never ours. Tell one real client story here in plain contractor words (what the phone was doing before, what it does now) using only numbers from the proof slide. No invented stats.",
    Component: MathSlide,
  },
  {
    id: "structure",
    title: "How I structure my services",
    notes: "[~1 min] No prices yet. Some guys only need the foundation. Some need foundation + frame. Some are ready for ads. Meet them where they are. Do not push ads.",
    Component: StructureSlide,
  },
  {
    id: "piece-by-piece",
    title: "Piece by piece vs one plan",
    notes: "[~2 min] If you went out and bought all of this separately, it's $3,240 to $10,249 a month, plus $2,500 to $10,000 for the website. Walk down the checks: Essentials already covers the website, reviews and missed-call text back. Growth is everything but the ads. Pro adds the ads. Ad spend isn't in any of these numbers.",
    Component: PriceCompareSlide,
  },
  {
    id: "clips",
    title: "Hear it from the owners",
    notes: "[~3 min] Click play on Micah and Richard. These are the two YouTube testimonials provided for the webinar.",
    Component: ProofClipsSlide,
  },
  {
    id: "after-yes",
    title: "When you say yes",
    notes: "[~1 min] Take the mystery out of signing up. On the 20-minute call we go over their audit and they sign up. Then we build: site, Google profile, a page for every job. Then onboarding: we set them up in Signal on their phone. Then it's live, and every week after it keeps running. Land the headline: we do the work, you answer the phone. Don't promise a go-live date. Month to month; domain, Google page, reviews and leads stay theirs. Never say they own the website.",
    Component: AfterYesSlide,
  },
  {
    id: "objections",
    title: "What you're probably thinking",
    notes: "[~2 min] Answer them before the chat does. Agree first, never argue, never knock their guy. Referrals: good, but they Google you before they call. Website guy: good, what does he do every month? Burned before: don't take my word, month to month, cancel any time, every number from your own Google account.",
    Component: ObjectionsSlide,
  },
  {
    id: "cta",
    title: "What happens next",
    notes: "[~2 min] The reveal. I already pulled up every one of your businesses and scored it against the nine. When we go over it you get your score, where you come up when someone searches your trade and your town and who is above you, and your top fixes, yours to keep either way. Then the ask: want to book? Type it in the chat. And either way, I am following up with every one of you. Say Google business search, never the map. Leave it up for questions.",
    Component: CtaSlide,
  },
];
