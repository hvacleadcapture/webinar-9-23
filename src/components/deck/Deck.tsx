import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight, Grid2x2, Maximize } from "lucide-react";
import { SLIDES } from "@/components/slides/catalog";
import { hydrateDeckFromHash, useDeck } from "@/lib/deck-store";
import { cn } from "@/lib/utils";

export function Deck() {
  const index = useDeck((s) => s.index);
  const setTotal = useDeck((s) => s.setTotal);
  const go = useDeck((s) => s.go);
  const next = useDeck((s) => s.next);
  const prev = useDeck((s) => s.prev);
  const notesOpen = useDeck((s) => s.notesOpen);
  const overviewOpen = useDeck((s) => s.overviewOpen);
  const helpOpen = useDeck((s) => s.helpOpen);
  const toggleNotes = useDeck((s) => s.toggleNotes);
  const toggleOverview = useDeck((s) => s.toggleOverview);
  const toggleHelp = useDeck((s) => s.toggleHelp);
  const closeOverlays = useDeck((s) => s.closeOverlays);
  const score = useDeck((s) => s.score());

  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    setTotal(SLIDES.length);
    hydrateDeckFromHash();
    const onHash = () => hydrateDeckFromHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [setTotal]);

  useEffect(() => {
    const t = window.setTimeout(() => setHint(false), 4200);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    const stage = stageRef.current;
    if (!frame || !stage) return;

    const fit = () => {
      const mobile = window.matchMedia("(max-width: 700px)").matches;
      if (mobile) {
        stage.style.transform = "none";
        return;
      }
      const s = Math.min(frame.clientWidth / 1600, frame.clientHeight / 900);
      stage.style.transform = `scale(${s})`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(frame);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown" || e.key === "Enter") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "Backspace" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        e.preventDefault();
        go(0);
      } else if (e.key === "End") {
        e.preventDefault();
        go(SLIDES.length - 1);
      } else if (e.key === "n" || e.key === "N") {
        toggleNotes();
      } else if (e.key === "o" || e.key === "O") {
        toggleOverview();
      } else if (e.key === "Escape") {
        if (overviewOpen || helpOpen) closeOverlays();
        else toggleOverview();
      } else if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        toggleHelp();
      } else if (e.key === "f" || e.key === "F") {
        const root = document.documentElement;
        if (document.fullscreenElement) void document.exitFullscreen();
        else void root.requestFullscreen?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeOverlays, go, helpOpen, next, overviewOpen, prev, toggleHelp, toggleNotes, toggleOverview]);

  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: TouchEvent) => {
    const t = e.changedTouches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) next();
    else prev();
  };

  const slide = SLIDES[index] ?? SLIDES[0];
  const Slide = slide.Component;
  const progress = ((index + 1) / SLIDES.length) * 100;

  return (
    <div
      className="relative h-dvh overflow-hidden bg-bg text-fg"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div ref={frameRef} className="absolute inset-0 flex items-center justify-center">
        <div
          ref={stageRef}
          className="deck-stage bg-bg"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("button, a, [data-no-advance]")) return;
            next();
          }}
          onKeyDown={(e: ReactKeyboardEvent) => e.stopPropagation()}
          role="group"
          aria-roledescription="slide"
          aria-label={slide.title}
        >
          <Slide key={slide.id} />
        </div>
      </div>

      <header className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-3">
        <p className="flex items-center gap-2 font-display text-kicker tracking-kicker text-accent uppercase">
          <span className="live-dot size-1.5 rounded-full bg-accent" />
          CJP Enterprises · Live
        </p>
        <p className="text-sm text-subtle">
          Score <span className="slide-num text-fg">{score}</span>
          <span className="text-subtle"> / 9</span>
          <span className="mx-3 text-line-strong">·</span>
          <span className="slide-num">
            {index + 1} / {SLIDES.length}
          </span>
        </p>
      </header>

      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-3 pt-1">
        <div className="h-0.5 w-full bg-surface-2">
          <div
            className="h-full bg-accent transition-[width] duration-[var(--motion-fast)] ease-[var(--ease-out)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-1 flex items-center justify-between text-sm text-subtle">
          <span className="truncate pr-4">{slide.title}</span>
          <div className="flex items-center gap-1">
            <IconBtn label="Previous slide" onClick={prev}>
              <ChevronLeft className="size-4" />
            </IconBtn>
            <IconBtn label="Next slide" onClick={next}>
              <ChevronRight className="size-4" />
            </IconBtn>
            <IconBtn label="Overview" onClick={toggleOverview}>
              <Grid2x2 className="size-4" />
            </IconBtn>
            <IconBtn
              label="Fullscreen"
              onClick={() => {
                if (document.fullscreenElement) void document.exitFullscreen();
                else void document.documentElement.requestFullscreen?.();
              }}
            >
              <Maximize className="size-4" />
            </IconBtn>
          </div>
        </div>
      </div>

      {hint ? (
        <p className="pointer-events-none absolute bottom-16 left-1/2 z-10 -translate-x-1/2 rounded-md bg-surface px-3 py-2 text-sm text-muted shadow-[var(--shadow-border)]">
          Arrows to present · F fullscreen · O overview · N notes
        </p>
      ) : null}

      {notesOpen ? (
        <aside
          data-no-advance
          className="absolute inset-x-0 bottom-0 z-20 border-t border-line bg-bg-elevated px-6 py-4"
        >
          <p className="font-display text-kicker tracking-kicker text-accent uppercase">Notes</p>
          <p className="mt-2 max-w-4xl text-base leading-normal text-fg">{slide.notes}</p>
        </aside>
      ) : null}

      {overviewOpen ? (
        <div
          data-no-advance
          className="absolute inset-0 z-30 overflow-auto bg-bg/95 p-6"
          onClick={closeOverlays}
        >
          <p className="mb-5 font-display text-kicker tracking-kicker text-accent uppercase">Jump</p>
          <ol className="grid grid-cols-2 gap-3 min-[700px]:grid-cols-4 min-[1100px]:grid-cols-6">
            {SLIDES.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(i);
                  }}
                  className={cn(
                    "flex h-24 w-full flex-col items-start justify-between rounded-md px-3 py-3 text-left",
                    i === index ? "bg-surface-2 shadow-[0_0_0_1px_var(--color-accent)]" : "bg-surface",
                  )}
                >
                  <span className="slide-num text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm leading-snug text-fg">{s.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {helpOpen ? (
        <div
          data-no-advance
          className="absolute inset-0 z-30 flex items-center justify-center bg-bg/95 p-6"
          onClick={closeOverlays}
        >
          <ul className="w-full max-w-md space-y-3 rounded-xl bg-surface p-8 text-base shadow-[var(--shadow-border)]">
            {[
              ["→  Space  Enter", "Next"],
              ["←  Backspace", "Previous"],
              ["O  Esc", "Overview"],
              ["N", "Speaker notes"],
              ["F", "Fullscreen"],
              ["Home / End", "First / last"],
            ].map(([k, v]) => (
              <li key={v} className="flex justify-between gap-6">
                <span className="font-mono text-sm text-accent">{k}</span>
                <span className="text-muted">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  label,
}: {
  children: ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="flex size-11 items-center justify-center rounded-md text-muted transition-colors duration-[var(--motion-quick)] hover:bg-surface hover:text-fg"
    >
      {children}
    </button>
  );
}
