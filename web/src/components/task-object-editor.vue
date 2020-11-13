<template>
  <div>
    <!-- <v-data-table
      v-for="(to, i) in taskObjects"
      :key="i"
      :headers="headers"
      :items="items"
      hide-default-footer
    >
      <template v-slot:[`header.expression`]></template>
      <template v-for="(h, i) in headers" v-slot:[`header.${h.value}`]>
        <katex-element :key="`expr${h.value}${i}`" :expression="h.text" />
      </template>
      <template v-slot:[`item.expression`]="{ value }">
        <katex-element :expression="value" />
      </template>
    </v-data-table> -->
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
  },
})
</script>

<style scoped></style>
