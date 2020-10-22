<template>
  <v-card>
    <v-card-title>
      <h6 class="text-h6">Вхідні дані</h6>
    </v-card-title>
    <v-card-text>
      <alternatives-number-x />
      <number-group-indicators />
      <!-- <div class="tables">
        <v-data-table
          :headers="headers"
          :items="items"
          item-key="name"
          sort-by="name"
          group-by="category"
          hide-default-footer
        >
          <template v-slot:[`body.append`]>
            <tr>
              <td colspan="0" class="text-center">
                <v-icon>add_circle</v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>
      </div> -->
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AlternativesNumberX from './alternatives-number-x.vue'
import NumberGroupIndicators from './number-group-indicators.vue'
import storeProxy from '../store/proxy'

@Component({
  components: {
    AlternativesNumberX,
    NumberGroupIndicators,
  },
})
export default class IncomingData extends Vue {
  incomingData = storeProxy.incomingData
  /* headers = []

  get items() {
    return [
      {
        text: 'Показники',
        align: 'start',
        value: 'name',
        groupable: false,
      },
      ...Array(this.incomingData.X)
        .fill('X')
        .map((v, i) => ({
          text: `${v}${i + 1}`,
          align: 'start',
          value: `${v}${i + 1}`,
          groupable: false,
        })),
      {
        text: 'Група показників',
        align: 'start',
        value: 'category',
        groupable: true,
      },
    ]
  } */
}
</script>

<style scoped>
.tables {
  display: grid;
  grid-auto-flow: row;
  gap: 20px;
}
</style>
