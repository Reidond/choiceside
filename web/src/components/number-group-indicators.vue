<template>
  <div class="d-flex flex-column">
    <text-field-with-expression
      label="Введіть групу цілей"
      v-model.number="incomingData.K1"
      expression="K1"
    ></text-field-with-expression>
    <text-field-with-expression
      label="Введіть групу цілей"
      v-model.number="incomingData.G1"
      expression="G1"
    ></text-field-with-expression>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import storeProxy from '../store/proxy'
import TextFieldWithExpression from './text-field-with-expression.vue'

@Component({
  components: {
    TextFieldWithExpression,
  },
})
export default class NumberGroupIndicators extends Vue {
  incomingData = storeProxy.incomingData
}
</script>

<style scoped>
</style>
