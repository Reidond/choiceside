import * as Comlink from 'comlink'
import {
  computeProbableValue,
  matrixMultiplication,
  matrixFlat,
} from '@choiceside/lib'
import { matrix } from 'mathjs'

class TaskObject {
  computeProbableValueWorker(t: number, expectedVector: number[]) {
    return computeProbableValue(t, expectedVector)
  }
  matrixFlatAndMultiplicateWorker(rawMatrix: Array<Array<number[]>> | null) {
    const expectedAltMatrix = matrixFlat(...rawMatrix.map((v) => matrix(v)))
    const expectedAltVector = matrixMultiplication(expectedAltMatrix)

    return { expectedAltMatrix, expectedAltVector }
  }
}

Comlink.expose(TaskObject)
