<template>
  <div v-if="allowed">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { customMapState } from '../helpers'
import { RootState } from '../store'

export default Vue.extend({
  computed: {
    ...customMapState({
      taskObjects: (state: RootState) => state.taskObjects.objects,
    }),
    allowed() {
      return this.taskObjects[0] && this.taskObjects[1]
    },
  },
})
</script>

<style scoped>
</style>
