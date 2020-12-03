import { matrix, Matrix } from 'mathjs'
import { matrixMultiplication } from './matrix-multiplication'

export const matrixFlat = (
  ...vectorOfMatrixRows: Array<Matrix>
): Promise<Matrix> => {
  return new Promise(async (resolve) => {
    const newVector = []
    for (const v of vectorOfMatrixRows) {
      newVector.push(await matrixMultiplication(v))
    }
    resolve(matrix(newVector))
  })
}
