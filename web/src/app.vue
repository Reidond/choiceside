<template>
  <v-app id="inspire">
    <v-app-bar app flat>
      <v-container class="py-0 fill-height">
        <v-toolbar-title>
          <strong>choiceside</strong>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <global-alert />
        <v-spacer></v-spacer>

        <v-btn text icon @click="fabClick">
          <v-icon>note_add</v-icon>
        </v-btn>
        <v-btn text icon @click="toggle">
          <v-icon>invert_colors</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getFileHandle, fileToArrayBuffer } from './helpers/fs'
import XLSX from 'xlsx'
import { parseXLSXToMatrix } from 'choiceside-lib'
import { customMapState, matrixFlat } from './helpers'
import { mapActions } from 'vuex'
import { RootState } from './store'
import GlobalAlert from './components/global-alert.vue'

export default Vue.extend({
  components: {
    GlobalAlert,
  },
  data() {
    return {
      theme: 'theme--light',
    }
  },
  computed: {
    ...customMapState({
      creditFunds: (state: RootState) => state.fundsBox.creditFunds,
      depositFunds: (state: RootState) => state.fundsBox.depositFunds,
    }),
  },
  created() {
    try {
      const match = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'theme--dark'
        : 'theme--light'
      if (!('theme' in localStorage)) {
        localStorage.theme = match
      }
      this.theme = match
      this.$vuetify.theme.dark = match === 'theme--dark'
      document.querySelector('html').classList.add(match)
    } catch (e) {
      // ignore — could be SSR, or e.g. Firefox with restrictive permissions
    }
  },
  methods: {
    ...mapActions({
      setValuesTaskObject: 'taskObjects/setValuesTaskObject',
      setProbableValuesTaskObject: 'taskObjects/setProbableValuesTaskObject',
      pushToObjects: 'taskObjects/pushToObjects',
    }),
    toggle() {
      const { classList } = document.querySelector('html')
      classList.remove(this.theme)
      this.theme =
        this.theme === 'theme--light' ? 'theme--dark' : 'theme--light'
      classList.add(this.theme)
      this.$vuetify.theme.dark = this.theme === 'theme--dark'
      try {
        localStorage.theme = this.theme
      } catch (e) {
        // ignore
      }
    },
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
          const { arrayOfMatrices, expression } = await parseXLSXToMatrix(data)
          const arrayOfMatrices_ = matrixFlat(...arrayOfMatrices)
          this.pushToObjects({
            expression,
            matrix: arrayOfMatrices_,
          })
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

<style>
.theme--dark {
  -webkit-tap-highlight-color: #121212;
}
.theme--light {
  -webkit-tap-highlight-color: #fff;
}
</style>
