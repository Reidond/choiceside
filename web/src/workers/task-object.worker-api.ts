import * as Comlink from 'comlink'
import Worker from 'worker-loader!./task-object.worker'

export const TaskObjectWorker: any = Comlink.wrap(new Worker())
