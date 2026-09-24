import { createFileRoute } from "@tanstack/react-router";
import { NINE, TIERS } from "@/lib/nine";

export const Route = createFileRoute("/checklist")({
  head: () => ({
    meta: [
      { title: "The nine-point checklist · CJP Enterprises" },
      {
        name: "description",
        content: "The nine things Google reads before it decides which contractor gets the call. Score yourself out of nine.",
      },
    ],
  }),
  component: Checklist,
});

/**
 * The take-home from the webinar, linked from the slides as
 * go.cjp-enterprises.com/nine. One page: each check in plain words, what
 * passing looks like, and one thing to do tonight. Prints to paper cleanly.
 */
function Checklist() {
  const tiers = [1, 2, 3] as const;
  return (
    <main className="checklist mx-auto max-w-3xl px-4 py-10 text-fg sm:px-8">
      <p className="font-display text-kicker tracking-kicker text-accent uppercase">CJP Enterprises · Webinar checklist</p>
      <h1 className="mt-3 font-display text-4xl font-semibold uppercase leading-tight tracking-display sm:text-5xl">
        The nine things Google reads
      </h1>
      <p className="mt-4 text-lg leading-normal text-muted">
        One point for each one you pass. If you have to think about it, it's a no.
      </p>
      <p className="mt-6 font-display text-2xl font-semibold uppercase tracking-display">
        Your score: <span className="inline-block w-16 border-b-2 border-accent">&nbsp;</span> / 9
      </p>

      {tiers.map((t) => (
        <section key={t} className="mt-12 break-inside-avoid-page">
          <p className="font-display text-kicker tracking-kicker text-accent uppercase">Tier {t}</p>
          <h2 className="mt-1 font-display text-2xl font-semibold uppercase leading-snug">{TIERS[t]}</h2>
          <ol className="mt-5 space-y-5">
            {NINE.filter((c) => c.tier === t).map((c) => (
              <li key={c.n} className="break-inside-avoid rounded-lg bg-surface p-5 shadow-[var(--shadow-border)]">
                <div className="flex items-baseline gap-3">
                  <span aria-hidden className="checkbox inline-block size-5 shrink-0 translate-y-0.5 rounded-xs border-2 border-line-strong" />
                  <h3 className="font-display text-xl font-semibold uppercase leading-snug">
                    <span className="slide-num mr-2 text-accent">{String(c.n).padStart(2, "0")}</span>
                    {c.name}
                  </h3>
                </div>
                <p className="mt-3 text-base leading-normal text-fg">{c.plain}</p>
                <p className="mt-4 text-kicker font-semibold tracking-kicker text-subtle uppercase">You pass if</p>
                <ul className="mt-2 space-y-1 text-base text-fg">
                  {c.pass.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="mt-3 block h-px w-4 shrink-0 bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-kicker font-semibold tracking-kicker text-subtle uppercase">Do tonight</p>
                <p className="mt-1 text-base leading-normal text-fg">{c.tonight}</p>
              </li>
            ))}
          </ol>
        </section>
      ))}

      <footer className="mt-14 border-t border-line pt-6 text-base text-muted">
        <p>
          Want a hand with the ones you missed? Grab 20 minutes and I&rsquo;ll go through your business with you:{" "}
          <a className="text-accent underline underline-offset-4" href="https://go.cjp-enterprises.com/start">
            go.cjp-enterprises.com/start
          </a>
        </p>
        <button
          type="button"
          onClick={() => window.print()}
          className="no-print mt-6 min-h-11 rounded-md bg-accent px-5 font-semibold text-accent-fg"
        >
          Print this page
        </button>
      </footer>
    </main>
  );
}
