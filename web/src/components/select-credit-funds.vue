<template>
  <csc-select-field-katex
    :items="creditFundsItems"
    :value="value"
    @input="$emit('input', $event)"
    expression="A_1"
    internal-index="1"
    label="Потреба в кредитних коштах"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { customMapState } from '../helpers'
import { RootState } from '../store'

export default Vue.extend({
  props: {
    value: {
      type: [String, Number],
      default: 0,
    },
  },
  computed: {
    ...customMapState({
      creditFundsItems: (state: RootState) => state.fundsBox.creditFundsItems,
    }),
  },
})
</script>

<style scoped>
</style>
