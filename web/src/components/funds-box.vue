<template>
  <v-card elevation="1">
    <v-card-text>
      <select-credit-funds
        :value="creditFunds"
        @input="localSetCreditFunds($event)"
      />
      <select-deposit-funds
        :value="depositFunds"
        @input="localSetDepositFunds($event)"
      />
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
import Vue, { VNode } from 'vue'
import SelectCreditFunds from './select-credit-funds.vue'
import SelectDepositFunds from './select-deposit-funds.vue'
import { customMapState } from '../helpers'
import { RootState } from '../store'
import { mapActions } from 'vuex'

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

export default Vue.extend({
  components: {
    SelectCreditFunds,
    SelectDepositFunds,
    FundsBoxText,
  },
  computed: {
    ...customMapState({
      creditFunds: (state: RootState) => state.fundsBox.creditFunds,
      depositFunds: (state: RootState) => state.fundsBox.depositFunds,
      creditFundsItems: (state: RootState) => state.fundsBox.creditFundsItems,
      depositFundsItems: (state: RootState) => state.fundsBox.depositFundsItems,
    }),
    creditFundsText() {
      return this.creditFundsItems.find(
        ({ value }) => value === this.creditFunds
      ).text
    },
    depositFundsText() {
      return this.depositFundsItems.find(
        ({ value }) => value === this.depositFunds
      ).text
    },
    numbersText() {
      return `(${this.creditFunds}; ${this.depositFunds})`
    },
  },
  methods: {
    ...mapActions({
      setCreditFunds: 'fundsBox/setCreditFunds',
      setDepositFunds: 'fundsBox/setDepositFunds',
      setValuesTaskObject: 'taskObjects/setValuesTaskObject',
    }),
    localSetCreditFunds(t) {
      this.setCreditFunds({ creditFunds: t })
      this.setValuesTaskObject({ index: 0, t })
    },
    localSetDepositFunds(t) {
      this.setDepositFunds({ depositFunds: t })
      this.setValuesTaskObject({ index: 1, t })
    },
  },
})
</script>

<style scoped>
</style>
