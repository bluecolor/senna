<template lang="pug">
q-tabs(v-model='tab', align='left', active-color='primary')
  q-tab.editor-tab(
    v-for='tabId in tabs', :key='tabId', :name='tabId')
    div
      | Tab {{tabId}}
      q-btn.z-max.q-ml-md.all-pointer-events.close-btn(
        flat round, dense, size='xs', color='negative', icon='close', @click.stop='removeTab(tabId)')

</template>

<script>
export default {
  data () {
    return {
      version: 'Quasar.version',
      tab: 1,
      tabs: [1, 2, 3]
    }
  },
  methods: {
    removeTab (id) {
      console.log('Removing tab', id)
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
