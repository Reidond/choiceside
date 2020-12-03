<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text icon @click="fileRef.click()" v-bind="attrs" v-on="on">
          <v-icon>note_add</v-icon>
        </v-btn>
      </template>
      <span>Загрузити файл Excel</span>
    </v-tooltip>
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
import { parseXLSXToMatrix, matrixFlat } from '@choiceside/lib'
import { customMapState } from '../../helpers'
import { mapActions } from 'vuex'
import { RootState } from '../../store'
import { getBuffer } from '../../helpers/fs'

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
            await this.setValuesTaskObject({
              index: Number(i),
              valueGroup: expression,
              rawMatrix,
            })
          } else {
            await this.pushToObjects({
              valueGroup: expression,
              rawMatrix,
            })
          }
          for (const [i, v] of [
            this.creditFunds,
            this.depositFunds,
          ].entries()) {
            this.setProbableValuesTaskObject({
              index: i,
              funds: v,
            })
          }
          this.$router.push({ name: 'Home' })
        } catch {
          this.$root.$emit(
            'global-error-alert',
            'Невдалося вибрати інформацію з наданих файлів. Будь-ласка провірте що вони правильні'
          )
          return
        }
      }
    },
  },
})
</script>

<style scoped></style>
