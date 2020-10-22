import { Matrix } from 'mathjs'
import { action, createModule, mutation } from 'vuex-class-component'
import { matrixMultiplication } from 'choiceside-lib'

const VuexModule = createModule({
  namespaced: 'task-objects',
  strict: false,
})

interface TaskObject {
  name?: string
  expectedAltMatrix: Matrix
  expectedAltVector: number[]
}

export class TaskObjects extends VuexModule {
  objects: TaskObject[] = []

  @mutation setExpectedAltMatrix({
    index,
    matrix,
  }: {
    index: number
    matrix: Matrix
  }) {
    const obj: TaskObject = this.objects[index]
    obj.expectedAltMatrix = matrix
    this.objects[index] = obj
  }

  @mutation setExpectedAltVector({
    index,
    vector,
  }: {
    index: number
    vector: number[]
  }) {
    const obj: TaskObject = this.objects[index]
    obj.expectedAltVector = vector
    this.objects[index] = obj
  }

  @mutation createObject({
    index,
    matrix,
    vector,
  }: {
    index: number
    matrix: Matrix
    vector: number[]
  }) {
    this.objects[index] = {
      expectedAltMatrix: matrix,
      expectedAltVector: vector,
    }
  }

  @action async populateTaskObject({
    index,
    matrix,
  }: {
    index: number
    matrix: Matrix
  }) {
    const obj = this.objects[index]
    if (!obj) {
      this.createObject({ index, matrix, vector: matrixMultiplication(matrix) })
    } else {
      this.setExpectedAltMatrix({ index, matrix })
      this.setExpectedAltVector({ index, vector: matrixMultiplication(matrix) })
    }
  }
}
