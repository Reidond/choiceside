<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    :style="{ width: normalizedSize, height: normalizedSize }"
  >
    <text y=".9em" font-size="80">🩳</text>
  </svg>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    size: {
      type: [Number, String],
      default: '24px',
    },
  },
  computed: {
    normalizedSize() {
      if (typeof this.size === 'number') {
        return `${this.size}px`
      }
      return this.size
    },
  },
})
</script>

<style lang="scss" scoped>
</style>
