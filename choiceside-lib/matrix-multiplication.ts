import { multiply, transpose, row, sum, Matrix } from 'mathjs'

export const matrixMultiplication = (O: Matrix) => {
  // Step 1
  const Ot = transpose(O)
  const A = multiply(O, Ot)

  // Step 2
  const [rowsO] = O.size()
  const A1 = A.map((v) => v / rowsO)

  // Step 3
  const vk = Array(rowsO)
    .fill(0)
    .map((_, i) => {
      const mrow = row(A1, i).map((v: number) => Math.pow(v, rowsO))
      const sum1 = sum(mrow)
      return Math.pow(sum1, 1 / rowsO)
    })

  // Step 4
  const sumVk = sum(vk)
  const wk = vk.map((v) => v / sumVk)

  // Step 5
  const B = O.map((v, i) => {
    return v * wk[i[0]]
  })

  // Step 6
  const C = multiply(Ot, B)

  // Step 7
  const [, rowsC] = C.size()
  const S = Array(rowsC)
    .fill(0)
    .map((_, i) => {
      return sum(row<number>(C, i))
    })
  const sumS = sum(S)
  const Z = S.map((v) => v / sumS)

  return Z
}
