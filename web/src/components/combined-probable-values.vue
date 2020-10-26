<template>
  <v-card elevation="1">
    <v-card-text> </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { customMapState } from '../helpers'
import { RootState } from '../store'

export default Vue.extend({
  computed: {
    ...customMapState({
      taskObjects: (state: RootState) => state.taskObjects.objects,
    }),
  },
})
</script>

<style scoped>
</style>
