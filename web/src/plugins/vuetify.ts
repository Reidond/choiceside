import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import uk from 'vuetify/src/locale/uk'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {},
  },
  lang: {
    locales: { uk },
    current: 'uk',
  },
  icons: {
    iconfont: 'md',
  },
})
