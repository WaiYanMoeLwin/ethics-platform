import { useSyncExternalStore } from "react";

/**
 * The only thing this app persists.
 *
 *  - `code`: a participant code the participant invents from a fixed rule.
 *    The developer never records the mapping. See CLAUDE.md §7.
 *  - `completedModules`: which modules the participant has marked done.
 *
 * No names, no emails, no answers, no analytics. If you are about to add a
 * third field here, re-read CLAUDE.md §2 first.
 */
export interface ProgressState {
  code: string | null;
  completedModules: string[];
}

const STORAGE_KEY = "dataethics.progress.v1";
const EMPTY: ProgressState = { code: null, completedModules: [] };

function read(): ProgressState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      code: typeof parsed.code === "string" ? parsed.code : null,
      completedModules: Array.isArray(parsed.completedModules)
        ? parsed.completedModules.filter(
            (x): x is string => typeof x === "string",
          )
        : [],
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

export function setParticipantCode(code: string): void {
  const trimmed = code.trim();
  write({ ...cache, code: trimmed.length > 0 ? trimmed : null });
}

export function clearParticipantCode(): void {
  write({ ...cache, code: null });
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
