import { create } from "zustand";

type DeckState = {
  index: number;
  total: number;
  notesOpen: boolean;
  overviewOpen: boolean;
  helpOpen: boolean;
  marks: Record<number, boolean>;
  setTotal: (n: number) => void;
  go: (n: number) => void;
  next: () => void;
  prev: () => void;
  toggleNotes: () => void;
  toggleOverview: () => void;
  toggleHelp: () => void;
  closeOverlays: () => void;
  toggleMark: (n: number) => void;
  score: () => number;
};

function clamp(n: number, max: number) {
  if (max <= 0) return 0;
  return Math.max(0, Math.min(max - 1, n));
}

function readHash() {
  if (typeof window === "undefined") return 0;
  const raw = window.location.hash.replace("#", "");
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n - 1 : 0;
}

export const useDeck = create<DeckState>((set, get) => ({
  index: 0,
  total: 0,
  notesOpen: false,
  overviewOpen: false,
  helpOpen: false,
  marks: {},
  setTotal: (n) =>
    set((s) => ({
      total: n,
      index: clamp(s.index, n),
    })),
  go: (n) => {
    const next = clamp(n, get().total);
    set({ index: next, overviewOpen: false, helpOpen: false });
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${next + 1}`);
    }
  },
  next: () => {
    const { index, total, overviewOpen, helpOpen, notesOpen } = get();
    if (overviewOpen || helpOpen) {
      set({ overviewOpen: false, helpOpen: false });
      return;
    }
    if (notesOpen && index >= total - 1) return;
    get().go(index + 1);
  },
  prev: () => {
    const { overviewOpen, helpOpen } = get();
    if (overviewOpen || helpOpen) {
      set({ overviewOpen: false, helpOpen: false });
      return;
    }
    get().go(get().index - 1);
  },
  toggleNotes: () => set((s) => ({ notesOpen: !s.notesOpen })),
  toggleOverview: () =>
    set((s) => ({ overviewOpen: !s.overviewOpen, helpOpen: false })),
  toggleHelp: () => set((s) => ({ helpOpen: !s.helpOpen, overviewOpen: false })),
  closeOverlays: () => set({ overviewOpen: false, helpOpen: false }),
  toggleMark: (n) =>
    set((s) => ({
      marks: { ...s.marks, [n]: !s.marks[n] },
    })),
  score: () => Object.values(get().marks).filter(Boolean).length,
}));

export function hydrateDeckFromHash() {
  useDeck.getState().go(readHash());
}
