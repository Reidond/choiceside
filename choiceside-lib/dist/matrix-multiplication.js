// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { multiply, row, sum, transpose } from 'mathjs';
export const matrixMultiplication = (O) => {
    // Step 1
    const Ot = transpose(O);
    const A = multiply(O, Ot);
    // Step 2
    const [rowsO] = O.size();
    const A1 = A.map((v) => v / rowsO);
    // Step 3
    const vk = Array(rowsO)
        .fill(0)
        .map((_, i) => {
        const mrow = row(A1, i).map((v) => Math.pow(v, rowsO));
        const sum1 = sum(mrow);
        return Math.pow(sum1, 1 / rowsO);
    });
    // Step 4
    const sumVk = sum(vk);
    const wk = vk.map((v) => v / sumVk);
    // Step 5
    const B = O.map((v, i) => {
        return v * wk[i[0]];
    });
    // Step 6
    const C = multiply(Ot, B);
    // Step 7
    const [, rowsC] = C.size();
    const S = Array(rowsC)
        .fill(0)
        .map((_, i) => {
        return sum(row(C, i));
    });
    const sumS = sum(S);
    // Z
    return S.map((v) => v / sumS);
};
