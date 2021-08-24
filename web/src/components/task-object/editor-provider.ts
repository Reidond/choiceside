import Vue from 'vue'
import PQueue from 'p-queue/dist/index'

export const openEditorOverlay = Symbol()
export const closeEditorOverlay = Symbol()
export const onEmitEditorOverlay = Symbol()

export const queue = new PQueue({ autoStart: false })

const onOpenEvent = 'task-objects::open-editor-overlay'
const onCloseEvent = 'task-objects::close-editor-overlay'

export default Vue.extend({
  provide() {
    return {
      [openEditorOverlay]: this.__openEditorOverlay,
      [closeEditorOverlay]: this.__closeEditorOverlay,
      [onEmitEditorOverlay]: this.__onEmitEditorOverlay,
    }
  },

  data() {
    return {}
  },

  methods: {
    __openEditorOverlay() {
      this.$root.$emit(onOpenEvent)
    },
    __closeEditorOverlay() {
      if (!this.preventFromClosing) {
        this.$root.$emit(onCloseEvent)
      }
    },
    __onEmitEditorOverlay(cb: (e: boolean) => {}) {
      const onOpen = cb.bind(null, true)
      const onClose = cb.bind(null, false)
      this.$root.$on(onOpenEvent, onOpen)
      this.$root.$on(onCloseEvent, onClose)
      return () => {
        this.$root.$off(onOpenEvent, onOpen)
        this.$root.$off(onCloseEvent, onClose)
      }
    },
  },

  render(h) {
    return h('div', this.$slots.default)
  },
})
