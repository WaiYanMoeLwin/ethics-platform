import type { CaseStudy } from "./types.ts";

// Fixed structure for every case (CLAUDE.md §6.2):
// data collected -> stated purpose -> what happened -> which principle broke ->
// what a minimal-data alternative would have looked like.
//
// Every fact here is traceable to the cited source. Where a detail was
// uncertain it was left out. Source URLs are intentionally sparse: add and
// verify each one before using the platform in a session.

export const cases: CaseStudy[] = [
  {
    id: "cambridge-analytica",
    title: "One user's consent exposed their friends' data",
    principle: "consent",
    dataCollected: [
      {
        name: "Quiz taker's profile and page likes",
        necessity: "needed",
        note: "The stated study was about personality and likes.",
      },
      {
        name: "Quiz taker's Facebook friends' profiles and likes",
        necessity: "not-needed",
        note: "The friends never installed the app.",
      },
      {
        name: "Inferred personality traits of users and their friends",
        necessity: "inferred",
        note: "Modelled from page likes.",
      },
    ],
    statedPurpose:
      "Academic research on personality, through a quiz app called 'thisisyourdigitallife'.",
    whatHappened:
      "About 270,000 people installed the quiz and agreed to take part. Facebook's API at the time also let the app collect data about each installer's friends. By Facebook's later estimate this reached data on up to about 87 million people. The data was passed to Cambridge Analytica and used to target political advertising.",
    principleBroken:
      "Consent. The friends never installed the app and never agreed. One user's consent cannot cover data about other people.",
    minimalAlternative:
      "The quiz only needed the answers and likes of the people who took it. The platform should not have granted friend data on one user's consent. Friend data should require each friend's own opt-in, or not be available at all.",
    source: {
      citation:
        "Isaak, J. & Hanna, M. J. (2018). User Data Privacy: Facebook, Cambridge Analytica, and Privacy Protection. Computer, 51(8), 56-59.",
    },
  },

  {
    id: "strava-heatmap",
    title: "Aggregated fitness data revealed military base layouts",
    principle: "tradeoff",
    dataCollected: [
      {
        name: "GPS track of each activity",
        necessity: "needed",
        note: "Needed to record a run or ride for the user.",
      },
      {
        name: "Activity timestamps",
        necessity: "needed",
        note: "Part of a normal activity record.",
      },
      {
        name: "Inclusion in the public heatmap by default",
        necessity: "not-needed",
        note: "Users were in the public map unless they opted out.",
      },
    ],
    statedPurpose:
      "Show each user their own routes, and publish a global heatmap built from many users' activities.",
    whatHappened:
      "In November 2017 Strava published a heatmap built from a large volume of user activity. In January 2018 an analyst noticed that in remote areas the map showed the layout of military sites and patrol routes, because deployed personnel used fitness trackers. The individual tracks were aggregated, but in low-use areas the only people active were military staff, so the pattern stood out.",
    principleBroken:
      "The personalization-privacy trade-off. Each track was low risk on its own. The aggregate revealed sensitive facts about places and groups. The harm arrived later, through combination.",
    minimalAlternative:
      "Make heatmap inclusion opt-in, not opt-out. Do not render map areas that have fewer than a set number of distinct users. Let organisations exclude sensitive regions. Drop low-density areas from the public map.",
    source: {
      citation:
        "Hern, A. (2018). Fitness tracking app Strava gives away location of secret US army bases. The Guardian, 28 January 2018.",
    },
  },

  {
    id: "target-inference",
    title: "Pregnancy inferred from routine purchases",
    principle: "sensitive",
    dataCollected: [
      {
        name: "Purchase history linked to a customer id",
        necessity: "needed",
        note: "The retailer links purchases to a Guest ID.",
      },
      {
        name: "Pregnancy prediction score",
        necessity: "inferred",
        note: "Modelled from about 25 products, such as unscented lotion and some supplements.",
      },
      {
        name: "Estimated due date",
        necessity: "inferred",
        note: "Derived from the timing of those purchases.",
      },
    ],
    statedPurpose:
      "Send relevant coupons and target marketing to shoppers, especially around major life events.",
    whatHappened:
      "A Target statistician built a model that scored how likely a shopper was to be pregnant, using ordinary purchases. The store then sent baby-related offers. As reported in the source, a father complained about baby coupons sent to his teenage daughter, and later learned she was pregnant.",
    principleBroken:
      "Sensitive data. Pregnancy is sensitive. It was inferred from non-sensitive purchase data without the shopper's knowledge or agreement.",
    minimalAlternative:
      "Do not infer sensitive life events from ordinary purchases. To reach new parents, use an opt-in baby registry. Do not act on an inferred sensitive state in outbound marketing.",
    source: {
      citation:
        "Duhigg, C. (2012). How Companies Learn Your Secrets. The New York Times Magazine, 16 February 2012.",
      url: "https://www.nytimes.com/2012/02/19/magazine/shopping-habits.html",
    },
  },

  {
    id: "flo-health",
    title: "Health data sent to analytics SDKs against the stated policy",
    principle: "purpose",
    dataCollected: [
      {
        name: "Menstrual cycle dates",
        necessity: "needed",
        note: "The app's core feature tracks periods.",
      },
      {
        name: "Pregnancy status and intent",
        necessity: "needed",
        note: "Entered by the user for fertility tracking.",
      },
      {
        name: "App events sent to third-party SDKs",
        necessity: "not-needed",
        note: "Some event names revealed health state to outside firms.",
      },
    ],
    statedPurpose:
      "Track periods and fertility for the user. The privacy policy said health data would stay private.",
    whatHappened:
      "The US Federal Trade Commission alleged that Flo shared health information with outside analytics and marketing firms, including Facebook and Google, through their SDKs. Some events revealed that a user was having a period or wanted to get pregnant. This went against Flo's own privacy policy. Flo agreed to a settlement in 2021.",
    principleBroken:
      "Purpose limitation. Data given for period and fertility tracking was reused for analytics and advertising, against the stated purpose.",
    minimalAlternative:
      "Do not send health events to third-party SDKs. Use first-party analytics with no health details in the payload. Match the code to the privacy policy. Remove event names that encode a health state.",
    source: {
      citation:
        "Federal Trade Commission (2021). Developer of popular women's fertility-tracking app settles FTC allegations that it misled consumers about the disclosure of their health data. FTC press release, January 2021.",
    },
  },

  {
    id: "permission-creep",
    title: "Utility apps that request contacts and location",
    principle: "minimization",
    dataCollected: [
      {
        name: "Device contacts",
        necessity: "not-needed",
        note: "A flashlight or QR feature does not use contacts.",
      },
      {
        name: "Precise location",
        necessity: "not-needed",
        note: "Not required by the app's stated function.",
      },
      {
        name: "List of other installed apps",
        necessity: "not-needed",
        note: "Often collected for ad profiling, not the feature.",
      },
    ],
    statedPurpose:
      "Provide a small utility, such as a flashlight, a QR reader, or a file cleaner.",
    whatHappened:
      "Reviews of app stores have repeatedly found simple utility apps that ask for contacts, location, and other broad permissions they do not need for their stated job. The extra data is often used for advertising profiles or sold to data brokers. This is a pattern seen across many apps, not one company.",
    principleBroken:
      "Data minimization. The app collects far more than its feature needs. Each extra permission adds risk with no user benefit.",
    minimalAlternative:
      "Request only the permissions the current feature uses. Ask at the moment of use, not at install time. A flashlight needs access to the camera flash and nothing else.",
    source: {
      citation:
        "Composite pattern, not a single company. Based on repeated findings of permission over-collection in mobile app stores, including the US Federal Trade Commission staff report 'Mobile Privacy Disclosures: Building Trust Through Transparency' (2013).",
    },
  },
];

export default cases;
