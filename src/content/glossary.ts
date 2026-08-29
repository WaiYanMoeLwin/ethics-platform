import type { GlossaryTerm } from "./types.ts";

// Every technical or legal term used in module text appears here with a short
// plain-English gloss (CLAUDE.md §9). Keep each `plain` under about 20 words.
// `th` is left empty for now; a colleague adds and checks it later.

export const glossary: GlossaryTerm[] = [
  {
    term: "personalization",
    plain:
      "Shaping an app's content or behaviour around one user, using data about that person.",
  },
  {
    term: "personal data",
    plain:
      "Any data that relates to a person who can be identified, such as a name, an email, or a device id.",
  },
  {
    term: "aggregation",
    plain: "Combining many individual records into totals, averages, or maps.",
  },
  {
    term: "anonymization",
    plain:
      "Changing data so it can no longer be linked to a person. It is hard to do well.",
  },
  {
    term: "de-identified",
    plain:
      "Data with direct identifiers removed. It can still be re-identified if the detail is fine enough.",
  },
  {
    term: "re-identification",
    plain: "Working out who a record belongs to, even after names were removed.",
  },
  {
    term: "data breach",
    plain: "An event where data is exposed, lost, or stolen.",
  },
  {
    term: "consent",
    plain:
      "A person's agreement to a specific use of their data, given by a clear action.",
  },
  {
    term: "informed consent",
    plain:
      "Consent given by someone who understands what they are agreeing to and why.",
  },
  {
    term: "dark pattern",
    plain: "A design that pushes users toward a choice they would not freely make.",
  },
  {
    term: "confirm-shaming",
    plain: "A dark pattern that uses guilt in the wording of the decline option.",
  },
  {
    term: "opt-in",
    plain: "The user must act to turn something on. Off is the default.",
  },
  {
    term: "opt-out",
    plain: "Something is on by default. The user must act to turn it off.",
  },
  {
    term: "analytics",
    plain: "Tools that measure how people use an app.",
  },
  {
    term: "tracking",
    plain:
      "Following a user's activity over time, often across different sites or apps.",
  },
  {
    term: "data minimization",
    plain: "Collecting only the data the current feature needs, and no more.",
  },
  {
    term: "necessity test",
    plain: "A check for each field: does the feature still work without it?",
  },
  {
    term: "proportionality",
    plain:
      "A rough check that the amount of data fits the size of the feature.",
  },
  {
    term: "purpose limitation",
    plain:
      "Using data only for the purpose it was collected for, unless you get fresh consent.",
  },
  {
    term: "scope creep",
    plain: "The slow widening of a stated purpose through small policy changes.",
  },
  {
    term: "compatible use",
    plain: "A later use of data that stays close to the original purpose.",
  },
  {
    term: "training data",
    plain: "Data used to teach a machine learning model.",
  },
  {
    term: "model training",
    plain: "The process of teaching a machine learning model from example data.",
  },
  {
    term: "sensitive data",
    plain:
      "Data that can cause serious or lasting harm if exposed, such as health, precise location, or biometrics.",
  },
  {
    term: "biometrics",
    plain:
      "Body measurements used to identify a person, such as a fingerprint or a face scan.",
  },
  {
    term: "precise location",
    plain: "A location accurate to a few metres, such as a raw GPS reading.",
  },
  {
    term: "inference",
    plain: "Working out a new fact about a person from other data you hold.",
  },
  {
    term: "children's data",
    plain:
      "Personal data about a person under the age of majority. It gets the strictest protection.",
  },
  {
    term: "privacy policy",
    plain: "A public document that states what data an app collects and why.",
  },
  {
    term: "regulator",
    plain:
      "A government body that enforces the rules on data and privacy, such as the FTC.",
  },
  {
    term: "settlement",
    plain:
      "An agreement that ends a legal case without a full trial, often with promises to change behaviour.",
  },
  {
    term: "third party",
    plain:
      "A company other than the app maker and the user, such as an outside vendor.",
  },
  {
    term: "vendor",
    plain:
      "An outside company that supplies a tool or service used inside your product.",
  },
  {
    term: "data broker",
    plain: "A company that buys and sells personal data about people.",
  },
  {
    term: "SDK",
    plain:
      "A software development kit: code from another company that you add to your app. It can send data back to that company.",
  },
  {
    term: "API",
    plain:
      "An application programming interface: the defined way that separate software parts talk to each other.",
  },
  {
    term: "request body",
    plain:
      "The main content sent with an API request, such as the fields from a form.",
  },
  {
    term: "request id",
    plain:
      "A short code attached to one API request so engineers can trace it in logs.",
  },
  {
    term: "schema",
    plain:
      "The defined structure of a database or data format: the tables, fields, and types.",
  },
  {
    term: "retention",
    plain: "How long data is kept before it is deleted.",
  },
  {
    term: "heatmap",
    plain:
      "A picture that shows where activity is high or low by using colour or brightness.",
  },
];

export default glossary;
