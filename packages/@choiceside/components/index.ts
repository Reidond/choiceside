import { Component, VueConstructor } from 'vue'
import cscSelectFieldKatex from './lib/select-field-katex.vue'
import cscTextFieldKatex from './lib/text-field-katex.vue'
import cscInlineVector from './lib/inline-vector.vue'
import cscMatrixTable from './lib/matrix-table.vue'
import cscLoadingFlash from './lib/loading-flash.vue'
import cscVuetifyThemeBtn from './lib/vuetify-theme-btn.vue'
import cscIconShorts from './icons/shorts.vue'

/**
 * Load a component.
 * @param {object} app
 * @param {string} Component name
 * @param {object} Component definition
 */
const registerComponent = (
  app: VueConstructor,
  name: string,
  def: unknown
): void => {
  if (app && name && def) {
    app.component(name, def as Vue)
  }
}

/**
 * Load a group of components.
 * @param {object} app
 * @param {object} Object of component definitions
 */
const registerComponents = (
  app: VueConstructor,
  components: Record<string, Component> = {}
): void => {
  Object.keys(components).forEach((key) => {
    registerComponent(app, key, components[key])
  })
}

export * from './lib/models'
export { default as cscSelectFieldKatex } from './lib/select-field-katex.vue'
export { default as cscTextFieldKatex } from './lib/text-field-katex.vue'
export { default as cscInlineVector } from './lib/inline-vector.vue'
export { default as cscMatrixTable } from './lib/matrix-table.vue'
export { default as cscLoadingFlash } from './lib/loading-flash.vue'
export { default as cscVuetifyThemeBtn } from './lib/vuetify-theme-btn.vue'
export { default as cscIconShorts } from './icons/shorts.vue'
export default {
  install: (app: VueConstructor): void => {
    registerComponents(app, {
      'csc-text-field-katex': cscTextFieldKatex,
      'csc-select-field-katex': cscSelectFieldKatex,
      'csc-inline-vector': cscInlineVector,
      'csc-matrix-table': cscMatrixTable,
      'csc-loading-flash': cscLoadingFlash,
      'csc-vuetify-theme-btn': cscVuetifyThemeBtn,
      'csc-icon-shorts': cscIconShorts,
    })
  },
}
