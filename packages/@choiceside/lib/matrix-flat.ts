import { matrix, Matrix } from 'mathjs'
import { matrixMultiplication } from './matrix-multiplication'

export const matrixFlat = (...vectorOfMatrixRows: Array<Matrix>) => {
  return matrix(
    vectorOfMatrixRows.map((v) => {
      const mm = matrixMultiplication(v)
      return mm || []
    })
  )
}
