import { ComponentChildren } from "preact";
import { useRef, useEffect } from "preact/hooks";
const MIN_HUE = 0;
const MAX_HUE = 250;

export function getColor(
  val: number,
  { min = MIN_HUE, max = MAX_HUE }: { min?: number; max?: number }
) {
  const hue = ((val - min) * (MAX_HUE - MIN_HUE)) / (max - min) + MIN_HUE;
  return `hsl(${hue}, 50%, 50%)`;
}

export function FlashyBox({
  children,
  color = "hotpink",
}: {
  children: ComponentChildren;
  color?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.animate(
        [
          { backgroundColor: color, easing: "ease-out" },
          { backgroundColor: "transparent", easing: "ease-in" },
        ],
        {
          duration: 2000,
        }
      );
    }
  });
  return (
    <div
      style={{
        padding: "0.5rem",
        border: "1px solid grey",
        diplay: "flex",
        margin: "0.5rem",
        flexDirection: "row",
        flexBasis: "100%",
      }}
      ref={containerRef}
    >
      {children}
    </div>
  );
}
