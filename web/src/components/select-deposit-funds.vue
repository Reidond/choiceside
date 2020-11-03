<template>
  <csc-select-field-katex
    :items="taskFundItems"
    :value="value"
    @input="$emit('input', $event)"
    expression="A_2"
    internal-index="2"
    label="Потреба в цілі"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { customMapState } from '../helpers'
import { RootState } from '../store'

export default Vue.extend({
  props: {
    value: {
      type: [Number, String],
      default: 0,
    },
  },
  computed: {
    ...customMapState({
      taskFundItems: (state: RootState) => state.fundsBox.taskFundItems,
    }),
  },
})
</script>

<style scoped>
</style>
