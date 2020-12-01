<template>
  <div class="card__grid card__grid--gap10">
    <div v-for="(to, i) in items" :key="`vector${i}`" class="card__grid-item">
      <csc-inline-vector
        :items="to.expectedAltVector"
        :left-expression="`${to.valueGroup} =`"
        :right-expression="`G${i + 1}`"
        :main-expression="to.valueGroup"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { customMapState } from '../../helpers'
import { RootState } from '../../store'
import { TaskObject } from '../../store/modules/task-objects'

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
.task-object-vectors {
  display: grid;
  grid-auto-flow: row;
  gap: 10px;
}
.task-object-vectors__item {
  display: grid;
  grid-auto-flow: row;
  gap: 10px;
}
</style>
