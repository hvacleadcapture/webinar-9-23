import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Kit for the "show it, don't tell it" demos (29 Sept 2026). Every demo is a
 * self-playing mock of the system doing the work, driven by `t` (ms since the
 * slide mounted). Real client proof (screenshots, figures) comes from
 * /public/slides; anything made up is labelled "Example" on screen.
 */

export function appear(at: number, ms = 480): CSSProperties {
  return { opacity: 0, animation: `rise-in ${ms}ms var(--ease-out) ${at}ms forwards` };
}

export const money = (n: number) => `$${n.toLocaleString("en-US")}`;

/** 0→1 progress between `from` and `from + ms`, eased out. */
export function prog(t: number, from: number, ms: number) {
  const k = Math.min(1, Math.max(0, (t - from) / ms));
  return 1 - Math.pow(1 - k, 3);
}

export function Replay({ onClick, label = "Play again" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      data-no-advance
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="flex items-center gap-2 rounded-md px-3 py-1.5 text-[1rem] text-subtle transition-colors hover:bg-surface hover:text-fg"
    >
      <RotateCcw className="size-4" aria-hidden />
      {label}
    </button>
  );
}

/**
 * Plays `demo` (a function of t) for `duration` ms, holds `hold` ms, then
 * cross-fades to `children` (the real screenshots that were there before).
 * "Play again" remounts the clock.
 */
export function DemoThenPicture({
  duration,
  hold = 2500,
  demo,
  children,
  className,
}: {
  duration: number;
  hold?: number;
  demo: (t: number) => ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  const [run, setRun] = useState(0);
  return (
    <div className={cn("relative flex min-h-0 flex-col", className)}>
      <DemoClock key={run} duration={duration} hold={hold} demo={demo} picture={children} />
      <div className="mt-2 flex justify-end">
        <Replay onClick={() => setRun((r) => r + 1)} />
      </div>
    </div>
  );
}

function DemoClock({
  duration,
  demo,
}: {
  duration: number;
  hold: number;
  demo: (t: number) => ReactNode;
  picture?: ReactNode;
}) {
  // 29 Sept 2026: no fade to screenshots. The animation's last frame IS the
  // picture, and it holds there.
  const t = useElapsed(duration + 200);
  return <div className="relative flex min-h-0 flex-1 flex-col">{demo(Math.min(t, duration + 100))}</div>;
}


/** Milliseconds since mount, ticking every 100ms until `until`. */
export function useElapsed(until: number) {
  // requestAnimationFrame, not a 100ms interval: 29 Sept "looked like shit FPS".
  const [t, setT] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const e = Math.max(0, now - start);
      setT(e);
      if (e <= until) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [until]);
  return t;
}

/** Types `text` out starting at `at` ms, ~22 characters a second. */
export function typed(text: string, t: number, at: number, cps = 22) {
  if (t < at) return "";
  return text.slice(0, Math.floor(((t - at) / 1000) * cps));
}

export function Browser({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#f6f6f4] shadow-[0_0_0_2px_#2e2e2e,0_40px_90px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-2 bg-[#e4e4e0] px-4 py-2.5">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-[0.95rem] text-[#555]">{url}</span>
      </div>
      <div className="relative h-[430px] overflow-hidden text-[#1a1a1a]">{children}</div>
    </div>
  );
}

export function Tap({ at }: { at: number }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -inset-2 rounded-xl border-4 border-accent"
      style={{ opacity: 0, animation: `tap 700ms var(--ease-out) ${at}ms forwards` }}
    />
  );
}

