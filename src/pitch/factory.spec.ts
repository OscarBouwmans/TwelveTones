import { createPitch } from "./factory";
import { invalidAssumedAccidental, noPitchData } from "./errors";
import { normalizedModulo } from "../utilities";
import { Pitch } from "./pitch";

describe("Pitch Factory:", () => {
  describe("no data given", () => {
    it("should throw", () => {
      expect(() => {
        createPitch(null as any);
      }).toThrowError(noPitchData);
    });
  });

  for (let naturalPosition = -1; naturalPosition < 6; naturalPosition += 1) {
    const naturalName =
      naturalPosition === -1
        ? "F"
        : ["C", "G", "D", "A", "E", "B"][naturalPosition];
    describe(`${naturalName}`, () => {
      for (let accidentals = -3; accidentals <= 3; accidentals += 1) {
        describe(`with ${accidentals} accidentals`, () => {
          const circlePosition = naturalPosition + 7 * accidentals;
          for (let octave = -2; octave < 10; octave += 1) {
            describe(`in octave ${octave}:`, () => {
              const pitch = createPitch({ circlePosition, octave });
              it(`naturalName`, () => {
                expect(pitch.naturalName()).toEqual(naturalName);
              });
              it(`accidentals`, () => {
                expect(pitch.accidentals()).toEqual(accidentals);
              });
            });
          }
        });
      }
    });
  }

  for (let midiNoteNumber = -12; midiNoteNumber <= 140; midiNoteNumber += 1) {
    describe(`MIDI Note ${midiNoteNumber}`, () => {
      for (
        let assumedAccidental = -3;
        assumedAccidental <= 3;
        assumedAccidental += 1
      ) {
        describe(`with ${assumedAccidental} assumedAccidentals`, () => {
          const naturalSemitonePos = normalizedModulo(
            midiNoteNumber - assumedAccidental,
            12
          );
          const shouldError = new Set([1, 3, 6, 8, 10]).has(naturalSemitonePos);
          if (shouldError) {
            it("should throw", () => {
              expect(() => {
                createPitch({ midiNoteNumber, assumedAccidental });
              }).toThrowError(invalidAssumedAccidental);
            });
          } else {
            it("should equal self", () => {
              const pitch = createPitch({ midiNoteNumber, assumedAccidental });
              expect(pitch.midiNoteNumber()).toEqual(midiNoteNumber);
            });
          }
        });
      }
    });
  }

  describe("C Natural:", () => {
    const cNatural = createPitch({
      circlePosition: 0,
      octave: 4,
    });

    it("naturalName", () => {
      expect(cNatural.naturalName()).toEqual("C");
    });

    it("accidentals", () => {
      expect(cNatural.accidentals()).toEqual(0);
    });

    it("midiNoteNumber", () => {
      expect(cNatural.midiNoteNumber()).toEqual(60);
    });
  });
  describe("C Sharp:", () => {
    const cNatural = createPitch({
      circlePosition: 7,
      octave: 4,
    });

    it("naturalName", () => {
      expect(cNatural.naturalName()).toEqual("C");
    });

    it("accidentals", () => {
      expect(cNatural.accidentals()).toEqual(1);
    });

    it("midiNoteNumber", () => {
      expect(cNatural.midiNoteNumber()).toEqual(61);
    });
  });
  describe("C Double Sharp:", () => {
    const cNatural = createPitch({
      circlePosition: 14,
      octave: 4,
    });

    it("naturalName", () => {
      expect(cNatural.naturalName()).toEqual("C");
    });

    it("accidentals", () => {
      expect(cNatural.accidentals()).toEqual(2);
    });

    it("midiNoteNumber", () => {
      expect(cNatural.midiNoteNumber()).toEqual(62);
    });
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

  describe("Create from string", () => {
    testPitches.forEach((testPitch) => {
      const name = testPitch.name();
      const fromName = createPitch(name);
      describe(`${name} ${fromName.name()}`, () => {
        it("Should equal", () => {
          expect(fromName.isEqualTo(testPitch)).toBeTrue();
        });
      });
    });

    [
      ["C-4", "C-4"],
      ["C#-4", "C♯-4"],
      ["Bb-7", "B♭-7"],
      ["F𝄫104", "F♭♭104"],
      ["F𝄫b104", "F♭♭♭104"],
      ["G𝄪2", "G♯♯2"],
      ["G𝄪𝄪2", "G♯♯♯♯2"],
      ["Gn5", "G5"],
      ["A♮7", "A7"],
    ].forEach(([testName, shouldBe]) => {
      const fromName = createPitch(testName);
      describe(`${testName} ${fromName.name()}`, () => {
        it("Should equal", () => {
          expect(fromName.name()).toEqual(shouldBe);
        });
      });
    });

    ["", "G", "X11", "Ay4", "C--9", "C#♭5", "Cnn4", "D♮♮4", "nonsense"].forEach(
      (testName) => {
        describe(`${testName}`, () => {
          it("Should Throw", () => {
            expect(() => {
              createPitch(testName);
            }).toThrow();
          });
        });
      }
    );
  });
});
