<template>
  <v-container class="home">
    <task-object-box />

    <allowed-to-use>
      <cartesian-coordinate-system />
    </allowed-to-use>

    <allowed-to-use>
      <funds-box />
    </allowed-to-use>

    <allowed-to-use>
      <probable-values />
    </allowed-to-use>

    <allowed-to-use>
      <combined-probable-values />
    </allowed-to-use>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FundsBox from '../components/funds-box.vue'
import TaskObjectBox from '../components/task-object-box.vue'
import CartesianCoordinateSystem from '../components/cartesian-coordinate-system.vue'
import ProbableValues from '../components/probable-values.vue'
import CombinedProbableValues from '../components/combined-probable-values.vue'
import AllowedToUse from '../components/allowed-to-use.vue'

@Component({
  components: {
    FundsBox,
    TaskObjectBox,
    CartesianCoordinateSystem,
    ProbableValues,
    CombinedProbableValues,
    AllowedToUse,
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
