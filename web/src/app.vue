<template>
  <v-app id="inspire">
    <v-app-bar app flat>
      <v-container fluid class="py-0 fill-height">
        <v-toolbar-title class="icon-title">
          <iconShorts :size="32" />
          <strong>choiceside</strong>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <global-alert />
        <v-spacer></v-spacer>

        <add-new-file-v1 v-if="version === 1" />
        <add-new-file-v2 v-else-if="version === 2" />
        <theme />
      </v-container>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import GlobalAlert from './components/global-alert.vue'
import AddNewFileV1 from './components/add-new-file-v1.vue'
import AddNewFileV2 from './components/add-new-file-v2.vue'
import Theme from './components/theme.vue'
import parser from 'ua-parser-js'
import iconShorts from './components/icon-shorts.vue'

export default Vue.extend({
  data() {
    return {
      version: 1,
    }
  },
  components: {
    GlobalAlert,
    'add-new-file-v1': AddNewFileV1,
    'add-new-file-v2': AddNewFileV2,
    Theme,
    iconShorts,
  },
  mounted() {
    const ua = parser(navigator.userAgent)
    if (ua.browser.name === 'Chrome' && Number(ua.browser.major) >= 86) {
      this.version = 2
    } else {
      this.version = 1
    }
  },
})
</script>

<style scoped>
.icon-title {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  justify-items: center;
}
</style>
