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

        <add-new-file-v1 v-if="version === 1" />
        <add-new-file-v2 v-else-if="version === 2" />
        <theme />
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
import GlobalAlert from './components/global-alert.vue'
import AddNewFileV1 from './components/add-new-file-v1.vue'
import AddNewFileV2 from './components/add-new-file-v2.vue'
import Theme from './components/theme.vue'
import parser from 'ua-parser-js'

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
