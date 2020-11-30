import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { UserVuetifyPreset } from 'vuetify/types'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts: Partial<UserVuetifyPreset> = {
  icons: {
    iconfont: 'md',
  },
  theme: {
    options: { customProperties: true },
  },
}

export default new Vuetify(opts)
