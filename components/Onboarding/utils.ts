import { PROFESSION_OPTIONS } from "@/components/Onboarding/constants";
import {
  type BackendPayload,
  type FormState,
  type ImportanceLevel,
} from "./types";

function toNumber(value: ImportanceLevel): number | undefined {
  if (value === "") return 1;
  return Number(value);
}

export function toBackendPayload(formState: FormState): BackendPayload {
  const needsKitasSchoolsUnis = formState.needsKitasSchoolsUnis ?? false;
  const goesToBarsClubs = formState.goesToBarsClubs ?? false;
  const wantsCentralLiving = formState.wantsCentralLiving ?? false;

  return {
    needsKitasSchoolsUnis,
    ...(needsKitasSchoolsUnis && {
      importanceKitas: toNumber(formState.importanceKitas),
      importanceSchulen: toNumber(formState.importanceSchulen),
      importanceUnis: toNumber(formState.importanceUnis),
    }),
    age: Number(formState.age),
    profession: formState.profession,
    goesToBarsClubs,
    ...(goesToBarsClubs && {
      importanceClubs: toNumber(formState.importanceClubs),
      importanceBars: toNumber(formState.importanceBars),
    }),
    wantsCentralLiving,
    ...(wantsCentralLiving && {
      importanceCityCenter: toNumber(formState.importanceCityCenter),
      importancePublicTransport: toNumber(formState.importancePublicTransport),
    }),
  };
}

function isStepOneValid(formState: FormState): boolean {
  console.log("needsKitasSchoolsUnis", formState.needsKitasSchoolsUnis);
  if (typeof formState.needsKitasSchoolsUnis === "boolean") {
    return true;
  }
  return false;
}
function isStepTwoValid(formState: FormState): boolean {
  const age = +formState.age;
  const profession = formState.profession;
  const isValidProfession = PROFESSION_OPTIONS.map(
    (option) => option.value,
  ).includes(profession);

  if (!isNaN(age) && age > 0 && profession !== "" && isValidProfession) {
    return true;
  }
  return false;
}
function isStepThreeValid(formState: FormState): boolean {
  if (
    typeof formState.goesToBarsClubs === "boolean" &&
    typeof formState.wantsCentralLiving === "boolean"
  ) {
    return true;
  }
  return false;
}

export function isStepValid(layer: number, formState: FormState): boolean {
  switch (layer) {
    case 0:
      return isStepOneValid(formState);
    case 1:
      return isStepTwoValid(formState);
    case 2:
      return isStepThreeValid(formState);
    default:
      return false;
  }
}
