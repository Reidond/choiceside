<template>
  <v-card elevation="1" tile>
    <v-card-text>
      <select-credit-funds v-model="fundsBox.creditFunds" />
      <select-deposit-funds v-model="fundsBox.depositFunds" />
      <span>
        Потреба в кредитних коштах
        <funds-box-text expression="A_1 =" :text="creditFundsText" /> та в
        депозитних коштах
        <funds-box-text expression="A_2 =" :text="depositFundsText" /> тоді
        <funds-box-text :expression="`U = ${this.numbersText}`" />. Тоді
        відповідно
        <funds-box-text :expression="`(t_1, t_2) = ${this.numbersText}`" />.
      </span>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SelectCreditFunds from './select-credit-funds.vue'
import SelectDepositFunds from './select-deposit-funds.vue'
import storeProxy from '../store/proxy'
import { PropType, VNode } from 'vue'

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
    return h('div', { attrs: { class: 'funds-box__text' } }, [
      h('katex-element', { props: { expression: ctx.props.expression } }),
      textOrExpression,
    ])
  },
})

@Component({
  components: {
    SelectCreditFunds,
    SelectDepositFunds,
    FundsBoxText,
  },
})
export default class FundsBox extends Vue {
  fundsBox = storeProxy.fundsBox

  get creditFundsText() {
    return this.fundsBox.creditFundsItems.find(
      ({ value }) => value === this.fundsBox.creditFunds
    ).text
  }

  get depositFundsText() {
    return this.fundsBox.depositFundsItems.find(
      ({ value }) => value === this.fundsBox.depositFunds
    ).text
  }

  get numbersText() {
    return `(${this.fundsBox.creditFunds}; ${this.fundsBox.depositFunds})`
  }
}
</script>

<style scoped>
.funds-box__text {
  display: inline-flex;
  gap: 0.2777777777777778em;
}
</style>
