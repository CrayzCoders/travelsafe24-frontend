import { PROFESSION_OPTIONS } from "@/components/Onboarding/constants";
import { type StepProps } from "@/components/Onboarding/types";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function StepTwo({ formState, onChange }: StepProps) {
  return (
    <>
      <Field>
        <FieldLabel htmlFor="age">Wie alt bist du?*</FieldLabel>
        <Input
          id="age"
          type="number"
          placeholder="z.B. 28"
          value={formState.age}
          onChange={(e) => onChange("age", e.target.value)}
          required
        />
      </Field>

      <Field>
        <FieldLabel>
          Welche Berufsbezeichnung passt am besten zu dir?*
        </FieldLabel>
        <RadioGroup
          value={formState.profession}
          onValueChange={(v) => onChange("profession", v)}
          className="grid-cols-2 gap-3"
        >
          {PROFESSION_OPTIONS.map((o) => (
            <FieldLabel key={o.value} htmlFor={`profession-${o.value}`}>
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>{o.label}</FieldTitle>
                  <FieldDescription>{o.description}</FieldDescription>
                </FieldContent>
                <RadioGroupItem value={o.value} id={`profession-${o.value}`} />
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
      </Field>
    </>
  );
}
