<template>
  <v-container class="home">
    <task-object-box />
    <cartesian-coordinate-system />
    <funds-box />
    <probable-values />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FundsBox from '../components/funds-box.vue'
import TaskObjectBox from '../components/task-object-box.vue'
import CartesianCoordinateSystem from '../components/cartesian-coordinate-system.vue'
import ProbableValues from '../components/probable-values.vue'

@Component({
  components: {
    FundsBox,
    TaskObjectBox,
    CartesianCoordinateSystem,
    ProbableValues,
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
