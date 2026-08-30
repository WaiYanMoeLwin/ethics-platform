import { useSyncExternalStore } from "react";

/**
 * The only thing this app persists.
 *
 *  - `username`: a username the participant chooses. They type the same one
 *    into all three forms. The developer never records the mapping. CLAUDE.md §7.
 *  - `completedModules`: which modules the participant has marked done.
 *  - `scenarioLabComplete`: whether the Scenario Lab has been worked through.
 *
 * These three are the flow-progress state the post-test gate needs (CLAUDE.md
 * §7). No names, no emails, no answers, no scores, no analytics. If you are
 * about to add another field here, re-read CLAUDE.md §2 first.
 */
export interface ProgressState {
  username: string | null;
  completedModules: string[];
  scenarioLabComplete: boolean;
}

const STORAGE_KEY = "dataethics.progress.v1";
const EMPTY: ProgressState = {
  username: null,
  completedModules: [],
  scenarioLabComplete: false,
};

function read(): ProgressState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<ProgressState> & { code?: unknown };
    const stored =
      typeof parsed.username === "string"
        ? parsed.username
        : typeof parsed.code === "string" // pre-rename key
          ? parsed.code
          : null;
    return {
      username: stored,
      completedModules: Array.isArray(parsed.completedModules)
        ? parsed.completedModules.filter(
            (x): x is string => typeof x === "string",
          )
        : [],
      scenarioLabComplete: parsed.scenarioLabComplete === true,
    };
  } catch {
    return EMPTY;
  }
}

let cache: ProgressState = read();
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function write(next: ProgressState) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private mode or storage disabled. Keep the in-memory copy so the
    // session still works; it just will not survive a reload.
  }
  emit();
}

if (typeof window !== "undefined") {
  // Keep multiple open tabs in sync.
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) {
      cache = read();
      emit();
    }
  });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Reactive snapshot for components. */
export function useProgress(): ProgressState {
  return useSyncExternalStore(
    subscribe,
    () => cache,
    () => EMPTY,
  );
}

/** Non-reactive read, for event handlers. */
export function getProgress(): ProgressState {
  return cache;
}

export function setUsername(username: string): void {
  const trimmed = username.trim();
  write({ ...cache, username: trimmed.length > 0 ? trimmed : null });
}

export function clearUsername(): void {
  write({ ...cache, username: null });
}

export function isModuleComplete(id: string): boolean {
  return cache.completedModules.includes(id);
}

export function setModuleComplete(id: string, complete: boolean): void {
  const set = new Set(cache.completedModules);
  if (complete) set.add(id);
  else set.delete(id);
  write({ ...cache, completedModules: [...set] });
}

export function setScenarioLabComplete(complete: boolean): void {
  write({ ...cache, scenarioLabComplete: complete });
}
