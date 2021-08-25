<template>
  <v-app id="inspire">
    <v-app-bar fixed app flat>
      <v-container fluid class="py-0 fill-height">
        <v-toolbar-title class="icon-title">
          <csc-icon-shorts :size="32" />
          <strong>choiceside</strong>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <global-alert />
        <v-spacer></v-spacer>

        <EditorProvider>
          <editor-overlay-btn mode="manual-close" />
        </EditorProvider>
        <FsComponentProvider />
        <csc-vuetify-theme-btn />
      </v-container>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <EditorProvider>
      <editor-overlay mode="manual-close" />
    </EditorProvider>
  </v-app>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
import GlobalAlert from './components/global-alert.vue'
import EditorOverlay from './components/task-object/editor-overlay.vue'
import EditorOverlayBtn from './components/task-object/editor-overlay-btn.vue'
import EditorProvider from './components/task-object/editor-provider'
import FsComponentProvider from './components/fs/fs-component-provider'

export default Vue.extend({
  components: {
    GlobalAlert,
    EditorOverlay,
    EditorOverlayBtn,
    EditorProvider,
    FsComponentProvider,
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
