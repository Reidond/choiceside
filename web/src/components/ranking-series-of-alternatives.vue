<template>
  <v-sheet rounded="lg">
    <v-container>
      <v-row>
        <v-col>
          <div class="card__grid card__grid--gap20">
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
                <csc-loading-flash
                  :watched="[combinedValues]"
                  type="table-cell"
                >
                  <template #skeleton>
                    <katex-element :expression="getExpression(index)" />
                  </template>
                </csc-loading-flash>
              </template>
            </csc-inline-vector>

            <csc-inline-vector
              hide-header
              hide-footer
              :items="maxInSeriesOfAlternatives"
            >
              <template #header="{index}">
                <katex-element :expression="`Z^*_${index + 1}`" />
              </template>
            </csc-inline-vector>
            <span class="card__grid-item">
              Найкраща альтернатива
              <csc-loading-flash
                :watched="[rankingSeriesOfAlternatives]"
                type="chip"
              >
                <template #skeleton>
                  <katex-element
                    :expression="`X^* = ${rankingSeriesOfAlternatives[0]}`"
                  />
                </template>
                <template #item="{item}">
                  <csc-loading-flash
                    :watched="[rankingSeriesOfAlternatives]"
                    type="table-cell"
                  >
                    <template #skeleton>
                      {{ item }}
                    </template>
                  </csc-loading-flash>
                </template>
              </csc-loading-flash>
            </span>
            <span class="card__grid-item">
              По отриманим оцінкам можемо побудувати ранжувальний ряд
              альтернатив:
              <csc-loading-flash
                :watched="[rankingSeriesOfAlternatives]"
                type="chip"
              >
                <template #skeleton>
                  <katex-element
                    :expression="
                      `\\{${rankingSeriesOfAlternatives.join(',')}\\}`
                    "
                  />
                </template>
              </csc-loading-flash>
            </span>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
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
      maxInSeriesOfAlternatives: 'combinedValues/maxInSeriesOfAlternatives',
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

<style scoped></style>
