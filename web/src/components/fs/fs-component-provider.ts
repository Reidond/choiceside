import Vue from 'vue'
import parser from 'ua-parser-js'
import AddNewFileV1 from './v1.vue'
import AddNewFileV2 from './v2.vue'

const VERSION_1 = Symbol()
const VERSION_2 = Symbol()

export function getBrowserVersion() {
  const ua = parser(navigator.userAgent)

  if (ua.browser.name === 'Chrome' && Number(ua.browser.major) >= 86) {
    return VERSION_2
  }

  return VERSION_1
}

export const getBrowserVersionSymbol = Symbol()
export const getCorrentFsCompnent = Symbol()

export default Vue.extend({
  provide() {
    return {
      [getBrowserVersionSymbol]: this.__getBrowserVersion,
      [getCorrentFsCompnent]: this.__getCorrentFsCompnent,
    }
  },

  methods: {
    __getCorrentFsCompnent() {
      const version = getBrowserVersion()

      if (version === VERSION_1) {
        return AddNewFileV1
      }

      if (version === VERSION_2) {
        return AddNewFileV2
      }
    },
  },

  render(h) {
    return h('div', [h(this.__getCorrentFsCompnent())])
  },
})
