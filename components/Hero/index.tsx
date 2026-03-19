import HeroHeading from "./HeroHeading";
import HeroCTA from "./HeroCTA";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto flex justify-center px-4 py-24">
      <div className="w-full flex flex-col items-center gap-4">
        <HeroHeading />
        <p className="text-muted-foreground text-center text-xl mt-4">
          Search, compare and find the best fit.
        </p>
        <HeroCTA />
      </div>
    </section>
  );
}
