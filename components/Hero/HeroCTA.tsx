import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function HeroCTA() {
  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <Link href="/register">
        <Button className="bg-accent text-lg has-[>svg]:p-6 cursor-pointer">
          Start for free <ArrowRightIcon />
        </Button>
      </Link>
      <p className="text-sm text-muted-foreground">
        Free forever. No credit card required.
      </p>
    </div>
  );
}
