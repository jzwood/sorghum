# Title

Sorghum

# Story

You don't plan on staying a humble millet farmer forever. You have big dreams:
spelt, duram, khorasan. Maybe you'll buy a windmill and make your own flour?
That sounds nice. Unfortunately your competition all have the same idea and
there's only so much farmland to go around.

# How to Win

Purchase grain fields and windmills, produce then mill grain into flour. Fields,
grain, and flour all get you points. Once all grain fields have been purchased,
the player with the most victory points wins.

# Setup

### Pieces

- X millet cards
- X grain cards
- X windmill cards
- 3 white D6s
- 1 black D6 (mill die)
- pennies (or anything else you want to use for game money)

### Board

1. Arrange grain cards face up in 4 rows, lowest grade on the bottom, highest
   grade on the top:

```
grade 4 fields: [] []
grade 3 fields: [] [] []
grade 2 fields: [] [] [] [] []
grade 1 fields: [] [] [] [] [] [] [] []
```

2. Arrange grain cards in 4 piles by grade, grain side up.

```
grade 4 grain: []
grade 3 grain: []
grade 2 grain: []
grade 1 grain: []
```

3. Shuffle windmills in a single pile, face up.

```
windmills: []
```

4. deal each player a random millet card. Put the remaining millet fields away.

# Rules

1. Highest D6 roll goes first.
2. Turns consist of 4 phases performed sequentially: Buy, Harvest, Mill,
   (Un)Fallow. The Buy phase is only available to the active player but the
   Harvest, Mill, and (Un)Fallow phases apply to everyone and may be performed
   concurrently.

### Buy:

During the buy phase the active player may either purchase 1 grain card or 1
windmill. Grain cards have a flat cost next to their title, e.g. `SPELT ($1)`.
Windmills have a progressive cost: the 1st cost $2, the 2nd cost $5, and the 3rd
cost $8. You may not buy more than 3 windmills.

### Harvest:

The active player rolls all four D6s. All players resolve harvest actions for
their purchased fields. For each non-fallow field, check to see if the condition
on the field matches the 4 dice. If so, gain the money from the bank indicated
on the card. If the field does not already have a partially-tucked grain card,
partially-tuck a grain card with the indicated grade behind the field card.

### Mill:

If the black die (aka the Mill Die) matches any player's purchased windmill,
that player may move any 1 partially-tucked grain from one of their fields to
the corresponding windmill.

### (Un)Fallow:

For each field, for every player, if any of the four D6 matches the fallow/unfallow condition, flip the
field card over.

# End of Game

Once every field has been purchased the game ends.

# Scoring
1. Flour: Turn over and sum all flour card points.
2. Grain: Sum all partially-tucked grain card points.
3. Fields: Sum all field points.

The player with the most victory points wins.

## Appendix

#### WHEAT

> exactly 2 of a kind

2 dice must have the same number of pips. 3 or 4 of a kind do not count.

✅ 1, 3, 3, 4

❌ 4, 4, 4, 5

#### BUCKWHEAT

> run of 3

3 dice can be arranged in ascending order, incrementing by 1. e,g, 1, 2, 3.

✅ 1, 2, 3, 6

❌ 1, 2, 4, 5

#### SPELT

> any 2 add to 7

Any 2 dice can be summed to make 7.

✅ 2, 3, 4, 6

❌ 3, 5, 5, 6

#### OATS

> w + x = y + z

You can group dice into 2 groups of 2 such that the sum of the pips of each group is the same.

✅ 3, 4, 5, 6

❌ 1, 3, 5, 6

#### BARLEY

> all dice > 2

All dice have 3 or more pips.

✅ 3, 4, 5, 5

❌ 1, 5, 5, 6

#### TEFF

> no die is 1 larger than another

No die is exactly 1 pip bigger or smaller than any other.

✅ 1, 1, 3, 6

❌ 1, 3, 5, 6

#### RYE

> any 3 add to 10 or 11

The sum of any 3 dice is 10 or 11

✅ 1, 3, 5, 6

❌ 1, 2, 5, 6

#### QUINOA

> all different

No 2 dice are the same

✅ 1, 2, 4, 6

❌ 2, 3, 4, 4

##### SORGHUM

> 3 of a kind

3 dice must have the same number of pips. 2 or 4 of a kind do not count.

✅ 5, 5, 5, 6

❌ 1, 1, 2, 2

#### KHORASAN

> 4 of a kind or 2 sets of 2 of a kind

4 dice must have the same number of pips OR 2 groups of two must have have the same number of pipe.

✅ 6, 6, 6, 6

✅ 1, 1, 5, 5

❌ 1, 1, 1, 2


    name: "FARRO",
    desc: "max - min ≤ 3",
    fn: ([w, x, y, z]) => z - w <= 3,
  },
  { name: "AMARANTH", desc: "no 6s", fn: (xs) => !xs.includes(6) },
  {
    name: "FONIO",
    desc: "any 3 are even",
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
    name: "BULGUR",
    desc: "any 3 are odd",
    fn: (xs) => combos(xs, 3).some((ys) => ys.every((x) => x % 2 === 1)),
  },
  {
    name: "WILD RICE",
    desc: "max - min ≥ 4",
    fn: ([w, x, y, z]) => z - w >= 4,
  },
  {
    name: "EINKORN",
    desc: "any 3 add to ≤ 8",
    fn: ([w, x, y, _]) => w + x + y <= 8,
  },
  {
    name: "DURUM",
    desc: "any 2 add to ≥ 10",
    fn: ([w, x, y, z]) => y + z >= 10,
  },
