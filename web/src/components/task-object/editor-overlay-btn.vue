<template>
  <allowed-to-use noStyles>
    <v-btn @click="onClick" color="primary" depressed text>
      Показати редактор
    </v-btn>
  </allowed-to-use>
</template>

<script>
import Vue from 'vue'
import AllowedToUse from '../allowed-to-use.vue'
import { openEditorOverlay } from './editor-provider'

export default Vue.extend({
  props: {
    mode: {
      type: String,
      default: 'auto',
    },
  },
  components: {
    AllowedToUse,
  },
  inject: {
    openEditorOverlay,
  },
  computed: {},
  methods: {
    onClick() {
      this.openEditorOverlay({})
    },
  },
})
</script>

<style scoped>
</style>
