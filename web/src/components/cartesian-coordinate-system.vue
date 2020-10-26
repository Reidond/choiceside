<template>
  <v-card elevation="1">
    <v-card-text class="ccs">
      <div class="ccs__item">
        <span>Отримані вектори</span>
        <vectors-katex-element />
        <span>розглянемо на Декартові системі координат:</span>
      </div>
      <csc-inline-vector hide-header hide-footer :items="items">
        <template #item="{ index }">
          <katex-element :expression="getExpression(index)" />
        </template>
      </csc-inline-vector>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { size } from 'mathjs'
import Vue, { VNode } from 'vue'
import { customMapState } from '../helpers'
import { RootState } from '../store'
import { TaskObject } from '../store/modules/task-objects'

const VectorsKatexElement = Vue.extend({
  computed: {
    ...customMapState({
      taskObjects: (state: RootState) => state.taskObjects.objects,
    }),
  },
  render(h, ctx) {
    const katex: VNode[] = this.taskObjects.map((v: TaskObject, i: number) => {
      return h('span', [
        h('katex-element', { props: { expression: `${v.expression} =` } }),
        h('katex-element', { props: { expression: '\\{' } }),
        ...v.expectedAltVector.map((_, j) =>
          h('katex-element', {
            props: { expression: `${v.expression.toLowerCase()}_${j + 1},` },
          })
        ),
        h('katex-element', { props: { expression: '\\}' } }),
      ])
    })
    return h('span', { attrs: { class: 'ccs__item' } }, katex)
  },
})

export default Vue.extend({
  components: {
    VectorsKatexElement,
  },
  computed: {
    ...customMapState({
      taskObjects: (state: RootState) => state.taskObjects.objects,
      colsSize: (state: RootState) => state.taskObjects.colsSize,
    }),
    items() {
      return Array(this.colsSize).fill(0)
    },
  },
  methods: {
    getExpression(index) {
      const first =
        this.taskObjects[0] && this.taskObjects[0].expectedAltVector[index]
      const last =
        this.taskObjects[1] && this.taskObjects[1].expectedAltVector[index]
      return `(${first}; ${last})`
    },
  },
})
</script>

<style scoped>
.ccs {
  display: grid;
  grid-auto-flow: row;
  gap: 10px;
}
.ccs__item {
  display: inline-flex;
  gap: 10px;
  align-items: center;
}
</style>
