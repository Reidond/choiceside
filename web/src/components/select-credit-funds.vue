<template>
  <csc-select-field-katex
    :items="fundsBox.creditFundsItems"
    :value="value"
    @input="$emit('input', $event)"
    expression="A_1"
    internal-index="1"
    label="Потреба в кредитних коштах"
  />
</template>

<script lang="ts">
import storeProxy from '../store/proxy'
import { SelectItems } from '../../../choiceside-components/lib'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SelectCreditFunds extends Vue {
  fundsBox = storeProxy.fundsBox

  @Prop({ type: [String, Number], default: 0 }) readonly value!: string | number
}
</script>

<style scoped>
</style>
