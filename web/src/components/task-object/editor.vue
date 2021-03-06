<template>
  <div class="card__grid card__grid--gap20">
    <div
      role="region"
      aria-labelledby="Caption01"
      tabindex="0"
      v-for="(to, toIndex) in taskObjects"
      :key="toIndex"
    >
      <v-data-table
        class="rounded-lg"
        :headers="[
          { text: 'Показники', value: 'data' },
          { text: 'Група показників', value: 'valueGroup' },
        ]"
        :items="valueGroupItems(to)"
        hide-default-footer
        disable-filtering
        disable-sort
        dense
      >
        <template v-slot:top>
          <v-toolbar class="rounded-lg-only-top mb-2" flat dense>
            <div class="card__grid-item">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    small
                    depressed
                    icon
                    @click="newGroup(toIndex)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>keyboard_arrow_down</v-icon>
                  </v-btn>
                </template>
                <span>Нова група</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    small
                    depressed
                    icon
                    @click="newAlternative"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>keyboard_arrow_right</v-icon>
                  </v-btn>
                </template>
                <span>Нова альтернатива</span>
              </v-tooltip>
            </div>
          </v-toolbar>
        </template>
        <template v-slot:[`item.valueGroup`]="{ value, item }">
          {{ `${value}${item.rawMatrixIndex + 1}` }}
        </template>
        <template v-slot:[`item.data`]="{ value, item }">
          <div role="region" aria-labelledby="Caption01" tabindex="0">
            <v-data-table
              :key="toIndex"
              :headers="headers(colsSize)"
              :items="items(value, to, toIndex, item.rawMatrixIndex)"
              hide-default-footer
              disable-filtering
              disable-sort
              dense
            >
              <template v-slot:[`body.append`]="{ items }">
                <tr>
                  <td>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          small
                          depressed
                          icon
                          v-bind="attrs"
                          v-on="on"
                          @click="newRow(items)"
                        >
                          <v-icon>add_circle</v-icon>
                        </v-btn>
                      </template>
                      <span>Новий рядок</span>
                    </v-tooltip>
                  </td>
                </tr>
              </template>
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
                  <td>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          small
                          depressed
                          icon
                          v-bind="attrs"
                          v-on="on"
                          @click="deleteRow(item, index)"
                        >
                          <v-icon>delete</v-icon>
                        </v-btn>
                      </template>
                      <span>Видалити рядок</span>
                    </v-tooltip>
                  </td>
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
                        (e) =>
                          changeRawMatrix(e, it[2], index, itemIndex, it[1])
                      "
                    />
                  </td>
                </tr>
              </template>
            </v-data-table>
          </div>
        </template>
      </v-data-table>
    </div>
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
      creditFunds: (state: RootState) => state.fundsBox.creditFunds,
      depositFunds: (state: RootState) => state.fundsBox.depositFunds,
    }),
  },
  methods: {
    ...mapActions({
      setValuesTaskObject: 'taskObjects/setValuesTaskObject',
      setProbableValuesTaskObject: 'taskObjects/setProbableValuesTaskObject',
    }),
    nanoid,
    setProbableValuesTaskObjectLocal(index: number) {
      switch (index) {
        case 0:
          this.setProbableValuesTaskObject({
            index,
            funds: this.creditFunds,
          })
          break
        case 1:
          this.setProbableValuesTaskObject({
            index,
            funds: this.depositFunds,
          })
          break
        default:
          break
      }
    },
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
      this.setProbableValuesTaskObjectLocal(toIndex)
    },
    newGroup(toIndex) {
      const taskObject: TaskObject = this.taskObjects[toIndex]
      const rawMatrix = taskObject.rawMatrix
      this.setValuesTaskObject({
        index: toIndex,
        rawMatrix: [...rawMatrix, [Array(this.colsSize).fill(0)]],
      })
      this.setProbableValuesTaskObjectLocal(toIndex)
    },
    newAlternative() {
      this.taskObjects.forEach((element: TaskObject, i: number) => {
        this.setValuesTaskObject({
          index: i,
          rawMatrix: element.rawMatrix.map((v) => {
            return v.map((v) => {
              return [...v, 0]
            })
          }),
        })
        this.setProbableValuesTaskObjectLocal(i)
      })
    },
    newRow(items: Array<Record<string, unknown>>) {
      if (items.length === 0) {
        return
      }
      const toIndex = items[0]['x1'][1]
      const outerIndex = items[0]['x1'][2]
      const taskObject: TaskObject = this.taskObjects[toIndex]
      const rawMatrix = taskObject.rawMatrix
      rawMatrix[outerIndex].push(Array(this.colsSize).fill(0))
      this.setValuesTaskObject({
        index: toIndex,
        rawMatrix,
      })
      this.setProbableValuesTaskObjectLocal(toIndex)
    },
    deleteRow(item: any, innerIndex: number) {
      const toIndex = item['x1'][1]
      const outerIndex = item['x1'][2]
      const taskObject: TaskObject = this.taskObjects[toIndex]
      const rawMatrix = taskObject.rawMatrix
      const filtered = rawMatrix[outerIndex].filter((_, i) => i !== innerIndex)
      const copy = cloneDeep(rawMatrix)
      copy[outerIndex] = filtered
      this.setValuesTaskObject({
        index: toIndex,
        rawMatrix: copy,
      })
      this.setProbableValuesTaskObjectLocal(toIndex)
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

.card__grid >>> input::-webkit-outer-spin-button,
.card__grid >>> input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

.card__grid >>> input[type='number'] {
  -moz-appearance: textfield; /* Firefox */
}

[role='region'][aria-labelledby][tabindex] {
  overflow: auto;
}

[role='region'][aria-labelledby][tabindex]:focus {
  outline: 0.1em solid rgba(0, 0, 0, 0.1);
}
</style>
