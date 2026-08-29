import type { Module } from "../types.ts";

export const sensitive: Module = {
  id: "sensitive",
  order: 5,
  title: "Sensitive Data",
  oneLiner: "Some data needs extra care, and it can be inferred from ordinary signals.",
  readingMinutes: 5,
  sections: [
    {
      heading: "What counts as sensitive",
      body: [
        "Some data needs more care than the rest. Health data is one type. Precise location is another. So are biometrics.",
        "Other types include sexual orientation, religion, money worries, and any data about a child.",
        "Biometrics are body traits used to recognise a person. A fingerprint, a face scan, and a voice print are all biometrics.",
        "Precise location is sensitive on its own. It can show a home, a clinic, or a place of worship.",
      ],
    },
    {
      heading: "Why sensitive data needs more care",
      body: [
        "With most data, a leak is embarrassing. With sensitive data, the harm is often worse and lasts longer.",
        "A leaked home address can put someone in real danger. A leaked health fact can affect a job or an insurance rate. A leaked sexual orientation can be dangerous in some countries.",
        "You cannot undo these harms. Once the fact is out, it stays out. This is why sensitive data needs stronger limits and stronger security.",
      ],
    },
    {
      heading: "Inference is the key idea",
      body: [
        "Sensitive facts can be worked out from data that was not sensitive on its own. This is called inference.",
        "A store found it could predict pregnancy from ordinary purchases, such as unscented lotion and some supplements. The shoppers only agreed to a loyalty card. They did not agree to a pregnancy guess.",
        "Typing speed can hint at a health condition. Location history can reveal a hospital visit. None of these signals is sensitive alone. The result of combining them can be.",
        "Consent to collect a signal is not consent to infer a sensitive fact from it.",
      ],
    },
    {
      heading: "What to do in your work",
      body: [
        "Do not build sensitive inferences unless the feature truly needs them and the user has agreed in clear terms.",
        "Treat precise location as sensitive by default. Store a city or a region when that is enough.",
        "Keep any collection of children's data to the smallest amount the feature needs. Apply the strictest option you have.",
        "If a field could reveal a sensitive fact, protect it like one, even when it looks ordinary.",
      ],
    },
  ],
  caseIds: ["target-inference"],
  takeaways: [
    "Sensitive data includes health, precise location, biometrics, sexual orientation, finances, and children's data.",
    "Harm from a sensitive data leak is often permanent and physical or economic.",
    "Sensitive facts can be inferred from ordinary data that was never sensitive alone.",
    "Consent to collect a signal is not consent to infer a sensitive fact from it.",
  ],
  quiz: [
    {
      id: "sensitive-q1",
      principle: "sensitive",
      prompt:
        "Why does sensitive data need extra protection compared with ordinary data?",
      options: [
        { id: "a", text: "It is larger and costs more to store." },
        {
          id: "b",
          text: "The harm from a leak is often permanent and physical or economic.",
        },
        { id: "c", text: "It is always covered by a specific law." },
        { id: "d", text: "Users care less about it." },
      ],
      correctOptionId: "b",
      explanation:
        "A leak of sensitive data can put someone in danger, cost them a job, or raise an insurance rate. You cannot undo these harms. That is why sensitive data needs stronger limits and stronger security.",
    },
    {
      id: "sensitive-q2",
      principle: "sensitive",
      prompt:
        "A store predicts pregnancy from normal purchases and sends targeted baby offers. What is the main problem?",
      options: [
        { id: "a", text: "The offers are annoying." },
        { id: "b", text: "A sensitive fact is inferred without consent." },
        { id: "c", text: "Purchase data is never allowed." },
        { id: "d", text: "There is no problem, since no health record was read." },
      ],
      correctOptionId: "b",
      explanation:
        "Pregnancy is sensitive. It was worked out from ordinary purchases that the shopper agreed to share for a loyalty card. Consent to collect a signal is not consent to infer a sensitive fact from it.",
    },
    {
      id: "sensitive-q3",
      principle: "sensitive",
      prompt: "Which item counts as sensitive data by default?",
      options: [
        { id: "a", text: "A user's chosen display name" },
        { id: "b", text: "The app's font size setting" },
        { id: "c", text: "Precise GPS location" },
        { id: "d", text: "The number of times a button was clicked" },
      ],
      correctOptionId: "c",
      explanation:
        "Precise location can reveal a home, a clinic, or a place of worship. It is treated as sensitive on its own. A display name, a font size, and a click count are not sensitive by default, though any field can become sensitive in context.",
    },
  ],
};

export default sensitive;
