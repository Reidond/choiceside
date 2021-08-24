import { Matrix } from 'mathjs'
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'
import { RootState } from '..'
import { TaskObjectWorker } from '../../workers/task-object.worker-api'

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
  async setProbableValuesTaskObject(
    { commit, state },
    {
      index,
      funds,
    }: {
      index: number
      funds: number
    }
  ) {
    const taskObjectInstance = await new TaskObjectWorker()
    const obj = state.objects[index]
    if (obj) {
      return taskObjectInstance
        .computeProbableValueWorker(funds, obj.expectedAltVector)
        .then((data) => {
          obj.probableValues = data

          const copy = [...state.objects]
          copy[index] = obj
          commit('SET_TASK_OBJECTS', copy)

          return copy
        })
    }
  },
  async setValuesTaskObject(
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
    const taskObjectInstance = await new TaskObjectWorker()
    const obj = state.objects[index]
    if (!obj) {
      return taskObjectInstance
        .matrixFlatAndMultiplicateWorker(rawMatrix)
        .then(({ expectedAltMatrix, expectedAltVector }) => {
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
          return state.objects
        })
    }
    obj.rawMatrix = rawMatrix || obj.rawMatrix
    obj.valueGroup = valueGroup || obj.valueGroup
    obj.valueIndex = valueIndex || obj.valueIndex

    return taskObjectInstance
      .matrixFlatAndMultiplicateWorker(rawMatrix)
      .then(({ expectedAltMatrix, expectedAltVector }) => {
        obj.expectedAltMatrix = expectedAltMatrix
        obj.expectedAltVector = expectedAltVector
        state.objects[index] = obj
        commit('SET_COLS_SIZE', obj.expectedAltVector.length)
        commit('SET_TASK_OBJECTS', state.objects)
        return state.objects
      })
  },
  async pushToObjects(
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
    const taskObjectInstance = await new TaskObjectWorker()
    return taskObjectInstance
      .matrixFlatAndMultiplicateWorker(rawMatrix)
      .then(({ expectedAltMatrix, expectedAltVector }) => {
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
      })
  },
}

export const taskObjectsModule: Module<TaskObjectsState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
