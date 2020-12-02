import Vue from 'vue'
import Vuetify, { UserVuetifyPreset } from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

const opts: Partial<UserVuetifyPreset> = {
  icons: {
    iconfont: 'md',
  },
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        primary: colors.amber.darken1,
        secondary: colors.amber.lighten5,
        accent: colors.yellow.lighten1,
      },
      dark: {
        primary: colors.amber.darken1,
        secondary: colors.amber.lighten5,
        accent: colors.yellow.lighten1,
      },
    },
  },
}

export default new Vuetify(opts)
