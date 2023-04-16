import React from "react";
import { tw } from "twind";
const MIN_HUE = 0;
const MAX_HUE = 250;

export function getColor(
  val: number,
  { min = MIN_HUE, max = MAX_HUE }: { min?: number; max?: number }
) {
  const hue = ((val - min) * (MAX_HUE - MIN_HUE)) / (max - min) + MIN_HUE;
  return `hsl(${hue}, 50%, 50%)`;
}

export default function FlashyBox({
  children,
  color = "tomato",
  className = "",
  As = "div",
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
  As?: any;
}) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.animate([{ backgroundColor: color, easing: "ease-out" }], {
        duration: 2000,
      });
    }
  });
  return (
    <As className={tw`flex ${className}`} ref={containerRef}>
      {children}
    </As>
  );
}
