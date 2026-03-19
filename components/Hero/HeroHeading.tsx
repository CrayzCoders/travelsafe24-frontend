import TextType from "@/components/TextType";
import UnderlinedText from "@/components/UnderlinedText";

export default function HeroHeading() {
  return (
    <h1 className="max-w-3xl mx-auto text-5xl lg:text-6xl font-bold text-center leading-tight">
      A <UnderlinedText>better</UnderlinedText> way to find the{" "}
      <br className="max-lg:hidden" />
      <TextType
        className="text-accent"
        text={["right ", "better", "best"]}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor={false}
        deletingSpeed={50}
        variableSpeed={{ min: 60, max: 120 }}
      />{" "}
      <br className="sm:hidden" />
      place.
    </h1>
  );
}
