import { dedupe, range, sampleSpace, combos, sum } from "./utils.js";

// CONSTANTS
const DIE = range(6, 1);
const DICE = [DIE, DIE, DIE, DIE];
const SAMPLE_SPACE = sampleSpace(DICE);

const data = [
  { name: "MILLET", desc: "at least one 3", fn: (xs) => xs.includes(3) },
  {
    name: "WHEAT",
    desc: "exactly 2 of a kind",
    fn: (xs) => dedupe(xs).length === 3,
  },
  {
    name: "BUCKWHEAT",
    desc: "run of 3",
    fn: ([w, x, y, z]) => (x + 1 === y) && (w + 1 === x || y + 1 === z),
  },
  {
    name: "SPELT",
    desc: "any 2 add to 7",
    fn: (xs) => combos(xs, 2).map(sum).some((num) => num === 7),
  },
  {
    name: "OATS",
    desc: "w + x = y + z",
    fn: ([w, x, y, z]) => w + x === y + z || w + y === x + z || w + z === x + y,
  },
  { name: "BARLEY", desc: "all dice > 2", fn: (xs) => xs.every((x) => x > 2) },
  {
    name: "TEFF",
    desc: "no die is 1 larger than another",
    fn: ([w, x, y, z]) => !(x + 1 === y || w + 1 === x || y + 1 === z),
  },
  {
    name: "RYE",
    desc: "any 3 add to 10 or 11",
    fn: (xs) => combos(xs, 3).map(sum).some((x) => x === 10 || x === 11),
  },
  {
    name: "QUINOA",
    desc: "all different",
    fn: (xs) => dedupe(xs).length === xs.length,
  },
  { name: "SORGHUM", desc: "3 of a kind", fn: (xs) => dedupe(xs).length <= 2 },
  { name: "FARROW", desc: "max - min <= 3", fn: ([w, x, y, z]) => z - w <= 3 },
  { name: "AMARANTH", desc: "no 6s", fn: (xs) => !xs.includes(6) },
  {
    name: "FONIO",
    desc: "any 3 dice are even",
    fn: (xs) => combos(xs, 3).some((ys) => ys.every((x) => x % 2 === 0)),
  },
  {
    name: "TRITICALE",
    desc: "equal number of odd and evens",
    fn: (xs) =>
      xs.filter((x) => x % 2 === 0).length ===
        xs.filter((x) => x % 2 === 1).length,
  },
  {
    name: "STORM",
    desc: "all 4 add to < 10 or > 18",
    fn: (xs) => sum(xs) < 10 || sum(xs) > 18,
  },
];

function formatProbs(data) {
  const table = data
    .map(({ name, desc, fn }) => {
      const count = SAMPLE_SPACE.filter(fn).length;
      const prob = parseFloat((100 * count / SAMPLE_SPACE.length).toFixed(2));
      const payout = Math.floor(100 / prob);
      return { name, prob, desc, payout };
    })
    .toSorted((a, b) => b.prob - a.prob);
  console.table(table, ["name", "prob", "payout", "desc"]);
}

formatProbs(data)
