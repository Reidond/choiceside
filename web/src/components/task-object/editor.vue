<template>
  <div class="card__grid card__grid--gap20">
    <v-data-table
      v-for="(to, toIndex) in taskObjects"
      :key="toIndex"
      :headers="[
        { text: 'Показники', value: 'data' },
        { text: 'Група показників', value: 'valueGroup' },
      ]"
      :items="valueGroupItems(to)"
      hide-default-footer
      disable-filtering
      disable-sort
    >
      <template v-slot:[`item.data`]="{ value, item }">
        <v-data-table
          :key="toIndex"
          :headers="headers(colsSize)"
          :items="items(value, to, toIndex, item.rawMatrixIndex)"
          hide-default-footer
          disable-filtering
          disable-sort
        >
          <template v-slot:[`header.expression`]></template>
          <template
            v-for="(h, headersIndex) in headers(colsSize)"
            v-slot:[`header.${h.value}`]
          >
            <katex-element
              :key="`expr${h.value}${headersIndex}`"
              :expression="h.text"
            />
          </template>
          <template v-slot:item="{ item, index }">
            <tr>
              <td></td>
              <td
                v-for="(it, itemIndex) in Object.values(item)"
                :key="`id${itemIndex}${nanoid()}`"
                class="text-start"
              >
                <v-text-field
                  class="pa-0 ma-0"
                  hide-details
                  type="number"
                  solo
                  flat
                  :value="it[0]"
                  dense
                  @input="
                    (e) => changeRawMatrix(e, it[2], index, itemIndex, it[1])
                  "
                />
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
import { customMapState } from '../../helpers'
import { RootState } from '../../store'
import { TaskObject } from '../../store/modules/task-objects'
import { nanoid } from 'nanoid'
import cloneDeep from 'web/src/helpers/clone-deep'
import { mapActions } from 'vuex'

export default Vue.extend({
  computed: {
    ...customMapState({
      taskObjects: (state: RootState) => state.taskObjects.objects,
      colsSize: (state: RootState) => state.taskObjects.colsSize,
    }),
  },
  methods: {
    ...mapActions({
      setValuesTaskObject: 'taskObjects/setValuesTaskObject',
    }),
    nanoid,
    valueGroupItems(taskObject: TaskObject) {
      return taskObject.rawMatrix.map((rm, i) => ({
        valueGroup: taskObject.valueGroup,
        rawMatrixIndex: i,
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
    items(value, to: TaskObject, toIndex: number, rawMatrixIndex) {
      const items = value.map((v) => {
        const obj = {}
        v.forEach((p, j) => {
          obj[`x${j + 1}`] = [p, toIndex, rawMatrixIndex]
        })
        return obj
      })
      return items
    },
    changeRawMatrix(
      e: number,
      outerIndex: number,
      innerIndex: number,
      index: number,
      toIndex: number
    ) {
      const taskObject: TaskObject = this.taskObjects[toIndex]
      const rawMatrix = taskObject.rawMatrix
      rawMatrix[outerIndex][innerIndex][index] = e

      console.log(
        `data: ${e}, outerIndex: ${outerIndex}, innerIndex: ${innerIndex}, index: ${index}, toIndex: ${toIndex}`,
        rawMatrix
      )

      this.setValuesTaskObject({
        index: toIndex,
        rawMatrix,
      })
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
