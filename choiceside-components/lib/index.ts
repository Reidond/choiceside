import { Component, VueConstructor } from 'vue'
import cscSelectFieldKatex from './select-field-katex.vue'
import cscTextFieldKatex from './text-field-katex.vue'

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

export * from './models'
export { default as cscSelectFieldKatex } from './select-field-katex.vue'
export { default as cscTextFieldKatex } from './text-field-katex.vue'
export default {
  install: (app: VueConstructor): void => {
    registerComponents(app, {
      'csc-text-field-katex': cscTextFieldKatex,
      'csc-select-field-katex': cscSelectFieldKatex,
    })
  },
}
