import { createPitch } from "./factory";
import { Pitch } from "./pitch";
import { createInterval } from "./interval/factory";

describe("PitchMethods", () => {
  describe("isEqualTo(other)", () => {
    const testPitches: Pitch[] = [
      createPitch({ midiNoteNumber: 36, assumedAccidental: 1 }),
      createPitch({ midiNoteNumber: 40, assumedAccidental: 2 }),
      createPitch({ midiNoteNumber: 60, assumedAccidental: 0 }),
      createPitch({ midiNoteNumber: 61, assumedAccidental: 1 }),
      createPitch({ midiNoteNumber: 61, assumedAccidental: -1 }),
      createPitch({ midiNoteNumber: 100, assumedAccidental: 0 }),
    ];
    it("Test against others and self", () => {
      testPitches.forEach((a, aIndex) => {
        testPitches.forEach((b, bIndex) => {
          expect(a.isEqualTo(b, false)).toEqual(aIndex === bIndex);
          expect(a.isEqualTo(b, true)).toEqual(aIndex === bIndex);
        });
      });
    });
    const sameInDifferentOctaves: Pitch[] = [
      createPitch({ midiNoteNumber: 40, assumedAccidental: 0 }),
      createPitch({ midiNoteNumber: 52, assumedAccidental: 0 }),
      createPitch({ midiNoteNumber: 64, assumedAccidental: 0 }),
      createPitch({ midiNoteNumber: 76, assumedAccidental: 0 }),
      createPitch({ midiNoteNumber: 88, assumedAccidental: 0 }),
    ];
    it("Test against others and self in different octaves", () => {
      sameInDifferentOctaves.forEach((a, aIndex) => {
        sameInDifferentOctaves.forEach((b, bIndex) => {
          expect(a.isEqualTo(b, false)).toEqual(aIndex === bIndex);
          expect(a.isEqualTo(b, true)).toBeTrue();
        });
      });
    });
  });

  describe("isEnharmonicEquivalentOf(other)", () => {
    const validAccidentalsMapped = [
      [-2, 0, 1, 3],
      [-3, -1, 1, 2],
      [-3, -2, 0, 2, 3],
      [-2, -1, 1, 3],
      [-3, -1, 0, 2],
      [-2, 0, 1, 3],
      [-3, -1, 1, 2],
      [-2, 0, 2, 3],
      [-3, -1, 1, 3],
      [-3, -2, 0, 2],
      [-2, -1, 1],
      [-3, -1, 0, 2],
    ];

    validAccidentalsMapped.forEach((validAccidentals, partialNoteNum) => {
      [-1, 0, 1].forEach((relativeOctave) => {
        const midiNoteNumber = 60 + 12 * relativeOctave + partialNoteNum;
        describe(`with MIDI Note number ${midiNoteNumber}`, () => {
          validAccidentals.forEach((accidentalA) => {
            validAccidentals.forEach((accidentalB) => {
              describe(`Comparing accidentals ${accidentalA} and ${accidentalB}`, () => {
                it("should be enharmonically equivalent", () => {
                  const pitchA = createPitch({
                    midiNoteNumber,
                    assumedAccidental: accidentalA,
                  });
                  const pitchB = createPitch({
                    midiNoteNumber,
                    assumedAccidental: accidentalB,
                  });

                  expect(pitchA.isEnharmonicEquivalentOf(pitchB)).toBeTrue();
                  expect(pitchB.isEnharmonicEquivalentOf(pitchA)).toBeTrue();
                  expect(
                    pitchA.isEnharmonicEquivalentOf(pitchB, false)
                  ).toBeTrue();
                  expect(
                    pitchB.isEnharmonicEquivalentOf(pitchA, false)
                  ).toBeTrue();
                  expect(
                    pitchA.isEnharmonicEquivalentOf(pitchB, true)
                  ).toBeTrue();
                  expect(
                    pitchB.isEnharmonicEquivalentOf(pitchA, true)
                  ).toBeTrue();
                });
                it("should not be enharmonically equivalent (different note)", () => {
                  [-2, -1, 1, 2].forEach((noteShift) => {
                    const shiftedNoteNumber = midiNoteNumber + noteShift;
                    const assumedAccidental =
                      validAccidentalsMapped[shiftedNoteNumber % 12][2];
                    const pitchA = createPitch({
                      midiNoteNumber,
                      assumedAccidental: accidentalA,
                    });
                    const pitchB = createPitch({
                      midiNoteNumber: shiftedNoteNumber,
                      assumedAccidental,
                    });

                    expect(pitchA.isEnharmonicEquivalentOf(pitchB)).toBeFalse();
                    expect(pitchB.isEnharmonicEquivalentOf(pitchA)).toBeFalse();
                    expect(
                      pitchA.isEnharmonicEquivalentOf(pitchB, false)
                    ).toBeFalse();
                    expect(
                      pitchB.isEnharmonicEquivalentOf(pitchA, false)
                    ).toBeFalse();
                    expect(
                      pitchA.isEnharmonicEquivalentOf(pitchB, true)
                    ).toBeFalse();
                    expect(
                      pitchB.isEnharmonicEquivalentOf(pitchA, true)
                    ).toBeFalse();
                  });
                });
                it("in different octaves", () => {
                  [-2, -1, 1, 2].forEach((octaveShift) => {
                    const pitchA = createPitch({
                      midiNoteNumber,
                      assumedAccidental: accidentalA,
                    });
                    const pitchB = createPitch({
                      midiNoteNumber: midiNoteNumber + 12 * octaveShift,
                      assumedAccidental: accidentalB,
                    });
                    expect(pitchA.isEnharmonicEquivalentOf(pitchB)).toBeFalse();
                    expect(pitchB.isEnharmonicEquivalentOf(pitchA)).toBeFalse();
                    expect(
                      pitchA.isEnharmonicEquivalentOf(pitchB, false)
                    ).toBeFalse();
                    expect(
                      pitchB.isEnharmonicEquivalentOf(pitchA, false)
                    ).toBeFalse();
                    expect(
                      pitchA.isEnharmonicEquivalentOf(pitchB, true)
                    ).toBeTrue();
                    expect(
                      pitchB.isEnharmonicEquivalentOf(pitchA, true)
                    ).toBeTrue();
                  });
                });
              });
            });
          });
        });
      });
    });
  });

  describe("natural()", () => {
    for (let midiNoteNumber = 54; midiNoteNumber <= 78; midiNoteNumber += 1) {
      let trueNatural: Pitch;
      try {
        trueNatural = createPitch({ midiNoteNumber, assumedAccidental: 0 });
      } catch (e) {
        continue;
      }
      [-3, -2, -1, 0, 1, 2, 3].forEach((assumedAccidental) => {
        const testPitch = createPitch({
          circlePosition: trueNatural.circlePosition - 7 * assumedAccidental,
          octave: trueNatural.octave,
        });
        const natural = testPitch.natural();
        describe(`${testPitch.naturalName()} accidentals ${assumedAccidental}`, () => {
          it("Should be correct natural", () => {
            expect(natural.accidentals()).toEqual(0);
            expect(natural.naturalName()).toEqual(trueNatural.naturalName());
            expect(natural.midiNoteNumber()).toEqual(
              trueNatural.midiNoteNumber()
            );
          });
        });
      });
    }
  });

  const testPitches: Pitch[] = [];
  for (let midiNoteNumber = 54; midiNoteNumber <= 78; midiNoteNumber += 1) {
    [-2, -1, 0, 1, 2].forEach((assumedAccidental) => {
      let pitch: Pitch;
      try {
        pitch = createPitch({ midiNoteNumber, assumedAccidental });
      } catch (e) {
        return;
      }
      testPitches.push(pitch);
    });
  }

  describe("transposedBy()", () => {
    testPitches.forEach((startPitch) => {
      it(`${startPitch.naturalName()} ${startPitch.accidentals()} ${
        startPitch.octave
      }`, () => {
        expect(
          startPitch
            .transposedBy(createInterval({ perfect: "unison" }))
            .isEqualTo(startPitch)
        ).toBeTrue();
        expect(
          startPitch
            .transposedBy(createInterval({ augmented: "unison" }))
            .isEqualTo(startPitch)
        ).toBeFalse();
        expect(
          startPitch
            .transposedBy(createInterval({ augmented: "unison" }))
            .natural()
            .isEqualTo(startPitch.natural())
        ).toBeTrue();
        expect(
          startPitch
            .transposedBy(createInterval({ augmented: "unison" }))
            .isEnharmonicEquivalentOf(startPitch)
        ).toBeFalse();

        expect(
          startPitch
            .transposedBy(
              createInterval({ minor: "third" }),
              createInterval({ augmented: "second" })
            )
            .isEqualTo(startPitch)
        ).toBeFalse();
        expect(
          startPitch
            .transposedBy(
              createInterval({ minor: "third" }),
              createInterval({ augmented: "second", direction: -1 })
            )
            .isEnharmonicEquivalentOf(startPitch)
        ).toBeTrue();

        expect(
          startPitch
            .transposedBy(
              createInterval({ major: "third" }),
              createInterval({ major: "third" }),
              createInterval({ augmented: "fifth", direction: -1 })
            )
            .isEqualTo(startPitch)
        ).toBeTrue();
        expect(
          startPitch
            .transposedBy(
              createInterval({ major: "third" }),
              createInterval({ perfect: "fifth", direction: -1 }),
              createInterval({ minor: "third" })
            )
            .isEqualTo(startPitch)
        ).toBeTrue();
        expect(
          startPitch
            .transposedBy(
              createInterval({ major: "third" }),
              createInterval({ perfect: "fifth", direction: -1 }),
              createInterval({ augmented: "second" })
            )
            .isEqualTo(startPitch)
        ).toBeFalse();
        expect(
          startPitch
            .transposedBy(
              createInterval({ major: "third" }),
              createInterval({ perfect: "fifth", direction: -1 }),
              createInterval({ augmented: "second" })
            )
            .isEnharmonicEquivalentOf(startPitch)
        ).toBeTrue();

        expect(
          startPitch
            .transposedBy(
              createInterval({ minor: "third" }),
              createInterval({ minor: "third" }),
              createInterval({ minor: "third" }),
              createInterval({ minor: "third" })
            )
            .isEqualTo(startPitch, false)
        ).toBeFalse();
        expect(
          startPitch
            .transposedBy(
              createInterval({ minor: "third" }),
              createInterval({ minor: "third" }),
              createInterval({ minor: "third" }),
              createInterval({ minor: "third" })
            )
            .isEqualTo(startPitch, true)
        ).toBeFalse();
        expect(
          startPitch
            .transposedBy(
              createInterval({ minor: "third" }),
              createInterval({ minor: "third" }),
              createInterval({ minor: "third" }),
              createInterval({ minor: "third" })
            )
            .isEnharmonicEquivalentOf(startPitch, true)
        ).toBeTrue();
        expect(
          startPitch
            .transposedBy(
              createInterval({ minor: "third" }),
              createInterval({ minor: "third" }),
              createInterval({ minor: "third" }),
              createInterval({ minor: "third" }),
              createInterval({ perfect: "octave", direction: -1 })
            )
            .isEnharmonicEquivalentOf(startPitch)
        ).toBeTrue();

        expect(
          startPitch
            .transposedBy(
              createInterval({ minor: "third", octaveShift: 3 }),
              createInterval({ major: "sixth", octaveShift: 4, direction: -1 }),
              createInterval({
                perfect: "octave",
                octaveShift: -2,
                direction: -1,
              }),
              createInterval({ major: "sixth", octaveShift: 5 }),
              createInterval({ perfect: "octave", octaveShift: -3 }),
              createInterval({ minor: "third", octaveShift: 3, direction: -1 })
            )
            .isEqualTo(startPitch)
        ).toBeTrue();
      });
    });
  });
});
