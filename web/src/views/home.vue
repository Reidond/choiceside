<template>
  <v-container class="home">
    <task-object-box />
    <funds-box />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FundsBox from '../components/funds-box.vue'
import TaskObjectBox from '../components/task-object-box.vue'

@Component({
  components: {
    FundsBox,
    TaskObjectBox,
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
