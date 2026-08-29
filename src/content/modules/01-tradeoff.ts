import type { Module } from "../types.ts";

export const tradeoff: Module = {
  id: "tradeoff",
  order: 1,
  title: "The Personalization-Privacy Trade-off",
  oneLiner: "Why software collects data, and why more is not always better.",
  readingMinutes: 4,
  sections: [
    {
      heading: "Why software collects data",
      body: [
        "Software collects data for real reasons. A music app uses your play history to suggest new songs. A learning app uses your past answers to pick the next question. A bank checks your device and location to spot a stolen card. A reader app saves your font size so the text stays easy to read.",
        "Some of this collection is fair and useful. The goal of this course is not to collect nothing. The goal is to collect with care.",
        "The word personalization means shaping an app around one user. It needs some data about that user. The real question is how much, and for how long.",
      ],
    },
    {
      heading: "Why more data is not better",
      body: [
        "It is easy to think that more data is always better. It is not. Every field you store is a cost as well as a feature.",
        "A stored field can leak in a breach. It can be stolen. It can be shared with a vendor. It can be used later for a job you did not plan. A field you never store cannot do any of these things.",
        "The value of one more field tends to drop fast. The risk does not. Weak data that sits in a table for years is still a risk on the day it leaks.",
      ],
    },
    {
      heading: "The harm usually comes later",
      body: [
        "At the moment you collect it, one row of data often looks harmless. The harm tends to arrive later.",
        "Risk grows when data is joined with other data, kept for a long time, or used for a new purpose. A single location point is minor. A year of location points shows where someone lives, works, and prays.",
        "Aggregation means you combine many records into totals or maps. In 2017 a fitness app published a heatmap of user activity. The single tracks were hidden. But in remote areas the map still showed the shape of military sites, because the only people active there were soldiers. No single track caused the harm. The combination did.",
      ],
    },
    {
      heading: "The trade-off, stated plainly",
      body: [
        "For each field you plan to collect, ask two questions. Does the feature still work without this field? Is the small gain worth the long-term risk?",
        "This is a design choice. You make it in the schema and in the ticket, not in a legal review. You are the person best placed to see the cheaper option.",
        "The rest of this course gives you tests for common cases: consent, data minimization, purpose limits, and sensitive data.",
      ],
    },
  ],
  caseIds: ["strava-heatmap"],
  takeaways: [
    "Some data collection is fair. The goal is not zero data.",
    "Every stored field is a cost as well as a feature.",
    "Most privacy harm arrives later, through reuse and aggregation.",
    "For each field, ask if the feature still works without it.",
  ],
  quiz: [
    {
      id: "tradeoff-q1",
      principle: "tradeoff",
      prompt:
        "Which sentence best describes the personalization-privacy trade-off?",
      options: [
        { id: "a", text: "You must collect as little data as possible in every case." },
        {
          id: "b",
          text: "You weigh the user value of a field against the long-term risk of holding it.",
        },
        { id: "c", text: "You can collect any data if the app shows a privacy notice." },
        { id: "d", text: "More data always makes an app better for the user." },
      ],
      correctOptionId: "b",
      explanation:
        "The trade-off is a balance, not a ban. Some collection is fair. For each field you weigh the value it adds for the user against the risk of holding it for years. A privacy notice alone does not settle the question, and more data is not automatically better.",
    },
    {
      id: "tradeoff-q2",
      principle: "tradeoff",
      prompt:
        "A teammate says: 'Let us log every field now, so we have it if we need it later.' What is the best response?",
      options: [
        { id: "a", text: "Agree, because storage is cheap." },
        { id: "b", text: "Agree, but only if the privacy policy is updated." },
        { id: "c", text: "Push back, and add a field when a feature needs it." },
        { id: "d", text: "Push back, because logging is never allowed." },
      ],
      correctOptionId: "c",
      explanation:
        "Collecting data 'just in case' trades a real cost today for a possible use later. The extra fields raise breach impact and support load now. If a future feature needs a field, you can add it then. Logging itself is fine when it is limited to what you need.",
    },
    {
      id: "tradeoff-q3",
      principle: "tradeoff",
      prompt:
        "A fitness app publishes a heatmap built from many users. Single routes are hidden. Why can this still expose sensitive facts?",
      options: [
        { id: "a", text: "Because hiding routes does not work in modern browsers." },
        {
          id: "b",
          text: "Because in low-use areas the combined map reveals a pattern tied to one place or group.",
        },
        { id: "c", text: "Because heatmaps always contain hidden GPS coordinates." },
        { id: "d", text: "Because aggregated data is the same as raw data." },
      ],
      correctOptionId: "b",
      explanation:
        "Aggregation lowers risk but does not remove it. In a busy city the map shows nothing special. In a remote area where the only active users are soldiers, the same map reveals a site layout. The harm comes from the combination, not from any single track.",
    },
  ],
};

export default tradeoff;
