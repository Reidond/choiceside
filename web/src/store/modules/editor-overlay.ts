import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'
import { RootState } from '..'

export interface EditorOverlayState {
  showOverlay: boolean
}

const state: EditorOverlayState = {
  showOverlay: false,
}

const getters: GetterTree<EditorOverlayState, RootState> = {}

const mutations: MutationTree<EditorOverlayState> = {
  SET_SHOW_EDITOR_OVERLAY(state, data: boolean) {
    state.showOverlay = data
  },
}

const actions: ActionTree<EditorOverlayState, RootState> = {
  setShowOverlay({ commit }, data: boolean) {
    commit('SET_SHOW_EDITOR_OVERLAY', data)
  },
}

export const editorOverlayModule: Module<EditorOverlayState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
