import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type YesNo } from "@/global/types/onboarding.types";

interface YesNoRadioGroupProps {
  value: YesNo;
  onValueChange: (val: YesNo) => void;
  idPrefix: string;
}

export default function YesNoRadioGroup({
  value,
  onValueChange,
  idPrefix,
}: YesNoRadioGroupProps) {
  const stringValue = value === true ? "ja" : value === false ? "nein" : "";

  return (
    <RadioGroup
      value={stringValue}
      onValueChange={(v) => onValueChange(v === "ja")}
      className="grid-cols-2 gap-3"
    >
      {(["ja", "nein"] as const).map((option) => (
        <FieldLabel key={option} htmlFor={`${idPrefix}-${option}`}>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>{option === "ja" ? "Ja" : "Nein"}</FieldTitle>
            </FieldContent>
            <RadioGroupItem value={option} id={`${idPrefix}-${option}`} />
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  );
}
