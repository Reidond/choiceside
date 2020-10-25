<template>
  <csc-select-field-katex
    :items="fundsBox.depositFundsItems"
    :value="value"
    @input="$emit('input', $event)"
    expression="A_2"
    internal-index="2"
    label="Потреба в депозитних коштах"
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
