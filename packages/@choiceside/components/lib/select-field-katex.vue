<template>
  <v-select
    :items="items"
    :label="label"
    :value="value"
    @input="$emit('input', $event)"
  >
    <template #prepend>
      <katex-element :expression="expression" />
    </template>
    <template #item="{ item: {text, value} }">
      <div class="select-field-katex__item">
        <katex-element
          :expression="`a_{${internalIndex}${indexFromValue(value)}}`"
        />
        <span>
          {{ text }}
        </span>
        <katex-element :expression="`u_${internalIndex} = ${value}`" />
      </div>
    </template>
  </v-select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { SelectItems } from './models'

@Component
export default class SelectFieldKatex extends Vue {
  @Prop({ type: [String, Number], default: '' }) readonly value!:
    | string
    | number
  @Prop({ default: '' }) readonly label!: string
  @Prop({ default: '' }) readonly expression!: string
  @Prop({ default: '1' }) readonly internalIndex!: string
  @Prop({ default: '' }) readonly items!: SelectItems[]

  indexFromValue(v: string | number) {
    return this.items.findIndex(({ value }) => value === v) + 1
  }
}
</script>

<style scoped>
.select-field-katex__item {
  display: inline-flex;
  gap: 10px;
}
</style>
