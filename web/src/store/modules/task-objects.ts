import { matrix, Matrix } from 'mathjs'
import { computeProbableValue, matrixMultiplication } from '@choiceside/lib'
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'
import { RootState } from '..'
import cloneDeep from '../../helpers/clone-deep'
import { matrixFlat } from 'web/src/helpers'

export interface TaskObject {
  valueGroup?: string
  valueIndex?: string
  rawMatrix: Array<Array<number[]>>
  expectedAltMatrix: Matrix
  expectedAltVector: number[]
  probableValues?: number[] | null
}

export interface TaskObjectsState {
  objects: TaskObject[]
  colsSize: number
}

const state: TaskObjectsState = {
  objects: [],
  colsSize: 0,
}

const getters: GetterTree<TaskObjectsState, RootState> = {}

const mutations: MutationTree<TaskObjectsState> = {
  SET_TASK_OBJECTS(state, data: TaskObject[]) {
    state.objects = data
  },
  SET_COLS_SIZE(state, data: number) {
    state.colsSize = data
  },
}

const actions: ActionTree<TaskObjectsState, RootState> = {
  setProbableValuesTaskObject(
    { commit, state },
    {
      index,
      funds,
    }: {
      index: number
      funds: number
    }
  ) {
    const obj = state.objects[index]
    if (obj) {
      const objCopy: TaskObject = cloneDeep(obj)
      objCopy.probableValues = computeProbableValue(
        funds,
        objCopy.expectedAltVector
      )
      const copy = [...state.objects]
      copy[index] = objCopy
      commit('SET_TASK_OBJECTS', copy)
      return copy
    }
  },
  setValuesTaskObject(
    { commit, state },
    {
      index,
      rawMatrix,
      valueGroup,
      valueIndex,
    }: {
      index?: number | null
      rawMatrix?: Array<Array<number[]>> | null
      valueGroup?: string | null
      valueIndex?: string
    }
  ) {
    return new Promise((resolve) => {
      const obj = state.objects[index]
      if (!obj) {
        const expectedAltMatrix = matrixFlat(...rawMatrix.map((v) => matrix(v)))
        const expectedAltVector = matrixMultiplication(expectedAltMatrix)
        commit('SET_COLS_SIZE', expectedAltVector.length)
        state.objects[index] = {
          rawMatrix,
          expectedAltMatrix,
          expectedAltVector,
          valueGroup,
          valueIndex,
          probableValues: null,
        }
        commit('SET_TASK_OBJECTS', state.objects)
        resolve(state.objects)
        return
      }
      obj.rawMatrix = rawMatrix || obj.rawMatrix
      obj.valueGroup = valueGroup || obj.valueGroup
      obj.valueIndex = valueIndex || obj.valueIndex
      obj.expectedAltMatrix = matrixFlat(...rawMatrix.map((v) => matrix(v)))
      obj.expectedAltVector = matrixMultiplication(obj.expectedAltMatrix)
      state.objects[index] = obj
      commit('SET_COLS_SIZE', obj.expectedAltVector.length)
      commit('SET_TASK_OBJECTS', state.objects)
      resolve(state.objects)
    })
  },
  pushToObjects(
    { commit, state },
    {
      rawMatrix,
      valueGroup,
      valueIndex,
    }: {
      rawMatrix?: Array<Array<number[]>> | null
      valueGroup?: string | null
      valueIndex?: string
    }
  ) {
    const expectedAltMatrix = matrixFlat(...rawMatrix.map((v) => matrix(v)))
    const expectedAltVector = matrixMultiplication(expectedAltMatrix)
    commit('SET_COLS_SIZE', expectedAltVector.length)
    commit('SET_TASK_OBJECTS', [
      ...state.objects,
      {
        rawMatrix,
        expectedAltMatrix,
        expectedAltVector,
        valueGroup,
        valueIndex,
        probableValues: null,
      },
    ])
  },
}

export const taskObjectsModule: Module<TaskObjectsState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
