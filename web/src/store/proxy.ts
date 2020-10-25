import { createProxy } from 'vuex-class-component'
import store from '.'
import { FundsBox } from './modules/funds-box'
import { TaskObjects } from './modules/task-objects'

export default {
  taskObjects: createProxy(store, TaskObjects),
  fundsBox: createProxy(store, FundsBox),
}
