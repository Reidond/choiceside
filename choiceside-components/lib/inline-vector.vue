<template>
  <div class="inline-vector">
    <div class="inline-vector__item">
      {{ `Використовуємо метод множення матриць для матриці` }}
      <katex-element :expression="`\\overline{${mainExpression}}`" />
      {{ `В результаті отримаємо вектор оцінок альтернатив:` }}
    </div>
    <div class="inline-vector__item">
      <katex-element :expression="leftExpression" />
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th
                class="text-center"
                v-for="(item, i) in items"
                :key="`vector-row${i}`"
              >
                <katex-element :expression="`x_${i + 1}`" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="(item, i) in items" :key="`vector-row${i}`">
                {{ item }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <div class="inline-vector__item">
      <span>по цілі</span>
      <katex-element :expression="rightExpression" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class InlineVector extends Vue {
  @Prop({ default: '' }) readonly mainExpression!: string
  @Prop({ default: '' }) readonly leftExpression!: string
  @Prop({ default: '' }) readonly rightExpression!: string
  @Prop({ default: [] }) readonly items!: number[]
}
</script>

<style scoped>
.inline-vector {
  display: grid;
  grid-auto-flow: row;
}
.inline-vector__item {
  display: inline-flex;
  gap: 10px;
  align-items: center;
}
</style>
