<template>
  <b-field horizontal>
    <template slot="label">
      <katex-element :expression="expression" />
    </template>
    <b-input
      type="number"
      min="0"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event)"
    ></b-input>
  </b-field>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TextFieldKatex extends Vue {
  @Prop({ type: [Number, String], default: '' }) readonly value!:
    | Number
    | String
  @Prop({ default: '' }) readonly placeholder!: string
  @Prop({ default: '' }) readonly expression!: string
}
</script>

<style scoped>
</style>
