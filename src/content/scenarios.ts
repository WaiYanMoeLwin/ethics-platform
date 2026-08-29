import type { Scenario } from "./types.ts";

// Seven scenarios (CLAUDE.md §6.3). Framed from the developer's chair: a ticket,
// a PM request, a code review. Feedback is written for all three verdicts,
// including the one the participant picks correctly. Scenarios 6 and 7 are
// load-bearing: one genuinely contested, one clearly acceptable.

export const scenarios: Scenario[] = [
  {
    id: "request-body-logging",
    title: "Log every request body 'just in case'",
    context:
      "You pick up a ticket from your product manager. It asks you to log the full body of every API request to a file, so the team can debug anything later. The requests include form fields such as name, address, and payment details.",
    request: [
      {
        name: "Full request body for every endpoint",
        necessity: "not-needed",
        note: "Most fields are never used for debugging.",
      },
      {
        name: "Submitted form values (name, address, payment)",
        necessity: "not-needed",
        note: "Personal data with no debugging need.",
      },
      {
        name: "Error code and request id",
        necessity: "needed",
        note: "This is what debugging actually uses.",
      },
    ],
    statedJustification:
      "We might need the data to debug a future problem, so we should capture all of it now.",
    correctVerdict: "unethical",
    correctPrinciple: "minimization",
    feedback: {
      ethical:
        "This is not a safe default. Full-body logging stores personal and payment data that debugging does not need. If the log leaks, every logged field leaks with it. The 'just in case' reason trades a real risk now for a maybe later.",
      borderline:
        "It is less of a grey area than it looks. There is a clear, cheaper option: log an error code, a request id, and the endpoint. That covers almost all debugging. Storing names, addresses, and payment details still fails the necessity test.",
      unethical:
        "Correct. Debugging needs an error code and a request id, not the user's form input. Full-body logging fails the necessity test and raises breach impact for no user benefit. Propose a structured error log with no personal data.",
    },
    principleFeedback:
      "Data minimization: log only what debugging needs. Add fields later if a real need appears.",
  },

  {
    id: "consent-modal-dark-pattern",
    title: "The consent modal ships with a pre-ticked box",
    context:
      "You are reviewing a pull request for a new consent modal. The marketing checkbox is ticked by default. 'Accept all' is a large coloured button. 'Manage choices' is a small grey text link that opens a second screen.",
    request: [
      {
        name: "Consent for marketing email",
        necessity: "needed",
        note: "But it must be an opt-in, not a default.",
      },
      {
        name: "Consent for analytics and ad sharing",
        necessity: "needed",
        note: "Bundled into one 'Accept all' action.",
      },
    ],
    statedJustification:
      "The vendor's default settings work this way, and 'Accept all' gives us a better opt-in rate.",
    correctVerdict: "unethical",
    correctPrinciple: "consent",
    feedback: {
      ethical:
        "A higher opt-in rate here comes from the design, not from a real user choice. A pre-ticked box treats no action as a yes. That fails the 'unambiguous' condition for consent.",
      borderline:
        "The pattern is clear enough to call. The checkbox is pre-ticked, and 'reject' is harder than 'accept'. Both break the conditions for real consent, even if the vendor ships it this way by default.",
      unethical:
        "Correct. The pre-ticked box is not consent. Making 'reject' harder than 'accept' means the choice is not freely given. Ask for an unticked box and give reject and accept equal weight.",
    },
    principleFeedback:
      "Informed consent: it must be freely given and unambiguous. A default tick and a buried reject fail both.",
  },

  {
    id: "precise-location-weather",
    title: "The weather widget asks for precise location",
    context:
      "A new home-screen weather widget asks for always-on precise location. A manual city picker would give the same forecast, but no one built it. The design doc says precise location is 'simpler for the user'.",
    request: [
      {
        name: "Precise GPS location, always on",
        necessity: "not-needed",
        note: "A city gives the same forecast.",
      },
      {
        name: "City or region",
        necessity: "needed",
        note: "Enough for a local forecast.",
      },
    ],
    statedJustification:
      "Precise location saves the user a tap, and it is simpler to build than a city picker.",
    correctVerdict: "unethical",
    correctPrinciple: "minimization",
    feedback: {
      ethical:
        "The feature works well with far less data. A city-level forecast does not need always-on GPS. Choosing precise location because the picker was not built is a cost the user pays, not the team.",
      borderline:
        "There is a clean lower-data option here. A city picker gives the same forecast. When a cheaper option exists and works, always-on precise location fails the necessity test.",
      unethical:
        "Correct. Always-on precise location is far more than a city forecast needs. Build the city picker. If precise location is offered at all, make it optional and off by default.",
    },
    principleFeedback:
      "Data minimization: prefer coarse data (a city) to precise data (GPS) when the feature allows. Build the lower-data path.",
  },

  {
    id: "support-transcripts-training",
    title: "Reuse support chats to train an assistant",
    context:
      "Your team has years of customer support chat transcripts. They were collected to resolve support tickets. A new project proposes using them as training data for an AI support assistant.",
    request: [
      {
        name: "Historic support chat transcripts",
        necessity: "inferred",
        note: "May contain names, account details, and complaints.",
      },
      {
        name: "Customer messages written for a human agent",
        necessity: "not-needed",
        note: "The customers did not write them for model training.",
      },
    ],
    statedJustification:
      "We already hold this data, so using it to train the assistant costs us nothing extra.",
    correctVerdict: "unethical",
    correctPrinciple: "purpose",
    feedback: {
      ethical:
        "Holding the data does not make every use fair. The transcripts were collected to close tickets. Training a model is a different purpose that the customers never agreed to.",
      borderline:
        "This is a clear change of purpose, not a grey area. Ticket resolution and model training are different jobs. The reuse needs fresh consent, or a reviewed dataset that is stripped of personal data.",
      unethical:
        "Correct. This is a new purpose. The customers wrote those messages to get help, not to train a model. Get fresh consent, or build a training set that is reviewed and stripped of personal data.",
    },
    principleFeedback:
      "Purpose limitation: data collected to resolve tickets should not silently become training data. A new purpose needs a new check.",
  },

  {
    id: "full-dob-age-check",
    title: "Signup stores full date of birth for an age check",
    context:
      "The signup form must confirm the user is over 18. The current design stores the full date of birth in the users table. The only rule in the spec is 'must be 18 or older'.",
    request: [
      {
        name: "Full date of birth",
        necessity: "not-needed",
        note: "More than the age rule needs.",
      },
      {
        name: "'Over 18' true or false",
        necessity: "needed",
        note: "This is the actual requirement.",
      },
    ],
    statedJustification:
      "We might want to send birthday emails or check age rules for other features later.",
    correctVerdict: "unethical",
    correctPrinciple: "sensitive",
    feedback: {
      ethical:
        "The stored field is wider than the rule. The spec asks only whether the user is over 18. A full birth date is extra sensitive data kept for a maybe.",
      borderline:
        "The requirement is narrow and clear: over 18 or not. That is a single true or false. Storing a full birth date for possible future features is the 'just in case' habit applied to sensitive data.",
      unethical:
        "Correct. The feature needs a yes or no on age. Check the birth date in the browser and store only the 'over 18' result. Add the full date later if a real feature needs it and the user agrees.",
    },
    principleFeedback:
      "Sensitive data and minimization: store the derived flag ('over 18'), not the raw birth date.",
  },

  {
    id: "aggregated-movement-transport",
    title: "Sell coarsened movement data for bus planning",
    context:
      "A city transport authority asks your navigation app for movement data to plan bus routes. The plan is to share counts of trips between areas, grouped by hour, with no user ids and with locations rounded to large zones.",
    request: [
      {
        name: "Trip counts between large zones, by hour",
        necessity: "needed",
        note: "Enough for route planning.",
      },
      {
        name: "User identifiers",
        necessity: "not-needed",
        note: "Removed before sharing.",
      },
      {
        name: "Precise start and end points",
        necessity: "not-needed",
        note: "Rounded to large zones.",
      },
    ],
    statedJustification:
      "The data is aggregated and coarsened, it serves a public transport benefit, and no single person can be identified.",
    correctVerdict: "borderline",
    correctPrinciple: "tradeoff",
    feedback: {
      ethical:
        "This may well be acceptable, but it is not automatic. It depends on the grouping being coarse enough that rare trips cannot single someone out, and on users being told their data may be shared in this form.",
      borderline:
        "Correct. The answer depends on the details. Key questions: are the zones and time buckets large enough to stop re-identification of rare trips? Were users told about this use? Is the public benefit real, and is the data limited to it? Strong grouping and clear disclosure move it toward acceptable. Fine-grained 'aggregates' or a purpose users never saw move it toward not acceptable.",
      unethical:
        "This is stronger than the case deserves. Aggregated, coarsened, id-free data shared for a public benefit is a common and often reasonable practice. The risks are about weak grouping and poor disclosure, not the idea itself.",
    },
    principleFeedback:
      "The personalization-privacy trade-off: aggregation lowers risk but does not remove it. Judge the grouping strength, the disclosure, and the limit on use.",
  },

  {
    id: "time-per-question-difficulty",
    title: "Record time per question to adjust difficulty",
    context:
      "A learning app records how long a user takes to answer each question. It uses this to make the next questions easier or harder. The onboarding screen explains this. The data stays in the app and is never shared.",
    request: [
      {
        name: "Time taken per question",
        necessity: "needed",
        note: "Drives the difficulty adjustment.",
      },
      {
        name: "Answer correctness",
        necessity: "needed",
        note: "Also drives the difficulty adjustment.",
      },
    ],
    statedJustification:
      "The feature adapts difficulty to the learner. The use is explained at onboarding and the data is not shared.",
    correctVerdict: "ethical",
    correctPrinciple: "tradeoff",
    feedback: {
      ethical:
        "Correct. The data is needed for the feature, the amount is small and proportionate, the user is told at onboarding, and it is not shared or reused. This is legitimate personalization.",
      borderline:
        "This is cleaner than a grey area. Every check passes: the data is necessary, proportionate, disclosed, and limited to its purpose. There is no hidden reuse and no sensitive inference.",
      unethical:
        "This is too strict. Not all data collection is wrong. Here the data is necessary for the feature, small, disclosed, and never shared. Ruling this out would mean no adaptive feature could exist.",
    },
    principleFeedback:
      "The personalization-privacy trade-off: collection can be legitimate when the data is necessary, proportionate, disclosed, and limited to its purpose.",
  },
];

export default scenarios;
