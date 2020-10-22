import { createProxy } from 'vuex-class-component'
import store from '.'
import { IncomingData } from './modules/incoming-data'
import { TaskObjects } from './modules/task-objects'

export default {
  incomingData: createProxy(store, IncomingData),
  taskObjects: createProxy(store, TaskObjects),
}
