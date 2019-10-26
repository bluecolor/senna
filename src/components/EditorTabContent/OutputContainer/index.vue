<template lang="pug">
.output-container
  q-bar.bg-blue-grey-7.text-white.output-bar(dense style='height:25px;')
    div
      | {{ id }}
    q-btn(icon='more_vert' dense flat round)
    q-space
    q-btn.q-mr-sm(:icon='icon' dense flat round @click='onMinimize')
    q-btn(icon='close' dense flat round)
</template>

<script>
export default {
  props: {
    id: { type: Number }
  },
  data () {
    return {
      isMinimized: false
    }
  },
  methods: {
    onMinimize () {
      this.isMinimized = !this.isMinimized
      this.$emit('minimize', this.isMinimized)
    }
  },
  computed: {
    icon () {
      if (this.isMinimized) {
        return 'keyboard_arrow_up'
      } else {
        return 'keyboard_arrow_down'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.output-bar {
  // border-bottom: 0.2px solid #ccc;
}
</style>
