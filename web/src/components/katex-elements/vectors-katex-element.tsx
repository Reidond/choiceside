import Vue, { VNode } from "vue"
import { customMapState } from "../../helpers"
import { RootState } from "../../store"
import { TaskObject } from "../../store/modules/task-objects"

const VectorsKatexElement = Vue.extend({
  computed: {
    ...customMapState({
      taskObjects: (state: RootState) => state.taskObjects.objects,
    }),
  },
  render(h, ctx) {
    const katex: VNode[] = this.taskObjects.map((v: TaskObject, i: number) => {
      return h('span', [
        h('katex-element', { props: { expression: `${v.valueGroup} =` } }),
        h('katex-element', { props: { expression: '\\{' } }),
        ...v.expectedAltVector.map((_, j) =>
          h('katex-element', {
            props: { expression: `${v.valueGroup.toLowerCase()}_${j + 1},` },
          })
        ),
        h('katex-element', { props: { expression: '\\}' } }),
      ])
    })
    return h('span', { attrs: { class: 'card__grid-item' } }, katex)
  },
})

export default VectorsKatexElement
