import Vue from 'vue'
import Vuex from 'vuex'
import { extractVuexModule } from 'vuex-class-component'
import { FundsBox } from './modules/funds-box'
import { TaskObjects } from './modules/task-objects'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    ...extractVuexModule(TaskObjects),
    ...extractVuexModule(FundsBox),
  },
})
