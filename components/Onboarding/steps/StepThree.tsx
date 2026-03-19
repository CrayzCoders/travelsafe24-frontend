import ConditionalField from "@/components/Onboarding/ConditionalField";
import ImportanceSlider from "@/components/Onboarding/ImportanceSlider";
import YesNoRadioGroup from "@/components/Onboarding/YesNoRadioGroup";
import { type StepProps } from "@/components/Onboarding/types";
import { Field, FieldLabel } from "@/components/ui/field";

export default function StepThree({ formState, onChange }: StepProps) {
  return (
    <>
      <Field>
        <FieldLabel>Gehst du gerne aus?</FieldLabel>
        <YesNoRadioGroup
          value={formState.goesToBarsClubs}
          onValueChange={(v) => onChange("goesToBarsClubs", v)}
          idPrefix="goout"
        />
      </Field>

      <ConditionalField show={formState.goesToBarsClubs === true}>
        <Field>
          <FieldLabel>Wie wichtig sind dir Clubs in der Nähe?</FieldLabel>
          <ImportanceSlider
            value={formState.importanceClubs}
            onValueChange={(v) => onChange("importanceClubs", v)}
          />
        </Field>

        <Field>
          <FieldLabel>Wie wichtig sind dir Bars in der Nähe?</FieldLabel>
          <ImportanceSlider
            value={formState.importanceBars}
            onValueChange={(v) => onChange("importanceBars", v)}
          />
        </Field>
      </ConditionalField>

      <Field>
        <FieldLabel>Willst du zentral wohnen?</FieldLabel>
        <YesNoRadioGroup
          value={formState.wantsCentralLiving}
          onValueChange={(v) => onChange("wantsCentralLiving", v)}
          idPrefix="central"
        />
      </Field>

      <ConditionalField show={formState.wantsCentralLiving === true}>
        <Field>
          <FieldLabel>Wie wichtig ist dir die Nähe zum Zentrum?</FieldLabel>
          <ImportanceSlider
            value={formState.importanceCityCenter}
            onValueChange={(v) => onChange("importanceCityCenter", v)}
          />
        </Field>

        <Field>
          <FieldLabel>Wie wichtig sind dir öffentliche Verkehrsmittel?</FieldLabel>
          <ImportanceSlider
            value={formState.importancePublicTransport}
            onValueChange={(v) => onChange("importancePublicTransport", v)}
          />
        </Field>
      </ConditionalField>
    </>
  );
}
