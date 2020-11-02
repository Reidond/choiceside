<template>
  <div class="card__grid card__grid--gap20" v-if="taskObjects.length > 0">
    <v-sheet rounded="lg">
      <v-container>
        <v-row>
          <v-col>
            <task-object-matrices :items="taskObjects" />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-sheet rounded="lg">
      <v-container>
        <v-row>
          <v-col>
            <task-object-vectors :items="taskObjects" />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
  <help v-else />
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import TaskObjectMatrices from './task-object-matrices.vue'
import TaskObjectVectors from './task-object-vectors.vue'
import Help from './help.vue'
import { RootState } from '../store'
import { customMapState } from '../helpers'

export default Vue.extend({
  data() {
    return {}
  },
  components: {
    TaskObjectMatrices,
    TaskObjectVectors,
    Help,
  },
  computed: {
    ...customMapState({
      taskObjects: (state: RootState) => state.taskObjects.objects,
    }),
  },
})
</script>

<style scoped>
</style>
