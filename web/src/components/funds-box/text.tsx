import Vue, { VNode } from "vue"

const FundsBoxText = Vue.extend({
  functional: true,
  props: {
    expression: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
  },
  render(h, ctx) {
    let textOrExpression: VNode[] | null = null
    if (ctx.props.text) {
      textOrExpression = [
        h('katex-element', { props: { expression: '\\{' } }),
        h('span', [h('strong', [ctx.props.text])]),
        h('katex-element', { props: { expression: '\\}' } }),
      ]
    }
    return h(
      'div',
      { attrs: { class: 'card__grid-item card__grid-item--katex' } },
      [
        h('katex-element', { props: { expression: ctx.props.expression } }),
        textOrExpression,
      ]
    )
  },
})

export default FundsBoxText
