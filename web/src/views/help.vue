<template>
  <v-container>
    <v-sheet rounded="lg">
      <v-container>
        <v-row>
          <v-col>
            <span>
              Нажміть кнопку "+" та виберіть 2 Excel файли. Наприклад:
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <a :href="`${publicPath}task_object_1.xlsx`">Файл групи цілей 1</a>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <a :href="`${publicPath}task_object_2.xlsx`">Файл групи цілей 2</a>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="demo" text>Або спробуйте демо</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { customMapState, matrixFlat } from '../helpers'
import { K1, K2, K3, K4, K5, D1, D2 } from '@choiceside/lib/matrix-test-data-2'
import { mapActions } from 'vuex'
import { RootState } from '../store'

export default Vue.extend({
  data() {
    return {
      publicPath: process.env.BASE_URL,
    }
  },
  computed: {
    ...customMapState({
      creditFunds: (state: RootState) => state.fundsBox.creditFunds,
      depositFunds: (state: RootState) => state.fundsBox.depositFunds,
    }),
  },
  methods: {
    ...mapActions({
      setValuesTaskObject: 'taskObjects/setValuesTaskObject',
      setProbableValuesTaskObject: 'taskObjects/setProbableValuesTaskObject',
    }),
    demo() {
      const K = [K1().raw, K2().raw, K3().raw, K4().raw, K5().raw]
      const D = [D1().raw, D2().raw]

      this.setValuesTaskObject({
        index: 0,
        valueGroup: 'K',
        valueIndex: 'A',
        rawMatrix: K,
        t: this.creditFunds,
      })

      this.setValuesTaskObject({
        index: 1,
        valueGroup: 'D',
        valueIndex: 'SD',
        rawMatrix: D,
        t: this.depositFunds,
      })

      for (const [i, v] of [this.creditFunds, this.depositFunds].entries()) {
        this.setProbableValuesTaskObject({
          index: i,
          funds: v,
        })
      }

      this.$router.push({ name: 'Home' })
    },
  },
})
</script>
