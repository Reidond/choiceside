<template>
  <v-navigation-drawer
    :value="showOverlay"
    :permanent="permanent"
    @input="
      ;(mode === 'auto' || mode === 'manual-close') && setShowOverlay($event)
    "
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
  onEmitPermanentOverlay,
  EmitEditorType,
} from './editor-provider'

export default Vue.extend({
  props: {
    mode: {
      type: String,
      default: 'auto',
    },
  },
  components: {
    Editor,
  },
  inject: {
    openEditorOverlay,
    closeEditorOverlay,
    onEmitEditorOverlay,
    onEmitPermanentOverlay,
  },
  data() {
    return {
      showOverlay: false,
      permanent: false,
      destroyListeners: [],
    }
  },
  mounted() {
    this.destroyListeners.push(
      this.onEmitPermanentOverlay((e: Record<string, unknown>) => {
        this.permanent = e.value
      })
    )
    this.destroyListeners.push(
      this.onEmitEditorOverlay((e: EmitEditorType) => {
        this.showOverlay = e.value
      })
    )
  },
  beforeDestroy() {
    if (this.destroyListeners.length > 0) {
      this.destroyListeners.forEach((element: () => any) => element())
    }
  },
  methods: {
    setShowOverlay(e: boolean) {
      if (e) {
        this.openEditorOverlay({})
      } else {
        this.closeEditorOverlay({})
      }
    },
  },
})
</script>

<style scoped>
</style>
