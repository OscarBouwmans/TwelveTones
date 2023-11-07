# Twelve Tones

JavaScript (TypeScript) utilities for working with musical pitches and durations in the 12 tone system.

## Pitches

### Creating a Pitch object

```javascript
    import { pitch } from 'twelve-tones';
    
    const bFlat = pitch('B', '♭', 4);
```

### Learn more about a Pitch

```javascript
    `I like ${bFlat}.` // => 'I like B♭4.'
```

```javascript
    import { midiNoteNumber } from 'twelve-tones';

    midiNoteNumber(bFlat); // => 70
```

```javascript
    import { isSamePitch, isEnharmonicEquivalent, numberOfAccidentals } from 'twelve-tones';

    const bFlat = pitch('B', '♭', 4);
    const aSharp = pitch('A', '♯', 4);

    isSamePitch(bFlat, aSharp); // => false

    isEnharmonicEquivalent(bFlat, aSharp); // => true

    numberOfAccidentals(bFlat); // => -1
    numberOfAccidentals(aSharp); // => 1
```

### Transform a Pitch

```javascript
    import { natural, transpose, interval } from 'twelve-tones';

    const bNatural = natural(bFlat);
    numberOfAccidentals(bNatural); // => 0

    `I like ${bNatural}.` // => 'I like B4.'

    const eFlat = transpose(bFlat, interval('perfect', 'fourth')); // see 'Intervals'
```

## Intervals

### Creating an Interval object

```javascript
    import { interval } from 'twelve-tones';

    // full notation
    const majorThird = interval('major', 'third');
    const perfectFifth = interval('perfect', 'fifth');
    const diminishedSeventh = interval('diminished', 'seventh');

    // compact notation
    const minorSecond = interval('m', '2');
    const majorSixth = interval('M', '6');
    const perfectFourth = interval('P', '4');
    const augmentedThird = interval('A', '3');

    minorSecond.toString(); // => 'minor second'
    majorSixth.toString(); // => 'major sixth'
    // etc.
```

### Advanced quality factors

The quality factor of a diminished or augmented chord can be specified into unreasonably high values:

```javascript
    const triplyDiminishedFifth = interval([-3, 'fifth']);
    const octuplyAugmentedThird = interval([+8, 'third']);
```

### Transposing pitches

```javascript
    import { pitch, interval } from 'twelve-tones';

    const fNatural = pitch('F', '♮', 4);
    const perfectFifth = interval('perfect', 'fifth');
    transpose(fNatural, perfectFifth); // => C♮5 (Pitch object)
    transpose(fNatural, perfectFifth, 'down'); // => B♭4 (Pitch object)

    // shorthand notation
    transpose(['C', '♮', 3], ['M', '3'], 'down'); // => A♭2
```

By default, transpositions are applied in the _up_ direction. To transpose _down_, provide `'down'` or `-1` as a third parameter to `transpose`.

## Shorthand notation

Allows for compact, inline creation of pitches and intervals.

```javascript
    import { numberOfAccidentals, natural, transpose } from 'twelve-tones';

    numberOfAccidentals(['F', '♯♯', 5]); // => 2

    natural(['A', '♭♭', 3]); // => A3

    const eFlat = transpose(['C', '♮', 4], ['minor', 'third']);
    eFlat.toString(); // => E♭4
```
