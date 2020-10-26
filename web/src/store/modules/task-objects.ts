import { Matrix } from 'mathjs'
import { matrixMultiplication } from 'choiceside-lib'
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'
import { RootState } from '..'
import cloneDeep from '../../helpers/clone-deep'

export interface TaskObject {
  expression?: string
  expectedAltMatrix: Matrix
  expectedAltVector: number[]
}

export interface TaskObjectsState {
  objects: TaskObject[]
}

const state: TaskObjectsState = {
  objects: [],
}

const getters: GetterTree<TaskObjectsState, RootState> = {}

const mutations: MutationTree<TaskObjectsState> = {
  SET_TASK_OBJECTS(state, data: TaskObject[]) {
    state.objects = data
  },
}

const actions: ActionTree<TaskObjectsState, RootState> = {
  populateTaskObject(
    { commit, state },
    {
      index,
      matrix,
      expression,
    }: {
      index: number
      matrix: Matrix
      expression?: string
    }
  ) {
    const obj = state.objects[index]
    if (!obj) {
      const copy = [...state.objects]
      copy[index] = {
        expectedAltMatrix: matrix,
        expectedAltVector: matrixMultiplication(matrix),
        expression,
      }
      commit('SET_TASK_OBJECTS', copy)
      return copy
    }
    const objCopy: TaskObject = cloneDeep(obj)
    objCopy.expression = expression
    objCopy.expectedAltMatrix = matrix
    objCopy.expectedAltVector = matrixMultiplication(matrix)
    const copy = [...state.objects]
    copy[index] = objCopy
    commit('SET_TASK_OBJECTS', copy)
    return copy
  },
}

export const taskObjectsModule: Module<TaskObjectsState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
