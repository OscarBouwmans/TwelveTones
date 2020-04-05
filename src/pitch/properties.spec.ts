import { createPitch } from "./factory";

describe("Enharmonic Equivalents", () => {
    const validAccidentalsMapped = [
        [ -2,  0, 1, 3 ],
        [ -3, -1, 1, 2 ],
        [ -3, -2, 0, 2, 3 ],
        [ -2, -1, 1, 3 ],
        [ -3, -1, 0, 2 ],
        [ -2,  0, 1, 3 ],
        [ -3, -1, 1, 2 ],
        [ -2,  0, 2, 3 ],
        [ -3, -1, 1, 3 ],
        [ -3, -2, 0, 2 ],
        [ -2, -1, 1 ],
        [ -3, -1, 0, 2 ],
    ];

    validAccidentalsMapped.forEach((validAccidentals, partialNoteNum) => {
        [ -1, 0, 1].forEach((relativeOctave) => {
            const midiNoteNumber = 60 + 12 * relativeOctave + partialNoteNum;
            describe(`with MIDI Note number ${midiNoteNumber}`, () => {
                validAccidentals.forEach((accidentalA) => {
                    validAccidentals.forEach((accidentalB) => {
                        describe(`Comparing accidentals ${accidentalA} and ${accidentalB}`, () => {
                            it("should be enharmonically equivalent", () => {
                                const pitchA = createPitch({ midiNoteNumber, assumedAccidental: accidentalA });
                                const pitchB = createPitch({ midiNoteNumber, assumedAccidental: accidentalB });

                                expect(pitchA.isEnharmonicEquivalentOf(pitchB)).toBeTrue();
                                expect(pitchB.isEnharmonicEquivalentOf(pitchA)).toBeTrue();
                                expect(pitchA.isEnharmonicEquivalentOf(pitchB, false)).toBeTrue();
                                expect(pitchB.isEnharmonicEquivalentOf(pitchA, false)).toBeTrue();
                                expect(pitchA.isEnharmonicEquivalentOf(pitchB, true)).toBeTrue();
                                expect(pitchB.isEnharmonicEquivalentOf(pitchA, true)).toBeTrue();
                            });
                            it("should not be enharmonically equivalent (different note)", () => {
                                [ -2, -1, 1, 2 ].forEach((noteShift) => {
                                    const shiftedNoteNumber = midiNoteNumber + noteShift;
                                    const assumedAccidental = validAccidentalsMapped[shiftedNoteNumber % 12][2];
                                    const pitchA = createPitch({ midiNoteNumber, assumedAccidental: accidentalA });
                                    const pitchB = createPitch({ midiNoteNumber: shiftedNoteNumber, assumedAccidental });

                                    expect(pitchA.isEnharmonicEquivalentOf(pitchB)).toBeFalse();
                                    expect(pitchB.isEnharmonicEquivalentOf(pitchA)).toBeFalse();
                                    expect(pitchA.isEnharmonicEquivalentOf(pitchB, false)).toBeFalse();
                                    expect(pitchB.isEnharmonicEquivalentOf(pitchA, false)).toBeFalse();
                                    expect(pitchA.isEnharmonicEquivalentOf(pitchB, true)).toBeFalse();
                                    expect(pitchB.isEnharmonicEquivalentOf(pitchA, true)).toBeFalse();
                                });
                            });
                            it("in different octaves", () => {
                                [ -2, -1, 1, 2 ].forEach((octaveShift) => {
                                    const pitchA = createPitch({ midiNoteNumber, assumedAccidental: accidentalA });
                                    const pitchB = createPitch({ midiNoteNumber: midiNoteNumber + 12 * octaveShift, assumedAccidental: accidentalB });
                                    expect(pitchA.isEnharmonicEquivalentOf(pitchB)).toBeFalse();
                                    expect(pitchB.isEnharmonicEquivalentOf(pitchA)).toBeFalse();
                                    expect(pitchA.isEnharmonicEquivalentOf(pitchB, false)).toBeFalse();
                                    expect(pitchB.isEnharmonicEquivalentOf(pitchA, false)).toBeFalse();
                                    expect(pitchA.isEnharmonicEquivalentOf(pitchB, true)).toBeTrue();
                                    expect(pitchB.isEnharmonicEquivalentOf(pitchA, true)).toBeTrue();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
