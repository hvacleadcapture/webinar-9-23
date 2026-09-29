import type { CSSProperties, ReactNode } from "react";
import "./signal-app.css";

/**
 * Signal, the client app, drawn with the app's own stylesheet. signal-app.css
 * is a copy of ~/cjp-signal-video/src/app.css (generated from cjp-crm's real
 * globals.css + signal.css) scoped under `.sigapp`, and the markup below uses
 * the same class names as cjp-crm app/alerts/*, so it renders like the app.
 *
 * Everything here is driven by props (no clocks): the demos compute state
 * from `t` and pass it in. Only the data is made up, and demos label it.
 */

export const SCREEN_W = 390;
export const SCREEN_H = 780;
const BEZEL = 12;

/* ------------------------------------------------------------------------ */
/*  Taps and carets, as pure functions of t                                  */
/* ------------------------------------------------------------------------ */

/** A finger-tap ring shown for 700ms from `at`. */
export function TapRing({ t, at, dark }: { t: number; at: number; dark?: boolean }) {
  if (t < at || t > at + 700) return null;
  const k = (t - at) / 700;
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 46,
        height: 46,
        marginLeft: -23,
        marginTop: -23,
        borderRadius: "50%",
        background: dark ? "rgb(255 255 255 / 0.35)" : "rgb(37 99 235 / 0.28)",
        border: `2px solid ${dark ? "#fff" : "#2563eb"}`,
        transform: `scale(${0.6 + k * 0.9})`,
        opacity: 1 - k,
        pointerEvents: "none",
        zIndex: 5,
      }}
    />
  );
}

export function Caret() {
  return (
    <span
      aria-hidden
      style={{ display: "inline-block", width: 2, height: "1.05em", marginLeft: 1, verticalAlign: "-0.15em", background: "#2563eb" }}
    />
  );
}

/** 0→1 over `ms` from `from`, eased out. */
export function ease(t: number, from: number, ms: number) {
  const k = Math.min(1, Math.max(0, (t - from) / ms));
  return 1 - Math.pow(1 - k, 3);
}

/** Slide-up-and-fade style for something appearing at `at`. */
export function riseIn(t: number, at: number, ms = 450): CSSProperties {
  const p = ease(t, at, ms);
  return { opacity: p, transform: `translate3d(0, ${(1 - p) * 14}px, 0)` };
}

/* ------------------------------------------------------------------------ */
/*  The phone                                                                */
/* ------------------------------------------------------------------------ */

/**
 * An iPhone frame. The screen is SCREEN_W × `height` CSS px (the app's own
 * units) and the whole thing is scaled by `scale` to fit a slide panel.
 */
