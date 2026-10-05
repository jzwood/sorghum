
function range(x, y = 0) {
  return Array(x).fill(0).map((_, i) => y + i)
}

const die = range(6, 1)
const dice = [die, die, die, die]


function allRolls(dice) {
  const [head, ...tail] = dice
  if (head == null) return []
  if (tail.length === 0) return head.map(x => [x])
  return head.flatMap(pip => allRolls(tail).map(pips => [pip, ...pips]))
}

const x = allRolls(dice)
