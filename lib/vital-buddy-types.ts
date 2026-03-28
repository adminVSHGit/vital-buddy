export const MODES = [
  {
    id: "standard",
    label: "Check in",
    sub: "10-15 min",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  },
  {
    id: "critical_event",
    label: "Clinical Code",
    sub: "5-7 min",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
  },
  {
    id: "grounding",
    label: "5 minutes",
    sub: "Quick reset",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z",
  },
  {
    id: "pre_convo",
    label: "Prep talk",
    sub: "3-5 min",
    icon: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z",
  },
];

export const SCORE_COLORS = [
  "#1D9E75",
  "#3B9E5A",
  "#5A9E3F",
  "#7A9E24",
  "#9E9E1D",
  "#BA8517",
  "#D06A11",
  "#D85A30",
  "#C03A2A",
  "#A32D2D",
  "#791F1F",
];

export const CRISIS_SCREEN = {
  heading: "We hear you, and we're concerned about your safety.",
  body: "This platform is not a crisis service. If you are having thoughts of harming yourself or others, or if you are in immediate danger:",
  resources: [
    {
      label: "Call or text 988",
      desc: "Suicide & Crisis Lifeline — 24/7",
      href: "tel:988",
    },
    { label: "Call 911", desc: "Or go to your nearest emergency room", href: "tel:911" },
    { label: "Hospital Employee Assistance Program", desc: null, href: null },
  ],
};

export type Message = {
  text: string;
  from: "ai" | "user" | "system";
  type: "normal" | "escalation";
  time: Date;
  resources?: any[];
};

export type Mode = (typeof MODES)[number];

export type Phase =
  | "mode_select"
  | "stress_open"
  | "chat"
  | "crisis"
  | "done";
