<template>
  <allowed-to-use noStyles>
    <v-btn @click="openEditorOverlay()" color="primary" depressed text>
      Показати редактор
    </v-btn>
  </allowed-to-use>
</template>

<script>
import Vue from 'vue'
import AllowedToUse from '../allowed-to-use.vue'
import { openEditorOverlay } from './editor-provider'

export default Vue.extend({
  components: {
    AllowedToUse,
  },
  inject: {
    openEditorOverlay,
  },
  computed: {},
  methods: {},
})
</script>

<style scoped>
</style>
