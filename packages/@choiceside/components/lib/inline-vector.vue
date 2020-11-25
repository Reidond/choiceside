<template>
  <div class="inline-vector">
    <div class="inline-vector__item" v-if="!hideHeader">
      {{ `Використовуємо метод множення матриць для матриці` }}
      <katex-element :expression="`\\overline{${mainExpression}}`" />
      {{ `В результаті отримаємо вектор оцінок альтернатив:` }}
    </div>
    <div class="inline-vector__item">
      <katex-element :expression="leftExpression" v-if="leftExpression" />
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th
                class="text-center"
                v-for="(_, i) in items"
                :key="`vector-row${i}`"
              >
                <slot name="header" :index="i">
                  <katex-element :expression="`x_${i + 1}`" />
                </slot>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="(item, i) in items" :key="`vector-row${i}`">
                <slot name="item" :item="item" :index="i">
                  {{ item }}
                </slot>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <div class="inline-vector__item" v-if="!hideFooter">
      <span>по цілі</span>
      <katex-element :expression="rightExpression" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    mainExpression: {
      type: String,
      default: '',
    },
    leftExpression: {
      type: String,
      default: '',
    },
    rightExpression: {
      type: String,
      default: '',
    },
    items: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
    hideFooter: {
      type: Boolean,
      default: false,
    },
  },
})
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
.inline-vector
  >>> .theme--dark.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: transparent;
}

.inline-vector
  >>> .theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: transparent;
}
</style>
