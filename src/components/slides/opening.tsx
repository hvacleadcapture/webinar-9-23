import { Body, Display, HouseGraphic, Kicker, SlidePad } from "./primitives";

export function TitleSlide() {
  return (
    <div className="relative h-full overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[2%] right-[-1%] hidden h-[92%] w-[54%] min-[701px]:block"
      >
        <div className="house-glow absolute top-[20%] right-[8%] h-[58%] w-[70%]" />
        <HouseGraphic className="relative z-10 h-full w-full" />
      </div>
      <SlidePad className="relative z-10 justify-end pb-16 max-[700px]:justify-start">
        <img
          src="/slides/logo-cjp.png"
          alt="CJP Enterprises"
          className="mb-8 h-11 w-auto object-contain object-left max-[700px]:h-9"
        />
        <Display className="max-w-[15ch] text-5xl min-[701px]:text-[5.15rem]">
          The nine things Google reads before it decides which contractor gets the call
        </Display>
        <p className="mt-8 hidden font-display text-xl tracking-kicker text-accent uppercase min-[701px]:block">
          Reputation · Ranking · Reach
        </p>
        <div className="mt-8 min-[701px]:hidden">
          <HouseGraphic compact />
        </div>
      </SlidePad>
    </div>
  );
}

export function WhySlide() {
  return (
    <SlidePad className="justify-center">
      <Kicker>Why you're here</Kicker>
      <Display className="mt-6 max-w-[12ch] text-6xl min-[701px]:text-[7.2rem]">
        Leverage technology for your business.
      </Display>
      <div className="mt-12 h-1.5 w-28 bg-accent" />
    </SlidePad>
  );
}

const CLIENTS = [
  {
    name: "Potts Brothers",
    place: "Construction",
    img: "/slides/potts-analytics.jpg",
    alt: "Google Analytics for Potts Brothers Construction showing leads, conversions, and click-to-call",
    stats: [
      { value: "434", label: "Users" },
      { value: "29", label: "Leads" },
      { value: "23", label: "Conversions" },
    ],
  },
  {
    name: "Mission Decks",
    place: "and Design",
    img: "/slides/mission-analytics.jpg",
    alt: "Google Analytics for Mission Decks and Design showing 239 users and 28 form starts",
    stats: [
      { value: "239", label: "Users" },
      { value: "1,372", label: "Events" },
      { value: "28", label: "Form starts" },
    ],
  },
  {
    name: "M.E. Garlock",
    place: "Boonville, NY",
    img: "/slides/user-added/garlock-analytics.png",
    alt: "Google Analytics for M.E. Garlock Construction showing organic search traffic and engagement",
    stats: [
      { value: "61", label: "Organic clicks" },
      { value: "1,118", label: "Impressions" },
      { value: "7.80", label: "Avg. position" },
    ],
  },
];

export function ProofSlide() {
  return (
    <SlidePad>
      <div className="flex items-end justify-between gap-6">
        <div>
          <Kicker>Work we actually do</Kicker>
          <Display className="mt-3 text-4xl min-[701px]:text-5xl">Google's numbers. Not ours.</Display>
        </div>
        <p className="hidden max-w-[28ch] text-right text-sm text-subtle min-[901px]:block">
          Three clients. Real Analytics. Real sites.
        </p>
      </div>
      <div className="mt-8 grid min-h-0 flex-1 grid-cols-1 gap-5 min-[901px]:grid-cols-3">
        {CLIENTS.map((c) => (
          <article
            key={c.name}
            className="flex min-h-0 flex-col overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]"
          >
            <img src={c.img} alt={c.alt} className="photo-frame h-44 w-full object-cover object-top min-[901px]:h-52" />
            <div className="flex flex-1 flex-col px-5 py-5">
              <p className="font-display text-2xl font-semibold uppercase leading-snug tracking-display">{c.name}</p>
              <p className="mt-1 text-sm text-subtle">{c.place}</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {c.stats.map((s) => (
                  <div key={s.label} className="min-w-0">
                    <p className="font-display text-xl font-semibold leading-none tracking-display text-accent">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-kicker text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </SlidePad>
  );
}

export function ScenariosSlide() {
  const items = [
    {
      n: "01",
      title: "No online presence at all",
      body: "All referrals and word of mouth.",
    },
    {
      n: "02",
      title: "Some form of a presence",
      body: "Still not converting into business online.",
    },
    {
      n: "03",
      title: "An online presence + paying $$$ for ads",
      body: "No ROI.",
    },
  ];
  return (
    <SlidePad className="justify-center">
      <Kicker>Companies who work with us</Kicker>
      <Display className="mt-4 text-5xl min-[701px]:text-6xl">3 scenarios</Display>
      <div className="mt-12 grid flex-1 gap-5 min-[901px]:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.n}
            className="flex flex-col justify-between rounded-xl bg-surface px-8 py-10 shadow-[var(--shadow-border)]"
          >
            <p className="font-display text-6xl font-semibold leading-none tracking-display text-accent">
              {item.n}
            </p>
            <div className="mt-16">
              <h2 className="font-display text-3xl font-semibold uppercase leading-snug">{item.title}</h2>
              <p className="mt-4 text-xl leading-normal text-muted">{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </SlidePad>
  );
}

export function PenSlide() {
  return (
    <SlidePad className="justify-center">
      <Kicker>14:00 · Grab a pen</Kicker>
      <Display className="mt-4 max-w-[12ch] text-6xl min-[701px]:text-[7.2rem]">
        Score yourself out of nine.
      </Display>
      <Body className="mt-8 max-w-[28ch] text-xl">One point for each one you pass.</Body>
    </SlidePad>
  );
}

export function WholeListSlide() {
  const tiers = [
    {
      k: "Tier 1 · you have it. Does it pass?",
      items: [
        [1, "Your Google profile"],
        [2, "Your reviews"],
        [3, "Your website, in 5 seconds"],
      ],
    },
    {
      k: "Tier 2 · found for more than your name",
      items: [
        [4, "A page for every service"],
        [5, "Posting, every week"],
      ],
    },
    {
      k: "Tier 3 · the part almost nobody does",
      items: [
        [6, "AI visibility"],
        [7, "Keywords + rankings"],
        [8, "Citations + local links"],
        [9, "When the phone rings"],
      ],
    },
  ];
  return (
    <SlidePad>
      <Kicker>The whole list</Kicker>
      <Display className="mt-3 text-5xl">It's nine things.</Display>
      <div className="mt-10 grid flex-1 gap-8 min-[901px]:grid-cols-3">
        {tiers.map((tier, i) => (
          <section key={tier.k} className="flex flex-col border-t border-line pt-6">
            <p className="font-display text-kicker tracking-kicker text-accent uppercase">
              {String(i + 1).padStart(2, "0")} · {tier.k.split("·")[0]}
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold uppercase leading-snug text-fg">
              {tier.k.split("·")[1]}
            </h2>
            <ol className="mt-6 space-y-4">
              {tier.items.map(([num, item]) => (
                <li key={item} className="flex gap-3 text-xl text-fg">
                  <span className="slide-num text-subtle">{String(num).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </SlidePad>
  );
}