export function PhoneShell({
  scale = 0.72,
  height = SCREEN_H,
  statusDark,
  bg = "#f6f7f9",
  shake = 0,
  time = "9:41",
  children,
}: {
  time?: string;
  scale?: number;
  height?: number;
  statusDark?: boolean;
  bg?: string;
  shake?: number;
  children: ReactNode;
}) {
  const w = SCREEN_W + BEZEL * 2;
  const h = height + BEZEL * 2;
  const ink = statusDark ? "#0f172a" : "#fff";
  return (
    <div style={{ width: w * scale, height: h * scale, position: "relative", flexShrink: 0 }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: w,
          height: h,
          transformOrigin: "0 0",
          transform: `translate3d(${shake}px,0,0) scale(${scale})`,
          borderRadius: 60,
          background: "#0b0f17",
          padding: BEZEL,
          boxShadow: "0 0 0 2px #2a3140, 0 40px 90px -20px rgb(0 0 0 / 0.65), 0 18px 40px -18px rgb(0 0 0 / 0.5)",
        }}
      >
        <div style={{ position: "relative", width: SCREEN_W, height, borderRadius: 48, overflow: "hidden", background: bg }}>
          {children}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 50, zIndex: 80, color: ink, fontFamily: "Inter, system-ui, sans-serif", pointerEvents: "none" }}>
            <span style={{ position: "absolute", left: 40, top: 17, fontWeight: 650, fontSize: 16.5 }}>{time}</span>
            <div style={{ position: "absolute", left: "50%", top: 11, width: 118, height: 34, marginLeft: -59, borderRadius: 20, background: "#000" }} />
            <StatusIcons color={ink} />
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: 8,
              width: 132,
              height: 5,
              marginLeft: -66,
              borderRadius: 3,
              background: statusDark ? "#0f172a" : "rgb(255 255 255 / 0.85)",
              zIndex: 80,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function StatusIcons({ color }: { color: string }) {
  return (
    <svg style={{ position: "absolute", right: 28, top: 19 }} width="76" height="14" viewBox="0 0 76 14" fill={color}>
      <rect x="0" y="9" width="3.2" height="4" rx="1" />
      <rect x="4.8" y="6.5" width="3.2" height="6.5" rx="1" />
      <rect x="9.6" y="4" width="3.2" height="9" rx="1" />
      <rect x="14.4" y="1.5" width="3.2" height="11.5" rx="1" />
      <path d="M31 3.2c2.6 0 5 1 6.8 2.7l1.2-1.3A11.3 11.3 0 0 0 31 1.4c-3 0-5.8 1.2-8 3.2l1.2 1.3A9.6 9.6 0 0 1 31 3.2Zm0 3.4c1.7 0 3.2.6 4.4 1.7l1.2-1.3a8.2 8.2 0 0 0-11.2 0l1.2 1.3A6.4 6.4 0 0 1 31 6.6Zm0 3.3c.8 0 1.5.3 2 .8L31 12.9l-2-2.2c.5-.5 1.2-.8 2-.8Z" />
      <rect x="46" y="1.5" width="25" height="11.5" rx="3.6" fill="none" stroke={color} strokeOpacity="0.4" strokeWidth="1.2" />
      <rect x="48" y="3.5" width="19" height="7.5" rx="2" />
      <rect x="72.5" y="5" width="1.8" height="4.5" rx="0.9" fillOpacity="0.45" />
    </svg>
  );
}

/* ------------------------------------------------------------------------ */
/*  iOS around the app: lock screen, notification, the customer's Messages   */
/* ------------------------------------------------------------------------ */

const SF: CSSProperties = { fontFamily: "Inter, system-ui, sans-serif", color: "#111" };

export function Wallpaper({ children, dim = 0 }: { children?: ReactNode; dim?: number }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 70% at 20% 10%, #3b5bdb 0%, #1b2a5e 45%, #0b1120 100%)" }}>
      <div style={{ position: "absolute", inset: 0, background: `rgb(0 0 0 / ${dim})` }} />
      {children}
    </div>
  );
}

export function LockScreen({ children, day = "Tuesday, September 29", time = "9:41" }: { children?: ReactNode; day?: string; time?: string }) {
  return (
    <Wallpaper>
      <div style={{ position: "absolute", top: 70, left: 0, right: 0, textAlign: "center", color: "#fff", ...SF }}>
        <div style={{ fontSize: 19, fontWeight: 600, opacity: 0.9, color: "#fff" }}>{day}</div>
        <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05, color: "#fff" }}>{time}</div>
      </div>
      <div style={{ position: "absolute", left: 10, right: 10, top: 280 }}>{children}</div>
    </Wallpaper>
  );
}

/** An iOS notification banner (the CJP app icon, as it shows on a real phone). */
export function Banner({ title, body, when = "now", icon = "cjp" }: { title: string; body: string; when?: string; icon?: "cjp" | "messages" | "phone" }) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        padding: "13px 14px",
        borderRadius: 24,
        background: "rgb(245 245 247 / 0.94)",
        boxShadow: "0 10px 30px -8px rgb(0 0 0 / 0.35)",
        ...SF,
      }}
    >
      {icon === "cjp" ? (
        <img src="/slides/signal/icon-192.png" alt="" style={{ width: 38, height: 38, borderRadius: 9, display: "block" }} />
      ) : (
        <span
          style={{
            width: 38,
            height: 38,
            borderRadius: 9,
            display: "grid",
            placeItems: "center",
            background: icon === "messages" ? "#34c759" : "#34c759",
            color: "#fff",
            fontSize: 20,
          }}
        >
          {icon === "messages" ? "💬" : "✆"}
        </span>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
          <span style={{ fontWeight: 650, fontSize: 15 }}>{title}</span>
          <span style={{ fontSize: 13, color: "#6b7280" }}>{when}</span>
        </div>
        <div style={{ fontSize: 15, lineHeight: 1.3, marginTop: 2, whiteSpace: "pre-line" }}>{body}</div>
      </div>
    </div>
  );
}

