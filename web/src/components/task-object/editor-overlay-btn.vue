<template>
  <allowed-to-use noStyles>
    <v-btn @click="setShowOverlay(true)" color="primary" depressed text>
      Показати редактор
    </v-btn>
  </allowed-to-use>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { customMapState } from 'web/src/helpers'
import { RootState } from 'web/src/store'
import AllowedToUse from '../allowed-to-use.vue'

export default Vue.extend({
  components: {
    AllowedToUse,
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
