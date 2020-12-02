<template>
  <div class="matrix-table">
    <div>
      {{ `Використовуючи метод множення матриць по групі показників` }}
      <katex-element :expression="`G_${internalIndex} =`" />
      <katex-element :expression="`\\{`" />
      <katex-element
        :expression="`${mainExpression}_${i + 1}`"
        v-for="(_, i) in rows"
        :key="`matrix-exp${i}`"
      />
      <katex-element :expression="`\\}`" />
      {{
        `обчислюємо вектори оцінок альтернатив, які представимо у вигляді наступної матриці:`
      }}
    </div>
    <div class="matrix-table__item">
      <katex-element :expression="`${leftExpression} =`" />
      <div role="region" aria-labelledby="Caption01" tabindex="0">
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th
                  class="text-center"
                  v-for="(_, i) in columns"
                  :key="`vector-row${i}`"
                >
                  <katex-element :expression="`x_${i + 1}`" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(_, i) in rows" :key="`vector-row${i}`">
                <td v-for="(_, j) in columns" :key="`vector-col${j}`">
                  {{ safeItems.subset(mathIndex(i, j)) }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Matrix, index, size, typeOf, matrix } from 'mathjs'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class MatrixTable extends Vue {
  @Prop({ default: '' }) readonly mainExpression!: string
  @Prop({ default: '' }) readonly leftExpression!: string
  @Prop({ default: [] }) readonly items!: Matrix
  @Prop({ default: 0 }) readonly internalIndex!: number

  mathIndex = index

  get safeItems() {
    if (typeOf(this.items) === 'Matrix') {
      return this.items
    }
    // @ts-ignore
    return matrix(this.items._data)
  }

  get rows() {
    if (typeOf(this.items) === 'Matrix') {
      return Array(this.items.size()[0]).fill(0)
    }
    // @ts-ignore
    return Array(matrix(this.items._data).size()[0]).fill(0)
  }

  get columns() {
    if (typeOf(this.items) === 'Matrix') {
      return Array(this.items.size()[1]).fill(0)
    }
    // @ts-ignore
    return Array(matrix(this.items._data).size()[1]).fill(0)
  }
}
</script>

<style scoped>
.matrix-table {
  display: grid;
  grid-auto-flow: row;
}
.matrix-table__item {
  display: inline-flex;
  gap: 10px;
  align-items: center;
}

.matrix-table
  >>> .theme--dark.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: transparent;
}

.matrix-table
  >>> .theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: transparent;
}

[role='region'][aria-labelledby][tabindex] {
  overflow: auto;
}

[role='region'][aria-labelledby][tabindex]:focus {
  outline: 0.1em solid rgba(0, 0, 0, 0.1);
}
</style>
