<template>
  <fade-transition>
    <v-alert class="mb-0" outlined dense type="error" v-if="errMsg">
      {{ errMsg }}
    </v-alert>
  </fade-transition>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      errMsg: '',
    }
  },
  mounted() {
    this.$root.$on('global-error-alert', (v) => {
      this.errMsg = v
      if (v) {
        const timeout = setTimeout(() => {
          this.errMsg = ''
          clearTimeout(timeout)
        }, 3000)
      }
    })
  },
  beforeDestroy() {
    this.$root.$off('global-error-alert')
  },
})
</script>

<style scoped>
</style>
