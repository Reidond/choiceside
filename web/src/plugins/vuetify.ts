import Vue from 'vue'
import Vuetify, { UserVuetifyPreset } from 'vuetify'
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
