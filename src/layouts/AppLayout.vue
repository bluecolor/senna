<template lang="pug">
q-layout(view='lHh Lpr lFf')
  q-bar.bg-primary.text-white(dark, style='-webkit-app-region: drag; height:30px;')
    .col.text-center.text-weight-bold
      | Senna
    q-btn(dense, flat, round, icon='lens', size='8.5px', color='green' @click='onMinimize')
    q-btn(dense, flat, round, icon='lens', size='8.5px', color='yellow' @click='onMaximize')
    q-btn(dense, flat, round, icon='lens', size='8.5px', color='red' @click='onClose')

  .page-container
    activity-bar(@toggle='onToggleNavigator' style='height:100%;' :style="`height: ${splitHeight}px`")
    q-splitter.splitter(:limits="[0, 90]" v-model='splitter' :style="`height: ${splitHeight}px`")
      template(v-slot:before)
        navigator
      template(v-slot:after)
        q-page-container
          router-view
  status-bar

</template>

<script>
import _ from 'lodash'
import { remote } from 'electron'
import Navigator from '@/components/Navigator'
import StatusBar from '@/components/StatusBar'
import ActivityBar from '@/components/ActivityBar'

export default {
  name: 'AppLayout',
  components: {
    Navigator,
    StatusBar,
    ActivityBar
  },
  data () {
    return {
      isMaximized: false,
      splitHeight: 300,
      splitterPrev: 0,
      splitter: 30,
      leftDrawerOpen: false
    }
  },
  computed: {
  },
  methods: {
    onClose () {
      remote.getCurrentWindow().close()
    },
    onMinimize () {
      var window = remote.getCurrentWindow()
      window.minimize()
    },
    onMaximize () {
      var window = remote.getCurrentWindow()
      if (!window.isMaximized()) {
        window.maximize()
      } else {
        window.unmaximize()
      }
    },
    computeSplitHeight () {
      const winHeight = remote.getCurrentWindow().getSize()[1]
      this.splitHeight = winHeight - 55
    },
    onToggleNavigator () {
      if (this.splitter === 0) {
        this.splitter = this.splitterPrev
      } else {
        this.splitterPrev = this.splitter
        this.splitter = 0
      }
    }
  },
  mounted () {
    this.computeSplitHeight()
    remote.getCurrentWindow().on('resize', _.debounce(() => {
      this.computeSplitHeight()
    }, 20))
  }
}
</script>

<style lang="stylus">
button {
  -webkit-app-region: no-drag;
}

.page-container {
  display: flex;
  .splitter {
    flex-grow: 1;
  }
}
</style>
