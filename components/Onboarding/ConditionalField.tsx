"use client";
import { cn } from "@/lib/utils";
import { type ReactNode, useEffect, useState } from "react";

interface ConditionalFieldProps {
  show: boolean;
  children: ReactNode;
}

export default function ConditionalField({
  show,
  children,
}: ConditionalFieldProps) {
  const [rendered, setRendered] = useState(show);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (show) {
      const raf = requestAnimationFrame(() => {
        setRendered(true);
        setExiting(false);
      });
      return () => cancelAnimationFrame(raf);
    }

    const rafExit = requestAnimationFrame(() => setExiting(true));
    const timer = setTimeout(() => setRendered(false), 300);
    return () => {
      cancelAnimationFrame(rafExit);
      clearTimeout(timer);
    };
  }, [show]);

  if (!rendered) return null;

  return (
    <div
      className={cn(
        "space-y-4",
        exiting
          ? "animate-out fade-out slide-out-to-top-2 duration-300"
          : "animate-in fade-in slide-in-from-top-2 duration-300",
      )}
    >
      {children}
    </div>
  );
}
