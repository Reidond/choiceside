import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'
import { RootState } from '..'

export interface CombinedValuesState {
  values: Array<[number, number]>
}

const state: CombinedValuesState = {
  values: [],
}

const getters: GetterTree<CombinedValuesState, RootState> = {}

const mutations: MutationTree<CombinedValuesState> = {
  SET_VALUES(state, data: Array<[number, number]>) {
    state.values = data
  },
}

const actions: ActionTree<CombinedValuesState, RootState> = {
  setValues({ commit }, data: Array<[number, number]>) {
    commit('SET_VALUES', data)
  },
}

export const combinedValuesModule: Module<CombinedValuesState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
