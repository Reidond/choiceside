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
                      :value="it.p"
                      dense
                      @input="
                        (e) =>
                          changeRawMatrix(
                            e,
                            it.rawMatrixIndex,
                            index,
                            itemIndex,
                            it.toIndex
                          )
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
    <v-overlay :opacity="0.95" :value="loadingTaskObjects">
      <v-progress-circular
        :rotate="360"
        :size="100"
        :width="15"
        :value="queueProgress"
        color="primary"
      >
      </v-progress-circular>
    </v-overlay>
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
import {
  queue,
  closeEditorOverlay,
  permanentOverlay,
  onEmitEditorOverlay,
  EmitEditorType,
} from './editor-provider'

export default Vue.extend({
  data() {
    return {
      loadingTaskObjects: false,
      destroyListeners: [],
      queueProgress: 0,
    }
  },
  inject: {
    closeEditorOverlay,
    permanentOverlay,
    onEmitEditorOverlay,
  },
  computed: {
    ...customMapState({
      taskObjects: (state: RootState) => state.taskObjects.objects,
      colsSize: (state: RootState) => state.taskObjects.colsSize,
      creditFunds: (state: RootState) => state.fundsBox.creditFunds,
      depositFunds: (state: RootState) => state.fundsBox.depositFunds,
    }),
  },
  mounted() {
    this.destroyListeners.push(this.onEmitEditorOverlay(this.onOverlayClose))
  },
  beforeDestroy() {
    if (this.destroyListeners.length > 0) {
      this.destroyListeners.forEach((element: () => any) => element())
    }
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
          return this.setProbableValuesTaskObject({
            index,
            funds: this.creditFunds,
          })
        case 1:
          return this.setProbableValuesTaskObject({
            index,
            funds: this.depositFunds,
          })
        default:
          return new Promise((resolve) => resolve(undefined))
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
          obj[`x${j + 1}`] = { p, toIndex, rawMatrixIndex }
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
      rawMatrix[outerIndex][innerIndex][index] = Number(e)

      console.log(
        `data: ${e}, outerIndex: ${outerIndex}, innerIndex: ${innerIndex}, index: ${index}, toIndex: ${toIndex}, pending: ${queue.pending}, size: ${queue.size}`,
        rawMatrix
      )

      queue.pause()
      queue.add(() =>
        this.setValuesTaskObject({
          index: toIndex,
          rawMatrix,
        }).then(() => this.setProbableValuesTaskObjectLocal(toIndex))
      )
    },
    newGroup(toIndex) {
      this.loadingTaskObjects = true
      const taskObject: TaskObject = this.taskObjects[toIndex]
      const rawMatrix = taskObject.rawMatrix
      this.setValuesTaskObject({
        index: toIndex,
        rawMatrix: [...rawMatrix, [Array(this.colsSize).fill(0)]],
      })
        .then(() => this.setProbableValuesTaskObjectLocal(toIndex))
        .finally(() => {
          this.loadingTaskObjects = false
        })
    },
    newAlternative() {
      this.loadingTaskObjects = true
      return Promise.all(
        this.taskObjects.map((element: TaskObject, i: number) => {
          return this.setValuesTaskObject({
            index: i,
            rawMatrix: element.rawMatrix.map((v) => {
              return v.map((v) => {
                return [...v, 0]
              })
            }),
          }).then(() => this.setProbableValuesTaskObjectLocal(i))
        })
      ).finally(() => {
        this.loadingTaskObjects = false
      })
    },
    newRow(items: Array<Record<string, Record<string, number>>>) {
      if (items.length === 0) {
        return
      }
      this.loadingTaskObjects = true
      const toIndex = items[0]['x1'].toIndex
      const outerIndex = items[0]['x1'].rawMatrixIndex
      const taskObject: TaskObject = this.taskObjects[toIndex]
      const rawMatrix = taskObject.rawMatrix
      rawMatrix[outerIndex].push(Array(this.colsSize).fill(0))
      return this.setValuesTaskObject({
        index: toIndex,
        rawMatrix,
      })
        .then(() => this.setProbableValuesTaskObjectLocal(toIndex))
        .finally(() => {
          this.loadingTaskObjects = false
        })
    },
    deleteRow(
      item: Record<string, Record<string, number>>,
      innerIndex: number
    ) {
      this.loadingTaskObjects = true
      const toIndex = item['x1'].toIndex
      const outerIndex = item['x1'].rawMatrixIndex
      const taskObject: TaskObject = this.taskObjects[toIndex]
      const rawMatrix = taskObject.rawMatrix
      const filtered = rawMatrix[outerIndex].filter((_, i) => i !== innerIndex)
      const copy = cloneDeep(rawMatrix)
      copy[outerIndex] = filtered
      return this.setValuesTaskObject({
        index: toIndex,
        rawMatrix: copy,
      })
        .then(() => this.setProbableValuesTaskObjectLocal(toIndex))
        .finally(() => {
          this.loadingTaskObjects = false
        })
    },
    onOverlayClose(e: EmitEditorType) {
      if (e.value) {
        return
      }

      queue.once('active', () => {
        this.permanentOverlay({ value: true })
        this.loadingTaskObjects = true
      })

      queue.on('completed', () => {
        if (this.queueProgress === 100) {
          return (this.queueProgress = 0)
        }
        this.queueProgress = (100 / queue.pending) * (queue.size + 1)
      })

      queue.once('idle', () => {
        this.loadingTaskObjects = false
        this.permanentOverlay({ value: false })
        this.closeEditorOverlay({})
      })

      queue.start()
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
