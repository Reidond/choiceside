<template>
  <div class="card__grid card__grid--gap20">
    <v-data-table
      v-for="(to, i) in taskObjects"
      :key="i"
      :headers="[{ text: 'Група показників', value: 'valueGroup' }]"
      :items="valueGroupItems(to)"
      hide-default-footer
    >
      <template v-slot:[`item.valueGroup`]="{ value }">
        <v-data-table
          v-for="(to, i) in taskObjects"
          :key="i"
          :headers="[{ text: 'Група показників', value: 'valueGroup' }]"
          :items="valueGroupItems(to)"
          hide-default-footer
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
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { customMapState } from '../helpers'
import { RootState } from '../store'
import { TaskObject } from '../store/modules/task-objects'

export default Vue.extend({
  computed: {
    ...customMapState({
      taskObjects: (state: RootState) => state.taskObjects.objects,
    }),
  },
  methods: {
    valueGroupItems(taskObject: TaskObject) {
      return taskObject.rawMatrix.map((rm) => ({ valueGroup: rm }))
    },
  },
})
</script>

<style scoped></style>
