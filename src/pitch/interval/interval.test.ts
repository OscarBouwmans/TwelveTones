import { describe, expect, test } from "vitest";
import { interval } from "./interval";

describe("Interval creation:", () => {
    test('Valid arguments', () => {
        expect(interval('perfect', 'unison')).toEqual({ circleShift: 0, octaveShift: 0 });
        expect(interval('perfect', 'fourth')).toEqual({ circleShift: -1, octaveShift: 0 });
        expect(interval('perfect', 'fifth')).toEqual({ circleShift: 1, octaveShift: 0 });
        expect(interval('perfect', 'octave')).toEqual({ circleShift: 0, octaveShift: 1 });

        expect(interval('major', 'second')).toEqual({ circleShift: 2, octaveShift: 0 });
        expect(interval('major', 'third')).toEqual({ circleShift: 4, octaveShift: 0 });
        expect(interval('major', 'sixth')).toEqual({ circleShift: 3, octaveShift: 0 });
        expect(interval('major', 'seventh')).toEqual({ circleShift: 5, octaveShift: 0 });

        expect(interval('minor', 'second')).toEqual({ circleShift: -5, octaveShift: 0 });
        expect(interval('minor', 'third')).toEqual({ circleShift: -3, octaveShift: 0 });
        expect(interval('minor', 'sixth')).toEqual({ circleShift: -4, octaveShift: 0 });
        expect(interval('minor', 'seventh')).toEqual({ circleShift: -2, octaveShift: 0 });

        expect(interval('diminished', 'unison')).toEqual({ circleShift: -7, octaveShift: 0 });
        expect(interval('diminished', 'second')).toEqual({ circleShift: -12, octaveShift: 0 });
        expect(interval('diminished', 'third')).toEqual({ circleShift: -10, octaveShift: 0 });
        expect(interval('diminished', 'fourth')).toEqual({ circleShift: -8, octaveShift: 0 });
        expect(interval('diminished', 'fifth')).toEqual({ circleShift: -6, octaveShift: 0 });
        expect(interval('diminished', 'sixth')).toEqual({ circleShift: -11, octaveShift: 0 });
        expect(interval('diminished', 'seventh')).toEqual({ circleShift: -9, octaveShift: 0 });
        expect(interval('diminished', 'octave')).toEqual({ circleShift: -7, octaveShift: 1 });

        expect(interval('augmented', 'unison')).toEqual({ circleShift: 7, octaveShift: 0 });
        expect(interval('augmented', 'second')).toEqual({ circleShift: 9, octaveShift: 0 });
        expect(interval('augmented', 'third')).toEqual({ circleShift: 11, octaveShift: 0 });
        expect(interval('augmented', 'fourth')).toEqual({ circleShift: 6, octaveShift: 0 });
        expect(interval('augmented', 'fifth')).toEqual({ circleShift: 8, octaveShift: 0 });
        expect(interval('augmented', 'sixth')).toEqual({ circleShift: 10, octaveShift: 0 });
        expect(interval('augmented', 'seventh')).toEqual({ circleShift: 12, octaveShift: 0 });
        expect(interval('augmented', 'octave')).toEqual({ circleShift: 7, octaveShift: 1 });

        expect(interval([-2, 'unison'])).toEqual({ circleShift: -14, octaveShift: 0 });
        expect(interval([-2, 'second'])).toEqual({ circleShift: -19, octaveShift: 0 });
        expect(interval([-2, 'third'])).toEqual({ circleShift: -17, octaveShift: 0 });
        expect(interval([-2, 'fourth'])).toEqual({ circleShift: -15, octaveShift: 0 });
        expect(interval([-2, 'fifth'])).toEqual({ circleShift: -13, octaveShift: 0 });
        expect(interval([-2, 'sixth'])).toEqual({ circleShift: -18, octaveShift: 0 });
        expect(interval([-2, 'seventh'])).toEqual({ circleShift: -16, octaveShift: 0 });
        expect(interval([-2, 'octave'])).toEqual({ circleShift: -14, octaveShift: 1 });

        expect(interval([+2, 'unison'])).toEqual({ circleShift: 14, octaveShift: 0 });
        expect(interval([+2, 'second'])).toEqual({ circleShift: 16, octaveShift: 0 });
        expect(interval([+2, 'third'])).toEqual({ circleShift: 18, octaveShift: 0 });
        expect(interval([+2, 'fourth'])).toEqual({ circleShift: 13, octaveShift: 0 });
        expect(interval([+2, 'fifth'])).toEqual({ circleShift: 15, octaveShift: 0 });
        expect(interval([+2, 'sixth'])).toEqual({ circleShift: 17, octaveShift: 0 });
        expect(interval([+2, 'seventh'])).toEqual({ circleShift: 19, octaveShift: 0 });
        expect(interval([+2, 'octave'])).toEqual({ circleShift: 14, octaveShift: 1 });
    });

    test('Alternate notation', () => {
        expect(interval('P', '1')).toEqual(interval('perfect', 'unison'));
        expect(interval('P', '4')).toEqual(interval('perfect', 'fourth'));
        expect(interval('P', '5')).toEqual(interval('perfect', 'fifth'));
        expect(interval('P', '8')).toEqual(interval('perfect', 'octave'));

        expect(interval('M', '2')).toEqual(interval('major', 'second'));
        expect(interval('M', '3')).toEqual(interval('major', 'third'));
        expect(interval('M', '6')).toEqual(interval('major', 'sixth'));
        expect(interval('M', '7')).toEqual(interval('major', 'seventh'));

        expect(interval('m', '2')).toEqual(interval('minor', 'second'));
        expect(interval('m', '3')).toEqual(interval('minor', 'third'));
        expect(interval('m', '6')).toEqual(interval('minor', 'sixth'));
        expect(interval('m', '7')).toEqual(interval('minor', 'seventh'));

        expect(interval('d', '1')).toEqual(interval('diminished', 'unison'));
        expect(interval('d', '2')).toEqual(interval('diminished', 'second'));
        expect(interval('d', '3')).toEqual(interval('diminished', 'third'));
        expect(interval('d', '4')).toEqual(interval('diminished', 'fourth'));
        expect(interval('d', '5')).toEqual(interval('diminished', 'fifth'));
        expect(interval('d', '6')).toEqual(interval('diminished', 'sixth'));
        expect(interval('d', '7')).toEqual(interval('diminished', 'seventh'));
        expect(interval('d', '8')).toEqual(interval('diminished', 'octave'));

        expect(interval('A', '1')).toEqual(interval('augmented', 'unison'));
        expect(interval('A', '2')).toEqual(interval('augmented', 'second'));
        expect(interval('A', '3')).toEqual(interval('augmented', 'third'));
        expect(interval('A', '4')).toEqual(interval('augmented', 'fourth'));
        expect(interval('A', '5')).toEqual(interval('augmented', 'fifth'));
        expect(interval('A', '6')).toEqual(interval('augmented', 'sixth'));
        expect(interval('A', '7')).toEqual(interval('augmented', 'seventh'));
        expect(interval('A', '8')).toEqual(interval('augmented', 'octave'));
    });

    test('Copying', () => {
        const intervalA = interval('perfect', 'unison');
        expect(interval(intervalA)).toEqual(intervalA);

        const intervalB = interval('major', 'seventh');
        expect(interval(intervalB)).toEqual(intervalB);

        const intervalC = interval('augmented', 'second');
        expect(interval(intervalC)).toEqual(intervalC);
    });

    test('Invalid arguments', () => {
        expect(() => interval('perfect' as any, 'second')).toThrow();
        expect(() => interval('major' as any, 'octave')).toThrow();
        expect(() => interval('minor' as any, 'fourth')).toThrow();
        expect(() => interval('diminished', 7 as any)).toThrow();
        expect(() => interval('augmented', null as any)).toThrow();
        expect(() => interval(null as any)).toThrow();
        expect(() => interval({} as any)).toThrow();
        expect(() => interval([] as any)).toThrow();
    });
});
