<template>
  <text-field-with-expression
    label="Введіть кількість альтернатив"
    v-model.number="incomingData.X"
    expression="X"
  ></text-field-with-expression>
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
export default class AlternativesNumberX extends Vue {
  incomingData = storeProxy.incomingData
}
</script>

<style scoped>
</style>
