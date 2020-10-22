import { createModule } from 'vuex-class-component'

const VuexModule = createModule({
  namespaced: 'incoming-data',
  strict: false,
})

export class IncomingData extends VuexModule {}
