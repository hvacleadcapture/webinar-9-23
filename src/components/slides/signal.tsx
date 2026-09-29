import { ClipboardCheck, Hammer, Repeat, Smartphone, Video } from "lucide-react";
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
 * What happens after they say yes. 29 Sept 2026: fewer words, more visual.
 * Every step is from the /start → /signup flow and plans.ts; no turnaround
 * times, none are promised anywhere else.
 */
const STEPS = [
  { Icon: Video, title: "20-min call", line: "Your audit" },
  { Icon: ClipboardCheck, title: "Onboarding", line: "Your info, once" },
  { Icon: Hammer, title: "We build", line: "Site · Google · pages" },
  { Icon: Smartphone, title: "Signal", line: "Leads on your phone" },
  { Icon: Repeat, title: "Every week", line: "Posts · reviews · rankings" },
];

export function AfterYesSlide() {
  return (
    <SlidePad>
      <Kicker>When you say yes</Kicker>
      <Display className="mt-3 text-4xl min-[701px]:text-[3.3rem]">
        We do the work. <span className="text-accent">You answer the phone.</span>
      </Display>
      <ol className="relative mt-20 grid content-start gap-6 min-[901px]:grid-cols-5">
        <span aria-hidden className="absolute top-[3.25rem] right-[10%] left-[10%] hidden h-1 rounded-full bg-line min-[901px]:block" />
        <span
          aria-hidden
          className="absolute top-[3.25rem] left-[10%] hidden h-1 origin-left rounded-full bg-accent min-[901px]:block"
          style={{ right: "10%", transform: "scaleX(0)", animation: "grow-w 2600ms var(--ease-out) 300ms forwards" }}
        />
        {STEPS.map(({ Icon, title, line }, i) => (
          <li
            key={title}
            className="relative flex flex-col items-center text-center"
            style={{ opacity: 0, animation: `rise-in 480ms var(--ease-out) ${300 + i * 500}ms forwards` }}
          >
            <span className="flex size-[6.5rem] items-center justify-center rounded-full bg-surface-warm shadow-[0_0_0_3px_var(--color-accent)]">
              <Icon className="size-12 text-accent" strokeWidth={1.75} aria-hidden />
            </span>
            <p className="mt-5 font-display text-2xl font-semibold uppercase tracking-display text-fg">{title}</p>
            <p className="mt-1 text-lg text-muted">{line}</p>
          </li>
        ))}
      </ol>
      <p className="mt-auto text-center text-xl text-muted">
        Month to month. <span className="text-fg">Your domain, Google page, reviews and leads stay yours.</span>
      </p>
    </SlidePad>
  );
}
