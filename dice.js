import { combos, dedupe, range, sampleSpace, sum } from "./utils.js";

// CONSTANTS
const DIE = range(6, 1);
const DICE = [DIE, DIE, DIE, DIE];
const SAMPLE_SPACE = sampleSpace(DICE);

const data = [
  { name: "MILLET", desc: "at least one 1", fn: (xs) => xs.includes(1) },
  { name: "MILLET", desc: "at least one 2", fn: (xs) => xs.includes(2) },
  { name: "MILLET", desc: "at least one 3", fn: (xs) => xs.includes(3) },
  { name: "MILLET", desc: "at least one 4", fn: (xs) => xs.includes(4) },
  { name: "MILLET", desc: "at least one 5", fn: (xs) => xs.includes(5) },
  { name: "MILLET", desc: "at least one 6", fn: (xs) => xs.includes(6) },
  {
    name: "WHEAT",
    buy: true,
    desc: "exactly 2 of a kind",
    fn: (xs) => dedupe(xs).length === 3,
  },
  {
    name: "BUCKWHEAT",
    buy: true,
    desc: "run of 3",
    fn: ([w, x, y, z]) => (x + 1 === y) && (w + 1 === x || y + 1 === z),
  },
  {
    name: "SPELT",
    buy: true,
    desc: "any 2 add to 7",
    fn: (xs) => combos(xs, 2).map(sum).some((num) => num === 7),
  },
  {
    name: "OATS",
    buy: true,
    desc: "w + x = y + z",
    fn: ([w, x, y, z]) => w + x === y + z || w + y === x + z || w + z === x + y,
  },
  {
    name: "BARLEY",
    buy: true,
    desc: "all dice > 2",
    fn: (xs) => xs.every((x) => x > 2),
  },
  {
    name: "TEFF",
    buy: true,
    desc: "no die is 1 larger than another",
    fn: ([w, x, y, z]) => !(x + 1 === y || w + 1 === x || y + 1 === z),
  },
  {
    name: "RYE",
    buy: true,
    desc: "any 3 add to 10 or 11",
    fn: (xs) => combos(xs, 3).map(sum).some((x) => x === 10 || x === 11),
  },
  {
    name: "QUINOA",
    buy: true,
    desc: "all different",
    fn: (xs) => dedupe(xs).length === xs.length,
  },
  {
    name: "SORGHUM",
    buy: true,
    desc: "3 of a kind",
    fn: (xs) => dedupe(xs).length <= 2,
  },
  {
    name: "FARROW",
    buy: true,
    desc: "max - min <= 3",
    fn: ([w, x, y, z]) => z - w <= 3,
  },
  { name: "AMARANTH", buy: true, desc: "no 6s", fn: (xs) => !xs.includes(6) },
  {
    name: "FONIO",
    buy: true,
    desc: "any 3 dice are even",
    fn: (xs) => combos(xs, 3).some((ys) => ys.every((x) => x % 2 === 0)),
  },
  {
    name: "TRITICALE",
    buy: true,
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

function format({ name, desc, fn }) {
  const count = SAMPLE_SPACE.filter(fn).length;
  const FACTOR = 130;
  const prob = parseFloat((FACTOR * count / SAMPLE_SPACE.length).toFixed(2));
  const payout = Math.floor(100 / prob);
  return { name, prob, desc, payout };
}

function formatProbs(data) {
  let table = data
    .filter(({ buy }) => buy)
    .map(format)
    .toSorted((a, b) => b.prob - a.prob)
    .map((row, index) => {
      const costs = [1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 8, 10, 13];
      return {
        ...row,
        points: index,
        cost: costs[index],
      };
    });
  console.table(table, ["points", "cost", "name", "prob", "payout", "desc"]);

  table = data
    .filter(({ buy }) => !buy)
    .map(format);
  console.table(table, ["name", "prob", "desc"]);
}

function simulateGame() {
  const player1 = {};
  const player2 = {};
}

formatProbs(data);
