export async function waitFor(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getName(name: { first: string; last: string }) {
  return `${name.first} ${name.last}`;
}

const MIN_HUE = 0;
const MAX_HUE = 360;
export function getColor({
  min = MIN_HUE,
  max = MAX_HUE,
  seed,
}: {
  min?: number;
  max?: number;
  seed?: number;
} = {}) {
  const seedOrRandom = seed ?? new Date().getTime();
  const hue =
    ((seedOrRandom - min) * (MAX_HUE - MIN_HUE)) / (max - min) + MIN_HUE;
  return `hsl(${hue}, 50%, 50%)`;
}
