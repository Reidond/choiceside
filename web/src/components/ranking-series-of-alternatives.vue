<template>
  <csc-loading-flash :watched="[]" type="article">
    <template #skeleton>
      <v-card elevation="1">
        <v-card-text class="card__grid card__grid--gap20">
          <span>
            Отримані значення представимо у вигляді таблиці та обчислюємо
            <katex-element expression="Z^*_i" />
            для визначення найкращої альтернативи:
            <katex-element :expression="formula1" />
            <katex-element :expression="formula2" />
            <katex-element :expression="formula3" />
          </span>
          <csc-inline-vector hide-header hide-footer :items="combinedValues">
            <template #header="{index}">
              <katex-element :expression="`Z_${index + 1}`" />
            </template>
            <template #item="{ index }">
              <katex-element :expression="getExpression(index)" />
            </template>
          </csc-inline-vector>
          <csc-inline-vector
            hide-header
            hide-footer
            :items="rankingSeriesOfAlternatives"
          >
            <template #header="{index}">
              <katex-element :expression="`Z^*_${index + 1}`" />
            </template>
          </csc-inline-vector>
          <span>
            Найкраща альтернатива
            <katex-element
              :expression="`X^* = ${rankingSeriesOfAlternatives[0]}`"
            />
          </span>
          <span>
            По отриманим оцінкам можемо побудувати ранжувальний ряд альтернатив:
            <katex-element
              :expression="`\\{${rankingSeriesOfAlternatives.join(',')}\\}`"
            />
          </span>
        </v-card-text>
      </v-card>
    </template>
  </csc-loading-flash>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { customMapState } from '../helpers'
import { RootState } from '../store'

export default Vue.extend({
  computed: {
    ...customMapState({
      combinedValues: (state: RootState) => state.combinedValues.values,
    }),
    ...mapGetters({
      rankingSeriesOfAlternatives: 'combinedValues/rankingSeriesOfAlternatives',
    }),
    formula1() {
      return 'X^* = \\underset{i}{\\max}Z^*_i,'
    },
    formula2() {
      return 'Z^*_i = \\sqrt{z^2_{1i} + z^2_{2i}},'
    },
    formula3() {
      return 'i = \\overline{1, s}'
    },
  },
  methods: {
    getExpression(index) {
      const [first, last] = this.combinedValues[index]
      return `(${first}; ${last})`
    },
  },
})
</script>

<style scoped>
</style>
