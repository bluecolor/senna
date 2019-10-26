<template lang="pug">
.editor-container
  q-tabs(v-model='tab', align='left', active-color='primary')
    editor-tab(
      v-for='t in tabs', :key='t', :id='t'
    )
      div
        | Tab {{t}}
        q-btn.z-max.q-ml-md.all-pointer-events.close-btn(
          flat round, dense, size='xs', color='negative', icon='close', @click.stop='removeTab(t)')
  editor-tab-content()

</template>

<script>

import EditorTab from '@/components/EditorTab'
import EditorTabContent from '@/components/EditorTabContent'

export default {
  components: {
    EditorTab,
    EditorTabContent
  },
  data () {
    return {
      version: 'Quasar.version',
      tab: 1,
      tabs: [1, 2]
    }
  },
  watch: {
    tab () {
      console.log(this.tab)
    }
  },
  methods: {
    removeTab (id) {
      console.log('Removing tab', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-panel {
  padding: 0 !important;
}
</style>
