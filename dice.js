import { combos, dedupe, fib, range, sampleSpace, sum } from "./utils.js";

// CONSTANTS
const DIE = range(6, 1);
const DICE = [DIE, DIE, DIE, DIE];
const SAMPLE_SPACE = sampleSpace(DICE);

const breads = [];

const flour = [32, 16, 10, 2].flatMap((num, grade) =>
  range(num).map((_, index) => ({
    name: "Flour",
    desc: `grade ${grade + 1}`,
    vp: (10 * fib(grade + 1) + (index % 3 * 5)) + "pt",
  }))
);

const fallowCopy = `
<div style="display: flex; flex-direction: column;">
  <span>fallow</span>
  <span style="font-size: 0.75rem">(≥ 4 fields)</span>
</div>

`;

const millet = [
  {
    name: "MILLET",
    fallowCopy,
    desc: "at least one 1",
    buy: true,
    group: 1,
    payout: 1,
    fallow: 6,
  },
  {
    name: "MILLET",
    fallowCopy,
    desc: "at least one 2",
    buy: true,
    group: 1,
    payout: 1,
    fallow: 5,
  },
  {
    name: "MILLET",
    fallowCopy,
    desc: "at least one 3",
    buy: true,
    group: 1,
    payout: 1,
    fallow: 4,
  },
  {
    name: "MILLET",
    fallowCopy,
    desc: "at least one 3",
    desc: "at least one 4",
    buy: true,
    group: 1,
    payout: 1,
    fallow: 3,
  },
  {
    name: "MILLET",
    fallowCopy,
    desc: "at least one 5",
    buy: true,
    group: 1,
    payout: 1,
    fallow: 2,
  },
  {
    name: "MILLET",
    fallowCopy,
    desc: "at least one 6",
    buy: true,
    group: 1,
    payout: 1,
    fallow: 1,
  },
];

const windmill = [
  { name: "WINDMILL", cost: "2/5/8", desc: "black die is 2 or 1" },
  { name: "WINDMILL", cost: "2/5/8", desc: "black die is 3 or 1" },
  { name: "WINDMILL", cost: "2/5/8", desc: "black die is 3 or 2" },
  { name: "WINDMILL", cost: "2/5/8", desc: "black die is 4 or 1" },
  { name: "WINDMILL", cost: "2/5/8", desc: "black die is 4 or 2" },
  { name: "WINDMILL", cost: "2/5/8", desc: "black die is 4 or 3" },
  { name: "WINDMILL", cost: "2/5/8", desc: "black die is 5 or 1" },
  { name: "WINDMILL", cost: "2/5/8", desc: "black die is 5 or 2" },
  { name: "WINDMILL", cost: "2/5/8", desc: "black die is 5 or 3" },
  { name: "WINDMILL", cost: "2/5/8", desc: "black die is 5 or 4" },
  { name: "WINDMILL", cost: "2/5/8", desc: "black die is 6 or 1" },
  { name: "WINDMILL", cost: "2/5/8", desc: "black die is 6 or 2" },
  { name: "WINDMILL", cost: "2/5/8", desc: "black die is 6 or 3" },
  { name: "WINDMILL", cost: "2/5/8", desc: "black die is 6 or 4" },
  { name: "WINDMILL", cost: "2/4/8", desc: "black die is 6 or 5" },
  { name: "GRAIN SILO", cost: "1/2/4", desc: "black die 1" },
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
    name: "KHORASAN",
    buy: true,
    desc: "4 of a kind or 2 sets of 2 of a kind",
    fn: (xs) => dedupe(xs).length < 3,
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
    desc: "any 3 are even",
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
    name: "BULGUR",
    buy: true,
    desc: "any 3 are odd",
    fn: (xs) => combos(xs, 3).some((ys) => ys.every((x) => x % 2 === 1)),
  },
  {
    name: "WILD RICE",
    buy: true,
    desc: "max - min > 3",
    fn: ([w, x, y, z]) => z - w > 3,
  },
  {
    name: "EINKORN",
    buy: true,
    desc: "any 3 add to ≤ 8",
    fn: ([w, x, y, _]) => w + x + y <= 8,
  },
  {
    name: "DURUM",
    buy: true,
    desc: "any 2 add to ≥ 10",
    fn: ([w, x, y, z]) => y + z >= 10,
  },
];