/** The customer's own Messages thread with the business number. */
export function SmsScreen({
  from,
  bubbles,
  composer,
}: {
  from: string;
  bubbles: { text: string; me?: boolean; style?: CSSProperties; meta?: string }[];
  composer?: string;
}) {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#fff", display: "flex", flexDirection: "column", ...SF }}>
      <div style={{ paddingTop: 54, textAlign: "center", borderBottom: "1px solid #e5e7eb", paddingBottom: 10, background: "#f9f9f9" }}>
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "linear-gradient(#a1a1aa,#71717a)",
            margin: "0 auto",
            display: "grid",
            placeItems: "center",
            color: "#fff",
            fontSize: 22,
          }}
        >
          👤
        </div>
        <div style={{ fontSize: 13, marginTop: 4 }}>{from} ›</div>
      </div>
      <div style={{ flex: 1, padding: "14px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ textAlign: "center", fontSize: 12, color: "#6b7280" }}>Text Message · Today</div>
        {bubbles.map((b, i) => (
          <div key={i} style={{ alignSelf: b.me ? "flex-end" : "flex-start", maxWidth: "80%", ...b.style }}>
            <div
              style={{
                padding: "9px 13px",
                borderRadius: 19,
                fontSize: 16,
                lineHeight: 1.32,
                background: b.me ? "#34c759" : "#e9e9eb",
                color: b.me ? "#fff" : "#111",
                whiteSpace: "pre-line",
              }}
            >
              {b.text}
            </div>
            {b.meta ? <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 3, textAlign: b.me ? "right" : "left" }}>{b.meta}</div> : null}
          </div>
        ))}
      </div>
      {composer !== undefined ? (
        <div style={{ padding: "8px 12px 30px", borderTop: "1px solid #eee" }}>
          <div style={{ border: "1px solid #d1d5db", borderRadius: 20, padding: "8px 14px", fontSize: 16, minHeight: 38 }}>
            {composer}
            {composer ? <Caret /> : <span style={{ color: "#9ca3af" }}>Text Message</span>}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** A phone call screen (calling / missed). */
export function CallScreen({ name, status }: { name: string; status: string }) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Wallpaper dim={0.45}>
        <div style={{ position: "absolute", top: 120, left: 0, right: 0, textAlign: "center", color: "#fff", ...SF }}>
          <div style={{ fontSize: 32, fontWeight: 500, color: "#fff" }}>{name}</div>
          <div style={{ fontSize: 17, opacity: 0.8, marginTop: 6, color: "#fff" }}>{status}</div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 90,
            left: "50%",
            marginLeft: -36,
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "#ff3b30",
            display: "grid",
            placeItems: "center",
            color: "#fff",
            fontSize: 28,
          }}
        >
          <span style={{ transform: "rotate(135deg)", display: "inline-block" }}>✆</span>
        </div>
      </Wallpaper>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/*  Signal itself                                                            */
/* ------------------------------------------------------------------------ */

export type SigView = "feed" | "messages" | "calendar" | "reviews";
export type FeedStatus = "new" | "contacted" | "closed" | "not_closed";

const TAB_LABEL: Record<SigView, string> = { feed: "Leads", messages: "Messages", calendar: "Calendar", reviews: "Reviews" };

export function PhoneSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2z" />
    </svg>
  );
}

