/**
 * Study configuration.
 *
 * The three Google Form URLs. Build each Form from the paste-ready text in
 * docs/assessment/paste/, then paste the published (pre-filled or live) form
 * link here. Until a link is set, the app shows the step as "not ready yet"
 * rather than a broken link.
 *
 * Log the final URLs in CLAUDE.md §12 once they are set.
 */
export const STUDY_LINKS: {
  preTest: string;
  postTest: string;
  feedback: string;
} = {
  preTest: "https://forms.gle/fSerJLmeWBmny7iS9",
  postTest: "https://forms.gle/gmHbuPZRN33B64cq5",
  feedback: "https://forms.gle/PwrdtcP9VVnTLc8v9",
};

export function linkReady(url: string): boolean {
  return /^https?:\/\//i.test(url.trim());
}

/**
 * Estimated time for the whole session, shown to participants. Measured, not
 * hoped: modules ~35-45 min for a careful reader + tests ~20 min + setup and
 * feedback ~12 min. Revise down if the learning content is trimmed.
 */
export const SESSION_ESTIMATE = "about 60 to 75 minutes";

/**
 * The participant chooses their own username (CLAUDE.md §7). They type the same
 * one into the pre-test, post-test, and feedback form, which lets the three be
 * joined without the researcher holding any identity map. It is shown in the
 * header for the whole session so it is easy to copy exactly.
 */
export const USERNAME_RULE =
  "3 to 24 characters: letters, numbers, dots, dashes, and underscores";

export function cleanUsername(raw: string): string | null {
  const value = raw.trim();
  return /^[A-Za-z0-9._-]{3,24}$/.test(value) ? value : null;
}
