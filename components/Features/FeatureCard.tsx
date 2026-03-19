import Image from "next/image";
import { type FeatureData } from "./featuresData";

interface FeatureCardProps {
  feature: FeatureData;
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="flex justify-center items-center rounded-lg">
        <Image
          src={feature.imageSrc}
          alt={feature.imageAlt}
          width={575}
          height={575}
          className="rounded-lg w-sm lg:w-xl object-cover"
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <h2 className="max-w-md mx-auto text-4xl font-bold text-center leading-tight">
          {feature.title}
        </h2>
        <p className="max-w-md mx-auto text-muted-foreground text-center text-xl">
          {feature.description}
        </p>
      </div>
    </div>
  );
}
