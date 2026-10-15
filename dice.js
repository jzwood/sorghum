import { combos, dedupe, range, sampleSpace, sum } from "./utils.js";

// CONSTANTS
const DIE = range(6, 1);
const DICE = [DIE, DIE, DIE, DIE];
const SAMPLE_SPACE = sampleSpace(DICE);

const starting = [
  { name: "MILLET", desc: "at least one 1", fn: (xs) => xs.includes(1) },
  { name: "MILLET", desc: "at least one 2", fn: (xs) => xs.includes(2) },
  { name: "MILLET", desc: "at least one 3", fn: (xs) => xs.includes(3) },
  { name: "MILLET", desc: "at least one 4", fn: (xs) => xs.includes(4) },
  { name: "MILLET", desc: "at least one 5", fn: (xs) => xs.includes(5) },
  { name: "MILLET", desc: "at least one 6", fn: (xs) => xs.includes(6) },
  { name: "WINDMILL", desc: "black die is 1", fn: (xs) => true },
  { name: "WINDMILL", desc: "black die is 2", fn: (xs) => true },
  { name: "WINDMILL", desc: "black die is 3", fn: (xs) => true },
  { name: "WINDMILL", desc: "black die is 4", fn: (xs) => true },
  { name: "WINDMILL", desc: "black die is 5", fn: (xs) => true },
  { name: "WINDMILL", desc: "black die is 6", fn: (xs) => true },
];

const data = [
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
    desc: "max - min ≤ 3",
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
];

function format({ name, desc, fn, ...rest }) {
  const count = SAMPLE_SPACE.filter(fn).length;
  const FACTOR = 130;
  const prob = parseFloat((FACTOR * count / SAMPLE_SPACE.length).toFixed(2));
  const payout = Math.floor(100 / prob);
  return { name, prob, desc, payout, ...rest };
}

function formatProbs(data) {
  let table = data
    .map(format)
    .toSorted((a, b) => b.prob - a.prob);

  const grains = table
    .map((row, index) => {
      return {
        ...row,
        fallow: (index % 6) + 1,
        group: Math.floor(index / 4) + 1,
        cost: Math.floor(Math.pow(100 / row.prob, 1.75)),
      };
    });

  //console.table(grains, [ "group", "fallow", "cost", "name", "prob", "payout", "desc", ]);

  Deno.writeTextFileSync("printout.html", toHtml(grains));
}

function numToDie(num) {
  const wrap = (char) => `<span class="die">${char}</span>`;
  switch (num) {
    case 1:
      return wrap("⚀");
    case 2:
      return wrap("⚁");
    case 3:
      return wrap("⚂");
    case 4:
      return wrap("⚃");
    case 5:
      return wrap("⚄");
    case 6:
      return wrap("⚅");
  }
}

function card({ group, fallow, cost, name, prob, payout, desc, buy }) {
  return `<div class="card">
    <h2>${name} <span class="small">($${cost})</span></h2>
    <div class="desc">${desc} → ${
    payout ? "$" + payout : "1 group X flour"
  }</div>
    <div class="group">
      <div>${buy ? "grade " + group : ""}</div>
      ${
    name === "WINDMILL"
      ? ""
      : `<div class="fallow">fallow ${numToDie(fallow)}</div>`
  }
    </div>
  </div>`;
}

function toHtml(data) {
  return (`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
       * { margin: 0; padding: 0; border: 0; }
       .flex-grow { flex-grow: 1; }
       .small { font-size: 1rem; font-weight: normal; color: gray; }
       h2 {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
       }
       body { font-family: helvetica; display: flex; flex-wrap: wrap; }
       .header { display: flex; justify-content: space-between; }
       .card {
          break-inside: avoid-page;
          height: 10rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          outline: 1px dashed black;
          padding: 0.75rem 0.5rem 0 0.5rem;
          box-sizing: border-box;
          width: calc(100vw / 3);
        }
       .desc { text-align: center; font-size: 1.5rem; }
       .group {
          font-size: 1.2rem;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: space-between;
       }
       .fallow {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
       .die { font-size: 4rem; }
      </style>
      <title>prinout</title>
    </head>
    <body>
    ${data.map(card).join("")}
    </body>
    </html>
  `.trim());
}

formatProbs(data);
