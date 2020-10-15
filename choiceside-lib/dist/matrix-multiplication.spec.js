import { K1, K2, K3, K4, K5, D1, D2 } from './matrix-test-data';
import { matrixMultiplication } from './matrix-multiplication';
const execute = (td, cb) => {
    const d = td();
    const multiplied = matrixMultiplication(d.raw);
    d.resolved.forEach((_, i) => {
        cb(multiplied[i], d.resolved[i]);
    });
};
describe('with step 2', () => {
    it('generates K row from K1', () => {
        execute(K1, (expectedNumber, closeToNumber) => {
            expect(expectedNumber).toBeCloseTo(closeToNumber);
        });
    });
    it('generates K row from K2', () => {
        execute(K2, (expectedNumber, closeToNumber) => {
            expect(expectedNumber).toBeCloseTo(closeToNumber);
        });
    });
    it('generates K row from K3', () => {
        execute(K3, (expectedNumber, closeToNumber) => {
            expect(expectedNumber).toBeCloseTo(closeToNumber);
        });
    });
    it('generates K row from K4', () => {
        execute(K4, (expectedNumber, closeToNumber) => {
            expect(expectedNumber).toBeCloseTo(closeToNumber);
        });
    });
    it('generates K row from K5', () => {
        execute(K5, (expectedNumber, closeToNumber) => {
            expect(expectedNumber).toBeCloseTo(closeToNumber);
        });
    });
    it('generates D row from D1', () => {
        execute(D1, (expectedNumber, closeToNumber) => {
            expect(expectedNumber).toBeCloseTo(closeToNumber);
        });
    });
    it('generates D row from D2', () => {
        execute(D2, (expectedNumber, closeToNumber) => {
            expect(expectedNumber).toBeCloseTo(closeToNumber);
        });
    });
});
