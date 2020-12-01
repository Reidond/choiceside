import Vue from 'vue'
import { customMapState } from '../../helpers'
import { RootState } from '../../store'

const MatricesKatexElement = Vue.extend({
  computed: {
    ...customMapState({
      taskObjects: (state: RootState) => state.taskObjects.objects,
      colsSize: (state: RootState) => state.taskObjects.colsSize,
    }),
  },
  render(h, ctx) {
    return h('span', [
      h('katex-element', { props: { expression: `Z_i =` } }),
      h('katex-element', {
        attrs: { class: 'pl-1' },
        props: { expression: '(' },
      }),
      ...this.taskObjects.map((_, j) =>
        h('katex-element', {
          props: { expression: `z_{${j + 1}i},` },
        })
      ),
      h('katex-element', { props: { expression: '),' } }),
      h('katex-element', {
        props: { expression: `i = \\overline{1,${this.colsSize}}` },
      }),
    ])
  },
})

export default MatricesKatexElement
