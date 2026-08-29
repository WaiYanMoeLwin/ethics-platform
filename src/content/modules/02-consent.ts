import type { Module } from "../types.ts";

export const consent: Module = {
  id: "consent",
  order: 2,
  title: "Informed Consent",
  oneLiner: "The five conditions for real consent, and the dark patterns that break them.",
  readingMinutes: 4,
  sections: [
    {
      heading: "The five conditions",
      body: [
        "Real consent must meet five conditions. Miss one and it is not consent.",
        "Freely given. The user must have a real choice. If the app blocks all use until you accept tracking, the choice is not free.",
        "Specific. Each purpose needs its own choice. One box that covers analytics, ads, and data sharing at once is too broad.",
        "Informed. The user must understand what they agree to. A wall of legal text does not inform anyone.",
        "Unambiguous. The user must take a clear action. A box that is already ticked treats silence as a yes.",
        "Revocable. The user must be able to change their mind. If there is no way to withdraw, the consent is a trap.",
      ],
    },
    {
      heading: "Dark patterns in consent flows",
      body: [
        "Engineers often add dark patterns without meaning harm. A product manager asks for a higher opt-in rate. A vendor tool ships this way by default. The result still misleads the user.",
        "Watch for these common ones. A box for marketing or tracking is ticked before the user touches it. The 'Accept all' button is large and coloured, while the 'Reject' link is small and grey. 'Reject all' is hidden behind an extra screen, while 'Accept all' takes one click. The decline option uses guilt, with wording like 'No thanks, I like paying full price'.",
        "Each of these makes the easy path the one the company wants. That is not a free choice.",
      ],
    },
    {
      heading: "The limit of individual consent",
      body: [
        "Your consent covers data about you. It cannot cover data about other people.",
        "Think about a feature that uploads your phone contacts to find friends. Those contacts hold names, numbers, and sometimes home addresses. The people in your address book never used the app. They never agreed to anything.",
        "This is what went wrong in the Cambridge Analytica case. About 270 thousand people installed a quiz app and agreed to share their data. The platform also handed over data about their friends. That reached many millions of people who never saw the app.",
        "When a feature collects data about people who are not users, individual consent is not enough. Ask whether those people had any real choice.",
      ],
    },
  ],
  caseIds: ["cambridge-analytica"],
  takeaways: [
    "Real consent is freely given, specific, informed, unambiguous, and revocable.",
    "A box that is ticked by default is not consent.",
    "If 'reject' is harder than 'accept', the choice is not free.",
    "One person's consent never covers data about other people.",
  ],
  quiz: [
    {
      id: "consent-q1",
      principle: "consent",
      prompt: "Which of these is NOT one of the five conditions for valid consent?",
      options: [
        { id: "a", text: "Freely given" },
        { id: "b", text: "Specific" },
        { id: "c", text: "Permanent" },
        { id: "d", text: "Revocable" },
      ],
      correctOptionId: "c",
      explanation:
        "The five conditions are freely given, specific, informed, unambiguous, and revocable. Consent is never meant to be permanent. It must stay revocable, so the user can withdraw at any time.",
    },
    {
      id: "consent-q2",
      principle: "consent",
      prompt:
        "A consent modal ships with the marketing checkbox already ticked. Which condition does this break most clearly?",
      options: [
        { id: "a", text: "Informed" },
        { id: "b", text: "Unambiguous" },
        { id: "c", text: "Specific" },
        { id: "d", text: "Revocable" },
      ],
      correctOptionId: "b",
      explanation:
        "A pre-ticked box treats no action as agreement. Consent must be unambiguous, which means the user takes a clear, active step. A ticked-by-default box also strains 'freely given', because the easy path is the one the company wants.",
    },
    {
      id: "consent-q3",
      principle: "consent",
      prompt:
        "A feature uploads the user's phone contacts to suggest friends. What is the main consent problem?",
      options: [
        { id: "a", text: "The upload is slow on a weak network." },
        { id: "b", text: "The contacts belong to people who did not agree." },
        { id: "c", text: "Contact lists are not personal data." },
        { id: "d", text: "There is no problem if the user agreed." },
      ],
      correctOptionId: "b",
      explanation:
        "The user can consent for their own data, not for other people's. The contacts hold names and numbers of people who never used the app and never had a choice. Individual consent does not cover data about people who are not users.",
    },
  ],
};

export default consent;
