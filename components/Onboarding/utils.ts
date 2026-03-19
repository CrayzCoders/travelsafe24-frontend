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
