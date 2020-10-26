import Vue from 'vue'
import Vuex from 'vuex'
import {
  combinedValuesModule,
  CombinedValuesState,
} from './modules/combined-values'
import { fundsBoxModule, FundsBoxState } from './modules/funds-box'
import { taskObjectsModule, TaskObjectsState } from './modules/task-objects'

Vue.use(Vuex)

export interface RootState {
  fundsBox: FundsBoxState
  taskObjects: TaskObjectsState
  combinedValues: CombinedValuesState
}

export default new Vuex.Store<RootState>({
  modules: {
    fundsBox: fundsBoxModule,
    taskObjects: taskObjectsModule,
    combinedValues: combinedValuesModule,
  },
})
