<template>
  <v-row class="mr-1 ml-1" v-if="taskObjects.length > 0">
    <v-col>
      <task-object-editor />
    </v-col>
    <v-col class="card__grid card__grid--gap20">
      <v-row>
        <task-object-box />
      </v-row>

      <v-row>
        <allowed-to-use>
          <cartesian-coordinate-system />
        </allowed-to-use>
      </v-row>

      <v-row>
        <allowed-to-use>
          <funds-box />
        </allowed-to-use>
      </v-row>

      <v-row>
        <allowed-to-use>
          <probable-values />
        </allowed-to-use>
      </v-row>

      <v-row>
        <allowed-to-use>
          <combined-probable-values />
        </allowed-to-use>
      </v-row>

      <v-row>
        <allowed-to-use>
          <ranking-series-of-alternatives />
        </allowed-to-use>
      </v-row>
    </v-col>
  </v-row>
  <help v-else />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FundsBox from '../components/funds-box.vue'
import TaskObjectBox from '../components/task-object-box.vue'
import CartesianCoordinateSystem from '../components/cartesian-coordinate-system.vue'
import ProbableValues from '../components/probable-values.vue'
import CombinedProbableValues from '../components/combined-probable-values.vue'
import AllowedToUse from '../components/allowed-to-use.vue'
import RankingSeriesOfAlternatives from '../components/ranking-series-of-alternatives.vue'
import TaskObjectEditor from '../components/task-object-editor.vue'
import { customMapState } from '../helpers'
import { RootState } from '../store'
import Help from '../components/help.vue'

export default Vue.extend({
  components: {
    FundsBox,
    TaskObjectBox,
    CartesianCoordinateSystem,
    ProbableValues,
    CombinedProbableValues,
    AllowedToUse,
    RankingSeriesOfAlternatives,
    TaskObjectEditor,
    Help,
  },
  computed: {
    ...customMapState({
      taskObjects: (state: RootState) => state.taskObjects.objects,
    }),
  },
})
</script>
