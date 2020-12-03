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
import { mapActions } from 'vuex'
import { customMapState } from 'web/src/helpers'
import { RootState } from 'web/src/store'
import Editor from './editor.vue'

export default Vue.extend({
  components: {
    Editor,
  },
  computed: {
    ...customMapState({
      showOverlay: (state: RootState) => state.editorOverlay.showOverlay,
    }),
  },
  methods: {
    ...mapActions({
      setShowOverlay: 'editorOverlay/setShowOverlay',
    }),
  },
})
</script>

<style scoped>
</style>
