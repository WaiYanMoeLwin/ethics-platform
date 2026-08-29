import type { Module } from "../types.ts";

export const purpose: Module = {
  id: "purpose",
  order: 4,
  title: "Purpose Limitation",
  oneLiner: "Data collected for one job should not quietly become data for another.",
  readingMinutes: 5,
  sections: [
    {
      heading: "The rule",
      body: [
        "You collect data for a stated purpose. That purpose is a promise to the user.",
        "Using the same data for a different purpose breaks the promise. It needs a fresh check. Often it needs fresh consent.",
        "Purpose limitation means data collected for job A should not quietly become data for job B.",
      ],
    },
    {
      heading: "Scope creep",
      body: [
        "Scope creep is when the stated purpose grows slowly over time. Each step looks small.",
        "A policy line starts as 'to provide the service'. Later it reads 'to provide and improve the service'. Later still it reads 'to provide and improve our services and build new products'.",
        "No single edit looks bad. Together they remove the limit. Read policy changes with care, and ask what new use each word allows.",
      ],
    },
    {
      heading: "Model training is a new purpose",
      body: [
        "Here is a current example. A team has years of support chat logs. Users wrote those messages to get help with a problem.",
        "Someone proposes using the logs to train a new assistant. That is a new purpose. The users did not agree to it when they asked for help.",
        "The Flo Health case shows the same pattern. The app collected health data to track periods and fertility. A regulator found it also sent that data to outside analytics and advertising tools, against its own privacy policy. The company agreed to a settlement in 2021.",
      ],
    },
    {
      heading: "New purpose or compatible use",
      body: [
        "Some new uses need fresh consent. Some are close enough to the first purpose to be allowed. The line is not always sharp.",
        "A genuinely new purpose includes training a model, selling data to a partner, or targeting ads. These need fresh consent.",
        "A compatible use stays inside the first job. Fixing a bug in the same checkout flow with the same logs is likely fine. Keeping a short security log is likely fine.",
        "When you are not sure, treat the use as new. Ask for consent, or drop the idea.",
      ],
    },
  ],
  caseIds: ["flo-health"],
  takeaways: [
    "Data carries the purpose you collected it for. A new purpose needs a new check.",
    "Watch policy edits that widen the purpose a little at a time.",
    "Reusing user content to train a model is a new purpose, not a free extra.",
    "When unsure whether a use is compatible, treat it as a new purpose.",
  ],
  quiz: [
    {
      id: "purpose-q1",
      principle: "purpose",
      prompt: "What does purpose limitation require?",
      options: [
        { id: "a", text: "Delete all data after 30 days." },
        {
          id: "b",
          text: "Use data only for the purpose it was collected for, unless you get fresh consent.",
        },
        { id: "c", text: "Limit each user to one purpose." },
        { id: "d", text: "Never share data with any third party." },
      ],
      correctOptionId: "b",
      explanation:
        "Data carries the purpose you collected it for. A new purpose needs a new check and often fresh consent. Retention limits and sharing rules matter too, but they are separate ideas.",
    },
    {
      id: "purpose-q2",
      principle: "purpose",
      prompt:
        "Support chat logs were collected to resolve tickets. A team wants to use them to train an assistant. How should you treat this?",
      options: [
        { id: "a", text: "As free, since the data is already stored." },
        {
          id: "b",
          text: "As a new purpose that needs fresh consent, or a reviewed dataset with personal data removed.",
        },
        { id: "c", text: "As a compatible use, since it is still about support." },
        { id: "d", text: "As fine if the policy mentions 'improving services'." },
      ],
      correctOptionId: "b",
      explanation:
        "Model training is a different job from closing a ticket. The users wrote those messages to get help. Holding the data does not make every later use fair. A vague policy line about 'improving services' does not cover it.",
    },
    {
      id: "purpose-q3",
      principle: "purpose",
      prompt:
        "Which use is most likely compatible with the original purpose, and not a new one?",
      options: [
        { id: "a", text: "Selling the data to an advertising partner." },
        {
          id: "b",
          text: "Fixing a crash in the same checkout flow using the same logs.",
        },
        { id: "c", text: "Training a chatbot on the data." },
        { id: "d", text: "Building a marketing profile of each user." },
      ],
      correctOptionId: "b",
      explanation:
        "A compatible use stays inside the first job. Fixing a bug in the same feature with the same logs serves the reason the data was collected. Selling data, training a model, and profiling are all new purposes that need fresh consent.",
    },
  ],
};

export default purpose;
