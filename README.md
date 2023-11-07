# Twelve Tones

JavaScript (TypeScript) utilities for working with musical pitches and durations in the 12 tone system.

## Pitches

### Creating a Pitch object

```javascript
import { pitch } from "twelve-tones";

const bFlat = pitch("B", "♭", 4);
```

### Learning more about a Pitch

```javascript
import { pitch, pitchName } from "twelve-tones";

const bFlat = pitch("B", "♭", 4);
pitchName(bFlat); // => 'B♭4'

// or:
`I like ${bFlat}.`; // => 'I like B♭4.'
```

```javascript
import { pitch, midiNoteNumber } from "twelve-tones";

const bFlat = pitch("B", "♭", 4);
midiNoteNumber(bFlat); // => 70
```

```javascript
import {
  pitch,
  isSamePitch,
  isEnharmonicEquivalent,
  numberOfAccidentals,
} from "twelve-tones";

const bFlat = pitch("B", "♭", 4);
const aSharp = pitch("A", "♯", 4);

isSamePitch(bFlat, aSharp); // => false

isEnharmonicEquivalent(bFlat, aSharp); // => true

numberOfAccidentals(bFlat); // => -1
numberOfAccidentals(aSharp); // => 1
```

### Transform a Pitch

```javascript
import { natural, transpose, interval } from "twelve-tones";

const bNatural = natural(bFlat);
numberOfAccidentals(bNatural); // => 0

`I like ${bNatural}.`; // => 'I like B4.'

const eFlat = transpose(bFlat, interval("perfect", "fourth")); // see 'Intervals'
```

## Intervals

### Creating an Interval object

```javascript
import { interval } from "twelve-tones";

// full notation
const majorThird = interval("major", "third");
const perfectFifth = interval("perfect", "fifth");
const diminishedSeventh = interval("diminished", "seventh");

// compact notation
const minorSecond = interval("m", "2");
const majorSixth = interval("M", "6");
const perfectFourth = interval("P", "4");
const augmentedThird = interval("A", "3");
```

### Learning more about an Interval

```javascript
import { intervalName } from "twelve-tones";

intervalName(interval("minor", "second")); // => 'minor second'
intervalName(["m", "2"]); // => 'minor second'

const P8 = interval("perfect", "octave");
`A ${P8} is a big jump.`; // => 'A perfect octave is a big jump.'
```

```javascript
import { interval, isSameInterval } from "twelve-tones";

const perfectFourth = interval("perfect", "fourth");
const diminishedFifth = interval("diminished", "fifth");

isSameInterval(perfectFourth, diminishedFifth); // => false
isSameInterval(perfectFourth, interval("P", 4)); // => true
```

```javascript
import { interval, quality } from "twelve-tones";

quality(interval("P", "8")); // => 'perfect'
quality(interval("M", "3")); // => 'major'
quality(interval("m", "6")); // => 'minor'

quality(interval("diminished", "fourth")); // => -1
quality(interval("A", 2)); // => 1
```

### Advanced quality factors

The quality factor of a diminished or augmented chord can be specified into unreasonably high values:

```javascript
import { interval, quality } from "twelve-tones";

const triplyDiminishedFifth = interval([-3, "fifth"]);
const octuplyAugmentedThird = interval([+8, "third"]);

quality(triplyDiminishedFifth); // => -3
quality(octuplyAugmentedThird); // => 8
```

### Transposing pitches

```javascript
import { pitch, interval } from "twelve-tones";

const fNatural = pitch("F", "♮", 4);
const perfectFifth = interval("perfect", "fifth");
transpose(fNatural, perfectFifth); // => C♮5 (Pitch object)
transpose(fNatural, perfectFifth, "down"); // => B♭4 (Pitch object)

// shorthand notation
transpose(["C", "♮", 3], ["M", "3"], "down"); // => A♭2
```

By default, transpositions are applied in the _up_ direction. To transpose _down_, provide `'down'` or `-1` as a third parameter to `transpose`.

## Shorthand notation

Allows for compact, inline creation of pitches and intervals.

```javascript
import { numberOfAccidentals, natural, transpose } from "twelve-tones";

numberOfAccidentals(["F", "♯♯", 5]); // => 2

natural(["A", "♭♭", 3]); // => A3

const eFlat = transpose(["C", "♮", 4], ["minor", "third"]);
eFlat.toString(); // => E♭4
```

## Behind the scenes

The properties on the `Pitch` and `Interval` objects may be confusing.

The easiest way to use `twelve-tones` is to ignore these properties,
and use the utiliy functions as described above, such as `pitchName`, `interval`, `isSamePitch`, etc.

But in case you are interested, here's what the properties represent.

### Pitch object structure

A `Pitch` object is a reference to a specific position on the _[Circle of Fifths](https://en.wikipedia.org/wiki/Circle_of_fifths)_, along with an absolute `octave` number.

The `circlePosition` property of a Pitch refers to:

| … | -3     | -2     | -1     | 0         | 1         | 2         | 3         | 4         | 5         | 6       | 7       | 8   | … |
| - | ------ | ------ | ------ | --------- | --------- | --------- | --------- | --------- | --------- | ------- | ------- | --- | - |
| … | A flat | E flat | B flat | **C natural** | G natural | D natural | A natural | E natural | B natural | F sharp | C sharp | G sharp | … |

expanding infinitely in both directions.

```javascript
import { pitch } from "twelve-tones";

pitch('A', '♮', 4).circlePosition; // => 3
pitch('A', '♮', 4).octave; // => 4

pitch('A', '♭', 7).circlePosition; // => -3
pitch('A', '♭', 7).octave; // => 7
```

### Interval object structure

An `Interval` object describes how to jump around on the _Circle of Fifths_ in order to transpose a note by a certain amount.

For example:

* a `major second` can be described as: move 2 steps to the right
* a `perfect fourth` can be described as: move 1 step to the left

```javascript
import { interval } from "twelve-tones";

interval('major', 'second').circleShift; // => 2
interval('perfect', 'fourth').circleShift; // => -1
```

Additionally, an `Interval` can span multiple octaves, hence the `octaveShift` property.

* a `perfect fifth` requires 1 steps along the circle, but no octave jumps
* a `perfect octave` requires no steps along the circle, but 1 octave jump

```javascript
import { interval } from "twelve-tones";

interval('perfect', 'fifth'); // => { circleShift: 1, octaveShift: 0 }
interval('perfect', 'octave'); // => { circleShift: 0, octaveShift: 1 }
```
