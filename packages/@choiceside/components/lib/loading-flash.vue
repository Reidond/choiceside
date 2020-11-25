<template>
  <div>
    <v-skeleton-loader
      v-if="$slots.skeleton"
      :loading="loading"
      boilerplate
      :type="type"
    >
      <slot name="skeleton" />
    </v-skeleton-loader>
    <slot v-else :loading="loading" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    watched: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  mounted() {
    this.$watch(
      (vm) => vm.watched,
      (val) => {
        this.flash()
      },
      {
        immediate: true,
        deep: true,
      }
    )
  },
  methods: {
    flash() {
      if (!this.loading) {
        this.loading = true
        const timeout = setTimeout(() => {
          this.loading = false
          clearTimeout(timeout)
        }, 500)
      }
    },
  },
})
</script>

<style scoped>
</style>
