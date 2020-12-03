<template>
  <div :class="{ 'allowed-to-use': !noStyles }" v-if="allowed">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { customMapState } from '../helpers'
import { RootState } from '../store'

export default Vue.extend({
  props: {
    noStyles: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...customMapState({
      taskObjects: (state: RootState) => state.taskObjects.objects,
    }),
    allowed() {
      return Boolean(this.taskObjects[0] && this.taskObjects[1])
    },
  },
})
</script>

<style scoped>
.allowed-to-use {
  width: 100%;
}
</style>