export function GoogleSearch({ q, t, typeAt, children }: { q: string; t: number; typeAt: number; children?: ReactNode }) {
  return (
    <div className="px-6 pt-6">
      <p className="text-[1.6rem] font-semibold tracking-tight">
        <span className="text-[#4285f4]">G</span><span className="text-[#ea4335]">o</span><span className="text-[#fbbc05]">o</span>
        <span className="text-[#4285f4]">g</span><span className="text-[#34a853]">l</span><span className="text-[#ea4335]">e</span>
      </p>
      <div className="mt-3 flex items-center gap-2 rounded-full border border-[#ddd] bg-white px-5 py-3 text-[1.15rem] shadow-sm">
        <span>{typed(q, t, typeAt)}</span>
        <span className="h-5 w-0.5 animate-pulse bg-[#333]" />
      </div>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

export function Result({ label, title, line, hot }: { label: string; title: string; line: string; hot?: boolean }) {
  return (
    <div className={cn("relative rounded-lg px-3 py-2", hot && "bg-white shadow-sm")}>
      <p className="text-[0.9rem] text-[#555]">{label}</p>
      <p className={cn("text-[1.2rem]", hot ? "font-semibold text-[#1a0dab]" : "text-[#1a0dab]/70")}>{title}</p>
      <p className="text-[0.95rem] text-[#666]">{line}</p>
    </div>
  );
}

/** The payoff: an invoice that counts up, then gets stamped PAID. */
export function Invoice({
  from,
  job,
  amount,
  t,
  at,
}: {
  from: string;
  job: string;
  amount: number;
  t: number;
  at: number;
}) {
  if (t < at) return null;
  const k = Math.min(1, Math.max(0, (t - at - 500) / 1500));
  const shown = Math.round(amount * (1 - Math.pow(1 - k, 3)));
  return (
    <div style={appear(0)} className="relative rounded-2xl bg-white px-7 py-6 text-[#1a1a1a] shadow-[0_0_0_2px_var(--color-accent),0_40px_90px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex items-baseline justify-between border-b border-[#e5e5e5] pb-3">
        <p className="text-[1.15rem] font-semibold">{from}</p>
        <p className="text-[0.95rem] uppercase tracking-widest text-[#888]">Invoice</p>
      </div>
      <div className="mt-4 flex items-baseline justify-between text-[1.15rem]">
        <span>{job}</span>
        <span className="tabular-nums">{money(shown)}</span>
      </div>
      <div className="mt-5 flex items-baseline justify-between border-t border-[#e5e5e5] pt-4">
        <span className="text-[1.1rem] font-semibold uppercase">Total</span>
        <span className="slide-num font-display text-[3.6rem] leading-none font-semibold text-[#15803d] tabular-nums">
          {money(shown)}
        </span>
      </div>
      {t > at + 2200 ? (
        <span
          className="absolute top-6 right-8 rounded-md border-[5px] border-[#15803d] px-4 py-1 font-display text-[2.6rem] font-bold tracking-widest text-[#15803d]"
          style={{ animation: "stamp-in 420ms var(--ease-out) forwards" }}
        >
          PAID
        </span>
      ) : null}
    </div>
  );
}

export function PhoneAlert({ t, at, app, title, line }: { t: number; at: number; app: string; title: string; line: string }) {
  if (t < at) return null;
  return (
    <div
      className="rounded-2xl bg-white/95 px-4 py-3 text-[#1a1a1a] shadow-lg"
      style={{ animation: `rise-in 420ms var(--ease-out) forwards, buzz 500ms ease-in-out 450ms 2` }}
    >
      <p className="flex items-center justify-between text-[0.85rem] uppercase tracking-wide text-[#777]">
        <span>{app}</span>
        <span className="normal-case">now</span>
      </p>
      <p className="mt-1 text-[1.1rem] font-semibold">{title}</p>
      <p className="text-[1rem] text-[#444]">{line}</p>
    </div>
  );
}

export function LockScreen({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[330px] rounded-[2.6rem] bg-[#050505] p-2.5 shadow-[0_0_0_2px_#2e2e2e,0_40px_90px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex h-[470px] flex-col gap-3 overflow-hidden rounded-[2.1rem] bg-gradient-to-b from-[#1b2a4a] to-[#0b1220] px-3 pt-10">
        <p className="text-center font-display text-[3.4rem] leading-none font-semibold text-white">9:41</p>
        <p className="mb-2 text-center text-[1rem] text-white/70">Tuesday</p>
        {children}
      </div>
    </div>
  );
}

