<template>
  <div class="card__grid card__grid--gap20">
    <v-sheet rounded="lg">
      <v-container>
        <v-row>
          <v-col>
            <task-object-matrices :items="localTaskObjects" />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-sheet rounded="lg">
      <v-container>
        <v-row>
          <v-col>
            <task-object-vectors :items="localTaskObjects" />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import TaskObjectMatrices from './task-object-matrices.vue'
import TaskObjectVectors from './task-object-vectors.vue'

import { customMapState, matrixFlat } from '../helpers'
import {
  K1,
  K2,
  K3,
  K4,
  K5,
  D1,
  D2,
} from '../../../choiceside-lib/matrix-test-data'
import { RootState } from '../store'
import { computeProbableValue } from 'choiceside-lib'

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
  computed: {
    ...customMapState({
      creditFunds: (state: RootState) => state.fundsBox.creditFunds,
      depositFunds: (state: RootState) => state.fundsBox.depositFunds,
    }),
  },
  mounted() {
    const K = [K1().raw, K2().raw, K3().raw, K4().raw, K5().raw]
    const D = [D1().raw, D2().raw]

    const K_ = matrixFlat(...K)
    const D_ = matrixFlat(...D)

    this.setValuesTaskObject({
      index: 0,
      expression: 'K',
      matrix: K_,
      t: this.creditFunds,
    }).then((v) => {
      this.localTaskObjects = v
    })

    this.setValuesTaskObject({
      index: 1,
      expression: 'D',
      matrix: D_,
      t: this.depositFunds,
    }).then((v) => {
      this.localTaskObjects = v
    })
  },
  methods: {
    ...mapActions({
      setValuesTaskObject: 'taskObjects/setValuesTaskObject',
    }),
  },
})
</script>

<style scoped>
</style>
