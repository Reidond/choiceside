import { Matrix } from 'mathjs'
import { computeProbableValue, matrixMultiplication } from 'choiceside-lib'
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'
import { RootState } from '..'
import cloneDeep from '../../helpers/clone-deep'

export interface TaskObject {
  expression?: string
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
      matrix,
      expression,
    }: {
      index?: number | null
      matrix?: Matrix | null
      expression?: string | null
    }
  ) {
    const obj = state.objects[index]
    if (!obj) {
      const copy = [...state.objects]
      const expectedAltVector = matrixMultiplication(matrix)
      commit('SET_COLS_SIZE', expectedAltVector.length)
      copy[index] = {
        expectedAltMatrix: matrix,
        expectedAltVector,
        expression,
        probableValues: null,
      }
      commit('SET_TASK_OBJECTS', copy)
      return copy
    }
    const objCopy: TaskObject = cloneDeep(obj)
    expression && (objCopy.expression = expression)
    if (matrix) {
      objCopy.expectedAltMatrix = matrix
      objCopy.expectedAltVector = matrixMultiplication(matrix)
      commit('SET_COLS_SIZE', objCopy.expectedAltVector.length)
    }
    const copy = [...state.objects]
    copy[index] = objCopy
    commit('SET_TASK_OBJECTS', copy)
    return copy
  },
  pushToObjects(
    { commit, state },
    {
      matrix,
      expression,
    }: {
      matrix?: Matrix | null
      expression?: string | null
    }
  ) {
    const expectedAltVector = matrixMultiplication(matrix)
    commit('SET_TASK_OBJECTS', [
      ...state.objects,
      {
        expectedAltMatrix: matrix,
        expectedAltVector,
        expression,
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
