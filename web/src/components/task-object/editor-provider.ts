import Vue from 'vue'
import PQueue from 'p-queue/dist/index'

export const openEditorOverlay = Symbol()
export const closeEditorOverlay = Symbol()
export const permanentOverlay = Symbol()
export const onEmitEditorOverlay = Symbol()
export const onEmitPermanentOverlay = Symbol()

export type EmitEditorType = {
  value: boolean
  lock?: boolean
}

export const queue = new PQueue({ autoStart: false })

const onOpenEvent = 'task-objects::open-editor-overlay'
const onCloseEvent = 'task-objects::close-editor-overlay'
const onPermanentEvent = 'task-objects::permanent-overlay'

export default Vue.extend({
  provide() {
    return {
      [openEditorOverlay]: this.__openEditorOverlay,
      [closeEditorOverlay]: this.__closeEditorOverlay,
      [permanentOverlay]: this.__permanentOverlay,
      [onEmitEditorOverlay]: this.__onEmitEditorOverlay,
      [onEmitPermanentOverlay]: this.__onEmitPermanentOverlay,
    }
  },

  methods: {
    __openEditorOverlay(data) {
      this.$root.$emit(onOpenEvent, data)
    },
    __closeEditorOverlay(data) {
      this.$root.$emit(onCloseEvent, data)
    },
    __permanentOverlay(data) {
      this.$root.$emit(onPermanentEvent, data)
    },
    __onEmitEditorOverlay(cb: (data: EmitEditorType) => {}) {
      const onOpen = (e: Record<string, unknown>) =>
        cb({
          value: true,
          ...e,
        })
      const onClose = (e: Record<string, unknown>) =>
        cb({
          value: false,
          ...e,
        })
      this.$root.$on(onOpenEvent, onOpen)
      this.$root.$on(onCloseEvent, onClose)
      return () => {
        this.$root.$off(onOpenEvent, onOpen)
        this.$root.$off(onCloseEvent, onClose)
      }
    },
    __onEmitPermanentOverlay(cb: (data: Record<string, unknown>) => {}) {
      const onEventCb = (e: Record<string, unknown>) => cb(e)
      this.$root.$on(onPermanentEvent, onEventCb)
      return () => {
        this.$root.$off(onPermanentEvent, onEventCb)
      }
    },
  },

  render(h) {
    return h('div', this.$slots.default)
  },
})
