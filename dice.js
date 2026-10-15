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
  { name: "WINDMILL", desc: "black die is 1", fn: (xs) => true },
  { name: "WINDMILL", desc: "black die is 2", fn: (xs) => true },
  { name: "WINDMILL", desc: "black die is 3", fn: (xs) => true },
  { name: "WINDMILL", desc: "black die is 4", fn: (xs) => true },
  { name: "WINDMILL", desc: "black die is 5", fn: (xs) => true },
  { name: "WINDMILL", desc: "black die is 6", fn: (xs) => true },
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
        group: Math.floor(index / 3) + 1,
        cost: Math.floor(Math.pow(100 / row.prob, 1.75)),
      };
    });

  //console.table(grains, [ "group", "fallow", "cost", "name", "prob", "payout", "desc", ]);

  Deno.writeTextFileSync("printout.html", toHtml(grains));
}

function numToDie(num) {
  switch (num) {
    case 1:
      return "⚀";
    case 2:
      return "⚁";
    case 3:
      return "⚂";
    case 4:
      return "⚃";
    case 5:
      return "⚄";
    case 6:
      return "⚅";
  }
}

function card({ group, fallow, cost, name, prob, payout, desc, buy }) {
  return `<div class="card">
    <h2>${name} <span class="small">($${cost})</span></h2>
    <div class="desc">${desc} → ${payout ? '$' + payout : '1 group X flour'}</div>
    <div class="flex-grow"></div>
    <div class="group">
      <div>${buy ? 'group ' + group : ''}</div>
      ${name === "WINDMILL" ? "" : `<div class="fallow">fallow<span class="die">${numToDie(fallow)}</span></div>`}
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
          page-break-inside: avoid;
          width: calc(100vw / 3);
          display: flex;
          flex-direction: column;
          outline: 1px dashed black;
          padding: 0.5rem;
          box-sizing: border-box;
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
