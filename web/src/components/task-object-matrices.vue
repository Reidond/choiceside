<template>
  <div class="card__grid card__grid--gap10">
    <div v-for="(to, i) in items" :key="`vector${i}`" class="card__grid-item">
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
</style>
