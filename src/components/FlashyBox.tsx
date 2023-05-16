import React from "react";
import { tw } from "twind";

export default function FlashyBox({
  children,
  color = "tomato",
  className = "",
  As = "div",
  duration = 200,
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
  duration?: number;
  As?: any;
}) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.animate([{ backgroundColor: color, easing: "ease-out" }], {
        duration,
      });
    }
  }, [color]);
  return (
    <As className={tw`flex ${className}`} ref={containerRef}>
      {children}
    </As>
  );
}
