import Vue from 'vue'
import Vuex from 'vuex'
import { fundsBoxModule, FundsBoxState } from './modules/funds-box'
import { taskObjectsModule, TaskObjectsState } from './modules/task-objects'

Vue.use(Vuex)

export interface RootState {
  fundsBox: FundsBoxState
  taskObjects: TaskObjectsState
}

export default new Vuex.Store<RootState>({
  modules: {
    fundsBox: fundsBoxModule,
    taskObjects: taskObjectsModule,
  },
})
