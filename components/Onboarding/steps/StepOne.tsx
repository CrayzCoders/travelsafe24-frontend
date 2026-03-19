import ConditionalField from "@/components/Onboarding/ConditionalField";
import ImportanceSlider from "@/components/Onboarding/ImportanceSlider";
import YesNoRadioGroup from "@/components/Onboarding/YesNoRadioGroup";
import { type StepProps } from "@/components/Onboarding/types";
import { Field, FieldLabel } from "@/components/ui/field";

export default function StepOne({ formState, onChange }: StepProps) {
  return (
    <>
      <Field>
        <FieldLabel>
          Benötigst du KiTas / Schulen / Unis in der Nähe?*
        </FieldLabel>
        <YesNoRadioGroup
          value={formState.needsKitasSchoolsUnis}
          onValueChange={(v) => onChange("needsKitasSchoolsUnis", v)}
          idPrefix="kitas"
        />
      </Field>

      <ConditionalField show={formState.needsKitasSchoolsUnis === true}>
        <Field>
          <FieldLabel>Wie wichtig sind dir KiTas?</FieldLabel>
          <ImportanceSlider
            value={formState.importanceKitas}
            onValueChange={(v) => onChange("importanceKitas", v)}
          />
        </Field>

        <Field>
          <FieldLabel>Wie wichtig sind dir Schulen?</FieldLabel>
          <ImportanceSlider
            value={formState.importanceSchulen}
            onValueChange={(v) => onChange("importanceSchulen", v)}
          />
        </Field>

        <Field>
          <FieldLabel>Wie wichtig sind dir Unis?</FieldLabel>
          <ImportanceSlider
            value={formState.importanceUnis}
            onValueChange={(v) => onChange("importanceUnis", v)}
          />
        </Field>
      </ConditionalField>
    </>
  );
}
