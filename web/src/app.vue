<template>
  <v-app id="inspire">
    <v-app-bar app flat>
      <v-container class="py-0 fill-height">
        <v-toolbar-title>
          <strong>choiceside</strong>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn text icon @click="toggle">
          <v-icon>mdi-theme-light-dark</v-icon>
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

@Component
export default class App extends Vue {
  theme = 'theme--light'
  theme = 'theme--dark'

  created() {
    try {
      const match = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'theme--dark'
        : 'theme--light'
      if (!('theme' in localStorage)) {
        localStorage.theme = match
      }
      this.theme = match
      this.$vuetify.theme.dark = this.theme === 'theme--dark'
      document.querySelector('html').classList.add(localStorage.theme)
    } catch (e) {
      // ignore — could be SSR, or e.g. Firefox with restrictive permissions
    }
  }

  toggle = () => {
    const { classList } = document.querySelector('html')
    classList.remove(this.theme)
    this.theme = this.theme === 'theme--light' ? 'theme--dark' : 'theme--light'
    classList.add(this.theme)
    this.$vuetify.theme.dark = this.theme === 'theme--dark'
    try {
      localStorage.theme = this.theme
    } catch (e) {
      // ignore
    }
  }
}
</script>

<style>
.theme--dark {
  -webkit-tap-highlight-color: #121212;
}
.theme--light {
  -webkit-tap-highlight-color: #fff;
}
</style>
