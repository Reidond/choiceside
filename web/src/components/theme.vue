<template>
  <v-btn text icon @click="toggle">
    <v-icon>invert_colors</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      theme: 'theme--light',
    }
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
  },
})
</script>

<style scoped>
</style>
