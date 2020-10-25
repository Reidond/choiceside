import { mount, createLocalVue } from '@vue/test-utils'
import App from '../../src/app.vue'
import VueRouter from 'vue-router'
import router from '../../src/router'

const localVue = createLocalVue()
localVue.use(VueRouter)

test('App should render default route', () => {
  const wrapper = mount(App, {
    localVue,
    router,
  })
  expect(wrapper.text()).toMatch(`Welcome to Your Vue.js App`)
})
