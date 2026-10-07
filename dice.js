const dedupe = (xs) => {
  if (xs.length <= 1) return xs
  return xs.slice(0, 1).concat(dedupe(xs.slice(1).filter((x) => x !== xs[0])))
}

function range(x, y = 0) {
  return Array(x).fill(0).map((_, i) => y + i)
}

const DIE = range(6, 1)
const DICE = [DIE, DIE, DIE, DIE]
const ALL_ROLLS = allRolls(DICE)
const TOTAL = ALL_ROLLS.length

function allRolls(dice) {
  const [head, ...tail] = dice
  if (head == null) return []
  if (tail.length === 0) return head.map(x => [x])
  return head
    .flatMap(pip => allRolls(tail).map(pips => [pip, ...pips]))
    .map(pips => pips.toSorted((a, b) => a - b))
}

function prob(grain, desc, fxn) {
  const count = ALL_ROLLS.filter(fxn).length
  const p = parseFloat((100 * count / TOTAL).toFixed(2))
  return {prob: p, grain, desc}
}

const data = [
  prob("FONIO", "at least one 3", (xs) => xs.includes(3)),
  prob("WHEAT", "2 of a kind", (xs) => dedupe(xs).length < xs.length),
  prob("BUCKWHEAT", "x, x+1, x+2", ([w, x, y, z]) => (x + 1 === y) && (w+1 === x || y + 1 === z)),
  prob("SPELT", "x + y = 7", ([w, x, y, z]) => [w + x, w + y, w + z, x + y, w + z, y + z].some(num => num === 7)),
  prob("OATS", "w + x = y + z", ([w, x, y, z]) => w + x === y + z || w + y === x + z || w + z === x + y),
  prob("BARLEY", "no 1 or 6", (xs) => !xs.includes(1) && !xs.includes(6)),
  prob("TEFF", "x /= x+1", ([w, x, y, z]) => !(x + 1 === y || w+1 === x || y + 1 === z)),
  prob("RYE", "x+y+z = 10 or 11", ([w, x, y, z]) => [w + x + y, x + y + z, y + z + w, w + y + z].some(x => x === 10 || x === 11)),
  prob("QUINOA", "all different", (xs) => dedupe(xs).length === xs.length),
  prob("SORGHUM", "3 of a kind", (xs) => dedupe(xs).length <= 2)
]
  .toSorted((a, b) => b.prob - a.prob)
  .map((x, i) =>  ({...x, points: i + 1}))
  .map((x) => ({...x, payout: 1}))

console.table(data, ["points", "grain", "prob", "payout", "desc"])

