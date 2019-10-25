<template lang="pug">
q-tab.editor-tab(:name='id')
  div
    | {{ title }}
    q-btn.z-max.q-ml-md.all-pointer-events.close-btn(
      flat round, dense, size='xs', color='negative', icon='close',
      @click.stop='close'
    )
</template>

<script>
export default {
  name: 'EditorTab',
  props: {
    id: { type: Number }
  },
  data () {
    return {
      title: 'New tab'
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.editor-tab {
  min-height: 37px;
  padding-right:3px;
  .close-btn {
    visibility: hidden;
    transition: visibility 0s;
  }
  &:hover {
    .close-btn {
      visibility: visible;
      transition: visibility 0s;
    }
  }
}

</style>
