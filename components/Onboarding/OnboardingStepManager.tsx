"use client";
import { Dispatch, type ReactNode, SetStateAction, useEffect } from "react";
import { FieldGroup } from "@/components/ui/field";
import { type ChangeAnimation } from "./types";

interface OnboardingStepManagerProps {
  formLayers: ReactNode[];
  activeLayer: number;
  changeAnimation: ChangeAnimation;
  setChangeAnimation: Dispatch<SetStateAction<ChangeAnimation>>;
}

export default function OnboardingStepManager({
  formLayers,
  activeLayer,
  changeAnimation,
  setChangeAnimation,
}: OnboardingStepManagerProps) {
  useEffect(() => {
    if (!changeAnimation.active) return;
    const timer = setTimeout(() => {
      setChangeAnimation({ active: false, offset: 0 });
    }, 300);
    return () => clearTimeout(timer);
  }, [changeAnimation, setChangeAnimation]);

  const stepAnimationStyle = {
    transform: `translateX(${changeAnimation.offset}px)`,
    transition: "ease-in-out",
    transitionDuration: ".3s",
  };

  return (
    <FieldGroup>
      <div
        className="space-y-4"
        style={changeAnimation.active ? stepAnimationStyle : {}}
      >
        {formLayers[activeLayer]}
      </div>
    </FieldGroup>
  );
}
