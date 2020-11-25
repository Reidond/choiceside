<template>
  <v-text-field
    type="number"
    min="0"
    :value="value"
    :label="label"
    @input="$emit('input', $event)"
  >
    <template #prepend>
      <katex-element :expression="expression" />
    </template>
  </v-text-field>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TextFieldKatex extends Vue {
  @Prop({ type: [Number, String], default: '' }) readonly value!:
    | Number
    | String
  @Prop({ default: '' }) readonly label!: string
  @Prop({ default: '' }) readonly expression!: string
}
</script>

<style scoped>
</style>