/** The whole Signal page: header band, alerts line, tabs, then the view. */
export function SignalScreen({
  org,
  view,
  counts = {},
  tapTab,
  t = 0,
  scroll = 0,
  children,
}: {
  org: string;
  view: SigView;
  counts?: { messages?: number; calendar?: number };
  /** Tap ring on a tab at a time. */
  tapTab?: { view: SigView; at: number };
  t?: number;
  scroll?: number;
  children: ReactNode;
}) {
  return (
    <div className="sigapp" style={{ position: "absolute", inset: 0 }}>
      <div className="sig" style={{ position: "absolute", inset: 0, overflow: "hidden", minHeight: 0 }}>
        <main className="sig-main" style={{ transform: `translate3d(0, ${-scroll}px, 0)` }}>
          <header className="sig-band" style={{ paddingTop: "3.4rem" }}>
            <div className="sig-band-row">
              <img src="/slides/signal/logo.png" alt="CJP" className="sig-band-logo" />
              <div style={{ minWidth: 0 }}>
                <div className="sig-band-title">Signal</div>
                <div className="sig-band-org">{org}</div>
              </div>
            </div>
          </header>
          <section style={{ marginTop: "1rem" }}>
            <div className="sig-alerts-on">
              <span className="sig-alerts-dot" aria-hidden />
              <span>Alerts are on</span>
              <button type="button" className="sig-alerts-test">
                Send a test
              </button>
            </div>
          </section>
          <nav aria-label="Signal" className="sig-tabs">
            {(["feed", "messages", "calendar", "reviews"] as SigView[]).map((id) => {
              const count = id === "messages" ? counts.messages : id === "calendar" ? counts.calendar : undefined;
              return (
                <a key={id} className={`sig-tab${view === id ? " is-active" : ""}`} style={{ position: "relative" }}>
                  {TAB_LABEL[id]}
                  {count ? <span className="sig-tab-count">{count}</span> : null}
                  {tapTab?.view === id ? <TapRing t={t} at={tapTab.at} /> : null}
                </a>
              );
            })}
          </nav>
          <section>{children}</section>
        </main>
      </div>
    </div>
  );
}

