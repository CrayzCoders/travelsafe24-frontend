export type YesNo = boolean | null;
export type ImportanceLevel = "1" | "2" | "3" | "4" | "5" | "";

export interface FormState {
  needsKitasSchoolsUnis: YesNo;
  importanceKitas: ImportanceLevel;
  importanceSchulen: ImportanceLevel;
  importanceUnis: ImportanceLevel;
  age: string;
  profession: string;
  goesToBarsClubs: YesNo;
  importanceClubs: ImportanceLevel;
  importanceBars: ImportanceLevel;
  wantsCentralLiving: YesNo;
  importanceCityCenter: ImportanceLevel;
  importancePublicTransport: ImportanceLevel;
}

export interface BackendPayload {
  needsKitasSchoolsUnis: boolean;
  importanceKitas?: number;
  importanceSchulen?: number;
  importanceUnis?: number;
  age: number;
  profession: string;
  goesToBarsClubs: boolean;
  importanceClubs?: number;
  importanceBars?: number;
  wantsCentralLiving: boolean;
  importanceCityCenter?: number;
  importancePublicTransport?: number;
}

export interface ChangeAnimation {
  active: boolean;
  offset: number;
}

export interface StepProps {
  formState: FormState;
  onChange: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
}
