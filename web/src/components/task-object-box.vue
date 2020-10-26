<template>
  <div class="task-object-box">
    <v-card elevation="1" tile>
      <v-card-text>
        <task-object-matrices :items="localTaskObjects" />
      </v-card-text>
    </v-card>
    <v-card elevation="1" tile>
      <v-card-text>
        <task-object-vectors :items="localTaskObjects" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import TaskObjectMatrices from './task-object-matrices.vue'
import TaskObjectVectors from './task-object-vectors.vue'

import { matrixFlat } from '../helpers'
import { K1, K2, K3, K4, K5, D1, D2 } from 'choiceside-lib/matrix-test-data'

export default Vue.extend({
  data() {
    return {
      localTaskObjects: [],
    }
  },
  components: {
    TaskObjectMatrices,
    TaskObjectVectors,
  },
  mounted() {
    const K = [K1().raw, K2().raw, K3().raw, K4().raw, K5().raw]
    const D = [D1().raw, D2().raw]

    const K_ = matrixFlat(...K)
    const D_ = matrixFlat(...D)

    this.populateTaskObject({
      index: 0,
      expression: 'K',
      matrix: K_,
    }).then((v) => {
      this.localTaskObjects = v
    })

    this.populateTaskObject({
      index: 1,
      expression: 'D',
      matrix: D_,
    }).then((v) => {
      this.localTaskObjects = v
    })
  },
  methods: {
    ...mapActions({
      populateTaskObject: 'taskObjects/populateTaskObject',
    }),
  },
})
</script>

<style scoped>
.task-object-box {
  display: grid;
  grid-auto-flow: row;
  gap: 20px;
}
</style>
