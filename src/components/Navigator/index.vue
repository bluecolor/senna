<template lang="pug">
.navigator-container
  q-bar.bg-grey-8.nav-bar
    q-btn.q-mr-sm(dense round flat icon='refresh' size='10.5px' color='white')
    q-btn.q-mr-sm(dense round flat icon='tab' size='10.5px' color='white')
    q-btn(color='white' icon='add' dense size='10.5px' flat round)
      q-menu(anchor="bottom right")
        q-list(dense style='min-width: 200px')
          q-item(clickable, v-close-popup)
            q-item-section New Tab
          q-separator
          q-item(clickable, v-close-popup)
            q-item-section New Table
          q-item(clickable, v-close-popup)
            q-item-section New User

    q-space
  connection-tree()
</template>

<script>

import ConnectionTree from './ConnectionTree'
import ActivityBar from '@/components/ActivityBar'

export default {
  components: {
    ConnectionTree,
    ActivityBar
  },
  data () {
    return {
      isConnection: false
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

.navigator-container {
  height: 100%;
  .nav-bar {
    padding-right:5px;
    padding-left:5px;
    min-height: 37px;
  }
}

</style>
