import type { Module } from "../types.ts";

export const minimization: Module = {
  id: "minimization",
  order: 3,
  title: "Data Minimization",
  oneLiner: "The test is necessity: does the feature work without this field?",
  readingMinutes: 5,
  sections: [
    {
      heading: "The necessity test",
      body: [
        "Data minimization has one simple test. For each field, ask this. Does the feature work without it? If the answer is yes, you do not need the field.",
        "Run the test in your head during design. Take the field out. Walk through the feature step by step. If nothing breaks, leave the field out for real.",
        "This test lives in the schema and the API contract. It is your job, not the legal team's job.",
      ],
    },
    {
      heading: "The 'just in case' habit",
      body: [
        "Many engineers collect data 'just in case'. The thinking goes like this. Store it now, we might need it later. This feels safe. It is not.",
        "Every extra field has a cost today. It raises the harm if there is a breach. It widens the legal scope. It adds work to support, export, and delete flows.",
        "The gain is only a maybe. If a real feature needs the field later, you can add it then. A field is easy to add. Data you already collected is hard to take back.",
      ],
    },
    {
      heading: "Three worked examples",
      body: [
        "Age check. A signup form must confirm the user is over 18. You can store the full date of birth. Or you can store one true or false for 'over 18'. The feature only needs the true or false.",
        "Location. A weather feature needs to know where the user is. You can store precise coordinates. Or you can store a city. A city gives the same forecast with far less risk.",
        "Logging. You want to debug errors in an API. You can log the full request body, with everything the user typed. Or you can log an error code, a request id, and the path. The second option answers most bug reports.",
      ],
    },
    {
      heading: "A rough size check",
      body: [
        "Proportionality is an informal check on top of the necessity test. It asks whether the amount of data fits the size of the feature.",
        "A newsletter signup that asks for your phone number fails this check. A small tool that asks for your full contact list fails it too.",
        "If the data feels large next to what the feature does, stop and look again.",
      ],
    },
  ],
  caseIds: ["permission-creep"],
  takeaways: [
    "The test is necessity: does the feature work without this field?",
    "'Just in case' is a cost now for a maybe later. Add fields when a feature needs them.",
    "Prefer a derived flag ('over 18') to raw data (a birth date).",
    "Prefer coarse data (a city) to precise data (coordinates) when the feature allows.",
  ],
  quiz: [
    {
      id: "minimization-q1",
      principle: "minimization",
      prompt: "What is the core test of data minimization?",
      options: [
        { id: "a", text: "Collect data only when storage is expensive." },
        { id: "b", text: "Collect only what the current feature needs." },
        { id: "c", text: "Collect anything the user has seen in a policy." },
        { id: "d", text: "Collect data unless a law forbids it." },
      ],
      correctOptionId: "b",
      explanation:
        "Minimization asks a necessity question: does the feature work without this field? If yes, you do not collect it. Storage cost, policy text, and the absence of a specific law do not change that test.",
    },
    {
      id: "minimization-q2",
      principle: "minimization",
      prompt:
        "A signup form must confirm the user is 18 or older. Which is the minimal field to store?",
      options: [
        { id: "a", text: "Full date of birth" },
        { id: "b", text: "Year of birth" },
        { id: "c", text: "An 'over 18' true or false" },
        { id: "d", text: "Date of birth plus country" },
      ],
      correctOptionId: "c",
      explanation:
        "The requirement is a yes or no on age. A single true or false answers it. You can check the birth date in the browser and store only the result. A full date of birth is sensitive data kept for no current need.",
    },
    {
      id: "minimization-q3",
      principle: "minimization",
      prompt:
        "A product manager asks for full request-body logging 'to debug anything later'. What is the best answer?",
      options: [
        { id: "a", text: "Do it, because storage is cheap." },
        { id: "b", text: "Do it, but shorten the retention time." },
        { id: "c", text: "Log an error code, a request id, and the path instead." },
        { id: "d", text: "Refuse all logging." },
      ],
      correctOptionId: "c",
      explanation:
        "Debugging needs an error code, a request id, and the path, not the user's form input. Full-body logging stores personal and payment data for a maybe. Offer the smaller log now and add fields only if a real need appears.",
    },
  ],
};

export default minimization;
