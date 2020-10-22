import { matrix, Matrix } from 'mathjs'
import { matrixMultiplication } from 'choiceside-lib'

export const matrixFlat = (...vectorOfMatrixRows: Array<Matrix>): Matrix => {
  const newMatrix: Array<number[]> = []
  vectorOfMatrixRows.forEach((v) => {
    newMatrix.push(matrixMultiplication(v))
  })
  return matrix(newMatrix)
}
