<template>
  <csc-select-field-katex
    :items="depositFundsItems"
    :value="value"
    @input="$emit('input', $event)"
    expression="A_2"
    internal-index="2"
    label="Потреба в депозитних коштах"
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
      depositFundsItems: (state: RootState) => state.fundsBox.depositFundsItems,
    }),
  },
})
</script>

<style scoped>
</style>
