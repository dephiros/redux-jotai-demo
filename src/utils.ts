export async function waitFor(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getName(name: { first: string; last: string }) {
  return `${name.first} ${name.last}`;
}
