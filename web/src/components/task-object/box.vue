<template>
  <div class="card__grid card__grid--gap20" :style="{ width: '100%' }">
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
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import TaskObjectMatrices from './matrices.vue'
import TaskObjectVectors from './vectors.vue'
import { RootState } from '../../store'
import { customMapState } from '../../helpers'

export default Vue.extend({
  data() {
    return {}
  },
  components: {
    TaskObjectMatrices,
    TaskObjectVectors,
  },
  computed: {
    ...customMapState({
      taskObjects: (state: RootState) => state.taskObjects.objects,
    }),
  },
})
</script>

<style scoped></style>