function format({ name, desc, fn, ...rest }) {
  const count = SAMPLE_SPACE.filter(fn).length;
  const FACTOR = 1.3;
  const prob = 100 * count / SAMPLE_SPACE.length;
  const cost = Math.floor(
    Math.pow(100 / parseFloat((FACTOR * prob).toFixed(2)), 1.75),
  );
  const payout = Math.floor(100 / parseFloat((FACTOR * prob).toFixed(2)));
  return { name, prob: prob.toFixed(2), desc, payout, cost, ...rest };
}

function print() {
  let grains = data
    .map(format)
    .toSorted((a, b) => b.prob - a.prob)
    .map((row, index) => {
      const grade = Math.floor(index / 4) + 1;
      return {
        ...row,
        group: grade,
        points: grade * 10,
        fallow: (index % 6) + 1,
        cost: row.cost,
      };
    });

  console.table(grains, ["points", "cost", "name", "prob", "payout", "desc"]);

  Deno.writeTextFileSync("publish/millet.html", toHtml("millet", millet));
  Deno.writeTextFileSync("publish/grains.html", toHtml("grain", grains));
  Deno.writeTextFileSync(
    "publish/windmills.html",
    toHtml("windmills", windmill, { height: "8rem", cols: 2 }),
  );
  Deno.writeTextFileSync(
    "publish/flour.html",
    toHtml("flour", flour, { cols: 6, height: "6rem" }),
  );
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

function cardFront(
  { group, fallowCopy, fallow, cost, name, payout, desc, buy, points },
) {
  return `<div class="card card-front">
    <h2><span class="small">${
    points ? points + "pt" : ""
  }</span> ${name} <span class="small">${cost ? `$${cost}` : ""}</span></h2>
    <div class="desc">${desc} ${
    payout ? `→ ${payout ? "$" + payout : "1 grade x flour"}` : ""
  }</div>
    <div class="group">
      <div>${buy ? "grade " + group : ""}</div>
      ${
    fallow
      ? `<div class="fallow">${fallowCopy ?? "fallow"} ${
        numToDie(fallow)
      }</div>`
      : ""
  }
    </div>
  </div>`;
}

function cardBack(
  { group, fallow, cost, name, payout, desc, buy, vp, points },
) {
  return `<div class="card card-back">
    ${vp ? `<div class="desc">${vp}</div>` : ""}
    ${
    fallow
      ? `<h2>
      <span class="small">${points ? (points - 5) + "pt" : ""}</span>
      <span style="text-align: center;">FALLOW ${name}</span>
      <span></span>
      </h2>
      <div class="group">
      <div></div>
      <div class="fallow">unfallow ${numToDie(fallow)}</div>
    </div>`
      : ""
  }
  </div>`;
}

function toHtml(title, data, opts = {}) {
  const cols = opts.cols ?? 3;
  const height = opts.height ?? "10rem";
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
          justify-content: space-between;
          gap: 0.25rem;
       }
       body { font-family: helvetica; }
       .page { display: flex; flex-wrap: wrap; align-content: flex-start; break-inside: avoid-page; min-height: 100vh; }
       .page-back { flex-direction: row-reverse; }
       .header { display: flex; justify-content: space-between; }
       .card {
          break-inside: avoid-page;
          height: ${height};
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          outline: 1px dashed black;
          padding: 0.75rem 0.5rem 0 0.5rem;
          box-sizing: border-box;
          width: calc(100vw / ${cols});
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
          gap: 0.25rem;
        }
       .die { font-size: 4rem; }
      </style>
      <title>${title}</title>
    </head>
    <body>
    <div class="page page-front">${data.map(cardFront).join("")}</div>
    <div class="page page-back">${data.map(cardBack).join("")}</div>
    </body>
    </html>
  `.trim());
}

print();
