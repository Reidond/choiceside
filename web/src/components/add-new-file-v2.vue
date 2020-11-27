<template>
  <v-btn text icon @click="fabClick">
    <v-icon>note_add</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import { fileToArrayBuffer, getFileHandle } from '../helpers/fs'
import XLSX from 'xlsx'
import { parseXLSXToMatrix } from '@choiceside/lib'
import { customMapState, matrixFlat } from '../helpers'
import { mapActions } from 'vuex'
import { RootState } from '../store'

export default Vue.extend({
  computed: {
    ...customMapState({
      creditFunds: (state: RootState) => state.fundsBox.creditFunds,
      depositFunds: (state: RootState) => state.fundsBox.depositFunds,
      taskObjects: (state: RootState) => state.taskObjects.objects,
    }),
  },
  methods: {
    ...mapActions({
      setValuesTaskObject: 'taskObjects/setValuesTaskObject',
      setProbableValuesTaskObject: 'taskObjects/setProbableValuesTaskObject',
      pushToObjects: 'taskObjects/pushToObjects',
    }),
    async fabClick() {
      let fileHandles
      try {
        fileHandles = await getFileHandle()
      } catch (e) {
        this.$root.$emit('global-error-alert', 'Виберіть хоча б 2 файли')
      }
      this.$root.$emit('global-error-alert', '')
      for await (const [i, fh] of fileHandles.entries()) {
        const file = await fh.getFile()
        const arrayBuffer = await fileToArrayBuffer(file)
        const workbook = XLSX.read(arrayBuffer, { type: 'array' })
        const first_worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const data: Array<Record<string, unknown>> = XLSX.utils.sheet_to_json(
          first_worksheet
        )
        try {
          const { rawMatrix, expression } = await parseXLSXToMatrix(data)
          const obj = this.taskObjects[i]
          if (obj) {
            this.setValuesTaskObject({
              index: i,
              valueGroup: expression,
              rawMatrix,
            })
          } else {
            this.pushToObjects({
              valueGroup: expression,
              rawMatrix,
            })
          }
        } catch {
          this.$root.$emit(
            'global-error-alert',
            'Невдалося вибрати інформацію з наданих файлів. Будь-ласка провірте що вони правильні'
          )
        }
      }
      for (const [i, v] of [this.creditFunds, this.depositFunds].entries()) {
        this.setProbableValuesTaskObject({
          index: i,
          funds: v,
        })
      }
    },
  },
})
</script>

<style scoped></style>
