<template>
  <b-field horizontal>
    <template slot="label">
      <katex-element :expression="expression" />
    </template>
    <b-select
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event)"
    >
      <option
        v-for="option in itemsWithIds"
        :value="option.value"
        :key="option.id"
      >
        {{ option.text }}
      </option>
    </b-select>
  </b-field>
</template>

<script lang="ts">
import { nanoid } from 'nanoid'
import { Component, Prop, Vue } from 'vue-property-decorator'

interface SelectItems {
  text: string
  value: string
}

interface SelectItemsWithId extends SelectItems {
  id?: string
}

@Component
export default class SelectFieldKatex extends Vue {
  @Prop({ type: [String], default: '' }) readonly value!: String
  @Prop({ default: '' }) readonly placeholder!: string
  @Prop({ default: '' }) readonly expression!: string
  @Prop({ default: '' }) readonly items!: SelectItems[]

  get itemsWithIds(): SelectItemsWithId[] {
    return this.items.map((v) => ({ id: nanoid(), ...v }))
  }
}
</script>

<style scoped>
</style>
