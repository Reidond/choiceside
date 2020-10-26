<template>
  <v-card elevation="1">
    <v-card-text class="card-grid">
      <span>
        Для отримання величин
        <matrices-katex-element />
        використовуємо формулу
        <katex-element :expression="formula" />
      </span>
      <span v-for="(cv, i) in localCombinedValues" :key="`cv${i}`">
        <katex-element :expression="generateExpression(i, cv)" />
      </span>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue, { VNode } from 'vue'
import { mapActions } from 'vuex'
import { customMapState } from '../helpers'
import { RootState } from '../store'
import { TaskObject } from '../store/modules/task-objects'

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
        this.invalidate(val[0], val[1])
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
          const precision = 2
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

<style scoped>
.card-grid {
  display: grid;
  grid-auto-flow: row;
  gap: 20px;
}
</style>