export function Stats({ items }: { items: { value: number | string; label: string; tone?: "accent" | "good" | "bad" }[] }) {
  return (
    <dl className="sig-stats">
      {items.map((s) => (
        <div key={s.label} className={`sig-stat${s.tone ? ` is-${s.tone}` : ""}`}>
          <dd>{s.value}</dd>
          <dt>{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}

export function FeedHead() {
  return (
    <div className="sig-feed-head">
      <h2 className="sig-section-title">Your leads</h2>
      <button type="button" className="btn btn-primary btn-sm">
        + Add a caller
      </button>
    </div>
  );
}

export type RowData = { key: string; title: string; sub: string; time: string; status?: FeedStatus; tel?: boolean };

/** A lead row in the feed; `open` shows its body underneath. */
export function LeadRow({
  r,
  open,
  tap,
  style,
  children,
}: {
  r: RowData;
  open?: boolean;
  tap?: { t: number; at: number };
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <li className="sig-card is-row" data-type="lead" data-status={r.status} style={style}>
      <div className="sig-row-line">
        <button type="button" className="sig-row-main" style={{ position: "relative" }}>
          <span className="sig-row-title">{r.title}</span>
          <span className="sig-row-sub">{r.sub}</span>
          {tap ? <TapRing t={tap.t} at={tap.at} /> : null}
        </button>
        <span className="sig-time">{r.time}</span>
        {r.tel ? (
          <a className="sig-row-call">
            <PhoneSvg />
          </a>
        ) : null}
      </div>
      {open ? <div className="sig-row-body">{children}</div> : null}
    </li>
  );
}

export type LeadFacts = { name: string; city?: string; phone?: string; email?: string; service?: string; message?: string; from?: string };

export function LeadDetails({ p, tapCall }: { p: LeadFacts; tapCall?: { t: number; at: number } }) {
  return (
    <div>
      <div className="sig-lead-name">
        {p.name}
        {p.city ? <span className="sig-lead-city"> · {p.city}</span> : null}
      </div>
      {p.phone ? (
        <div className="sig-actions">
          <a className="btn btn-primary sig-call" style={{ position: "relative" }}>
            <PhoneSvg />
            Call {p.phone}
            {tapCall ? <TapRing t={tapCall.t} at={tapCall.at} dark /> : null}
          </a>
          <a className="btn btn-secondary sig-text">Text</a>
        </div>
      ) : null}
      <div className="sig-facts">
        {p.email ? <Fact label="Email" value={p.email} /> : null}
        {p.service ? <Fact label="Wants" value={p.service} /> : null}
        {p.message ? <Fact label="Said" value={p.message} /> : null}
        {p.from ? <Fact label="From" value={p.from} /> : null}
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="sig-fact">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

const NOTE_PROMPT: Record<FeedStatus, string> = {
  new: "Anything worth remembering about this one",
  contacted: "How did it go? Left a voicemail, quote sent, calling back Tuesday...",
  closed: "What was the job, and for how much?",
  not_closed: "Why not? Price, timing, went with someone else...",
};

/** Contacted / Closed / Not closed, then the note (typing, or saved). */
export function Tracker({
  status,
  draft = null,
  note,
  taps = {},
  t = 0,
}: {
  status: FeedStatus;
  draft?: string | null;
  note?: string;
  taps?: { contacted?: number; closed?: number; save?: number };
  t?: number;
}) {
  return (
    <div className="sig-track">
      <div className="sig-chips">
        {(
          [
            ["contacted", "Contacted"],
            ["closed", "Closed"],
            ["not_closed", "Not closed"],
          ] as [FeedStatus, string][]
        ).map(([s, label]) => (
          <button key={s} type="button" className="sig-chip" data-status={s} aria-pressed={status === s} style={{ position: "relative" }}>
            {label}
            {s === "contacted" && taps.contacted !== undefined ? <TapRing t={t} at={taps.contacted} /> : null}
            {s === "closed" && taps.closed !== undefined ? <TapRing t={t} at={taps.closed} /> : null}
          </button>
        ))}
      </div>
      {draft !== null ? (
        <div style={{ marginTop: "0.625rem" }}>
          <div
            className="field"
            style={{
              minHeight: 64,
              fontSize: "1rem",
              lineHeight: 1.45,
              color: draft ? "var(--text)" : "var(--text-subtle)",
              outline: "2px solid var(--accent)",
              outlineOffset: -1,
              borderColor: "var(--accent)",
            }}
          >
            {draft ? (
              <>
                {draft}
                <Caret />
              </>
            ) : (
              <>
                <Caret />
                {NOTE_PROMPT[status]}
              </>
            )}
          </div>
          <div style={{ display: "flex", gap: "0.375rem", marginTop: "0.375rem" }}>
            <button type="button" className="btn btn-primary btn-sm" style={{ position: "relative" }}>
              Save note
              {taps.save !== undefined ? <TapRing t={t} at={taps.save} dark /> : null}
            </button>
            <button type="button" className="btn btn-ghost btn-sm">
              Cancel
            </button>
          </div>
        </div>
      ) : note ? (
        <button type="button" className="sig-note">
          {note}
        </button>
      ) : null}
    </div>
  );
}

/** Messages tab: one conversation open. */
export function Thread({
  name,
  phone,
  bubbles,
  draft,
  tapSend,
  t = 0,
}: {
  name: string;
  phone: string;
  bubbles: { text: string; you?: boolean; meta: string; style?: CSSProperties }[];
  draft?: string;
  tapSend?: number;
  t?: number;
}) {
  return (
    <div className="sig-thread">
      <div className="sig-thread-head">
        <a className="sig-back">‹ All</a>
        <div style={{ minWidth: 0 }}>
          <div className="sig-thread-name">{name}</div>
          <div className="sig-thread-phone">{phone}</div>
        </div>
        <a className="btn btn-secondary btn-sm">Call</a>
      </div>
      <ol className="sig-bubbles">
        {bubbles.map((b, i) => (
          <li key={i} className={`sig-bubble ${b.you ? "is-you" : "is-them"}`} style={b.style}>
            <div className="sig-bubble-body">{b.text}</div>
            <div className="sig-bubble-meta">{b.meta}</div>
          </li>
        ))}
      </ol>
      {draft !== undefined ? (
        <div className="sig-composer">
          <div
            className="field"
            style={{
              minHeight: 56,
              color: draft ? "var(--text)" : "var(--text-subtle)",
              ...(draft ? { outline: "2px solid var(--accent)", outlineOffset: -1, borderColor: "var(--accent)" } : {}),
            }}
          >
            {draft || "Text them back…"}
          </div>
          <button type="button" className="btn btn-primary" disabled={!draft} style={{ position: "relative" }}>
            Send
            {tapSend !== undefined ? <TapRing t={t} at={tapSend} dark /> : null}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export type Visit = { time: string; who: string; what: string; where: string; phone: string };

/** Calendar tab. */
export function Calendar({
  summary,
  days,
  highlight,
}: {
  summary: string;
  days: { label: string; today?: boolean; visits: (Visit & { style?: CSSProperties })[] }[];
  highlight?: string;
}) {
  return (
    <>
      <div className="sig-cal-head">
        <div>
          <div className="sig-kicker">Next 30 days</div>
          <div className="sig-cal-summary">{summary}</div>
        </div>
        <button type="button" className="btn btn-primary btn-sm">
          + Add a visit
        </button>
      </div>
      <div className="sig-days">
        {days.map((d) => (
          <section key={d.label} className={`sig-day${d.today ? " is-today" : ""}`}>
            <h3 className="sig-day-label">{d.label}</h3>
            <ul className="sig-visits">
              {d.visits.map((v) => (
                <li
                  key={v.who}
                  className="sig-visit"
                  style={{
                    ...v.style,
                    ...(highlight === v.who ? { outline: "2px solid #16a34a", outlineOffset: 2, borderRadius: 12 } : {}),
                  }}
                >
                  <div className="sig-visit-time">{v.time}</div>
                  <div className="sig-visit-body">
                    <div className="sig-visit-who">{v.who}</div>
                    <div className="sig-visit-what">{v.what}</div>
                    <a className="sig-visit-where">{v.where}</a>
                    <div className="sig-row" style={{ marginTop: "0.5rem" }}>
                      <a className="btn btn-primary btn-sm">Call {v.phone}</a>
                      <a className="btn btn-secondary btn-sm">Text</a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}

/** Reviews tab: the score, then who was asked and where it went. */
export function ReviewsTab({
  asked,
  toGoogle,
  caught,
  rows,
}: {
  asked: number;
  toGoogle: number;
  caught: number;
  rows: { name: string; date: string; rating: number; style?: CSSProperties; fresh?: boolean }[];
}) {
  return (
    <>
      <Stats
        items={[
          { value: asked, label: "Asked" },
          { value: toGoogle, label: "To Google", tone: "good" },
          { value: caught, label: "Caught", tone: "bad" },
        ]}
      />
      <ul className="sig-list">
        {rows.map((r) => {
          const low = r.rating > 0 && r.rating <= 3;
          return (
            <li
              key={r.name + r.date}
              className="sig-card"
              style={
                {
                  ...r.style,
                  position: "relative",
                  "--sig-rail": low ? "var(--danger)" : r.rating ? "var(--sig-closed)" : "var(--border-strong)",
                  ...(r.fresh ? { outline: "2px solid #16a34a", outlineOffset: 2 } : {}),
                } as CSSProperties
              }
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
                <strong style={{ fontSize: "0.95rem" }}>{r.name}</strong>
                <span className="muted" style={{ fontSize: "0.75rem" }}>
                  {r.date}
                </span>
              </div>
              <div style={{ marginTop: "0.25rem", fontSize: "0.875rem" }}>
                {r.rating ? (
                  <>
                    <span style={{ color: "#f5a623", letterSpacing: "0.05em" }}>
                      {"★".repeat(r.rating)}
                      <span style={{ color: "var(--border-strong)" }}>{"★".repeat(5 - r.rating)}</span>
                    </span>{" "}
                    <span className="muted">{low ? "told you privately" : "sent to Google"}</span>
                  </>
                ) : (
                  <span className="muted">Asked, no answer yet</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

const RATING_LABEL = ["Bad", "Not great", "OK", "Good", "Great"];

/** The customer's review page (cjp-crm app/r/[token]): tap a star. */
export function ReviewAsk({ business, firstName, rating, tapStar, t = 0 }: { business: string; firstName: string; rating: number | null; tapStar?: { n: number; at: number }; t?: number }) {
  return (
    <div className="sigapp" style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: "var(--bg)", fontFamily: "var(--font-sans)", color: "var(--text)" }}>
        <main style={{ maxWidth: 440, margin: "0 auto", padding: "4.5rem 1rem 3rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.375rem", fontWeight: 750, margin: 0 }}>
            How did {business} do, {firstName}?
          </h1>
          <p className="muted" style={{ margin: "0.75rem 0 1.5rem", lineHeight: 1.6 }}>
            Tap a star.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.25rem" }}>
            {[1, 2, 3, 4, 5].map((r) => (
              <div
                key={r}
                style={{ position: "relative", padding: "0.25rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem", minWidth: 52, minHeight: 52 }}
              >
                <span style={{ fontSize: "2.5rem", lineHeight: 1, color: rating !== null && r <= rating ? "#f5a623" : "var(--border-strong)" }}>★</span>
                <span className="muted" style={{ fontSize: "0.75rem" }}>
                  {RATING_LABEL[r - 1]}
                </span>
                {tapStar?.n === r ? <TapRing t={t} at={tapStar.at} /> : null}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
