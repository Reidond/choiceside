<template>
  <v-row>
    <v-col class="home">
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

@Component({
  components: {
    FundsBox,
    TaskObjectBox,
    CartesianCoordinateSystem,
    ProbableValues,
    CombinedProbableValues,
    AllowedToUse,
    RankingSeriesOfAlternatives,
  },
})
export default class Home extends Vue {}
</script>

<style scoped>
.home {
  display: grid;
  grid-auto-flow: row;
  gap: 20px;
}
</style>
