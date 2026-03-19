import { featuresData } from "./featuresData";
import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-24">
      {featuresData.map((feature) => (
        <FeatureCard key={feature.id} feature={feature} />
      ))}
    </section>
  );
}
