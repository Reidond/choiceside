import { SelectItems } from '../../../../choiceside-components/lib'
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'
import { RootState } from '..'

export interface FundsBoxState {
  creditFunds: number
  depositFunds: number
  taskFundItems: SelectItems[]
}

const state: FundsBoxState = {
  creditFunds: 0.4,
  depositFunds: 0.8,
  taskFundItems: [
    {
      value: 0,
      text: 'не має цільової потреби',
    },
    {
      value: 0.2,
      text: 'можливо буде цільова потреба',
    },
    {
      value: 0.4,
      text: 'є, але не значна цільова потреба',
    },
    {
      value: 0.6,
      text: 'є цільова потреба',
    },
    {
      value: 0.8,
      text: 'значна цільова потреба',
    },
    {
      value: 1,
      text: 'пріоритетна цільова потреба',
    },
  ],
}

const getters: GetterTree<FundsBoxState, RootState> = {}

const mutations: MutationTree<FundsBoxState> = {
  SET_CREDIT_FUNDS(state, data: number) {
    state.creditFunds = data
  },
  SET_DEPOSIT_FUNDS(state, data: number) {
    state.depositFunds = data
  },
}

const actions: ActionTree<FundsBoxState, RootState> = {
  setCreditFunds({ commit }, { creditFunds }: { creditFunds: number }) {
    commit('SET_CREDIT_FUNDS', creditFunds)
  },
  setDepositFunds({ commit }, { depositFunds }: { depositFunds: number }) {
    commit('SET_DEPOSIT_FUNDS', depositFunds)
  },
}

export const fundsBoxModule: Module<FundsBoxState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
