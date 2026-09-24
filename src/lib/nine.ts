/**
 * The nine checks, once. The slides read `plain` for the "in plain words" line
 * and the /checklist page reads all of it, so what people take home says
 * exactly what they were shown.
 *
 * Why this exists: the 23 Sept attendee critique. The talk went fast for
 * owners with no background, and people left with nothing to hold on to. So
 * every check gets one sentence a total beginner can follow, and a take-home
 * page with the pass test and one thing to do tonight.
 */
export type Check = {
  n: number;
  tier: 1 | 2 | 3;
  /** The cheapest plan that does this check for them, and what we actually do. */
  plan: "essentials" | "growth";
  weDo: string;
  name: string;
  plain: string;
  pass: string[];
  tonight: string;
};

export const TIERS = {
  1: "You have it. Does it pass?",
  2: "Found for more than your name",
  3: "The part almost nobody does",
} as const;

export const NINE: Check[] = [
  {
    n: 1,
    tier: 1,
    plan: "growth",
    weDo: "Your Google profile set up right: category, every service, kept current",
    name: "Your Google profile",
    plain: "The box with your name, stars and phone number that shows up when someone Googles you.",
    pass: ["Right main category", "Every service listed", "A photo and a post in the last 30 days"],
    tonight: "Open your profile. Check the main category, add any missing service, post one job photo.",
  },
  {
    n: 2,
    tier: 1,
    plan: "essentials",
    weDo: "A review request goes out automatically after every job",
    name: "Your reviews",
    plain: "Google trusts what your customers say about you more than what you say about yourself.",
    pass: ["A new review in the last 30 days", "A reply on every one", "Asked for automatically, not when you remember"],
    tonight: "Reply to your last five reviews. Then text your review link to your last three happy customers.",
  },
  {
    n: 3,
    tier: 1,
    plan: "essentials",
    weDo: "An AI website on your own domain. SEO agents rewrite it every 2 weeks",
    name: "Your website, in five seconds",
    plain: "A stranger lands on your site. In five seconds, do they know what you do, where, and how to call you?",
    pass: ["What you do and where", "Licensed and insured", "A tap-to-call button", "All of it without scrolling"],
    tonight: "Open your site on your phone. Write down which of the four you can't see without scrolling.",
  },
  {
    n: 4,
    tier: 2,
    plan: "growth",
    weDo: "A page for each job and each town you work",
    name: "A page for every service",
    plain: "Google shows pages, not companies. No page for a job means you can't show up for that job.",
    pass: ["One page per job", "Not one “services” page", "Every job that pays you"],
    tonight: "List the five jobs that make you the most money. Each one needs its own page.",
  },
  {
    n: 5,
    tier: 2,
    plan: "growth",
    weDo: "New posts twice a week, on your site and your Google profile",
    name: "Posting, every week",
    plain: "A profile or site that hasn't changed in months looks closed. Something new says you're open.",
    pass: ["Something new in the last 7 days", "On Google and on your site"],
    tonight: "Post one photo of a job you finished this week to your Google profile.",
  },
  {
    n: 6,
    tier: 3,
    plan: "essentials",
    weDo: "Your site built so ChatGPT and Google's AI can read it",
    name: "AI visibility",
    plain: "People now ask ChatGPT who's good near them. It answers with a name. Is it yours?",
    pass: ["Ask ChatGPT for your trade in your town", "Your business is one of the names it gives"],
    tonight: "Ask ChatGPT “who's the best [your trade] in [your town]?” Write down who it names.",
  },
  {
    n: 7,
    tier: 3,
    plan: "growth",
    weDo: "Your rankings tracked, and a monthly report from Google's own numbers",
    name: "Keywords and rankings",
    plain: "The exact words people type when they need you, and where you show up for each one.",
    pass: ["You know the 10 searches that pay you", "You know where you rank for each", "Checked from their street, not your office"],
    tonight: "Write down the 10 searches a customer would type to find you. That list is your keywords.",
  },
  {
    n: 8,
    tier: 3,
    plan: "growth",
    weDo: "Your listings cleaned up and matched, and local links built",
    name: "Citations and local links",
    plain: "Every other website that lists your business name, address and phone. They all need to match.",
    pass: ["Same name, address and phone", "Everywhere you're listed", "Social profiles count too"],
    tonight: "Google your business name. Check every listing on page one has the same name, address and phone.",
  },
  {
    n: 9,
    tier: 3,
    plan: "essentials",
    weDo: "A missed call gets a text back in seconds",
    name: "When the phone rings",
    plain: "When you can't pick up, a text goes out right away so the caller doesn't just call the next guy.",
    pass: ["Missed calls get a text back right away", "Not just a voicemail"],
    tonight: "Call your own business when you know nobody will answer. Listen to what your customer gets.",
  },
];

export function plainFor(n: number): string {
  return NINE.find((c) => c.n === n)?.plain ?? "";
}

/** Where the checklist lives, as said out loud and printed on the slides. */
export const CHECKLIST_URL = "go.cjp-enterprises.com/nine";
