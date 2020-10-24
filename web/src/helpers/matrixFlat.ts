import { matrix, Matrix } from 'mathjs'
import { matrixMultiplication } from 'choiceside-lib'

export const matrixFlat = (...vectorOfMatrixRows: Array<Matrix>): Matrix => {
  return matrix(
    vectorOfMatrixRows.map((v) => {
      return matrixMultiplication(v)
    })
  )
}
