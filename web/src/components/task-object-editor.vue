<template>
  <div class="card__grid card__grid--gap20">
    <v-data-table
      v-for="(to, i) in taskObjects"
      :key="i"
      :headers="[
        { text: 'Показники', value: 'data' },
        { text: 'Група показників', value: 'valueGroup' },
      ]"
      :items="valueGroupItems(to)"
      hide-default-footer
    >
      <template v-slot:[`item.data`]="{ value }">
        <v-data-table
          :key="i"
          :headers="headers(colsSize)"
          :items="items(value, to)"
          hide-default-footer
        >
          <template v-slot:[`header.expression`]></template>
          <template
            v-for="(h, i) in headers(colsSize)"
            v-slot:[`header.${h.value}`]
          >
            <katex-element :key="`expr${h.value}${i}`" :expression="h.text" />
          </template>
          <template v-slot:item="{ item, index }">
            <tr>
              <td></td>
              <td
                v-for="(it, i) in Object.values(item)"
                :key="`id${i}${nanoid()}`"
                contenteditable="true"
                class="text-start"
                @input="(e) => changeRawMatrix(e, index, i)"
              >
                {{ it }}
              </td>
            </tr>
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
import { nanoid } from 'nanoid'

export default Vue.extend({
  computed: {
    ...customMapState({
      taskObjects: (state: RootState) => state.taskObjects.objects,
      colsSize: (state: RootState) => state.taskObjects.colsSize,
    }),
  },
  methods: {
    nanoid,
    valueGroupItems(taskObject: TaskObject) {
      return taskObject.rawMatrix.map((rm) => ({
        valueGroup: taskObject.valueGroup,
        data: rm,
      }))
    },
    headers(size: number) {
      return [
        { text: '', value: 'expression' },
        ...Array(size)
          .fill(0)
          .map((_, i) => ({
            text: `x_${i + 1}`,
            value: `x${i + 1}`,
          })),
      ]
    },
    items(value, to: TaskObject) {
      const items = value.map((v, i) => {
        const obj = {}
        v.forEach((p, j) => {
          obj[`x${j + 1}`] = p
        })
        return obj
      })
      return items
    },
    changeRawMatrix(e, outerIndex, innerIndex) {
      if (isNaN(Number(e.target.textContent))) {
        return
      }
      console.log(Number(e.target.textContent), outerIndex, innerIndex)
    },
  },
})
</script>

<style scoped>
.card__grid
  >>> .theme--dark.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: transparent;
}

.card__grid
  >>> .theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: transparent;
}
</style>
