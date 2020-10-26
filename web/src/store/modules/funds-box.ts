import { SelectItems } from '../../../../choiceside-components/lib'
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'
import { RootState } from '..'

export interface FundsBoxState {
  creditFunds: number
  depositFunds: number
  creditFundsItems: SelectItems[]
  depositFundsItems: SelectItems[]
}

const state: FundsBoxState = {
  creditFunds: 0.4,
  depositFunds: 0.8,
  creditFundsItems: [
    {
      value: 0,
      text: 'не має потреби отримання кредитних коштів',
    },
    {
      value: 0.2,
      text: 'можливо буде потреба отримання кредитних коштів',
    },
    {
      value: 0.4,
      text: 'є, але не значна отримання кредитних коштів',
    },
    {
      value: 0.6,
      text: 'є потреба отримання кредитних коштів',
    },
    {
      value: 0.8,
      text: 'значна потреба отримання кредитних коштів',
    },
    {
      value: 1,
      text: 'пріоритетна потреба отримання кредитних коштів',
    },
  ],
  depositFundsItems: [
    {
      value: 0,
      text: 'не має потреби внесення депозитних коштів',
    },
    {
      value: 0.2,
      text: 'можливо буде потреба внесення депозитних коштів',
    },
    {
      value: 0.4,
      text: 'є, але не значна внесення депозитних коштів',
    },
    {
      value: 0.6,
      text: 'є потреба внесення депозитних коштів',
    },
    {
      value: 0.8,
      text: 'значна потреба внесення депозитних коштів',
    },
    {
      value: 1,
      text: 'пріоритетна потреба внесення депозитних коштів',
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
