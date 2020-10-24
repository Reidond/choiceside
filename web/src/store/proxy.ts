import { createProxy } from 'vuex-class-component'
import store from '.'
import { TaskObjects } from './modules/task-objects'

export default {
  taskObjects: createProxy(store, TaskObjects),
}
