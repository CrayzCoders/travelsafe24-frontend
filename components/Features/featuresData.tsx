import UnderlinedText from "@/components/UnderlinedText";
import { type ReactNode } from "react";

export interface FeatureData {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: ReactNode;
  description: string;
}

export const featuresData: FeatureData[] = [
  {
    id: "city-score",
    imageSrc: "/hero.png",
    imageAlt: "Map showing city district scores",
    title: (
      <>
        See <UnderlinedText>all</UnderlinedText> cities and their best fitting
        score to your desires
      </>
    ),
    description:
      "Fill the onboarding form and get the best fitting score to your desires",
  },
];
