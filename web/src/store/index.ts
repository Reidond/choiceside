import Vue from 'vue'
import Vuex from 'vuex'
import {
  combinedValuesModule,
  CombinedValuesState,
} from './modules/combined-values'
import {
  editorOverlayModule,
  EditorOverlayState,
} from './modules/editor-overlay'
import { fundsBoxModule, FundsBoxState } from './modules/funds-box'
import { taskObjectsModule, TaskObjectsState } from './modules/task-objects'

Vue.use(Vuex)

export interface RootState {
  fundsBox: FundsBoxState
  taskObjects: TaskObjectsState
  combinedValues: CombinedValuesState
  editorOverlay: EditorOverlayState
}

export default new Vuex.Store<RootState>({
  modules: {
    fundsBox: fundsBoxModule,
    taskObjects: taskObjectsModule,
    combinedValues: combinedValuesModule,
    editorOverlay: editorOverlayModule,
  },
})
