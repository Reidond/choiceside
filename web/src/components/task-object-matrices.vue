<template>
  <div class="task-object-matrices">
    <div
      v-for="(to, i) in items"
      :key="`vector${i}`"
      class="task-object-matrices__item"
    >
      <csc-matrix-table
        :items="to.expectedAltMatrix"
        :left-expression="`\\overline{${to.expression}}`"
        :main-expression="`${to.expression}`"
        :internal-index="i + 1"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { customMapState } from '../helpers'
import { RootState } from '../store'
import { TaskObject } from '../store/modules/task-objects'

export default Vue.extend({
  props: {
    items: {
      type: Array as PropType<TaskObject[]>,
      default: [],
    },
  },
})
</script>

<style scoped>
.task-object-matrices {
  display: grid;
  grid-auto-flow: row;
  gap: 10px;
}
.task-object-matrices__item {
  display: grid;
  grid-auto-flow: row;
  gap: 10px;
}
</style>
