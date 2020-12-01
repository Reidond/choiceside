<template>
  <v-sheet rounded="lg">
    <v-container>
      <v-row>
        <v-col>
          <div class="card__grid card__grid--gap20">
            <span>
              Для отримання величин
              <matrices-katex-element />
              використовуємо формулу
              <katex-element :expression="formula" />
            </span>
            <span v-for="(cv, i) in localCombinedValues" :key="`cv${i}`">
              <csc-loading-flash :watched="[Z1, Z2]" type="text">
                <template #skeleton>
                  <katex-element :expression="generateExpression(i, cv)" />
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
import Vue, { VNode } from 'vue'
import { mapActions } from 'vuex'
import { customMapState } from '../helpers'
import { RootState } from '../store'
import { TaskObject } from '../store/modules/task-objects'
import MatricesKatexElement from './katex-elements/matrices-katex-element'

export default Vue.extend({
  components: {
    MatricesKatexElement,
  },
  data() {
    return {
      localCombinedValues: [],
    }
  },
  computed: {
    ...customMapState({
      Z1: (state: RootState) => state.taskObjects.objects[0].probableValues,
      Z2: (state: RootState) => state.taskObjects.objects[1].probableValues,
      colsSize: (state: RootState) => state.taskObjects.colsSize,
    }),
    formula() {
      return 'Z_i = (1; 1) - (\\mu(f_1i); \\mu(f_2i)), i = \\overline{1, s}'
    },
  },
  mounted() {
    this.$watch(
      (vm) => [vm.Z1, vm.Z2],
      (val) => {
        if (val[0] && val[1]) {
          this.invalidate(val[0], val[1])
        }
      },
      {
        immediate: true,
        deep: true,
      }
    )
  },
  methods: {
    ...mapActions({
      setValues: 'combinedValues/setValues',
    }),
    invalidate(Z1, Z2) {
      const combinedValues = Array(this.colsSize)
        .fill(0)
        .map((_, i) => {
          const precision = 3
          const first = Number((1 - Z1[i]).toPrecision(precision))
          const last = Number((1 - Z2[i]).toPrecision(precision))
          return [first, last]
        })
      this.localCombinedValues = combinedValues
      this.setValues(combinedValues)
    },
    generateExpression(index, combinedValue) {
      return `Z_${index + 1} = (1; 1) - (${this.Z1[index]}; ${
        this.Z2[index]
      }) = (${combinedValue[0]}; ${combinedValue[1]})`
    },
  },
})
</script>
