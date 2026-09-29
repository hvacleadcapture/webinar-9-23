import { Display, Kicker, SlidePad } from "./primitives";

/**
 * The service, shown instead of listed (29 Sept: "be super clear on what our
 * service is and everything they're getting"). Signal is the client app every
 * CJP client runs their leads from; the screens are frames from the Signal
 * promo (~/cjp-signal-video, made-up Summit Comfort Heating & Air, 555
 * numbers), so nothing here is a real customer. Re-cut them if the app
 * changes.
 */
const SCREENS = [
  { src: "/slides/signal/leads.jpg", title: "Your phone buzzes", line: "Every call and form, one list." },
  { src: "/slides/signal/lead.jpg", title: "See the job first", line: "What they need, where, their photos." },
  { src: "/slides/signal/messages.jpg", title: "Text them back", line: "From your business number. Not your cell." },
  { src: "/slides/signal/reviews.jpg", title: "Job done, review asked", line: "Happy goes to Google. Unhappy tells you first." },
];

export function SignalSlide() {
  return (
    <SlidePad>
      <div className="flex items-end justify-between gap-8">
        <div>
          <Kicker>What you actually get</Kicker>
          <Display className="mt-3 text-4xl min-[701px]:text-[3.3rem]">
            Every lead. <span className="text-accent">On your phone.</span>
          </Display>
        </div>
        <p className="hidden max-w-[34ch] pb-1 text-right text-sm leading-snug text-muted min-[901px]:block">
          It&rsquo;s called Signal. Comes with every plan. No app store: open a link, add it to your home screen.
        </p>
      </div>
      <ol className="mt-6 grid min-h-0 flex-1 grid-cols-2 gap-5 min-[901px]:grid-cols-4">
        {SCREENS.map((s, i) => (
          <li key={s.src} className="flex min-h-0 flex-col">
            <div className="min-h-0 flex-1 overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]">
              <img src={s.src} alt={s.title} className="h-full w-full object-cover object-top" />
            </div>
            <p className="mt-3 font-display text-base font-semibold uppercase leading-tight tracking-display text-fg">
              <span className="slide-num mr-2 text-accent">{String(i + 1).padStart(2, "0")}</span>
              {s.title}
            </p>
            <p className="mt-1 text-sm leading-snug text-muted">{s.line}</p>
          </li>
        ))}
      </ol>
    </SlidePad>
  );
}

/** The promo cut from "a lead comes in" to the end, muted: he talks over it. */
export function SignalTourSlide() {
  return (
    <SlidePad>
      <Kicker>One lead, start to finish</Kicker>
      <Display className="mt-3 text-4xl">Here&rsquo;s what it looks like.</Display>
      <div className="mt-5 flex min-h-0 flex-1 items-center justify-center">
        <video
          src="/slides/signal/tour.mp4"
          poster="/slides/signal/tour-poster.jpg"
          controls
          muted
          playsInline
          preload="metadata"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          className="max-h-full w-auto max-w-full rounded-xl shadow-[var(--shadow-border)]"
        />
      </div>
    </SlidePad>
  );
}

/**
 * What happens after they say yes, so nobody signs up wondering what comes
 * next. Every step is from the /start → /signup flow and plans.ts; no
 * turnaround times on purpose, none are promised anywhere else.
 */
const STEPS = [
  { title: "20-minute call", line: "We go over your audit. Pick a plan, or don't." },
  { title: "Onboarding call", line: "Your info and logins, once. The build starts that day." },
  { title: "We build it", line: "Website, Google profile, a page for every job." },
  { title: "Signal on your phone", line: "Every lead buzzes you. Missed calls get a text back." },
  { title: "Every week after", line: "Reviews asked after every job. Growth adds posts twice a week and a monthly report." },
];

export function AfterYesSlide() {
  return (
    <SlidePad>
      <Kicker>When you say yes</Kicker>
      <Display className="mt-3 text-4xl min-[701px]:text-[3.3rem]">
        We do the work. <span className="text-accent">You answer the phone.</span>
      </Display>
      <ol className="mt-8 grid content-start gap-4 min-[901px]:grid-cols-5">
        {STEPS.map((s, i) => (
          <li key={s.title} className="flex flex-col rounded-xl bg-surface px-5 py-5 shadow-[var(--shadow-border)]">
            <span className="slide-num font-display text-3xl font-semibold text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 font-display text-lg font-semibold uppercase leading-tight tracking-display text-fg">
              {s.title}
            </p>
            <p className="mt-2 text-base leading-snug text-muted">{s.line}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-lg text-muted">
        Month to month. Cancel any time.{" "}
        <span className="text-fg">Your domain, Google page, reviews and leads stay yours.</span>
      </p>
    </SlidePad>
  );
}
