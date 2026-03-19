import { type FormState, type ImportanceLevel } from "./types";

export const INITIAL_FORM_STATE: FormState = {
  needsKitasSchoolsUnis: null,
  importanceKitas: "",
  importanceSchulen: "",
  importanceUnis: "",
  age: "",
  profession: "",
  goesToBarsClubs: null,
  importanceClubs: "",
  importanceBars: "",
  wantsCentralLiving: null,
  importanceCityCenter: "",
  importancePublicTransport: "",
};

export const IMPORTANCE_OPTIONS: { value: ImportanceLevel; label: string }[] = [
  { value: "1", label: "Nicht wichtig" },
  { value: "2", label: "Weniger wichtig" },
  { value: "3", label: "Neutral" },
  { value: "4", label: "Wichtig" },
  { value: "5", label: "Sehr wichtig" },
];

export const PROFESSION_OPTIONS = [
  {
    value: "student",
    label: "Student/in",
    description: "Ich studiere und suche eine passende Unterkunft.",
  },
  {
    value: "angestellter",
    label: "Angestellte/r",
    description: "Ich bin berufstätig und pendle zur Arbeit.",
  },
  {
    value: "selbststaendig",
    label: "Selbstständig",
    description: "Ich arbeite auf eigene Rechnung von zu Hause oder unterwegs.",
  },
  {
    value: "rentner",
    label: "Rentner/in",
    description: "Ich bin im Ruhestand und suche ein ruhiges Zuhause.",
  },
];

export const DEFAULT_IMPORTANCE_LEVEL = 3;
