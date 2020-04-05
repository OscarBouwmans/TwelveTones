import { createPitch } from "./factory";

describe("Pitch Factory:", () => {
    for (let naturalPosition = -1; naturalPosition < 6; naturalPosition += 1) {
        const naturalName = (naturalPosition === -1 ? "f" : [ "c", "g", "d", "a", "e", "b" ][naturalPosition]);
        describe(`${naturalName}:`, () => {
            for (let accidentals = -3; accidentals <= 3; accidentals += 1) {
                describe(`Accidentals ${accidentals}:`, () => {
                    const circlePosition = naturalPosition + 7 * accidentals;
                    for (let octave = -2; octave < 10; octave += 1) {
                        describe(`Octave ${octave}:`, () => {
                            const pitch = createPitch({ circlePosition, octave });
                            it(`naturalName`, () => {
                                expect(pitch.naturalName()).toEqual(naturalName);
                            });
                            it(`accidentals`, () => {
                                expect(pitch.accidentals()).toEqual(accidentals);
                            });
                        });
                    }
                })
            }
        });
    }

    describe("C Natural:", () => {
        const cNatural = createPitch({
            circlePosition: 0,
            octave: 4,
        });
    
        it("naturalName:", () => {
            expect(cNatural.naturalName()).toEqual("c");
        });

        it("accidentals:", () => {
            expect(cNatural.accidentals()).toEqual(0);
        });

        it("midiNoteNumber:", () => {
            expect(cNatural.midiNoteNumber()).toEqual(60);
        });
    });
    describe("C Sharp:", () => {
        const cNatural = createPitch({
            circlePosition: 7,
            octave: 4,
        });
    
        it("naturalName:", () => {
            expect(cNatural.naturalName()).toEqual("c");
        });

        it("accidentals:", () => {
            expect(cNatural.accidentals()).toEqual(1);
        });

        it("midiNoteNumber:", () => {
            expect(cNatural.midiNoteNumber()).toEqual(61);
        });
    });
    describe("C Double Sharp:", () => {
        const cNatural = createPitch({
            circlePosition: 14,
            octave: 4,
        });
    
        it("naturalName:", () => {
            expect(cNatural.naturalName()).toEqual("c");
        });

        it("accidentals:", () => {
            expect(cNatural.accidentals()).toEqual(2);
        });

        it("midiNoteNumber:", () => {
            expect(cNatural.midiNoteNumber()).toEqual(62);
        });
    });
});
