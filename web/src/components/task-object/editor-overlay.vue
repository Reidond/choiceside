<template>
  <v-navigation-drawer
    :value="showOverlay"
    @input="setShowOverlay($event)"
    temporary
    width="75%"
    app
  >
    <v-container>
      <v-row>
        <v-col>
          <editor />
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import Editor from './editor.vue'
import {
  openEditorOverlay,
  closeEditorOverlay,
  onEmitEditorOverlay,
} from './editor-provider'

export default Vue.extend({
  components: {
    Editor,
  },
  inject: {
    openEditorOverlay,
    closeEditorOverlay,
    onEmitEditorOverlay,
  },
  data() {
    return {
      showOverlay: false,
      destroyListeners: null,
    }
  },
  mounted() {
    this.destroyListeners = this.onEmitEditorOverlay((e: boolean) => {
      this.showOverlay = e
    })
  },
  beforeDestroy() {
    if (this.destroyListeners) {
      this.destroyListeners()
    }
  },
  methods: {
    setShowOverlay(e: boolean) {
      if (e) {
        this.openEditorOverlay()
      } else {
        this.closeEditorOverlay()
      }
    },
  },
})
</script>

<style scoped>
</style>
