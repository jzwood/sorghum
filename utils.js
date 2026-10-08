// STATS UTILS

export function sampleSpace(dice) {
  const [head, ...tail] = dice;
  if (head == null) return [];
  if (tail.length === 0) return head.map((x) => [x]);
  return head
    .flatMap((pip) => sampleSpace(tail).map((pips) => [pip, ...pips]))
    .map((pips) => pips.toSorted((a, b) => a - b));
}

export function powerset(arr) {
  return arr.reduce(
    (subsets, value) => subsets.concat(subsets.map((set) => [value, ...set])),
    [[]],
  );
}

export function combos(arr, num) {
  return powerset(arr).filter((set) => set.length === num);
}

// GENERAL UTILS

export function dedupe(xs) {
  if (xs.length <= 1) return xs;
  return xs.slice(0, 1).concat(dedupe(xs.slice(1).filter((x) => x !== xs[0])));
}

export function range(x, y = 0) {
  return Array(x).fill(0).map((_, i) => y + i);
}

export function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}
