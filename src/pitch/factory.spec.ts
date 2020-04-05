import { createPitch } from "./factory";
import { invalidAssumedAccidental, noPitchData } from "./errors";

describe("Pitch Factory:", () => {
    describe("no data given", () => {
        it("should throw", () => {
            expect(() => { createPitch(null as any); }).toThrowError(noPitchData);
        });
    });

    for (let naturalPosition = -1; naturalPosition < 6; naturalPosition += 1) {
        const naturalName = (naturalPosition === -1 ? "f" : [ "c", "g", "d", "a", "e", "b" ][naturalPosition]);
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
                })
            }
        });
    }

    for (let midiNoteNumber = -12; midiNoteNumber <= 140; midiNoteNumber += 1) {
        describe(`MIDI Note ${midiNoteNumber}`, () => {
            for (let assumedAccidental = -3; assumedAccidental <= 3; assumedAccidental += 1) {
                describe(`with ${assumedAccidental} assumedAccidentals`, () => {
                    const naturalSemitonePos = (((midiNoteNumber - assumedAccidental) % 12) + 12) % 12;
                    const shouldError = new Set([ 1, 3, 6, 8, 10 ]).has(naturalSemitonePos);
                    if (shouldError) {
                        it("should throw", () => {
                            expect(() => { createPitch({ midiNoteNumber, assumedAccidental }) }).toThrowError(invalidAssumedAccidental);
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
            expect(cNatural.naturalName()).toEqual("c");
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
            expect(cNatural.naturalName()).toEqual("c");
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
            expect(cNatural.naturalName()).toEqual("c");
        });

        it("accidentals", () => {
            expect(cNatural.accidentals()).toEqual(2);
        });

        it("midiNoteNumber", () => {
            expect(cNatural.midiNoteNumber()).toEqual(62);
        });
    });
});
