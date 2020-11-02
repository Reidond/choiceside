<template>
  <div class="probable-values">
    <csc-loading-flash :watched="[creditFunds, depositFunds]">
      <template #default="{loading}">
        <v-data-table
          :headers="headers"
          :items="items"
          hide-default-footer
          :loading="loading"
        >
          <template v-slot:[`header.expression`]></template>
          <template v-for="(h, i) in headers" v-slot:[`header.${h.value}`]>
            <katex-element :key="`expr${h.value}${i}`" :expression="h.text" />
          </template>
          <template v-slot:[`item.expression`]="{ value }">
            <katex-element :expression="value" />
          </template>
        </v-data-table>
      </template>
    </csc-loading-flash>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { customMapState } from '../helpers'
import { RootState } from '../store'
import { TaskObject } from '../store/modules/task-objects'

export default Vue.extend({
  components: {},
  computed: {
    ...customMapState({
      creditFunds: (state: RootState) => state.fundsBox.creditFunds,
      depositFunds: (state: RootState) => state.fundsBox.depositFunds,
      taskObjects: (state: RootState) => state.taskObjects.objects,
      colsSize: (state: RootState) => state.taskObjects.colsSize,
    }),
    headers() {
      return [
        { text: '', value: 'expression' },
        ...Array(this.colsSize)
          .fill(0)
          .map((_, i) => ({
            text: `x_${i + 1}`,
            value: `x${i + 1}`,
          })),
      ]
    },
    items() {
      return this.taskObjects.map((v: TaskObject, i) => {
        const obj = {
          expression: `\\mu(f_{${i + 1}i})`,
        }
        v.probableValues &&
          v.probableValues.forEach((p, j) => {
            obj[`x${j + 1}`] = p
          })
        return obj
      })
    },
  },
})
</script>

<style scoped>
.probable-values {
  width: 100;
}

.probable-values
  >>> .theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: transparent;
}
</style>
