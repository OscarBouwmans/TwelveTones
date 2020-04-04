import { createPitch } from "./factory";

describe("Pitch Factory:", () => {
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
