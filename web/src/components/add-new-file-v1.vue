<template>
  <div>
    <v-btn text icon @click="fileRef.click()">
      <v-icon>note_add</v-icon>
    </v-btn>
    <input
      type="file"
      hidden
      multiple
      ref="file"
      @change="fabClick"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import XLSX from 'xlsx'
import { parseXLSXToMatrix } from 'choiceside-lib'
import { customMapState, matrixFlat } from '../helpers'
import { mapActions } from 'vuex'
import { RootState } from '../store'
import { getBuffer } from '../helpers/fs'

export default Vue.extend({
  computed: {
    ...customMapState({
      creditFunds: (state: RootState) => state.fundsBox.creditFunds,
      depositFunds: (state: RootState) => state.fundsBox.depositFunds,
      taskObjects: (state: RootState) => state.taskObjects.objects,
    }),
    fileRef() {
      return this.$refs.file
    },
  },
  methods: {
    ...mapActions({
      setValuesTaskObject: 'taskObjects/setValuesTaskObject',
      setProbableValuesTaskObject: 'taskObjects/setProbableValuesTaskObject',
      pushToObjects: 'taskObjects/pushToObjects',
    }),
    async fabClick(event) {
      const files = event.target.files
      if (files.length < 2) {
        this.$root.$emit('global-error-alert', 'Виберіть хоча б 2 файли')
        return
      }
      this.$root.$emit('global-error-alert', '')
      const fileReader = new FileReader()
      const entries: Array<[string, File]> = Object.entries(files)
      for await (const [i, fh] of entries) {
        const arrayBuffer = await getBuffer(fh)
        const workbook = XLSX.read(arrayBuffer, { type: 'array' })
        const first_worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const data: Array<Record<string, unknown>> = XLSX.utils.sheet_to_json(
          first_worksheet
        )
        try {
          const { rawMatrix, expression } = await parseXLSXToMatrix(data)
          const obj = this.taskObjects[Number(i)]
          if (obj) {
            this.setValuesTaskObject({
              index: Number(i),
              expression,
              rawMatrix,
            })
          } else {
            this.pushToObjects({
              expression,
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
