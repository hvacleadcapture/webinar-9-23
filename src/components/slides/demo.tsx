import { useState, type CSSProperties, type ReactNode } from "react";
import { CalendarCheck, MessageSquare, PhoneMissed, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Display, Kicker, SlidePad } from "./primitives";

/**
 * Missed-call text-back, shown instead of described (28 Sept: "visually show
 * instead of talking about it").
 *
 * The conversation is an EXAMPLE and is labelled as one on the slide. It is
 * not a client's real thread and must never be presented as one -- no real
 * business name, no real number. What it demonstrates is the mechanism: the
 * call is missed, the text goes out on its own within seconds, the caller
 * answers the text instead of calling the next plumber.
 *
 * It plays itself on arrival so the presenter can talk over it; "Play again"
 * remounts the thread to replay it for the chat.
 */
const STEPS: { at: number; node: ReactNode }[] = [
  {
    at: 300,
    node: (
      <div className="flex items-center gap-3 rounded-2xl bg-[#2a1410] px-4 py-3 text-[1.2rem] text-fg">
        <PhoneMissed className="size-6 shrink-0 text-accent" strokeWidth={2.25} aria-hidden />
        <span>
          Missed call <span className="text-muted">· 7:42 PM · you&rsquo;re on a job</span>
        </span>
      </div>
    ),
  },
  {
    at: 2000,
    node: (
      <Bubble side="out" meta="Sent automatically · 4 seconds later">
        Hey, sorry we missed your call! We&rsquo;re on a job. What can we help with? We&rsquo;ll get right back to you.
      </Bubble>
    ),
  },
  {
    at: 4200,
    node: (
      <Bubble side="in" meta="7:44 PM">
        Water heater&rsquo;s leaking in the garage. Can someone come tomorrow?
      </Bubble>
    ),
  },
  {
    at: 6200,
    node: (
      <Bubble side="out" meta="7:58 PM · you, between jobs">
        Yep, I can be there at 9am. Does that work?
      </Bubble>
    ),
  },
  {
    at: 7900,
    node: (
      <div className="flex items-center justify-center gap-2.5 rounded-full bg-accent px-5 py-2.5 font-display text-[1.5rem] font-semibold tracking-display text-accent-fg uppercase">
        <CalendarCheck className="size-6" strokeWidth={2.5} aria-hidden />
        Job booked
      </div>
    ),
  },
];

function Bubble({ side, meta, children }: { side: "in" | "out"; meta: string; children: ReactNode }) {
  return (
    <div className={cn("flex flex-col", side === "out" ? "items-end" : "items-start")}>
      <p
        className={cn(
          "max-w-[88%] rounded-3xl px-5 py-3 text-[1.2rem] leading-snug",
          side === "out" ? "rounded-br-md bg-accent text-accent-fg" : "rounded-bl-md bg-surface-2 text-fg",
        )}
      >
        {children}
      </p>
      <span className="mt-1.5 px-2 text-[1.05rem] text-subtle">{meta}</span>
    </div>
  );
}

function appear(at: number): CSSProperties {
  return { opacity: 0, animation: `rise-in 480ms var(--ease-out) ${at}ms forwards` };
}

export function MissedCallDemoSlide() {
  const [run, setRun] = useState(0);
  return (
    <SlidePad className="justify-center">
      <div className="grid min-h-0 flex-1 items-center gap-14 min-[901px]:grid-cols-[1fr_520px]">
        <div>
          <Kicker>When the phone rings · watch it happen</Kicker>
          <Display className="mt-4 text-5xl min-[701px]:text-[4rem]">
            A missed call becomes a <span className="text-accent">booked job.</span>
          </Display>
          <ul className="mt-8 space-y-4 text-2xl text-fg">
            {[
              ["You miss the call.", "You're under a sink. It happens."],
              ["They get a text in seconds.", "Automatically. You don't touch anything."],
              ["They text back instead of calling the next guy.", "The lead stays yours."],
            ].map(([a, b], i) => (
              <li key={a} className="flex gap-5">
                <span className="slide-num w-14 shrink-0 font-display text-3xl font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-semibold">{a}</span>
                  <span className="block text-lg text-muted">{b}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] max-[900px]:max-w-[420px]">
          <div className="house-glow pointer-events-none absolute inset-x-[-10%] top-[10%] h-[80%] opacity-50" aria-hidden />
          <div className="relative rounded-[3rem] bg-[#050505] p-3 shadow-[0_0_0_2px_#2e2e2e,0_40px_90px_-30px_rgba(0,0,0,0.9)]">
            <div className="flex h-[590px] flex-col overflow-hidden rounded-[2.4rem] bg-bg-elevated">
              <div className="flex items-center gap-3 border-b border-line px-6 pt-6 pb-4">
                <span className="flex size-11 items-center justify-center rounded-full bg-surface-2">
                  <MessageSquare className="size-5 text-accent" aria-hidden />
                </span>
                <span>
                  <span className="block text-[1.3rem] font-semibold text-fg">New customer</span>
                  <span className="block text-[1rem] text-subtle">Example conversation</span>
                </span>
              </div>
              <div key={run} className="flex flex-1 flex-col justify-end gap-3 px-5 pb-5">
                {STEPS.map((s, i) => (
                  <div key={i} style={appear(s.at)}>
                    {s.node}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            type="button"
            data-no-advance
            onClick={(e) => {
              e.stopPropagation();
              setRun((r) => r + 1);
            }}
            className="mx-auto mt-3 flex items-center gap-2 rounded-md px-4 py-2 text-[1.05rem] text-subtle transition-colors hover:bg-surface hover:text-fg"
          >
            <RotateCcw className="size-4" aria-hidden />
            Play again
          </button>
        </div>
      </div>
    </SlidePad>
  );
}
