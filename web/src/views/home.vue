<template>
  <v-container>
    <funds-box />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import storeProxy from '../store/proxy'
import { matrixFlat } from '../helpers'
import { K1, K2, K3, K4, K5, D1, D2 } from 'choiceside-lib/matrix-test-data'
import FundsBox from '../components/funds-box.vue'

@Component({
  components: {
    FundsBox,
  },
})
export default class Home extends Vue {
  taskObjects = storeProxy.taskObjects

  mounted() {
    const K = [K1().raw, K2().raw, K3().raw, K4().raw, K5().raw]
    const D = [D1().raw, D2().raw]

    const K_ = matrixFlat(...K)
    const D_ = matrixFlat(...D)

    this.taskObjects.populateTaskObject({
      index: 0,
      matrix: K_,
    })
    this.taskObjects.populateTaskObject({
      index: 1,
      matrix: D_,
    })
  }
}
</script>

<style scoped>
</style>
