import { createPitch } from "./factory";
import { Pitch } from "./pitch";

describe("PitchMethods", () => {
    describe("natural()", () => {
        for (let midiNoteNumber = 54; midiNoteNumber <= 78; midiNoteNumber += 1) {
            let trueNatural: Pitch;
            try {
                trueNatural = createPitch({ midiNoteNumber, assumedAccidental: 0 });
            }
            catch (e) { continue; }
            [ -3, -2, -1, 0, 1, 2, 3 ].forEach((assumedAccidental) => {
                const testPitch = createPitch({
                    circlePosition: trueNatural.circlePosition - 7 * assumedAccidental,
                    octave: trueNatural.octave,
                });
                const natural = testPitch.natural();
                describe(`${testPitch.naturalName()} accidentals ${assumedAccidental}`, () => {
                    it("Should be correct natural", () => {
                        expect(natural.accidentals()).toEqual(0);
                        expect(natural.naturalName()).toEqual(trueNatural.naturalName());
                        expect(natural.midiNoteNumber()).toEqual(trueNatural.midiNoteNumber());
                    });
                });
            });
        }
    });
});
