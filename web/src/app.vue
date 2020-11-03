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

        <add-new-file />
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
import AddNewFile from './components/add-new-file.vue'
import Theme from './components/theme.vue'

export default Vue.extend({
  components: {
    GlobalAlert,
    AddNewFile,
    Theme,
  },
  mounted() {
    if (navigator.userAgent.indexOf('Chrome/86') === -1) {
      this.$root.$emit(
        'global-error-alert',
        'Ця веб-сторінка не працює з версію Chrome менше за 86, або іншим браузером.',
        true
      )
    }
  },
})
</script>
