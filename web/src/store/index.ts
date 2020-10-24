import Vue from 'vue'
import Vuex from 'vuex'
import { extractVuexModule } from 'vuex-class-component'
import { TaskObjects } from './modules/task-objects'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    ...extractVuexModule(TaskObjects),
  },
})
